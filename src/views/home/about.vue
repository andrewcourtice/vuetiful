<template>
    <div id="about" class="container">
        <h1>About</h1>
        <dynamic v-for="child in definition" :definition="child"></dynamic>
        <div>{{ raw }}</div>
    </div>
</template>

<script>

    function flattenComponent(component) {
        let el = {};

        if (!component.children) {
            return el;
        }

        component.children.forEach(child => {
            el[child.node] = flattenComponent(child);
        });

        return el;
    }

    export default {
        data() {
            return {
                definition: [
                    { 
                        node: "menu-list",
                        children: [
                            { 
                                node: "menu-list",
                                children: [
                                    {
                                        node: "raw-content",
                                        props: {
                                            html: "<a href=\"www.google.com\">Google</a>"
                                        }
                                    }
                                ]
                            },
                            {
                                node: "div"
                            }
                        ] 
                    },
                    { node: "menu-list" },
                    { node: "menu-list" }
                ]
            }
        },
        computed: {
            raw() {
                return flattenComponent(this.definition[0]);
            }
        }
    }
</script>