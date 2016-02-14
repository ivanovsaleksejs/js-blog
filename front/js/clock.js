var clock = create({
    tag: "div",
    id: "clock"
}).appendTo(document.getElementById("clock_area"));

var elements = [null, null, null];

for (var i in elements) {
    elements[i] = create("tag=div").appendTo(clock)
}

var check = create("tag=div,id=checkBox").appendTo(document.getElementById("clock_area"));
var checkbox = create("tag=input,type=checkbox,id=check").appendTo(check);
create("tag=label,htmlFor=check,innerHTML=Hex").appendTo(check);

(function(elements, checkbox){
    var
        hour = 0,
        minute = 0,
        second = 0,
        step = 1318,
        hex = false,
        pad = function(n) {
            return ((n+"").length < 2) ? ("0" + n) : n;
        },
        prep = function(n) {
            return hex ? n.toString(16).toUpperCase() : n
        },
        reset = function() {
            var d = new Date;
            var dayms = (d.getTime() - d.getTimezoneOffset() * 60000) % 86400000
            var current = dayms * 67108864 / 86400000;
            var delta = Math.floor((current - current % 1024) / 1024);
            second = delta % 64;
            delta = Math.floor((delta - second) / 64)
            minute = delta % 64;
            hour = Math.floor((delta - minute) / 64)
        },
        update = function() {
            second++;
            if ((second + minute) % 13 == 0) {
                reset();
            }
            if (second > 63) {
                second = 0;
                minute++;
                if (minute > 63) {
                    minute = 0;
                    hour++;
                    if (hour > 15) {
                        hour = 0;
                    }
                }
            }

            elements[0].innerHTML = prep(hour);
            elements[1].innerHTML = pad(prep(minute));
            elements[2].innerHTML = pad(prep(second));
        },
        setHex = function(c) {
            hex = c.checked;
        };

    setHex(checkbox);

    checkbox.addEventListener('change', function(elem) {
        setHex(checkbox);
        reset();
        update();
    });
    reset();
    update();
    setInterval(update, step);

})(elements, checkbox);
