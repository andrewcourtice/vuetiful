import aggregate from "./aggregate";

function _total(accumulator, value) {
    return accumulator + value;
}

export default function totalOf(array, key) {
    return aggregate(array, key, _total);
}