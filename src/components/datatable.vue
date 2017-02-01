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
            <tbody v-for="(rows, group, groupIndex) in groups">
                <tr v-if="groupingColumn">
                    <td class="datatable-group-cell" :colspan="columnSpan">
                        <div layout="row center-justify">
                            <span>{{ groupingColumn.formatData(group) }}</span>
                            <span class="label datatable-row-count" @click="setFilter(group)" v-if="rows.length > 1">{{ rows.length }}</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="rows.length == 0">
                    <td class="datatable-info-cell" :colspan="columnSpan">No results</td>
                </tr>
                <tr v-for="(row, rowIndex) in rows">
                    <td class="datatable-linenumber-cell" v-if="lineNumbers">
                        <span>{{ groupIndex + rowIndex + 1 }}</span>
                    </td>
                    <td v-for="column in columns" class="datatable-cell">
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
        <div class="datatable-options" layout="row center-justify">
            <select v-model="groupingId">
                <option :value="null">No grouping</option>
                <option v-for="column in groupableColumns" :value="column.id">{{ column.label }}</option>
            </select>
            <input type="text" placeholder="Filter this dataset" v-model="rowFilter" self="size-x1">
        </div>
    </div>
</template>

<script>
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

            lineNumbers: {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                columns: [],
                rowFilter: null,
                groupingId: null,
                sortingId: null
            };
        },

        computed: {

            groupingColumn() {
                return this.columns.find(column => column.id === this.groupingId);
            },

            sortingColumn() {
                return this.columns.find(column => column.id === this.sortingId);
            },

            tableClasses() {
                return {
                    "datatable-editable": this.editable,
                    "table-fixed": this.fixed,
                    "table-striped": this.striped
                };
            },

            groupableColumns() {
                return this.columns.filter(column => column.groupable);
            },

            groups() {

                let rows = this.source;

                // Filter the rows first to reduce the set (if a filter is supplied) we need to sort
                if (this.rowFilter) {
                    rows = utilities.filterBy(rows, this.rowFilter);
                }

                // Sort the filtered set
                if (this.sortingColumn) {
                    rows = utilities.sortBy(rows, this.sortingColumn.id, this.sortingColumn.sortingDirection);
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

        }

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
        background-color: $colour-background-medium !important;
        border-right-color: $colour-border;
    }

    .datatable-group-cell,
    .datatable-info-cell {
        background-color: $colour-background-medium !important;
    }

    .datatable-group-cell {
        font-weight: 600;
    }

    .datatable-info-cell {
        font-weight: 600;
        text-align: center;
    }
    
    .datatable-row-count {
        cursor: pointer;
    }

    .datatable-options {
        padding: 0.75rem 1rem;
        background-color: $colour-background-medium;
        border-top: 1px solid $colour-border;
    }

    .datatable-editable {

        & .datatable-cell {
            position: relative;
            padding: 0;
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