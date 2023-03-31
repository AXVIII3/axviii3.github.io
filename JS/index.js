// Preloader
! function (a, b) {
    "use strict";

    function c(a) {
        a = a || {};
        for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b];
            if (c)
                for (var d in c) c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d])
        }
        return a
    }

    function d(d, g) {
        function h() {
            if (y) {
                r = b.createElement("canvas"), r.className = "pg-canvas", r.style.display = "block", d.insertBefore(r, d.firstChild), s = r.getContext("2d"), i();
                for (var c = Math.round(r.width * r.height / g.density), e = 0; c > e; e++) {
                    var f = new n;
                    f.setStackPos(e), z.push(f)
                }
                a.addEventListener("resize", function () {
                    k()
                }, !1), b.addEventListener("mousemove", function (a) {
                    A = a.pageX, B = a.pageY
                }, !1), D && !C && a.addEventListener("deviceorientation", function () {
                    F = Math.min(Math.max(-event.beta, -30), 30), E = Math.min(Math.max(-event.gamma, -30), 30)
                }, !0), j(), q("onInit")
            }
        }

        function i() {
            r.width = d.offsetWidth, r.height = d.offsetHeight, s.fillStyle = g.dotColor, s.strokeStyle = g.lineColor, s.lineWidth = g.lineWidth
        }

        function j() {
            if (y) {
                u = a.innerWidth, v = a.innerHeight, s.clearRect(0, 0, r.width, r.height);
                for (var b = 0; b < z.length; b++) z[b].updatePosition();
                for (var b = 0; b < z.length; b++) z[b].draw();
                G || (t = requestAnimationFrame(j))
            }
        }

        function k() {
            i();
            for (var a = d.offsetWidth, b = d.offsetHeight, c = z.length - 1; c >= 0; c--)(z[c].position.x > a || z[c].position.y > b) && z.splice(c, 1);
            var e = Math.round(r.width * r.height / g.density);
            if (e > z.length)
                for (; e > z.length;) {
                    var f = new n;
                    z.push(f)
                } else e < z.length && z.splice(e);
            for (c = z.length - 1; c >= 0; c--) z[c].setStackPos(c)
        }

        function l() {
            G = !0
        }

        function m() {
            G = !1, j()
        }

        function n() {
            switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
                x: Math.ceil(Math.random() * r.width),
                y: Math.ceil(Math.random() * r.height)
            }, this.speed = {}, g.directionX) {
                case "left":
                    this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2);
                    break;
                case "right":
                    this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2);
                    break;
                default:
                    this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX
            }
            switch (g.directionY) {
                case "up":
                    this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2);
                    break;
                case "down":
                    this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2);
                    break;
                default:
                    this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY
            }
        }

        function o(a, b) {
            return b ? void(g[a] = b) : g[a]
        }

        function p() {
            console.log("destroy"), r.parentNode.removeChild(r), q("onDestroy"), f && f(d).removeData("plugin_" + e)
        }

        function q(a) {
            void 0 !== g[a] && g[a].call(d)
        }
        var r, s, t, u, v, w, x, y = !!b.createElement("canvas").getContext,
            z = [],
            A = 0,
            B = 0,
            C = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
            D = !!a.DeviceOrientationEvent,
            E = 0,
            F = 0,
            G = !1;
        return g = c({}, a[e].defaults, g), n.prototype.draw = function () {
            s.beginPath(), s.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), s.beginPath();
            for (var a = z.length - 1; a > this.stackPos; a--) {
                var b = z[a],
                    c = this.position.x - b.position.x,
                    d = this.position.y - b.position.y,
                    e = Math.sqrt(c * c + d * d).toFixed(2);
                e < g.proximity && (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), g.curvedLines ? s.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : s.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY))
            }
            s.stroke(), s.closePath()
        }, n.prototype.updatePosition = function () {
            if (g.parallax) {
                if (D && !C) {
                    var a = (u - 0) / 60;
                    w = (E - -30) * a + 0;
                    var b = (v - 0) / 60;
                    x = (F - -30) * b + 0
                } else w = A, x = B;
                this.parallaxTargX = (w - u / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (x - v / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
            }
            var c = d.offsetWidth,
                e = d.offsetHeight;
            switch (g.directionX) {
                case "left":
                    this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = c - this.parallaxOffsetX);
                    break;
                case "right":
                    this.position.x + this.speed.x + this.parallaxOffsetX > c && (this.position.x = 0 - this.parallaxOffsetX);
                    break;
                default:
                    (this.position.x + this.speed.x + this.parallaxOffsetX > c || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
            }
            switch (g.directionY) {
                case "up":
                    this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY);
                    break;
                case "down":
                    this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY);
                    break;
                default:
                    (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
            }
            this.position.x += this.speed.x, this.position.y += this.speed.y
        }, n.prototype.setStackPos = function (a) {
            this.stackPos = a
        }, h(), {
            option: o,
            destroy: p,
            start: m,
            pause: l
        }
    }
    var e = "particleground",
        f = a.jQuery;
    a[e] = function (a, b) {
        return new d(a, b)
    }, a[e].defaults = {
        minSpeedX: .1,
        maxSpeedX: .7,
        minSpeedY: .1,
        maxSpeedY: .7,
        directionX: "center",
        directionY: "center",
        density: 1e4,
        dotColor: "#666666",
        lineColor: "#666666",
        particleRadius: 7,
        lineWidth: 1,
        curvedLines: !1,
        proximity: 100,
        parallax: !0,
        parallaxMultiplier: 5,
        onInit: function () {},
        onDestroy: function () {}
    }, f && (f.fn[e] = function (a) {
        if ("string" == typeof arguments[0]) {
            var b, c = arguments[0],
                g = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                f.data(this, "plugin_" + e) && "function" == typeof f.data(this, "plugin_" + e)[c] && (b = f.data(this, "plugin_" + e)[c].apply(this, g))
            }), void 0 !== b ? b : this
        }
        return "object" != typeof a && a ? void 0 : this.each(function () {
            f.data(this, "plugin_" + e) || f.data(this, "plugin_" + e, new d(this, a))
        })
    })
}(window, document),
function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (b) {
        var c = (new Date).getTime(),
            d = Math.max(0, 16 - (c - a)),
            e = window.setTimeout(function () {
                b(c + d)
            }, d);
        return a = c + d, e
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
        clearTimeout(a)
    })
}();


particleground(document.getElementById('particles-foreground'), {
    dotColor: 'rgba(255, 158, 89, 1)',
    lineColor: 'rgba(255, 158, 89, 0.05)',
    minSpeedX: 0.3,
    maxSpeedX: 0.6,
    minSpeedY: 0.3,
    maxSpeedY: 0.6,
    density: 50000, // One particle every n pixels
    curvedLines: false,
    proximity: 250, // How close two dots need to be before they join
    parallaxMultiplier: 10, // Lower the number is more extreme parallax
    particleRadius: 4, // Dot size
});

particleground(document.getElementById('particles-background'), {
    dotColor: 'rgba(255, 255, 255, 0.5)',
    lineColor: 'rgba(255, 255, 255, 0.05)',
    minSpeedX: 0.075,
    maxSpeedX: 0.15,
    minSpeedY: 0.075,
    maxSpeedY: 0.15,
    density: 30000, // One particle every n pixels
    curvedLines: false,
    proximity: 20, // How close two dots need to be before they join
    parallaxMultiplier: 20, // Lower the number is more extreme parallax
    particleRadius: 2, // Dot size
});

var preloaderTyped_options = {
    strings: ['Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Damn', 'Still Loading', 'This Sucks', 'Enjoy the stars, I guess', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Something feels off', 'Slow internet?', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Still Loading?', 'Check your internet', 'Try to reload maybe', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading..', 'Loading.', 'Just go away already', 'Either your internet is EXTREMELY slow', 'or you just want to read this through', 'or you are just unlucky', 'If you have slow internet, try again later', 'If you wanted to see this through, congrats, you just did', 'If you are unlucky, try to reload or try again later.', 'Cheers'],
    typeSpeed: 30,
    backSpeed: 30,
    startDelay: 2000,
    backDelay: 1000,
    showCursor: true,
    loop: true
};
var preloaderTyped = new Typed('.preloaderTyped', preloaderTyped_options);


// Splash Screen
function resumeScroll() {
    document.getElementsByTagName("BODY")[0].style.overflowY = 'scroll';
    document.getElementsByTagName("BODY")[0].style.overflowX = 'hidden';
}

function onSplashTypeOver(params) {
    document.getElementById('splash').classList.add('splashOver');
    setTimeout(() => {
        document.getElementById('splashAfter').classList.add('splashOver');
    }, 150);
    setTimeout(resumeScroll(), 1200);
    setTimeout(() => {
        if (document.getElementById('splash') != null) document.getElementById('splash').remove();
        if (document.getElementById('preloader') != null) document.getElementById('preloader').remove();
        if (document.getElementById('preloaderAfter') != null) document.getElementById('preloaderAfter').remove();
        if (document.getElementById('splashAfter') != null) document.getElementById('splashAfter').remove();
    }, 2000);
}
var myDate = new Date();
var hrs = myDate.getHours();
var timeOfDay = "";
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = weekday[myDate.getDay()];
var splashTyped_options = {
    strings: [
        "~$ run --website(dev=axviii3, ip=axviii3.is-a.dev) --port(5500) --host(127.0.0.1) ^600 <br> `Initializing` ^600 <br> `Initializing.` ^600 <br> `Initializing..` ^600 <br> `Initializing...` ^600 <br> `Starting...` ^600 <br> `Starting [0%..........]` ^600 <br> `Starting [.1%.........]` ^600 <br> `Starting [.2%.........]`^600 <br> `Starting [.3%.........]`^400 <br> `Starting [..23%........]`^400 <br> `Starting [...34%.......]`^300 <br> `Starting [.....56%.....]`^350 <br> `Starting [......69%....]`^200 <br> `Starting [........82%...]`^200 <br> `Starting [.........95%.]`^200 <br> `Starting [.........96%]`^200 <br> `Starting [.........97%]`^200 <br> `Starting [..........100%]`^1000<br>`Processing [0%..........]`^700<br>`Processing [..........100%]`^1000<br>`Done`^2000<br>`All Unit Tests Passed` ^200<br> ^200<br> ^200<br> ^200<br> ^200<br> Welcome user. ^700<br> Good " + timeOfDay + ". ^700<br> Hope you are having a great " + day + "! ^400<br> Smile :) ~ AXVIII3 ^3000", ""
    ],
    typeSpeed: 5,
    backSpeed: 0,
    showCursor: true,
    loop: false,
    onComplete: (self) => {
        onSplashTypeOver()
    }
};

// Scroll Bar
$(window).scroll(function () {
    var scroll = $(window).scrollTop(),
        dh = $(document).height(),
        wh = $(window).height();

    var scrollPercent = (scroll / (dh - wh)) * 100;
    $('#scrollBar').css('height', scrollPercent + '%');
});

// Landing Page Typing Animations
var typed1_options = {
    strings: ['Game Developer.', 'Web Developer.', 'Graphic Designer.', 'Music Producer', 'Computer Enthusiast.'],
    typeSpeed: 30,
    backSpeed: 30,
    startDelay: 1000,
    backDelay: 1000,
    showCursor: true,
    loop: true
};
var typed1 = new Typed('.typed1', typed1_options);

var typed2_options = {
    strings: ['Creator.', 'Discoverer.', 'Learner.', 'Student.'],
    typeSpeed: 30,
    backSpeed: 30,
    startDelay: 1000,
    backDelay: 1000,
    showCursor: true,
    loop: true
};
var typed2 = new Typed('.typed2', typed2_options);

// Landing Page Slider
const left = document.getElementById("left-side");
function handleMove(e) {
    left.style.width = `${(e.clientX / window.innerWidth * 100)}%`;
    left.style.minWidth = `0`;
}

// Event Listeners
window.addEventListener('load', function () {
    document.getElementById('preloader').style.transform = 'translateY(-200vh)';
    setTimeout(() => {
        document.getElementById('preloaderAfter').style.transform = 'translateY(-200vh)';
    }, 150);
    var splashTyped = new Typed('.splashTyped', splashTyped_options);
    if (hrs < 12 && hrs > 6)
        timeOfDay = 'Morning';
    else if (hrs >= 12 && hrs <= 17)
        timeOfDay = 'Afternoon';
    else if (hrs >= 17 && hrs <= 22)
        timeOfDay = 'Evening';
    else timeOfDay = 'Night';
});
document.getElementById('splash').addEventListener('click', function () {
    onSplashTypeOver();
});
document.getElementById('landing').addEventListener('mousemove', function (e) {
    handleMove(e);
});
document.getElementById('landing').addEventListener('touchmove', function (e) {
    handleMove(e.touches[0]);
});
$(".word").on('click', function (event) {
    document.getElementById('hamburger-toggle').checked = false;
});