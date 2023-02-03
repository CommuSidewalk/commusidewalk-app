<script>
	import './styles.css';
	import '$lib/css/leaflet.css';
</script>

<div class="app">
	<header>
		<span class="title"><a href="/">平安走路許願帳戶</a></span>
		<nav>
			<ul>
				<li><a href="/">地圖</a></li>
				<li><a href="/charts">圖表</a></li>
				<li><a href="/about">關於</a></li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
</div>
