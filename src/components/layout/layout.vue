<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>

	export default {
		name: 'Layout',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-layout',
			},
			className: String,
		},
		data() {
			return {
				hasSider: false,
			}
		},
		computed: {
			classes() {
				let { prefixCls, hasSider, className } = this;
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-has-sider`]: hasSider,
						[`${className}`]: !!className
					},
				]
			}
		},
		created() {
			let flag = false;
			this.$slots.default.forEach(( item, index ) => {
				let tagName = item.tag;
				if( tagName && tagName.indexOf('Sider') != -1 ) {
					flag = true;
				}
			})
			if( flag ){
				this.hasSider = true;
			}
		}
	}
</script>