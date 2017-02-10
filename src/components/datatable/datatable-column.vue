<template>
    <th :style="columnStyles" title="Click to sort. Drag to center to group." @click="sort" v-drag:start="dragStart">
        <div class="datatable-column" layout="row center-justify">
            <div>
                <slot>{{ label || id }}</slot>
            </div>
            <div class="datatable-sort-arrow" :class="sortArrowClass" v-show="sorting"></div>
        </div>
    </th>
</template>

<script>

    const sortClassMap = {
        "1": "asc",
        "-1": "desc"
    };

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
            },

            sortable: {
                type: Boolean,
                default: true
            },

            groupable: {
                type: Boolean,
                default: true
            }

        },

        data() {
            return {
                sortingDirection: 1
            };
        },

        computed: {

            sorting: {
                get() {
                    return (this.$parent.sortingId === this.id && this.sortable);
                },
                set(value) {
                    if (value && this.sortable) {
                        this.$parent.sortingId = this.id;
                    }
                }
            },

            grouping: {
                get() {
                    return (this.$parent.groupingColumnIds.indexOf(this.id) > -1);
                }
            },

            columnWidth() {
                if (!this.width) {
                    return;
                }

                let suffix = isNaN(this.width) ? "" : "%";
                
                return this.width + suffix;
            },

            columnStyles() {
                return {
                    width: this.columnWidth
                };
            },

            sortArrowClass() {
                let direction = sortClassMap[this.sortingDirection];
                return "datatable-sort-arrow-" + direction;
            },

            template() {
                return this.$parent.$scopedSlots[this.id];
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

            formatData(value) {
                if (!this.formatter) {
                    return value;
                }

                return this.formatter(value);
            },

            dragStart(event) {
                event.stopPropagation();
                event.dataTransfer.dropEffect = "copy";
                event.dataTransfer.setData("text", this.id);
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
    $sort-arrow-size: 0.375rem;
    $sort-arrow-offset: $sort-arrow-size / 2;

    .datatable-column {
        padding: 0.75rem 1rem;
        cursor: pointer;
        user-select: none;
    }

    .datatable-sort-arrow {
        width: 0;
        height: 0;
        border: $sort-arrow-size solid transparent;
    }

    .datatable-sort-arrow-asc {
        border-bottom-color: currentColor;
        transform: translate(0, -$sort-arrow-offset);
    }

    .datatable-sort-arrow-desc {
        border-top-color: currentColor;
        transform: translate(0, $sort-arrow-offset);
    }

</style>