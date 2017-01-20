<template>
    <div class="toggle">
        <label :for="id">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {

        props: {

            id: {
                type: String,
                required: true
            }

        }

    }
</script>

<style lang="scss">

    .toggle {
        display: inline-block;
        position: relative;
        vertical-align: middle;   
        user-select: none;

        & label {
            display: block;
            cursor: pointer;
        }

        & input {
            display: none;
        }
    }

</style>