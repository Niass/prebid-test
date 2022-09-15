(function () {
  /*

Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
  var m,
    aa = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    n =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          },
    ba = function (a) {
      a = [
        'object' == typeof globalThis && globalThis,
        a,
        'object' == typeof window && window,
        'object' == typeof self && self,
        'object' == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error('Cannot find global object');
    },
    ca = ba(this),
    q = function (a, b) {
      if (b)
        a: {
          var c = ca;
          a = a.split('.');
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e];
          }
          a = a[a.length - 1];
          d = c[a];
          b = b(d);
          b != d && null != b && n(c, a, { configurable: !0, writable: !0, value: b });
        }
    };
  q('Symbol', function (a) {
    if (a) return a;
    var b = function (f, h) {
      this.g = f;
      n(this, 'description', { configurable: !0, writable: !0, value: h });
    };
    b.prototype.toString = function () {
      return this.g;
    };
    var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      d = 0,
      e = function (f) {
        if (this instanceof e) throw new TypeError('Symbol is not a constructor');
        return new b(c + (f || '') + '_' + d++, f);
      };
    return e;
  });
  q('Symbol.iterator', function (a) {
    if (a) return a;
    a = Symbol('Symbol.iterator');
    for (
      var b =
          'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ca[b[c]];
      'function' === typeof d &&
        'function' != typeof d.prototype[a] &&
        n(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return da(aa(this));
          },
        });
    }
    return a;
  });
  var da = function (a) {
      a = { next: a };
      a[Symbol.iterator] = function () {
        return this;
      };
      return a;
    },
    r = function (a) {
      var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : { next: aa(a) };
    },
    t = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
  q('Array.prototype.find', function (a) {
    return a
      ? a
      : function (b, c) {
          a: {
            var d = this;
            d instanceof String && (d = String(d));
            for (var e = d.length, f = 0; f < e; f++) {
              var h = d[f];
              if (b.call(c, h, f, d)) {
                b = h;
                break a;
              }
            }
            b = void 0;
          }
          return b;
        };
  });
  q('WeakMap', function (a) {
    function b() {}
    function c(k) {
      var l = typeof k;
      return ('object' === l && null !== k) || 'function' === l;
    }
    function d(k) {
      if (!t(k, f)) {
        var l = new b();
        n(k, f, { value: l });
      }
    }
    function e(k) {
      var l = Object[k];
      l &&
        (Object[k] = function (p) {
          if (p instanceof b) return p;
          Object.isExtensible(p) && d(p);
          return l(p);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var k = Object.seal({}),
            l = Object.seal({}),
            p = new a([
              [k, 2],
              [l, 3],
            ]);
          if (2 != p.get(k) || 3 != p.get(l)) return !1;
          p.delete(k);
          p.set(l, 4);
          return !p.has(k) && 4 == p.get(l);
        } catch (C) {
          return !1;
        }
      })()
    )
      return a;
    var f = '$jscomp_hidden_' + Math.random();
    e('freeze');
    e('preventExtensions');
    e('seal');
    var h = 0,
      g = function (k) {
        this.g = (h += Math.random() + 1).toString();
        if (k) {
          k = r(k);
          for (var l; !(l = k.next()).done; ) (l = l.value), this.set(l[0], l[1]);
        }
      };
    g.prototype.set = function (k, l) {
      if (!c(k)) throw Error('Invalid WeakMap key');
      d(k);
      if (!t(k, f)) throw Error('WeakMap key fail: ' + k);
      k[f][this.g] = l;
      return this;
    };
    g.prototype.get = function (k) {
      return c(k) && t(k, f) ? k[f][this.g] : void 0;
    };
    g.prototype.has = function (k) {
      return c(k) && t(k, f) && t(k[f], this.g);
    };
    g.prototype.delete = function (k) {
      return c(k) && t(k, f) && t(k[f], this.g) ? delete k[f][this.g] : !1;
    };
    return g;
  });
  q('Map', function (a) {
    if (
      (function () {
        if (
          !a ||
          'function' != typeof a ||
          !a.prototype.entries ||
          'function' != typeof Object.seal
        )
          return !1;
        try {
          var g = Object.seal({ x: 4 }),
            k = new a(r([[g, 's']]));
          if (
            's' != k.get(g) ||
            1 != k.size ||
            k.get({ x: 4 }) ||
            k.set({ x: 4 }, 't') != k ||
            2 != k.size
          )
            return !1;
          var l = k.entries(),
            p = l.next();
          if (p.done || p.value[0] != g || 's' != p.value[1]) return !1;
          p = l.next();
          return p.done || 4 != p.value[0].x || 't' != p.value[1] || !l.next().done ? !1 : !0;
        } catch (C) {
          return !1;
        }
      })()
    )
      return a;
    var b = new WeakMap(),
      c = function (g) {
        this.h = {};
        this.g = f();
        this.size = 0;
        if (g) {
          g = r(g);
          for (var k; !(k = g.next()).done; ) (k = k.value), this.set(k[0], k[1]);
        }
      };
    c.prototype.set = function (g, k) {
      g = 0 === g ? 0 : g;
      var l = d(this, g);
      l.list || (l.list = this.h[l.id] = []);
      l.v
        ? (l.v.value = k)
        : ((l.v = { next: this.g, H: this.g.H, head: this.g, key: g, value: k }),
          l.list.push(l.v),
          (this.g.H.next = l.v),
          (this.g.H = l.v),
          this.size++);
      return this;
    };
    c.prototype.delete = function (g) {
      g = d(this, g);
      return g.v && g.list
        ? (g.list.splice(g.index, 1),
          g.list.length || delete this.h[g.id],
          (g.v.H.next = g.v.next),
          (g.v.next.H = g.v.H),
          (g.v.head = null),
          this.size--,
          !0)
        : !1;
    };
    c.prototype.clear = function () {
      this.h = {};
      this.g = this.g.H = f();
      this.size = 0;
    };
    c.prototype.has = function (g) {
      return !!d(this, g).v;
    };
    c.prototype.get = function (g) {
      return (g = d(this, g).v) && g.value;
    };
    c.prototype.entries = function () {
      return e(this, function (g) {
        return [g.key, g.value];
      });
    };
    c.prototype.keys = function () {
      return e(this, function (g) {
        return g.key;
      });
    };
    c.prototype.values = function () {
      return e(this, function (g) {
        return g.value;
      });
    };
    c.prototype.forEach = function (g, k) {
      for (var l = this.entries(), p; !(p = l.next()).done; )
        (p = p.value), g.call(k, p[1], p[0], this);
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function (g, k) {
        var l = k && typeof k;
        'object' == l || 'function' == l
          ? b.has(k)
            ? (l = b.get(k))
            : ((l = '' + ++h), b.set(k, l))
          : (l = 'p_' + k);
        var p = g.h[l];
        if (p && t(g.h, l))
          for (g = 0; g < p.length; g++) {
            var C = p[g];
            if ((k !== k && C.key !== C.key) || k === C.key)
              return { id: l, list: p, index: g, v: C };
          }
        return { id: l, list: p, index: -1, v: void 0 };
      },
      e = function (g, k) {
        var l = g.g;
        return da(function () {
          if (l) {
            for (; l.head != g.g; ) l = l.H;
            for (; l.next != l.head; ) return (l = l.next), { done: !1, value: k(l) };
            l = null;
          }
          return { done: !0, value: void 0 };
        });
      },
      f = function () {
        var g = {};
        return (g.H = g.next = g.head = g);
      },
      h = 0;
    return c;
  });
  var ea = function (a, b) {
    a instanceof String && (a += '');
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  };
  q('Array.prototype.keys', function (a) {
    return a
      ? a
      : function () {
          return ea(this, function (b) {
            return b;
          });
        };
  });
  q('Array.from', function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            null != c
              ? c
              : function (g) {
                  return g;
                };
          var e = [],
            f = 'undefined' != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
          if ('function' == typeof f) {
            b = f.call(b);
            for (var h = 0; !(f = b.next()).done; ) e.push(c.call(d, f.value, h++));
          } else for (f = b.length, h = 0; h < f; h++) e.push(c.call(d, b[h], h));
          return e;
        };
  });
  q('Array.prototype.values', function (a) {
    return a
      ? a
      : function () {
          return ea(this, function (b, c) {
            return c;
          });
        };
  });
  var fa = fa || {},
    u = this || self,
    ha = function (a) {
      var b = typeof a;
      b = 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null';
      return 'array' == b || ('object' == b && 'number' == typeof a.length);
    },
    v = function (a) {
      var b = typeof a;
      return ('object' == b && null != a) || 'function' == b;
    },
    ia = function (a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    ja = function (a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e);
        };
      }
      return function () {
        return a.apply(b, arguments);
      };
    },
    w = function (a, b, c) {
      Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code')
        ? (w = ia)
        : (w = ja);
      return w.apply(null, arguments);
    },
    x = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.U = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.jb = function (d, e, f) {
        for (var h = Array(arguments.length - 2), g = 2; g < arguments.length; g++)
          h[g - 2] = arguments[g];
        return b.prototype[e].apply(d, h);
      };
    },
    ka = function (a) {
      return a;
    };
  var la = String.prototype.trim
      ? function (a) {
          return a.trim();
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
        },
    ma = function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  function y() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : '';
  }
  function z(a) {
    return -1 != y().indexOf(a);
  }
  var na = function (a, b) {
      if ('string' === typeof a)
        return 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
      for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
      return -1;
    },
    oa = function (a, b) {
      for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
        e in d && b.call(void 0, d[e], e, a);
    },
    pa = function (a, b) {
      for (
        var c = a.length, d = Array(c), e = 'string' === typeof a ? a.split('') : a, f = 0;
        f < c;
        f++
      )
        f in e && (d[f] = b.call(void 0, e[f], f, a));
      return d;
    },
    qa = function (a, b) {
      var c = -1;
      oa(a, function (d, e) {
        c = b.call(void 0, c, d, e, a);
      });
      return c;
    };
  function ra(a, b) {
    b = na(a, b);
    var c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c;
  }
  function sa(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function ta(a) {
    for (var b = [], c = 0; c < a; c++) b[c] = '';
    return b;
  }
  var ua = function (a) {
    ua[' '](a);
    return a;
  };
  ua[' '] = function () {};
  var va = function (a, b) {
      try {
        return ua(a[b]), !0;
      } catch (c) {}
      return !1;
    },
    xa = function (a) {
      var b = wa;
      return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : (b[9] = a(9));
    };
  var ya = z('Opera'),
    A = z('Trident') || z('MSIE'),
    za = z('Edge'),
    Aa =
      z('Gecko') &&
      !(-1 != y().toLowerCase().indexOf('webkit') && !z('Edge')) &&
      !(z('Trident') || z('MSIE')) &&
      !z('Edge'),
    Ba = -1 != y().toLowerCase().indexOf('webkit') && !z('Edge'),
    Ca;
  a: {
    var Da = '',
      Ea = (function () {
        var a = y();
        if (Aa) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (za) return /Edge\/([\d\.]+)/.exec(a);
        if (A) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (Ba) return /WebKit\/(\S+)/.exec(a);
        if (ya) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    Ea && (Da = Ea ? Ea[1] : '');
    if (A) {
      var Fa,
        Ga = u.document;
      Fa = Ga ? Ga.documentMode : void 0;
      if (null != Fa && Fa > parseFloat(Da)) {
        Ca = String(Fa);
        break a;
      }
    }
    Ca = Da;
  }
  var Ha = Ca,
    wa = {},
    Ia = function () {
      return xa(function () {
        for (
          var a = 0,
            b = la(String(Ha)).split('.'),
            c = la('9').split('.'),
            d = Math.max(b.length, c.length),
            e = 0;
          0 == a && e < d;
          e++
        ) {
          var f = b[e] || '',
            h = c[e] || '';
          do {
            f = /(\d*)(\D*)(.*)/.exec(f) || ['', '', '', ''];
            h = /(\d*)(\D*)(.*)/.exec(h) || ['', '', '', ''];
            if (0 == f[0].length && 0 == h[0].length) break;
            a =
              ma(
                0 == f[1].length ? 0 : parseInt(f[1], 10),
                0 == h[1].length ? 0 : parseInt(h[1], 10)
              ) ||
              ma(0 == f[2].length, 0 == h[2].length) ||
              ma(f[2], h[2]);
            f = f[3];
            h = h[3];
          } while (0 == a);
        }
        return 0 <= a;
      });
    };
  var B = function (a, b) {
    this.g = (a === Ja && b) || '';
    this.h = Ka;
  };
  B.prototype.aa = !0;
  B.prototype.Z = function () {
    return this.g;
  };
  var Ka = {},
    Ja = {}; /*

SPDX-License-Identifier: Apache-2.0
*/
  function La(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }
  var Ma =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    );
  function Na(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < Ma.length; f++)
        (c = Ma[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  var Oa,
    Pa = function () {
      if (void 0 === Oa) {
        var a = null,
          b = u.trustedTypes;
        if (b && b.createPolicy) {
          try {
            a = b.createPolicy('goog#html', {
              createHTML: ka,
              createScript: ka,
              createScriptURL: ka,
            });
          } catch (c) {
            u.console && u.console.error(c.message);
          }
          Oa = a;
        } else Oa = a;
      }
      return Oa;
    };
  var D = function (a, b) {
    this.g = b === Qa ? a : '';
  };
  D.prototype.toString = function () {
    return this.g + '';
  };
  D.prototype.aa = !0;
  D.prototype.Z = function () {
    return this.g.toString();
  };
  var Qa = {};
  var Ra = {},
    E = function (a, b) {
      this.g = b === Ra ? a : '';
      this.aa = !0;
    };
  E.prototype.Z = function () {
    return this.g.toString();
  };
  E.prototype.toString = function () {
    return this.g.toString();
  };
  var Sa = function (a) {
      return a instanceof E && a.constructor === E ? a.g : 'type_error:SafeHtml';
    },
    Ta = function (a) {
      var b = Pa();
      a = b ? b.createHTML(a) : a;
      return new E(a, Ra);
    },
    Ua = new E((u.trustedTypes && u.trustedTypes.emptyHTML) || '', Ra);
  var Va = (function (a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  })(function () {
    var a = document.createElement('div'),
      b = document.createElement('div');
    b.appendChild(document.createElement('div'));
    a.appendChild(b);
    b = a.firstChild.firstChild;
    a.innerHTML = Sa(Ua);
    return !b.parentElement;
  });
  var Xa = function (a) {
      var b = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
      var c = u.document.createElement('div');
      return a.replace(Wa, function (d, e) {
        var f = b[d];
        if (f) return f;
        '#' == e.charAt(0) &&
          ((e = Number('0' + e.slice(1))), isNaN(e) || (f = String.fromCharCode(e)));
        if (!f) {
          f = Ta(d + ' ');
          if (Va()) for (; c.lastChild; ) c.removeChild(c.lastChild);
          c.innerHTML = Sa(f);
          f = c.firstChild.nodeValue.slice(0, -1);
        }
        return (b[d] = f);
      });
    },
    Ya = function (a) {
      return a.replace(/&([^;]+);/g, function (b, c) {
        switch (c) {
          case 'amp':
            return '&';
          case 'lt':
            return '<';
          case 'gt':
            return '>';
          case 'quot':
            return '"';
          default:
            return '#' != c.charAt(0) || ((c = Number('0' + c.slice(1))), isNaN(c))
              ? b
              : String.fromCharCode(c);
        }
      });
    },
    Wa = /&([^;\s<&]+);?/g;
  var $a = function (a, b) {
      La(b, function (c, d) {
        c && 'object' == typeof c && c.aa && (c = c.Z());
        'style' == d
          ? (a.style.cssText = c)
          : 'class' == d
          ? (a.className = c)
          : 'for' == d
          ? (a.htmlFor = c)
          : Za.hasOwnProperty(d)
          ? a.setAttribute(Za[d], c)
          : 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
          ? a.setAttribute(d, c)
          : (a[d] = c);
      });
    },
    Za = {
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      colspan: 'colSpan',
      frameborder: 'frameBorder',
      height: 'height',
      maxlength: 'maxLength',
      nonce: 'nonce',
      role: 'role',
      rowspan: 'rowSpan',
      type: 'type',
      usemap: 'useMap',
      valign: 'vAlign',
      width: 'width',
    },
    bb = function (a, b, c) {
      var d = arguments,
        e = document,
        f = d[1];
      var h = String(d[0]);
      h = String(h);
      'application/xhtml+xml' === e.contentType && (h = h.toLowerCase());
      h = e.createElement(h);
      f &&
        ('string' === typeof f
          ? (h.className = f)
          : Array.isArray(f)
          ? (h.className = f.join(' '))
          : $a(h, f));
      2 < d.length && ab(e, h, d);
      return h;
    },
    ab = function (a, b, c) {
      function d(g) {
        g && b.appendChild('string' === typeof g ? a.createTextNode(g) : g);
      }
      for (var e = 2; e < c.length; e++) {
        var f = c[e];
        if (!ha(f) || (v(f) && 0 < f.nodeType)) d(f);
        else {
          a: {
            if (f && 'number' == typeof f.length) {
              if (v(f)) {
                var h = 'function' == typeof f.item || 'string' == typeof f.item;
                break a;
              }
              if ('function' === typeof f) {
                h = 'function' == typeof f.item;
                break a;
              }
            }
            h = !1;
          }
          oa(h ? sa(f) : f, d);
        }
      }
    },
    cb = function (a) {
      return 9 == a.nodeType ? a : a.ownerDocument || a.document;
    };
  var db = RegExp(
      '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
    ),
    eb = function (a, b) {
      if (a) {
        a = a.split('&');
        for (var c = 0; c < a.length; c++) {
          var d = a[c].indexOf('='),
            e = null;
          if (0 <= d) {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1);
          } else f = a[c];
          b(f, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '');
        }
      }
    };
  var fb = function (a, b) {
    if (a) for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
  };
  function gb(a) {
    var b, c;
    return null != (c = null == (b = /https?:\/\/[^\/]+/.exec(a)) ? void 0 : b[0]) ? c : '';
  }
  var hb = function () {
      var a = u;
      try {
        for (var b = null; b != a; b = a, a = a.parent)
          switch (a.location.protocol) {
            case 'https:':
              return !0;
            case 'file:':
              return !0;
            case 'http:':
              return !1;
          }
      } catch (c) {}
      return !0;
    },
    ib = function () {
      var a = u.document;
      a = void 0 === a ? document : a;
      return a.createElement('img');
    };
  function jb(a, b, c) {
    u.google_image_requests || (u.google_image_requests = []);
    var d = ib();
    if (b || c) {
      var e = function (f) {
        b && b(f);
        c && ra(u.google_image_requests, d);
        d.removeEventListener && d.removeEventListener('load', e, !1);
        d.removeEventListener && d.removeEventListener('error', e, !1);
      };
      d.addEventListener && d.addEventListener('load', e, !1);
      d.addEventListener && d.addEventListener('error', e, !1);
    }
    d.src = a;
    u.google_image_requests.push(d);
  }
  var kb = (function () {
    if (!u.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, 'passive', {
        get: function () {
          a = !0;
        },
      });
    try {
      u.addEventListener('test', function () {}, b),
        u.removeEventListener('test', function () {}, b);
    } catch (c) {}
    return a;
  })();
  function lb(a, b) {
    if ('undefined' === typeof ReportingObserver) return null;
    var c = function (e) {
        e = r(e);
        for (var f = e.next(); !f.done; f = e.next()) (f = f.value), a(f) && b(f);
      },
      d = new ReportingObserver(c, { buffered: !0 });
    u.addEventListener('pagehide', function () {
      c(d.takeRecords(), d);
      d.disconnect();
    });
    d.observe();
    return d;
  }
  var mb = {
    Ia: 'AdClickThru',
    Ja: 'AdDurationChange',
    AD_ERROR: 'AdError',
    Ka: 'AdExpandedChange',
    La: 'AdImpression',
    Ma: 'AdInteraction',
    Na: 'AdLinearChange',
    Oa: 'AdLoaded',
    Pa: 'AdLog',
    Qa: 'AdPaused',
    Ra: 'AdPlaying',
    Sa: 'AdRemainingTimeChange',
    Ta: 'AdSizeChange',
    Va: 'AdSkipped',
    Wa: 'AdStarted',
    Xa: 'AdStopped',
    Ua: 'AdSkippableStateChange',
    Ya: 'AdUserAcceptInvitation',
    Za: 'AdUserClose',
    ab: 'AdUserMinimize',
    bb: 'AdVideoComplete',
    cb: 'AdVideoFirstQuartile',
    eb: 'AdVideoMidpoint',
    fb: 'AdVideoStart',
    gb: 'AdVideoThirdQuartile',
    hb: 'AdVolumeChange',
    ib: 'Ping',
  };
  var nb = RegExp('^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)'),
    rb = function (a) {
      a = a || ob();
      for (var b = new pb(u.location.href, !1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
        var f = a[e];
        !c && nb.test(f.url) && (c = f);
        if (f.url && !f.ca) {
          b = f;
          break;
        }
      }
      e = null;
      f = a.length && a[d].url;
      0 != b.depth && f && (e = a[d]);
      return new qb(b, e, c);
    },
    ob = function () {
      var a = u,
        b = [],
        c = null;
      do {
        var d = a;
        try {
          var e = !!d && null != d.location.href && va(d, 'foo');
        } catch (h) {
          e = !1;
        }
        if (e) {
          var f = d.location.href;
          c = (d.document && d.document.referrer) || null;
        } else (f = c), (c = null);
        b.push(new pb(f || ''));
        try {
          a = d.parent;
        } catch (h) {
          a = null;
        }
      } while (a && d != a);
      d = 0;
      for (a = b.length - 1; d <= a; ++d) b[d].depth = a - d;
      d = u;
      if (
        d.location &&
        d.location.ancestorOrigins &&
        d.location.ancestorOrigins.length == b.length - 1
      )
        for (a = 1; a < b.length; ++a)
          (f = b[a]), f.url || ((f.url = d.location.ancestorOrigins[a - 1] || ''), (f.ca = !0));
      return b;
    },
    qb = function (a, b, c) {
      this.h = a;
      this.i = b;
      this.g = c;
    },
    pb = function (a, b) {
      this.url = a;
      this.ca = !!b;
      this.depth = null;
    };
  var sb = function () {
      this.i = '&';
      this.h = {};
      this.l = 0;
      this.g = [];
    },
    ub = function (a, b, c, d, e) {
      var f = [];
      fb(a, function (h, g) {
        (h = tb(h, b, c, d, e)) && f.push(g + '=' + h);
      });
      return f.join(b);
    },
    tb = function (a, b, c, d, e) {
      if (null == a) return '';
      b = b || '&';
      c = c || ',$';
      'string' == typeof c && (c = c.split(''));
      if (a instanceof Array) {
        if (((d = d || 0), d < c.length)) {
          for (var f = [], h = 0; h < a.length; h++) f.push(tb(a[h], b, c, d + 1, e));
          return f.join(c[d]);
        }
      } else if ('object' == typeof a)
        return (e = e || 0), 2 > e ? encodeURIComponent(ub(a, b, c, d, e + 1)) : '...';
      return encodeURIComponent(String(a));
    },
    F = function (a, b, c) {
      var d = a.l++,
        e = {};
      e[b] = c;
      b = [e];
      a.g.push(d);
      a.h[d] = b;
    },
    wb = function (a, b) {
      b += '//pagead2.googlesyndication.com/pagead/gen_204?';
      var c = vb(a) - 16;
      if (0 > c) return '';
      a.g.sort(function (p, C) {
        return p - C;
      });
      for (var d = null, e = '', f = 0; f < a.g.length; f++)
        for (var h = a.g[f], g = a.h[h], k = 0; k < g.length; k++) {
          if (!c) {
            d = null == d ? h : d;
            break;
          }
          var l = ub(g[k], a.i, ',$');
          if (l) {
            l = e + l;
            if (c >= l.length) {
              c -= l.length;
              b += l;
              e = a.i;
              break;
            }
            d = null == d ? h : d;
          }
        }
      a = '';
      null != d && (a = e + 'trn=' + d);
      return b + a;
    },
    vb = function (a) {
      var b = 1,
        c;
      for (c in a.h) b = c.length > b ? c.length : b;
      return 3997 - b - a.i.length - 1;
    };
  var xb = function (a, b) {
      this.g = a;
      this.depth = b;
    },
    zb = function () {
      var a = ob(),
        b = Math.max(a.length - 1, 0),
        c = rb(a);
      a = c.h;
      var d = c.i,
        e = c.g,
        f = [];
      c = function (g, k) {
        return null == g ? k : g;
      };
      e && f.push(new xb([e.url, e.ca ? 2 : 0], c(e.depth, 1)));
      d && d != e && f.push(new xb([d.url, 2], 0));
      a.url && a != e && f.push(new xb([a.url, 0], c(a.depth, b)));
      var h = pa(f, function (g, k) {
        return f.slice(0, f.length - k);
      });
      !a.url ||
        ((e || d) && a != e) ||
        ((d = gb(a.url)) && h.push([new xb([d, 1], c(a.depth, b))]));
      h.push([]);
      return pa(h, function (g) {
        return yb(b, g);
      });
    };
  function Ab() {
    var a = void 0 === a ? zb() : a;
    return a.map(function (b) {
      var c = {};
      c.url = b;
      return c;
    });
  }
  function yb(a, b) {
    var c = qa(b, function (e, f) {
        return Math.max(e, f.depth);
      }),
      d = ta(c + 2);
    d[0] = a;
    oa(b, function (e) {
      return (d[e.depth + 1] = e.g);
    });
    return d;
  }
  function Bb() {
    var a = void 0 === a ? zb() : a;
    return a.map(function (b) {
      return tb(b);
    });
  }
  var Cb = function () {
      if (!A) return !1;
      try {
        return new ActiveXObject('MSXML2.DOMDocument'), !0;
      } catch (a) {
        return !1;
      }
    },
    Db = A && Cb(),
    Eb = function (a) {
      if ('undefined' != typeof DOMParser && !Db) {
        var b = new DOMParser();
        a = Ta(a);
        return b.parseFromString(Sa(a), 'application/xml');
      }
      if (Db) {
        b = new ActiveXObject('MSXML2.DOMDocument');
        b.resolveExternals = !1;
        b.validateOnParse = !1;
        try {
          b.setProperty('ProhibitDTD', !0),
            b.setProperty('MaxXMLSize', 2048),
            b.setProperty('MaxElementDepth', 256);
        } catch (c) {}
        b.loadXML(a);
        return b;
      }
      throw Error('Your browser does not support loading xml documents');
    };
  var Fb = function () {
    this.m = this.m;
    this.s = this.s;
  };
  Fb.prototype.m = !1;
  Fb.prototype.l = function () {
    if (this.s) for (; this.s.length; ) this.s.shift()();
  };
  var G = function (a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.h = !1;
  };
  G.prototype.stopPropagation = function () {
    this.h = !0;
  };
  G.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
  };
  var H = function (a, b) {
    G.call(this, a ? a.type : '');
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = '';
    this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = '';
    this.g = null;
    a && this.init(a, b);
  };
  x(H, G);
  var Gb = { 2: 'touch', 3: 'pen', 4: 'mouse' };
  H.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    (b = a.relatedTarget)
      ? Aa && (va(b, 'nodeName') || (b = null))
      : 'mouseover' == c
      ? (b = a.fromElement)
      : 'mouseout' == c && (b = a.toElement);
    this.relatedTarget = b;
    d
      ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
        (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
        (this.screenX = d.screenX || 0),
        (this.screenY = d.screenY || 0))
      : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
        (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
        (this.screenX = a.screenX || 0),
        (this.screenY = a.screenY || 0));
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || '';
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = 'string' === typeof a.pointerType ? a.pointerType : Gb[a.pointerType] || '';
    this.state = a.state;
    this.g = a;
    a.defaultPrevented && H.U.preventDefault.call(this);
  };
  H.prototype.stopPropagation = function () {
    H.U.stopPropagation.call(this);
    this.g.stopPropagation ? this.g.stopPropagation() : (this.g.cancelBubble = !0);
  };
  H.prototype.preventDefault = function () {
    H.U.preventDefault.call(this);
    var a = this.g;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  var I = 'closure_listenable_' + ((1e6 * Math.random()) | 0);
  var Hb = 0;
  var Ib = function (a, b, c, d, e) {
      this.listener = a;
      this.proxy = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.M = e;
      this.key = ++Hb;
      this.T = this.Y = !1;
    },
    Jb = function (a) {
      a.T = !0;
      a.listener = null;
      a.proxy = null;
      a.src = null;
      a.M = null;
    };
  var Kb = function (a) {
    this.src = a;
    this.g = {};
    this.h = 0;
  };
  Kb.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || ((a = this.g[f] = []), this.h++);
    var h = Lb(a, b, d, e);
    -1 < h
      ? ((b = a[h]), c || (b.Y = !1))
      : ((b = new Ib(b, this.src, f, !!d, e)), (b.Y = c), a.push(b));
    return b;
  };
  var Mb = function (a, b) {
      var c = b.type;
      c in a.g && ra(a.g[c], b) && (Jb(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
    },
    Lb = function (a, b, c, d) {
      for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.T && f.listener == b && f.capture == !!c && f.M == d) return e;
      }
      return -1;
    };
  var Nb = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    Ob = {},
    Pb = 0,
    Rb = function (a, b, c, d, e) {
      if (d && d.once) Qb(a, b, c, d, e);
      else if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Rb(a, b[f], c, d, e);
      else
        (c = Sb(c)),
          a && a[I]
            ? a.g.add(String(b), c, !1, v(d) ? !!d.capture : !!d, e)
            : Tb(a, b, c, !1, d, e);
    },
    Tb = function (a, b, c, d, e, f) {
      if (!b) throw Error('Invalid event type');
      var h = v(e) ? !!e.capture : !!e,
        g = Ub(a);
      g || (a[Nb] = g = new Kb(a));
      c = g.add(b, c, d, h, f);
      if (!c.proxy) {
        d = Vb();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
          kb || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Wb(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error('addEventListener and attachEvent are unavailable.');
        Pb++;
      }
    },
    Vb = function () {
      var a = Xb,
        b = function (c) {
          return a.call(b.src, b.listener, c);
        };
      return b;
    },
    Qb = function (a, b, c, d, e) {
      if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Qb(a, b[f], c, d, e);
      else
        (c = Sb(c)),
          a && a[I]
            ? a.g.add(String(b), c, !0, v(d) ? !!d.capture : !!d, e)
            : Tb(a, b, c, !0, d, e);
    },
    Yb = function (a, b, c, d, e) {
      if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Yb(a, b[f], c, d, e);
      else
        ((d = v(d) ? !!d.capture : !!d), (c = Sb(c)), a && a[I])
          ? ((a = a.g),
            (b = String(b).toString()),
            b in a.g &&
              ((f = a.g[b]),
              (c = Lb(f, c, d, e)),
              -1 < c &&
                (Jb(f[c]),
                Array.prototype.splice.call(f, c, 1),
                0 == f.length && (delete a.g[b], a.h--))))
          : a &&
            (a = Ub(a)) &&
            ((b = a.g[b.toString()]),
            (a = -1),
            b && (a = Lb(b, c, d, e)),
            (c = -1 < a ? b[a] : null) && Zb(c));
    },
    Zb = function (a) {
      if ('number' !== typeof a && a && !a.T) {
        var b = a.src;
        if (b && b[I]) Mb(b.g, a);
        else {
          var c = a.type,
            d = a.proxy;
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(Wb(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
          Pb--;
          (c = Ub(b)) ? (Mb(c, a), 0 == c.h && ((c.src = null), (b[Nb] = null))) : Jb(a);
        }
      }
    },
    Wb = function (a) {
      return a in Ob ? Ob[a] : (Ob[a] = 'on' + a);
    },
    Xb = function (a, b) {
      if (a.T) a = !0;
      else {
        b = new H(b, this);
        var c = a.listener,
          d = a.M || a.src;
        a.Y && Zb(a);
        a = c.call(d, b);
      }
      return a;
    },
    Ub = function (a) {
      a = a[Nb];
      return a instanceof Kb ? a : null;
    },
    $b = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0),
    Sb = function (a) {
      if ('function' === typeof a) return a;
      a[$b] ||
        (a[$b] = function (b) {
          return a.handleEvent(b);
        });
      return a[$b];
    };
  var J = function () {
    Fb.call(this);
    this.g = new Kb(this);
    this.V = this;
    this.I = null;
  };
  x(J, Fb);
  J.prototype[I] = !0;
  J.prototype.addEventListener = function (a, b, c, d) {
    Rb(this, a, b, c, d);
  };
  J.prototype.removeEventListener = function (a, b, c, d) {
    Yb(this, a, b, c, d);
  };
  var K = function (a, b) {
    var c,
      d = a.I;
    if (d) for (c = []; d; d = d.I) c.push(d);
    a = a.V;
    d = b.type || b;
    if ('string' === typeof b) b = new G(b, a);
    else if (b instanceof G) b.target = b.target || a;
    else {
      var e = b;
      b = new G(d, a);
      Na(b, e);
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !b.h && 0 <= f; f--) {
        var h = (b.currentTarget = c[f]);
        e = ac(h, d, !0, b) && e;
      }
    b.h ||
      ((h = b.currentTarget = a), (e = ac(h, d, !0, b) && e), b.h || (e = ac(h, d, !1, b) && e));
    if (c)
      for (f = 0; !b.h && f < c.length; f++)
        (h = b.currentTarget = c[f]), (e = ac(h, d, !1, b) && e);
  };
  J.prototype.l = function () {
    J.U.l.call(this);
    if (this.g) {
      var a = this.g,
        b = 0,
        c;
      for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++) ++b, Jb(d[e]);
        delete a.g[c];
        a.h--;
      }
    }
    this.I = null;
  };
  var ac = function (a, b, c, d) {
    b = a.g.g[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var h = b[f];
      if (h && !h.T && h.capture == c) {
        var g = h.listener,
          k = h.M || h.src;
        h.Y && Mb(a.g, h);
        e = !1 !== g.call(k, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  };
  var bc = function () {};
  bc.prototype.g = null;
  bc.prototype.getOptions = function () {
    var a;
    (a = this.g) || ((a = {}), cc(this) && ((a[0] = !0), (a[1] = !0)), (a = this.g = a));
    return a;
  };
  var dc,
    ec = function () {};
  x(ec, bc);
  var fc = function (a) {
      return (a = cc(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
    },
    cc = function (a) {
      if (!a.h && 'undefined' == typeof XMLHttpRequest && 'undefined' != typeof ActiveXObject) {
        for (
          var b = [
              'MSXML2.XMLHTTP.6.0',
              'MSXML2.XMLHTTP.3.0',
              'MSXML2.XMLHTTP',
              'Microsoft.XMLHTTP',
            ],
            c = 0;
          c < b.length;
          c++
        ) {
          var d = b[c];
          try {
            return new ActiveXObject(d), (a.h = d);
          } catch (e) {}
        }
        throw Error(
          'Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed'
        );
      }
      return a.h;
    };
  dc = new ec();
  var gc = function (a, b, c) {
    if ('function' === typeof a) c && (a = w(a, c));
    else if (a && 'function' == typeof a.handleEvent) a = w(a.handleEvent, a);
    else throw Error('Invalid listener argument');
    return 2147483647 < Number(b) ? -1 : u.setTimeout(a, b || 0);
  };
  var L = function (a) {
    J.call(this);
    this.headers = new Map();
    this.C = a || null;
    this.h = !1;
    this.B = this.j = null;
    this.G = '';
    this.i = this.F = this.o = this.D = !1;
    this.J = 0;
    this.u = null;
    this.O = '';
    this.L = this.R = !1;
    this.K = null;
  };
  x(L, J);
  var hc = /^https?$/i,
    ic = ['POST', 'PUT'],
    jc = [],
    lc = function (a, b) {
      var c = new L();
      jc.push(c);
      b && c.g.add('complete', b, !1, void 0, void 0);
      c.g.add('ready', c.W, !0, void 0, void 0);
      kc(c, a);
    };
  L.prototype.W = function () {
    this.m || ((this.m = !0), this.l());
    ra(jc, this);
  };
  L.prototype.setTrustToken = function (a) {
    this.K = a;
  };
  var kc = function (a, b) {
      if (a.j)
        throw Error(
          '[goog.net.XhrIo] Object is active with another request=' + a.G + '; newUri=' + b
        );
      a.G = b;
      a.D = !1;
      a.h = !0;
      a.j = a.C ? fc(a.C) : fc(dc);
      a.B = a.C ? a.C.getOptions() : dc.getOptions();
      a.j.onreadystatechange = w(a.N, a);
      try {
        (a.F = !0), a.j.open('GET', String(b), !0), (a.F = !1);
      } catch (e) {
        mc(a);
        return;
      }
      b = new Map(a.headers);
      var c = Array.from(b.keys()).find(function (e) {
          return 'content-type' == e.toLowerCase();
        }),
        d = u.FormData && !1;
      !(0 <= na(ic, 'GET')) ||
        c ||
        d ||
        b.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      b = r(b);
      for (c = b.next(); !c.done; c = b.next())
        (d = r(c.value)), (c = d.next().value), (d = d.next().value), a.j.setRequestHeader(c, d);
      a.O && (a.j.responseType = a.O);
      'withCredentials' in a.j && a.j.withCredentials !== a.R && (a.j.withCredentials = a.R);
      if ('setTrustToken' in a.j && a.K)
        try {
          a.j.setTrustToken(a.K);
        } catch (e) {}
      try {
        nc(a),
          0 < a.J &&
            ((a.L = oc(a.j)),
            a.L ? ((a.j.timeout = a.J), (a.j.ontimeout = w(a.P, a))) : (a.u = gc(a.P, a.J, a))),
          (a.o = !0),
          a.j.send(''),
          (a.o = !1);
      } catch (e) {
        mc(a);
      }
    },
    oc = function (a) {
      return A && Ia() && 'number' === typeof a.timeout && void 0 !== a.ontimeout;
    };
  L.prototype.P = function () {
    'undefined' != typeof fa && this.j && (K(this, 'timeout'), this.abort(8));
  };
  var mc = function (a) {
      a.h = !1;
      a.j && ((a.i = !0), a.j.abort(), (a.i = !1));
      pc(a);
      qc(a);
    },
    pc = function (a) {
      a.D || ((a.D = !0), K(a, 'complete'), K(a, 'error'));
    };
  L.prototype.abort = function () {
    this.j &&
      this.h &&
      ((this.h = !1),
      (this.i = !0),
      this.j.abort(),
      (this.i = !1),
      K(this, 'complete'),
      K(this, 'abort'),
      qc(this));
  };
  L.prototype.l = function () {
    this.j &&
      (this.h && ((this.h = !1), (this.i = !0), this.j.abort(), (this.i = !1)), qc(this, !0));
    L.U.l.call(this);
  };
  L.prototype.N = function () {
    this.m || (this.F || this.o || this.i ? rc(this) : this.X());
  };
  L.prototype.X = function () {
    rc(this);
  };
  var rc = function (a) {
      if (a.h && 'undefined' != typeof fa && (!a.B[1] || 4 != M(a) || 2 != sc(a)))
        if (a.o && 4 == M(a)) gc(a.N, 0, a);
        else if ((K(a, 'readystatechange'), 4 == M(a))) {
          a.h = !1;
          try {
            tc(a) ? (K(a, 'complete'), K(a, 'success')) : pc(a);
          } finally {
            qc(a);
          }
        }
    },
    qc = function (a, b) {
      if (a.j) {
        nc(a);
        var c = a.j,
          d = a.B[0] ? function () {} : null;
        a.j = null;
        a.B = null;
        b || K(a, 'ready');
        try {
          c.onreadystatechange = d;
        } catch (e) {}
      }
    },
    nc = function (a) {
      a.j && a.L && (a.j.ontimeout = null);
      a.u && (u.clearTimeout(a.u), (a.u = null));
    };
  L.prototype.isActive = function () {
    return !!this.j;
  };
  var tc = function (a) {
      var b = sc(a);
      a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
          var c = !0;
          break a;
        default:
          c = !1;
      }
      if (!c) {
        if ((b = 0 === b))
          (a = String(a.G).match(db)[1] || null),
            !a && u.self && u.self.location && (a = u.self.location.protocol.slice(0, -1)),
            (b = !hc.test(a ? a.toLowerCase() : ''));
        c = b;
      }
      return c;
    },
    M = function (a) {
      return a.j ? a.j.readyState : 0;
    },
    sc = function (a) {
      try {
        return 2 < M(a) ? a.j.status : -1;
      } catch (b) {
        return -1;
      }
    };
  var uc = /^https?:\/\/ad.doubleclick.net\//,
    vc = /;dc_qid=([^;]+)/,
    wc = function () {
      this.g = 0;
      this.l = null;
      this.h = '';
      this.i = !1;
    },
    yc = function (a, b, c) {
      if ((b = xc(a, b)))
        (a.m = c),
          (a.g = 1),
          lc(b, function (d) {
            a.g = 0;
            d = d.target;
            if (tc(d)) {
              try {
                var e = d.j ? d.j.responseText : '';
              } catch (g) {
                e = '';
              }
              if (
                (e = Eb(e)) &&
                e.documentElement &&
                0 == e.getElementsByTagName('parsererror').length
              ) {
                if ('undefined' != typeof e.selectNodes) {
                  var f = cb(e);
                  'undefined' != typeof f.setProperty &&
                    f.setProperty('SelectionLanguage', 'XPath');
                  e = e.selectNodes('/VAST/Ad');
                } else if (document.implementation.hasFeature('XPath', '3.0')) {
                  f = cb(e);
                  d = f.createNSResolver(f.documentElement);
                  e = f.evaluate('/VAST/Ad', e, d, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                  f = [];
                  d = e.snapshotLength;
                  for (var h = 0; h < d; h++) f.push(e.snapshotItem(h));
                  e = f;
                } else e = [];
                0 == e.length && (a.g = 2);
              } else (a.h = 'XML error'), (a.i = !0);
            } else {
              try {
                f = 2 < M(d) ? d.j.statusText : '';
              } catch (g) {
                f = '';
              }
              a.h = sc(d) + ' ' + f;
              a.i = !0;
            }
            a.m();
          });
    },
    zc = function (a) {
      var b = [];
      a.h && b.push(a.h);
      a.l && b.push(a.l);
      return b;
    },
    xc = function (a, b) {
      try {
        if (!b) return null;
        var c = Eb(b);
        if ('undefined' != typeof c.selectSingleNode) {
          var d = cb(c);
          'undefined' != typeof d.setProperty && d.setProperty('SelectionLanguage', 'XPath');
          var e = c.selectSingleNode(
            "/VAST/Ad/*/Extensions/Extension[@type='DCMOriginalRequest']/RequestUrl"
          );
        } else if (document.implementation.hasFeature('XPath', '3.0')) {
          d = cb(c);
          var f = d.createNSResolver(d.documentElement);
          e = d.evaluate(
            "/VAST/Ad/*/Extensions/Extension[@type='DCMOriginalRequest']/RequestUrl",
            c,
            f,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
        } else e = null;
        var h = e.firstChild.nodeValue;
        if (!h || !uc.test(h)) return null;
        var g = vc.exec(h);
        g && g[1] && (a.l = g[1]);
        return h + ';dc_rfl=' + Bb()[0];
      } catch (k) {
        return null;
      }
    };
  var N = function (a, b) {
    this.i = this.s = this.l = '';
    this.u = null;
    this.o = this.h = '';
    this.m = !1;
    var c;
    a instanceof N
      ? ((this.m = void 0 !== b ? b : a.m),
        Ac(this, a.l),
        (this.s = a.s),
        (this.i = a.i),
        Bc(this, a.u),
        (this.h = a.h),
        Cc(this, Dc(a.g)),
        (this.o = a.o))
      : a && (c = String(a).match(db))
      ? ((this.m = !!b),
        Ac(this, c[1] || '', !0),
        (this.s = O(c[2] || '')),
        (this.i = O(c[3] || '', !0)),
        Bc(this, c[4]),
        (this.h = O(c[5] || '', !0)),
        Cc(this, c[6] || '', !0),
        (this.o = O(c[7] || '')))
      : ((this.m = !!b), (this.g = new P(null, this.m)));
  };
  N.prototype.toString = function () {
    var a = [],
      b = this.l;
    b && a.push(Q(b, Ec, !0), ':');
    var c = this.i;
    if (c || 'file' == b)
      a.push('//'),
        (b = this.s) && a.push(Q(b, Ec, !0), '@'),
        a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (c = this.u),
        null != c && a.push(':', String(c));
    if ((c = this.h))
      this.i && '/' != c.charAt(0) && a.push('/'), a.push(Q(c, '/' == c.charAt(0) ? Fc : Gc, !0));
    (c = this.g.toString()) && a.push('?', c);
    (c = this.o) && a.push('#', Q(c, Hc));
    return a.join('');
  };
  N.prototype.resolve = function (a) {
    var b = new N(this),
      c = !!a.l;
    c ? Ac(b, a.l) : (c = !!a.s);
    c ? (b.s = a.s) : (c = !!a.i);
    c ? (b.i = a.i) : (c = null != a.u);
    var d = a.h;
    if (c) Bc(b, a.u);
    else if ((c = !!a.h)) {
      if ('/' != d.charAt(0))
        if (this.i && !this.h) d = '/' + d;
        else {
          var e = b.h.lastIndexOf('/');
          -1 != e && (d = b.h.slice(0, e + 1) + d);
        }
      e = d;
      if ('..' == e || '.' == e) d = '';
      else if (-1 != e.indexOf('./') || -1 != e.indexOf('/.')) {
        d = 0 == e.lastIndexOf('/', 0);
        e = e.split('/');
        for (var f = [], h = 0; h < e.length; ) {
          var g = e[h++];
          '.' == g
            ? d && h == e.length && f.push('')
            : '..' == g
            ? ((1 < f.length || (1 == f.length && '' != f[0])) && f.pop(),
              d && h == e.length && f.push(''))
            : (f.push(g), (d = !0));
        }
        d = f.join('/');
      } else d = e;
    }
    c ? (b.h = d) : (c = '' !== a.g.toString());
    c ? Cc(b, Dc(a.g)) : (c = !!a.o);
    c && (b.o = a.o);
    return b;
  };
  var Ac = function (a, b, c) {
      a.l = c ? O(b, !0) : b;
      a.l && (a.l = a.l.replace(/:$/, ''));
    },
    Bc = function (a, b) {
      if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b);
        a.u = b;
      } else a.u = null;
    },
    Cc = function (a, b, c) {
      b instanceof P ? ((a.g = b), Ic(a.g, a.m)) : (c || (b = Q(b, Jc)), (a.g = new P(b, a.m)));
    },
    O = function (a, b) {
      return a ? (b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a)) : '';
    },
    Q = function (a, b, c) {
      return 'string' === typeof a
        ? ((a = encodeURI(a).replace(b, Kc)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
          a)
        : null;
    },
    Kc = function (a) {
      a = a.charCodeAt(0);
      return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    },
    Ec = /[#\/\?@]/g,
    Gc = /[#\?:]/g,
    Fc = /[#\?]/g,
    Jc = /[#\?@]/g,
    Hc = /#/g,
    P = function (a, b) {
      this.h = this.g = null;
      this.i = a || null;
      this.l = !!b;
    },
    R = function (a) {
      a.g ||
        ((a.g = new Map()),
        (a.h = 0),
        a.i &&
          eb(a.i, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c);
          }));
    };
  P.prototype.add = function (a, b) {
    R(this);
    this.i = null;
    a = S(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, (c = []));
    c.push(b);
    this.h += 1;
    return this;
  };
  var Lc = function (a, b) {
      R(a);
      b = S(a, b);
      a.g.has(b) && ((a.i = null), (a.h -= a.g.get(b).length), a.g.delete(b));
    },
    Mc = function (a, b) {
      R(a);
      b = S(a, b);
      return a.g.has(b);
    };
  P.prototype.forEach = function (a, b) {
    R(this);
    this.g.forEach(function (c, d) {
      c.forEach(function (e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  var Nc = function (a, b) {
    R(a);
    var c = [];
    if ('string' === typeof b) Mc(a, b) && (c = c.concat(a.g.get(S(a, b))));
    else for (a = Array.from(a.g.values()), b = 0; b < a.length; b++) c = c.concat(a[b]);
    return c;
  };
  P.prototype.set = function (a, b) {
    R(this);
    this.i = null;
    a = S(this, a);
    Mc(this, a) && (this.h -= this.g.get(a).length);
    this.g.set(a, [b]);
    this.h += 1;
    return this;
  };
  P.prototype.get = function (a, b) {
    if (!a) return b;
    a = Nc(this, a);
    return 0 < a.length ? String(a[0]) : b;
  };
  P.prototype.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return '';
    for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d));
      d = Nc(this, d);
      for (var f = 0; f < d.length; f++) {
        var h = e;
        '' !== d[f] && (h += '=' + encodeURIComponent(String(d[f])));
        a.push(h);
      }
    }
    return (this.i = a.join('&'));
  };
  var Dc = function (a) {
      var b = new P();
      b.i = a.i;
      a.g && ((b.g = new Map(a.g)), (b.h = a.h));
      return b;
    },
    S = function (a, b) {
      b = String(b);
      a.l && (b = b.toLowerCase());
      return b;
    },
    Ic = function (a, b) {
      b &&
        !a.l &&
        (R(a),
        (a.i = null),
        a.g.forEach(function (c, d) {
          var e = d.toLowerCase();
          d != e &&
            (Lc(this, d),
            Lc(this, e),
            0 < c.length && ((this.i = null), this.g.set(S(this, e), sa(c)), (this.h += c.length)));
        }, a));
      a.l = b;
    };
  var Oc = /!\[CDATA\[[\w.:/ ]+\/pcs\/[\w.:/?&]+xai=([\w-]+)/i,
    Pc = /<Ad[^>]+id="([^"]+)"/i,
    Qc = /<Duration>([^<]+)/i,
    Rc = /Android|iPhone|iPod/i,
    Sc = {
      Ba: function (a) {
        return lb(function (b) {
          return b.body && 'HeavyAdIntervention' === b.body.id;
        }, a);
      },
    },
    T = function () {
      this.J = 'normal';
      this.L = !1;
      this.l = Tc();
      this.G = {};
      for (var a in mb) this.G[mb[a]] = [];
      this.i = {};
      this.F = null;
      this.N = this.X = this.R = !1;
      this.m = new wc();
      this.ga = hb() ? 'https:' : 'http:';
      this.O = String(Math.random());
      this.da = 'undefined';
      this.V = this.P = null;
    },
    Uc,
    Vc,
    U = function (a, b, c, d) {
      a.i[c] = d.bind(a);
      b.addEventListener ? b.addEventListener(c, a.i[c], !1) : b.attachEvent(c, a.i[c]);
    },
    V = function (a, b, c) {
      a.i[c] &&
        (b.removeEventListener
          ? b.removeEventListener(c, a.i[c], !1)
          : b.detachEvent && b.detachEvent(c, a.i[c]),
        delete a.i[c]);
    },
    Tc = function () {
      for (
        var a = u.document,
          b = RegExp('//imasdk.googleapis.com/js/sdkloader/vpaid_adapter[_a-z]*.js(\\?.*)?$'),
          c = null,
          d = 0;
        d < a.scripts.length;
        d++
      )
        if (b.test(a.scripts[d].src)) {
          c = a.scripts[d];
          break;
        }
      if (null == c) return null;
      a = new N(c.src, !0);
      b = a.g.get('adTagUrl');
      if (!b || (0 != b.indexOf('http') && 0 != b.indexOf('//'))) return null;
      b = new N(b, !0);
      c = b.g.get('channel');
      d = 'vpaidadp_html5';
      c && (d = c + '+' + d);
      b.g.set('channel', d);
      (c = a.g.get('correlator')) && (Wc = +c || -1);
      (c = a.g.get('scor')) && (Xc = +c || -1);
      c = a.g.get('vpa');
      if ('1' == c || '0' == c) Uc = '1' == c;
      c = a.g.get('vpmute');
      if ('1' == c || '0' == c) Vc = '1' == c;
      Yc(a, b);
      return b;
    },
    Yc = function (a, b) {
      'https' == b.l &&
        ['rdid', 'is_lat', 'idtype'].forEach(function (c) {
          var d = a.g.get(c);
          d && b.g.set(c, d);
        });
    },
    $c = function (a, b, c) {
      b = void 0 === b ? 'Error' : b;
      if (c) {
        var d = c.toString();
        c.name && -1 == d.indexOf(c.name) && (d += ': ' + c.name);
        c.message && -1 == d.indexOf(c.message) && (d += ': ' + c.message);
        if (c.stack) {
          c = c.stack;
          var e = d;
          try {
            -1 == c.indexOf(e) && (c = e + '\n' + c);
            for (var f; c != f; )
              (f = c), (c = c.replace(RegExp('((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2'), '$1'));
            d = c.replace(RegExp('\n *', 'g'), '\n');
          } catch (h) {
            d = e;
          }
        }
        b += ': ' + d;
      }
      a.N = !0;
      W(a, b);
      Zc(a);
    },
    ad = function (a) {
      if (a.X && 0 == a.m.g && a.K && a.I && (a.l || a.C)) {
        a.B = bb('DIV', { style: 'position: absolute; z-index: 99; width: 100%; height: 100%' });
        a.K.insertBefore(a.B, a.K.firstChild);
        a.D = new google.ima.AdDisplayContainer(a.B, a.I);
        a.D.initialize();
        a.s = new google.ima.AdsLoader(a.D);
        var b = new google.ima.AdsRequest(),
          c = Uc;
        null != c && b.setAdWillAutoPlay(c);
        c = Vc;
        null != c && b.setAdWillPlayMuted(c);
        a.l
          ? ((b.adTagUrl = a.l.toString()),
            (b.linearAdSlotHeight = a.o),
            (b.linearAdSlotWidth = a.u),
            (b.nonLinearAdSlotHeight = a.o),
            (b.nonLinearAdSlotWidth = a.u))
          : (b.adsResponse = a.C);
        U(a, a.s, google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, a.wa);
        U(a, a.s, google.ima.AdErrorEvent.Type.AD_ERROR, a.ea);
        a.s.requestAds(b);
      }
    },
    X = function (a, b, c, d) {
      try {
        if (a.l)
          if ('heavyad' === b || 'init' === b) b += '-dv3';
          else return;
        var e = new sb();
        F(e, 'id', 'vpaid_adapter_js');
        F(e, 'event', b);
        a.O && F(e, 'vps', a.O);
        F(e, 'wt', new Date().getTime());
        F(e, 'sdkv', 'h.3.530.1');
        F(e, 'xai', a.da);
        F(e, 'aid', a.P || '');
        F(e, 'len', a.V || '');
        var f = Ab();
        e.g.push(100);
        e.h[100] = f;
        c && F(e, 'error_msg', c);
        var h = wb(e, a.ga);
        if (d) jb(h, void 0 === d ? null : d, !1);
        else {
          var g = void 0 === g ? !1 : g;
          var k;
          if ((k = u.navigator)) {
            var l = u.navigator.userAgent;
            k = /Chrome/.test(l) && !/Edge/.test(l) ? !0 : !1;
          }
          k && u.navigator.sendBeacon
            ? u.navigator.sendBeacon(h)
            : jb(h, null, void 0 === g ? !1 : g);
        }
      } catch (p) {}
    };
  m = T.prototype;
  m.sa = function () {
    2 == this.m.g
      ? ((this.N = !0), X(this, 'dcend', zc(this.m), this.h.bind(this, 'AdError')))
      : (this.m.i && X(this, 'dcerr', zc(this.m)), ad(this));
  };
  m.ta = function () {
    return '2.0';
  };
  m.ua = function (a, b, c, d, e, f) {
    this.u = a;
    this.o = b;
    this.J = 'fullscreen' == c ? c : 'normal';
    a = f && f.slot;
    f = f && f.videoSlot;
    if (
      (e = (e = e && e.AdParameters)
        ? -1 != e.indexOf('&')
          ? 'document' in u
            ? Xa(e)
            : Ya(e)
          : e
        : null)
    ) {
      if ((b = Oc.exec(e))) this.da = b[1];
      if ((b = Pc.exec(e))) this.P = b[1];
      if ((b = Qc.exec(e))) this.V = b[1];
      this.C = e;
    }
    X(this, 'init');
    bd(this);
    a && f && (this.l || this.C)
      ? (yc(this.m, this.C, this.sa.bind(this)),
        (this.K = a),
        (this.I = f),
        Rc.test(u.navigator.userAgent) && this.I.load(),
        ad(this))
      : $c(
          this,
          'Error during init:' +
            (a ? '' : ' ad slot is missing') +
            (f ? '' : ' video slot is missing') +
            (this.l || this.C ? '' : ' no ad VAST or URL found')
        );
  };
  m.Ga = function () {
    if (Y(this))
      try {
        this.g.init(this.u, this.o, this.J), this.g.start();
      } catch (a) {
        $c(this, '', a);
      }
    else W(this);
  };
  m.Ha = function () {
    this.R ? cd(this) : Y(this) ? this.g.stop() : W(this);
  };
  m.Aa = function () {
    Y(this) ? this.g.pause() : W(this);
  };
  m.Da = function () {
    Y(this) ? this.g.resume() : W(this);
  };
  m.Ca = function (a, b, c) {
    Y(this)
      ? ((this.u = a),
        (this.o = b),
        (this.J = 'fullscreen' == c ? c : 'normal'),
        this.g.resize(this.u, this.o, this.J),
        this.h('AdSizeChange'))
      : W(this);
  };
  m.ia = function () {
    Y(this) ? (this.g.expand(), (this.L = !0), this.h('AdExpandedChange')) : W(this);
  };
  m.ha = function () {
    Y(this) ? (this.g.collapse(), (this.L = !1), this.h('AdExpandedChange')) : W(this);
  };
  m.Fa = function () {
    Y(this) ? this.g.getAdSkippableState() && this.g.skip() : W(this);
  };
  m.subscribe = function (a, b, c) {
    if ((b = this.G[b])) {
      var d = {};
      d.M = a;
      d.scope = c;
      b.push(d);
    }
  };
  m.fa = function (a, b) {
    var c = this.G[b],
      d = [];
    c &&
      (c.forEach(function (e) {
        e.M != a && d.push(e);
      }),
      (this.G[b] = d));
  };
  m.oa = function () {
    return !0;
  };
  m.ra = function () {
    return this.u;
  };
  m.ma = function () {
    return this.o;
  };
  m.la = function () {
    return this.L;
  };
  m.getAdSkippableState = function () {
    return this.g ? this.g.getAdSkippableState() : !1;
  };
  m.pa = function () {
    var a = -2;
    this.g && ((a = this.g.getRemainingTime()), -1 == a && (a = -2));
    return a;
  };
  m.ka = function () {
    return this.W ? this.W.getDuration() : -2;
  };
  m.qa = function () {
    return this.g ? this.g.getVolume() : -1;
  };
  m.Ea = function (a) {
    this.g && this.g.setVolume(a);
  };
  m.ja = function () {
    return '';
  };
  m.na = function () {
    return !1;
  };
  var Y = function (a) {
      return !a.N && null != a.g;
    },
    Zc = function (a) {
      a.g &&
        (a.g.destroy(),
        V(a, a.g, google.ima.AdEvent.Type.IMPRESSION),
        V(a, a.g, google.ima.AdEvent.Type.STARTED),
        V(a, a.g, google.ima.AdEvent.Type.CLICK),
        V(a, a.g, google.ima.AdEvent.Type.FIRST_QUARTILE),
        V(a, a.g, google.ima.AdEvent.Type.MIDPOINT),
        V(a, a.g, google.ima.AdEvent.Type.THIRD_QUARTILE),
        V(a, a.g, google.ima.AdEvent.Type.COMPLETE),
        V(a, a.g, google.ima.AdEvent.Type.PAUSED),
        V(a, a.g, google.ima.AdEvent.Type.RESUMED),
        V(a, a.g, google.ima.AdEvent.Type.SKIPPED),
        V(a, a.g, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED),
        V(a, a.g, google.ima.AdEvent.Type.VOLUME_CHANGED),
        V(a, a.g, google.ima.AdEvent.Type.VOLUME_MUTED),
        V(a, a.g, google.ima.AdEvent.Type.USER_CLOSE),
        V(a, a.g, google.ima.AdEvent.Type.LOADED),
        V(a, a.g, google.ima.AdEvent.Type.LOG),
        V(a, a.g, google.ima.AdEvent.Type.ALL_ADS_COMPLETED),
        V(a, a.g, google.ima.AdErrorEvent.Type.AD_ERROR),
        delete a.g);
      a.s && (a.s.destroy(), delete a.s);
      a.D && (a.D.destroy(), delete a.D);
      if (a.B) {
        var b = a.B;
        b && b.parentNode && b.parentNode.removeChild(b);
        delete a.B;
      }
    };
  T.prototype.h = function (a, b) {
    (a = this.G[a]) &&
      a.forEach(function (c) {
        c.M.apply(c.scope, b);
      });
  };
  var W = function (a, b) {
      X(a, 'error', b);
      a.h('AdError', b ? [b] : void 0);
    },
    dd = function (a) {
      null == a.F && (a.F = u.setInterval(T.prototype.h.bind(a, 'AdRemainingTimeChange'), 500));
    },
    ed = function (a) {
      null != a.F && (u.clearInterval(a.F), (a.F = null));
    };
  m = T.prototype;
  m.ya = function (a) {
    this.X = !0;
    null != a.target && (V(this, a.target, 'load'), V(this, a.target, 'error'));
    google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE);
    google.ima.settings.setIsVpaidAdapter(!0);
    0 < Wc && google.ima.settings.setPageCorrelator(Wc);
    0 < Xc && google.ima.settings.setStreamCorrelator(Xc);
    ad(this);
  };
  m.za = function (a) {
    a.target && (V(this, a.target, 'load'), V(this, a.target, 'error'));
    $c(this, 'SdkLoadError');
  };
  m.wa = function (a) {
    this.g = a.getAdsManager(this.I);
    U(this, this.g, google.ima.AdEvent.Type.IMPRESSION, this.A);
    U(this, this.g, google.ima.AdEvent.Type.STARTED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.CLICK, this.A);
    U(this, this.g, google.ima.AdEvent.Type.FIRST_QUARTILE, this.A);
    U(this, this.g, google.ima.AdEvent.Type.MIDPOINT, this.A);
    U(this, this.g, google.ima.AdEvent.Type.THIRD_QUARTILE, this.A);
    U(this, this.g, google.ima.AdEvent.Type.COMPLETE, this.A);
    U(this, this.g, google.ima.AdEvent.Type.PAUSED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.RESUMED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.SKIPPED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.VOLUME_CHANGED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.VOLUME_MUTED, this.A);
    U(this, this.g, google.ima.AdEvent.Type.USER_CLOSE, this.A);
    U(this, this.g, google.ima.AdEvent.Type.LOADED, this.va);
    U(this, this.g, google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.xa);
    U(this, this.g, google.ima.AdErrorEvent.Type.AD_ERROR, this.ea);
    this.h('AdLoaded');
  };
  m.A = function (a) {
    switch (a.type) {
      case google.ima.AdEvent.Type.IMPRESSION:
        this.h('AdImpression');
        break;
      case google.ima.AdEvent.Type.STARTED:
        this.h('AdStarted');
        this.h('AdVideoStart');
        dd(this);
        break;
      case google.ima.AdEvent.Type.CLICK:
        this.h('AdClickThru', ['', '', !1]);
        break;
      case google.ima.AdEvent.Type.FIRST_QUARTILE:
        this.h('AdVideoFirstQuartile');
        break;
      case google.ima.AdEvent.Type.MIDPOINT:
        this.h('AdVideoMidpoint');
        break;
      case google.ima.AdEvent.Type.THIRD_QUARTILE:
        this.h('AdVideoThirdQuartile');
        break;
      case google.ima.AdEvent.Type.COMPLETE:
        this.h('AdVideoComplete');
        break;
      case google.ima.AdEvent.Type.PAUSED: {
        console.log('bllink ima ad paused');
        this.h('AdPaused');
        ed(this);
        break;
      }
      case google.ima.AdEvent.Type.RESUMED:
        this.h('AdPlaying');
        dd(this);
        break;
      case google.ima.AdEvent.Type.SKIPPED:
        this.h('AdSkipped');
        ed(this);
        break;
      case google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
        this.h('AdSkippableStateChange');
        break;
      case google.ima.AdEvent.Type.VOLUME_CHANGED:
      case google.ima.AdEvent.Type.VOLUME_MUTED:
        this.h('AdVolumeChange');
        break;
      case google.ima.AdEvent.Type.USER_CLOSE:
        this.h('AdUserClose');
    }
  };
  m.va = function (a) {
    this.W = a.getAd();
  };
  m.ea = function (a) {
    console.log("bliink error ima", a?.getError() );
    a = a.getError ? a.getError() : null;
    var b = 'AdError' + (a ? ' ' + a.getErrorCode() + ' (' + a.getMessage() + ')' : '');
    $c(this, b, a);
  };
  m.xa = function () {
    this.R = !0;
    ed(this);
    cd(this);
  };
  var cd = function (a) {
      u.setTimeout(function () {
        Zc(a);
        a.h('AdStopped');
      }, 100);
    },
    bd = function (a) {
      Sc.Ba(function (b) {
        b = b.body;
        X(a, 'heavyad', b.message);
        a.h('AdError', ['HeavyAdIntervention: ' + b.message]);
      });
    },
    fd = function () {
      var a = 'ba';
      T.ba && T.hasOwnProperty(a) ? (a = T.ba) : ((a = new T()), (T.ba = a));
      return a;
    },
    Wc = -1,
    Xc = -1;
  var gd = fd(),
    hd = new B(Ja, '//imasdk.googleapis.com/js/sdkloader/ima3.js'),
    Z = bb('SCRIPT');
  Z.type = 'text/javascript';
  var id,
    jd = hd instanceof B && hd.constructor === B && hd.h === Ka ? hd.g : 'type_error:Const',
    kd = Pa(),
    ld = kd ? kd.createScriptURL(jd) : jd;
  id = new D(ld, Qa);
  Z.src = id instanceof D && id.constructor === D ? id.g : 'type_error:TrustedResourceUrl';
  var md,
    nd,
    od,
    pd =
      null ==
      (od = (nd = ((Z.ownerDocument && Z.ownerDocument.defaultView) || window).document)
        .querySelector)
        ? void 0
        : od.call(nd, 'script[nonce]');
  (md = pd ? pd.nonce || pd.getAttribute('nonce') || '' : '') && Z.setAttribute('nonce', md);
  U(gd, Z, 'load', gd.ya);
  U(gd, Z, 'error', gd.za);
  var qd = u.document;
  (qd.body || qd.head).appendChild(Z);
  T.prototype.handshakeVersion = T.prototype.ta;
  T.prototype.initAd = T.prototype.ua;
  T.prototype.resizeAd = T.prototype.Ca;
  T.prototype.startAd = T.prototype.Ga;
  T.prototype.stopAd = T.prototype.Ha;
  T.prototype.pauseAd = T.prototype.Aa;
  T.prototype.resumeAd = T.prototype.Da;
  T.prototype.expandAd = T.prototype.ia;
  T.prototype.collapseAd = T.prototype.ha;
  T.prototype.skipAd = T.prototype.Fa;
  T.prototype.subscribe = T.prototype.subscribe;
  T.prototype.unsubscribe = T.prototype.fa;
  T.prototype.getAdLinear = T.prototype.oa;
  T.prototype.getAdWidth = T.prototype.ra;
  T.prototype.getAdHeight = T.prototype.ma;
  T.prototype.getAdExpanded = T.prototype.la;
  T.prototype.getAdSkippableState = T.prototype.getAdSkippableState;
  T.prototype.getAdRemainingTime = T.prototype.pa;
  T.prototype.getAdDuration = T.prototype.ka;
  T.prototype.getAdVolume = T.prototype.qa;
  T.prototype.setAdVolume = T.prototype.Ea;
  T.prototype.getAdCompanions = T.prototype.ja;
  T.prototype.getAdIcons = T.prototype.na;
  u.getVPAIDAd = function () {
    return fd();
  };
}.call(this));
