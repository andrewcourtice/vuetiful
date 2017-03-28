import aggregate from "./aggregate";
import averageOf from "./average-of";

export default function varianceOf(array, key) {
    let count = array.length;
    let average = averageOf(array, key);
    
    let totalVariance = aggregate(array, key, (accumulator, value) => { 
        return accumulator + Math.pow(value - average, 2);
    });
    console.log(totalVariance);
    return totalVariance / count;
}