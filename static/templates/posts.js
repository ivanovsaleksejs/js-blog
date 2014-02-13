parentEl.innerHTML = ''

var posts = create({
        tag : 'div',
        className : 'posts'
}).appendTo(parentEl || document.body)

for (var r in data) {
    create({
        tag : 'div',
        className : 'post',
        child : [
            {
                tag : 'h2',
                className : 'post-header',
                child: [
                    {
                        tag: 'a',
                        href: "/post/" + data[r].id,
                        innerHTML : data[r].header
                    }
                ]
            },
            {
                tag : 'div',
                className : 'post-preview',
                child: [
                    {
                        tag: 'p',
                        innerHTML: data[r].preview
                    },
                    {
                        tag: 'a',
                        href: "/post/" + data[r].id,
                        innerHTML: "Read more..."
                    }
                ]
            }
        ]
    }).appendTo(posts)
}
