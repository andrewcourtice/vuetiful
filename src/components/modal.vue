<template>

    <div class="modal-shade" layout="row center-center" v-if="showing">
        <div class="modal">
            <div class="modal-header">
                <div layout="row center-justify">
                    <span class="modal-title" self="size-x1">{{ title }}</span>
                    <div>
                        <slot name="modal-header"></slot>
                        <div class="modal-close-button"></div>
                    </div>
                </div>  
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="modal-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        props: {

            title: {
                type: String,
                required: true
            }

        },

        data() {
            return {
                showing: false
            };
        },

        methods: {

            open() {
                this.showing = true;
                this.$emit("open", this);
            },

            close() {
                this.showing = false;
                this.$emit("close", this);
            }

        }

    }
</script>

<style lang="scss">
    @import "../assets/styles/abstract/_variables.scss";

    .modal-shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }

    .modal {
        width: 640px;
    }

</style>