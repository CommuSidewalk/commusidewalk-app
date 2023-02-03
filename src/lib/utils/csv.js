import * as Papa from 'papaparse';

let data;

// cb: callback function
async function getData() {
	return new Promise((resolve, reject) => {
		if (data === undefined) {
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
		} else {
			resolve(data);
		}
	});
}

export { getData };
