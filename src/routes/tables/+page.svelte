<script>
	import CountySelect from '$lib/components/CountySelect.svelte';
	import DateRange from '$lib/components/DateRange.svelte';
	import Tabulator from '$lib/components/Tabulator.svelte';
	import { fetchTableData } from '$lib/utils/fetch-data';

	/** @type {import('./$types').PageData} */
	export let data;
	let config = {
		autoColumns: true,
		autoColumnsDefinitions: {
			meanA1: {
				title: 'a1 平均分數',
				formatter: 'progress',
				formatterParams: {
					min: -0.1, // because it might have some zero value, this will show the "worst" case
					max: 10,
					color: ['red', 'orange', 'green']
				}
			},
			meanA1Value: { title: 'a1 平均分數 (滿分10分)' },
			start: { title: '開始日期', formatter: dateFormatter },
			end: { title: '結束日期', formatter: dateFormatter }
		},
		pagination: 'local',
		paginationSize: 100,
		paginationCounter: 'rows',
		layout: 'fitColumns'
	};
	let intervalDays = 7;
	let tableData = data.data;
	let filterConfig = {};

	function dateFormatter(cell, formatterParams, onRendered) {
		const date = new Date(cell.getValue());
		return date.toISOString().slice(0, 10);
	}

	function handleDateChange(e) {
		filterConfig = { ...filterConfig, startDate: e.detail.start, endDate: e.detail.end };
		updateTableData();
	}

	function handleInput(e) {
		updateTableData();
	}

	function handleCountySelect(e) {
		filterConfig = { ...filterConfig, constraintAD: e.detail };
		updateTableData();
	}

	async function updateTableData() {
		console.log(filterConfig);
		tableData = await fetchTableData(fetch, intervalDays, filterConfig);
	}
</script>

<svelte:head>
	<title>表 - 平安走路許願帳戶</title>
	<meta name="description" content="統計圖表" />
</svelte:head>

<div class="content">
	<DateRange on:change={handleDateChange} />
	<div class="interval-days-block">
		<label for="intervalDays">區間日數</label>
		<input
			id="intervalDays"
			bind:value={intervalDays}
			on:input={handleInput}
			type="number"
			min="1"
		/>
	</div>
	<CountySelect on:selectV2={handleCountySelect} countyData={data.countyData} maxLevel={3} />
	<Tabulator data={tableData} {config} />
</div>

<style>
	.content {
		width: 100vw;
	}
	.interval-days-block {
		margin: 1em 0;
	}
</style>
