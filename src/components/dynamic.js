export default {
    functional: true,

    props: {
        component: {
            type: Object,
            required: true
        }
    },

    render: (createElement, context) => {
        let component = context.props.component;

        if (!component.node) {
            console.warn("Dynamic element not rendered. No node name specified.");
            return;
        }

        let definition = {
            attrs: component.attrs,
            props: component.props,
            domProps: component.domProps,
            on: component.on
        };

        if (!component.children) {
            return createElement(component.node, definition);
        }

        let children = component.children.map(child => {
            return createElement("dynamic", {
                props: {
                    component: child
                }
            });
        });

        return createElement(component.node, definition, children);
    }
}