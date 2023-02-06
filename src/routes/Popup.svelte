<script>
	export let row;
</script>

<section>
	<img src={row.imgUrl} alt="人行道照片" />
	<table>
		<tr>
			<th>分數</th>
			<td>a1: {row.rankA1}</td>
		</tr>
		<tr>
			<th />
			<td>b1: {row.rankB1}</td>
		</tr>
		<tr>
			<th />
			<td>c1: {row.rankC1}</td>
		</tr>
		<tr>
			<th>村里</th>
			<td>{row.countyName} {row.townName} {row.villName}</td>
		</tr>
		<tr>
			<th>經緯度</th>
			<td>{parseFloat(row.lng).toFixed(4)}, {parseFloat(row.lat).toFixed(4)}</td>
		</tr>
		<tr>
			<th>上傳時間</th>
			<td>{row.createdAt.toLocaleString()}</td>
		</tr>
	</table>
</section>

<style>
	img {
		width: 250px;
		border-radius: 5px;
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
