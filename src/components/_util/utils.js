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