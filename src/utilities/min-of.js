import aggregate from "./aggregate";

function min(accumulator, value) {
    let num = parseFloat(value);

    return isNaN(num) ? false : Math.min(accumulator, value);
}

export default function minOf(array, callback) {

    callback = callback || (item => item);    

    return aggregate(array, (accumulator, item, array) => { 
        let value = callback.call(array, item);

        return min(accumulator, value);
    }, Infinity);
}