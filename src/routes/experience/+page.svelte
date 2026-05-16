<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { SectionHeader, Timeline, Card, Badge } from '$lib/components/ui';
	import { experiences, achievements, certifications } from '$lib/data';
	import { GraduationCap, Award, FileText, Trophy, BadgeCheck } from 'lucide-svelte';

	let mounted = false;

	const education = [
		{
			degree: 'B.E. / B.Tech',
			school: 'Dayananda Sagar Academy of Technology and Management',
			year: '2021 - 2025',
			description: 'CGPA: 8.5. Focus on software engineering, cloud computing, and AI systems.'
		}
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Experience - Harshil HK</title>
	<meta name="description" content="Professional experience and career journey of Harshil HK - Cloud Development Engineer" />
</svelte:head>

<section class="page-padding">
	<div class="section-container">
		<SectionHeader title="Experience" subtitle="// career journey" />

		<!-- Timeline -->
		{#if mounted}
			<div class="mb-20" in:fly={{ y: 30, duration: 600, delay: 200 }}>
				<Timeline items={experiences} />
			</div>
		{/if}

		<!-- Education & Achievements Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
			<!-- Education -->
			{#if mounted}
				<div in:fly={{ x: -30, duration: 600, delay: 400 }}>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-accent/10 rounded-lg text-accent">
							<GraduationCap size={24} />
						</div>
						<h3 class="text-2xl font-semibold text-text-primary">Education</h3>
					</div>

					{#each education as edu}
						<Card>
							<h4 class="text-lg font-semibold text-text-primary mb-1">{edu.degree}</h4>
							<p class="text-accent font-medium mb-2">{edu.school}</p>
							<p class="text-text-secondary text-sm mb-3">{edu.year}</p>
							<p class="text-text-secondary">{edu.description}</p>
						</Card>
					{/each}
				</div>
			{/if}

			<!-- Achievements -->
			{#if mounted}
				<div in:fly={{ x: 30, duration: 600, delay: 500 }}>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-accent/10 rounded-lg text-accent">
							<Trophy size={24} />
						</div>
						<h3 class="text-2xl font-semibold text-text-primary">Achievements</h3>
					</div>

					<div class="space-y-4">
						{#each achievements as achievement, i}
							<Card>
								<div class="flex items-start justify-between">
									<div>
										<h4 class="text-lg font-semibold text-text-primary mb-1">{achievement.title}</h4>
										<p class="text-text-secondary text-sm">{achievement.description}</p>
									</div>
									<Badge variant="accent">{achievement.year}</Badge>
								</div>
							</Card>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Certifications Section -->
		{#if mounted}
			<div class="mb-16" in:fly={{ y: 30, duration: 600, delay: 600 }}>
				<div class="flex items-center gap-3 mb-8 justify-center">
					<div class="p-2 bg-accent/10 rounded-lg text-accent">
						<BadgeCheck size={24} />
					</div>
					<h3 class="text-2xl font-semibold text-text-primary">Certifications</h3>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each certifications as cert, i}
						<div in:fly={{ y: 20, duration: 400, delay: 700 + i * 100 }}>
							<Card>
								<div class="flex flex-col h-full">
									<div class="flex items-start justify-between mb-3">
										<h4 class="text-lg font-semibold text-text-primary leading-tight">{cert.name}</h4>
									</div>
									<p class="text-accent font-medium text-sm mb-2">{cert.issuer}</p>
									<p class="text-text-secondary text-xs mb-4">Issued {cert.year}</p>
									<div class="flex flex-wrap gap-2 mt-auto">
										{#each cert.skills.slice(0, 3) as skill}
											<Badge size="sm" variant="outline">{skill}</Badge>
										{/each}
										{#if cert.skills.length > 3}
											<Badge size="sm" variant="outline">+{cert.skills.length - 3}</Badge>
										{/if}
									</div>
								</div>
							</Card>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Resume Download -->
		{#if mounted}
			<div class="text-center" in:fly={{ y: 30, duration: 600, delay: 800 }}>
				<Card gradient>
					<div class="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
						<div class="flex items-center gap-3 text-text-primary">
							<FileText size={24} class="text-accent" />
							<span class="text-lg font-medium">Want the full picture?</span>
						</div>
						<a
							href="/Harshil_HK_CV.pdf"
							download="Harshil_HK_CV.pdf"
							class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-glow transition-colors"
						>
							Download Resume
						</a>
					</div>
				</Card>
			</div>
		{/if}
	</div>
</section>
