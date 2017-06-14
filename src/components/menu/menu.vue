<template>
	<ul :class="classes">
		<slot></slot>
	</ul>
</template>

<script>
	import { oneOf } from '../_util/utils';
	import Emitter from '../../mixins/emitter.js';

	export default {
		mixins: [Emitter],
		name: 'Menu',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-menu',
			},
			theme: {
				// 主题颜色
				type: String,
				validator (value) {
				    return oneOf(value, ['light', 'dark']);
				},
				default: 'light'
			},
			mode: {
				// 菜单类型，现在支持垂直、水平、和内嵌模式三种
				type: String,
				validator (value) {
				    return oneOf(value, ['vertical', 'horizontal', 'inline']);
				},
				default: 'vertical'
			},
			selectedKeys: {
				// 当前选中的菜单项 key 数组
				type: Array,
			},
			defaultSelectedKeys: {
				// 初始选中的菜单项 key 数组
				type: Array,
			},
			openKeys: {
				// 当前展开的 SubMenu 菜单项 key 数组
				type: Array,
			},
			defaultOpenKeys: {
				// 初始展开的 SubMenu 菜单项 key 数组
			},
			onOpenChange: {
				// SubMenu 展开/关闭的回调
				type: Function,
			},
			onSelect: {
				type: Function,
			},
			onDeselect: {
				// 取消选中时调用，仅在 multiple 生效,
				type: Function
			},
			inlineIndent: {
				// inline 模式的菜单缩进宽度
				type: Number,
				default: 24
			},
			multiple: {
				// 是否允许多选
				type: Boolean,
				default: false
			},
			accordion: {
				type: Boolean,
				default: false,
			},
			className: {
				type: String
			}
		},
		data(){
			return {
				selectedNames: [],
				openNames: [],
				children: {},
				state: {
					rootMenu: false,
					unique: ''
				}
			}
		},
		methods: {
			initUnique() {
				this.state.unique = this.name || this.value || `${new Date().getTime()}${this._uid}`;
			},
			updateSelectName( e ) {
				let selectedEventObject = { 
					item: e.item, 
					name: e.name, 
					selectedNames: this.selectedNames,
				}
				if( this.onSelect && typeof this.onSelect === 'function' ){
					this.onSelect( selectedEventObject )
				}
			},
			updateClickName( e ) {
				let clickEventObject = {
					item: e.item,
					name: e.name,
				}
				this.$emit('click', clickEventObject);
			},
			isRootMenu() {
				let parent = this.$parent
				while( parent ){
					let name = parent.$options.name;
					if( name == 'Menu'){
						this.state.rootMenu = false;
						return;
					}
					parent = parent.$parent;
				}
				this.state.rootMenu = true;
			},
			broadcastMenuItemSelectedUpdate(){
				console.info('broadcastMenuItemSelectedUpdate')
				this.broadcast(['Submenu','MenuItem'],'menu-item-select-update', this.selectedNames);
			},
			broadcastSubmenuOpenedUpdate(){
				this.broadcast(['Submenu','MenuItem'], 'submenu-opened-update', this.openNames);
			},
			handleMenuItemClick( eventObject ){
				console.info(eventObject)
				this.updateClickName( eventObject );
				if( !eventObject.name ){
					return;
				}
				if( this.multiple ){
					let index = this.selectedNames.findIndex((item) => item === eventObject.name );
					if( index != -1 ){
						this.selectedNames.splice(index,1);
					}else{
						this.selectedNames.push(eventObject.name);
					}
				}else{
					this.selectedNames.splice(0,1,eventObject.name);
				}
				this.updateSelectName( eventObject );
				this.broadcastMenuItemSelectedUpdate();
			},
			handleSubmenuClick( eventObject ){
				if( !eventObject.name ){
					return;
				}
				let index = this.openNames.indexOf( eventObject.name );
				if( index != -1 ){
					this.openNames.splice(index,1);
				}else{
					if( this.accordion || this.mode == "vertical" ){
						this.openNames.splice(index,1,eventObject.name)
					}else{
						this.openNames.push(eventObject.name);
					}
				}
				
				this.broadcastSubmenuOpenedUpdate();
			}
		},
		created(){
			this.initUnique();
			this.isRootMenu();
			this.selectedNames = Object.assign([],this.defaultSelectedKeys, this.selectedKeys);
			this.openNames = Object.assign([], this.defaultOpenKeys, this.openKeys);
			this.$on('menu-item-click', ( eventObject ) => {
				console.info('menu-item-click')
				this.handleMenuItemClick( eventObject );
			});
			this.$on('WHO-I-AM', ( children ) => {
				if( this.children[children.type] ){
					this.children[children.type].push( children.unique );
				}else{
					this.children[children.type] = [children.unique];
				}
			});
			this.$on('submenu-click', ( eventObject ) => {
				this.handleSubmenuClick(eventObject);
			})
		},
		beforeMount(){

		},
		computed: {
			classes() {
				let { prefixCls, theme, mode } = this;
				let { rootMenu } = this.state;
				return [
					`${prefixCls}`,
					`${prefixCls}-${theme}`,
					
					{
					    [`${prefixCls}-${mode}`]: mode,
					    [`${prefixCls}-root`]: rootMenu
					}
				]
			}
		},
		mounted(){
			// broadcats 只能在 mounted 周期触发
			this.broadcastSubmenuOpenedUpdate();
			this.broadcastMenuItemSelectedUpdate();
		},
		watch: {
			selectedKeys: {
				deep: true,
				handler: function( newValue, oldValue ){
					if( newValue.length > 0 ){
						this.selectedNames = newValue;
						this.broadcastMenuItemSelectedUpdate();
					}
				}
			},
			openKeys: {
				deep: true,
				handler: function( newValue, oldValue ){
					if( newValue.length > 0 ){
						this.openNames = newValue;
						this.broadcastSubmenuOpenedUpdate();
					}
				}
			}
		}
	}
</script>