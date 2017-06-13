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
	import Emitter from '../../mixins/emitter.js';

	export default {
		mixins: [Emitter],
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
				},
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
				this.dispatch(['MenuGroup','Submenu','Menu'], 'menu-item-click', eventObject);
			},
			handleMouseEnter() {
				if( this.disabled ){
					return;
				}
				this.state.active = true;
			},
			handleMouseLeave() {
				if( this.disabled ){
					return;
				}
				this.state.active = false;
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
			this.$on('menu-item-select-update',( selectedNames ) => {
				let index = selectedNames.indexOf( this.state.uniqueKey );
				if( index != -1 ){
					this.state.selected = true;
				}else{
					this.state.selected = false;
				}
			})
		}
	}
</script>