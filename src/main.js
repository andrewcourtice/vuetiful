// Import Vue and Vue plugins
import Vue from "vue";
import VueRouter from "vue-router";

// Import the route directory
import components from "./components/components";
import views from "./views/views";

// Import the core styles
import "./assets/styles/site.scss";

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

    new Vue({
        el: '#app',
        data() {
            return {
                menuItems: [{
                    name: "Home",
                    route: "/home/index"
                }, {
                    name: "About",
                    route: "/home/about"
                }, {
                    name: "Contact",
                    route: {
                        path: "/home/contact",
                        query: {
                            name: "andrew"
                        }
                    }
                }]
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