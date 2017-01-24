<template>
    <div id="buttons" class="container">
        <h1>Buttons</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Button Elements</h3>
                <button class="button" @click="buttonClick()">Primary Button</button>
                <button class="button button-green" @click="buttonClick()">Green Button</button>
                <button class="button button-red" @click="buttonClick()">Red Button</button>
                <button class="button button-yellow" @click="buttonClick()">Yellow Button</button>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Anchor Elements</h3>
                <a href="#" class="button" @click.prevent="buttonClick()">Primary Button</a>
                <a href="#" class="button button-green" @click.prevent="buttonClick()">Green Button</a>
                <a href="#" class="button button-red" @click.prevent="buttonClick()">Red Button</a>
                <a href="#" class="button button-yellow" @click.prevent="buttonClick()">Yellow Button</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "buttons",

        methods: {

            buttonClick() {
                alert("Button Clicked!");
            }

        }
    }
</script>