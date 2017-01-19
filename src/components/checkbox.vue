<template>
    <div class="checkbox">
        <input type="checkbox" v-model="value" :id="id" :name="id" :disabled="disabled">
        <label :for="id"></label>
    </div>
</template>

<script>
    import Toggle from "./toggle.vue";

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

        components: {
            toggle: Toggle
        },

        render(createElement) {
            return createElement("toggle", {
                props: {
                    id: this.id,
                    
                }
            });
        }

    }
</script>