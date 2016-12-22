<template>
    <div id="contact" class="container">
        <h1>Contact {{ $route.query.name }}</h1>
        <datetime-picker v-model="date" format="DD MMM YYYY h:mm:ss a"></datetime-picker>
        <div>{{ date }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: null
            }
        },
        mounted() {
            setInterval(() => {
                this.date = new Date();
            }, 1000);
        }
    }
</script>