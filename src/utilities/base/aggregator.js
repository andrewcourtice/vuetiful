export default function aggregate(array, callback, startValue) {

    let accumulator = startValue || 0;

    for (let item of array) {

        let result = callback.call(this, accumulator, item, array);

        if (result === false) {
            return false;
        }

        accumulator = result;
    }
    
    return accumulator;
}
