export async function parseStreamResponse(response, cb, onEnd) {
	const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
	let accumulatedData = '';
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;

		const csvList = (accumulatedData + value).split(';');
		accumulatedData = csvList.pop(); // remove empty one

		for (const csv of csvList) {
			const eventPointCSVList = csv.split('\t');

			/** @type {import('$lib/types').EventStream} */
			const evPoint = {
				event_id: parseInt(eventPointCSVList[0]),
				accident_category_name: eventPointCSVList[1],
				latitude: eventPointCSVList[2],
				longitude: eventPointCSVList[3],
				number_of_deaths: parseInt(eventPointCSVList[4]),
				number_of_injuries: parseInt(eventPointCSVList[5]),
				occurrence_date: new Date(eventPointCSVList[6])
			};
			cb(evPoint);
		}
	}
	onEnd();
}
