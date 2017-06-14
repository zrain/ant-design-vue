<style lang="less" src="./style/index.less"></style>

<template>
	<li 
		:class="classes" 
		:style="styles"
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
					unique: '',
					rootInlineIndent: 0,
					level: 1,
				},
			}
		},
		methods: {
			initUnique() {
				this.state.unique = this.name || this.value || `${new Date().getTime()}${this._uid}`;
			},
			syncRoot(){
				let parent = this.$parent;
				let count = 1;
				while( parent ){
					let name = parent.$options.name;
					if( name == 'Submenu'){
						count = count+1;
					}
					if( name == 'Menu'){
						this.state.rootInlineIndent = parent.inlineIndent;
						this.state.level = count;
						return;
					}
					parent = parent.$parent;
				}
			},
			handleClick( e ) {
				if( this.disabled ){
					return;
				}
				let eventObject = {
					name: this.state.unique,
					item: this,
					domEvent: e,
				}
				console.info('menu-click')
				this.dispatch(['MenuItemGroup','Submenu','Menu'], 'menu-item-click', eventObject);
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
			handleMenuItemSelectUpdate( selectedNames ){
				let index = selectedNames.indexOf( this.state.unique );
				if( index != -1 ){
					this.state.selected = true;
				}else{
					this.state.selected = false;
				}
			}
		},
		created(){
			this.initUnique();
			this.syncRoot();
			this.$on('menu-item-select-update',( selectedNames ) => {
				console.info('menu-item-select-update')
				this.handleMenuItemSelectUpdate(selectedNames);
			})
			this.dispatch(['MenuGroup','Submenu','Menu'],'WHO-I-AM',{
				type: 'MenuItem',
				unique: this.state.unique,
			});
		},
		beforeMount() {
			
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
			},
			styles() {
				let paddingLeft = this.state.rootInlineIndent * this.state.level;
				return {
					'padding-left': paddingLeft +'px'
				}
			}
		},
		updated(){
			this.initUnique();
		}
	}
</script>