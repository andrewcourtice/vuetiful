<template>
    <div id="modals">
        <h1>Modals</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <button class="button" @click="openModal">Show Modal</button>
                <modal title="Test Modal" ref="testModal">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                    <div slot="modal-footer" layout="row center-right">
                        <button class="button" @click="closeModal">Other button</button>
                        <button class="button button-red" @click="closeModal">Close</button>
                    </div>
                </modal>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "modals",

        methods: {

            openModal() {
                this.$refs.testModal.open();
            },

            closeModal() {
                this.$refs.testModal.close();
            }

        }
    }
</script>