<template>
    <div class="datatable-collection">
        <table v-if="groupable" :class="{ 'table-striped': striped }">
            <tr v-for="(data, group, index) in groups">
                <td class="datatable-group" :colspan="columnSpan">
                    <div class="datatable-group-header">
                        <div class="datatable-row-indent" v-for="num in groupingIndex - 1"></div>
                        <span>{{ groupingColumn.formatData(group) }}</span>
                        <span class="label datatable-row-count" v-if="data.length > 1">{{ data.length }}</span>
                    </div>
                    <datatable-collection 
                        :rows="data" 
                        :columns="columns" 
                        :striped="striped"
                        :editable="editable" 
                        :line-numbers="lineNumbers" 
                        :grouping-columns="groupingColumns"
                        :grouping-index="groupingIndex + 1">
                    </datatable-collection>
                </td>
            </tr>
        </table>
        <table v-else :class="{ 'table-striped': striped }">
            <tr v-for="(row, index) in rows">
                <datatable-cell v-for="column in columns" :column="column" :row="row" :editable="editable"></datatable-cell>
            </tr>
        </table>
    </div>
</template>

<script>
    import DatatableCell from "./datatable-cell.js";
    import * as utilities from "../../services/utilities.js";

    export default {
        name: "datatable-collection",

        props: {

            rows: {
                type: Array,
                required: true
            },

            columns: {
                type: Array,
                required: true
            },

            groupingColumns: {
                type: Array
            },

            groupingIndex: {
                type: Number,
                default: 1
            },

            striped: {
                type: Boolean,
                default: true
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

        computed: {

            groupable() {
                return this.groupingIndex <= this.groupingColumns.length;
            },

            groupingColumn() {
                let columnId = this.groupingColumns[this.groupingIndex - 1];
                return this.columns.find(column => column.id === columnId);
            },

            groups() {
                return utilities.groupBy(this.rows, this.groupingColumn.id);
            },

            columnSpan() {
                return this.columns.length + (this.lineNumbers ? 1 : 0);
            }

        },

        components: {
            datatableCell: DatatableCell
        }

    }
</script>

<style lang="scss">
    @import "../../assets/styles/abstract/_variables.scss";

    .datatable-collection {

        & .datatable-group {
            border-bottom: 1px solid $colour-border;
        }
    }

    .datatable-row-indent {
        display: inline-block;
        width: 1rem;
        height: 1em;
    }

    .datatable-group {
        padding: 0;
    }

    .datatable-group-header,
    .datatable-cell {
        padding: 0.5rem 1rem;
        border-bottom: 1px solid $colour-border;
    }

    .datatable-group-header {
        background-color: $colour-background-medium;
    }

</style>