<template>
    <div class="checkbox">
        <input type="checkbox" v-model="value" :id="id" :name="id" :disabled="disabled">
        <label :for="id"></label>
    </div>
</template>

<script>
    export default {

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
            
        }

    }
</script>