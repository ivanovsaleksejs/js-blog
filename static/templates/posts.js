var posts = create({
        tag : 'div',
        className : 'posts'
}).appendTo(parentEl || document.body);

for (var r in data) {
    console.log(data[r].header);
    create({
        tag : 'div',
        className : 'post',
        child : [
            {
                tag : 'h2',
                className : 'post-header',
                innerHTML : data[r].header
            },
            {
                tag : 'div',
                className : 'post-content',
                innerHTML : data[r].content
            }
        ]
    }).appendTo(posts);
}
