<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import 'leaflet/dist/leaflet.css';

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
		const L = await import('leaflet');
		map = L.map(node).on('zoom', (e) => dispatch('zoom', e));
		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
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
</div>

<style>
	:global(.leaflet-control-container) {
		position: static;
	}
</style>
