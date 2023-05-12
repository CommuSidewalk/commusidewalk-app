import { parseData } from '$lib/server/parse-data';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	try {
		const data = await parseData();
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}
