<template>
    <toggle :id="id">
        <input type="radio" :id="id" :name="id" :disabled="disabled" :value="val" v-model="checked" @change="onChange">
        <div class="radio"></div>
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

    .radio {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        background-color: $colour-background;
        border: 1px solid $colour-border;
        border-radius: 50%;
        vertical-align: text-bottom;
    }

</style>