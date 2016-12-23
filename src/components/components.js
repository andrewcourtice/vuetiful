import MenuList from "./menu-list.vue";
import Dynamic from "./dynamic";
import DataGrid from "./datagrid.vue";
import DateTimePicker from "./datetime-picker.vue";
import Float from "./float.vue";

export default {
    dynamic: {
        tag: "dynamic",
        definition: Dynamic
    },
    datagrid: {
        tag: "datagrid",
        definition: DataGrid
    },
    dateTimePicker: {
        tag: "datetime-picker",
        definition: DateTimePicker
    },
    float: {
        tag: "float",
        definition: Float
    },
    menuList: {
        tag: "menu-list",
        definition: MenuList
    }
}