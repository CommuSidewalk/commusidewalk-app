<script>
	import { onMount } from 'svelte';
	import { initChart } from './chart';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import Papa from 'papaparse';
	import DateRange from '$lib/components/DateRange.svelte';
	import CountySelect from '$lib/components/CountySelect.svelte';

	let selected;
	let chart;
	let minCount = 0;
	let downloadDisabled = true;
	let config = {};
	/** @type {import('./$types').PageData} */
	export let data;
	let chartEl;

	onMount(async () => {
		chart = await initChart(chartEl);
		selected = chart.options[0];
		downloadDisabled = false;
	});

	$: if (selected !== undefined) {
		chart?.select(selected, config);
	}

	function handleSelect(e) {
		const level = e.detail;
		config = { ...config, level };
		chart?.select(selected, config);
	}

	function handleMinCount() {
		config = { ...config, minCount };
		chart?.select(selected, config);
	}

	async function handleDownload(fileType) {
		let data;
		try {
			const params = new URLSearchParams();
			params.set('name', selected.text);
			params.set('config', JSON.stringify(config));
			data = await fetch('/api/chart-data?' + params.toString());
			const link = document.createElement('a');

			switch (fileType) {
				case 'json':
					data = JSON.stringify(data);
					break;
				case 'csv':
					data = Papa.unparse(data);
					break;
			}
			const universalBOM = '\uFEFF';
			link.href = 'data:text/${fileType};charset=utf-8,' + encodeURIComponent(universalBOM + data);
			link.download = selected.text + '.' + fileType;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			console.error(err);
		}
	}

	function handleDateChange(e) {
		const { start, last } = e.detail;
		config = { ...config, start, last };
		chart?.select(selected, {
			...config,
			start,
			last
		});
	}
</script>

<svelte:head>
	<title>圖 - 平安走路許願帳戶</title>
	<meta name="description" content="統計圖表" />
</svelte:head>

<section>
	<div><label for="chart">圖表</label></div>
	{#if chart?.options}
		<select name="chart" bind:value={selected}>
			{#each chart.options as opt}
				{#if !opt.loading}
					<option value={opt}>
						{opt.text}
					</option>
				{/if}
			{/each}
		</select>
		<button disabled={downloadDisabled} on:click={() => handleDownload('json')}>下載JSON</button>
		<button disabled={downloadDisabled} on:click={() => handleDownload('csv')}>下載CSV</button>
		<div>
			<DateRange on:change={handleDateChange} />
		</div>
		<!-- 當圖是「人行道評分依行政區」時 -->
		{#if selected?.text === '人行道評分依行政區'}
			<div class="rank-control">
				<CountySelect countyData={data.countyData} on:select={handleSelect} maxLevel={2} />
				<div class="range-container">
					<div><label for="minCount">最少資料數</label><span>{minCount}</span></div>
					<input
						type="range"
						min="0"
						max="100"
						step="1"
						bind:value={minCount}
						on:input={handleMinCount}
						class="range-slider"
					/>
				</div>
				<div>⚠️地區間之比較僅供參考，空間分析在不同尺度（scale）的資料不一定能互相比較。</div>
			</div>
		{/if}
	{/if}
	<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>
	<div id="main" bind:this={chartEl} />
</section>

<style>
	section {
		margin: 3vh 2vw;
	}

	#main {
		height: 80vh;
		width: 90vw;
	}

	@media (max-width: 520px) {
		#main {
			height: 80vh;
			width: 90vw;
		}
	}

	select {
		margin: 5px 0;
		padding: 10px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		background-color: #f2f2f2;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	select::after {
		content: '';
		position: absolute;
		top: 14px;
		right: 10px;
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-color: #333 transparent transparent transparent;
	}

	.range-container span {
		margin-left: 10px;
	}

	.range-container {
		margin: 10px 0;
	}
</style>
