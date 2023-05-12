<script>
	export let imgUrl;
	export let rankA1;
	// export let rankB1;
	// export let rankC1;
	export let countyName;
	export let townName;
	export let villName;
	export let lat;
	export let lng;
	export let createdAt;
	export let remark;

	const googleMapLink = `https://maps.google.com/?q=${lat},${lng}`;
</script>

<section>
	<a href={imgUrl} rel="noreferrer" target="_blank" title="在新分頁中開啟圖片">
		<img class="photo" src={imgUrl} alt="人行道照片" />
	</a>
	<table>
		<tr>
			<th>分數</th>
			<td>{rankA1}</td>
		</tr>
		<!-- <tr> -->
		<!-- 	<th /> -->
		<!-- 	<td>b1: {rankB1}</td> -->
		<!-- </tr> -->
		<!-- <tr> -->
		<!-- 	<th /> -->
		<!-- 	<td>c1: {rankC1}</td> -->
		<!-- </tr> -->
		<tr>
			<th>村里</th>
			<td>{countyName} {townName} {villName}</td>
		</tr>
		<tr>
			<th>經緯度</th>
			<td
				>{parseFloat(lng).toFixed(4)}, {parseFloat(lat).toFixed(4)}<a
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
			<td>{createdAt.toLocaleString()}</td>
		</tr>
		<tr>
			<th>備註</th>
			<td>{remark}</td>
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
		margin-top: 0.5em;
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #ddd;
		font-weight: normal;
		text-align: left;
		padding: 0.3em 0.5em;
	}
</style>
