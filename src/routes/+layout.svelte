<script>
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	$: key = $page.url.pathname;
</script>

<div class="min-h-screen flex flex-col">
	<Navbar />

	{#key key}
		<main class="flex-1" in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
			<slot />
		</main>
	{/key}

	<Footer />
</div>
