<script>
	export let title = '';
	export let subtitle = '';
	export let align = 'center'; // 'left' | 'center'
</script>

<div class="mb-12 {align === 'center' ? 'text-center' : 'text-left'}">
	{#if subtitle}
		<p class="text-accent font-mono text-sm mb-2 animate-fade-in">{subtitle}</p>
	{/if}
	<h2 class="text-3xl md:text-4xl font-bold text-text-primary animate-fade-in-up">
		{title}
	</h2>
	<div class="mt-4 {align === 'center' ? 'mx-auto' : ''} w-20 h-1 bg-gradient-accent rounded-full animate-scale-in"></div>
</div>
