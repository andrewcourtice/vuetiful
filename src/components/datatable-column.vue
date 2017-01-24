<template>
    <th :style="{ width: columnWidth }">
        <div class="datatable-column">
            <slot>{{ label || id }}</slot>
        </div>
    </th>
</template>

<script>
    export default {

        props: {

            id: {
                type: String,
                required: true
            },

            label: {
                type: String    
            },

            width: {
                type: String
            },

            formatter: {
                type: Function
            },

            total: {
                type: Boolean,
                default: false
            }

        },

        computed: {

            columnWidth() {
                if (!this.width) {
                    return;
                }

                let width = parseFloat(this.width);

                return width + isNaN(width) ? "" : "%";
            }

        },

        methods: {

            formatData(value) {
                if (!this.formatter) {
                    return value;
                }

                return this.formatter(value);
            }

        },

        created() {
            this.$parent.addColumn({
                id: this.id,
                label: this.label,
                formatter: this.formatter,
                total: this.total,
                formatData: this.formatData
            });
        }

    }
</script>

<style lang="scss">

    .datatable-column {
        display: block;
        padding: 0.75rem 1rem;
        cursor: pointer;
        user-select: none;
    }

</style>