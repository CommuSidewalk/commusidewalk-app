/** @type {import('@sveltejs/kit').HandleClientError} */
export function handleError({ error, event }) {
	return {
		message: '錯誤'
	};
}
