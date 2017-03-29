import {
    assert
} from "chai";
import averageOf from "../../src/utilities/average-of";
import totalOf from "../../src/utilities/total-of";

const array = [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5];

describe("Average", () => { 

    it("should find the average of an array of numeric structures", () => { 
        let average = averageOf(array);
        let total = totalOf(array);

        assert.isNumber(average); 
        assert.equal(average, total / array.length);    
    });

});