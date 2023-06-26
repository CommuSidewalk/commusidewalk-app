import sql from '$lib/server/utils/db';
import TimeCache from '$lib/server/utils/timer-cache';
import { error, json } from '@sveltejs/kit';

const cache = new TimeCache();

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	const event_id = e.params.event_id;
	let data = cache.get(event_id);
	if (!data) {
		try {
			data = await sql`select * from general_events_view where event_id = ${event_id}`;
			data = data[0];
			cache.set(event_id, data, 7, TimeCache.DAYS);
		} catch (err) {
			console.log(err);
			throw error(500);
		}
	}
	return json({ data });
}
