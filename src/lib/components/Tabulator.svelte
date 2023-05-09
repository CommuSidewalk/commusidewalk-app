<script>
	import '$lib/css/tabulator.css';
	import { onMount } from 'svelte';
	// unknown build error on vercel, so change to this format.
	import { TabulatorFull as Tabulator } from '$lib/js/tabulator_esm.js';

	export let data;
	export let config;

	let tableComponent;
	let table;
	let isTableInit = false;

	onMount(() => {
		table = new Tabulator(tableComponent, { ...config, data });
		table.on('tableBuilt', () => (isTableInit = true));
	});

	$: if (isTableInit) {
		table.replaceData(data);
	}
</script>

<div bind:this={tableComponent} />
