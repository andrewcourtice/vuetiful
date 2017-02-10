export default function mapValues(object, callback) {
    let mapped = {};

    for (let prop in object) {
        mapped[prop] = callback(object[prop]);
    }

    return mapped;
}