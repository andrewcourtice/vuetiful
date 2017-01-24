<template>
    <div class="table-wrapper" :id="id">
        <table class="datatable" :class="tableClasses">
            <thead>
                <tr>
                    <slot></slot>
                </tr>
            </thead>
            <tbody v-for="(rows, group) in groups">
                <tr class="table-group-header" v-if="groupingColumn">
                    <td :colspan="columnSpan">{{ groupingColumn.formatData(group) }}</td>
                </tr>
                <tr v-if="rows.length == 0">
                    <td class="datatable-info-cell" :colspan="columnSpan">No results</td>
                </tr>
                <tr v-for="row in rows">
                    <td v-for="column in columns" :class="cellClasses">
                        <slot :name="column.id" :row="row" :column="column" :value="row[column.id]">
                            <input type="text" v-model="row[column.id]" v-if="editable">
                            <span v-else>{{ column.formatData(row[column.id]) }}</span>
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="showTotals">
                <tr>
                    <td :colspan="columnSpan">Total</td>
                </tr>
                <tr>
                    <td v-for="column in columns">{{ calculateTotal(column) }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="datatable-options">
            <select v-model="groupingColumn">
                <option :value="null">No grouping</option>
                <option v-for="column in columns" :value="column">{{ column.label }}</option>
            </select>
            <input type="text" placeholder="Filter this dataset" v-model="rowFilter">
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import registerable from "../mixins/registerable.js";
    import * as utilities from "../services/utilities.js";

    export default {

        props: {

            fixed: {
                type: Boolean,
                default: true
            },

            striped: {
                type: Boolean,
                default: true
            },

            source: {
                type: Array,
                default: () => []
            },

            editable: {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                columns: [],
                rowFilter: null,
                groupingColumn: null,
                sortId: null,
                sortDirection: 1
            };
        },

        computed: {

            tableClasses() {
                return {
                    "table-fixed": this.fixed,
                    "table-striped": this.striped
                };
            },

            cellClasses() {
                return "datatable-cell-" + (this.editable ? "edit" : "view");
            },

            groups() {

                let rows = this.source;
                
                // Filter the rows first to reduce the set (if a filter is supplied) we need to sort
                if (this.rowFilter) {
                    rows = utilities.filterBy(rows, this.rowFilter);
                }
                
                // Sort the filtered set
                if (this.sortId) {
                    rows = utilities.sortBy(rows, this.sortId, this.sortDirection);
                }

                // Group the set regardless to ensure a consistent result for the template
                let groupingId = this.groupingColumn ? this.groupingColumn.id : null;
                let groups = utilities.groupBy(rows, groupingId);

                return groups;
            },

            columnSpan() {
                return this.columns.length;
            },

            showTotals() {
                return this.columns.some(column => column.total);
            }

        },

        methods: {

            addColumn(column) {
                this.columns.push(column);
            },

            sortBy(column) {
                let id = column.id;

                if (id === this.sortId) {
                    this.sortDirection *= -1;
                    return;
                }

                this.sortId = id;
                this.sortDirection = 1;
            },

            calculateTotal(column) {
                let total = 0;

                for (let i = 0; i < this.source.length; i++) {
                    let row = this.source[i];

                    let value = parseFloat(row[column.id]);

                    if (isNaN(value)) {
                        return "n/a";
                    }

                    total += value;
                }

                return column.formatData(total);
            }

        },

        mixins: [registerable]

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";

    .datatable {

        & th {
            padding: 0;
        }
    }

    .datatable-info-cell {
        font-weight: 600;
        text-align: center;
    }

    .datatable-cell-edit {
        position: relative;
        padding: 0;
        overflow: visible;
        
        & input,
        & select {
            display: block;
            width: 100%;
            height: auto;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0;

            &:focus,
            &:active {
                box-shadow: 0 0 0 1px $colour-primary;
            }
        }
    }

    .datatable-options {
        padding: 0.75rem 1rem;
        background-color: #FAFAFA;
        border-top: 1px solid $colour-border;
    }

</style>