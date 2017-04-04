import {
    assert
} from "chai";

import * as typeValidator from "../../src/utilities/base/type-validator";

describe("Type Validator", () => { 

    it("should validate the type of an array", () => { 
        let result = typeValidator.isArray([]);

        assert.isTrue(result); 
    });

    it("should validate the type of a boolean", () => { 
        let result = typeValidator.isBoolean(true);

        assert.isTrue(result); 
    });

    it("should validate the type of a date", () => { 
        let result = typeValidator.isDate(new Date());

        assert.isTrue(result); 
    });    

    it("should validate the type of null", () => { 
        let result = typeValidator.isNull(null);

        assert.isTrue(result); 
    });

    it("should validate the type of a number", () => { 
        let result = typeValidator.isNumber(5);

        assert.isTrue(result); 
    });

    it("should validate the type of an object", () => { 
        let result = typeValidator.isObject({});

        assert.isTrue(result); 
    });

    it("should validate primitive types", () => { 
        let arrayResult = typeValidator.isPrimitive([]);
        let boolResult = typeValidator.isPrimitive(true);
        let dateResult = typeValidator.isPrimitive(new Date());
        let numberResult = typeValidator.isPrimitive(5);
        let objectResult = typeValidator.isPrimitive({});
        let stringResult = typeValidator.isPrimitive("hello");
        
        assert.isFalse(arrayResult);        
        assert.isTrue(boolResult);
        assert.isFalse(dateResult);
        assert.isTrue(numberResult);
        assert.isFalse(objectResult);
        assert.isTrue(stringResult);
    });
});