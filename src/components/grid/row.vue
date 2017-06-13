<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { oneOf, classNames } from '../_util/utils';

	export default {
		name: 'Row',
		props: {
			prefixCls: {
				type: String,
				default: 'ant-row',
			},
			type: {
			    validator (value) {
			        return oneOf(value, ['flex']);
			    }
			},
            align: {
                validator (value) {
                    return oneOf(value, ['top', 'middle', 'bottom']);
                }
            },
            justify: {
                validator (value) {
                    return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
                }
            },
            gutter: {
                type: Number,
                default: 0
            },
            className: String
		},
		data () {
			return {
				oldChildrenNumber: 0,
				oldGutterNumber: 0,
			}
		},
		computed: {
			classes () {
				let { prefixCls, type, align, justify, className } = this;
				return [
				    {
				        [`${prefixCls}`]: !type,
				        [`${prefixCls}-${type}`]: !!type,
				        [`${prefixCls}-${type}-${align}`]: !!align,
				        [`${prefixCls}-${type}-${justify}`]: !!justify,
				        [`${className}`]: !!className,
				    }
				];
			},
			styles () {
				let { gutter } = this;
				let style = {};
				if (gutter > 0) {
				    style = {
				        marginLeft: this.gutter / -2 + 'px',
				        marginRight: this.gutter / -2 + 'px'
				    };
				}
				return style;
			}
		},
		methods: {
			getColStyles () {
			    let style = {};
			    if (this.gutter !== 0) {
			        style = {
			            paddingLeft: this.gutter / 2 + 'px',
			            paddingRight: this.gutter / 2 + 'px'
			        };
			    }
			    return style;
			},
			updateGutter () {
				if( this.gutter <= 0 && 
					this.gutter == this.oldGutterNumber && 
					this.$children.length == this.oldChildrenNumber ){
					return;
				}
				let colStyles = this.getColStyles();
				let cols = this.$children.map(( children ) => {
					for( let key in colStyles ){
						if( children.$el.style[key] != colStyles[key]){
							children.$el.style[key] = colStyles[key];
						}
					}
				})
				this.oldChildrenNumber = this.$children.length;
				this.oldGutterNumber = this.gutter;
			},
		},
		updated () {
			this.updateGutter();
		},
		mounted () {
			this.updateGutter();
		},
	}
</script>