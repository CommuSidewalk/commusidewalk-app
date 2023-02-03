<script>
	import { onMount } from 'svelte';
	import { getData } from '$lib/utils/csv.js';
	import { initMap } from './map.js';

	onMount(async () => {
		const data = await getData();
		initMap(data);
	});
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div id="map" class="map-container" />
<div class="control-panel">🚧施工中🚧<br/>篩選面板</div>

<style>
	.map-container {
		flex: 1;
		height: 100vh;
	}

	.control-panel {
		width: 300px;
	}

  @media (max-width: 520px) {
    .control-panel {
      display: none;
    }
  }
</style>
