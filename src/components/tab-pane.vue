<template>
    <div class="tab-pane" v-if="selected">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        props: {

            id: {
                type: String,
                required: true
            },

            label: {
                type: String,
                required: true
            }

        },

        data() {
            return {
                
                proxy: {
                    id: this.id,
                    label: this.label,
                }

            };
        },

        computed: {

            selected() {
                return this.$parent.selectedTab === this.proxy;
            }

        },

        created() {
            let addTab = this.$parent.addTab;

            if (!addTab) {
                console.warn("A tab-pane must be registered in a tab-control.");
                return;
            }

            addTab(this.proxy);
        },

        destroyed() {
            this.$parent.removeTab(this.proxy);
        }

    }
</script>

<style lang="scss">

    .tab-pane {
        min-height: 2rem;
        padding: 1rem;
    }

</style>