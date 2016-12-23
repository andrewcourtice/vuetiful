<template>
    <div id="index" class="container">
        <datatable 
            :columns="customers.columns" 
            :rows="customers.rows">
        </datatable>
    </div>
</template>

<script>
    import { format } from "date-fns";

    let customers = {
        columns: [
            {
                key: "givenName",
                label: "Given Name"
            },
            {
                key: "surname",
                label: "Surname"
            },
            {
                key: "email",
                label: "Email",
                width: 33
            },
            {
                key: "dateOfBirth",
                label: "Date of Birth",
                filter: value => { 
                    console.log(value);
                    return format(value, "DD MMM YYYY"); 
                }
            }
        ],
        rows: []
    };

    export default {
        name: 'index',
        data() {

            for (let i = 0; i < 250; i++) {
                customers.rows.push({
                    givenName: "John " + i,
                    surname: "Smith " + i,
                    email: `john${i}.smith${i}@random.com`,
                    dateOfBirth: new Date() 
                });
            }

            return {
                name: '',
                customers: customers
            }
        }
    }
</script>