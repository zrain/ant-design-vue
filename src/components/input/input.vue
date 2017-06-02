<style lang="less" src="./style/index.less"></style>

<script>
	import { oneOf } from '../_util/utils';
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
					return;
				}
				// this.$emit('input', e.target.value)
			},
			renderInput( createElement ) {
				let self = this;
				let { type, placeholder, disabled, inputClassName, textareaStyles } = this;

				let 
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
								},
								on: {
								  	input: function (event) {
								    	self.handleInput(event);
								  	}
								}
							}
						);
					default:
						return createElement(
							'input', 
							{
								class: inputClassName,
								ref: 'input',
								attrs: {
									placeholder: placeholder,
									disabled: disabled
								},
							    on: {
							      	input: function (event) {
							        	self.handleInput(event);
							      	}
							    }
							}
						);
				}
				
			},
			renderLabeledInput( createElement, children ) {
				let { type, addonBefore, addonAfter } = this;

				// Not wrap when there is not addons
				if (type === 'textarea' || (!addonBefore && !addonAfter)) {
				  return children;
				}

				const wrapperClassName = `${prefixCls}-group`;
				const addonClassName = `${wrapperClassName}-addon`;

				const addonBeforeVNode = createElement(
					'span',
					{
						class: addonClassName,
					},
					[
						addonBefore
					]
				);

				const addonAfterVnode = createElement(
					'span',
					{
						class: addonClassName,
					},
					[
						addonAfter
					]
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

			},
		},
		render( createElement ) {
			return this.renderLabeledInput(createElement, this.renderInput(createElement) );
		}
	}
</script>