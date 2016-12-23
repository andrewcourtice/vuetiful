<template>
    <div class="table-wrapper">
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
                        <span>{{ formatData(column, row[column.key]) }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Vue from "vue";
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
                let filter = column.filter;

                if (!filter) {
                    return value;
                }

                if (typeof filter === "function") {
                    return filter(value);
                }

                let method = Vue.filter(filter.name);
                let args = [value, ...filter.args];

                return method.apply(this, args);
            }
        
        }

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