export default {
    functional: true,

    props: {
        definition: {
            type: Object,
            required: true
        }
    },

    render: (createElement, context) => {
        let definition = context.props.definition;

        if (!definition.node) {
            console.warn("Dynamic element not rendered. No node name specified.");
            return;
        }

        let component = {
            attrs: {
                id: "1234"
            },
            props: definition.props || {}
        };

        if (!definition.children) {
            return createElement(definition.node, component);
        }

        let children = definition.children.map(child => {
            return createElement("dynamic", {
                props: {
                    definition: child
                }
            });
        });

        return createElement(definition.node, component, children);
    }
}