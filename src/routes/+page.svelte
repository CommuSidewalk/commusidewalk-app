<script>
	import { onMount } from 'svelte';
	import { initMap } from './map.js';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import Control from '$lib/components/Control.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let mapEl;
	let mapControl;

	onMount(async () => {
		mapControl = await initMap(mapEl, data.data);
	});
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="臺灣人行道評分互動式看板" />
</svelte:head>

<div id="map" class="map-container" bind:this={mapEl} />
<div class="control-panel">
	{#if mapControl}
		<Control {...mapControl} />
	{/if}
	<br />
	<br />
	<div><b>簡介</b></div>
	<div>
		地圖上的圓點為志願者拍照上傳的人行道照片，照片皆有經過標註，例如某路段是否有人行道、是否有佔用情形、寬度等等，我們依據標註項設計了一套<a
			href="https://docs.google.com/spreadsheets/d/1T0TDm8X4NlhgMJFCIjjvWfuyq_AcjTPa_4ZIalKI0QA/edit#gid=761860670"
			>公式</a
		>，計算人行道品質分數。紅色代表很糟，綠色代表不錯；圖表頁有資料數量與行政區間的人行道品質比較圖。可以知道目前縣市、鄉鎮市區、村里間的人行道品質差異，但是沒有資料的行政區並不在圖表中。
	</div>
	<br />
	<div><b>使用說明</b></div>
	<ul>
		<li>點擊左上角的加減號來放大縮小，也可以使用滑鼠滾輪或手指縮放。拖曳來平移地圖。</li>
		<li>
			點擊地圖上的點可以展開詳細資料（分數、村里、經緯度、上傳時間），展開後點擊大頭針可以在Google
			Map中開啟該點。
		</li>
		<li>點擊「顯示村里界」核取方塊可以開啟或關閉藍色的村里界圖層。</li>
	</ul>
	<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>

	<br />
	<div><a href="https://forms.gle/kygHjXtqt2MZa7YK7">回饋表單</a></div>
</div>

<style>
	.map-container {
		flex: 1;
		height: calc(100vh - 65px);
	}

	.control-panel {
		width: 300px;
		padding: 10px;
	}

	@media (max-width: 520px) {
		.control-panel {
			display: none;
		}
	}
</style>
