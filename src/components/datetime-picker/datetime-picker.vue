<template>
    <floating-panel class="date-picker" :visible="visible">
        <input type="text" slot="host" v-model="formattedValue" @focus="show()" readonly>
        <p slot="content" @click="updateValue(new Date())">Hello</p>
    </floating-panel>
</template>

<script>
    import { isValid, format } from "date-fns";

    const EPOCH_MIN = new Date(-8640000000000000);
    const EPOCH_MAX = new Date(8640000000000000);

    export default {
        props: {

            value: {
                required: true
            },

            type: {
                type: String,
                default: "date"
            },

            format: {
                type: String,
                default: "DD-MM-YYYY"
            },

            minDate: {
                type: Date,
                default: () => EPOCH_MIN
            },

            maxDate: {
                type: Date,
                default: () => EPOCH_MAX
            },

            minHour: {
                type: Number,
                default: 0
            },

            maxHour: {
                type: Number,
                default: 23
            },

            minMinute: {
                type: Number,
                default: 0
            },

            maxMinute: {
                type: Number,
                default: 59
            }

        },

        data() {
            return {
                visible: false
            }
        },

        computed: {
            formattedValue() {
                return this.value && isValid(this.value) ? format(this.value, this.format) : null;
            }
        },

        methods: {

            updateValue(value) {
                this.$emit("input", value);                
            },

            show() {
                this.visible = true;

                let listener = (event) => {
                    event.stopPropagation();

                    if (!this.$el.contains(event.target)) {
                        this.visible = false;
                        document.removeEventListener("click", listener);
                    }
                };

                document.addEventListener("click", listener);
            }
        }
    }
</script>