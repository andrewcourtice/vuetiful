export default function aggregate(array, key, callback, startValue) {

    let accumulator = startValue || 0;

    for (let item of array) {
        let rawValue = key ? item[key] : item;
        let numericValue = parseFloat(rawValue);

        if (isNaN(numericValue)) {
            return "n/a";
        }

        accumulator = callback.call(this, accumulator, numericValue, array);
    }
    
    return accumulator;
}