import MenuList from "./menu-list.vue";
import Dynamic from "./dynamic";
import DataTable from "./datatable.vue";
import DateTimePicker from "./datetime-picker.vue";
import FloatingPanel from "./floating-panel.vue";

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
    menuList: {
        tag: "menu-list",
        definition: MenuList
    }
}