<template>
    <div id="index" class="container">
        <input type="text" v-model="name">
        <h1>Hello {{ name }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                name: ''
            }
        }
    }
</script>