<script>
	import { getContext } from 'svelte';
	import DateRange from './DateRange.svelte';
	import ColorLegend from './ColorLegend.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onGetUserLatLng } from '$lib/utils/onGetUserLatLng';
	import OnlineVisitorCount from './OnlineVisitorCount.svelte';

	export let villageLayer = undefined;

	let map = getContext('map')();
	let showVillageLayer = false;
	let show = false;

	const dispatch = createEventDispatcher();

	$: if (map && villageLayer) {
		if (showVillageLayer) {
			map.addLayer(villageLayer);
		} else {
			map.removeLayer(villageLayer);
		}
	}

	function handleLocate() {
		onGetUserLatLng((latlng) => {
			map.flyTo(latlng);
		});
	}

	function handleDateChange(e) {
		dispatch('filter-date-range', e.detail);
	}
</script>

<div class="panel">
	<div class="block">
		<p class="panel-title"><strong>人行道評分地圖</strong></p>
		<input id="togglePanel" type="checkbox" bind:checked={show} />
		<label for="togglePanel">顯示更多</label>
	</div>
	{#if show}
		<div class="block">
			{#if villageLayer}
				<div>
					<p class="block-title">圖層</p>
				</div>
				<input id="toggleVillageLayer" type="checkbox" bind:checked={showVillageLayer} />
				<label for="toggleVillageLayer">顯示村里界</label>
			{/if}
		</div>
		<div class="block">
			<div>
				<p class="block-title">時間</p>
			</div>
			<DateRange on:change={handleDateChange} />
		</div>
		<div class="block">
			<div>
				<p class="block-title">定位</p>
			</div>
			<button on:click={handleLocate}>尋找我的位置</button>
		</div>
		<div class="block">
			<div>
				<p class="block-title">圖例</p>
			</div>
			<ColorLegend />
		</div>

		<div class="block">
			<div>
				<p class="block-title">使用說明</p>
			</div>
			<p>點擊左上角的加減號來放大縮小，也可以使用滑鼠滾輪或手指縮放。拖曳來平移地圖。</p>
			<p>
				點擊地圖上的點展開詳細資料（分數、村里、經緯度、上傳時間、備註），點擊大頭針在 Google Map
				開啟。
			</p>
		</div>
		<div class="block">
			<p>
				地圖上的圓點為志願者拍照上傳的人行道照片，照片皆有經過標註，例如某路段是否有人行道、是否有佔用情形、寬度等等，我們依據標註項設計了一套<a
					href="https://docs.google.com/spreadsheets/d/1T0TDm8X4NlhgMJFCIjjvWfuyq_AcjTPa_4ZIalKI0QA/edit#gid=761860670"
					>公式</a
				>，計算人行道品質分數。愈靠近紅色代表愈不安全，愈靠近綠色代表保護性、可行走性愈佳。
			</p>
			<p>
				圖表頁有資料數量與行政區間的人行道品質比較圖。可以知道目前縣市、鄉鎮市區、村里間的人行道品質差異，尚無資料的行政區並不在圖表中。
			</p>
		</div>
		<div class="block">
			<p>※1：評分公式見<a href="/about">關於本站</a></p>
		</div>
	{/if}
  <div class="block">
    <OnlineVisitorCount/>
  </div>
	<slot />
</div>

<style>
	.panel {
		background-color: #f4f4f4;
		padding: 12px 20px;
		border: 2px solid rgba(0, 0, 0, 0.2);
		background-clip: padding-box;
		border-radius: 2px;
		max-width: 240px;
		max-height: 88vh;
		overflow: scroll;
	}
	.panel-title {
		font-size: 1.3em;
		padding: 0 0 0.5em 0;
		margin: 0;
	}
	.block {
		margin-bottom: 12px;
		padding: 0 0 8px;
		border-bottom: 1px solid #dadfe2;
	}
	.block-title {
		font-size: 1.2em;
		color: #6d6d6d;
		margin: 0.3em 0;
	}
</style>
