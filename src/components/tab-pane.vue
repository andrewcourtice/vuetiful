<template>
    <div class="tab-pane">
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

        }

    }
</script>

<style lang="scss">

    .tab-pane {
        min-height: 6rem;
        padding: 1rem;
    }

</style>