Router.is_static = true

Router.rules = Router.rules.concat([
    {
        rule: "\/post\/.*",
        action: Posts.viewPost
    },
    {
        rule: "\/posts(\/[0-9]+)?",
        action: Posts.viewPosts
    }
])

Router.static_routes = Router.static_routes.concat([
    {
        name: "posts",
        path: "posts.js"
    },
    {
        name: "post",
        group: [
            {
                name: "ternary_operator_in_haskell",
                path: "ternary_operator_in_haskell.js"
            }
        ]
    }
])
