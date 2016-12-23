<template>
    <div class="table-wrapper">
        <table class="datagrid" :class="{ 'table-striped': striped }">
            <thead>
                <tr>
                    <th v-for="column in columns" :style="{ width: getCellWidth(column) }">
                        <span class="datagrid-column" @click="sortBy(column.key)">{{ column.label || column.key }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-if="processedRows.length > 0" v-for="row in processedRows">
                    <td v-for="column in columns">
                        <span>{{ row[column.key] }}</span>
                    </td>
                </tr>
                <tr v-else="">

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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
                groupingKey: null,
                sortingKey: null,
                sortingDirection: 1
            };
        },

        computed: {

            processedRows() {
                let rows = this.rows;

                if (this.sortingKey) {
                    rows.sort((a, b) => {
                        let valueA = a[this.sortingKey];
                        let valueB = b[this.sortingKey];

                        let outcome = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

                        return outcome * this.sortingDirection;
                    });
                }

                if (this.groupingKey) {

                }

                return rows;
            }

        },

        methods: {

            sortBy(key) {
                if (key === this.sortingKey) {
                    this.sortingDirection *= -1;
                    return;
                }

                this.sortingKey = key;
                this.sortingDirection = 1;
            },

            getCellWidth(column) {
                if (!column.width) {
                    return;
                }

                return column.width + (isNaN(column.width) ? "" : "%");
            }
        
        }

    }
</script>

<style>
    @import "../assets/styles/abstract/_variables.scss";

    th {
        padding: 0;
    }

    .datagrid-column {
        display: block;
        padding: $clearing-medium $clearing-default;
        cursor: pointer;
        user-select: none;
    }

</style>