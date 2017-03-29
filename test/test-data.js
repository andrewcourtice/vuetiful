
const arrays = {

    simple: {

        numeric: {
            data: [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5],
            expected: {
                first: 5,
                last: 5,
                average: 0,
                total: 0
            }
        },

        mixed: {
            data: [5, 6, 5, "hello", 9, 4, 7, 1, new Date(), 9, 0, false, 5]
        }
    },

    complex: {
        
    }
};

export default {
    arrays
}