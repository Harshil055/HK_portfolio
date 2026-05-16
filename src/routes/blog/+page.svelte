<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { SectionHeader, BlogCard } from '$lib/components/ui';
	import { posts, blogCategories } from '$lib/data';
	import { Search } from 'lucide-svelte';

	let mounted = false;
	let selectedCategory = 'All';
	let searchQuery = '';
	let filteredPosts = posts;

	$: {
		filteredPosts = posts.filter((post) => {
			const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
			const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Blog - HK Portfolio</title>
	<meta name="description" content="Articles and insights about web development, technology, and more" />
</svelte:head>

<section class="page-padding">
	<div class="section-container">
		<SectionHeader title="Blog" subtitle="// thoughts & tutorials" />

		<!-- Search & Filter -->
		{#if mounted}
			<div
				class="flex flex-col sm:flex-row gap-4 mb-12"
				in:fly={{ y: 20, duration: 500, delay: 200 }}
			>
				<!-- Search -->
				<div class="relative flex-1 max-w-md">
					<Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
					<input
						type="text"
						placeholder="Search articles..."
						bind:value={searchQuery}
						class="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none transition-colors"
					/>
				</div>

				<!-- Category Filter -->
				<div class="flex flex-wrap gap-2">
					{#each blogCategories as category}
						<button
							class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
								{selectedCategory === category
									? 'bg-accent text-white'
									: 'bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent'}"
							on:click={() => selectedCategory = category}
						>
							{category}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Blog Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#if mounted}
				{#each filteredPosts as post, i (post.slug)}
					<div in:fly={{ y: 30, duration: 400, delay: 100 + (i % 6) * 50 }}>
						<BlogCard {post} />
					</div>
				{/each}
			{/if}
		</div>

		<!-- Empty State -->
		{#if filteredPosts.length === 0}
			<div class="text-center py-16">
				<p class="text-text-secondary text-lg mb-2">No articles found.</p>
				<p class="text-text-secondary text-sm">Try adjusting your search or filter.</p>
			</div>
		{/if}

		<!-- Newsletter CTA -->
		{#if mounted}
			<div
				class="mt-16 glass-card p-8 text-center gradient-border"
				in:fly={{ y: 30, duration: 500, delay: 400 }}
			>
				<h3 class="text-2xl font-semibold text-text-primary mb-2">Stay Updated</h3>
				<p class="text-text-secondary mb-6 max-w-md mx-auto">
					Subscribe to get notified when I publish new articles about web development and technology.
				</p>
				<form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
					<input
						type="email"
						placeholder="your@email.com"
						class="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none transition-colors"
					/>
					<button
						type="submit"
						class="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-glow transition-colors"
					>
						Subscribe
					</button>
				</form>
			</div>
		{/if}
	</div>
</section>
