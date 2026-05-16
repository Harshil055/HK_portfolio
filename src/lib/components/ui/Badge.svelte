<script>
	export let variant = 'default'; // 'default' | 'accent' | 'outline'
	export let size = 'md'; // 'sm' | 'md'

	const variants = {
		default: 'bg-surface border border-border text-text-secondary',
		accent: 'bg-accent/10 border border-accent/30 text-accent',
		outline: 'border border-border text-text-secondary hover:border-accent hover:text-accent'
	};

	const sizes = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm'
	};
</script>

<span class="inline-flex items-center gap-1 rounded-full font-medium transition-colors duration-200 {variants[variant]} {sizes[size]}">
	<slot />
</span>
