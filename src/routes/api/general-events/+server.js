import { PUBLIC_ACCIDENT_END_DATE, PUBLIC_ACCIDENT_START_DATE } from '$env/static/public';
import sql from '$lib/server/utils/db';
import TimeCache from '$lib/server/utils/timer-cache';
import { isoDateString2Date, isValidISODateString } from '$lib/utils/date-utils';
import { error } from '@sveltejs/kit';
import { Readable } from 'node:stream';

const cache = new TimeCache();

// 已知BUG：如果沒有資料，前端會一直loading

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
	let startDate = e.url.searchParams.get('startDate');
	let endDate = e.url.searchParams.get('endDate');

	if (!isValidISODateString(startDate) && startDate !== null) {
		throw error(400);
	} else if (!isValidISODateString(endDate) && endDate !== null) {
		throw error(400);
	}

	if (startDate !== null && isoDateString2Date(startDate) < new Date(PUBLIC_ACCIDENT_START_DATE)) {
		startDate = PUBLIC_ACCIDENT_START_DATE;
	}
	if (endDate !== null && isoDateString2Date(endDate) > new Date(PUBLIC_ACCIDENT_END_DATE)) {
		endDate = PUBLIC_ACCIDENT_END_DATE;
	}

	const key = startDate + endDate + '';
	let data = cache.get(key);
	if (!data) {
		try {
			let result;
			if (startDate === null && endDate === null) {
				result = await sql`select ${sql(columns)} from general_events_view limit 5;`;
			} else if (endDate === null) {
				result = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date >= ${startDate}`;
				// readableStream = await sql`copy (select ${
				//   sql(columns)
				// }, ';' from general_events_view ${
				//   true ? sql`` : sql`where occurrence_date > ${startDate}`
				// }) to stdout`.readable();
			} else if (startDate === null) {
				result = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date <= ${endDate}`;
				// readableStream = await sql`copy (select ${
				//   sql(columns)
				// }, ';' from general_events_view where occurrence_date <= ${endDate}) to stdout`
				//   .readable();
			} else {
				result = await sql`select ${sql(
					columns
				)} from general_events_view where occurrence_date >= ${startDate} and occurrence_date <= ${endDate}`;
				// readableStream = await sql`copy (select ${
				//   sql(columns)
				// }, ';' from general_events_view where occurrence_date >= ${startDate} and occurrence_date <= ${endDate}) to stdout`
				//   .readable();
			}

			// 原本想用postgresql.js的sql``.readable，結果在WHERE日期時出現PostgresError: there is no parameter $1
			// 所以就變成愚蠢的方法，把sql轉好的object => csv => stream => client

			// let result = "";
			// readableStream.on("data", (data) => {
			//   result += data.toString();
			// });
			// readableStream.on("end", () => {
			//   data = result;
			//   cache.set(key, data, 7, TimeCache.DAYS);
			//
			//   const readableStream = buildStream(data);
			//   return new Response(readableStream);
			// });

			// convert data to csv (tab seperated)
			data = [];
			for (const evPoint of result) {
				const ev = [
					evPoint.event_id,
					evPoint.accident_category_name,
					evPoint.latitude,
					evPoint.longitude,
					evPoint.number_of_deaths,
					evPoint.number_of_injuries,
					evPoint.occurrence_date
				].join('\t');
				data.push(ev);
			}
			data = data.join(';');
			cache.set(key, data, 7, TimeCache.DAYS);
		} catch (err) {
			throw error(500);
		}
	}

	const readableStream = buildStream(data);
	return new Response(readableStream);
}

function deprec_buildStream(data) {
	// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
	const readableStream = new ReadableStream({
		start(controller) {
			const chunks = data.split(';');
			return pump();
			function pump() {
				if (chunks.length === 0) {
					controller.close();
				} else {
					const chunk = chunks.pop();
					controller.enqueue(chunk + ';');
					return pump();
				}
			}
		}
	});
	return readableStream;
}

function buildStream(data) {
	const readableStream = new Readable({
		read() {
			const chunks = data.split(';');
			for (const chunk of chunks) {
				this.push(chunk + ';');
			}
			this.push(null);
		}
	});
	return readableStream;
}
