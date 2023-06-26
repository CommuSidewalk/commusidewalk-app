import { getLatestDataDate } from '$lib/server/get-latest-data-date';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const date = await getLatestDataDate();
		return json({ date });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}
