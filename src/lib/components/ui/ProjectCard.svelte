<script>
	import { ExternalLink, Github } from 'lucide-svelte';
	import Badge from './Badge.svelte';

	export let project;

	// Generate a unique gradient based on project id
	const gradients = [
		'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
		'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
		'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
		'from-orange-500/20 via-red-500/20 to-pink-500/20',
		'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
		'from-blue-500/20 via-indigo-500/20 to-violet-500/20',
		'from-rose-500/20 via-pink-500/20 to-purple-500/20'
	];

	$: gradient = gradients[(project.id - 1) % gradients.length];
</script>

<article class="glass-card overflow-hidden group hover:border-accent/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
	<!-- Animated Header -->
	<div class="relative h-48 overflow-hidden bg-surface">
		<!-- Animated gradient background -->
		<div class="absolute inset-0 bg-gradient-to-br {gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

		<!-- Animated mesh/grid pattern -->
		<div class="absolute inset-0 opacity-30">
			<div class="absolute inset-0" style="
				background-image:
					linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
					linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
				background-size: 20px 20px;
				animation: gridMove 20s linear infinite;
			"></div>
		</div>

		<!-- Floating orbs -->
		<div class="absolute top-4 right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
		<div class="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>

		<!-- Project title overlay -->
		<div class="absolute inset-0 flex items-center justify-center">
			<span class="text-2xl font-bold text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 text-center px-4">
				{project.title}
			</span>
		</div>

		<!-- Hover overlay with links -->
		<div class="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="p-3 bg-accent rounded-full text-white hover:bg-accent-glow hover:scale-110 transition-all duration-200 shadow-glow"
					aria-label="Live demo"
				>
					<ExternalLink size={20} />
				</a>
			{/if}
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="p-3 bg-surface border border-border rounded-full text-text-primary hover:border-accent hover:text-accent hover:scale-110 transition-all duration-200"
					aria-label="View source"
				>
					<Github size={20} />
				</a>
			{/if}
			{#if project.githubUrls}
				<div class="flex flex-col gap-2 max-h-40 overflow-y-auto p-2">
					{#each project.githubUrls as repo}
						<a
							href={repo.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-text-primary hover:border-accent hover:text-accent transition-all duration-200 text-sm"
						>
							<Github size={16} />
							<span>{repo.name}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Content -->
	<div class="p-6">
		<!-- Featured badge -->
		{#if project.featured}
			<div class="mb-3">
				<Badge variant="accent" size="sm">Featured</Badge>
			</div>
		{/if}

		<!-- Title -->
		<h3 class="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
			{project.title}
		</h3>

		<!-- Description -->
		<p class="text-text-secondary text-sm mb-4 line-clamp-2">
			{project.description}
		</p>

		<!-- Tech stack -->
		<div class="flex flex-wrap gap-2">
			{#each project.technologies.slice(0, 4) as tech}
				<Badge size="sm">{tech}</Badge>
			{/each}
			{#if project.technologies.length > 4}
				<Badge size="sm">+{project.technologies.length - 4}</Badge>
			{/if}
		</div>
	</div>
</article>

<style>
	@keyframes gridMove {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(20px, 20px);
		}
	}
</style>
