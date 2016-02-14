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
            },
            {
                name: "how_this_blog_works",
                path: "how_this_blog_works.js"
            },
            {
                name: "some_thoughts_about_semiprimes",
                path: "some_thoughts_about_semiprimes.js"
            },
            {
                name: "ratio_of_a_series_paper_size",
                path: "ratio_of_a_series_paper_size.js"
            },
            {
                name: "hexadecimal_clock",
                path: "hexadecimal_clock.js"
            },
        ]
    }
])
