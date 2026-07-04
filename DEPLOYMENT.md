# Deployment Guide — harshilhk.com on Contabo Server

## Prerequisites

- SSH access to your Contabo server
- Domain `harshilhk.com` DNS A record pointing to your server IP
- Nginx already running on the server
- Certbot installed on the server (for SSL)

---

## Step 1 — Create the User on the Server

SSH into your Contabo server:

```bash
ssh root@your-server-ip
```

Create the user:

```bash
adduser harshilhk
```

It will ask for a password and optional info. Fill or skip with Enter.

Create and set up the web directory:

```bash
mkdir -p /var/www/harshilhk.com/html
chown -R harshilhk:harshilhk /var/www/harshilhk.com
chmod -R 755 /var/www/harshilhk.com
```

---

## Step 2 — Build the Project Locally

On your local machine inside `HK-Portfolio/`:

```bash
npm install
npm run build
```

This generates the static site in the `build/` folder.

---

## Step 3 — Upload Build to Server

From your local machine (PowerShell or terminal):

**Option A — using scp:**

```bash
scp -r build/* harshilhk@your-server-ip:/var/www/harshilhk.com/html/
```

**Option B — using rsync (recommended for large files):**

```bash
rsync -avz --delete build/ harshilhk@your-server-ip:/var/www/harshilhk.com/html/
```

If your server only allows root SSH login, use root and fix ownership after:

```bash
scp -r build/* root@your-server-ip:/var/www/harshilhk.com/html/

# Then on server, fix ownership
chown -R harshilhk:harshilhk /var/www/harshilhk.com/html
```

---

## Step 4 — Create Nginx Virtual Host

On the server, create the config file:

```bash
nano /etc/nginx/sites-available/harshilhk.com
```

Paste the following config:

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

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/harshilhk.com /etc/nginx/sites-enabled/
```

Test the config (ensures evolun.in is not affected):

```bash
nginx -t
```

Reload Nginx:

```bash
systemctl reload nginx
```

---

## Step 5 — SSL Certificate with Certbot

> Make sure DNS A records for `harshilhk.com` and `www.harshilhk.com` are pointing to your server IP before this step.

```bash
certbot --nginx -d harshilhk.com -d www.harshilhk.com
```

Certbot will automatically update your Nginx config to add HTTPS and redirect HTTP to HTTPS.

---

## Step 6 — Verify Everything Works

```bash
# Check site is serving
curl -I https://harshilhk.com

# Check nginx is healthy
systemctl status nginx

# Confirm other domains are not affected
curl -I https://evolun.in
```

---

## Important Notes

- **Other domains are isolated** — Nginx uses `server_name` to route traffic per domain. The `harshilhk.com` config is completely separate from `evolun.in`. No interference.
- **DNS must be set first** — Certbot will fail if DNS is not pointing to the server before you run it.
- **SPA routing** — The `try_files $uri $uri/ /index.html;` line handles SvelteKit client-side routing correctly.

---

## Future Redeployments

Whenever you update the portfolio, just rebuild and re-upload:

```bash
# Local
npm run build

# Upload (from local machine)
rsync -avz --delete build/ harshilhk@your-server-ip:/var/www/harshilhk.com/html/
```

Nginx serves the new files immediately — no restart needed.
