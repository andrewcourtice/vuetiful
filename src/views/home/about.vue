<template>
    <div id="about" class="container">
        <h1>About</h1>
        <dynamic v-for="child in definition" :component="child"></dynamic>
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
                                        node: "a",
                                        attrs: {
                                            href: "www.google.com"
                                        },
                                        domProps: {
                                            innerText: "Google"
                                        }
                                    },
                                    {
                                        node: "a",
                                        attrs: {
                                            href: "www.youtube.com"
                                        },
                                        domProps: {
                                            innerText: "Youtube"
                                        }
                                    },
                                    {
                                        node: "a",
                                        attrs: {
                                            href: "www.facebook.com"
                                        },
                                        domProps: {
                                            innerText: "Facebook"
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