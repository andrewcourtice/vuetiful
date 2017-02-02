export function nest(array, keys) {
    if (!keys.length) {
        return array;
    }

    let key = keys.shift();

    let group = groupBy(array, key);

    return mapValues(group, (value, prop) => {
        return nest(value, [...keys]);
    });
}