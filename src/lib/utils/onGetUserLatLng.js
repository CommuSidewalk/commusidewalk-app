/**
 * Callback for get user location.
 *
 * @callback getUserLatLngCallback
 * @param {import('$lib/types').LatLng} latlng - user latitude, longitude.
 */

/**
 * 取得使用者經緯度，並執行 callback function
 * @param {getUserLatLngCallback} callback - 回呼函數
 */
export function onGetUserLatLng(callback) {
	if (!navigator.geolocation) {
		console.log('Geolocation is not supported by this browser.');
		return;
	}
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude, longitude } = position.coords;
			callback([latitude, longitude]);
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

