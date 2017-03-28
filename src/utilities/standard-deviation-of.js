import varianceOf from "./variance-of";

export default function standardDeviationOf(array, key) {
    let variance = varianceOf(array, key);

    return Math.sqrt(variance);
}