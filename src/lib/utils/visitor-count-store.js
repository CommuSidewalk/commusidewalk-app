import { readable } from 'svelte/store';

const FIVE_MINUTES = 1000 * 60 * 5;

export const visitorCount = readable(0, function start(set) {
	function fetchVisitorCount() {
		const lastUpdate = sessionStorage.getItem('lastUpdate');
		let timestamp;
		if (lastUpdate === null) {
			timestamp = new Date();
			fetch('/api/online-visitor-count', { method: 'POST' })
				.then((res) => res.json())
				.then(({ data }) => {
					sessionStorage.setItem('lastUpdate', new Date().getTime().toString());
					set(data);
				});
		} else {
			timestamp = new Date(parseInt(lastUpdate));
			timestamp.setMinutes(timestamp.getMinutes() + 5);

			if (timestamp <= new Date()) {
				fetch('/api/online-visitor-count', { method: 'POST' })
					.then((res) => res.json())
					.then(({ data }) => {
						sessionStorage.setItem('lastUpdate', new Date().getTime().toString());
						set(data);
					});
			} else {
				fetch('/api/online-visitor-count', { method: 'GET' })
					.then((res) => res.json())
					.then(({ data }) => {
						set(data);
					});
			}
		}
	}

	fetchVisitorCount();

	const interval = setInterval(fetchVisitorCount, FIVE_MINUTES);

	return function stop() {
		clearInterval(interval);
	};
});
