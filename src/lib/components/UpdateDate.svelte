<script>
	import { toZhTwDateString } from '$lib/utils/date-utils';
	import { fetchLatestDataDate } from '$lib/utils/fetch-data';
</script>

{#await fetchLatestDataDate(fetch) then date}
	<div>資料更新時間：{toZhTwDateString(date)}</div>
{/await}
