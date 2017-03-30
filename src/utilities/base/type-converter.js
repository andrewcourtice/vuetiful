import * as typeValidator from "./type-validator";

const evaluators = [
    {
        parser: value => new Date(value),
        validator: typeValidator.isDate,
        converter: value => (new Date(value)).getTime()
    },
    {
        parser: parseFloat,
        validator: typeValidator.isNumber,
        converter: parseFloat
    }
]

export default function getTypeConverter(value) {
    
    for (let evaluator of evaluators) {
        let parsed = evaluator.parser(value);
        let result = evaluator.validator(parsed);

        if (result) {
            console.log(evaluator);
            return evaluator.converter;
        }
    }

    return (value => value);
}