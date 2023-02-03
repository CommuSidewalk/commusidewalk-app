<svelte:head>
	<title>關於</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class='text'>
	<h1>關於本站</h1>

	<p>
		<a href="https://www.facebook.com/groups/884215176097253">平安走路許願帳戶</a
		>專案的線上資料展示。
	</p>

	<h2>評分方式</h2>
	<p>
		依據保護性、有無設置行人空間、佔用情形、原始寬度、行人被迫碰到的最大動態風險來計算人行道得分（<a
			href="https://docs.google.com/document/d/1b_00BjDMkuyZISHzfEKU9DDw32BqmQ95k-O-bshxBQ0/edit#"
			>評分演算法</a
		>）
	</p>
	<ul>
		<li>a1：加權法</li>
		<li>b1：扣分法</li>
		<li>c1：連乘法</li>
	</ul>

	<h2>相關連結</h2>
	<div class="icon-list">
		<a href="https://www.facebook.com/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				class="bi bi-facebook"
				viewBox="0 0 16 16"
			>
				<path
					d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
				/>
			</svg>
		</a>
		<a href="https://github.com/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				class="bi bi-github"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</a>
		<a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">
      <img style="height:32px" src="https://commutag.agawork.tw/static/image/logo.png?v=1.1.5" alt="commutag" />
		</a>
	</div>
</div>

<style>
  .text {
    margin: 10px 50px;
  }
	.icon-list {
		display: flex;
    gap: 10px;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.icon-list a {
		color: #333;
		text-decoration: none;
	}
</style>
