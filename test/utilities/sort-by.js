import { assert } from "chai";
import sortBy from "../../src/utilities/sort-by";

const simpleArray = [5, 6, 1, 9, 4];

const comparitiveOperators = {
    lt: (a, b) => a < b,
    gt: (a, b) => a > b
};

function verifySortedArray(sortedArray, comparitiveOperator) {
    return sortedArray.every((item, index, array) => {
        return index < array.length - 1 ? comparitiveOperator(array[index], array[index + 1]) : array[index];
    });
}

describe("Sort By", () => {

    it("should sort a simple array in ascending order", () => {
        let sortedArray = sortBy(simpleArray);

        let isSorted = verifySortedArray(sortedArray, comparitiveOperators.lt);

        assert.isTrue(isSorted);
    });

    it("should sort a simple array in descending order", () => {
        let sortedArray = sortBy(simpleArray, null, -1);

        let isSorted = verifySortedArray(sortedArray, comparitiveOperators.gt);

        assert.isTrue(isSorted);
    });

});