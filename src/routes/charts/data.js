import { getData } from '$lib/utils/csv';
import _ from 'lodash';

// cache
let data;
let dataset = {
	dataRankByLevel: null,
	dataCountsByCounty: null,
	dataCountsByDate: null
};

export async function getDataRankByLevel(level = null, minCount = 0) {
	data = data ?? (await getData());

	let data1;
	// level = {countyName, townName, villName}
	if (level === null) {
		data1 = _(data).groupBy('countyName');
	} else if (level.countyName) {
		// 鄉鎮市區比較
		data1 = _(data)
			.filter((row) => row.countyName === level.countyName.name)
			.groupBy('townName');
		if (level.townName) {
			// 村里間比較
			data1 = _(data)
				.filter(
					(row) => row.countyName === level.countyName.name && row.townName === level.townName.name
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

export async function getDataCountsByCounty() {
	data = data ?? (await getData());
	if (dataset.dataCountsByCounty) {
		return dataset.dataCountsByCounty;
	}

	// data counts by county
	const countyCounts = _.countBy(data, 'countyName');
	dataset.dataCountsByCounty = _(countyCounts)
		.map((count, countyName) => {
			return { countyName, count };
		})
		.sortBy('count')
		.value();

	return dataset.dataCountsByCounty;
}

export async function getDataCountsByDate() {
	data = data ?? (await getData());
	if (dataset.dataCountsByDate) {
		return dataset.dataCountsByDate;
	}

	// data counts by date
	let temp = _.map(data, (item) => {
		return { ...item, createdAt: item.createdAt.toDateString() };
	});
	const createdAtCounts = _.countBy(temp, 'createdAt');
	dataset.dataCountsByDate = _.map(createdAtCounts, (count, createdAt) => {
		return { createdAt: new Date(createdAt), count };
	}).sort((a, b) => a.createdAt > b.createdAt);

	return dataset.dataCountsByDate;
}
