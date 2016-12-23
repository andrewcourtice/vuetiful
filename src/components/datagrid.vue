<template>
    <div class="table-wrapper">
        <table>
        
        </table>
    </div>
</template>

<script>
    import { clone } from "lodash";

    export default {

        props: {

            striped: {
                type: Boolean,
                default: true
            },

            realtime: {
                type: Boolean,
                default: false
            }

        },

        data() {

        }

        created() {

            if (this.realtime) {
                return;
            }

            this.data
        }

    }
</script>

<style>
    @import "../assets/styles/abstract/_variables.scss";


</style>