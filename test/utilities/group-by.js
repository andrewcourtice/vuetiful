import {
    assert
} from "chai";

import groupBy from "../../src/utilities/group-by";
import { arrays } from "../test-data";

describe("Group By", () => { 

    it("should group a simple array", () => { 
        const testData = arrays.simple.numeric;

        let grouped = groupBy(testData.data);

        assert.isObject(grouped);     
        assert.lengthOf(grouped["3"], 2);
        assert.lengthOf(grouped["4"], 2);
        assert.lengthOf(grouped["9"], 2);
        assert.lengthOf(grouped["5"], 3);
    });

    it("should group a complex array", () => { 
        const testData = arrays.complex;

        let grouped = groupBy(testData.data, item => item.purchaseAmount);
        
        assert.isObject(grouped);     
        assert.lengthOf(grouped["1166.14"], 2);
        assert.lengthOf(grouped["4563.87"], 2);
    });

});