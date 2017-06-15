<template>
	<li 
		:class="classes"
		@mouseenter="handleSubmenuMouseEnter" 
		@mouseleave="handleSubmenuMouseLeave"
		@click.stop="handleSubmenuCLick"
	>
		<Dropdown overlay="dropdown-list">
			<div 
				:class="submenuTitleClasses"
				:style="styles"
			>
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
	import Emitter from '../../mixins/emitter.js';

	export default {
		mixins: [Emitter],
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
				rootPrefixCls: '',
				timeout: null,
				childrenItem: {},
				state: {
					opened: false,
					active: false,
					selected: false,
					rootMode: '',
					rootInlineIndent: 0,
					unique: '',
					level: 1,
				},
				children: {},
			}
		},
		methods: {
			initUnique() {
				this.state.unique = this.name || this.value || `${new Date().getTime()}${this._uid}`;
			},
			calcLevel() {
				let parent = this.$parent;
				while( parent ){
					let name = parent.$options.name;
					if( name == 'Submenu'){
						this.state.level++;
					}
					if( name == 'Menu' ){
						return;
					}
					parent = parent.$parent;
				}
			},
			syncRootMode() {
				let parent = this.$parent;
				while( parent ){
					let name = parent.$options.name;
					if( name == 'Menu'){
						this.state.rootMode = parent.mode;
						this.state.rootInlineIndent = parent.inlineIndent;
						return;
					}
					parent = parent.$parent;
				}
			},
			syncRootPrefixCls() {
				let parent = this.$parent;
				while( parent ){
					let name = parent.$options.name;
					if( name == 'Menu'){
						this.rootPrefixCls = parent.prefixCls;
						return;
					}
					parent = parent.$parent;
				}
			},
			handleSubmenuMouseEnter() {
				if( this.timeout ){
					window.clearTimeout(this.timeout);
				}
				if( this.state.rootMode != 'inline' ){
					this.state.active = true;
				}
				if( this.state.rootMode != 'inline' ){
					this.handleSubmenuCLick();
				}
			},
			handleSubmenuMouseLeave() {
				this.timeout = window.setTimeout(() => {
					this.state.active	= false;
					if( this.state.rootMode != 'inline' ){
						this.state.opened = false;
					}
				},100)
			},
			handleMenuItemSelectUpdate( selectedNames ) {
				let flag = false;
				selectedNames.forEach((item) => {
					let index = this.children['MenuItem'].indexOf(item)
					if( index != -1 ){
						flag = true;
					}
				});
				this.state.selected = flag;
			},
			handleSubmenuCLick(e){
				if( this.disabled ){
					return;
				}
				let eventObject = {
					name: this.state.unique,
					item: this,
					domEvent: e,
				}
				this.dispatch(['Menu'], 'submenu-click', eventObject);
			},
			handleSubmenuOpenedUpdate( openedNames ){
				let index = openedNames.indexOf( this.state.unique );
				if( index != -1 ){
					this.state.opened = true;
				}else{
					this.state.opened = false;
				}
			}
		},
		created() {
			this.initUnique();
			this.$on('WHO-I-AM',( children ) => {
				if( this.children[children.type] ){
					this.children[children.type].push( children.unique );
				}else{
					this.children[children.type] = [children.unique];
				}
			});
			this.dispatch(['Menu'],'WHO-I-AM',{
				type: 'Submenu',
				unique: this.state.unique,
			});

			this.$on('menu-item-select-update',(selectedNames) => {
				this.handleMenuItemSelectUpdate(selectedNames)
			});

			this.$on('submenu-opened-update',(openedNames) => {
				this.handleSubmenuOpenedUpdate(openedNames)
			})
		},
		beforeMount() {
			this.calcLevel();
			this.syncRootMode();
			this.syncRootPrefixCls();
		},
		computed: {
			classes() {
				let { prefixCls, className, disabled } = this;
				let { opened, active, selected, rootMode } = this.state;
				return [
					`${prefixCls}`,
					{
						[`${className}`]: className,
						[`${prefixCls}-${rootMode}`]: rootMode,
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
				let { rootPrefixCls } = this;
				let { opened, rootMode } = this.state;
				return [
					`${rootPrefixCls}`,
					{
						[`${rootPrefixCls}-vertical`]: rootMode != 'inline',
						[`${rootPrefixCls}-inline`]: rootMode == 'inline',
						[`${rootPrefixCls}-sub`]: true,
						[`${rootPrefixCls}-hidden`]: !opened,
					}
				];
			},
			styles() {
				let paddingLeft = this.state.rootInlineIndent * this.state.level;
				return {
					'padding-left': paddingLeft +'px'
				}
			}
		},
		updated() {
			this.initUnique();
			this.syncRootMode();
			this.syncRootPrefixCls();
		},
	}
</script>