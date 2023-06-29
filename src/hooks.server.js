/** @type {import('@sveltejs/kit').HandleClientError} */
// this will surpress error, comment it when you need to see error message.
export function handleError({ error, event }) {
	console.error(error);
	return {
		message: '錯誤'
	};
}
