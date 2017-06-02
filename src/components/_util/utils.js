// 判断参数是否是其中之一
export function oneOf (value, validList) {
	for (let i = 0; i < validList.length; i++) {
		if( validList[i] === value ){
			return true;
		}
	}
	return false;
}

export function classNames() {
	let hasOwn = {}.hasOwnProperty;
	let classes = [];

	for (let i = 0; i < arguments.length; i++) {
		let arg = arguments[i];
		if (!arg) continue;

		let argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			classes.push(classNames.apply(null, arg));
		} else if (argType === 'object') {
			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}

export function omit(obj, keys) {

	if (! typeof(obj) === 'object' ) return {};

	keys = [].concat.apply([], [].slice.call(arguments, 1));
	let last = keys[keys.length - 1];
	let res = {},
		fn;

	if (typeof last === 'function') {
		fn = keys.pop();
	}

	let isFunction = typeof fn === 'function';
	if (!keys.length && !isFunction) {
		return obj;
	}

	for(let key in obj) {
		let value = obj[key];
		if (keys.indexOf(key) === -1) {

			if (!isFunction) {
				res[key] = value;
			} else if (fn(value, key, obj)) {
				res[key] = value;
			}
		}
	}
	return res;
	
};