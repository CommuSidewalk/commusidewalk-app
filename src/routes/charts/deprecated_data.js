import { getData } from '$lib/utils/get-data';
import _ from 'lodash';

// cache
let data;
let dataset = {
	dataRankByLevel: null, // no use cache due to interactive results
	dataCountsByCounty: null,
	dataCountsByDate: null
};

async function initData() {
	if (data) return;
	const obj = await getData();
	if (obj.data) {
		data = obj.data;
	} else {
		console.error(obj.error);
	}
}

function filterDateRange(data, start, last) {
	const filtered = _.filter(data, (item) => {
		const date = item.createdAt;
		return (!start || date >= start) && (!last || date <= last);
	});
	return filtered;
}

async function computeDataRankByLevel(config = { level: null, minCount: 0 }) {
	let { level, minCount, start, last } = config;
	await initData();

	level = level ?? null;
	minCount = minCount ?? 0;

	let data1;
	data1 = filterDateRange(data, start, last);
  console.log(data1)
	// level = {county, town, vill}
	if (level === null) {
		data1 = _(data1).groupBy('countyName');
	} else if (level.county) {
		// 鄉鎮市區比較
		data1 = _(data1)
			.filter((row) => row.county === level.county.name)
			.groupBy('townName');
		if (level.town) {
			// 村里間比較
			data1 = _(data1)
				.filter(
					(row) => row.county === level.county.name && row.town === level.town.name
				)
				.groupBy('villName');
		}
	}
	const dataRankByLevel = _.chain(data1)
		.map((value, key) => {
			return {
				name: key,
				count: value.length,
				meanRankA1: _.meanBy(value, 'rankA1').toFixed(2),
				meanRankB1: _.meanBy(value, 'rankB1').toFixed(2),
				meanRankC1: _.meanBy(value, 'rankC1').toFixed(2)
			};
		})
		.filter((item) => {
			return item.count > minCount;
		})
		.sortBy('meanRankA1')
		.value();

	return dataRankByLevel;
}

async function computeDataCountsByCounty(config) {
	const { start, last } = config;
	await initData();
	// if (dataset.dataCountsByCounty) {
	//   return dataset.dataCountsByCounty;
	// }

	// data counts by county

	let data1 = filterDateRange(data, start, last);
	const countyCounts = _.countBy(data1, 'countyName');
	dataset.dataCountsByCounty = _(countyCounts)
		.map((count, countyName) => {
			return { countyName, count };
		})
		.sortBy('count')
		.value();

	return dataset.dataCountsByCounty;
}

async function computeDataCountsByDate(config) {
	const { start, last } = config;
	await initData();

	let data1 = filterDateRange(data, start, last);
	// data counts by date
	let temp = _.map(data1, (item) => {
		return { ...item, createdAt: item.createdAt.toDateString() };
	});
	const createdAtCounts = _.countBy(temp, 'createdAt');
	dataset.dataCountsByDate = _.map(createdAtCounts, (count, createdAt) => {
		return { createdAt: new Date(createdAt), count };
	}).sort((a, b) => a.createdAt > b.createdAt);

	return dataset.dataCountsByDate;
}

export async function computeChartDataByName(name, config) {
	switch (name) {
		case '人行道評分依行政區':
			return await computeDataRankByLevel(config);
		case '資料數依日期':
			return await computeDataCountsByDate(config);
		case '資料數依縣市':
			return await computeDataCountsByCounty(config);
	}
}

initData();
