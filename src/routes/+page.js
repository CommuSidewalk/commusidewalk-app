// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

import { getData } from "$lib/utils/get-data";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const { data } = await getData(fetch);
  return {
    data,
  };
}
