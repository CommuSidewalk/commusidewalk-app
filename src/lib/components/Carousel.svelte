<script>
	/** @type {import('$lib/types').DotTaipeiImage[]} */
	export let images = [];
	let currentSlide = 0;
	let interval = 3000; // Default interval in milliseconds (3 seconds)

	let autoCycle = true;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % images.length;
	}
	function prevSlide() {
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	}

	function startAutoCycle() {
		if (autoCycle) {
			const timer = setInterval(nextSlide, interval);
			return () => clearInterval(timer);
		}
		return () => {};
	}

	let stopAutoCycle = startAutoCycle();

	// Function to toggle automatic cycling
	function toggleAutoCycle() {
		autoCycle = !autoCycle;
		if (autoCycle) {
			stopAutoCycle = startAutoCycle();
		} else {
			stopAutoCycle();
		}
	}

	// Function to set the interval
	function setIntervalValue(newInterval) {
		interval = newInterval;
		if (autoCycle) {
			// If auto-cycling is enabled, restart the timer with the new interval
			stopAutoCycle();
			stopAutoCycle = startAutoCycle();
		}
	}

	function stopCycleOnHover() {
		autoCycle = false;
		stopAutoCycle();
	}

	function resumeCycleOnMouseLeave() {
		autoCycle = true;
		stopAutoCycle = startAutoCycle();
	}

	function formatTimestamp(timestamp) {
		const date = new Date(timestamp * 1000); // Convert to milliseconds
		return date.toLocaleString(); // Adjust the format as needed
	}
</script>

<div class="carousel">
	<div class="slide-container" style="transform: translateX(-{currentSlide * 100}%)">
		{#each images as image}
			<div class="slide" on:mouseenter={stopCycleOnHover} on:mouseleave={resumeCycleOnMouseLeave}>
				<img class="photo" src={image.resourcePath} alt={image.description} />
				{#if image.description}
					<p>{image.description}</p>
				{/if}
				{#if image.timestamp}
					<p>{formatTimestamp(image.timestamp)}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.carousel {
		position: relative;
		overflow: hidden;
	}

	.slide-container {
		display: flex;
		transition: transform 0.3s ease-in-out;
	}

	.slide {
		min-width: 100%;
	}

	.photo {
		max-width: 250px;
		border-radius: 5px;
	}
</style>
