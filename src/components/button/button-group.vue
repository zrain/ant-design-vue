<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
	import { oneOf } from '../_util/utils';

	export default {
		name: 'ButtonGroup',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-btn-group',
			},
			size: {
				type: String,
				validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                }
			},
			className: String,
		},
		computed: {
			classes () {
				let { prefixCls, size, className } = this;
				let sizeCls = '';

				switch (size) {
				  case 'large':
				    sizeCls = 'lg';
				    break;
				  case 'small':
				    sizeCls = 'sm';
				  default:
				    break;
				}
				
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-${sizeCls}`]: sizeCls,
						[`${className}`]: !!className
					},
				]
			}
		}
	}
</script>