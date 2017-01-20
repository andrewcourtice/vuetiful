<template>
    <toggle :id="id">
        <input type="checkbox" :id="id" :name="id" :disabled="disabled" :value="val" v-model="checked" @change="onChange">
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

    .switch {
        
    }

</style>