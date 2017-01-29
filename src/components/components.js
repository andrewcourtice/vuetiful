
import Checkbox from "./checkbox.vue";
import DataTable from "./datatable.vue";
import DataTableColumn from "./datatable-column.vue";
import DateTimePicker from "./datetime-picker.vue";
import Dynamic from "./dynamic";
import FloatingPanel from "./floating-panel.vue";
import Modal from "./modal.vue";
import Radio from "./radio.vue";
import TabControl from "./tab-control.vue";
import TabPane from "./tab-pane.vue";
import Toggle from "./toggle.vue";

export default {
    checkbox: {
        tag: "checkbox",
        definition: Checkbox
    },
    datatable: {
        tag: "datatable",
        definition: DataTable
    },
    datatableColumn: {
        tag: "datatable-column",
        definition: DataTableColumn
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
    modal: {
        tag: "modal",
        definition: Modal
    },
    radio: {
        tag: "radio",
        definition: Radio
    },
    toggle: {
        tag: "toggle",
        definition: Toggle
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