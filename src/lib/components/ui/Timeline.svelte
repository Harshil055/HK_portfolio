<script>
	import { Calendar, MapPin, Building2 } from 'lucide-svelte';
	import Badge from './Badge.svelte';

	export let items = [];
</script>

<div class="relative">
	<!-- Timeline line -->
	<div class="timeline-line"></div>

	<!-- Timeline items -->
	<div class="space-y-12">
		{#each items as item, index}
			<div
				class="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
				style="animation-delay: {index * 100}ms"
			>
				<!-- Timeline dot -->
				<div class="timeline-dot top-2"></div>

				<!-- Content -->
				<div
					class="{index % 2 === 0 ? 'md:col-start-1 md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}"
				>
					<div class="glass-card p-6 hover:border-accent/50 hover:shadow-glow transition-all duration-300">
						<!-- Header -->
						<div class="flex flex-col {index % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-2 mb-4">
							<h3 class="text-xl font-semibold text-text-primary">{item.title}</h3>
							<div class="flex items-center gap-2 text-accent">
								<Building2 size={16} />
								<span class="font-medium">{item.company}</span>
							</div>
						</div>

						<!-- Meta -->
						<div class="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4 {index % 2 === 0 ? 'md:justify-end' : ''}">
							<span class="flex items-center gap-1">
								<Calendar size={14} />
								{item.duration}
							</span>
							{#if item.location}
								<span class="flex items-center gap-1">
									<MapPin size={14} />
									{item.location}
								</span>
							{/if}
						</div>

						<!-- Description -->
						<p class="text-text-secondary mb-4">{item.description}</p>

						<!-- Technologies -->
						{#if item.technologies?.length}
							<div class="flex flex-wrap gap-2 {index % 2 === 0 ? 'md:justify-end' : ''}">
								{#each item.technologies as tech}
									<Badge size="sm" variant="accent">{tech}</Badge>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
