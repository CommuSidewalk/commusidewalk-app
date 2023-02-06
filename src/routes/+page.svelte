<script>
	import { onMount } from 'svelte';
	import { initMap } from './map.js';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	//	import { Control } from '$lib/components/Control.svelte';

	onMount(async () => {
		const map = await initMap();
	});
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div id="map" class="map-container" />
<div class="control-panel">
	<!-- <Control {map} /> -->
	🚧施工中🚧<br />
	篩選面板
	<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>
	<!-- <div>資料更新時間：20230207</div> -->
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
