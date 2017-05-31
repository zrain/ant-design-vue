<style lang="less" src="./style/index.less"></style>

<template>
	<div :class="classes">
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
            xs: [Number, Object, String],
            sm: [Number, Object, String],
            md: [Number, Object, String],
            lg: [Number, Object, String],
            xl: [Number, Object, String],
            className: String,
        },
        computed: {
            classes () {
            	let { span, order, offset, push, pull, xs, md, lg, xl, className } = this;
                
                let sizeClassObj = {};

                ['xs', 'sm', 'md', 'lg', 'xl'].forEach( size => {
                    let sizeProps = {};
                    let type = typeof this[size];
                    switch( type ){
                        case 'string':
                            sizeProps.span = parseInt( this[size] );
                            break;
                        case 'number':
                            sizeProps.span = this[size];
                            break;
                        case 'object':
                            sizeProps = this[size] || {};
                            break;
                        default: 
                            break;
                    }
                    // if (typeof this[size] === 'string'){
                    //     sizeProps.span = parseInt( this[size] );
                    // }
                    // if (typeof this[size] === 'number') {
                    //     sizeProps.span = this[size];
                    // } else if (typeof this[size] === 'object') {
                    //     sizeProps = this[size] || {};
                    // }

                    sizeClassObj = Object.assign({}, sizeClassObj, {
                      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
                      [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
                      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
                      [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
                      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
                    });
                });

                let classList = [
                    {
                        [`${prefixCls}-${span}`]: span !== undefined,
                        [`${prefixCls}-order-${order}`]: order,
                        [`${prefixCls}-offset-${offset}`]: offset,
                        [`${prefixCls}-push-${push}`]: push,
                        [`${prefixCls}-pull-${pull}`]: pull
                    },
                    className,
                    sizeClassObj,
                ];

                return classList;
            }
        }
	}
</script>