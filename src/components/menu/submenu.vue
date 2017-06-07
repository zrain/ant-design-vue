<template>
	<li :class="classes">
		<div :class="submenuTitleClasses">
			<slot name="title">{{title}}</slot>
		</div>
		<ul>
			<slot></slot>
		</ul>
	</li>
</template>

<script>
	export default {
		name: 'SubName',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-menu-submenu',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			name: {
				type: [String,Number],
			},
			value: {
				type: [String,Number]
			},
			title: {
				type: String,
			},
			onTitleClick: {
				type: Function
			},
			className: {
				type: String
			}
		},
		data() {
			return {
				mode: ''
			}
		},
		methods: {
			syncMode() {
				this.mode = this.$parent.mode;
			}
		},
		beforeMount() {
			this.syncMode();
		},
		computed: {
			classes() {
				let { prefixCls, className, mode, active, disabled, selected } = this;
				return [
					`${prefixCls}`,
					{
						[`${className}`]: className,
						[`${prefixCls}-${mode}`]: mode,
						[`${prefixCls}-open`]: true,
						[`${prefixCls}-active`]: active,
						[`${prefixCls}-disabled`]: disabled,
						[`${prefixCls}-selected`]: selected
					}
				]
			},
			submenuTitleClasses() {
				let { prefixCls } = this;
				return [
					`${prefixCls}-title`
				];
			}
		},
		updated() {
			this.syncMode();
		}
	}
</script>