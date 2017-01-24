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
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        background-color: $colour-background;
        border: 1px solid $colour-border;
        border-radius: 50%;
        vertical-align: text-bottom;

        &:after {
            position: absolute;
            display: block;
            content: " ";
            width: 0.5rem;
            height: 0.5rem;
            top: 50%;
            left: 50%;
            margin-top: -0.25rem;
            margin-left: -0.25rem;
            background-color: $colour-background;
            border-radius: 50%;
        }
    }

    .toggle {

        &:hover {
            
            & .radio {
                border-color: $colour-primary;

                &:after {
                    background-color: $colour-primary;
                }
            }
        }

        & input[type="radio"] {

            &:checked {
                
                & + .radio {
                    background-color: $colour-primary;
                    border-color: $colour-primary;
                }
            }
        }
    }

</style>