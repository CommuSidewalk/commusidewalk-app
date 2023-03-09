<script>
	export let point;

	const googleMapLink = `https://maps.google.com/?q=${point.lat},${point.lng}`;
</script>

<section>
	<a href={point.imgUrl} rel="noreferrer" target="_blank" title="在新分頁中開啟圖片">
		<img class="photo" src={point.imgUrl} alt="人行道照片" />
	</a>
	<table>
		<tr>
			<th>分數</th>
			<td>a1: {point.rankA1}</td>
		</tr>
		<tr>
			<th />
			<td>b1: {point.rankB1}</td>
		</tr>
		<tr>
			<th />
			<td>c1: {point.rankC1}</td>
		</tr>
		<tr>
			<th>村里</th>
			<td>{point.countyName} {point.townName} {point.villName}</td>
		</tr>
		<tr>
			<th>經緯度</th>
			<td
				>{parseFloat(point.lng).toFixed(4)}, {parseFloat(point.lat).toFixed(4)}<a
					href={googleMapLink}
					target="_blank"
					rel="noreferrer"
					title="在Google Map中開啟"
					><img
						class="google-map-icon"
						alt="google map icon"
						src="https://developers.google.com/static/maps/images/maps-icon.svg"
					/></a
				></td
			>
		</tr>
		<tr>
			<th>上傳時間</th>
			<td>{point.createdAt.toLocaleString()}</td>
		</tr>
	</table>
</section>

<style>
	.photo {
		width: 250px;
		border-radius: 5px;
	}

	.google-map-icon {
		width: 18px;
		position: relative;
		margin-left: 2px;
		top: 3px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #ddd;
		text-align: left;
	}
	th {
		background-color: #eee;
		font-weight: bold;
		width: 30%;
		vertical-align: middle;
	}
	td {
		width: 80%;
	}
</style>
