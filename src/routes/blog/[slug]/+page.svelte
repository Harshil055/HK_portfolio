<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { posts } from '$lib/data';
	import { Badge, Button } from '$lib/components/ui';
	import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Link } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils';

	let mounted = false;
	let copied = false;

	$: slug = $page.params.slug;
	$: post = posts.find((p) => p.slug === slug);

	async function shareTwitter() {
		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent(post.title);
		window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
	}

	async function shareLinkedIn() {
		const url = encodeURIComponent(window.location.href);
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
	}

	async function copyLink() {
		await copyToClipboard(window.location.href);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	{#if post}
		<title>{post.title} - HK Portfolio</title>
		<meta name="description" content={post.excerpt} />
	{/if}
</svelte:head>

<section class="page-padding">
	<div class="section-container max-w-4xl">
		{#if post && mounted}
			<!-- Back button -->
			<div in:fly={{ y: 20, duration: 400, delay: 100 }}>
				<a
					href="/blog"
					class="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8"
				>
					<ArrowLeft size={18} />
					Back to Blog
				</a>
			</div>

			<!-- Article Header -->
			<header class="mb-8" in:fly={{ y: 20, duration: 400, delay: 200 }}>
				<Badge variant="accent" class="mb-4">{post.category}</Badge>

				<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
					{post.title}
				</h1>

				<p class="text-text-secondary text-lg mb-6">{post.excerpt}</p>

				<div class="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
					<span class="flex items-center gap-1">
						<Calendar size={16} />
						{post.date}
					</span>
					<span class="flex items-center gap-1">
						<Clock size={16} />
						{post.readTime}
					</span>
					<span>By {post.author}</span>
				</div>
			</header>

			<!-- Featured Image -->
			{#if post.image}
				<div
					class="relative aspect-video rounded-xl overflow-hidden mb-12 glass-card"
					in:fly={{ y: 20, duration: 400, delay: 300 }}
				>
					<div class="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
						<span class="text-text-secondary">Featured Image</span>
					</div>
				</div>
			{/if}

			<!-- Article Content -->
			<article
				class="prose prose-invert prose-lg max-w-none mb-12"
				in:fly={{ y: 20, duration: 400, delay: 400 }}
			>
				<div class="text-text-secondary space-y-6">
					{@html post.content.split('\n').filter(p => p.trim()).map(p => {
						if (p.startsWith('# ')) {
							return `<h1 class="text-3xl font-bold text-text-primary mt-8 mb-4">${p.slice(2)}</h1>`;
						} else if (p.startsWith('## ')) {
							return `<h2 class="text-2xl font-semibold text-text-primary mt-6 mb-3">${p.slice(3)}</h2>`;
						} else if (p.startsWith('- ')) {
							return `<li class="ml-4">${p.slice(2)}</li>`;
						} else if (p.startsWith('**') && p.endsWith('**')) {
							return `<p class="font-semibold text-text-primary">${p.slice(2, -2)}</p>`;
						}
						return `<p>${p}</p>`;
					}).join('')}
				</div>
			</article>

			<!-- Share Section -->
			<div
				class="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
				in:fly={{ y: 20, duration: 400, delay: 500 }}
			>
				<div class="flex items-center gap-2 text-text-secondary">
					<Share2 size={18} />
					<span>Share this article</span>
				</div>

				<div class="flex items-center gap-3">
					<button
						on:click={shareTwitter}
						class="p-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-accent hover:border-accent transition-colors"
						aria-label="Share on Twitter"
					>
						<Twitter size={18} />
					</button>
					<button
						on:click={shareLinkedIn}
						class="p-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-accent hover:border-accent transition-colors"
						aria-label="Share on LinkedIn"
					>
						<Linkedin size={18} />
					</button>
					<button
						on:click={copyLink}
						class="p-2 bg-surface border border-border rounded-lg transition-colors
							{copied ? 'text-green-500 border-green-500' : 'text-text-secondary hover:text-accent hover:border-accent'}"
						aria-label="Copy link"
					>
						<Link size={18} />
					</button>
					{#if copied}
						<span class="text-green-500 text-sm">Copied!</span>
					{/if}
				</div>
			</div>

			<!-- Navigation -->
			<div class="mt-12 text-center">
				<Button href="/blog" variant="secondary">
					<ArrowLeft size={16} />
					Back to all articles
				</Button>
			</div>
		{:else if mounted}
			<div class="text-center py-16">
				<h1 class="text-2xl font-bold text-text-primary mb-4">Article not found</h1>
				<p class="text-text-secondary mb-8">The article you're looking for doesn't exist.</p>
				<Button href="/blog" variant="primary">
					<ArrowLeft size={16} />
					Back to Blog
				</Button>
			</div>
		{/if}
	</div>
</section>
