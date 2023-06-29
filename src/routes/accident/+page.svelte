<script>
	import Loading from '$lib/components/Loading.svelte';
	import Leaflet from '$lib/components/Leaflet.svelte';
	import '$lib/css/MarkerCluster.css';
	import '$lib/css/MarkerCluster.Default.css';
	import EventPopupContent from '$lib/components/EventPopupContent.svelte';
	import { fetchHelper } from '$lib/utils/fetch-data';
	import { date2ISOString } from '$lib/utils/date-utils';
	import AccidentControlPanel from '$lib/components/AccidentControlPanel.svelte';
	import Control from '$lib/components/Control.svelte';
	import { parseStreamResponse } from '$lib/utils/parse-stream-response';

	let a1Layer;
	let a2Layer;
	let map;
  let isLoading = true;

	/** @type {import('$lib/types').LatLng} */
	const initialView = [25.0453, 121.5403]; // 初始經緯度，台北市某處

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	/**
	 * Add event point into map layer.
	 * @param {import('$lib/types').EventPoint} evPoint - event point.
	 * @param {Object} layer - Leaflet Layer.
	 */
	function addEventPointToLayer(evPoint) {
		if (!window.L) return;

		const layer = evPoint.accident_category_name === 'A1' ? a1Layer : a2Layer;
		const marker = window.L.circleMarker([evPoint.latitude, evPoint.longitude], {
			color: evPoint.accident_category_name === 'A1' ? '#d430ba' : '#7de2f9',
			opacity: 0.7,
			fillOpacity: 0.5,
			stroke: evPoint.accident_category_name === 'A1',
			radius: evPoint.accident_category_name === 'A1' ? 7 : 5
		}).addTo(layer);

		marker.bindPopup(() => {
			const container = window.L.DomUtil.create('div');
			new EventPopupContent({
				target: container,
				props: { evPoint }
			});

			return container;
		});
	}

	function initLeaflet() {
		a1Layer = window.L.layerGroup();
		a2Layer = window.L.layerGroup();
		map.addLayer(a2Layer);
		map.addLayer(a1Layer);

		// 第一次進入頁面，載入近30日的資料
		let date = new Date();
		date.setDate(date.getDate() - 30);
		const startDate = date2ISOString(date);
		updateEventsByDateRange(startDate);
	}

	async function updateEventsByDateRange(startDate = null, endDate = null) {
		if (!a1Layer || !a2Layer) return;
		let params;
		if (startDate && endDate) {
			params = { startDate, endDate };
		} else if (startDate === null) {
			params = { endDate };
		} else if (endDate === null) {
			params = { startDate };
		}
		a1Layer.clearLayers();
		a2Layer.clearLayers();
    isLoading = true;

		const response = await fetchHelper('general-events', params, true);
		parseStreamResponse(response, addEventPointToLayer, () => {
      isLoading = false;
    });
	}

	function handleFilterDateRange(e) {
		const { start, end } = e.detail;
		const startDate = date2ISOString(start) || null;
		const endDate = date2ISOString(end) || null;
		updateEventsByDateRange(startDate, endDate);
	}

	const attribution =
		'&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>, 交通事故資料 &copy; <a href="https://data.gov.tw/dataset/12818">即時交通事故資料(A1類)</a>, <a href="https://data.gov.tw/dataset/13139">即時交通事故資料(A2類)</a>';
</script>

<svelte:head>
	<title>地圖 - 平安走路許願帳戶</title>
	<meta name="description" content="臺灣人行道評分互動式看板" />
</svelte:head>
<svelte:window on:resize={resizeMap} />

{#if isLoading}
<Loading />
{/if}
<Leaflet bind:map view={initialView} zoom={13} maxZoom={19} {attribution}>
	<Control position="topright">
		<AccidentControlPanel {a1Layer} {a2Layer} on:filter-date-range={handleFilterDateRange} />
	</Control>
	{#if map}
		<div use:initLeaflet />
	{/if}
</Leaflet>
