import {
    assert
} from "chai";

import minOf from "../../src/utilities/min-of";
import { arrays } from "../test-data";

describe("Min Of", () => {

    it("should calculate the minimum value of a simple array with numeric values", () => {    
        const testData = arrays.simple.numeric;

        let min = minOf(testData.data);
        
        assert.isNumber(min);
        assert.equal(min, testData.expected.min);
    });

    it("should calculate the minimum value of a complex array with numeric values", () => {  
        const testData = arrays.complex;

        let min = minOf(testData.data, item => item.purchaseAmount);

        assert.isNumber(min);
        assert.equal(min, testData.expected.purchaseAmount.min);
    });
    
    it("should return false if the array contains a non-numeric value", () => {
        const testData = arrays.simple.mixed;

        let min = minOf(testData.data);
        
        assert.isNotNumber(min);
        assert.isFalse(min);
    });

});