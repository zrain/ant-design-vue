<style lang="less" src="./style/index.less"></style>

<template>
	<header :class="classes">
		<slot></slot>
	</header>
</template>

<script>

	const prefixCls = 'ant-layout-header';

	export default {
		name: 'Header',
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