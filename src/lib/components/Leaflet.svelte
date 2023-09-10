<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import lassImage from '$lib/assets/logo-lass.jpg';

	export let height = '100%';
	export let width = '100%';

	// Must set either bounds, or view and zoom.
	export let bounds = undefined;
	export let view = undefined;
	export let zoom = undefined;
	export let maxZoom = undefined;
	export let attribution = `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`;
	let mapProp = undefined;
	export { mapProp as map };

	export const invalidateSize = () => map?.invalidateSize();

	const dispatch = createEventDispatcher();

	let map;
	$: mapProp = map;

	export const getMap = () => map;
	setContext('layerGroup', getMap);
	setContext('layer', getMap);
	setContext('map', getMap);

	async function createLeaflet(node) {
		await import('leaflet');
		map = window.L.map(node).on('zoom', (e) => dispatch('zoom', e));
		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}

		window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution,
			subdomains: 'abcd',
			maxZoom,
			preferCanvas: true
		}).addTo(map);

		map.attributionControl.setPosition('bottomleft');

		return {
			destroy() {
				map.remove();
				map = undefined;
			}
		};
	}

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}
	}
</script>

<div style="height:{height};width:{width}" use:createLeaflet>
	{#if map}
		<slot {map} />
	{/if}
	<img class="logo" src={lassImage} alt="LASS Logo" />
</div>

<style>
	:global(.leaflet-control-container) {
		position: static;
	}
	.logo {
		position: absolute;
		z-index: 999;
		width: 10em;
		bottom: 1.5em;
		left: 0.5em;
		border-radius: 0.5em;
		pointer-events: none;
	}
</style>
