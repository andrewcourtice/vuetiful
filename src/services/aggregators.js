
export default {

    min: {
        name: "Min",
        aggregate: Infinity,
        callback: Math.min
    },

    max: {
        name: "Max",
        aggregate: -Infinity,
        callback: Math.max
    },

    count: {
        name: "Count",
        aggregate: 0,
        callback: (aggregate, value) => {
            return aggregate + 1;
        }
    },

    total: {
        name: "Total",
        aggregate: 0,
        callback: (aggregate, value) => {
            return aggregate + value;
        }
    }
    
}