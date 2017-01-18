<template>
    <div class="tab-pane">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        mounted() {
            this.$parent.addTabPane(this);
        }

    }
</script>