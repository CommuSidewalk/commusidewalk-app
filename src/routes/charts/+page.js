// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

import { getCountyData } from "$lib/utils/get-data";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  return {
    countyData: (await getCountyData(fetch)).data,
  };
}
