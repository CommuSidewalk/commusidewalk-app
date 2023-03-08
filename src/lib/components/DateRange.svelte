<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// inclusive boundaries
	export let start = null;
	export let last = null;

	let startVal = null;
	let lastVal = null;

	// from Date object to YYYY-MM-DD
	function format(date) {
		return date.toISOString().slice(0, 10);
	}

	$: {
		start = startVal ? new Date(startVal) : start;
		last = lastVal ? new Date(lastVal) : last;
		dispatch('change', { start, last });
	}
</script>

<div>
	<label for="start">起始日期</label>
	<input id="start" bind:value={startVal} type="date" />
</div>
<div>
	<label for="start">結束日期</label>
	<input id="last" bind:value={lastVal} type="date" />
</div>
