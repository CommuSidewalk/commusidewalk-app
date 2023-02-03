import { getData } from '$lib/utils/csv';
import Popup from './Popup.svelte';

export async function initMap() {
	const L = await import('leaflet');
	L.Icon.Default.imagePath = 'images/';
	const map = L.map('map', { preferCanvas: true }).setView([25.0596, 121.4951], 13);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	const village = L.tileLayer(
		'https://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}',
		{
			maxZoom: 19
		}
	).addTo(map);

	map.attributionControl.addAttribution(
		'村里界圖 &copy; <a href="https://data.gov.tw/dataset/17219">內政部國土測繪中心</a>'
	);

	map.attributionControl.addAttribution(
		'人行道標註資料 &copy; <a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">平安走路許願帳戶-行人庇護空間</a>'
	);

	function rank2Color(rank) {
		return rank > 8
			? '#33FF33'
			: rank > 6
			? '#99FF66'
			: rank > 4
			? '#FFFF66'
			: rank > 2
			? '#FF9933'
			: '#FF0000';
	}

	const legend = L.control({ position: 'bottomright' });

	legend.onAdd = function (map) {
		const div = L.DomUtil.create('div', 'legend'),
			grades = [0, 2, 4, 6, 8, 10],
			labels = [];

    div.innerHTML += '<div>a1分數</div>'
		// loop through our density intervals and generate a label with a colored square for each interval
		for (let i = 0; i < grades.length - 1; i++) {
			div.innerHTML += 
				'<i style="background:' +
				rank2Color(grades[i] + 1) +
				'"></i> ' +
				grades[i] +
				(grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		}
		return div;
	};

	legend.addTo(map);

	const data = await getData();
	data.forEach(addRow);
	async function addRow(row) {
		const marker = L.circleMarker([row.lat, row.lng], {
			color: rank2Color(row.rankA1),
			fillOpacity: 0.5
		}).addTo(map);

		marker.bindPopup(() => {
			const container = L.DomUtil.create('div');
			new Popup({
				target: container,
				props: { row }
			});
			return container;
		});
	}
}
