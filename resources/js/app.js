import "./bootstrap";
import Alpine from "alpinejs";
window.Alpine = Alpine;

// <!-- 1) Prefetch on hover, full reload on click -->
// <a href="/blog"
//    x-navigate.prefetch.hover>
//   Blog
// </a>

// <!-- 2) Preconnect immediately to your API host -->
// <div x-navigate.preconnect="https://api.example.com"></div>

// <!-- 3) Preload CSS when the link scrolls into view -->
// <a href="/about"
//    x-navigate.preload.visible.as-style>
//   About Us
// </a>

// <!-- 4) Prerender an entire page off‑screen when idle -->
// <a href="/dashboard"
//    x-navigate.prerender.idle>
//   Dashboard
// </a>

// <!-- 5) Deep prefetch on first pointerdown (works better than click for mobile) -->
// <button x-navigate.prefetch.pointer>
//   Load Widget
// </button>


(() => {
    // ——— Helpers ———
    const supportsGoodConnection = () => {
        const nav = navigator.connection || {};
        return !nav.saveData && ["4g", "5g"].includes(nav.effectiveType);
    };

    const insertHint = (rel, href, asType) => {
        const link = document.createElement("link");
        link.rel = rel;
        link.href = href;
        if (asType) link.as = asType;
        document.head.appendChild(link);
    };

    const deepPrefetch = (url, signal) => {
        insertHint("preconnect", new URL(url).origin);
        insertHint("prefetch", url, "document");
        fetch(url, { signal })
            .then((r) => r.text())
            .then((html) => {
                const doc = new DOMParser().parseFromString(html, "text/html");
                const assets = [
                    ...Array.from(
                        doc.querySelectorAll(
                            'link[rel="stylesheet"], script[src]'
                        )
                    ).map((n) => ({
                        href: n.href || n.src,
                        as:
                            n.tagName.toLowerCase() === "link"
                                ? "style"
                                : "script",
                    })),
                ];
                const heroImg = doc.querySelector("img[src]");
                if (heroImg) assets.push({ href: heroImg.src, as: "image" });
                assets.forEach(({ href, as }) =>
                    insertHint("prefetch", href, as)
                );
            })
            .catch(() => {});
    };

    // ——— Directive ———
    Alpine.directive(
        "navigate",
        (el, { expression, modifiers }, { cleanup }) => {
            const url = expression
                ? Alpine.evaluate(el, expression)
                : el.getAttribute("href");
            if (!url) return;

            // parse modifiers
            const hintTypes = [
                "preconnect",
                "preload",
                "prefetch",
                "prerender",
            ];
            let type = "prefetch"; // default hint type
            let asType = null; // resource “as” (style, script, image, document…)
            const triggers = []; // hover, pointer, click, visible, idle, focus

            modifiers.forEach((m) => {
                if (hintTypes.includes(m)) type = m;
                else if (m.startsWith("as-")) asType = m.slice(3);
                else triggers.push(m);
            });

            // default to hover if no trigger specified
            if (triggers.length === 0) triggers.push("hover");

            let controller,
                timer,
                done = false;
            const doHint = () => {
                if (done || !supportsGoodConnection()) return;
                done = true;
                controller = new AbortController();

                switch (type) {
                    case "preconnect":
                        insertHint("preconnect", new URL(url).origin);
                        break;
                    case "preload":
                        insertHint("preload", url, asType || "document");
                        break;
                    case "prerender":
                        insertHint("prerender", url);
                        break;
                    case "prefetch":
                    default:
                        deepPrefetch(url, controller.signal);
                }
            };

            // wire up each trigger
            triggers.forEach((trigger) => {
                if (trigger === "hover") {
                    const enter = () => (timer = setTimeout(doHint, 100));
                    const leave = () => {
                        clearTimeout(timer);
                        controller?.abort();
                    };
                    el.addEventListener("mouseover", enter);
                    el.addEventListener("mouseout", leave);
                    cleanup(() => {
                        el.removeEventListener("mouseover", enter);
                        el.removeEventListener("mouseout", leave);
                    });
                } else if (trigger === "pointer") {
                    // fires on mousedown/touchstart before the click/navigation
                    const ptr = () => doHint();
                    el.addEventListener("pointerdown", ptr, { passive: true });
                    cleanup(() => el.removeEventListener("pointerdown", ptr));
                } else if (trigger === "click") {
                    el.addEventListener("click", doHint);
                    cleanup(() => el.removeEventListener("click", doHint));
                } else if (trigger === "visible") {
                    const obs = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((e) => {
                                if (e.isIntersecting) {
                                    doHint();
                                    obs.unobserve(el);
                                }
                            });
                        },
                        { rootMargin: "200px" }
                    );
                    obs.observe(el);
                    cleanup(() => obs.disconnect());
                } else if (
                    trigger === "idle" &&
                    "requestIdleCallback" in window
                ) {
                    requestIdleCallback(doHint);
                } else if (trigger === "focus") {
                    el.addEventListener("focus", doHint);
                    cleanup(() => el.removeEventListener("focus", doHint));
                }
            });

            // **No** preventDefault here—click does a full reload
        }
    );

    Alpine.start();
})();

/*!
 * Sienna Accessibility Widget v1.1
 * (c) 2024 Benny Luk
 * License: GNU
 * Home Page : https://accessibility-widget.pages.dev/
 * Repository: git+https://github.com/bennyluk/Sienna-Accessibility-Widget.git
 *
 */ (() => {
    "use strict";
    var t = function () {
            return (
                (t =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                t.apply(this, arguments)
            );
        },
        e = {},
        i = "asw";
    function n(i) {
        var n = t(t({}, e), { states: t(t({}, e.states), i) });
        return a(n), n;
    }
    function a(n) {
        (e = t(t({}, e), n)),
            (function (t, e, i) {
                var n = new Date();
                n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
                var a = "expires=" + n.toUTCString();
                document.cookie = t + "=" + e + ";" + a + ";path=/";
            })(i, JSON.stringify(e));
    }
    function o(t) {
        var i;
        return null === (i = null == e ? void 0 : e.states) || void 0 === i
            ? void 0
            : i[t];
    }
    function s(t) {
        if ((void 0 === t && (t = !0), t)) return e;
        var n = (function (t) {
            for (
                var e = t + "=",
                    i = decodeURIComponent(document.cookie).split(";"),
                    n = 0;
                n < i.length;
                n++
            ) {
                for (var a = i[n]; " " == a.charAt(0); ) a = a.substring(1);
                if (0 == a.indexOf(e)) return a.substring(e.length, a.length);
            }
            return "";
        })(i);
        return n && (e = JSON.parse(n)), e;
    }
    function r(t) {
        void 0 === t && (t = 1),
            document
                .querySelectorAll(
                    "h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.asw-text"
                )
                .forEach(function (e) {
                    var i;
                    if (
                        !e.classList.contains("material-icons") &&
                        !e.classList.contains("fa")
                    ) {
                        var n = Number(
                            null !==
                                (i = e.getAttribute("data-asw-orgFontSize")) &&
                                void 0 !== i
                                ? i
                                : 0
                        );
                        n ||
                            ((n = parseInt(
                                window
                                    .getComputedStyle(e)
                                    .getPropertyValue("font-size")
                            )),
                            e.setAttribute("data-asw-orgFontSize", String(n)));
                        var a = n * t;
                        e.style["font-size"] = a + "px";
                    }
                });
        var e = document.querySelector(".asw-amount");
        e && (e.innerText = "".concat((100 * t).toFixed(0), "%"));
    }
    function l(t) {
        var e = t.id,
            i = t.css;
        if (i) {
            var n =
                document.getElementById(e || "") ||
                document.createElement("style");
            (n.innerHTML = i),
                n.id || ((n.id = e), document.head.appendChild(n));
        }
    }
    var c = ["-o-", "-ms-", "-moz-", "-webkit-", ""],
        g = ["filter"];
    function u(t) {
        var e,
            i = "";
        return (
            t &&
                ((i += (function (t) {
                    var e = "";
                    if (t) {
                        var i = function (i) {
                            (g.includes(i) ? c : [""]).forEach(function (n) {
                                e += ""
                                    .concat(n)
                                    .concat(i, ":")
                                    .concat(t[i], " !important;");
                            });
                        };
                        for (var n in t) i(n);
                    }
                    return e;
                })(t.styles)).length &&
                    t.selector &&
                    (i = (function (t) {
                        var e = t.selector,
                            i = t.childrenSelector,
                            n = void 0 === i ? [""] : i,
                            a = t.css,
                            o = "";
                        return (
                            n.forEach(function (t) {
                                o += ""
                                    .concat(e, " ")
                                    .concat(t, "{")
                                    .concat(a, "}");
                            }),
                            o
                        );
                    })({
                        selector: t.selector,
                        childrenSelector: t.childrenSelector,
                        css: i,
                    })),
                (i += null !== (e = t.css) && void 0 !== e ? e : "")),
            i
        );
    }
    function d(t) {
        var e,
            i = t.id,
            n = void 0 === i ? "" : i,
            a = t.enable,
            o = void 0 !== a && a,
            s = "asw-".concat(n);
        o
            ? l({ css: u(t), id: s })
            : null === (e = document.getElementById(s)) ||
              void 0 === e ||
              e.remove();
        document.documentElement.classList.toggle(s, o);
    }
    var h = function (t, e, i) {
            if (i || 2 === arguments.length)
                for (var n, a = 0, o = e.length; a < o; a++)
                    (!n && a in e) ||
                        (n || (n = Array.prototype.slice.call(e, 0, a)),
                        (n[a] = e[a]));
            return t.concat(n || Array.prototype.slice.call(e));
        },
        p = ["", "*:not(.material-icons,.asw-menu,.asw-menu *)"],
        m = [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            ".wsite-headline",
            ".wsite-content-title",
        ],
        v = h(
            h([], m, !0),
            [
                "img",
                "p",
                "i",
                "svg",
                "a",
                "button:not(.asw-btn)",
                "label",
                "li",
                "ol",
            ],
            !1
        ),
        b = {
            "dark-contrast": {
                styles: {
                    color: "#FFF",
                    fill: "#FFF",
                    "background-color": "#000",
                },
                childrenSelector: v,
            },
            "light-contrast": {
                styles: {
                    color: "#000",
                    fill: "#000",
                    "background-color": "#FFF",
                },
                childrenSelector: v,
            },
            "high-contrast": { styles: { filter: "contrast(125%)" } },
            "high-saturation": { styles: { filter: "saturate(200%)" } },
            "low-saturation": { styles: { filter: "saturate(50%)" } },
            monochrome: { styles: { filter: "grayscale(100%)" } },
        };
    var S = function () {
        return (
            (S =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i]))
                            Object.prototype.hasOwnProperty.call(e, a) &&
                                (t[a] = e[a]);
                    return t;
                }),
            S.apply(this, arguments)
        );
    };
    function w() {
        var t = s().states.contrast,
            e = "",
            i = b[t];
        i && (e = u(S(S({}, i), { selector: "html.aws-filter" }))),
            l({ css: e, id: "asw-filter-style" }),
            document.documentElement.classList.toggle("aws-filter", Boolean(t));
    }
    var y = function () {
            return (
                (y =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                y.apply(this, arguments)
            );
        },
        f = {
            id: "stop-animations",
            selector: "html",
            childrenSelector: ["*"],
            styles: {
                transition: "none",
                "animation-fill-mode": "forwards",
                "animation-iteration-count": "1",
                "animation-duration": ".01s",
            },
        };
    var k = function () {
            return (
                (k =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                k.apply(this, arguments)
            );
        },
        A = {
            id: "readable-font",
            selector: "html",
            childrenSelector: (function (t, e, i) {
                if (i || 2 === arguments.length)
                    for (var n, a = 0, o = e.length; a < o; a++)
                        (!n && a in e) ||
                            (n || (n = Array.prototype.slice.call(e, 0, a)),
                            (n[a] = e[a]));
                return t.concat(n || Array.prototype.slice.call(e));
            })(["", "*:not(.material-icons,.fa)"], v, !0),
            styles: {
                "font-family":
                    "OpenDyslexic3,Comic Sans MS,Arial,Helvetica,sans-serif",
            },
            css: '@font-face {font-family: OpenDyslexic3;src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"), url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");}',
        };
    var C = function () {
            return (
                (C =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                C.apply(this, arguments)
            );
        },
        L = {
            id: "big-cursor",
            selector: "body",
            childrenSelector: ["*"],
            styles: {
                cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98px' height='98px' viewBox='0 0 48 48'%3E%3Cpath fill='%23E0E0E0' d='M27.8 39.7c-.1 0-.2 0-.4-.1s-.4-.3-.6-.5l-3.7-8.6-4.5 4.2c-.1.2-.3.3-.6.3-.1 0-.3 0-.4-.1-.3-.1-.6-.5-.6-.9V12c0-.4.2-.8.6-.9.1-.1.3-.1.4-.1.2 0 .5.1.7.3l16 15c.3.3.4.7.3 1.1-.1.4-.5.6-.9.7l-6.3.6 3.9 8.5c.1.2.1.5 0 .8-.1.2-.3.5-.5.6l-2.9 1.3c-.2-.2-.4-.2-.5-.2z'/%3E%3Cpath fill='%23212121' d='m18 12 16 15-7.7.7 4.5 9.8-2.9 1.3-4.3-9.9L18 34V12m0-2c-.3 0-.5.1-.8.2-.7.3-1.2 1-1.2 1.8v22c0 .8.5 1.5 1.2 1.8.3.2.6.2.8.2.5 0 1-.2 1.4-.5l3.4-3.2 3.1 7.3c.2.5.6.9 1.1 1.1.2.1.5.1.7.1.3 0 .5-.1.8-.2l2.9-1.3c.5-.2.9-.6 1.1-1.1.2-.5.2-1.1 0-1.5l-3.3-7.2 4.9-.4c.8-.1 1.5-.6 1.7-1.3.3-.7.1-1.6-.5-2.1l-16-15c-.3-.5-.8-.7-1.3-.7z'/%3E%3C/svg%3E\") 40 15, auto",
            },
        };
    var F = function () {
            return (
                (F =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                F.apply(this, arguments)
            );
        },
        x = {
            id: "highlight-title",
            selector: "html",
            childrenSelector: m,
            styles: { outline: "2px solid #0048ff", "outline-offset": "2px" },
        };
    const H =
        '<style>.asw-rg{position:fixed;top:0;left:0;right:0;width:100%;height:0;pointer-events:none;background-color:rgba(0,0,0,.8);z-index:1000000}</style> <div class="asw-rg asw-rg-top"></div> <div class="asw-rg asw-rg-bottom" style="top:auto;bottom:0"></div>';
    var z = function () {
            return (
                (z =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                z.apply(this, arguments)
            );
        },
        j = {
            id: "highlight-links",
            selector: "html",
            childrenSelector: ["a[href]"],
            styles: { outline: "2px solid #0048ff", "outline-offset": "2px" },
        };
    var M = function () {
            return (
                (M =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                M.apply(this, arguments)
            );
        },
        D = {
            id: "letter-spacing",
            selector: "html",
            childrenSelector: p,
            styles: { "letter-spacing": "2px" },
        };
    var R = function () {
            return (
                (R =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                R.apply(this, arguments)
            );
        },
        O = {
            id: "line-height",
            selector: "html",
            childrenSelector: p,
            styles: { "line-height": "3" },
        };
    var T = function () {
            return (
                (T =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                T.apply(this, arguments)
            );
        },
        B = {
            id: "font-weight",
            selector: "html",
            childrenSelector: p,
            styles: { "font-weight": "700" },
        };
    function P() {
        var t,
            e = s().states;
        void 0 === (t = e["highlight-title"]) && (t = !1),
            d(F(F({}, x), { enable: t })),
            (function (t) {
                void 0 === t && (t = !1), d(z(z({}, j), { enable: t }));
            })(e["highlight-links"]),
            (function (t) {
                void 0 === t && (t = !1), d(M(M({}, D), { enable: t }));
            })(e["letter-spacing"]),
            (function (t) {
                void 0 === t && (t = !1), d(R(R({}, O), { enable: t }));
            })(e["line-height"]),
            (function (t) {
                void 0 === t && (t = !1), d(T(T({}, B), { enable: t }));
            })(e["font-weight"]),
            (function (t) {
                void 0 === t && (t = !1), d(k(k({}, A), { enable: t }));
            })(e["readable-font"]),
            (function (t) {
                void 0 === t && (t = !1);
                var e = document.querySelector(".asw-rg-container");
                if (t) {
                    if (!e) {
                        (e = document.createElement("div")).setAttribute(
                            "class",
                            "asw-rg-container"
                        ),
                            (e.innerHTML = H);
                        var i = e.querySelector(".asw-rg-top"),
                            n = e.querySelector(".asw-rg-bottom");
                        (window.__asw__onScrollReadableGuide = function (t) {
                            (i.style.height = t.clientY - 20 + "px"),
                                (n.style.height =
                                    window.innerHeight - t.clientY - 40 + "px");
                        }),
                            document.addEventListener(
                                "mousemove",
                                window.__asw__onScrollReadableGuide,
                                { passive: !1 }
                            ),
                            document.body.appendChild(e);
                    }
                } else
                    e && e.remove(),
                        window.__asw__onScrollReadableGuide &&
                            (document.removeEventListener(
                                "mousemove",
                                window.__asw__onScrollReadableGuide
                            ),
                            delete window.__asw__onScrollReadableGuide);
            })(e["readable-guide"]),
            (function (t) {
                void 0 === t && (t = !1), d(y(y({}, f), { enable: t }));
            })(e["stop-animations"]),
            (function (t) {
                void 0 === t && (t = !1), d(C(C({}, L), { enable: t }));
            })(e["big-cursor"]);
    }
    function V() {
        var t = s().states;
        r((null == t ? void 0 : t.fontSize) || 1), P(), w();
    }
    const I =
        '<style>.asw-menu,.asw-widget{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:400;-webkit-font-smoothing:antialiased}.asw-menu *,.asw-widget *{box-sizing:border-box!important}.asw-menu-btn{position:fixed;z-index:500000;left:30px;bottom:30px;box-shadow:0 5px 15px 0 rgb(37 44 97 / 15%),0 2px 4px 0 rgb(93 100 148 / 20%);transition:transform .2s ease;border-radius:50%;align-items:center;justify-content:center;width:58px;height:58px;display:flex;cursor:pointer;border:3px solid #fff!important;outline:5px solid #0048ff!important;text-decoration:none!important;background:#326cff!important;background:linear-gradient(96deg,#326cff 0,#0048ff 100%)!important}.asw-menu-btn svg{width:36px;height:36px;min-height:36px;min-width:36px;max-width:36px;max-height:36px;background:0 0!important}.asw-menu-btn:hover{transform:scale(1.05)}@media only screen and (max-width:768px){.asw-menu-btn{width:42px;height:42px}.asw-menu-btn svg{width:26px;height:26px;min-height:26px;min-width:26px;max-width:26px;max-height:26px}}</style> <div class="asw-widget"> <a href="https://accessibility-widget.pages.dev" target="_blank" class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false"> <svg xmlns="http://www.w3.org/2000/svg" style="fill:white" viewBox="0 0 24 24" width="30px" height="30px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg> </a> </div>';
    function N(t, e) {
        t.style.display =
            void 0 === e
                ? "none" === t.style.display
                    ? "block"
                    : "none"
                : 1 == e
                ? "block"
                : "none";
    }
    const G =
            '<style>.asw-menu{position:fixed;left:0;top:0;box-shadow:0 0 20px #00000080;opacity:1;transition:.3s;z-index:500000;overflow:hidden;background:#eff1f5;width:500px;line-height:1;font-size:16px;height:100%;letter-spacing:.015em}.asw-menu *{color:#000!important;font-family:inherit;padding:0;margin:0;line-height:1!important;letter-spacing:normal!important}.asw-menu-header{display:flex;align-items:center;justify-content:space-between;padding-left:18px;padding-right:18px;height:55px;font-weight:700!important;background-color:#0848ca!important}.asw-menu-title{font-size:16px!important;color:#fff!important}.asw-menu-header svg{fill:#0848ca!important;width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-menu-header>div{display:flex}.asw-menu-header div[role=button]{padding:5px;background:#fff!important;cursor:pointer;border-radius:50%;transition:opacity .3s ease}.asw-menu-header div[role=button]:hover{opacity:.8}.asw-card{margin:0 15px 20px}.asw-card-title{font-size:14px!important;padding:15px 0;font-weight:600!important;opacity:.8}.asw-menu .asw-select{width:100%!important;padding:0 15px!important;font-size:16px!important;font-family:inherit!important;font-weight:600!important;border-radius:45px!important;background:#fff!important;border:none!important;min-height:45px!important;max-height:45px!important;height:45px!important;color:inherit!important}.asw-items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.asw-btn{aspect-ratio:6/5;border-radius:12px;padding:0 15px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;color:#333;font-size:16px!important;background:#fff!important;border:2px solid transparent!important;transition:border-color .2s ease;cursor:pointer;word-break:break-word;gap:10px;position:relative;width:auto!important;height:auto!important}.asw-adjust-font .asw-label div,.asw-btn .asw-translate{font-size:14px!important;font-weight:600!important}.asw-minus,.asw-plus{background-color:#eff1f5!important;border:2px solid transparent;transition:border .2s ease}.asw-minus:hover,.asw-plus:hover{border-color:#0848ca!important}.asw-amount{font-size:18px!important;font-weight:600!important}.asw-adjust-font svg{width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-btn svg{width:34px!important;height:34px!important;min-width:34px!important;min-height:34px!important;max-width:34px!important;max-height:34px!important}.asw-btn.asw-selected,.asw-btn:hover{border-color:#0848ca!important}.asw-btn.asw-selected span,.asw-btn.asw-selected svg{fill:#0848ca!important;color:#0848ca!important}.asw-btn.asw-selected:after{content:"âœ“";position:absolute;top:10px;right:10px;background-color:#0848ca!important;color:#fff;padding:6px;font-size:10px;width:18px;height:18px;border-radius:100%;line-height:6px}.asw-footer{position:absolute;bottom:0;left:0;right:0;background:#fff;padding:20px;text-align:center;border-top:2px solid #eff1f5}.asw-footer a{font-size:16px!important;text-decoration:none!important;color:#000!important;background:0 0!important;font-weight:600!important}.asw-footer a:hover,.asw-footer a:hover span{color:#0848ca!important}.asw-menu-content{overflow:scroll;max-height:calc(100% - 80px);padding:30px 0 15px}.asw-adjust-font{background:#fff;padding:20px;margin-bottom:20px}.asw-adjust-font .asw-label{display:flex;justify-content:flex-start}.asw-adjust-font>div{display:flex;justify-content:space-between;margin-top:20px;align-items:center;font-size:15px}.asw-adjust-font .asw-label div{font-size:15px!important}.asw-adjust-font div[role=button]{background:#eff1f5!important;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer}.asw-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000}@media only screen and (max-width:560px){.asw-menu{width:100%}}@media only screen and (max-width:420px){.asw-items{grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}}</style> <div class="asw-menu"> <div class="asw-menu-header"> <div class="asw-menu-title asw-translate"> Accessibility Menu </div> <div style="gap:15px"> <div role="button" class="asw-menu-reset" title="Reset settings"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 4c2.1 0 4.1.8 5.6 2.3 3.1 3.1 3.1 8.2 0 11.3a7.78 7.78 0 0 1-6.7 2.3l.5-2c1.7.2 3.5-.4 4.8-1.7a6.1 6.1 0 0 0 0-8.5A6.07 6.07 0 0 0 12 6v4.6l-5-5 5-5V4M6.3 17.6C3.7 15 3.3 11 5.1 7.9l1.5 1.5c-1.1 2.2-.7 5 1.2 6.8.5.5 1.1.9 1.8 1.2l-.6 2a8 8 0 0 1-2.7-1.8Z"/> </svg> </div> <div role="button" class="asw-menu-close" title="Close"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/> </svg> </div> </div> </div> <div class="asw-menu-content"> <div class="asw-card"> <select id="asw-language" title="Language" class="asw-select"></select> </div> <div class="asw-card"> <div class="asw-card-title"> Content Adjustments </div> <div class="asw-adjust-font"> <div class="asw-label" style="margin:0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin-right:15px"> <path d="M2 4v3h5v12h3V7h5V4H2m19 5h-9v3h3v7h3v-7h3V9Z"/> </svg> <div class="asw-translate"> Adjust Font Size </div> </div> <div> <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false" title="Decrease Font Size" tabindex="0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 13H5v-2h14v2Z"/> </svg> </div> <div class="asw-amount"> 100% </div> <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false" title="Increase Font Size" tabindex="0"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/> </svg> </div> </div> </div> <div class="asw-items content"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Color Adjustments </div> <div class="asw-items contrast"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Tools </div> <div class="asw-items tools"> </div> </div> </div> <div class="asw-footer"> <a href="https://accessibility-widget.pages.dev" target="_blank">Web Accessibility By <span style="font-weight:700;color:inherit">Sienna</span> â¤ï¸</a> </div> </div> <div class="asw-overlay"> </div>',
        E = [
            {
                label: "Monochrome",
                key: "monochrome",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="m19 19-7-8v8H5l7-8V5h7m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/>\r\n</svg>',
            },
            {
                label: "Low Saturation",
                key: "low-saturation",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M11 9h2v2h-2V9m-2 2h2v2H9v-2m4 0h2v2h-2v-2m2-2h2v2h-2V9M7 9h2v2H7V9m12-6H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M9 18H7v-2h2v2m4 0h-2v-2h2v2m4 0h-2v-2h2v2m2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6Z"/>\r\n</svg>',
            },
            {
                label: "High Saturation",
                key: "high-saturation",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 16a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4m6.7-3.6a6.06 6.06 0 0 0-.86-.4 5.98 5.98 0 0 0 3.86-5.59 6 6 0 0 0-6.78.54A5.99 5.99 0 0 0 12 .81a6 6 0 0 0-2.92 6.14A6 6 0 0 0 2.3 6.4 5.95 5.95 0 0 0 6.16 12a6 6 0 0 0-3.86 5.58 6 6 0 0 0 6.78-.54A6 6 0 0 0 12 23.19a6 6 0 0 0 2.92-6.14 6 6 0 0 0 6.78.54 5.98 5.98 0 0 0-3-5.19Z"/>\r\n</svg>',
            },
            {
                label: "High Contrast",
                key: "high-contrast",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.93a8 8 0 0 1 0-15.86v15.86zm2-15.86a8 8 0 0 1 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87a8 8 0 0 1-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93a8.4 8.4 0 0 1-.19 1z"/>\r\n</svg>',
            },
            {
                label: "Light Contrast",
                key: "light-contrast",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6m8-2.69L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69Z"/>\r\n</svg>',
            },
            {
                label: "Dark Contrast",
                key: "dark-contrast",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M18 12c0-4.5-1.92-8.74-6-10a10 10 0 0 0 0 20c4.08-1.26 6-5.5 6-10Z"/>\r\n</svg>',
            },
        ],
        J = [
            {
                label: "Font Weight",
                key: "font-weight",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0 1 15 14a1.5 1.5 0 0 1-1.5 1.5m-3.5-9h3A1.5 1.5 0 0 1 14.5 8 1.5 1.5 0 0 1 13 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42Z"/>\r\n</svg>',
            },
            {
                label: "Line Height",
                key: "line-height",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M21 22H3v-2h18v2m0-18H3V2h18v2m-11 9.7h4l-2-5.4-2 5.4M11.2 6h1.7l4.7 12h-2l-.9-2.6H9.4L8.5 18h-2l4.7-12Z"/>\r\n</svg>',
            },
            {
                label: "Letter Spacing",
                key: "letter-spacing",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M22 3v18h-2V3h2M4 3v18H2V3h2m6 10.7h4l-2-5.4-2 5.4M11.2 6h1.7l4.7 12h-2l-.9-2.6H9.4L8.5 18h-2l4.7-12Z"/>\r\n</svg>',
            },
            {
                label: "Dyslexia Font",
                key: "readable-font",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="m21.59 11.59-8.09 8.09L9.83 16l-1.41 1.41 5.08 5.09L23 13M6.43 11 8.5 5.5l2.07 5.5m1.88 5h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3Z"/>\r\n</svg>',
            },
            {
                label: "Highlight Links",
                key: "highlight-links",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V5h14v14m-5.06-8.94a3.37 3.37 0 0 1 0 4.75L11.73 17A3.29 3.29 0 0 1 7 17a3.31 3.31 0 0 1 0-4.74l1.35-1.36-.01.6c-.01.5.07 1 .23 1.44l.05.15-.4.41a1.6 1.6 0 0 0 0 2.28c.61.62 1.67.62 2.28 0l2.2-2.19c.3-.31.48-.72.48-1.15 0-.44-.18-.83-.48-1.14a.87.87 0 0 1 0-1.24.91.91 0 0 1 1.24 0m4.06-.7c0 .9-.35 1.74-1 2.38l-1.34 1.36v-.6c.01-.5-.07-1-.23-1.44l-.05-.14.4-.42a1.6 1.6 0 0 0 0-2.28 1.64 1.64 0 0 0-2.28 0l-2.2 2.2c-.3.3-.48.71-.48 1.14 0 .44.18.83.48 1.14.17.16.26.38.26.62s-.09.46-.26.62a.86.86 0 0 1-.62.25.88.88 0 0 1-.62-.25 3.36 3.36 0 0 1 0-4.75L12.27 7A3.31 3.31 0 0 1 17 7c.65.62 1 1.46 1 2.36Z"/>\r\n</svg>',
            },
            {
                label: "Highlight Title",
                key: "highlight-title",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M5 4v3h5.5v12h3V7H19V4H5Z"/>\r\n</svg>',
            },
        ],
        Z = [
            {
                label: "Big Cursor",
                key: "big-cursor",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M11 1.07C7.05 1.56 4 4.92 4 9h7m-7 6a8 8 0 0 0 8 8 8 8 0 0 0 8-8v-4H4m9-9.93V9h7a8 8 0 0 0-7-7.93Z"/>\r\n</svg>',
            },
            {
                label: "Stop Animations",
                key: "stop-animations",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M22 12c0-5.54-4.46-10-10-10-1.17 0-2.3.19-3.38.56l.7 1.94A7.15 7.15 0 0 1 12 3.97 8.06 8.06 0 0 1 20.03 12 8.06 8.06 0 0 1 12 20.03 8.06 8.06 0 0 1 3.97 12c0-.94.19-1.88.53-2.72l-1.94-.66A10.37 10.37 0 0 0 2 12c0 5.54 4.46 10 10 10s10-4.46 10-10M5.47 3.97c.85 0 1.53.71 1.53 1.5C7 6.32 6.32 7 5.47 7c-.79 0-1.5-.68-1.5-1.53 0-.79.71-1.5 1.5-1.5M18 12c0-3.33-2.67-6-6-6s-6 2.67-6 6 2.67 6 6 6 6-2.67 6-6m-7-3v6H9V9m6 0v6h-2V9"/>\r\n</svg>',
            },
            {
                label: "Reading Guide",
                key: "readable-guide",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\r<path d="M12 8a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3m0 3.54A13.15 13.15 0 0 0 3 8v11c3.5 0 6.64 1.35 9 3.54A13.15 13.15 0 0 1 21 19V8c-3.5 0-6.64 1.35-9 3.54Z"/>\r\n</svg>',
            },
        ];
    function W(t, e) {
        for (var i = "", n = t.length; n--; ) {
            var a = t[n];
            i += '<button class="asw-btn '
                .concat(e || "", '" type="button" data-key="')
                .concat(a.key, '" title="')
                .concat(a.label, '">')
                .concat(a.icon, '<span class="asw-translate">')
                .concat(a.label, "</span></button>");
        }
        return i;
    }
    var K = {
            ar: JSON.parse(
                '{"Accessibility Menu":"Ù‚Ø§Ø¦Ù…Ø© Ø¥Ù…ÙƒØ§Ù†ÙŠØ© Ø§Ù„ÙˆØµÙˆÙ„","Reset settings":"Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª","Close":"Ø¥ØºÙ„Ø§Ù‚","Content Adjustments":"ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ø§Ù„Ù…Ø­ØªÙˆÙ‰","Adjust Font Size":"ØªØ¹Ø¯ÙŠÙ„ Ø­Ø¬Ù… Ø§Ù„Ø®Ø·","Highlight Title":"ØªØ³Ù„ÙŠØ· Ø§Ù„Ø¶ÙˆØ¡ Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù†ÙˆØ§Ù†","Highlight Links":"ØªØ³Ù„ÙŠØ· Ø§Ù„Ø¶ÙˆØ¡ Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙˆØ§Ø¨Ø·","Readable Font":"Ø®Ø· Ø³Ù‡Ù„ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø©","Color Adjustments":"ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ø§Ù„Ø£Ù„ÙˆØ§Ù†","Dark Contrast":"ØªØ¨Ø§ÙŠÙ† Ø¯Ø§ÙƒÙ†","Light Contrast":"ØªØ¨Ø§ÙŠÙ† ÙØ§ØªØ­","High Contrast":"ØªØ¨Ø§ÙŠÙ† Ø¹Ø§Ù„ÙŠ","High Saturation":"ØªØ´Ø¨Ø¹ Ø¹Ø§Ù„ÙŠ","Low Saturation":"ØªØ´Ø¨Ø¹ Ù…Ù†Ø®ÙØ¶","Monochrome":"Ø£Ø­Ø§Ø¯ÙŠ Ø§Ù„Ù„ÙˆÙ†","Tools":"Ø£Ø¯ÙˆØ§Øª","Reading Guide":"Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø©","Stop Animations":"Ø¥ÙŠÙ‚Ø§Ù Ø§Ù„Ø±Ø³ÙˆÙ… Ø§Ù„Ù…ØªØ­Ø±ÙƒØ©","Big Cursor":"Ù…Ø¤Ø´Ø± ÙƒØ¨ÙŠØ±","Increase Font Size":"Ø²ÙŠØ§Ø¯Ø© Ø­Ø¬Ù… Ø§Ù„Ø®Ø·","Decrease Font Size":"ØªÙ‚Ù„ÙŠÙ„ Ø­Ø¬Ù… Ø§Ù„Ø®Ø·","Letter Spacing":"ØªØ¨Ø§Ø¹Ø¯ Ø§Ù„Ø­Ø±ÙˆÙ","Line Height":"Ø§Ø±ØªÙØ§Ø¹ Ø§Ù„Ø³Ø·Ø±","Font Weight":"Ø³Ù…Ø§ÙƒØ© Ø§Ù„Ø®Ø·","Dyslexia Font":"Ø®Ø· Ø§Ù„Ù‚Ø±Ø§Ø¡Ø© Ù„Ù…Ù† ÙŠØ¹Ø§Ù†ÙˆÙ† Ù…Ù† Ø¹Ø³Ø± Ø§Ù„Ù‚Ø±Ø§Ø¡Ø©","Language":"Ø§Ù„Ù„ØºØ©","Open Accessibility Menu":"Ø§ÙØªØ­ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ÙˆØµÙˆÙ„"}'
            ),
            bg: JSON.parse(
                '{"Accessibility Menu":"ÐœÐµÐ½ÑŽ Ð·Ð° Ð´Ð¾ÑÑ‚ÑŠÐ¿Ð½Ð¾ÑÑ‚","Reset settings":"ÐÑƒÐ»Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸Ñ‚Ðµ","Close":"Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸","Content Adjustments":"ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ Ð½Ð° ÑÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸ÐµÑ‚Ð¾","Adjust Font Size":"ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ð½Ð° Ñ€Ð°Ð·Ð¼ÐµÑ€Ð° Ð½Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Highlight Title":"ÐžÑ‚ÐºÑ€Ð¾ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾","Highlight Links":"ÐžÑ‚ÐºÑ€Ð¾ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð²Ñ€ÑŠÐ·ÐºÐ¸Ñ‚Ðµ","Readable Font":"Ð§ÐµÑ‚Ð¸Ð¼ ÑˆÑ€Ð¸Ñ„Ñ‚","Color Adjustments":"ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ Ð½Ð° Ñ†Ð²ÐµÑ‚Ð¾Ð²ÐµÑ‚Ðµ","Dark Contrast":"Ð¢ÑŠÐ¼ÐµÐ½ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","Light Contrast":"Ð¡Ð²ÐµÑ‚ÑŠÐ» ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Contrast":"Ð’Ð¸ÑÐ¾Ðº ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Saturation":"Ð’Ð¸ÑÐ¾ÐºÐ° Ð½Ð°ÑÐ¸Ñ‚ÐµÐ½Ð¾ÑÑ‚","Low Saturation":"ÐÐ¸ÑÐºÐ° Ð½Ð°ÑÐ¸Ñ‚ÐµÐ½Ð¾ÑÑ‚","Monochrome":"ÐœÐ¾Ð½Ð¾Ñ…Ñ€Ð¾Ð¼ÐµÐ½","Tools":"Ð˜Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ð¸","Reading Guide":"Ð ÑŠÐºÐ¾Ð²Ð¾Ð´ÑÑ‚Ð²Ð¾ Ð·Ð° Ñ‡ÐµÑ‚ÐµÐ½Ðµ","Stop Animations":"Ð¡Ð¿Ñ€Ð¸ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ð¸Ñ‚Ðµ","Big Cursor":"Ð“Ð¾Ð»ÑÐ¼ ÐºÑƒÑ€ÑÐ¾Ñ€","Increase Font Size":"Ð£Ð²ÐµÐ»Ð¸Ñ‡Ð¸ Ñ€Ð°Ð·Ð¼ÐµÑ€Ð° Ð½Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Decrease Font Size":"ÐÐ°Ð¼Ð°Ð»Ð¸ Ñ€Ð°Ð·Ð¼ÐµÑ€Ð° Ð½Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Letter Spacing":"Ð Ð°Ð·ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¼ÐµÐ¶Ð´Ñƒ Ð±ÑƒÐºÐ²Ð¸Ñ‚Ðµ","Line Height":"Ð’Ð¸ÑÐ¾Ñ‡Ð¸Ð½Ð° Ð½Ð° Ñ€ÐµÐ´Ð°","Font Weight":"Ð”ÐµÐ±ÐµÐ»Ð¸Ð½Ð° Ð½Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Dyslexia Font":"Ð¨Ñ€Ð¸Ñ„Ñ‚ Ð·Ð° Ð´Ð¸ÑÐ»ÐµÐºÑÐ¸Ñ","Language":"Ð•Ð·Ð¸Ðº","Open Accessibility Menu":"ÐžÑ‚Ð²Ð¾Ñ€Ð¸ Ð¼ÐµÐ½ÑŽ Ð·Ð° Ð´Ð¾ÑÑ‚ÑŠÐ¿Ð½Ð¾ÑÑ‚"}'
            ),
            bn: JSON.parse(
                '{"Accessibility Menu":"à¦…à¦­à¦¿à¦—à¦®à§à¦¯à¦¤à¦¾ à¦®à§‡à¦¨à§","Reset settings":"à¦¨à¦¿à¦°à§à¦§à¦¾à¦°à¦£ à¦ªà§à¦¨à¦°à¦¾à¦¯à¦¼ à¦¸à§‡à¦Ÿ à¦•à¦°à§à¦¨","Close":"à¦¬à¦¨à§à¦§ à¦•à¦°à§à¦¨","Content Adjustments":"à¦•à¦¨à§à¦Ÿà§‡à¦¨à§à¦Ÿ à¦¸à¦‚à¦¶à§‹à¦§à¦¨","Adjust Font Size":"à¦«à¦¨à§à¦Ÿ à¦¸à¦¾à¦‡à¦œ à¦¸à¦‚à¦¶à§‹à¦§à¦¨","Highlight Title":"à¦¶à¦¿à¦°à§‹à¦¨à¦¾à¦® à¦‰à¦œà§à¦œà§à¦¬à¦² à¦•à¦°à§à¦¨","Highlight Links":"à¦²à¦¿à¦™à§à¦•à¦—à§à¦²à¦¿ à¦‰à¦œà§à¦œà§à¦¬à¦² à¦•à¦°à§à¦¨","Readable Font":"à¦ªà¦ à¦¨à§€à¦¯à¦¼ à¦«à¦¨à§à¦Ÿ","Color Adjustments":"à¦°à¦™ à¦¸à¦‚à¦¶à§‹à¦§à¦¨","Dark Contrast":"à¦…à¦¨à§à¦§à¦•à¦¾à¦°à§€ à¦ªà§à¦°à¦¤à¦¿à¦¬à¦¿à¦®à§à¦¬","Light Contrast":"à¦†à¦²à§‹à¦•à¦¿à¦¤ à¦ªà§à¦°à¦¤à¦¿à¦¬à¦¿à¦®à§à¦¬","High Contrast":"à¦‰à¦šà§à¦š à¦ªà§à¦°à¦¤à¦¿à¦¬à¦¿à¦®à§à¦¬","High Saturation":"à¦‰à¦šà§à¦š à¦¸à¦¤à§à¦°à¦¾à¦œà¦¨","Low Saturation":"à¦¨à¦¿à¦®à§à¦¨ à¦¸à¦¤à§à¦°à¦¾à¦œà¦¨","Monochrome":"à¦à¦•à¦°à¦™","Tools":"à¦¸à¦°à¦žà§à¦œà¦¾à¦®","Reading Guide":"à¦ªà¦¡à¦¼à¦¾à¦° à¦—à¦¾à¦‡à¦¡","Stop Animations":"à¦…à§à¦¯à¦¾à¦¨à¦¿à¦®à§‡à¦¶à¦¨ à¦¬à¦¨à§à¦§ à¦•à¦°à§à¦¨","Big Cursor":"à¦¬à¦¡à¦¼ à¦•à¦¾à¦°à§à¦¸à¦°","Increase Font Size":"à¦«à¦¨à§à¦Ÿ à¦¸à¦¾à¦‡à¦œ à¦¬à¦¾à¦¡à¦¼à¦¾à¦¨","Decrease Font Size":"à¦«à¦¨à§à¦Ÿ à¦¸à¦¾à¦‡à¦œ à¦•à¦®à¦¾à¦¨","Letter Spacing":"à¦…à¦•à§à¦·à¦° à¦¬à¦¿à¦°à¦¾à¦Ÿà¦¿","Line Height":"à¦²à¦¾à¦‡à¦¨ à¦‰à¦šà§à¦šà¦¤à¦¾","Font Weight":"à¦«à¦¨à§à¦Ÿ à¦“à¦œà¦¨","Dyslexia Font":"à¦¡à¦¾à¦‡à¦¸à¦²à§‡à¦•à§à¦¸à¦¿à¦¯à¦¼à¦¾ à¦«à¦¨à§à¦Ÿ","Language":"à¦­à¦¾à¦·à¦¾","Open Accessibility Menu":"à¦…à¦­à¦¿à¦—à¦®à§à¦¯à¦¤à¦¾ à¦®à§‡à¦¨à§ à¦–à§‹à¦²à§à¦¨"}'
            ),
            cs: JSON.parse(
                '{"Accessibility Menu":"PÅ™Ã­stupnostnÃ­ menu","Reset settings":"Obnovit nastavenÃ­","Close":"ZavÅ™Ã­t","Content Adjustments":"Ãšpravy obsahu","Adjust Font Size":"Nastavit velikost pÃ­sma","Highlight Title":"ZvÃ½raznit nadpis","Highlight Links":"ZvÃ½raznit odkazy","Readable Font":"ÄŒitelnÃ½ font","Color Adjustments":"NastavenÃ­ barev","Dark Contrast":"TmavÃ½ kontrast","Light Contrast":"SvÄ›tlÃ½ kontrast","High Contrast":"VysokÃ½ kontrast","High Saturation":"VysokÃ¡ saturace","Low Saturation":"NÃ­zkÃ¡ saturace","Monochrome":"MonochromatickÃ½","Tools":"NÃ¡stroje","Reading Guide":"PrÅ¯vodce ÄtenÃ­m","Stop Animations":"Zastavit animace","Big Cursor":"VelkÃ½ kurzor","Increase Font Size":"ZvÄ›tÅ¡it velikost pÃ­sma","Decrease Font Size":"ZmenÅ¡it velikost pÃ­sma","Letter Spacing":"Mezery mezi pÃ­smeny","Line Height":"VÃ½Å¡ka Å™Ã¡dku","Font Weight":"TlouÅ¡Å¥ka pÃ­sma","Dyslexia Font":"DyslexickÃ½ font","Language":"Jazyk","Open Accessibility Menu":"OtevÅ™Ã­t pÅ™Ã­stupnostnÃ­ menu"}'
            ),
            de: JSON.parse(
                '{"Accessibility Menu":"Barrierefreiheit","Reset settings":"Einstellungen zurÃ¼cksetzen","Close":"SchlieÃŸen","Content Adjustments":"Inhaltsanpassungen","Adjust Font Size":"SchriftgrÃ¶ÃŸe anpassen","Highlight Title":"Titel hervorheben","Highlight Links":"Links hervorheben","Readable Font":"Lesbare Schrift","Color Adjustments":"Farbanpassungen","Dark Contrast":"Dunkler Kontrast","Light Contrast":"Heller Kontrast","High Contrast":"Hoher Kontrast","High Saturation":"Hohe FarbsÃ¤ttigung","Low Saturation":"Niedrige FarbsÃ¤ttigung","Monochrome":"Monochrom","Tools":"Werkzeuge","Reading Guide":"Lesehilfe","Stop Animations":"Animationen stoppen","Big Cursor":"GroÃŸer Cursor","Increase Font Size":"SchriftgrÃ¶ÃŸe vergrÃ¶ÃŸern","Decrease Font Size":"SchriftgrÃ¶ÃŸe verkleinern","Letter Spacing":"Zeichenabstand","Line Height":"ZeilenhÃ¶he","Font Weight":"SchriftstÃ¤rke","Dyslexia Font":"Dyslexie-Schrift","Language":"Sprache","Open Accessibility Menu":"BarrierefreiheitsmenÃ¼ Ã¶ffnen"}'
            ),
            el: JSON.parse(
                '{"Accessibility Menu":"ÎœÎµÎ½Î¿Ï Ï€ÏÎ¿ÏƒÎ²Î±ÏƒÎ¹Î¼ÏŒÏ„Î·Ï„Î±Ï‚","Reset settings":"Î•Ï€Î±Î½Î±Ï†Î¿ÏÎ¬ ÏÏ…Î¸Î¼Î¯ÏƒÎµÏ‰Î½","Close":"ÎšÎ»ÎµÎ¯ÏƒÎ¹Î¼Î¿","Content Adjustments":"Î ÏÎ¿ÏƒÎ±ÏÎ¼Î¿Î³Î­Ï‚ Ï€ÎµÏÎ¹ÎµÏ‡Î¿Î¼Î­Î½Î¿Ï…","Adjust Font Size":"Î ÏÎ¿ÏƒÎ±ÏÎ¼Î¿Î³Î® Î¼ÎµÎ³Î­Î¸Î¿Ï…Ï‚ Î³ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬Ï‚","Highlight Title":"Î•Ï€Î¹ÏƒÎ®Î¼Î±Î½ÏƒÎ· Ï„Î¯Ï„Î»Î¿Ï…","Highlight Links":"Î•Ï€Î¹ÏƒÎ®Î¼Î±Î½ÏƒÎ· ÏƒÏ…Î½Î´Î­ÏƒÎ¼Ï‰Î½","Readable Font":"Î•Ï…Î±Î½Î¬Î³Î½Ï‰ÏƒÏ„Î· Î³ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬","Color Adjustments":"Î ÏÎ¿ÏƒÎ±ÏÎ¼Î¿Î³Î­Ï‚ Ï‡ÏÏ‰Î¼Î¬Ï„Ï‰Î½","Dark Contrast":"Î‘Î½Ï„Î¯Î¸ÎµÏƒÎ· ÏƒÎµ ÏƒÎºÎ¿ÏÏÎ¿","Light Contrast":"Î‘Î½Ï„Î¯Î¸ÎµÏƒÎ· ÏƒÎµ Ï†Ï‰Ï„ÎµÎ¹Î½ÏŒ","High Contrast":"Î¥ÏˆÎ·Î»Î® Î±Î½Ï„Î¯Î¸ÎµÏƒÎ·","High Saturation":"Î¥ÏˆÎ·Î»ÏŒÏ‚ ÎºÎ¿ÏÎµÏƒÎ¼ÏŒÏ‚","Low Saturation":"Î§Î±Î¼Î·Î»ÏŒÏ‚ ÎºÎ¿ÏÎµÏƒÎ¼ÏŒÏ‚","Monochrome":"ÎœÎ¿Î½ÏŒÏ‡ÏÏ‰Î¼Î¿","Tools":"Î•ÏÎ³Î±Î»ÎµÎ¯Î±","Reading Guide":"ÎŸÎ´Î·Î³ÏŒÏ‚ Î±Î½Î¬Î³Î½Ï‰ÏƒÎ·Ï‚","Stop Animations":"Î‘Ï†Î±Î¯ÏÎµÏƒÎ· ÎºÎ¯Î½Î·ÏƒÎ·Ï‚","Big Cursor":"ÎœÎµÎ³Î¬Î»Î¿Ï‚ Î´ÎµÎ¯ÎºÏ„Î·Ï‚","Increase Font Size":"Î‘ÏÎ¾Î·ÏƒÎ· Î¼ÎµÎ³Î­Î¸Î¿Ï…Ï‚ Î³ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬Ï‚","Decrease Font Size":"ÎœÎµÎ¯Ï‰ÏƒÎ· Î¼ÎµÎ³Î­Î¸Î¿Ï…Ï‚ Î³ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬Ï‚","Letter Spacing":"Î”Î¹Î¬ÎºÎµÎ½Î¿ Î³ÏÎ±Î¼Î¼Î¬Ï„Ï‰Î½","Line Height":"Î¥ÏˆÎ¿Ï‚ Î³ÏÎ±Î¼Î¼Î®Ï‚","Font Weight":"Î’Î¬ÏÎ¿Ï‚ Î³ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬Ï‚","Dyslexia Font":"Î“ÏÎ±Î¼Î¼Î±Ï„Î¿ÏƒÎµÎ¹ÏÎ¬ Î³Î¹Î± Î´Ï…ÏƒÎ»ÎµÎ¾Î¯Î±","Language":"Î“Î»ÏŽÏƒÏƒÎ±","Open Accessibility Menu":"Î‘Î½Î¿Î¯Î¾Ï„Îµ Ï„Î¿ Î¼ÎµÎ½Î¿Ï Ï€ÏÎ¿ÏƒÎ²Î±ÏƒÎ¹Î¼ÏŒÏ„Î·Ï„Î±Ï‚"}'
            ),
            en: JSON.parse(
                '{"Accessibility Menu":"Accessibility Menu","Reset settings":"Reset settings","Close":"Close","Content Adjustments":"Content Adjustments","Adjust Font Size":"Adjust Font Size","Highlight Title":"Highlight Title","Highlight Links":"Highlight Links","Readable Font":"Readable Font","Color Adjustments":"Color Adjustments","Dark Contrast":"Dark Contrast","Light Contrast":"Light Contrast","High Contrast":"High Contrast","High Saturation":"High Saturation","Low Saturation":"Low Saturation","Monochrome":"Monochrome","Tools":"Tools","Reading Guide":"Reading Guide","Stop Animations":"Stop Animations","Big Cursor":"Big Cursor","Increase Font Size":"Increase Font Size","Decrease Font Size":"Decrease Font Size","Letter Spacing":"Letter Spacing","Line Height":"Line Height","Font Weight":"Font Weight","Dyslexia Font":"Dyslexia Font","Language":"Language","Open Accessibility Menu":"Open Accessibility Menu"}'
            ),
            es: JSON.parse(
                '{"Accessibility Menu":"MenÃº de accesibilidad","Reset settings":"Restablecer configuraciÃ³n","Close":"Cerrar","Content Adjustments":"Ajustes de contenido","Adjust Font Size":"Ajustar el tamaÃ±o de fuente","Highlight Title":"Destacar tÃ­tulo","Highlight Links":"Destacar enlaces","Readable Font":"Fuente legible","Color Adjustments":"Ajustes de color","Dark Contrast":"Contraste oscuro","Light Contrast":"Contraste claro","High Contrast":"Alto contraste","High Saturation":"Alta saturaciÃ³n","Low Saturation":"Baja saturaciÃ³n","Monochrome":"Monocromo","Tools":"Herramientas","Reading Guide":"GuÃ­a de lectura","Stop Animations":"Detener animaciones","Big Cursor":"Cursor grande","Increase Font Size":"Aumentar tamaÃ±o de fuente","Decrease Font Size":"Reducir tamaÃ±o de fuente","Letter Spacing":"Espaciado entre letras","Line Height":"Altura de lÃ­nea","Font Weight":"Grosor de fuente","Dyslexia Font":"Fuente para dislexia","Language":"Idioma","Open Accessibility Menu":"Abrir menÃº de accesibilidad"}'
            ),
            fi: JSON.parse(
                '{"Accessibility Menu":"Saavutettavuusvalikko","Reset settings":"Palauta asetukset","Close":"Sulje","Content Adjustments":"SisÃ¤llÃ¶n sÃ¤Ã¤dÃ¶t","Adjust Font Size":"SÃ¤Ã¤dÃ¤ fonttikokoa","Highlight Title":"Korosta otsikko","Highlight Links":"Korosta linkit","Readable Font":"Helposti luettava fontti","Color Adjustments":"VÃ¤rien sÃ¤Ã¤dÃ¶t","Dark Contrast":"Tumma kontrasti","Light Contrast":"Vaalea kontrasti","High Contrast":"Korkea kontrasti","High Saturation":"Korkea kyllÃ¤isyys","Low Saturation":"Matala kyllÃ¤isyys","Monochrome":"YksivÃ¤rinen","Tools":"TyÃ¶kalut","Reading Guide":"Lukemisopas","Stop Animations":"PysÃ¤ytÃ¤ animaatiot","Big Cursor":"Iso kohdistin","Increase Font Size":"Suurenna fonttikokoa","Decrease Font Size":"PienennÃ¤ fonttikokoa","Letter Spacing":"Kirjainten vÃ¤listys","Line Height":"Rivin korkeus","Font Weight":"Fontin paksuus","Dyslexia Font":"Dysleksiafontti","Language":"Kieli","Open Accessibility Menu":"Avaa saavutettavuusvalikko"}'
            ),
            fr: JSON.parse(
                '{"Accessibility Menu":"Menu d\'accessibilitÃ©","Reset settings":"RÃ©initialiser les paramÃ¨tres","Close":"Fermer","Content Adjustments":"Ajustements de contenu","Adjust Font Size":"Ajuster la taille de police","Highlight Title":"Surligner le titre","Highlight Links":"Surligner les liens","Readable Font":"Police lisible","Color Adjustments":"Ajustements de couleur","Dark Contrast":"Contraste foncÃ©","Light Contrast":"Contraste clair","High Contrast":"Contraste Ã©levÃ©","High Saturation":"Saturation Ã©levÃ©e","Low Saturation":"Saturation faible","Monochrome":"Monochrome","Tools":"Outils","Reading Guide":"Guide de lecture","Stop Animations":"ArrÃªter les animations","Big Cursor":"Gros curseur","Increase Font Size":"Augmenter la taille de police","Decrease Font Size":"RÃ©duire la taille de police","Letter Spacing":"Espacement des lettres","Line Height":"Hauteur de ligne","Font Weight":"Poids de la police","Dyslexia Font":"Police dyslexie","Language":"Langue","Open Accessibility Menu":"Ouvrir le menu d\'accessibilitÃ©"}'
            ),
            he: JSON.parse(
                '{"Accessibility Menu":"×ª×¤×¨×™×˜ × ×’×™×©×•×ª","Reset settings":"××™×¤×•×¡ ×”×’×“×¨×•×ª","Close":"×¡×’×•×¨","Content Adjustments":"×”×ª××ž×•×ª ×ª×•×›×Ÿ","Adjust Font Size":"×”×ª×× ×’×•×“×œ ×¤×•× ×˜","Highlight Title":"×”×“×’×© ×›×•×ª×¨×ª","Highlight Links":"×”×“×’×© ×§×™×©×•×¨×™×","Readable Font":"×¤×•× ×˜ ×§×¨×™×","Color Adjustments":"×”×ª××ž×•×ª ×¦×‘×¢","Dark Contrast":"× ×™×’×•×“×™×•×ª ×›×”×”","Light Contrast":"× ×™×’×•×“×™×•×ª ×‘×”×™×¨×”","High Contrast":"× ×™×’×•×“×™×•×ª ×’×‘×•×”×”","High Saturation":"×¨×•×•×™ ×¦×‘×¢ ×’×‘×•×”","Low Saturation":"×¨×•×•×™ ×¦×‘×¢ × ×ž×•×š","Monochrome":"×ž×•× ×•×›×¨×•×","Tools":"×›×œ×™×","Reading Guide":"×ž×“×¨×™×š ×§×¨×™××”","Stop Animations":"×¢×¦×™×¨×ª ×× ×™×ž×¦×™×•×ª","Big Cursor":"×¡×ž×Ÿ ×’×“×•×œ","Increase Font Size":"×”×’×“×œ ×’×•×“×œ ×¤×•× ×˜","Decrease Font Size":"×”×§×˜×Ÿ ×’×•×“×œ ×¤×•× ×˜","Letter Spacing":"×ž×¨×•×•×— ×‘×™×Ÿ ××•×ª×™×•×ª","Line Height":"×’×•×‘×” ×©×•×¨×”","Font Weight":"×ž×©×§×œ ×”×¤×•× ×˜","Dyslexia Font":"×¤×•× ×˜ ×œ×“×™×¡×œ×§×˜×™×","Language":"×©×¤×”","Open Accessibility Menu":"×¤×ª×— ×ª×¤×¨×™×˜ × ×’×™×©×•×ª"}'
            ),
            hi: JSON.parse(
                '{"Accessibility Menu":"à¤ªà¤¹à¥à¤à¤šà¤¿à¤¯à¥‹à¤—à¥à¤¯à¤¤à¤¾ à¤®à¥‡à¤¨à¥‚","Reset settings":"à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤— à¤°à¥€à¤¸à¥‡à¤Ÿ à¤•à¤°à¥‡à¤‚","Close":"à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚","Content Adjustments":"à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤¸à¤®à¤¾à¤¯à¥‹à¤œà¤¨","Adjust Font Size":"à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ à¤†à¤•à¤¾à¤° à¤¸à¤®à¤¾à¤¯à¥‹à¤œà¤¿à¤¤ à¤•à¤°à¥‡à¤‚","Highlight Title":"à¤¶à¥€à¤°à¥à¤·à¤• à¤•à¥‹ à¤¹à¤¾à¤‡à¤²à¤¾à¤‡à¤Ÿ à¤•à¤°à¥‡à¤‚","Highlight Links":"à¤²à¤¿à¤‚à¤• à¤•à¥‹ à¤¹à¤¾à¤‡à¤²à¤¾à¤‡à¤Ÿ à¤•à¤°à¥‡à¤‚","Readable Font":"à¤ªà¤¢à¤¼à¤¨à¥‡ à¤¯à¥‹à¤—à¥à¤¯ à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ","Color Adjustments":"à¤°à¤‚à¤— à¤¸à¤®à¤¾à¤¯à¥‹à¤œà¤¨","Dark Contrast":"à¤…à¤‚à¤§à¥‡à¤°à¤¾ à¤µà¤¿à¤°à¥‹à¤§","Light Contrast":"à¤ªà¥à¤°à¤•à¤¾à¤¶ à¤µà¤¿à¤°à¥‹à¤§","High Contrast":"à¤‰à¤šà¥à¤š à¤µà¤¿à¤°à¥‹à¤§","High Saturation":"à¤‰à¤šà¥à¤š à¤¸à¤‚à¤¤à¥à¤²à¤¨","Low Saturation":"à¤¨à¤¿à¤®à¥à¤¨ à¤¸à¤‚à¤¤à¥à¤²à¤¨","Monochrome":"à¤à¤•à¤°à¤‚à¤—","Tools":"à¤‰à¤ªà¤•à¤°à¤£","Reading Guide":"à¤ªà¤¢à¤¼à¤¨à¥‡ à¤•à¤¾ à¤—à¤¾à¤‡à¤¡","Stop Animations":"à¤à¤¨à¤¿à¤®à¥‡à¤¶à¤¨ à¤°à¥‹à¤•à¥‡à¤‚","Big Cursor":"à¤¬à¤¡à¤¼à¤¾ à¤•à¤°à¥à¤¸à¤°","Increase Font Size":"à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ à¤†à¤•à¤¾à¤° à¤¬à¤¢à¤¼à¤¾à¤à¤","Decrease Font Size":"à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ à¤†à¤•à¤¾à¤° à¤•à¤® à¤•à¤°à¥‡à¤‚","Letter Spacing":"à¤…à¤•à¥à¤·à¤° à¤¸à¥à¤ªà¥‡à¤¸à¤¿à¤‚à¤—","Line Height":"à¤²à¤¾à¤‡à¤¨ à¤•à¥€ à¤Šà¤à¤šà¤¾à¤ˆ","Font Weight":"à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ à¤µà¥‡à¤Ÿ","Dyslexia Font":"à¤µà¤¿à¤µà¤¿à¤§à¤¤à¤¾à¤œà¤¨à¤¿à¤¤ à¤µà¤¿à¤ªà¤¥à¤¤à¤¾ à¤«à¤¼à¥‰à¤¨à¥à¤Ÿ","Language":"à¤­à¤¾à¤·à¤¾","Open Accessibility Menu":"à¤à¤•à¥à¤¸à¥‡à¤¸à¤¿à¤¬à¤¿à¤²à¤¿à¤Ÿà¥€ à¤®à¥‡à¤¨à¥‚ à¤–à¥‹à¤²à¥‡à¤‚"}'
            ),
            hr: JSON.parse(
                '{"Accessibility Menu":"Izbornik PristupaÄnosti","Reset settings":"Resetiraj postavke","Close":"Zatvori","Content Adjustments":"Prilagodbe SadrÅ¾aja","Adjust Font Size":"Prilagodi VeliÄinu Fonta","Highlight Title":"Istakni Naslove","Highlight Links":"Istakni Poveznice","Readable Font":"ÄŒitljiv Font","Color Adjustments":"Prilagodbe Boja","Dark Contrast":"Tamni Kontrast","Light Contrast":"Svijetli Kontrast","High Contrast":"Visoki Kontrast","High Saturation":"Visoka ZasiÄ‡enost","Low Saturation":"Niska ZasiÄ‡enost","Monochrome":"Jednobojno","Tools":"Alati","Reading Guide":"VodiÄ Za ÄŒitanje","Stop Animations":"Zaustavi Animacije","Big Cursor":"Veliki Kursor","Increase Font Size":"PoveÄ‡aj VeliÄinu Fonta","Decrease Font Size":"Smanji VeliÄinu Fonta","Letter Spacing":"Razmak IzmeÄ‘u Slova","Line Height":"Visina Linije","Font Weight":"Debljina Fonta","Dyslexia Font":"Font Za Disleksiju","Language":"Jezik","Open Accessibility Menu":"Otvori Izbornik PristupaÄnosti"}'
            ),
            hu: JSON.parse(
                '{"Accessibility Menu":"HozzÃ¡fÃ©rhetÅ‘sÃ©gi menÃ¼","Reset settings":"BeÃ¡llÃ­tÃ¡sok visszaÃ¡llÃ­tÃ¡sa","Close":"BezÃ¡rÃ¡s","Content Adjustments":"Tartalom beÃ¡llÃ­tÃ¡sai","Adjust Font Size":"BetÅ±mÃ©ret beÃ¡llÃ­tÃ¡sa","Highlight Title":"CÃ­m kiemelÃ©se","Highlight Links":"Linkek kiemelÃ©se","Readable Font":"OlvashatÃ³ betÅ±tÃ­pus","Color Adjustments":"SzÃ­nbeÃ¡llÃ­tÃ¡sok","Dark Contrast":"SÃ¶tÃ©t kontraszt","Light Contrast":"VilÃ¡gos kontraszt","High Contrast":"Magas kontraszt","High Saturation":"Magas telÃ­tettsÃ©g","Low Saturation":"Alacsony telÃ­tettsÃ©g","Monochrome":"MonokrÃ³m","Tools":"EszkÃ¶zÃ¶k","Reading Guide":"OlvasÃ¡si ÃºtmutatÃ³","Stop Animations":"AnimÃ¡ciÃ³k leÃ¡llÃ­tÃ¡sa","Big Cursor":"Nagy kurzor","Increase Font Size":"BetÅ±mÃ©ret nÃ¶velÃ©se","Decrease Font Size":"BetÅ±mÃ©ret csÃ¶kkentÃ©se","Letter Spacing":"BetÅ±tÃ¡volsÃ¡g","Line Height":"Sor magassÃ¡g","Font Weight":"BetÅ±tÃ­pus vastagsÃ¡ga","Dyslexia Font":"Dyslexia betÅ±tÃ­pus","Language":"Nyelv","Open Accessibility Menu":"HozzÃ¡fÃ©rhetÅ‘sÃ©gi menÃ¼ megnyitÃ¡sa"}'
            ),
            id: JSON.parse(
                '{"Accessibility Menu":"Menu Aksesibilitas","Reset settings":"Atur Ulang Pengaturan","Close":"Tutup","Content Adjustments":"Penyesuaian Konten","Adjust Font Size":"Sesuaikan Ukuran Font","Highlight Title":"Sorot Judul","Highlight Links":"Sorot Tautan","Readable Font":"Font Mudah Dibaca","Color Adjustments":"Penyesuaian Warna","Dark Contrast":"Kontras Gelap","Light Contrast":"Kontras Terang","High Contrast":"Kontras Tinggi","High Saturation":"Saturasi Tinggi","Low Saturation":"Saturasi Rendah","Monochrome":"Monokrom","Tools":"Alat","Reading Guide":"Panduan Membaca","Stop Animations":"Hentikan Animasi","Big Cursor":"Kursor Besar","Increase Font Size":"Perbesar Ukuran Font","Decrease Font Size":"Perkecil Ukuran Font","Letter Spacing":"Jarak Huruf","Line Height":"Tinggi Baris","Font Weight":"Ketebalan Font","Dyslexia Font":"Font Disleksia","Language":"Bahasa","Open Accessibility Menu":"Buka menu aksesibilitas"}'
            ),
            it: JSON.parse(
                '{"Accessibility Menu":"Menu di accessibilitÃ ","Reset settings":"Ripristina impostazioni","Close":"Chiudi","Content Adjustments":"Regolazioni del contenuto","Adjust Font Size":"Regola la dimensione del carattere","Highlight Title":"Evidenzia il titolo","Highlight Links":"Evidenzia i collegamenti","Readable Font":"Carattere leggibile","Color Adjustments":"Regolazioni del colore","Dark Contrast":"Contrasto scuro","Light Contrast":"Contrasto chiaro","High Contrast":"Alto contrasto","High Saturation":"Alta saturazione","Low Saturation":"Bassa saturazione","Monochrome":"Monocromatico","Tools":"Strumenti","Reading Guide":"Guida alla lettura","Stop Animations":"Arresta le animazioni","Big Cursor":"Cursore grande","Increase Font Size":"Aumenta la dimensione del carattere","Decrease Font Size":"Diminuisci la dimensione del carattere","Letter Spacing":"Spaziatura delle lettere","Line Height":"Altezza della linea","Font Weight":"Peso del carattere","Dyslexia Font":"Carattere per dislessia","Language":"Lingua","Open Accessibility Menu":"Apri il menu di accessibilitÃ "}'
            ),
            ja: JSON.parse(
                '{"Accessibility Menu":"ã‚¢ã‚¯ã‚»ã‚·ãƒ“ãƒªãƒ†ã‚£ãƒ¡ãƒ‹ãƒ¥ãƒ¼","Reset settings":"è¨­å®šã‚’ãƒªã‚»ãƒƒãƒˆ","Close":"é–‰ã˜ã‚‹","Content Adjustments":"ã‚³ãƒ³ãƒ†ãƒ³ãƒ„èª¿æ•´","Adjust Font Size":"ãƒ•ã‚©ãƒ³ãƒˆã‚µã‚¤ã‚ºã‚’èª¿æ•´","Highlight Title":"ã‚¿ã‚¤ãƒˆãƒ«ã‚’å¼·èª¿è¡¨ç¤º","Highlight Links":"ãƒªãƒ³ã‚¯ã‚’å¼·èª¿è¡¨ç¤º","Readable Font":"èª­ã¿ã‚„ã™ã„ãƒ•ã‚©ãƒ³ãƒˆ","Color Adjustments":"è‰²ã®èª¿æ•´","Dark Contrast":"ãƒ€ãƒ¼ã‚¯ã‚³ãƒ³ãƒˆãƒ©ã‚¹ãƒˆ","Light Contrast":"ãƒ©ã‚¤ãƒˆã‚³ãƒ³ãƒˆãƒ©ã‚¹ãƒˆ","High Contrast":"é«˜ã„ã‚³ãƒ³ãƒˆãƒ©ã‚¹ãƒˆ","High Saturation":"å½©åº¦ãŒé«˜ã„","Low Saturation":"å½©åº¦ãŒä½Žã„","Monochrome":"ãƒ¢ãƒŽã‚¯ãƒ­ãƒ¼ãƒ ","Tools":"ãƒ„ãƒ¼ãƒ«","Reading Guide":"èª­ã¿ä¸Šã’ã‚¬ã‚¤ãƒ‰","Stop Animations":"ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’åœæ­¢","Big Cursor":"å¤§ããªã‚«ãƒ¼ã‚½ãƒ«","Increase Font Size":"ãƒ•ã‚©ãƒ³ãƒˆã‚µã‚¤ã‚ºã‚’å¤§ããã™ã‚‹","Decrease Font Size":"ãƒ•ã‚©ãƒ³ãƒˆã‚µã‚¤ã‚ºã‚’å°ã•ãã™ã‚‹","Letter Spacing":"æ–‡å­—é–“éš”","Line Height":"è¡Œã®é«˜ã•","Font Weight":"ãƒ•ã‚©ãƒ³ãƒˆã®å¤ªã•","Dyslexia Font":"ãƒ‡ã‚£ã‚¹ãƒ¬ã‚¯ã‚·ã‚¢ç”¨ãƒ•ã‚©ãƒ³ãƒˆ","Language":"è¨€èªž","Open Accessibility Menu":"ã‚¢ã‚¯ã‚»ã‚·ãƒ“ãƒªãƒ†ã‚£ãƒ¡ãƒ‹ãƒ¥ãƒ¼ã‚’é–‹ã"}'
            ),
            ka: JSON.parse(
                '{"Accessibility Menu":"áƒáƒ“áƒáƒžáƒ¢áƒ˜áƒ áƒ”áƒ‘áƒ£áƒšáƒ˜ áƒ›áƒ”áƒœáƒ˜áƒ£","Reset settings":"áƒžáƒáƒ áƒáƒ›áƒ”áƒ¢áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ“áƒáƒ‘áƒ áƒ£áƒœáƒ”áƒ‘áƒ","Close":"áƒ“áƒáƒ®áƒ£áƒ áƒ•áƒ","Content Adjustments":"áƒ¨áƒ˜áƒ’áƒ—áƒáƒ•áƒ¡áƒ˜áƒ¡ áƒ›áƒáƒ áƒ’áƒ”áƒ‘áƒ","Adjust Font Size":"áƒ¤áƒáƒœáƒ¢áƒ˜áƒ¡ áƒ–áƒáƒ›áƒ˜áƒ¡ áƒ›áƒáƒ áƒ’áƒ”áƒ‘áƒ","Highlight Title":"áƒ¡áƒáƒ—áƒáƒ£áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ’áƒáƒ›áƒáƒ§áƒáƒ¤áƒ","Highlight Links":"áƒ‘áƒ›áƒ£áƒšáƒ”áƒ‘áƒ˜áƒ¡ áƒ’áƒáƒ›áƒáƒ§áƒáƒ¤áƒ","Readable Font":"áƒ¬áƒáƒ™áƒ˜áƒ—áƒ®áƒ•áƒáƒ“áƒ˜ áƒ¢áƒ”áƒ¥áƒ¡áƒ¢áƒ”áƒ‘áƒ˜","Color Adjustments":"áƒ¤áƒ”áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ›áƒáƒ áƒ’áƒ”áƒ‘áƒ","Dark Contrast":"áƒ‘áƒœáƒ”áƒšáƒ˜ áƒ”áƒšáƒ¤áƒ”áƒ áƒ˜","Light Contrast":"áƒœáƒáƒ—áƒ”áƒšáƒ˜ áƒ”áƒšáƒ¤áƒ”áƒ áƒ˜","High Contrast":"áƒ›áƒáƒ¦áƒáƒšáƒ˜ áƒ”áƒšáƒ¤áƒ”áƒ áƒ˜","High Saturation":"áƒ›áƒáƒ¦áƒáƒšáƒ˜ áƒ’áƒáƒ¯áƒ”áƒ áƒ”áƒ‘áƒ","Low Saturation":"áƒ“áƒáƒ‘áƒáƒšáƒ˜ áƒ’áƒáƒ¯áƒ”áƒ áƒ”áƒ‘áƒ","Monochrome":"áƒ”áƒ áƒ—áƒ¤áƒ”áƒ áƒáƒ•áƒáƒœáƒ˜ áƒ’áƒáƒ›áƒáƒ¡áƒáƒ®áƒ£áƒšáƒ”áƒ‘áƒ","Tools":"áƒ®áƒ”áƒšáƒ¡áƒáƒ¬áƒ§áƒáƒ”áƒ‘áƒ˜","Reading Guide":"áƒ™áƒ˜áƒ—áƒ®áƒ•áƒ˜áƒ¡ áƒ’áƒáƒ›áƒ§áƒáƒšáƒ˜ áƒ–áƒáƒšáƒ˜","Stop Animations":"áƒáƒœáƒ˜áƒ›áƒáƒªáƒ˜áƒ”áƒ‘áƒ˜áƒ¡ áƒ’áƒáƒ©áƒ”áƒ áƒ”áƒ‘áƒ","Big Cursor":"áƒ“áƒ˜áƒ“áƒ˜ áƒ™áƒ£áƒ áƒ¡áƒáƒ áƒ˜","Increase Font Size":"áƒ¤áƒáƒœáƒ¢áƒ˜áƒ¡ áƒ–áƒáƒ›áƒ˜áƒ¡ áƒ’áƒáƒ–áƒ áƒ“áƒ","Decrease Font Size":"áƒ¤áƒáƒœáƒ¢áƒ˜áƒ¡ áƒ–áƒáƒ›áƒ˜áƒ¡ áƒ¨áƒ”áƒ›áƒªáƒ˜áƒ áƒ”áƒ‘áƒ","Letter Spacing":"áƒáƒ¡áƒáƒ”áƒ‘áƒ¡ áƒ¨áƒáƒ áƒ˜áƒ¡ áƒ“áƒáƒ¨áƒáƒ áƒ”áƒ‘áƒ","Line Height":"áƒ®áƒáƒ–áƒ˜áƒ¡ áƒ¡áƒ˜áƒ›áƒáƒ¦áƒšáƒ”","Font Weight":"áƒ¤áƒáƒœáƒ¢áƒ˜áƒ¡ áƒ¬áƒáƒœáƒ","Dyslexia Font":"áƒ“áƒ˜áƒ¡áƒšáƒ”áƒ¥áƒ¡áƒ˜áƒ£áƒ áƒ˜ áƒ¤áƒáƒœáƒ¢áƒ˜","Language":"áƒ”áƒœáƒ","Open Accessibility Menu":"áƒ’áƒáƒ®áƒ¡áƒ”áƒœáƒ˜ áƒáƒ“áƒáƒžáƒ¢áƒ˜áƒ áƒ”áƒ‘áƒ£áƒšáƒ˜ áƒ›áƒ”áƒœáƒ˜áƒ£"}'
            ),
            ko: JSON.parse(
                '{"Accessibility Menu":"ì ‘ê·¼ì„± ë©”ë‰´","Reset settings":"ì„¤ì • ì´ˆê¸°í™”","Close":"ë‹«ê¸°","Content Adjustments":"ì»¨í…ì¸  ì¡°ì •","Adjust Font Size":"ê¸€ê¼´ í¬ê¸° ì¡°ì •","Highlight Title":"ì œëª© ê°•ì¡°","Highlight Links":"ë§í¬ ê°•ì¡°","Readable Font":"ì½ê¸° ì‰¬ìš´ ê¸€ê¼´","Color Adjustments":"ìƒ‰ìƒ ì¡°ì •","Dark Contrast":"ì–´ë‘ìš´ ëŒ€ë¹„","Light Contrast":"ë°ì€ ëŒ€ë¹„","High Contrast":"ë†’ì€ ëŒ€ë¹„","High Saturation":"ë†’ì€ ì±„ë„","Low Saturation":"ë‚®ì€ ì±„ë„","Monochrome":"ë‹¨ìƒ‰","Tools":"ë„êµ¬","Reading Guide":"ì½ê¸° ê°€ì´ë“œ","Stop Animations":"ì• ë‹ˆë©”ì´ì…˜ ì¤‘ì§€","Big Cursor":"í° ì»¤ì„œ","Increase Font Size":"ê¸€ê¼´ í¬ê¸° ì¦ê°€","Decrease Font Size":"ê¸€ê¼´ í¬ê¸° ê°ì†Œ","Letter Spacing":"ìžê°„","Line Height":"ì¤„ ê°„ê²©","Font Weight":"ê¸€ê¼´ ë‘ê»˜","Dyslexia Font":"ë‚œë…ì¦ ê¸€ê¼´","Language":"ì–¸ì–´","Open Accessibility Menu":"ì ‘ê·¼ì„± ë©”ë‰´ ì—´ê¸°"}'
            ),
            ms: JSON.parse(
                '{"Accessibility Menu":"Menu Aksesibiliti","Reset settings":"Tetapkan semula tetapan","Close":"Tutup","Content Adjustments":"Penyesuaian Kandungan","Adjust Font Size":"Laraskan Saiz Fon","Highlight Title":"Serlahkan Tajuk","Highlight Links":"Serlahkan Pautan","Readable Font":"Fon Mudah Baca","Color Adjustments":"Penyesuaian Warna","Dark Contrast":"Kontras Gelap","Light Contrast":"Kontras Terang","High Contrast":"Kontras Tinggi","High Saturation":"Saturasi Tinggi","Low Saturation":"Saturasi Rendah","Monochrome":"Monokrom","Tools":"Peralatan","Reading Guide":"Panduan Membaca","Stop Animations":"Hentikan Animasi","Big Cursor":"Kursor Besar","Increase Font Size":"Besarkan Saiz Fon","Decrease Font Size":"Kecilkan Saiz Fon","Letter Spacing":"Ruangan Huruf","Line Height":"Ketinggian Garis","Font Weight":"Ketebalan Fon","Dyslexia Font":"Fon Dyslexia","Language":"Bahasa","Open Accessibility Menu":"Buka menu kebolehcapaian"}'
            ),
            nl: JSON.parse(
                '{"Accessibility Menu":"Toegankelijkheidsmenu","Reset settings":"Instellingen resetten","Close":"Sluiten","Content Adjustments":"Inhoudsaanpassingen","Adjust Font Size":"Lettergrootte aanpassen","Highlight Title":"Titel markeren","Highlight Links":"Links markeren","Readable Font":"Leesbaar lettertype","Color Adjustments":"Kleur aanpassingen","Dark Contrast":"Donker contrast","Light Contrast":"Licht contrast","High Contrast":"Hoog contrast","High Saturation":"Hoge verzadiging","Low Saturation":"Lage verzadiging","Monochrome":"Monochroom","Tools":"Gereedschappen","Reading Guide":"Leesgids","Stop Animations":"Animaties stoppen","Big Cursor":"Grote cursor","Increase Font Size":"Lettergrootte vergroten","Decrease Font Size":"Lettergrootte verkleinen","Letter Spacing":"Letterafstand","Line Height":"Regelhoogte","Font Weight":"Letterdikte","Dyslexia Font":"Dyslexie lettertype","Language":"Taal","Open Accessibility Menu":"Toegankelijkheidsmenu openen"}'
            ),
            no: JSON.parse(
                '{"Accessibility Menu":"Tilgjengelighetsmeny","Reset settings":"Tilbakestill innstillinger","Close":"Lukk","Content Adjustments":"Innholdstilpasninger","Adjust Font Size":"Juster skriftstÃ¸rrelse","Highlight Title":"Fremhev tittel","Highlight Links":"Fremhev lenker","Readable Font":"Lesbar skrifttype","Color Adjustments":"Fargejusteringer","Dark Contrast":"MÃ¸rk kontrast","Light Contrast":"Lys kontrast","High Contrast":"HÃ¸y kontrast","High Saturation":"HÃ¸y metning","Low Saturation":"Lav metning","Monochrome":"Monokrom","Tools":"VerktÃ¸y","Reading Guide":"Leseguide","Stop Animations":"Stopp animasjoner","Big Cursor":"Stor peker","Increase Font Size":"Ã˜k skriftstÃ¸rrelsen","Decrease Font Size":"Reduser skriftstÃ¸rrelsen","Letter Spacing":"Bokstavavstand","Line Height":"LinjehÃ¸yde","Font Weight":"Skriftvekt","Dyslexia Font":"Dysleksisk skrifttype","Language":"SprÃ¥k","Open Accessibility Menu":"Ã…pne tilgjengelighetsmeny"}'
            ),
            fa: JSON.parse(
                '{"Accessibility Menu":"Ù…Ù†ÙˆÛŒ Ø¯Ø³ØªØ±Ø³ÛŒ","Reset settings":"Ø¨Ø§Ø²Ù†Ø´Ø§Ù†ÛŒ ØªÙ†Ø¸ÛŒÙ…Ø§Øª","Close":"Ø¨Ø³ØªÙ†","Content Adjustments":"ØªÙ†Ø¸ÛŒÙ…Ø§Øª Ù…Ø­ØªÙˆØ§","Adjust Font Size":"ØªÙ†Ø¸ÛŒÙ… Ø§Ù†Ø¯Ø§Ø²Ù‡ ÙÙˆÙ†Øª","Highlight Title":"Ø¨Ø±Ø¬Ø³ØªÙ‡ Ú©Ø±Ø¯Ù† Ø¹Ù†ÙˆØ§Ù†","Highlight Links":"Ø¨Ø±Ø¬Ø³ØªÙ‡ Ú©Ø±Ø¯Ù† Ù„ÛŒÙ†Ú©â€ŒÙ‡Ø§","Readable Font":"ÙÙˆÙ†Øª Ø®ÙˆØ§Ù†Ø§","Color Adjustments":"ØªÙ†Ø¸ÛŒÙ…Ø§Øª Ø±Ù†Ú¯","Dark Contrast":"Ú©Ù†ØªØ±Ø§Ø³Øª ØªØ§Ø±ÛŒÚ©","Light Contrast":"Ú©Ù†ØªØ±Ø§Ø³Øª Ø±ÙˆØ´Ù†","High Contrast":"Ú©Ù†ØªØ±Ø§Ø³Øª Ø¨Ø§Ù„Ø§","High Saturation":"Ø§Ø´Ø¨Ø§Ø¹ Ø¨Ø§Ù„Ø§","Low Saturation":"Ø§Ø´Ø¨Ø§Ø¹ Ù¾Ø§ÛŒÛŒÙ†","Monochrome":"ØªÚ©â€ŒØ±Ù†Ú¯","Tools":"Ø§Ø¨Ø²Ø§Ø±Ù‡Ø§","Reading Guide":"Ø±Ø§Ù‡Ù†Ù…Ø§ÛŒ Ø®ÙˆØ§Ù†Ø¯Ù†","Stop Animations":"ØªÙˆÙ‚Ù Ø§Ù†ÛŒÙ…ÛŒØ´Ù†â€ŒÙ‡Ø§","Big Cursor":"Ù…Ø¤Ø´Ø± Ø¨Ø²Ø±Ú¯","Increase Font Size":"Ø§ÙØ²Ø§ÛŒØ´ Ø§Ù†Ø¯Ø§Ø²Ù‡ ÙÙˆÙ†Øª","Decrease Font Size":"Ú©Ø§Ù‡Ø´ Ø§Ù†Ø¯Ø§Ø²Ù‡ ÙÙˆÙ†Øª","Letter Spacing":"ÙØ§ØµÙ„Ù‡ Ø¨ÛŒÙ† Ø­Ø±ÙˆÙ","Line Height":"Ø§Ø±ØªÙØ§Ø¹ Ø®Ø·","Font Weight":"ÙˆØ²Ù† ÙÙˆÙ†Øª","Dyslexia Font":"ÙÙˆÙ†Øª Ø¯ÛŒØ³Ù„Ú©Ø³ÛŒØ§","Language":"Ø²Ø¨Ø§Ù†","Open Accessibility Menu":"Ø¨Ø§Ø²Ú©Ø±Ø¯Ù† Ù…Ù†ÙˆÛŒ Ø¯Ø³ØªØ±Ø³ÛŒ"}'
            ),
            pl: JSON.parse(
                '{"Accessibility Menu":"Menu dostÄ™pnoÅ›ci","Reset settings":"Reset ustawieÅ„","Close":"Zamknij","Content Adjustments":"Dostosowanie zawartoÅ›ci","Adjust Font Size":"Dostosuj rozmiar czcionki","Highlight Title":"PodÅ›wietl tytuÅ‚y","Highlight Links":"PodÅ›wietl linki","Readable Font":"Czytelna czcionka","Color Adjustments":"Dostosowanie kolorÃ³w","Dark Contrast":"Ciemny kontrast","Light Contrast":"Jasny kontrast","High Contrast":"Wysoki kontrast","High Saturation":"Wysoka saturacja","Low Saturation":"Niska saturacja","Monochrome":"MonochromatycznoÅ›Ä‡","Tools":"NarzÄ™dzia","Reading Guide":"Pomocnik czytania","Stop Animations":"Wstrzymaj animacje","Big Cursor":"DuÅ¼y kursor","Increase Font Size":"ZwiÄ™ksz rozmiar czcionki","Decrease Font Size":"Zmniejsz rozmiar czcionki","Letter Spacing":"OdstÄ™py miÄ™dzy literami","Line Height":"WysokoÅ›Ä‡ wierszy","Font Weight":"Pogrubiona czcionka","Dyslexia Font":"Czcionka dla dyslektykÃ³w","Language":"JÄ™zyk","Open Accessibility Menu":"OtwÃ³rz menu dostÄ™pnoÅ›ci"}'
            ),
            pt: JSON.parse(
                '{"Accessibility Menu":"Menu de Acessibilidade","Reset settings":"Redefinir configuraÃ§Ãµes","Close":"Fechar","Content Adjustments":"Ajustes de ConteÃºdo","Adjust Font Size":"Ajustar Tamanho da Fonte","Highlight Title":"Destacar TÃ­tulo","Highlight Links":"Destacar Links","Readable Font":"Fonte LegÃ­vel","Color Adjustments":"Ajustes de Cor","Dark Contrast":"Contraste Escuro","Light Contrast":"Contraste Claro","High Contrast":"Alto Contraste","High Saturation":"SaturaÃ§Ã£o Alta","Low Saturation":"SaturaÃ§Ã£o Baixa","Monochrome":"MonocromÃ¡tico","Tools":"Ferramentas","Reading Guide":"Guia de Leitura","Stop Animations":"Parar AnimaÃ§Ãµes","Big Cursor":"Cursor Grande","Increase Font Size":"Aumentar Tamanho da Fonte","Decrease Font Size":"Diminuir Tamanho da Fonte","Letter Spacing":"EspaÃ§amento entre Letras","Line Height":"Altura da Linha","Font Weight":"Espessura da Fonte","Dyslexia Font":"Fonte para Dislexia","Language":"Idioma","Open Accessibility Menu":"Abrir menu de acessibilidade"}'
            ),
            ro: JSON.parse(
                '{"Accessibility Menu":"Meniu de accesibilitate","Reset settings":"ReseteazÄƒ setÄƒrile","Close":"ÃŽnchide","Content Adjustments":"AjustÄƒri conÈ›inut","Adjust Font Size":"AjusteazÄƒ dimensiunea fontului","Highlight Title":"EvidenÈ›iazÄƒ titlul","Highlight Links":"EvidenÈ›iazÄƒ legÄƒturile","Readable Font":"Font lizibil","Color Adjustments":"AjustÄƒri de culoare","Dark Contrast":"Contrast Ã®ntunecat","Light Contrast":"Contrast luminos","High Contrast":"Contrast ridicat","High Saturation":"SaturaÈ›ie ridicatÄƒ","Low Saturation":"SaturaÈ›ie redusÄƒ","Monochrome":"Monocrom","Tools":"Instrumente","Reading Guide":"Ghid de lecturÄƒ","Stop Animations":"OpriÈ›i animaÈ›iile","Big Cursor":"Cursor mare","Increase Font Size":"MÄƒreÈ™te dimensiunea fontului","Decrease Font Size":"MicÈ™oreazÄƒ dimensiunea fontului","Letter Spacing":"SpaÈ›ierea literelor","Line Height":"ÃŽnÄƒlÈ›imea liniei","Font Weight":"Grosimea fontului","Dyslexia Font":"Font pentru dislexie","Language":"LimbÄƒ","Open Accessibility Menu":"DeschideÈ›i meniul de accesibilitate"}'
            ),
            ru: JSON.parse(
                '{"Accessibility Menu":"ÐœÐµÐ½ÑŽ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÐµÐ¹","Reset settings":"Ð¡Ð±Ñ€Ð¾Ñ Ð½Ð°ÑÑ‚Ñ€Ð¾ÐµÐº","Close":"Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ","Content Adjustments":"ÐšÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð¸Ñ€Ð¾Ð²ÐºÐ° ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð°","Adjust Font Size":"ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ñ€Ð°Ð·Ð¼ÐµÑ€Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Highlight Title":"Ð’Ñ‹Ð´ÐµÐ»Ð¸Ñ‚ÑŒ Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²ÐºÐ¸","Highlight Links":"Ð’Ñ‹Ð´ÐµÐ»Ð¸Ñ‚ÑŒ ÑÑÑ‹Ð»ÐºÐ¸","Readable Font":"Ð§Ð¸Ñ‚Ð°ÐµÐ¼Ñ‹Ð¹ ÑˆÑ€Ð¸Ñ„Ñ‚","Color Adjustments":"ÐšÐ¾Ñ€Ñ€ÐµÐºÑ†Ð¸Ñ Ñ†Ð²ÐµÑ‚Ð°","Dark Contrast":"Ð¢ÐµÐ¼Ð½Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","Light Contrast":"Ð¡Ð²ÐµÑ‚Ð»Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Contrast":"Ð’Ñ‹ÑÐ¾ÐºÐ¸Ð¹ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Saturation":"Ð’Ñ‹ÑÐ¾ÐºÐ°Ñ Ð½Ð°ÑÑ‹Ñ‰ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ","Low Saturation":"ÐÐ¸Ð·ÐºÐ°Ñ Ð½Ð°ÑÑ‹Ñ‰ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ","Monochrome":"ÐœÐ¾Ð½Ð¾Ñ…Ñ€Ð¾Ð¼Ð½Ñ‹Ð¹ Ñ†Ð²ÐµÑ‚","Tools":"Ð˜Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹","Reading Guide":"Ð ÑƒÐºÐ¾Ð²Ð¾Ð´ÑÑ‚Ð²Ð¾ Ð¿Ð¾ Ñ‡Ñ‚ÐµÐ½Ð¸ÑŽ","Stop Animations":"ÐžÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸ÑŽ","Big Cursor":"Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ ÐºÑƒÑ€ÑÐ¾Ñ€","Increase Font Size":"Ð£Ð²ÐµÐ»Ð¸Ñ‡Ð¸Ñ‚ÑŒ Ñ€Ð°Ð·Ð¼ÐµÑ€ ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Decrease Font Size":"Ð£Ð¼ÐµÐ½ÑŒÑˆÐ¸Ñ‚ÑŒ Ñ€Ð°Ð·Ð¼ÐµÑ€ ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Letter Spacing":"ÐœÐµÐ¶Ð±ÑƒÐºÐ²ÐµÐ½Ð½Ð¾Ðµ Ñ€Ð°ÑÑÑ‚Ð¾ÑÐ½Ð¸Ðµ","Line Height":"Ð’Ñ‹ÑÐ¾Ñ‚Ð° Ð»Ð¸Ð½Ð¸Ð¸","Font Weight":"Ð’ÐµÑ ÑˆÑ€Ð¸Ñ„Ñ‚Ð°","Dyslexia Font":"Ð¨Ñ€Ð¸Ñ„Ñ‚ Ð”Ð¸ÑÐ»ÐµÐºÑÐ¸Ñ","Language":"Ð¯Ð·Ñ‹Ðº","Open Accessibility Menu":"ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¼ÐµÐ½ÑŽ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÐµÐ¹"}'
            ),
            sl: JSON.parse(
                '{"Accessibility Menu":"Meni dostopnosti","Reset settings":"Ponastavi nastavitve","Close":"Zapri","Content Adjustments":"Prilagoditve vsebine","Adjust Font Size":"Prilagodi velikost pisave","Highlight Title":"OznaÄi naslov","Highlight Links":"OznaÄi povezave","Readable Font":"Bralna pisava","Color Adjustments":"Prilagoditve barv","Dark Contrast":"Temni kontrast","Light Contrast":"Svetli kontrast","High Contrast":"Visoki kontrast","High Saturation":"Visoka nasiÄenost","Low Saturation":"Nizka nasiÄenost","Monochrome":"Monokromno","Tools":"Orodja","Reading Guide":"Bralni vodnik","Stop Animations":"Ustavi animacije","Big Cursor":"Velik kazalec","Increase Font Size":"PoveÄaj velikost pisave","Decrease Font Size":"ZmanjÅ¡aj velikost pisave","Letter Spacing":"Razmik med Ärkami","Line Height":"ViÅ¡ina vrstice","Font Weight":"Debelina pisave","Dyslexia Font":"Pisava za disleksijo","Language":"Jezik","Open Accessibility Menu":"Odpri meni dostopnosti"}'
            ),
            sk: JSON.parse(
                '{"Accessibility Menu":"Menu prÃ­stupnosti","Reset settings":"ObnoviÅ¥ nastavenia","Close":"ZavrieÅ¥","Content Adjustments":"Nastavenia obsahu","Adjust Font Size":"PrispÃ´sobiÅ¥ veÄ¾kosÅ¥ pÃ­sma","Highlight Title":"ZvÃ½razniÅ¥ nadpis","Highlight Links":"ZvÃ½razniÅ¥ odkazy","Readable Font":"ÄŒitateÄ¾nÃ© pÃ­smo","Color Adjustments":"Nastavenia farieb","Dark Contrast":"TmavÃ½ kontrast","Light Contrast":"SvetlÃ½ kontrast","High Contrast":"VysokÃ½ kontrast","High Saturation":"VysokÃ¡ saturÃ¡cia","Low Saturation":"NÃ­zka saturÃ¡cia","Monochrome":"MonochromatickÃ©","Tools":"NÃ¡stroje","Reading Guide":"Sprievodca ÄÃ­tanÃ­m","Stop Animations":"ZastaviÅ¥ animÃ¡cie","Big Cursor":"VeÄ¾kÃ½ kurzor","Increase Font Size":"ZvÃ¤ÄÅ¡iÅ¥ veÄ¾kosÅ¥ pÃ­sma","Decrease Font Size":"ZmenÅ¡iÅ¥ veÄ¾kosÅ¥ pÃ­sma","Letter Spacing":"Rozostup pÃ­smen","Line Height":"VÃ½Å¡ka riadku","Font Weight":"Tlak pÃ­sma","Dyslexia Font":"PÃ­smo pre dyslexiu","Language":"Jazyk","Open Accessibility Menu":"OtvoriÅ¥ menu prÃ­stupnosti"}'
            ),
            sr: JSON.parse(
                '{"Accessibility Menu":"Meni Za PristupaÄnost","Reset settings":"Resetuj postavke","Close":"Zatvori","Content Adjustments":"PodeÅ¡avanje SadrÅ¾aja","Adjust Font Size":"PodeÅ¡avanje VeliÄine Fonta","Highlight Title":"OznaÄi Naslove","Highlight Links":"OznaÄi Veze","Readable Font":"ÄŒitljiviji Font","Color Adjustments":"PodeÅ¡avanje Boja","Dark Contrast":"Tamni Kontrast","Light Contrast":"Svijetli Kontrast","High Contrast":"Visoki Kontrast","High Saturation":"Velika ZasiÄ‡enost","Low Saturation":"Niska ZasiÄ‡enost","Monochrome":"Jednobojni","Tools":"Alati","Reading Guide":"VodiÄ Za ÄŒitanje","Stop Animations":"Zaustavi Animacije","Big Cursor":"Veliki Kursor","Increase Font Size":"PoveÄ‡aj VeliÄinu Fonta","Decrease Font Size":"Smanji VeliÄinu Fonta","Letter Spacing":"Razmak Slova","Line Height":"Visina Linije","Font Weight":"Debljina Fonta","Dyslexia Font":"Font Za DisleksiÄare","Language":"Jezik","Open Accessibility Menu":"Otvori Meni Za PristupaÄnost"}'
            ),
            "sr-SP": JSON.parse(
                '{"Accessibility Menu":"ÐœÐµÐ½Ð¸ Ð—Ð° ÐŸÑ€Ð¸ÑÑ‚ÑƒÐ¿Ð°Ñ‡Ð½Ð¾ÑÑ‚","Reset settings":"Ð ÐµÑÐµÑ‚ÑƒÑ˜ Ð¿Ð¾ÑÑ‚Ð°Ð²ÐºÐµ","Close":"Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸","Content Adjustments":"ÐŸÐ¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐµ Ð¡Ð°Ð´Ñ€Ð¶Ð°Ñ˜Ð°","Adjust Font Size":"ÐŸÐ¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐµ Ð’ÐµÐ»Ð¸Ñ‡Ð¸Ð½Ðµ Ð¤Ð¾Ð½Ñ‚Ð°","Highlight Title":"ÐžÐ·Ð½Ð°Ñ‡Ð¸ ÐÐ°ÑÐ»Ð¾Ð²Ðµ","Highlight Links":"ÐžÐ·Ð½Ð°Ñ‡Ð¸ Ð’ÐµÐ·Ðµ","Readable Font":"Ð§Ð¸Ñ‚Ñ™Ð¸Ð²Ð¸Ñ˜Ð¸ Ð¤Ð¾Ð½Ñ‚","Color Adjustments":"ÐŸÐ¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐµ Ð‘Ð¾Ñ˜Ð°","Dark Contrast":"Ð¢Ð°Ð¼Ð½Ð¸ ÐšÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","Light Contrast":"Ð¡Ð²Ð¸Ñ˜ÐµÑ‚Ð»Ð¸ ÐšÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Contrast":"Ð’Ð¸ÑÐ¾ÐºÐ¸ ÐšÐ¾Ð½Ñ‚Ñ€Ð°ÑÑ‚","High Saturation":"Ð’ÐµÐ»Ð¸ÐºÐ° Ð—Ð°ÑÐ¸Ñ›ÐµÐ½Ð¾ÑÑ‚","Low Saturation":"ÐÐ¸ÑÐºÐ° Ð—Ð°ÑÐ¸Ñ›ÐµÐ½Ð¾ÑÑ‚","Monochrome":"ÐˆÐµÐ´Ð½Ð¾Ð±Ð¾Ñ˜Ð½Ð¸","Tools":"ÐÐ»Ð°Ñ‚Ð¸","Reading Guide":"Ð’Ð¾Ð´Ð¸Ñ‡ Ð—Ð° Ð§Ð¸Ñ‚Ð°ÑšÐµ","Stop Animations":"Ð—Ð°ÑƒÑÑ‚Ð°Ð²Ð¸ ÐÐ½Ð¸Ð¼Ð°Ñ†Ð¸Ñ˜Ðµ","Big Cursor":"Ð’ÐµÐ»Ð¸ÐºÐ¸ ÐšÑƒÑ€ÑÐ¾Ñ€","Increase Font Size":"ÐŸÐ¾Ð²ÐµÑ›Ð°Ñ˜ Ð’ÐµÐ»Ð¸Ñ‡Ð¸Ð½Ñƒ Ð¤Ð¾Ð½Ñ‚Ð°","Decrease Font Size":"Ð¡Ð¼Ð°ÑšÐ¸ Ð’ÐµÐ»Ð¸Ñ‡Ð¸Ð½Ñƒ Ð¤Ð¾Ð½Ñ‚Ð°","Letter Spacing":"Ð Ð°Ð·Ð¼Ð°Ðº Ð¡Ð»Ð¾Ð²Ð°","Line Height":"Ð’Ð¸ÑÐ¸Ð½Ð° Ð›Ð¸Ð½Ð¸Ñ˜Ðµ","Font Weight":"Ð”ÐµÐ±Ñ™Ð¸Ð½Ð° Ð¤Ð¾Ð½Ñ‚Ð°","Dyslexia Font":"Ð¤Ð¾Ð½Ñ‚ Ð—Ð° Ð”Ð¸ÑÐ»ÐµÐºÑÐ¸Ñ‡Ð°Ñ€Ðµ","Language":"ÐˆÐµÐ·Ð¸Ðº","Open Accessibility Menu":"ÐžÑ‚Ð²Ð¾Ñ€Ð¸ ÐœÐµÐ½Ð¸ Ð—Ð° ÐŸÑ€Ð¸ÑÑ‚ÑƒÐ¿Ð°Ñ‡Ð½Ð¾ÑÑ‚"}'
            ),
            ta: JSON.parse(
                '{"Accessibility Menu":"Menu ng Accessibility","Reset settings":"I-reset ang mga setting","Close":"Isara","Content Adjustments":"Ayusin ang Nilalaman","Adjust Font Size":"I-adjust ang Laki ng Font","Highlight Title":"I-highlight ang Pamagat","Highlight Links":"I-highlight ang mga Link","Readable Font":"Madaling Basahing Font","Color Adjustments":"Ayusin ang Kulay","Dark Contrast":"Madilim na Pagkakaiba","Light Contrast":"Maliwanag na Pagkakaiba","High Contrast":"Mataas na Pagkakaiba","High Saturation":"Mataas na Saturation","Low Saturation":"Mababang Saturation","Monochrome":"Monokrom","Tools":"Mga Kasangkapan","Reading Guide":"Gabay sa Pagbabasa","Stop Animations":"Itigil ang Mga Animasyon","Big Cursor":"Malaking Cursor","Increase Font Size":"Palakihin ang Laki ng Font","Decrease Font Size":"Bawasan ang Laki ng Font","Letter Spacing":"Espasyo ng mga Titik","Line Height":"Taas ng Linya","Font Weight":"Bigat ng Font","Dyslexia Font":"Font para sa Dyslexia","Language":"Wika","Open Accessibility Menu":"Buksan ang Menu ng Accessibility"}'
            ),
            tr: JSON.parse(
                '{"Accessibility Menu":"EriÅŸilebilirlik MenÃ¼sÃ¼","Reset settings":"AyarlarÄ± SÄ±fÄ±rla","Close":"Kapat","Content Adjustments":"Ä°Ã§erik AyarlarÄ±","Adjust Font Size":"YazÄ± Tipi Boyutunu Ayarla","Highlight Title":"BaÅŸlÄ±ÄŸÄ± Vurgula","Highlight Links":"BaÄŸlantÄ±larÄ± Vurgula","Readable Font":"OkunaklÄ± YazÄ± Tipi","Color Adjustments":"Renk AyarlarÄ±","Dark Contrast":"Koyu Kontrast","Light Contrast":"AÃ§Ä±k Kontrast","High Contrast":"YÃ¼ksek Kontrast","High Saturation":"YÃ¼ksek Doygunluk","Low Saturation":"DÃ¼ÅŸÃ¼k Doygunluk","Monochrome":"Tek Renkli","Tools":"AraÃ§lar","Reading Guide":"Okuma Rehberi","Stop Animations":"AnimasyonlarÄ± Durdur","Big Cursor":"BÃ¼yÃ¼k Ä°mleÃ§","Increase Font Size":"YazÄ± Tipi Boyutunu ArtÄ±r","Decrease Font Size":"YazÄ± Tipi Boyutunu Azalt","Letter Spacing":"Harf AralÄ±ÄŸÄ±","Line Height":"SatÄ±r YÃ¼ksekliÄŸi","Font Weight":"YazÄ± Tipi KalÄ±nlÄ±ÄŸÄ±","Dyslexia Font":"Disleksi YazÄ± Tipi","Language":"Dil","Open Accessibility Menu":"EriÅŸilebilirlik menÃ¼sÃ¼nÃ¼ aÃ§"}'
            ),
            zh_Hans: JSON.parse(
                '{"Accessibility Menu":"è¾…åŠ©åŠŸèƒ½èœå•","Reset settings":"é‡ç½®è®¾ç½®","Close":"å…³é—­","Content Adjustments":"å†…å®¹è°ƒæ•´","Adjust Font Size":"è°ƒæ•´å­—ä½“å¤§å°","Highlight Title":"æ ‡é¢˜é«˜äº®","Highlight Links":"é“¾æŽ¥é«˜äº®","Readable Font":"æ˜“è¯»å­—ä½“","Color Adjustments":"è‰²å½©è°ƒæ•´","Dark Contrast":"é«˜å¯¹æ¯”åº¦ï¼ˆé»‘è‰²ï¼‰","Light Contrast":"é«˜å¯¹æ¯”åº¦ï¼ˆç™½è‰²ï¼‰","High Contrast":"é«˜å¯¹æ¯”åº¦","High Saturation":"é«˜é¥±å’Œåº¦","Low Saturation":"ä½Žé¥±å’Œåº¦","Monochrome":"å•è‰²","Tools":"æ›´å¤šè®¾ç½®","Reading Guide":"é˜…è¯»å°º","Stop Animations":"åœæ­¢é—ªåŠ¨","Big Cursor":"æ”¾å¤§é¼ æ ‡","Increase Font Size":"å¢žåŠ å­—ä½“å¤§å°","Decrease Font Size":"å‡å°å­—ä½“å¤§å°","Letter Spacing":"å­—æ¯é—´è·","Line Height":"è¡Œè·","Font Weight":"å­—é‡","Dyslexia Font":"é˜…è¯»éšœç¢å­—ä½“","Language":"è¯­è¨€","Open Accessibility Menu":"æ‰“å¼€è¾…åŠ©åŠŸèƒ½èœå•"}'
            ),
            zh_Hant: JSON.parse(
                '{"Accessibility Menu":"è¼”åŠ©åŠŸèƒ½èœå–®","Reset settings":"é‡ç½®è¨­å®š","Close":"é—œé–‰","Content Adjustments":"å…§å®¹èª¿æ•´","Adjust Font Size":"èª¿æ•´å­—é«”å¤§å°","Highlight Title":"æ¨™é¡Œé«˜äº®","Highlight Links":"é€£çµé«˜äº®","Readable Font":"æ˜“è®€å­—é«”","Color Adjustments":"è‰²å½©èª¿æ•´","Dark Contrast":"é«˜å°æ¯”åº¦ï¼ˆé»‘è‰²ï¼‰","Light Contrast":"é«˜å°æ¯”åº¦ï¼ˆç™½è‰²ï¼‰","High Contrast":"é«˜å°æ¯”åº¦","High Saturation":"é«˜é£½å’Œåº¦","Low Saturation":"ä½Žé£½å’Œåº¦","Monochrome":"å–®è‰²","Tools":"æ›´å¤šè¨­å®š","Reading Guide":"é–±è®€å°º","Stop Animations":"åœæ­¢é–ƒå‹•","Big Cursor":"æ”¾å¤§æ»‘é¼ ","Increase Font Size":"å¢žåŠ å­—é«”å¤§å°","Decrease Font Size":"æ¸›å°å­—é«”å¤§å°","Letter Spacing":"å­—æ¯é–“è·","Line Height":"è¡Œè·","Font Weight":"å­—é‡","Dyslexia Font":"é–±è®€éšœç¤™å­—é«”","Language":"èªžè¨€","Open Accessibility Menu":"æ‰“é–‹è¼”åŠ©åŠŸèƒ½èœå–®"}'
            ),
            vi: JSON.parse(
                '{"Accessibility Menu":"Menu Truy cáº­p","Reset settings":"Äáº·t láº¡i cÃ i Ä‘áº·t","Close":"ÄÃ³ng","Content Adjustments":"Äiá»u chá»‰nh Ná»™i dung","Adjust Font Size":"Äiá»u chá»‰nh KÃ­ch thÆ°á»›c Font chá»¯","Highlight Title":"ÄÃ¡nh dáº¥u TiÃªu Ä‘á»","Highlight Links":"ÄÃ¡nh dáº¥u LiÃªn káº¿t","Readable Font":"Font chá»¯ Dá»… Ä‘á»c","Color Adjustments":"Äiá»u chá»‰nh MÃ u sáº¯c","Dark Contrast":"TÆ°Æ¡ng pháº£n Tá»‘i","Light Contrast":"TÆ°Æ¡ng pháº£n SÃ¡ng","High Contrast":"TÆ°Æ¡ng pháº£n Cao","High Saturation":"BÃ£o hÃ²a Cao","Low Saturation":"BÃ£o hÃ²a Tháº¥p","Monochrome":"ÄÆ¡n sáº¯c","Tools":"CÃ´ng cá»¥","Reading Guide":"HÆ°á»›ng dáº«n Äá»c","Stop Animations":"Dá»«ng Hoáº¡t hÃ¬nh","Big Cursor":"Con trá» Lá»›n","Increase Font Size":"TÄƒng KÃ­ch thÆ°á»›c Font chá»¯","Decrease Font Size":"Giáº£m KÃ­ch thÆ°á»›c Font chá»¯","Letter Spacing":"Khoáº£ng cÃ¡ch Chá»¯","Line Height":"Äá»™ Cao dÃ²ng","Font Weight":"Äá»™ Äáº­m cá»§a Font chá»¯","Dyslexia Font":"Font chá»¯ Cho ngÆ°á»i cÃ³ Khuyáº¿t táº­t Ä‘á»c hiá»ƒu","Language":"NgÃ´n ngá»¯","Open Accessibility Menu":"Má»Ÿ Menu Truy cáº­p"}'
            ),
        },
        _ = [
            { code: "ar", label: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Arabic)" },
            { code: "bg", label: "Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ (Bulgarian)" },
            { code: "bn", label: "à¦¬à¦¾à¦‚à¦²à¦¾ (Bengali)" },
            { code: "cs", label: "ÄeÅ¡tina (Czech)" },
            { code: "de", label: "Deutsch (German)" },
            { code: "el", label: "Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (Greek)" },
            { code: "en", label: "English (English)" },
            { code: "es", label: "EspaÃ±ol (Spanish)" },
            { code: "fi", label: "suomi (Finnish)" },
            { code: "fr", label: "FranÃ§ais (French)" },
            { code: "he", label: "×¢×‘×¨×™×ª (Hebrew)" },
            { code: "hi", label: "à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)" },
            { code: "hr", label: "Hrvatski (Croatian)" },
            { code: "hu", label: "Magyar (Hungarian)" },
            { code: "id", label: "Bahasa Indonesia (Indonesian)" },
            { code: "it", label: "Italiano (Italian)" },
            { code: "ja", label: "æ—¥æœ¬èªž (Japanese)" },
            { code: "ka", label: "áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ (Georgian)" },
            { code: "ko", label: "í•œêµ­ì–´ (Korean)" },
            { code: "ms", label: "Bahasa Malaysia (Malay)" },
            { code: "nl", label: "Nederlands (Dutch)" },
            { code: "no", label: "Norsk (Norwegian)" },
            { code: "fa", label: "ÙØ§Ø±Ø³ÛŒ (Persian)" },
            { code: "pl", label: "Polski (Polish)" },
            { code: "pt", label: "PortuguÃªs (Portuguese)" },
            { code: "ro", label: "RomÃ¢nÄƒ (Romanian)" },
            { code: "ru", label: "Ð ÑƒÑÑÐºÐ¸Ð¹ (Russian)" },
            { code: "sl", label: "slovenÅ¡Äina (Slovenian)" },
            { code: "sk", label: "slovenÄina (Slovak)" },
            { code: "sr", label: "Srpski (Serbian)" },
            { code: "sr-SP", label: "Ð¡Ñ€Ð¿ÑÐºÐ¸ (Serbian Cyrillic)" },
            { code: "ta", label: "Tagalog (Filipno)" },
            { code: "tr", label: "TÃ¼rkÃ§e (Turkish)" },
            { code: "zh_Hans", label: "ç¹ä½“ä¸­æ–‡ (Traditional Chinese)" },
            { code: "zh_Hant", label: "ç¹é«”ä¸­æ–‡ (Traditional Chinese)" },
            { code: "vi", label: "Tiáº¿ng Viá»‡t (Vietnamese)" },
        ];
    function q(t, e) {
        var i = t.getAttribute("data-translate");
        return (
            !i && e && ((i = e), t.setAttribute("data-translate", i)),
            (function (t) {
                var e = s().lang;
                return (K[e] || K.en)[t] || t;
            })(i)
        );
    }
    function Y(t) {
        t
            .querySelectorAll(".asw-card-title, .asw-translate")
            .forEach(function (t) {
                t.innerText = q(t, String(t.innerText || "").trim());
            }),
            t.querySelectorAll("[title]").forEach(function (t) {
                t.setAttribute("title", q(t, t.getAttribute("title")));
            });
    }
    var U = function (t, e) {
        var i = {};
        for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) &&
                e.indexOf(n) < 0 &&
                (i[n] = t[n]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (n = Object.getOwnPropertySymbols(t); a < n.length; a++)
                e.indexOf(n[a]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(t, n[a]) &&
                    (i[n[a]] = t[n[a]]);
        }
        return i;
    };
    function Q(t) {
        var e,
            i,
            l,
            c,
            g = t.container,
            u = t.position,
            d = U(t, ["container", "position"]),
            h = document.createElement("div");
        h.innerHTML = G;
        var p = h.querySelector(".asw-menu");
        (null == u ? void 0 : u.includes("right")) &&
            ((p.style.right = "0px"), (p.style.left = "auto")),
            (p.querySelector(".content").innerHTML = W(J)),
            (p.querySelector(".tools").innerHTML = W(Z, "asw-tools")),
            (p.querySelector(".contrast").innerHTML = W(E, "asw-filter")),
            h
                .querySelectorAll(".asw-menu-close, .asw-overlay")
                .forEach(function (t) {
                    t.addEventListener("click", function () {
                        N(h, !1);
                    });
                }),
            p
                .querySelectorAll(".asw-adjust-font div[role='button']")
                .forEach(function (t) {
                    t.addEventListener("click", function () {
                        var e,
                            i =
                                null !== (e = o("fontSize")) && void 0 !== e
                                    ? e
                                    : 1;
                        t.classList.contains("asw-minus")
                            ? (i -= 0.1)
                            : (i += 0.1),
                            (i = Math.max(i, 0.1)),
                            (i = Math.min(i, 2)),
                            r((i = Number(i.toFixed(2))) || 1),
                            n({ fontSize: i });
                    });
                }),
            p.querySelectorAll(".asw-btn").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e,
                        i = t.dataset.key,
                        a = !t.classList.contains("asw-selected");
                    t.classList.contains("asw-filter")
                        ? (p
                              .querySelectorAll(".asw-filter")
                              .forEach(function (t) {
                                  t.classList.remove("asw-selected");
                              }),
                          n({ contrast: !!a && i }),
                          a && t.classList.add("asw-selected"),
                          w())
                        : (t.classList.toggle("asw-selected", a),
                          n((((e = {})[i] = a), e)),
                          P());
                });
            }),
            null === (e = p.querySelector(".asw-menu-reset")) ||
                void 0 === e ||
                e.addEventListener("click", function () {
                    !(function () {
                        var t;
                        a({ states: {} }),
                            V(),
                            null ===
                                (t =
                                    null === document || void 0 === document
                                        ? void 0
                                        : document.querySelectorAll(
                                              ".asw-selected"
                                          )) ||
                                void 0 === t ||
                                t.forEach(function (t) {
                                    var e;
                                    return null ===
                                        (e =
                                            null == t ? void 0 : t.classList) ||
                                        void 0 === e
                                        ? void 0
                                        : e.remove("asw-selected");
                                });
                    })();
                });
        var m = s(),
            v =
                Number(
                    null === (i = null == m ? void 0 : m.states) || void 0 === i
                        ? void 0
                        : i.fontSize
                ) || 1;
        1 != v &&
            (p.querySelector(".asw-amount").innerHTML = "".concat(
                100 * v,
                "%"
            ));
        var b = p.querySelector("#asw-language");
        if (
            ((b.innerHTML = _.map(function (t) {
                return '<option value="'
                    .concat(t.code, '">')
                    .concat(t.label, "</option>");
            }).join("")),
            m.lang !== d.lang && a({ lang: d.lang }),
            (b.value = (null == d ? void 0 : d.lang) || "en"),
            null == b ||
                b.addEventListener("change", function () {
                    a({ lang: b.value }), Y(g);
                }),
            Y(p),
            m.states)
        )
            for (var S in m.states)
                if (m.states[S] && "fontSize" !== S) {
                    var y = "contrast" === S ? m.states[S] : S;
                    null ===
                        (c =
                            null ===
                                (l = p.querySelector(
                                    '.asw-btn[data-key="'.concat(y, '"]')
                                )) || void 0 === l
                                ? void 0
                                : l.classList) ||
                        void 0 === c ||
                        c.add("asw-selected");
                }
        return g.appendChild(h), h;
    }
    var X = function () {
        return (
            (X =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i]))
                            Object.prototype.hasOwnProperty.call(e, a) &&
                                (t[a] = e[a]);
                    return t;
                }),
            X.apply(this, arguments)
        );
    };
    var $ = function () {
            return (
                ($ =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var a in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, a) &&
                                    (t[a] = e[a]);
                        return t;
                    }),
                $.apply(this, arguments)
            );
        },
        tt = { lang: "en", position: "bottom-left" };
    function et(t) {
        var e = $({}, tt);
        try {
            var i = s(!1);
            (e = $($({}, e), i)), V();
        } catch (t) {}
        a((e = $($({}, e), t))),
            (function (t) {
                var e,
                    i,
                    n,
                    a,
                    o,
                    s,
                    r = t.position,
                    l = void 0 === r ? "bottom-left" : r,
                    c = t.offset,
                    g = void 0 === c ? [20, 20] : c,
                    u = document.createElement("div");
                (u.innerHTML = I), u.classList.add("asw-container");
                var d,
                    h = u.querySelector(".asw-menu-btn"),
                    p =
                        null !== (e = null == g ? void 0 : g[0]) && void 0 !== e
                            ? e
                            : 20,
                    m =
                        null !== (i = null == g ? void 0 : g[1]) && void 0 !== i
                            ? i
                            : 25,
                    v = {
                        left: "".concat(p, "px"),
                        bottom: "".concat(m, "px"),
                    };
                "bottom-right" === l
                    ? (v = X(X({}, v), {
                          right: "".concat(p, "px"),
                          left: "auto",
                      }))
                    : "top-left" === l
                    ? (v = X(X({}, v), {
                          top: "".concat(m, "px"),
                          bottom: "auto",
                      }))
                    : "center-left" === l
                    ? (v = X(X({}, v), {
                          bottom: "calc(50% - (55px / 2) - ".concat(
                              null !== (n = null == g ? void 0 : g[1]) &&
                                  void 0 !== n
                                  ? n
                                  : 0,
                              "px)"
                          ),
                      }))
                    : "top-right" === l
                    ? (v = {
                          top: "".concat(m, "px"),
                          bottom: "auto",
                          right: "".concat(p, "px"),
                          left: "auto",
                      })
                    : "center-right" === l
                    ? (v = {
                          right: "".concat(p, "px"),
                          left: "auto",
                          bottom: "calc(50% - (55px / 2) - ".concat(
                              null !== (a = null == g ? void 0 : g[1]) &&
                                  void 0 !== a
                                  ? a
                                  : 0,
                              "px)"
                          ),
                      })
                    : "bottom-center" === l
                    ? (v = X(X({}, v), {
                          left: "calc(50% - (55px / 2) - ".concat(
                              null !== (o = null == g ? void 0 : g[0]) &&
                                  void 0 !== o
                                  ? o
                                  : 0,
                              "px)"
                          ),
                      }))
                    : "top-center" === l &&
                      (v = {
                          top: "".concat(m, "px"),
                          bottom: "auto",
                          left: "calc(50% - (55px / 2) - ".concat(
                              null !== (s = null == g ? void 0 : g[0]) &&
                                  void 0 !== s
                                  ? s
                                  : 0,
                              "px)"
                          ),
                      }),
                    Object.assign(h.style, v),
                    null == h ||
                        h.addEventListener("click", function (e) {
                            e.preventDefault(),
                                e.stopPropagation(),
                                e.stopImmediatePropagation(),
                                d
                                    ? N(d)
                                    : (d = Q(X(X({}, t), { container: u })));
                        }),
                    Y(u),
                    document.body.appendChild(u);
            })(e);
    }
    function it(t) {
        var e;
        return (
            (t = "data-asw-".concat(t)),
            null ===
                (e =
                    null === document || void 0 === document
                        ? void 0
                        : document.querySelector("[".concat(t, "]"))) ||
            void 0 === e
                ? void 0
                : e.getAttribute(t)
        );
    }
    document.addEventListener("readystatechange", function t() {
        var e, i, n, a, o;
        ("complete" !== document.readyState &&
            "interactive" !== document.readyState) ||
            ((n = it("lang")),
            (a = it("position")),
            (o = it("offset")),
            n ||
                (n =
                    null ===
                        (i =
                            null ===
                                (e =
                                    null === document || void 0 === document
                                        ? void 0
                                        : document.querySelector("html")) ||
                            void 0 === e
                                ? void 0
                                : e.getAttribute("lang")) || void 0 === i
                        ? void 0
                        : i.replace(/[_-].*/, "")),
            !n &&
                "undefined" != typeof navigator &&
                (null === navigator || void 0 === navigator
                    ? void 0
                    : navigator.language) &&
                (n =
                    null === navigator || void 0 === navigator
                        ? void 0
                        : navigator.language),
            o &&
                (o = o.split(",").map(function (t) {
                    return parseInt(t);
                })),
            et({ lang: n, position: a, offset: o }),
            document.removeEventListener("readystatechange", t));
    });
})();
