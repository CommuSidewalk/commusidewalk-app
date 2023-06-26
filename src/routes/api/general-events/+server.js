import sql from '$lib/server/utils/db';
import TimeCache from '$lib/server/utils/timer-cache';
import { createEvent2Color } from '$lib/utils/create-event-2-color';
import { isValidISODateString } from '$lib/utils/date-utils';
import { error, json } from '@sveltejs/kit';

const cache = new TimeCache();

const columns = [
	'event_id',
	'accident_category_name',
	'latitude',
	'longitude',
	'number_of_deaths',
	'number_of_injuries',
	'occurrence_date'
];

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	const startDate = e.url.searchParams.get('startDate');
	const endDate = e.url.searchParams.get('endDate');

	if (!isValidISODateString(startDate) && startDate !== null) {
		throw error(400);
	} else if (!isValidISODateString(endDate) && endDate !== null) {
		throw error(400);
	}

	const key = startDate + endDate + '';
	let data = cache.get(key);
	if (!data) {
		try {
			if (startDate === null && endDate === null) {
				data = await sql`select ${sql(columns)} from general_events_view`;
			} else if (endDate === null) {
				data = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date >= ${startDate}`;
			} else if (startDate === null) {
				data = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date <= ${endDate}`;
			} else {
				data = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date >= ${startDate} and occurrence_date <= ${endDate}`;
			}
			const event2Color = createEvent2Color(data);
			data.map((ev) => {
				ev.color = event2Color(ev);
				return {
					event_id: ev.event_id,
					latitude: ev.latitude,
					longitude: ev.longitude,
					color: ev.color,
					occurrence_date: ev.occurrence_date
				};
			});
			cache.set(key, data, 7, TimeCache.DAYS);
		} catch (err) {
			console.log(err);
			throw error(500);
		}
	}
	return json({ data });
}
