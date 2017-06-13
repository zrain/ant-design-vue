<style lang="less" src="./style/index.less"></style>

<template>
	<header :class="classes">
		<slot></slot>
	</header>
</template>

<script>

	export default {
		name: 'Header',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-layout-header',
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