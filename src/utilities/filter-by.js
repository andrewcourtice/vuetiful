// Need to add support for searching dates
const SEARCHABLE_TYPES = ["string", "number", "boolean"];

/**
 * Filter an array of objects by the given phrase
 * 
 * @export
 * @param {Array} array
 * @param {String} filter
 * @returns Array
 */
export default function filterBy(array, filter) {
    if (!filter) {
        return array;
    }

    let filtered = [];

    for (let i = 0; i < array.length; i++) {
        let item = array[i];

        for (let prop in item) {
            let value = item[prop];

            // Ensure the value is of a searchable type 
            // This will automatically handle null values
            if (SEARCHABLE_TYPES.indexOf(typeof (value)) < 0) {
                continue;
            }

            // Normalise the value to get a consistent match
            let normalised = value.toString().toLowerCase();

            if (normalised.indexOf(filter.toLowerCase()) > -1) {
                filtered.push(item);
                break;
            }
        }
    }

    return filtered;
}