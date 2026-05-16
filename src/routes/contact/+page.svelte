<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { SectionHeader, Card, Button } from '$lib/components/ui';
	import { Mail, MapPin, Send, Github, Linkedin, BookOpen, Copy, Check } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils';

	let mounted = false;
	let copied = false;

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let errors = {};
	let isSubmitting = false;
	let submitStatus = null;

	const email = 'harshilhk055@gmail.com';

	const contactInfo = [
		{ icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
		{ icon: MapPin, label: 'Location', value: 'Karnataka, India', href: null }
	];

	const socialLinks = [
		{ icon: Github, label: 'GitHub', href: 'https://github.com/harshilhk', username: '@harshilhk' },
		{ icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshil-hk-36b93b25b/', username: '/in/harshil-hk' },
		{ icon: BookOpen, label: 'Hashnode', href: 'https://harshilhk.hashnode.dev/', username: '@harshilhk' }
	];

	function validateForm() {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email';
		}

		if (!formData.subject.trim()) {
			errors.subject = 'Subject is required';
		}

		if (!formData.message.trim()) {
			errors.message = 'Message is required';
		} else if (formData.message.length < 10) {
			errors.message = 'Message must be at least 10 characters';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;
		submitStatus = null;

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Reset form
		formData = { name: '', email: '', subject: '', message: '' };
		isSubmitting = false;
		submitStatus = 'success';

		setTimeout(() => submitStatus = null, 5000);
	}

	async function copyEmail() {
		await copyToClipboard(email);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Contact - Harshil HK</title>
	<meta name="description" content="Get in touch with Harshil HK - Cloud Development Engineer" />
</svelte:head>

<section class="page-padding relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="section-container relative z-10">
		<SectionHeader title="Get In Touch" subtitle="// let's connect" />

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Contact Form -->
			{#if mounted}
				<div in:fly={{ x: -30, duration: 600, delay: 200 }}>
					<Card padding="lg">
						<h3 class="text-xl font-semibold text-text-primary mb-6">Send a Message</h3>

						{#if submitStatus === 'success'}
							<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 mb-6">
								Message sent successfully! I'll get back to you soon.
							</div>
						{/if}

						<form on:submit={handleSubmit} class="space-y-5">
							<!-- Name -->
							<div>
								<label for="name" class="block text-sm font-medium text-text-secondary mb-2">
									Name
								</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									class="w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none transition-colors
										{errors.name ? 'border-red-500' : 'border-border focus:border-accent'}"
									placeholder="Your Name"
								/>
								{#if errors.name}
									<p class="text-red-500 text-sm mt-1">{errors.name}</p>
								{/if}
							</div>

							<!-- Email -->
							<div>
								<label for="email" class="block text-sm font-medium text-text-secondary mb-2">
									Email
								</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									class="w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none transition-colors
										{errors.email ? 'border-red-500' : 'border-border focus:border-accent'}"
									placeholder="your@email.com"
								/>
								{#if errors.email}
									<p class="text-red-500 text-sm mt-1">{errors.email}</p>
								{/if}
							</div>

							<!-- Subject -->
							<div>
								<label for="subject" class="block text-sm font-medium text-text-secondary mb-2">
									Subject
								</label>
								<input
									type="text"
									id="subject"
									bind:value={formData.subject}
									class="w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none transition-colors
										{errors.subject ? 'border-red-500' : 'border-border focus:border-accent'}"
									placeholder="Project Inquiry"
								/>
								{#if errors.subject}
									<p class="text-red-500 text-sm mt-1">{errors.subject}</p>
								{/if}
							</div>

							<!-- Message -->
							<div>
								<label for="message" class="block text-sm font-medium text-text-secondary mb-2">
									Message
								</label>
								<textarea
									id="message"
									bind:value={formData.message}
									rows="5"
									class="w-full px-4 py-3 bg-background border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none transition-colors resize-none
										{errors.message ? 'border-red-500' : 'border-border focus:border-accent'}"
									placeholder="Tell me about your project..."
								></textarea>
								{#if errors.message}
									<p class="text-red-500 text-sm mt-1">{errors.message}</p>
								{/if}
							</div>

							<!-- Submit -->
							<button
								type="submit"
								disabled={isSubmitting}
								class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-accent text-white rounded-lg font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{#if isSubmitting}
									<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Sending...
								{:else}
									<Send size={18} />
									Send Message
								{/if}
							</button>
						</form>
					</Card>
				</div>
			{/if}

			<!-- Contact Info -->
			{#if mounted}
				<div class="space-y-6" in:fly={{ x: 30, duration: 600, delay: 300 }}>
					<!-- Contact details -->
					<Card>
						<h3 class="text-xl font-semibold text-text-primary mb-6">Contact Information</h3>
						<div class="space-y-4">
							{#each contactInfo as { icon: Icon, label, value, href }}
								<div class="flex items-center gap-4">
									<div class="p-3 bg-accent/10 rounded-lg text-accent">
										<Icon size={20} />
									</div>
									<div class="flex-1">
										<p class="text-text-secondary text-sm">{label}</p>
										{#if href}
											<a href={href} class="text-text-primary hover:text-accent transition-colors">
												{value}
											</a>
										{:else}
											<p class="text-text-primary">{value}</p>
										{/if}
									</div>
									{#if label === 'Email'}
										<button
											on:click={copyEmail}
											class="p-2 text-text-secondary hover:text-accent transition-colors"
											aria-label="Copy email"
										>
											{#if copied}
												<Check size={18} class="text-green-500" />
											{:else}
												<Copy size={18} />
											{/if}
										</button>
									{/if}
								</div>
							{/each}
						</div>
					</Card>

					<!-- Social links -->
					<Card>
						<h3 class="text-xl font-semibold text-text-primary mb-6">Connect with Me</h3>
						<div class="space-y-4">
							{#each socialLinks as { icon: Icon, label, href, username }}
								<a
									{href}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-4 p-3 rounded-lg hover:bg-surface transition-colors group"
								>
									<div class="p-3 bg-surface border border-border rounded-lg text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors">
										<Icon size={20} />
									</div>
									<div class="flex-1">
										<p class="text-text-primary font-medium group-hover:text-accent transition-colors">{label}</p>
										<p class="text-text-secondary text-sm">{username}</p>
									</div>
								</a>
							{/each}
						</div>
					</Card>

					<!-- Availability -->
					<Card gradient>
						<div class="flex items-center gap-3">
							<div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
							<div>
								<p class="text-text-primary font-medium">Let's Connect</p>
								<p class="text-text-secondary text-sm">Open for networking & discussions</p>
							</div>
						</div>
					</Card>
				</div>
			{/if}
		</div>
	</div>
</section>
