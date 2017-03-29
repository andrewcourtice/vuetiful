import {
    assert
} from "chai";
import page from "../../src/utilities/page";

const array = [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5];

describe("Page", () => { 

    it("should page an array by a chunk size", () => { 
        let paged = page(array, 3);

        assert.isArray(paged);     
        assert.lengthOf(paged[0], 3);
        assert.lengthOf(paged[paged.length - 1], 1);
    });

});