<template>
    <div class="table-wrapper" :id="id">
        <table class="datatable" :class="{ 'table-striped': striped }">
            <thead>
                <tr>
                    <th v-for="column in columns" :style="{ width: getCellWidth(column) }">
                        <span class="datatable-column" @click="groupBy(column)">{{ column.label || column.key }}</span>
                    </th>
                </tr>
            </thead>
            <tbody v-for="(rows, group) in groups">
                <tr class="table-group-header" v-if="groupingColumn">
                    <td :colspan="columnSpan">{{ formatData(groupingColumn, group) }}</td>
                </tr>
                <tr v-for="row in rows">
                    <td v-for="column in columns">
                        <slot :name="column.key" :row="row" :column="column" :value="row[column.key]">
                            <input type="text" v-if="editable" v-model="row[column.key]">
                            <span v-else>{{ formatData(column, row[column.key]) }}</span>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Vue from "vue";
    import registerable from "../mixins/registerable.js";
    import { sortBy, groupBy } from "../services/utilities.js";

    export default {

        props: {

            striped: {
                type: Boolean,
                default: true
            },

            columns: {
                type: Array,
                required: true
            },

            rows: {
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
                groupingColumn: null,
                sortKey: null,
                sortDirection: 1
            };
        },

        computed: {

            groups() {

                if (this.sortKey) {
                    sortBy(this.rows, this.sortKey, this.sortDirection);
                }

                let groupingKey = this.groupingColumn ? this.groupingColumn.key : null;
                let groups = groupBy(this.rows, groupingKey);

                return groups;
            },

            columnSpan() {
                return this.columns.length;
            }

        },

        methods: {

            sortBy(key) {
                if (key === this.sortKey) {
                    this.sortDirection *= -1;
                    return;
                }

                this.sortKey = key;
                this.sortDirection = 1;
            },

            groupBy(column) {
                this.groupingColumn = column;
            },

            getCellWidth(column) {
                if (!column.width) {
                    return;
                }

                return column.width + (isNaN(column.width) ? "" : "%");
            },

            formatData(column, value) {
                let formatter = column.formatter;

                if (!formatter) {
                    return value;
                }

                if (typeof formatter === "function") {
                    return formatter(value);
                }

                let filter = Vue.filter(formatter.name);
                let args = [value, ...formatter.args];

                return filter.apply(this, args);
            }
        
        },

        mixins: [ registerable ]

    }
</script>

<style>
    @import "../assets/styles/abstract/_variables.scss";

    th {
        padding: 0;
    }

    .datatable-column {
        display: block;
        padding: $clearing-medium $clearing-default;
        cursor: pointer;
        user-select: none;
    }

</style>