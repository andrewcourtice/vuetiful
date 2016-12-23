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
        rows: [
            {
                givenName: "Andrew",
                surname: "Courtice",
                email: "something@random.com",
                dateOfBirth: "23-12-2016"
            },
            {
                givenName: "Liana",
                surname: "Courtice",
                email: "somethingelse@random.com",
                dateOfBirth: "22-12-2016"
            }
        ]
    };

    export default {
        name: 'index',
        data() {
            return {
                name: '',
                customers: customers
            }
        }
    }
</script>