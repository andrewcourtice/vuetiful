<template>
    <div class="tab-pane">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        name: "tab-pane",

        mounted() {
            this.$parent.addTabPane(this);
        }

    }
</script>