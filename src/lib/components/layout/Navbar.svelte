<script>
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let isOpen = false;

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	$: currentPath = $page.url.pathname;
</script>

<!-- Floating Navbar Container -->
<div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
	<nav class="glass border border-border rounded-2xl shadow-lg shadow-black/20">
		<div class="px-6">
			<div class="flex items-center justify-between h-14">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-2 group" on:click={closeMenu}>
					<span class="text-lg font-bold gradient-text">HK's Portfolio</span>
				</a>

				<!-- Desktop Navigation - Centered -->
				<div class="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
					{#each navLinks as link}
						<a
							href={link.href}
							class="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg
								{currentPath === link.href
									? 'text-accent bg-accent/10'
									: 'text-text-secondary hover:text-text-primary hover:bg-white/5'}"
						>
							{link.label}
							{#if currentPath === link.href}
								<span
									class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
									in:fade={{ duration: 200 }}
								></span>
							{/if}
						</a>
					{/each}
				</div>

				<!-- Right side - placeholder for balance -->
				<div class="hidden md:block w-8"></div>

				<!-- Mobile Menu Button -->
				<button
					class="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
					on:click={toggleMenu}
					aria-label="Toggle menu"
				>
					{#if isOpen}
						<X size={22} />
					{:else}
						<Menu size={22} />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if isOpen}
			<div
				class="md:hidden border-t border-border"
				transition:fly={{ y: -10, duration: 200 }}
			>
				<div class="px-4 py-3 space-y-1">
					{#each navLinks as link, i}
						<a
							href={link.href}
							class="block py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200
								{currentPath === link.href
									? 'text-accent bg-accent/10'
									: 'text-text-secondary hover:text-text-primary hover:bg-white/5'}"
							on:click={closeMenu}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</div>
