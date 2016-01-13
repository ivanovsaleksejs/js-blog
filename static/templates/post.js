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

var disqus_shortname = 'aleksejs'; // required: replace example with your forum shortname

var disqus_identifier = 'aleksejs_' + data.id
var disqus_title = data.header
var disqus_url = document.location.href

var disqus = create({
    tag: "script",
    src: "//aleksejs.disqus.com/embed.js",    
})

disqus.setAttribute('data-timestamp', +new Date())

disqus.appendTo(document.body);
