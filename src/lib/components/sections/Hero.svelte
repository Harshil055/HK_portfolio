<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Github, Linkedin, Twitter, Mail, ArrowDown, Download, BookOpen } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const roles = ['Cloud Development Engineer', 'Backend Engineer', 'AI & Product Builder', 'Open Source Enthusiast'];
	let currentRole = 0;
	let displayedText = '';
	let isDeleting = false;
	let mounted = false;

	const socialLinks = [
		{ icon: Github, href: 'https://github.com/harshilhk', label: 'GitHub' },
		{ icon: Linkedin, href: 'https://www.linkedin.com/in/harshil-hk-36b93b25b/', label: 'LinkedIn' },
		{ icon: BookOpen, href: 'https://harshilhk.hashnode.dev/', label: 'Blog' },
		{ icon: Mail, href: 'mailto:harshilhk@example.com', label: 'Email' }
	];

	onMount(() => {
		mounted = true;
		typeWriter();
	});

	function typeWriter() {
		const currentText = roles[currentRole];
		const speed = isDeleting ? 30 : 80;

		if (!isDeleting && displayedText === currentText) {
			setTimeout(() => {
				isDeleting = true;
				typeWriter();
			}, 2000);
			return;
		}

		if (isDeleting && displayedText === '') {
			isDeleting = false;
			currentRole = (currentRole + 1) % roles.length;
			setTimeout(typeWriter, 500);
			return;
		}

		if (isDeleting) {
			displayedText = currentText.substring(0, displayedText.length - 1);
		} else {
			displayedText = currentText.substring(0, displayedText.length + 1);
		}

		setTimeout(typeWriter, speed);
	}

	function scrollToContent() {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
	}
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-background">
		<!-- Grid pattern -->
		<div class="absolute inset-0 grid-pattern opacity-50"></div>

		<!-- Gradient orbs -->
		<div class="gradient-orb gradient-orb-1"></div>
		<div class="gradient-orb gradient-orb-2"></div>

		<!-- Floating particles -->
		{#each Array(20) as _, i}
			<div
				class="particle"
				style="
					left: {Math.random() * 100}%;
					top: {Math.random() * 100}%;
					animation-delay: {Math.random() * 6}s;
					animation-duration: {4 + Math.random() * 4}s;
				"
			></div>
		{/each}
	</div>

	<!-- Content -->
	<div class="relative z-10 section-container text-center">
		{#if mounted}
			<!-- Greeting -->
			<p
				class="text-accent font-mono text-sm md:text-base mb-4"
				in:fly={{ y: 20, duration: 600, delay: 200 }}
			>
				Hello, I'm
			</p>

			<!-- Name -->
			<h1
				class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
				in:fly={{ y: 20, duration: 600, delay: 400 }}
			>
				<span class="gradient-text">Harshil HK</span>
			</h1>

			<!-- Role with typewriter -->
			<div
				class="h-12 md:h-14 flex items-center justify-center mb-8"
				in:fly={{ y: 20, duration: 600, delay: 600 }}
			>
				<p class="text-xl md:text-2xl lg:text-3xl text-text-secondary">
					<span class="text-text-primary">{displayedText}</span>
					<span class="inline-block w-0.5 h-6 md:h-8 bg-accent ml-1 animate-blink"></span>
				</p>
			</div>

			<!-- Description -->
			<p
				class="text-text-secondary max-w-2xl mx-auto mb-10 text-base md:text-lg"
				in:fly={{ y: 20, duration: 600, delay: 800 }}
			>
				Building scalable systems & AI products. Gold Medalist @ IndiaSkills 2024.
				Passionate about clean architecture, real-time data pipelines, and open-source innovation.
			</p>

			<!-- CTA Buttons -->
			<div
				class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
				in:fly={{ y: 20, duration: 600, delay: 1000 }}
			>
				<Button href="/projects" variant="primary" size="lg">
					View My Work
				</Button>
				<Button href="/Harshil_HK_CV.pdf" download="Harshil_HK_CV.pdf" variant="secondary" size="lg">
					<Download size={18} />
					Download CV
				</Button>
			</div>

			<!-- Social Links -->
			<div
				class="flex items-center justify-center gap-6"
				in:fly={{ y: 20, duration: 600, delay: 1200 }}
			>
				{#each socialLinks as { icon: Icon, href, label }, i}
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer"
						class="p-3 text-text-secondary hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1"
						aria-label={label}
						style="animation-delay: {1400 + i * 100}ms"
					>
						<Icon size={24} />
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Scroll indicator -->
	<button
		class="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary hover:text-accent transition-colors animate-bounce"
		on:click={scrollToContent}
		aria-label="Scroll down"
	>
		<ArrowDown size={28} />
	</button>
</section>
