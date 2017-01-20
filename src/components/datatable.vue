<template>
    <div class="table-wrapper" :id="id">
        <table class="datatable" :class="tableClasses">
            <thead>
                <tr>
                    <th v-for="column in columns" :style="{ width: getCellWidth(column) }">
                        <span class="datatable-column" @click="sortBy(column)">{{ column.label || column.id }}</span>
                    </th>
                </tr>
            </thead>
            <tbody v-for="(rows, group) in groups">
                <tr class="table-group-header" v-if="groupingColumn">
                    <td :colspan="columnSpan">{{ formatData(groupingColumn, group) }}</td>
                </tr>
                <tr v-if="rows.length == 0">
                    <td :colspan="columnSpan">No results</td>
                </tr>
                <tr v-for="row in rows">
                    <td v-for="column in columns" :class="cellClasses">
                        <slot :name="column.id" :row="row" :column="column" :value="row[column.id]">
                            <input type="text" v-model="row[column.id]" v-if="editable">
                            <span v-else>{{ formatData(column, row[column.id]) }}</span>
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

                let rows = this.rows;

                if (this.sortId) {
                    rows = utilities.sortBy(rows, this.sortId, this.sortDirection);
                }

                let groupingId = this.groupingColumn ? this.groupingColumn.id : null;
                let groups = utilities.groupBy(rows, groupingId);

                return groups;
            },

            columnSpan() {
                return this.columns.length;
            }

        },

        methods: {

            sortBy(column) {
                let id = column.id;

                if (id === this.sortId) {
                    this.sortDirection *= -1;
                    return;
                }

                this.sortId = id;
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

        mixins: [registerable]

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";
    @import "../assets/styles/abstract/_functions.scss";

    .datatable {

        & th {
            padding: 0;
        }
    }

    .datatable-column {
        display: block;
        padding: rem-size(1.5) rem-size(2);
        cursor: pointer;
        user-select: none;
    }

    .datatable-cell-edit {
        padding: 0;
        overflow: visible;
        
        & input,
        & select {
            display: block;
            width: 100%;
            height: auto;
            padding: rem-size(1) rem-size(2);
            border: none;

            &:focus,
            &:active {
                outline: 1px solid $colour-primary;
            }
        }
    }

</style>