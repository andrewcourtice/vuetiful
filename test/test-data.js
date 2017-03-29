export const arrays = {

    simple: {

        numeric: {
            data: [5, 6, 5, 3, 9, 4, 7, 1, 4, 9, 0, 3, 5],
            expected: {
                first: 5,
                last: 5,
                min: 0,
                max: 9,
                average: 0,
                total: 0
            }
        },

        mixed: {
            data: [5, 6, "john", 3, 9, 4, new Date(), 1, 4, 9, false, 3, 5]
        }
    },

    complex: {
        data: [{
                id: "0584e8d2-984c-4ce0-a20f-8b9e21cd2c00",
                purchasorName: "Nancy Fuller",
                purchasorEmail: "nfuller0@about.me",
                purchaseDate: "2002-01-02T04:45:48Z",
                purchaseAmount: 1166.14,
                quantity: 15
            },
            {
                id: "f4769183-38af-4c22-8383-6dea302466fd",
                purchasorName: "Melissa Meyer",
                purchasorEmail: "mmeyer1@angelfire.com",
                purchaseDate: "2010-05-15T08:13:59Z",
                purchaseAmount: 6123.50,
                quantity: 15
            },
            {
                id: "e171c9fb-2438-4f23-8d0d-011b2d8e95bc",
                purchasorName: "Larry Rose",
                purchasorEmail: "lrose2@cdbaby.com",
                purchaseDate: "2014-11-23T09:18:18Z",
                purchaseAmount: 8288.27,
                quantity: 15
            },
            {
                id: "3cad078d-083b-416e-9dd4-2f1470c3458d",
                purchasorName: "Jack Simpson",
                purchasorEmail: "jsimpson3@mayoclinic.com",
                purchaseDate: "2002-01-02T04:45:48Z",
                purchaseAmount: 1215.03,
                quantity: 15
            },
            {
                id: "ef7ff12c-90e5-4bfb-8fdd-9f20e4206afa",
                purchasorName: "Ernest Watson",
                purchasorEmail: "ewatson4@nytimes.com",
                purchaseDate: "2002-01-02T04:45:48Z",
                purchaseAmount: 9455.16,
                quantity: 15
            },
            {
                id: "b243be08-6b9c-4ebd-bb8b-b59256ad4956",
                purchasorName: "Adam Castillo",
                purchasorEmail: "acastillo5@dailymotion.com",
                purchaseDate: "2014-08-22T08:14:28Z",
                purchaseAmount: 9988.45,
                quantity: 15
            },
            {
                id: "a491adf5-8129-4f93-9442-98522fbd1e90",
                purchasorName: "Wayne Wilson",
                purchasorEmail: "wwilson6@indiegogo.com",
                purchaseDate: "2012-03-07T22:16:08Z",
                purchaseAmount: 4563.87,
                quantity: 15
            },
            {
                id: "497a6cca-5c9c-4b93-af8e-63c93de3eacf",
                purchasorName: "Roy Coleman",
                purchasorEmail: "rcoleman7@independent.co.uk",
                purchaseDate: "2010-09-14T05:05:17Z",
                purchaseAmount: 4563.87,
                quantity: 15
            },
            {
                id: "ea34a698-fb86-44a5-b80e-57087d48737c",
                purchasorName: "Betty Diaz",
                purchasorEmail: "bdiaz8@dropbox.com",
                purchaseDate: "2012-03-07T22:16:08Z",
                purchaseAmount: 7527.62,
                quantity: 15
            },
            {
                id: "c48e5e68-cae5-4a2e-96b2-8509fca19ddb",
                purchasorName: "Sharon Gardner",
                purchasorEmail: "sgardner9@seesaa.net",
                purchaseDate: "2004-10-14T14:59:00Z",
                purchaseAmount: 1166.14,
                quantity: 15
            }
        ],
        expected: {
            purchaseAmount: {
                first: 1166.14,
                last: 1166.14,
                min: 1166.14,
                max: 9988.45
            }
        }
    }
};
