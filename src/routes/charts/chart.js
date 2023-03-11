import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
	DatasetComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { fetchChartData } from '$lib/utils/fetch-data';

export async function initChart(el) {
	echarts.use([
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		LegendComponent,
		GridComponent,
		DatasetComponent,
		DataZoomInsideComponent,
		DataZoomSliderComponent,
		TransformComponent,
		BarChart,
		LineChart,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer
	]);

	// echarts
	const myChart = echarts.init(el);

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
			source: {}
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
		dataset: { source: {} },
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
		dataset: { source: {} },
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

	const options = [
		{ text: '人行道評分依行政區', echartsOption: optRankByLevel },
		{ text: '資料數依縣市', echartsOption: optCountsByCounty },
		{ text: '資料數依日期', echartsOption: optCountsByDate }
	];

	const chart = {
		options,
		select: async (opt, config) => {
			myChart.showLoading();
			const data = await fetchChartData(fetch, opt.text, config);
			opt.echartsOption.dataset.source = data;
			myChart.setOption(opt.echartsOption, true);
			myChart.hideLoading();
		}
	};

	myChart.showLoading();

	return chart;
}
