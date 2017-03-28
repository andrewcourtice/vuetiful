import Aggregator from "./aggregator";
import total from "./total";

class Average extends Aggregator {
    aggregate(array, key) { 
        let value = total.aggregate(array, key);

        return value / array.length;
    }
}

export default new Average();