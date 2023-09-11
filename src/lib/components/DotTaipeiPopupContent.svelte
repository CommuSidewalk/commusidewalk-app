<script>
	import Carousel from './Carousel.svelte';

	export let title;
	export let description;
	export let lat;
	export let lng;
	/** @type {import('$lib/types').DotTaipeiImage[]} */
	export let images;
	export let author;
	export let type;

	const googleMapLink = `https://maps.google.com/?q=${lat},${lng}`;
</script>

<section>
	<div class="photo">
		<Carousel {images} />
	</div>
	<table>
		<tr>
			<th>標的</th>
			<th>{title}</th>
		</tr>
		<tr>
			<th>類型</th>
			<th>{type}</th>
		</tr>
		<tr>
			<th>敘述</th>
			<td>{description}</td>
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
			<th>上傳者</th>
			<td>{author}</td>
		</tr>
	</table>
</section>

<style>
	section {
		max-width: 250px;
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
