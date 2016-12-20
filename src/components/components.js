import MenuList from "./menu-list.vue";
import Dynamic from "./dynamic";
import RawContent from "./raw-content.vue";

export default {
    dynamic: {
        tag: "dynamic",
        definition: Dynamic
    },
    rawContent: {
        tag: "raw-content",
        definition: RawContent
    },
    menuList: {
        tag: "menu-list",
        definition: MenuList
    }
}