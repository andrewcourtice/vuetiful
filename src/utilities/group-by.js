/**
 * Group and array of objects by a given key
 * 
 * @export
 * @param {Array} array The array to group
 * @param {String} key The key to group the array by
 * @returns Object
 */
export function groupBy(array, key) {
    if (!key) {
        return array;
    }

    let groups = {};

    for (let row of array) {
        let cell = row[key];

        if (!groups.hasOwnProperty(cell)) {
            groups[cell] = [];
        }

        groups[cell].push(row);
    }

    return groups;
}