export { typewriter, fadeScale, slideUp, stagger, observeIntersection } from './animations.js';

export function formatDate(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(date);
}

export function truncate(text, length = 100) {
	if (text.length <= length) return text;
	return text.slice(0, length).trim() + '...';
}

export function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function copyToClipboard(text) {
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text);
	}
	// Fallback for older browsers
	const textarea = document.createElement('textarea');
	textarea.value = text;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
	return Promise.resolve();
}

export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
