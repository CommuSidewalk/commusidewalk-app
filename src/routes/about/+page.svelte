<script>
	import { PUBLIC_UPDATE_DATE } from '$env/static/public';
	import logoLASS from '$lib/assets/logo-lass.jpg';
</script>

<svelte:head>
	<title>關於本站 - 平安走路許願帳戶</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<h2>關於本站</h2>

	<p>
		<a href="https://www.facebook.com/groups/884215176097253">平安走路許願帳戶</a
		>專案的線上資料展示。
	</p>

	<h3>評分方式</h3>
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
	<p>地圖上的點位著色是以 a1 加權法為基準。</p>

	<h3>資料更新時間</h3>
	<span>{PUBLIC_UPDATE_DATE}</span>

	<h3>相關連結</h3>
	<div class="icon-list">
		<a href="https://www.facebook.com/groups/884215176097253">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-facebook"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
					/>
				</svg>
				平安走路許願帳戶社團
			</div>
		</a>
		<a href="https://commutag.agawork.tw/dataset?id=63528cc34f042e88cc951433">
			<div>
				<img
					style="height: 24px"
					src="https://commutag.agawork.tw/static/image/logo.png?v=1.1.5"
					alt="commutag"
				/>
				群眾標註
			</div>
		</a>
		<a href="https://www.facebook.com/groups/LASSnet">
			<div>
				<img style="height: 50px" src={logoLASS} alt="LASS-net logo" />
			</div>
		</a>
		<a href="https://github.com/CommuSidewalk/commusidewalk-data">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-github"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
				開源程式碼 - R 資料處理
			</div>
		</a>
		<a href="https://github.com/CommuSidewalk/commusidewalk-app">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-github"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
				開源程式碼 - 本站
			</div>
		</a>
		<a href="https://docs.google.com/document/d/1ziEal-ct8kgI2N_db41SLOtgksk2dz_AiWg_v5iuxco">
			<div>API 文件</div>
		</a>
	</div>

	<h3>建議與回饋</h3>
	<p>
		若您有任何建議、回饋或錯誤需要回報，請填寫<a href="https://forms.gle/kygHjXtqt2MZa7YK7">表單</a
		>。
	</p>

	<h3>聯絡資訊</h3>
	<p>bluebetweenneck@gmail.com</p>
</div>

<style>
	.icon-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.icon-list div {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 10px 20px;
		background-color: #eee;
		color: #333;
		border-radius: 30px;
		cursor: pointer;
		text-align: center;
	}

	.icon-list a {
		color: #333;
		text-decoration: none;
	}
	h3 {
		margin: 1.5em 0 0.5em 0;
	}
	h2 {
		margin: 0;
	}
</style>
