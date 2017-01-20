
export default {
    functional: true,
    
    props: {

        id: {
            type: String,
            required: true
        },

        value: {
            required: true
        },

        disabled: {
            type: Boolean,
            default: false
        }

    },

    methods: {

        onChange(event) {
            this.$emit("input", event.target.value);
        }

    }
}