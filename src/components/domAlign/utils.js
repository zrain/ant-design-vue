const jsCssMap = {
  	Webkit: '-webkit-',
  	Moz: '-moz-',
  	ms: '-ms-',
  	O: '-o-',
};

const Utils = {
	/**
	 * 计算结果样式
	 * @param  {[type]} sourceENode [description]
	 * @param  {[type]} targetENode [description]
	 * @param  {[type]} points      [description]
	 * @param  {[type]} params      [description]
	 * @return {[type]}             [description]
	 */
	calcResultStyle( sourceENode, targetENode, points, params ) {
		if( !sourceENode || !targetENode ){
			return;
		}
		// 获取基础信息
		let sourceNode = {
			position: Utils.css(sourceENode,'position'),
			left: parseFloat( Utils.css(sourceENode, 'left') ) || 0,
			top: parseFloat( Utils.css(sourceENode, 'top') ) || 0,
			width: sourceENode.offsetWidth,
			height: sourceENode.offsetHeight
		}

		let targetNode = {
			width: targetENode.offsetWidth,
			height: targetENode.offsetHeight
		}

		// 根据params 计算 offset
		let resultOffset = Utils.calcOffset(params);

		// 获取位置信息 top/left/width/height
		let sourceRegion = Utils.geRegion( sourceENode );
		let targetRegion = Utils.geRegion( targetENode );
		// 根据points 计算 source,target 的坐标点
		// {
		//     source:
		//     target:
		// }
		let coordinate = Utils.handleCalcCoordinate(sourceRegion, targetRegion, points);

		// 根据 adjust 计算 target 坐标
		let resultTargetCoordinate = Utils.handleAdjust(targetENode, coordinate.target, sourceNode, points[0], params);

		let resultLeft = resultTargetCoordinate.x - coordinate.source.x + sourceNode.left - resultOffset.x;
		let resultTop = resultTargetCoordinate.y - coordinate.source.y + sourceNode.top - resultOffset.y;

		let resultStyle = {
			position: sourceNode.position === 'static' ? 'relative': sourceNode.position,
			left : resultLeft,
			top:  resultTop
		}
		return resultStyle;
	},
	handleCalcCoordinate( sourceRegion, targetRegion, points ) {
		return {
			source: Utils.getCoordinateByPoint(sourceRegion, points[0]),
			target: Utils.getCoordinateByPoint(targetRegion, points[1])
		}
	},
	/**
	 * 计算 offset 的值 支持 100%
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	calcOffset( params ){
		let sourceOffset = [];
		let targetOffset = [];

		let regExp = /%$/;
		if( params && params.sourceOffset ){
			let offsetX = params.sourceOffset[0];
			let offsetY = params.sourceOffset[1];
			if( regExp.test(offsetX) ){
				sourceOffset[0] = parseFloat(offsetX)/100*sourceNode.width || 0;
			}else{
				sourceOffset[0] = parseFloat(offsetX) || 0;
			}
			if( regExp.test(offsetY) ){
				sourceOffset[1] = parseFloat(offsetY)/100*sourceNode.height || 0;
			}else{
				sourceOffset[1] = parseFloat(offsetY) || 0;
			}
		}
		if( params && params.targetOffset ){
			let offsetX = params.targetOffset[0];
			let offsetY = params.targetOffset[1];
			if( regExp.test(offsetX) ){
				targetOffset[0] = parseFloat(offsetX)/100*targetNode.width || 0;
			}else{
				targetOffset[0] = parseFloat(offsetX) || 0;
			}
			if( regExp.test(offsetY) ){
				targetOffset[1] = parseFloat(offsetY)/100*targetNode.height || 0;
			}else{
				targetOffset[1] = parseFloat(offsetY) || 0;
			}
		}

		return {
			x: (targetOffset[0] - sourceOffset[0]) || 0,
			y: (targetOffset[1] - sourceOffset[1]) || 0,
		}
	},
	/**
	 * 处理自适应X?Y
	 * @param  {[type]} targetENode      [description]
	 * @param  {[type]} targetCoordinate [description]
	 * @param  {[type]} params           [description]
	 * @return {[type]}                  [description]
	 */
	handleAdjust(targetENode, targetCoordinate, sourceNode, sourcePoint, params) {
		if( !params || ( !params.adjustX && !params.adjustY) || !targetCoordinate){
			return;
		}

		let targetNotVisibleNode = Utils.hasOverflowNotVisible(targetENode);
		if( !targetNotVisibleNode ){
			return;
		}
		
		let targetNotVisibleNodeRegion = Utils.geRegion(targetNotVisibleNode);

		let t = targetNotVisibleNodeRegion;
		let targetArea = [[t.left ,t.left+t.width],[t.top,t.top+t.height]];
		if( params.adjustX ){
			if( targetCoordinate.x < targetArea[0][0] ){
				targetCoordinate.x = targetArea[0][0]
				let xType = sourcePoint.charAt(1);
				switch(xType){
					case 'l':
						break;
					case 'c':
						targetCoordinate.x += sourceNode.width/2;
						break;
					case 'r':
						targetCoordinate.x += sourceNode.width;
						break;
					default: 
						break;
				}
				
			}
			if( targetCoordinate.x > targetArea[0][1] ){
				targetCoordinate.x = targetArea[0][1]
				let xType = sourcePoint.charAt(1);
				switch(xType){
					case 'l':
						targetCoordinate.x -= sourceNode.width;
						break;
					case 'c':
						targetCoordinate.x -= sourceNode.width/2;
						break;
					case 'r':
						break;
					default:
						break;
				}
				
			}
		}
		if( params.adjustY ){
			if( targetCoordinate.y < targetArea[1][0] ){
				targetCoordinate.y = targetArea[1][0]
				let yType = sourcePoint.charAt(0);
				switch(yType){
					case 't':
						break;
					case 'c':
						targetCoordinate.y += sourceNode.height/2;
						break;
					case 'b':
						targetCoordinate.y += sourceNode.height;
						break;
					default: 
						break;
				}
			}
			if( targetCoordinate.y > targetArea[1][1] ){
				targetCoordinate.y = targetArea[1][1]
				let yType = sourcePoint.charAt(0);
				switch(yType){
					case 't':
						targetCoordinate.y += sourceNode.height;
						break;
					case 'c':
						targetCoordinate.y += sourceNode.height/2;
						break;
					case 'b':
						break;
					default: 
						break;
				}
			}
		}
		return targetCoordinate;
	},
	/**
	 * 判断是否有影响元素显示区域的父元素，如果有，则返回父元素，没有则返回false
	 * @param  {[type]}  element [description]
	 * @return {Boolean}         [description]
	 */
	hasOverflowNotVisible( element ) {
		let parent = element.parentElement || element.parentNode;
		let resultParent;
		while( !resultParent && parent.nodeName.toLowerCase() != 'html' ){
			let position = Utils.css(parent,'position');
			let overflow = Utils.css(parent,'overflow');
			if( position === 'fixed' || overflow != 'visible' ) {
				resultParent = parent;
			}
			parent = parent.parentElement || parent.parentNode;
		}
		return resultParent || false;
	},
	/**
	 * 根据 point 参数计算坐标点x,y
	 * @param  {[type]} region [页面中显示的区域包含,left,top,width.height]
	 * @param  {[type]} point  [point参数]
	 * @return {[type]}        [x,y]
	 */
	getCoordinateByPoint( region, point ){
		let pointX = point.charAt(1);
		let pointY = point.charAt(0);

		let { left, top, width, height } = region;

		let resultX, resultY;
		switch( pointY ){
			case 't':
				resultY = top;
				break;
			case 'c':
				resultY = top + height/2;
				break;
			case 'b':
				resultY = top + height;
				break;
			default:
				break;
		}

		switch( pointX ){
			case 'l':
				resultX = left;
				break;
			case 'c':
				resultX = left + width/2;
				break;
			case 'r':
				resultX = left + width;
				break;
			default:
				break;
		}

		return {
			x: resultX,
			y: resultY
		}

	},
	/**
	 * 获取元素所在区域
	 * @return {[type]} [description]
	 */
	geRegion( element ) {
		let offset = Utils.getElementOffset(element);
		let region = {
			width: element.offsetWidth,
			height: element.offsetHeight
		}
		return Object.assign({},region, offset);
	},
	/**
	 * 获取元素相对于文档的位置信息
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	getElementOffset(element) {
		let position = element.getBoundingClientRect();
		let pageArea = Utils.getPageArea(element);

		let _document = element.ownerDocument;
		let _window = _document.defaultView;

		let scrollTop = _window.pageYOffset;
		let scrollLeft = _window.pageXOffset;

		let left = position.left + scrollLeft;
		let top = position.top + scrollTop;
		let bottom = pageArea.height - top - element.offsetHeight;
		let right = pageArea.width - left - element.offsetWidth;
		
		return {
			left: left,
			top: top,
			bottom: bottom,
			right: right,
		}
	},
	/**
	 * 获取网页大小
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	getPageArea(element){
		let _document = element.ownerDocument;
		if (_document.compatMode == "BackCompat"){
			return {
				width: Math.max(_document.body.scrollWidth, _document.body.clientWidth),
				height: Math.max(_document.body.scrollHeight,_document.body.clientHeight)
			}
		} else {
			return {
				width: Math.max(_document.documentElement.scrollWidth, _document.documentElement.clientWidth),
				height: Math.max(_document.documentElement.scrollHeight, _document.documentElement.clientHeight)
			}
		}
	},
	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	isWindow(obj) {
	  	// must use == for ie8
	  	/* eslint eqeqeq:0 */
	  	return obj !== null && obj !== undefined && obj == obj.window;
	},
	/**
	 * 获取元素的 window
	 * @param  {[type]} node [description]
	 * @return {[type]}      [description]
	 */
	getWindow(node) {
	  	if (node && node.document && node.setTimeout) {
	    	return node;
	  	}
	  	const doc = node.ownerDocument || node;
	  	return doc.defaultView || doc.parentWindow;
	},
	/**
	 * 获取元素的 document
	 * @param  {[type]} node [description]
	 * @return {[type]}      [description]
	 */
	getDocument(node) {
	  	if (Utils.isWindow(node)) {
	    	return node.document;
	  	}
	  	if (node.nodeType === 9) {
	    	return node;
	  	}
	  	return node.ownerDocument;
	},
	/**
	 * 获取元素的 style 兼容 IE
	 * @param  {[type]} element [description]
	 * @return {[type]}    		[description]
	 */
	getStyle(element) {
	  	if( window.getComputedStyle ) { 
	  		return window.getComputedStyle(element, null); 
	  	}else{ 
	    	return element.currentStyle; 
	  	} 
	},
	/**
	 * [css description]
	 * @param  {[type]} element [description]
	 * @param  {[type]} name    [description]
	 * @param  {[type]} value   [description]
	 * @return {[type]}         [description]
	 */
	css(element, name, value) {
	  	if (typeof name === 'object') {
	    	for (const i in name) {
	      		if (name.hasOwnProperty(i)) {
	        		Utils.css(element, i, name[i]);
	      		}
	    	}
	    	return undefined;
	  	}
	  	if (typeof value !== 'undefined') {
	    	if (typeof value === 'number') {
	      		value = `${value}px`;
	    	}
	    	element.style[name] = value;
	    	return undefined;
	  	}
	  	return Utils.getStyle(element)[ Utils.camelCase(name)];
	},
	/**
	 * 转换驼峰形式，（ 取自 JQuery ）
	 * @param  {[type]} string [description]
	 * @return {[type]}        [description]
	 */
	camelCase: function( string ) {
		let rmsPrefix = /^-ms-/;
		let rdashAlpha = /-([a-z])/g;
		let fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},
}

module.exports = Utils;