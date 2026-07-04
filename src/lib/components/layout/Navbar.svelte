<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { Menu, X } from 'lucide-svelte';

	let isExpanded = false;
	let mobileOpen = false;
	let collapseTimer;

	function handleMouseEnter() {
		clearTimeout(collapseTimer);
		isExpanded = true;
	}

	function handleMouseLeave() {
		collapseTimer = setTimeout(() => {
			isExpanded = false;
		}, 30000);
	}

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	$: currentPath = $page.url.pathname;
</script>

<!-- Desktop Dynamic Island -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
	<div
		class="relative bg-[#0a0a0a] rounded-full shadow-2xl shadow-black/70 border border-white/[0.08] overflow-hidden glow-pill"
		style="
			width: {isExpanded ? '620px' : '110px'};
			height: {isExpanded ? '50px' : '36px'};
			transition: width 0.6s cubic-bezier(0.32,0.72,0,1), height 0.5s cubic-bezier(0.32,0.72,0,1);
		"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		<!-- Collapsed State -->
		{#if !isExpanded}
			<div
				class="absolute inset-0 flex items-center justify-center gap-2"
				transition:fade={{ duration: 120 }}
			>
				<div class="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex-shrink-0"></div>
				<span class="text-white text-xs font-bold tracking-[0.2em]">HK</span>
			</div>
		{/if}

		<!-- Expanded State -->
		{#if isExpanded}
			<div
				class="absolute inset-0 flex items-center px-5 gap-4"
				transition:fade={{ duration: 150, delay: 120 }}
			>
				<!-- Logo -->
				<a href="/" class="flex items-center gap-2 flex-shrink-0">
					<div class="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500"></div>
					<span class="text-white text-xs font-bold tracking-widest">HK</span>
				</a>

				<!-- Divider -->
				<div class="w-px h-4 bg-white/10 flex-shrink-0"></div>

				<!-- Nav Links -->
				<div class="flex items-center gap-0.5">
					{#each navLinks as link}
						<a
							href={link.href}
							class="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200
								{currentPath === link.href
									? 'bg-white text-black font-semibold'
									: 'text-white/50 hover:text-white hover:bg-white/10'}"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Mobile Dynamic Island -->
<div class="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
	<!-- Pill -->
	<div
		class="relative bg-[#0a0a0a] rounded-full shadow-2xl shadow-black/70 border border-white/[0.08] overflow-hidden glow-pill"
		style="
			width: {mobileOpen ? '160px' : '110px'};
			height: 36px;
			transition: width 0.5s cubic-bezier(0.32,0.72,0,1);
		"
	>
		<div class="absolute inset-0 flex items-center justify-between px-4">
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex-shrink-0"></div>
				<span class="text-white text-xs font-bold tracking-[0.2em]">HK</span>
			</div>
			<button
				class="text-white/50 hover:text-white transition-colors"
				on:click={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
			>
				{#if mobileOpen}
					<X size={14} />
				{:else}
					<Menu size={14} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Dropdown -->
	{#if mobileOpen}
		<div
			class="mt-2 w-48 bg-[#0a0a0a] rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden"
			transition:fly={{ y: -8, duration: 300 }}
		>
			<div class="p-2 space-y-0.5">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-200
							{currentPath === link.href
								? 'bg-white text-black font-semibold'
								: 'text-white/50 hover:text-white hover:bg-white/10'}"
						on:click={() => (mobileOpen = false)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.glow-pill {
		box-shadow:
			0 0 0 1px rgba(139, 92, 246, 0.3),
			0 0 12px 2px rgba(139, 92, 246, 0.2),
			0 0 24px 4px rgba(99, 102, 241, 0.1);
		animation: glow-pulse 3s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%, 100% {
			box-shadow:
				0 0 0 1px rgba(139, 92, 246, 0.3),
				0 0 12px 2px rgba(139, 92, 246, 0.2),
				0 0 24px 4px rgba(99, 102, 241, 0.1);
		}
		50% {
			box-shadow:
				0 0 0 1px rgba(139, 92, 246, 0.6),
				0 0 16px 4px rgba(139, 92, 246, 0.35),
				0 0 32px 8px rgba(99, 102, 241, 0.18);
		}
	}
</style>
