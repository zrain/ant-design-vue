<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { oneOf, classNames } from '../_util/utils';

	import _ from 'lodash';

	const prefixCls = 'ant-row';

	export default {
		name: 'Row',
		props: {
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
		computed: {
			classes () {
				let { type, align, justify, className } = this;
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
				if( this.gutter <= 0 ){
					return;
				}
				let colStyles = this.getColStyles();
				let cols = this.$children.map(( children ) => {
					for( let key in colStyles ){
						children.$el.style[key] = colStyles[key];
					}
				})
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