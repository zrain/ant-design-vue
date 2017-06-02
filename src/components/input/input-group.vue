<template>
	<span :class="classes">
		<slot></slot>
	</span>
</template>

<script>
	import { oneOf } from '../_util/utils';

	const prefixCls = 'ant-input-group';

	export default {
		name: 'InputGroup',
		props: {
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
				let { size, compact, className } = this;
				return [ 
					prefixCls, 
					{
					  	[`${prefixCls}-lg`]: size === 'large',
					  	[`${prefixCls}-sm`]: size === 'small',
					  	[`${prefixCls}-compact`]: compact,
					}, 
					className
				];
			}
		}
	}
</script>