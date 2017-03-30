import sortBy from "./sort-by";

function getValue(item, callback) {
    return callback.call(this, item);
} 

export default function medianOf(array, callback) {
    let sorted = sortBy(array, callback);
    let count = sorted.length;
    let half = Math.floor(count / 2);

    let primaryMedian = getValue(sorted[half], callback);

    if (count % 2) {
        return primaryMedian;
    }    

    let secondaryMedian = getValue(sorted[half - 1], callback); 
    
    return (primaryMedian + secondaryMedian) / 2;
}