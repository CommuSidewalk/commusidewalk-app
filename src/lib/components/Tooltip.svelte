<script>
	export let text = 'hello';
</script>

<span class="tooltip-container">
	<span class="tooltip-icon">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="currentColor"
			class="bi bi-info-circle"
			viewBox="0 0 16 16"
		>
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path
				d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
			/>
		</svg>
	</span>
	<span class="tooltip-text">
		{text}
	</span>
</span>

<style>
	.tooltip-container {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}

	.tooltip-icon {
		color: #333;
		cursor: pointer;
		background-color: #fff;
	}

	.tooltip-text {
		background-color: #fff;
		border-radius: 10px;
		color: #333;
		display: none;
		padding: 10px;
		position: absolute;
		bottom: 125%;
		transform: translate(-100%, 0%);
		z-index: 1;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
		min-width: 190px;
	}

	.tooltip-container:hover .tooltip-text {
		display: block;
	}
</style>
