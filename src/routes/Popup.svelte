<script>
	export let row;
</script>

<img src={row.imgUrl} width="250px" />
<div>
	分數：
	<ul>
		<li>a1分數：{row.rankA1}</li>
		<li>b1分數：{row.rankB1}</li>
		<li>c1分數：{row.rankC1}</li>
	</ul>
</div>
<div>村里：{row.countyName} {row.townName} {row.villName}</div>
