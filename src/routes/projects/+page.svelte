<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { SectionHeader, ProjectCard, Badge } from '$lib/components/ui';
	import { projects, projectCategories } from '$lib/data';

	let mounted = false;
	let selectedCategory = 'All';
	let filteredProjects = projects;

	$: {
		if (selectedCategory === 'All') {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((p) => p.category === selectedCategory);
		}
	}

	function selectCategory(category) {
		selectedCategory = category;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Projects - HK Portfolio</title>
	<meta name="description" content="Explore projects built by HK - Full Stack Developer" />
</svelte:head>

<section class="page-padding">
	<div class="section-container">
		<SectionHeader title="Projects" subtitle="// my work" />

		<!-- Category Filter -->
		{#if mounted}
			<div
				class="flex flex-wrap justify-center gap-3 mb-12"
				in:fly={{ y: 20, duration: 500, delay: 200 }}
			>
				{#each projectCategories as category}
					<button
						class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
							{selectedCategory === category
								? 'bg-accent text-white shadow-glow'
								: 'bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent'}"
						on:click={() => selectCategory(category)}
					>
						{category}
					</button>
				{/each}
			</div>
		{/if}

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#if mounted}
				{#each filteredProjects as project, i (project.id)}
					<div
						in:fly={{ y: 30, duration: 400, delay: 100 + (i % 6) * 50 }}
						out:fade={{ duration: 200 }}
					>
						<ProjectCard {project} />
					</div>
				{/each}
			{/if}
		</div>

		<!-- Empty State -->
		{#if filteredProjects.length === 0}
			<div class="text-center py-16">
				<p class="text-text-secondary text-lg">No projects found in this category.</p>
			</div>
		{/if}

		<!-- LeetCode Stats -->
		{#if mounted}
			<div
				class="mt-16"
				in:fly={{ y: 30, duration: 500, delay: 400 }}
			>
				<h3 class="text-xl font-semibold text-text-primary mb-6 text-center">LeetCode Stats</h3>
				<a
					href="https://leetcode.com/u/HHK363_05/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex justify-center hover:scale-105 transition-transform duration-300"
				>
					<img
						src="https://leetcard.jacoblin.cool/HHK363_05?theme=dark&font=Nunito&ext=heatmap"
						alt="LeetCode Stats"
						class="rounded-xl shadow-lg max-w-full"
					/>
				</a>
			</div>
		{/if}
	</div>
</section>
