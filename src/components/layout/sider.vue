<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes" :style="styles">
		<div :class="childrenClasses">
			<slot></slot>
		</div>
		<!-- trigger == null? -->
		<template v-if="collapsible || below">
			<template v-if="trigger == null">
				<div :class="triggerClasses" @click="this.toggle = true">
					<span v-if="trigger">{{trigger}}</span>
					<template v-else>
						<template v-if="collapsed">
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
			<template v-else>
				<span
					:class="zeroWidthTriggerClasses"
					@click="this.toggle = true" 
					v-if="collapsedWidth === 0 || collapsedWidth === '0'" 
				>
				  <Icon type="bars" />
				</span>
			</template>
		</template>
		
	</div>
</template>

<script>
	import { oneOf } from '../_util/utils';

	const prefixCls = 'ant-layout-sider';

	// if (typeof window !== 'undefined') {
	//   	const matchMediaPolyfill = function matchMediaPolyfill(mediaQuery: string): MediaQueryList {
	//     	return {
	//       		media: mediaQuery,
	//       		matches: false,
	//       		addListener() {},
	//       		removeListener() {},
	//     	};
	//   	};
	//   	window.matchMedia = window.matchMedia || matchMediaPolyfill;
	// }

	// const dimensionMap = {
	//   	xs: '480px',
	//   	sm: '768px',
	//   	md: '992px',
	//   	lg: '1200px',
	//   	xl: '1600px',
	// };

	export default {
		name: 'Sider',
		props: {
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
				toggle: true,
				reverseArrow: false,
			}
		},
		methods: {
			preHanlderSiderWidth() {
				let { collapsed, collapsedWidth, width } = this;
				this.siderWidth = collapsed ? collapsedWidth : width;
			},
			preHanlderCollapsed() {
				let collapsed;
				if ('collapsed' in this) {
				  collapsed = this.collapsed;
				} else {
				  collapsed = this.defaultCollapsed;
				}
				this.collapsed = collapsed;
				this.below = false;
			}
		},
		beforeMount() {
			this.preHanlderSiderWidth();
			this.preHanlderCollapsed();
		},
		computed: {
			classes() {
				let { below, trigger, collapsed, collapsedWidth, width, className, siderWidth } = this;

				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-collapsed`]: !!collapsed,
						[`${prefixCls}-has-trigger`]: !!trigger,
						[`${prefixCls}-below`]: !!below,
						[`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === '0',
						[`${className}`]: className
					},
				]
			},
			childrenClasses() {
				return [
					`${prefixCls}-children`
				]
			},
			triggerClasses() {
				return [
					`${prefixCls}-trigger`
				]
			},
			zeroWidthTriggerClasses() {
				return [
					`${prefixCls}-zero-width-trigger`
				]
			},
			styles() {
				let { siderWidth } = this;
				return {
					flex: `0 0 ${siderWidth}px`,
					width: `${siderWidth}px`,
				}
			}
		},
		mounted() {
			// console.info( this.collapsible )
		}
	}
</script>