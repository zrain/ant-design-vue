<style lang="less" src="./style/index.less"></style>

<script>
	import { oneOf, isArray } from '../_util/utils';
	import calculateTextareaHeight from './calculateTextareaHeight.js';

	const prefixCls = 'ant-input';

	export default {
		name: 'Input',
		props: {
			type: {
				type: String,
				default: 'text',
			},
			value: {
				type: [ String, Number]
			},
			size: {
				type: String,
				validator (value) {
				    return oneOf(value, ['small', 'large', 'default']);
				}
			},
			disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            addonBefore: {
            	type: String,
            },
            addonAfter: {
            	type: String,
            },
            className: {
            	type: String
            }
		},
		data() {
			return {
				textareaStyles: {}
			}
		},
		computed: {
			wrapperClass() {
				return [
					`${prefixCls}-wrapper`
				]
			},
			inputClassName() {
				let { size, className } = this;
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-sm`]: size === 'small',
						[`${prefixCls}-lg`]: size === 'large',
					},
					className
				]
			}
		},
		mounted() {
			this.resizeTextarea();
		},
		methods: {
			resizeTextarea() {
				const { type, autosize } = this;
				if (type !== 'textarea' || !autosize || !this.$refs.input) {
				  return;
				}
				const minRows = autosize ? autosize.minRows : null;
				const maxRows = autosize ? autosize.maxRows : null;
				const textareaStyles = calculateTextareaHeight(this.$refs.input, false, minRows, maxRows);
				this.textareaStyles = textareaStyles;

			},
			handleTextareaChange( e ) {
				this.resizeTextarea();
			},
			handleInput( e ){
				if( this.type === 'textarea' ){
					this.handleTextareaChange( e );
				}
				this.$emit('input', e.target.value)
			},
			renderInput( createElement ) {
				let self = this;
				let { value, type, placeholder, disabled, inputClassName, textareaStyles, style} = this;

				switch ( type ) {
					case 'textarea':
						return createElement(
							'textarea',
							{
								class: inputClassName,
								style: [textareaStyles],
								ref: 'input',
								attrs: {
									placeholder: placeholder,
									disabled: disabled,
									value: value,
								},
								on: {
								  	input: function (event) {
								    	self.handleInput(event);
								  	}
								}
							}
						);
					default:
						return this.renderLabeledIcon( createElement, createElement(
							'input', 
							{
								class: inputClassName,
								ref: 'input',
								style: style,
								attrs: {
									placeholder: placeholder,
									disabled: disabled,
									value: value,
								},
							    on: {
							      	input: function (event) {
							        	self.handleInput(event);
							      	}
							    }
							}
						) )
				}
				
			},
			renderChildren( slotsOrString ) {
				let children = [];
				if( typeof slotsOrString == 'string'){
					children.push( slotsOrString );
				}
				if( isArray( slotsOrString )){
					children = children.concat( slotsOrString );
					for (let i = children.length - 1; i >= 0; i--) {
						if (children[i].tag.indexOf('Icon') == -1) {
							children.splice(i, 1);
						}
					}
				}
				return children;
			},
			renderLabeledInput( createElement, children ) {

				let { type, addonBefore, addonAfter } = this;

				addonBefore = this.$slots.addonBefore || addonBefore;
				addonAfter = this.$slots.addonAfter || addonAfter;

				if( type == 'textarea' || ( !addonBefore && !addonAfter ) ){
					return children;
				}

				let addonBeforeVNodeChildren = this.renderChildren( addonBefore );
				let addonAfterVNodeChildren = this.renderChildren( addonAfter );

				const wrapperClassName = `${prefixCls}-group`;
				const addonClassName = `${wrapperClassName}-addon`;

				const addonBeforeVNode = createElement(
					'span',
					{
						class: addonClassName,
					},
					addonBeforeVNodeChildren
				);

				const addonAfterVnode = createElement(
					'span',
					{
						class: addonClassName,
					},
					addonAfterVNodeChildren
				);

				const className = [
					{
					  [`${prefixCls}-wrapper`]: true,
					  [`${wrapperClassName}`]: (addonBefore || addonAfter),
					}
				];

				return createElement(
			  		'span',
			  		{
			  			class: className
			  		},
			  		[
			  			addonBeforeVNode,
			  			children,
			  			addonAfterVnode
			  		]
				);
			},
			renderLabeledIcon( createElement, children ) {
				let { type } = this;

				let prefix = this.$slots ? this.$slots.prefix : null;
				let suffix = this.$slots ? this.$slots.suffix : null;

				if( type == 'textarea' || (!prefix && !suffix) ){
					return children;
				}

				let prefixVNodeChildren = this.renderChildren( prefix );
				let suffixVNodeChildren = this.renderChildren( suffix );

				const prefixVnode = prefixVNodeChildren.length > 0 ? createElement(
					'span',
					{
						class:{
							[`${prefixCls}-prefix`]: true
						}
					},
					prefixVNodeChildren
				):null;

				const suffixVnode = suffixVNodeChildren.length > 0 ? createElement(
					'span',
					{
						class: {
							[`${prefixCls}-suffix`]: true
						}
					},
					suffixVNodeChildren
				):null;

				return createElement(
			  		'span',
			  		{
			  			class: {
			  				[`${prefixCls}-affix-wrapper`]: true,
			  			}
			  		},
			  		[
			  			prefixVnode,
			  			children,
			  			suffixVnode
			  		]
				);
			},
		},
		render( createElement ) {
			return this.renderLabeledInput(createElement, this.renderInput(createElement) );
		},
	}
</script>