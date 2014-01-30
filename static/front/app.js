var headerElement = false
var contentElement = false

Posts = {
    posts: false,
    post: false,
    viewPosts: function(offset) {
        contentElement.innerHTML = ""
        this.posts = View.forge('posts.js', Model.get('/posts'), contentElement)
    },
    viewPost: function() {
        contentElement.innerHTML = ""
        this.post = View.forge('post.js', Model.get(Router.request), contentElement)
    }
}

Router = {
    request: false,
    rules: {
        "\/post\/[0-9]+": Posts.viewPost,
        "\/posts": Posts.viewPosts
    },
    Route: function (e) {
        this.request = window.location.pathname
        for (rule in this.rules) {
            if (this.request.match(rule)) {
                break
            }
        }
        this.rules[rule]()
    }
}

window.onload = function() {
    center = create("tag=center").appendTo(document.body)
    headerElement = create("tag=div,className=headerElement").appendTo(center)
    contentElement = create("tag=div,className=contentElement").appendTo(center)
    window.onpushstate = window.onpopstate = Router.Route
    Router.Route()
}
