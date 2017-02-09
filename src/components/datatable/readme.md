# Datatable

The datatable component is essentially a "glorified table" designed to efficiently display dense data. Datatables aren't a heavily used component but they are fundamental to business applications - particularly ones displaying financial data or dashboards. A good datatable is hard to come by these. Often they are too bulky, poorly designed, rigid, lack features or have too many dependencies on other frameworks. I have aimed to mitigate most of these problems with the Vuetiful datatable but I expect there will be features lacking that you need. 

If you would like a feature added to the datatable or if you find a bug, please open an issue on this repo.

**Note:** The line numbering is a little bit quirky in multi-group mode. I'll hopefully have it fixed soon. 

To see a demo of this component in action check out this codepen example: [http://codepen.io/andrewcourtice/full/woQzpa](http://codepen.io/andrewcourtice/full/woQzpa).

## Getting Started

Using the datatable is trivial. Just drop a `datatable` element in your html and start defining some `datatable-columns`. Refer to the **props** section below to see what props you can use with this component. I'll also talk about customizing cell and header templates using slots later. Here's a basic example:

```html
<datatable>
    <datatable-column id="datatable-column-1" label="Column 1"></datatable-column>
    <datatable-column id="datatable-column-2" label="Column 2"></datatable-column>
    <datatable-column id="datatable-column-3" label="Column 3"></datatable-column>
</datatable>
```

You can also use Vue's list rendering features to define columns in you viewmodel.

```javascript
new Vue({

    el: "#app",

    data: function() {
        return {
            columns: [
                { id: "datatable-column-1", label: "Column 1" },
                { id: "datatable-column-2", label: "Column 2" },
                { id: "datatable-column-3", label: "Column 3" }
            ]
        };
    }
});
```

```html
<datatable>
    <datatable-column v-for="column in columns" :id="column.id" :label="column.label"></datatable-column>
</datatable>
```


## Props

### Datatable

```html
<datatable 
    :source="customers.data"
    :striped="customers.striped"
    :filterable="customers.filterable"
    :editable="customers.editable"
    :line-numbers="customers.lineNumbers">

    <!-- datatable-column -->
</datatable>
```

| Prop | Type | Required | Default | Description |
| ---- | ---- | :------: | ------- | ----------- |
| source | array[object] | no | [] | An array of objects to display in the table. a.k.a. - the data. This is often JSON fetched from your application and parsed |
| striped | boolean | no | true | Whether the table should display alternate row coloring |
| filterable | boolean | no | true | Whether the table should display a textbox in the footer for filtering the current dataset |
| editable | boolean | no | false | Whether the table should be displayed in edit mode (more on this later) |
| line-numbers | boolean | no | true | Whether the table should display line numbers on the left of each row |
**Note:** For specifying literal true values on props you can use a shorthand version. eg. instead of writing `editable="true"` you can just use the existence of the prop to define it's value eg. `editable`.

### Datatable Column

```html
<datatable-column 
    :id="column.id" 
    :label="column.label"
    :width="column.width"
    :sortable="column.sortable"
    :groupable="column.groupable"
    :total="column.total"
    :formatter="column.formatter">
</datatable-column>
```

| Prop | Type | Required | Default | Description |
| ---- | ---- | :------: | ------- | ----------- |
| id | string | yes |  | The uniqie id of this column. The id must correspond to a property on the objects in your data source |
| label | string | no | this.id | The label of this column to display in the header of the table. If none is specified, the id of this column will be used |
| width | string or number | no | | The width of the column. If a number is supplied the component will assume a percentage (eg. 25 = 25%). If a string is supplied the component will interpret it literally (eg. 3px, 3.5rem, 4em etc.) |
| sortable | boolean | no | true | Whether this row can be used for sorting |
| groupable | boolean | no | true | Whether this row can be used for grouping |
| total | boolean | no | false | Whether data in this column should be totalled and displayed at the bottom of the table. **Note:** for obvious reasons this is only available if the column has numeric data |
| formatter | function | no | | A function used to format the data in this column before it is displayed. This is particularly useful for dates and numeric values (more on this later) |


## Formatting Data

More often than not you will likely run into a situation where you need to display data in a different format than it's raw form. This is common for dates and numbers. As seen above, each column has a `formatter` prop which allows you to specify a function that formats the data for that cell. There are several ways you could do this but using our basic example above, let's take a look at one way how you would implement a formatter:

```javascript
new Vue({

    el: "#app",

    data: function() {
        return {
            /* replace with real data */
            data: []
        };
    },

    methods: {

        formatCurrency: function(value) {
            var currency = parseFloat(value);

            if (isNaN(currency)) {
                return value;
            }

            return "$" + currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

    }
});
```

The format function signature expects one parameter which will be the value of the cell. 

```html
<datatable>
    <datatable-column id="datatable-column-1" label="Column 1"></datatable-column>
    <datatable-column id="datatable-column-2" label="Column 2"></datatable-column>
    <datatable-column id="datatable-column-3" label="Column 3" :formatter="formatCurrency"></datatable-column>
</datatable>
```

## Editing Data

A quick note on editing data. When `editable` is set to true on the datatable, the default bahaviour of the table is to convert all the cells into textboxes and remove data formatting. In other words the user will be able to edit the raw data. Typing into the textbox will mutate (change) the data in the array bound to the `source` prop. 


## Customizing the Datatable

The datatable is very flexible with customizing how your users interact with the component. One of the ways you can change the component to suit your requirements is templating. This component makes use of Vue's scoped templates to allow you to define your own markup (and custom components) for column headers and cells.

### Header Templates

