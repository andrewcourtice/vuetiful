
function genericHandler(event) {

}

const eventHandlerMap = {
    start: {
        eventName: "dragstart",
        draggable: true,
        callback: genericHandler
    },
    drag: { 
        eventName: "drag",
        draggable: true,
        callback: genericHandler
    },
    enter: { 
        eventName: "dragenter",
        callback: genericHandler
    },
    leave: { 
        eventName: "dragleave",
        callback: genericHandler
    },
    over: { 
        eventName: "dragover",
        callback: genericHandler
    },
    drop: { 
        eventName: "drop",
        callback: genericHandler
    },
    end: { 
        eventName: "dragend",
        draggable: true,
        callback: genericHandler
    }
};

export default {

    bind(element, binding, vNode) {
        let eventType = binding.arg.toLowerCase();

        if (!(eventType in eventHandlerMap)) {
            console.warn("Event not supported");
            return;
        }  

        let handler = eventHandlerMap[eventType];

        if (handler.draggable) {
            element.setAttribute("draggable", true);
        }

        let callback = binding.value;

        if (typeof (callback) !== "function") {
            callback = function (event) { };
        }
        
        element.addEventListener(handler.eventName, event => {
            handler.callback.call(element, event);
            callback.call(element, event);

            return false;
        }, false);

    }

}