import {
    assert
} from "chai";
import groupBy from "../../src/utilities/group-by";

const simpleArray = [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5];

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
        age: 21
    },
    {
        name: "Scott",
        age: 18
    }
];

describe("Group By", () => { 

    it("should group a simple array", () => { 
        let grouped = groupBy(simpleArray, item => item);

        assert.isObject(grouped);     
        assert.lengthOf(grouped["3"], 2);
        assert.lengthOf(grouped["4"], 2);
        assert.lengthOf(grouped["9"], 2);
        assert.lengthOf(grouped["5"], 3);
    });

    it("should group a complex array", () => { 
        let grouped = groupBy(complexArray, item => item.age);
        
        assert.isObject(grouped);     
        assert.lengthOf(grouped["18"], 2);
        assert.lengthOf(grouped["21"], 2);
        assert.lengthOf(grouped["35"], 1);
    });

});