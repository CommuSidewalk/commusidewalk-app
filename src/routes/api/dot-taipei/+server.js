import { parseData } from '$lib/server/parse-data';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const data = await aggregateDotTaipei();
		return json({ data });
	} catch (err) {
		console.log(err);
		throw error(500);
	}
}

async function fetchDotTaipeiApi(url) {
	const response = await fetch(url);
	const json = await response.json();
	if (Array.isArray(json)) {
		return json.map(transformData);
	} else {
		throw Error('Expecting an array.');
	}
}

function transformData(rawData) {
	const expectedData = {
		title: rawData.title || '',
		description: rawData['內容'] || '',
		lat: null,
		lng: null,
		images: [],
		author: rawData['發布單位'] || '',
		type: null
	};

	if (rawData['GPS點位']?.includes(',')) {
		const [lat, lng] = rawData['GPS點位'].split(',').map((coord) => parseFloat(coord.trim()));
		if (!isNaN(lat) && !isNaN(lng)) {
			expectedData.lat = lat;
			expectedData.lng = lng;
		}
	}

	if (rawData['相關圖片'] && Array.isArray(rawData['相關圖片'])) {
		expectedData.images = rawData['相關圖片'].map((image, index) => ({
			resourcePath: image.url || '',
			description: null,
			timestamp: null
		}));
	}

	return expectedData;
}

async function aggregateDotTaipei() {
	// 學校:
	const SCHOOL = 'https://www.dot.gov.taipei/pedestriansafety/OpenData.aspx?SN=41B55476D78DBF06';
	// 醫院:
	const HOSPITAL = 'https://www.dot.gov.taipei/pedestriansafety/OpenData.aspx?SN=189104E428E0D792';
	// 幹道:
	const ARTERIAL_ROAD =
		'https://www.dot.gov.taipei/pedestriansafety/OpenData.aspx?SN=388EBE42344AD671';
	const school = (await fetchDotTaipeiApi(SCHOOL)).map((el) => ({
		...el,
		type: '學校'
	}));
	const hospital = (await fetchDotTaipeiApi(HOSPITAL)).map((el) => ({
		...el,
		type: '醫院'
	}));
	const arterialRoad = (await fetchDotTaipeiApi(ARTERIAL_ROAD)).map((el) => ({
		...el,
		type: '幹道'
	}));
	const result = [...school, ...hospital, ...arterialRoad];
	return result;
}
