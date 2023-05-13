let data;
let countyData;

export async function fetchData(fetch) {
	if (data) {
		return data;
	}

	const response = await fetch('/api/data');
	const json = await response.json();
	if (response.status === 200) {
		data = json.data.map((item) => {
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
		return data;
	} else {
		throw Error(json.error);
	}
}

export async function fetchCountyData(fetch) {
	if (countyData) {
		return countyData;
	}

	const response = await fetch('/api/county-data');
	const json = await response.json();
	if (response.status === 200) {
		countyData = json.data;
		return countyData;
	} else {
		throw Error(json.error);
	}
}

export async function fetchChartData(fetch, name, config) {
	const params = new URLSearchParams();
	params.set('name', name);
	params.set('config', JSON.stringify(config));

	const response = await fetch('/api/chart-data?' + params.toString());
	const json = await response.json();

	if (response.status === 200) {
		return json.data;
	} else {
		throw Error(json.error);
	}
}

export async function fetchTableData(fetch, intervalDays, filterConfig = {}) {
	const params = new URLSearchParams();
	params.set('intervalDays', intervalDays);

	filterConfig.startDate = filterConfig?.startDate?.toISOString().slice(0, 10);
	filterConfig.endDate = filterConfig?.endDate?.toISOString().slice(0, 10);
	params.set('filterConfig', JSON.stringify(filterConfig));

	const response = await fetch('/api/table-data?' + params.toString());
	const json = await response.json();

	if (response.status === 200) {
		return json.data;
	} else {
		throw Error(json.error);
	}
}

export async function fetchDateRangeData(fetch, start = null, end = null) {
	const params = new URLSearchParams();
	params.set('start', start);
	params.set('end', end);

	const response = await fetch('/api/filter-date-range?' + params.toString());
	const json = await response.json();

	if (response.status === 200) {
		data = json.data.map((item) => {
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
		return data;
	} else {
		throw Error(json.error);
	}
}
