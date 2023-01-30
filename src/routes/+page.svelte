<script>
	import { onMount } from 'svelte';
	onMount(async () => {
		await import('./map.js');
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div id="map" />
</section>

<style>
	#map {
		height: 100vh;
	}
</style>
