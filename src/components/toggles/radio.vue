<template>
    <div class="radio">
        <input type="radio" :id="id" :name="id" :disabled="disabled" :value="value" v-model="checked">
        <label :for="id"></label>
        <slot></slot>
    </div>
</template>

<script>
    import checkable from "../../mixins/checkable.js";

    export default {

        mixins: [ checkable ]
        
    }
</script>

<style lang="scss">
    @import "../../assets/styles/abstract/_variables.scss";

    .radio {
        display: inline-block;
        margin-right: 1rem;
        vertical-align: baseline;

        & label {
            position: relative;
            display: inline-block; 
            width: 1.25rem;
            height: 1.25rem;
            background-color: $colour-background;
            border: 1px solid $colour-border;
            border-radius: 50%;
            vertical-align: text-bottom;
            cursor: pointer;
            user-select: none;

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

        & input[type="radio"] {
            display: none !important;

            &:checked {
                
                & + label {
                    background-color: $colour-primary;
                    border-color: $colour-primary;
                }
            }

            &:disabled {

                & + label {
                    background-color: #FAFAFA;
                    cursor: not-allowed;
                }
            }
        }
    }

</style>