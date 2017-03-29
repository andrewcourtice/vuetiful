import {
    assert
} from "chai";
import minOf from "../../src/utilities/min-of";

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

describe("Min Of", () => {

    it("should calculate the minimum value of a simple array with numeric values", () => {       
        let min = minOf(simpleArray);

        assert.isNumber(min);
        assert.equal(min, 1);
    });

    it("should calculate the minimum value of a complex array with numeric values", () => {       
        let min = minOf(complexArray, item => item.age);

        assert.isNumber(min);
        assert.equal(min, 18);
    });
    
    it("should return false if the array contains a non-numeric value", () => {
        const array = [5, "hello", 7, 4];

        let min = minOf(array);
        
        assert.isNotNumber(min);
        assert.isFalse(min);
    });

});