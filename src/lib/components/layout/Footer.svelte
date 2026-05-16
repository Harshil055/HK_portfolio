<script>
	import { Github, Linkedin, BookOpen, Mail, ArrowUp } from 'lucide-svelte';

	const socialLinks = [
		{ icon: Github, href: 'https://github.com/harshilhk', label: 'GitHub' },
		{ icon: Linkedin, href: 'https://www.linkedin.com/in/harshil-hk-36b93b25b/', label: 'LinkedIn' },
		{ icon: BookOpen, href: 'https://harshilhk.hashnode.dev/', label: 'Blog' },
		{ icon: Mail, href: 'mailto:harshilhk@example.com', label: 'Email' }
	];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="border-t border-border bg-surface/50">
	<div class="section-container py-12">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<!-- Logo & Copyright -->
			<div class="flex flex-col items-center md:items-start gap-2">
				<a href="/" class="text-xl font-bold gradient-text">Harshil HK</a>
				<p class="text-text-secondary text-sm">
					&copy; {new Date().getFullYear()} All rights reserved.
				</p>
			</div>

			<!-- Social Links -->
			<div class="flex items-center gap-4">
				{#each socialLinks as { icon: Icon, href, label }}
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer"
						class="p-2 text-text-secondary hover:text-accent transition-all duration-200 hover:scale-110"
						aria-label={label}
					>
						<Icon size={20} />
					</a>
				{/each}
			</div>

			<!-- Built with & Back to top -->
			<div class="flex items-center gap-4">
				<span class="text-text-secondary text-sm flex items-center gap-2">
					Built with
					<span class="text-accent font-medium">SvelteKit</span>
				</span>
				<button
					on:click={scrollToTop}
					class="p-2 rounded-full bg-surface border border-border text-text-secondary
						hover:text-accent hover:border-accent transition-all duration-200 hover:-translate-y-1"
					aria-label="Back to top"
				>
					<ArrowUp size={18} />
				</button>
			</div>
		</div>
	</div>
</footer>
