<script>
	import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-svelte';
	import Badge from './Badge.svelte';

	export let post;
</script>

<article class="glass-card overflow-hidden group hover:border-accent/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
	<!-- Image -->
	{#if post.image}
		<div class="relative h-48 overflow-hidden">
			<div class="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
				<span class="text-4xl font-bold gradient-text opacity-50">{post.category}</span>
			</div>
			<div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
		</div>
	{/if}

	<!-- Content -->
	<div class="p-6">
		<!-- Category -->
		{#if post.category}
			<Badge variant="accent" size="sm" class="mb-3">{post.category}</Badge>
		{/if}

		<!-- Title -->
		<h3 class="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
			{post.title}
		</h3>

		<!-- Excerpt -->
		<p class="text-text-secondary text-sm mb-4 line-clamp-3">
			{post.excerpt}
		</p>

		<!-- Meta -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4 text-xs text-text-secondary">
				<span class="flex items-center gap-1">
					<Calendar size={12} />
					{post.date}
				</span>
				<span class="flex items-center gap-1">
					<Clock size={12} />
					{post.readTime}
				</span>
			</div>

			<!-- Read more link -->
			{#if post.externalUrl}
				<a
					href={post.externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
				>
					Read
					<ExternalLink size={14} />
				</a>
			{:else}
				<a
					href="/blog/{post.slug}"
					class="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
				>
					Read
					<ArrowRight size={14} />
				</a>
			{/if}
		</div>
	</div>
</article>
