import * as echarts from 'echarts';
import _ from 'lodash';
import { getDataRankByLevel, getDataCountsByCounty, getDataCountsByDate } from './data';

export async function initChart() {
	// echarts
	const myChart = echarts.init(document.getElementById('main'));

	window.addEventListener('resize', function () {
		myChart.resize();
	});

	const dataRankByLevel = await getDataRankByLevel();
	const dataCountsByCounty = await getDataCountsByCounty();
	const dataCountsByDate = await getDataCountsByDate();

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
					y: 'name'
				}
			}
		]
	};

	const optRankByLevel = {
		toolbox: {
			feature: {
				dataZoom: {},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: { bottom: 0 },
		tooltip: {},
		dataset: { source: dataRankByLevel },
		title: {
			left: 'center',
			text: '人行道評分依行政區'
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
				end: 100
			},
			{
				start: 0,
				end: 100
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

	const chart = {
		options: [
			{ text: '人行道評分依行政區', echartsOption: optRankByLevel },
			{ text: '資料數依縣市', echartsOption: optCountsByCounty },
			{ text: '資料數依日期', echartsOption: optCountsByDate }
		],
		select: (option) => {
			myChart.setOption(option.echartsOption, true);
		},
		updateDataRankByLevel(level, minCount) {
			getDataRankByLevel(level, minCount).then((source) => {
				optRankByLevel.dataset.source = source;
				myChart.setOption(optRankByLevel, true);
			});
		}
	};

	return chart;
}
