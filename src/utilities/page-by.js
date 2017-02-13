import groupBy from "./group-by";

export default function pageBy(array, callback) {

    let groups = groupBy(array, callback);

    let pages = [];

    for (let group in groups) {
        pages.push(groups[group]);
    }

    return pages;
}