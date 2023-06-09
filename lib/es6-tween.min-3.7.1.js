// https://cdn.bootcss.com/es6-tween/3.7.1/Tween.min.js
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e((t.TWEEN = {}));
})(this, function (t) {
  'use strict';
  var e =
      Object.create ||
      function (t) {
        return Object.assign({}, t || {});
      },
    n =
      Object.assign ||
      function (t) {
        for (var e = [], n = arguments.length - 1; n-- > 0; ) e[n] = arguments[n + 1];
        for (var r = 0, i = e.length; r < i; r++) {
          var o = e[r];
          for (var s in o) t[s] = o[s];
        }
        return t;
      };
  Array.isArray ||
    (Array.isArray = function (t) {
      return t && t.push && t.splice;
    });
  var r,
    i = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : this,
    o = [],
    s = !1,
    u = !1,
    a =
      i.requestAnimationFrame ||
      function (t) {
        return i.setTimeout(t, 16);
      },
    f =
      i.cancelAnimationFrame ||
      function (t) {
        return i.clearTimeout(t);
      },
    h = function (t) {
      o.push(t), u && !s && ((r = a(d)), (s = !0));
    },
    p = function (t) {
      for (var e = 0; e < o.length; e++) if (t === o[e]) return o[e];
      return null;
    },
    l = function (t) {
      var e = o.indexOf(t);
      -1 !== e && o.splice(e, 1);
    },
    c = (function () {
      if ('undefined' != typeof process && void 0 !== process.hrtime)
        return function () {
          var t = process.hrtime();
          return 1e3 * t[0] + t[1] / 1e6;
        };
      if (void 0 !== i.performance && void 0 !== i.performance.now)
        return i.performance.now.bind(i.performance);
      var t =
        i.performance && i.performance.timing && i.performance.timing.navigationStart
          ? i.performance.timing.navigationStart
          : Date.now();
      return function () {
        return Date.now() - t;
      };
    })(),
    d = function (t, e) {
      if (((t = void 0 !== t ? t : c()), (r = a(d)), 0 === o.length)) return f(r), (s = !1), !1;
      for (var n = 0; n < o.length; ) o[n].update(t, e), n++;
      return !0;
    },
    y = {};
  if (i.document && i.document.addEventListener) {
    var _ = 0,
      v = 0;
    i.document.addEventListener('visibilitychange', function () {
      if (document.hidden) (v = c()), f(r), (s = !1);
      else {
        _ = c() - v;
        for (var t = 0, e = o.length; t < e; t++) o[t]._startTime += _;
        (r = a(d)), (s = !0);
      }
      return !0;
    });
  }
  var m = {
      Linear: {
        None: function (t) {
          return t;
        },
      },
      Quadratic: {
        In: function (t) {
          return t * t;
        },
        Out: function (t) {
          return t * (2 - t);
        },
        InOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
      },
      Cubic: {
        In: function (t) {
          return t * t * t;
        },
        Out: function (t) {
          return --t * t * t + 1;
        },
        InOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
        },
      },
      Quartic: {
        In: function (t) {
          return t * t * t * t;
        },
        Out: function (t) {
          return 1 - --t * t * t * t;
        },
        InOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
        },
      },
      Quintic: {
        In: function (t) {
          return t * t * t * t * t;
        },
        Out: function (t) {
          return --t * t * t * t * t + 1;
        },
        InOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
      },
      Sinusoidal: {
        In: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        Out: function (t) {
          return Math.sin((t * Math.PI) / 2);
        },
        InOut: function (t) {
          return 0.5 * (1 - Math.cos(Math.PI * t));
        },
      },
      Exponential: {
        In: function (t) {
          return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        Out: function (t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        InOut: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (t *= 2) < 1
            ? 0.5 * Math.pow(1024, t - 1)
            : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
      },
      Circular: {
        In: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Out: function (t) {
          return Math.sqrt(1 - --t * t);
        },
        InOut: function (t) {
          return (t *= 2) < 1
            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
            : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
      },
      Elastic: {
        In: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI);
        },
        Out: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : Math.pow(2, -10 * t) * Math.sin(5 * (t - 0.1) * Math.PI) + 1;
        },
        InOut: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (t *= 2) < 1
            ? -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
            : 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1;
        },
      },
      Back: {
        In: function (t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        Out: function (t) {
          var e = 1.70158;
          return --t * t * ((e + 1) * t + e) + 1;
        },
        InOut: function (t) {
          var e = 2.5949095;
          return (t *= 2) < 1
            ? t * t * ((e + 1) * t - e) * 0.5
            : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
      },
      Bounce: {
        In: function (t) {
          return 1 - m.Bounce.Out(1 - t);
        },
        Out: function (t) {
          return t < 1 / 2.75
            ? 7.5625 * t * t
            : t < 2 / 2.75
            ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
            : t < 2.5 / 2.75
            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        InOut: function (t) {
          return t < 0.5 ? 0.5 * m.Bounce.In(2 * t) : 0.5 * m.Bounce.Out(2 * t - 1) + 0.5;
        },
      },
    },
    g =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    b = (function (t, e) {
      return (e = { exports: {} }), t(e, e.exports), e.exports;
    })(function (t) {
      !(function (e, n) {
        t.exports ? (t.exports = n()) : (e.InterTween = n());
      })('undefined' != typeof window ? window : g, function () {
        function t(t) {
          var e = parseFloat(t);
          return 'number' != typeof e || isNaN(e) ? t : e;
        }
        function e(t, e) {
          var n, r, i;
          3 === e.length && (e = (n = e[0]) + n + (r = e[1]) + r + (i = e[2]) + i);
          var o = parseInt(e, 16);
          return (
            (n = (o >> 16) & m),
            (r = (o >> 8) & m),
            (i = o & m),
            'rgb(' + n + ',' + r + ',' + i + ')'
          );
        }
        function n(t) {
          return 'string' == typeof t ? t.replace(_, '').replace(v, ',') : t;
        }
        function r(t, e) {
          if ('number' == typeof e) return e;
          var n = b[e.substr(0, 2)],
            r = e.substr(2);
          if (1 === n) {
            var i = e[0] + r;
            return t + parseFloat(i);
          }
          return 2 === n ? t * +r : 3 === n ? t / +r : 4 === n ? t * (+r / 100) : e;
        }
        function i(e) {
          var n = T(e);
          return 'string' == typeof n ? n.match(d).map(t) : e;
        }
        function o(t, e, n) {
          if (((n = void 0 !== n ? n : 1e4), !d.test(e))) return e;
          var o = i(t),
            s = i(e),
            u = f(o, s, n);
          if (u) return u;
          u = null;
          for (var a = null, h = null, p = [], y = 0, _ = s.length; y < _; y++) {
            var v = s[y],
              m = o[y];
            (p[y] = 'string' == typeof v && 1 === v.indexOf('=') ? e : null),
              c.test(v) ? ((a = y + 2), (h = y + 11)) : l.test(v) && ((a = y), (h = y + 9)),
              (s[y] = m === v ? null : null !== p[y] ? r(m, v) : v);
          }
          return function (t) {
            var e = '';
            for (y = 0; y < _; y++) {
              var i = o[y],
                u = s[y],
                f = p[y];
              (e +=
                'number' == typeof u
                  ? null !== a && y > a && y < h
                    ? (i + (u - i) * t) | 0
                    : (((i + (u - i) * t) * n) | 0) / n
                  : i),
                1 === t && null !== f && ((o[y] = u), (s[y] = r(u, f)));
            }
            return e;
          };
        }
        function s(t, e) {
          for (var n = [], r = 0, i = t.length; r < i; r++) {
            var s = t[r];
            n[r] = g(s)
              ? a(s, e)
              : 'object' == typeof s
              ? h(s, e)
              : 'string' == typeof s
              ? o(s, e)
              : s;
          }
          return function (r) {
            for (var i = 0, o = n.length; i < o; i++)
              t[i] =
                'function' == typeof n[i]
                  ? n[i](r)
                  : 'number' == typeof n[i]
                  ? n[i] + (e - n[i]) * r
                  : n[i];
            return t;
          };
        }
        function u(t, e) {
          for (var n = [], r = 0, i = e.length; r < i; r++) {
            var o = e[r];
            n[r] = p(0 === r ? t : e[r - 1], o);
          }
          var s = e[e.length - 1];
          n.push(p(s, s));
          var u = n.length - 1;
          return function (t) {
            var e = t * u,
              r = Math.floor(e),
              i = e - r;
            return (0, n[r])(i);
          };
        }
        function a(t, e, n) {
          n = void 0 !== n ? n : 1e4;
          for (var i = t.slice(), f = [], p = Math.min(t.length, e.length), l = 0; l < p; l++) {
            var c = i[l],
              d = e[l];
            (f[l] = 'string' == typeof d && 1 === d.indexOf('=') ? d : null),
              (i[l] =
                d.nodeType || d.update
                  ? d.update
                  : c === d
                  ? null
                  : g(d)
                  ? g(c) && d.length === c.length
                    ? a(c, d, n)
                    : u(c, d)
                  : g(c)
                  ? s(c, d)
                  : 'object' == typeof c
                  ? h(c, d, n)
                  : 'string' == typeof c
                  ? o(c, d, n)
                  : void 0 !== c
                  ? c
                  : d),
              (e[l] = null !== f[l] ? r(c, d) : d);
          }
          return function (o) {
            for (var s = 0; s < p; s++) {
              var u = i[s],
                a = e[s],
                h = f[s];
              null !== u &&
                void 0 !== u &&
                ((t[s] =
                  'number' == typeof u
                    ? (((u + (a - u) * o) * n) | 0) / n
                    : 'function' == typeof u
                    ? u(o)
                    : u.update
                    ? u.update(o)
                    : a && a.update
                    ? a.update(o)
                    : a),
                h && 1 === o && ((i[s] = a), (e[s] = r(i[s], h))));
            }
            return t;
          };
        }
        function f(t, e, n) {
          if (
            ((n = void 0 !== n ? n : 1e4),
            2 === e.length && 2 === t.length && -1 !== O.indexOf(e[1]))
          ) {
            var i = +t[0],
              o = +e[0],
              s = e[1],
              u = 'string' == typeof e[0] && 1 === e[0].indexOf('=') ? e[0] : null;
            return (
              u && (o = r(i, o)),
              i === o && e[0] === s
                ? e
                : function (t) {
                    var e = (((i + (o - i) * t) * n) | 0) / n + s;
                    return u && 1 === t && (o = r((i = o), u)), e;
                  }
            );
          }
          return !1;
        }
        function h(t, e, n) {
          n = void 0 !== n ? n : 1e4;
          var i = {},
            f = {};
          for (var p in e) {
            f[p] = t && t[p];
            var l = f[p],
              c = e[p];
            (i[p] = 'string' == typeof c && 1 === c.indexOf('=') ? c : null),
              void 0 !== t[p] &&
                ((f[p] = c.nodeType
                  ? c
                  : c.update
                  ? c
                  : l === c
                  ? null
                  : g(c)
                  ? g(l) && c.length === l.length
                    ? a(l, c, n)
                    : u(l, c)
                  : g(l)
                  ? s(l, c)
                  : 'object' == typeof l
                  ? h(l, c, n)
                  : 'string' == typeof l
                  ? o(l, c, n)
                  : void 0 !== l
                  ? l
                  : c),
                (e[p] = null !== i[p] ? r(l, c) : c));
          }
          return function (o) {
            for (var s in e) {
              var u = f[s],
                a = e[s],
                h = i[s];
              null !== u &&
                void 0 !== u &&
                ((t[s] =
                  'number' == typeof u
                    ? (((u + (a - u) * o) * n) | 0) / n
                    : 'function' == typeof u
                    ? u(o)
                    : u.update
                    ? u.update(o)
                    : a.update
                    ? a.update(o)
                    : a),
                h && 1 === o && ((f[s] = a), (e[s] = r(f[s], h))));
            }
            return t;
          };
        }
        function p(t, e, n) {
          n = void 0 !== n ? n : 1e4;
          var i = 'string' == typeof e && 'number' == typeof t && 1 === e.indexOf('=') ? e : null;
          return (
            i && (e = r(t, i)),
            e.nodeType
              ? e
              : t.nodeType
              ? t
              : g(e)
              ? g(t) && t.length === e.length
                ? a(t, e, n)
                : u(t, e)
              : g(t)
              ? s(t, e)
              : 'object' == typeof e
              ? h(t, e, n)
              : 'string' == typeof e
              ? o(t, e, n)
              : 'function' == typeof e
              ? e
              : function (o) {
                  var s = 'number' == typeof e ? (((t + (e - t) * o) * n) | 0) / n : t;
                  return i && 1 === o && (e = r((t += e), i)), s;
                }
          );
        }
        var l = /rgb/g,
          c = /argb/g,
          d = /\s+|([A-Za-z?().,{}:""[\]#\%]+)|([-+/*%]+=)?([-+*/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
          y = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i,
          _ = /\n|\r|\t/g,
          v = /, | ,| , /g,
          m = 255,
          g = Array.isArray,
          b = { '+=': 1, '-=': 1, '*=': 2, '/=': 3, '%=': 4 },
          T = function (t) {
            return 'string' != typeof t ? t : n(t).replace(y, e);
          },
          O = [
            'px',
            'pt',
            'pc',
            'deg',
            'rad',
            'turn',
            'em',
            'ex',
            'cm',
            'mm',
            'dm',
            'inch',
            'in',
            'rem',
            'vw',
            'vh',
            'vmin',
            'vmax',
            '%',
          ];
        return p;
      });
    }),
    T = {},
    O = function (t, e) {
      if (!t || !t.nodeType || !e) return e;
      var r = t.queueID || 'queue_' + Math.round(1e3 * Math.random() + Date.now());
      return (
        t.queueID || (t.queueID = r), T[r] ? (e && (T[r] = n(T[r], e)), T[r]) : ((T[r] = e), T[r])
      );
    },
    w = function () {
      this._events = {};
    };
  (w.prototype.on = function (t, e) {
    return this._events[t] || (this._events[t] = []), this._events[t].push(e), this;
  }),
    (w.prototype.once = function (t, e) {
      var n = this;
      this._events[t] || (this._events[t] = []);
      var r = this._events,
        i = r[t].length;
      return (
        this._events[t].push(function () {
          for (var o = [], s = arguments.length; s--; ) o[s] = arguments[s];
          e.apply(n, o), r[t].splice(i, 1);
        }),
        this
      );
    }),
    (w.prototype.off = function (t, e) {
      var n = this._events;
      return void 0 !== t && n[t]
        ? (e
            ? (this._events[t] = this._events[t].filter(function (t) {
                return t !== e;
              }))
            : (this._events[t].length = 0),
          this)
        : this;
    }),
    (w.prototype.emit = function (t, e, n, r, i) {
      var o = this._events[t];
      if (!o || !o.length) return this;
      for (var s = 0, u = o.length; s < u; s++) o[s](e, n, r, i);
    }),
    (Object.create = e);
  var I = 0,
    M = m.Linear.None,
    x = (function (t) {
      function e(e, n) {
        t.call(this),
          (this.id = I++),
          void 0 === e || n || e.nodeType
            ? void 0 !== e &&
              ((this.node = e),
              'object' == typeof n ? (n = this.object = O(e, n)) : (this.object = n))
            : ((n = this.object = e), (e = null));
        var r = (this.isArr = Array.isArray(n));
        return (
          (this._valuesStart = r ? [] : {}),
          (this._valuesEnd = null),
          (this._valuesFunc = {}),
          (this._duration = 1e3),
          (this._easingFunction = M),
          (this._startTime = 0),
          (this._delayTime = 0),
          (this._repeat = 0),
          (this._r = 0),
          (this._isPlaying = !1),
          (this._yoyo = !1),
          (this._reversed = !1),
          (this._onStartCallbackFired = !1),
          (this._pausedTime = null),
          (this._isFinite = !0),
          (this._elapsed = 0),
          this
        );
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.fromTo = function (t, n, r, i) {
          void 0 === i && (i = {}), (i.quickRender = i.quickRender ? i.quickRender : !r);
          var o = new e(t, n).to(r, i);
          return (
            i.quickRender &&
              (o.render().update(o._startTime), (o._rendered = !1), (o._onStartCallbackFired = !1)),
            o
          );
        }),
        (e.to = function (t, n, r) {
          return e.fromTo(t, null, n, r);
        }),
        (e.from = function (t, n, r) {
          return e.fromTo(t, n, null, r);
        }),
        (e.prototype.isPlaying = function () {
          return this._isPlaying;
        }),
        (e.prototype.isStarted = function () {
          return this._onStartCallbackFired;
        }),
        (e.prototype.reverse = function () {
          var t = this._reversed;
          return (this._reversed = !t), this;
        }),
        (e.prototype.reversed = function () {
          return this._reversed;
        }),
        (e.prototype.pause = function () {
          return this._isPlaying
            ? ((this._isPlaying = !1),
              l(this),
              (this._pausedTime = c()),
              this.emit('pause', this.object))
            : this;
        }),
        (e.prototype.play = function () {
          return this._isPlaying
            ? this
            : ((this._isPlaying = !0),
              (this._startTime += c() - this._pausedTime),
              h(this),
              (this._pausedTime = c()),
              this.emit('play', this.object));
        }),
        (e.prototype.restart = function (t) {
          return (
            (this._repeat = this._r),
            (this._startTime = c() + (t ? 0 : this._delayTime)),
            this._isPlaying || h(this),
            this.emit('restart', this._object)
          );
        }),
        (e.prototype.seek = function (t, e) {
          return (
            (this._startTime = c() + Math.max(0, Math.min(t, this._duration))),
            this.emit('seek', t, this._object),
            e ? this : this.pause()
          );
        }),
        (e.prototype.duration = function (t) {
          return (this._duration = 'function' == typeof t ? t(this._duration) : t), this;
        }),
        (e.prototype.to = function (t, e) {
          var n = this;
          if (
            (void 0 === e && (e = 1e3),
            (this._valuesEnd = t),
            'number' == typeof e || 'function' == typeof e)
          )
            this._duration = 'function' == typeof e ? e(this._duration) : e;
          else if ('object' == typeof e)
            for (var r in e)
              if ('function' == typeof n[r]) {
                var i = Array.isArray(e[r]) ? e[r] : [e[r]],
                  o = i[0],
                  s = i[1],
                  u = i[2],
                  a = i[3];
                n[r](o, s, u, a);
              }
          return this;
        }),
        (e.prototype.render = function () {
          var t = this;
          if (this._rendered) return this;
          var e = this,
            n = e._valuesEnd,
            r = e._valuesFunc,
            i = e._valuesStart,
            o = e.object,
            s = e.Renderer,
            u = e.node,
            a = e.InitialValues;
          u && a && (o ? n || (n = this._valuesEnd = a(u, o)) : (o = this.object = O(u, a(u, n))));
          for (var f in n) {
            var h = o[f],
              p = n[f];
            if (y[f]) {
              var l = y[f].prototype.update ? new y[f](t, h, p, f, o) : y[f](t, h, p, f, o);
              l && (r[f] = l);
            } else
              o &&
                void 0 !== o[f] &&
                ('number' == typeof p && 'number' == typeof h
                  ? ((i[f] = h), (n[f] = p))
                  : (r[f] = b(h, p)));
          }
          return s && this.node && (this.__render = new s(this, o, n)), this;
        }),
        (e.prototype.start = function (t) {
          return (
            (this._startTime = void 0 !== t ? t : c()),
            (this._startTime += this._delayTime),
            h(this),
            (this._isPlaying = !0),
            this
          );
        }),
        (e.prototype.stop = function () {
          var t = this,
            e = t._isPlaying,
            n = t.object,
            r = t._startTime,
            i = t._duration;
          return e
            ? (this.update(r + i), l(this), (this._isPlaying = !1), this.emit('stop', n))
            : this;
        }),
        (e.prototype.delay = function (t) {
          return (
            (this._delayTime = 'function' == typeof t ? t(this._delayTime) : t),
            (this._startTime += this._delayTime),
            this
          );
        }),
        (e.prototype.repeat = function (t) {
          return (
            (this._repeat = 'function' == typeof t ? t(this._repeat) : t),
            (this._r = this._repeat),
            (this._isFinite = isFinite(t)),
            this
          );
        }),
        (e.prototype.repeatDelay = function (t) {
          return (
            (this._repeatDelayTime = 'function' == typeof t ? t(this._repeatDelayTime) : t), this
          );
        }),
        (e.prototype.reverseDelay = function (t) {
          return (
            (this._reverseDelayTime = 'function' == typeof t ? t(this._reverseDelayTime) : t), this
          );
        }),
        (e.prototype.yoyo = function (t) {
          return (this._yoyo = 'function' == typeof t ? t(this._yoyo) : t), this;
        }),
        (e.prototype.easing = function (t) {
          return (this._easingFunction = t), this;
        }),
        (e.prototype.reassignValues = function () {
          var t = this,
            e = t._valuesStart,
            n = t._valuesEnd,
            r = t.object,
            i = t.isArr;
          for (var o in n) {
            i && (o *= 1);
            var s = e[o],
              u = n[o];
            r[o] = 'function' == typeof u ? u(0) : s;
          }
          return this;
        }),
        (e.prototype.get = function (t) {
          return this.update(t), this.object;
        }),
        (e.prototype.update = function (t, e) {
          var n,
            r,
            i,
            o = this,
            s = o._onStartCallbackFired,
            u = o._easingFunction,
            a = o._repeat,
            f = o._repeatDelayTime,
            h = o._reverseDelayTime,
            p = o._yoyo,
            d = o._reversed,
            y = o._startTime,
            _ = o._duration,
            v = o._valuesStart,
            m = o._valuesEnd,
            g = o._valuesFunc,
            b = o.object,
            T = o._isFinite,
            O = o._isPlaying,
            w = o.__render;
          if (((t = void 0 !== t ? t : c()), !O || t < y)) return !0;
          if (
            (s ||
              (this._rendered || (this.render(), (this._rendered = !0)),
              this.emit('start', b),
              (this._onStartCallbackFired = !0)),
            (n = (t - y) / _),
            (n = n > 1 ? 1 : n),
            (n = d ? 1 - n : n),
            !b)
          )
            return !0;
          for (i in m) {
            r = u[i] ? u[i](n) : 'function' == typeof u ? u(n) : M(n);
            var x = v[i],
              P = m[i],
              j = g[i];
            j && j.update
              ? j.update(r, n)
              : (b[i] = j ? j(r) : 'number' == typeof P ? x + (P - x) * r : P);
          }
          return (
            w && w.update(b, n),
            this.emit('update', b, n),
            !(1 === n || (d && 0 === n)) ||
              (a
                ? (T && this._repeat--,
                  p && (this._reversed = !d),
                  this.emit(p && !d ? 'reverse' : 'repeat', b),
                  (this._startTime = !d && f ? t + f : d && h ? t + h : t),
                  !0)
                : (e || l(this),
                  (this._isPlaying = !1),
                  this.emit('complete', b),
                  (this._repeat = this._r),
                  I--,
                  !1))
          );
        }),
        e
      );
    })(w),
    P = function () {
      (this.totalTime = 0), (this.labels = []), (this.offsets = []);
    };
  (P.prototype.parseLabel = function (t, e) {
    var n = this,
      r = n.offsets,
      i = n.labels,
      o = i.indexOf(t);
    if ('string' == typeof t && -1 !== t.indexOf('=') && !e && -1 === o) {
      var s = t.substr(t.indexOf('=') - 1, 2),
        u = t.split(s);
      (e = 2 === u.length ? s + u[1] : null), (t = u[0]), (o = i.indexOf(t));
    }
    if (-1 !== o && t) {
      var a = r[o] || 0;
      if ('number' == typeof e) a = e;
      else if ('string' == typeof e && -1 !== e.indexOf('=')) {
        var f = e.charAt(0);
        (e = Number(e.substr(2))),
          '+' === f || '-' === f
            ? (a += parseFloat(f + e))
            : '*' === f
            ? (a *= e)
            : '/' === f
            ? (a /= e)
            : '%' === f && (a *= e / 100);
      }
      return a;
    }
    return 'number' == typeof e ? e : 0;
  }),
    (P.prototype.addLabel = function (t, e) {
      return this.labels.push(t), this.offsets.push(this.parseLabel(t, e)), this;
    }),
    (P.prototype.setLabel = function (t, e) {
      var n = this.labels.indexOf(t);
      return -1 !== n && this.offsets.splice(n, 1, this.parseLabel(t, e)), this;
    }),
    (P.prototype.eraseLabel = function (t) {
      var e = this.labels.indexOf(t);
      return -1 !== e && (this.labels.splice(e, 1), this.offsets.splice(e, 1)), this;
    });
  var j = 0,
    D = (function (t) {
      function e(e) {
        return (
          t.call(this),
          (this._totalDuration = 0),
          (this._startTime = c()),
          (this._tweens = []),
          (this._elapsed = 0),
          (this._id = j++),
          (this._defaultParams = e),
          (this.position = new P()),
          this.position.addLabel('afterLast', this._totalDuration),
          this.position.addLabel('afterInit', this._startTime),
          this
        );
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.fromTo = function (e, n, r, i) {
          var o = this;
          if (Array.isArray(e)) {
            this._defaultParams && (i = Object.assign(this._defaultParams, i));
            var s = i.label,
              u =
                'number' == typeof s
                  ? s
                  : this.position.parseLabel(void 0 !== s ? s : 'afterLast', null);
            e.map(function (s, a) {
              o.add(
                t.fromTo(
                  s,
                  'function' == typeof n ? n(a, e.length) : n,
                  'function' == typeof r ? r(a, e.length) : r,
                  'function' == typeof i ? i(a, e.length) : i
                ),
                u + (i.stagger || 0) * a
              );
            });
          }
          return this.start();
        }),
        (e.prototype.from = function (t, e, n) {
          return this.fromTo(t, e, null, n);
        }),
        (e.prototype.to = function (t, e, n) {
          return this.fromTo(t, null, e, n);
        }),
        (e.prototype.addLabel = function (t, e) {
          return this.position.addLabel(t, e), this;
        }),
        (e.prototype.map = function (t) {
          for (var e = this, n = 0, r = this._tweens.length; n < r; n++) {
            var i = e._tweens[n];
            t(i, n), (e._totalDuration = Math.max(e._totalDuration, i._duration + i._startTime));
          }
          return this;
        }),
        (e.prototype.add = function (e, n) {
          var r = this;
          if (Array.isArray(e))
            return (
              e.map(function (t) {
                r.add(t, n);
              }),
              this
            );
          'object' != typeof e || e instanceof t || (e = new t(e.from).to(e.to, e));
          var i = this,
            o = i._defaultParams,
            s = i._totalDuration;
          if (o) for (var u in o) 'function' == typeof e[u] && e[u](o[u]);
          var a =
            'number' == typeof n
              ? n
              : this.position.parseLabel(void 0 !== n ? n : 'afterLast', null);
          return (
            (e._startTime = Math.max(this._startTime, e._delayTime)),
            (e._startTime += a),
            (e._isPlaying = !0),
            (this._totalDuration = Math.max(s, e._startTime + e._delayTime + e._duration)),
            this._tweens.push(e),
            this.position.setLabel('afterLast', this._totalDuration),
            this
          );
        }),
        (e.prototype.restart = function () {
          return (this._startTime += c()), h(this), this.emit('restart');
        }),
        (e.prototype.easing = function (t) {
          return this.map(function (e) {
            return e.easing(t);
          });
        }),
        (e.prototype.interpolation = function (t) {
          return this.map(function (e) {
            return e.interpolation(t);
          });
        }),
        (e.prototype.update = function (t) {
          var e = this,
            n = e._tweens,
            r = e._totalDuration,
            i = e._repeatDelayTime,
            o = e._reverseDelayTime,
            s = e._startTime,
            u = e._reversed,
            a = e._yoyo,
            f = e._repeat,
            h = e._isFinite,
            p = e._elapsed;
          if (!e._isPlaying || t < s) return !0;
          var c = (t - s) / r;
          if (((c = c > 1 ? 1 : c), (c = u ? 1 - c : c), (c = ((1e3 * c) | 0) / 1e3) === p))
            return !0;
          this._elapsed = c;
          for (var d = t - s, y = u ? r - d : d, _ = 0; _ < n.length; ) n[_].update(y), _++;
          if ((this.emit('update', c, d), 1 === c || (u && 0 === c))) {
            if (f) {
              for (
                h && this._repeat--,
                  this.emit(u ? 'reverse' : 'repeat'),
                  a && (this._reversed = !u),
                  this._startTime = !u && i ? t + i : u && o ? t + o : t;
                _ < n.length;

              )
                n[_].reassignValues(), _++;
              return !0;
            }
            return (
              this.emit('complete'), (this._repeat = this._r), l(this), (this._isPlaying = !1), !1
            );
          }
          return !0;
        }),
        (e.prototype.elapsed = function (t) {
          return void 0 !== t ? this.update(t * this._totalDuration) : this._elapsed;
        }),
        (e.prototype.seek = function (t) {
          return this.update(t < 1.1 ? t * this._totalDuration : t);
        }),
        e
      );
    })(x);
  (t.Plugins = y),
    (t.Interpolator = b),
    (t.has = function (t) {
      return null !== p(t);
    }),
    (t.get = p),
    (t.getAll = function () {
      return o;
    }),
    (t.removeAll = function () {
      o.length = 0;
    }),
    (t.remove = l),
    (t.add = h),
    (t.now = c),
    (t.update = d),
    (t.autoPlay = function (t) {
      u = t;
    }),
    (t.isRunning = function () {
      return s;
    }),
    (t.Tween = x),
    (t.Easing = m),
    (t.Timeline = D),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
//# sourceMappingURL=dist/Tween.min.js.map
//# sourceMappingURL=Tween.min.js.map
