import {
    assert
} from "chai";

import averageOf from "../../src/utilities/average-of";
import totalOf from "../../src/utilities/total-of";
import { arrays } from "../test-data";

describe("Average", () => { 

    it("should find the average of an array of simple numeric structures", () => { 
        const testData = arrays.simple.numeric;

        let average = averageOf(testData.data);
        let total = totalOf(testData.data);

        assert.isNumber(average); 
        assert.equal(average, total / testData.data.length);    
    });

    it("should find the average of an array of complex numeric structures", () => { 
        const testData = arrays.complex;

        const callback = item => item.purchaseAmount;

        let average = averageOf(testData.data, callback);
        let total = totalOf(testData.data, callback);

        assert.isNumber(average); 
        assert.equal(average, total / testData.data.length);    
    });

});