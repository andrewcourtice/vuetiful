
const defaultCell = {
    template: "<span>{{ column.formatData(row[column.id]) }}</span>",
    props: [ "row", "column" ]
};

const editableCell = {
    template: '<input type="text" v-model="row[column.id]"/>',
    props: [ "row", "column" ]
};

export default {
    functional: true,

    name: "datatable-cell",

    props: {

        row: Object,
        column: Object,
        editable: Boolean

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

            return createElement(cell, cellProps, [ vNode ]);
        }

        let child = context.props.editable ? editableCell : defaultCell;

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