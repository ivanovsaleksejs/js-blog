var Ajax = {
    Request : function(url, params) {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                params.callback(xmlhttp.responseText);
        }

        xmlhttp.open(params.method, url, params.async);
        xmlhttp.send();
        return xmlhttp;
    }
}

var Model = {
    get : function(model) {
        var r = new Ajax.Request(document.location.protocol + "\/\/" + document.location.hostname + model, {
            async: false,
            method: "GET",
            callback: function(data){
                return data;
            }
        }).responseText;
        return JSON.parse(r);
    }
}

var View = {

    tags        : [],
    events      : ['click', 'mouseover', 'mouseup'],
    attributes  : [],
    loadedScripts: [],

    create : function(el) {
        return this.create_element(typeof el == 'string' ? this.parse_string(el) : el);
    },

    create_element : function(el) {
        var newEl = document.createElement(el.tag);

        delete el.tag;

        if (typeof el.child != 'undefined') {
            for (var i in el.child) {
                newEl.appendChild(this.create(el.child[i]));
            }
            delete el.child;
        }

        for (attr in el) {
            if (this.events.indexOf(attr) != -1)
                newEl.addEventListener(attr, el[attr], false);    
            else
                newEl[attr] = el[attr];
        }

        newEl.appendTo = function(parentEl) {
            parentEl.appendChild(this);
            return this;
        }

        return newEl;
    },

    parse_string : function(str) {
        var obj = JSON.parse('{' + str.replace(/\=/g, ':').replace(/([a-zA-Z0-9_\-]+)/g, '"$1"') + '}');
        return (obj);
    },

    include: function(script, async, callback){

        if (this.loadedScripts.indexOf(script) !== -1){
            return false;
        }

        var code = new Ajax.Request(script, {
            async: async,
            method: "GET",
            callback: callback
        });

        this.loadedScripts.push(script);
    },

    forge : function(tmpl, data, parentEl) {
        this.include('/templates/' + tmpl, false, function(template) {
            eval(template);
        });
    }

}

var create = function(param) {
   return View.create(param);
}
