<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { SectionHeader, Card, Badge } from '$lib/components/ui';
	import { Code2, Coffee, GitBranch, Award, MapPin, Briefcase, Trophy } from 'lucide-svelte';

	let mounted = false;

	const stats = [
		{ icon: Code2, value: '30+', label: 'Projects Completed' },
		{ icon: Coffee, value: '5+', label: 'Apps Scaled to 100+ Users' },
		{ icon: GitBranch, value: '4+', label: 'Microservices Delivered' },
		{ icon: Award, value: '1+', label: 'Years Experience' }
	];

	const skills = {
		'Languages': ['Java', 'Rust', 'TypeScript', 'Python', 'SQL'],
		'Backend': ['Spring Boot', 'REST APIs', 'JPA', 'Feign', 'Resilience4j', 'Node.js'],
		'Cloud & DevOps': ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'Apache Pulsar', 'Spark'],
		'Tools & Others': ['Git', 'VS Code', 'Microservices', 'GIS-AI', 'Facial Recognition']
	};

	const achievements = [
		{ icon: Trophy, title: 'Gold Medalist - IndiaSkills 2024', desc: 'Karnataka State - IT Software Solutions' },
		{ icon: Trophy, title: 'National Finalist - IndiaSkills', desc: 'Represented Karnataka in Delhi' },
		{ icon: Award, title: 'I-Summit PitchArena Finalist', desc: 'IIT Madras' },
		{ icon: Award, title: 'Startup Mahakumbh 2024', desc: 'College Representative' }
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>About - Harshil HK</title>
	<meta name="description" content="Learn more about Harshil HK - Cloud Development Engineer & AI Product Builder" />
</svelte:head>

<section class="page-padding">
	<div class="section-container">
		<SectionHeader title="About Me" subtitle="// who am I" />

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
			<!-- Photo / Visual -->
			{#if mounted}
				<div
					class="relative"
					in:fly={{ x: -30, duration: 600, delay: 200 }}
				>
					<div class="glass-card p-2 gradient-border">
						<div class="aspect-square rounded-lg overflow-hidden">
							<img
								src="/images/profile.jpg"
								alt="Harshil HK at IIT Madras"
								class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>
					</div>

					<!-- Floating decorative elements -->
					<div class="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
					<div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
				</div>

				<!-- Bio Content -->
				<div
					class="space-y-6"
					in:fly={{ x: 30, duration: 600, delay: 300 }}
				>
					<div class="flex items-center gap-4 text-text-secondary">
						<span class="flex items-center gap-2">
							<MapPin size={16} class="text-accent" />
							Karnataka, India
						</span>
						<span class="flex items-center gap-2">
							<Briefcase size={16} class="text-accent" />
							@ Bristlecone India
						</span>
					</div>

					<h3 class="text-2xl font-semibold text-text-primary">
						Building Scalable Systems & AI Products
					</h3>

					<div class="space-y-4 text-text-secondary">
						<p>
							I'm Harshil HK, an Associate Cloud Development Engineer at Bristlecone India. I specialize in building scalable systems and AI-powered products that solve real-world problems.
						</p>
						<p>
							My expertise spans real-time data pipelines using Apache Pulsar & Spark, microservices deployment with Kubernetes, and backend engineering with Spring Boot. I've delivered 4+ production-ready microservices with REST APIs, JPA, Feign, and Resilience4j.
						</p>
						<p>
							I've also engineered GIS-AI applications, facial recognition systems, and developer tools including a custom VS Code extension. Passionate about clean architecture, open-source innovation, and continuous learning.
						</p>
					</div>

					<!-- Quick Info -->
					<div class="flex flex-wrap gap-3">
						<Badge variant="accent">Rust</Badge>
						<Badge variant="accent">Java</Badge>
						<Badge variant="accent">AWS</Badge>
						<Badge variant="accent">Kubernetes</Badge>
						<Badge variant="accent">Spring Boot</Badge>
					</div>
				</div>
			{/if}
		</div>

		<!-- Stats Section -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
			{#if mounted}
				{#each stats as { icon: Icon, value, label }, i}
					<div in:fly={{ y: 30, duration: 500, delay: 400 + i * 100 }}>
						<Card>
							<div class="text-center">
								<div class="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent mb-3">
									<Icon size={24} />
								</div>
								<p class="text-3xl font-bold gradient-text">{value}</p>
								<p class="text-text-secondary text-sm mt-1">{label}</p>
							</div>
						</Card>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Achievements Section -->
		<div class="mb-16">
			<h3 class="text-2xl font-semibold text-text-primary text-center mb-8">
				Achievements & Recognition
			</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#if mounted}
					{#each achievements as { icon: Icon, title, desc }, i}
						<div in:fly={{ y: 30, duration: 500, delay: 500 + i * 100 }}>
							<Card>
								<div class="flex items-start gap-4">
									<div class="p-3 bg-accent/10 rounded-lg text-accent">
										<Icon size={24} />
									</div>
									<div>
										<h4 class="text-lg font-semibold text-text-primary">{title}</h4>
										<p class="text-text-secondary text-sm">{desc}</p>
									</div>
								</div>
							</Card>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Skills Section -->
		<div class="mb-16">
			<h3 class="text-2xl font-semibold text-text-primary text-center mb-8">
				Tech Stack
			</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#if mounted}
					{#each Object.entries(skills) as [category, items], i}
						<div in:fly={{ y: 30, duration: 500, delay: 700 + i * 100 }}>
							<Card>
								<h4 class="text-accent font-mono text-sm mb-4">// {category}</h4>
								<div class="flex flex-wrap gap-2">
									{#each items as skill}
										<Badge variant="outline">{skill}</Badge>
									{/each}
								</div>
							</Card>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Philosophy Section -->
		<div class="max-w-3xl mx-auto">
			{#if mounted}
				<div in:fly={{ y: 30, duration: 500, delay: 900 }}>
					<Card gradient>
						<h3 class="text-xl font-semibold text-text-primary mb-4 text-center">
							My Philosophy
						</h3>
						<div class="space-y-4 text-text-secondary text-center">
							<p>
								<span class="text-accent font-mono">"</span>
								Building AI & Products with a passion for learning technologies and applying them. I believe in clean architecture, continuous innovation, and creating software that makes a real impact.
								<span class="text-accent font-mono">"</span>
							</p>
						</div>
					</Card>
				</div>
			{/if}
		</div>
	</div>
</section>
