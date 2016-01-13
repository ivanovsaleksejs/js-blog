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
                innerHTML: data.user + " " + data.date
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

var disqus = create({
    tag: "script",
    src: "//aleksejs.disqus.com/embed.js",    
})

disqus.setAttribute('data-timestamp', +new Date())

disqus.appendTo(document.body);
