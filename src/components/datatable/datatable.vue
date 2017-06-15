<template>
    <div class="datatable table-wrapper" :class="tableClasses">
        <table>
            <thead class="datatable-columns">
                <tr>
                    <th v-if="lineNumbers" :style="{ width: lineColumnWidth }">
                        <div class="datatable-column datatable-linenumber-column">#</div>
                    </th>
                    <th v-if="aggregated">
                        <div class="datatable-column datatable-aggregate-column">Aggregate</div>
                    </th>
                    <slot></slot>
                </tr>
            </thead>
            <tbody class="datatable-groups" v-if="groupingColumnIds.length > 0">
                <tr>
                    <td class="datatable-groups-header" :colspan="columnSpan">
                        <chip class="datatable-group-chip" v-for="(column, index) in groupingColumns" :key="column.id" @remove="degroupColumn(column)">
                            <div>
                                <small>
                                    <strong>{{ index == 0 ? "Grouping By:" : "Then:" }}</strong>
                                </small>
                            </div>
                            <div>{{ column.label }}</div>
                        </chip>
                    </td>
                </tr>
            </tbody>
            <tbody class="datatable-collections" v-drag:enter="dragEnter" v-drag:leave="dragLeave" v-drag:over="dragOver" v-drag:drop="dragDrop">
                <tr>
                    <td class="datatable-group" :colspan="columnSpan">
                        <datatable-collection 
                            :rows="rows" 
                            :columns="columns" 
                            :striped="striped"
                            :editable="editable"
                            :line-numbers="lineNumbers"
                            :aggregated="aggregated"
                            :grouping-columns="groupingColumnIds"
                            :margin="lineColumnWidth"
                            :message="message">
                        </datatable-collection>
                    </td>
                </tr>
            </tbody>
            <tfoot class="datatable-aggregators" v-if="aggregated">
                <tr>
                    <td class="datatable-info-cell" :colspan="columnSpan">&nbsp;</td>
                </tr>
                <tr v-for="(aggregator, index) in aggregators" :key="aggregator.label">
                    <td v-if="lineNumbers" class="datatable-linenumber-cell">{{ index + 1 }}</td>
                    <td v-if="aggregated" class="datatable-aggregate-cell">{{ aggregator.label }}</td>
                    <td v-for="column in columns" :style="column.columnStyles">{{ aggregate(column, aggregator) }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="datatable-options" layout="row center-justify" v-if="filterable">
            <input type="text" placeholder="Filter this dataset. Press enter to search..." v-model.lazy="filter" self="size-x1" v-if="optimize">
            <input type="text" placeholder="Filter this dataset..." v-model="filter" self="size-x1" v-else>
        </div>
    </div>
</template>

<script>
    import DatatableCollection from "./datatable-collection.vue"; 
    import filterBy from "../../utilities/filter-by.js";
    import sortBy from "../../utilities/sort-by.js";
    import { isCollection } from "../../utilities/base/type-validator.js";

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

            filterable: {
                type: Boolean,
                default: true
            },

            lineNumbers: {
                type: Boolean,
                default: false
            },

            threshold: {
                type: Number,
                default: 50
            },

            message: {
                type: String,
                default: "No results"
            }

        },

        data() {
            return {
                columns: [],
                filter: null,
                sortingId: null,
                groupingColumnIds: [],
                groupingDropzoneActive: false
            };
        },

        computed: {

            sortingColumn() {
                return this.columns.find(column => column.id === this.sortingId);
            },

            groupingColumns() {
                return this.groupingColumnIds.map(columnId => {
                    return this.columns.find(column => column.id === columnId);
                });
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
                if (this.filter) {
                    rows = filterBy(rows, this.filter);
                }

                // Sort the filtered set
                if (this.sortingColumn) {
                    rows = sortBy(rows, row => row[this.sortingColumn.id], this.sortingColumn.sortingDirection);
                }

                return rows;
            },

            columnSpan() {
                let columnSpan = this.columns.length;

                if (this.lineNumbers) {
                    columnSpan++
                }

                if (this.aggregated) {
                    columnSpan ++
                }

                return columnSpan;
            },

            lineColumnWidth() {
                let count = this.source.length;
                return count.toString().length + 2 + "em";
            },

            aggregators() {
                let aggregators = [];

                for (let column of this.columns) {
                    if (!column.aggregators) {
                        continue;
                    }

                    aggregators = aggregators.concat(column.aggregators);
                }
                
                return aggregators.filter((item, index, arr) => {
                    return index === arr.indexOf(item);
                });
            },

            aggregated() {
                return this.aggregators && this.aggregators.length > 0;
            },

            optimize() {
                return this.source.length >= this.threshold;
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

            groupColumn(column) {
                this.groupingColumnIds.push(column.id);
            },

            degroupColumn(column) {
                let index = this.groupingColumnIds.indexOf(column.id);
                this.groupingColumnIds.splice(index, 1);
            },

            aggregate(column, aggregator) {
                const noResult = " ";

                if (!column.aggregators || column.aggregators.indexOf(aggregator) === -1) {
                    return noResult;
                }

                let result = aggregator.callback.call(column, this.rows, row => row[column.id]);
                
                if (!result || isCollection(result)) {
                    return noResult;
                }

                return aggregator.format ? column.formatData(result) : result;
            },

            dragDrop(event) {
                event.preventDefault();

                let columnId = event.dataTransfer.getData("text");

                let column = this.groupableColumns.find(item => {
                    return item.id === columnId;
                });

                if (column && !column.grouping) {
                    this.groupColumn(column);
                }
            },

            dragOver(event) {
                event.preventDefault();
            },

            dragEnter(event) {
                event.preventDefault();
                this.groupingDropzoneActive = true;
            },

            dragLeave(event) {
                event.preventDefault();
                this.groupingDropzoneActive = false;
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

    .datatable-linenumber-cell,
    .datatable-aggregate-cell {
        font-weight: 600; 
        background-color: $colour-background-medium !important;
        border-right-color: $colour-border;
    }

    .datatable-group-chip {
        margin-right: 0.5rem;
    }

    .datatable-collection {

        & .datatable-collection {

            & .datatable-resultset {
                border-top: 1px solid $colour-border;
            }
        }
    }

    .datatable-group {
        padding: 0;
        background-color: $colour-background;
        border-bottom: 1px solid $colour-border;
    }

    .datatable-groups-header {
        border-bottom: 1px solid $colour-border;
    }

    .datatable-group-header {
        padding: 0.5rem 1rem;
        background-color: $colour-background-medium;
    }

    .datatable-grouping-over {
        box-shadow: 0 0 0 2px $colour-primary;
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

    .datatable-aggregators {

        & .datatable-info-cell  {
            border-bottom: 1px solid $colour-border;
        }
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
