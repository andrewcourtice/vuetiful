import "flex-layout-attribute";
import "../src/assets/styles/site.scss";

import components from "../src/components/components";

export default function Vuetiful(Vue) {
    for (let component in components) {
        let definition = components[component];

        Vue.component(component, definition);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuetiful);
}