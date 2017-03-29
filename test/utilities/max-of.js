import {
    assert
} from "chai";
import maxOf from "../../src/utilities/max-of";

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

describe("Max Of", () => {

    it("should calculate the maximum value of a simple array with numeric values", () => {       
        let max = maxOf(simpleArray);

        assert.isNumber(max);
        assert.equal(max, 9);
    });

    it("should calculate the maximum value of a complex array with numeric values", () => {       
        let max = maxOf(complexArray, item => item.age);

        assert.isNumber(max);
        assert.equal(max, 52);
    });
    
    it("should return false if the array contains a non-numeric value", () => {
        const array = [5, "hello", 7, 4];

        let max = maxOf(array);
        
        assert.isNotNumber(max);
        assert.isFalse(max);
    });

});