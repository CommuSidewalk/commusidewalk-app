// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import { fetchDateRangeData, fetchHelper } from '$lib/utils/fetch-data';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/dot-taipei');
	const dotTaipeiData = (await response.json())?.data;
	return {
		sidewalkData: await fetchDateRangeData(fetch),
		dotTaipeiData
	};
}
