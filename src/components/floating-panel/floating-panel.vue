<template>
    <div class="float">
        <slot name="host"></slot>
        <transition name="float">
            <div class="float-panel" v-show="visible">
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {

            visible: {
                type: Boolean,
                default: false
            },

            position: {
                type: String,
                default: "bottom left"
            },

            showArrow: {
                type: Boolean,
                default: false
            }
            
        }
    }
</script>

<style lang="scss">

    .float {
        display: inline-block;
        position: relative;
    }

    .float-panel {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 250px;
        min-height: 50px;
        margin-top: 5px;
        background-color: #FFFFFF;
        border-radius: 2px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
        z-index: 10;
        transform-origin: top left;
    }

    .float-enter,
    .float-leave-active {
        opacity: 0;
        transform: scale(0, 0);    
    }

    .float-enter-active,
    .float-leave-active {
        transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

</style>