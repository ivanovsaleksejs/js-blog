var Ajax = {

    Request : function(url, params) {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                params.callback(xmlhttp.response)
            }
        }

        var nocache = ""

        if (typeof params.nocache !== "undefined") {
            var d = new Date
            nocache = "?" + d.getTime() + Math.round(d.getMilliseconds() / 100)
        }

        xmlhttp.open(params.method, url + nocache, params.async)
        xmlhttp.setRequestHeader("X-Requested-With","XMLHttpRequest")
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xmlhttp.send(params.data)
        return xmlhttp
    },
}

var Router = {

    request: false,
    request_params: [],
    state: {},

    is_static: false,

    rules: [],
    static_routes: [],

    Route: function (e) {
        Router.request = window.location.pathname
        Router.request_params = Router.request.split("\/")

        for (rule in Router.rules) {
            if (RegExp("^"+Router.rules[rule].rule+"$").test(Router.request)) {
                break
            }
        }
        Router.rules[rule].action()
    },

    routeStatic: function (model, routes) {
        var a = model.split("/").filter(function(s){return s})
        var path = [a.shift()]
        path.push(a.join("/"))

        for (route in routes) {
            if (routes[route].name == path[0]) {
                if (typeof routes[route].group !== "undefined") {
                    return this.routeStatic(path[1], routes[route].group)
                }
                return "/models/" + routes[route].path
            }
        }
        return false
    },

    notFound: function (tpl) {
        View.forge(tpl || "404.js", {}, contentElement)
    }
}

var Model = {

    get : function(model) {

        if (Router.is_static) {
            model = Router.routeStatic(model, Router.static_routes)
            if (!model) {
                Router.notFound()
                return
            }
        }

        var r = new Ajax.Request(document.location.protocol + "\/\/" + document.location.hostname + model, {
            async: false,
            nocache: true,
            method: "GET",
            data: "",
            callback: function(data){
                return data
            },
            type: "json"
        }).response

        if (r == "" || !this.is_valid_json(r)) {
            r = JSON.stringify({error:r})
        }

        return JSON.parse(r)
    },

    post : function(model, data) {

        var r = new Ajax.Request(document.location.protocol + "\/\/" + document.location.hostname + model, {
            async: false,
            nocache: true,
            method: "POST",
            data: this.parse_data(data),
            callback: function(data){
                return data
            },
            type: "json"
        }).response

        if (r == "" || !this.is_valid_json(r)) {
            r = JSON.stringify({error:r})
        }

        return JSON.parse(r)
    },

    parse_data : function(data) {
        var req = []

        for (key in data) {
            req.push(key + "=" + data[key])
        }

        return req.join("&")
    },

    is_valid_json : function(response) {
        return /^[\],:{}\s]*$/.test(response.replace(/\\["\\\/bfnrtu]/g, "@").
                                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").
                                    replace(/(?:^|:|,)(?:\s*\[)+/g, ""))
    }
}

var View = {

    tags        : [],
    events      : ["click", "mouseover", "mouseup"],
    attributes  : [],
    loadedScripts: [],

    create : function(el) {
        return this.create_element(typeof el == "string" ? this.parse_string(el) : el)
    },

    create_element : function(el) {
        var newEl = document.createElement(el.tag)

        delete el.tag

        if (typeof el.child != "undefined") {
            for (var i in el.child) {
                newEl.appendChild(this.create(el.child[i]))
            }
            delete el.child
        }

        for (attr in el) {
            if (this.events.indexOf(attr) != -1)
                newEl.addEventListener(attr, el[attr], false)
            else
                newEl[attr] = el[attr]
        }

        newEl.appendTo = function(parentEl) {
            parentEl.appendChild(this)
            return this
        }

        return newEl
    },

    parse_string : function(str) {
        var obj = JSON.parse("{" + str.replace(/\=/g, ":").replace(/([a-zA-Z0-9_\-]+)/g, "\"$1\"") + "}")
        return (obj)
    },

    include: function(script, async, callback){

        var escapedName = script.replace(/[\/\.]/g, "_")
        var loaded = this.loadedScripts[escapedName]

        if (typeof loaded !== "undefined"){
            callback(loaded)
            return
        }

        var code = new Ajax.Request(script, {
            async: async,
            method: "GET",
            callback: callback
        })

        this.loadedScripts[escapedName] = code.responseText
    },

    forge : function(tmpl, data, parentEl) {

        this.include("/templates/" + tmpl, false, function(t){
            new Function("data", "parentEl", t)(data, parentEl)
        })
    }

}

var create = function(param) {
   return View.create(param)
}

var handleClick = function(event) {
    var e = event.target
    if (e.tagName == "A") {
        history.pushState(Router.state, "", e.href)
        Router.Route()
    }
    event.preventDefault()
    return false
}

var setTitle = function(text) {
    var title = document.getElementsByTagName('title')
    if (title.length == 0) {
        var title = create("tag=title").appendTo(document.head)
    }
    title.text = text
}
