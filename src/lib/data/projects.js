export const projects = [
	{
		id: 2,
		title: 'Flasqo',
		description: 'Advanced testing framework for modern applications. Streamline your testing workflow with automated test generation, real-time reporting, and comprehensive test coverage analysis.',
		image: '/images/projects/fluxtest.jpg',
		technologies: ['TypeScript', 'Testing', 'CI/CD', 'Automation'],
		liveUrl: 'http://flasqo.com/',
		githubUrl: '',
		featured: true,
		category: 'Full Stack'
	},
	{
		id: 3,
		title: 'GIS-AI Application',
		description: 'Geographic Information System powered by AI for spatial data analysis, mapping, and location-based insights.',
		image: '/images/projects/gis-ai.jpg',
		technologies: ['Python', 'TensorFlow', 'MapBox', 'PostGIS'],
		liveUrl: '',
		githubUrl: '',
		featured: true,
		category: 'AI/ML'
	},
	{
		id: 4,
		title: 'AI-based Attendance System',
		description: 'Real-time facial attendance tracking system with high accuracy detection, automating attendance management using AI and computer vision.',
		image: '/images/projects/facial-recognition.jpg',
		technologies: ['Python', 'OpenCV', 'Deep Learning', 'Flask'],
		liveUrl: '',
		githubUrl: 'https://github.com/HHK05/AI-based-attendence-System',
		featured: false,
		category: 'AI/ML'
	},
	{
		id: 5,
		title: 'AI Code Explainer Extension',
		description: 'VS Code extension that uses AI to explain code snippets, helping developers understand complex code with smart explanations and automation tools.',
		image: '/images/projects/vscode-ext.jpg',
		technologies: ['TypeScript', 'VS Code API', 'Node.js', 'AI'],
		liveUrl: '',
		githubUrl: 'https://github.com/HHK05/AI_code_explainer_extension',
		featured: false,
		category: 'Developer Tools'
	},
	{
		id: 6,
		title: 'Real-time Data Pipeline',
		description: 'Scalable data pipeline using Apache Pulsar and Spark for processing millions of events in real-time.',
		image: '/images/projects/data-pipeline.jpg',
		technologies: ['Apache Pulsar', 'Spark', 'Kubernetes', 'Java'],
		liveUrl: '',
		githubUrl: 'https://github.com/HHK05/Apache_Pulsar',
		featured: false,
		category: 'Backend'
	},
	{
		id: 7,
		title: 'Spring Boot Microservices',
		description: 'Suite of 5 production-ready microservices including Limits Service, API Gateway, Name Server, Payment Gateway Exchange, and Payment Gateway Conversion. Built with REST APIs, fault tolerance using Resilience4j, and service discovery.',
		image: '/images/projects/microservices.jpg',
		technologies: ['Spring Boot', 'JPA', 'Feign', 'Resilience4j', 'Docker'],
		liveUrl: '',
		githubUrls: [
			{ name: 'Limits Service', url: 'https://github.com/HHK05/limits-service' },
			{ name: 'API Gateway', url: 'https://github.com/HHK05/API-Gateway' },
			{ name: 'Name Server', url: 'https://github.com/HHK05/name-server' },
			{ name: 'Payment Exchange', url: 'https://github.com/HHK05/payment-gateway-exchange' },
			{ name: 'Payment Conversion', url: 'https://github.com/HHK05/payment-gateway-conversion' }
		],
		featured: false,
		category: 'Backend'
	}
];

export const categories = ['All', 'AI/ML', 'Developer Tools', 'Backend', 'Full Stack'];
