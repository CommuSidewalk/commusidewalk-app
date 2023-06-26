<script>
	import { fetchHelper } from '$lib/utils/fetch-data';

	/** @type {import("$lib/types").EventPoint} */
	export let evPoint;

	/** @type {import("$lib/types").EventGeneralView} */
	let generalView;
	const googleMapLink = `https://maps.google.com/?q=${evPoint.latitude},${evPoint.longitude}`;

	/** @type {import('$lib/types').EventDetail[] | null} */
	let detailEvents = null;
	let isLoading = false;

	async function handleClick() {
		isLoading = true;
		detailEvents = await fetchHelper('detail-events', { event_id: evPoint.event_id });
		isLoading = false;
	}

	fetchHelper('general-events/' + evPoint.event_id).then((gv) => {
		generalView = gv;
		console.log(generalView);
	});
</script>

<section>
	{#if generalView}
		<table>
			<tr>
				<th>死傷人數</th>
				<td>{generalView.number_of_deaths + '死' + generalView.number_of_injuries + '傷'}</td>
			</tr>
			<tr>
				<th>發生時間</th>
				<td>{evPoint.occurrence_date.toLocaleString('zh-TW')}</td>
			</tr>
			<tr>
				<th>發生地點</th>
				<td>{generalView.location}</td>
			</tr>
			<tr>
				<th>經緯度</th>
				<td
					>{parseFloat(evPoint.longitude).toFixed(4)}, {parseFloat(evPoint.latitude).toFixed(4)}
					<a href={googleMapLink} target="_blank" rel="noreferrer" title="在Google Map中開啟">
						<img
							class="google-map-icon"
							alt="google map icon"
							src="https://developers.google.com/static/maps/images/maps-icon.svg"
						/></a
					>
				</td>
			</tr>
      <tr>
				<th>事故型態</th>
				<td>{generalView.accident_type_and_category_main_category_name}</td>
      </tr>
      <tr>
				<th>事故原因</th>
				<td>{generalView.accident_type_and_category_main_category_name} {generalView.accident_type_and_category_sub_category_name}</td>
      </tr>
		</table>
	{:else}
		<span>載入中...</span>
	{/if}

	{#if detailEvents}
		{#each detailEvents as ev}
			<table>
				<thead>
					<tr>
						<th colspan="2">第{ev.party_order.toLocaleString('zh-Hans-TW-u-nu-hanidec')}當事人</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>類型</th>
						<td
							>{ev.party_classification_category_main_category_name_vehicle +
								' - ' +
								ev.party_classification_category_sub_category_name_vehicle}</td
						>
					</tr>
					<tr>
						<th>性別</th>
						<td>{ev.party_gender_name}</td>
					</tr>
					{#if ev.party_age_at_time_of_accident !== -1}
						<tr>
							<th>年齡</th>
							<td>{ev.party_age_at_time_of_accident}</td>
						</tr>
						<tr>
							<th>保護裝備</th>
							<td>{ev.protective_equipment_name}</td>
						</tr>
						<tr>
							<th>行動電話或電腦或其他相類功能裝置名稱</th>
							<td>{ev.mobile_phone_or_computer_or_other_similar_device_name}</td>
						</tr>
						<tr>
							<th>當事者行動狀態</th>
							<td>{ev.party_action_status_sub_category_name}</td>
						</tr>
					{/if}
					{#if ev.hit_and_run_category_name === "是"}
						<tr>
							<th>肇事逃逸</th>
							<td>是</td>
						</tr>
					{/if}

				</tbody>
			</table>
		{/each}
	{:else}
		<button class="more-info" on:click={handleClick}>{isLoading ? '載入中...' : '更多資訊'}</button>
	{/if}
</section>

<style>
	section {
		width: 20em;
    max-height: 40em;
    padding-bottom: 2em;
    overflow: scroll;
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

	th {
		width: 5em;
	}

	.more-info {
		margin-top: 1em;
		width: 100%;
	}
</style>
