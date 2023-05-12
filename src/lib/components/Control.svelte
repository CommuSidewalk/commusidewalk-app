<script>
	import L from 'leaflet';

	class Control extends L.Control {
		constructor(el, position) {
			super({ position });
			this.el = el;
		}
		onAdd() {
			return this.el;
		}
		onRemove() {}
	}

	import { getContext } from 'svelte';
	let classNames = undefined;
	export { classNames as class };

	/** position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' */
	export let position;

	/** The control instance created by this component */
	export let control = undefined;
	const map = getContext('map')();

	function createControl(container) {
		console.log(container);
		control = new Control(container, position).addTo(map);
		return {
			destroy() {
				control.remove();
				control = undefined;
			}
		};
	}
</script>

<div style="display:hidden">
	<div use:createControl class={classNames}>
		{#if control}
			<slot {control} />
		{/if}
	</div>
</div>
