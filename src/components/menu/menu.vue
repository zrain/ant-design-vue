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
			className: {
				type: String
			}
		},
		data(){
			return {
				selectedNames: [],
			}
		},
		methods: {
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
			broadcastSelectedUpdate(){
				this.broadcast(['Submenu','MenuItem'],'menu-item-select-update', this.selectedNames);
			}
		},
		computed: {
			classes() {
				let { prefixCls, theme, mode } = this;
				return [
					`${prefixCls}`,
					`${prefixCls}-${theme}`,
					{
					    [`${prefixCls}-${mode}`]: mode
					}
				]
			}
		},
		mounted() {
			this.$on('menu-item-click',( eventObject ) => {
				this.updateClickName( eventObject );
				if( !eventObject.name ){
					console.error(`[ant-design-vue] Cant't find MenuItem.name`)
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
				this.broadcastSelectedUpdate();
			})
		},
		watch: {
			selectedKeys: {
				deep: true,
				handler: function( newValue, oldValue ){
					if( newValue.length > 0 ){
						this.selectedNames = newValue;
						this.$emit('menu-item-select-update', newValue);
					}
				}
			}
		}
	}
</script>