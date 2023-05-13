<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// inclusive boundaries
	/** @type {Date|null} */
	export let start = null;
	/** @type {Date|null} */
	export let end = null;

	let startVal = '';
	let endVal = '';

	$: {
		start = startVal === '' ? null : new Date(startVal);
		end = endVal === '' ? null : new Date(endVal);
		dispatch('change', { start, end });
	}
</script>

<div class="daterange">
	<div>
		<label for="start">起始日期</label>
		<input id="start" bind:value={startVal} type="date" />
	</div>
	<div>
		<label for="start">結束日期</label>
		<input id="end" bind:value={endVal} type="date" />
	</div>
</div>

<style>
	.daterange {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
