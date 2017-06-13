<template>
	<li 
		:class="classes" 
		@mouseenter="handleSubmenuMouseEnter" 
		@mouseleave="handleSubmenuMouseLeave"
	>
		<Dropdown overlay="dropdown-list">
			<div :class="submenuTitleClasses">
				<slot name="title">{{title}}</slot>
			</div>
		</Dropdown>
		<ul 
			:class="submenuUlClasses"
			ref="dropdown-list">
			<slot></slot>
		</ul>
	</li>
</template>

<script>
	export default {
		name: 'Submenu',
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
				mode: '',
				rootPrefixCls: '',
				timeout: null,
				childrenItem: {},
				state: {
					opened: false,
					active: false,
					selected: false,
				}
			}
		},
		methods: {
			syncMode() {
				if( this.$parent ){
					this.mode = this.$parent.mode;
				}
			},
			syncRootPrefixCls() {
				if( this.$parent && 
					this.$parent.$options && 
					this.$parent.$options._componentTag == 'Menu' ){
					this.rootPrefixCls = this.$parent.prefixCls;
				}
			},
			handleSubmenuMouseEnter() {
				if( this.timeout ){
					window.clearTimeout(this.timeout);
				}
				this.state.opened = true;
				this.state.active = true;
			},
			handleSubmenuMouseLeave() {
				this.timeout = window.setTimeout(() => {
					this.state.opened = false;
					this.state.active	= false;
				},300)
			},
			handleMenuItemClick( eventObject ) {
				this.childrenItem[ eventObject.name ] = eventObject;
			},
			handleMenuItemSelectUpdate( selectedNames ) {
				let flag = false;
				selectedNames.forEach((item) => {
					if( this.childrenItem[item] ){
						flag = true;
					}
				});
				this.selected = flag;
			}
		},
		beforeMount() {
			this.syncMode();
			this.syncRootPrefixCls();
		},
		computed: {
			classes() {
				let { prefixCls, className, mode, disabled } = this;
				let { opened, active, selected } = this.state;
				return [
					`${prefixCls}`,
					{
						[`${className}`]: className,
						[`${prefixCls}-${mode}`]: mode,
						[`${prefixCls}-open`]: opened,
						[`${prefixCls}-active`]: active,
						[`${prefixCls}-disabled`]: disabled,
						[`${prefixCls}-selected`]: selected
					}
				]
			},
			submenuTitleClasses() {
				return [`${this.prefixCls}-title`];
			},
			submenuUlClasses() {
				let { rootPrefixCls, mode } = this;
				let { opened } = this.state;
				return [
					`${rootPrefixCls}`,
					{
						[`${rootPrefixCls}-vertical`]: mode,
						[`${rootPrefixCls}-sub`]: true,
						[`${rootPrefixCls}-hidden`]: !opened
					}
				];
			}
		},
		updated() {
			this.syncMode();
		},
		mounted() {

			this.$on('menu-item-click',(eventObjct) => {
				this.handleMenuItemClick(eventObjct);
			});

			this.$on('menu-item-select-update',(selectedNames) => {
				this.handleMenuItemSelectUpdate(selectedNames)
			});
		}
	}
</script>