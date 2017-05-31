<template>
	<div :class="classes" :style="styles">
	    <slot></slot>
	</div>
</template>

<script>
	import { oneOf } from '../_util/utils';

	const prefixCls = 'ant-col';

	export default {
		name: 'Col',
		props: {
            span: [Number, String],
            order: [Number, String],
            offset: [Number, String],
            push: [Number, String],
            pull: [Number, String],
            xs: [Number, Object],
            sm: [Number, Object],
            md: [Number, Object],
            lg: [Number, Object],
            xl: [Number, Object],
        },
        computed: {
            classes () {
            	let { span, order, offset, push, pull, xs, md, lg, xl } = this;
                let classList = [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-span-${span}`]: span,
                        [`${prefixCls}-order-${order}`]: order,
                        [`${prefixCls}-offset-${offset}`]: offset,
                        [`${prefixCls}-push-${push}`]: push,
                        [`${prefixCls}-pull-${pull}`]: pull
                    }
                ];

                ['xs', 'sm', 'md', 'lg'].forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`${prefixCls}-span-${size}-${this[size]}`);
                    } else if (typeof this[size] === 'object') {
                        let props = this[size];
                        Object.keys(props).forEach(prop => {
                            classList.push(
                                prop !== 'span'
                                    ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                                    : `${prefixCls}-span-${size}-${props[prop]}`
                            );
                        });
                    }
                });

                return classList;
            },
            styles () {
                let style = {};
                if (this.gutter !== 0) {
                    style = {
                        paddingLeft: this.gutter / 2 + 'px',
                        paddingRight: this.gutter / 2 + 'px'
                    };
                }

                return style;
            }
        },
	}
</script>