import {
    assert
} from "chai";
import averageOf from "../../src/utilities/average-of";

const array = [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5];

describe("Average", () => { 

    it("should find the average of an array of numeric structures", () => { 
        let average = averageOf(array);

        assert.isNumber(average);     
    });

});