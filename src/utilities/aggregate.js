export default function aggregate(array, key, callback, startValue) {

    let accumulator = startValue || 0;

    for (let item of array) {
        let rawValue = item[key];
        let numericValue = parseFloat(rawValue);

        if (isNaN(numericValue)) {
            return "n/a";
        }

        accumulator = callback.call(this, accumulator, numericValue, array);
    }
    
    return accumulator;
}