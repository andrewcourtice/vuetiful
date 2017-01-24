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
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        background-color: $colour-background;
        border: 1px solid $colour-border;
        border-radius: $border-radius;
        vertical-align: text-bottom;

        &:after {
            position: absolute;
            display: block;
            content: " ";
            width: 0.375rem;
            height: 0.75rem;
            top: 0.125rem;
            left: 0.385rem;
            border-right: 0.2rem solid white;
            border-bottom: 0.2rem solid white;
            transform: rotate(45deg);
        }

        &:hover {
            border-color: $colour-primary;
        }
    }

    .toggle {

        & input[type="checkbox"] {

            &:checked {
                
                & + .checkbox {
                    background-color: $colour-primary;
                    border-color: $colour-primary;
                }
            }
        }
    }

</style>