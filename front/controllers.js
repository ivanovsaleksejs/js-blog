Posts = {
    posts: false,
    post: false,
    viewPosts: function() {
        page.center.innerHTML = ""
        Posts.posts = View.forge("posts.js", Model.get("/posts/"), page.center)
    },
    viewPost: function() {
        page.center.innerHTML = ""
        post = Model.get(Router.request)
        if (post.id != 0) {
            Posts.post = View.forge("post.js", post, page.center)
        }
        else {
            Router.notFound()
        }
    }
}
