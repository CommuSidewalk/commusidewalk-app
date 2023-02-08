import * as Papa from 'papaparse';

let data;

// read csv file and convert to js object
export async function getData() {
	return new Promise((resolve, reject) => {
		if (data) {
      resolve(data);
		} else {
			Papa.parse('data/data.csv', {
				download: true,
				skipEmptyLines: true,
				header: true,
				complete: (results) => {
					data = results.data;
					data = data.map((item) => {
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
					resolve(data);
				}
			});
		}
	});
}
