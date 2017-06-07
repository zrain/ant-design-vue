<style lang="less" src="./style/index.less"></style>

<template>
	<li 
		:class="classes" 
		@click.stop="handleClick" 
		@mouseenter="handleMouseEnter" 
		@mouseleave="handleMouseLeave">
		<slot></slot>
	</li>
</template>

<script>
	import EventBus from '../eventbus';

	export default {
		name: 'MenuItem',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-menu-item',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			active: {
				type: Boolean,
				default: false
			},
			selected: {
				type: Boolean,
				default: false,
			},
			name: {
				type: [String,Number],
			},
			value: {
				type: [String,Number]
			},
			className: {
				type: String
			}
		},
		data() {
			return {
				state: {
					active: false,
					selected: false,
					uniqueKey: '',
				}
			}
		},
		methods: {
			handleClick( e ) {
				if( this.disabled ){
					return;
				}
				let eventObject = {
					name: this.name || this.value,
					item: this,
					domEvent: e,
				}
				EventBus.$emit('menu-item-click', eventObject);
			},
			handleMouseEnter() {
				if( this.disabled ){
					return;
				}
				this.state.active = true;
				// console.info(`[${new Date().getTime()}]`,'handleMouseEnter')
			},
			handleMouseLeave() {
				if( this.disabled ){
					return;
				}
				this.state.active = false;
				// console.info(`[${new Date().getTime()}]`,'handleMouseLeave')
			},
		},
		computed: {
			classes() {
				let { prefixCls, disabled, className } = this;
				let { active, selected } = this.state;
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-active`]: active,
						[`${prefixCls}-selected`]: selected,
						[`${prefixCls}-disabled`]: disabled,
						[`${className}`]: className
					},
				]
			}
		},
		beforeMount() {
			this.state.uniqueKey = this.name || this.value;
		},
		updated(){
			this.state.uniqueKey = this.name || this.value;
		},
		mounted() {
			EventBus.$on('menu-item-select-update',( selectedtArray ) => {
				let index = selectedtArray.findIndex((item) => item === this.state.uniqueKey);
				if( index != -1 ){
					this.state.selected = true;
				}else{
					this.state.selected = false;
				}
			})
		}
	}
</script>