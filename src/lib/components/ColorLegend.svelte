<script>
	import { rank2Color } from '$lib/utils/rank2Color';

	const grades = [0, 2, 4, 6, 8, 10];
</script>

<div class="legend-name sidewalk-a1-score">人行道分數</div>
<div class="my-legend">
	{#each grades as grade}
		<div>
			<div class="square" style="background-color: {rank2Color(grade)};" />
			{#if grade === grades[0]}
				<span>{grade}</span>
			{:else}
				<span>{grade}</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.my-legend {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		line-height: 1.5;
		color: #555;
	}
	.square {
		height: 1em;
		width: 3.3em;
	}
	.legend-name {
		padding-top: 0.5em;
	}
	.sidewalk-a1-score::after {
		content: '\203b 1';
		font-size: 0.7em;
		padding-left: 0.5em;
		color: #555;
	}
</style>
