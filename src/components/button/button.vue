<style lang="less" src="./style/index.less"></style>

<template>
	<button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
		<Icon type="loading" v-if="resultLoading == true"></Icon>
		<Icon :type="icon" v-if="icon && !resultLoading"></Icon>
		<span v-if="showSlot"><slot></slot></span>
	</button>
</template>

<script>
	import { oneOf } from '../_util/utils';
	import Icon from '../icon';

	const prefixCls = 'ant-btn';

	export default {
		name: 'Button',
		components: { Icon },
		props: {
			type: {
				type: String,
			    validator (value) {
			        return oneOf(value, ['primary', 'dashed', 'danger', 'ghost', 'default']);
			    }
			},
			htmlType: {
				type: String,
			    default: 'button',
			    validator (value) {
			        return oneOf(value, ['submit', 'reset', 'button', 'menu']);
			    }
			},
			shape: {
				type: String,
			    validator (value) {
			        return oneOf(value, ['circle', 'circle-outline']);
			    }
			},
			size: {
				type: String,
			    validator (value) {
			        return oneOf(value, ['small', 'large', 'default']);
			    }
			},
			icon: String,
            loading: [ Boolean, Object ],
            disabled: Boolean,
			ghost: {
				type: Boolean,
                default: false
			},
			classNames: String
		},
		data() {
			return {
				timeout: null,
				loadingTimeout: null,
				clicked: false,
				showSlot: true,
				resultLoading: false,
			}
		},
		computed: {
			classes () {
				let { type, shape, size, sizeCls='', showSlot, resultLoading, icon, clicked, ghost, classNames} = this;
				switch ( size ) {
				  case 'large':
				    sizeCls = 'lg';
				    break;
				  case 'small':
				    sizeCls = 'sm';
				  default:
				    break;
				}
				return [
				    `${prefixCls}`,
				    {
				        [`${prefixCls}-${type}`]: !!type,
				        [`${prefixCls}-${shape}`]: !!shape,
				        [`${prefixCls}-${sizeCls}`]: !!sizeCls,
				        [`${prefixCls}-icon-only`]: !showSlot && !!icon,
				        [`${prefixCls}-loading`]: resultLoading,
				        [`${prefixCls}-clicked`]: clicked,
				        [`${prefixCls}-background-ghost`]: ghost,
				    },
				    classNames
				];
			}
		},
		methods: {
			handleClick( event ) {
				let self = this;
				this.clicked = true;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => self.clicked = false ,500);
				this.$emit('click', event)
			}
		},
		created () {
			let self = this;
			let loading = self.loading;
			if( loading != null && typeof loading === 'object' ){
				let delay = parseInt( loading.delay );
				if( delay > 0 ){
					clearTimeout( this.loadingTimeout );
					self.loadingTimeout = setTimeout(() => self.resultLoading = true , delay );
				}
			}
			if( typeof loading === 'boolean' ){
				self.resultLoading = loading;
			}
		},
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        },
        watch: {
        	loading: {
        		handler: function( newValue, oldValue ){
        			let self = this;
        			if( newValue !== null && typeof newValue === 'object' ){
        				let delay = parseInt( newValue.delay );
        				if( delay > 0 ){
        					clearTimeout( this.loadingTimeout );
        					self.loadingTimeout = setTimeout(() => self.resultLoading = true , delay );
        					return;
        				}
        			}
        			self.resultLoading = !!newValue;
        		},
        		deep: true,
        	}
        }
	}
</script>