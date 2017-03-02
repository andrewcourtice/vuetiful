<template>
    <div id="paginators">
        <h1>Paginator</h1>
        <div>
            <h3>Paginated Datatable</h3>
            <div class="grid-row">
                <div class="grid-cell">
                    <input type="text" placeholder="Filter data" v-model="customers.filter">
                </div>
            </div>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <paginator :source="customers.rows" :page-size="4" :filter="customers.filter">
                        <template scope="page">
                            <datatable id="data-table-main" :source="page.data" :striped="customers.striped" :editable="customers.editable" :line-numbers="customers.lineNumbers">
                                <datatable-column id="sel" label="sel" width="3.25rem" :sortable="false" :groupable="false" class="checkable-column">
                                    <checkbox id="sel-all" v-model="selectAll"></checkbox>
                                </datatable-column>
                                <datatable-column v-for="column in customers.columns" :key="column.id" :id="column.id" :label="column.label" :width="column.width" :formatter="column.formatter"
                                    :sortable="column.sortable" :groupable="column.groupable" :total="column.total">
                                    </datatable-column>
                                    <template slot="sel" scope="cell">
                                        <div class="checkable-column">
                                            <checkbox :id="cell.row.id" :value="cell.row" v-model="customers.selected"></checkbox>
                                        </div>
                                    </template>
                            </datatable>
                        </template>
                    </paginator>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { format } from "date-fns";

    let customers = {
        striped: true,
        editable: false,
        lineNumbers: false,

        columns: [
            {
                id: "purchasor_name",
                label: "Client Name",
                width: null,
                sortable: true,
                groupable: true,
                total: false
            },
            {
                id: "purchasor_email",
                label: "Client Email",
                width: 25,
                sortable: true,
                groupable: true,
                total: false
            },
            {
                id: "purchase_date",
                label: "Purchase Date",
                width: null,
                sortable: true,
                groupable: true,
                total: false,
                formatter: value => format(value, "DD MMMM YYYY")
            },
            {
                id: "purchase_amount",
                label: "Purchase Amount",
                width: null,
                sortable: true,
                groupable: true,
                total: true,
                formatter: value => {
                    var currency = parseFloat(value);

                    if (isNaN(currency)) {
                        return value;
                    }

                    return "$" + currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }
            }
        ],

        rows: [
            {
                id: "0584e8d2-984c-4ce0-a20f-8b9e21cd2c00",
                purchasor_name: "Nancy Fuller",
                purchasor_email: "nfuller0@about.me",
                purchase_date: "2002-01-02T04:45:48Z",
                purchase_amount: 1166.14
            },
            {
                id: "f4769183-38af-4c22-8383-6dea302466fd",
                purchasor_name: "Melissa Meyer",
                purchasor_email: "mmeyer1@angelfire.com",
                purchase_date: "2010-05-15T08:13:59Z",
                purchase_amount: 6123.50
            },
            {
                id: "e171c9fb-2438-4f23-8d0d-011b2d8e95bc",
                purchasor_name: "Larry Rose",
                purchasor_email: "lrose2@cdbaby.com",
                purchase_date: "2014-11-23T09:18:18Z",
                purchase_amount: 8288.27
            },
            {
                id: "3cad078d-083b-416e-9dd4-2f1470c3458d",
                purchasor_name: "Jack Simpson",
                purchasor_email: "jsimpson3@mayoclinic.com",
                purchase_date: "2002-01-02T04:45:48Z",
                purchase_amount: 1215.03
            },
            {
                id: "ef7ff12c-90e5-4bfb-8fdd-9f20e4206afa",
                purchasor_name: "Ernest Watson",
                purchasor_email: "ewatson4@nytimes.com",
                purchase_date: "2002-01-02T04:45:48Z",
                purchase_amount: 9455.16
            },
            {
                id: "b243be08-6b9c-4ebd-bb8b-b59256ad4956",
                purchasor_name: "Adam Castillo",
                purchasor_email: "acastillo5@dailymotion.com",
                purchase_date: "2014-08-22T08:14:28Z",
                purchase_amount: 9988.45
            },
            {
                id: "a491adf5-8129-4f93-9442-98522fbd1e90",
                purchasor_name: "Wayne Wilson",
                purchasor_email: "wwilson6@indiegogo.com",
                purchase_date: "2012-03-07T22:16:08Z",
                purchase_amount: 4563.87
            },
            {
                id: "497a6cca-5c9c-4b93-af8e-63c93de3eacf",
                purchasor_name: "Roy Coleman",
                purchasor_email: "rcoleman7@independent.co.uk",
                purchase_date: "2010-09-14T05:05:17Z",
                purchase_amount: 4563.87
            },
            {
                id: "ea34a698-fb86-44a5-b80e-57087d48737c",
                purchasor_name: "Betty Diaz",
                purchasor_email: "bdiaz8@dropbox.com",
                purchase_date: "2012-03-07T22:16:08Z",
                purchase_amount: 7527.62
            },
            {
                id: "c48e5e68-cae5-4a2e-96b2-8509fca19ddb",
                purchasor_name: "Sharon Gardner",
                purchasor_email: "sgardner9@seesaa.net",
                purchase_date: "2004-10-14T14:59:00Z",
                purchase_amount: 1166.14
            }
        ],

        filter: null,
        selected: []
    };

    export default {

        name: "paginators",

        data() {
            return {
                customers: customers
            };
        },

        computed: {

            selectAll: {
                get() {
                    return customers.selected.length == customers.rows.length;
                },
                set(value) {
                    customers.selected = value ? customers.rows : [];
                }
            }

        }
    }
</script>

<style lang="scss">

    .datatable-options-toggle {
        padding: 0.5rem 1rem;
    }

    .checkable-column {
        text-align: center;

        .checkbox {
            margin: 0;
        }
    }

    .paginator {

        & .datatable {
            border: none;
        }
    }

</style>