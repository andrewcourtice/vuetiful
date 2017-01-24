import Vue from "vue";

// Here we can just wrap Vue's built-in pub-sub system
// Saves me from writing my own or importing another dependency :)

export class EventEmitter {

    constructor() {
        this.emitter = new Vue();
    }

    emit(event, ...args) {
        this.emitter.$emit.apply(this.emitter, event, args);
    } 

    on(event, callback) {
        this.emitter.$on(event, callback);
    }

    off(event, callback) {
        this.emitter.$off(event, callback);
    }

}

export default new EventEmitter();