import * as L from 'leaflet';
import rank from '$lib/data/data.json';

const map = L.map('map').setView([25.0596, 121.4951], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const data = rank.filter((row) => row.lat && row.lng);
L.Icon.Default.imagePath = 'images/';
for (const row of data) {
	let popupContent = `<img src="${row.imgUrl}" width="250px"/>`;
	popupContent += `<ul><li>a1分數：${row.rankA1}</li><li>b1分數：${row.rankB1}</li><li>c1分數：${row.rankC1}</li></ul>`;
	const marker = L.marker([row.lat, row.lng]).addTo(map).bindPopup(popupContent);
}
// const marker = L.marker([51.5, -0.09])
// 	.addTo(map)
// 	.bindPopup('<b>Hello world!</b><br />I am a popup.')
// 	.openPopup();
//
// const circle = L.circle([51.508, -0.11], {
// 	color: 'red',
// 	fillColor: '#f03',
// 	fillOpacity: 0.5,
// 	radius: 500
// })
// 	.addTo(map)
// 	.bindPopup('I am a circle.');
//
// const polygon = L.polygon([
// 	[51.509, -0.08],
// 	[51.503, -0.06],
// 	[51.51, -0.047]
// ])
// 	.addTo(map)
// 	.bindPopup('I am a polygon.');
//
// const popup = L.popup()
// 	.setLatLng([51.513, -0.09])
// 	.setContent('I am a standalone popup.')
// 	.openOn(map);

// function onMapClick(e) {
// 	popup.setLatLng(e.latlng).setContent(`You clicked the map at ${e.latlng.toString()}`).openOn(map);
// }
//
// map.on('click', onMapClick);
