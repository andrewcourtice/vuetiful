import aggregate from "./aggregate";

function _count(accumulator, value) {
    return accumulator + 1;
}

export default function countOf(array, key) {
    return aggregate(array, key, _count);
}