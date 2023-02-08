<script>
	import { onMount } from 'svelte';
	import { initMap } from './map.js';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import Control from '$lib/components/Control.svelte';

	let mapControl;
	onMount(async () => {
		mapControl = await initMap();
	});
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="臺灣人行道評分互動式看板" />
</svelte:head>

<div id="map" class="map-container" />
<div class="control-panel">
	{#if mapControl}
		<Control {...mapControl} />
	{/if}
	<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>
</div>

<style>
	.map-container {
		flex: 1;
		height: calc(100vh - 65px);
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
