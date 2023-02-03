import { getData } from '$lib/utils/csv';
import Popup from './Popup.svelte';

export async function initMap() {
  const L = await import('leaflet')
	L.Icon.Default.imagePath = 'images/';
	const map = L.map('map').setView([25.0596, 121.4951], 13);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	const village = L.tileLayer(
		'http://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}',
		{
			maxZoom: 19,
		}
	).addTo(map);

  map.attributionControl.addAttribution(
    '村里界圖 &copy; <a href="https://data.gov.tw/dataset/17219">內政部國土測繪中心</a>'
  );

  const data = await getData();
	data.forEach(addRow);
	async function addRow(row) {
		const marker = L.marker([row.lat, row.lng]).addTo(map);
		marker.bindPopup(() => {
			let container = L.DomUtil.create('div');
			new Popup({
				target: container,
				props: { row }
			});
			return container;
		});
	}
}
