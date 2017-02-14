
export default {

    props: {

        id: {
            type: String,
            required: true
        },

        value: {
            required: true
        },

        val: {
            required: false
        },

        disabled: {
            type: Boolean,
            default: false
        }

    },

    data() {
        return {
            proxy: false
        };
    },

    computed: {

        checked: {
            get() {
                return this.value
            },
            set(value) {
                this.proxy = value;
                this.$emit("input", this.proxy);
            }
        }

    }
}