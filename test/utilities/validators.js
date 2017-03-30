import {
    assert
} from "chai";

import * as validators from "../../src/utilities/validators";

describe("Validators", () => { 

    it("should validate the type of an array", () => { 
        let result = validators.isArray([]);

        assert.isTrue(result); 
    });

    it("should validate the type of a boolean", () => { 
        let result = validators.isBoolean(true);

        assert.isTrue(result); 
    });

    it("should validate the type of a date", () => { 
        let result = validators.isDate(new Date());

        assert.isTrue(result); 
    });    

    it("should validate the type of null", () => { 
        let result = validators.isNull(null);

        assert.isTrue(result); 
    });

    it("should validate the type of a number", () => { 
        let result = validators.isNumber(5);

        assert.isTrue(result); 
    });

    it("should validate the type of an object", () => { 
        let result = validators.isObject({});

        assert.isTrue(result); 
    });

    it("should validate primitive types", () => { 
        let arrayResult = validators.isPrimitive([]);
        let boolResult = validators.isPrimitive(true);
        let dateResult = validators.isPrimitive(new Date());
        let numberResult = validators.isPrimitive(5);
        let objectResult = validators.isPrimitive({});
        let stringResult = validators.isPrimitive("hello");
        
        assert.isFalse(arrayResult);        
        assert.isTrue(boolResult);
        assert.isFalse(dateResult);
        assert.isTrue(numberResult);
        assert.isFalse(objectResult);
        assert.isTrue(stringResult);
    });
});