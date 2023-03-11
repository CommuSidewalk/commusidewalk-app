<script>
	import '$lib/css/tabulator.min.css';
	import { onMount } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';

	export let data;
	export let config;

	let tableComponent;
  let table;
  let isTableInit = false;


	onMount(() => {
		table = new Tabulator(tableComponent, { ...config, data });
    table.on("tableBuilt", () =>isTableInit = true )
	});

  $: if(isTableInit) {
    table.replaceData(data)
  }
</script>

<div bind:this={tableComponent} />
