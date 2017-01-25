<template>
    <th :style="{ width: columnWidth }" @click="sort">
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
                type: [ Number, String ]
            },

            formatter: {
                type: Function
            },

            total: {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                sortingDirection: 1
            };
        },

        computed: {

            columnWidth() {
                if (!this.width) {
                    return;
                }

                let width = parseFloat(this.width);
                let suffix = isNaN(width) ? "" : "%";

                return width + suffix;
            },

            sorting: {
                get() {
                    return this.$parent.sortingId === this.id;
                },
                set(value) {
                    if (value) {
                        this.$parent.sortingId = this.id;
                    }
                }
            },

            grouping: {
                get() {
                    return this.$parent.groupingId === this.id;
                },
                set(value) {
                    if (value) {
                        this.$parent.groupingId = this.id;
                    }
                }
            }

        },

        methods: {

            sort() {
                if (this.sorting) {
                    this.sortingDirection *= -1;
                    return;
                }

                this.sorting = true;
            },

            group() {
                if (this.grouping) {
                    return;
                }

                this.grouping = true;
            },

            formatData(value) {
                if (!this.formatter) {
                    return value;
                }

                return this.formatter(value);
            }

        },

        created() {
            let addColumn = this.$parent.addColumn;

            if (!addColumn) {
                console.warn("A datatable-column must be registered within a datatable component.");
                return;
            }

            addColumn(this);
        },

        destroyed() {
            this.$parent.removeColumn(this);
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