<template>
    <toggle :id="id">
        <input type="checkbox" :id="id" :name="id" :disabled="disabled" :value="val" v-model="checked" @change="onChange">
        <div class="checkbox"></div>
        <slot></slot>
    </toggle>
</template>

<script>
    import checkable from "../mixins/checkable.js";
    import Toggle from "./toggle.vue";

    export default {

        mixins: [ checkable ],

        components: {
            toggle: Toggle
        }

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";

    .checkbox {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        background-color: $colour-background;
        border: 1px solid $colour-border;
        border-radius: $border-radius;
        vertical-align: text-bottom;
    }

</style>