<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
	import { oneOf } from '../_util/utils';

	const prefixCls = 'ant-btn-group'

	export default {
		name: 'ButtonGroup',
		props: {
			size: {
				type: String,
				validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                }
			},
			classNames: String,
		},
		computed: {
			classes () {
				let sizeCls = '';
				let { size, classNames } = this;
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
					},
					classNames
				]
			}
		}
	}
</script>