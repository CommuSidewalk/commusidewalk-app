import { computeCountyData } from '$lib/server/compute-county-data';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	try {
		const data = await computeCountyData();
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500, { error: err });
	}
}
