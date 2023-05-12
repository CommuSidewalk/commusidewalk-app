<script>
	import L from 'leaflet';
	import { getContext, setContext } from 'svelte';

	export let marker = undefined;
	export let latlng;
	export let color;
	export let radius = 10;
	export let stroke = true;

	const layerGroup = getContext('layerGroup')();
	setContext('layer', () => marker);

	// 原本作者是為了div marker寫的，我們是用circlemarker所以不需要element
	function createMarker(markerElement) {
		marker = L.circleMarker(latlng, {
			color,
			radius,
			stroke,
			fillOpacity: 0.5
		}).addTo(layerGroup);

		return {
			destroy() {
				if (marker) {
					marker.remove();
					marker = undefined;
				}
			}
		};
	}
</script>

<div class="hidden">
	<div use:createMarker>
		{#if marker}
			<slot />
		{/if}
	</div>
</div>
