<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import { Button, Card, Badge, SectionHeader, ProjectCard } from '$lib/components/ui';
	import { projects } from '$lib/data';
	import { ArrowRight, Code2, Palette, Rocket, Users } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const highlights = [
		{
			icon: Code2,
			title: 'Clean Code',
			description: 'Writing maintainable, scalable code that stands the test of time.'
		},
		{
			icon: Palette,
			title: 'Modern Design',
			description: 'Creating beautiful interfaces with attention to every detail.'
		},
		{
			icon: Rocket,
			title: 'Performance',
			description: 'Building fast, optimized applications that users love.'
		},
		{
			icon: Users,
			title: 'Collaboration',
			description: 'Working effectively with teams to deliver great products.'
		}
	];

	const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Harshil HK - Cloud Development Engineer</title>
	<meta name="description" content="Personal portfolio of Harshil HK - Cloud Development Engineer, AI & Product Builder" />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- What I Do Section -->
<section class="page-padding bg-surface/30">
	<div class="section-container">
		<SectionHeader title="What I Do" subtitle="// capabilities" />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#if mounted}
				{#each highlights as { icon: Icon, title, description }, i}
					<div in:fly={{ y: 30, duration: 500, delay: 200 + i * 100 }}>
						<Card>
							<div class="text-accent mb-4">
								<Icon size={32} />
							</div>
							<h3 class="text-lg font-semibold text-text-primary mb-2">{title}</h3>
							<p class="text-text-secondary text-sm">{description}</p>
						</Card>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="page-padding">
	<div class="section-container">
		<SectionHeader title="Featured Projects" subtitle="// selected work" />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
			{#if mounted}
				{#each featuredProjects as project, i}
					<div in:fly={{ y: 30, duration: 500, delay: 200 + i * 100 }}>
						<ProjectCard {project} />
					</div>
				{/each}
			{/if}
		</div>

		<div class="text-center">
			<Button href="/projects" variant="secondary" icon>
				View All Projects
			</Button>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="page-padding bg-surface/30 relative overflow-hidden">
	<!-- Background accent -->
	<div class="absolute inset-0 opacity-30">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
	</div>

	<div class="section-container relative z-10">
		<div class="max-w-2xl mx-auto text-center">
			{#if mounted}
				<h2
					class="text-3xl md:text-4xl font-bold text-text-primary mb-4"
					in:fly={{ y: 20, duration: 500, delay: 200 }}
				>
					Let's Build Something <span class="gradient-text">Amazing</span>
				</h2>
				<p
					class="text-text-secondary mb-8"
					in:fly={{ y: 20, duration: 500, delay: 300 }}
				>
					Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
				</p>
				<div in:fly={{ y: 20, duration: 500, delay: 400 }}>
					<Button href="/contact" variant="primary" size="lg" icon>
						Get In Touch
					</Button>
				</div>
			{/if}
		</div>
	</div>
</section>
