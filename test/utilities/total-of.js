import {
    assert
} from "chai";
import totalOf from "../../src/utilities/total-of";

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

describe("Total", () => {

    it("should calculate the total of a simple array with numeric values", () => {
        const array = [5, 10, 7, 4];
        
        let total = totalOf(array);

        assert.isNumber(total);
        assert.equal(total, 26);
    });

    it("should return false if the array contains a non-numeric value", () => {
        const array = [5, "hello", 7, 4];

        let total = totalOf(array);
        
        assert.isNotNumber(total);
        assert.isFalse(total);
    });

});