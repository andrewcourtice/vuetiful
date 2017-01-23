// Import Vue and Vue plugins
import Vue from "vue";
import VueRouter from "vue-router";

// Import the core styles
import "flex-layout-attribute";
import "./assets/styles/site.scss";

// Import the route directory
import components from "./components/components";
import views from "./views/views";


function registerPlugins() {
    Vue.use(VueRouter);
}

function registerComponents() {
    for (let component in components) {
        let registration = components[component];

        Vue.component(registration.tag, registration.definition);
    }
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
    registerComponents();
    buildRootInstance();
}

bootstrap();