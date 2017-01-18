<template>
    <div class="tab-pane">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        props: {

            name: {
                type: String,
                required: true
            },

            label: {
                type: String,
                required: true
            }

        },

        beforeMount() {
            this.$parent.addTab(this);
        },

        beforeDestroy() {
            this.$parent.removeTab(this);
        }

    }
</script>