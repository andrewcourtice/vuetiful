<template>
    <div class="toggle checkbox">
        <input type="checkbox" :id="id" :name="id" :disabled="disabled" :value="val" v-model="checked" @change="onChange">
        <label :for="id"></label>
        <slot></slot>
    </div>
</template>

<script>
    import checkable from "../mixins/checkable.js";

    export default {

        mixins: [ checkable ]

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";

    .checkbox {

        & label {
            position: relative;
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.25rem;
            background-color: $colour-background;
            border: 1px solid $colour-border;
            border-radius: $border-radius;
            vertical-align: text-bottom;
            cursor: pointer;
            user-select: none;

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
        }

        & input[type="checkbox"] {

            &:checked {
                
                & + label {
                    background-color: $colour-primary;
                    border-color: $colour-primary;
                }
            }
        }
    }

</style>