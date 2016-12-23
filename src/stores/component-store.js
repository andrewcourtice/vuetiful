
class ComponentStore {

    constructor() {
        this.components = {};
    }

    register(id, component) {
        this.components[id] = component;
    }

    get(id) {
        return this.components[id];
    }

    drop(id) {
        delete this.components[id];
    }

}

export default new ComponentStore();