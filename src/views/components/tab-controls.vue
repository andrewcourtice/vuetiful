<template>
    <div id="tab-controls" class="container">
        <h1>Tab Controls</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <tab-control>
                    <template slot="tab-pane-2" scope="tab">
                        <p>{{ tab.value.name }}</p>
                    </template>
                    <tab-pane name="tab-pane-1" label="Tab Pane 1"></tab-pane>
                    <tab-pane name="tab-pane-2" label="Tab Pane 2"></tab-pane>
                </tab-control>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>