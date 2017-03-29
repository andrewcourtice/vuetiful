// Consider making this immutable. I'm undecided at the moment.
/**
 * Sort an array of objects by the given key and direction
 * 
 * @export
 * @param {Array} array The array to be sorted
 * @param {Function} callback The callback function to invoke to receive the key to sort on
 * @param {Number} direction The direction of the sort
 */
export default function sortBy(array, callback, direction) {

    direction = direction || 1;
    callback = callback || (item => item);

    if (Math.abs(direction) !== 1) {
        throw new Error("Sort direction must be either 1 (ascending) or -1 (descending)");
    }

    let sortArray = [...array];

    sortArray.sort((a, b) => {
        let valueA = callback.call(array, a);
        let valueB = callback.call(array, b);

        let outcome = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

        return outcome * direction;
    });

    return sortArray;
}