import * as Papa from 'papaparse';

let cachedData;

// read csv file and convert to js object
export async function parseData() {
	return new Promise((resolve, reject) => {
		if (cachedData) {
			resolve(cachedData);
		} else {
			Papa.parse('data/data.csv', {
				download: true,
				skipEmptyLines: true,
				header: true,
				complete: (results) => {
					cachedData = results.data.map((item) => {
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
					resolve(cachedData);
				},
				error: (error) => {
					reject(error);
				}
			});
		}
	});
}
