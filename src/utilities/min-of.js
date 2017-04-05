import aggregate from "./base/aggregator";
import toNumber from "./base/type-converter";

function min(accumulator, value, converter) {
    let converted = converter(value);

    return isNaN(converted) ? false : Math.min(accumulator, converted);
}

export default function minOf(array, callback) {

    callback = callback || (item => item);
    
    // Let's assume (in a perfect world) that the data type of the first item
    // is the same throughout the whole array and use the same converter
    let firstValue = callback.call(array, array[0]);
    let converter = toNumber(firstValue);
    
    return aggregate(array, (accumulator, item, array) => { 
        let value = callback.call(array, item);

        return min(accumulator, value, converter);
    }, Infinity);
}