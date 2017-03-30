import varianceOf from "./variance-of";

export default function standardDeviationOf(array, callback) {
    let variance = varianceOf(array, callback);

    return variance ? Math.sqrt(variance) : false;
}