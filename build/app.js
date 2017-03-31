// Import Vue and Vue plugins
import Vue from "vue";
import VueRouter from "vue-router";
import Vuetiful from "../src/main";

import views from "../src/views/views";

function registerPlugins() {
    Vue.use(Vuetiful);
    Vue.use(VueRouter);
}

function buildRoutes() {
    let routes = [];

    for (let directoryName in views) {
        let directory = views[directoryName];

        for (let viewName in directory) {
            let view = directory[viewName];

            let path = `/${directoryName}/${viewName}`;

            if (view.params) {
                path += "/:" + view.params.join("/:");
            }

            routes.push({
                path: path,
                component: view.component
            });
        }
    }

    return routes;
}

function buildRootInstance() {
    let routes = buildRoutes();

    let menuItems = [
        {
            name: "Buttons",
            route: "/components/buttons"
        },
        {
            name: "Datatables",
            route: "/components/datatables"
        },
        {
            name: "Modals",
            route: "/components/modals"
        },
        {
            name: "Paginators",
            route: "/components/paginators"
        },
        {
            name: "Panels",
            route: "/components/panels"
        },
        {
            name: "Tab Controls",
            route: "/components/tabcontrols"
        },
        {
            name: "Toggles",
            route: "/components/toggles"
        },
        {
            name: "Typography",
            route: "/components/typography"
        }
    ];

    new Vue({
        el: '#app',
        
        data() {
            return {
                menuItems: menuItems
            }
        },

        router: new VueRouter({
            routes: routes
        })
    });
}

function bootstrap() {
    registerPlugins();
    buildRootInstance();
}

bootstrap();

module.exports = Vuetiful;