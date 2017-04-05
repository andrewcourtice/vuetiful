import * as typeValidator from "./type-validator";

const floatTest = /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/;

const evaluators = [
    {
        test: value => {
            return typeValidator.isNumber(value) ? true : floatTest.test(value);
        },
        toNumber: parseFloat
    },
    {
        test: value => { 
            if (typeValidator.isDate(value)) {
                return true;
            } 

            let date = new Date(value);
            return typeValidator.isDate(date);
        },
        toNumber: value => (new Date(value)).getTime()
    }
]

export default function toNumber(value) {
    
    for (let evaluator of evaluators) {
        let result = evaluator.test(value);

        if (result) {
            return evaluator.toNumber;
        }
    }

    return (value => value);
}