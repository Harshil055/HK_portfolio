# Server Deployment Guide — harshilhk.com on Contabo

## Prerequisites

- SSH access to your Contabo server
- Code pushed to GitHub
- Domain `harshilhk.com` DNS A record pointing to your server IP

---

## Step 1 — SSH into Server

```bash
ssh root@your-server-ip
```

---

## Step 2 — Create User

```bash
adduser harshilhk
```

Fill in the password, skip the rest with Enter.

---

## Step 3 — Create Web Directory (as root)

```bash
mkdir -p /var/www/harshilhk.com/html
chown -R harshilhk:harshilhk /var/www/harshilhk.com
chmod -R 755 /var/www/harshilhk.com
```

Verify:

```bash
ls -la /var/www/
```

You should see `harshilhk harshilhk` on the `harshilhk.com` folder.

---

## Step 4 — Check Node.js (as root)

```bash
node -v
npm -v
```

If not installed:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

---

## Step 5 — Switch to harshilhk User

```bash
su - harshilhk
```

---

## Step 6 — Clone Your GitHub Repo

```bash
cd /var/www/harshilhk.com
git clone https://github.com/your-username/your-repo.git repo
```

> If repo is private, use:
> ```bash
> git clone https://<your-token>@github.com/your-username/your-repo.git repo
> ```

---

## Step 7 — Install Dependencies & Build

```bash
cd /var/www/harshilhk.com/repo
npm install
npm run build
```

---

## Step 8 — Copy Build Files to html Folder

```bash
cp -r build/* /var/www/harshilhk.com/html/
```

---

## Step 9 — Exit Back to Root

```bash
exit
```

---

## Step 10 — Create Nginx Virtual Host

```bash
nano /etc/nginx/sites-available/harshilhk.com
```

Paste the following:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name harshilhk.com www.harshilhk.com;

    root /var/www/harshilhk.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save: `Ctrl+X` → `Y` → `Enter`

---

## Step 11 — Enable Site & Reload Nginx

```bash
ln -s /etc/nginx/sites-available/harshilhk.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Step 12 — SSL Certificate with Certbot

> DNS A record for `harshilhk.com` and `www.harshilhk.com` must be pointing to your server IP before this step.

```bash
certbot --nginx -d harshilhk.com -d www.harshilhk.com
```

Certbot will automatically configure HTTPS and redirect HTTP to HTTPS.

---

## Step 13 — Verify Everything

```bash
# Check your site
curl -I https://harshilhk.com

# Check nginx is healthy
systemctl status nginx

# Confirm other domains still work
curl -I https://evolun.in
```

---

## Future Redeployments

Whenever you push new code to GitHub, just run these 4 commands on the server:

```bash
su - harshilhk
cd /var/www/harshilhk.com/repo
git pull origin main
npm run build && cp -r build/* /var/www/harshilhk.com/html/
```

---

## Notes

- **Other domains are not affected** — Nginx routes traffic by `server_name`, so `harshilhk.com` and `evolun.in` are completely isolated.
- **SPA routing works** — `try_files $uri $uri/ /index.html` handles SvelteKit client-side routing correctly.
- **No server restart needed** on redeployment — Nginx serves new files immediately after copy.
