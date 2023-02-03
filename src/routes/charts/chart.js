import * as echarts from 'echarts';
import _ from 'lodash';

export function initChart(data) {
	// data processing
	// data counts by county
	const countyCounts = _.countBy(data, 'countyName');
	const dataCountsByCounty = _.map(countyCounts, (count, countyName) => {
		return { countyName, count };
	});

	// data rank by county
	const dataRankByCounty = _.chain(data)
		.groupBy('countyName')
		.map((value, key) => {
			return {
				countyName: key,
				count: value.length,
				meanRankA1: _.meanBy(value, 'rankA1').toFixed(2),
				meanRankB1: _.meanBy(value, 'rankB1').toFixed(2),
				meanRankC1: _.meanBy(value, 'rankC1').toFixed(2)
			};
		})
		.filter((item) => {
			return item.count > 50;
		})
		.value();

	// data counts by date
	let temp = _.map(data, (item) => {
		return { ...item, createdAt: item.createdAt.toDateString() };
	});
	const createdAtCounts = _.countBy(temp, 'createdAt');
	const dataCountsByDate = _.map(createdAtCounts, (count, createdAt) => {
		return { createdAt: new Date(createdAt), count };
	}).sort((a, b) => a.createdAt > b.createdAt);

	// echarts
	const myChart = echarts.init(document.getElementById('main'));

	window.addEventListener('resize', function () {
		myChart.resize();
	});

	const optCountsByCounty = {
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {},
				saveAsImage: {}
			}
		},
		title: {
			left: 'center',
			text: '資料數依縣市'
		},
		tooltip: {},
		legend: {},
		xAxis: {},
		yAxis: { type: 'category' },
		dataset: {
			source: dataCountsByCounty
		},
		series: [
			{
				type: 'bar',
				encode: {
					x: 'count',
					y: 'countyName'
				}
			}
		]
	};

	const optRankByCounty = {
		toolbox: {
			feature: {
				dataZoom: {},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: { bottom: 0 },
		tooltip: {},
		dataset: { source: dataRankByCounty },
		title: {
			left: 'center',
			text: '人行道評分依縣市'
		},
		xAxis: {},
		yAxis: { type: 'category' },
		series: [
			{
				name: 'a1 平均分數',
				type: 'bar',
				encode: { x: 'meanRankA1', y: 'countyName' }
			},
			{
				name: 'b1 平均分數',
				type: 'bar',
				encode: { x: 'meanRankB1', y: 'countyName' }
			},
			{
				name: 'c1 平均分數',
				type: 'bar',
				encode: { x: 'meanRankC1', y: 'countyName' }
			}
		]
	};

	const optCountsByDate = {
		dataset: { source: dataCountsByDate },
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '10%'];
			}
		},
		title: {
			left: 'center',
			text: '資料數依日期'
		},
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'time',
			boundaryGap: false
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 20
			},
			{
				start: 0,
				end: 20
			}
		],
		series: [
			{
				name: '資料數',
				type: 'line',
				encode: { x: 'createdAt', y: 'count' }
			}
		]
	};

	// default chart
	// myChart.setOption(optCountsByCounty);

	const chart = {
		options: [
			{ text: '人行道評分依縣市', echartsOption: optRankByCounty },
			{ text: '資料數依縣市', echartsOption: optCountsByCounty },
			{ text: '資料數依日期', echartsOption: optCountsByDate }
		],
		select: (option) => {
			myChart.setOption(option.echartsOption, true);
		}
	};

	return chart;
}
