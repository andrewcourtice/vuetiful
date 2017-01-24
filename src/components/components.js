
import Checkbox from "./checkbox.vue";
import DataTable from "./datatable.vue";
import DateTimePicker from "./datetime-picker.vue";
import Dynamic from "./dynamic";
import FloatingPanel from "./floating-panel.vue";
import Radio from "./radio.vue";
//import Switch from "./switch.vue";
import TabControl from "./tab-control.vue";
import TabPane from "./tab-pane.vue";

export default {
    checkbox: {
        tag: "checkbox",
        definition: Checkbox
    },
    datatable: {
        tag: "datatable",
        definition: DataTable
    },
    dateTimePicker: {
        tag: "datetime-picker",
        definition: DateTimePicker
    },
    dynamic: {
        tag: "dynamic",
        definition: Dynamic
    },
    floatingPanel: {
        tag: "floating-panel",
        definition: FloatingPanel
    },
    radio: {
        tag: "radio",
        definition: Radio
    },
    /*switch: {
        tag: "switch",
        definition: Switch
    },*/
    tabControl: {
        tag: "tab-control",
        definition: TabControl
    },
    tabPane: {
        tag: "tab-pane",
        definition: TabPane
    }
}