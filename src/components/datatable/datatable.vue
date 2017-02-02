<template>
    <div class="table-wrapper">
        <table class="datatable" :class="tableClasses">
            <thead>
                <tr>
                    <th v-if="lineNumbers" :style="{ width: lineColumnWidth }">
                        <div class="datatable-column datatable-linenumber-column">#</div>
                    </th>
                    <slot></slot>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="datatable-group" :colspan="columnSpan">
                        <datatable-collection 
                            :rows="rows" 
                            :columns="columns" 
                            :striped="striped"
                            :editable="editable"
                            :line-numbers="lineNumbers"
                            :grouping-columns="groupingColumns"
                            :margin="lineColumnWidth">
                        </datatable-collection>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="showTotals">
                <tr>
                    <td :colspan="columnSpan">Total</td>
                </tr>
                <tr>
                    <td v-if="lineNumbers">&nbsp;</td>
                    <td v-for="column in columns">{{ calculateTotal(column) }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="datatable-options" layout="row center-justify">
            <checkbox v-for="column in groupableColumns" :id="column.id" :val="column.id" v-model="groupingColumns">{{ column.label }}</checkbox>
            <input type="text" placeholder="Filter this dataset" v-model="rowFilter" self="size-x1">
        </div>
    </div>
</template>

<script>
    import DatatableCollection from "./datatable-collection.vue"; 
    import * as utilities from "../../services/utilities.js";

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
            },

            lineNumbers: {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                columns: [],
                rowFilter: null,
                sortingId: null,
                groupingColumns: [],
            };
        },

        computed: {

            sortingColumn() {
                return this.columns.find(column => column.id === this.sortingId);
            },

            tableClasses() {
                return {
                    "datatable-editable": this.editable,
                    "table-fixed": this.fixed
                };
            },

            groupableColumns() {
                return this.columns.filter(column => column.groupable);
            },

            rows() {

                let rows = this.source;

                // Filter the rows first to reduce the set (if a filter is supplied) we need to sort
                if (this.rowFilter) {
                    rows = utilities.filterBy(rows, this.rowFilter);
                }

                // Sort the filtered set
                if (this.sortingColumn) {
                    rows = utilities.sortBy(rows, this.sortingColumn.id, this.sortingColumn.sortingDirection);
                }

                return rows;
            },

            columnSpan() {
                return this.columns.length + (this.lineNumbers ? 1 : 0);
            },

            lineColumnWidth() {
                let count = this.source.length;
                return count.toString().length + 2 + "em";
            },

            showTotals() {
                return this.columns.some(column => column.total);
            }

        },

        methods: {

            addColumn(column) {
                this.columns.push(column);
            },

            removeColumn(column) {
                let index = this.columns.indexOf(column);
                this.columns.splice(index, 1);
            },

            calculateTotal(column) {
                const noTotal = "n/a";

                if (!column.total) {
                    return noTotal;
                }

                let total = 0;

                for (let i = 0; i < this.source.length; i++) {
                    let row = this.source[i];

                    let value = parseFloat(row[column.id]);

                    if (isNaN(value)) {
                        return noTotal;
                    }

                    total += value;
                }

                return column.formatData(total);
            },

            setFilter(phrase) {
                this.rowFilter = phrase;
            }

        },

        components: {
            datatableCollection: DatatableCollection
        }

    }
</script>

<style lang="scss">
    @import "../../assets/styles/abstract/_variables.scss";

    .datatable {

        & th {
            padding: 0;
        }
    }

    .datatable-linenumber-column,
    .datatable-linenumber-cell {
        text-align: center;
    }

    .datatable-linenumber-column {
        cursor: default !important;
    }

    .datatable-linenumber-cell {
        font-weight: 600; 
        background-color: $colour-background-medium !important;
        border-right-color: $colour-border;
    }

    .datatable-group {
        padding: 0;
        background-color: $colour-background;
        border-bottom: 1px solid $colour-border;
    }

    .datatable-group-header {
        padding: 0.5rem 1rem;
        background-color: $colour-background-medium;
        border-bottom: 1px solid $colour-border;
    }

    .datatable-row-indent {
        display: inline-block;
        width: 1.5rem;
        height: 1em;
    }

    .datatable-group-label {
        font-weight: 600;
    }

    .datatable-info-cell {
        text-align: center;
        font-weight: 600;
    }

    .datatable-options {
        padding: 0.75rem 1rem;
        background-color: $colour-background-medium;
        border-top: 1px solid $colour-border;
    }

    .datatable-editable {

        & .datatable-cell {
            position: relative;
            padding: 0 !important;
            overflow: visible;

            & input,
            & select {
                display: block;
                width: 100%;
                height: auto;
                padding: 0.5rem 1rem;
                background-color: transparent;
                border: none;
                border-radius: 0;

                &:focus,
                &:active {
                    box-shadow: 0 0 0 2px $colour-primary;
                }
            }          
        }
    }


</style>