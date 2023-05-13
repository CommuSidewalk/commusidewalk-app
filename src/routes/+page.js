// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

import { fetchDateRangeData } from '$lib/utils/fetch-data';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	return {
		sidewalkData: await fetchDateRangeData(fetch)
	};
}
