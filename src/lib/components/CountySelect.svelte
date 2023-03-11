<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let countyData;
	export let maxLevel = 3;

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

	function onVillSelection() {
		myDispatch();
	}

	function myDispatch() {
		dispatch('select', {
			county,
			town,
			vill
		});
		myDispatchV2();
	}

	function myDispatchV2() {
		dispatch('selectV2', {
			county: county?.name ?? null,
			town: town?.name ?? null,
			vill: vill?.name ?? null
		});
	}
</script>

{#if maxLevel >= 1}
	<div class="select-container">
		<label for="county"> 縣市 </label>
		<select name="county" bind:value={county} on:change={onCountySelection}>
			{#each countyData as c}
				<option value={c}>{c.name}</option>
			{/each}
		</select>
	</div>
{/if}
{#if maxLevel >= 2}
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
{/if}
{#if maxLevel >= 3}
	<div class="select-container">
		<label for="vill"> 村里 </label>
		<select name="vill" bind:value={vill} on:change={onVillSelection}>
			{#if town}
				{#each town.villages as v}
					<option value={v}>{v.name}</option>
				{/each}
			{/if}
		</select>
	</div>
{/if}

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
