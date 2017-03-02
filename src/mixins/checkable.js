
export default {

    model: {
        prop: "source",
        event: "change"
    },

    props: {

        id: {
            type: String,
            required: true
        },

        source: {
            required: true
        },

        value: {
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
                return this.source;
            },
            set(value) {
                this.proxy = value;
                this.$emit("change", this.proxy);
            }
        }

    }
}