import Vue from "vue";

import "flex-layout-attribute";
import "../src/assets/styles/site.scss";

import components from "../src/components/components";

function registerComponents() {
    for (let component in components) {
        let registration = components[component];

        Vue.component(registration.tag, registration.definition);
    }
}

registerComponents();