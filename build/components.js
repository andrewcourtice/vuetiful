import Vuetiful from "../src/main";

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuetiful);
}

module.exports = Vuetiful;