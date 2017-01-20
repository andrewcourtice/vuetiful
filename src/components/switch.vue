<template>
    <div class="switch">
        <input type="checkbox" :id="id" :name="id" :disabled="disabled" v-model="value" @change="onChange">
        <label :for="id"></label>
    </div>
</template>

<script>
    import toggle from "../mixins/toggle.js";

    export default {
        mixins: [ toggle ]
    }
</script>

<style lang="scss">

    .switch {

    }

</style>