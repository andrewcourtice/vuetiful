<template>
    <div class="tab-control">
        <div class="tabs-list" layout="row center-justify">
            <div self="size-x1" layout="row center-left">
                <div v-for="tab in tabs" class="tab-item" :class="{ active: tab === selectedTab }" @click="selectTab(tab)">
                    <slot :name="tab.id" :value="tab">
                        <span>{{ tab.label }}</span>
                    </slot>
                </div>
            </div>
            <div>
                <slot name="tabs-extra"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                tabs: [],
                selectedTab: null
            };
        },

        methods: {

            addTab(tab) {
                this.tabs.push(tab);
            },

            removeTab(tab) {
                let index = this.tabs.indexOf(tab);
                this.tabs.splice(index, 1);
            },

            selectTab(tab) {
                this.selectedTab = tab;
                console.log(tab);
            }

        },

        mounted() {
            if (this.tabs.length > 0) {
                this.selectedTab = this.tabs[0];
            }
        }

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";
    @import "../assets/styles/abstract/_functions.scss";

    .tab-control {
        display: block;
        border: 1px solid $colour-border;
        border-radius: $border-radius;
    }

    .tabs-list {
        background-color: #FAFAFA;
        border-bottom: 1px solid $colour-border;
    }

    .tab-item {
        position: relative;
        padding: 0.75rem 1rem;
        font-weight: 600;
        border-right: 1px solid $colour-border;
        cursor: pointer;

        &:after {
            position: absolute;
            display: none;
            content: " ";
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $colour-background;
        }

        &.active {
            background-color: $colour-background;

            &:after {
                display: block;
            }
        }
    }

</style>