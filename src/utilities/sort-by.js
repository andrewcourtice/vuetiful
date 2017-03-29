// Consider making this immutable. I'm undecided at the moment.
/**
 * Sort an array of objects by the given key and direction
 * 
 * @export
 * @param {Array} array The array to be sorted
 * @param {String} key The key of the object to sort on
 * @param {Number} direction The direction of the sort
 */
export default function sortBy(array, key, direction) {

    direction = direction || 1;

    if (Math.abs(direction) !== 1) {
        throw new Error("Sort direction must be either 1 (ascending) or -1 (descending)");
    }

    let sortArray = [...array];

    sortArray.sort((a, b) => {
        let valueA = a;
        let valueB = b;

        if (key) {
            valueA = a[key];
            valueB = b[key];
        }

        let outcome = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

        return outcome * direction;
    });

    return sortArray;
}