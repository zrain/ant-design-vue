<style lang="less" src="./style/index.less"></style>

<template>
	<footer :class="classes">
		<slot></slot>
	</footer>
</template>

<script>

	const prefixCls = 'ant-layout-footer';

	export default {
		name: 'Footer',
		props: {
			className: String,
		},
		computed: {
			classes() {
				let { className } = this;
				return [
					`${prefixCls}`,
					{
						[`${className}`]: className
					},
				]
			}
		}
	}
</script>