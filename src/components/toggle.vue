<template>
    <div class="toggle">
        <input :type="type" v-model="value" :id="id" :name="id" :disabled="disabled">
        <label :for="id"></label>
    </div>
</template>

<script>

    const TOGGLE_TYPES = [
        "checkbox",
        "radio",
        "switch"
    ];

    export default {

        props: {
            
            id: {
                type: String,
                required: true
            },

            type: {
                type: String,
                required: true,
                default: "checkbox",
                validator(value) {
                    return TOGGLE_TYPES.indexOf(value.toLowerCase()) > -1;
                }
            },

            value: {
                required: true
            },

            disabled: {
                type: Boolean,
                default: false
            }
            
        }

    }
</script>

<style lang="scss">

    .toggle {

    }

</style>