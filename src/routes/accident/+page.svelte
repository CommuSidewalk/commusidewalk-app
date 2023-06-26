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

	let a1Layer;
	let a2Layer;
	let map;

	/** @type {import('$lib/types').LatLng} */
	const initialView = [25.0453, 121.5403]; // 初始經緯度，台北市某處

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	/**
	 * Add event points into map layer.
	 * @param {import('$lib/types').EventPoint[]} points - event points.
	 * @param {Object} layer - Leaflet Layer.
	 */
	function addPointsToLayer(points, layer) {
		if (!window.L) return;

		points.forEach((point) => {
			const marker = window.L.circleMarker([point.latitude, point.longitude], {
				color: point.color,
				opacity: 0.7,
				fillOpacity: 0.5,
				stroke: point.accident_category_name === 'A1',
				radius: point.accident_category_name === 'A1' ? 7 : 5
			}).addTo(layer);

			marker.bindPopup(() => {
				const container = window.L.DomUtil.create('div');
				new EventPopupContent({
					target: container,
					props: { evPoint: point }
				});

				return container;
			});
		});
	}

	function initLeaflet() {
		a1Layer = window.L.layerGroup();
		a2Layer = window.L.layerGroup();
		map.addLayer(a1Layer);
		map.addLayer(a2Layer);

		let date = new Date();
		date.setDate(date.getDate() - 30);
		const startDate = date2ISOString(date);
		updateEventsToLayer(startDate);
	}

	async function updateEventsToLayer(startDate = null, endDate = null) {
		if (!a1Layer || !a2Layer) return;
		let params;
		if (startDate && endDate) {
			params = { startDate, endDate };
		} else if (startDate === null) {
			params = { endDate };
		} else if (endDate === null) {
			params = { startDate };
		}
		const events = await fetchHelper('general-events', params);

		a1Layer.clearLayers();
		a2Layer.clearLayers();

		const a1 = [];
		const a2 = [];
		for (const ev of events) {
			if (ev.accident_category_name === 'A1') {
				a1.push(ev);
			} else if (ev.accident_category_name === 'A2') {
				a2.push(ev);
			}
		}
		addPointsToLayer(a2, a2Layer);
		addPointsToLayer(a1, a1Layer);
	}

	function handleFilterDateRange(e) {
		const { start, end } = e.detail;
		const startDate = date2ISOString(start) || null;
		const endDate = date2ISOString(end) || null;
		updateEventsToLayer(startDate, endDate);
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
		<AccidentControlPanel {a1Layer} {a2Layer} on:filter-date-range={handleFilterDateRange} />
	</Control>
	{#if map}
		<div use:initLeaflet />
	{/if}
</Leaflet>
