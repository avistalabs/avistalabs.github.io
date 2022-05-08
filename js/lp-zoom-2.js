function t_initZoom() {
    var t;
    if (!(t = document.querySelectorAll(".t-zoomer__wrapper")).length) {
        (window.tzoominited = !0), (window.tzoomopenonce = !1), (window.isDoubletapScaleAdded = !1);
        var o = document.querySelectorAll('[data-zoomable="yes"]:not(.t-slds__thumbs_gallery):not([data-img-zoom-url=""])'),
            t;
        Array.prototype.forEach.call(o, function (t) {
            t.classList.add("t-zoomable");
        }),
            document.body &&
                document.body.insertAdjacentHTML(
                    "beforeend",
                    '<div class="t-zoomer__wrapper"><div class="t-zoomer__container"></div><div class="t-zoomer__bg"></div><div class="t-zoomer__close" style="display:none;"><svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/><path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/></svg></div></div>'
                ),
            (t = document.querySelector(".t-zoomer__wrapper")) &&
                t.insertAdjacentHTML(
                    "beforeend",
                    '<div class="t-zoomer__scale showed" style="display:none;"><svg class="icon-increase" width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/><path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/><path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/></svg><svg class="icon-decrease" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/><path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/></svg></div>'
                ),
            t_zoom__initFullScreenImgOnClick(),
            t_zoom__closeCarousel();
    }
}
function t_zoom__initFullScreenImgOnClick() {
    var t = document.querySelectorAll(".r");
    Array.prototype.forEach.call(t, function (t) {
        t.addEventListener("click", function (t) {
            for (var o = t.target; o && o !== this; o = o.parentNode)
                if (o.matches('.t-zoomable:not([data-img-zoom-url=""])') || o.matches(".t-slds__thumbs_gallery-zoomable")) {
                    t_zoomHandler.call(o, t);
                    break;
                }
        });
    });
}
function t_zoom__closeCarousel() {
    var t = document.querySelectorAll(".t-zoomer__close, .t-zoomer__bg");
    Array.prototype.forEach.call(t, function (t) {
        t.addEventListener("click", function () {
            var t;
            t_zoom_close(),
                !!document.querySelectorAll(".t-popup_show").length &&
                    document.addEventListener("keydown", function (t) {
                        27 === t.keyCode && window.t_store_closePopup && t_store_closePopup(!1);
                    });
        });
    });
}
function t_zoomHandler() {
    var t = this;
    document.body.classList.add("t-zoomer__show");
    var o = document.querySelectorAll(".t-zoomer__container");
    Array.prototype.forEach.call(o, function (t) {
        t.innerHTML =
            '<div class="t-carousel__zoomed"><div class="t-carousel__zoomer__slides"><div class="t-carousel__zoomer__inner"><div class="t-carousel__zoomer__track"></div></div><div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev"><div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left"><div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div></div></div><div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next"><div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right"><div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div></div></div></div></div>';
    });
    var e = this.closest(".r"),
        r;
    if (!e) return !1;
    if (!document.querySelector(".t-carousel__zoomer__track")) return !1;
    t_zoom__addingImgsIntoCarousel(this);
    var n = document.querySelector(".t-zoomer__close");
    n && (n.style.display = "flex"),
        t_zoom_setModalColor(e),
        t_zoom__createAndLoopSlider(this),
        t_zoom__getEventOnBtn(),
        t_zoom__closeZoomOnKeyup(),
        document.body.classList.add("t-zoomer__show_fixed"),
        t_zoom__initSingleZoom(),
        t_zoom__setEventOnZoomerInner(),
        t_zoom_checkForScale(),
        t_zoom_lockScroll(),
        t_zoom_initSwipe(),
        t_zoom_initCloseSwipe(),
        t_zoom_initResizeListener(),
        (window.tzoomopenonce = !0),
        t_zoom__initEventsonMobile();
}
function t_zoom_initSwipe() {
    var t = document.querySelectorAll(".t-carousel__zoomer__item"),
        o = document.querySelector(".t-zoomer__wrapper");
    if (t.length > 1) {
        var e = new Hammer(o, { domEvents: !0, inputClass: Hammer.TouchInput, cssProps: { touchCollout: "default" }, recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]] }),
            r = null,
            n = !1;
        window.tzoomopenonce ||
            (e.on("panstart", function () {
                var t = document.querySelector(".t-carousel__zoomer__track"),
                    e;
                "y" !== t.getAttribute("data-on-transition") ? t && ((r = t.getBoundingClientRect().left), (t.style.transition = "none")) : (r = null), (n = t_zoom__isScaled(o));
            }),
            e.on("panmove", function (t) {
                var e = document.querySelector(".t-carousel__zoomer__track"),
                    a = e.getAttribute("data-on-transition"),
                    i = o.getAttribute("data-on-drag"),
                    l;
                if ("y" !== a && "y" !== i && 1 === t.maxPointers && !n && (Math.abs(t.deltaX) > 40 && e.setAttribute("data-on-drag", "y"), r)) {
                    var c = r + t.deltaX;
                    e.style.transform = "translateX(" + c + "px)";
                }
            }),
            e.on("panend", function (e) {
                var r = document.querySelector(".t-carousel__zoomer__track");
                r.setAttribute("data-on-drag", "");
                var a = r.getAttribute("data-on-transition"),
                    i = o.getAttribute("data-on-drag");
                if ("y" !== a && "y" !== i && 1 === e.maxPointers && !n) {
                    r.style.transition = "";
                    var l = Math.abs(e.velocityX),
                        c = r.offsetLeft,
                        s = t[0].offsetWidth,
                        _ = r.querySelector(".t-carousel__zoomer__item.active").offsetLeft,
                        d,
                        u = (s - Math.abs(c + _)) / l / 1e3;
                    u > 0.6 ? (u = 0.6) : u < 0.2 && (u = 0.2),
                        (r.style.transitionDuration = u + "s"),
                        e.velocityX < -0.5 || e.deltaX < -80
                            ? (t_zoom_unscale(), t_zoom_showSlide("next"), t_zoom_checkForScale())
                            : e.velocityX > 0.5 || e.deltaX > 80
                            ? (t_zoom_unscale(), t_zoom_showSlide("prev"), t_zoom_checkForScale())
                            : t_zoom_showSlide();
                }
            }));
    }
}
function t_zoom__initEventsonMobile() {
    if (window.isMobile) {
        t_zoom_setHideControlsTimer();
        var t = document.querySelector(".t-zoomer__wrapper"),
            o = ["touchstart", "touchmove", "touchend", "mousemove"];
        Array.prototype.forEach.call(o, function (o) {
            t.addEventListener(o, t_zoom_setHideControlsTimer);
        });
    }
}
function t_zoom__initSingleZoom() {
    var t;
    if (1 === document.querySelectorAll(".t-carousel__zoomer__item").length) {
        var o = document.querySelectorAll(".t-carousel__zoomer__control");
        Array.prototype.forEach.call(o, function (t) {
            t.style.display = "none";
        });
    }
}
function t_zoom__closeZoomOnKeyup() {
    "undefined" != typeof jQuery && $(document).unbind("keydown"), (document.onkeydown = null);
    var t = !!document.querySelectorAll(".t-popup_show").length;
    document.onkeydown = function (o) {
        switch (o.keyCode) {
            case 37:
                t_zoom__setEventOnBtn("prev");
                break;
            case 39:
                t_zoom__setEventOnBtn("next");
                break;
            case 27:
                t_zoom_close(),
                    t &&
                        (document.onkeydown = function (t) {
                            27 === t.keyCode && t_store_closePopup(!1);
                        });
        }
    };
}
function t_zoom__setEventOnZoomerInner() {
    var t = document.querySelector(".t-carousel__zoomer__inner");
    t.addEventListener("click", function () {
        if (window.isMobile) return !1;
        t.classList.contains("scale-active") ? t_zoom_unscale() : t_zoom_close();
    });
}
function t_zoom__getEventOnBtn() {
    var t = [
        { name: "right", move: "next" },
        { name: "left", move: "prev" },
    ];
    Array.prototype.forEach.call(t, function (t) {
        var o;
        document.querySelector(".t-carousel__zoomer__control_" + t.name).addEventListener("click", function () {
            t_zoom__setEventOnBtn(t.move);
        });
    });
}
function t_zoom__setEventOnBtn(t) {
    var o = document.querySelector(".t-carousel__zoomer__track"),
        e = document.querySelector(".t-zoomer__wrapper"),
        r = o.getAttribute("data-on-transition"),
        n = e.getAttribute("data-on-drag");
    "y" !== r &&
        "y" !== n &&
        (t_zoom_unscale(),
        setTimeout(function () {
            t_zoom_showSlide(t), t_zoom_checkForScale();
        }));
}
function t_zoom__addingImgsIntoCarousel(t) {
    var o = t.closest(".r"),
        e = o.querySelectorAll(".t-zoomable:not(.t-slds__thumbs_gallery):not(.tn-atom__slds-img)");
    if (o.querySelectorAll(".t-slds").length) {
        var r = t.closest(".t-slds");
        r && (e = r.querySelectorAll(".t-zoomable:not(.t-slds__thumbs_gallery)"));
    }
    var n = document.querySelector(".t-carousel__zoomer__track");
    Array.prototype.forEach.call(e, function (t) {
        var o = t.getAttribute("data-img-zoom-url"),
            e = "",
            r = "",
            a = "",
            i = "",
            l = o ? o.split(",") : "";
        ("IMG" !== t.nodeName && "DIV" !== t.nodeName) || ((e = t.getAttribute("title") || ""), (r = t.getAttribute("data-img-zoom-descr") || "")),
            e && (a = '<div class="t-zoomer__title t-name t-descr_xxs">' + e + "</div>"),
            r && (i = '<div class="t-zoomer__descr t-descr t-descr_xxs">' + r + "</div>"),
            n.insertAdjacentHTML(
                "beforeend",
                '<div class="t-carousel__zoomer__item"><div class="t-carousel__zoomer__wrapper"><img class="t-carousel__zoomer__img" src="' + l + '"></div><div class="t-zoomer__comments">' + a + i + "</div></div>"
            );
    });
}
function t_zoom__createAndLoopSlider(t) {
    var o = document.querySelector(".t-carousel__zoomer__track"),
        e = document.querySelector(".t-zoomer__wrapper"),
        r = document.querySelectorAll(".t-carousel__zoomer__item");
    if (e && r.length) {
        var n = e.offsetHeight - r[0].offsetHeight;
        Array.prototype.forEach.call(r, function (t) {
            var o = t.querySelector(".t-carousel__zoomer__img"),
                e = o.getAttribute("src"),
                r = t.querySelector(".t-zoomer__comments"),
                a = r.querySelector(".t-zoomer__title"),
                i = r.querySelector(".t-zoomer__descr"),
                l = r.offsetHeight;
            a || i || (r.style.padding = 0), (r.style.height = l + "px"), (o.style.maxHeight = "calc(100vh - " + (l + n) + "px"), e && -1 !== e.indexOf(".svg") && (o.style.width = window.innerWidth + "px");
            var c = document.querySelectorAll(".t-carousel__zoomer__arrow__wrapper");
            Array.prototype.forEach.call(c, function (t) {
                t.style.top = "calc(50% - " + l / 2 + "px)";
            });
        });
        var a = t.getAttribute("data-img-zoom-url"),
            i = !!a && document.querySelector('.t-carousel__zoomer__img[src="' + a + '"]'),
            l = !!i && i.closest(".t-carousel__zoomer__item");
        Array.prototype.forEach.call(r, function (t, o) {
            t.setAttribute("data-zoomer-slide-number", o);
        }),
            r.length > 1 && t_zoom_loopSlider();
        var c = !!l && l.offsetLeft;
        l &&
            (l.classList.add("active"),
            (o.style.transition = "none"),
            (o.style.transform = "translateX(" + -c + "px)"),
            setTimeout(function () {
                o.style.transition = "";
            }));
    }
}
function t_zoom_showSlide(t) {
    var o = document.querySelector(".t-carousel__zoomer__track"),
        e = o.querySelectorAll(".t-carousel__zoomer__item"),
        r = o.querySelector(".t-carousel__zoomer__item.active"),
        n = 0;
    switch (
        (Array.prototype.forEach.call(e, function (t, o) {
            t === r && (n = o);
        }),
        t)
    ) {
        case "next":
            (n = (n + 1) % e.length), o.setAttribute("data-on-transition", "y");
            break;
        case "prev":
            (n = (e.length + (n - 1)) % e.length), o.setAttribute("data-on-transition", "y");
    }
    var a = e[n].offsetLeft;
    r.classList.remove("active"), e[n].classList.add("active"), (o.style.transform = "translateX(" + -a + "px");
}
function t_zoom_transitForLoop(t) {
    var o = document.querySelector(".t-carousel__zoomer__track"),
        e = document.querySelectorAll(".t-carousel__zoomer__item"),
        r,
        n;
    if (!t) return 1;
    "start" === t && (r = e.length - 2),
        "end" === t && (r = 1),
        (n = e[r].offsetLeft),
        Array.prototype.forEach.call(e, function (t, o) {
            o === r ? t.classList.add("active") : t.classList.remove("active");
        }),
        (o.style.transition = "none"),
        (o.style.transform = "translateX(" + -n + "px)"),
        setTimeout(function () {
            o.style.transition = "";
        });
}
function t_zoom_loopSlider() {
    var t = document.querySelector(".t-carousel__zoomer__track"),
        o = t.querySelectorAll(".t-carousel__zoomer__item"),
        e = o[0].cloneNode(!0),
        r = o[o.length - 1].cloneNode(!0);
    e.classList.remove("active"), r.classList.remove("active"), t.insertBefore(r, t.firstChild), t.appendChild(e);
    var n = (o = t.querySelectorAll(".t-carousel__zoomer__item")).length,
        a = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"];
    Array.prototype.forEach.call(a, function (e) {
        t.addEventListener(e, function () {
            var e = 0;
            Array.prototype.forEach.call(o, function (t, o) {
                t.classList.contains("active") && (e = o);
            }),
                0 === e && t_zoom_transitForLoop("start"),
                e === n - 1 && t_zoom_transitForLoop("end"),
                t.setAttribute("data-on-transition", "");
        });
    });
}
function t_zoom_initCloseSwipe() {
    var t = document.querySelector(".t-zoomer__wrapper"),
        o = document.querySelector(".t-carousel__zoomer__track"),
        e = !1,
        r,
        n = new Hammer(t, { domEvents: !0, inputClass: Hammer.TouchInput, cssProps: { touchCollout: "default" }, recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]] });
    n.on("panstart", function () {
        (r = t.offsetTop), (t.style.position = "none"), (e = t_zoom__isScaled(t));
    }),
        n.on("panmove", function (n) {
            var a = Math.abs(n.deltaY);
            if (("y" !== o.getAttribute("data-on-drag") || "y" === t.getAttribute("data-on-drag")) && ((n.angle > -120 && n.angle < -60) || (n.angle < 120 && n.angle > 60)) && 1 === n.maxPointers && !e) {
                a > 40 && t.setAttribute("data-on-drag", "y");
                var i = r + n.deltaY;
                t.style.transform = "translateY(" + i + "px)";
            }
        }),
        n.on("panend", t_zoom_closeSwipeHandler);
}
function t_zoom_closeSwipeHandler(t) {
    var o = document.querySelector(".t-zoomer__wrapper"),
        e = 300,
        r = t_zoom__isScaled(o);
    (o.style.transition = "transform 300ms ease-out"),
        Math.abs(t.deltaY) < 40 && (o.style.transform = ""),
        "y" !== o.getAttribute("data-on-drag") ||
            1 !== t.maxPointers ||
            r ||
            (t.deltaY < -200 || t.velocityY < -0.3
                ? ((o.style.transform = "translateY(-100vh)"),
                  setTimeout(function () {
                      t_zoom_close(), (o.style.transform = "");
                  }, 300))
                : t.deltaY > 200 || t.velocityY > 0.3
                ? ((o.style.transform = "translateY(100vh)"),
                  setTimeout(function () {
                      t_zoom_close(), (o.style.transform = "");
                  }, 300))
                : (o.style.transform = "")),
        o.setAttribute("data-on-drag", "");
}
function t_zoom_checkForScale() {
    var t = !1,
        o = document.querySelector(".t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)"),
        e = window.innerWidth,
        r = window.innerHeight;
    if (
        o &&
        ((o.onload = function () {
            if (!t) return r < o.naturalHeight || e < o.naturalWidth ? (o.classList.add("loaded"), window.isDoubletapScaleAdded || t_zoom_doubletapScaleInit(), void t_zoom_scale_init()) : void 0;
        }),
        o.complete && !t)
    ) {
        if (((t = !0), r < o.naturalHeight || e < o.naturalWidth)) return window.isDoubletapScaleAdded || t_zoom_doubletapScaleInit(), void t_zoom_scale_init();
        document.querySelector(".t-zoomer__scale").style.display = "";
    }
}
function t_zoom_scale_init() {
    var t = document.querySelector(".t-zoomer__wrapper"),
        o = document.querySelector(".t-zoomer__scale");
    (o.style.display = "block"),
        "y" !== o.getAttribute("data-zoom-scale-init") &&
            (o.setAttribute("data-zoom-scale-init", "y"),
            t.addEventListener(
                "click",
                function (e) {
                    for (
                        var r = document.querySelector(".t-carousel__zoomer__item.active .t-carousel__zoomer__img"),
                            n = document.querySelector(".t-carousel__zoomer__track"),
                            a = document.querySelector(".t-carousel__zoomer__inner"),
                            i = e.target;
                        i && i != this;
                        i = i.parentNode
                    )
                        if (i === o) {
                            n.setAttribute("data-on-transition", ""),
                                (n.style.transition = "none"),
                                (n.style.transform = "none"),
                                (r.style.maxHeight = ""),
                                t.classList.contains("scale-active")
                                    ? t_zoom_unscale()
                                    : (t.classList.add("scale-active"), a.classList.add("scale-active"), window.isMobile ? t_zoom_mobileZoomPositioningInit(r) : t_zoom_desktopZoomPositioningInit(r, e));
                            break;
                        }
                },
                !1
            ));
}
function t_zoom_doubletapScaleInit() {
    window.isDoubletapScaleAdded = !0;
    var t = document.querySelector(".t-zoomer__wrapper"),
        o;
    new Hammer(t, { domEvents: !0, inputClass: Hammer.TouchInput, cssProps: { touchCollout: "default" }, recognizers: [[Hammer.Tap]] }).on("tap", function (o) {
        if (2 === o.tapCount && document.body.classList.contains("t-zoomer__show") && !o.target.closest(".t-carousel__zoomer__control")) {
            var e = document.querySelector(".t-carousel__zoomer__item.active .t-carousel__zoomer__img"),
                r = document.querySelector(".t-carousel__zoomer__inner"),
                n = document.querySelector(".t-carousel__zoomer__track");
            (e.style.maxHeight = ""),
                (n.style.transition = "none"),
                (n.style.transform = "none"),
                t.classList.contains("scale-active") ? t_zoom_unscale() : (t.classList.add("scale-active"), r.classList.add("scale-active"), t_zoom_mobileZoomPositioningInit(e));
        }
    });
}
function t_zoom_desktopZoomPositioningInit(t, o) {
    var e = (window.innerWidth - t.offsetWidth) / 2,
        r = (window.innerHeight - t.offsetHeight) / 2,
        n,
        a,
        i,
        l;
    function c(t, o) {
        (i = (100 * (void 0 !== t.touches ? t.touches[0].clientX : t.clientX)) / window.innerWidth), (l = (-i * (o.offsetWidth - window.innerWidth)) / 100), (o.style.left = l + "px");
    }
    function s(t, o) {
        (n = (100 * (void 0 !== t.touches ? t.touches[0].clientY : t.clientY)) / window.innerHeight), (a = (-n * (o.offsetHeight - window.innerHeight)) / 100), (o.style.top = a + "px");
    }
    (t.style.left = e + "px"),
        (t.style.top = r + "px"),
        window.innerWidth < t.naturalWidth && window.innerHeight < t.naturalHeight
            ? ((i = (100 * o.clientX) / window.innerWidth),
              (l = (-i * (t.offsetWidth - window.innerWidth)) / 100),
              (n = (100 * o.clientY) / window.innerHeight),
              (a = (-n * (t.offsetHeight - window.innerHeight)) / 100),
              (t.style.left = l + "px"),
              (t.style.top = a + "px"),
              window.isMobile
                  ? (t.ontouchmove = function (o) {
                        c(o, t), s(o, t);
                    })
                  : (t.onmousemove = function (o) {
                        c(o, t), s(o, t);
                    }))
            : window.innerWidth < t.naturalWidth
            ? ((i = (100 * o.clientX) / window.innerWidth),
              (l = (-i * (t.offsetWidth - window.innerWidth)) / 100),
              (t.style.left = l + "px"),
              window.isMobile
                  ? (t.ontouchmove = function (o) {
                        c(o, t);
                    })
                  : (t.onmousemove = function (o) {
                        c(o, t);
                    }))
            : window.innerHeight < t.naturalHeight &&
              ((n = (100 * o.clientY) / window.innerHeight),
              (a = (-n * (t.offsetHeight - window.innerHeight)) / 100),
              (t.style.top = a + "px"),
              window.isMobile
                  ? (t.ontouchmove = function (o) {
                        s(o, t);
                    })
                  : (t.onmousemove = function (o) {
                        s(o, t);
                    }));
}
function t_zoom_mobileZoomPositioningInit(t) {
    var o = (window.innerWidth - t.offsetWidth) / 2,
        e = (window.innerHeight - t.offsetHeight) / 2;
    (t.style.left = o + "px"), (t.style.top = e + "px");
    var r = { x: 0, y: 0 },
        n = {},
        a = {};
    (t.ontouchstart = function (t) {
        n = t_zoom_getTouchEventXY(t);
    }),
        (t.ontouchmove = function (i) {
            var l = t_zoom_getTouchEventXY(i),
                c = 1.5,
                s = 1.5 * (l.x - n.x),
                _ = 1.5 * (l.y - n.y);
            (a.x = r.x + s), (a.y = r.y + _), a.x > -o && (a.x = -o), a.x < o && (a.x = o), a.y > -e && (a.y = -e), a.y < e && (a.y = e), (t.style.transform = "translate(" + a.x + "px, " + a.y + "px)");
        }),
        (t.ontouchend = function () {
            (r.x = a.x), (r.y = a.y);
        }),
        (t.ontouchcancel = function () {
            (r.x = a.x), (r.y = a.y);
        });
}
function t_zoom_getTouchEventXY(t) {
    var o = { x: 0, y: 0 };
    if ("touchstart" == t.type || "touchmove" == t.type || "touchend" == t.type || "touchcancel" == t.type) {
        var e = t.touches[0] || t.changedTouches[0];
        (o.x = e.pageX), (o.y = e.pageY);
    }
    return o;
}
function t_zoom_close() {
    t_zoom_unscale(), document.body.classList.remove("t-zoomer__show"), document.body.classList.remove("t-zoomer__show_fixed"), (document.onkeydown = null), t_zoom_unlockScroll();
}
function t_zoom_unscale() {
    var t = document.querySelectorAll(".t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner");
    Array.prototype.forEach.call(t, function (t) {
        t.classList.remove("scale-active");
    });
    var o = document.querySelector(".t-carousel__zoomer__item.active"),
        e = document.querySelector(".t-carousel__zoomer__track"),
        r = document.querySelector(".t-zoomer__wrapper");
    if (o) {
        var n = o.querySelector(".t-carousel__zoomer__img"),
            a = o.querySelector(".t-zoomer__comments");
        if (a && r) {
            var i = r.offsetHeight - o.offsetHeight,
                l = a.offsetHeight;
            (n.onmousemove = null), (n.ontouchmove = null), (n.style.transform = ""), (n.style.left = ""), (n.style.top = ""), (n.style.maxHeight = "calc(100vh - " + (i + l) + "px)");
        }
    }
    if (void 0 !== o.offsetLeft && void 0 !== o.offsetTop) {
        var c = o.offsetLeft;
        e.style.transform = "translateX(" + -c + "px)";
    }
    setTimeout(function () {
        e.style.transition = "";
    });
}
function t_zoom_lockScroll() {
    var t = /(android)/i.test(navigator.userAgent);
    if (((window.isiOS && !window.MSStream) || t) && ((window.isiOSVersion && window.isiOSVersion) || t) && (11 === window.isiOSVersion[0] || t) && !document.body.classList.contains("t-body_scroll-locked")) {
        var o = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        document.body.classList.add("t-body_scroll-locked"), (document.body.style.top = "-" + o + "px"), document.body.setAttribute("data-popup-scrolltop", o);
    }
}
function t_zoom_unlockScroll() {
    var t = /(android)/i.test(navigator.userAgent);
    if (((window.isiOS && !window.MSStream) || t) && ((window.isiOSVersion && window.isiOSVersion) || t) && (11 === window.isiOSVersion[0] || t) && document.body.classList.contains("t-body_scroll-locked")) {
        var o = document.body.getAttribute("data-popup-scrolltop");
        document.body.classList.remove("t-body_scroll-locked"), (document.body.style.top = ""), document.body.removeAttribute("data-popup-scrolltop"), window.scrollTo(0, o);
    }
}
function t_zoom_initResizeListener() {
    var t = t_throttle(t_zoom_resizeHandler, 300);
    window.addEventListener("resize", t);
}
function t_zoom_resizeHandler() {
    var t = document.querySelector(".t-carousel__zoomer__track"),
        o = t.querySelector(".t-carousel__zoomer__item.active").offsetLeft;
    t.style.transform = "translateX(" + -o + "px)";
}
function t_zoom_onFuncLoad(t, o, e) {
    "function" == typeof window[t]
        ? o()
        : setTimeout(function r() {
              if ("function" != typeof window[t]) {
                  if ("complete" === document.readyState && "function" != typeof window[t]) throw new Error(t + " is undefined");
                  setTimeout(r, e || 100);
              } else o();
          });
}
function t_zoom_setModalColor(t) {
    var o = "#ffffff",
        e = "#000000",
        r = t.getAttribute("data-bg-color"),
        n = r || "#ffffff",
        a;
    (n = t_zoom_hexToRgb(n)),
        document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") &&
            document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) &&
            t &&
            (n = t.style.backgroundColor);
    var i = document.querySelector(".t-zoomer__container"),
        l = document.querySelectorAll(".t-zoomer__wrapper svg"),
        c = document.querySelectorAll(".t-zoomer__close, .t-zoomer__scale"),
        s = i.querySelectorAll(".t-carousel__zoomer__arrow__wrapper"),
        _,
        d,
        u = document.querySelectorAll(".t-zoomer__title, .t-zoomer__descr"),
        m = "black" === t_zoom_luma_rgb(n) ? "#000000" : "#ffffff";
    "#000000" === m
        ? ((_ = "#ffffff"),
          (d = "rgba(1, 1, 1, 0.3)"),
          Array.prototype.forEach.call(s, function (t) {
              t.classList.add("t-carousel__zoomer__arrow__wrapper_dark");
          }))
        : ((_ = "#000000"),
          (d = "rgba(255, 255, 255, 0.3)"),
          Array.prototype.forEach.call(s, function (t) {
              t.classList.remove("t-carousel__zoomer__arrow__wrapper_dark");
          })),
        Array.prototype.forEach.call(c, function (t) {
            t.style.background = d;
        }),
        (i.style.backgroundColor = m),
        (i.style.color = _),
        Array.prototype.forEach.call(l, function (t) {
            "none" === t.getAttribute("fill") ? t.setAttribute("fill", "none") : t.setAttribute("fill", _);
            var o = t.querySelectorAll("path");
            o.length > 0 &&
                Array.prototype.forEach.call(o, function (t) {
                    t.getAttribute("stroke") && t.setAttribute("stroke", _), t.getAttribute("fill") && t.setAttribute("fill", _);
                });
        }),
        Array.prototype.forEach.call(u, function (t) {
            t.style.color = _;
        });
}
function t_zoom_luma_rgb(t) {
    var o = Array.isArray(t);
    if (void 0 === t) return "black";
    if (0 !== t.indexOf("rgb") && !o) return "black";
    var e = o ? t : t.split("(")[1].split(")")[0].split(",");
    return e.length < 3 ? "black" : 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2] < 128 ? "black" : "white";
}
function t_zoom_hexToRgb(t) {
    var o = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    t = t.replace(o, function (t, o, e, r) {
        return o + o + e + e + r + r;
    });
    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),
        r = e ? { r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16) } : null;
    return e ? [r.r, r.g, r.b] : null;
}
function t_zoom_setHideControlsTimer() {
    var t = document.querySelectorAll(".t-carousel__zoomer__arrow__wrapper, .t-zoomer__scale");
    Array.prototype.forEach.call(t, function (t) {
        t.classList.remove("t-zoomer__hide-animation");
    }),
        setTimeout(function () {
            Array.prototype.forEach.call(t, function (t) {
                t.classList.add("t-zoomer__hide-animation");
            });
        });
}
function t_zoom__isScaled(t) {
    return (window.visualViewport && 1 !== window.visualViewport.scale) || t.classList.contains("scale-active");
}
"loading" !== document.readyState
    ? window.tzoominited || t_zoom_onFuncLoad("t_initZoom", t_initZoom)
    : document.addEventListener("DOMContentLoaded", function () {
          window.tzoominited || t_zoom_onFuncLoad("t_initZoom", t_initZoom);
      }),
    Element.prototype.matches ||
        (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector),
    Element.prototype.closest ||
        (Element.prototype.closest = function (t) {
            for (var o = this; o && 1 === o.nodeType; ) {
                if (Element.prototype.matches.call(o, t)) return o;
                o = o.parentElement || o.parentNode;
            }
            return null;
        });
