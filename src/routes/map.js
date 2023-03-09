import { PUBLIC_UPDATE_DATE } from '$env/static/public';
import Popup from '$lib/components/Popup.svelte';

function onGetUserLatLng(cb) {
	if (!navigator.geolocation) {
		console.log('Geolocation is not supported by this browser.');
		return;
	}
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude, longitude } = position.coords;
			cb([latitude, longitude]);
		},
		(error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					console.log('User denied the request for Geolocation.');
					break;
				case error.POSITION_UNAVAILABLE:
					console.log('Location information is unavailable.');
					break;
				case error.TIMEOUT:
					console.log('The request to get user location timed out.');
					break;
			}
		}
	);
}

export async function initMap(el, data) {
	const L = await import('leaflet');
	const map = L.map(el, { preferCanvas: true }).setView([25.0453, 121.5403], 13);

	onGetUserLatLng((latlng) => {
		map.flyTo(latlng);
	});

	// base layer
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// WMTS 村里界圖層
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
	map.attributionControl.addAttribution('資料更新時間：' + PUBLIC_UPDATE_DATE);

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

	legend.onAdd = function () {
		const div = L.DomUtil.create('div', 'legend');
		const grades = [0, 2, 4, 6, 8, 10];

		div.innerHTML += '<div>a1分數</div>';
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

	const allMarker = L.layerGroup();

	data.forEach(addPoint);
	async function addPoint(point) {
		const marker = L.circleMarker([point.lat, point.lng], {
			color: rank2Color(point.rankA1),
			fillOpacity: 0.5
		}).addTo(allMarker);

		marker.bindPopup(() => {
			const container = L.DomUtil.create('div');
			new Popup({
				target: container,
				props: { point }
			});
			return container;
		});
	}

	map.addLayer(allMarker);

	map.filterPoints = function (startDate, lastDate) {
		allMarker.clearLayers();
		const filteredPoints = data.filter((point) => {
			const date = point.createdAt;
			return (!startDate || date >= startDate) && (!lastDate || date <= lastDate);
		});
		filteredPoints.forEach(addPoint);
	};

	return { map, layers: { village, allMarker } };
}
