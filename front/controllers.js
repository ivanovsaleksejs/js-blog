Posts = {
    posts: false,
    post: false,
    viewPosts: function() {
        contentElement.innerHTML = ""
        Posts.posts = View.forge("posts.js", Model.get("/posts/"), contentElement)
    },
    viewPost: function() {
        contentElement.innerHTML = ""
        post = Model.get(Router.request)
        if (post.id != 0) {
            Posts.post = View.forge("post.js", post, contentElement)
        }
        else {
            Router.notFound()
        }
    }
}
