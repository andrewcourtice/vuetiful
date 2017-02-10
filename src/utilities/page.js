export default function page(array, pageSize) {
    let pages = [];
    let start = 0;
    let length = array.length;

    while (start < length) {
        let end = start + pageSize;

        if (length - start < pageSize) {
            end = start + (length - start);
        }

        let page = array.slice(start, end);

        pages.push(page);
        start += pageSize;
    }

    return pages;
}