import { computeTableData } from '$lib/server/compute-table-data';
import { parseData } from '$lib/server/parse-data';
import { filterData } from '$lib/server/utils/filter-data';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {
	try {
		let intervalDays = e.url.searchParams.get('intervalDays');
		intervalDays = parseInt(intervalDays);
		if (isNaN(intervalDays) || intervalDays < 1) {
			intervalDays = 7;
		}

		let filterConfig = e.url.searchParams.get('filterConfig');
		filterConfig = JSON.parse(filterConfig);
		const data = await parseData();
		const filtered = filterData(data, filterConfig);
		const tableData = await computeTableData(filtered, intervalDays);
		return json({ data: tableData });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}
