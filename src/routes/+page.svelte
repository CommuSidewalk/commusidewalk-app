<script>
	import Loading from '$lib/components/Loading.svelte';
	import Control from '$lib/components/Control.svelte';
	import Leaflet from '$lib/components/Leaflet.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import SidewalkPopupContent from '$lib/components/SidewalkPopupContent.svelte';
	import DotTaipeiPopupContent from '$lib/components/DotTaipeiPopupContent.svelte';
	import { rank2Color } from '$lib/utils/rank2Color.js';
	import { fetchDateRangeData } from '$lib/utils/fetch-data.js';
	import '$lib/css/MarkerCluster.css';
	import '$lib/css/MarkerCluster.Default.css';
	import UpdateDate from '$lib/components/UpdateDate.svelte';
	import _ from 'lodash';
	import CircleMarker from '$lib/components/CircleMarker.svelte';
	import dotTaipeiLocationIndicator from '$lib/assets/dot_taipei_location_indicator.png';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let villageLayer;
	let dotTaipeiLayer;
	let sidewalkLayer;

	/** @type {import('$lib/types').LatLng} */
	const initialView = [25.0453, 121.5403]; // 初始經緯度，台北市某處

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	/**
	 * Add sidewalk points into map layer.
	 * @param {import('$lib/types.d.ts').SidewalkPoint[]} points - sidewalk points.
	 * @param {Object} layer - Leaflet Layer.
	 */
	function addSidewalkPointsToLayer(points, layer) {
		if (!L) return;

		points.forEach((point) => {
			const marker = window.L.circleMarker([point.lat, point.lng], {
				color: rank2Color(point.rankA1),
				fillOpacity: 0.7,
				stroke: true,
				strokeOpacity: 0.9,
				radius: 5
			}).addTo(layer);

			marker.rankA1 = point.rankA1;
			marker.bindPopup(() => {
				const container = window.L.DomUtil.create('div');
				new SidewalkPopupContent({
					target: container,
					props: { ...point }
				});

				return container;
			});
		});
	}

	/**
	 * Add dot taipei points into map layer.
	 * @param {import('$lib/types.d.ts').DotTaipeiPoint[]} points - dot taipei points.
	 * @param {Object} layer - Leaflet Layer.
	 */
	function addDotTaipeiPointsToLayer(points, layer) {
		if (!L) return;
		const dotTaipeiIndicatorIcon = L.icon({
			iconUrl: dotTaipeiLocationIndicator,
			shadowUrl: 'leaf-shadow.png',

			iconSize: [40, 62], // size of the icon
			shadowSize: [0, 0], // size of the shadow
			iconAnchor: [20, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [0, 0], // the same for the shadow
			popupAnchor: [0, -76] // point from which the popup should open relative to the iconAnchor
		});

		points.forEach((point) => {
			if (point.lat && point.lng) {
				const marker = window.L.marker([point.lat, point.lng], {
					icon: dotTaipeiIndicatorIcon
				}).addTo(layer);

				marker.bindPopup(() => {
					const container = window.L.DomUtil.create('div');
					new DotTaipeiPopupContent({
						target: container,
						props: { ...point }
					});

					return container;
				});
			}
		});
	}

	async function handleFilterDateRange(e) {
		if (!sidewalkLayer) return;
		const { start, end } = e.detail;
		const filteredData = await fetchDateRangeData(fetch, start, end);
		sidewalkLayer.clearLayers();
		addSidewalkPointsToLayer(filteredData, sidewalkLayer);
	}

	async function initLeaflet() {
		await import('leaflet.markercluster');

		sidewalkLayer = window.L.markerClusterGroup({
			chunkedLoading: true,
			disableClusteringAtZoom: 15,
			iconCreateFunction: function (cluster) {
				const childCount = cluster.getChildCount();
				const markers = cluster.getAllChildMarkers();

				const classNameOfRankColor =
					'marker-cluster-' + Math.round(10 - _.meanBy(markers, 'rankA1'));
				return new window.L.DivIcon({
					html: '<div><span>' + childCount + '</span></div>',
					className: 'marker-cluster ' + classNameOfRankColor,
					iconSize: new window.L.Point(40, 40)
				});
			}
		});

		map.addLayer(sidewalkLayer);
		addSidewalkPointsToLayer(data.sidewalkData, sidewalkLayer);

		// WMTS 村里界圖層
		villageLayer = window.L.tileLayer(
			'https://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}',
			{
				maxZoom: 19
			}
		).addTo(map);

		// 台北市行人安全友善環境改善標的
		dotTaipeiLayer = window.L.layerGroup();
		addDotTaipeiPointsToLayer(data.dotTaipeiData, dotTaipeiLayer);
		map.addLayer(dotTaipeiLayer);
	}

	const attribution =
		'&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>, 村里界圖 &copy; <a href="https://data.gov.tw/dataset/17219">內政部國土測繪中心</a>, 人行道標註資料 &copy; <a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">平安走路許願帳戶-行人庇護空間</a>';
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="臺灣人行道評分互動式看板" />
</svelte:head>
<svelte:window on:resize={resizeMap} />

{#if !map}
	<Loading />
{/if}
<Leaflet bind:map view={initialView} zoom={13} maxZoom={19} {attribution}>
	<Control position="topright">
		<ControlPanel {villageLayer} {dotTaipeiLayer} on:filter-date-range={handleFilterDateRange}>
			{#if data.sidewalkData}
				<div>標註總數：{data.sidewalkData.length}</div>
				<UpdateDate />
			{/if}
		</ControlPanel>
	</Control>
	{#if map}
		<div use:initLeaflet />
	{/if}
	<!-- Too lag -->
	<!-- {#each data.sidewalkData as point} -->
	<!--   <CircleMarker latlng={[point.lat, point.lng]} color={rank2Color(point.rankA1)} radius={10} stroke={false}> -->
	<!--     <Popup> -->
	<!--         <SidewalkPopup {...point} /> -->
	<!--     </Popup> -->
	<!--   </CircleMarker> -->
	<!-- {/each} -->
</Leaflet>
