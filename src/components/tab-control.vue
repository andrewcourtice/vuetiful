<template>
    <div class="tab-control">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        methods: {

            addTabPane(tab) {
                console.log(tab);
            }

        }

    }
</script>