import "./polyfills";

import "flex-layout-attribute";
import "./assets/styles/site.scss";

import components from "./components/components";
import directives from "./directives/directives";

// Exposed modules
import aggregators from "../src/aggregators/aggregators";
import formatters from "../src/formatters/formatters";
import maps from "../src/maps/maps";

function registerComponents(Vue) {
    for (let component in components) {
        let definition = components[component];

        Vue.component(component, definition);
    }
}

function registerDirectives(Vue) {
    for (let directive in directives) {
        let definition = directives[directive];

        Vue.directive(directive, definition);
    }
}

export default {

    install(Vue) {
        registerComponents(Vue);
        registerDirectives(Vue);
    },

    // Expose to global scope
    aggregators,
    formatters,
    maps

}