<template>
    <div id="toggles" class="container">
        <h1>Toggles</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Checkboxes</h3>
                <checkbox v-for="item in checkables" :id="'checkbox-' + item.name" :val="item" v-model="checkboxes.selected">{{ item.name }}</checkbox>
                <div>{{ checkboxes.selected }}</div>
            </div>
        </div>
        <div class="grid-row">
            <div class="grid-cell">
                <h3>Radios</h3>
                <radio v-for="radio in checkables" :id="'radio-' + radio.name" :val="radio" v-model="radios.selected">{{ radio.name }}</radio>
                <div>{{ radios.selected }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

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
                }
                
            }
        }

    }
</script>