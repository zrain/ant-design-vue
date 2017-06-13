<template>
	<DomAlign 
		:source="popup" 
		:target="'target'"
		:points="popupAlign"
		:adjustX="true"
		:adjustY="true"
	>
		<slot ref="target"></slot>
	</DomAlign>
</template>

<script>
	export default {
		name: 'Trigger',
		props: {
			action: {
				type: Array,
			},
			popup: {
				type: String,
				default: ''
			},
			popupAlign: {
				type: Object,
			}
		},
		render( createElement ) {
			let slotsVNode = this.$slots.default;
			return slotsVNode[0];
		}
	}
</script>