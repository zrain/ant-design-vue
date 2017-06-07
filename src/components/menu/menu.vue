<template>
	<ul :class="classes">
		<slot></slot>
	</ul>
</template>

<script>
	import { oneOf } from '../_util/utils';
	import EventBus from '../eventbus';
	export default {
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
			EventBus.$on('menu-item-click',( e ) => {
				this.updateClickName( e );
				if( !e.name ){
					return;
				}
				if( this.multiple ){
					let index = this.selectedNames.findIndex((item) => item === e.name );
					if( index != -1 ){
						this.selectedNames.splice(index,1);
					}else{
						this.selectedNames.push(e.name);
					}
				}else{
					this.selectedNames.splice(0,1,e.name);
				}
				this.updateSelectName( e );
			})
		},
		watch: {
			selectedKeys: {
				deep: true,
				handler: function( newValue, oldValue ){
					if( newValue.length > 0 ){
						this.selectedNames = newValue;
						EventBus.$emit('menu-item-select-update', newValue);
					}
				}
			}
		}
	}
</script>