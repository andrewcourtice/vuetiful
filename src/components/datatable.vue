<template>
    <div class="table-wrapper" :id="id">
        <table class="datatable" :class="tableClasses">
            <thead>
                <tr>
                    <th v-if="lineNumbers" :style="{ width: lineColumnWidth }">
                        <div class="datatable-column datatable-linenumber-column">#</div>
                    </th>
                    <slot></slot>
                </tr>
            </thead>
            <tbody v-for="(rows, group, groupIndex) in groups">
                <tr class="table-group-header" v-if="groupingColumn">
                    <td :colspan="columnSpan">{{ groupingColumn.formatData(group) }}</td>
                </tr>
                <tr v-if="rows.length == 0">
                    <td class="datatable-info-cell" :colspan="columnSpan">No results</td>
                </tr>
                <tr v-for="(row, rowIndex) in rows">
                    <td class="datatable-linenumber-cell" v-if="lineNumbers">
                        <span>{{ groupIndex + rowIndex + 1 }}</span>
                    </td>
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
                    <td v-if="lineNumbers">&nbsp;</td>
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
            },

            lineNumbers : {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                columns: [],
                rowFilter: null,
                groupingColumn: null,
                sortingColumn: null,
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
                if (this.sortingColumn) {
                    rows = utilities.sortBy(rows, this.sortingColumn.id, this.sortDirection);
                }

                if (!this.groupingColumn) {
                    return {
                        data: rows
                    };
                }

                // Group the set regardless to ensure a consistent result for the template
                let groups = utilities.groupBy(rows, this.groupingColumn.id);

                return groups;
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

            sortBy(column) {

                if (column === this.sortingColumn) {
                    this.sortDirection *= -1;
                    return;
                }

                this.sortingColumn = column;
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

    .datatable-linenumber-column,
    .datatable-linenumber-cell {
        text-align: center;
    }

    .datatable-linenumber-column {
        cursor: default !important;
    }

    .datatable-linenumber-cell {
        font-weight: 600; 
        background-color: #FDFDFD !important;
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