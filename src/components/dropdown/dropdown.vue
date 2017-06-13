<style lang="less" src="./style/index.less"></style>

<template>
	<Trigger :action="trigger" @click="handleDropdownClick" :popup="overlay">
		<slot></slot>
	</Trigger>
</template>

<script>
	import { oneOf } from '../_util/utils';

	export default {
		name: 'Dropdown',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-dropdown',
			},
			overlay: {
				type: String
			},
			trigger: {
				type: Array,
				validator (value) {
					let valiArr = ['click', 'hover'];
					for(var i = value.length - 1; i >= 0; i--) {
						let index = valiArr.indexOf( value[i] );
						if( index != -1 ){
							return true;
						}
					}
					return false;
				}
			},
			placement: {
				type: String,
				validator (value) {
				    return oneOf(value, ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']);
				}
			},
		},
		computed: {
			classes() {
				
			}
		},
		methods: {
			handleDropdownClick() {
				console.info(`[${new Date().getTime()}]`)
			}
		},
	}
</script>