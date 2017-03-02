<template>
    <div id="toggles">
        <h1>Toggles</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Checkboxes</h3>
                <checkbox v-for="item in checkables" :key="item.name" :id="'checkbox-' + item.name" :value="item" v-model="checkboxes.selected">{{ item.name }}</checkbox>
                <div>{{ checkboxes.selected }}</div>
                <div>
                    here is a line of text with a <checkbox id="inline" v-model="inline">checkbox</checkbox> in the middle of it.
                </div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Radios</h3>
                <radio v-for="item in checkables" :key="item.name" :id="'radio-' + item.name" :value="item" v-model="radios.selected">{{ item.name }}</radio>
                <div>{{ radios.selected }}</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Toggles</h3>
                <toggle v-for="item in checkables" :key="item.name" :id="'switch-' + item.name" :value="item" v-model="toggles.selected">{{ item.name }}</toggle>
                <div>{{ toggles.selected }}</div>
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

                toggles: {
                    selected: []
                },

                inline: true
                
            }
        }

    }
</script>