<script>
	import DateRange from './DateRange.svelte';

	export let map;
	export let layers;

	let showVillageLayer = true;

	$: if (showVillageLayer) {
		map.addLayer(layers.village);
	} else {
		map.removeLayer(layers.village);
	}

	function handleDateChange(e) {
		const { start, last } = e.detail;
		map.filterPoints(start, last);
	}
</script>

<label>
	<input type="checkbox" bind:checked={showVillageLayer} />
	顯示村里界
	<DateRange on:change={handleDateChange} />
</label>
