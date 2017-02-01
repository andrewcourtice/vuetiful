<template>
    <table>
        <tr>
            <td :colspan="columnSpan">
                <div>
                    <div class="datatable-group-expander"></div>
                    <span>{{ group.name }}</span>
                    <span class="label datatable-row-count" v-if="group.rows.length > 1">{{ group.rows.length }}</span>
                </div>
            </td>
        </tr>
        <tr v-for="(row, rowIndex) in group.rows">
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
        <tr v-for="group in groups">
            <td>
                <datatable-group>
                    <template></template>></template>
                </datatable-group>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {

        props: {

            group: {
                type: Object,
                required: true
            },

            columns: {
                type: Array,
                required: true
            }

        }

    }
</script>