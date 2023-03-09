import { computeChartDataByName } from '$lib/server/compute-chart-data';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	try {
		const name = e.url.searchParams.get('name');
		const config = JSON.parse(e.url.searchParams.get('config'));
		if (config.start) {
			config.start = new Date(config.start);
		}
		if (config.last) {
			config.last = new Date(config.last);
		}
		const data = await computeChartDataByName(name, config);
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500, { error: err });
	}
}
