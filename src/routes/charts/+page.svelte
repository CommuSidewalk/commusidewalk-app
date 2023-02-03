<script>
	import { getData } from '$lib/utils/csv';
	import { onMount } from 'svelte';
	import { initChart } from './chart';

  let selected;
  let chart;

	onMount(async () => {
		const data = await getData();
		chart = initChart(data);
    selected = chart.options[0]
	});

  $: if(selected !== undefined) {
    chart.select(selected)
  }
</script>

<svelte:head>
	<title>圖表 - 平安走路許願帳戶</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section>
{#if chart?.options }
	<select bind:value={selected}>
		{#each chart.options as opt}
			<option value={opt}>
				{opt.text}
			</option>
		{/each}
	</select>
{/if}
  <div id="main" />
</section>

<style>
  section {
    margin: 20px 30px;
  }

	#main {
		height: 80vh;
		width: 90vw;
	}

  select {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #f2f2f2;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  /* Styling the select dropdown arrow */
  select::after {
    content: "";
    position: absolute;
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #333 transparent transparent transparent;
  }
</style>
