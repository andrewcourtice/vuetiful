<template>
    <div id="contact" class="container">
        <h1>Contact {{ $route.query.name }}</h1>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this);
        }
    }
</script>