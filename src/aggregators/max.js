import Aggregator from "./aggregator";

export default new Aggregator((aggregate, value, array) => Math.max(aggregate, value), -Infinity);