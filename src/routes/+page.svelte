<script>
	import L from 'leaflet';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import Control from '$lib/components/Control.svelte';
	import Leaflet from '$lib/components/Leaflet.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import { rank2Color } from '$lib/utils/rank2Color.js';
	import { fetchDateRangeData } from '$lib/utils/fetch-data.js';
	import SidewalkPopupContent from '$lib/components/SidewalkPopupContent.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let layerGroup;
	let villageLayer;
	let sidewalkLayer;

	// 初始經緯度，台北市某處
	const initialView = [25.0453, 121.5403];

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function resetMapView() {
		map.setView(initialView, 5);
	}

	$: if (map) {
		sidewalkLayer = L.layerGroup();
		map.addLayer(sidewalkLayer);
		addPointsToLayer(data.sidewalkData, sidewalkLayer);

		// WMTS 村里界圖層
		villageLayer = L.tileLayer(
			'https://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}',
			{
				maxZoom: 19
			}
		).addTo(map);
	}

	function addPointsToLayer(points, layer) {
		points.forEach((point) => {
			const marker = L.circleMarker([point.lat, point.lng], {
				color: rank2Color(point.rankA1),
				fillOpacity: 0.5,
				stroke: false,
				radius: 5
			}).addTo(layer);

			marker.bindPopup(() => {
				const container = L.DomUtil.create('div');
				new SidewalkPopupContent({
					target: container,
					props: { ...point }
				});

				return container;
			});
		});
	}

	async function handleFilterDateRange(e) {
		if (!sidewalkLayer) return;
		const { start, last } = e.detail;
		const filteredData = await fetchDateRangeData(fetch, start, last);
		sidewalkLayer.clearLayers();
		addPointsToLayer(filteredData, sidewalkLayer);
	}

	const attribution =
		'&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>, 村里界圖 &copy; <a href="https://data.gov.tw/dataset/17219">內政部國土測繪中心</a>, 人行道標註資料 &copy; <a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">平安走路許願帳戶-行人庇護空間</a>';
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="臺灣人行道評分互動式看板" />
</svelte:head>
<svelte:window on:resize={resizeMap} />

<Leaflet bind:map view={initialView} zoom={13} maxZoom={19} {attribution}>
	<Control position="topright">
		<ControlPanel {villageLayer} on:filter-date-range={handleFilterDateRange}>
			{#if data.sidewalkData}
				<div>標註總數：{data.sidewalkData.length}</div>
				<div>資料更新時間：{PUBLIC_UPDATE_DATE}</div>
			{/if}
		</ControlPanel>
	</Control>
	<!-- Too lag -->
	<!-- {#each data.sidewalkData as point} -->
	<!--   <CircleMarker latlng={[point.lat, point.lng]} color={rank2Color(point.rankA1)} radius={5} stroke={false}> -->
	<!--     <Popup> -->
	<!--         <SidewalkPopup {...point} /> -->
	<!--     </Popup> -->
	<!--   </CircleMarker> -->
	<!-- {/each} -->
</Leaflet>
