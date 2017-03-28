import total from "./total";

export default function average(array, key) {
    let value = total(array, key);
    
    return value / array.length;
}