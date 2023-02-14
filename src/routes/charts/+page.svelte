<script>
	import { onMount } from 'svelte';
	import { initChart } from './chart';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import CountySelect from '$lib/components/CountySelect.svelte';

	let selected;
	let chart;
	let minCount = 0;

	onMount(async () => {
		chart = await initChart();
		selected = chart.options[0];
	});

	$: if (selected !== undefined) {
		chart.select(selected);
	}

	function handleSelect(e) {
		chart?.updateDataRankByLevel(e.detail);
	}

	function handleMinCount() {
		chart?.updateDataRankByLevel(null, minCount);
	}
</script>

<svelte:head>
	<title>圖表 - 平安走路許願帳戶</title>
	<meta name="description" content="統計圖表" />
</svelte:head>

<section>
	<div><label for="chart">圖表</label></div>
	{#if chart?.options}
		<select name="chart" bind:value={selected}>
			{#each chart.options as opt}
				<option value={opt}>
					{opt.text}
				</option>
			{/each}
		</select>
		{#if selected?.text === '人行道評分依行政區'}
			<div class="rank-control">
				<CountySelect on:select={handleSelect} />
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
			</div>
		{/if}
	{/if}
	<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>
	<div id="main" />
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
