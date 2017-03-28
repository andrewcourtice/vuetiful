import Aggregator from "./aggregator";

export default new Aggregator((aggregate, value) => {
    return aggregate + 1;
})