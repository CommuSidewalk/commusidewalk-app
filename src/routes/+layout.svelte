<script>
	import './styles.css';
	import '$lib/css/leaflet.css';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
</script>

<div class="app">
	<header>
		<span class="title"><a href="/">平安走路許願帳戶 v0.1</a></span>
		<nav>
			<ul>
				<li><a href="/">地圖</a></li>
				<li><a href="/charts">圖表</a></li>
				<li><a href="/about">關於本站</a></li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<Tooltip text={'資料更新日期：' + PUBLIC_UPDATE_DATE} />
</div>
