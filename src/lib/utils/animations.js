import { cubicOut, quintOut } from 'svelte/easing';

export function typewriter(node, { speed = 50, delay = 0 }) {
	const text = node.textContent;
	const duration = text.length * speed;

	return {
		delay,
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}

export function fadeScale(node, { delay = 0, duration = 300, easing = cubicOut, start = 0.95 }) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t) => `
			opacity: ${t * opacity};
			transform: ${transform} scale(${start + (1 - start) * t});
		`
	};
}

export function slideUp(node, { delay = 0, duration = 400, easing = quintOut, y = 20 }) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;

	return {
		delay,
		duration,
		easing,
		css: (t) => `
			opacity: ${t * opacity};
			transform: translateY(${(1 - t) * y}px);
		`
	};
}

export function stagger(index, baseDelay = 0, increment = 100) {
	return baseDelay + index * increment;
}

export function observeIntersection(node, options = {}) {
	const { threshold = 0.1, rootMargin = '0px', onIntersect } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					if (onIntersect) onIntersect(entry);
					if (!options.repeat) observer.unobserve(node);
				} else if (options.repeat) {
					node.classList.remove('in-view');
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
