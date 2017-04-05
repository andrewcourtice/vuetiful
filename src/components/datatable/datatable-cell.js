const defaultTemplate = "<span>{{ column.formatData(row[column.id]) }}</span>";
const editableTemplate = '<input type="text" v-model="row[column.id]"/>';
const optimizedEditableTemplate = '<input type="text" v-model.lazy="row[column.id]"/>';

function getChildComponent(editable, optimize) {

    let component = {
        template: defaultTemplate,
        props: ["row", "column"]
    };

    if (editable) {
        component.template = optimize ? optimizedEditableTemplate : editableTemplate;
    }

    return component;
}

export default {
    functional: true,

    name: "datatable-cell",

    props: {

        row: Object,
        column: Object,

        editable: {
            type: Boolean,
            default: false
        },

        optimize: {
            type: Boolean,
            default: false
        }

    },

    render(createElement, context) {
        let row = context.props.row;
        let column = context.props.column;

        let cell = "td";
        let cellProps = {
            class: {
                "datatable-cell": true
            },
            style: column.columnStyles
        };

        if (column.template) {

            let vNode = column.template({
                row,
                column,
                value: row[column.id]
            });

            return createElement(cell, cellProps, [vNode]);
        }

        let child = getChildComponent(context.props.editable, context.props.optimize);

        let childProps = {
            props: {
                row,
                column
            }
        };

        return createElement(cell, cellProps, [
            createElement(child, childProps)
        ]);
    }
}