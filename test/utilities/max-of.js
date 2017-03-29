import {
    assert
} from "chai";

import maxOf from "../../src/utilities/max-of";
import { arrays } from "../test-data";

describe("Max Of", () => {

    it("should calculate the maximum value of a simple array with numeric values", () => {    
        const testData = arrays.simple.numeric;

        let max = maxOf(testData.data);

        assert.isNumber(max);
        assert.equal(max, testData.expected.max);
    });

    it("should calculate the maximum value of a complex array with numeric values", () => {    
        const testData = arrays.complex;

        let max = maxOf(testData.data, item => item.purchaseAmount);

        assert.isNumber(max);
        assert.equal(max, testData.expected.purchaseAmount.max);
    });
    
    it("should return false if the array contains a non-numeric value", () => {
        const testData = arrays.simple.mixed;

        let max = maxOf(testData.data);
        
        assert.isNotNumber(max);
        assert.isFalse(max);
    });

});