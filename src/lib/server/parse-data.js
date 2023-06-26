import fetch from 'node-fetch';
import Papa from 'papaparse';
import TimeCache from './utils/timer-cache';
import { CSV_DOWNLOAD_URL } from '$env/static/private';

/**
 * @typedef SidewalkPoint
 * @type {import('$lib/types').SidewalkPoint} */
const cache = new TimeCache();

/**
 *
 * @returns {Promise<SidewalkPoint[]>}
 *
 */
async function parse() {
	const response = await fetch(CSV_DOWNLOAD_URL);
	const csv = await response.text();
	const results = Papa.parse(csv, {
		skipEmptyLines: true,
		header: true
	});
	return results.data.map((item) => {
		return {
			...item,
			rankA1: parseFloat(item.rankA1),
			rankB1: parseFloat(item.rankB1),
			rankC1: parseFloat(item.rankC1),
			dataTime: new Date(item.dataTime),
			createdAt: new Date(item.createdAt),
			updatedAt: new Date(item.updatedAt)
		};
	});
}

/**
 * Parses the sidewalk points data from a CSV file and returns an array of SidewalkPoint objects.
 * @returns {Promise<SidewalkPoint[]>} - A Promise that resolves to an array of SidewalkPoint objects.
 */
export async function parseData() {
	return new Promise((resolve, reject) => {
		if (cache.get('data')) {
			return resolve(cache.get('data'));
		}
		try {
			const data = parse();
			cache.set('data', data, 1, TimeCache.DAYS);
			resolve(data);
		} catch (err) {
			reject(err);
		}
	});
}
