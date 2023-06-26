import sql from '$lib/server/utils/db';
import TimeCache from '$lib/server/utils/timer-cache';
import { error, json } from '@sveltejs/kit';

const cache = new TimeCache();

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	const event_id = e.url.searchParams.get('event_id');
	if (event_id === null) {
		throw error(404);
	}

	let data = cache.get(event_id);
	if (!data) {
		try {
			data =
				await sql`select * from detail_events_view where event_id = ${event_id} order by party_order`;
			cache.set(event_id, data, 7, TimeCache.DAYS);
		} catch (err) {
			console.log(err);
			throw error(500);
		}
	}
	return json({ data });
}
