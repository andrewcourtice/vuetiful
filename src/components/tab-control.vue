<template>
    <div class="tab-control">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        name: "tab-control",

        methods: {

            addTabPane(tab) {
                console.log(tab);
            }

        }

    }
</script>