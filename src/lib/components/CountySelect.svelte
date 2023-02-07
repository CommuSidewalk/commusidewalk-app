<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { getCountyData } from '$lib/utils/county-data';

	const dispatch = createEventDispatcher();

	let countyData;

	onMount(async () => {
		countyData = await getCountyData();
	});

	let countyName = countyData ? countyData[0] : null;
	let townName = countyName ? countyName.towns[0] : null;
	let villName = townName ? townName.villages[0] : null;

	function onCountySelection() {
		townName = null;
		villName = null;
		myDispatch();
	}

	function onTownSelection() {
		villName = null;
		myDispatch();
	}

	function myDispatch() {
		dispatch('select', {
			countyName,
			townName,
			villName
		});
	}
</script>

{#if countyData}
	<div class="select-container">
		<label for="countyName"> 縣市 </label>
		<select name="countyName" bind:value={countyName} on:change={onCountySelection}>
			{#each countyData as county}
				<option value={county}>{county.name}</option>
			{/each}
		</select>
	</div>
	<div class="select-container">
		<label for="townName"> 鄉鎮市區 </label>
		<select name="townName" bind:value={townName} on:change={onTownSelection}>
			{#if countyName}
				{#each countyName.towns as town}
					<option value={town}>{town.name}</option>
				{/each}
			{/if}
		</select>
	</div>
	<!-- 		<label for="villName"> 村里 </label> -->
	<!-- 		<select name="villName" bind:value={villName}> -->
	<!-- 			{#if townName} -->
	<!-- 				{#each townName?.villages as village} -->
	<!-- 					<option value={village}>{village.name}</option> -->
	<!-- 				{/each} -->
	<!-- 			{/if} -->
	<!-- 		</select> -->
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
