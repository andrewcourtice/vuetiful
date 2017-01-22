
// Need to add support for searching dates
const SEARCHABLE_TYPES = [ "string", "number", "boolean" ];

/**
 * Filter an array of objects by the given phrase
 * 
 * @export
 * @param {Array} array
 * @param {String} filter
 * @returns Array
 */
export function filterBy(array, filter) {
    if (!filter) {
        return array;
    }

    let filtered = [];

    for (let i = 0; i < array.length; i++) {
        let item = array[i];

        for (let prop in item) {
            let value = item[prop];

            if (!value || SEARCHABLE_TYPES.indexOf(typeof(value)) < 0) {
                continue;
            }

            let sanitised = value.toString().toLowerCase();

            if (sanitised.indexOf(filter) > -1) {
                filtered.push(item);
                break;
            }
        }
    }

    return filtered;
}

// Consider making this immutable. I'm undecided at the moment.
/**
 * Sort an array of objects by the given key and direction
 * 
 * @export
 * @param {Array} array The array to be sorted
 * @param {String} key The key of the object to sort on
 * @param {Number} direction The direction of the sort
 */
export function sortBy(array, key, direction) {

    if (Math.abs(direction) !== 1) {
        throw new Error("Sort direction must be either 1 (ascending) or -1 (descending)");
    }

    let sortArray = [...array];

    sortArray.sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        let outcome = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

        return outcome * direction;
    });

    return sortArray;    
}

/**
 * Group and array of objects by a given key
 * 
 * @export
 * @param {Array} array The array to group
 * @param {String} key The key to group the array by
 * @returns Object
 */
export function groupBy(array, key) {
    let groups = {
        data: array
    };

    if (key) {
        groups = {};

        for (let row of array) {
            let cell = row[key];

            if (!groups.hasOwnProperty(cell)) {
                groups[cell] = [];
            }

            groups[cell].push(row);
        }
    }

    return groups;
}