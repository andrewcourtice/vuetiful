<template>
    <div class="panel">
        <div class="panel-header">
            <div layout="row center-justify">
                <span class="panel-title" self="size-x1">{{ title }}</span>
                <div>
                    <slot name="panel-header"></slot>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <slot></slot>
        </div>
        <div class="panel-footer" v-if="$slots.panelFooter">
            <slot name="panel-footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {

        props: {

            title: {
                type: String,
                required: true
            }

        }

    }
</script>

<style lang="scss">
    @import "../../assets/styles/abstract/_variables.scss";

    .panel {
        width: 100%;
        min-height: 150px;
        background-color: $colour-background;
        border: 1px solid $colour-border;
        border-radius: $border-radius;
    }

    .panel-header,
    .panel-body,
    .panel-footer {
        padding: 0.75rem 1rem;
    }

    .panel-header,
    .panel-footer {
        background-color: $colour-background-medium;
    }

    .panel-header {
        border-bottom: 1px solid $colour-border;
    }

    .panel-footer {
        border-top: 1px solid $colour-border;
    }

    .panel-body {

    }

    .panel-title {
        font-weight: 600;
    }

</style>