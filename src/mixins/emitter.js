export default {
    methods: {
        /**
         * 向上广播事件
         * @param  {[String,Array]} componentName [标签名称，如果指定，则只向指定的标签广播事件，如未指定，则逐级广播，支持数组形式]
         * @param  {[String]} 事件名称     [description]
         * @param  {[type]} params        [description]
         * @return {[type]}               [description]
         */
        dispatch() {
            let componentName, eventName, params;
            if( !arguments ){
                return;
            }
            let argl = arguments.length;
            argl > 0 ? params = arguments[argl-1] :null;
            argl > 1 ? eventName = arguments[argl-2] :null;
            argl > 2 ? componentName = arguments[argl-3] : null;

            if( componentName && Object.prototype.toString.call(componentName) !== '[object Array]' ){
                componentName = [componentName];
            }
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || componentName[componentName.length-1] != name )) {
                if (parent) {
                    if( !componentName || componentName.length <= 0 ){
                        // 如果没指定 componentName 就逐级触发事件 eventName
                        parent.$emit.apply(parent, [eventName].concat([params])); 
                    }
                    if( componentName.indexOf(name) != -1 ){
                        parent.$emit.apply(parent, [eventName].concat([params])); 
                    }
                    
                }
                parent = parent.$parent;
                name = parent.$options.name;
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat([params]));
            }
        },

        /**
         * 向下广播事件
         * @param  {[String,Array]} componentName [标签名称，如果指定，则只向指定的标签广播事件，如未指定，则逐级广播，支持数组形式]
         * @param  {[String]} 事件名称     [description]
         * @param  {[type]} params        [description]
         * @return {[type]}               [description]
         */
        broadcast() {
            let componentName, eventName, params;
            if( !arguments ){
                return;
            }
            let argl = arguments.length;
            argl > 0 ? params = arguments[argl-1] :null;
            argl > 1 ? eventName = arguments[argl-2] :null;
            argl > 2 ? componentName = arguments[argl-3] : null;

            if( componentName && Object.prototype.toString.call(componentName) !== '[object Array]' ){
                componentName = [componentName];
            }

            let name;
            function handleChidrens( parent ){
                if( !parent || name == componentName[componentName.length-1] ){
                    return;
                }
                let childrens = parent.$children;
                childrens.forEach((child, index) => {
                    name = child.$options.name;
                    if( !componentName || componentName.length <= 0 ){
                        // 如果没指定 componentName 就逐级触发事件 eventName
                        child.$emit.apply(child, [eventName].concat([params]));
                    }else if( componentName.indexOf(name) != -1 ){
                        child.$emit.apply(child, [eventName].concat([params]));
                    }
                    handleChidrens( child );
                });
            }
            handleChidrens( this )
        }
    }
};