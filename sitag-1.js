!(function (n) {
  var t = {};
  function r(e) {
      if (t[e]) return t[e].exports;
      var o = (t[e] = { i: e, l: !1, exports: {} });
      return n[e].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = n),
      (r.c = t),
      (r.d = function (n, t, e) {
          r.o(n, t) || Object.defineProperty(n, t, { enumerable: !0, get: e });
      }),
      (r.r = function (n) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
      }),
      (r.t = function (n, t) {
          if ((1 & t && (n = r(n)), 8 & t)) return n;
          if (4 & t && "object" == typeof n && n && n.__esModule) return n;
          var e = Object.create(null);
          if ((r.r(e), Object.defineProperty(e, "default", { enumerable: !0, value: n }), 2 & t && "string" != typeof n))
              for (var o in n)
                  r.d(
                      e,
                      o,
                      function (t) {
                          return n[t];
                      }.bind(null, o)
                  );
          return e;
      }),
      (r.n = function (n) {
          var t =
              n && n.__esModule
                  ? function () {
                        return n.default;
                    }
                  : function () {
                        return n;
                    };
          return r.d(t, "a", t), t;
      }),
      (r.o = function (n, t) {
          return Object.prototype.hasOwnProperty.call(n, t);
      }),
      (r.p = ""),
      r((r.s = 5));
})([
  function (n, t, r) {
      "use strict";
      function e(n, t) {
          return n < t ? -1 : n === t ? 0 : 1;
      }
      function o(n, t) {
          return n ? (t ? 0 : 1) : t ? -1 : 0;
      }
      function u(n, t) {
          return n === t ? 0 : n < t ? -1 : 1;
      }
      r.d(t, "b", function () {
          return e;
      }),
          r.d(t, "a", function () {
              return o;
          }),
          r.d(t, "c", function () {
              return u;
          });
  },
  function (n, t, r) {
      "use strict";
      function e(n) {
          return [n.hbConfig, n.bidResponse[0]];
      }
      r.d(t, "a", function () {
          return e;
      });
  },
  function (n, t, r) {
      "use strict";
      r.d(t, "a", function () {
          return u;
      });
      var e = r(3),
          o = r(4),
          u = e.a(o.a("production"), "production");
  },
  function (n, t, r) {
      "use strict";
      r.d(t, "a", function () {
          return o;
      });
      r(0);
      var e = function (n, t) {
          for (var r in n) t(r);
      };
      function o(n, t) {
          if (n === t) return !0;
          var r = typeof n;
          if ("string" === r || "number" === r || "boolean" === r || "undefined" === r || null === n) return !1;
          var u = typeof t;
          if ("function" === r || "function" === u) throw { RE_EXN_ID: "Invalid_argument", _1: "equal: functional value", Error: new Error() };
          if ("number" === u || "undefined" === u || null === t) return !1;
          var i = 0 | n.TAG,
              c = 0 | t.TAG;
          if (248 === i) return n[1] === t[1];
          if (251 === i) throw { RE_EXN_ID: "Invalid_argument", _1: "equal: abstract value", Error: new Error() };
          if (i !== c) return !1;
          var f = 0 | n.length;
          if (f !== (0 | t.length)) return !1;
          if (!Array.isArray(n)) {
              if (n instanceof Date && t instanceof Date) return !(n > t || n < t);
              var a = { contents: !0 };
              return (
                  e(n, function (n) {
                      t.hasOwnProperty(n) || (a.contents = !1);
                  }),
                  a.contents &&
                      e(t, function (r) {
                          (n.hasOwnProperty(r) && o(t[r], n[r])) || (a.contents = !1);
                      }),
                  a.contents
              );
          }
          for (var s = 0; ; ) {
              var d = s;
              if (d === f) return !0;
              if (!o(n[d], t[d])) return !1;
              s = (d + 1) | 0;
          }
      }
  },
  function (n, t, r) {
      "use strict";
      function e(n) {
          return void 0 === n ? { BS_PRIVATE_NESTED_SOME_NONE: 0 } : null !== n && void 0 !== n.BS_PRIVATE_NESTED_SOME_NONE ? { BS_PRIVATE_NESTED_SOME_NONE: (n.BS_PRIVATE_NESTED_SOME_NONE + 1) | 0 } : n;
      }
      r.d(t, "a", function () {
          return e;
      });
  },
  function (n, t, r) {
      "use strict";
      r.r(t),
          r.d(t, "hbConfig", function () {
              return o;
          }),
          r.d(t, "bidResponse", function () {
              return u;
          });
      var e = r(1).a(window.hbResponse);
      r(6).insert();
      var o = e[0],
          u = e[1];
  },
  function (n, t, r) {
      "use strict";
      r.r(t),
          r.d(t, "insert", function () {
              return o;
          });
      var e = r(2);
      function o() {
          return (function (n) {
              var t = document.createElement("script");
              t.src = n;
              var r = document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t, r);
          })(window.location.href.indexOf("localhost") > -1 || !e.a ? "http://localhost:7000/bridge.js" : "https://t.seedtag.com/c/omid/bridge/bridge.js");
      }
  },
]);
