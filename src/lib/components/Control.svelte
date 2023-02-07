<script>
	export let map;
	export let layers;

	let displayVillage = true;

	$: if (map !== undefined) {
		map.tile;
	}

	$: if (displayVillage) {
		map?.addLayer(layers.village);
	} else {
		map?.removeLayer(layers.village);
	}
</script>

<label>
	<input type="checkbox" bind:checked={displayVillage} />
	顯示村里界
</label>
