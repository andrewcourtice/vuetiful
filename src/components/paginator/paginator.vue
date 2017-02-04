<template>
    <div class="paginator">
        <div class="paginator-body">
            <slot :data="page" :page-number="pageNumber"></slot>
        </div>
        <div class="paginator-footer" layout="row center-justify">
            <div class="paginator-page-previous">Prev</div>
            <div class="paginator-page-numbers">
                <div class="paginator-page-number" v-for="num in pageCount">
                    <span class="label">{{ num }}</span>
                </div>
            </div>
            <div class="paginator-page-next">Next</div>
        </div>
    </div>
</template>

<script>
    import { filterBy } from "../../utilities/filter-by.js";

    export default {

        props: {

            source: {
                type: Array,
                default: () => []
            },

            pageSize: {
                type: Number,
                default: 25
            },

            filter: {
                type: String
            }

        },

        data() {
            return {
                pageNumber: 1
            };
        },

        computed: {

            pages() {
                let data = this.source;

                if (this.filter) {
                    data = filterBy(data, this.filter);
                }

                let pages = [];
                let index = 0;

                while ((index + this.pageSize) <= data.length) {
                    let page = data.slice(index, this.pageSize);
                    pages.push(page);
                }

                return pages;
            },

            page() {
                return this.pages[this.pageNumber];
            }

        }

    }
</script>