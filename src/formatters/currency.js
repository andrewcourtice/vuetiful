import currencies from "../maps/currencies";

export default function currency(value, precision, currency) {

    precision = precision || 2;

    let parsed = parseFloat(value);

    if (isNaN(parsed)) {
        return value;
    }

    let symbol = currency ? currencies[currency.toUpperCase()] : currencies.USD;

    return symbol + parsed.toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}