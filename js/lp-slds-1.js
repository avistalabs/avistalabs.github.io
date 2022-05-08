function t_sldsInit(t, s) {
    var e = "object" == typeof t ? t : $("#rec" + t);
    if (0 === e.length) return !1;
    for (
        var a = e.find(".t-slds__item:not(.t-slds__item_dummy)"),
            d = a.length,
            i = a.filter(":first"),
            r = a.filter(":last"),
            l = $(window).width(),
            n = e.find(".t-slds__items-wrapper"),
            o = n.attr("data-slider-items-in-row") || 0,
            _ = n.attr("data-slider-with-cycle"),
            c = parseFloat(n.attr("data-slider-transition")),
            f = n.attr("data-slider-stop"),
            p = 0;
        p < d;
        p++
    )
        $(a[p]).attr("data-slide-index", p + 1);
    if ((c || 0 === c || (c = 300), "true" == f)) return !1;
    isNaN(c) && n.attr("data-slider-transition", "300"), n.hasClass("t-slds_animated-fast") || n.hasClass("t-slds_animated-slow") || n.hasClass("t-slds_animated-none") || n.addClass("t-slds_animated-fast");
    var m = o;
    t_slds_setItemsInRow(t), t_slds_changeImageUrl(t);
    var u = window.navigator.userAgent,
        w = u.indexOf("MSIE"),
        f = "",
        c = !1;
    0 < w && ((8 != (f = parseInt(u.substring(w + 5, u.indexOf(".", w)))) && 9 != f) || (c = !0)),
        !0 === c && (n.removeClass("t-slds_animated-fast").removeClass("t-slds_animated-slow").addClass("t-slds_animated-none t-slds_ie").attr("data-slider-correct-height", "true"), n.attr("data-slider-items-in-row", 1)),
        "true" == n.attr("data-slider-initialized") && (d -= 2),
        n.attr("data-slider-initialized", "true"),
        n.attr("data-slider-totalslides", d),
        n.attr("data-slider-pos") || n.attr("data-slider-pos", 1),
        n.attr("data-slider-curr-pos", 1),
        n.attr("data-slider-cycle", ""),
        n.attr("data-slider-animated", "");
    (u = !1), (w = i.find('[data-zoomable="yes"]')), (f = r.find('[data-zoomable="yes"]'));
    if (
        ((w || f) && ((u = !0), w.removeClass("t-zoomable").removeAttr("data-zoomable"), f.removeClass("t-zoomable").removeAttr("data-zoomable")),
        0 == e.find(".t-slds__item[data-slide-index=0]").length && (i.before(r.clone(!0).attr("data-slide-index", "0")), i.parent().find("[data-slide-index=0]").find("[field]").removeAttr("field")),
        0 == e.find(".t-slds__item[data-slide-index=" + (d + 1) + "]").length &&
            (r
                .after(
                    i
                        .clone(!0)
                        .attr("data-slide-index", d + 1)
                        .removeClass("t-slds__item_active")
                )
                .addClass("t-slds__item-loaded"),
            0 < o && "true" === _))
    )
        for (var h = i, v = r, p = 0; p < o - 1; p++) {
            var y = h
                .next()
                .clone(!0)
                .attr("data-slide-index", d + p + 1);
            v.next().after(y), (v = v.next()), (h = h.next());
        }
    u && (w.addClass("t-zoomable").attr("data-zoomable", "yes"), f.addClass("t-zoomable").attr("data-zoomable", "yes")),
        (o = n.attr("data-slider-items-in-row") || 0),
        "false" === _ && d - o <= 0 ? e.find(".t-slds__arrow_wrapper-right").css("display", "none") : e.find(".t-slds__arrow_wrapper-right").css("display", ""),
        t_slds_SliderWidth(t),
        "true" == n.attr("data-slider-correct-height") && t_slds_SliderHeight(t),
        t_slds_SliderArrowsHeight(t),
        t_slds_ActiveSlide(t, 1, d, s),
        t_slds_initSliderControls(t, s),
        t_slds_ActiveCaption(t, 1, d),
        0 < n.attr("data-slider-timeout") && t_slds_initAutoPlay(t, 1, d, s),
        e.find(".t-slds__item-loaded").length < d + 2 && t_slds_UpdateImages(t, 1),
        "yes" == n.attr("data-slider-arrows-nearpic") && t_slds_positionArrows(t),
        !0 !== c &&
            t_slds_onHammerLoad("Hammer", function () {
                t_slds_initSliderSwipe(t, d, l);
            }),
        e.find(".t-slds").css("visibility", ""),
        e.off("displayChanged"),
        e.on(
            "displayChanged",
            t_throttle(function () {
                t_slds_setItemsInRow(t, m), t_slds_updateSlider(t), t_slds_positionArrows(t);
            })
        ),
        e.trigger("sliderIsReady"),
        $(window).bind(
            "resize",
            t_throttle(function () {
                setTimeout(function () {
                    t_slds_setItemsInRow(t, m), t_slds_updateSlider(t), t_slds_positionArrows(t);
                }, 100);
            })
        ),
        $(window).on("load", function () {
            "true" == n.attr("data-slider-correct-height") && t_slds_UpdateSliderHeight(t), t_slds_UpdateSliderArrowsHeight(t);
        });
}
function t_slds_setItemsInRow(t, s) {
    var e,
        t = ("object" == typeof t ? t : $("#rec" + t)).find(".t-slds__items-wrapper");
    (t.attr("data-slider-items-in-row") || 0) && (window.innerWidth <= 960 && (e = 2), window.innerWidth <= 640 && (e = 1), 960 < window.innerWidth && (e = s)), e && t.attr("data-slider-items-in-row", e);
}
function t_slds_initSliderControls(i, r) {
    var l = "object" == typeof i ? i : $("#rec" + i),
        n = l.find(".t-slds__items-wrapper"),
        t = (0 < (n.attr("data-slider-items-in-row") || 0) ? l.find(".t-slds__container .t-slds__item") : l.find(".t-slds__container")).width();
    l.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none");
    if ("true" == n.attr("data-slider-stop")) return !1;
    n.css({ transform: "translateX(-" + t + "px)" }),
        l.find(".t-slds__arrow_wrapper").click(function () {
            var t = t_slds_getCurrentTranslate(l),
                s = n.attr("data-slider-animated"),
                e = parseFloat(n.attr("data-slider-pos")),
                a = parseFloat(n.attr("data-slider-totalslides")),
                d = "";
            "" == s &&
                (n.attr("data-slider-animated", "yes"),
                "left" === $(this).attr("data-slide-direction") ? ("false" == n.attr("data-slider-with-cycle") && 1 == e ? (e = 1) : e--) : "false" == n.attr("data-slider-with-cycle") && e == a ? (e = a) : e++,
                n.attr("data-slider-pos", e),
                (e != a + 1 && 0 != e) || (d = "yes"),
                n.attr("data-slider-cycle", d),
                t_slideMoveWithoutAnimation(i, !1, r, t)),
                t_slds_updateSlider(l);
        }),
        l.find(".t-slds__bullet").click(function () {
            var t = t_slds_getCurrentTranslate(l),
                s = parseFloat($(this).attr("data-slide-bullet-for"));
            n.attr("data-slider-pos", s), t_slideMoveWithoutAnimation(i, !1, r, t), t_slds_updateSlider(l);
        });
}
function t_slds_animate(a, d, i) {
    var r = performance.now();
    requestAnimationFrame(function t(s) {
        var e = (s - r) / i;
        1 < e && (e = 1);
        s = a(e);
        d(s),
            e < 1
                ? requestAnimationFrame(t)
                : ("y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy")) ||
                  t_slds_onHammerLoad("t_lazyload_update", function () {
                      t_lazyload_update();
                  });
    });
}
function t_slide_MoveAnimation(s, t, e, a) {
    var d, i;
    s[0] &&
        ((s[0].style.transition = "height ease-in-out .5s, transform ease-in-out 0s"),
        (e = -Math.abs(t * e)),
        (d = -parseInt(s[0].style.transform.match(/\d+/)[0])),
        0 != (i = d - e) &&
            t_slds_animate(
                function (t) {
                    return t;
                },
                function (t) {
                    s[0].style.transform = "translateX(" + (d - i * t) + "px)";
                },
                a
            ));
}
function t_slideMoveWithoutAnimation(t, s, e) {
    var a,
        d = "object" == typeof t ? t : $("#rec" + t),
        i = d.find(".t-slds__items-wrapper"),
        r = parseFloat(i.attr("data-slider-pos")),
        l = (0 < (i.attr("data-slider-items-in-row") || 0) ? d.find(".t-slds__container .t-slds__item") : d.find(".t-slds__container")).width(),
        n = parseFloat(i.attr("data-slider-totalslides")),
        o = d.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none");
    n + 1 < r && (r = 1),
        o &&
            ((n = d.find(".t-slds__item_active")),
            (a = d.find(".t-slds__item")),
            d.find(".t-slds__item_dummy").stop(!0, !0),
            a.stop(!0, !0),
            0 === d.find(".t-slds__item_dummy").length &&
                ((r = n
                    .clone()
                    .addClass("t-slds__item_dummy")
                    .css({ position: "absolute", left: l * r + "px" })),
                a.css("opacity", 0),
                r.animate({ opacity: 0 }, function () {
                    $(this).remove();
                }),
                setTimeout(function () {
                    a.animate({ opacity: 1 });
                }, 50)),
            i.addClass("t-slds_animated-cancel")),
        t_slideMove(t, s, e),
        o && i.removeClass("t-slds_animated-cancel");
}
function t_slideMoveInstantly(t, s, e) {
    var a = "object" == typeof t ? t : $("#rec" + t),
        d = a.find(".t-slds__items-wrapper"),
        i = parseFloat(d.attr("data-slider-pos")),
        r = (0 < (d.attr("data-slider-items-in-row") || 0) ? a.find(".t-slds__container .t-slds__item") : a.find(".t-slds__container")).width(),
        l = parseFloat(d.attr("data-slider-totalslides")),
        n = a.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none");
    l + 1 < i && (i = 1),
        n &&
            ((n = a.find(".t-slds__item_active")),
            0 === a.find(".t-slds__item_dummy").length &&
                n
                    .clone()
                    .addClass("t-slds__item_dummy")
                    .css({ position: "absolute", left: r * i + "px" })
                    .appendTo(d)
                    .fadeOut("normal", function () {
                        $(this).remove();
                    })),
        d.addClass("t-slds_animated").addClass("t-slds_animated-cancel"),
        t_slideMove(t, s, e),
        d.removeClass("t-slds_animated").removeClass("t-slds_animated-cancel");
}
function t_slideMove(t, s, e) {
    var a = "object" == typeof t ? t : $("#rec" + t),
        d = a.find(".t-slds__items-wrapper"),
        i = d.attr("data-slider-items-in-row") || 0,
        r = (0 < i ? a.find(".t-slds__container .t-slds__item") : a.find(".t-slds__container")).width(),
        l = parseFloat(d.attr("data-slider-transition")),
        n = parseFloat(d.attr("data-slider-pos")),
        o = parseFloat(d.attr("data-slider-totalslides")),
        _ = (d.attr("data-slider-cycle"), a.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none")),
        c = 0 < d.attr("data-slider-timeout"),
        f = d.attr("data-slider-stop");
    if ((l || 0 === l || (l = 300), o + 1 < n && ((n = 1), d.attr("data-slider-pos", 1)), "true" == f)) return !1;
    "false" == d.attr("data-slider-with-cycle") && (n == o || (1 < i && n == o - i + 1)) ? a.find(".t-slds__arrow_wrapper-right").fadeOut(300) : a.find(".t-slds__arrow_wrapper-right").fadeIn(300),
        "false" == d.attr("data-slider-with-cycle") && 1 == n ? a.find(".t-slds__arrow_wrapper-left").fadeOut(300) : a.find(".t-slds__arrow_wrapper-left").fadeIn(300),
        d.addClass("t-slds_animated"),
        window.isSafariVersion && 13 <= window.isSafariVersion[0] && window.isiOSChrome && !_ ? t_slide_MoveAnimation(d, n, r, l) : d.css({ transform: "translateX(-" + r * n + "px)" }),
        setTimeout(function () {
            d.removeClass("t-slds_animated"),
                d.attr("data-slider-animated", ""),
                "yes" == d.attr("data-slider-cycle") &&
                    (n == o + 1 && (n = 1),
                    0 == n && (n = o),
                    window.isSafariVersion && 13 <= window.isSafariVersion[0] && window.isiOSChrome && !_ ? t_slide_MoveAnimation(d, n, r, 0) : d.css({ transform: "translateX(-" + r * n + "px)" }),
                    !0 !== _ && t_slds_ActiveSlide(t, n, o, e),
                    d.attr("data-slider-pos", n)),
                ("y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy")) ||
                    t_slds_onHammerLoad("t_lazyload_update", function () {
                        t_lazyload_update();
                    }),
                !s && c && t_slds_initAutoPlay(t, n, o, e);
        }, l),
        t_slds_ActiveBullet(t, n, o, e),
        t_slds_ActiveSlide(t, n, o),
        "true" == d.attr("data-slider-correct-height") && t_slds_SliderHeight(t),
        t_slds_SliderArrowsHeight(t),
        t_slds_ActiveCaption(t, n, o),
        a.find(".t-slds__item-loaded").length < o + 2 && t_slds_UpdateImages(t, n),
        d.attr("data-slider-curr-pos", n);
}
function t_slds_updateSlider(t) {
    var s = "object" == typeof t ? t : $("#rec" + t);
    t_slds_SliderWidth(t);
    var e = s.find(".t-slds__items-wrapper"),
        a = e.attr("data-slider-items-in-row") || 0,
        d = (0 < a ? s.find(".t-slds__container .t-slds__item") : s.find(".t-slds__container")).width(),
        i = parseFloat(e.attr("data-slider-pos")),
        r = parseFloat(e.attr("data-slider-totalslides")),
        l = e.attr("data-slider-with-cycle");
    r + 1 < i && ((i = 1), e.attr("data-slider-pos", 1)),
        "false" === l && r - a <= 0 ? s.find(".t-slds__arrow_wrapper-right").css("display", "none") : s.find(".t-slds__arrow_wrapper-right").css("display", ""),
        e.css({ transform: "translateX(-" + d * i + "px)" }),
        "true" == e.attr("data-slider-correct-height") && t_slds_UpdateSliderHeight(t),
        t_slds_UpdateSliderArrowsHeight(t);
}
function t_slds_UpdateImages(t, s) {
    s = ("object" == typeof t ? t : $("#rec" + t)).find('.t-slds__item[data-slide-index="' + s + '"]');
    s.addClass("t-slds__item-loaded"), s.next().addClass("t-slds__item-loaded"), s.prev().addClass("t-slds__item-loaded");
}
function t_slds_ActiveCaption(t, s, e) {
    var a = "object" == typeof t ? t : $("#rec" + t),
        d = a.find(".t-slds__caption"),
        t = a.find('.t-slds__caption[data-slide-caption="' + s + '"]');
    d.removeClass("t-slds__caption-active"), 0 == s ? (t = a.find('.t-slds__caption[data-slide-caption="' + e + '"]')) : s == e + 1 && (t = a.find('.t-slds__caption[data-slide-caption="1"]')), t.addClass("t-slds__caption-active");
}
function t_slds_scrollImages(t, s) {
    (t = "object" == typeof t ? t : $("#rec" + t)), (s = (s < 0 ? "" : "-") + Math.abs(s).toString());
    t.find(".t-slds__items-wrapper").css("transform", "translateX(" + s + "px)");
}
function t_slds_ActiveBullet(t, s, e, a) {
    var d;
    a && a.thumbsbulletGallery && ((i = parseInt(a.storeOptions.popup_opts.columns)), (r = +a.storeOptions.slider_slidesOpts.ratio), (d = t_store_prodPopup_gallery_calcMaxThumbsCount(i, r, 60, 10)));
    var i = "object" == typeof t ? t : $("#rec" + t),
        r = i.find(".t-slds__bullet"),
        t = i.find('.t-slds__bullet[data-slide-bullet-for="' + s + '"]');
    r.removeClass("t-slds__bullet_active"),
        (a && a.thumbsbulletGallery && d <= s && s != e + 1) || (d <= e && 0 == s)
            ? (t = i.find('.t-slds__bullet[data-slide-bullet-for="' + d + '"]'))
            : 0 == s
            ? (t = i.find('.t-slds__bullet[data-slide-bullet-for="' + e + '"]'))
            : s == e + 1 && (t = i.find('.t-slds__bullet[data-slide-bullet-for="1"]')),
        t.addClass("t-slds__bullet_active");
}
function t_slds_ActiveSlide(t, s, e) {
    var a = "object" == typeof t ? t : $("#rec" + t),
        d = a.find(".t-slds__item"),
        i = a.find('.t-slds__item[data-slide-index="' + s + '"]'),
        t = a.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none");
    a.find("iframe").each(function (t, s) {
        s.src &&
            (-1 !== s.src.indexOf("&enablejsapi=1") && s.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"),
            -1 === s.src.indexOf("vimeo") || (-1 === s.src.indexOf("&amp;api=1") && -1 === s.src.indexOf("&api=1")) || s.contentWindow.postMessage('{"method":"pause","value":"true"}', "*"));
    }),
        d.removeClass("t-slds__item_active"),
        0 == s && !1 === t
            ? a.find('.t-slds__item[data-slide-index="' + e + '"]').addClass("t-slds__item_active")
            : 0 == s && !0 === t
            ? (i = a.find('.t-slds__item[data-slide-index="' + e + '"]'))
            : s == e + 1 && !1 === t
            ? a.find('.t-slds__item[data-slide-index="1"]').addClass("t-slds__item_active")
            : s == e + 1 && !0 === t && (i = a.find('.t-slds__item[data-slide-index="1"]')),
        i.addClass("t-slds__item_active");
}
function t_slds_SliderWidth(t) {
    var s = "object" == typeof t ? t : $("#rec" + t),
        e = s.find(".t-slds__container").width(),
        a = s.find(".t-slds__item:not(.t-slds__item_dummy)").length,
        d = s.find(".t-slds__items-wrapper"),
        t = d.attr("data-slider-stop"),
        d = d.attr("data-slider-items-in-row") || 0;
    if ("true" == t) return !1;
    s.find(".t-slds__items-wrapper").width(e * a), window.innerWidth <= 640 ? (d = 1) : window.innerWidth <= 960 && 1 < d && (d = 2);
    e = 1 < d ? e / d : e;
    0 < e && s.find(".t-slds__item").width(e);
}
function t_slds_SliderHeight(t) {
    var s = "object" == typeof t ? t : $("#rec" + t),
        t = s.find(".t-slds__items-wrapper").not('[data-slider-correct-height="false"]'),
        s = s.find(".t-slds__item_active").height();
    0 !== s && t.css("height", s);
}
function t_slds_UpdateSliderHeight(t) {
    var s = "object" == typeof t ? t : $("#rec" + t),
        t = s.find(".t-slds__items-wrapper").not('[data-slider-correct-height="false"]'),
        s = s.find(".t-slds__item_active").height();
    0 !== s && t.css("height", s);
}
function t_slds_SliderArrowsHeight(t) {
    ("object" == typeof t ? t : $("#rec" + t)).find(".t-slds").each(function (t, s) {
        var e = $(s).find(".t-slds__item_active").height();
        0 !== e && $(s).find(".t-slds__arrow_wrapper").css("height", e);
    });
}
function t_slds_UpdateSliderArrowsHeight(t) {
    ("object" == typeof t ? t : $("#rec" + t)).find(".t-slds").each(function (t, s) {
        var e = $(s).find(".t-slds__item_active").height();
        0 !== e && $(s).find(".t-slds__arrow_wrapper").css("height", e);
    });
}
function t_slds_initAutoPlay(d, i, r, l) {
    var a = "object" == typeof d,
        n = a ? d : $("#rec" + d),
        t = n.find(".t-slds"),
        o = n.find(".t-slds__items-wrapper"),
        s = parseFloat(o.attr("data-slider-timeout")),
        _ = "",
        e = o.attr("data-slider-stop"),
        c = (n.find(".t-slds__items-wrapper").hasClass("t-slds_animated-none"), o.attr("data-slider-interval-id"));
    if ((c && clearInterval(c), "true" == e)) return !1;
    window.isMobile ||
        t.hover(
            function () {
                o.attr("data-slider-stopped", "yes");
            },
            function () {
                o.attr("data-slider-stopped", "");
            }
        );
    var f,
        p,
        m = n.offset().top;
    n.outerHeight();
    $(window).resize(
        t_throttle(function () {
            (m = n.offset().top), n.outerHeight();
        })
    ),
        void 0 !== document.hidden
            ? ((f = "hidden"), (p = "visibilitychange"))
            : void 0 !== document.msHidden
            ? ((f = "msHidden"), (p = "msvisibilitychange"))
            : void 0 !== document.webkitHidden && ((f = "webkitHidden"), (p = "webkitvisibilitychange")),
        document.addEventListener(
            p,
            function () {
                var t, s, e;
                document[f]
                    ? o.attr("data-slider-stopped", "yes")
                    : ((t = n.css("display")), (e = (s = $(window).scrollTop()) + $(window).height()), (m = n.offset().top), s < m + n.outerHeight() && m < e && "none" !== t && o.attr("data-slider-stopped", ""));
            },
            !1
        ),
        1 === n.length &&
            $(window).bind(
                "scroll",
                t_throttle(function () {
                    var t = n.css("display"),
                        s = $(window).scrollTop(),
                        e = s + $(window).height();
                    "none" !== t
                        ? ((m = n.offset().top), s < m + n.outerHeight() && m < e ? o.attr("data-slider-stopped", "") : "" === o.attr("data-slider-stopped") && o.attr("data-slider-stopped", "yes"))
                        : a || o.attr("data-slider-stopped", "yes");
                })
            );
    s = setInterval(function () {
        var t = o.attr("data-slider-stopped"),
            s = o.attr("data-slider-autoplay-ignore-hover"),
            e = o.attr("data-slider-touch"),
            a = t_slds_getCurrentTranslate(n);
        "yes" != t &&
            "yes" != s &&
            "yes" != e &&
            ("false" == o.attr("data-slider-with-cycle") && i == r ? (i = r) : i++,
            o.attr("data-slider-pos", i),
            (i != r + 1 && 0 != i) || (_ = "yes"),
            t_slideMoveWithoutAnimation(d, !0, l, a),
            t_slds_updateSlider(d),
            "yes" == _ && (i == r + 1 && (i = 1), 0 == i && (i = r), o.attr("data-slider-pos", i)),
            o.attr("data-slider-cycle", _));
    }, s);
    o.attr("data-slider-interval-id", s);
}
function t_slds_positionArrows(t) {
    var s = "object" == typeof t ? t : $("#rec" + t),
        e = s.find(".t-slds__arrow_container-outside"),
        a = s.find(".t-slds__item").width(),
        t = s.find(".t-slds__arrow-left").width(),
        s = s.find(".t-slds__arrow-right").width();
    e.css({ "max-width": t + s + a + 120 + "px" });
}
function t_slds_initSliderSwipe(_, t, s, c) {
    var e,
        f = "object" == typeof _ ? _ : $("#rec" + _),
        a = f.find(".t-slds__items-wrapper"),
        d = a.attr("data-slider-stop"),
        p = !1,
        m = !1;
    if ("true" == d) return !1;
    if ((delete Hammer.defaults.cssProps.userSelect, 0 < a.length)) {
        if (
            ((hammer = new Hammer(a[0], { domEvents: !0, inputClass: Hammer.TouchInput, recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]] })),
            $(window).bind("scroll", function () {
                (p = !0),
                    clearTimeout(e),
                    (e = setTimeout(function () {
                        p = !1;
                    }, 250));
            }),
            1 == t)
        )
            return !1;
        t = function (t) {
            if (m) return t.preventDefault(), !1;
        };
        window.removeEventListener("touchmove", t, { passive: !1 }),
            window.addEventListener("touchmove", t, { passive: !1 }),
            hammer.on("pan", function (t) {
                if (p) return !1;
                m = !0;
                var s = f.find(".t-slds__items-wrapper"),
                    e = s.attr("data-slider-items-in-row") || 0,
                    a = 1 < e,
                    d = (a ? f.find(".t-slds__container .t-slds__item") : f.find(".t-slds__container")).width(),
                    i = parseFloat(s.attr("data-slider-pos")),
                    r = parseFloat(s.attr("data-slider-totalslides")),
                    l = "",
                    n = t.deltaX,
                    o = ((100 / r) * t.deltaX) / $(window).innerWidth();
                if ("true" == s.attr("data-slider-stop")) return !1;
                s.attr("data-slider-touch", "yes"),
                    t_slds_scrollImages(_, d * i - n),
                    t.isFinal &&
                        (0.4 < t.velocityX
                            ? ("false" == s.attr("data-slider-with-cycle") && 1 == i ? (i = 1) : i--, s.attr("data-slider-pos", i), 0 == i && (l = "yes"), s.attr("data-slider-cycle", l))
                            : t.velocityX < -0.4 || o <= -30 / r
                            ? ("false" == s.attr("data-slider-with-cycle") && (i == r || (a && i == r - e + 1)) ? (i = a ? r - e : r) : i++, s.attr("data-slider-pos", i), i == r + 1 && (l = "yes"), s.attr("data-slider-cycle", l))
                            : 30 / r <= o && ("false" == s.attr("data-slider-with-cycle") && 1 == i ? (i = 1) : i--, s.attr("data-slider-pos", i), 0 == i && (l = "yes"), s.attr("data-slider-cycle", l)),
                        t_slideMove(_, !1, c),
                        s.attr("data-slider-touch", ""),
                        (m = !1));
            }),
            hammer.on("panend", function () {
                t_slideMove(_, !1, c), (m = !1);
            });
    }
}
function t_slds_getCurrentTranslate(t) {
    var s = t.find(".t-slds__items-wrapper");
    if (0 < s.length) {
        t = s[0].style.transform;
        if (s && void 0 !== t && "" !== t) {
            t = t.match(/\d+/g);
            if (null !== t) return parseInt(t[0], 10);
        }
    }
}
function t_slds_changeImageUrl(t) {
    ("object" == typeof t ? t : $("#rec" + t)).find(".t-slds__img").each(function () {
        var t = $(this);
        void 0 !== t.attr("data-src") && ((t = $(this)).attr("src", t.attr("data-src")), t.removeAttr("data-src"));
    });
}
function t_slds_onHammerLoad(e, a, d) {
    var i;
    "function" == typeof window[e]
        ? a()
        : ((i = Date.now()),
          setTimeout(function t() {
              var s = Date.now();
              if ("function" != typeof window[e]) {
                  if (7e3 < s - i) throw new Error(e + " is undefined");
                  setTimeout(t, d || 100);
              } else a();
          }));
}
