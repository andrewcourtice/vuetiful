import varianceOf from "./variance-of";

export default function standardDeviationOf(array, callback) {
    let variance = varianceOf(array, callback);

    return Math.sqrt(variance);
}