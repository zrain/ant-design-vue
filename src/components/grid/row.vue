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
				let style = {};
				if (this.gutter > 0) {
				    style = {
				        marginLeft: this.gutter / -2 + 'px',
				        marginRight: this.gutter / -2 + 'px'
				    };
				}
				return style;
			}
		},
		mounted () {

		},
	}
</script>