import {
    assert
} from "chai";
import sortBy from "../../src/utilities/sort-by";

const simpleArray = [5, 6, 1, 9, 4];

const complexArray = [
    {
        name: "Robert",
        age: 21
    },
    {
        name: "Cindy",
        age: 18
    },
    {
        name: "Samantha",
        age: 35
    },
    {
        name: "Phillip",
        age: 52
    },
    {
        name: "Scott",
        age: 23
    }
];

const comparitiveOperators = {
    lt: (a, b) => a < b,
    gt: (a, b) => a > b
};

function verifySortedArray(sortedArray, comparitiveOperator, key) {
    return sortedArray.every((item, index, array) => {
        let valueA = array[index];
        let valueB = array[index + 1] || valueA;

        if (key) {
            valueA = valueA[key];
            valueB = valueB[key];
        }

        return index < array.length - 1 ? comparitiveOperator(valueA, valueB) : valueA;
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

    it("should sort a complex array in ascending order", () => {
        const key = "age";

        let sortedArray = sortBy(complexArray, item => item.age);
        let isSorted = verifySortedArray(sortedArray, comparitiveOperators.lt, key);

        assert.isTrue(isSorted);
    });

    it("should sort a complex array in descending order", () => {
        const key = "age";

        let sortedArray = sortBy(complexArray, item => item.age, -1);
        let isSorted = verifySortedArray(sortedArray, comparitiveOperators.gt, key);

        assert.isTrue(isSorted);
    });

});