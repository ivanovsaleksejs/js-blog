var center = false
var headerElement = false
var contentElement = false
var footerElement = false

var Posts = {
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
            NotFound.display()
        }
    }
}



window.onload = function() {
    View.include('/front/rules.js', false, function(t){
        new Function(t)()
    })

    center = create({
        tag:"div",
        className: "wrapper",
        click:handleClick
    }).appendTo(document.body)

    headerElement = create("tag=div,className=headerElement").appendTo(center)
    contentElement = create("tag=div,className=contentElement").appendTo(center)
    footerElement = create("tag=div,className=footerElement").appendTo(center)

    window.onpopstate = Router.Route
    Router.Route()
}
