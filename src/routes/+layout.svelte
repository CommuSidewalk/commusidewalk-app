<script>
	import './styles.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="app">
	<header>
		<span class="title"><a href="/">平安走路許願帳戶 v0.5</a></span>
		<nav>
			<ul>
				<li><a href="/">評分地圖</a></li>
				<li><a href="/accident">事故地圖</a></li>
				<li><a href="/charts">統計圖</a></li>
				<li><a href="/tables">統計表</a></li>
				<li><a href="/about">關於</a></li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
