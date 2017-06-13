<style lang="less" src="./style/index.less"></style>

<template>
	<footer :class="classes">
		<slot></slot>
	</footer>
</template>

<script>

	export default {
		name: 'Footer',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-layout-footer',
			},
			className: String,
		},
		computed: {
			classes() {
				let { prefixCls, className } = this;
				return [
					`${prefixCls}`,
					{
						[`${className}`]: !!className
					},
				]
			}
		}
	}
</script>