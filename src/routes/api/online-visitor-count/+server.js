import TimeCache from '$lib/server/utils/timer-cache';
import { json } from '@sveltejs/kit';

let visitorCount = 0;

/** @type {import('./$types').RequestHandler} */
export async function POST(e) {
	visitorCount += 1;
	setTimeout(() => {
		visitorCount -= 1;
	}, TimeCache.MINUTES * 5);

	return json({ data: visitorCount });
}

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	return json({ data: visitorCount });
}
