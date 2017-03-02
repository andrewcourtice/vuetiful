<template>
    <div class="toggle">
        <input type="checkbox" :id="id" :name="id" :disabled="disabled" :value="value" v-model="checked">
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

    .toggle {
        display: inline-block;
        margin-right: 1rem;
        vertical-align: baseline;

        & label {
            position: relative;
            display: inline-block; 
            width: 2.15rem;
            height: 1.25rem;
            background-color: $colour-background;
            border: 1px solid $colour-border;
            border-radius: 0.625rem;
            vertical-align: text-bottom;
            cursor: pointer;
            user-select: none;

            &:after {
                position: absolute;
                display: block;
                content: " ";
                width: 0.8rem;
                height: 0.8rem;
                top: 50%;
                left: 0.25rem;
                
                background-color: $colour-border;
                border-radius: 50%;
                transform: translate(0, -50%);
                transition: transform 150ms ease-out;
            }
        }

        & input[type="checkbox"] {
            display: none !important;

            &:checked {
                
                & + label {
                    background-color: $colour-primary;
                    border-color: $colour-primary;

                    &:after {
                        background-color: $colour-background;
                        transform: translate(0.75rem, -50%);
                    }
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