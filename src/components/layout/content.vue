<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>

	export default {
		name: 'Content',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-layout-content',
			},
			className: String
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