import totalOf from "./total-of";

export default function averageOf(array, key) {
    let value = totalOf(array, key);
    
    return value / array.length;
}