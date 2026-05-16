<script>
	import { ArrowRight } from 'lucide-svelte';

	export let href = '';
	export let variant = 'primary'; // 'primary' | 'secondary' | 'outline' | 'ghost'
	export let size = 'md'; // 'sm' | 'md' | 'lg'
	export let icon = false;
	export let disabled = false;
	export let type = 'button';
	export let download = null;

	const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-gradient-accent text-white hover:shadow-glow-lg glow-button',
		secondary: 'bg-surface border border-border text-text-primary hover:border-accent hover:text-accent',
		outline: 'border border-accent text-accent hover:bg-accent/10',
		ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface'
	};

	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-sm',
		lg: 'px-8 py-4 text-base'
	};

	$: classes = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
</script>

{#if href}
	<a {href} {download} class={classes} class:disabled>
		<slot />
		{#if icon}
			<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
		{/if}
	</a>
{:else}
	<button {type} {disabled} class={classes} on:click>
		<slot />
		{#if icon}
			<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
		{/if}
	</button>
{/if}
