
export default class Aggregator {
    constructor(callback, startValue) {
        this.callback = callback;
        this.startValue = startValue || 0;
    }

    aggregate(array, key) {
        let aggregate = this.startValue;

        for (let item of array) {
            let rawValue = item[key];
            let numericValue = parseFloat(rawValue);

            if (isNaN(numericValue)) {
                return "n/a";
            }

            aggregate = this.callback.call(array, aggregate, numericValue);
        }

        return aggregate;
    }
}