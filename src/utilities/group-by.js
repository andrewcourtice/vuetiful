/**
 * Group and array of objects by a given key
 * 
 * @export
 * @param {Array} array The array to group
 * @param {String} key The key to group the array by
 * @returns Object
 */
export default function groupBy(array, callback) {

    callback = callback || (item => item);

    let groups = {};

    for (let item of array) {
        let value = callback.call(array, item);

        if (!groups.hasOwnProperty(value)) {
            groups[value] = [];
        }

        groups[value].push(item);
    }

    return groups;
}