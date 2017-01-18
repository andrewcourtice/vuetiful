import Dynamic from "./dynamic";
import DataTable from "./datatable.vue";
import DateTimePicker from "./datetime-picker.vue";
import FloatingPanel from "./floating-panel.vue";
import TabControl from "./tab-control.vue";
import TabPane from "./tab-pane.vue";

export default {
    dynamic: {
        tag: "dynamic",
        definition: Dynamic
    },
    datatable: {
        tag: "datatable",
        definition: DataTable
    },
    dateTimePicker: {
        tag: "datetime-picker",
        definition: DateTimePicker
    },
    floatingPanel: {
        tag: "floating-panel",
        definition: FloatingPanel
    },
    tabControl: {
        tag: "tab-control",
        definition: TabControl
    },
    tabPane: {
        tag: "tab-pane",
        definition: TabPane
    }
}