
import componentStore from "../stores/component-store";

export default {

    props: {
        id: {
            type: String,
            required: true
        }
    },

    created() {
        componentStore.register(this.id, this);
    },

    destroyed() {
        componentStore.drop(this.id);
    }

}