<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let countyData;

	let county = null;
	let town = null;
	let vill = null;

	function onCountySelection() {
		town = null;
		vill = null;
		myDispatch();
	}

	function onTownSelection() {
		vill = null;
		myDispatch();
	}

	function myDispatch() {
		dispatch('select', {
			county,
			town,
			vill
		});
	}
</script>

<div class="select-container">
	<label for="county"> 縣市 </label>
	<select name="county" bind:value={county} on:change={onCountySelection}>
		{#each countyData as c}
			<option value={c}>{c.name}</option>
		{/each}
	</select>
</div>
<div class="select-container">
	<label for="town"> 鄉鎮市區 </label>
	<select name="town" bind:value={town} on:change={onTownSelection}>
		{#if county}
			{#each county.towns as t}
				<option value={t}>{t.name}</option>
			{/each}
		{/if}
	</select>
</div>

<style>
	label,
	select {
		display: block;
	}

	select {
		width: 150px;
	}

	.select-container {
		margin: 10px 0;
	}
</style>
