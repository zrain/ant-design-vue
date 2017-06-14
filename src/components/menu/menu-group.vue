<template>
	<li :class="classes">
		<div :class="titleClasses" v-if="title">
			{{title}}
		</div>
		<ul :class="listClasses">
			<slot></slot>
		</ul>
	</li>
</template>

<script>
	import Emitter from '../../mixins/emitter.js';

	export default {
		mixins: [Emitter],
		name: 'MenuItemGroup',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-menu-item-group',
			},
			title: {
				type: String,
			}
		},
		data() {
			return {
				children: {},
				state: {
					unique: ''
				}
			}
		},
		methods: {
			initUnique() {
				this.state.unique = this.name || this.value || `${new Date().getTime()}${this._uid}`;
			},
			rememberWhoIsChildren(){

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
			this.dispatch(['Submenu','Menu'],'WHO-I-AM',{
				type: 'MenuGroup',
				unique: this.state.unique,
			});
		},
		beforeMount() {
			
		},
		computed: {
			classes() {
				let { prefixCls } = this;
				return [
					`${prefixCls}`
				]
			},
			titleClasses() {
				let { prefixCls } = this;
				return [
					`${prefixCls}-title`
				]
			},
			listClasses() {
				let { prefixCls } = this;
				return [
					`${prefixCls}-list`
				]
			}
		},
	}
</script>