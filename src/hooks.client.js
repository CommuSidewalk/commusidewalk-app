/** @type {import('@sveltejs/kit').HandleClientError} */
export function handleError({ error, event }) {
	return {
		message: 'Whoops!'
	};
}
