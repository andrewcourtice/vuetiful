
const types = {
    array: "[object Array]",
    boolean: "[object Boolean]",
    date: "[object Date]",
    null: "[object Null]",
    number: "[object Number]",
    object: "[object Object]",
    string: "[object String]",
    undefined: "[object Undefined]"
};

function isType(value, type) {
    return type === Object.prototype.toString.call(value);
}

export function isAny(value, ...validators) {
    let any = false;
    let index = 0;

    while (!any && index < validators.length) {
        any = validators[index].call(this, value);
        index++
    }    

    return any;
}

export function isArray(value) {
    return isType(value, types.array);
}

export function isBoolean(value) {
    return isType(value, types.boolean);
}

export function isDate(value) {
    return isType(value, types.date) && !isNaN(value.getTime());
}

export function isNull(value) {
    return isType(value, types.null);
}

export function isNumber(value) {
    return isType(value, types.number);
}

export function isObject(value) {
    return isType(value, types.object);
}

export function isString(value) {
    return isType(value, types.string);
}

export function isUndefined(value) {
    return isType(value, types.undefined);
}

export function isPrimitive(value) {
    return !isAny(value, isArray, isDate, isObject);
}

export function isCollection(value) {
    return isAny(value, isArray, isObject);
}