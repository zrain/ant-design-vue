<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes" :style="styles">
		<div :class="childrenClasses">
			<slot></slot>
		</div>
		<!-- trigger == null? -->
		<template v-if="collapsible || below">
			<template v-if="trigger !== null || slot_trigger">
				<template v-if="collapsedWidth === 0 || collapsedWidth === '0'" >
					<span
						:class="zeroWidthTriggerClasses"
						@click="toggle()" 
						
					>
						<Icon type="bars" />
					</span>
				</template>
				<template v-else>
					<div :class="triggerClasses" @click="toggle()">
						<span v-if="trigger || slot_trigger">
							<slot name="trigger">{{trigger}}</slot>
						</span>
						<template v-else>
							<template v-if="scope_collapsed">
								<Icon v-if="reverseArrow" type="let" />
								<Icon v-else type="right" />
							</template>
							<template v-else>
								<Icon v-if="reverseArrow" type="right" />
								<Icon v-else type="left" />
							</template>
						</template>
					</div>
				</template>
			</template>
		</template>
	</div>
</template>

<script>
	import { oneOf } from '../_util/utils';

	export default {
		name: 'Sider',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-layout-sider',
			},
			collapsible: {
				type: Boolean,
				default: false
			},
			defaultCollapsed: {
				type: Boolean,
				default: false
			},
			collapsed: {
				type: Boolean,
			},
			onCollapse: {
				type: Function
			},
			trigger: {
				type: String,
			},
			width: {
				type: [Number,String],
				default: 200
			},
			collapsedWidth: {
				type: [Number,String],
				default: 64
			},
			breakpoint: {
				type: String,
				validator (value) {
				    return oneOf(value, ['xs', 'sm', 'md', 'lg', 'xl']);
				}
			},
			className: String,
		},
		data() {
			return {
				below: false,
				siderWidth: 0,
				reverseArrow: false,
				scope_collapsed: false,
				slot_trigger: false,
			}
		},
		methods: {
			preHanlderCollapsed() {
				let scope_collapsed;
				if ('collapsed' in this) {
				  scope_collapsed = this.collapsed;
				} else {
				  scope_collapsed = this.defaultCollapsed;
				}
				this.scope_collapsed = scope_collapsed;
				this.below = false;
			},
			preHanlderSiderWidth() {
				let { scope_collapsed, collapsedWidth, width } = this;
				this.siderWidth = scope_collapsed ? collapsedWidth : width;
			},
			setCollapsed(collapsed, type) {
				const { onCollapse } = this;
				if (onCollapse && typeof onCollapse === 'function' ) {
					onCollapse(collapsed, type);
				}
			},
			toggle() {
			  	const scope_collapsed = !this.scope_collapsed;
			  	this.setCollapsed(scope_collapsed, 'clickTrigger');
			},
		},
		updated() {
			// 1.
			this.preHanlderCollapsed();
			// 2.
			this.preHanlderSiderWidth();
		},
		beforeMount() {
			// 1.
			this.preHanlderCollapsed();
			// 2.
			this.preHanlderSiderWidth();

			// 判断是否有 trigger slot 
			if ( this.$slots && this.$slots.trigger ) {
				this.slot_trigger = true;
			}
		},
		computed: {
			classes() {
				let { prefixCls, below, trigger, scope_collapsed, collapsedWidth, width, className, siderWidth } = this;

				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-collapsed`]: !!scope_collapsed,
						[`${prefixCls}-has-trigger`]: !!trigger,
						[`${prefixCls}-below`]: !!below,
						[`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === '0',
						[`${className}`]: !!className
					},
				]
			},
			styles() {
				let { siderWidth } = this;
				return {
					flex: `0 0 ${siderWidth}px`,
					width: `${siderWidth}px`,
				}
			},
			childrenClasses() {
				let prefixCls = this.prefixCls;
				return [
					`${prefixCls}-children`
				]
			},
			triggerClasses() {
				let prefixCls = this.prefixCls;
				return [
					`${prefixCls}-trigger`
				]
			},
			zeroWidthTriggerClasses() {
				let prefixCls = this.prefixCls;
				return [
					`${prefixCls}-zero-width-trigger`
				]
			},
		},
	}
</script>