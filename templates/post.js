setTitle(data.header)

var post = create({
        tag : "div",
        className : "post",
        child: [
            {
                tag: "h2",
                className : "post-header",
                innerHTML: data.header
            },
            {
                tag: "div",
                className: "author",
                innerHTML: data.user + " " + data.date.replace(/\s/g, '.')
            },
            {
                tag: "div",
                className: "content",
                innerHTML: data.content
            },
            {
                tag: "div",
                id: "disqus_thread"
            }
        ]
}).appendTo(parentEl || document.body);

if (typeof data.style !== "undefined" && typeof style[data.style] == "undefined") {
    create({
        tag: "link",
        rel: "stylesheet",
        type: "text/css",
        href: "/css/" + data.style + ".css"
    }).appendTo(document.head)
}

if (typeof data.complete !== "undefined") {
    View.include("/front/js/" + data.complete + ".js", false, function(t){
        new Function(t)()
    }, true)
}

var disqus_shortname = 'aleksejs'

var disqus_identifier = 'aleksejs_' + data.id
var disqus_title = data.header
var disqus_url = document.location.href

var disqus = create({
    tag: "script",
    src: "//aleksejs.disqus.com/embed.js",    
})

disqus.setAttribute('data-timestamp', +new Date());

disqus.appendTo(document.body);

(jsMath[jsMath.Easy.method])()
