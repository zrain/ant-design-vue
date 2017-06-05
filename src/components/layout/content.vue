<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>

	const prefixCls = 'ant-layout-content';

	export default {
		name: 'Content',
		props: {
			className: String
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