<template>
    <div id="datatables" class="container">
        <h1>Datatables</h1>
        <div class="grid-row" layout="row top-stretch">
            <div class="grid-cell">
                <toggle id="editable" v-model="customers.editable">Editable</toggle>
                <toggle id="line-numbers" v-model="customers.lineNumbers">Line Numbers</toggle>
            </div>
        </div>
        <div class="grid-row" layout="row top-stretch">
            <div class="grid-cell">
                <datatable id="data-table-options" :source="customers.columns">
                    <datatable-column id="label" label="Column Name"></datatable-column>
                    <datatable-column id="total" label="Calculate Total"></datatable-column>
                    <template slot="total" scope="cell">
                        <toggle :id="cell.row.id" v-model="cell.row.total">Total</toggle>
                    </template>
                </datatable>
            </div>
        </div>
        <div class="grid-row" layout="row top-stretch">
            <div class="grid-cell">
                <datatable id="data-table-main" :source="customers.rows" :editable="customers.editable" :line-numbers="customers.lineNumbers">
                    <datatable-column 
                        v-for="column in customers.columns"
                        :id="column.id" 
                        :label="column.label" 
                        :formatter="column.formatter" 
                        :total="column.total">
                    </datatable-column>
                </datatable>
            </div>
        </div>
    </div>
</template>

<script>
    import { format } from "date-fns";

    let customers = {
        editable: false,
        lineNumbers: false,
        columns: [
            {
                id: "index",
                label: "Index",
                total: true
            },
            {
                id: "givenName",
                label: "Given Name",
                total: false
            },
            {
                id: "surname",
                label: "Surname",
                total: false
            },
            {
                id: "email",
                label: "Email",
                total: false
            },
            {
                id: "dateOfBirth",
                label: "Date of Birth",
                total: false,
                formatter: value => format(value, "DD MMMM YYYY")
            }
        ],
        rows: []
    };

    export default {

        name: "datatables",

        data() {

            let rows = [];

            for (let i = 0; i < 10; i++) {
                rows.push({
                    index: i + 1,
                    givenName: "John " + i,
                    surname: "Smith " + i,
                    email: `john${i}.smith${i}@random.com`,
                    dateOfBirth: new Date()
                });
            }

            customers.rows = rows.reverse();

            return {
                customers: customers
            }
        }
    }
</script>