<template>
	<span :class="classes">
		<slot></slot>
	</span>
</template>

<script>
	import { oneOf } from '../_util/utils';

	export default {
		name: 'InputGroup',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-input-group',
			},
			size: {
				type: String,
				validator (value) {
				    return oneOf(value, ['small', 'large', 'default']);
				}
			},
			compact: {
				type: Boolean,
				defalut: false
			},
			className: String
		},
		computed: {
			classes: function(){
				let { prefixCls, size, compact, className } = this;
				return [ 
					`${prefixCls}`, 
					{
					  	[`${prefixCls}-lg`]: size === 'large',
					  	[`${prefixCls}-sm`]: size === 'small',
					  	[`${prefixCls}-compact`]: compact,
					  	[`${className}`]: !!className
					}, 
					
				];
			}
		}
	}
</script>