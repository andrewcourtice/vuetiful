import aggregate from "./aggregate";

export default function minOf(array, key) {
    return aggregate(array, key, (a, b) => Math.min(a, b), Infinity);
}