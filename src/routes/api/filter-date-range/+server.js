import { parseData } from '$lib/server/parse-data';
import { filterDateRange } from '$lib/server/utils/filter-data';
import { error, json } from '@sveltejs/kit';
import _ from 'lodash';

/** @type {import('./$types').RequestHandler} */
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
		data = filterDateRange(data, start, end);
		data = _.map(data, (obj) =>
			_.pick(obj, [
				'imgUrl',
				'rankA1',
				'countyName',
				'townName',
				'villName',
				'lat',
				'lng',
				'createdAt',
				'remark'
			])
		);
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}
