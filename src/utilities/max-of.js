import aggregate from "./aggregate";

function max(accumulator, value) {
    let num = parseFloat(value);

    return isNaN(num) ? false : Math.max(accumulator, value);
}

export default function minOf(array, callback) {

    callback = callback || (item => item);    

    return aggregate(array, (accumulator, item, array) => { 
        let value = callback.call(array, item);

        return max(accumulator, value);
    }, -Infinity);
}