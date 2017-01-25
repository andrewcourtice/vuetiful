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
                <datatable id="data-table-1" :source="customers.rows" :editable="customers.editable" :line-numbers="customers.lineNumbers">
                    <datatable-column id="index" label="Index" :formatter="formatIndex" total></datatable-column>
                    <datatable-column id="givenName" label="Given Name"></datatable-column>
                    <datatable-column id="surname" label="Surname"></datatable-column>
                    <datatable-column id="email" label="Email" width="33"></datatable-column>
                    <datatable-column id="dateOfBirth" label="Date of Birth" :formatter="formatDate"></datatable-column>
                    <template slot="surname" scope="cell">
                        <div class="surname">{{ cell.value }}</div>
                    </template>
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
        },

        methods: {

            formatIndex: value => `Index: ${ value }`,
            formatDate: value => format(value, "DD MMMM YYYY")
            
        }
    }
</script>