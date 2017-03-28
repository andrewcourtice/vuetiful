import aggregate from "./aggregate";

export default function maxOf(array, key) {
    return aggregate(array, key, (a, b) => Math.max(a, b), -Infinity);
}