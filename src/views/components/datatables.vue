<template>
    <div id="datatables">
        <h1>Datatables</h1>
        <div>
            <h3>Configuration</h3>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <toggle id="striped" v-model="customers.striped">Striped</toggle>
                    <toggle id="line-numbers" v-model="customers.lineNumbers">Line Numbers</toggle>
                    <toggle id="editable" v-model="customers.editable">Editable</toggle>
                </div>
            </div>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-options" :source="customers.columns" :filterable="false" editable>
                        <datatable-column id="label" label="Column Name"></datatable-column>
                        <datatable-column id="width" label="Width"></datatable-column>
                        <datatable-column id="sortable" label="Sortable"></datatable-column>
                        <datatable-column id="groupable" label="Groupable"></datatable-column>
                        <template slot="sortable" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + '-sortable'" v-model="cell.row.sortable"></toggle>
                            </div>
                        </template>
                        <template slot="groupable" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + '-groupable'" v-model="cell.row.groupable"></toggle>
                            </div>
                        </template>
                    </datatable>
                </div>
            </div>
        </div>
        <div>
            <h3>Datatable</h3>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-main" :source="customers.rows" :striped="customers.striped" :editable="customers.editable" :line-numbers="customers.lineNumbers">
                        <datatable-column id="sel" label="sel" width="3.25rem" :sortable="false" :groupable="false" class="checkable-column">
                            <checkbox id="sel-all" v-model="selectAll"></checkbox>
                        </datatable-column>
                        <datatable-column v-for="column in customers.columns" :key="column.id" :id="column.id" :label="column.label" :width="column.width" :alignment="column.alignment" :formatter="column.formatter"
                            :sortable="column.sortable" :groupable="column.groupable" :aggregators="column.aggregators">
                            </datatable-column>
                            <template slot="sel" scope="cell">
                                <div class="checkable-column">
                                    <checkbox :id="cell.row.id" :value="cell.row" v-model="customers.selected"></checkbox>
                                </div>
                            </template>
                    </datatable>
                </div>
            </div>
        </div>
        <div>
            <h3>Selected Rows</h3>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-selected" :source="customers.selected">
                        <datatable-column v-for="column in customers.columns" :key="column.id" :id="column.id" :label="column.label" :width="column.width" :alignment="column.alignment" :formatter="column.formatter"></datatable-column>
                    </datatable>
                </div>
            </div>
        </div>
        <div>
            <h3>Formatting</h3>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-options" :source="formatters" :filterable="false" editable>
                        <datatable-column id="name" label="Name" width="33" :sortable="false" :groupable="false"></datatable-column>
                        <datatable-column id="format" label="Format" :sortable="false" :groupable="false"></datatable-column>
                        <template slot="format" scope="cell">
                            <div v-if="cell.row.id === 'C'">
                                <select v-model.lazy="customers.currency">
                                    <option :value="code" v-for="(symbol, code) in currencies">{{ code }} ({{ symbol }})</option>
                                </select>
                            </div>
                            <div v-else>
                                <select v-model.lazy="customers.dateFormat">
                                    <option :value="format" v-for="format in dateFormats">{{ format }}</option>
                                </select>
                            </div>
                        </template>
                    </datatable>
                </div>
            </div>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-main" 
                        :source="customers.rows" 
                        :striped="customers.striped" 
                        :editable="customers.editable" 
                        :line-numbers="customers.lineNumbers">
                        <datatable-column 
                            v-for="column in customers.columns" 
                            :id="column.id" 
                            :label="column.label" 
                            :width="column.width" 
                            :alignment="column.alignment" 
                            :sortable="column.sortable"
                            :groupable="column.groupable"
                            :formatter="column.formatter">
                        </datatable-column>
                    </datatable>
                </div>
            </div>
        </div>
        <div>
            <h3>Aggregation</h3>
            <p>
                This is a basic example of how to use aggregate functions with the datatable 
            </p>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-options" :source="customers.columns" :filterable="false" editable>
                        <datatable-column id="label" label="Column Name" width="25" data-intro="Clicking a column will sort by that column" data-step="4"></datatable-column>
                        <datatable-column id="min" label="Min"></datatable-column>
                        <datatable-column id="max" label="Max"></datatable-column>
                        <datatable-column id="average" label="Average (mean)"></datatable-column>
                        <datatable-column id="median" label="Median"></datatable-column>
                        <datatable-column id="total" label="Total"></datatable-column>
                        <template slot="min" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + 'min'" :value="aggregators.min" v-model="cell.row.aggregators"></toggle>
                            </div>
                        </template>
                        <template slot="max" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + 'max'" :value="aggregators.max" v-model="cell.row.aggregators"></toggle>
                            </div>
                        </template>
                        <template slot="average" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + 'average'" :value="aggregators.average" v-model="cell.row.aggregators"></toggle>
                            </div>
                        </template>
                        <template slot="median" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + 'median'" :value="aggregators.median" v-model="cell.row.aggregators"></toggle>
                            </div>
                        </template>
                        <template slot="total" scope="cell">
                            <div class="datatable-options-toggle">
                                <toggle :id="cell.row.id + 'total'" :value="aggregators.total" v-model="cell.row.aggregators"></toggle>
                            </div>
                        </template>
                    </datatable>
                </div>
            </div>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <datatable id="data-table-main" 
                        :source="customers.rows" 
                        :striped="customers.striped" 
                        :editable="customers.editable" 
                        :line-numbers="customers.lineNumbers">
                        <datatable-column 
                            v-for="column in customers.columns" 
                            :id="column.id" 
                            :label="column.label" 
                            :width="column.width"
                            :alignment="column.alignment" 
                            :sortable="column.sortable"
                            :groupable="column.groupable"
                            :aggregators="column.aggregators"
                            :formatter="column.formatter">
                        </datatable-column>
                    </datatable>
                </div>
            </div>
        </div>
        <div>
            <h3>Paginated</h3>
            <div class="grid-row" layout="row top-stretch">
                <div class="grid-cell">
                    <paginator :source="customers.rows" :page-size="3">
                        <template scope="page">
                            <datatable id="data-table-main" :source="page.data" :striped="customers.striped" :editable="customers.editable" :line-numbers="customers.lineNumbers">
                                <datatable-column id="sel" label="sel" width="3.25rem" :sortable="false" :groupable="false" class="checkable-column">
                                    <checkbox id="sel-all" v-model="selectAll"></checkbox>
                                </datatable-column>
                                <datatable-column v-for="column in customers.columns" :key="column.id" :id="column.id" :label="column.label" :width="column.width" :formatter="column.formatter"
                                    :sortable="column.sortable" :groupable="column.groupable">
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
    import aggregators from "../../aggregators/aggregators.js";
    import formatters from "../../formatters/formatters.js";
    import currencies from "../../maps/currencies.js";

    let customers = {
        striped: true,
        editable: false,
        lineNumbers: false,

        currency: "USD",
        dateFormat: "D MMMM YYYY",

        columns: [
            {
                id: "purchasor_name",
                label: "Client Name",
                width: null,
                sortable: true,
                groupable: true,
                aggregators: []
            },
            {
                id: "purchasor_email",
                label: "Client Email",
                width: 25,
                sortable: true,
                groupable: true,
                aggregators: []
            },
            {
                id: "purchase_date",
                label: "Purchase Date",
                width: null,
                sortable: true,
                groupable: true,
                formatter: value => {
                    return formatters.datetime(value, customers.dateFormat);
                },
                aggregators: [
                    aggregators.min,
                    aggregators.max
                ]
            },
            {
                id: "purchase_amount",
                label: "Purchase Amount",
                width: null,
                alignment: "right",
                sortable: true,
                groupable: true,
                formatter: value => {
                    return formatters.currency(value, 2, customers.currency);
                },
                aggregators: [ 
                    aggregators.min, 
                    aggregators.max,
                    aggregators.total
                ]
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

        selected: []
    };

    export default {

        name: "datatables",

        data() {
            return {
                customers: customers,
                currencies: currencies,
                aggregators: aggregators,
                dateFormats: [
                    "DD/MM/YYYY",
                    "DD MMM YYYY",
                    "D MMMM YYYY",
                    "D/MM/YYYY h:mm a"
                ],
                formatters: [
                    { id: "C", name: "Currency" },
                    { id: "DT", name: "Date and Time" }
                ]
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

</style>