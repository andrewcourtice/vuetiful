import sortBy from "./sort-by";

export default function medianOf(array, callback) {
    let sorted = sortBy(array, callback);
    let count = sorted.length;
    let half = Math.floor(count / 2);

    return count % 2 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
}