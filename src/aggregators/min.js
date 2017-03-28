import Aggregator from "./aggregator";

export default new Aggregator((aggregate, value, array) => Math.min(aggregate, value), Infinity);