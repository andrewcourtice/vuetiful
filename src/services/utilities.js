
// Consider making this immutable. I'm undecided at the moment.
/**
 * 
 * 
 * @export
 * @param {any} array The array to be sorted
 * @param {any} key The key of the object to sort on
 * @param {any} direction The direction of the sort
 */
export function sortBy(array, key, direction) {

    if (Math.abs(direction) !== 1) {
        throw new Error("Sort direction must be either 1 (ascending) or -1 (descending)");
    }

    array.sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        let outcome = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

        return outcome * direction;
    });

}

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