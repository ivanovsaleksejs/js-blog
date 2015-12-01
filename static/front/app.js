var center = false
var headerElement = false
var contentElement = false

var Posts = {
    posts: false,
    post: false,
    viewPosts: function() {
        offset = Router.request_params[2] || 0
        contentElement.innerHTML = ""
        Posts.posts = View.forge("posts.js", Model.get("/posts/"+offset), contentElement)
    },
    viewPost: function() {
        contentElement.innerHTML = ""
        post = Model.get(Router.request)
        if (post.id != 0) {
            Posts.post = View.forge("post.js", post, contentElement)
        }
        else {
            NotFound.display()
        }
    }
}



window.onload = function() {
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

    center = create({
        tag:"center",
        click:handleClick
    }).appendTo(document.body)

    headerElement = create("tag=div,className=headerElement").appendTo(center)
    contentElement = create("tag=div,className=contentElement").appendTo(center)

    window.onpopstate = Router.Route
    Router.Route()
}
