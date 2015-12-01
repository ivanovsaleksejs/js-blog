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
            }
        ]
}).appendTo(parentEl || document.body)
