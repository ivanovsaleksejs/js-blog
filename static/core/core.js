var Ajax = {
    Request : function(url, params) {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                params.callback(xmlhttp.responseText)
        }

        var nocache = ""
        if (typeof params.nocache !== "undefined") {
            var d = new Date
            nocache = "?" + d.getTime() + d.getMilliseconds()
        }
        xmlhttp.open(params.method, url + nocache, params.async)
        xmlhttp.setRequestHeader("X-Requested-With","XMLHttpRequest")
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xmlhttp.send(params.data)
        return xmlhttp
    }
}

var Model = {
    get : function(model) {
        var r = new Ajax.Request(document.location.protocol + "\/\/" + document.location.hostname + model, {
            async: false,
            nocache: true,
            method: "GET",
            data: "",
            callback: function(data){
                return data;
            }
        }).responseText
        return JSON.parse(r)
    },
    post : function(model, data) {

        var r = new Ajax.Request(document.location.protocol + "\/\/" + document.location.hostname + model, {
            async: false,
            nocache: true,
            method: "POST",
            data: this.parse_data(data),
            callback: function(data){
                return data;
            }
        }).responseText
        return JSON.parse(r)
    },
    parse_data : function(data) {
        var req = []
        for (key in data) {
            req.push(key + "=" + data[key])
        }
        return req.join("&")
    }
}

var View = {

    tags        : [],
    events      : ['click', 'mouseover', 'mouseup'],
    attributes  : [],
    loadedScripts: [],

    create : function(el) {
        return this.create_element(typeof el == 'string' ? this.parse_string(el) : el)
    },

    create_element : function(el) {
        var newEl = document.createElement(el.tag)

        delete el.tag

        if (typeof el.child != 'undefined') {
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

        return newEl;
    },

    parse_string : function(str) {
        var obj = JSON.parse('{' + str.replace(/\=/g, ':').replace(/([a-zA-Z0-9_\-]+)/g, '"$1"') + '}')
        return (obj)
    },

    include: function(script, async, callback){

        var loaded = this.loadedScripts[script]
        if (typeof loaded !== undefined){
            callback(loaded)
        }

        var code = new Ajax.Request(script, {
            async: async,
            method: "GET",
            callback: callback
        })

        this.loadedScripts[script] = code.responseText
    },

    forge : function(tmpl, data, parentEl) {
        this.include('/templates/' + tmpl, false, function(template) {
            eval(template)
        })
    }

}

var create = function(param) {
   return View.create(param)
}
