<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// inclusive boundaries
	export let start = null;
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! should rename to "end"
	export let last = null;

	let startVal = '';
	let lastVal = '';

	$: {
		start = startVal === '' ? null : new Date(startVal);
		last = lastVal === '' ? null : new Date(lastVal);
		dispatch('change', { start, last });
	}
</script>

<div class="daterange">
	<div>
		<label for="start">起始日期</label>
		<input id="start" bind:value={startVal} type="date" />
	</div>
	<div>
		<label for="start">結束日期</label>
		<input id="last" bind:value={lastVal} type="date" />
	</div>
</div>

<style>
	.daterange {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
