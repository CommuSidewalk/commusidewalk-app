<script>
	import { getContext } from 'svelte';
	let classNames = undefined;
	export { classNames as class };

	/** position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' */
	export let position;

	/** The control instance created by this component */
	export let control = undefined;
	const map = getContext('map')();

	async function createControl(container) {
		class Control extends window.L.Control {
			constructor(el, position) {
				super({ position });
				this.el = el;
			}
			onAdd() {
				return this.el;
			}
			onRemove() {}
		}

    // 避免無法滾動control的問題
    // ref: https://github.com/Leaflet/Leaflet/issues/5781#issuecomment-330439505
    window.L.DomEvent.disableScrollPropagation(container);
    window.L.DomEvent.disableClickPropagation(container);

		control = new Control(container, position).addTo(map);
		return {
			destroy() {
				control.remove();
				control = undefined;
			}
		};
	}
</script>

<div  style="display:hidden">
	<div use:createControl class={classNames}>
		{#if control}
			<slot {control} />
		{/if}
	</div>
</div>
