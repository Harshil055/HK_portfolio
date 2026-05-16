<script>
	export let hover = true;
	export let padding = 'md'; // 'none' | 'sm' | 'md' | 'lg'
	export let gradient = false;

	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	$: paddingClass = paddings[padding];
</script>

<div
	class="glass-card {paddingClass} transition-all duration-300
		{hover ? 'hover:border-accent/50 hover:shadow-glow hover:-translate-y-1' : ''}
		{gradient ? 'gradient-border' : ''}"
>
	<slot />
</div>
