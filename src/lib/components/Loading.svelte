<script>
	import { onDestroy } from 'svelte';

	export let intervalMs = 1;
	let loading = [0, 0, 0];

	const interval = setInterval(() => {
		if (loading.length === 3) {
			loading = [];
		} else {
			loading.push(0);
			loading = loading;
		}
	}, intervalMs);

	onDestroy(() => clearInterval(interval));
</script>

<div class="loading">
	<div class="centered">
		<span>載入中</span>
		{#each loading as i}
			<span>.</span>
		{/each}
	</div>
</div>

<style>
	.loading {
		position: fixed;
		width: 100%;
		height: 100%;
	}
	.centered {
		position: fixed; /* or absolute */
		top: 50%;
		left: 50%;
	}
</style>
