<script>
	import Utils from './utils.js';

	import DomAlign from './src';

	export default {
		name: 'DomAlign',
		props: {
			prefixCls: {
				type: String,
				default: 'vui-domaling',
			},
			source: {
				type: String,
				required: true
			},
			target: {
				type: String,
				required: true
			},
			points: {
				type: Array,
				default: () => ['tl', 'tl']
			},
			sourceOffset: {
				type: Array,
				default: () => [0, 0]
			},
			targetOffset: {
				type: Array,
				default: () => [0, 0]
			},
			useTransform: {
				type: Boolean,
				default: true
			},
			adjustX: {
				type: Boolean,
				default: false
			},
			adjustY: {
				type: Boolean,
				default: false
			},
		},
		data(){
			return {
				sourceENode: null,
				targetENode: null,
			}
		},
		methods: {
			updateSourceStyle() {
				// sourceNode's initial style should be position:absolute;left:-9999px;top:-9999px;
				let { 
						points, 
						sourceENode, 
						targetENode, 
						sourceOffset, 
						targetOffset, 
						useTransform, 
						adjustX, 
						adjustY 
					} = this;
				let params = {
					sourceOffset: sourceOffset,
					targetOffset: targetOffset,
					useTransform: useTransform,
					adjustX: adjustX,
					adjustY: adjustY
				}

				if( !sourceENode ||! targetENode ){
					return;
				}

				let resultStyle = Utils.calcResultStyle(sourceENode, targetENode, points, params);

				this.setSourceENodeStyle( resultStyle, sourceENode );
			},
			setSourceENodeStyle( style, sourceENode ){
				for( let key in style ){
					if( style[key] ){
						Utils.css( this.sourceENode, key, style[key] )
					}
				}
			},
			findRefsUp( key ){
				let parent = this.$parent;
				let resultENode;
				// 防止意外设置最大值
				let lock = 0;
				while ( !resultENode && parent && lock < 100) {
					if( parent.$refs && parent.$refs[key] ){
						resultENode = parent.$refs[key];
					}else{
						parent = parent.$parent;
					}
					lock ++ ;
				}
				return resultENode ? resultENode : null ;
			},
			initRender( createElement ) {
				let slotsVNode = this.$slots.default;

				if( slotsVNode.length && slotsVNode.length > 1 ){
					return this.renderWrapper( createElement, slotsVNode );
				}
				if( slotsVNode.length ){
					return slotsVNode[0];
				}
			},
			renderWrapper( createElement, chidrens ){
				let { prefixCls } = this;
				return createElement(
					'div',
					{
						class: {
							[`${prefixCls}-wrapper`]: true
						}
					},
					chidrens
				);
			}
		},
		mounted() {
			let { source, target } = this;
			this.sourceENode = this.findRefsUp(source);
			this.targetENode = this.findRefsUp(target);
			this.updateSourceStyle();
		},
		render( createElement ) {
			return this.initRender( createElement );
		},
		watch: {
			points: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			sourceOffset: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			targetOffset: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			useCssBottom: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			useCssRight: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			useTransform: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			adjustX: function( newValue, oldValue ){
				this.updateSourceStyle();
			},
			adjustY: function( newValue, oldValue ){
				this.updateSourceStyle();
			}
		}
	}
</script>