<template>
    <div id="index" class="container">
        <datagrid :columns="customers.columns" :rows="customers.rows">
        </datagrid>
    </div>
</template>

<script>

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
                label: "Date of Birth"
            }
        ],
        rows: []
    };

    export default {
        name: 'index',
        data() {

            for (let i = 0; i < 1000; i++) {
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