var center = false
var headerElement = false
var contentElement = false
var footerElement = false

window.onload = function() {
    View.include("/front/controllers.js", false, function(t){
        new Function(t)()
        View.include("/front/rules.js", false, function(t){
            new Function(t)()
        })
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
