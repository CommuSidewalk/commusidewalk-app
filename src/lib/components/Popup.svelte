<!-- <script> -->
<!-- 	import L from 'leaflet'; -->
<!-- 	import { getContext } from 'svelte'; -->
<!-- 	let classNames = undefined; -->
<!-- 	export { classNames as class }; -->
<!-- 	export let popup = undefined; -->
<!-- 	let showContents = false; -->
<!-- 	let popupOpen = false; -->
<!-- 	const layer = getContext('layer')(); -->
<!---->
<!-- 	function createPopup(popupElement) { -->
<!-- 		popup = L.popup().setContent(popupElement); -->
<!-- 		layer.bindPopup(popup); -->
<!-- 		layer.on('mouseover', function (e) { -->
<!-- 			this.openPopup(); -->
<!-- 		}); -->
<!-- 		layer.on('mouseout', function (e) { -->
<!-- 			this.closePopup(); -->
<!-- 		}); -->
<!-- 		layer.on('popupopen', () => { -->
<!-- 			popupOpen = true; -->
<!-- 			showContents = true; -->
<!-- 		}); -->
<!-- 		layer.on('popupclose', () => { -->
<!-- 			popupOpen = false; -->
<!-- 			// Wait for the popup to completely fade out before destroying it. -->
<!-- 			// Otherwise the fade out looks weird as the contents disappear too early. -->
<!-- 			setTimeout(() => { -->
<!-- 				if (!popupOpen) { -->
<!-- 					showContents = false; -->
<!-- 				} -->
<!-- 			}, 500); -->
<!-- 		}); -->
<!-- 		return { -->
<!-- 			destroy() { -->
<!-- 				if (popup) { -->
<!-- 					layer.unbindPopup(); -->
<!-- 					popup.remove(); -->
<!-- 					popup = undefined; -->
<!-- 				} -->
<!-- 			} -->
<!-- 		}; -->
<!-- 	} -->
<!-- </script> -->
<!---->
<!-- <div class="hidden"> -->
<!-- 	<div use:createPopup class={classNames}> -->
<!-- 		{#if showContents} -->
<!-- 			<slot /> -->
<!-- 		{/if} -->
<!-- 	</div> -->
<!-- </div> -->
