<template>
    <div id="tab-controls">
        <h1>Tab Controls</h1>
        <div class="grid-row">
            <div class="grid-cell">
                <tab-control>
                    <template slot="tabs-extra">
                        <span class="label">Extra Content</span>
                    </template>
                    <template slot="tab-pane-2" scope="tab">
                        <span>{{ tab.value.id }}</span>
                    </template>
                    <tab-pane id="tab-pane-1" label="Tab Pane 1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </tab-pane>
                    <tab-pane id="tab-pane-2" label="Tab Pane 2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </tab-pane>
                    <tab-pane id="tab-pane-3" label="Tab Pane 3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </tab-pane>
                </tab-control>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "tab-controls",

    }
</script>