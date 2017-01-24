<template>
    <div id="toggles" class="container">
        <h1>Toggles</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Checkboxes</h3>
                <checkbox v-for="item in checkables" :id="'checkbox-' + item.name" :val="item" v-model="checkboxes.selected">{{ item.name }}</checkbox>
                <div>{{ checkboxes.selected }}</div>
                <div>
                    here is a line of text with a <checkbox id="inline" v-model="inline">checkbox</checkbox> in the middle of it.
                </div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Radios</h3>
                <radio v-for="item in checkables" :id="'radio-' + item.name" :val="item" v-model="radios.selected">{{ item.name }}</radio>
                <div>{{ radios.selected }}</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Switches</h3>
                <checkbox v-for="item in checkables" :id="'switch-' + item.name" :val="item" v-model="switches.selected">{{ item.name }}</checkbox>
                <div>{{ switches.selected }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
        name: "toggles",

        data() {
            return {

                checkables: [
                    {
                        name: "Andrew",
                        age: 25
                    },
                    {
                        name: "John",
                        age: 28
                    },
                    {
                        name: "Matthew",
                        age: 21
                    }
                ],

                checkboxes: {
                    selected: []
                },

                radios: {
                    selected: null
                },

                switches: {
                    selected: []
                },

                inline: true
                
            }
        }

    }
</script>