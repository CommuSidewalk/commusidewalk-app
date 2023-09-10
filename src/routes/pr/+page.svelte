<script>
	import slide1 from '$lib/assets/slides/1.webp';
	import slide2 from '$lib/assets/slides/2.webp';
	import slide3 from '$lib/assets/slides/3.webp';
	import slide4 from '$lib/assets/slides/4.webp';
	import slide5 from '$lib/assets/slides/5.webp';
	import { onDestroy } from 'svelte';

	const slides = [slide1, slide2, slide3, slide4, slide5];

	let currentSlideIdx = 0;
	let dots = Array.from({ length: slides.length }, (_, i) => i);
	let autoSlideTimeout = setTimeout(() => moveSlide(1), 5000);

	function changeSlide(index) {
		currentSlideIdx = index;
	}

	function moveSlide(offset) {
		clearTimeout(autoSlideTimeout);
		currentSlideIdx += offset;
		if (currentSlideIdx >= slides.length) {
			currentSlideIdx = 0;
		} else if (currentSlideIdx < 0) {
			currentSlideIdx = slides.length - 1;
		}
		autoSlideTimeout = setTimeout(() => moveSlide(1), 5000);
	}

	onDestroy(() => {
		clearTimeout(autoSlideTimeout);
	});
</script>

<svelte:head>
	<title>專案概述 - 平安走路許願帳戶</title>
	<meta name="description" content="專案概述" />
</svelte:head>

<div class="content">
	<h2>專案介紹</h2>
	<div>
		<div class="slideshow-container">
			{#each slides as slideImg, i}
				<div
					class="mySlides fade"
					style={currentSlideIdx == i ? 'display: block;' : 'display: none;'}
				>
					<div class="number-text">{i + 1} / {slides.length}</div>
					<img src={slideImg} style="width:100%" alt="project introduction slide" />
				</div>
			{/each}

			<!-- Next and previous buttons -->
			<button class="prev" on:click={() => moveSlide(-1)}>&#10094;</button>
			<button class="next" on:click={() => moveSlide(1)}>&#10095;</button>
		</div>
		<div style="text-align:center">
			{#each dots as dot}
				<button
					class="dot"
					class:active={currentSlideIdx === dot}
					on:click={() => changeSlide(dot)}
				/>
			{/each}
		</div>
	</div>
	<div>
		<p>
			本專案主要希望提供公民參與及導出民眾的關心、呈現行人需求，由公民自主參與。最後的分析結果只能適合反映整體的樣態與民眾的經驗。
			進一步的探討或其他目的，都應該另執行更嚴謹的設計與取樣，取得更全面的數據。
		</p>

		收集各地行人庇護設施與空間的照片
		<ul>
			<li>比對各縣市政府保障弱勢用路人的資源與策略，使民眾具體察覺交通保障落差。</li>
			<li>經營群眾壓力改變管理策略，讓你我老後、至親好友有安全行走空間。</li>
			<li>提供交通及工務單位具體規劃與追蹤管理的參照資料。</li>
		</ul>

		<p>
			平安走路許願帳戶包含兩個主要連結：<a
				href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">資料集平台</a
			>與<a href="/">資料呈現圖台</a
			>。想要突顯、幫助大眾在地人行道問題的使用者可以藉由資料集平台協助上傳、標註作業；想要分析、查看人行道安全性狀況的使用者，可以由資料呈現圖台取得所需的資訊。
		</p>
	</div>
	<h3>上傳教學</h3>
	<ol>
		<li>
			進入<a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">群眾標註</a>
		</li>
		<li>觀看使用說明影片：</li>
	</ol>
	<iframe
		style="width: 100%; height: 56.25%;"
		src="https://www.youtube.com/embed/6EXhaxbiMwQ"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	/>
</div>

<style>
	.content {
		margin: 0 auto;
		padding: 1em;
		max-width: 60em;
	}

	/* Tablets */
	@media (min-width: 768px) and (max-width: 1024px) {
		.content {
			max-width: 40em;
		}
	}

	/* Smartphones */
	@media (max-width: 767px) {
		.content {
			max-width: 30em;
		}
	}

	/* Slideshow container */
	.slideshow-container {
		position: relative;
		margin: 0 auto;
	}

	/* Hide the images by default */
	.mySlides {
		display: none;
	}

	button {
		background-color: transparent;
		background-repeat: no-repeat;
		border: none;
		cursor: pointer;
		overflow: hidden;
		outline: none;
	}

	/* Next & previous buttons */
	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		margin-top: -22px;
		padding: 16px;
		color: white;
		background-color: rgba(0, 0, 0, 0.2);
		font-weight: bold;
		font-size: 18px;
		transition: 0.6s ease;
		border-radius: 0 3px 3px 0;
		user-select: none;
	}

	/* Position the "next button" to the right */
	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	/* On hover, add a black background color with a little bit see-through */
	.prev:hover,
	.next:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}

	/* Number text (1/3 etc) */
	.number-text {
		color: #f2f2f2;
		font-size: 12px;
		padding: 8px 12px;
		position: absolute;
		top: 0;
	}

	/* The dots/bullets/indicators */
	.dot {
		cursor: pointer;
		height: 15px;
		width: 15px;
		margin: 0 2px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		transition: background-color 0.6s ease;
	}

	.active,
	.dot:hover {
		background-color: #717171;
	}

	/* Fading animation */
	.fade {
		animation-name: fade;
		animation-duration: 1.5s;
	}

	h3 {
		margin: 1.5em 0 0.5em 0;
	}
	h2 {
		margin: 0;
	}
</style>
