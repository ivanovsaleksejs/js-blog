var post = create({
        tag : 'div',
        className : 'post',
        child: [
            {
                tag: 'h2',
                innerHTML: data.header
            },
            {
                tag: 'p',
                className: 'author',
                innerHTML: data.user
            },
            {
                tag: 'p',
                className: 'date',
                innerHTML: data.date
            },
            {
                tag: 'p',
                className: 'content',
                innerHTML: data.content
            }
        ]
}).appendTo(parentEl || document.body)

var comments = create({
    tag: 'div',
    className: 'comments'
}).appendTo(post)

for (comment in data.comments) {
    var c = data.comments[comment]
    create({
        tag: 'div',
        className: 'comment',
        child: [
            {
                tag: 'p',
                className: 'author',
                innerHTML: c.user_name
            },
            {
                tag: 'p',
                className: 'date',
                innerHTML: c.comment_date
            },
            {
                tag: 'p',
                className: 'text',
                innerHTML: c.text
            }
        ]
    }).appendTo(comments)
}
