import { parseData } from '$lib/server/parse-data';
import { filterDateRange } from '$lib/server/utils/filter-data';
import { error, json } from '@sveltejs/kit';

export async function GET(e) {
	let start = e.url.searchParams.get('start');
	let end = e.url.searchParams.get('end');

	start = new Date(start);
	end = new Date(end);

	start = start.toString() === 'Invalid Date' ? null : start;
	end = end.toString() === 'Invalid Date' ? null : end;

	try {
		let data;
		data = await parseData();
		console.log(start, end);
		data = filterDateRange(data, start, end);
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}
