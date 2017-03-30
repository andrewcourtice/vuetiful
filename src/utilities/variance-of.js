import aggregate from "./base/aggregator";
import averageOf from "./average-of";

export default function varianceOf(array, callback) {
    let count = array.length;
    let average = averageOf(array, callback);
    
    let totalVariance = aggregate(array, (accumulator, item, array) => { 
        let value = callback.call(array, item);

        return accumulator + Math.pow(value - average, 2);
    });
    
    return totalVariance ? totalVariance / count : false;
}