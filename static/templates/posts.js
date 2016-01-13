parentEl.innerHTML = ""

var posts = create({
        tag : "div",
        className : "posts"
}).appendTo(parentEl || document.body)

for (var r in data) {
    create({
        tag : "div",
        className : "post",
        child : [
            {
                tag : "h2",
                className : "post-header",
                child: [
                    {
                        tag: "a",
                        href: "/post/" + data[r].url,
                        innerHTML : data[r].header
                    }
                ]
            },
            {
                tag : "div",
                className : "post-preview content",
                child: [
                    {
                        tag: "a",
                        href: "/post/" + data[r].url,
                        innerHTML: data[r].preview
                    }
                ]
            }
        ]
    }).appendTo(posts)
}
