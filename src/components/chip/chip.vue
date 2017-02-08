<template>
    <div class="chip">
        <div layout="row stretch-justify">
            <div class="chip-body">
                <slot></slot>
            </div>
            <div class="chip-footer" layout="row center-center" v-if="removable">
                <div class="chip-close-button" @click="remove" title="Click to remove"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        props: {

            removable: {
                type: Boolean,
                default: true
            }

        },

        methods: {

            remove() {
                this.$emit("remove", this);
            }

        }

    }
</script>

<style lang="scss">
    @import "../../assets/styles/abstract/_variables.scss";

    .chip {
        display: inline-block;
        min-width: 1.5em * $typography-ratio;
        text-align: left;
        color: $colour-font;
        background-color: $colour-background-medium;
        border-radius: $border-radius;
    }

    .chip-body,
    .chip-footer {
        padding: 0.25rem 0.5rem;
    }

    .chip-footer {
        background-color: darken($colour-background-medium, 2.5%);
    }

    .chip-close-button {
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: $border-radius;
        cursor: pointer;

        &:hover {
            background-color: darken($colour-background-medium, $colour-variation);
        }

        &:before,
        &:after {
            display: block;
            position: absolute;
            content: " ";
            top: 50%;
            left: 10%;
            width: 80%;
            height: 2px;
            margin-top: -1px;
            background-color: currentColor;
            transform-origin: center center;
        }

        &:before {
            transform: rotate(-45deg);
        }

        &:after {
            transform: rotate(45deg);
        }
    }

</style>