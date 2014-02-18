var headerElement = false
var contentElement = false


Posts = {
    posts: false,
    post: false,
    viewPosts: function() {
        offset = Router.request_params[2] || 0
        contentElement.innerHTML = ""
        Posts.posts = View.forge('posts.js', Model.get('/posts/'+offset), contentElement)
    },
    viewPost: function() {
        contentElement.innerHTML = ""
        Posts.post = View.forge('post.js', Model.get(Router.request), contentElement)
    }
}

Router = {

    request: false,
    request_params: [],
    state: {},

    rules: [
        {rule: '\/post\/[0-9]+', action: Posts.viewPost},
        {rule: '\/posts(\/[0-9]+)?', action: Posts.viewPosts}
    ],

    Route: function (e) {
        Router.request = window.location.pathname
        Router.request_params = Router.request.split('\/')

        for (rule in Router.rules) {
            if (RegExp('^'+Router.rules[rule].rule+'$').test(Router.request)) {
                break
            }
        }

        Router.rules[rule].action()
    }
}

function handleClick(event) {
    var e = event.target
    if (e.tagName == 'A') {
        history.pushState(Router.state, "asdf", e.href)
        Router.Route()
    }
    event.preventDefault()
    return false
}

window.onload = function() {
    center = create({tag:'center',click:handleClick}).appendTo(document.body)
    headerElement = create("tag=div,className=headerElement").appendTo(center)
    contentElement = create("tag=div,className=contentElement").appendTo(center)
    window.onpopstate = Router.Route
    Router.Route()
}
