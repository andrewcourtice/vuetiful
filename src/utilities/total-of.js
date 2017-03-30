import aggregate from "./base/aggregator";

function total(accumulator, value) {
    let num = parseFloat(value);

    return isNaN(num) ? false : accumulator + num;
}

export default function totalOf(array, callback) {

    callback = callback || (item => item);

    return aggregate(array, (accumulator, item, array) => {
        let value = callback.call(array, item);

        return total.call(array, accumulator, value);
    });
}