<script>
	import { getContext } from 'svelte';
	import DateRange from './DateRange.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onGetUserLatLng } from '$lib/utils/onGetUserLatLng';
	import a1Point from '$lib/assets/a1_point.png';
	import a2Point from '$lib/assets/a2_point.png';
	import OnlineVisitorCount from './OnlineVisitorCount.svelte';
	import { PUBLIC_ACCIDENT_END_DATE, PUBLIC_ACCIDENT_START_DATE } from '$env/static/public';
	import { toZhTwDateString } from '$lib/utils/date-utils';

	export let a1Layer;
	export let a2Layer;
	let map = getContext('map')();
	let showA1Layer = true;
	let showA2Layer = true;
	let showMore = false;

	const dispatch = createEventDispatcher();

	$: if (map && a1Layer) {
		if (showA1Layer) {
			map.addLayer(a1Layer);
		} else {
			map.removeLayer(a1Layer);
		}
	}

	$: if (map && a2Layer) {
		if (showA2Layer) {
			map.addLayer(a2Layer);
		} else {
			map.removeLayer(a2Layer);
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

	const oneMonthAgo = new Date();
	oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
</script>

<div class="panel">
	<div class="block">
		<p class="panel-title"><strong>交通事故地圖</strong></p>
		<input id="togglePanel" type="checkbox" bind:checked={showMore} />
		<label for="togglePanel">顯示更多</label>
	</div>
	{#if showMore}
		<div class="block">
			<div>
				<p class="block-title">圖層</p>
			</div>
			<input id="toggleA1Layer" type="checkbox" bind:checked={showA1Layer} />
			<label for="toggleA1Layer">A1類事故</label>
			<input id="toggleyA2Layer" type="checkbox" bind:checked={showA2Layer} />
			<label for="toggleyA2Layer">A2類事故</label>
		</div>
		<div class="block">
			<div>
				<p class="block-title">時間</p>
			</div>
			<DateRange start={oneMonthAgo} on:change={handleDateChange} />
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
			<table class="point-legend">
				<tr>
					<td><img src={a1Point} alt="A1點" /></td>
					<td id="cite-1">A1類事故</td>
				</tr>
				<tr>
					<td><img src={a2Point} alt="A2點" /></td>
					<td id="cite-2">A2類事故</td>
				</tr>
			</table>
		</div>

		<div class="block">
			<div>
				<p class="block-title">使用說明</p>
			</div>
			<p>點擊左上角的加減號來放大縮小，也可以使用滑鼠滾輪或手指縮放。拖曳來平移地圖。</p>
			<p>點擊事故點展開事故詳細資料，再選擇「更多資訊」可顯示當事者等級的資訊。</p>
		</div>
		<div class="block">
			<p>※1：造成人員當場或24小時內死亡之交通事故。</p>
			<p>※2：造成人員受傷或超過24時死亡之交通事故。</p>
		</div>
	{/if}
	<div class="block">
		<OnlineVisitorCount />
			<p>
				資料範圍：{toZhTwDateString(PUBLIC_ACCIDENT_START_DATE)}～{toZhTwDateString(
					PUBLIC_ACCIDENT_END_DATE
				)}
			</p>
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

	.point-legend td {
		text-align: right;
	}
	.point-legend img {
		display: inline-block;
		margin-right: 0.5em;
		vertical-align: middle;
	}
	#cite-1::after {
		content: '\203b 1';
		font-size: 0.7em;
		padding-left: 0.5em;
		color: #555;
	}
	#cite-2::after {
		content: '\203b 2';
		font-size: 0.7em;
		padding-left: 0.5em;
		color: #555;
	}
</style>
