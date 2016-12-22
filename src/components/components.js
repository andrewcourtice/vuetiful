import MenuList from "./menu-list.vue";
import Dynamic from "./dynamic";
import DateTimePicker from "./datetime-picker.vue";
import Float from "./float.vue";

export default {
    dynamic: {
        tag: "dynamic",
        definition: Dynamic
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