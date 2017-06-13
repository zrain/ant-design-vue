<template>
	<li :class="classes">
		<div :class="titleClasses" v-if="title">
			{{title}}
		</div>
		<ul :class="listClasses">
			<slot></slot>
		</ul>
	</li>
</template>

<script>
	export default {
		name: 'MenuItemGroup',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-menu-item-group',
			},
			title: {
				type: String,
			}
		},
		data() {
			return {
			}
		},
		computed: {
			classes() {
				let { prefixCls } = this;
				return [
					`${prefixCls}`
				]
			},
			titleClasses() {
				let { prefixCls } = this;
				return [
					`${prefixCls}-title`
				]
			},
			listClasses() {
				let { prefixCls } = this;
				return [
					`${prefixCls}-list`
				]
			}
		},
		methods: {
		},
		beforeMount() {
		}
	}
</script>