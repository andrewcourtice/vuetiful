<template>
    <div class="datatable-collection">
        <table v-if="groupable" :class="{ 'table-striped': striped }">
            <tr v-for="(data, group, index) in groups">
                <td class="datatable-group" :colspan="columnSpan">
                    <div class="datatable-group-header" layout="row center-justify">
                        <div self="size-x1">
                            <span class="datatable-group-label" :style="indentStyle">{{ groupingColumn.formatData(group) }}</span>
                        </div> 
                        <span class="label label-primary datatable-row-count" v-if="data.length > 1">{{ data.length }}</span>
                    </div>
                    <datatable-collection 
                        :rows="data" 
                        :columns="columns" 
                        :striped="striped"
                        :editable="editable" 
                        :line-numbers="lineNumbers"
                        :aggregated="aggregated"
                        :margin="margin" 
                        :grouping-columns="groupingColumns"
                        :grouping-index="groupingIndex + 1"
                        :collection-index="collectionIndex * index"
                        :optimize="optimize">
                    </datatable-collection>
                </td>
            </tr>
        </table>
        <table v-else class="datatable-resultset" :class="{ 'table-striped': striped }">
            <tr v-if="rows.length < 1">
                <td class="datatable-info-cell" :colspan="columnSpan">No Results</td>
            </tr>
            <tr v-for="(row, index) in rows">
                <td v-if="lineNumbers" class="datatable-cell datatable-linenumber-cell" :style="{ width: margin }">{{ collectionIndex + index + 1 }}</td>
                <td v-if="aggregated" class="datatable-cell datatable-aggregate-cell">&nbsp;</td>
                <datatable-cell v-for="column in columns" :key="column.id" :column="column" :row="row" :editable="editable" :optimize="optimize"></datatable-cell>
            </tr>
        </table>
    </div>
</template>

<script>
    import DatatableCell from "./datatable-cell.js";
    import groupBy from "../../utilities/group-by.js";

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
                default: 0
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
            },

            aggregated: {
                type: Boolean,
                default: false
            },

            margin: {
                type: String,
                default: "1.5em"
            },

            collectionIndex: {
                type: Number,
                default: 0
            },

            optimize: {
                type: Boolean,
                default: false
            }

        },

        computed: {

            groupable() {
                return this.groupingIndex < this.groupingColumns.length;
            },

            groupingColumn() {
                let columnId = this.groupingColumns[this.groupingIndex];
                return this.columns.find(column => column.id === columnId);
            },

            groups() {
                let columnId = this.groupingColumn.id;
                return groupBy(this.rows, row => row[columnId]);
            },

            columnSpan() {
                return this.columns.length + (this.lineNumbers ? 1 : 0);
            },

            indentStyle() {
                let margin = this.groupingIndex * 1.5;

                return { 
                    "margin-left": margin + "rem"
                };
            }

        },

        components: {
            datatableCell: DatatableCell
        }

    }
</script>