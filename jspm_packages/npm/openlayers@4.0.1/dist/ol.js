/* */ 
"format cjs";
(function(process) {
  ;
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      define([], factory);
    } else {
      root.ol = factory();
    }
  }(this, function() {
    var OPENLAYERS = {};
    var k,
        aa = this;
    function t(a, b) {
      var c = OPENLAYERS,
          d = a.split("."),
          c = c || aa;
      d[0] in c || !c.execScript || c.execScript("var " + d[0]);
      for (var e; d.length && (e = d.shift()); )
        d.length || void 0 === b ? c[e] ? c = c[e] : c = c[e] = {} : c[e] = b;
    }
    ;
    var ba,
        ca;
    function da(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    function ea(a, b) {
      return 0 <= a.indexOf(b);
    }
    function fa(a, b, c) {
      var d = a.length;
      if (a[0] <= b)
        return 0;
      if (!(b <= a[d - 1]))
        if (0 < c)
          for (c = 1; c < d; ++c) {
            if (a[c] < b)
              return c - 1;
          }
        else if (0 > c)
          for (c = 1; c < d; ++c) {
            if (a[c] <= b)
              return c;
          }
        else
          for (c = 1; c < d; ++c) {
            if (a[c] == b)
              return c;
            if (a[c] < b)
              return a[c - 1] - b < b - a[c] ? c - 1 : c;
          }
      return d - 1;
    }
    function ga(a, b) {
      var c,
          d = Array.isArray(b) ? b : [b],
          e = d.length;
      for (c = 0; c < e; c++)
        a[a.length] = d[c];
    }
    function ha(a, b) {
      for (var c = a.length >>> 0,
          d,
          e = 0; e < c; e++)
        if (d = a[e], b(d, e, a))
          return d;
      return null;
    }
    function ia(a, b) {
      var c = a.length;
      if (c !== b.length)
        return !1;
      for (var d = 0; d < c; d++)
        if (a[d] !== b[d])
          return !1;
      return !0;
    }
    function ja(a) {
      var b = ka,
          c = a.length,
          d = Array(a.length),
          e;
      for (e = 0; e < c; e++)
        d[e] = {
          index: e,
          value: a[e]
        };
      d.sort(function(a, c) {
        return b(a.value, c.value) || a.index - c.index;
      });
      for (e = 0; e < a.length; e++)
        a[e] = d[e].value;
    }
    function la(a, b) {
      var c;
      return a.every(function(d, e) {
        c = e;
        return !b(d, e, a);
      }) ? -1 : c;
    }
    function ma(a, b) {
      var c = b || da;
      return a.every(function(b, e) {
        if (!e)
          return !0;
        var d = c(a[e - 1], b);
        return !(0 < d || 0 === d);
      });
    }
    ;
    function u(a, b) {
      a.prototype = Object.create(b.prototype);
      a.prototype.constructor = a;
    }
    function na() {}
    function w(a) {
      return a.ko || (a.ko = ++oa);
    }
    var oa = 0;
    function pa(a) {
      this.message = "Assertion failed. See https://openlayers.org/en/v4.0.1/doc/errors/#" + a + " for details.";
      this.code = a;
      this.name = "AssertionError";
    }
    u(pa, Error);
    function qa(a, b) {
      if (!a)
        throw new pa(b);
    }
    ;
    function sa(a, b, c, d) {
      this.da = a;
      this.ba = b;
      this.fa = c;
      this.ja = d;
    }
    function ta(a, b, c) {
      return a.da <= b && b <= a.ba && a.fa <= c && c <= a.ja;
    }
    function ua(a, b) {
      return a.da == b.da && a.fa == b.fa && a.ba == b.ba && a.ja == b.ja;
    }
    function va(a, b) {
      return a.da <= b.ba && a.ba >= b.da && a.fa <= b.ja && a.ja >= b.fa;
    }
    ;
    function wa(a, b, c) {
      return Math.min(Math.max(a, b), c);
    }
    var xa = function() {
      var a;
      "cosh" in Math ? a = Math.cosh : a = function(a) {
        a = Math.exp(a);
        return (a + 1 / a) / 2;
      };
      return a;
    }();
    function ya(a) {
      qa(0 < a, 29);
      return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2));
    }
    function za(a, b, c, d, e, f) {
      var g = e - c,
          h = f - d;
      if (g || h) {
        var l = ((a - c) * g + (b - d) * h) / (g * g + h * h);
        1 < l ? (c = e, d = f) : 0 < l && (c += g * l, d += h * l);
      }
      return Aa(a, b, c, d);
    }
    function Aa(a, b, c, d) {
      a = c - a;
      b = d - b;
      return a * a + b * b;
    }
    function Ba(a) {
      return a * Math.PI / 180;
    }
    function Ca(a, b) {
      var c = a % b;
      return 0 > c * b ? c + b : c;
    }
    function Da(a, b, c) {
      return a + c * (b - a);
    }
    ;
    function Ea(a, b, c) {
      void 0 === c && (c = [0, 0]);
      c[0] = a[0] + 2 * b;
      c[1] = a[1] + 2 * b;
      return c;
    }
    function Fa(a, b, c) {
      void 0 === c && (c = [0, 0]);
      c[0] = a[0] * b + .5 | 0;
      c[1] = a[1] * b + .5 | 0;
      return c;
    }
    function Ga(a, b) {
      if (Array.isArray(a))
        return a;
      void 0 === b ? b = [a, a] : b[0] = b[1] = a;
      return b;
    }
    ;
    function Ha(a) {
      for (var b = Ia(),
          c = 0,
          d = a.length; c < d; ++c)
        Ja(b, a[c]);
      return b;
    }
    function Ka(a, b, c) {
      return c ? (c[0] = a[0] - b, c[1] = a[1] - b, c[2] = a[2] + b, c[3] = a[3] + b, c) : [a[0] - b, a[1] - b, a[2] + b, a[3] + b];
    }
    function Na(a, b) {
      return b ? (b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b) : a.slice();
    }
    function Oa(a, b, c) {
      b = b < a[0] ? a[0] - b : a[2] < b ? b - a[2] : 0;
      a = c < a[1] ? a[1] - c : a[3] < c ? c - a[3] : 0;
      return b * b + a * a;
    }
    function Qa(a, b) {
      return Sa(a, b[0], b[1]);
    }
    function Ta(a, b) {
      return a[0] <= b[0] && b[2] <= a[2] && a[1] <= b[1] && b[3] <= a[3];
    }
    function Sa(a, b, c) {
      return a[0] <= b && b <= a[2] && a[1] <= c && c <= a[3];
    }
    function Ua(a, b) {
      var c = a[1],
          d = a[2],
          e = a[3],
          f = b[0],
          g = b[1],
          h = 0;
      f < a[0] ? h |= 16 : f > d && (h |= 4);
      g < c ? h |= 8 : g > e && (h |= 2);
      h || (h = 1);
      return h;
    }
    function Ia() {
      return [Infinity, Infinity, -Infinity, -Infinity];
    }
    function Va(a, b, c, d, e) {
      return e ? (e[0] = a, e[1] = b, e[2] = c, e[3] = d, e) : [a, b, c, d];
    }
    function Wa(a, b) {
      var c = a[0],
          d = a[1];
      return Va(c, d, c, d, b);
    }
    function Xa(a, b, c, d, e) {
      e = Va(Infinity, Infinity, -Infinity, -Infinity, e);
      return Ya(e, a, b, c, d);
    }
    function Za(a, b) {
      return a[0] == b[0] && a[2] == b[2] && a[1] == b[1] && a[3] == b[3];
    }
    function $a(a, b) {
      b[0] < a[0] && (a[0] = b[0]);
      b[2] > a[2] && (a[2] = b[2]);
      b[1] < a[1] && (a[1] = b[1]);
      b[3] > a[3] && (a[3] = b[3]);
      return a;
    }
    function Ja(a, b) {
      b[0] < a[0] && (a[0] = b[0]);
      b[0] > a[2] && (a[2] = b[0]);
      b[1] < a[1] && (a[1] = b[1]);
      b[1] > a[3] && (a[3] = b[1]);
    }
    function Ya(a, b, c, d, e) {
      for (; c < d; c += e) {
        var f = a,
            g = b[c],
            h = b[c + 1];
        f[0] = Math.min(f[0], g);
        f[1] = Math.min(f[1], h);
        f[2] = Math.max(f[2], g);
        f[3] = Math.max(f[3], h);
      }
      return a;
    }
    function ab(a, b, c) {
      var d;
      return (d = b.call(c, bb(a))) || (d = b.call(c, cb(a))) || (d = b.call(c, db(a))) ? d : (d = b.call(c, eb(a))) ? d : !1;
    }
    function fb(a) {
      var b = 0;
      gb(a) || (b = hb(a) * ib(a));
      return b;
    }
    function bb(a) {
      return [a[0], a[1]];
    }
    function cb(a) {
      return [a[2], a[1]];
    }
    function jb(a) {
      return [(a[0] + a[2]) / 2, (a[1] + a[3]) / 2];
    }
    function kb(a, b, c, d, e) {
      var f = b * d[0] / 2;
      d = b * d[1] / 2;
      b = Math.cos(c);
      var g = Math.sin(c);
      c = f * b;
      f *= g;
      b *= d;
      var h = d * g,
          l = a[0],
          m = a[1];
      a = l - c + h;
      d = l - c - h;
      g = l + c - h;
      c = l + c + h;
      var h = m - f - b,
          l = m - f + b,
          p = m + f + b,
          f = m + f - b;
      return Va(Math.min(a, d, g, c), Math.min(h, l, p, f), Math.max(a, d, g, c), Math.max(h, l, p, f), e);
    }
    function ib(a) {
      return a[3] - a[1];
    }
    function lb(a, b, c) {
      c = c ? c : Ia();
      mb(a, b) && (c[0] = a[0] > b[0] ? a[0] : b[0], c[1] = a[1] > b[1] ? a[1] : b[1], c[2] = a[2] < b[2] ? a[2] : b[2], c[3] = a[3] < b[3] ? a[3] : b[3]);
      return c;
    }
    function eb(a) {
      return [a[0], a[3]];
    }
    function db(a) {
      return [a[2], a[3]];
    }
    function hb(a) {
      return a[2] - a[0];
    }
    function mb(a, b) {
      return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
    }
    function gb(a) {
      return a[2] < a[0] || a[3] < a[1];
    }
    function nb(a, b) {
      var c = (a[2] - a[0]) / 2 * (b - 1),
          d = (a[3] - a[1]) / 2 * (b - 1);
      a[0] -= c;
      a[2] += c;
      a[1] -= d;
      a[3] += d;
    }
    function ob(a, b, c) {
      a = [a[0], a[1], a[0], a[3], a[2], a[1], a[2], a[3]];
      b(a, a, 2);
      var d = [a[0], a[2], a[4], a[6]],
          e = [a[1], a[3], a[5], a[7]];
      b = Math.min.apply(null, d);
      a = Math.min.apply(null, e);
      d = Math.max.apply(null, d);
      e = Math.max.apply(null, e);
      return Va(b, a, d, e, c);
    }
    ;
    var pb = "function" === typeof Object.assign ? Object.assign : function(a, b) {
      if (!a || null === a)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var c = Object(a),
          d = 1,
          e = arguments.length; d < e; ++d) {
        var f = arguments[d];
        if (void 0 !== f && null !== f)
          for (var g in f)
            f.hasOwnProperty(g) && (c[g] = f[g]);
      }
      return c;
    };
    function qb(a) {
      for (var b in a)
        delete a[b];
    }
    function rb(a) {
      var b = [],
          c;
      for (c in a)
        b.push(a[c]);
      return b;
    }
    function sb(a) {
      for (var b in a)
        return !1;
      return !b;
    }
    ;
    function tb(a) {
      this.radius = a;
    }
    tb.prototype.a = function(a) {
      for (var b = 0,
          c = a.length,
          d = a[c - 1][0],
          e = a[c - 1][1],
          f = 0; f < c; f++)
        var g = a[f][0],
            h = a[f][1],
            b = b + Ba(g - d) * (2 + Math.sin(Ba(e)) + Math.sin(Ba(h))),
            d = g,
            e = h;
      return b * this.radius * this.radius / 2;
    };
    tb.prototype.b = function(a, b) {
      var c = Ba(a[1]),
          d = Ba(b[1]),
          e = (d - c) / 2,
          f = Ba(b[0] - a[0]) / 2,
          c = Math.sin(e) * Math.sin(e) + Math.sin(f) * Math.sin(f) * Math.cos(c) * Math.cos(d);
      return 2 * this.radius * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
    };
    tb.prototype.offset = function(a, b, c) {
      var d = Ba(a[1]);
      b /= this.radius;
      var e = Math.asin(Math.sin(d) * Math.cos(b) + Math.cos(d) * Math.sin(b) * Math.cos(c));
      return [180 * (Ba(a[0]) + Math.atan2(Math.sin(c) * Math.sin(b) * Math.cos(d), Math.cos(b) - Math.sin(d) * Math.sin(e))) / Math.PI, 180 * e / Math.PI];
    };
    var ub = new tb(6370997);
    var vb = {};
    vb.degrees = 2 * Math.PI * ub.radius / 360;
    vb.ft = .3048;
    vb.m = 1;
    vb["us-ft"] = 1200 / 3937;
    var wb = null;
    function yb(a) {
      this.nb = a.code;
      this.i = a.units;
      this.c = void 0 !== a.extent ? a.extent : null;
      this.g = void 0 !== a.worldExtent ? a.worldExtent : null;
      this.b = void 0 !== a.axisOrientation ? a.axisOrientation : "enu";
      this.f = void 0 !== a.global ? a.global : !1;
      this.a = !(!this.f || !this.c);
      this.j = a.getPointResolution;
      this.l = null;
      this.o = a.metersPerUnit;
      var b = a.code,
          c = wb || window.proj4;
      "function" == typeof c && (b = c.defs(b), void 0 !== b && (void 0 !== b.axis && void 0 === a.axisOrientation && (this.b = b.axis), void 0 === a.metersPerUnit && (this.o = b.to_meter), void 0 === a.units && (this.i = b.units)));
    }
    k = yb.prototype;
    k.nk = function() {
      return this.nb;
    };
    k.D = function() {
      return this.c;
    };
    k.Jb = function() {
      return this.i;
    };
    k.sc = function() {
      return this.o || vb[this.i];
    };
    k.Zk = function() {
      return this.g;
    };
    k.Kl = function() {
      return this.f;
    };
    k.pp = function(a) {
      this.f = a;
      this.a = !(!a || !this.c);
    };
    k.ln = function(a) {
      this.c = a;
      this.a = !(!this.f || !a);
    };
    k.xp = function(a) {
      this.g = a;
    };
    k.op = function(a) {
      this.j = a;
    };
    var zb = {};
    var Ab = {};
    function Bb(a, b, c) {
      a = a.nb;
      b = b.nb;
      a in Ab || (Ab[a] = {});
      Ab[a][b] = c;
    }
    function Db(a, b) {
      var c;
      a in Ab && b in Ab[a] && (c = Ab[a][b]);
      return c;
    }
    ;
    function Eb(a, b, c) {
      var d = a.j;
      d ? b = d(b, c) : "degrees" != a.Jb() && (d = Fb(a, Gb("EPSG:4326")), b = [c[0] - b / 2, c[1], c[0] + b / 2, c[1], c[0], c[1] - b / 2, c[0], c[1] + b / 2], b = d(b, b, 2), b = (ub.b(b.slice(0, 2), b.slice(2, 4)) + ub.b(b.slice(4, 6), b.slice(6, 8))) / 2, a = a.sc(), void 0 !== a && (b /= a));
      return b;
    }
    function Hb(a) {
      Ib(a);
      a.forEach(function(b) {
        a.forEach(function(a) {
          b !== a && Bb(b, a, Jb);
        });
      });
    }
    function Kb() {
      var a = Lb,
          b = Mb,
          c = Nb;
      Ob.forEach(function(d) {
        a.forEach(function(a) {
          Bb(d, a, b);
          Bb(a, d, c);
        });
      });
    }
    function Pb(a) {
      zb[a.nb] = a;
      Bb(a, a, Jb);
    }
    function Ib(a) {
      var b = [];
      a.forEach(function(a) {
        b.push(Pb(a));
      });
    }
    function Qb(a) {
      return a ? "string" === typeof a ? Gb(a) : a : Gb("EPSG:3857");
    }
    function Rb(a, b, c, d) {
      a = Gb(a);
      b = Gb(b);
      Bb(a, b, Sb(c));
      Bb(b, a, Sb(d));
    }
    function Sb(a) {
      return function(b, c, d) {
        var e = b.length;
        d = void 0 !== d ? d : 2;
        c = void 0 !== c ? c : Array(e);
        var f,
            g;
        for (g = 0; g < e; g += d)
          for (f = a([b[g], b[g + 1]]), c[g] = f[0], c[g + 1] = f[1], f = d - 1; 2 <= f; --f)
            c[g + f] = b[g + f];
        return c;
      };
    }
    function Gb(a) {
      var b = null;
      if (a instanceof yb)
        b = a;
      else if ("string" === typeof a) {
        var b = zb[a] || null,
            c = wb || window.proj4;
        b || "function" != typeof c || void 0 === c.defs(a) || (b = new yb({code: a}), Pb(b));
      }
      return b;
    }
    function Tb(a, b) {
      if (a === b)
        return !0;
      var c = a.Jb() === b.Jb();
      return a.nb === b.nb ? c : Fb(a, b) === Jb && c;
    }
    function Ub(a, b) {
      var c = Gb(a),
          d = Gb(b);
      return Fb(c, d);
    }
    function Fb(a, b) {
      var c = a.nb,
          d = b.nb,
          e = Db(c, d);
      if (!e) {
        var f = wb || window.proj4;
        if ("function" == typeof f) {
          var g = f.defs(c),
              h = f.defs(d);
          void 0 !== g && void 0 !== h && (g === h ? Hb([b, a]) : (e = f(d, c), Rb(b, a, e.forward, e.inverse)), e = Db(c, d));
        }
      }
      e || (e = Vb);
      return e;
    }
    function Vb(a, b) {
      if (void 0 !== b && a !== b) {
        for (var c = 0,
            d = a.length; c < d; ++c)
          b[c] = a[c];
        a = b;
      }
      return a;
    }
    function Jb(a, b) {
      var c;
      if (void 0 !== b) {
        c = 0;
        for (var d = a.length; c < d; ++c)
          b[c] = a[c];
        c = b;
      } else
        c = a.slice();
      return c;
    }
    function Wb(a, b, c) {
      return Ub(b, c)(a, void 0, a.length);
    }
    function Xb(a, b, c) {
      b = Ub(b, c);
      return ob(a, b);
    }
    ;
    function Yb(a, b, c, d) {
      return void 0 !== d ? (d[0] = a, d[1] = b, d[2] = c, d) : [a, b, c];
    }
    function Zb(a) {
      var b = a[0],
          c = Array(b),
          d = 1 << b - 1,
          e,
          f;
      for (e = 0; e < b; ++e)
        f = 48, a[1] & d && (f += 1), a[2] & d && (f += 2), c[e] = String.fromCharCode(f), d >>= 1;
      return c.join("");
    }
    ;
    function $b(a) {
      this.minZoom = void 0 !== a.minZoom ? a.minZoom : 0;
      this.b = a.resolutions;
      qa(ma(this.b, function(a, b) {
        return b - a;
      }), 17);
      this.maxZoom = this.b.length - 1;
      this.f = void 0 !== a.origin ? a.origin : null;
      this.c = null;
      void 0 !== a.origins && (this.c = a.origins, qa(this.c.length == this.b.length, 20));
      var b = a.extent;
      void 0 === b || this.f || this.c || (this.f = eb(b));
      qa(!this.f && this.c || this.f && !this.c, 18);
      this.i = null;
      void 0 !== a.tileSizes && (this.i = a.tileSizes, qa(this.i.length == this.b.length, 19));
      this.g = void 0 !== a.tileSize ? a.tileSize : this.i ? null : 256;
      qa(!this.g && this.i || this.g && !this.i, 22);
      this.v = void 0 !== b ? b : null;
      this.a = null;
      this.l = [0, 0];
      void 0 !== a.sizes ? this.a = a.sizes.map(function(a) {
        return new sa(Math.min(0, a[0]), Math.max(a[0] - 1, -1), Math.min(0, a[1]), Math.max(a[1] - 1, -1));
      }, this) : b && ac(this, b);
    }
    var bc = [0, 0, 0];
    k = $b.prototype;
    k.eh = function(a, b, c) {
      a = cc(this, a, b);
      for (var d = a.da,
          e = a.ba; d <= e; ++d)
        for (var f = a.fa,
            g = a.ja; f <= g; ++f)
          c([b, d, f]);
    };
    function ec(a, b, c, d, e) {
      e = a.Ta(b, e);
      for (b = b[0] - 1; b >= a.minZoom; ) {
        if (c.call(null, b, cc(a, e, b, d)))
          return !0;
        --b;
      }
      return !1;
    }
    k.D = function() {
      return this.v;
    };
    k.oh = function() {
      return this.maxZoom;
    };
    k.ph = function() {
      return this.minZoom;
    };
    k.Qc = function(a) {
      return this.f ? this.f : this.c[a];
    };
    k.La = function(a) {
      return this.b[a];
    };
    k.oi = function() {
      return this.b;
    };
    function fc(a, b, c, d) {
      return b[0] < a.maxZoom ? (d = a.Ta(b, d), cc(a, d, b[0] + 1, c)) : null;
    }
    function gc(a, b, c, d) {
      hc(a, b[0], b[1], c, !1, bc);
      var e = bc[1],
          f = bc[2];
      hc(a, b[2], b[3], c, !0, bc);
      a = bc[1];
      b = bc[2];
      void 0 !== d ? (d.da = e, d.ba = a, d.fa = f, d.ja = b) : d = new sa(e, a, f, b);
      return d;
    }
    function cc(a, b, c, d) {
      return gc(a, b, a.La(c), d);
    }
    function ic(a, b) {
      var c = a.Qc(b[0]),
          d = a.La(b[0]),
          e = Ga(a.fb(b[0]), a.l);
      return [c[0] + (b[1] + .5) * e[0] * d, c[1] + (b[2] + .5) * e[1] * d];
    }
    k.Ta = function(a, b) {
      var c = this.Qc(a[0]),
          d = this.La(a[0]),
          e = Ga(this.fb(a[0]), this.l),
          f = c[0] + a[1] * e[0] * d,
          c = c[1] + a[2] * e[1] * d;
      return Va(f, c, f + e[0] * d, c + e[1] * d, b);
    };
    k.we = function(a, b, c) {
      return hc(this, a[0], a[1], b, !1, c);
    };
    function hc(a, b, c, d, e, f) {
      var g = a.Mc(d),
          h = d / a.La(g),
          l = a.Qc(g);
      a = Ga(a.fb(g), a.l);
      b = h * Math.floor((b - l[0]) / d + (e ? .5 : 0)) / a[0];
      c = h * Math.floor((c - l[1]) / d + (e ? 0 : .5)) / a[1];
      e ? (b = Math.ceil(b) - 1, c = Math.ceil(c) - 1) : (b = Math.floor(b), c = Math.floor(c));
      return Yb(g, b, c, f);
    }
    k.Pf = function(a, b, c) {
      return hc(this, a[0], a[1], this.La(b), !1, c);
    };
    k.fb = function(a) {
      return this.g ? this.g : this.i[a];
    };
    k.Mc = function(a, b) {
      return wa(fa(this.b, a, b || 0), this.minZoom, this.maxZoom);
    };
    function ac(a, b) {
      for (var c = a.b.length,
          d = Array(c),
          e = a.minZoom; e < c; ++e)
        d[e] = cc(a, b, e);
      a.a = d;
    }
    ;
    function jc(a) {
      var b = a.l;
      if (!b) {
        var b = kc(a),
            c = lc(b, void 0, void 0),
            b = new $b({
              extent: b,
              origin: eb(b),
              resolutions: c,
              tileSize: void 0
            });
        a.l = b;
      }
      return b;
    }
    function mc(a) {
      var b = {};
      pb(b, a ? a : {});
      void 0 === b.extent && (b.extent = Gb("EPSG:3857").D());
      b.resolutions = lc(b.extent, b.maxZoom, b.tileSize);
      delete b.maxZoom;
      return new $b(b);
    }
    function lc(a, b, c) {
      b = void 0 !== b ? b : 42;
      var d = ib(a);
      a = hb(a);
      c = Ga(void 0 !== c ? c : 256);
      c = Math.max(a / c[0], d / c[1]);
      b += 1;
      d = Array(b);
      for (a = 0; a < b; ++a)
        d[a] = c / Math.pow(2, a);
      return d;
    }
    function kc(a) {
      a = Gb(a);
      var b = a.D();
      b || (a = 180 * vb.degrees / a.sc(), b = Va(-a, -a, a, a));
      return b;
    }
    ;
    function nc(a) {
      this.b = a.html;
      this.a = a.tileRanges ? a.tileRanges : null;
    }
    nc.prototype.f = function() {
      return this.b;
    };
    function oc(a) {
      return function(b) {
        if (b)
          return [wa(b[0], a[0], a[2]), wa(b[1], a[1], a[3])];
      };
    }
    function pc(a) {
      return a;
    }
    ;
    function qc(a) {
      function b(b) {
        var c = a.listener,
            e = a.Vg || a.target;
        a.Xg && rc(a);
        return c.call(e, b);
      }
      return a.Wg = b;
    }
    function sc(a, b, c, d) {
      for (var e,
          f = 0,
          g = a.length; f < g; ++f)
        if (e = a[f], e.listener === b && e.Vg === c)
          return d && (e.deleteIndex = f), e;
    }
    function tc(a, b) {
      var c = a.eb;
      return c ? c[b] : void 0;
    }
    function uc(a) {
      var b = a.eb;
      b || (b = a.eb = {});
      return b;
    }
    function vc(a, b) {
      var c = tc(a, b);
      if (c) {
        for (var d = 0,
            e = c.length; d < e; ++d)
          a.removeEventListener(b, c[d].Wg), qb(c[d]);
        c.length = 0;
        if (c = a.eb)
          delete c[b], Object.keys(c).length || delete a.eb;
      }
    }
    function B(a, b, c, d, e) {
      var f = uc(a),
          g = f[b];
      g || (g = f[b] = []);
      (f = sc(g, c, d, !1)) ? e || (f.Xg = !1) : (f = {
        Vg: d,
        Xg: !!e,
        listener: c,
        target: a,
        type: b
      }, a.addEventListener(b, qc(f)), g.push(f));
      return f;
    }
    function wc(a, b, c, d) {
      return B(a, b, c, d, !0);
    }
    function xc(a, b, c, d) {
      (a = tc(a, b)) && (c = sc(a, c, d, !0)) && rc(c);
    }
    function rc(a) {
      if (a && a.target) {
        a.target.removeEventListener(a.type, a.Wg);
        var b = tc(a.target, a.type);
        if (b) {
          var c = "deleteIndex" in a ? a.deleteIndex : b.indexOf(a);
          -1 !== c && b.splice(c, 1);
          b.length || vc(a.target, a.type);
        }
        qb(a);
      }
    }
    function yc(a) {
      var b = uc(a),
          c;
      for (c in b)
        vc(a, c);
    }
    ;
    function zc() {}
    zc.prototype.Zb = !1;
    function Ac(a) {
      a.Zb || (a.Zb = !0, a.ra());
    }
    zc.prototype.ra = na;
    function Bc(a) {
      this.type = a;
      this.target = null;
    }
    Bc.prototype.preventDefault = Bc.prototype.stopPropagation = function() {
      this.Fo = !0;
    };
    function Cc(a) {
      a.stopPropagation();
    }
    ;
    function Dc() {
      this.$a = {};
      this.ta = {};
      this.qa = {};
    }
    u(Dc, zc);
    Dc.prototype.addEventListener = function(a, b) {
      var c = this.qa[a];
      c || (c = this.qa[a] = []);
      -1 === c.indexOf(b) && c.push(b);
    };
    Dc.prototype.b = function(a) {
      var b = "string" === typeof a ? new Bc(a) : a;
      a = b.type;
      b.target = this;
      var c = this.qa[a],
          d;
      if (c) {
        a in this.ta || (this.ta[a] = 0, this.$a[a] = 0);
        ++this.ta[a];
        for (var e = 0,
            f = c.length; e < f; ++e)
          if (!1 === c[e].call(this, b) || b.Fo) {
            d = !1;
            break;
          }
        --this.ta[a];
        if (!this.ta[a]) {
          b = this.$a[a];
          for (delete this.$a[a]; b--; )
            this.removeEventListener(a, na);
          delete this.ta[a];
        }
        return d;
      }
    };
    Dc.prototype.ra = function() {
      yc(this);
    };
    function Ec(a, b) {
      return b ? b in a.qa : 0 < Object.keys(a.qa).length;
    }
    Dc.prototype.removeEventListener = function(a, b) {
      var c = this.qa[a];
      if (c) {
        var d = c.indexOf(b);
        a in this.$a ? (c[d] = na, ++this.$a[a]) : (c.splice(d, 1), c.length || delete this.qa[a]);
      }
    };
    function Fc() {
      Dc.call(this);
      this.f = 0;
    }
    u(Fc, Dc);
    k = Fc.prototype;
    k.s = function() {
      ++this.f;
      this.b("change");
    };
    k.L = function() {
      return this.f;
    };
    k.J = function(a, b, c) {
      if (Array.isArray(a)) {
        for (var d = a.length,
            e = Array(d),
            f = 0; f < d; ++f)
          e[f] = B(this, a[f], b, c);
        return e;
      }
      return B(this, a, b, c);
    };
    k.once = function(a, b, c) {
      if (Array.isArray(a)) {
        for (var d = a.length,
            e = Array(d),
            f = 0; f < d; ++f)
          e[f] = wc(this, a[f], b, c);
        return e;
      }
      return wc(this, a, b, c);
    };
    k.K = function(a, b, c) {
      if (Array.isArray(a))
        for (var d = 0,
            e = a.length; d < e; ++d)
          xc(this, a[d], b, c);
      else
        xc(this, a, b, c);
    };
    function Gc(a) {
      Fc.call(this);
      w(this);
      this.I = {};
      void 0 !== a && this.H(a);
    }
    u(Gc, Fc);
    var Hc = {};
    function Ic(a) {
      return Hc.hasOwnProperty(a) ? Hc[a] : Hc[a] = "change:" + a;
    }
    k = Gc.prototype;
    k.get = function(a) {
      var b;
      this.I.hasOwnProperty(a) && (b = this.I[a]);
      return b;
    };
    k.O = function() {
      return Object.keys(this.I);
    };
    k.N = function() {
      return pb({}, this.I);
    };
    function Jc(a, b, c) {
      var d;
      d = Ic(b);
      a.b(new Kc(d, b, c));
      a.b(new Kc("propertychange", b, c));
    }
    k.set = function(a, b, c) {
      c ? this.I[a] = b : (c = this.I[a], this.I[a] = b, c !== b && Jc(this, a, c));
    };
    k.H = function(a, b) {
      for (var c in a)
        this.set(c, a[c], b);
    };
    k.P = function(a, b) {
      if (a in this.I) {
        var c = this.I[a];
        delete this.I[a];
        b || Jc(this, a, c);
      }
    };
    function Kc(a, b, c) {
      Bc.call(this, a);
      this.key = b;
      this.oldValue = c;
    }
    u(Kc, Bc);
    function D(a) {
      Gc.call(this);
      this.a = a ? a : [];
      Lc(this);
    }
    u(D, Gc);
    k = D.prototype;
    k.clear = function() {
      for (; 0 < this.ec(); )
        this.pop();
    };
    k.Tf = function(a) {
      var b,
          c;
      b = 0;
      for (c = a.length; b < c; ++b)
        this.push(a[b]);
      return this;
    };
    k.forEach = function(a, b) {
      this.a.forEach(a, b);
    };
    k.am = function() {
      return this.a;
    };
    k.item = function(a) {
      return this.a[a];
    };
    k.ec = function() {
      return this.get(Mc);
    };
    k.Be = function(a, b) {
      this.a.splice(a, 0, b);
      Lc(this);
      this.b(new Nc("add", b));
    };
    k.pop = function() {
      return this.tg(this.ec() - 1);
    };
    k.push = function(a) {
      var b = this.ec();
      this.Be(b, a);
      return this.ec();
    };
    k.remove = function(a) {
      var b = this.a,
          c,
          d;
      c = 0;
      for (d = b.length; c < d; ++c)
        if (b[c] === a)
          return this.tg(c);
    };
    k.tg = function(a) {
      var b = this.a[a];
      this.a.splice(a, 1);
      Lc(this);
      this.b(new Nc("remove", b));
      return b;
    };
    k.mp = function(a, b) {
      var c = this.ec();
      if (a < c)
        c = this.a[a], this.a[a] = b, this.b(new Nc("remove", c)), this.b(new Nc("add", b));
      else {
        for (; c < a; ++c)
          this.Be(c, void 0);
        this.Be(a, b);
      }
    };
    function Lc(a) {
      a.set(Mc, a.a.length);
    }
    var Mc = "length";
    function Nc(a, b) {
      Bc.call(this, a);
      this.element = b;
    }
    u(Nc, Bc);
    var Oc = /^#(?:[0-9a-f]{3}){1,2}$/i,
        Pc = /^([a-z]*)$/i;
    function Qc(a) {
      return Array.isArray(a) ? a : Rc(a);
    }
    function Sc(a) {
      if ("string" !== typeof a) {
        var b = a[0];
        b != (b | 0) && (b = b + .5 | 0);
        var c = a[1];
        c != (c | 0) && (c = c + .5 | 0);
        var d = a[2];
        d != (d | 0) && (d = d + .5 | 0);
        a = "rgba(" + b + "," + c + "," + d + "," + (void 0 === a[3] ? 1 : a[3]) + ")";
      }
      return a;
    }
    var Rc = function() {
      var a = {},
          b = 0;
      return function(c) {
        var d;
        if (a.hasOwnProperty(c))
          d = a[c];
        else {
          if (1024 <= b) {
            d = 0;
            for (var e in a)
              d++ & 3 || (delete a[e], --b);
          }
          d = c;
          var f;
          Pc.exec(d) && (e = document.createElement("div"), e.style.color = d, document.body.appendChild(e), d = getComputedStyle(e).color, document.body.removeChild(e));
          if (Oc.exec(d)) {
            f = d.length - 1;
            qa(3 == f || 6 == f, 54);
            var g = 3 == f ? 1 : 2;
            f = parseInt(d.substr(1 + 0 * g, g), 16);
            e = parseInt(d.substr(1 + 1 * g, g), 16);
            d = parseInt(d.substr(1 + 2 * g, g), 16);
            1 == g && (f = (f << 4) + f, e = (e << 4) + e, d = (d << 4) + d);
            f = [f, e, d, 1];
          } else
            d.indexOf("rgba(") ? d.indexOf("rgb(") ? qa(!1, 14) : (d = d.slice(4, -1).split(",").map(Number), d.push(1), f = Uc(d)) : (d = d.slice(5, -1).split(",").map(Number), f = Uc(d));
          d = f;
          a[c] = d;
          ++b;
        }
        return d;
      };
    }();
    function Uc(a) {
      var b = [];
      b[0] = wa(a[0] + .5 | 0, 0, 255);
      b[1] = wa(a[1] + .5 | 0, 0, 255);
      b[2] = wa(a[2] + .5 | 0, 0, 255);
      b[3] = wa(a[3], 0, 1);
      return b;
    }
    ;
    function Vc(a) {
      return "string" === typeof a || a instanceof CanvasPattern || a instanceof CanvasGradient ? a : Sc(a);
    }
    ;
    function Wc(a, b, c) {
      this.center = a;
      this.resolution = b;
      this.rotation = c;
    }
    ;
    function Xc(a, b) {
      var c = document.createElement("CANVAS");
      a && (c.width = a);
      b && (c.height = b);
      return c.getContext("2d");
    }
    function Yc(a, b) {
      var c = b.parentNode;
      c && c.replaceChild(a, b);
    }
    function Zc(a) {
      a && a.parentNode && a.parentNode.removeChild(a);
    }
    ;
    function ad(a) {
      Gc.call(this);
      this.element = a.element ? a.element : null;
      this.a = this.S = null;
      this.v = [];
      this.render = a.render ? a.render : na;
      a.target && this.i(a.target);
    }
    u(ad, Gc);
    ad.prototype.ra = function() {
      Zc(this.element);
      Gc.prototype.ra.call(this);
    };
    ad.prototype.g = function() {
      return this.a;
    };
    ad.prototype.setMap = function(a) {
      this.a && Zc(this.element);
      for (var b = 0,
          c = this.v.length; b < c; ++b)
        rc(this.v[b]);
      this.v.length = 0;
      if (this.a = a)
        (this.S ? this.S : a.u).appendChild(this.element), this.render !== na && this.v.push(B(a, "postrender", this.render, this)), a.render();
    };
    ad.prototype.i = function(a) {
      this.S = "string" === typeof a ? document.getElementById(a) : a;
    };
    function bd(a) {
      a = a ? a : {};
      this.R = document.createElement("UL");
      this.u = document.createElement("LI");
      this.R.appendChild(this.u);
      this.u.style.display = "none";
      this.c = void 0 !== a.collapsed ? a.collapsed : !0;
      this.j = void 0 !== a.collapsible ? a.collapsible : !0;
      this.j || (this.c = !1);
      var b = void 0 !== a.className ? a.className : "ol-attribution",
          c = void 0 !== a.tipLabel ? a.tipLabel : "Attributions",
          d = void 0 !== a.collapseLabel ? a.collapseLabel : "\u00bb";
      "string" === typeof d ? (this.A = document.createElement("span"), this.A.textContent = d) : this.A = d;
      d = void 0 !== a.label ? a.label : "i";
      "string" === typeof d ? (this.C = document.createElement("span"), this.C.textContent = d) : this.C = d;
      var e = this.j && !this.c ? this.A : this.C,
          d = document.createElement("button");
      d.setAttribute("type", "button");
      d.title = c;
      d.appendChild(e);
      B(d, "click", this.ym, this);
      c = document.createElement("div");
      c.className = b + " ol-unselectable ol-control" + (this.c && this.j ? " ol-collapsed" : "") + (this.j ? "" : " ol-uncollapsible");
      c.appendChild(this.R);
      c.appendChild(d);
      ad.call(this, {
        element: c,
        render: a.render ? a.render : cd,
        target: a.target
      });
      this.G = !0;
      this.o = {};
      this.l = {};
      this.Y = {};
    }
    u(bd, ad);
    function cd(a) {
      if (a = a.frameState) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            l,
            m,
            p,
            n,
            q = a.layerStatesArray,
            r = pb({}, a.attributions),
            v = {},
            x = {},
            y = a.viewState.projection;
        c = 0;
        for (b = q.length; c < b; c++)
          if (g = q[c].layer.la())
            if (p = w(g).toString(), m = g.l)
              for (d = 0, e = m.length; d < e; d++)
                if (h = m[d], l = w(h).toString(), !(l in r)) {
                  if (f = a.usedTiles[p]) {
                    var z = g.Ib(y);
                    a: {
                      n = void 0;
                      var A,
                          V,
                          Pa = h,
                          ra = z,
                          La = y;
                      if (Pa.a) {
                        for (n in f)
                          if (n in Pa.a) {
                            var z = f[n],
                                C;
                            V = 0;
                            for (A = Pa.a[n].length; V < A; ++V) {
                              C = Pa.a[n][V];
                              if (va(C, z)) {
                                n = !0;
                                break a;
                              }
                              var Ma = cc(ra, kc(La), parseInt(n, 10)),
                                  xb = Ma.ba - Ma.da + 1;
                              if (z.da < Ma.da || z.ba > Ma.ba)
                                if (va(C, new sa(Ca(z.da, xb), Ca(z.ba, xb), z.fa, z.ja)) || z.ba - z.da + 1 > xb && va(C, Ma)) {
                                  n = !0;
                                  break a;
                                }
                            }
                          }
                        n = !1;
                      } else
                        n = !0;
                    }
                  } else
                    n = !1;
                  n ? (l in v && delete v[l], n = h.b, n in x || (x[n] = !0, r[l] = h)) : v[l] = h;
                }
        b = [r, v];
        c = b[0];
        b = b[1];
        for (var Z in this.o)
          Z in c ? (this.l[Z] || (this.o[Z].style.display = "", this.l[Z] = !0), delete c[Z]) : Z in b ? (this.l[Z] && (this.o[Z].style.display = "none", delete this.l[Z]), delete b[Z]) : (Zc(this.o[Z]), delete this.o[Z], delete this.l[Z]);
        for (Z in c)
          d = document.createElement("LI"), d.innerHTML = c[Z].b, this.R.appendChild(d), this.o[Z] = d, this.l[Z] = !0;
        for (Z in b)
          d = document.createElement("LI"), d.innerHTML = b[Z].b, d.style.display = "none", this.R.appendChild(d), this.o[Z] = d;
        Z = !sb(this.l) || !sb(a.logos);
        this.G != Z && (this.element.style.display = Z ? "" : "none", this.G = Z);
        Z && sb(this.l) ? this.element.classList.add("ol-logo-only") : this.element.classList.remove("ol-logo-only");
        var Ra;
        a = a.logos;
        Z = this.Y;
        for (Ra in Z)
          Ra in a || (Zc(Z[Ra]), delete Z[Ra]);
        for (var Cb in a)
          b = a[Cb], b instanceof HTMLElement && (this.u.appendChild(b), Z[Cb] = b), Cb in Z || (Ra = new Image, Ra.src = Cb, "" === b ? c = Ra : (c = document.createElement("a"), c.href = b, c.appendChild(Ra)), this.u.appendChild(c), Z[Cb] = c);
        this.u.style.display = sb(a) ? "none" : "";
      } else
        this.G && (this.element.style.display = "none", this.G = !1);
    }
    k = bd.prototype;
    k.ym = function(a) {
      a.preventDefault();
      dd(this);
    };
    function dd(a) {
      a.element.classList.toggle("ol-collapsed");
      a.c ? Yc(a.A, a.C) : Yc(a.C, a.A);
      a.c = !a.c;
    }
    k.xm = function() {
      return this.j;
    };
    k.Am = function(a) {
      this.j !== a && (this.j = a, this.element.classList.toggle("ol-uncollapsible"), !a && this.c && dd(this));
    };
    k.zm = function(a) {
      this.j && this.c !== a && dd(this);
    };
    k.wm = function() {
      return this.c;
    };
    function ed(a) {
      return Math.pow(a, 3);
    }
    function fd(a) {
      return 1 - ed(1 - a);
    }
    function gd(a) {
      return 3 * a * a - 2 * a * a * a;
    }
    function hd(a) {
      return a;
    }
    ;
    function id(a) {
      a = a ? a : {};
      var b = void 0 !== a.className ? a.className : "ol-rotate",
          c = void 0 !== a.label ? a.label : "\u21e7";
      this.c = null;
      "string" === typeof c ? (this.c = document.createElement("span"), this.c.className = "ol-compass", this.c.textContent = c) : (this.c = c, this.c.classList.add("ol-compass"));
      var d = a.tipLabel ? a.tipLabel : "Reset rotation",
          c = document.createElement("button");
      c.className = b + "-reset";
      c.setAttribute("type", "button");
      c.title = d;
      c.appendChild(this.c);
      B(c, "click", id.prototype.A, this);
      d = document.createElement("div");
      d.className = b + " ol-unselectable ol-control";
      d.appendChild(c);
      b = a.render ? a.render : jd;
      this.j = a.resetNorth ? a.resetNorth : void 0;
      ad.call(this, {
        element: d,
        render: b,
        target: a.target
      });
      this.o = void 0 !== a.duration ? a.duration : 250;
      this.l = void 0 !== a.autoHide ? a.autoHide : !0;
      this.u = void 0;
      this.l && this.element.classList.add("ol-hidden");
    }
    u(id, ad);
    id.prototype.A = function(a) {
      a.preventDefault();
      if (this.j)
        this.j();
      else if (a = this.a.$()) {
        var b = a.Va();
        void 0 !== b && (0 < this.o ? (b %= 2 * Math.PI, a.animate({
          rotation: 0,
          duration: this.o,
          easing: fd
        })) : a.He(0));
      }
    };
    function jd(a) {
      if (a = a.frameState) {
        a = a.viewState.rotation;
        if (a != this.u) {
          var b = "rotate(" + a + "rad)";
          if (this.l) {
            var c = this.element.classList.contains("ol-hidden");
            c || a ? c && a && this.element.classList.remove("ol-hidden") : this.element.classList.add("ol-hidden");
          }
          this.c.style.msTransform = b;
          this.c.style.webkitTransform = b;
          this.c.style.transform = b;
        }
        this.u = a;
      }
    }
    ;
    function kd(a) {
      a = a ? a : {};
      var b = void 0 !== a.className ? a.className : "ol-zoom",
          c = void 0 !== a.delta ? a.delta : 1,
          d = void 0 !== a.zoomInLabel ? a.zoomInLabel : "+",
          e = void 0 !== a.zoomOutLabel ? a.zoomOutLabel : "\u2212",
          f = void 0 !== a.zoomInTipLabel ? a.zoomInTipLabel : "Zoom in",
          g = void 0 !== a.zoomOutTipLabel ? a.zoomOutTipLabel : "Zoom out",
          h = document.createElement("button");
      h.className = b + "-in";
      h.setAttribute("type", "button");
      h.title = f;
      h.appendChild("string" === typeof d ? document.createTextNode(d) : d);
      B(h, "click", kd.prototype.l.bind(this, c));
      d = document.createElement("button");
      d.className = b + "-out";
      d.setAttribute("type", "button");
      d.title = g;
      d.appendChild("string" === typeof e ? document.createTextNode(e) : e);
      B(d, "click", kd.prototype.l.bind(this, -c));
      c = document.createElement("div");
      c.className = b + " ol-unselectable ol-control";
      c.appendChild(h);
      c.appendChild(d);
      ad.call(this, {
        element: c,
        target: a.target
      });
      this.c = void 0 !== a.duration ? a.duration : 250;
    }
    u(kd, ad);
    kd.prototype.l = function(a, b) {
      b.preventDefault();
      var c = this.a.$();
      if (c) {
        var d = c.Ua();
        d && (d = c.constrainResolution(d, a), 0 < this.c ? (0 < ld(c)[0] && md(c), c.animate({
          resolution: d,
          duration: this.c,
          easing: fd
        })) : c.Xc(d));
      }
    };
    function nd(a) {
      a = a ? a : {};
      var b = new D;
      (void 0 !== a.zoom ? a.zoom : 1) && b.push(new kd(a.zoomOptions));
      (void 0 !== a.rotate ? a.rotate : 1) && b.push(new id(a.rotateOptions));
      (void 0 !== a.attribution ? a.attribution : 1) && b.push(new bd(a.attributionOptions));
      return b;
    }
    ;
    function od(a) {
      a = a ? a : {};
      this.c = void 0 !== a.className ? a.className : "ol-full-screen";
      var b = void 0 !== a.label ? a.label : "\u2922";
      this.j = "string" === typeof b ? document.createTextNode(b) : b;
      b = void 0 !== a.labelActive ? a.labelActive : "\u00d7";
      this.o = "string" === typeof b ? document.createTextNode(b) : b;
      var c = a.tipLabel ? a.tipLabel : "Toggle full-screen",
          b = document.createElement("button");
      b.className = this.c + "-" + pd();
      b.setAttribute("type", "button");
      b.title = c;
      b.appendChild(this.j);
      B(b, "click", this.C, this);
      c = document.createElement("div");
      c.className = this.c + " ol-unselectable ol-control " + (qd() ? "" : "ol-unsupported");
      c.appendChild(b);
      ad.call(this, {
        element: c,
        target: a.target
      });
      this.A = void 0 !== a.keys ? a.keys : !1;
      this.l = a.source;
    }
    u(od, ad);
    od.prototype.C = function(a) {
      a.preventDefault();
      qd() && (a = this.a) && (pd() ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : (a = this.l ? "string" === typeof this.l ? document.getElementById(this.l) : this.l : a.Kc(), this.A ? a.mozRequestFullScreenWithKeys ? a.mozRequestFullScreenWithKeys() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : rd(a) : rd(a)));
    };
    od.prototype.u = function() {
      var a = this.element.firstElementChild,
          b = this.a;
      pd() ? (a.className = this.c + "-true", Yc(this.o, this.j)) : (a.className = this.c + "-false", Yc(this.j, this.o));
      b && b.xd();
    };
    od.prototype.setMap = function(a) {
      ad.prototype.setMap.call(this, a);
      a && this.v.push(B(document, sd(), this.u, this));
    };
    function qd() {
      var a = document.body;
      return !!(a.webkitRequestFullscreen || a.mozRequestFullScreen && document.mozFullScreenEnabled || a.msRequestFullscreen && document.msFullscreenEnabled || a.requestFullscreen && document.fullscreenEnabled);
    }
    function pd() {
      return !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }
    function rd(a) {
      a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen();
    }
    var sd = function() {
      var a;
      return function() {
        if (!a) {
          var b = document.body;
          b.webkitRequestFullscreen ? a = "webkitfullscreenchange" : b.mozRequestFullScreen ? a = "mozfullscreenchange" : b.msRequestFullscreen ? a = "MSFullscreenChange" : b.requestFullscreen && (a = "fullscreenchange");
        }
        return a;
      };
    }();
    function td(a) {
      a = a ? a : {};
      var b = document.createElement("DIV");
      b.className = void 0 !== a.className ? a.className : "ol-mouse-position";
      ad.call(this, {
        element: b,
        render: a.render ? a.render : ud,
        target: a.target
      });
      B(this, Ic(vd), this.Bm, this);
      a.coordinateFormat && this.Fi(a.coordinateFormat);
      a.projection && this.Mh(Gb(a.projection));
      this.u = void 0 !== a.undefinedHTML ? a.undefinedHTML : "";
      this.o = b.innerHTML;
      this.j = this.l = this.c = null;
    }
    u(td, ad);
    function ud(a) {
      a = a.frameState;
      a ? this.c != a.viewState.projection && (this.c = a.viewState.projection, this.l = null) : this.c = null;
      wd(this, this.j);
    }
    k = td.prototype;
    k.Bm = function() {
      this.l = null;
    };
    k.ih = function() {
      return this.get(xd);
    };
    k.Lh = function() {
      return this.get(vd);
    };
    k.rl = function(a) {
      this.j = this.a.te(a);
      wd(this, this.j);
    };
    k.sl = function() {
      wd(this, null);
      this.j = null;
    };
    k.setMap = function(a) {
      ad.prototype.setMap.call(this, a);
      a && (a = a.c, this.v.push(B(a, "mousemove", this.rl, this), B(a, "mouseout", this.sl, this)));
    };
    k.Fi = function(a) {
      this.set(xd, a);
    };
    k.Mh = function(a) {
      this.set(vd, a);
    };
    function wd(a, b) {
      var c = a.u;
      if (b && a.c) {
        if (!a.l) {
          var d = a.Lh();
          a.l = d ? Fb(a.c, d) : Vb;
        }
        if (d = a.a.Za(b))
          a.l(d, d), c = (c = a.ih()) ? c(d) : d.toString();
      }
      a.o && c == a.o || (a.element.innerHTML = c, a.o = c);
    }
    var vd = "projection",
        xd = "coordinateFormat";
    function yd(a, b, c) {
      Bc.call(this, a);
      this.map = b;
      this.frameState = void 0 !== c ? c : null;
    }
    u(yd, Bc);
    function zd(a, b, c, d, e) {
      yd.call(this, a, b, e);
      this.originalEvent = c;
      this.pixel = b.te(c);
      this.coordinate = b.Za(this.pixel);
      this.dragging = void 0 !== d ? d : !1;
    }
    u(zd, yd);
    zd.prototype.preventDefault = function() {
      yd.prototype.preventDefault.call(this);
      this.originalEvent.preventDefault();
    };
    zd.prototype.stopPropagation = function() {
      yd.prototype.stopPropagation.call(this);
      this.originalEvent.stopPropagation();
    };
    var Ad = {
      Xp: "singleclick",
      Mp: "click",
      Np: "dblclick",
      Qp: "pointerdrag",
      Tp: "pointermove",
      Pp: "pointerdown",
      Wp: "pointerup",
      Vp: "pointerover",
      Up: "pointerout",
      Rp: "pointerenter",
      Sp: "pointerleave",
      Op: "pointercancel"
    };
    function Bd(a, b, c, d, e) {
      zd.call(this, a, b, c.b, d, e);
      this.b = c;
    }
    u(Bd, zd);
    var Cd = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
    function Dd(a, b) {
      var c,
          d,
          e = Cd.length;
      for (d = 0; d < e; ++d)
        try {
          if (c = a.getContext(Cd[d], b))
            return c;
        } catch (f) {}
      return null;
    }
    ;
    var Ed,
        Fd = "undefined" !== typeof navigator ? navigator.userAgent.toLowerCase() : "",
        Gd = -1 !== Fd.indexOf("firefox"),
        Hd = -1 !== Fd.indexOf("safari") && -1 == Fd.indexOf("chrom"),
        Id = -1 !== Fd.indexOf("webkit") && -1 == Fd.indexOf("edge"),
        Jd = -1 !== Fd.indexOf("macintosh"),
        Kd = window.devicePixelRatio || 1,
        Ld = !1,
        Md = function() {
          if (!("HTMLCanvasElement" in window))
            return !1;
          try {
            var a = document.createElement("CANVAS").getContext("2d");
            return a ? (void 0 !== a.setLineDash && (Ld = !0), !0) : !1;
          } catch (b) {
            return !1;
          }
        }(),
        Nd = "DeviceOrientationEvent" in window,
        Od = "geolocation" in navigator,
        Pd = "ontouchstart" in window,
        Qd = "PointerEvent" in window,
        Rd = !!navigator.msPointerEnabled,
        Sd = !1,
        Td,
        Ud = [];
    if ("WebGLRenderingContext" in window)
      try {
        var Vd = Dd(document.createElement("CANVAS"), {failIfMajorPerformanceCaveat: !0});
        Vd && (Sd = !0, Td = Vd.getParameter(Vd.MAX_TEXTURE_SIZE), Ud = Vd.getSupportedExtensions());
      } catch (a) {}
    Ed = Sd;
    ca = Ud;
    ba = Td;
    function Wd(a, b) {
      this.b = a;
      this.i = b;
    }
    ;
    function Xd(a) {
      Wd.call(this, a, {
        mousedown: this.Ml,
        mousemove: this.Nl,
        mouseup: this.Ql,
        mouseover: this.Pl,
        mouseout: this.Ol
      });
      this.a = a.f;
      this.f = [];
    }
    u(Xd, Wd);
    function Yd(a, b) {
      for (var c = a.f,
          d = b.clientX,
          e = b.clientY,
          f = 0,
          g = c.length,
          h; f < g && (h = c[f]); f++) {
        var l = Math.abs(e - h[1]);
        if (25 >= Math.abs(d - h[0]) && 25 >= l)
          return !0;
      }
      return !1;
    }
    function Zd(a) {
      var b = ae(a, a),
          c = b.preventDefault;
      b.preventDefault = function() {
        a.preventDefault();
        c();
      };
      b.pointerId = 1;
      b.isPrimary = !0;
      b.pointerType = "mouse";
      return b;
    }
    k = Xd.prototype;
    k.Ml = function(a) {
      if (!Yd(this, a)) {
        (1).toString() in this.a && this.cancel(a);
        var b = Zd(a);
        this.a[(1).toString()] = a;
        be(this.b, "pointerdown", b, a);
      }
    };
    k.Nl = function(a) {
      if (!Yd(this, a)) {
        var b = Zd(a);
        be(this.b, "pointermove", b, a);
      }
    };
    k.Ql = function(a) {
      if (!Yd(this, a)) {
        var b = this.a[(1).toString()];
        b && b.button === a.button && (b = Zd(a), be(this.b, "pointerup", b, a), delete this.a[(1).toString()]);
      }
    };
    k.Pl = function(a) {
      if (!Yd(this, a)) {
        var b = Zd(a);
        ce(this.b, b, a);
      }
    };
    k.Ol = function(a) {
      if (!Yd(this, a)) {
        var b = Zd(a);
        de(this.b, b, a);
      }
    };
    k.cancel = function(a) {
      var b = Zd(a);
      this.b.cancel(b, a);
      delete this.a[(1).toString()];
    };
    function ee(a) {
      Wd.call(this, a, {
        MSPointerDown: this.Vl,
        MSPointerMove: this.Wl,
        MSPointerUp: this.Zl,
        MSPointerOut: this.Xl,
        MSPointerOver: this.Yl,
        MSPointerCancel: this.Ul,
        MSGotPointerCapture: this.Sl,
        MSLostPointerCapture: this.Tl
      });
      this.a = a.f;
      this.f = ["", "unavailable", "touch", "pen", "mouse"];
    }
    u(ee, Wd);
    function fe(a, b) {
      var c = b;
      "number" === typeof b.pointerType && (c = ae(b, b), c.pointerType = a.f[b.pointerType]);
      return c;
    }
    k = ee.prototype;
    k.Vl = function(a) {
      this.a[a.pointerId.toString()] = a;
      var b = fe(this, a);
      be(this.b, "pointerdown", b, a);
    };
    k.Wl = function(a) {
      var b = fe(this, a);
      be(this.b, "pointermove", b, a);
    };
    k.Zl = function(a) {
      var b = fe(this, a);
      be(this.b, "pointerup", b, a);
      delete this.a[a.pointerId.toString()];
    };
    k.Xl = function(a) {
      var b = fe(this, a);
      de(this.b, b, a);
    };
    k.Yl = function(a) {
      var b = fe(this, a);
      ce(this.b, b, a);
    };
    k.Ul = function(a) {
      var b = fe(this, a);
      this.b.cancel(b, a);
      delete this.a[a.pointerId.toString()];
    };
    k.Tl = function(a) {
      this.b.b(new ge("lostpointercapture", a, a));
    };
    k.Sl = function(a) {
      this.b.b(new ge("gotpointercapture", a, a));
    };
    function he(a) {
      Wd.call(this, a, {
        pointerdown: this.xo,
        pointermove: this.yo,
        pointerup: this.Bo,
        pointerout: this.zo,
        pointerover: this.Ao,
        pointercancel: this.wo,
        gotpointercapture: this.al,
        lostpointercapture: this.Ll
      });
    }
    u(he, Wd);
    k = he.prototype;
    k.xo = function(a) {
      ie(this.b, a);
    };
    k.yo = function(a) {
      ie(this.b, a);
    };
    k.Bo = function(a) {
      ie(this.b, a);
    };
    k.zo = function(a) {
      ie(this.b, a);
    };
    k.Ao = function(a) {
      ie(this.b, a);
    };
    k.wo = function(a) {
      ie(this.b, a);
    };
    k.Ll = function(a) {
      ie(this.b, a);
    };
    k.al = function(a) {
      ie(this.b, a);
    };
    function ge(a, b, c) {
      Bc.call(this, a);
      this.b = b;
      a = c ? c : {};
      this.buttons = je(a);
      this.pressure = ke(a, this.buttons);
      this.bubbles = "bubbles" in a ? a.bubbles : !1;
      this.cancelable = "cancelable" in a ? a.cancelable : !1;
      this.view = "view" in a ? a.view : null;
      this.detail = "detail" in a ? a.detail : null;
      this.screenX = "screenX" in a ? a.screenX : 0;
      this.screenY = "screenY" in a ? a.screenY : 0;
      this.clientX = "clientX" in a ? a.clientX : 0;
      this.clientY = "clientY" in a ? a.clientY : 0;
      this.button = "button" in a ? a.button : 0;
      this.relatedTarget = "relatedTarget" in a ? a.relatedTarget : null;
      this.pointerId = "pointerId" in a ? a.pointerId : 0;
      this.width = "width" in a ? a.width : 0;
      this.height = "height" in a ? a.height : 0;
      this.pointerType = "pointerType" in a ? a.pointerType : "";
      this.isPrimary = "isPrimary" in a ? a.isPrimary : !1;
      b.preventDefault && (this.preventDefault = function() {
        b.preventDefault();
      });
    }
    u(ge, Bc);
    function je(a) {
      if (a.buttons || le)
        a = a.buttons;
      else
        switch (a.which) {
          case 1:
            a = 1;
            break;
          case 2:
            a = 4;
            break;
          case 3:
            a = 2;
            break;
          default:
            a = 0;
        }
      return a;
    }
    function ke(a, b) {
      var c = 0;
      a.pressure ? c = a.pressure : c = b ? .5 : 0;
      return c;
    }
    var le = !1;
    try {
      le = 1 === (new MouseEvent("click", {buttons: 1})).buttons;
    } catch (a) {}
    ;
    function me(a, b) {
      Wd.call(this, a, {
        touchstart: this.Dp,
        touchmove: this.Cp,
        touchend: this.Bp,
        touchcancel: this.Ap
      });
      this.a = a.f;
      this.l = b;
      this.f = void 0;
      this.g = 0;
      this.c = void 0;
    }
    u(me, Wd);
    k = me.prototype;
    k.Di = function() {
      this.g = 0;
      this.c = void 0;
    };
    function ne(a, b, c) {
      b = ae(b, c);
      b.pointerId = c.identifier + 2;
      b.bubbles = !0;
      b.cancelable = !0;
      b.detail = a.g;
      b.button = 0;
      b.buttons = 1;
      b.width = c.webkitRadiusX || c.radiusX || 0;
      b.height = c.webkitRadiusY || c.radiusY || 0;
      b.pressure = c.webkitForce || c.force || .5;
      b.isPrimary = a.f === c.identifier;
      b.pointerType = "touch";
      b.clientX = c.clientX;
      b.clientY = c.clientY;
      b.screenX = c.screenX;
      b.screenY = c.screenY;
      return b;
    }
    function oe(a, b, c) {
      function d() {
        b.preventDefault();
      }
      var e = Array.prototype.slice.call(b.changedTouches),
          f = e.length,
          g,
          h;
      for (g = 0; g < f; ++g)
        h = ne(a, b, e[g]), h.preventDefault = d, c.call(a, b, h);
    }
    k.Dp = function(a) {
      var b = a.touches,
          c = Object.keys(this.a),
          d = c.length;
      if (d >= b.length) {
        var e = [],
            f,
            g,
            h;
        for (f = 0; f < d; ++f) {
          g = c[f];
          h = this.a[g];
          var l;
          if (!(l = 1 == g))
            a: {
              for (var m = b.length,
                  p = 0; p < m; p++)
                if (l = b[p], l.identifier === g - 2) {
                  l = !0;
                  break a;
                }
              l = !1;
            }
          l || e.push(h.out);
        }
        for (f = 0; f < e.length; ++f)
          this.zf(a, e[f]);
      }
      b = a.changedTouches[0];
      c = Object.keys(this.a).length;
      if (!c || 1 === c && (1).toString() in this.a)
        this.f = b.identifier, void 0 !== this.c && clearTimeout(this.c);
      pe(this, a);
      this.g++;
      oe(this, a, this.so);
    };
    k.so = function(a, b) {
      this.a[b.pointerId] = {
        target: b.target,
        out: b,
        pi: b.target
      };
      var c = this.b;
      b.bubbles = !0;
      be(c, "pointerover", b, a);
      c = this.b;
      b.bubbles = !1;
      be(c, "pointerenter", b, a);
      be(this.b, "pointerdown", b, a);
    };
    k.Cp = function(a) {
      a.preventDefault();
      oe(this, a, this.Rl);
    };
    k.Rl = function(a, b) {
      var c = this.a[b.pointerId];
      if (c) {
        var d = c.out,
            e = c.pi;
        be(this.b, "pointermove", b, a);
        d && e !== b.target && (d.relatedTarget = b.target, b.relatedTarget = e, d.target = e, b.target ? (de(this.b, d, a), ce(this.b, b, a)) : (b.target = e, b.relatedTarget = null, this.zf(a, b)));
        c.out = b;
        c.pi = b.target;
      }
    };
    k.Bp = function(a) {
      pe(this, a);
      oe(this, a, this.Ep);
    };
    k.Ep = function(a, b) {
      be(this.b, "pointerup", b, a);
      this.b.out(b, a);
      qe(this.b, b, a);
      delete this.a[b.pointerId];
      b.isPrimary && (this.f = void 0, this.c = setTimeout(this.Di.bind(this), 200));
    };
    k.Ap = function(a) {
      oe(this, a, this.zf);
    };
    k.zf = function(a, b) {
      this.b.cancel(b, a);
      this.b.out(b, a);
      qe(this.b, b, a);
      delete this.a[b.pointerId];
      b.isPrimary && (this.f = void 0, this.c = setTimeout(this.Di.bind(this), 200));
    };
    function pe(a, b) {
      var c = a.l.f,
          d = b.changedTouches[0];
      if (a.f === d.identifier) {
        var e = [d.clientX, d.clientY];
        c.push(e);
        setTimeout(function() {
          var a = c.indexOf(e);
          -1 < a && c.splice(a, 1);
        }, 2500);
      }
    }
    ;
    function re(a) {
      Dc.call(this);
      this.g = a;
      this.f = {};
      this.i = {};
      this.a = [];
      Qd ? se(this, new he(this)) : Rd ? se(this, new ee(this)) : (a = new Xd(this), se(this, a), Pd && se(this, new me(this, a)));
      a = this.a.length;
      for (var b,
          c = 0; c < a; c++)
        b = this.a[c], te(this, Object.keys(b.i));
    }
    u(re, Dc);
    function se(a, b) {
      var c = Object.keys(b.i);
      c && (c.forEach(function(a) {
        var c = b.i[a];
        c && (this.i[a] = c.bind(b));
      }, a), a.a.push(b));
    }
    re.prototype.c = function(a) {
      var b = this.i[a.type];
      b && b(a);
    };
    function te(a, b) {
      b.forEach(function(a) {
        B(this.g, a, this.c, this);
      }, a);
    }
    function ve(a, b) {
      b.forEach(function(a) {
        xc(this.g, a, this.c, this);
      }, a);
    }
    function ae(a, b) {
      for (var c = {},
          d,
          e = 0,
          f = we.length; e < f; e++)
        d = we[e][0], c[d] = a[d] || b[d] || we[e][1];
      return c;
    }
    function qe(a, b, c) {
      b.bubbles = !1;
      be(a, "pointerleave", b, c);
    }
    re.prototype.out = function(a, b) {
      a.bubbles = !0;
      be(this, "pointerout", a, b);
    };
    re.prototype.cancel = function(a, b) {
      be(this, "pointercancel", a, b);
    };
    function de(a, b, c) {
      a.out(b, c);
      var d = b.target,
          e = b.relatedTarget;
      d && e && d.contains(e) || qe(a, b, c);
    }
    function ce(a, b, c) {
      b.bubbles = !0;
      be(a, "pointerover", b, c);
      var d = b.target,
          e = b.relatedTarget;
      d && e && d.contains(e) || (b.bubbles = !1, be(a, "pointerenter", b, c));
    }
    function be(a, b, c, d) {
      a.b(new ge(b, d, c));
    }
    function ie(a, b) {
      a.b(new ge(b.type, b, b));
    }
    re.prototype.ra = function() {
      for (var a = this.a.length,
          b,
          c = 0; c < a; c++)
        b = this.a[c], ve(this, Object.keys(b.i));
      Dc.prototype.ra.call(this);
    };
    var we = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]];
    function xe(a) {
      Dc.call(this);
      this.c = a;
      this.l = 0;
      this.j = !1;
      this.i = [];
      this.f = null;
      a = this.c.c;
      this.u = 0;
      this.I = {};
      this.g = new re(a);
      this.a = null;
      this.o = B(this.g, "pointerdown", this.ul, this);
      this.v = B(this.g, "pointermove", this.$o, this);
    }
    u(xe, Dc);
    function ye(a, b) {
      var c = new Bd("click", a.c, b);
      a.b(c);
      a.l ? (clearTimeout(a.l), a.l = 0, c = new Bd("dblclick", a.c, b), a.b(c)) : a.l = setTimeout(function() {
        this.l = 0;
        var a = new Bd("singleclick", this.c, b);
        this.b(a);
      }.bind(a), 250);
    }
    function ze(a, b) {
      "pointerup" == b.type || "pointercancel" == b.type ? delete a.I[b.pointerId] : "pointerdown" == b.type && (a.I[b.pointerId] = !0);
      a.u = Object.keys(a.I).length;
    }
    k = xe.prototype;
    k.vh = function(a) {
      ze(this, a);
      var b = new Bd("pointerup", this.c, a);
      this.b(b);
      this.j || a.button || ye(this, this.f);
      this.u || (this.i.forEach(rc), this.i.length = 0, this.j = !1, this.f = null, Ac(this.a), this.a = null);
    };
    k.ul = function(a) {
      ze(this, a);
      var b = new Bd("pointerdown", this.c, a);
      this.b(b);
      this.f = a;
      this.i.length || (this.a = new re(document), this.i.push(B(this.a, "pointermove", this.om, this), B(this.a, "pointerup", this.vh, this), B(this.g, "pointercancel", this.vh, this)));
    };
    k.om = function(a) {
      if (a.clientX != this.f.clientX || a.clientY != this.f.clientY) {
        this.j = !0;
        var b = new Bd("pointerdrag", this.c, a, this.j);
        this.b(b);
      }
      a.preventDefault();
    };
    k.$o = function(a) {
      this.b(new Bd(a.type, this.c, a, !(!this.f || a.clientX == this.f.clientX && a.clientY == this.f.clientY)));
    };
    k.ra = function() {
      this.v && (rc(this.v), this.v = null);
      this.o && (rc(this.o), this.o = null);
      this.i.forEach(rc);
      this.i.length = 0;
      this.a && (Ac(this.a), this.a = null);
      this.g && (Ac(this.g), this.g = null);
      Dc.prototype.ra.call(this);
    };
    function Ae(a, b) {
      this.o = a;
      this.c = b;
      this.b = [];
      this.f = [];
      this.a = {};
    }
    Ae.prototype.clear = function() {
      this.b.length = 0;
      this.f.length = 0;
      qb(this.a);
    };
    function Be(a) {
      var b = a.b,
          c = a.f,
          d = b[0];
      1 == b.length ? (b.length = 0, c.length = 0) : (b[0] = b.pop(), c[0] = c.pop(), Ce(a, 0));
      b = a.c(d);
      delete a.a[b];
      return d;
    }
    Ae.prototype.i = function(a) {
      qa(!(this.c(a) in this.a), 31);
      var b = this.o(a);
      return Infinity != b ? (this.b.push(a), this.f.push(b), this.a[this.c(a)] = !0, De(this, 0, this.b.length - 1), !0) : !1;
    };
    function Ce(a, b) {
      for (var c = a.b,
          d = a.f,
          e = c.length,
          f = c[b],
          g = d[b],
          h = b; b < e >> 1; ) {
        var l = 2 * b + 1,
            m = 2 * b + 2,
            l = m < e && d[m] < d[l] ? m : l;
        c[b] = c[l];
        d[b] = d[l];
        b = l;
      }
      c[b] = f;
      d[b] = g;
      De(a, h, b);
    }
    function De(a, b, c) {
      var d = a.b;
      a = a.f;
      for (var e = d[c],
          f = a[c]; c > b; ) {
        var g = c - 1 >> 1;
        if (a[g] > f)
          d[c] = d[g], a[c] = a[g], c = g;
        else
          break;
      }
      d[c] = e;
      a[c] = f;
    }
    function Ee(a) {
      var b = a.o,
          c = a.b,
          d = a.f,
          e = 0,
          f = c.length,
          g,
          h,
          l;
      for (h = 0; h < f; ++h)
        g = c[h], l = b(g), Infinity == l ? delete a.a[a.c(g)] : (d[e] = l, c[e++] = g);
      c.length = e;
      d.length = e;
      for (b = (a.b.length >> 1) - 1; 0 <= b; b--)
        Ce(a, b);
    }
    ;
    function Fe(a, b) {
      Ae.call(this, function(b) {
        return a.apply(null, b);
      }, function(a) {
        return a[0].ib();
      });
      this.v = b;
      this.l = 0;
      this.g = {};
    }
    u(Fe, Ae);
    Fe.prototype.i = function(a) {
      var b = Ae.prototype.i.call(this, a);
      b && B(a[0], "change", this.j, this);
      return b;
    };
    Fe.prototype.j = function(a) {
      a = a.target;
      var b = a.V();
      if (2 === b || 3 === b || 4 === b || 5 === b)
        xc(a, "change", this.j, this), a = a.ib(), a in this.g && (delete this.g[a], --this.l), this.v();
    };
    function Ge(a, b, c) {
      for (var d = 0,
          e,
          f; a.l < b && d < c && 0 < a.b.length; )
        e = Be(a)[0], f = e.ib(), 0 !== e.V() || f in a.g || (a.g[f] = !0, ++a.l, ++d, e.load());
    }
    ;
    function He(a) {
      return function(b, c, d) {
        if (void 0 !== b)
          return b = fa(a, b, d), b = wa(b + c, 0, a.length - 1), c = Math.floor(b), b != c && c < a.length - 1 ? a[c] / Math.pow(a[c] / a[c + 1], b - c) : a[c];
      };
    }
    function Ie(a, b, c) {
      return function(d, e, f) {
        if (void 0 !== d)
          return d = Math.max(Math.floor(Math.log(b / d) / Math.log(a) + (-f / 2 + .5)) + e, 0), void 0 !== c && (d = Math.min(d, c)), b / Math.pow(a, d);
      };
    }
    ;
    function Ke(a) {
      if (void 0 !== a)
        return 0;
    }
    function Le(a, b) {
      if (void 0 !== a)
        return a + b;
    }
    function Me(a) {
      var b = 2 * Math.PI / a;
      return function(a, d) {
        if (void 0 !== a)
          return a = Math.floor((a + d) / b + .5) * b;
      };
    }
    function Ne() {
      var a = Ba(5);
      return function(b, c) {
        if (void 0 !== b)
          return Math.abs(b + c) <= a ? 0 : b + c;
      };
    }
    ;
    function Oe(a, b) {
      var c = void 0 !== b ? a.toFixed(b) : "" + a,
          d = c.indexOf("."),
          d = -1 === d ? c.length : d;
      return 2 < d ? c : Array(3 - d).join("0") + c;
    }
    function Pe(a) {
      a = ("" + a).split(".");
      for (var b = ["1", "3"],
          c = 0; c < Math.max(a.length, b.length); c++) {
        var d = parseInt(a[c] || "0", 10),
            e = parseInt(b[c] || "0", 10);
        if (d > e)
          return 1;
        if (e > d)
          return -1;
      }
      return 0;
    }
    ;
    function Qe(a, b) {
      a[0] += b[0];
      a[1] += b[1];
      return a;
    }
    function Re(a, b) {
      var c = a[0],
          d = a[1],
          e = b[0],
          f = b[1],
          g = e[0],
          e = e[1],
          h = f[0],
          f = f[1],
          l = h - g,
          m = f - e,
          c = l || m ? (l * (c - g) + m * (d - e)) / (l * l + m * m || 0) : 0;
      0 >= c || (1 <= c ? (g = h, e = f) : (g += c * l, e += c * m));
      return [g, e];
    }
    function Se(a, b, c) {
      a = Ca(a + 180, 360) - 180;
      var d = Math.abs(3600 * a);
      c = c || 0;
      var e = Math.pow(10, c),
          f = Math.floor(d / 3600),
          g = Math.floor((d - 3600 * f) / 60),
          d = Math.ceil((d - 3600 * f - 60 * g) * e) / e;
      60 <= d && (d = 0, g += 1);
      60 <= g && (g = 0, f += 1);
      return f + "\u00b0 " + Oe(g) + "\u2032 " + Oe(d, c) + "\u2033 " + b.charAt(0 > a ? 1 : 0);
    }
    function Te(a, b, c) {
      return a ? b.replace("{x}", a[0].toFixed(c)).replace("{y}", a[1].toFixed(c)) : "";
    }
    function Ue(a, b) {
      for (var c = !0,
          d = a.length - 1; 0 <= d; --d)
        if (a[d] != b[d]) {
          c = !1;
          break;
        }
      return c;
    }
    function Ve(a, b) {
      var c = Math.cos(b),
          d = Math.sin(b),
          e = a[1] * c + a[0] * d;
      a[0] = a[0] * c - a[1] * d;
      a[1] = e;
      return a;
    }
    function We(a, b) {
      a[0] *= b;
      a[1] *= b;
    }
    function Xe(a, b) {
      var c = a[0] - b[0],
          d = a[1] - b[1];
      return c * c + d * d;
    }
    function Ye(a, b) {
      return Math.sqrt(Xe(a, b));
    }
    function Ze(a, b) {
      return Xe(a, Re(a, b));
    }
    function $e(a, b) {
      return Te(a, "{x}, {y}", b);
    }
    ;
    function af() {
      return !0;
    }
    function bf() {
      return !1;
    }
    ;
    function cf() {
      Gc.call(this);
      this.o = Ia();
      this.v = -1;
      this.i = {};
      this.j = this.g = 0;
    }
    u(cf, Gc);
    k = cf.prototype;
    k.Ab = function(a, b) {
      var c = b ? b : [NaN, NaN];
      this.Gb(a[0], a[1], c, Infinity);
      return c;
    };
    k.sb = function(a) {
      return this.Oc(a[0], a[1]);
    };
    k.Oc = bf;
    k.D = function(a) {
      this.v != this.f && (this.o = this.ne(this.o), this.v = this.f);
      var b = this.o;
      a ? (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3]) : a = b;
      return a;
    };
    k.Pb = function(a) {
      return this.Qd(a * a);
    };
    k.tb = function(a, b) {
      this.Dc(Ub(a, b));
      return this;
    };
    function df(a, b, c, d, e, f) {
      for (var g = f ? f : [],
          h = 0; b < c; b += d) {
        var l = a[b],
            m = a[b + 1];
        g[h++] = e[0] * l + e[2] * m + e[4];
        g[h++] = e[1] * l + e[3] * m + e[5];
      }
      f && g.length != h && (g.length = h);
      return g;
    }
    function ef(a, b, c, d, e, f) {
      var g = f ? f : [],
          h = 0,
          l,
          m;
      for (l = 0; l < b; l += c)
        for (g[h++] = a[l] + d, g[h++] = a[l + 1] + e, m = l + 2; m < l + c; ++m)
          g[h++] = a[m];
      f && g.length != h && (g.length = h);
      return g;
    }
    ;
    function ff() {
      cf.call(this);
      this.ka = "XY";
      this.a = 2;
      this.B = null;
    }
    u(ff, cf);
    function gf(a) {
      var b;
      "XY" == a ? b = 2 : "XYZ" == a || "XYM" == a ? b = 3 : "XYZM" == a && (b = 4);
      return b;
    }
    k = ff.prototype;
    k.Oc = bf;
    k.ne = function(a) {
      return Xa(this.B, 0, this.B.length, this.a, a);
    };
    k.bc = function() {
      return this.B.slice(0, this.a);
    };
    k.ha = function() {
      return this.B;
    };
    k.cc = function() {
      return this.B.slice(this.B.length - this.a);
    };
    k.dc = function() {
      return this.ka;
    };
    k.Qd = function(a) {
      this.j != this.f && (qb(this.i), this.g = 0, this.j = this.f);
      if (0 > a || this.g && a <= this.g)
        return this;
      var b = a.toString();
      if (this.i.hasOwnProperty(b))
        return this.i[b];
      var c = this.kd(a);
      if (c.ha().length < this.B.length)
        return this.i[b] = c;
      this.g = a;
      return this;
    };
    k.kd = function() {
      return this;
    };
    k.sa = function() {
      return this.a;
    };
    function hf(a, b, c) {
      a.a = gf(b);
      a.ka = b;
      a.B = c;
    }
    function jf(a, b, c, d) {
      if (b)
        c = gf(b);
      else {
        for (b = 0; b < d; ++b)
          if (c.length)
            c = c[0];
          else {
            a.ka = "XY";
            a.a = 2;
            return;
          }
        c = c.length;
        var e;
        2 == c ? e = "XY" : 3 == c ? e = "XYZ" : 4 == c && (e = "XYZM");
        b = e;
      }
      a.ka = b;
      a.a = c;
    }
    k.Dc = function(a) {
      this.B && (a(this.B, this.B, this.a), this.s());
    };
    k.rotate = function(a, b) {
      var c = this.ha();
      if (c) {
        for (var d = c.length,
            e = this.sa(),
            f = c ? c : [],
            g = Math.cos(a),
            h = Math.sin(a),
            l = b[0],
            m = b[1],
            p = 0,
            n = 0; n < d; n += e) {
          var q = c[n] - l,
              r = c[n + 1] - m;
          f[p++] = l + q * g - r * h;
          f[p++] = m + q * h + r * g;
          for (q = n + 2; q < n + e; ++q)
            f[p++] = c[q];
        }
        c && f.length != p && (f.length = p);
        this.s();
      }
    };
    k.scale = function(a, b, c) {
      var d = b;
      void 0 === d && (d = a);
      var e = c;
      e || (e = jb(this.D()));
      if (c = this.ha()) {
        b = c.length;
        for (var f = this.sa(),
            g = c ? c : [],
            h = e[0],
            e = e[1],
            l = 0,
            m = 0; m < b; m += f) {
          var p = c[m] - h,
              n = c[m + 1] - e;
          g[l++] = h + a * p;
          g[l++] = e + d * n;
          for (p = m + 2; p < m + f; ++p)
            g[l++] = c[p];
        }
        c && g.length != l && (g.length = l);
        this.s();
      }
    };
    k.translate = function(a, b) {
      var c = this.ha();
      c && (ef(c, c.length, this.sa(), a, b, c), this.s());
    };
    function kf(a, b, c, d) {
      for (var e = 0,
          f = a[c - d],
          g = a[c - d + 1]; b < c; b += d)
        var h = a[b],
            l = a[b + 1],
            e = e + (g * h - f * l),
            f = h,
            g = l;
      return e / 2;
    }
    function lf(a, b, c, d) {
      var e = 0,
          f,
          g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var h = c[f],
            e = e + kf(a, b, h, d);
        b = h;
      }
      return e;
    }
    ;
    function mf(a, b, c, d, e, f, g) {
      var h = a[b],
          l = a[b + 1],
          m = a[c] - h,
          p = a[c + 1] - l;
      if (m || p)
        if (f = ((e - h) * m + (f - l) * p) / (m * m + p * p), 1 < f)
          b = c;
        else if (0 < f) {
          for (e = 0; e < d; ++e)
            g[e] = Da(a[b + e], a[c + e], f);
          g.length = d;
          return;
        }
      for (e = 0; e < d; ++e)
        g[e] = a[b + e];
      g.length = d;
    }
    function nf(a, b, c, d, e) {
      var f = a[b],
          g = a[b + 1];
      for (b += d; b < c; b += d) {
        var h = a[b],
            l = a[b + 1],
            f = Aa(f, g, h, l);
        f > e && (e = f);
        f = h;
        g = l;
      }
      return e;
    }
    function of(a, b, c, d, e) {
      var f,
          g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var h = c[f];
        e = nf(a, b, h, d, e);
        b = h;
      }
      return e;
    }
    function pf(a, b, c, d, e, f, g, h, l, m, p) {
      if (b == c)
        return m;
      var n;
      if (!e) {
        n = Aa(g, h, a[b], a[b + 1]);
        if (n < m) {
          for (p = 0; p < d; ++p)
            l[p] = a[b + p];
          l.length = d;
          return n;
        }
        return m;
      }
      for (var q = p ? p : [NaN, NaN],
          r = b + d; r < c; )
        if (mf(a, r - d, r, d, g, h, q), n = Aa(g, h, q[0], q[1]), n < m) {
          m = n;
          for (p = 0; p < d; ++p)
            l[p] = q[p];
          l.length = d;
          r += d;
        } else
          r += d * Math.max((Math.sqrt(n) - Math.sqrt(m)) / e | 0, 1);
      if (f && (mf(a, c - d, b, d, g, h, q), n = Aa(g, h, q[0], q[1]), n < m)) {
        m = n;
        for (p = 0; p < d; ++p)
          l[p] = q[p];
        l.length = d;
      }
      return m;
    }
    function qf(a, b, c, d, e, f, g, h, l, m, p) {
      p = p ? p : [NaN, NaN];
      var n,
          q;
      n = 0;
      for (q = c.length; n < q; ++n) {
        var r = c[n];
        m = pf(a, b, r, d, e, f, g, h, l, m, p);
        b = r;
      }
      return m;
    }
    ;
    function rf(a, b) {
      var c = 0,
          d,
          e;
      d = 0;
      for (e = b.length; d < e; ++d)
        a[c++] = b[d];
      return c;
    }
    function sf(a, b, c, d) {
      var e,
          f;
      e = 0;
      for (f = c.length; e < f; ++e) {
        var g = c[e],
            h;
        for (h = 0; h < d; ++h)
          a[b++] = g[h];
      }
      return b;
    }
    function tf(a, b, c, d, e) {
      e = e ? e : [];
      var f = 0,
          g,
          h;
      g = 0;
      for (h = c.length; g < h; ++g)
        b = sf(a, b, c[g], d), e[f++] = b;
      e.length = f;
      return e;
    }
    ;
    function uf(a, b, c, d, e) {
      e = void 0 !== e ? e : [];
      for (var f = 0; b < c; b += d)
        e[f++] = a.slice(b, b + d);
      e.length = f;
      return e;
    }
    function vf(a, b, c, d, e) {
      e = void 0 !== e ? e : [];
      var f = 0,
          g,
          h;
      g = 0;
      for (h = c.length; g < h; ++g) {
        var l = c[g];
        e[f++] = uf(a, b, l, d, e[f]);
        b = l;
      }
      e.length = f;
      return e;
    }
    ;
    function wf(a, b, c, d, e, f, g) {
      var h = (c - b) / d;
      if (3 > h) {
        for (; b < c; b += d)
          f[g++] = a[b], f[g++] = a[b + 1];
        return g;
      }
      var l = Array(h);
      l[0] = 1;
      l[h - 1] = 1;
      c = [b, c - d];
      for (var m = 0,
          p; 0 < c.length; ) {
        var n = c.pop(),
            q = c.pop(),
            r = 0,
            v = a[q],
            x = a[q + 1],
            y = a[n],
            z = a[n + 1];
        for (p = q + d; p < n; p += d) {
          var A = za(a[p], a[p + 1], v, x, y, z);
          A > r && (m = p, r = A);
        }
        r > e && (l[(m - b) / d] = 1, q + d < m && c.push(q, m), m + d < n && c.push(m, n));
      }
      for (p = 0; p < h; ++p)
        l[p] && (f[g++] = a[b + p * d], f[g++] = a[b + p * d + 1]);
      return g;
    }
    function xf(a, b, c, d, e, f, g, h) {
      var l,
          m;
      l = 0;
      for (m = c.length; l < m; ++l) {
        var p = c[l];
        a: {
          var n,
              q = a,
              r = p,
              v = d,
              x = e,
              y = f,
              z = g;
          if (b != r) {
            var A = x * Math.round(q[b] / x),
                V = x * Math.round(q[b + 1] / x);
            b += v;
            y[z++] = A;
            y[z++] = V;
            do
              if (n = x * Math.round(q[b] / x), g = x * Math.round(q[b + 1] / x), b += v, b == r) {
                y[z++] = n;
                y[z++] = g;
                g = z;
                break a;
              }
 while (n == A && g == V);
            for (; b < r; ) {
              var Pa,
                  ra;
              Pa = x * Math.round(q[b] / x);
              ra = x * Math.round(q[b + 1] / x);
              b += v;
              if (Pa != n || ra != g) {
                var La = n - A,
                    C = g - V,
                    Ma = Pa - A,
                    xb = ra - V;
                La * xb == C * Ma && (0 > La && Ma < La || La == Ma || 0 < La && Ma > La) && (0 > C && xb < C || C == xb || 0 < C && xb > C) || (y[z++] = n, y[z++] = g, A = n, V = g);
                n = Pa;
                g = ra;
              }
            }
            y[z++] = n;
            y[z++] = g;
          }
          g = z;
        }
        h.push(g);
        b = p;
      }
      return g;
    }
    ;
    function yf(a, b) {
      ff.call(this);
      this.c = this.l = -1;
      this.pa(a, b);
    }
    u(yf, ff);
    k = yf.prototype;
    k.clone = function() {
      var a = new yf(null);
      zf(a, this.ka, this.B.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      this.c != this.f && (this.l = Math.sqrt(nf(this.B, 0, this.B.length, this.a, 0)), this.c = this.f);
      return pf(this.B, 0, this.B.length, this.a, this.l, !0, a, b, c, d);
    };
    k.Km = function() {
      return kf(this.B, 0, this.B.length, this.a);
    };
    k.X = function() {
      return uf(this.B, 0, this.B.length, this.a);
    };
    k.kd = function(a) {
      var b = [];
      b.length = wf(this.B, 0, this.B.length, this.a, a, b, 0);
      a = new yf(null);
      zf(a, "XY", b);
      return a;
    };
    k.T = function() {
      return "LinearRing";
    };
    k.Xa = function() {};
    k.pa = function(a, b) {
      a ? (jf(this, b, a, 1), this.B || (this.B = []), this.B.length = sf(this.B, 0, a, this.a), this.s()) : zf(this, "XY", null);
    };
    function zf(a, b, c) {
      hf(a, b, c);
      a.s();
    }
    ;
    function E(a, b) {
      ff.call(this);
      this.pa(a, b);
    }
    u(E, ff);
    k = E.prototype;
    k.clone = function() {
      var a = new E(null);
      a.ca(this.ka, this.B.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      var e = this.B;
      a = Aa(a, b, e[0], e[1]);
      if (a < d) {
        d = this.a;
        for (b = 0; b < d; ++b)
          c[b] = e[b];
        c.length = d;
        return a;
      }
      return d;
    };
    k.X = function() {
      return this.B ? this.B.slice() : [];
    };
    k.ne = function(a) {
      return Wa(this.B, a);
    };
    k.T = function() {
      return "Point";
    };
    k.Xa = function(a) {
      return Sa(a, this.B[0], this.B[1]);
    };
    k.pa = function(a, b) {
      a ? (jf(this, b, a, 0), this.B || (this.B = []), this.B.length = rf(this.B, a), this.s()) : this.ca("XY", null);
    };
    k.ca = function(a, b) {
      hf(this, a, b);
      this.s();
    };
    function Af(a, b, c, d, e) {
      return !ab(e, function(e) {
        return !Bf(a, b, c, d, e[0], e[1]);
      });
    }
    function Bf(a, b, c, d, e, f) {
      for (var g = 0,
          h = a[c - d],
          l = a[c - d + 1]; b < c; b += d) {
        var m = a[b],
            p = a[b + 1];
        l <= f ? p > f && 0 < (m - h) * (f - l) - (e - h) * (p - l) && g++ : p <= f && 0 > (m - h) * (f - l) - (e - h) * (p - l) && g--;
        h = m;
        l = p;
      }
      return !!g;
    }
    function Cf(a, b, c, d, e, f) {
      if (!c.length || !Bf(a, b, c[0], d, e, f))
        return !1;
      var g;
      b = 1;
      for (g = c.length; b < g; ++b)
        if (Bf(a, c[b - 1], c[b], d, e, f))
          return !1;
      return !0;
    }
    ;
    function Df(a, b, c, d, e, f, g) {
      var h,
          l,
          m,
          p,
          n,
          q = e[f + 1],
          r = [],
          v = c[0];
      m = a[v - d];
      n = a[v - d + 1];
      for (h = b; h < v; h += d) {
        p = a[h];
        l = a[h + 1];
        if (q <= n && l <= q || n <= q && q <= l)
          m = (q - n) / (l - n) * (p - m) + m, r.push(m);
        m = p;
        n = l;
      }
      v = NaN;
      n = -Infinity;
      r.sort(da);
      m = r[0];
      h = 1;
      for (l = r.length; h < l; ++h) {
        p = r[h];
        var x = Math.abs(p - m);
        x > n && (m = (m + p) / 2, Cf(a, b, c, d, m, q) && (v = m, n = x));
        m = p;
      }
      isNaN(v) && (v = e[f]);
      return g ? (g.push(v, q), g) : [v, q];
    }
    ;
    function Ef(a, b, c, d, e, f) {
      for (var g = [a[b], a[b + 1]],
          h = [],
          l; b + d < c; b += d) {
        h[0] = a[b + d];
        h[1] = a[b + d + 1];
        if (l = e.call(f, g, h))
          return l;
        g[0] = h[0];
        g[1] = h[1];
      }
      return !1;
    }
    ;
    function Ff(a, b, c, d, e) {
      var f = Ya(Ia(), a, b, c, d);
      return mb(e, f) ? Ta(e, f) || f[0] >= e[0] && f[2] <= e[2] || f[1] >= e[1] && f[3] <= e[3] ? !0 : Ef(a, b, c, d, function(a, b) {
        var c = !1,
            d = Ua(e, a),
            f = Ua(e, b);
        if (1 === d || 1 === f)
          c = !0;
        else {
          var g = e[0],
              h = e[1],
              r = e[2],
              v = e[3],
              x = b[0],
              y = b[1],
              z = (y - a[1]) / (x - a[0]);
          f & 2 && !(d & 2) && (c = x - (y - v) / z, c = c >= g && c <= r);
          c || !(f & 4) || d & 4 || (c = y - (x - r) * z, c = c >= h && c <= v);
          c || !(f & 8) || d & 8 || (c = x - (y - h) / z, c = c >= g && c <= r);
          c || !(f & 16) || d & 16 || (c = y - (x - g) * z, c = c >= h && c <= v);
        }
        return c;
      }) : !1;
    }
    function Gf(a, b, c, d, e) {
      var f = c[0];
      if (!(Ff(a, b, f, d, e) || Bf(a, b, f, d, e[0], e[1]) || Bf(a, b, f, d, e[0], e[3]) || Bf(a, b, f, d, e[2], e[1]) || Bf(a, b, f, d, e[2], e[3])))
        return !1;
      if (1 === c.length)
        return !0;
      b = 1;
      for (f = c.length; b < f; ++b)
        if (Af(a, c[b - 1], c[b], d, e))
          return !1;
      return !0;
    }
    ;
    function Hf(a, b, c, d) {
      for (var e = 0,
          f = a[c - d],
          g = a[c - d + 1]; b < c; b += d)
        var h = a[b],
            l = a[b + 1],
            e = e + (h - f) * (l + g),
            f = h,
            g = l;
      return 0 < e;
    }
    function If(a, b, c, d) {
      var e = 0;
      d = void 0 !== d ? d : !1;
      var f,
          g;
      f = 0;
      for (g = b.length; f < g; ++f) {
        var h = b[f],
            e = Hf(a, e, h, c);
        if (!f) {
          if (d && e || !d && !e)
            return !1;
        } else if (d && !e || !d && e)
          return !1;
        e = h;
      }
      return !0;
    }
    function Jf(a, b, c, d, e) {
      e = void 0 !== e ? e : !1;
      var f,
          g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var h = c[f],
            l = Hf(a, b, h, d);
        if (f ? e && !l || !e && l : e && l || !e && !l)
          for (var l = a,
              m = h,
              p = d; b < m - p; ) {
            var n;
            for (n = 0; n < p; ++n) {
              var q = l[b + n];
              l[b + n] = l[m - p + n];
              l[m - p + n] = q;
            }
            b += p;
            m -= p;
          }
        b = h;
      }
      return b;
    }
    function Kf(a, b, c, d) {
      var e = 0,
          f,
          g;
      f = 0;
      for (g = b.length; f < g; ++f)
        e = Jf(a, e, b[f], c, d);
      return e;
    }
    ;
    function F(a, b) {
      ff.call(this);
      this.c = [];
      this.u = -1;
      this.A = null;
      this.R = this.C = this.G = -1;
      this.l = null;
      this.pa(a, b);
    }
    u(F, ff);
    k = F.prototype;
    k.Vj = function(a) {
      this.B ? ga(this.B, a.ha()) : this.B = a.ha().slice();
      this.c.push(this.B.length);
      this.s();
    };
    k.clone = function() {
      var a = new F(null);
      a.ca(this.ka, this.B.slice(), this.c.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      this.C != this.f && (this.G = Math.sqrt(of(this.B, 0, this.c, this.a, 0)), this.C = this.f);
      return qf(this.B, 0, this.c, this.a, this.G, !0, a, b, c, d);
    };
    k.Oc = function(a, b) {
      return Cf(this.fc(), 0, this.c, this.a, a, b);
    };
    k.Nm = function() {
      return lf(this.fc(), 0, this.c, this.a);
    };
    k.X = function(a) {
      var b;
      void 0 !== a ? (b = this.fc().slice(), Jf(b, 0, this.c, this.a, a)) : b = this.B;
      return vf(b, 0, this.c, this.a);
    };
    k.Rb = function() {
      return this.c;
    };
    function Lf(a) {
      if (a.u != a.f) {
        var b = jb(a.D());
        a.A = Df(a.fc(), 0, a.c, a.a, b, 0);
        a.u = a.f;
      }
      return a.A;
    }
    k.yk = function() {
      return new E(Lf(this));
    };
    k.Ek = function() {
      return this.c.length;
    };
    k.nh = function(a) {
      if (0 > a || this.c.length <= a)
        return null;
      var b = new yf(null);
      zf(b, this.ka, this.B.slice(a ? this.c[a - 1] : 0, this.c[a]));
      return b;
    };
    k.jd = function() {
      var a = this.ka,
          b = this.B,
          c = this.c,
          d = [],
          e = 0,
          f,
          g;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var h = c[f],
            l = new yf(null);
        zf(l, a, b.slice(e, h));
        d.push(l);
        e = h;
      }
      return d;
    };
    k.fc = function() {
      if (this.R != this.f) {
        var a = this.B;
        If(a, this.c, this.a) ? this.l = a : (this.l = a.slice(), this.l.length = Jf(this.l, 0, this.c, this.a));
        this.R = this.f;
      }
      return this.l;
    };
    k.kd = function(a) {
      var b = [],
          c = [];
      b.length = xf(this.B, 0, this.c, this.a, Math.sqrt(a), b, 0, c);
      a = new F(null);
      a.ca("XY", b, c);
      return a;
    };
    k.T = function() {
      return "Polygon";
    };
    k.Xa = function(a) {
      return Gf(this.fc(), 0, this.c, this.a, a);
    };
    k.pa = function(a, b) {
      if (a) {
        jf(this, b, a, 2);
        this.B || (this.B = []);
        var c = tf(this.B, 0, a, this.a, this.c);
        this.B.length = c.length ? c[c.length - 1] : 0;
        this.s();
      } else
        this.ca("XY", null, this.c);
    };
    k.ca = function(a, b, c) {
      hf(this, a, b);
      this.c = c;
      this.s();
    };
    function Mf(a, b, c, d) {
      var e = d ? d : 32;
      d = [];
      var f;
      for (f = 0; f < e; ++f)
        ga(d, a.offset(b, c, 2 * Math.PI * f / e));
      d.push(d[0], d[1]);
      a = new F(null);
      a.ca("XY", d, [d.length]);
      return a;
    }
    function Nf(a) {
      var b = a[0],
          c = a[1],
          d = a[2];
      a = a[3];
      b = [b, c, b, a, d, a, d, c, b, c];
      c = new F(null);
      c.ca("XY", b, [b.length]);
      return c;
    }
    function Of(a, b, c) {
      var d = b ? b : 32,
          e = a.sa();
      b = a.ka;
      for (var f = new F(null, b),
          d = e * (d + 1),
          e = Array(d),
          g = 0; g < d; g++)
        e[g] = 0;
      f.ca(b, e, [e.length]);
      Pf(f, a.Ba(), a.Vd(), c);
      return f;
    }
    function Pf(a, b, c, d) {
      var e = a.ha(),
          f = a.ka,
          g = a.sa(),
          h = a.Rb(),
          l = e.length / g - 1;
      d = d ? d : 0;
      for (var m,
          p,
          n = 0; n <= l; ++n)
        p = n * g, m = d + 2 * Ca(n, l) * Math.PI / l, e[p] = b[0] + c * Math.cos(m), e[p + 1] = b[1] + c * Math.sin(m);
      a.ca(f, e, h);
    }
    ;
    function Qf(a) {
      Gc.call(this);
      a = a || {};
      this.l = [0, 0];
      this.c = [];
      this.lf = this.lf.bind(this);
      var b = {};
      b.center = void 0 !== a.center ? a.center : null;
      this.o = Qb(a.projection);
      var c,
          d,
          e,
          f = void 0 !== a.minZoom ? a.minZoom : 0;
      c = void 0 !== a.maxZoom ? a.maxZoom : 28;
      var g = void 0 !== a.zoomFactor ? a.zoomFactor : 2;
      if (void 0 !== a.resolutions)
        c = a.resolutions, d = c[0], e = c[c.length - 1], c = He(c);
      else {
        d = Qb(a.projection);
        e = d.D();
        var h = (e ? Math.max(hb(e), ib(e)) : 360 * vb.degrees / d.sc()) / 256 / Math.pow(2, 0),
            l = h / Math.pow(2, 28);
        d = a.maxResolution;
        void 0 !== d ? f = 0 : d = h / Math.pow(g, f);
        e = a.minResolution;
        void 0 === e && (e = void 0 !== a.maxZoom ? void 0 !== a.maxResolution ? d / Math.pow(g, c) : h / Math.pow(g, c) : l);
        c = f + Math.floor(Math.log(d / e) / Math.log(g));
        e = d / Math.pow(g, c - f);
        c = Ie(g, d, c - f);
      }
      this.a = d;
      this.i = e;
      this.A = g;
      this.g = a.resolutions;
      this.j = f;
      (void 0 !== a.enableRotation ? a.enableRotation : 1) ? (f = a.constrainRotation, f = void 0 === f || !0 === f ? Ne() : !1 === f ? Le : "number" === typeof f ? Me(f) : Le) : f = Ke;
      this.u = new Wc(void 0 !== a.extent ? oc(a.extent) : pc, c, f);
      void 0 !== a.resolution ? b.resolution = a.resolution : void 0 !== a.zoom && (b.resolution = this.constrainResolution(this.a, a.zoom - this.j));
      b.rotation = void 0 !== a.rotation ? a.rotation : 0;
      this.H(b);
    }
    u(Qf, Gc);
    k = Qf.prototype;
    k.animate = function(a) {
      var b = Date.now(),
          c = this.Ba().slice(),
          d = this.Ua(),
          e = this.Va(),
          f = arguments.length,
          g;
      1 < f && "function" === typeof arguments[f - 1] && (g = arguments[f - 1], --f);
      for (var h = [],
          l = 0; l < f; ++l) {
        var m = arguments[l],
            p = {
              start: b,
              complete: !1,
              anchor: m.anchor,
              duration: void 0 !== m.duration ? m.duration : 1E3,
              easing: m.easing || gd
            };
        m.center && (p.Bg = c, p.Dg = m.center, c = p.Dg);
        void 0 !== m.zoom ? (p.hf = d, p.jf = this.constrainResolution(this.a, m.zoom - this.j, 0), d = p.jf) : m.resolution && (p.hf = d, p.jf = m.resolution, d = p.jf);
        void 0 !== m.rotation && (p.Cg = e, p.Xi = m.rotation, e = p.Xi);
        p.fd = g;
        b += p.duration;
        h.push(p);
      }
      this.c.push(h);
      Rf(this, 0, 1);
      this.lf();
    };
    function md(a) {
      Rf(a, 0, -ld(a)[0]);
      for (var b = 0,
          c = a.c.length; b < c; ++b) {
        var d = a.c[b];
        d[0].fd && d[0].fd(!1);
      }
      a.c.length = 0;
    }
    k.lf = function() {
      void 0 !== this.v && (cancelAnimationFrame(this.v), this.v = void 0);
      if (0 < ld(this)[0]) {
        for (var a = Date.now(),
            b = !1,
            c = this.c.length - 1; 0 <= c; --c) {
          for (var d = this.c[c],
              e = !0,
              f = 0,
              g = d.length; f < g; ++f) {
            var h = d[f];
            if (!h.complete) {
              b = a - h.start;
              b = 0 < h.duration ? b / h.duration : 1;
              1 <= b ? (h.complete = !0, b = 1) : e = !1;
              b = h.easing(b);
              if (h.Bg) {
                var l = h.Bg[0],
                    m = h.Bg[1];
                this.set("center", [l + b * (h.Dg[0] - l), m + b * (h.Dg[1] - m)]);
              }
              h.hf && (l = h.hf + b * (h.jf - h.hf), h.anchor && this.set("center", Sf(this, l, h.anchor)), this.set("resolution", l));
              void 0 !== h.Cg && (b = h.Cg + b * (h.Xi - h.Cg), h.anchor && this.set("center", Tf(this, b, h.anchor)), this.set("rotation", b));
              b = !0;
              if (!h.complete)
                break;
            }
          }
          e && (this.c[c] = null, Rf(this, 0, -1), (d = d[0].fd) && d(!0));
        }
        this.c = this.c.filter(Boolean);
        b && void 0 === this.v && (this.v = requestAnimationFrame(this.lf));
      }
    };
    function Tf(a, b, c) {
      var d,
          e = a.Ba();
      void 0 !== e && (d = [e[0] - c[0], e[1] - c[1]], Ve(d, b - a.Va()), Qe(d, c));
      return d;
    }
    function Sf(a, b, c) {
      var d,
          e = a.Ba();
      a = a.Ua();
      void 0 !== e && void 0 !== a && (d = [c[0] - b * (c[0] - e[0]) / a, c[1] - b * (c[1] - e[1]) / a]);
      return d;
    }
    function Uf(a) {
      var b = [100, 100];
      a = '.ol-viewport[data-view="' + w(a) + '"]';
      if (a = document.querySelector(a))
        a = getComputedStyle(a), b[0] = parseInt(a.width, 10), b[1] = parseInt(a.height, 10);
      return b;
    }
    k.Ec = function(a) {
      return this.u.center(a);
    };
    k.constrainResolution = function(a, b, c) {
      return this.u.resolution(a, b || 0, c || 0);
    };
    k.constrainRotation = function(a, b) {
      return this.u.rotation(a, b || 0);
    };
    k.Ba = function() {
      return this.get("center");
    };
    function ld(a, b) {
      return void 0 !== b ? (b[0] = a.l[0], b[1] = a.l[1], b) : a.l.slice();
    }
    k.ed = function(a) {
      a = a || Uf(this);
      var b = this.Ba();
      qa(b, 1);
      var c = this.Ua();
      qa(void 0 !== c, 2);
      var d = this.Va();
      qa(void 0 !== d, 3);
      return kb(b, c, d, a);
    };
    k.sm = function() {
      return this.a;
    };
    k.tm = function() {
      return this.i;
    };
    k.um = function() {
      return this.o;
    };
    k.Ua = function() {
      return this.get("resolution");
    };
    k.vm = function() {
      return this.g;
    };
    function Vf(a, b) {
      return Math.max(hb(a) / b[0], ib(a) / b[1]);
    }
    function Wf(a) {
      var b = a.a,
          c = Math.log(b / a.i) / Math.log(2);
      return function(a) {
        return b / Math.pow(2, a * c);
      };
    }
    k.Va = function() {
      return this.get("rotation");
    };
    function Xf(a) {
      var b = a.a,
          c = Math.log(b / a.i) / Math.log(2);
      return function(a) {
        return Math.log(b / a) / Math.log(2) / c;
      };
    }
    k.V = function() {
      var a = this.Ba(),
          b = this.o,
          c = this.Ua(),
          d = this.Va();
      return {
        center: a.slice(),
        projection: void 0 !== b ? b : null,
        resolution: c,
        rotation: d
      };
    };
    k.$k = function() {
      var a,
          b = this.Ua();
      if (void 0 !== b && b >= this.i && b <= this.a) {
        a = this.j || 0;
        var c,
            d;
        if (this.g) {
          d = fa(this.g, b, 1);
          a += d;
          if (d == this.g.length - 1)
            return a;
          c = this.g[d];
          d = c / this.g[d + 1];
        } else
          c = this.a, d = this.A;
        a += Math.log(c / b) / Math.log(d);
      }
      return a;
    };
    k.Ff = function(a, b) {
      var c = b || {},
          d = c.size;
      d || (d = Uf(this));
      var e;
      a instanceof ff ? "Circle" === a.T() ? (a = a.D(), e = Nf(a), e.rotate(this.Va(), jb(a))) : e = a : (qa(Array.isArray(a), 24), qa(!gb(a), 25), e = Nf(a));
      var f = c.padding ? c.padding : [0, 0, 0, 0],
          g = void 0 !== c.constrainResolution ? c.constrainResolution : !0,
          h = void 0 !== c.nearest ? c.nearest : !1,
          l;
      void 0 !== c.minResolution ? l = c.minResolution : void 0 !== c.maxZoom ? l = this.constrainResolution(this.a, c.maxZoom - this.j, 0) : l = 0;
      var m = e.ha(),
          p = this.Va(),
          n = Math.cos(-p),
          p = Math.sin(-p),
          q = Infinity,
          r = Infinity,
          v = -Infinity,
          x = -Infinity;
      e = e.sa();
      for (var y = 0,
          z = m.length; y < z; y += e)
        var A = m[y] * n - m[y + 1] * p,
            V = m[y] * p + m[y + 1] * n,
            q = Math.min(q, A),
            r = Math.min(r, V),
            v = Math.max(v, A),
            x = Math.max(x, V);
      d = Vf([q, r, v, x], [d[0] - f[1] - f[3], d[1] - f[0] - f[2]]);
      d = isNaN(d) ? l : Math.max(d, l);
      g && (g = this.constrainResolution(d, 0, 0), !h && g < d && (g = this.constrainResolution(g, -1, 0)), d = g);
      p = -p;
      h = (q + v) / 2 + (f[1] - f[3]) / 2 * d;
      f = (r + x) / 2 + (f[0] - f[2]) / 2 * d;
      n = [h * n - f * p, f * n + h * p];
      void 0 !== c.duration ? this.animate({
        resolution: d,
        center: n,
        duration: c.duration,
        easing: c.easing
      }) : (this.Xc(d), this.wb(n));
    };
    k.$j = function(a, b, c) {
      var d = this.Va(),
          e = Math.cos(-d),
          d = Math.sin(-d),
          f = a[0] * e - a[1] * d;
      a = a[1] * e + a[0] * d;
      var g = this.Ua(),
          f = f + (b[0] / 2 - c[0]) * g;
      a += (c[1] - b[1] / 2) * g;
      d = -d;
      this.wb([f * e - a * d, a * e + f * d]);
    };
    function Yf(a) {
      return !!a.Ba() && void 0 !== a.Ua();
    }
    k.rotate = function(a, b) {
      if (void 0 !== b) {
        var c = Tf(this, a, b);
        this.wb(c);
      }
      this.He(a);
    };
    k.wb = function(a) {
      this.set("center", a);
      0 < ld(this)[0] && md(this);
    };
    function Rf(a, b, c) {
      a.l[b] += c;
      a.s();
    }
    k.Xc = function(a) {
      this.set("resolution", a);
      0 < ld(this)[0] && md(this);
    };
    k.He = function(a) {
      this.set("rotation", a);
      0 < ld(this)[0] && md(this);
    };
    k.yp = function(a) {
      a = this.constrainResolution(this.a, a - this.j, 0);
      this.Xc(a);
    };
    function Zf(a, b, c) {
      this.i = a;
      this.c = b;
      this.g = c;
      this.b = [];
      this.a = this.f = 0;
    }
    function $f(a) {
      a.b.length = 0;
      a.f = 0;
      a.a = 0;
    }
    ;
    function ag(a) {
      Gc.call(this);
      this.v = null;
      this.Ia(!0);
      this.handleEvent = a.handleEvent;
    }
    u(ag, Gc);
    ag.prototype.c = function() {
      return this.get("active");
    };
    ag.prototype.i = function() {
      return this.v;
    };
    ag.prototype.Ia = function(a) {
      this.set("active", a);
    };
    ag.prototype.setMap = function(a) {
      this.v = a;
    };
    function bg(a, b, c, d) {
      if (void 0 !== b) {
        var e = a.Va(),
            f = a.Ba();
        void 0 !== e && f && 0 < d ? a.animate({
          rotation: b,
          anchor: c,
          duration: d,
          easing: fd
        }) : a.rotate(b, c);
      }
    }
    function cg(a, b, c, d) {
      var e = a.Ua();
      b = a.constrainResolution(e, b, 0);
      if (c && void 0 !== b && b !== e) {
        var f = a.Ba();
        c = Sf(a, b, c);
        c = a.Ec(c);
        c = [(b * f[0] - e * c[0]) / (b - e), (b * f[1] - e * c[1]) / (b - e)];
      }
      dg(a, b, c, d);
    }
    function dg(a, b, c, d) {
      if (b) {
        var e = a.Ua(),
            f = a.Ba();
        void 0 !== e && f && b !== e && d ? a.animate({
          resolution: b,
          anchor: c,
          duration: d,
          easing: fd
        }) : (c && (c = Sf(a, b, c), a.wb(c)), a.Xc(b));
      }
    }
    ;
    function eg(a) {
      a = a ? a : {};
      this.a = a.delta ? a.delta : 1;
      ag.call(this, {handleEvent: fg});
      this.g = void 0 !== a.duration ? a.duration : 250;
    }
    u(eg, ag);
    function fg(a) {
      var b = !1,
          c = a.originalEvent;
      if ("dblclick" == a.type) {
        var b = a.coordinate,
            c = c.shiftKey ? -this.a : this.a,
            d = a.map.$();
        cg(d, c, b, this.g);
        a.preventDefault();
        b = !0;
      }
      return !b;
    }
    ;
    function gg(a) {
      a = a.originalEvent;
      return a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey;
    }
    function hg(a) {
      a = a.originalEvent;
      return !a.button && !(Id && Jd && a.ctrlKey);
    }
    function ig(a) {
      return "pointermove" == a.type;
    }
    function jg(a) {
      return "singleclick" == a.type;
    }
    function kg(a) {
      a = a.originalEvent;
      return !a.altKey && !(a.metaKey || a.ctrlKey) && !a.shiftKey;
    }
    function lg(a) {
      a = a.originalEvent;
      return !a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey;
    }
    function mg(a) {
      a = a.originalEvent.target.tagName;
      return "INPUT" !== a && "SELECT" !== a && "TEXTAREA" !== a;
    }
    function ng(a) {
      qa(a.b, 56);
      return "mouse" == a.b.pointerType;
    }
    function og(a) {
      a = a.b;
      return a.isPrimary && 0 === a.button;
    }
    ;
    function pg(a) {
      a = a ? a : {};
      ag.call(this, {handleEvent: a.handleEvent ? a.handleEvent : qg});
      this.sf = a.handleDownEvent ? a.handleDownEvent : bf;
      this.pf = a.handleDragEvent ? a.handleDragEvent : na;
      this.xf = a.handleMoveEvent ? a.handleMoveEvent : na;
      this.yf = a.handleUpEvent ? a.handleUpEvent : bf;
      this.A = !1;
      this.Y = {};
      this.l = [];
    }
    u(pg, ag);
    function rg(a) {
      for (var b = a.length,
          c = 0,
          d = 0,
          e = 0; e < b; e++)
        c += a[e].clientX, d += a[e].clientY;
      return [c / b, d / b];
    }
    function qg(a) {
      if (!(a instanceof Bd))
        return !0;
      var b = !1,
          c = a.type;
      if ("pointerdown" === c || "pointerdrag" === c || "pointerup" === c)
        c = a.b, "pointerup" == a.type ? delete this.Y[c.pointerId] : "pointerdown" == a.type ? this.Y[c.pointerId] = c : c.pointerId in this.Y && (this.Y[c.pointerId] = c), this.l = rb(this.Y);
      this.A ? "pointerdrag" == a.type ? this.pf(a) : "pointerup" == a.type && (this.A = this.yf(a) && 0 < this.l.length) : "pointerdown" == a.type ? (this.A = a = this.sf(a), b = this.Zc(a)) : "pointermove" == a.type && this.xf(a);
      return !b;
    }
    pg.prototype.Zc = function(a) {
      return a;
    };
    function sg(a) {
      pg.call(this, {
        handleDownEvent: tg,
        handleDragEvent: ug,
        handleUpEvent: vg
      });
      a = a ? a : {};
      this.a = a.kinetic;
      this.g = null;
      this.u = a.condition ? a.condition : kg;
      this.j = !1;
    }
    u(sg, pg);
    function ug(a) {
      var b = this.l,
          c = rg(b);
      if (b.length == this.o) {
        if (this.a && this.a.b.push(c[0], c[1], Date.now()), this.g) {
          var d = this.g[0] - c[0],
              e = c[1] - this.g[1];
          a = a.map.$();
          var f = a.V(),
              d = [d, e];
          We(d, f.resolution);
          Ve(d, f.rotation);
          Qe(d, f.center);
          d = a.Ec(d);
          a.wb(d);
        }
      } else
        this.a && $f(this.a);
      this.g = c;
      this.o = b.length;
    }
    function vg(a) {
      var b = a.map;
      a = b.$();
      if (this.l.length)
        return this.a && $f(this.a), this.g = null, !0;
      var c;
      if (c = !this.j && this.a)
        if (c = this.a, 6 > c.b.length)
          c = !1;
        else {
          var d = Date.now() - c.g,
              e = c.b.length - 3;
          if (c.b[e + 2] < d)
            c = !1;
          else {
            for (var f = e - 3; 0 < f && c.b[f + 2] > d; )
              f -= 3;
            var d = c.b[e + 2] - c.b[f + 2],
                g = c.b[e] - c.b[f],
                e = c.b[e + 1] - c.b[f + 1];
            c.f = Math.atan2(e, g);
            c.a = Math.sqrt(g * g + e * e) / d;
            c = c.a > c.c;
          }
        }
      c && (c = this.a, c = (c.c - c.a) / c.i, e = this.a.f, f = a.Ba(), f = b.Ka(f), b = b.Za([f[0] - c * Math.cos(e), f[1] - c * Math.sin(e)]), a.animate({
        center: a.Ec(b),
        duration: 500,
        easing: fd
      }));
      Rf(a, 1, -1);
      return !1;
    }
    function tg(a) {
      if (0 < this.l.length && this.u(a)) {
        var b = a.map.$();
        this.g = null;
        this.A || Rf(b, 1, 1);
        ld(b)[0] && b.wb(a.frameState.viewState.center);
        this.a && $f(this.a);
        this.j = 1 < this.l.length;
        return !0;
      }
      return !1;
    }
    sg.prototype.Zc = bf;
    function wg(a) {
      a = a ? a : {};
      pg.call(this, {
        handleDownEvent: xg,
        handleDragEvent: yg,
        handleUpEvent: zg
      });
      this.g = a.condition ? a.condition : gg;
      this.a = void 0;
      this.j = void 0 !== a.duration ? a.duration : 250;
    }
    u(wg, pg);
    function yg(a) {
      if (ng(a)) {
        var b = a.map,
            c = b.Mb();
        a = a.pixel;
        c = Math.atan2(c[1] / 2 - a[1], a[0] - c[0] / 2);
        if (void 0 !== this.a) {
          a = c - this.a;
          var b = b.$(),
              d = b.Va();
          bg(b, d - a);
        }
        this.a = c;
      }
    }
    function zg(a) {
      if (!ng(a))
        return !0;
      a = a.map.$();
      Rf(a, 1, -1);
      var b = a.Va(),
          c = this.j,
          b = a.constrainRotation(b, 0);
      bg(a, b, void 0, c);
      return !1;
    }
    function xg(a) {
      return ng(a) && hg(a) && this.g(a) ? (Rf(a.map.$(), 1, 1), this.a = void 0, !0) : !1;
    }
    wg.prototype.Zc = bf;
    function Ag(a) {
      this.Gc = null;
      this.a = document.createElement("div");
      this.a.style.position = "absolute";
      this.a.className = "ol-box " + a;
      this.f = this.c = this.b = null;
    }
    u(Ag, zc);
    Ag.prototype.ra = function() {
      this.setMap(null);
    };
    function Bg(a) {
      var b = a.c,
          c = a.f;
      a = a.a.style;
      a.left = Math.min(b[0], c[0]) + "px";
      a.top = Math.min(b[1], c[1]) + "px";
      a.width = Math.abs(c[0] - b[0]) + "px";
      a.height = Math.abs(c[1] - b[1]) + "px";
    }
    Ag.prototype.setMap = function(a) {
      if (this.b) {
        this.b.A.removeChild(this.a);
        var b = this.a.style;
        b.left = b.top = b.width = b.height = "inherit";
      }
      (this.b = a) && this.b.A.appendChild(this.a);
    };
    function Cg(a) {
      var b = a.c,
          c = a.f,
          b = [b, [b[0], c[1]], c, [c[0], b[1]]].map(a.b.Za, a.b);
      b[4] = b[0].slice();
      a.Gc ? a.Gc.pa([b]) : a.Gc = new F([b]);
    }
    Ag.prototype.U = function() {
      return this.Gc;
    };
    function Dg(a) {
      pg.call(this, {
        handleDownEvent: Eg,
        handleDragEvent: Fg,
        handleUpEvent: Gg
      });
      a = a ? a : {};
      this.a = new Ag(a.className || "ol-dragbox");
      this.g = null;
      this.u = a.condition ? a.condition : af;
      this.o = a.boxEndCondition ? a.boxEndCondition : Hg;
    }
    u(Dg, pg);
    function Hg(a, b, c) {
      a = c[0] - b[0];
      b = c[1] - b[1];
      return 64 <= a * a + b * b;
    }
    function Fg(a) {
      if (ng(a)) {
        var b = this.a,
            c = a.pixel;
        b.c = this.g;
        b.f = c;
        Cg(b);
        Bg(b);
        this.b(new Ig(Jg, a.coordinate, a));
      }
    }
    Dg.prototype.U = function() {
      return this.a.U();
    };
    Dg.prototype.j = na;
    function Gg(a) {
      if (!ng(a))
        return !0;
      this.a.setMap(null);
      this.o(a, this.g, a.pixel) && (this.j(a), this.b(new Ig(Kg, a.coordinate, a)));
      return !1;
    }
    function Eg(a) {
      if (ng(a) && hg(a) && this.u(a)) {
        this.g = a.pixel;
        this.a.setMap(a.map);
        var b = this.a,
            c = this.g;
        b.c = this.g;
        b.f = c;
        Cg(b);
        Bg(b);
        this.b(new Ig(Lg, a.coordinate, a));
        return !0;
      }
      return !1;
    }
    var Lg = "boxstart",
        Jg = "boxdrag",
        Kg = "boxend";
    function Ig(a, b, c) {
      Bc.call(this, a);
      this.coordinate = b;
      this.mapBrowserEvent = c;
    }
    u(Ig, Bc);
    function Mg(a) {
      a = a ? a : {};
      var b = a.condition ? a.condition : lg;
      this.C = void 0 !== a.duration ? a.duration : 200;
      this.G = void 0 !== a.out ? a.out : !1;
      Dg.call(this, {
        condition: b,
        className: a.className || "ol-dragzoom"
      });
    }
    u(Mg, Dg);
    Mg.prototype.j = function() {
      var a = this.v,
          b = a.$(),
          c = a.Mb(),
          d = this.U().D();
      if (this.G) {
        var e = b.ed(c),
            d = [a.Ka(bb(d)), a.Ka(db(d))],
            a = Va(Infinity, Infinity, -Infinity, -Infinity, void 0),
            f,
            g;
        f = 0;
        for (g = d.length; f < g; ++f)
          Ja(a, d[f]);
        nb(e, 1 / Vf(a, c));
        d = e;
      }
      c = b.constrainResolution(Vf(d, c));
      e = jb(d);
      e = b.Ec(e);
      b.animate({
        resolution: c,
        center: e,
        duration: this.C,
        easing: fd
      });
    };
    function Ng(a) {
      ag.call(this, {handleEvent: Og});
      a = a || {};
      this.a = function(a) {
        return kg(a) && mg(a);
      };
      this.g = a.condition ? a.condition : this.a;
      this.l = void 0 !== a.duration ? a.duration : 100;
      this.j = void 0 !== a.pixelDelta ? a.pixelDelta : 128;
    }
    u(Ng, ag);
    function Og(a) {
      var b = !1;
      if ("keydown" == a.type) {
        var c = a.originalEvent.keyCode;
        if (this.g(a) && (40 == c || 37 == c || 39 == c || 38 == c)) {
          var b = a.map.$(),
              d = b.Ua() * this.j,
              e = 0,
              f = 0;
          40 == c ? f = -d : 37 == c ? e = -d : 39 == c ? e = d : f = d;
          d = [e, f];
          Ve(d, b.Va());
          c = this.l;
          if (e = b.Ba())
            d = b.Ec([e[0] + d[0], e[1] + d[1]]), c ? b.animate({
              duration: c,
              easing: hd,
              center: d
            }) : b.wb(d);
          a.preventDefault();
          b = !0;
        }
      }
      return !b;
    }
    ;
    function Pg(a) {
      ag.call(this, {handleEvent: Qg});
      a = a ? a : {};
      this.g = a.condition ? a.condition : mg;
      this.a = a.delta ? a.delta : 1;
      this.l = void 0 !== a.duration ? a.duration : 100;
    }
    u(Pg, ag);
    function Qg(a) {
      var b = !1;
      if ("keydown" == a.type || "keypress" == a.type) {
        var c = a.originalEvent.charCode;
        !this.g(a) || 43 != c && 45 != c || (b = 43 == c ? this.a : -this.a, c = a.map.$(), cg(c, b, void 0, this.l), a.preventDefault(), b = !0);
      }
      return !b;
    }
    ;
    function Rg(a) {
      ag.call(this, {handleEvent: Sg});
      a = a || {};
      this.l = 0;
      this.R = void 0 !== a.duration ? a.duration : 250;
      this.Y = void 0 !== a.timeout ? a.timeout : 80;
      this.A = void 0 !== a.useAnchor ? a.useAnchor : !0;
      this.a = null;
      this.o = this.j = this.u = this.g = void 0;
    }
    u(Rg, ag);
    function Sg(a) {
      var b = a.type;
      if ("wheel" !== b && "mousewheel" !== b)
        return !0;
      a.preventDefault();
      var b = a.map,
          c = a.originalEvent;
      this.A && (this.a = a.coordinate);
      var d;
      "wheel" == a.type ? (d = c.deltaY, Gd && c.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (d /= Kd), c.deltaMode === WheelEvent.DOM_DELTA_LINE && (d *= 40)) : "mousewheel" == a.type && (d = -c.wheelDeltaY, Hd && (d /= 3));
      if (0 === d)
        return !1;
      a = Date.now();
      void 0 === this.g && (this.g = a);
      if (!this.j || 400 < a - this.g)
        this.j = 4 > Math.abs(d) ? Tg : Ug;
      if (this.j === Tg) {
        b = b.$();
        this.o ? clearTimeout(this.o) : Rf(b, 1, 1);
        this.o = setTimeout(this.C.bind(this), 400);
        d = b.Ua() * Math.pow(2, d / 300);
        var c = b.i,
            e = b.a,
            f = 0;
        d < c ? (d = Math.max(d, c / 1.5), f = 1) : d > e && (d = Math.min(d, 1.5 * e), f = -1);
        if (this.a) {
          var g = Sf(b, d, this.a);
          b.wb(b.Ec(g));
        }
        b.Xc(d);
        0 < f ? b.animate({
          resolution: c,
          easing: fd,
          anchor: this.a,
          duration: 500
        }) : 0 > f && b.animate({
          resolution: e,
          easing: fd,
          anchor: this.a,
          duration: 500
        });
        this.g = a;
        return !1;
      }
      this.l += d;
      a = Math.max(this.Y - (a - this.g), 0);
      clearTimeout(this.u);
      this.u = setTimeout(this.G.bind(this, b), a);
      return !1;
    }
    Rg.prototype.C = function() {
      this.o = void 0;
      Rf(this.v.$(), 1, -1);
    };
    Rg.prototype.G = function(a) {
      a = a.$();
      0 < ld(a)[0] && md(a);
      cg(a, -wa(this.l, -1, 1), this.a, this.R);
      this.j = void 0;
      this.l = 0;
      this.a = null;
      this.u = this.g = void 0;
    };
    Rg.prototype.S = function(a) {
      this.A = a;
      a || (this.a = null);
    };
    var Tg = "trackpad",
        Ug = "wheel";
    function Vg(a) {
      pg.call(this, {
        handleDownEvent: Wg,
        handleDragEvent: Xg,
        handleUpEvent: Yg
      });
      a = a || {};
      this.g = null;
      this.j = void 0;
      this.a = !1;
      this.o = 0;
      this.C = void 0 !== a.threshold ? a.threshold : .3;
      this.u = void 0 !== a.duration ? a.duration : 250;
    }
    u(Vg, pg);
    function Xg(a) {
      var b = 0,
          c = this.l[0],
          d = this.l[1],
          c = Math.atan2(d.clientY - c.clientY, d.clientX - c.clientX);
      void 0 !== this.j && (b = c - this.j, this.o += b, !this.a && Math.abs(this.o) > this.C && (this.a = !0));
      this.j = c;
      a = a.map;
      c = a.c.getBoundingClientRect();
      d = rg(this.l);
      d[0] -= c.left;
      d[1] -= c.top;
      this.g = a.Za(d);
      this.a && (c = a.$(), d = c.Va(), a.render(), bg(c, d + b, this.g));
    }
    function Yg(a) {
      if (2 > this.l.length) {
        a = a.map.$();
        Rf(a, 1, -1);
        if (this.a) {
          var b = a.Va(),
              c = this.g,
              d = this.u,
              b = a.constrainRotation(b, 0);
          bg(a, b, c, d);
        }
        return !1;
      }
      return !0;
    }
    function Wg(a) {
      return 2 <= this.l.length ? (a = a.map, this.g = null, this.j = void 0, this.a = !1, this.o = 0, this.A || Rf(a.$(), 1, 1), !0) : !1;
    }
    Vg.prototype.Zc = bf;
    function Zg(a) {
      pg.call(this, {
        handleDownEvent: $g,
        handleDragEvent: ah,
        handleUpEvent: bh
      });
      a = a ? a : {};
      this.o = a.constrainResolution || !1;
      this.g = null;
      this.u = void 0 !== a.duration ? a.duration : 400;
      this.a = void 0;
      this.j = 1;
    }
    u(Zg, pg);
    function ah(a) {
      var b = 1,
          c = this.l[0],
          d = this.l[1],
          e = c.clientX - d.clientX,
          c = c.clientY - d.clientY,
          e = Math.sqrt(e * e + c * c);
      void 0 !== this.a && (b = this.a / e);
      this.a = e;
      a = a.map;
      var e = a.$(),
          d = e.Ua(),
          f = e.a,
          g = e.i,
          c = d * b;
      c > f ? (b = f / d, c = f) : c < g && (b = g / d, c = g);
      1 != b && (this.j = b);
      b = a.c.getBoundingClientRect();
      d = rg(this.l);
      d[0] -= b.left;
      d[1] -= b.top;
      this.g = a.Za(d);
      a.render();
      dg(e, c, this.g);
    }
    function bh(a) {
      if (2 > this.l.length) {
        a = a.map.$();
        Rf(a, 1, -1);
        var b = a.Ua();
        if (this.o || b < a.i || b > a.a) {
          var c = this.g,
              d = this.u,
              b = a.constrainResolution(b, 0, this.j - 1);
          dg(a, b, c, d);
        }
        return !1;
      }
      return !0;
    }
    function $g(a) {
      return 2 <= this.l.length ? (a = a.map, this.g = null, this.a = void 0, this.j = 1, this.A || Rf(a.$(), 1, 1), !0) : !1;
    }
    Zg.prototype.Zc = bf;
    function ch(a) {
      a = a ? a : {};
      var b = new D,
          c = new Zf(-.005, .05, 100);
      (void 0 !== a.altShiftDragRotate ? a.altShiftDragRotate : 1) && b.push(new wg);
      (void 0 !== a.doubleClickZoom ? a.doubleClickZoom : 1) && b.push(new eg({
        delta: a.zoomDelta,
        duration: a.zoomDuration
      }));
      (void 0 !== a.dragPan ? a.dragPan : 1) && b.push(new sg({kinetic: c}));
      (void 0 !== a.pinchRotate ? a.pinchRotate : 1) && b.push(new Vg);
      (void 0 !== a.pinchZoom ? a.pinchZoom : 1) && b.push(new Zg({duration: a.zoomDuration}));
      if (void 0 !== a.keyboard ? a.keyboard : 1)
        b.push(new Ng), b.push(new Pg({
          delta: a.zoomDelta,
          duration: a.zoomDuration
        }));
      (void 0 !== a.mouseWheelZoom ? a.mouseWheelZoom : 1) && b.push(new Rg({duration: a.zoomDuration}));
      (void 0 !== a.shiftDragZoom ? a.shiftDragZoom : 1) && b.push(new Mg({duration: a.zoomDuration}));
      return b;
    }
    ;
    function dh(a) {
      Gc.call(this);
      var b = pb({}, a);
      b.opacity = void 0 !== a.opacity ? a.opacity : 1;
      b.visible = void 0 !== a.visible ? a.visible : !0;
      b.zIndex = void 0 !== a.zIndex ? a.zIndex : 0;
      b.maxResolution = void 0 !== a.maxResolution ? a.maxResolution : Infinity;
      b.minResolution = void 0 !== a.minResolution ? a.minResolution : 0;
      this.H(b);
      this.a = {
        layer: this,
        De: !0
      };
    }
    u(dh, Gc);
    function eh(a) {
      a.a.opacity = wa(a.ic(), 0, 1);
      a.a.Ui = a.Nf();
      a.a.visible = a.Kb();
      a.a.extent = a.D();
      a.a.zIndex = a.za();
      a.a.maxResolution = a.gc();
      a.a.minResolution = Math.max(a.hc(), 0);
      return a.a;
    }
    k = dh.prototype;
    k.D = function() {
      return this.get("extent");
    };
    k.gc = function() {
      return this.get("maxResolution");
    };
    k.hc = function() {
      return this.get("minResolution");
    };
    k.ic = function() {
      return this.get("opacity");
    };
    k.Kb = function() {
      return this.get("visible");
    };
    k.za = function() {
      return this.get("zIndex");
    };
    k.uc = function(a) {
      this.set("extent", a);
    };
    k.zc = function(a) {
      this.set("maxResolution", a);
    };
    k.Ac = function(a) {
      this.set("minResolution", a);
    };
    k.vc = function(a) {
      this.set("opacity", a);
    };
    k.wc = function(a) {
      this.set("visible", a);
    };
    k.Wb = function(a) {
      this.set("zIndex", a);
    };
    function fh(a) {
      var b = a || {};
      a = pb({}, b);
      delete a.layers;
      b = b.layers;
      dh.call(this, a);
      this.i = [];
      this.c = {};
      B(this, Ic(gh), this.nl, this);
      b ? Array.isArray(b) ? b = new D(b.slice()) : qa(b instanceof D, 43) : b = new D;
      this.Sh(b);
    }
    u(fh, dh);
    k = fh.prototype;
    k.Dd = function() {};
    k.ze = function() {
      this.Kb() && this.s();
    };
    k.nl = function() {
      this.i.forEach(rc);
      this.i.length = 0;
      var a = this.od();
      this.i.push(B(a, "add", this.ml, this), B(a, "remove", this.ol, this));
      for (var b in this.c)
        this.c[b].forEach(rc);
      qb(this.c);
      var a = a.a,
          c,
          d;
      b = 0;
      for (c = a.length; b < c; b++)
        d = a[b], this.c[w(d).toString()] = [B(d, "propertychange", this.ze, this), B(d, "change", this.ze, this)];
      this.s();
    };
    k.ml = function(a) {
      a = a.element;
      var b = w(a).toString();
      this.c[b] = [B(a, "propertychange", this.ze, this), B(a, "change", this.ze, this)];
      this.s();
    };
    k.ol = function(a) {
      a = w(a.element).toString();
      this.c[a].forEach(rc);
      delete this.c[a];
      this.s();
    };
    k.od = function() {
      return this.get(gh);
    };
    k.Sh = function(a) {
      this.set(gh, a);
    };
    k.Lf = function(a) {
      var b = void 0 !== a ? a : [],
          c = b.length;
      this.od().forEach(function(a) {
        a.Lf(b);
      });
      a = eh(this);
      var d,
          e;
      for (d = b.length; c < d; c++)
        e = b[c], e.opacity *= a.opacity, e.visible = e.visible && a.visible, e.maxResolution = Math.min(e.maxResolution, a.maxResolution), e.minResolution = Math.max(e.minResolution, a.minResolution), void 0 !== a.extent && (e.extent = void 0 !== e.extent ? lb(e.extent, a.extent) : a.extent);
      return b;
    };
    k.Nf = function() {
      return "ready";
    };
    var gh = "layers";
    function hh(a) {
      yb.call(this, {
        code: a,
        units: "m",
        extent: ih,
        global: !0,
        worldExtent: jh,
        getPointResolution: function(a, c) {
          return a / xa(c[1] / 6378137);
        }
      });
    }
    u(hh, yb);
    var kh = 6378137 * Math.PI,
        ih = [-kh, -kh, kh, kh],
        jh = [-180, -85, 180, 85],
        Lb = "EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(a) {
          return new hh(a);
        });
    function Mb(a, b, c) {
      var d = a.length;
      c = 1 < c ? c : 2;
      void 0 === b && (2 < c ? b = a.slice() : b = Array(d));
      for (var e = 0; e < d; e += c) {
        b[e] = kh * a[e] / 180;
        var f = 6378137 * Math.log(Math.tan(Math.PI * (a[e + 1] + 90) / 360));
        f > kh ? f = kh : f < -kh && (f = -kh);
        b[e + 1] = f;
      }
      return b;
    }
    function Nb(a, b, c) {
      var d = a.length;
      c = 1 < c ? c : 2;
      void 0 === b && (2 < c ? b = a.slice() : b = Array(d));
      for (var e = 0; e < d; e += c)
        b[e] = 180 * a[e] / kh, b[e + 1] = 360 * Math.atan(Math.exp(a[e + 1] / 6378137)) / Math.PI - 90;
      return b;
    }
    ;
    var mh = new tb(6378137);
    function nh(a, b) {
      yb.call(this, {
        code: a,
        units: "degrees",
        extent: oh,
        axisOrientation: b,
        global: !0,
        metersPerUnit: ph,
        worldExtent: oh
      });
    }
    u(nh, yb);
    var oh = [-180, -90, 180, 90],
        ph = Math.PI * mh.radius / 180,
        Ob = [new nh("CRS:84"), new nh("EPSG:4326", "neu"), new nh("urn:ogc:def:crs:EPSG::4326", "neu"), new nh("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new nh("urn:ogc:def:crs:OGC:1.3:CRS84"), new nh("urn:ogc:def:crs:OGC:2:84"), new nh("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new nh("urn:x-ogc:def:crs:EPSG:4326", "neu")];
    function qh() {
      Hb(Lb);
      Hb(Ob);
      Kb();
    }
    ;
    function rh(a) {
      var b = pb({}, a);
      delete b.source;
      dh.call(this, b);
      this.u = this.o = this.j = null;
      a.map && this.setMap(a.map);
      B(this, Ic("source"), this.Al, this);
      this.Yc(a.source ? a.source : null);
    }
    u(rh, dh);
    function sh(a, b) {
      return a.visible && b >= a.minResolution && b < a.maxResolution;
    }
    k = rh.prototype;
    k.Lf = function(a) {
      a = a ? a : [];
      a.push(eh(this));
      return a;
    };
    k.la = function() {
      return this.get("source") || null;
    };
    k.Nf = function() {
      var a = this.la();
      return a ? a.V() : "undefined";
    };
    k.kn = function() {
      this.s();
    };
    k.Al = function() {
      this.u && (rc(this.u), this.u = null);
      var a = this.la();
      a && (this.u = B(a, "change", this.kn, this));
      this.s();
    };
    k.setMap = function(a) {
      this.j && (rc(this.j), this.j = null);
      a || this.s();
      this.o && (rc(this.o), this.o = null);
      a && (this.j = B(a, "precompose", function(a) {
        var b = eh(this);
        b.De = !1;
        b.zIndex = Infinity;
        a.frameState.layerStatesArray.push(b);
        a.frameState.layerStates[w(this)] = b;
      }, this), this.o = B(this, "change", a.render, a), this.s());
    };
    k.Yc = function(a) {
      this.set("source", a);
    };
    function th() {
      this.b = {};
      this.a = 0;
    }
    th.prototype.clear = function() {
      this.b = {};
      this.a = 0;
    };
    th.prototype.get = function(a, b, c) {
      a = b + ":" + a + ":" + (c ? Sc(c) : "null");
      return a in this.b ? this.b[a] : null;
    };
    th.prototype.set = function(a, b, c, d) {
      this.b[b + ":" + a + ":" + (c ? Sc(c) : "null")] = d;
      ++this.a;
    };
    var uh = new th;
    var vh = Array(6);
    function wh() {
      return [1, 0, 0, 1, 0, 0];
    }
    function xh(a) {
      return yh(a, 1, 0, 0, 1, 0, 0);
    }
    function zh(a, b) {
      var c = a[0],
          d = a[1],
          e = a[2],
          f = a[3],
          g = a[4],
          h = a[5],
          l = b[0],
          m = b[1],
          p = b[2],
          n = b[3],
          q = b[4],
          r = b[5];
      a[0] = c * l + e * m;
      a[1] = d * l + f * m;
      a[2] = c * p + e * n;
      a[3] = d * p + f * n;
      a[4] = c * q + e * r + g;
      a[5] = d * q + f * r + h;
      return a;
    }
    function yh(a, b, c, d, e, f, g) {
      a[0] = b;
      a[1] = c;
      a[2] = d;
      a[3] = e;
      a[4] = f;
      a[5] = g;
      return a;
    }
    function Ah(a, b) {
      a[0] = b[0];
      a[1] = b[1];
      a[2] = b[2];
      a[3] = b[3];
      a[4] = b[4];
      a[5] = b[5];
      return a;
    }
    function Bh(a, b) {
      var c = b[0],
          d = b[1];
      b[0] = a[0] * c + a[2] * d + a[4];
      b[1] = a[1] * c + a[3] * d + a[5];
      return b;
    }
    function Ch(a, b) {
      var c = Math.cos(b),
          d = Math.sin(b);
      zh(a, yh(vh, c, d, -d, c, 0, 0));
    }
    function Dh(a, b, c) {
      return zh(a, yh(vh, b, 0, 0, c, 0, 0));
    }
    function Eh(a, b, c) {
      zh(a, yh(vh, 1, 0, 0, 1, b, c));
    }
    function Fh(a, b, c, d, e, f, g, h) {
      var l = Math.sin(f);
      f = Math.cos(f);
      a[0] = d * f;
      a[1] = e * l;
      a[2] = -d * l;
      a[3] = e * f;
      a[4] = g * d * f - h * d * l + b;
      a[5] = g * e * l + h * e * f + c;
      return a;
    }
    function Gh(a) {
      var b = a[0] * a[3] - a[1] * a[2];
      qa(!!b, 32);
      var c = a[0],
          d = a[1],
          e = a[2],
          f = a[3],
          g = a[4],
          h = a[5];
      a[0] = f / b;
      a[1] = -d / b;
      a[2] = -e / b;
      a[3] = c / b;
      a[4] = (e * h - f * g) / b;
      a[5] = -(c * h - d * g) / b;
      return a;
    }
    ;
    function Hh(a, b) {
      this.j = b;
      this.c = {};
      this.v = {};
    }
    u(Hh, zc);
    function Ih(a) {
      var b = a.viewState,
          c = a.coordinateToPixelTransform,
          d = a.pixelToCoordinateTransform;
      Fh(c, a.size[0] / 2, a.size[1] / 2, 1 / b.resolution, -1 / b.resolution, -b.rotation, -b.center[0], -b.center[1]);
      Gh(Ah(d, c));
    }
    k = Hh.prototype;
    k.ra = function() {
      for (var a in this.c)
        Ac(this.c[a]);
    };
    function Jh() {
      if (32 < uh.a) {
        var a = 0,
            b,
            c;
        for (b in uh.b)
          c = uh.b[b], a++ & 3 || Ec(c) || (delete uh.b[b], --uh.a);
      }
    }
    k.Aa = function(a, b, c, d, e, f, g) {
      function h(a, c) {
        var f = w(a).toString(),
            g = b.layerStates[w(c)].De;
        if (!(f in b.skippedFeatureUids) || g)
          return d.call(e, a, g ? c : null);
      }
      var l,
          m = b.viewState,
          p = m.resolution,
          n = m.projection,
          m = a;
      if (n.a) {
        var n = n.D(),
            q = hb(n),
            r = a[0];
        if (r < n[0] || r > n[2])
          m = [r + q * Math.ceil((n[0] - r) / q), a[1]];
      }
      n = b.layerStatesArray;
      for (q = n.length - 1; 0 <= q; --q) {
        var v = n[q],
            r = v.layer;
        if (sh(v, p) && f.call(g, r) && (v = Kh(this, r), r.la() && (l = v.Aa(r.la().G ? m : a, b, c, h, e)), l))
          return l;
      }
    };
    k.Zh = function(a, b, c, d, e) {
      return void 0 !== this.Aa(a, b, c, af, this, d, e);
    };
    function Kh(a, b) {
      var c = w(b).toString();
      if (c in a.c)
        return a.c[c];
      var d = b.Dd(a);
      a.c[c] = d;
      a.v[c] = B(d, "change", a.ll, a);
      return d;
    }
    k.ll = function() {
      this.j.render();
    };
    k.vg = na;
    k.gp = function(a, b) {
      for (var c in this.c)
        if (!(b && c in b.layerStates)) {
          var d = c,
              e = this.c[d];
          delete this.c[d];
          rc(this.v[d]);
          delete this.v[d];
          Ac(e);
        }
    };
    function Lh(a, b) {
      for (var c in a.c)
        if (!(c in b.layerStates)) {
          b.postRenderFunctions.push(a.gp.bind(a));
          break;
        }
    }
    function ka(a, b) {
      return a.zIndex - b.zIndex;
    }
    ;
    function Mh(a, b, c, d, e) {
      Bc.call(this, a);
      this.vectorContext = b;
      this.frameState = c;
      this.context = d;
      this.glContext = e;
    }
    u(Mh, Bc);
    var Nh = [0, 0, 0, 1],
        Oh = [],
        Ph = [0, 0, 0, 1];
    function Qh(a, b, c, d) {
      b && (a.translate(c, d), a.rotate(b), a.translate(-c, -d));
    }
    ;
    function Rh() {}
    k = Rh.prototype;
    k.mc = function() {};
    k.pd = function() {};
    k.$b = function() {};
    k.oe = function() {};
    k.pe = function() {};
    k.Qb = function() {};
    k.nc = function() {};
    k.oc = function() {};
    k.pc = function() {};
    k.qc = function() {};
    k.rc = function() {};
    k.xc = function() {};
    k.Na = function() {};
    k.Vb = function() {};
    k.Tb = function() {};
    function Sh(a, b, c, d, e) {
      this.f = a;
      this.I = b;
      this.c = c;
      this.u = d;
      this.mb = e;
      this.M = this.b = this.a = this.$a = this.S = this.R = null;
      this.eb = this.Y = this.o = this.G = this.C = this.A = 0;
      this.ea = !1;
      this.i = this.ia = 0;
      this.oa = !1;
      this.qa = 0;
      this.Fa = "";
      this.Ja = this.Zb = 0;
      this.Ha = !1;
      this.l = this.Oa = 0;
      this.ta = this.j = this.g = null;
      this.v = [];
      this.lb = wh();
    }
    u(Sh, Rh);
    function Th(a, b, c) {
      if (a.M) {
        b = df(b, 0, c, 2, a.u, a.v);
        c = a.f;
        var d = a.lb,
            e = c.globalAlpha;
        1 != a.o && (c.globalAlpha = e * a.o);
        var f = a.ia;
        a.ea && (f += a.mb);
        var g,
            h;
        g = 0;
        for (h = b.length; g < h; g += 2) {
          var l = b[g] - a.A,
              m = b[g + 1] - a.C;
          a.oa && (l = Math.round(l), m = Math.round(m));
          if (f || 1 != a.i) {
            var p = l + a.A,
                n = m + a.C;
            Fh(d, p, n, a.i, a.i, f, -p, -n);
            c.setTransform.apply(c, d);
          }
          c.drawImage(a.M, a.Y, a.eb, a.qa, a.G, l, m, a.qa, a.G);
        }
        (f || 1 != a.i) && c.setTransform(1, 0, 0, 1, 0, 0);
        1 != a.o && (c.globalAlpha = e);
      }
    }
    function Uh(a, b, c, d) {
      var e = 0;
      if (a.ta && "" !== a.Fa) {
        a.g && Vh(a, a.g);
        a.j && Wh(a, a.j);
        var f = a.ta,
            g = a.f,
            h = a.$a;
        h ? (h.font != f.font && (h.font = g.font = f.font), h.textAlign != f.textAlign && (h.textAlign = g.textAlign = f.textAlign), h.textBaseline != f.textBaseline && (h.textBaseline = g.textBaseline = f.textBaseline)) : (g.font = f.font, g.textAlign = f.textAlign, g.textBaseline = f.textBaseline, a.$a = {
          font: f.font,
          textAlign: f.textAlign,
          textBaseline: f.textBaseline
        });
        b = df(b, e, c, d, a.u, a.v);
        f = a.f;
        g = a.Oa;
        for (a.Ha && (g += a.mb); e < c; e += d) {
          var h = b[e] + a.Zb,
              l = b[e + 1] + a.Ja;
          if (g || 1 != a.l) {
            var m = Fh(a.lb, h, l, a.l, a.l, g, -h, -l);
            f.setTransform.apply(f, m);
          }
          a.j && f.strokeText(a.Fa, h, l);
          a.g && f.fillText(a.Fa, h, l);
        }
        (g || 1 != a.l) && f.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
    function Xh(a, b, c, d, e, f) {
      var g = a.f;
      a = df(b, c, d, e, a.u, a.v);
      g.moveTo(a[0], a[1]);
      b = a.length;
      f && (b -= 2);
      for (c = 2; c < b; c += 2)
        g.lineTo(a[c], a[c + 1]);
      f && g.closePath();
      return d;
    }
    function Yh(a, b, c, d, e) {
      var f,
          g;
      f = 0;
      for (g = d.length; f < g; ++f)
        c = Xh(a, b, c, d[f], e, !0);
      return c;
    }
    k = Sh.prototype;
    k.$b = function(a) {
      if (mb(this.c, a.D())) {
        if (this.a || this.b) {
          this.a && Vh(this, this.a);
          this.b && Wh(this, this.b);
          var b;
          b = this.u;
          var c = this.v,
              d = a.ha();
          b = d ? df(d, 0, d.length, a.sa(), b, c) : null;
          c = b[2] - b[0];
          d = b[3] - b[1];
          c = Math.sqrt(c * c + d * d);
          d = this.f;
          d.beginPath();
          d.arc(b[0], b[1], c, 0, 2 * Math.PI);
          this.a && d.fill();
          this.b && d.stroke();
        }
        "" !== this.Fa && Uh(this, a.Ba(), 2, 2);
      }
    };
    k.pd = function(a) {
      this.Na(a.Ca(), a.Da());
      this.Vb(a.Z());
      this.Tb(a.Pa());
    };
    k.mc = function(a) {
      switch (a.T()) {
        case "Point":
          this.qc(a);
          break;
        case "LineString":
          this.Qb(a);
          break;
        case "Polygon":
          this.rc(a);
          break;
        case "MultiPoint":
          this.oc(a);
          break;
        case "MultiLineString":
          this.nc(a);
          break;
        case "MultiPolygon":
          this.pc(a);
          break;
        case "GeometryCollection":
          this.pe(a);
          break;
        case "Circle":
          this.$b(a);
      }
    };
    k.oe = function(a, b) {
      var c = (0, b.Ra)(a);
      c && mb(this.c, c.D()) && (this.pd(b), this.mc(c));
    };
    k.pe = function(a) {
      a = a.a;
      var b,
          c;
      b = 0;
      for (c = a.length; b < c; ++b)
        this.mc(a[b]);
    };
    k.qc = function(a) {
      var b = a.ha();
      a = a.sa();
      this.M && Th(this, b, b.length);
      "" !== this.Fa && Uh(this, b, b.length, a);
    };
    k.oc = function(a) {
      var b = a.ha();
      a = a.sa();
      this.M && Th(this, b, b.length);
      "" !== this.Fa && Uh(this, b, b.length, a);
    };
    k.Qb = function(a) {
      if (mb(this.c, a.D())) {
        if (this.b) {
          Wh(this, this.b);
          var b = this.f,
              c = a.ha();
          b.beginPath();
          Xh(this, c, 0, c.length, a.sa(), !1);
          b.stroke();
        }
        "" !== this.Fa && (a = Zh(a), Uh(this, a, 2, 2));
      }
    };
    k.nc = function(a) {
      var b = a.D();
      if (mb(this.c, b)) {
        if (this.b) {
          Wh(this, this.b);
          var b = this.f,
              c = a.ha(),
              d = 0,
              e = a.Rb(),
              f = a.sa();
          b.beginPath();
          var g,
              h;
          g = 0;
          for (h = e.length; g < h; ++g)
            d = Xh(this, c, d, e[g], f, !1);
          b.stroke();
        }
        "" !== this.Fa && (a = $h(a), Uh(this, a, a.length, 2));
      }
    };
    k.rc = function(a) {
      if (mb(this.c, a.D())) {
        if (this.b || this.a) {
          this.a && Vh(this, this.a);
          this.b && Wh(this, this.b);
          var b = this.f;
          b.beginPath();
          Yh(this, a.fc(), 0, a.Rb(), a.sa());
          this.a && b.fill();
          this.b && b.stroke();
        }
        "" !== this.Fa && (a = Lf(a), Uh(this, a, 2, 2));
      }
    };
    k.pc = function(a) {
      if (mb(this.c, a.D())) {
        if (this.b || this.a) {
          this.a && Vh(this, this.a);
          this.b && Wh(this, this.b);
          var b = this.f,
              c = ai(a),
              d = 0,
              e = a.c,
              f = a.sa(),
              g,
              h;
          b.beginPath();
          g = 0;
          for (h = e.length; g < h; ++g)
            d = Yh(this, c, d, e[g], f);
          this.a && b.fill();
          this.b && b.stroke();
        }
        "" !== this.Fa && (a = bi(a), Uh(this, a, a.length, 2));
      }
    };
    function Vh(a, b) {
      var c = a.f,
          d = a.R;
      d ? d.fillStyle != b.fillStyle && (d.fillStyle = c.fillStyle = b.fillStyle) : (c.fillStyle = b.fillStyle, a.R = {fillStyle: b.fillStyle});
    }
    function Wh(a, b) {
      var c = a.f,
          d = a.S;
      d ? (d.lineCap != b.lineCap && (d.lineCap = c.lineCap = b.lineCap), Ld && !ia(d.lineDash, b.lineDash) && c.setLineDash(d.lineDash = b.lineDash), d.lineJoin != b.lineJoin && (d.lineJoin = c.lineJoin = b.lineJoin), d.lineWidth != b.lineWidth && (d.lineWidth = c.lineWidth = b.lineWidth), d.miterLimit != b.miterLimit && (d.miterLimit = c.miterLimit = b.miterLimit), d.strokeStyle != b.strokeStyle && (d.strokeStyle = c.strokeStyle = b.strokeStyle)) : (c.lineCap = b.lineCap, Ld && c.setLineDash(b.lineDash), c.lineJoin = b.lineJoin, c.lineWidth = b.lineWidth, c.miterLimit = b.miterLimit, c.strokeStyle = b.strokeStyle, a.S = {
        lineCap: b.lineCap,
        lineDash: b.lineDash,
        lineJoin: b.lineJoin,
        lineWidth: b.lineWidth,
        miterLimit: b.miterLimit,
        strokeStyle: b.strokeStyle
      });
    }
    k.Na = function(a, b) {
      if (a) {
        var c = a.b;
        this.a = {fillStyle: Vc(c ? c : Nh)};
      } else
        this.a = null;
      if (b) {
        var c = b.a,
            d = b.i,
            e = b.f,
            f = b.g,
            g = b.l,
            h = b.c,
            l = b.j;
        this.b = {
          lineCap: void 0 !== d ? d : "round",
          lineDash: e ? e : Oh,
          lineDashOffset: f ? f : 0,
          lineJoin: void 0 !== g ? g : "round",
          lineWidth: this.I * (void 0 !== h ? h : 1),
          miterLimit: void 0 !== l ? l : 10,
          strokeStyle: Vc(c ? c : Ph)
        };
      } else
        this.b = null;
    };
    k.Vb = function(a) {
      if (a) {
        var b = a.Hc(),
            c = a.Z(1),
            d = a.Pc(),
            e = a.jc();
        this.A = b[0];
        this.C = b[1];
        this.G = e[1];
        this.M = c;
        this.o = a.g;
        this.Y = d[0];
        this.eb = d[1];
        this.ea = a.o;
        this.ia = a.l;
        this.i = a.c;
        this.oa = a.v;
        this.qa = e[0];
      } else
        this.M = null;
    };
    k.Tb = function(a) {
      if (a) {
        var b = a.Ca();
        b ? (b = b.b, this.g = {fillStyle: Vc(b ? b : Nh)}) : this.g = null;
        var c = a.Da();
        if (c) {
          var b = c.a,
              d = c.i,
              e = c.f,
              f = c.g,
              g = c.l,
              h = c.c,
              c = c.j;
          this.j = {
            lineCap: void 0 !== d ? d : "round",
            lineDash: e ? e : Oh,
            lineDashOffset: f ? f : 0,
            lineJoin: void 0 !== g ? g : "round",
            lineWidth: void 0 !== h ? h : 1,
            miterLimit: void 0 !== c ? c : 10,
            strokeStyle: Vc(b ? b : Ph)
          };
        } else
          this.j = null;
        var b = a.a,
            d = a.f,
            e = a.c,
            f = a.j,
            g = a.i,
            h = a.b,
            c = a.Pa(),
            l = a.g;
        a = a.l;
        this.ta = {
          font: void 0 !== b ? b : "10px sans-serif",
          textAlign: void 0 !== l ? l : "center",
          textBaseline: void 0 !== a ? a : "middle"
        };
        this.Fa = void 0 !== c ? c : "";
        this.Zb = void 0 !== d ? this.I * d : 0;
        this.Ja = void 0 !== e ? this.I * e : 0;
        this.Ha = void 0 !== f ? f : !1;
        this.Oa = void 0 !== g ? g : 0;
        this.l = this.I * (void 0 !== h ? h : 1);
      } else
        this.Fa = "";
    };
    function ci(a, b) {
      Hh.call(this, 0, b);
      this.f = Xc();
      this.b = this.f.canvas;
      this.b.style.width = "100%";
      this.b.style.height = "100%";
      this.b.style.display = "block";
      this.b.className = "ol-unselectable";
      a.insertBefore(this.b, a.childNodes[0] || null);
      this.a = !0;
      this.i = wh();
    }
    u(ci, Hh);
    function di(a, b, c) {
      var d = a.j,
          e = a.f;
      if (Ec(d, b)) {
        var f = c.extent,
            g = c.pixelRatio,
            h = c.viewState.rotation,
            l = c.viewState,
            m = c.pixelRatio / l.resolution;
        a = Fh(a.i, a.b.width / 2, a.b.height / 2, m, -m, -l.rotation, -l.center[0], -l.center[1]);
        d.b(new Mh(b, new Sh(e, g, f, a, h), c, e, null));
      }
    }
    ci.prototype.T = function() {
      return "canvas";
    };
    ci.prototype.vg = function(a) {
      if (a) {
        var b = this.f,
            c = a.pixelRatio,
            d = Math.round(a.size[0] * c),
            e = Math.round(a.size[1] * c);
        this.b.width != d || this.b.height != e ? (this.b.width = d, this.b.height = e) : b.clearRect(0, 0, d, e);
        c = a.viewState.rotation;
        Ih(a);
        di(this, "precompose", a);
        var f = a.layerStatesArray;
        ja(f);
        c && (b.save(), Qh(b, c, d / 2, e / 2));
        var d = a.viewState.resolution,
            g,
            h,
            l,
            e = 0;
        for (g = f.length; e < g; ++e)
          l = f[e], h = l.layer, h = Kh(this, h), sh(l, d) && "ready" == l.Ui && h.qd(a, l) && h.I(a, l, b);
        c && b.restore();
        di(this, "postcompose", a);
        this.a || (this.b.style.display = "", this.a = !0);
        Lh(this, a);
        a.postRenderFunctions.push(Jh);
      } else
        this.a && (this.b.style.display = "none", this.a = !1);
    };
    ci.prototype.Yh = function(a, b, c, d, e, f) {
      var g,
          h = b.viewState.resolution,
          l = b.layerStatesArray,
          m = l.length;
      a = Bh(b.pixelToCoordinateTransform, a.slice());
      for (--m; 0 <= m; --m) {
        g = l[m];
        var p = g.layer;
        if (sh(g, h) && e.call(f, p) && (g = Kh(this, p).v(a, b, c, d)))
          return g;
      }
    };
    var ei = ["Polygon", "Circle", "LineString", "Image", "Text"];
    function fi() {}
    ;
    function gi(a) {
      this.b = a;
    }
    ;
    function hi(a) {
      this.b = a;
    }
    u(hi, gi);
    hi.prototype.T = function() {
      return 35632;
    };
    function ii(a) {
      this.b = a;
    }
    u(ii, gi);
    ii.prototype.T = function() {
      return 35633;
    };
    function ji() {
      this.b = "precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}";
    }
    u(ji, hi);
    var ki = new ji;
    function li() {
      this.b = "varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;if(f==0.0){offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}";
    }
    u(li, ii);
    var mi = new li;
    function ni(a, b) {
      this.G = a.getUniformLocation(b, "n");
      this.qa = a.getUniformLocation(b, "k");
      this.c = a.getUniformLocation(b, "j");
      this.i = a.getUniformLocation(b, "i");
      this.a = a.getUniformLocation(b, "m");
      this.ta = a.getUniformLocation(b, "l");
      this.f = a.getUniformLocation(b, "h");
      this.R = a.getUniformLocation(b, "p");
      this.S = a.getUniformLocation(b, "o");
      this.l = a.getAttribLocation(b, "f");
      this.b = a.getAttribLocation(b, "e");
      this.u = a.getAttribLocation(b, "g");
    }
    ;
    function oi() {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function pi(a, b) {
      a[0] = b[0];
      a[1] = b[1];
      a[4] = b[2];
      a[5] = b[3];
      a[12] = b[4];
      a[13] = b[5];
      return a;
    }
    ;
    function qi(a, b) {
      this.origin = jb(b);
      this.mb = wh();
      this.Oa = wh();
      this.lb = wh();
      this.Ja = oi();
      this.b = [];
      this.o = null;
      this.f = [];
      this.g = [];
      this.a = [];
      this.v = null;
      this.l = void 0;
    }
    u(qi, Rh);
    qi.prototype.i = function(a, b, c, d, e, f, g, h, l, m, p) {
      var n = a.b,
          q,
          r,
          v,
          x,
          y,
          z,
          A,
          V;
      this.l && (q = n.isEnabled(n.STENCIL_TEST), r = n.getParameter(n.STENCIL_FUNC), v = n.getParameter(n.STENCIL_VALUE_MASK), x = n.getParameter(n.STENCIL_REF), y = n.getParameter(n.STENCIL_WRITEMASK), z = n.getParameter(n.STENCIL_FAIL), A = n.getParameter(n.STENCIL_PASS_DEPTH_PASS), V = n.getParameter(n.STENCIL_PASS_DEPTH_FAIL), n.enable(n.STENCIL_TEST), n.clear(n.STENCIL_BUFFER_BIT), n.stencilMask(255), n.stencilFunc(n.ALWAYS, 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.REPLACE), this.l.i(a, b, c, d, e, f, g, h, l, m, p), n.stencilMask(0), n.stencilFunc(n.NOTEQUAL, 1, 255));
      ri(a, 34962, this.v);
      ri(a, 34963, this.o);
      f = this.ff(n, a, e, f);
      var Pa = xh(this.mb);
      Dh(Pa, 2 / (c * e[0]), 2 / (c * e[1]));
      Ch(Pa, -d);
      Eh(Pa, -(b[0] - this.origin[0]), -(b[1] - this.origin[1]));
      b = xh(this.lb);
      Dh(b, 2 / e[0], 2 / e[1]);
      e = xh(this.Oa);
      d && Ch(e, -d);
      n.uniformMatrix4fv(f.f, !1, pi(this.Ja, Pa));
      n.uniformMatrix4fv(f.i, !1, pi(this.Ja, b));
      n.uniformMatrix4fv(f.c, !1, pi(this.Ja, e));
      n.uniform1f(f.a, g);
      var ra;
      l ? (m ? a = this.qe(n, a, h, l, p) : (n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT), this.Md(n, a, h, !0), a = (a = l(null)) ? a : void 0), ra = a) : this.Md(n, a, h, !1);
      this.gf(n, f);
      this.l && (q || n.disable(n.STENCIL_TEST), n.clear(n.STENCIL_BUFFER_BIT), n.stencilFunc(r, x, v), n.stencilMask(y), n.stencilOp(z, V, A));
      return ra;
    };
    function si(a, b, c, d) {
      a.drawElements(4, d - c, b.g ? 5125 : 5123, c * (b.g ? 4 : 2));
    }
    ;
    var ti = [0, 0, 0, 1],
        ui = [],
        vi = [0, 0, 0, 1];
    function wi(a, b, c, d, e, f) {
      a = (c - a) * (f - b) - (e - a) * (d - b);
      return a <= xi && a >= -xi ? void 0 : 0 < a;
    }
    var xi = Number.EPSILON || 2.220446049250313E-16;
    function yi(a) {
      this.b = void 0 !== a ? a : [];
      this.a = zi;
    }
    var zi = 35044;
    function Ai(a, b) {
      qi.call(this, 0, b);
      this.I = null;
      this.j = [];
      this.u = [];
      this.A = 0;
      this.c = {
        fillColor: null,
        strokeColor: null,
        lineDash: null,
        lineDashOffset: void 0,
        lineWidth: void 0,
        s: !1
      };
    }
    u(Ai, qi);
    k = Ai.prototype;
    k.$b = function(a, b) {
      var c = a.Vd(),
          d = a.sa();
      if (c) {
        this.f.push(this.b.length);
        this.g.push(b);
        this.c.s && (this.u.push(this.b.length), this.c.s = !1);
        this.A = c;
        var c = a.ha(),
            c = ef(c, 2, d, -this.origin[0], -this.origin[1]),
            e = this.a.length,
            f = this.b.length,
            g = e / 4,
            h;
        for (h = 0; 2 > h; h += d)
          this.a[e++] = c[h], this.a[e++] = c[h + 1], this.a[e++] = 0, this.a[e++] = this.A, this.a[e++] = c[h], this.a[e++] = c[h + 1], this.a[e++] = 1, this.a[e++] = this.A, this.a[e++] = c[h], this.a[e++] = c[h + 1], this.a[e++] = 2, this.a[e++] = this.A, this.a[e++] = c[h], this.a[e++] = c[h + 1], this.a[e++] = 3, this.a[e++] = this.A, this.b[f++] = g, this.b[f++] = g + 1, this.b[f++] = g + 2, this.b[f++] = g + 2, this.b[f++] = g + 3, this.b[f++] = g, g += 4;
      } else
        this.c.s && (this.j.pop(), this.j.length && (d = this.j[this.j.length - 1], this.c.fillColor = d[0], this.c.strokeColor = d[1], this.c.lineWidth = d[2], this.c.s = !1));
    };
    k.Bb = function() {
      this.v = new yi(this.a);
      this.o = new yi(this.b);
      this.f.push(this.b.length);
      !this.u.length && 0 < this.j.length && (this.j = []);
      this.b = this.a = null;
    };
    k.Cb = function(a) {
      var b = this.v,
          c = this.o;
      return function() {
        Bi(a, b);
        Bi(a, c);
      };
    };
    k.ff = function(a, b, c, d) {
      var e = Ci(b, ki, mi),
          f;
      this.I ? f = this.I : this.I = f = new ni(a, e);
      b.Rc(e);
      a.enableVertexAttribArray(f.b);
      a.vertexAttribPointer(f.b, 2, 5126, !1, 16, 0);
      a.enableVertexAttribArray(f.l);
      a.vertexAttribPointer(f.l, 1, 5126, !1, 16, 8);
      a.enableVertexAttribArray(f.u);
      a.vertexAttribPointer(f.u, 1, 5126, !1, 16, 12);
      a.uniform2fv(f.R, c);
      a.uniform1f(f.ta, d);
      return f;
    };
    k.gf = function(a, b) {
      a.disableVertexAttribArray(b.b);
      a.disableVertexAttribArray(b.l);
      a.disableVertexAttribArray(b.u);
    };
    k.Md = function(a, b, c) {
      if (sb(c)) {
        var d,
            e,
            f;
        e = this.f[this.f.length - 1];
        for (c = this.u.length - 1; 0 <= c; --c)
          d = this.u[c], f = this.j[c], a.uniform4fv(this.I.G, f[0]), Di(this, a, f[1], f[2]), si(a, b, d, e), e = d;
      } else {
        var g,
            h,
            l,
            m;
        l = this.f.length - 2;
        f = e = this.f[l + 1];
        for (d = this.u.length - 1; 0 <= d; --d) {
          g = this.j[d];
          a.uniform4fv(this.I.G, g[0]);
          Di(this, a, g[1], g[2]);
          for (g = this.u[d]; 0 <= l && this.f[l] >= g; )
            m = this.f[l], h = this.g[l], h = w(h).toString(), c[h] && (e !== f && si(a, b, e, f), f = m), l--, e = m;
          e !== f && si(a, b, e, f);
          e = f = g;
        }
      }
    };
    k.qe = function(a, b, c, d, e) {
      var f,
          g,
          h,
          l,
          m,
          p,
          n;
      n = this.f.length - 2;
      h = this.f[n + 1];
      for (f = this.u.length - 1; 0 <= f; --f)
        for (g = this.j[f], a.uniform4fv(this.I.G, g[0]), Di(this, a, g[1], g[2]), l = this.u[f]; 0 <= n && this.f[n] >= l; ) {
          g = this.f[n];
          m = this.g[n];
          p = w(m).toString();
          if (void 0 === c[p] && m.U() && (void 0 === e || mb(e, m.U().D())) && (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), si(a, b, g, h), h = d(m)))
            return h;
          n--;
          h = g;
        }
    };
    function Di(a, b, c, d) {
      b.uniform4fv(a.I.S, c);
      b.uniform1f(a.I.qa, d);
    }
    k.Na = function(a, b) {
      var c,
          d;
      b ? (c = b.f, this.c.lineDash = c ? c : ui, c = b.g, this.c.lineDashOffset = c ? c : 0, c = b.a, c instanceof CanvasGradient || c instanceof CanvasPattern ? c = vi : c = Qc(c).map(function(a, b) {
        return 3 != b ? a / 255 : a;
      }) || vi, d = b.c, d = void 0 !== d ? d : 1) : (c = [0, 0, 0, 0], d = 0);
      var e = a ? a.b : [0, 0, 0, 0];
      e instanceof CanvasGradient || e instanceof CanvasPattern ? e = ti : e = Qc(e).map(function(a, b) {
        return 3 != b ? a / 255 : a;
      }) || ti;
      this.c.strokeColor && ia(this.c.strokeColor, c) && this.c.fillColor && ia(this.c.fillColor, e) && this.c.lineWidth === d || (this.c.s = !0, this.c.fillColor = e, this.c.strokeColor = c, this.c.lineWidth = d, this.j.push([e, c, d]));
    };
    function Ei() {
      this.b = "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
    }
    u(Ei, hi);
    var Fi = new Ei;
    function Gi() {
      this.b = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}";
    }
    u(Gi, ii);
    var Hi = new Gi;
    function Ii(a, b) {
      this.c = a.getUniformLocation(b, "j");
      this.i = a.getUniformLocation(b, "i");
      this.a = a.getUniformLocation(b, "k");
      this.f = a.getUniformLocation(b, "h");
      this.v = a.getAttribLocation(b, "e");
      this.I = a.getAttribLocation(b, "f");
      this.b = a.getAttribLocation(b, "c");
      this.A = a.getAttribLocation(b, "g");
      this.C = a.getAttribLocation(b, "d");
    }
    ;
    function Ji(a, b) {
      this.l = a;
      this.b = b;
      this.a = {};
      this.c = {};
      this.f = {};
      this.o = this.v = this.i = this.j = null;
      (this.g = ea(ca, "OES_element_index_uint")) && b.getExtension("OES_element_index_uint");
      B(this.l, "webglcontextlost", this.mo, this);
      B(this.l, "webglcontextrestored", this.no, this);
    }
    u(Ji, zc);
    function ri(a, b, c) {
      var d = a.b,
          e = c.b,
          f = String(w(c));
      if (f in a.a)
        d.bindBuffer(b, a.a[f].buffer);
      else {
        var g = d.createBuffer();
        d.bindBuffer(b, g);
        var h;
        34962 == b ? h = new Float32Array(e) : 34963 == b && (h = a.g ? new Uint32Array(e) : new Uint16Array(e));
        d.bufferData(b, h, c.a);
        a.a[f] = {
          lc: c,
          buffer: g
        };
      }
    }
    function Bi(a, b) {
      var c = a.b,
          d = String(w(b)),
          e = a.a[d];
      c.isContextLost() || c.deleteBuffer(e.buffer);
      delete a.a[d];
    }
    k = Ji.prototype;
    k.ra = function() {
      yc(this.l);
      var a = this.b;
      if (!a.isContextLost()) {
        for (var b in this.a)
          a.deleteBuffer(this.a[b].buffer);
        for (b in this.f)
          a.deleteProgram(this.f[b]);
        for (b in this.c)
          a.deleteShader(this.c[b]);
        a.deleteFramebuffer(this.i);
        a.deleteRenderbuffer(this.o);
        a.deleteTexture(this.v);
      }
    };
    k.lo = function() {
      return this.b;
    };
    function Ki(a) {
      if (!a.i) {
        var b = a.b,
            c = b.createFramebuffer();
        b.bindFramebuffer(b.FRAMEBUFFER, c);
        var d = Li(b, 1, 1),
            e = b.createRenderbuffer();
        b.bindRenderbuffer(b.RENDERBUFFER, e);
        b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, 1, 1);
        b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, d, 0);
        b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, e);
        b.bindTexture(b.TEXTURE_2D, null);
        b.bindRenderbuffer(b.RENDERBUFFER, null);
        b.bindFramebuffer(b.FRAMEBUFFER, null);
        a.i = c;
        a.v = d;
        a.o = e;
      }
      return a.i;
    }
    function Mi(a, b) {
      var c = String(w(b));
      if (c in a.c)
        return a.c[c];
      var d = a.b,
          e = d.createShader(b.T());
      d.shaderSource(e, b.b);
      d.compileShader(e);
      return a.c[c] = e;
    }
    function Ci(a, b, c) {
      var d = w(b) + "/" + w(c);
      if (d in a.f)
        return a.f[d];
      var e = a.b,
          f = e.createProgram();
      e.attachShader(f, Mi(a, b));
      e.attachShader(f, Mi(a, c));
      e.linkProgram(f);
      return a.f[d] = f;
    }
    k.mo = function() {
      qb(this.a);
      qb(this.c);
      qb(this.f);
      this.o = this.v = this.i = this.j = null;
    };
    k.no = function() {};
    k.Rc = function(a) {
      if (a == this.j)
        return !1;
      this.b.useProgram(a);
      this.j = a;
      return !0;
    };
    function Ni(a, b, c) {
      var d = a.createTexture();
      a.bindTexture(a.TEXTURE_2D, d);
      a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
      a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
      void 0 !== b && a.texParameteri(3553, 10242, b);
      void 0 !== c && a.texParameteri(3553, 10243, c);
      return d;
    }
    function Li(a, b, c) {
      var d = Ni(a, void 0, void 0);
      a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, c, 0, a.RGBA, a.UNSIGNED_BYTE, null);
      return d;
    }
    function Oi(a, b) {
      var c = Ni(a, 33071, 33071);
      a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b);
      return c;
    }
    ;
    function Pi(a, b) {
      qi.call(this, 0, b);
      this.G = this.C = void 0;
      this.A = [];
      this.I = [];
      this.ta = void 0;
      this.j = [];
      this.c = [];
      this.S = this.R = void 0;
      this.qa = null;
      this.oa = this.ia = this.ea = this.eb = this.Y = this.$a = void 0;
      this.Ha = [];
      this.u = [];
      this.Zb = void 0;
    }
    u(Pi, qi);
    k = Pi.prototype;
    k.Cb = function(a) {
      var b = this.v,
          c = this.o,
          d = this.Ha,
          e = this.u,
          f = a.b;
      return function() {
        if (!f.isContextLost()) {
          var g,
              h;
          g = 0;
          for (h = d.length; g < h; ++g)
            f.deleteTexture(d[g]);
          g = 0;
          for (h = e.length; g < h; ++g)
            f.deleteTexture(e[g]);
        }
        Bi(a, b);
        Bi(a, c);
      };
    };
    function Qi(a, b, c, d) {
      var e = a.C,
          f = a.G,
          g = a.ta,
          h = a.R,
          l = a.S,
          m = a.$a,
          p = a.Y,
          n = a.eb,
          q = a.ea ? 1 : 0,
          r = -a.ia,
          v = a.oa,
          x = a.Zb,
          y = Math.cos(r),
          r = Math.sin(r),
          z = a.b.length,
          A = a.a.length,
          V,
          Pa,
          ra,
          La,
          C,
          Ma;
      for (V = 0; V < c; V += d)
        C = b[V] - a.origin[0], Ma = b[V + 1] - a.origin[1], Pa = A / 8, ra = -v * e, La = -v * (g - f), a.a[A++] = C, a.a[A++] = Ma, a.a[A++] = ra * y - La * r, a.a[A++] = ra * r + La * y, a.a[A++] = p / l, a.a[A++] = (n + g) / h, a.a[A++] = m, a.a[A++] = q, ra = v * (x - e), La = -v * (g - f), a.a[A++] = C, a.a[A++] = Ma, a.a[A++] = ra * y - La * r, a.a[A++] = ra * r + La * y, a.a[A++] = (p + x) / l, a.a[A++] = (n + g) / h, a.a[A++] = m, a.a[A++] = q, ra = v * (x - e), La = v * f, a.a[A++] = C, a.a[A++] = Ma, a.a[A++] = ra * y - La * r, a.a[A++] = ra * r + La * y, a.a[A++] = (p + x) / l, a.a[A++] = n / h, a.a[A++] = m, a.a[A++] = q, ra = -v * e, La = v * f, a.a[A++] = C, a.a[A++] = Ma, a.a[A++] = ra * y - La * r, a.a[A++] = ra * r + La * y, a.a[A++] = p / l, a.a[A++] = n / h, a.a[A++] = m, a.a[A++] = q, a.b[z++] = Pa, a.b[z++] = Pa + 1, a.b[z++] = Pa + 2, a.b[z++] = Pa, a.b[z++] = Pa + 2, a.b[z++] = Pa + 3;
    }
    k.oc = function(a, b) {
      this.f.push(this.b.length);
      this.g.push(b);
      var c = a.ha();
      Qi(this, c, c.length, a.sa());
    };
    k.qc = function(a, b) {
      this.f.push(this.b.length);
      this.g.push(b);
      var c = a.ha();
      Qi(this, c, c.length, a.sa());
    };
    k.Bb = function(a) {
      a = a.b;
      this.A.push(this.b.length);
      this.I.push(this.b.length);
      this.v = new yi(this.a);
      this.o = new yi(this.b);
      var b = {};
      Ri(this.Ha, this.j, b, a);
      Ri(this.u, this.c, b, a);
      this.ta = this.G = this.C = void 0;
      this.c = this.j = null;
      this.S = this.R = void 0;
      this.b = null;
      this.oa = this.ia = this.ea = this.eb = this.Y = this.$a = void 0;
      this.a = null;
      this.Zb = void 0;
    };
    function Ri(a, b, c, d) {
      var e,
          f,
          g,
          h = b.length;
      for (g = 0; g < h; ++g)
        e = b[g], f = w(e).toString(), f in c ? e = c[f] : (e = Oi(d, e), c[f] = e), a[g] = e;
    }
    k.ff = function(a, b) {
      var c = Ci(b, Fi, Hi),
          d;
      this.qa ? d = this.qa : this.qa = d = new Ii(a, c);
      b.Rc(c);
      a.enableVertexAttribArray(d.b);
      a.vertexAttribPointer(d.b, 2, 5126, !1, 32, 0);
      a.enableVertexAttribArray(d.v);
      a.vertexAttribPointer(d.v, 2, 5126, !1, 32, 8);
      a.enableVertexAttribArray(d.C);
      a.vertexAttribPointer(d.C, 2, 5126, !1, 32, 16);
      a.enableVertexAttribArray(d.I);
      a.vertexAttribPointer(d.I, 1, 5126, !1, 32, 24);
      a.enableVertexAttribArray(d.A);
      a.vertexAttribPointer(d.A, 1, 5126, !1, 32, 28);
      return d;
    };
    k.gf = function(a, b) {
      a.disableVertexAttribArray(b.b);
      a.disableVertexAttribArray(b.v);
      a.disableVertexAttribArray(b.C);
      a.disableVertexAttribArray(b.I);
      a.disableVertexAttribArray(b.A);
    };
    k.Md = function(a, b, c, d) {
      var e = d ? this.u : this.Ha;
      d = d ? this.I : this.A;
      if (sb(c)) {
        var f,
            g;
        c = 0;
        f = e.length;
        for (g = 0; c < f; ++c) {
          a.bindTexture(3553, e[c]);
          var h = d[c];
          si(a, b, g, h);
          g = h;
        }
      } else
        for (g = f = 0, h = e.length; g < h; ++g) {
          a.bindTexture(3553, e[g]);
          for (var l = 0 < g ? d[g - 1] : 0,
              m = d[g],
              p = l; f < this.f.length && this.f[f] <= m; ) {
            var n = w(this.g[f]).toString();
            void 0 !== c[n] ? (p !== l && si(a, b, p, l), l = p = f === this.f.length - 1 ? m : this.f[f + 1]) : l = f === this.f.length - 1 ? m : this.f[f + 1];
            f++;
          }
          p !== l && si(a, b, p, l);
        }
    };
    k.qe = function(a, b, c, d, e) {
      var f,
          g,
          h,
          l,
          m,
          p,
          n = this.f.length - 1;
      for (f = this.u.length - 1; 0 <= f; --f)
        for (a.bindTexture(3553, this.u[f]), g = 0 < f ? this.I[f - 1] : 0, l = this.I[f]; 0 <= n && this.f[n] >= g; ) {
          h = this.f[n];
          m = this.g[n];
          p = w(m).toString();
          if (void 0 === c[p] && m.U() && (void 0 === e || mb(e, m.U().D())) && (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), si(a, b, h, l), l = d(m)))
            return l;
          l = h;
          n--;
        }
    };
    k.Vb = function(a) {
      var b = a.Hc(),
          c = a.Z(1),
          d = a.ue(),
          e = a.cg(1),
          f = a.g,
          g = a.Pc(),
          h = a.o,
          l = a.l,
          m = a.jc();
      a = a.c;
      var p;
      this.j.length ? (p = this.j[this.j.length - 1], w(p) != w(c) && (this.A.push(this.b.length), this.j.push(c))) : this.j.push(c);
      this.c.length ? (p = this.c[this.c.length - 1], w(p) != w(e) && (this.I.push(this.b.length), this.c.push(e))) : this.c.push(e);
      this.C = b[0];
      this.G = b[1];
      this.ta = m[1];
      this.R = d[1];
      this.S = d[0];
      this.$a = f;
      this.Y = g[0];
      this.eb = g[1];
      this.ia = l;
      this.ea = h;
      this.oa = a;
      this.Zb = m[0];
    };
    function Si(a, b, c) {
      var d = b - c;
      return a[0] === a[d] && a[1] === a[d + 1] && 3 < (b - 0) / c ? !!kf(a, 0, b, c) : !1;
    }
    ;
    function Ti() {
      this.b = "precision mediump float;varying float a;varying vec2 b;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((b.x+1.0)/2.0*o.x*p,(b.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
    }
    u(Ti, hi);
    var Ui = new Ti;
    function Vi() {
      this.b = "varying float a;varying vec2 b;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;b=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}";
    }
    u(Vi, ii);
    var Wi = new Vi;
    function Xi(a, b) {
      this.G = a.getUniformLocation(b, "n");
      this.qa = a.getUniformLocation(b, "k");
      this.S = a.getUniformLocation(b, "l");
      this.c = a.getUniformLocation(b, "j");
      this.i = a.getUniformLocation(b, "i");
      this.a = a.getUniformLocation(b, "m");
      this.ta = a.getUniformLocation(b, "p");
      this.f = a.getUniformLocation(b, "h");
      this.R = a.getUniformLocation(b, "o");
      this.g = a.getAttribLocation(b, "g");
      this.j = a.getAttribLocation(b, "d");
      this.o = a.getAttribLocation(b, "f");
      this.b = a.getAttribLocation(b, "e");
    }
    ;
    function Yi(a, b) {
      qi.call(this, 0, b);
      this.I = null;
      this.u = [];
      this.j = [];
      this.c = {
        strokeColor: null,
        lineCap: void 0,
        lineDash: null,
        lineDashOffset: void 0,
        lineJoin: void 0,
        lineWidth: void 0,
        miterLimit: void 0,
        s: !1
      };
    }
    u(Yi, qi);
    function Zi(a, b, c, d) {
      var e,
          f = a.a.length,
          g = a.b.length,
          h = "bevel" === a.c.lineJoin ? 0 : "miter" === a.c.lineJoin ? 1 : 2,
          l = "butt" === a.c.lineCap ? 0 : "square" === a.c.lineCap ? 1 : 2,
          m = Si(b, c, d),
          p,
          n,
          q,
          r = g,
          v = 1,
          x,
          y,
          z;
      for (e = 0; e < c; e += d) {
        q = f / 7;
        x = y;
        y = z || [b[e], b[e + 1]];
        if (e)
          if (e === c - d) {
            m ? z = p : (x = x || [0, 0], f = $i(a, x, y, [0, 0], v * aj * (l || 1), f), f = $i(a, x, y, [0, 0], -v * aj * (l || 1), f), a.b[g++] = q, a.b[g++] = r - 1, a.b[g++] = r, a.b[g++] = r, a.b[g++] = q + 1, a.b[g++] = q, l && (f = $i(a, x, y, [0, 0], v * bj * l, f), f = $i(a, x, y, [0, 0], -v * bj * l, f), a.b[g++] = q + 2, a.b[g++] = q, a.b[g++] = q + 1, a.b[g++] = q + 1, a.b[g++] = q + 3, a.b[g++] = q + 2));
            break;
          } else
            z = [b[e + d], b[e + d + 1]];
        else {
          z = [b[e + d], b[e + d + 1]];
          if (c - 0 === 2 * d && ia(y, z))
            break;
          if (m)
            x = [b[c - 2 * d], b[c - 2 * d + 1]], p = z;
          else {
            l && (f = $i(a, [0, 0], y, z, v * cj * l, f), f = $i(a, [0, 0], y, z, -v * cj * l, f), a.b[g++] = q + 2, a.b[g++] = q, a.b[g++] = q + 1, a.b[g++] = q + 1, a.b[g++] = q + 3, a.b[g++] = q + 2);
            f = $i(a, [0, 0], y, z, v * dj * (l || 1), f);
            f = $i(a, [0, 0], y, z, -v * dj * (l || 1), f);
            r = f / 7 - 1;
            continue;
          }
        }
        n = wi(x[0], x[1], y[0], y[1], z[0], z[1]) ? -1 : 1;
        f = $i(a, x, y, z, n * ej * (h || 1), f);
        f = $i(a, x, y, z, n * fj * (h || 1), f);
        f = $i(a, x, y, z, -n * gj * (h || 1), f);
        0 < e && (a.b[g++] = q, a.b[g++] = r - 1, a.b[g++] = r, a.b[g++] = q + 2, a.b[g++] = q, a.b[g++] = 0 < v * n ? r : r - 1);
        a.b[g++] = q;
        a.b[g++] = q + 2;
        a.b[g++] = q + 1;
        r = q + 2;
        v = n;
        h && (f = $i(a, x, y, z, n * hj * h, f), a.b[g++] = q + 1, a.b[g++] = q + 3, a.b[g++] = q);
      }
      m && (q = q || f / 7, n = Hf([x[0], x[1], y[0], y[1], z[0], z[1]], 0, 6, 2) ? 1 : -1, f = $i(a, x, y, z, n * ej * (h || 1), f), $i(a, x, y, z, -n * gj * (h || 1), f), a.b[g++] = q, a.b[g++] = r - 1, a.b[g++] = r, a.b[g++] = q + 1, a.b[g++] = q, a.b[g++] = 0 < v * n ? r : r - 1);
    }
    function $i(a, b, c, d, e, f) {
      a.a[f++] = b[0];
      a.a[f++] = b[1];
      a.a[f++] = c[0];
      a.a[f++] = c[1];
      a.a[f++] = d[0];
      a.a[f++] = d[1];
      a.a[f++] = e;
      return f;
    }
    function ij(a, b, c) {
      b -= 0;
      return b < 2 * c ? !1 : b === 2 * c ? !ia([a[0], a[1]], [a[0 + c], a[c + 1]]) : !0;
    }
    k = Yi.prototype;
    k.Qb = function(a, b) {
      var c = a.ha(),
          d = a.sa();
      ij(c, c.length, d) && (c = ef(c, c.length, d, -this.origin[0], -this.origin[1]), this.c.s && (this.j.push(this.b.length), this.c.s = !1), this.f.push(this.b.length), this.g.push(b), Zi(this, c, c.length, d));
    };
    k.nc = function(a, b) {
      var c = this.b.length,
          d = a.hd(),
          e,
          f;
      e = 0;
      for (f = d.length; e < f; ++e) {
        var g = d[e].ha(),
            h = d[e].sa();
        ij(g, g.length, h) && (g = ef(g, g.length, h, -this.origin[0], -this.origin[1]), Zi(this, g, g.length, h));
      }
      this.b.length > c && (this.f.push(c), this.g.push(b), this.c.s && (this.j.push(c), this.c.s = !1));
    };
    function jj(a, b, c, d) {
      Si(b, b.length, d) || (b.push(b[0]), b.push(b[1]));
      Zi(a, b, b.length, d);
      if (c.length) {
        var e;
        b = 0;
        for (e = c.length; b < e; ++b)
          Si(c[b], c[b].length, d) || (c[b].push(c[b][0]), c[b].push(c[b][1])), Zi(a, c[b], c[b].length, d);
      }
    }
    function kj(a, b, c) {
      c = void 0 === c ? a.b.length : c;
      a.f.push(c);
      a.g.push(b);
      a.c.s && (a.j.push(c), a.c.s = !1);
    }
    k.Bb = function() {
      this.v = new yi(this.a);
      this.o = new yi(this.b);
      this.f.push(this.b.length);
      !this.j.length && 0 < this.u.length && (this.u = []);
      this.b = this.a = null;
    };
    k.Cb = function(a) {
      var b = this.v,
          c = this.o;
      return function() {
        Bi(a, b);
        Bi(a, c);
      };
    };
    k.ff = function(a, b, c, d) {
      var e = Ci(b, Ui, Wi),
          f;
      this.I ? f = this.I : this.I = f = new Xi(a, e);
      b.Rc(e);
      a.enableVertexAttribArray(f.j);
      a.vertexAttribPointer(f.j, 2, 5126, !1, 28, 0);
      a.enableVertexAttribArray(f.b);
      a.vertexAttribPointer(f.b, 2, 5126, !1, 28, 8);
      a.enableVertexAttribArray(f.o);
      a.vertexAttribPointer(f.o, 2, 5126, !1, 28, 16);
      a.enableVertexAttribArray(f.g);
      a.vertexAttribPointer(f.g, 1, 5126, !1, 28, 24);
      a.uniform2fv(f.R, c);
      a.uniform1f(f.ta, d);
      return f;
    };
    k.gf = function(a, b) {
      a.disableVertexAttribArray(b.j);
      a.disableVertexAttribArray(b.b);
      a.disableVertexAttribArray(b.o);
      a.disableVertexAttribArray(b.g);
    };
    k.Md = function(a, b, c, d) {
      var e = a.getParameter(a.DEPTH_FUNC),
          f = a.getParameter(a.DEPTH_WRITEMASK);
      d || (a.enable(a.DEPTH_TEST), a.depthMask(!0), a.depthFunc(a.NOTEQUAL));
      if (sb(c)) {
        var g,
            h,
            l;
        h = this.f[this.f.length - 1];
        for (c = this.j.length - 1; 0 <= c; --c)
          g = this.j[c], l = this.u[c], lj(this, a, l[0], l[1], l[2]), si(a, b, g, h), a.clear(a.DEPTH_BUFFER_BIT), h = g;
      } else {
        var m,
            p,
            n,
            q;
        n = this.f.length - 2;
        l = h = this.f[n + 1];
        for (g = this.j.length - 1; 0 <= g; --g) {
          m = this.u[g];
          lj(this, a, m[0], m[1], m[2]);
          for (m = this.j[g]; 0 <= n && this.f[n] >= m; )
            q = this.f[n], p = this.g[n], p = w(p).toString(), c[p] && (h !== l && (si(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT)), l = q), n--, h = q;
          h !== l && (si(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT));
          h = l = m;
        }
      }
      d || (a.disable(a.DEPTH_TEST), a.clear(a.DEPTH_BUFFER_BIT), a.depthMask(f), a.depthFunc(e));
    };
    k.qe = function(a, b, c, d, e) {
      var f,
          g,
          h,
          l,
          m,
          p,
          n;
      n = this.f.length - 2;
      h = this.f[n + 1];
      for (f = this.j.length - 1; 0 <= f; --f)
        for (g = this.u[f], lj(this, a, g[0], g[1], g[2]), l = this.j[f]; 0 <= n && this.f[n] >= l; ) {
          g = this.f[n];
          m = this.g[n];
          p = w(m).toString();
          if (void 0 === c[p] && m.U() && (void 0 === e || mb(e, m.U().D())) && (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), si(a, b, g, h), h = d(m)))
            return h;
          n--;
          h = g;
        }
    };
    function lj(a, b, c, d, e) {
      b.uniform4fv(a.I.G, c);
      b.uniform1f(a.I.qa, d);
      b.uniform1f(a.I.S, e);
    }
    k.Na = function(a, b) {
      var c = b.i;
      this.c.lineCap = void 0 !== c ? c : "round";
      c = b.f;
      this.c.lineDash = c ? c : ui;
      c = b.g;
      this.c.lineDashOffset = c ? c : 0;
      c = b.l;
      this.c.lineJoin = void 0 !== c ? c : "round";
      c = b.a;
      c instanceof CanvasGradient || c instanceof CanvasPattern ? c = vi : c = Qc(c).map(function(a, b) {
        return 3 != b ? a / 255 : a;
      }) || vi;
      var d = b.c,
          d = void 0 !== d ? d : 1,
          e = b.j,
          e = void 0 !== e ? e : 10;
      this.c.strokeColor && ia(this.c.strokeColor, c) && this.c.lineWidth === d && this.c.miterLimit === e || (this.c.s = !0, this.c.strokeColor = c, this.c.lineWidth = d, this.c.miterLimit = e, this.u.push([c, d, e]));
    };
    var dj = 3,
        aj = 5,
        cj = 7,
        bj = 11,
        ej = 13,
        fj = 17,
        gj = 19,
        hj = 23;
    function mj() {
      this.b = "precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}";
    }
    u(mj, hi);
    var nj = new mj;
    function oj() {
      this.b = "attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}";
    }
    u(oj, ii);
    var pj = new oj;
    function qj(a, b) {
      this.G = a.getUniformLocation(b, "e");
      this.c = a.getUniformLocation(b, "d");
      this.i = a.getUniformLocation(b, "c");
      this.a = a.getUniformLocation(b, "f");
      this.f = a.getUniformLocation(b, "b");
      this.b = a.getAttribLocation(b, "a");
    }
    ;
    function rj(a) {
      a = a || {};
      this.a = void 0 !== a.color ? a.color : null;
      this.i = a.lineCap;
      this.f = void 0 !== a.lineDash ? a.lineDash : null;
      this.g = a.lineDashOffset;
      this.l = a.lineJoin;
      this.j = a.miterLimit;
      this.c = a.width;
      this.b = void 0;
    }
    k = rj.prototype;
    k.clone = function() {
      var a = this.a;
      return new rj({
        color: a && a.slice ? a.slice() : a || void 0,
        lineCap: this.i,
        lineDash: this.f ? this.f.slice() : void 0,
        lineDashOffset: this.g,
        lineJoin: this.l,
        miterLimit: this.j,
        width: this.c
      });
    };
    k.ao = function() {
      return this.a;
    };
    k.Ak = function() {
      return this.i;
    };
    k.bo = function() {
      return this.f;
    };
    k.Bk = function() {
      return this.g;
    };
    k.Ck = function() {
      return this.l;
    };
    k.Hk = function() {
      return this.j;
    };
    k.co = function() {
      return this.c;
    };
    k.eo = function(a) {
      this.a = a;
      this.b = void 0;
    };
    k.qp = function(a) {
      this.i = a;
      this.b = void 0;
    };
    k.setLineDash = function(a) {
      this.f = a;
      this.b = void 0;
    };
    k.rp = function(a) {
      this.g = a;
      this.b = void 0;
    };
    k.sp = function(a) {
      this.l = a;
      this.b = void 0;
    };
    k.tp = function(a) {
      this.j = a;
      this.b = void 0;
    };
    k.wp = function(a) {
      this.c = a;
      this.b = void 0;
    };
    function sj(a) {
      this.b = this.a = this.f = void 0;
      this.i = void 0 === a ? !0 : a;
      this.c = 0;
    }
    function tj(a) {
      var b = a.b;
      if (b) {
        var c = b.next,
            d = b.ub;
        c && (c.ub = d);
        d && (d.next = c);
        a.b = c || d;
        a.f === a.a ? (a.b = void 0, a.f = void 0, a.a = void 0) : a.f === b ? a.f = a.b : a.a === b && (a.a = d ? a.b.ub : a.b);
        a.c--;
      }
    }
    function uj(a) {
      a.b = a.f;
      if (a.b)
        return a.b.data;
    }
    function vj(a) {
      if (a.b && a.b.next)
        return a.b = a.b.next, a.b.data;
    }
    function wj(a) {
      if (a.b && a.b.next)
        return a.b.next.data;
    }
    function xj(a) {
      if (a.b && a.b.ub)
        return a.b = a.b.ub, a.b.data;
    }
    function yj(a) {
      if (a.b && a.b.ub)
        return a.b.ub.data;
    }
    function zj(a) {
      if (a.b)
        return a.b.data;
    }
    sj.prototype.concat = function(a) {
      if (a.b) {
        if (this.b) {
          var b = this.b.next;
          this.b.next = a.f;
          a.f.ub = this.b;
          b.ub = a.a;
          a.a.next = b;
          this.c += a.c;
        } else
          this.b = a.b, this.f = a.f, this.a = a.a, this.c = a.c;
        a.b = void 0;
        a.f = void 0;
        a.a = void 0;
        a.c = 0;
      }
    };
    var Aj,
        Bj,
        Cj,
        Dj;
    (function() {
      var a = {},
          b = {ma: a};
      (function(c) {
        if ("object" === typeof a && "undefined" !== typeof b)
          b.ma = c();
        else {
          var d;
          "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
          d.cq = c();
        }
      })(function() {
        return function d(a, b, g) {
          function e(h, l) {
            if (!b[h]) {
              if (!a[h]) {
                var m = "function" == typeof require && require;
                if (!l && m)
                  return m(h, !0);
                if (f)
                  return f(h, !0);
                m = Error("Cannot find module '" + h + "'");
                throw m.code = "MODULE_NOT_FOUND", m;
              }
              m = b[h] = {ma: {}};
              a[h][0].call(m.ma, function(b) {
                var d = a[h][1][b];
                return e(d ? d : b);
              }, m, m.ma, d, a, b, g);
            }
            return b[h].ma;
          }
          for (var f = "function" == typeof require && require,
              m = 0; m < g.length; m++)
            e(g[m]);
          return e;
        }({
          1: [function(a, b) {
            function d(a, b, f, g, q) {
              f = f || 0;
              g = g || a.length - 1;
              for (q = q || h; g > f; ) {
                if (600 < g - f) {
                  var l = g - f + 1,
                      m = b - f + 1,
                      p = Math.log(l),
                      n = .5 * Math.exp(2 * p / 3),
                      p = .5 * Math.sqrt(p * n * (l - n) / l) * (0 > m - l / 2 ? -1 : 1);
                  d(a, b, Math.max(f, Math.floor(b - m * n / l + p)), Math.min(g, Math.floor(b + (l - m) * n / l + p)), q);
                }
                l = a[b];
                m = f;
                n = g;
                e(a, f, b);
                for (0 < q(a[g], l) && e(a, f, g); m < n; ) {
                  e(a, m, n);
                  m++;
                  for (n--; 0 > q(a[m], l); )
                    m++;
                  for (; 0 < q(a[n], l); )
                    n--;
                }
                0 === q(a[f], l) ? e(a, f, n) : (n++, e(a, n, g));
                n <= b && (f = n + 1);
                b <= n && (g = n - 1);
              }
            }
            function e(a, b, d) {
              var e = a[b];
              a[b] = a[d];
              a[d] = e;
            }
            function h(a, b) {
              return a < b ? -1 : a > b ? 1 : 0;
            }
            b.ma = d;
          }, {}],
          2: [function(a, b) {
            function d(a, b) {
              if (!(this instanceof d))
                return new d(a, b);
              this.wf = Math.max(4, a || 9);
              this.Pg = Math.max(2, Math.ceil(.4 * this.wf));
              b && this.Lj(b);
              this.clear();
            }
            function e(a, b) {
              h(a, 0, a.children.length, b, a);
            }
            function h(a, b, d, e, f) {
              f || (f = x(null));
              f.da = Infinity;
              f.fa = Infinity;
              f.ba = -Infinity;
              f.ja = -Infinity;
              for (var g; b < d; b++)
                g = a.children[b], l(f, a.hb ? e(g) : g);
              return f;
            }
            function l(a, b) {
              a.da = Math.min(a.da, b.da);
              a.fa = Math.min(a.fa, b.fa);
              a.ba = Math.max(a.ba, b.ba);
              a.ja = Math.max(a.ja, b.ja);
            }
            function m(a, b) {
              return a.da - b.da;
            }
            function p(a, b) {
              return a.fa - b.fa;
            }
            function n(a) {
              return (a.ba - a.da) * (a.ja - a.fa);
            }
            function q(a) {
              return a.ba - a.da + (a.ja - a.fa);
            }
            function r(a, b) {
              return a.da <= b.da && a.fa <= b.fa && b.ba <= a.ba && b.ja <= a.ja;
            }
            function v(a, b) {
              return b.da <= a.ba && b.fa <= a.ja && b.ba >= a.da && b.ja >= a.fa;
            }
            function x(a) {
              return {
                children: a,
                height: 1,
                hb: !0,
                da: Infinity,
                fa: Infinity,
                ba: -Infinity,
                ja: -Infinity
              };
            }
            function y(a, b, d, e, f) {
              for (var g = [b, d],
                  h; g.length; )
                d = g.pop(), b = g.pop(), d - b <= e || (h = b + Math.ceil((d - b) / e / 2) * e, z(a, h, b, d, f), g.push(b, h, h, d));
            }
            b.ma = d;
            var z = a("quickselect");
            d.prototype = {
              all: function() {
                return this.Kg(this.data, []);
              },
              search: function(a) {
                var b = this.data,
                    d = [],
                    e = this.yb;
                if (!v(a, b))
                  return d;
                for (var f = [],
                    g,
                    h,
                    l,
                    m; b; ) {
                  g = 0;
                  for (h = b.children.length; g < h; g++)
                    l = b.children[g], m = b.hb ? e(l) : l, v(a, m) && (b.hb ? d.push(l) : r(a, m) ? this.Kg(l, d) : f.push(l));
                  b = f.pop();
                }
                return d;
              },
              load: function(a) {
                if (!a || !a.length)
                  return this;
                if (a.length < this.Pg) {
                  for (var b = 0,
                      d = a.length; b < d; b++)
                    this.Ea(a[b]);
                  return this;
                }
                a = this.Mg(a.slice(), 0, a.length - 1, 0);
                this.data.children.length ? this.data.height === a.height ? this.Rg(this.data, a) : (this.data.height < a.height && (b = this.data, this.data = a, a = b), this.Og(a, this.data.height - a.height - 1, !0)) : this.data = a;
                return this;
              },
              Ea: function(a) {
                a && this.Og(a, this.data.height - 1);
                return this;
              },
              clear: function() {
                this.data = x([]);
                return this;
              },
              remove: function(a, b) {
                if (!a)
                  return this;
                for (var d = this.data,
                    e = this.yb(a),
                    f = [],
                    g = [],
                    h,
                    l,
                    m,
                    n; d || f.length; ) {
                  d || (d = f.pop(), l = f[f.length - 1], h = g.pop(), n = !0);
                  if (d.hb) {
                    a: {
                      m = a;
                      var p = d.children,
                          q = b;
                      if (q) {
                        for (var v = 0; v < p.length; v++)
                          if (q(m, p[v])) {
                            m = v;
                            break a;
                          }
                        m = -1;
                      } else
                        m = p.indexOf(m);
                    }
                    if (-1 !== m) {
                      d.children.splice(m, 1);
                      f.push(d);
                      this.Jj(f);
                      break;
                    }
                  }
                  n || d.hb || !r(d, e) ? l ? (h++, d = l.children[h], n = !1) : d = null : (f.push(d), g.push(h), h = 0, l = d, d = d.children[0]);
                }
                return this;
              },
              yb: function(a) {
                return a;
              },
              Af: m,
              Bf: p,
              toJSON: function() {
                return this.data;
              },
              Kg: function(a, b) {
                for (var d = []; a; )
                  a.hb ? b.push.apply(b, a.children) : d.push.apply(d, a.children), a = d.pop();
                return b;
              },
              Mg: function(a, b, d, f) {
                var g = d - b + 1,
                    h = this.wf,
                    l;
                if (g <= h)
                  return l = x(a.slice(b, d + 1)), e(l, this.yb), l;
                f || (f = Math.ceil(Math.log(g) / Math.log(h)), h = Math.ceil(g / Math.pow(h, f - 1)));
                l = x([]);
                l.hb = !1;
                l.height = f;
                var g = Math.ceil(g / h),
                    h = g * Math.ceil(Math.sqrt(h)),
                    m,
                    n,
                    p;
                for (y(a, b, d, h, this.Af); b <= d; b += h)
                  for (n = Math.min(b + h - 1, d), y(a, b, n, g, this.Bf), m = b; m <= n; m += g)
                    p = Math.min(m + g - 1, n), l.children.push(this.Mg(a, m, p, f - 1));
                e(l, this.yb);
                return l;
              },
              Ij: function(a, b, d, e) {
                for (var f,
                    g,
                    h,
                    l,
                    m,
                    p,
                    q,
                    r; ; ) {
                  e.push(b);
                  if (b.hb || e.length - 1 === d)
                    break;
                  q = r = Infinity;
                  f = 0;
                  for (g = b.children.length; f < g; f++)
                    h = b.children[f], m = n(h), p = (Math.max(h.ba, a.ba) - Math.min(h.da, a.da)) * (Math.max(h.ja, a.ja) - Math.min(h.fa, a.fa)) - m, p < r ? (r = p, q = m < q ? m : q, l = h) : p === r && m < q && (q = m, l = h);
                  b = l || b.children[0];
                }
                return b;
              },
              Og: function(a, b, d) {
                var e = this.yb;
                d = d ? a : e(a);
                var e = [],
                    f = this.Ij(d, this.data, b, e);
                f.children.push(a);
                for (l(f, d); 0 <= b; )
                  if (e[b].children.length > this.wf)
                    this.Qj(e, b), b--;
                  else
                    break;
                this.Fj(d, e, b);
              },
              Qj: function(a, b) {
                var d = a[b],
                    f = d.children.length,
                    g = this.Pg;
                this.Gj(d, g, f);
                f = this.Hj(d, g, f);
                f = x(d.children.splice(f, d.children.length - f));
                f.height = d.height;
                f.hb = d.hb;
                e(d, this.yb);
                e(f, this.yb);
                b ? a[b - 1].children.push(f) : this.Rg(d, f);
              },
              Rg: function(a, b) {
                this.data = x([a, b]);
                this.data.height = a.height + 1;
                this.data.hb = !1;
                e(this.data, this.yb);
              },
              Hj: function(a, b, d) {
                var e,
                    f,
                    g,
                    l,
                    m,
                    p,
                    q;
                m = p = Infinity;
                for (e = b; e <= d - b; e++)
                  f = h(a, 0, e, this.yb), g = h(a, e, d, this.yb), l = Math.max(0, Math.min(f.ba, g.ba) - Math.max(f.da, g.da)) * Math.max(0, Math.min(f.ja, g.ja) - Math.max(f.fa, g.fa)), f = n(f) + n(g), l < m ? (m = l, q = e, p = f < p ? f : p) : l === m && f < p && (p = f, q = e);
                return q;
              },
              Gj: function(a, b, d) {
                var e = a.hb ? this.Af : m,
                    f = a.hb ? this.Bf : p,
                    g = this.Lg(a, b, d, e);
                b = this.Lg(a, b, d, f);
                g < b && a.children.sort(e);
              },
              Lg: function(a, b, d, e) {
                a.children.sort(e);
                e = this.yb;
                var f = h(a, 0, b, e),
                    g = h(a, d - b, d, e),
                    m = q(f) + q(g),
                    p,
                    n;
                for (p = b; p < d - b; p++)
                  n = a.children[p], l(f, a.hb ? e(n) : n), m += q(f);
                for (p = d - b - 1; p >= b; p--)
                  n = a.children[p], l(g, a.hb ? e(n) : n), m += q(g);
                return m;
              },
              Fj: function(a, b, d) {
                for (; 0 <= d; d--)
                  l(b[d], a);
              },
              Jj: function(a) {
                for (var b = a.length - 1,
                    d; 0 <= b; b--)
                  0 === a[b].children.length ? 0 < b ? (d = a[b - 1].children, d.splice(d.indexOf(a[b]), 1)) : this.clear() : e(a[b], this.yb);
              },
              Lj: function(a) {
                var b = ["return a", " - b", ";"];
                this.Af = new Function("a", "b", b.join(a[0]));
                this.Bf = new Function("a", "b", b.join(a[1]));
                this.yb = new Function("a", "return {minX: a" + a[0] + ", minY: a" + a[1] + ", maxX: a" + a[2] + ", maxY: a" + a[3] + "};");
              }
            };
          }, {quickselect: 1}]
        }, {}, [2])(2);
      });
      Aj = b.ma;
    })();
    function Ej(a) {
      this.b = Aj(a);
      this.a = {};
    }
    k = Ej.prototype;
    k.Ea = function(a, b) {
      var c = {
        da: a[0],
        fa: a[1],
        ba: a[2],
        ja: a[3],
        value: b
      };
      this.b.Ea(c);
      this.a[w(b)] = c;
    };
    k.load = function(a, b) {
      for (var c = Array(b.length),
          d = 0,
          e = b.length; d < e; d++) {
        var f = a[d],
            g = b[d],
            f = {
              da: f[0],
              fa: f[1],
              ba: f[2],
              ja: f[3],
              value: g
            };
        c[d] = f;
        this.a[w(g)] = f;
      }
      this.b.load(c);
    };
    k.remove = function(a) {
      a = w(a);
      var b = this.a[a];
      delete this.a[a];
      return null !== this.b.remove(b);
    };
    function Fj(a, b, c) {
      var d = a.a[w(c)];
      Za([d.da, d.fa, d.ba, d.ja], b) || (a.remove(c), a.Ea(b, c));
    }
    function Gj(a) {
      return a.b.all().map(function(a) {
        return a.value;
      });
    }
    function Hj(a, b) {
      return a.b.search({
        da: b[0],
        fa: b[1],
        ba: b[2],
        ja: b[3]
      }).map(function(a) {
        return a.value;
      });
    }
    k.forEach = function(a, b) {
      return Ij(Gj(this), a, b);
    };
    function Jj(a, b, c, d) {
      return Ij(Hj(a, b), c, d);
    }
    function Ij(a, b, c) {
      for (var d,
          e = 0,
          f = a.length; e < f && !(d = b.call(c, a[e])); e++)
        ;
      return d;
    }
    k.clear = function() {
      this.b.clear();
      this.a = {};
    };
    k.D = function() {
      var a = this.b.data;
      return [a.da, a.fa, a.ba, a.ja];
    };
    function Kj(a, b) {
      qi.call(this, 0, b);
      this.l = new Yi(0, b);
      this.I = null;
      this.u = [];
      this.c = [];
      this.j = {
        fillColor: null,
        s: !1
      };
    }
    u(Kj, qi);
    function Lj(a, b, c, d) {
      var e = new sj,
          f = new Ej;
      b = Mj(a, b, d, e, f, !0);
      if (c.length) {
        var g,
            h,
            l = [];
        g = 0;
        for (h = c.length; g < h; ++g) {
          var m = {
            list: new sj,
            ba: void 0
          };
          l.push(m);
          m.ba = Mj(a, c[g], d, m.list, f, !1);
        }
        l.sort(function(a, b) {
          return b.ba - a.ba;
        });
        for (g = 0; g < l.length; ++g)
          Nj(l[g].list, l[g].ba, e, b, f);
      }
      Oj(e, f, !1);
      Pj(a, e, f);
    }
    function Mj(a, b, c, d, e, f) {
      var g,
          h,
          l = a.a.length / 2,
          m,
          p,
          n,
          q = [],
          r = [];
      if (f === Hf(b, 0, b.length, c))
        for (p = m = Qj(a, b[0], b[1], l++), f = b[0], g = c, h = b.length; g < h; g += c)
          n = Qj(a, b[g], b[g + 1], l++), r.push(Rj(p, n, d)), q.push([Math.min(p.x, n.x), Math.min(p.y, n.y), Math.max(p.x, n.x), Math.max(p.y, n.y)]), f = b[g] > f ? b[g] : f, p = n;
      else
        for (g = b.length - c, p = m = Qj(a, b[g], b[g + 1], l++), f = b[g], g -= c, h = 0; g >= h; g -= c)
          n = Qj(a, b[g], b[g + 1], l++), r.push(Rj(p, n, d)), q.push([Math.min(p.x, n.x), Math.min(p.y, n.y), Math.max(p.x, n.x), Math.max(p.y, n.y)]), f = b[g] > f ? b[g] : f, p = n;
      r.push(Rj(n, m, d));
      q.push([Math.min(p.x, n.x), Math.min(p.y, n.y), Math.max(p.x, n.x), Math.max(p.y, n.y)]);
      e.load(q, r);
      return f;
    }
    function Oj(a, b, c) {
      var d = uj(a),
          e = d,
          f = vj(a),
          g = !1;
      do {
        var h = c ? wi(f.W.x, f.W.y, e.W.x, e.W.y, e.aa.x, e.aa.y) : wi(e.aa.x, e.aa.y, e.W.x, e.W.y, f.W.x, f.W.y);
        void 0 === h ? (Sj(e, f, a, b), g = !0, f === d && (d = wj(a)), f = e, xj(a)) : e.W.vb !== h && (e.W.vb = h, g = !0);
        e = f;
        f = vj(a);
      } while (e !== d);
      return g;
    }
    function Nj(a, b, c, d, e) {
      Oj(a, e, !0);
      for (var f = uj(a); f.W.x !== b; )
        f = vj(a);
      b = f.W;
      d = {
        x: d,
        y: b.y,
        gb: -1
      };
      var g = Infinity,
          h,
          l,
          m,
          p;
      m = Tj({
        aa: b,
        W: d
      }, e, !0);
      h = 0;
      for (l = m.length; h < l; ++h) {
        var n = m[h];
        if (void 0 === n.aa.vb) {
          var q = Uj(b, d, n.aa, n.W, !0),
              r = Math.abs(b.x - q[0]);
          r < g && (g = r, p = {
            x: q[0],
            y: q[1],
            gb: -1
          }, f = n);
        }
      }
      if (Infinity !== g) {
        m = f.W;
        if (0 < g && (f = Vj(b, p, f.W, e), f.length))
          for (p = Infinity, h = 0, l = f.length; h < l; ++h)
            if (g = f[h], n = Math.atan2(b.y - g.y, d.x - g.x), n < p || n === p && g.x < m.x)
              p = n, m = g;
        for (f = uj(c); f.W !== m; )
          f = vj(c);
        d = {
          x: b.x,
          y: b.y,
          gb: b.gb,
          vb: void 0
        };
        h = {
          x: f.W.x,
          y: f.W.y,
          gb: f.W.gb,
          vb: void 0
        };
        wj(a).aa = d;
        Rj(b, f.W, a, e);
        Rj(h, d, a, e);
        f.W = h;
        a.i && a.b && (a.f = a.b, a.a = a.b.ub);
        c.concat(a);
      }
    }
    function Pj(a, b, c) {
      for (var d = !1,
          e = Wj(b, c); 3 < b.c; )
        if (e) {
          if (!Xj(a, b, c, e, d) && !Oj(b, c, d) && !Yj(a, b, c, !0))
            break;
        } else if (!Xj(a, b, c, e, d) && !Oj(b, c, d) && !Yj(a, b, c))
          if (e = Wj(b, c)) {
            var d = b,
                f = 2 * d.c,
                g = Array(f),
                h = uj(d),
                l = h,
                m = 0;
            do
              g[m++] = l.aa.x, g[m++] = l.aa.y, l = vj(d);
 while (l !== h);
            d = !Hf(g, 0, f, 2);
            Oj(b, c, d);
          } else {
            e = a;
            d = b;
            f = g = uj(d);
            do {
              h = Tj(f, c);
              if (h.length) {
                g = h[0];
                h = Uj(f.aa, f.W, g.aa, g.W);
                h = Qj(e, h[0], h[1], e.a.length / 2);
                l = new sj;
                m = new Ej;
                Rj(h, f.W, l, m);
                f.W = h;
                Fj(c, [Math.min(f.aa.x, h.x), Math.min(f.aa.y, h.y), Math.max(f.aa.x, h.x), Math.max(f.aa.y, h.y)], f);
                for (f = vj(d); f !== g; )
                  Rj(f.aa, f.W, l, m), c.remove(f), tj(d), f = zj(d);
                Rj(g.aa, h, l, m);
                g.aa = h;
                Fj(c, [Math.min(g.W.x, h.x), Math.min(g.W.y, h.y), Math.max(g.W.x, h.x), Math.max(g.W.y, h.y)], g);
                Oj(d, c, !1);
                Pj(e, d, c);
                Oj(l, m, !1);
                Pj(e, l, m);
                break;
              }
              f = vj(d);
            } while (f !== g);
            break;
          }
      3 === b.c && (e = a.b.length, a.b[e++] = yj(b).aa.gb, a.b[e++] = zj(b).aa.gb, a.b[e++] = wj(b).aa.gb);
    }
    function Xj(a, b, c, d, e) {
      var f = a.b.length,
          g = uj(b),
          h = yj(b),
          l = g,
          m = vj(b),
          p = wj(b),
          n,
          q,
          r,
          v = !1;
      do {
        n = l.aa;
        q = l.W;
        r = m.W;
        if (!1 === q.vb) {
          var x = e ? Zj(p.W, r, q, n, h.aa) : Zj(h.aa, n, q, r, p.W);
          !d && Tj({
            aa: n,
            W: r
          }, c).length || !x || Vj(n, q, r, c, !0).length || !d && !1 !== n.vb && !1 !== r.vb && Hf([h.aa.x, h.aa.y, n.x, n.y, q.x, q.y, r.x, r.y, p.W.x, p.W.y], 0, 10, 2) !== !e || (a.b[f++] = n.gb, a.b[f++] = q.gb, a.b[f++] = r.gb, Sj(l, m, b, c), m === g && (g = p), v = !0);
        }
        h = yj(b);
        l = zj(b);
        m = vj(b);
        p = wj(b);
      } while (l !== g && 3 < b.c);
      return v;
    }
    function Yj(a, b, c, d) {
      var e = uj(b);
      vj(b);
      var f = e,
          g = vj(b),
          h = !1;
      do {
        var l = Uj(f.aa, f.W, g.aa, g.W, d);
        if (l) {
          var m,
              h = a.b.length,
              p = a.a.length / 2,
              n = xj(b);
          tj(b);
          c.remove(n);
          m = n === e;
          d ? (l[0] === f.aa.x && l[1] === f.aa.y ? (xj(b), l = f.aa, g.aa = l, c.remove(f), m = m || f === e) : (l = g.W, f.W = l, c.remove(g), m = m || g === e), tj(b)) : (l = Qj(a, l[0], l[1], p), f.W = l, g.aa = l, Fj(c, [Math.min(f.aa.x, f.W.x), Math.min(f.aa.y, f.W.y), Math.max(f.aa.x, f.W.x), Math.max(f.aa.y, f.W.y)], f), Fj(c, [Math.min(g.aa.x, g.W.x), Math.min(g.aa.y, g.W.y), Math.max(g.aa.x, g.W.x), Math.max(g.aa.y, g.W.y)], g));
          a.b[h++] = n.aa.gb;
          a.b[h++] = n.W.gb;
          a.b[h++] = l.gb;
          h = !0;
          if (m)
            break;
        }
        f = yj(b);
        g = vj(b);
      } while (f !== e);
      return h;
    }
    function Wj(a, b) {
      var c = uj(a),
          d = c;
      do {
        if (Tj(d, b).length)
          return !1;
        d = vj(a);
      } while (d !== c);
      return !0;
    }
    function Qj(a, b, c, d) {
      var e = a.a.length;
      a.a[e++] = b;
      a.a[e++] = c;
      return {
        x: b,
        y: c,
        gb: d,
        vb: void 0
      };
    }
    function Rj(a, b, c, d) {
      var e = {
        aa: a,
        W: b
      },
          f = {
            ub: void 0,
            next: void 0,
            data: e
          },
          g = c.b;
      if (g) {
        var h = g.next;
        f.ub = g;
        f.next = h;
        g.next = f;
        h && (h.ub = f);
        g === c.a && (c.a = f);
      } else
        c.f = f, c.a = f, c.i && (f.next = f, f.ub = f);
      c.b = f;
      c.c++;
      d && d.Ea([Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.x, b.x), Math.max(a.y, b.y)], e);
      return e;
    }
    function Sj(a, b, c, d) {
      zj(c) === b && (tj(c), a.W = b.W, d.remove(b), Fj(d, [Math.min(a.aa.x, a.W.x), Math.min(a.aa.y, a.W.y), Math.max(a.aa.x, a.W.x), Math.max(a.aa.y, a.W.y)], a));
    }
    function Vj(a, b, c, d, e) {
      var f,
          g,
          h,
          l = [],
          m = Hj(d, [Math.min(a.x, b.x, c.x), Math.min(a.y, b.y, c.y), Math.max(a.x, b.x, c.x), Math.max(a.y, b.y, c.y)]);
      d = 0;
      for (f = m.length; d < f; ++d)
        for (g in m[d])
          h = m[d][g], "object" !== typeof h || e && !h.vb || h.x === a.x && h.y === a.y || h.x === b.x && h.y === b.y || h.x === c.x && h.y === c.y || -1 !== l.indexOf(h) || !Bf([a.x, a.y, b.x, b.y, c.x, c.y], 0, 6, 2, h.x, h.y) || l.push(h);
      return l;
    }
    function Tj(a, b, c) {
      var d = a.aa,
          e = a.W;
      b = Hj(b, [Math.min(d.x, e.x), Math.min(d.y, e.y), Math.max(d.x, e.x), Math.max(d.y, e.y)]);
      var f = [],
          g,
          h;
      g = 0;
      for (h = b.length; g < h; ++g) {
        var l = b[g];
        a !== l && (c || l.aa !== e || l.W !== d) && Uj(d, e, l.aa, l.W, c) && f.push(l);
      }
      return f;
    }
    function Uj(a, b, c, d, e) {
      var f = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
      if (f && (d = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / f, c = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / f, !e && d > xi && d < 1 - xi && c > xi && c < 1 - xi || e && 0 <= d && 1 >= d && 0 <= c && 1 >= c))
        return [a.x + d * (b.x - a.x), a.y + d * (b.y - a.y)];
    }
    function Zj(a, b, c, d, e) {
      if (void 0 === b.vb || void 0 === d.vb)
        return !1;
      var f = (c.x - d.x) * (b.y - d.y) > (c.y - d.y) * (b.x - d.x);
      e = (e.x - d.x) * (b.y - d.y) < (e.y - d.y) * (b.x - d.x);
      a = (a.x - b.x) * (d.y - b.y) > (a.y - b.y) * (d.x - b.x);
      c = (c.x - b.x) * (d.y - b.y) < (c.y - b.y) * (d.x - b.x);
      b = b.vb ? c || a : c && a;
      return (d.vb ? e || f : e && f) && b;
    }
    k = Kj.prototype;
    k.pc = function(a, b) {
      var c = a.Od(),
          d = a.sa(),
          e = this.b.length,
          f = this.l.b.length,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = c.length; g < h; ++g) {
        var p = c[g].jd();
        if (0 < p.length) {
          var n = p[0].ha(),
              n = ef(n, n.length, d, -this.origin[0], -this.origin[1]),
              q = [],
              r;
          l = 1;
          for (m = p.length; l < m; ++l)
            r = p[l].ha(), r = ef(r, r.length, d, -this.origin[0], -this.origin[1]), q.push(r);
          jj(this.l, n, q, d);
          Lj(this, n, q, d);
        }
      }
      this.b.length > e && (this.f.push(e), this.g.push(b), this.j.s && (this.c.push(e), this.j.s = !1));
      this.l.b.length > f && kj(this.l, b, f);
    };
    k.rc = function(a, b) {
      var c = a.jd(),
          d = a.sa();
      if (0 < c.length) {
        this.f.push(this.b.length);
        this.g.push(b);
        this.j.s && (this.c.push(this.b.length), this.j.s = !1);
        kj(this.l, b);
        var e = c[0].ha(),
            e = ef(e, e.length, d, -this.origin[0], -this.origin[1]),
            f = [],
            g,
            h,
            l;
        g = 1;
        for (h = c.length; g < h; ++g)
          l = c[g].ha(), l = ef(l, l.length, d, -this.origin[0], -this.origin[1]), f.push(l);
        jj(this.l, e, f, d);
        Lj(this, e, f, d);
      }
    };
    k.Bb = function(a) {
      this.v = new yi(this.a);
      this.o = new yi(this.b);
      this.f.push(this.b.length);
      this.l.Bb(a);
      !this.c.length && 0 < this.u.length && (this.u = []);
      this.b = this.a = null;
    };
    k.Cb = function(a) {
      var b = this.v,
          c = this.o,
          d = this.l.Cb(a);
      return function() {
        Bi(a, b);
        Bi(a, c);
        d();
      };
    };
    k.ff = function(a, b) {
      var c = Ci(b, nj, pj),
          d;
      this.I ? d = this.I : this.I = d = new qj(a, c);
      b.Rc(c);
      a.enableVertexAttribArray(d.b);
      a.vertexAttribPointer(d.b, 2, 5126, !1, 8, 0);
      return d;
    };
    k.gf = function(a, b) {
      a.disableVertexAttribArray(b.b);
    };
    k.Md = function(a, b, c, d) {
      var e = a.getParameter(a.DEPTH_FUNC),
          f = a.getParameter(a.DEPTH_WRITEMASK);
      d || (a.enable(a.DEPTH_TEST), a.depthMask(!0), a.depthFunc(a.NOTEQUAL));
      if (sb(c)) {
        var g,
            h,
            l;
        h = this.f[this.f.length - 1];
        for (c = this.c.length - 1; 0 <= c; --c)
          g = this.c[c], l = this.u[c], a.uniform4fv(this.I.G, l), si(a, b, g, h), h = g;
      } else {
        var m,
            p,
            n,
            q;
        n = this.f.length - 2;
        l = h = this.f[n + 1];
        for (g = this.c.length - 1; 0 <= g; --g) {
          m = this.u[g];
          a.uniform4fv(this.I.G, m);
          for (m = this.c[g]; 0 <= n && this.f[n] >= m; )
            q = this.f[n], p = this.g[n], p = w(p).toString(), c[p] && (h !== l && (si(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT)), l = q), n--, h = q;
          h !== l && (si(a, b, h, l), a.clear(a.DEPTH_BUFFER_BIT));
          h = l = m;
        }
      }
      d || (a.disable(a.DEPTH_TEST), a.clear(a.DEPTH_BUFFER_BIT), a.depthMask(f), a.depthFunc(e));
    };
    k.qe = function(a, b, c, d, e) {
      var f,
          g,
          h,
          l,
          m,
          p,
          n;
      n = this.f.length - 2;
      h = this.f[n + 1];
      for (f = this.c.length - 1; 0 <= f; --f)
        for (g = this.u[f], a.uniform4fv(this.I.G, g), l = this.c[f]; 0 <= n && this.f[n] >= l; ) {
          g = this.f[n];
          m = this.g[n];
          p = w(m).toString();
          if (void 0 === c[p] && m.U() && (void 0 === e || mb(e, m.U().D())) && (a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), si(a, b, g, h), h = d(m)))
            return h;
          n--;
          h = g;
        }
    };
    k.Na = function(a, b) {
      var c = a ? a.b : [0, 0, 0, 0];
      c instanceof CanvasGradient || c instanceof CanvasPattern ? c = ti : c = Qc(c).map(function(a, b) {
        return 3 != b ? a / 255 : a;
      }) || ti;
      this.j.fillColor && ia(c, this.j.fillColor) || (this.j.fillColor = c, this.j.s = !0, this.u.push(c));
      b ? this.l.Na(null, b) : this.l.Na(null, new rj({
        color: [0, 0, 0, 0],
        lineWidth: 0
      }));
    };
    function ak() {}
    ak.prototype.i = function() {};
    function bk(a, b, c) {
      this.g = b;
      this.l = a;
      this.c = c;
      this.a = {};
    }
    u(bk, fi);
    function ck(a, b) {
      var c = [],
          d;
      for (d in a.a) {
        var e = a.a[d],
            f;
        for (f in e)
          c.push(e[f].Cb(b));
      }
      return function() {
        for (var a = c.length,
            b,
            d = 0; d < a; d++)
          b = c[d].apply(this, arguments);
        return b;
      };
    }
    function dk(a, b) {
      for (var c in a.a) {
        var d = a.a[c],
            e;
        for (e in d)
          d[e].Bb(b);
      }
    }
    bk.prototype.b = function(a, b) {
      var c = void 0 !== a ? a.toString() : "0",
          d = this.a[c];
      void 0 === d && (d = {}, this.a[c] = d);
      c = d[b];
      void 0 === c && (c = new ek[b](this.l, this.g), d[b] = c);
      return c;
    };
    bk.prototype.f = function() {
      return sb(this.a);
    };
    bk.prototype.i = function(a, b, c, d, e, f, g, h) {
      var l = Object.keys(this.a).map(Number);
      l.sort(da);
      var m,
          p,
          n,
          q,
          r,
          v;
      m = 0;
      for (p = l.length; m < p; ++m)
        for (r = this.a[l[m].toString()], n = 0, q = ei.length; n < q; ++n)
          v = r[ei[n]], void 0 !== v && v.i(a, b, c, d, e, f, g, h, void 0, !1);
    };
    function fk(a, b, c, d, e, f, g, h, l, m, p) {
      var n = gk,
          q = Object.keys(a.a).map(Number);
      q.sort(function(a, b) {
        return b - a;
      });
      var r,
          v,
          x,
          y,
          z;
      r = 0;
      for (v = q.length; r < v; ++r)
        for (y = a.a[q[r].toString()], x = ei.length - 1; 0 <= x; --x)
          if (z = y[ei[x]], void 0 !== z && (z = z.i(b, c, d, e, n, f, g, h, l, m, p)))
            return z;
    }
    bk.prototype.Aa = function(a, b, c, d, e, f, g, h, l, m) {
      var p = b.b;
      p.bindFramebuffer(p.FRAMEBUFFER, Ki(b));
      var n;
      void 0 !== this.c && (n = Ka(Wa(a), d * this.c));
      return fk(this, b, a, d, e, g, h, l, function(a) {
        var b = new Uint8Array(4);
        p.readPixels(0, 0, 1, 1, p.RGBA, p.UNSIGNED_BYTE, b);
        if (0 < b[3] && (a = m(a)))
          return a;
      }, !0, n);
    };
    function hk(a, b, c, d, e, f, g, h) {
      var l = c.b;
      l.bindFramebuffer(l.FRAMEBUFFER, Ki(c));
      return void 0 !== fk(a, c, b, d, e, f, g, h, function() {
        var a = new Uint8Array(4);
        l.readPixels(0, 0, 1, 1, l.RGBA, l.UNSIGNED_BYTE, a);
        return 0 < a[3];
      }, !1);
    }
    var gk = [1, 1],
        ek = {
          Circle: Ai,
          Image: Pi,
          LineString: Yi,
          Polygon: Kj,
          Text: ak
        };
    function ik(a, b, c, d, e, f, g) {
      this.b = a;
      this.f = b;
      this.a = f;
      this.c = g;
      this.l = e;
      this.g = d;
      this.i = c;
      this.j = this.o = this.v = null;
    }
    u(ik, Rh);
    k = ik.prototype;
    k.pd = function(a) {
      this.Na(a.Ca(), a.Da());
      this.Vb(a.Z());
    };
    k.mc = function(a) {
      switch (a.T()) {
        case "Point":
          this.qc(a, null);
          break;
        case "LineString":
          this.Qb(a, null);
          break;
        case "Polygon":
          this.rc(a, null);
          break;
        case "MultiPoint":
          this.oc(a, null);
          break;
        case "MultiLineString":
          this.nc(a, null);
          break;
        case "MultiPolygon":
          this.pc(a, null);
          break;
        case "GeometryCollection":
          this.pe(a, null);
          break;
        case "Circle":
          this.$b(a, null);
      }
    };
    k.oe = function(a, b) {
      var c = (0, b.Ra)(a);
      c && mb(this.a, c.D()) && (this.pd(b), this.mc(c));
    };
    k.pe = function(a) {
      a = a.a;
      var b,
          c;
      b = 0;
      for (c = a.length; b < c; ++b)
        this.mc(a[b]);
    };
    k.qc = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "Image");
      d.Vb(this.v);
      d.qc(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.oc = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "Image");
      d.Vb(this.v);
      d.oc(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.Qb = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "LineString");
      d.Na(null, this.j);
      d.Qb(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.nc = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "LineString");
      d.Na(null, this.j);
      d.nc(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.rc = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "Polygon");
      d.Na(this.o, this.j);
      d.rc(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.pc = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "Polygon");
      d.Na(this.o, this.j);
      d.pc(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.$b = function(a, b) {
      var c = this.b,
          d = (new bk(1, this.a)).b(0, "Circle");
      d.Na(this.o, this.j);
      d.$b(a, b);
      d.Bb(c);
      d.i(this.b, this.f, this.i, this.g, this.l, this.c, 1, {}, void 0, !1);
      d.Cb(c)();
    };
    k.Vb = function(a) {
      this.v = a;
    };
    k.Na = function(a, b) {
      this.o = a;
      this.j = b;
    };
    function jk() {
      this.c = 0;
      this.b = {};
      this.f = this.a = null;
    }
    k = jk.prototype;
    k.clear = function() {
      this.c = 0;
      this.b = {};
      this.f = this.a = null;
    };
    k.forEach = function(a, b) {
      for (var c = this.a; c; )
        a.call(b, c.$c, c.tc, this), c = c.Lb;
    };
    k.get = function(a) {
      a = this.b[a];
      qa(!!a, 15);
      if (a === this.f)
        return a.$c;
      a === this.a ? (this.a = this.a.Lb, this.a.td = null) : (a.Lb.td = a.td, a.td.Lb = a.Lb);
      a.Lb = null;
      a.td = this.f;
      this.f = this.f.Lb = a;
      return a.$c;
    };
    k.pop = function() {
      var a = this.a;
      delete this.b[a.tc];
      a.Lb && (a.Lb.td = null);
      this.a = a.Lb;
      this.a || (this.f = null);
      --this.c;
      return a.$c;
    };
    k.replace = function(a, b) {
      this.get(a);
      this.b[a].$c = b;
    };
    k.set = function(a, b) {
      qa(!(a in this.b), 16);
      var c = {
        tc: a,
        Lb: null,
        td: this.f,
        $c: b
      };
      this.f ? this.f.Lb = c : this.a = c;
      this.f = c;
      this.b[a] = c;
      ++this.c;
    };
    function kk(a, b) {
      Hh.call(this, 0, b);
      this.b = document.createElement("CANVAS");
      this.b.style.width = "100%";
      this.b.style.height = "100%";
      this.b.style.display = "block";
      this.b.className = "ol-unselectable";
      a.insertBefore(this.b, a.childNodes[0] || null);
      this.u = this.A = 0;
      this.C = Xc();
      this.o = !0;
      this.f = Dd(this.b, {
        antialias: !0,
        depth: !0,
        failIfMajorPerformanceCaveat: !0,
        preserveDrawingBuffer: !1,
        stencil: !0
      });
      this.i = new Ji(this.b, this.f);
      B(this.b, "webglcontextlost", this.nn, this);
      B(this.b, "webglcontextrestored", this.pn, this);
      this.a = new jk;
      this.I = null;
      this.l = new Ae(function(a) {
        var b = a[1];
        a = a[2];
        var c = b[0] - this.I[0],
            b = b[1] - this.I[1];
        return 65536 * Math.log(a) + Math.sqrt(c * c + b * b) / a;
      }.bind(this), function(a) {
        return a[0].ib();
      });
      this.G = function() {
        if (this.l.b.length) {
          Ee(this.l);
          var a = Be(this.l);
          lk(this, a[0], a[3], a[4]);
        }
        return !1;
      }.bind(this);
      this.g = 0;
      mk(this);
    }
    u(kk, Hh);
    function lk(a, b, c, d) {
      var e = a.f,
          f = b.ib();
      if (a.a.b.hasOwnProperty(f))
        a = a.a.get(f), e.bindTexture(3553, a.Fb), 9729 != a.Bh && (e.texParameteri(3553, 10240, 9729), a.Bh = 9729), 9729 != a.Dh && (e.texParameteri(3553, 10241, 9729), a.Dh = 9729);
      else {
        var g = e.createTexture();
        e.bindTexture(3553, g);
        if (0 < d) {
          var h = a.C.canvas,
              l = a.C;
          a.A !== c[0] || a.u !== c[1] ? (h.width = c[0], h.height = c[1], a.A = c[0], a.u = c[1]) : l.clearRect(0, 0, c[0], c[1]);
          l.drawImage(b.Z(), d, d, c[0], c[1], 0, 0, c[0], c[1]);
          e.texImage2D(3553, 0, 6408, 6408, 5121, h);
        } else
          e.texImage2D(3553, 0, 6408, 6408, 5121, b.Z());
        e.texParameteri(3553, 10240, 9729);
        e.texParameteri(3553, 10241, 9729);
        e.texParameteri(3553, 10242, 33071);
        e.texParameteri(3553, 10243, 33071);
        a.a.set(f, {
          Fb: g,
          Bh: 9729,
          Dh: 9729
        });
      }
    }
    function nk(a, b, c) {
      var d = a.j;
      if (Ec(d, b)) {
        a = a.i;
        var e = c.viewState;
        d.b(new Mh(b, new ik(a, e.center, e.resolution, e.rotation, c.size, c.extent, c.pixelRatio), c, null, a));
      }
    }
    k = kk.prototype;
    k.ra = function() {
      var a = this.f;
      a.isContextLost() || this.a.forEach(function(b) {
        b && a.deleteTexture(b.Fb);
      });
      Ac(this.i);
      Hh.prototype.ra.call(this);
    };
    k.bk = function(a, b) {
      for (var c = this.f,
          d; 1024 < this.a.c - this.g; ) {
        if (d = this.a.a.$c)
          c.deleteTexture(d.Fb);
        else if (+this.a.a.tc == b.index)
          break;
        else
          --this.g;
        this.a.pop();
      }
    };
    k.T = function() {
      return "webgl";
    };
    k.nn = function(a) {
      a.preventDefault();
      this.a.clear();
      this.g = 0;
      a = this.c;
      for (var b in a)
        a[b].$f();
    };
    k.pn = function() {
      mk(this);
      this.j.render();
    };
    function mk(a) {
      a = a.f;
      a.activeTexture(33984);
      a.blendFuncSeparate(770, 771, 1, 771);
      a.disable(2884);
      a.disable(2929);
      a.disable(3089);
      a.disable(2960);
    }
    k.vg = function(a) {
      var b = this.i,
          c = this.f;
      if (c.isContextLost())
        return !1;
      if (!a)
        return this.o && (this.b.style.display = "none", this.o = !1), !1;
      this.I = a.focus;
      this.a.set((-a.index).toString(), null);
      ++this.g;
      nk(this, "precompose", a);
      var d = [],
          e = a.layerStatesArray;
      ja(e);
      var f = a.viewState.resolution,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = e.length; g < h; ++g)
        m = e[g], sh(m, f) && "ready" == m.Ui && (l = Kh(this, m.layer), l.ag(a, m, b) && d.push(m));
      e = a.size[0] * a.pixelRatio;
      f = a.size[1] * a.pixelRatio;
      if (this.b.width != e || this.b.height != f)
        this.b.width = e, this.b.height = f;
      c.bindFramebuffer(36160, null);
      c.clearColor(0, 0, 0, 0);
      c.clear(16384);
      c.enable(3042);
      c.viewport(0, 0, this.b.width, this.b.height);
      g = 0;
      for (h = d.length; g < h; ++g)
        m = d[g], l = Kh(this, m.layer), l.ai(a, m, b);
      this.o || (this.b.style.display = "", this.o = !0);
      Ih(a);
      1024 < this.a.c - this.g && a.postRenderFunctions.push(this.bk.bind(this));
      this.l.b.length && (a.postRenderFunctions.push(this.G), a.animate = !0);
      nk(this, "postcompose", a);
      Lh(this, a);
      a.postRenderFunctions.push(Jh);
    };
    k.Aa = function(a, b, c, d, e, f, g) {
      var h;
      if (this.f.isContextLost())
        return !1;
      var l = b.viewState,
          m = b.layerStatesArray,
          p;
      for (p = m.length - 1; 0 <= p; --p) {
        h = m[p];
        var n = h.layer;
        if (sh(h, l.resolution) && f.call(g, n) && (h = Kh(this, n).Aa(a, b, c, d, e)))
          return h;
      }
    };
    k.Zh = function(a, b, c, d, e) {
      c = !1;
      if (this.f.isContextLost())
        return !1;
      var f = b.viewState,
          g = b.layerStatesArray,
          h;
      for (h = g.length - 1; 0 <= h; --h) {
        var l = g[h],
            m = l.layer;
        if (sh(l, f.resolution) && d.call(e, m) && (c = Kh(this, m).Ke(a, b)))
          return !0;
      }
      return c;
    };
    k.Yh = function(a, b, c, d, e) {
      if (this.f.isContextLost())
        return !1;
      var f = b.viewState,
          g,
          h = b.layerStatesArray,
          l;
      for (l = h.length - 1; 0 <= l; --l) {
        g = h[l];
        var m = g.layer;
        if (sh(g, f.resolution) && e.call(d, m) && (g = Kh(this, m).Zf(a, b, c, d)))
          return g;
      }
    };
    var ok = ["canvas", "webgl"];
    function G(a) {
      Gc.call(this);
      var b = pk(a);
      this.rf = void 0 !== a.loadTilesWhileAnimating ? a.loadTilesWhileAnimating : !1;
      this.sf = void 0 !== a.loadTilesWhileInteracting ? a.loadTilesWhileInteracting : !1;
      this.xf = void 0 !== a.pixelRatio ? a.pixelRatio : Kd;
      this.pf = b.logos;
      this.ia = function() {
        this.g = void 0;
        this.hp.call(this, Date.now());
      }.bind(this);
      this.mb = wh();
      this.yf = wh();
      this.Bd = 0;
      this.a = null;
      this.lb = Ia();
      this.G = this.R = this.S = null;
      this.c = document.createElement("DIV");
      this.c.className = "ol-viewport" + (Pd ? " ol-touch" : "");
      this.c.style.position = "relative";
      this.c.style.overflow = "hidden";
      this.c.style.width = "100%";
      this.c.style.height = "100%";
      this.c.style.msTouchAction = "none";
      this.c.style.touchAction = "none";
      this.A = document.createElement("DIV");
      this.A.className = "ol-overlaycontainer";
      this.c.appendChild(this.A);
      this.u = document.createElement("DIV");
      this.u.className = "ol-overlaycontainer-stopevent";
      a = "click dblclick mousedown touchstart mspointerdown pointerdown mousewheel wheel".split(" ");
      for (var c = 0,
          d = a.length; c < d; ++c)
        B(this.u, a[c], Cc);
      this.c.appendChild(this.u);
      this.Ja = new xe(this);
      for (var e in Ad)
        B(this.Ja, Ad[e], this.uh, this);
      this.oa = b.keyboardEventTarget;
      this.v = null;
      B(this.c, "wheel", this.ld, this);
      B(this.c, "mousewheel", this.ld, this);
      this.j = b.controls;
      this.l = b.interactions;
      this.o = b.overlays;
      this.dg = {};
      this.C = new b.jp(this.c, this);
      this.Y = null;
      this.Oa = [];
      this.Ha = new Fe(this.Wk.bind(this), this.Cl.bind(this));
      this.ea = {};
      B(this, Ic("layergroup"), this.kl, this);
      B(this, Ic("view"), this.Dl, this);
      B(this, Ic("size"), this.zl, this);
      B(this, Ic("target"), this.Bl, this);
      this.H(b.values);
      this.j.forEach(function(a) {
        a.setMap(this);
      }, this);
      B(this.j, "add", function(a) {
        a.element.setMap(this);
      }, this);
      B(this.j, "remove", function(a) {
        a.element.setMap(null);
      }, this);
      this.l.forEach(function(a) {
        a.setMap(this);
      }, this);
      B(this.l, "add", function(a) {
        a.element.setMap(this);
      }, this);
      B(this.l, "remove", function(a) {
        a.element.setMap(null);
      }, this);
      this.o.forEach(this.Ug, this);
      B(this.o, "add", function(a) {
        this.Ug(a.element);
      }, this);
      B(this.o, "remove", function(a) {
        var b = a.element.g;
        void 0 !== b && delete this.dg[b.toString()];
        a.element.setMap(null);
      }, this);
    }
    u(G, Gc);
    k = G.prototype;
    k.Rj = function(a) {
      this.j.push(a);
    };
    k.Sj = function(a) {
      this.l.push(a);
    };
    k.Sg = function(a) {
      this.Jc().od().push(a);
    };
    k.Tg = function(a) {
      this.o.push(a);
    };
    k.Ug = function(a) {
      var b = a.g;
      void 0 !== b && (this.dg[b.toString()] = a);
      a.setMap(this);
    };
    k.ra = function() {
      Ac(this.Ja);
      Ac(this.C);
      xc(this.c, "wheel", this.ld, this);
      xc(this.c, "mousewheel", this.ld, this);
      this.i && (window.removeEventListener("resize", this.i, !1), this.i = void 0);
      this.g && (cancelAnimationFrame(this.g), this.g = void 0);
      this.Fe(null);
      Gc.prototype.ra.call(this);
    };
    k.re = function(a, b, c) {
      if (this.a)
        return a = this.Za(a), c = c ? c : {}, this.C.Aa(a, this.a, void 0 !== c.hitTolerance ? c.hitTolerance * this.a.pixelRatio : 0, b, null, c.layerFilter ? c.layerFilter : af, null);
    };
    k.pm = function(a, b, c, d, e) {
      if (this.a)
        return this.C.Yh(a, this.a, b, void 0 !== c ? c : null, d ? d : af, void 0 !== e ? e : null);
    };
    k.El = function(a, b) {
      if (!this.a)
        return !1;
      var c = this.Za(a);
      b = b ? b : {};
      return this.C.Zh(c, this.a, void 0 !== b.hitTolerance ? b.hitTolerance * this.a.pixelRatio : 0, b.layerFilter ? b.layerFilter : af, null);
    };
    k.sk = function(a) {
      return this.Za(this.te(a));
    };
    k.te = function(a) {
      var b = this.c.getBoundingClientRect();
      a = a.changedTouches ? a.changedTouches[0] : a;
      return [a.clientX - b.left, a.clientY - b.top];
    };
    k.Of = function() {
      return this.get("target");
    };
    k.Kc = function() {
      var a = this.Of();
      return void 0 !== a ? "string" === typeof a ? document.getElementById(a) : a : null;
    };
    k.Za = function(a) {
      var b = this.a;
      return b ? Bh(b.pixelToCoordinateTransform, a.slice()) : null;
    };
    k.qk = function() {
      return this.j;
    };
    k.Lk = function() {
      return this.o;
    };
    k.Kk = function(a) {
      a = this.dg[a.toString()];
      return void 0 !== a ? a : null;
    };
    k.xk = function() {
      return this.l;
    };
    k.Jc = function() {
      return this.get("layergroup");
    };
    k.Jh = function() {
      return this.Jc().od();
    };
    k.Ka = function(a) {
      var b = this.a;
      return b ? Bh(b.coordinateToPixelTransform, a.slice(0, 2)) : null;
    };
    k.Mb = function() {
      return this.get("size");
    };
    k.$ = function() {
      return this.get("view");
    };
    k.Yk = function() {
      return this.c;
    };
    k.Wk = function(a, b, c, d) {
      var e = this.a;
      if (!(e && b in e.wantedTiles && e.wantedTiles[b][a.ib()]))
        return Infinity;
      a = c[0] - e.focus[0];
      c = c[1] - e.focus[1];
      return 65536 * Math.log(d) + Math.sqrt(a * a + c * c) / d;
    };
    k.ld = function(a, b) {
      var c = new zd(b || a.type, this, a);
      this.uh(c);
    };
    k.uh = function(a) {
      if (this.a) {
        this.Y = a.coordinate;
        a.frameState = this.a;
        var b = this.l.a,
            c;
        if (!1 !== this.b(a))
          for (c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            if (d.c() && !d.handleEvent(a))
              break;
          }
      }
    };
    k.xl = function() {
      var a = this.a,
          b = this.Ha;
      if (b.b.length) {
        var c = 16,
            d = c;
        if (a) {
          var e = a.viewHints;
          e[0] && (c = this.rf ? 8 : 0, d = 2);
          e[1] && (c = this.sf ? 8 : 0, d = 2);
        }
        b.l < c && (Ee(b), Ge(b, c, d));
      }
      b = this.Oa;
      c = 0;
      for (d = b.length; c < d; ++c)
        b[c](this, a);
      b.length = 0;
    };
    k.zl = function() {
      this.render();
    };
    k.Bl = function() {
      var a;
      this.Of() && (a = this.Kc());
      if (this.v) {
        for (var b = 0,
            c = this.v.length; b < c; ++b)
          rc(this.v[b]);
        this.v = null;
      }
      a ? (a.appendChild(this.c), a = this.oa ? this.oa : a, this.v = [B(a, "keydown", this.ld, this), B(a, "keypress", this.ld, this)], this.i || (this.i = this.xd.bind(this), window.addEventListener("resize", this.i, !1))) : (Zc(this.c), this.i && (window.removeEventListener("resize", this.i, !1), this.i = void 0));
      this.xd();
    };
    k.Cl = function() {
      this.render();
    };
    k.xh = function() {
      this.render();
    };
    k.Dl = function() {
      this.S && (rc(this.S), this.S = null);
      this.R && (rc(this.R), this.R = null);
      var a = this.$();
      a && (this.c.setAttribute("data-view", w(a)), this.S = B(a, "propertychange", this.xh, this), this.R = B(a, "change", this.xh, this));
      this.render();
    };
    k.kl = function() {
      this.G && (this.G.forEach(rc), this.G = null);
      var a = this.Jc();
      a && (this.G = [B(a, "propertychange", this.render, this), B(a, "change", this.render, this)]);
      this.render();
    };
    k.ip = function() {
      this.g && cancelAnimationFrame(this.g);
      this.ia();
    };
    k.render = function() {
      void 0 === this.g && (this.g = requestAnimationFrame(this.ia));
    };
    k.ap = function(a) {
      return this.j.remove(a);
    };
    k.bp = function(a) {
      return this.l.remove(a);
    };
    k.ep = function(a) {
      return this.Jc().od().remove(a);
    };
    k.fp = function(a) {
      return this.o.remove(a);
    };
    k.hp = function(a) {
      var b,
          c,
          d = this.Mb(),
          e = this.$(),
          f = Ia(),
          g = null;
      if (void 0 !== d && 0 < d[0] && 0 < d[1] && e && Yf(e)) {
        var g = ld(e, this.a ? this.a.viewHints : void 0),
            h = this.Jc().Lf(),
            l = {};
        b = 0;
        for (c = h.length; b < c; ++b)
          l[w(h[b].layer)] = h[b];
        b = e.V();
        g = {
          animate: !1,
          attributions: {},
          coordinateToPixelTransform: this.mb,
          extent: f,
          focus: this.Y ? this.Y : b.center,
          index: this.Bd++,
          layerStates: l,
          layerStatesArray: h,
          logos: pb({}, this.pf),
          pixelRatio: this.xf,
          pixelToCoordinateTransform: this.yf,
          postRenderFunctions: [],
          size: d,
          skippedFeatureUids: this.ea,
          tileQueue: this.Ha,
          time: a,
          usedTiles: {},
          viewState: b,
          viewHints: g,
          wantedTiles: {}
        };
      }
      g && (g.extent = kb(b.center, b.resolution, b.rotation, g.size, f));
      this.a = g;
      this.C.vg(g);
      g && (g.animate && this.render(), Array.prototype.push.apply(this.Oa, g.postRenderFunctions), g.viewHints[0] || g.viewHints[1] || Za(g.extent, this.lb) || (this.b(new yd("moveend", this, g)), Na(g.extent, this.lb)));
      this.b(new yd("postrender", this, g));
      setTimeout(this.xl.bind(this), 0);
    };
    k.Li = function(a) {
      this.set("layergroup", a);
    };
    k.Ag = function(a) {
      this.set("size", a);
    };
    k.Fe = function(a) {
      this.set("target", a);
    };
    k.vp = function(a) {
      this.set("view", a);
    };
    k.Ti = function(a) {
      a = w(a).toString();
      this.ea[a] = !0;
      this.render();
    };
    k.xd = function() {
      var a = this.Kc();
      if (a) {
        var b = getComputedStyle(a);
        this.Ag([a.offsetWidth - parseFloat(b.borderLeftWidth) - parseFloat(b.paddingLeft) - parseFloat(b.paddingRight) - parseFloat(b.borderRightWidth), a.offsetHeight - parseFloat(b.borderTopWidth) - parseFloat(b.paddingTop) - parseFloat(b.paddingBottom) - parseFloat(b.borderBottomWidth)]);
      } else
        this.Ag(void 0);
    };
    k.Zi = function(a) {
      a = w(a).toString();
      delete this.ea[a];
      this.render();
    };
    function pk(a) {
      var b = null;
      void 0 !== a.keyboardEventTarget && (b = "string" === typeof a.keyboardEventTarget ? document.getElementById(a.keyboardEventTarget) : a.keyboardEventTarget);
      var c = {},
          d = {};
      if (void 0 === a.logo || "boolean" === typeof a.logo && a.logo)
        d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"] = "https://openlayers.org/";
      else {
        var e = a.logo;
        "string" === typeof e ? d[e] = "" : e instanceof HTMLElement ? d[w(e).toString()] = e : e && (qa("string" == typeof e.href, 44), qa("string" == typeof e.src, 45), d[e.src] = e.href);
      }
      e = a.layers instanceof fh ? a.layers : new fh({layers: a.layers});
      c.layergroup = e;
      c.target = a.target;
      c.view = void 0 !== a.view ? a.view : new Qf;
      var e = Hh,
          f;
      void 0 !== a.renderer ? (Array.isArray(a.renderer) ? f = a.renderer : "string" === typeof a.renderer ? f = [a.renderer] : qa(!1, 46), 0 <= f.indexOf("dom") && (f = f.concat(ok))) : f = ok;
      var g,
          h;
      g = 0;
      for (h = f.length; g < h; ++g) {
        var l = f[g];
        if ("canvas" == l) {
          if (Md) {
            e = ci;
            break;
          }
        } else if ("webgl" == l && Ed) {
          e = kk;
          break;
        }
      }
      void 0 !== a.controls ? Array.isArray(a.controls) ? f = new D(a.controls.slice()) : (qa(a.controls instanceof D, 47), f = a.controls) : f = nd();
      void 0 !== a.interactions ? Array.isArray(a.interactions) ? g = new D(a.interactions.slice()) : (qa(a.interactions instanceof D, 48), g = a.interactions) : g = ch();
      void 0 !== a.overlays ? Array.isArray(a.overlays) ? a = new D(a.overlays.slice()) : (qa(a.overlays instanceof D, 49), a = a.overlays) : a = new D;
      return {
        controls: f,
        interactions: g,
        keyboardEventTarget: b,
        logos: d,
        overlays: a,
        jp: e,
        values: c
      };
    }
    qh();
    function qk(a) {
      Gc.call(this);
      this.g = a.id;
      this.o = void 0 !== a.insertFirst ? a.insertFirst : !0;
      this.v = void 0 !== a.stopEvent ? a.stopEvent : !0;
      this.c = document.createElement("DIV");
      this.c.className = "ol-overlay-container";
      this.c.style.position = "absolute";
      this.autoPan = void 0 !== a.autoPan ? a.autoPan : !1;
      this.l = a.autoPanAnimation || {};
      this.j = void 0 !== a.autoPanMargin ? a.autoPanMargin : 20;
      this.a = {
        me: "",
        Ce: "",
        bf: "",
        kf: "",
        visible: !0
      };
      this.i = null;
      B(this, Ic(rk), this.fl, this);
      B(this, Ic(sk), this.pl, this);
      B(this, Ic(tk), this.tl, this);
      B(this, Ic(uk), this.vl, this);
      B(this, Ic(vk), this.wl, this);
      void 0 !== a.element && this.Gi(a.element);
      this.Ni(void 0 !== a.offset ? a.offset : [0, 0]);
      this.Qi(void 0 !== a.positioning ? a.positioning : "top-left");
      void 0 !== a.position && this.Wf(a.position);
    }
    u(qk, Gc);
    k = qk.prototype;
    k.se = function() {
      return this.get(rk);
    };
    k.qm = function() {
      return this.g;
    };
    k.Ge = function() {
      return this.get(sk);
    };
    k.qh = function() {
      return this.get(tk);
    };
    k.Kh = function() {
      return this.get(uk);
    };
    k.rh = function() {
      return this.get(vk);
    };
    k.fl = function() {
      for (var a = this.c; a.lastChild; )
        a.removeChild(a.lastChild);
      (a = this.se()) && this.c.appendChild(a);
    };
    k.pl = function() {
      this.i && (Zc(this.c), rc(this.i), this.i = null);
      var a = this.Ge();
      a && (this.i = B(a, "postrender", this.render, this), wk(this), a = this.v ? a.u : a.A, this.o ? a.insertBefore(this.c, a.childNodes[0] || null) : a.appendChild(this.c));
    };
    k.render = function() {
      wk(this);
    };
    k.tl = function() {
      wk(this);
    };
    k.vl = function() {
      wk(this);
      if (this.get(uk) && this.autoPan) {
        var a = this.Ge();
        if (a && a.Kc()) {
          var b = xk(a.Kc(), a.Mb()),
              c = this.se(),
              d = c.offsetWidth,
              e = c.currentStyle || getComputedStyle(c),
              d = d + (parseInt(e.marginLeft, 10) + parseInt(e.marginRight, 10)),
              e = c.offsetHeight,
              f = c.currentStyle || getComputedStyle(c),
              e = e + (parseInt(f.marginTop, 10) + parseInt(f.marginBottom, 10)),
              g = xk(c, [d, e]),
              c = this.j;
          Ta(b, g) || (d = g[0] - b[0], e = b[2] - g[2], f = g[1] - b[1], g = b[3] - g[3], b = [0, 0], 0 > d ? b[0] = d - c : 0 > e && (b[0] = Math.abs(e) + c), 0 > f ? b[1] = f - c : 0 > g && (b[1] = Math.abs(g) + c), 0 === b[0] && 0 === b[1]) || (c = a.$().Ba(), c = a.Ka(c), b = [c[0] + b[0], c[1] + b[1]], a.$().animate({
            center: a.Za(b),
            duration: this.l.duration,
            easing: this.l.easing
          }));
        }
      }
    };
    k.wl = function() {
      wk(this);
    };
    k.Gi = function(a) {
      this.set(rk, a);
    };
    k.setMap = function(a) {
      this.set(sk, a);
    };
    k.Ni = function(a) {
      this.set(tk, a);
    };
    k.Wf = function(a) {
      this.set(uk, a);
    };
    function xk(a, b) {
      var c = a.getBoundingClientRect(),
          d = c.left + window.pageXOffset,
          c = c.top + window.pageYOffset;
      return [d, c, d + b[0], c + b[1]];
    }
    k.Qi = function(a) {
      this.set(vk, a);
    };
    function yk(a, b) {
      a.a.visible !== b && (a.c.style.display = b ? "" : "none", a.a.visible = b);
    }
    function wk(a) {
      var b = a.Ge(),
          c = a.Kh();
      if (b && b.a && c) {
        var c = b.Ka(c),
            d = b.Mb(),
            b = a.c.style,
            e = a.qh(),
            f = a.rh(),
            g = e[0],
            e = e[1];
        if ("bottom-right" == f || "center-right" == f || "top-right" == f)
          "" !== a.a.Ce && (a.a.Ce = b.left = ""), g = Math.round(d[0] - c[0] - g) + "px", a.a.bf != g && (a.a.bf = b.right = g);
        else {
          "" !== a.a.bf && (a.a.bf = b.right = "");
          if ("bottom-center" == f || "center-center" == f || "top-center" == f)
            g -= a.c.offsetWidth / 2;
          g = Math.round(c[0] + g) + "px";
          a.a.Ce != g && (a.a.Ce = b.left = g);
        }
        if ("bottom-left" == f || "bottom-center" == f || "bottom-right" == f)
          "" !== a.a.kf && (a.a.kf = b.top = ""), c = Math.round(d[1] - c[1] - e) + "px", a.a.me != c && (a.a.me = b.bottom = c);
        else {
          "" !== a.a.me && (a.a.me = b.bottom = "");
          if ("center-left" == f || "center-center" == f || "center-right" == f)
            e -= a.c.offsetHeight / 2;
          c = Math.round(c[1] + e) + "px";
          a.a.kf != c && (a.a.kf = b.top = c);
        }
        yk(a, !0);
      } else
        yk(a, !1);
    }
    var rk = "element",
        sk = "map",
        tk = "offset",
        uk = "position",
        vk = "positioning";
    function zk(a) {
      a = a ? a : {};
      this.l = void 0 !== a.collapsed ? a.collapsed : !0;
      this.j = void 0 !== a.collapsible ? a.collapsible : !0;
      this.j || (this.l = !1);
      var b = void 0 !== a.className ? a.className : "ol-overviewmap",
          c = void 0 !== a.tipLabel ? a.tipLabel : "Overview map",
          d = void 0 !== a.collapseLabel ? a.collapseLabel : "\u00ab";
      "string" === typeof d ? (this.o = document.createElement("span"), this.o.textContent = d) : this.o = d;
      d = void 0 !== a.label ? a.label : "\u00bb";
      "string" === typeof d ? (this.u = document.createElement("span"), this.u.textContent = d) : this.u = d;
      var e = this.j && !this.l ? this.o : this.u,
          d = document.createElement("button");
      d.setAttribute("type", "button");
      d.title = c;
      d.appendChild(e);
      B(d, "click", this.Em, this);
      this.C = document.createElement("DIV");
      this.C.className = "ol-overviewmap-map";
      var f = this.c = new G({
        controls: new D,
        interactions: new D,
        view: a.view
      });
      a.layers && a.layers.forEach(function(a) {
        f.Sg(a);
      }, this);
      c = document.createElement("DIV");
      c.className = "ol-overviewmap-box";
      c.style.boxSizing = "border-box";
      this.A = new qk({
        position: [0, 0],
        positioning: "bottom-left",
        element: c
      });
      this.c.Tg(this.A);
      c = document.createElement("div");
      c.className = b + " ol-unselectable ol-control" + (this.l && this.j ? " ol-collapsed" : "") + (this.j ? "" : " ol-uncollapsible");
      c.appendChild(this.C);
      c.appendChild(d);
      ad.call(this, {
        element: c,
        render: a.render ? a.render : Ak,
        target: a.target
      });
    }
    u(zk, ad);
    k = zk.prototype;
    k.setMap = function(a) {
      var b = this.a;
      a !== b && (b && ((b = b.$()) && xc(b, Ic("rotation"), this.Ae, this), this.c.Fe(null)), ad.prototype.setMap.call(this, a), a && (this.c.Fe(this.C), this.v.push(B(a, "propertychange", this.ql, this)), this.c.Jh().ec() || this.c.Li(a.Jc()), a = a.$())) && (B(a, Ic("rotation"), this.Ae, this), Yf(a) && (this.c.xd(), Bk(this)));
    };
    k.ql = function(a) {
      "view" === a.key && ((a = a.oldValue) && xc(a, Ic("rotation"), this.Ae, this), a = this.a.$(), B(a, Ic("rotation"), this.Ae, this));
    };
    k.Ae = function() {
      this.c.$().He(this.a.$().Va());
    };
    function Ak() {
      var a = this.a,
          b = this.c;
      if (a.a && b.a) {
        var c = a.Mb(),
            a = a.$().ed(c),
            d = b.Mb(),
            c = b.$().ed(d),
            e = b.Ka(eb(a)),
            f = b.Ka(cb(a)),
            b = Math.abs(e[0] - f[0]),
            e = Math.abs(e[1] - f[1]),
            f = d[0],
            d = d[1];
        b < .1 * f || e < .1 * d || b > .75 * f || e > .75 * d ? Bk(this) : Ta(c, a) || (a = this.c, c = this.a.$(), a.$().wb(c.Ba()));
      }
      Ck(this);
    }
    function Bk(a) {
      var b = a.a;
      a = a.c;
      var c = b.Mb(),
          b = b.$().ed(c);
      a = a.$();
      nb(b, 1 / (.1 * Math.pow(2, Math.log(7.5) / Math.LN2 / 2)));
      a.Ff(b);
    }
    function Ck(a) {
      var b = a.a,
          c = a.c;
      if (b.a && c.a) {
        var d = b.Mb(),
            e = b.$(),
            f = c.$(),
            c = e.Va(),
            b = a.A,
            g = a.A.se(),
            h = e.ed(d),
            d = f.Ua(),
            e = bb(h),
            f = db(h),
            l;
        if (a = a.a.$().Ba())
          l = [e[0] - a[0], e[1] - a[1]], Ve(l, c), Qe(l, a);
        b.Wf(l);
        g && (g.style.width = Math.abs((e[0] - f[0]) / d) + "px", g.style.height = Math.abs((f[1] - e[1]) / d) + "px");
      }
    }
    k.Em = function(a) {
      a.preventDefault();
      Dk(this);
    };
    function Dk(a) {
      a.element.classList.toggle("ol-collapsed");
      a.l ? Yc(a.o, a.u) : Yc(a.u, a.o);
      a.l = !a.l;
      var b = a.c;
      a.l || b.a || (b.xd(), Bk(a), wc(b, "postrender", function() {
        Ck(this);
      }, a));
    }
    k.Dm = function() {
      return this.j;
    };
    k.Gm = function(a) {
      this.j !== a && (this.j = a, this.element.classList.toggle("ol-uncollapsible"), !a && this.l && Dk(this));
    };
    k.Fm = function(a) {
      this.j && this.l !== a && Dk(this);
    };
    k.Cm = function() {
      return this.l;
    };
    k.Mk = function() {
      return this.c;
    };
    function Ek(a) {
      a = a ? a : {};
      var b = void 0 !== a.className ? a.className : "ol-scale-line";
      this.j = document.createElement("DIV");
      this.j.className = b + "-inner";
      this.c = document.createElement("DIV");
      this.c.className = b + " ol-unselectable";
      this.c.appendChild(this.j);
      this.u = null;
      this.o = void 0 !== a.minWidth ? a.minWidth : 64;
      this.l = !1;
      this.C = void 0;
      this.A = "";
      ad.call(this, {
        element: this.c,
        render: a.render ? a.render : Fk,
        target: a.target
      });
      B(this, Ic(Gk), this.R, this);
      this.G(a.units || "metric");
    }
    u(Ek, ad);
    var Hk = [1, 2, 5];
    Ek.prototype.Jb = function() {
      return this.get(Gk);
    };
    function Fk(a) {
      (a = a.frameState) ? this.u = a.viewState : this.u = null;
      Ik(this);
    }
    Ek.prototype.R = function() {
      Ik(this);
    };
    Ek.prototype.G = function(a) {
      this.set(Gk, a);
    };
    function Ik(a) {
      var b = a.u;
      if (b) {
        var c = b.projection,
            d = c.sc(),
            b = Eb(c, b.resolution, b.center) * d,
            d = a.o * b,
            c = "",
            e = a.Jb();
        "degrees" == e ? (c = vb.degrees, b /= c, d < c / 60 ? (c = "\u2033", b *= 3600) : d < c ? (c = "\u2032", b *= 60) : c = "\u00b0") : "imperial" == e ? .9144 > d ? (c = "in", b /= .0254) : 1609.344 > d ? (c = "ft", b /= .3048) : (c = "mi", b /= 1609.344) : "nautical" == e ? (b /= 1852, c = "nm") : "metric" == e ? 1 > d ? (c = "mm", b *= 1E3) : 1E3 > d ? c = "m" : (c = "km", b /= 1E3) : "us" == e ? .9144 > d ? (c = "in", b *= 39.37) : 1609.344 > d ? (c = "ft", b /= .30480061) : (c = "mi", b /= 1609.3472) : qa(!1, 33);
        for (var e = 3 * Math.floor(Math.log(a.o * b) / Math.log(10)),
            f; ; ) {
          f = Hk[(e % 3 + 3) % 3] * Math.pow(10, Math.floor(e / 3));
          d = Math.round(f / b);
          if (isNaN(d)) {
            a.c.style.display = "none";
            a.l = !1;
            return;
          }
          if (d >= a.o)
            break;
          ++e;
        }
        b = f + " " + c;
        a.A != b && (a.j.innerHTML = b, a.A = b);
        a.C != d && (a.j.style.width = d + "px", a.C = d);
        a.l || (a.c.style.display = "", a.l = !0);
      } else
        a.l && (a.c.style.display = "none", a.l = !1);
    }
    var Gk = "units";
    function Jk(a) {
      a = a ? a : {};
      this.c = void 0;
      this.l = Kk;
      this.A = this.o = 0;
      this.R = null;
      this.ea = !1;
      this.Y = void 0 !== a.duration ? a.duration : 200;
      var b = void 0 !== a.className ? a.className : "ol-zoomslider",
          c = document.createElement("button");
      c.setAttribute("type", "button");
      c.className = b + "-thumb ol-unselectable";
      var d = document.createElement("div");
      d.className = b + " ol-unselectable ol-control";
      d.appendChild(c);
      this.j = new re(d);
      B(this.j, "pointerdown", this.el, this);
      B(this.j, "pointermove", this.cl, this);
      B(this.j, "pointerup", this.dl, this);
      B(d, "click", this.bl, this);
      B(c, "click", Cc);
      ad.call(this, {
        element: d,
        render: a.render ? a.render : Lk
      });
    }
    u(Jk, ad);
    Jk.prototype.ra = function() {
      Ac(this.j);
      ad.prototype.ra.call(this);
    };
    var Kk = 0;
    k = Jk.prototype;
    k.setMap = function(a) {
      ad.prototype.setMap.call(this, a);
      a && a.render();
    };
    function Lk(a) {
      if (a.frameState) {
        if (!this.ea) {
          var b = this.element,
              c = b.offsetWidth,
              d = b.offsetHeight,
              e = b.firstElementChild,
              f = getComputedStyle(e),
              b = e.offsetWidth + parseFloat(f.marginRight) + parseFloat(f.marginLeft),
              e = e.offsetHeight + parseFloat(f.marginTop) + parseFloat(f.marginBottom);
          this.R = [b, e];
          c > d ? (this.l = 1, this.A = c - b) : (this.l = Kk, this.o = d - e);
          this.ea = !0;
        }
        a = a.frameState.viewState.resolution;
        a !== this.c && (this.c = a, Mk(this, a));
      }
    }
    k.bl = function(a) {
      var b = this.a.$();
      a = Nk(this, wa(1 === this.l ? (a.offsetX - this.R[0] / 2) / this.A : (a.offsetY - this.R[1] / 2) / this.o, 0, 1));
      b.animate({
        resolution: b.constrainResolution(a),
        duration: this.Y,
        easing: fd
      });
    };
    k.el = function(a) {
      this.u || a.b.target !== this.element.firstElementChild || (Rf(this.a.$(), 1, 1), this.C = a.clientX, this.G = a.clientY, this.u = !0);
    };
    k.cl = function(a) {
      if (this.u) {
        var b = this.element.firstElementChild;
        this.c = Nk(this, wa(1 === this.l ? (a.clientX - this.C + parseInt(b.style.left, 10)) / this.A : (a.clientY - this.G + parseInt(b.style.top, 10)) / this.o, 0, 1));
        this.a.$().Xc(this.c);
        Mk(this, this.c);
        this.C = a.clientX;
        this.G = a.clientY;
      }
    };
    k.dl = function() {
      if (this.u) {
        var a = this.a.$();
        Rf(a, 1, -1);
        a.animate({
          resolution: a.constrainResolution(this.c),
          duration: this.Y,
          easing: fd
        });
        this.u = !1;
        this.G = this.C = void 0;
      }
    };
    function Mk(a, b) {
      var c;
      c = 1 - Xf(a.a.$())(b);
      var d = a.element.firstElementChild;
      1 == a.l ? d.style.left = a.A * c + "px" : d.style.top = a.o * c + "px";
    }
    function Nk(a, b) {
      return Wf(a.a.$())(1 - b);
    }
    ;
    function Ok(a) {
      a = a ? a : {};
      this.c = a.extent ? a.extent : null;
      var b = void 0 !== a.className ? a.className : "ol-zoom-extent",
          c = void 0 !== a.label ? a.label : "E",
          d = void 0 !== a.tipLabel ? a.tipLabel : "Fit to extent",
          e = document.createElement("button");
      e.setAttribute("type", "button");
      e.title = d;
      e.appendChild("string" === typeof c ? document.createTextNode(c) : c);
      B(e, "click", this.l, this);
      c = document.createElement("div");
      c.className = b + " ol-unselectable ol-control";
      c.appendChild(e);
      ad.call(this, {
        element: c,
        target: a.target
      });
    }
    u(Ok, ad);
    Ok.prototype.l = function(a) {
      a.preventDefault();
      a = this.a.$();
      var b = this.c ? this.c : a.o.D();
      a.Ff(b);
    };
    function Pk(a) {
      Gc.call(this);
      a = a ? a : {};
      this.a = null;
      B(this, Ic(Qk), this.cm, this);
      this.Uf(void 0 !== a.tracking ? a.tracking : !1);
    }
    u(Pk, Gc);
    k = Pk.prototype;
    k.ra = function() {
      this.Uf(!1);
      Gc.prototype.ra.call(this);
    };
    k.qo = function(a) {
      if (null !== a.alpha) {
        var b = Ba(a.alpha);
        this.set(Rk, b);
        "boolean" === typeof a.absolute && a.absolute ? this.set(Sk, b) : "number" === typeof a.webkitCompassHeading && -1 != a.webkitCompassAccuracy && this.set(Sk, Ba(a.webkitCompassHeading));
      }
      null !== a.beta && this.set(Tk, Ba(a.beta));
      null !== a.gamma && this.set(Uk, Ba(a.gamma));
      this.s();
    };
    k.jk = function() {
      return this.get(Rk);
    };
    k.mk = function() {
      return this.get(Tk);
    };
    k.uk = function() {
      return this.get(Uk);
    };
    k.bm = function() {
      return this.get(Sk);
    };
    k.Fh = function() {
      return this.get(Qk);
    };
    k.cm = function() {
      if (Nd) {
        var a = this.Fh();
        a && !this.a ? this.a = B(window, "deviceorientation", this.qo, this) : a || null === this.a || (rc(this.a), this.a = null);
      }
    };
    k.Uf = function(a) {
      this.set(Qk, a);
    };
    var Rk = "alpha",
        Tk = "beta",
        Uk = "gamma",
        Sk = "heading",
        Qk = "tracking";
    function Vk(a) {
      this.g = a.opacity;
      this.o = a.rotateWithView;
      this.l = a.rotation;
      this.c = a.scale;
      this.v = a.snapToPixel;
    }
    k = Vk.prototype;
    k.Pe = function() {
      return this.g;
    };
    k.Qe = function() {
      return this.o;
    };
    k.Re = function() {
      return this.l;
    };
    k.Se = function() {
      return this.c;
    };
    k.ve = function() {
      return this.v;
    };
    k.rd = function(a) {
      this.g = a;
    };
    k.Te = function(a) {
      this.l = a;
    };
    k.sd = function(a) {
      this.c = a;
    };
    function Wk(a) {
      this.A = this.I = this.i = null;
      this.Wa = void 0 !== a.fill ? a.fill : null;
      this.qa = [0, 0];
      this.b = a.points;
      this.a = void 0 !== a.radius ? a.radius : a.radius1;
      this.f = void 0 !== a.radius2 ? a.radius2 : this.a;
      this.j = void 0 !== a.angle ? a.angle : 0;
      this.Ya = void 0 !== a.stroke ? a.stroke : null;
      this.G = this.ta = this.C = null;
      this.u = a.atlasManager;
      Xk(this, this.u);
      Vk.call(this, {
        opacity: 1,
        rotateWithView: void 0 !== a.rotateWithView ? a.rotateWithView : !1,
        rotation: void 0 !== a.rotation ? a.rotation : 0,
        scale: 1,
        snapToPixel: void 0 !== a.snapToPixel ? a.snapToPixel : !0
      });
    }
    u(Wk, Vk);
    k = Wk.prototype;
    k.clone = function() {
      var a = new Wk({
        fill: this.Ca() ? this.Ca().clone() : void 0,
        points: this.f !== this.a ? this.b / 2 : this.b,
        radius: this.a,
        radius2: this.f,
        angle: this.j,
        snapToPixel: this.v,
        stroke: this.Da() ? this.Da().clone() : void 0,
        rotation: this.l,
        rotateWithView: this.o,
        atlasManager: this.u
      });
      a.rd(this.g);
      a.sd(this.c);
      return a;
    };
    k.Hc = function() {
      return this.C;
    };
    k.ki = function() {
      return this.j;
    };
    k.Ca = function() {
      return this.Wa;
    };
    k.cg = function() {
      return this.A;
    };
    k.Z = function() {
      return this.I;
    };
    k.ue = function() {
      return this.G;
    };
    k.Oe = function() {
      return 2;
    };
    k.Pc = function() {
      return this.qa;
    };
    k.li = function() {
      return this.b;
    };
    k.mi = function() {
      return this.a;
    };
    k.sh = function() {
      return this.f;
    };
    k.jc = function() {
      return this.ta;
    };
    k.Da = function() {
      return this.Ya;
    };
    k.zh = function() {};
    k.load = function() {};
    k.Yi = function() {};
    function Xk(a, b) {
      var c,
          d = "",
          e = "",
          f = 0,
          g = null,
          h,
          l = 0;
      a.Ya && (h = Vc(a.Ya.a), l = a.Ya.c, void 0 === l && (l = 1), g = a.Ya.f, Ld || (g = null), e = a.Ya.l, void 0 === e && (e = "round"), d = a.Ya.i, void 0 === d && (d = "round"), f = a.Ya.j, void 0 === f && (f = 10));
      var m = 2 * (a.a + l) + 1,
          d = {
            strokeStyle: h,
            Vi: l,
            size: m,
            lineCap: d,
            lineDash: g,
            lineJoin: e,
            miterLimit: f
          };
      void 0 === b ? (e = Xc(m, m), a.I = e.canvas, c = m = a.I.width, a.ah(d, e, 0, 0), a.Wa ? a.A = a.I : (e = Xc(d.size, d.size), a.A = e.canvas, a.$g(d, e, 0, 0))) : (m = Math.round(m), (e = !a.Wa) && (c = a.$g.bind(a, d)), a.Ya ? (f = a.Ya, void 0 === f.b && (f.b = "s", f.b = f.a ? "string" === typeof f.a ? f.b + f.a : f.b + w(f.a).toString() : f.b + "-", f.b += "," + (void 0 !== f.i ? f.i.toString() : "-") + "," + (f.f ? f.f.toString() : "-") + "," + (void 0 !== f.g ? f.g : "-") + "," + (void 0 !== f.l ? f.l : "-") + "," + (void 0 !== f.j ? f.j.toString() : "-") + "," + (void 0 !== f.c ? f.c.toString() : "-")), f = f.b) : f = "-", a.Wa ? (g = a.Wa, void 0 === g.a && (g.a = g.b instanceof CanvasPattern || g.b instanceof CanvasGradient ? w(g.b).toString() : "f" + (g.b ? Sc(g.b) : "-")), g = g.a) : g = "-", a.i && f == a.i[1] && g == a.i[2] && a.a == a.i[3] && a.f == a.i[4] && a.j == a.i[5] && a.b == a.i[6] || (a.i = ["r" + f + g + (void 0 !== a.a ? a.a.toString() : "-") + (void 0 !== a.f ? a.f.toString() : "-") + (void 0 !== a.j ? a.j.toString() : "-") + (void 0 !== a.b ? a.b.toString() : "-"), f, g, a.a, a.f, a.j, a.b]), d = b.add(a.i[0], m, m, a.ah.bind(a, d), c), a.I = d.image, a.qa = [d.offsetX, d.offsetY], c = d.image.width, a.A = e ? d.Fl : a.I);
      a.C = [m / 2, m / 2];
      a.ta = [m, m];
      a.G = [c, c];
    }
    k.ah = function(a, b, c, d) {
      var e;
      b.setTransform(1, 0, 0, 1, 0, 0);
      b.translate(c, d);
      b.beginPath();
      if (Infinity === this.b)
        b.arc(a.size / 2, a.size / 2, this.a, 0, 2 * Math.PI, !0);
      else
        for (this.f !== this.a && (this.b *= 2), c = 0; c <= this.b; c++)
          d = 2 * c * Math.PI / this.b - Math.PI / 2 + this.j, e = c % 2 ? this.f : this.a, b.lineTo(a.size / 2 + e * Math.cos(d), a.size / 2 + e * Math.sin(d));
      this.Wa && (b.fillStyle = Vc(this.Wa.b), b.fill());
      this.Ya && (b.strokeStyle = a.strokeStyle, b.lineWidth = a.Vi, a.lineDash && b.setLineDash(a.lineDash), b.lineCap = a.lineCap, b.lineJoin = a.lineJoin, b.miterLimit = a.miterLimit, b.stroke());
      b.closePath();
    };
    k.$g = function(a, b, c, d) {
      b.setTransform(1, 0, 0, 1, 0, 0);
      b.translate(c, d);
      b.beginPath();
      if (Infinity === this.b)
        b.arc(a.size / 2, a.size / 2, this.a, 0, 2 * Math.PI, !0);
      else {
        this.f !== this.a && (this.b *= 2);
        var e;
        for (c = 0; c <= this.b; c++)
          e = 2 * c * Math.PI / this.b - Math.PI / 2 + this.j, d = c % 2 ? this.f : this.a, b.lineTo(a.size / 2 + d * Math.cos(e), a.size / 2 + d * Math.sin(e));
      }
      b.fillStyle = Nh;
      b.fill();
      this.Ya && (b.strokeStyle = a.strokeStyle, b.lineWidth = a.Vi, a.lineDash && b.setLineDash(a.lineDash), b.stroke());
      b.closePath();
    };
    function Yk(a) {
      a = a || {};
      Wk.call(this, {
        points: Infinity,
        fill: a.fill,
        radius: a.radius,
        snapToPixel: a.snapToPixel,
        stroke: a.stroke,
        atlasManager: a.atlasManager
      });
    }
    u(Yk, Wk);
    Yk.prototype.clone = function() {
      var a = new Yk({
        fill: this.Ca() ? this.Ca().clone() : void 0,
        stroke: this.Da() ? this.Da().clone() : void 0,
        radius: this.a,
        snapToPixel: this.v,
        atlasManager: this.u
      });
      a.rd(this.g);
      a.sd(this.c);
      return a;
    };
    Yk.prototype.Wc = function(a) {
      this.a = a;
      Xk(this, this.u);
    };
    function Zk(a) {
      a = a || {};
      this.b = void 0 !== a.color ? a.color : null;
      this.a = void 0;
    }
    Zk.prototype.clone = function() {
      var a = this.b;
      return new Zk({color: a && a.slice ? a.slice() : a || void 0});
    };
    Zk.prototype.f = function() {
      return this.b;
    };
    Zk.prototype.c = function(a) {
      this.b = a;
      this.a = void 0;
    };
    function $k(a) {
      a = a || {};
      this.Gc = null;
      this.Ra = al;
      void 0 !== a.geometry && this.Sa(a.geometry);
      this.Wa = void 0 !== a.fill ? a.fill : null;
      this.M = void 0 !== a.image ? a.image : null;
      this.Ya = void 0 !== a.stroke ? a.stroke : null;
      this.Fa = void 0 !== a.text ? a.text : null;
      this.kj = a.zIndex;
    }
    k = $k.prototype;
    k.clone = function() {
      var a = this.U();
      a && a.clone && (a = a.clone());
      return new $k({
        geometry: a,
        fill: this.Ca() ? this.Ca().clone() : void 0,
        image: this.Z() ? this.Z().clone() : void 0,
        stroke: this.Da() ? this.Da().clone() : void 0,
        text: this.Pa() ? this.Pa().clone() : void 0,
        zIndex: this.za()
      });
    };
    k.U = function() {
      return this.Gc;
    };
    k.vk = function() {
      return this.Ra;
    };
    k.Ca = function() {
      return this.Wa;
    };
    k.cf = function(a) {
      this.Wa = a;
    };
    k.Z = function() {
      return this.M;
    };
    k.zg = function(a) {
      this.M = a;
    };
    k.Da = function() {
      return this.Ya;
    };
    k.df = function(a) {
      this.Ya = a;
    };
    k.Pa = function() {
      return this.Fa;
    };
    k.ef = function(a) {
      this.Fa = a;
    };
    k.za = function() {
      return this.kj;
    };
    k.Sa = function(a) {
      "function" === typeof a ? this.Ra = a : "string" === typeof a ? this.Ra = function(b) {
        return b.get(a);
      } : a ? a && (this.Ra = function() {
        return a;
      }) : this.Ra = al;
      this.Gc = a;
    };
    k.Wb = function(a) {
      this.kj = a;
    };
    function bl(a) {
      if ("function" !== typeof a) {
        var b;
        Array.isArray(a) ? b = a : (qa(a instanceof $k, 41), b = [a]);
        a = function() {
          return b;
        };
      }
      return a;
    }
    var cl = null;
    function dl() {
      if (!cl) {
        var a = new Zk({color: "rgba(255,255,255,0.4)"}),
            b = new rj({
              color: "#3399CC",
              width: 1.25
            });
        cl = [new $k({
          image: new Yk({
            fill: a,
            stroke: b,
            radius: 5
          }),
          fill: a,
          stroke: b
        })];
      }
      return cl;
    }
    function el() {
      var a = {},
          b = [255, 255, 255, 1],
          c = [0, 153, 255, 1];
      a.Polygon = [new $k({fill: new Zk({color: [255, 255, 255, .5]})})];
      a.MultiPolygon = a.Polygon;
      a.LineString = [new $k({stroke: new rj({
          color: b,
          width: 5
        })}), new $k({stroke: new rj({
          color: c,
          width: 3
        })})];
      a.MultiLineString = a.LineString;
      a.Circle = a.Polygon.concat(a.LineString);
      a.Point = [new $k({
        image: new Yk({
          radius: 6,
          fill: new Zk({color: c}),
          stroke: new rj({
            color: b,
            width: 1.5
          })
        }),
        zIndex: Infinity
      })];
      a.MultiPoint = a.Point;
      a.GeometryCollection = a.Polygon.concat(a.LineString, a.Point);
      return a;
    }
    function al(a) {
      return a.U();
    }
    ;
    function H(a) {
      Gc.call(this);
      this.a = void 0;
      this.c = "geometry";
      this.g = null;
      this.l = void 0;
      this.i = null;
      B(this, Ic(this.c), this.ye, this);
      void 0 !== a && (a instanceof cf || !a ? this.Sa(a) : this.H(a));
    }
    u(H, Gc);
    k = H.prototype;
    k.clone = function() {
      var a = new H(this.N());
      a.Vc(this.c);
      var b = this.U();
      b && a.Sa(b.clone());
      (b = this.g) && a.Vf(b);
      return a;
    };
    k.U = function() {
      return this.get(this.c);
    };
    k.dm = function() {
      return this.a;
    };
    k.wk = function() {
      return this.c;
    };
    k.em = function() {
      return this.g;
    };
    k.Nc = function() {
      return this.l;
    };
    k.gl = function() {
      this.s();
    };
    k.ye = function() {
      this.i && (rc(this.i), this.i = null);
      var a = this.U();
      a && (this.i = B(a, "change", this.gl, this));
      this.s();
    };
    k.Sa = function(a) {
      this.set(this.c, a);
    };
    k.Vf = function(a) {
      this.l = (this.g = a) ? fl(a) : void 0;
      this.s();
    };
    k.kc = function(a) {
      this.a = a;
      this.s();
    };
    k.Vc = function(a) {
      xc(this, Ic(this.c), this.ye, this);
      this.c = a;
      B(this, Ic(this.c), this.ye, this);
      this.ye();
    };
    function fl(a) {
      var b;
      if ("function" === typeof a)
        2 == a.length ? b = function(b) {
          return a(this, b);
        } : b = a;
      else {
        var c;
        Array.isArray(a) ? c = a : (qa(a instanceof $k, 41), c = [a]);
        b = function() {
          return c;
        };
      }
      return b;
    }
    ;
    var gl = document.implementation.createDocument("", "", null);
    function il(a, b) {
      return gl.createElementNS(a, b);
    }
    function jl(a, b) {
      return kl(a, b, []).join("");
    }
    function kl(a, b, c) {
      if (a.nodeType == Node.CDATA_SECTION_NODE || a.nodeType == Node.TEXT_NODE)
        b ? c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : c.push(a.nodeValue);
      else
        for (a = a.firstChild; a; a = a.nextSibling)
          kl(a, b, c);
      return c;
    }
    function ll(a) {
      return a instanceof Document;
    }
    function ml(a) {
      return a instanceof Node;
    }
    function nl(a) {
      return (new DOMParser).parseFromString(a, "application/xml");
    }
    function pl(a, b) {
      return function(c, d) {
        var e = a.call(b, c, d);
        void 0 !== e && ga(d[d.length - 1], e);
      };
    }
    function ql(a, b) {
      return function(c, d) {
        var e = a.call(void 0 !== b ? b : this, c, d);
        void 0 !== e && d[d.length - 1].push(e);
      };
    }
    function rl(a, b) {
      return function(c, d) {
        var e = a.call(void 0 !== b ? b : this, c, d);
        void 0 !== e && (d[d.length - 1] = e);
      };
    }
    function sl(a) {
      return function(b, c) {
        var d = a.call(this, b, c);
        if (void 0 !== d) {
          var e = c[c.length - 1],
              f = b.localName,
              g;
          f in e ? g = e[f] : g = e[f] = [];
          g.push(d);
        }
      };
    }
    function I(a, b) {
      return function(c, d) {
        var e = a.call(this, c, d);
        void 0 !== e && (d[d.length - 1][void 0 !== b ? b : c.localName] = e);
      };
    }
    function J(a, b) {
      return function(c, d, e) {
        a.call(void 0 !== b ? b : this, c, d, e);
        e[e.length - 1].node.appendChild(c);
      };
    }
    function tl(a) {
      var b,
          c;
      return function(d, e, f) {
        if (!b) {
          b = {};
          var g = {};
          g[d.localName] = a;
          b[d.namespaceURI] = g;
          c = ul(d.localName);
        }
        vl(b, c, e, f);
      };
    }
    function ul(a, b) {
      return function(c, d, e) {
        c = d[d.length - 1].node;
        d = a;
        void 0 === d && (d = e);
        e = b;
        void 0 === b && (e = c.namespaceURI);
        return il(e, d);
      };
    }
    var wl = ul();
    function xl(a, b) {
      for (var c = b.length,
          d = Array(c),
          e = 0; e < c; ++e)
        d[e] = a[b[e]];
      return d;
    }
    function K(a, b, c) {
      c = void 0 !== c ? c : {};
      var d,
          e;
      d = 0;
      for (e = a.length; d < e; ++d)
        c[a[d]] = b;
      return c;
    }
    function yl(a, b, c, d) {
      for (b = b.firstElementChild; b; b = b.nextElementSibling) {
        var e = a[b.namespaceURI];
        void 0 !== e && (e = e[b.localName]) && e.call(d, b, c);
      }
    }
    function L(a, b, c, d, e) {
      d.push(a);
      yl(b, c, d, e);
      return d.pop();
    }
    function vl(a, b, c, d, e, f) {
      for (var g = (void 0 !== e ? e : c).length,
          h,
          l,
          m = 0; m < g; ++m)
        h = c[m], void 0 !== h && (l = b.call(f, h, d, void 0 !== e ? e[m] : void 0), void 0 !== l && a[l.namespaceURI][l.localName].call(f, l, h, d));
    }
    function zl(a, b, c, d, e, f, g) {
      e.push(a);
      vl(b, c, d, e, f, g);
      e.pop();
    }
    ;
    function Al(a, b, c, d) {
      return function(e, f, g) {
        var h = new XMLHttpRequest;
        h.open("GET", "function" === typeof a ? a(e, f, g) : a, !0);
        "arraybuffer" == b.T() && (h.responseType = "arraybuffer");
        h.onload = function() {
          if (!h.status || 200 <= h.status && 300 > h.status) {
            var a = b.T(),
                e;
            "json" == a || "text" == a ? e = h.responseText : "xml" == a ? (e = h.responseXML) || (e = nl(h.responseText)) : "arraybuffer" == a && (e = h.response);
            e ? c.call(this, b.Qa(e, {featureProjection: g}), b.kb(e)) : d.call(this);
          } else
            d.call(this);
        }.bind(this);
        h.send();
      };
    }
    function Bl(a, b) {
      return Al(a, b, function(a) {
        this.dd(a);
      }, na);
    }
    ;
    function Cl() {
      this.g = this.defaultDataProjection = null;
    }
    function Dl(a, b, c) {
      var d;
      c && (d = {
        dataProjection: c.dataProjection ? c.dataProjection : a.kb(b),
        featureProjection: c.featureProjection
      });
      return El(a, d);
    }
    function El(a, b) {
      return pb({
        dataProjection: a.defaultDataProjection,
        featureProjection: a.g
      }, b);
    }
    function Fl(a, b, c) {
      var d = c ? Gb(c.featureProjection) : null,
          e = c ? Gb(c.dataProjection) : null,
          f;
      d && e && !Tb(d, e) ? a instanceof cf ? f = (b ? a.clone() : a).tb(b ? d : e, b ? e : d) : f = Xb(b ? a.slice() : a, b ? d : e, b ? e : d) : f = a;
      if (b && c && c.decimals) {
        var g = Math.pow(10, c.decimals);
        a = function(a) {
          for (var b = 0,
              c = a.length; b < c; ++b)
            a[b] = Math.round(a[b] * g) / g;
          return a;
        };
        Array.isArray(f) ? a(f) : f.Dc(a);
      }
      return f;
    }
    ;
    function Gl() {
      Cl.call(this);
    }
    u(Gl, Cl);
    function Hl(a) {
      return "string" === typeof a ? (a = JSON.parse(a)) ? a : null : null !== a ? a : null;
    }
    k = Gl.prototype;
    k.T = function() {
      return "json";
    };
    k.Ub = function(a, b) {
      return this.Sc(Hl(a), Dl(this, a, b));
    };
    k.Qa = function(a, b) {
      return this.kg(Hl(a), Dl(this, a, b));
    };
    k.Tc = function(a, b) {
      return this.og(Hl(a), Dl(this, a, b));
    };
    k.kb = function(a) {
      return this.rg(Hl(a));
    };
    k.yd = function(a, b) {
      return JSON.stringify(this.ad(a, b));
    };
    k.Xb = function(a, b) {
      return JSON.stringify(this.ce(a, b));
    };
    k.bd = function(a, b) {
      return JSON.stringify(this.ee(a, b));
    };
    function Il(a, b, c, d, e, f) {
      var g = NaN,
          h = NaN,
          l = (c - b) / d;
      if (1 === l)
        g = a[b], h = a[b + 1];
      else if (2 == l)
        g = (1 - e) * a[b] + e * a[b + d], h = (1 - e) * a[b + 1] + e * a[b + d + 1];
      else if (l) {
        var h = a[b],
            l = a[b + 1],
            m = 0,
            g = [0],
            p;
        for (p = b + d; p < c; p += d) {
          var n = a[p],
              q = a[p + 1],
              m = m + Math.sqrt((n - h) * (n - h) + (q - l) * (q - l));
          g.push(m);
          h = n;
          l = q;
        }
        c = e * m;
        l = 0;
        m = g.length;
        for (p = !1; l < m; )
          e = l + (m - l >> 1), h = +da(g[e], c), 0 > h ? l = e + 1 : (m = e, p = !h);
        e = p ? l : ~l;
        0 > e ? (c = (c - g[-e - 2]) / (g[-e - 1] - g[-e - 2]), b += (-e - 2) * d, g = Da(a[b], a[b + d], c), h = Da(a[b + 1], a[b + d + 1], c)) : (g = a[b + e * d], h = a[b + e * d + 1]);
      }
      return f ? (f[0] = g, f[1] = h, f) : [g, h];
    }
    function Jl(a, b, c, d, e, f) {
      if (c == b)
        return null;
      if (e < a[b + d - 1])
        return f ? (c = a.slice(b, b + d), c[d - 1] = e, c) : null;
      if (a[c - 1] < e)
        return f ? (c = a.slice(c - d, c), c[d - 1] = e, c) : null;
      if (e == a[b + d - 1])
        return a.slice(b, b + d);
      b /= d;
      for (c /= d; b < c; )
        f = b + c >> 1, e < a[(f + 1) * d - 1] ? c = f : b = f + 1;
      c = a[b * d - 1];
      if (e == c)
        return a.slice((b - 1) * d, (b - 1) * d + d);
      f = (e - c) / (a[(b + 1) * d - 1] - c);
      c = [];
      var g;
      for (g = 0; g < d - 1; ++g)
        c.push(Da(a[(b - 1) * d + g], a[b * d + g], f));
      c.push(e);
      return c;
    }
    function Kl(a, b, c, d, e, f) {
      var g = 0;
      if (f)
        return Jl(a, g, b[b.length - 1], c, d, e);
      if (d < a[c - 1])
        return e ? (a = a.slice(0, c), a[c - 1] = d, a) : null;
      if (a[a.length - 1] < d)
        return e ? (a = a.slice(a.length - c), a[c - 1] = d, a) : null;
      e = 0;
      for (f = b.length; e < f; ++e) {
        var h = b[e];
        if (g != h) {
          if (d < a[g + c - 1])
            break;
          else if (d <= a[h - 1])
            return Jl(a, g, h, c, d, !1);
          g = h;
        }
      }
      return null;
    }
    ;
    function M(a, b) {
      ff.call(this);
      this.c = null;
      this.u = this.A = this.l = -1;
      this.pa(a, b);
    }
    u(M, ff);
    k = M.prototype;
    k.Tj = function(a) {
      this.B ? ga(this.B, a) : this.B = a.slice();
      this.s();
    };
    k.clone = function() {
      var a = new M(null);
      a.ca(this.ka, this.B.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      this.u != this.f && (this.A = Math.sqrt(nf(this.B, 0, this.B.length, this.a, 0)), this.u = this.f);
      return pf(this.B, 0, this.B.length, this.a, this.A, !1, a, b, c, d);
    };
    k.gk = function(a, b) {
      return Ef(this.B, 0, this.B.length, this.a, a, b);
    };
    k.Im = function(a, b) {
      return "XYM" != this.ka && "XYZM" != this.ka ? null : Jl(this.B, 0, this.B.length, this.a, a, void 0 !== b ? b : !1);
    };
    k.X = function() {
      return uf(this.B, 0, this.B.length, this.a);
    };
    k.hh = function(a, b) {
      return Il(this.B, 0, this.B.length, this.a, a, b);
    };
    k.Jm = function() {
      var a = this.B,
          b = this.a,
          c = a[0],
          d = a[1],
          e = 0,
          f;
      for (f = 0 + b; f < this.B.length; f += b)
        var g = a[f],
            h = a[f + 1],
            e = e + Math.sqrt((g - c) * (g - c) + (h - d) * (h - d)),
            c = g,
            d = h;
      return e;
    };
    function Zh(a) {
      a.l != a.f && (a.c = a.hh(.5, a.c), a.l = a.f);
      return a.c;
    }
    k.kd = function(a) {
      var b = [];
      b.length = wf(this.B, 0, this.B.length, this.a, a, b, 0);
      a = new M(null);
      a.ca("XY", b);
      return a;
    };
    k.T = function() {
      return "LineString";
    };
    k.Xa = function(a) {
      return Ff(this.B, 0, this.B.length, this.a, a);
    };
    k.pa = function(a, b) {
      a ? (jf(this, b, a, 1), this.B || (this.B = []), this.B.length = sf(this.B, 0, a, this.a), this.s()) : this.ca("XY", null);
    };
    k.ca = function(a, b) {
      hf(this, a, b);
      this.s();
    };
    function N(a, b) {
      ff.call(this);
      this.c = [];
      this.l = this.u = -1;
      this.pa(a, b);
    }
    u(N, ff);
    k = N.prototype;
    k.Uj = function(a) {
      this.B ? ga(this.B, a.ha().slice()) : this.B = a.ha().slice();
      this.c.push(this.B.length);
      this.s();
    };
    k.clone = function() {
      var a = new N(null);
      a.ca(this.ka, this.B.slice(), this.c.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      this.l != this.f && (this.u = Math.sqrt(of(this.B, 0, this.c, this.a, 0)), this.l = this.f);
      return qf(this.B, 0, this.c, this.a, this.u, !1, a, b, c, d);
    };
    k.Lm = function(a, b, c) {
      return "XYM" != this.ka && "XYZM" != this.ka || !this.B.length ? null : Kl(this.B, this.c, this.a, a, void 0 !== b ? b : !1, void 0 !== c ? c : !1);
    };
    k.X = function() {
      return vf(this.B, 0, this.c, this.a);
    };
    k.Rb = function() {
      return this.c;
    };
    k.Dk = function(a) {
      if (0 > a || this.c.length <= a)
        return null;
      var b = new M(null);
      b.ca(this.ka, this.B.slice(a ? this.c[a - 1] : 0, this.c[a]));
      return b;
    };
    k.hd = function() {
      var a = this.B,
          b = this.c,
          c = this.ka,
          d = [],
          e = 0,
          f,
          g;
      f = 0;
      for (g = b.length; f < g; ++f) {
        var h = b[f],
            l = new M(null);
        l.ca(c, a.slice(e, h));
        d.push(l);
        e = h;
      }
      return d;
    };
    function $h(a) {
      var b = [],
          c = a.B,
          d = 0,
          e = a.c;
      a = a.a;
      var f,
          g;
      f = 0;
      for (g = e.length; f < g; ++f) {
        var h = e[f],
            d = Il(c, d, h, a, .5);
        ga(b, d);
        d = h;
      }
      return b;
    }
    k.kd = function(a) {
      var b = [],
          c = [],
          d = this.B,
          e = this.c,
          f = this.a,
          g = 0,
          h = 0,
          l,
          m;
      l = 0;
      for (m = e.length; l < m; ++l) {
        var p = e[l],
            h = wf(d, g, p, f, a, b, h);
        c.push(h);
        g = p;
      }
      b.length = h;
      a = new N(null);
      a.ca("XY", b, c);
      return a;
    };
    k.T = function() {
      return "MultiLineString";
    };
    k.Xa = function(a) {
      a: {
        var b = this.B,
            c = this.c,
            d = this.a,
            e = 0,
            f,
            g;
        f = 0;
        for (g = c.length; f < g; ++f) {
          if (Ff(b, e, c[f], d, a)) {
            a = !0;
            break a;
          }
          e = c[f];
        }
        a = !1;
      }
      return a;
    };
    k.pa = function(a, b) {
      if (a) {
        jf(this, b, a, 2);
        this.B || (this.B = []);
        var c = tf(this.B, 0, a, this.a, this.c);
        this.B.length = c.length ? c[c.length - 1] : 0;
        this.s();
      } else
        this.ca("XY", null, this.c);
    };
    k.ca = function(a, b, c) {
      hf(this, a, b);
      this.c = c;
      this.s();
    };
    function Ll(a, b) {
      var c = a.ka,
          d = [],
          e = [],
          f,
          g;
      f = 0;
      for (g = b.length; f < g; ++f) {
        var h = b[f];
        f || (c = h.ka);
        ga(d, h.ha());
        e.push(d.length);
      }
      a.ca(c, d, e);
    }
    ;
    function O(a, b) {
      ff.call(this);
      this.pa(a, b);
    }
    u(O, ff);
    k = O.prototype;
    k.Wj = function(a) {
      this.B ? ga(this.B, a.ha()) : this.B = a.ha().slice();
      this.s();
    };
    k.clone = function() {
      var a = new O(null);
      a.ca(this.ka, this.B.slice());
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      var e = this.B,
          f = this.a,
          g,
          h,
          l;
      g = 0;
      for (h = e.length; g < h; g += f)
        if (l = Aa(a, b, e[g], e[g + 1]), l < d) {
          d = l;
          for (l = 0; l < f; ++l)
            c[l] = e[g + l];
          c.length = f;
        }
      return d;
    };
    k.X = function() {
      return uf(this.B, 0, this.B.length, this.a);
    };
    k.Ok = function(a) {
      var b = this.B ? this.B.length / this.a : 0;
      if (0 > a || b <= a)
        return null;
      b = new E(null);
      b.ca(this.ka, this.B.slice(a * this.a, (a + 1) * this.a));
      return b;
    };
    k.Ie = function() {
      var a = this.B,
          b = this.ka,
          c = this.a,
          d = [],
          e,
          f;
      e = 0;
      for (f = a.length; e < f; e += c) {
        var g = new E(null);
        g.ca(b, a.slice(e, e + c));
        d.push(g);
      }
      return d;
    };
    k.T = function() {
      return "MultiPoint";
    };
    k.Xa = function(a) {
      var b = this.B,
          c = this.a,
          d,
          e,
          f,
          g;
      d = 0;
      for (e = b.length; d < e; d += c)
        if (f = b[d], g = b[d + 1], Sa(a, f, g))
          return !0;
      return !1;
    };
    k.pa = function(a, b) {
      a ? (jf(this, b, a, 1), this.B || (this.B = []), this.B.length = sf(this.B, 0, a, this.a), this.s()) : this.ca("XY", null);
    };
    k.ca = function(a, b) {
      hf(this, a, b);
      this.s();
    };
    function P(a, b) {
      ff.call(this);
      this.c = [];
      this.u = -1;
      this.A = null;
      this.R = this.C = this.G = -1;
      this.l = null;
      this.pa(a, b);
    }
    u(P, ff);
    k = P.prototype;
    k.Xj = function(a) {
      if (this.B) {
        var b = this.B.length;
        ga(this.B, a.ha());
        a = a.Rb().slice();
        var c,
            d;
        c = 0;
        for (d = a.length; c < d; ++c)
          a[c] += b;
      } else
        this.B = a.ha().slice(), a = a.Rb().slice(), this.c.push();
      this.c.push(a);
      this.s();
    };
    k.clone = function() {
      for (var a = new P(null),
          b = this.c.length,
          c = Array(b),
          d = 0; d < b; ++d)
        c[d] = this.c[d].slice();
      Ml(a, this.ka, this.B.slice(), c);
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      if (this.C != this.f) {
        var e = this.c,
            f = 0,
            g = 0,
            h,
            l;
        h = 0;
        for (l = e.length; h < l; ++h)
          var m = e[h],
              g = of(this.B, f, m, this.a, g),
              f = m[m.length - 1];
        this.G = Math.sqrt(g);
        this.C = this.f;
      }
      e = ai(this);
      f = this.c;
      g = this.a;
      h = this.G;
      l = 0;
      var m = [NaN, NaN],
          p,
          n;
      p = 0;
      for (n = f.length; p < n; ++p) {
        var q = f[p];
        d = qf(e, l, q, g, h, !0, a, b, c, d, m);
        l = q[q.length - 1];
      }
      return d;
    };
    k.Oc = function(a, b) {
      var c;
      a: {
        c = ai(this);
        var d = this.c,
            e = 0;
        if (d.length) {
          var f,
              g;
          f = 0;
          for (g = d.length; f < g; ++f) {
            var h = d[f];
            if (Cf(c, e, h, this.a, a, b)) {
              c = !0;
              break a;
            }
            e = h[h.length - 1];
          }
        }
        c = !1;
      }
      return c;
    };
    k.Mm = function() {
      var a = ai(this),
          b = this.c,
          c = 0,
          d = 0,
          e,
          f;
      e = 0;
      for (f = b.length; e < f; ++e)
        var g = b[e],
            d = d + lf(a, c, g, this.a),
            c = g[g.length - 1];
      return d;
    };
    k.X = function(a) {
      var b;
      void 0 !== a ? (b = ai(this).slice(), Kf(b, this.c, this.a, a)) : b = this.B;
      a = b;
      b = this.c;
      var c = this.a,
          d = 0,
          e = [],
          f = 0,
          g,
          h;
      g = 0;
      for (h = b.length; g < h; ++g) {
        var l = b[g];
        e[f++] = vf(a, d, l, c, e[f]);
        d = l[l.length - 1];
      }
      e.length = f;
      return e;
    };
    function bi(a) {
      if (a.u != a.f) {
        var b = a.B,
            c = a.c,
            d = a.a,
            e = 0,
            f = [],
            g,
            h;
        g = 0;
        for (h = c.length; g < h; ++g) {
          var l = c[g],
              e = Xa(b, e, l[0], d);
          f.push((e[0] + e[2]) / 2, (e[1] + e[3]) / 2);
          e = l[l.length - 1];
        }
        b = ai(a);
        c = a.c;
        d = a.a;
        g = 0;
        h = [];
        l = 0;
        for (e = c.length; l < e; ++l) {
          var m = c[l];
          h = Df(b, g, m, d, f, 2 * l, h);
          g = m[m.length - 1];
        }
        a.A = h;
        a.u = a.f;
      }
      return a.A;
    }
    k.zk = function() {
      var a = new O(null);
      a.ca("XY", bi(this).slice());
      return a;
    };
    function ai(a) {
      if (a.R != a.f) {
        var b = a.B,
            c;
        a: {
          c = a.c;
          var d,
              e;
          d = 0;
          for (e = c.length; d < e; ++d)
            if (!If(b, c[d], a.a, void 0)) {
              c = !1;
              break a;
            }
          c = !0;
        }
        c ? a.l = b : (a.l = b.slice(), a.l.length = Kf(a.l, a.c, a.a));
        a.R = a.f;
      }
      return a.l;
    }
    k.kd = function(a) {
      var b = [],
          c = [],
          d = this.B,
          e = this.c,
          f = this.a;
      a = Math.sqrt(a);
      var g = 0,
          h = 0,
          l,
          m;
      l = 0;
      for (m = e.length; l < m; ++l) {
        var p = e[l],
            n = [],
            h = xf(d, g, p, f, a, b, h, n);
        c.push(n);
        g = p[p.length - 1];
      }
      b.length = h;
      d = new P(null);
      Ml(d, "XY", b, c);
      return d;
    };
    k.Pk = function(a) {
      if (0 > a || this.c.length <= a)
        return null;
      var b;
      a ? (b = this.c[a - 1], b = b[b.length - 1]) : b = 0;
      a = this.c[a].slice();
      var c = a[a.length - 1];
      if (b) {
        var d,
            e;
        d = 0;
        for (e = a.length; d < e; ++d)
          a[d] -= b;
      }
      d = new F(null);
      d.ca(this.ka, this.B.slice(b, c), a);
      return d;
    };
    k.Od = function() {
      var a = this.ka,
          b = this.B,
          c = this.c,
          d = [],
          e = 0,
          f,
          g,
          h,
          l;
      f = 0;
      for (g = c.length; f < g; ++f) {
        var m = c[f].slice(),
            p = m[m.length - 1];
        if (e)
          for (h = 0, l = m.length; h < l; ++h)
            m[h] -= e;
        h = new F(null);
        h.ca(a, b.slice(e, p), m);
        d.push(h);
        e = p;
      }
      return d;
    };
    k.T = function() {
      return "MultiPolygon";
    };
    k.Xa = function(a) {
      a: {
        var b = ai(this),
            c = this.c,
            d = this.a,
            e = 0,
            f,
            g;
        f = 0;
        for (g = c.length; f < g; ++f) {
          var h = c[f];
          if (Gf(b, e, h, d, a)) {
            a = !0;
            break a;
          }
          e = h[h.length - 1];
        }
        a = !1;
      }
      return a;
    };
    k.pa = function(a, b) {
      if (a) {
        jf(this, b, a, 3);
        this.B || (this.B = []);
        var c = this.B,
            d = this.a,
            e = this.c,
            f = 0,
            e = e ? e : [],
            g = 0,
            h,
            l;
        h = 0;
        for (l = a.length; h < l; ++h)
          f = tf(c, f, a[h], d, e[g]), e[g++] = f, f = f[f.length - 1];
        e.length = g;
        e.length ? (c = e[e.length - 1], this.B.length = c.length ? c[c.length - 1] : 0) : this.B.length = 0;
        this.s();
      } else
        Ml(this, "XY", null, this.c);
    };
    function Ml(a, b, c, d) {
      hf(a, b, c);
      a.c = d;
      a.s();
    }
    function Nl(a, b) {
      var c = a.ka,
          d = [],
          e = [],
          f,
          g,
          h;
      f = 0;
      for (g = b.length; f < g; ++f) {
        var l = b[f];
        f || (c = l.ka);
        var m = d.length;
        h = l.Rb();
        var p,
            n;
        p = 0;
        for (n = h.length; p < n; ++p)
          h[p] += m;
        ga(d, l.ha());
        e.push(h);
      }
      Ml(a, c, d, e);
    }
    ;
    function Ol(a) {
      a = a ? a : {};
      Cl.call(this);
      this.b = a.geometryName;
    }
    u(Ol, Gl);
    function Pl(a, b) {
      if (!a)
        return null;
      var c;
      if ("number" === typeof a.x && "number" === typeof a.y)
        c = "Point";
      else if (a.points)
        c = "MultiPoint";
      else if (a.paths)
        c = 1 === a.paths.length ? "LineString" : "MultiLineString";
      else if (a.rings) {
        var d = a.rings,
            e = Ql(a),
            f = [],
            g = [];
        c = [];
        var h,
            l;
        h = 0;
        for (l = d.length; h < l; ++h)
          f.length = 0, sf(f, 0, d[h], e.length), Hf(f, 0, f.length, e.length) ? g.push([d[h]]) : c.push(d[h]);
        for (; c.length; ) {
          d = c.shift();
          e = !1;
          for (h = g.length - 1; 0 <= h; h--)
            if (Ta((new yf(g[h][0])).D(), (new yf(d)).D())) {
              g[h].push(d);
              e = !0;
              break;
            }
          e || g.push([d.reverse()]);
        }
        a = pb({}, a);
        1 === g.length ? (c = "Polygon", a.rings = g[0]) : (c = "MultiPolygon", a.rings = g);
      }
      return Fl((0, Rl[c])(a), !1, b);
    }
    function Ql(a) {
      var b = "XY";
      !0 === a.hasZ && !0 === a.hasM ? b = "XYZM" : !0 === a.hasZ ? b = "XYZ" : !0 === a.hasM && (b = "XYM");
      return b;
    }
    function Sl(a) {
      a = a.ka;
      return {
        hasZ: "XYZ" === a || "XYZM" === a,
        hasM: "XYM" === a || "XYZM" === a
      };
    }
    var Rl = {
      Point: function(a) {
        return void 0 !== a.m && void 0 !== a.z ? new E([a.x, a.y, a.z, a.m], "XYZM") : void 0 !== a.z ? new E([a.x, a.y, a.z], "XYZ") : void 0 !== a.m ? new E([a.x, a.y, a.m], "XYM") : new E([a.x, a.y]);
      },
      LineString: function(a) {
        return new M(a.paths[0], Ql(a));
      },
      Polygon: function(a) {
        return new F(a.rings, Ql(a));
      },
      MultiPoint: function(a) {
        return new O(a.points, Ql(a));
      },
      MultiLineString: function(a) {
        return new N(a.paths, Ql(a));
      },
      MultiPolygon: function(a) {
        return new P(a.rings, Ql(a));
      }
    },
        Tl = {
          Point: function(a) {
            var b = a.X(),
                c;
            a = a.ka;
            "XYZ" === a ? c = {
              x: b[0],
              y: b[1],
              z: b[2]
            } : "XYM" === a ? c = {
              x: b[0],
              y: b[1],
              m: b[2]
            } : "XYZM" === a ? c = {
              x: b[0],
              y: b[1],
              z: b[2],
              m: b[3]
            } : "XY" === a ? c = {
              x: b[0],
              y: b[1]
            } : qa(!1, 34);
            return c;
          },
          LineString: function(a) {
            var b = Sl(a);
            return {
              hasZ: b.hasZ,
              hasM: b.hasM,
              paths: [a.X()]
            };
          },
          Polygon: function(a) {
            var b = Sl(a);
            return {
              hasZ: b.hasZ,
              hasM: b.hasM,
              rings: a.X(!1)
            };
          },
          MultiPoint: function(a) {
            var b = Sl(a);
            return {
              hasZ: b.hasZ,
              hasM: b.hasM,
              points: a.X()
            };
          },
          MultiLineString: function(a) {
            var b = Sl(a);
            return {
              hasZ: b.hasZ,
              hasM: b.hasM,
              paths: a.X()
            };
          },
          MultiPolygon: function(a) {
            var b = Sl(a);
            a = a.X(!1);
            for (var c = [],
                d = 0; d < a.length; d++)
              for (var e = a[d].length - 1; 0 <= e; e--)
                c.push(a[d][e]);
            return {
              hasZ: b.hasZ,
              hasM: b.hasM,
              rings: c
            };
          }
        };
    k = Ol.prototype;
    k.Sc = function(a, b) {
      var c = Pl(a.geometry, b),
          d = new H;
      this.b && d.Vc(this.b);
      d.Sa(c);
      b && b.Rf && a.attributes[b.Rf] && d.kc(a.attributes[b.Rf]);
      a.attributes && d.H(a.attributes);
      return d;
    };
    k.kg = function(a, b) {
      var c = b ? b : {};
      if (a.features) {
        var d = [],
            e = a.features,
            f,
            g;
        c.Rf = a.objectIdFieldName;
        f = 0;
        for (g = e.length; f < g; ++f)
          d.push(this.Sc(e[f], c));
        return d;
      }
      return [this.Sc(a, c)];
    };
    k.og = function(a, b) {
      return Pl(a, b);
    };
    k.rg = function(a) {
      return a.spatialReference && a.spatialReference.wkid ? Gb("EPSG:" + a.spatialReference.wkid) : null;
    };
    function Ul(a, b) {
      return (0, Tl[a.T()])(Fl(a, !0, b), b);
    }
    k.ee = function(a, b) {
      return Ul(a, El(this, b));
    };
    k.ad = function(a, b) {
      b = El(this, b);
      var c = {},
          d = a.U();
      d && (c.geometry = Ul(d, b));
      d = a.N();
      delete d[a.c];
      c.attributes = sb(d) ? {} : d;
      b && b.featureProjection && (c.spatialReference = {wkid: Gb(b.featureProjection).nb.split(":").pop()});
      return c;
    };
    k.ce = function(a, b) {
      b = El(this, b);
      var c = [],
          d,
          e;
      d = 0;
      for (e = a.length; d < e; ++d)
        c.push(this.ad(a[d], b));
      return {features: c};
    };
    function Vl(a) {
      this.Bc = a;
    }
    ;
    function Wl(a, b) {
      this.Bc = a;
      this.b = Array.prototype.slice.call(arguments, 1);
      qa(2 <= this.b.length, 57);
    }
    u(Wl, Vl);
    function Xl(a) {
      var b = ["And"].concat(Array.prototype.slice.call(arguments));
      Wl.apply(this, b);
    }
    u(Xl, Wl);
    function Yl(a, b, c) {
      this.Bc = "BBOX";
      this.geometryName = a;
      this.extent = b;
      this.srsName = c;
    }
    u(Yl, Vl);
    function Zl(a, b) {
      this.Bc = a;
      this.b = b;
    }
    u(Zl, Vl);
    function $l(a, b, c, d) {
      Zl.call(this, a, b);
      this.f = c;
      this.a = d;
    }
    u($l, Zl);
    function am(a, b, c) {
      $l.call(this, "PropertyIsEqualTo", a, b, c);
    }
    u(am, $l);
    function bm(a, b) {
      $l.call(this, "PropertyIsGreaterThan", a, b);
    }
    u(bm, $l);
    function cm(a, b) {
      $l.call(this, "PropertyIsGreaterThanOrEqualTo", a, b);
    }
    u(cm, $l);
    function dm(a, b, c, d) {
      this.Bc = a;
      this.geometryName = b || "the_geom";
      this.geometry = c;
      this.srsName = d;
    }
    u(dm, Vl);
    function em(a, b, c) {
      dm.call(this, "Intersects", a, b, c);
    }
    u(em, dm);
    function fm(a, b, c) {
      Zl.call(this, "PropertyIsBetween", a);
      this.a = b;
      this.f = c;
    }
    u(fm, Zl);
    function gm(a, b, c, d, e, f) {
      Zl.call(this, "PropertyIsLike", a);
      this.c = b;
      this.g = void 0 !== c ? c : "*";
      this.i = void 0 !== d ? d : ".";
      this.f = void 0 !== e ? e : "!";
      this.a = f;
    }
    u(gm, Zl);
    function hm(a) {
      Zl.call(this, "PropertyIsNull", a);
    }
    u(hm, Zl);
    function im(a, b) {
      $l.call(this, "PropertyIsLessThan", a, b);
    }
    u(im, $l);
    function jm(a, b) {
      $l.call(this, "PropertyIsLessThanOrEqualTo", a, b);
    }
    u(jm, $l);
    function km(a) {
      this.Bc = "Not";
      this.condition = a;
    }
    u(km, Vl);
    function lm(a, b, c) {
      $l.call(this, "PropertyIsNotEqualTo", a, b, c);
    }
    u(lm, $l);
    function mm(a) {
      var b = ["Or"].concat(Array.prototype.slice.call(arguments));
      Wl.apply(this, b);
    }
    u(mm, Wl);
    function nm(a, b, c) {
      dm.call(this, "Within", a, b, c);
    }
    u(nm, dm);
    function om(a) {
      var b = [null].concat(Array.prototype.slice.call(arguments));
      return new (Function.prototype.bind.apply(Xl, b));
    }
    function pm(a, b, c) {
      return new Yl(a, b, c);
    }
    ;
    function qm(a) {
      cf.call(this);
      this.a = a ? a : null;
      rm(this);
    }
    u(qm, cf);
    function sm(a) {
      var b = [],
          c,
          d;
      c = 0;
      for (d = a.length; c < d; ++c)
        b.push(a[c].clone());
      return b;
    }
    function tm(a) {
      var b,
          c;
      if (a.a)
        for (b = 0, c = a.a.length; b < c; ++b)
          xc(a.a[b], "change", a.s, a);
    }
    function rm(a) {
      var b,
          c;
      if (a.a)
        for (b = 0, c = a.a.length; b < c; ++b)
          B(a.a[b], "change", a.s, a);
    }
    k = qm.prototype;
    k.clone = function() {
      var a = new qm(null);
      a.Ji(this.a);
      return a;
    };
    k.Gb = function(a, b, c, d) {
      if (d < Oa(this.D(), a, b))
        return d;
      var e = this.a,
          f,
          g;
      f = 0;
      for (g = e.length; f < g; ++f)
        d = e[f].Gb(a, b, c, d);
      return d;
    };
    k.Oc = function(a, b) {
      var c = this.a,
          d,
          e;
      d = 0;
      for (e = c.length; d < e; ++d)
        if (c[d].Oc(a, b))
          return !0;
      return !1;
    };
    k.ne = function(a) {
      Va(Infinity, Infinity, -Infinity, -Infinity, a);
      for (var b = this.a,
          c = 0,
          d = b.length; c < d; ++c)
        $a(a, b[c].D());
      return a;
    };
    k.If = function() {
      return sm(this.a);
    };
    k.Qd = function(a) {
      this.j != this.f && (qb(this.i), this.g = 0, this.j = this.f);
      if (0 > a || this.g && a < this.g)
        return this;
      var b = a.toString();
      if (this.i.hasOwnProperty(b))
        return this.i[b];
      var c = [],
          d = this.a,
          e = !1,
          f,
          g;
      f = 0;
      for (g = d.length; f < g; ++f) {
        var h = d[f],
            l = h.Qd(a);
        c.push(l);
        l !== h && (e = !0);
      }
      if (e)
        return a = new qm(null), tm(a), a.a = c, rm(a), a.s(), this.i[b] = a;
      this.g = a;
      return this;
    };
    k.T = function() {
      return "GeometryCollection";
    };
    k.Xa = function(a) {
      var b = this.a,
          c,
          d;
      c = 0;
      for (d = b.length; c < d; ++c)
        if (b[c].Xa(a))
          return !0;
      return !1;
    };
    k.rotate = function(a, b) {
      for (var c = this.a,
          d = 0,
          e = c.length; d < e; ++d)
        c[d].rotate(a, b);
      this.s();
    };
    k.scale = function(a, b, c) {
      c || (c = jb(this.D()));
      for (var d = this.a,
          e = 0,
          f = d.length; e < f; ++e)
        d[e].scale(a, b, c);
      this.s();
    };
    k.Ji = function(a) {
      a = sm(a);
      tm(this);
      this.a = a;
      rm(this);
      this.s();
    };
    k.Dc = function(a) {
      var b = this.a,
          c,
          d;
      c = 0;
      for (d = b.length; c < d; ++c)
        b[c].Dc(a);
      this.s();
    };
    k.translate = function(a, b) {
      var c = this.a,
          d,
          e;
      d = 0;
      for (e = c.length; d < e; ++d)
        c[d].translate(a, b);
      this.s();
    };
    k.ra = function() {
      tm(this);
      cf.prototype.ra.call(this);
    };
    function um(a) {
      a = a ? a : {};
      Cl.call(this);
      this.defaultDataProjection = Gb(a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326");
      a.featureProjection && (this.g = Gb(a.featureProjection));
      this.b = a.geometryName;
    }
    u(um, Gl);
    function vm(a, b) {
      return a ? Fl((0, wm[a.type])(a), !1, b) : null;
    }
    function xm(a, b) {
      return (0, ym[a.T()])(Fl(a, !0, b), b);
    }
    var wm = {
      Point: function(a) {
        return new E(a.coordinates);
      },
      LineString: function(a) {
        return new M(a.coordinates);
      },
      Polygon: function(a) {
        return new F(a.coordinates);
      },
      MultiPoint: function(a) {
        return new O(a.coordinates);
      },
      MultiLineString: function(a) {
        return new N(a.coordinates);
      },
      MultiPolygon: function(a) {
        return new P(a.coordinates);
      },
      GeometryCollection: function(a, b) {
        var c = a.geometries.map(function(a) {
          return vm(a, b);
        });
        return new qm(c);
      }
    },
        ym = {
          Point: function(a) {
            return {
              type: "Point",
              coordinates: a.X()
            };
          },
          LineString: function(a) {
            return {
              type: "LineString",
              coordinates: a.X()
            };
          },
          Polygon: function(a, b) {
            var c;
            b && (c = b.rightHanded);
            return {
              type: "Polygon",
              coordinates: a.X(c)
            };
          },
          MultiPoint: function(a) {
            return {
              type: "MultiPoint",
              coordinates: a.X()
            };
          },
          MultiLineString: function(a) {
            return {
              type: "MultiLineString",
              coordinates: a.X()
            };
          },
          MultiPolygon: function(a, b) {
            var c;
            b && (c = b.rightHanded);
            return {
              type: "MultiPolygon",
              coordinates: a.X(c)
            };
          },
          GeometryCollection: function(a, b) {
            return {
              type: "GeometryCollection",
              geometries: a.a.map(function(a) {
                var c = pb({}, b);
                delete c.featureProjection;
                return xm(a, c);
              })
            };
          },
          Circle: function() {
            return {
              type: "GeometryCollection",
              geometries: []
            };
          }
        };
    k = um.prototype;
    k.Sc = function(a, b) {
      var c;
      c = "Feature" === a.type ? a : {
        type: "Feature",
        geometry: a
      };
      var d = vm(c.geometry, b),
          e = new H;
      this.b && e.Vc(this.b);
      e.Sa(d);
      void 0 !== c.id && e.kc(c.id);
      c.properties && e.H(c.properties);
      return e;
    };
    k.kg = function(a, b) {
      var c;
      if ("FeatureCollection" === a.type) {
        c = [];
        var d = a.features,
            e,
            f;
        e = 0;
        for (f = d.length; e < f; ++e)
          c.push(this.Sc(d[e], b));
      } else
        c = [this.Sc(a, b)];
      return c;
    };
    k.og = function(a, b) {
      return vm(a, b);
    };
    k.rg = function(a) {
      a = a.crs;
      var b;
      a ? "name" == a.type ? b = Gb(a.properties.name) : "EPSG" == a.type ? b = Gb("EPSG:" + a.properties.code) : qa(!1, 36) : b = this.defaultDataProjection;
      return b;
    };
    k.ad = function(a, b) {
      b = El(this, b);
      var c = {type: "Feature"},
          d = a.a;
      void 0 !== d && (c.id = d);
      (d = a.U()) ? c.geometry = xm(d, b) : c.geometry = null;
      d = a.N();
      delete d[a.c];
      sb(d) ? c.properties = null : c.properties = d;
      return c;
    };
    k.ce = function(a, b) {
      b = El(this, b);
      var c = [],
          d,
          e;
      d = 0;
      for (e = a.length; d < e; ++d)
        c.push(this.ad(a[d], b));
      return {
        type: "FeatureCollection",
        features: c
      };
    };
    k.ee = function(a, b) {
      return xm(a, El(this, b));
    };
    function zm() {
      this.f = new XMLSerializer;
      Cl.call(this);
    }
    u(zm, Cl);
    k = zm.prototype;
    k.T = function() {
      return "xml";
    };
    k.Ub = function(a, b) {
      if (ll(a))
        return Am(this, a, b);
      if (ml(a))
        return this.jg(a, b);
      if ("string" === typeof a) {
        var c = nl(a);
        return Am(this, c, b);
      }
      return null;
    };
    function Am(a, b, c) {
      a = Bm(a, b, c);
      return 0 < a.length ? a[0] : null;
    }
    k.jg = function() {
      return null;
    };
    k.Qa = function(a, b) {
      if (ll(a))
        return Bm(this, a, b);
      if (ml(a))
        return this.yc(a, b);
      if ("string" === typeof a) {
        var c = nl(a);
        return Bm(this, c, b);
      }
      return [];
    };
    function Bm(a, b, c) {
      var d = [];
      for (b = b.firstChild; b; b = b.nextSibling)
        b.nodeType == Node.ELEMENT_NODE && ga(d, a.yc(b, c));
      return d;
    }
    k.Tc = function(a, b) {
      if (ll(a))
        return null;
      if (ml(a))
        return this.vi(a, b);
      "string" === typeof a && nl(a);
      return null;
    };
    k.vi = function() {
      return null;
    };
    k.kb = function(a) {
      return ll(a) ? this.qg(a) : ml(a) ? this.Ze(a) : "string" === typeof a ? (a = nl(a), this.qg(a)) : null;
    };
    k.qg = function() {
      return this.defaultDataProjection;
    };
    k.Ze = function() {
      return this.defaultDataProjection;
    };
    k.yd = function(a, b) {
      return this.f.serializeToString(this.Fg(a, b));
    };
    k.Fg = function() {
      return null;
    };
    k.Xb = function(a, b) {
      var c = this.Yb(a, b);
      return this.f.serializeToString(c);
    };
    k.Yb = function() {
      return null;
    };
    k.bd = function(a, b) {
      var c = this.de(a, b);
      return this.f.serializeToString(c);
    };
    k.de = function() {
      return null;
    };
    function Cm(a) {
      a = a ? a : {};
      this.featureType = a.featureType;
      this.featureNS = a.featureNS;
      this.srsName = a.srsName;
      this.schemaLocation = "";
      this.b = {};
      this.b["http://www.opengis.net/gml"] = {
        featureMember: rl(Cm.prototype.Xd),
        featureMembers: rl(Cm.prototype.Xd)
      };
      zm.call(this);
    }
    u(Cm, zm);
    var Dm = /^[\s\xa0]*$/;
    k = Cm.prototype;
    k.Xd = function(a, b) {
      var c = a.localName,
          d = null;
      if ("FeatureCollection" == c)
        "http://www.opengis.net/wfs" === a.namespaceURI ? d = L([], this.b, a, b, this) : d = L(null, this.b, a, b, this);
      else if ("featureMembers" == c || "featureMember" == c) {
        var e = b[0],
            f = e.featureType,
            g = e.featureNS,
            h,
            l;
        if (!f && a.childNodes) {
          f = [];
          g = {};
          h = 0;
          for (l = a.childNodes.length; h < l; ++h) {
            var m = a.childNodes[h];
            if (1 === m.nodeType) {
              var p = m.nodeName.split(":").pop();
              if (-1 === f.indexOf(p)) {
                var n = "",
                    q = 0,
                    m = m.namespaceURI,
                    r;
                for (r in g) {
                  if (g[r] === m) {
                    n = r;
                    break;
                  }
                  ++q;
                }
                n || (n = "p" + q, g[n] = m);
                f.push(n + ":" + p);
              }
            }
          }
          "featureMember" != c && (e.featureType = f, e.featureNS = g);
        }
        "string" === typeof g && (h = g, g = {}, g.p0 = h);
        var e = {},
            f = Array.isArray(f) ? f : [f],
            v;
        for (v in g) {
          p = {};
          h = 0;
          for (l = f.length; h < l; ++h)
            (-1 === f[h].indexOf(":") ? "p0" : f[h].split(":")[0]) === v && (p[f[h].split(":").pop()] = "featureMembers" == c ? ql(this.ig, this) : rl(this.ig, this));
          e[g[v]] = p;
        }
        "featureMember" == c ? d = L(void 0, e, a, b) : d = L([], e, a, b);
      }
      null === d && (d = []);
      return d;
    };
    k.We = function(a, b) {
      var c = b[0];
      c.srsName = a.firstElementChild.getAttribute("srsName");
      var d = L(null, this.Jg, a, b, this);
      if (d)
        return Fl(d, !1, c);
    };
    k.ig = function(a, b) {
      var c,
          d;
      (d = a.getAttribute("fid")) || (d = a.getAttributeNS("http://www.opengis.net/gml", "id") || "");
      var e = {},
          f;
      for (c = a.firstElementChild; c; c = c.nextElementSibling) {
        var g = c.localName;
        if (0 === c.childNodes.length || 1 === c.childNodes.length && (3 === c.firstChild.nodeType || 4 === c.firstChild.nodeType)) {
          var h = jl(c, !1);
          Dm.test(h) && (h = void 0);
          e[g] = h;
        } else
          "boundedBy" !== g && (f = g), e[g] = this.We(c, b);
      }
      c = new H(e);
      f && c.Vc(f);
      d && c.kc(d);
      return c;
    };
    k.Ai = function(a, b) {
      var c = this.Ve(a, b);
      if (c) {
        var d = new E(null);
        d.ca("XYZ", c);
        return d;
      }
    };
    k.yi = function(a, b) {
      var c = L([], this.sj, a, b, this);
      if (c)
        return new O(c);
    };
    k.xi = function(a, b) {
      var c = L([], this.rj, a, b, this);
      if (c) {
        var d = new N(null);
        Ll(d, c);
        return d;
      }
    };
    k.zi = function(a, b) {
      var c = L([], this.tj, a, b, this);
      if (c) {
        var d = new P(null);
        Nl(d, c);
        return d;
      }
    };
    k.ri = function(a, b) {
      yl(this.wj, a, b, this);
    };
    k.yh = function(a, b) {
      yl(this.pj, a, b, this);
    };
    k.si = function(a, b) {
      yl(this.xj, a, b, this);
    };
    k.Xe = function(a, b) {
      var c = this.Ve(a, b);
      if (c) {
        var d = new M(null);
        d.ca("XYZ", c);
        return d;
      }
    };
    k.Lo = function(a, b) {
      var c = L(null, this.fe, a, b, this);
      if (c)
        return c;
    };
    k.wi = function(a, b) {
      var c = this.Ve(a, b);
      if (c) {
        var d = new yf(null);
        zf(d, "XYZ", c);
        return d;
      }
    };
    k.Ye = function(a, b) {
      var c = L([null], this.qf, a, b, this);
      if (c && c[0]) {
        var d = new F(null),
            e = c[0],
            f = [e.length],
            g,
            h;
        g = 1;
        for (h = c.length; g < h; ++g)
          ga(e, c[g]), f.push(e.length);
        d.ca("XYZ", e, f);
        return d;
      }
    };
    k.Ve = function(a, b) {
      return L(null, this.fe, a, b, this);
    };
    k.sj = {"http://www.opengis.net/gml": {
        pointMember: ql(Cm.prototype.ri),
        pointMembers: ql(Cm.prototype.ri)
      }};
    k.rj = {"http://www.opengis.net/gml": {
        lineStringMember: ql(Cm.prototype.yh),
        lineStringMembers: ql(Cm.prototype.yh)
      }};
    k.tj = {"http://www.opengis.net/gml": {
        polygonMember: ql(Cm.prototype.si),
        polygonMembers: ql(Cm.prototype.si)
      }};
    k.wj = {"http://www.opengis.net/gml": {Point: ql(Cm.prototype.Ve)}};
    k.pj = {"http://www.opengis.net/gml": {LineString: ql(Cm.prototype.Xe)}};
    k.xj = {"http://www.opengis.net/gml": {Polygon: ql(Cm.prototype.Ye)}};
    k.ge = {"http://www.opengis.net/gml": {LinearRing: rl(Cm.prototype.Lo)}};
    k.vi = function(a, b) {
      var c = this.We(a, [Dl(this, a, b ? b : {})]);
      return c ? c : null;
    };
    k.yc = function(a, b) {
      var c = {
        featureType: this.featureType,
        featureNS: this.featureNS
      };
      b && pb(c, Dl(this, a, b));
      return this.Xd(a, [c]) || [];
    };
    k.Ze = function(a) {
      return Gb(this.srsName ? this.srsName : a.firstElementChild.getAttribute("srsName"));
    };
    function Em(a) {
      a = jl(a, !1);
      return Fm(a);
    }
    function Fm(a) {
      if (a = /^\s*(true|1)|(false|0)\s*$/.exec(a))
        return void 0 !== a[1] || !1;
    }
    function Gm(a) {
      a = jl(a, !1);
      a = Date.parse(a);
      return isNaN(a) ? void 0 : a / 1E3;
    }
    function Hm(a) {
      a = jl(a, !1);
      return Im(a);
    }
    function Im(a) {
      if (a = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))
        return parseFloat(a[1]);
    }
    function Jm(a) {
      a = jl(a, !1);
      return Km(a);
    }
    function Km(a) {
      if (a = /^\s*(\d+)\s*$/.exec(a))
        return parseInt(a[1], 10);
    }
    function Q(a) {
      return jl(a, !1).trim();
    }
    function Lm(a, b) {
      Mm(a, b ? "1" : "0");
    }
    function Nm(a, b) {
      a.appendChild(gl.createTextNode(b.toPrecision()));
    }
    function Om(a, b) {
      a.appendChild(gl.createTextNode(b.toString()));
    }
    function Mm(a, b) {
      a.appendChild(gl.createTextNode(b));
    }
    ;
    function Pm(a) {
      a = a ? a : {};
      Cm.call(this, a);
      this.o = void 0 !== a.surface ? a.surface : !1;
      this.i = void 0 !== a.curve ? a.curve : !1;
      this.l = void 0 !== a.multiCurve ? a.multiCurve : !0;
      this.j = void 0 !== a.multiSurface ? a.multiSurface : !0;
      this.schemaLocation = a.schemaLocation ? a.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd";
    }
    u(Pm, Cm);
    k = Pm.prototype;
    k.Po = function(a, b) {
      var c = L([], this.qj, a, b, this);
      if (c) {
        var d = new N(null);
        Ll(d, c);
        return d;
      }
    };
    k.Qo = function(a, b) {
      var c = L([], this.uj, a, b, this);
      if (c) {
        var d = new P(null);
        Nl(d, c);
        return d;
      }
    };
    k.Zg = function(a, b) {
      yl(this.mj, a, b, this);
    };
    k.Wi = function(a, b) {
      yl(this.Bj, a, b, this);
    };
    k.To = function(a, b) {
      return L([null], this.vj, a, b, this);
    };
    k.Wo = function(a, b) {
      return L([null], this.Aj, a, b, this);
    };
    k.Uo = function(a, b) {
      return L([null], this.qf, a, b, this);
    };
    k.Oo = function(a, b) {
      return L([null], this.fe, a, b, this);
    };
    k.Jl = function(a, b) {
      var c = L(void 0, this.ge, a, b, this);
      c && b[b.length - 1].push(c);
    };
    k.ck = function(a, b) {
      var c = L(void 0, this.ge, a, b, this);
      c && (b[b.length - 1][0] = c);
    };
    k.Bi = function(a, b) {
      var c = L([null], this.Cj, a, b, this);
      if (c && c[0]) {
        var d = new F(null),
            e = c[0],
            f = [e.length],
            g,
            h;
        g = 1;
        for (h = c.length; g < h; ++g)
          ga(e, c[g]), f.push(e.length);
        d.ca("XYZ", e, f);
        return d;
      }
    };
    k.ti = function(a, b) {
      var c = L([null], this.nj, a, b, this);
      if (c) {
        var d = new M(null);
        d.ca("XYZ", c);
        return d;
      }
    };
    k.Ko = function(a, b) {
      var c = L([null], this.oj, a, b, this);
      return Va(c[1][0], c[1][1], c[2][0], c[2][1]);
    };
    k.Mo = function(a, b) {
      for (var c = jl(a, !1),
          d = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,
          e = [],
          f; f = d.exec(c); )
        e.push(parseFloat(f[1])), c = c.substr(f[0].length);
      if ("" === c) {
        c = b[0].srsName;
        d = "enu";
        c && (d = Gb(c).b);
        if ("neu" === d)
          for (c = 0, d = e.length; c < d; c += 3)
            f = e[c], e[c] = e[c + 1], e[c + 1] = f;
        c = e.length;
        2 == c && e.push(0);
        if (c)
          return e;
      }
    };
    k.ng = function(a, b) {
      var c = jl(a, !1).replace(/^\s*|\s*$/g, ""),
          d = b[0].srsName,
          e = a.parentNode.getAttribute("srsDimension"),
          f = "enu";
      d && (f = Gb(d).b);
      c = c.split(/\s+/);
      d = 2;
      a.getAttribute("srsDimension") ? d = Km(a.getAttribute("srsDimension")) : a.getAttribute("dimension") ? d = Km(a.getAttribute("dimension")) : e && (d = Km(e));
      for (var g,
          h,
          l = [],
          m = 0,
          p = c.length; m < p; m += d)
        e = parseFloat(c[m]), g = parseFloat(c[m + 1]), h = 3 === d ? parseFloat(c[m + 2]) : 0, "en" === f.substr(0, 2) ? l.push(e, g, h) : l.push(g, e, h);
      return l;
    };
    k.fe = {"http://www.opengis.net/gml": {
        pos: rl(Pm.prototype.Mo),
        posList: rl(Pm.prototype.ng)
      }};
    k.qf = {"http://www.opengis.net/gml": {
        interior: Pm.prototype.Jl,
        exterior: Pm.prototype.ck
      }};
    k.Jg = {"http://www.opengis.net/gml": {
        Point: rl(Cm.prototype.Ai),
        MultiPoint: rl(Cm.prototype.yi),
        LineString: rl(Cm.prototype.Xe),
        MultiLineString: rl(Cm.prototype.xi),
        LinearRing: rl(Cm.prototype.wi),
        Polygon: rl(Cm.prototype.Ye),
        MultiPolygon: rl(Cm.prototype.zi),
        Surface: rl(Pm.prototype.Bi),
        MultiSurface: rl(Pm.prototype.Qo),
        Curve: rl(Pm.prototype.ti),
        MultiCurve: rl(Pm.prototype.Po),
        Envelope: rl(Pm.prototype.Ko)
      }};
    k.qj = {"http://www.opengis.net/gml": {
        curveMember: ql(Pm.prototype.Zg),
        curveMembers: ql(Pm.prototype.Zg)
      }};
    k.uj = {"http://www.opengis.net/gml": {
        surfaceMember: ql(Pm.prototype.Wi),
        surfaceMembers: ql(Pm.prototype.Wi)
      }};
    k.mj = {"http://www.opengis.net/gml": {
        LineString: ql(Cm.prototype.Xe),
        Curve: ql(Pm.prototype.ti)
      }};
    k.Bj = {"http://www.opengis.net/gml": {
        Polygon: ql(Cm.prototype.Ye),
        Surface: ql(Pm.prototype.Bi)
      }};
    k.Cj = {"http://www.opengis.net/gml": {patches: rl(Pm.prototype.To)}};
    k.nj = {"http://www.opengis.net/gml": {segments: rl(Pm.prototype.Wo)}};
    k.oj = {"http://www.opengis.net/gml": {
        lowerCorner: ql(Pm.prototype.ng),
        upperCorner: ql(Pm.prototype.ng)
      }};
    k.vj = {"http://www.opengis.net/gml": {PolygonPatch: rl(Pm.prototype.Uo)}};
    k.Aj = {"http://www.opengis.net/gml": {LineStringSegment: rl(Pm.prototype.Oo)}};
    function Qm(a, b, c) {
      c = c[c.length - 1].srsName;
      b = b.X();
      for (var d = b.length,
          e = Array(d),
          f,
          g = 0; g < d; ++g) {
        f = b[g];
        var h = g,
            l = "enu";
        c && (l = Gb(c).b);
        e[h] = "en" === l.substr(0, 2) ? f[0] + " " + f[1] : f[1] + " " + f[0];
      }
      Mm(a, e.join(" "));
    }
    k.hj = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      d && a.setAttribute("srsName", d);
      d = il(a.namespaceURI, "pos");
      a.appendChild(d);
      c = c[c.length - 1].srsName;
      a = "enu";
      c && (a = Gb(c).b);
      b = b.X();
      Mm(d, "en" === a.substr(0, 2) ? b[0] + " " + b[1] : b[1] + " " + b[0]);
    };
    var Rm = {"http://www.opengis.net/gml": {
        lowerCorner: J(Mm),
        upperCorner: J(Mm)
      }};
    k = Pm.prototype;
    k.Jp = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      d && a.setAttribute("srsName", d);
      zl({node: a}, Rm, wl, [b[0] + " " + b[1], b[2] + " " + b[3]], c, ["lowerCorner", "upperCorner"], this);
    };
    k.ej = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      d && a.setAttribute("srsName", d);
      d = il(a.namespaceURI, "posList");
      a.appendChild(d);
      Qm(d, b, c);
    };
    k.zj = function(a, b) {
      var c = b[b.length - 1],
          d = c.node,
          e = c.exteriorWritten;
      void 0 === e && (c.exteriorWritten = !0);
      return il(d.namespaceURI, void 0 !== e ? "interior" : "exterior");
    };
    k.nf = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      "PolygonPatch" !== a.nodeName && d && a.setAttribute("srsName", d);
      "Polygon" === a.nodeName || "PolygonPatch" === a.nodeName ? (b = b.jd(), zl({
        node: a,
        srsName: d
      }, Sm, this.zj, b, c, void 0, this)) : "Surface" === a.nodeName && (d = il(a.namespaceURI, "patches"), a.appendChild(d), a = il(d.namespaceURI, "PolygonPatch"), d.appendChild(a), this.nf(a, b, c));
    };
    k.mf = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      "LineStringSegment" !== a.nodeName && d && a.setAttribute("srsName", d);
      "LineString" === a.nodeName || "LineStringSegment" === a.nodeName ? (d = il(a.namespaceURI, "posList"), a.appendChild(d), Qm(d, b, c)) : "Curve" === a.nodeName && (d = il(a.namespaceURI, "segments"), a.appendChild(d), a = il(d.namespaceURI, "LineStringSegment"), d.appendChild(a), this.mf(a, b, c));
    };
    k.gj = function(a, b, c) {
      var d = c[c.length - 1],
          e = d.srsName,
          d = d.surface;
      e && a.setAttribute("srsName", e);
      b = b.Od();
      zl({
        node: a,
        srsName: e,
        surface: d
      }, Tm, this.c, b, c, void 0, this);
    };
    k.Kp = function(a, b, c) {
      var d = c[c.length - 1].srsName;
      d && a.setAttribute("srsName", d);
      b = b.Ie();
      zl({
        node: a,
        srsName: d
      }, Um, ul("pointMember"), b, c, void 0, this);
    };
    k.fj = function(a, b, c) {
      var d = c[c.length - 1],
          e = d.srsName,
          d = d.curve;
      e && a.setAttribute("srsName", e);
      b = b.hd();
      zl({
        node: a,
        srsName: e,
        curve: d
      }, Vm, this.c, b, c, void 0, this);
    };
    k.ij = function(a, b, c) {
      var d = il(a.namespaceURI, "LinearRing");
      a.appendChild(d);
      this.ej(d, b, c);
    };
    k.jj = function(a, b, c) {
      var d = this.a(b, c);
      d && (a.appendChild(d), this.nf(d, b, c));
    };
    k.Lp = function(a, b, c) {
      var d = il(a.namespaceURI, "Point");
      a.appendChild(d);
      this.hj(d, b, c);
    };
    k.dj = function(a, b, c) {
      var d = this.a(b, c);
      d && (a.appendChild(d), this.mf(d, b, c));
    };
    k.zd = function(a, b, c) {
      var d = c[c.length - 1],
          e = pb({}, d);
      e.node = a;
      var f;
      Array.isArray(b) ? d.dataProjection ? f = Xb(b, d.featureProjection, d.dataProjection) : f = b : f = Fl(b, !0, d);
      zl(e, Wm, this.a, [f], c, void 0, this);
    };
    k.cj = function(a, b, c) {
      var d = b.a;
      d && a.setAttribute("fid", d);
      var d = c[c.length - 1],
          e = d.featureNS,
          f = b.c;
      d.Uc || (d.Uc = {}, d.Uc[e] = {});
      var g = b.N();
      b = [];
      var h = [],
          l;
      for (l in g) {
        var m = g[l];
        null !== m && (b.push(l), h.push(m), l == f || m instanceof cf ? l in d.Uc[e] || (d.Uc[e][l] = J(this.zd, this)) : l in d.Uc[e] || (d.Uc[e][l] = J(Mm)));
      }
      l = pb({}, d);
      l.node = a;
      zl(l, d.Uc, ul(void 0, e), h, c, b);
    };
    var Tm = {"http://www.opengis.net/gml": {
        surfaceMember: J(Pm.prototype.jj),
        polygonMember: J(Pm.prototype.jj)
      }},
        Um = {"http://www.opengis.net/gml": {pointMember: J(Pm.prototype.Lp)}},
        Vm = {"http://www.opengis.net/gml": {
            lineStringMember: J(Pm.prototype.dj),
            curveMember: J(Pm.prototype.dj)
          }},
        Sm = {"http://www.opengis.net/gml": {
            exterior: J(Pm.prototype.ij),
            interior: J(Pm.prototype.ij)
          }},
        Wm = {"http://www.opengis.net/gml": {
            Curve: J(Pm.prototype.mf),
            MultiCurve: J(Pm.prototype.fj),
            Point: J(Pm.prototype.hj),
            MultiPoint: J(Pm.prototype.Kp),
            LineString: J(Pm.prototype.mf),
            MultiLineString: J(Pm.prototype.fj),
            LinearRing: J(Pm.prototype.ej),
            Polygon: J(Pm.prototype.nf),
            MultiPolygon: J(Pm.prototype.gj),
            Surface: J(Pm.prototype.nf),
            MultiSurface: J(Pm.prototype.gj),
            Envelope: J(Pm.prototype.Jp)
          }},
        Xm = {
          MultiLineString: "lineStringMember",
          MultiCurve: "curveMember",
          MultiPolygon: "polygonMember",
          MultiSurface: "surfaceMember"
        };
    Pm.prototype.c = function(a, b) {
      return il("http://www.opengis.net/gml", Xm[b[b.length - 1].node.nodeName]);
    };
    Pm.prototype.a = function(a, b) {
      var c = b[b.length - 1],
          d = c.multiSurface,
          e = c.surface,
          f = c.curve,
          c = c.multiCurve,
          g;
      Array.isArray(a) ? g = "Envelope" : (g = a.T(), "MultiPolygon" === g && !0 === d ? g = "MultiSurface" : "Polygon" === g && !0 === e ? g = "Surface" : "LineString" === g && !0 === f ? g = "Curve" : "MultiLineString" === g && !0 === c && (g = "MultiCurve"));
      return il("http://www.opengis.net/gml", g);
    };
    Pm.prototype.de = function(a, b) {
      b = El(this, b);
      var c = il("http://www.opengis.net/gml", "geom"),
          d = {
            node: c,
            srsName: this.srsName,
            curve: this.i,
            surface: this.o,
            multiSurface: this.j,
            multiCurve: this.l
          };
      b && pb(d, b);
      this.zd(c, a, [d]);
      return c;
    };
    Pm.prototype.Yb = function(a, b) {
      b = El(this, b);
      var c = il("http://www.opengis.net/gml", "featureMembers");
      c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.schemaLocation);
      var d = {
        srsName: this.srsName,
        curve: this.i,
        surface: this.o,
        multiSurface: this.j,
        multiCurve: this.l,
        featureNS: this.featureNS,
        featureType: this.featureType
      };
      b && pb(d, b);
      var d = [d],
          e = d[d.length - 1],
          f = e.featureType,
          g = e.featureNS,
          h = {};
      h[g] = {};
      h[g][f] = J(this.cj, this);
      e = pb({}, e);
      e.node = c;
      zl(e, h, ul(f, g), a, d);
      return c;
    };
    function Ym(a) {
      a = a ? a : {};
      Cm.call(this, a);
      this.b["http://www.opengis.net/gml"].featureMember = ql(Cm.prototype.Xd);
      this.schemaLocation = a.schemaLocation ? a.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd";
    }
    u(Ym, Cm);
    k = Ym.prototype;
    k.ui = function(a, b) {
      var c = jl(a, !1).replace(/^\s*|\s*$/g, ""),
          d = b[0].srsName,
          e = a.parentNode.getAttribute("srsDimension"),
          f = "enu";
      d && (d = Gb(d)) && (f = d.b);
      c = c.split(/[\s,]+/);
      d = 2;
      a.getAttribute("srsDimension") ? d = Km(a.getAttribute("srsDimension")) : a.getAttribute("dimension") ? d = Km(a.getAttribute("dimension")) : e && (d = Km(e));
      for (var g,
          h,
          l = [],
          m = 0,
          p = c.length; m < p; m += d)
        e = parseFloat(c[m]), g = parseFloat(c[m + 1]), h = 3 === d ? parseFloat(c[m + 2]) : 0, "en" === f.substr(0, 2) ? l.push(e, g, h) : l.push(g, e, h);
      return l;
    };
    k.Io = function(a, b) {
      var c = L([null], this.lj, a, b, this);
      return Va(c[1][0], c[1][1], c[1][3], c[1][4]);
    };
    k.Hl = function(a, b) {
      var c = L(void 0, this.ge, a, b, this);
      c && b[b.length - 1].push(c);
    };
    k.ro = function(a, b) {
      var c = L(void 0, this.ge, a, b, this);
      c && (b[b.length - 1][0] = c);
    };
    k.fe = {"http://www.opengis.net/gml": {coordinates: rl(Ym.prototype.ui)}};
    k.qf = {"http://www.opengis.net/gml": {
        innerBoundaryIs: Ym.prototype.Hl,
        outerBoundaryIs: Ym.prototype.ro
      }};
    k.lj = {"http://www.opengis.net/gml": {coordinates: ql(Ym.prototype.ui)}};
    k.Jg = {"http://www.opengis.net/gml": {
        Point: rl(Cm.prototype.Ai),
        MultiPoint: rl(Cm.prototype.yi),
        LineString: rl(Cm.prototype.Xe),
        MultiLineString: rl(Cm.prototype.xi),
        LinearRing: rl(Cm.prototype.wi),
        Polygon: rl(Cm.prototype.Ye),
        MultiPolygon: rl(Cm.prototype.zi),
        Box: rl(Ym.prototype.Io)
      }};
    function Zm(a) {
      a = a ? a : {};
      zm.call(this);
      this.defaultDataProjection = Gb("EPSG:4326");
      this.b = a.readExtensions;
    }
    u(Zm, zm);
    var $m = [null, "http://www.topografix.com/GPX/1/0", "http://www.topografix.com/GPX/1/1"];
    function an(a, b, c, d) {
      a.push(parseFloat(c.getAttribute("lon")), parseFloat(c.getAttribute("lat")));
      "ele" in d ? (a.push(d.ele), delete d.ele, b.hasZ = !0) : a.push(0);
      "time" in d ? (a.push(d.time), delete d.time, b.hasM = !0) : a.push(0);
      return a;
    }
    function bn(a, b, c) {
      var d = "XY",
          e = 2;
      a.hasZ && a.hasM ? (d = "XYZM", e = 4) : a.hasZ ? (d = "XYZ", e = 3) : a.hasM && (d = "XYM", e = 3);
      if (4 !== e) {
        var f,
            g;
        f = 0;
        for (g = b.length / 4; f < g; f++)
          b[f * e] = b[4 * f], b[f * e + 1] = b[4 * f + 1], a.hasZ && (b[f * e + 2] = b[4 * f + 2]), a.hasM && (b[f * e + 2] = b[4 * f + 3]);
        b.length = b.length / 4 * e;
        if (c)
          for (f = 0, g = c.length; f < g; f++)
            c[f] = c[f] / 4 * e;
      }
      return d;
    }
    function cn(a, b) {
      var c = b[b.length - 1],
          d = a.getAttribute("href");
      null !== d && (c.link = d);
      yl(dn, a, b);
    }
    function en(a, b) {
      b[b.length - 1].extensionsNode_ = a;
    }
    function fn(a, b) {
      var c = b[0],
          d = L({
            flatCoordinates: [],
            layoutOptions: {}
          }, gn, a, b);
      if (d) {
        var e = d.flatCoordinates;
        delete d.flatCoordinates;
        var f = d.layoutOptions;
        delete d.layoutOptions;
        var f = bn(f, e),
            g = new M(null);
        g.ca(f, e);
        Fl(g, !1, c);
        c = new H(g);
        c.H(d);
        return c;
      }
    }
    function hn(a, b) {
      var c = b[0],
          d = L({
            flatCoordinates: [],
            ends: [],
            layoutOptions: {}
          }, jn, a, b);
      if (d) {
        var e = d.flatCoordinates;
        delete d.flatCoordinates;
        var f = d.ends;
        delete d.ends;
        var g = d.layoutOptions;
        delete d.layoutOptions;
        var g = bn(g, e, f),
            h = new N(null);
        h.ca(g, e, f);
        Fl(h, !1, c);
        c = new H(h);
        c.H(d);
        return c;
      }
    }
    function kn(a, b) {
      var c = b[0],
          d = L({}, ln, a, b);
      if (d) {
        var e = {},
            f = an([], e, a, d),
            e = bn(e, f),
            f = new E(f, e);
        Fl(f, !1, c);
        c = new H(f);
        c.H(d);
        return c;
      }
    }
    var mn = {
      rte: fn,
      trk: hn,
      wpt: kn
    },
        nn = K($m, {
          rte: ql(fn),
          trk: ql(hn),
          wpt: ql(kn)
        }),
        dn = K($m, {
          text: I(Q, "linkText"),
          type: I(Q, "linkType")
        }),
        gn = K($m, {
          name: I(Q),
          cmt: I(Q),
          desc: I(Q),
          src: I(Q),
          link: cn,
          number: I(Jm),
          extensions: en,
          type: I(Q),
          rtept: function(a, b) {
            var c = L({}, on, a, b);
            if (c) {
              var d = b[b.length - 1];
              an(d.flatCoordinates, d.layoutOptions, a, c);
            }
          }
        }),
        on = K($m, {
          ele: I(Hm),
          time: I(Gm)
        }),
        jn = K($m, {
          name: I(Q),
          cmt: I(Q),
          desc: I(Q),
          src: I(Q),
          link: cn,
          number: I(Jm),
          type: I(Q),
          extensions: en,
          trkseg: function(a, b) {
            var c = b[b.length - 1];
            yl(pn, a, b);
            c.ends.push(c.flatCoordinates.length);
          }
        }),
        pn = K($m, {trkpt: function(a, b) {
            var c = L({}, qn, a, b);
            if (c) {
              var d = b[b.length - 1];
              an(d.flatCoordinates, d.layoutOptions, a, c);
            }
          }}),
        qn = K($m, {
          ele: I(Hm),
          time: I(Gm)
        }),
        ln = K($m, {
          ele: I(Hm),
          time: I(Gm),
          magvar: I(Hm),
          geoidheight: I(Hm),
          name: I(Q),
          cmt: I(Q),
          desc: I(Q),
          src: I(Q),
          link: cn,
          sym: I(Q),
          type: I(Q),
          fix: I(Q),
          sat: I(Jm),
          hdop: I(Hm),
          vdop: I(Hm),
          pdop: I(Hm),
          ageofdgpsdata: I(Hm),
          dgpsid: I(Jm),
          extensions: en
        });
    function rn(a, b) {
      b || (b = []);
      for (var c = 0,
          d = b.length; c < d; ++c) {
        var e = b[c];
        if (a.b) {
          var f = e.get("extensionsNode_") || null;
          a.b(e, f);
        }
        e.set("extensionsNode_", void 0);
      }
    }
    Zm.prototype.jg = function(a, b) {
      if (!ea($m, a.namespaceURI))
        return null;
      var c = mn[a.localName];
      if (!c)
        return null;
      c = c(a, [Dl(this, a, b)]);
      if (!c)
        return null;
      rn(this, [c]);
      return c;
    };
    Zm.prototype.yc = function(a, b) {
      if (!ea($m, a.namespaceURI))
        return [];
      if ("gpx" == a.localName) {
        var c = L([], nn, a, [Dl(this, a, b)]);
        if (c)
          return rn(this, c), c;
      }
      return [];
    };
    function sn(a, b, c) {
      a.setAttribute("href", b);
      b = c[c.length - 1].properties;
      zl({node: a}, tn, wl, [b.linkText, b.linkType], c, un);
    }
    function vn(a, b, c) {
      var d = c[c.length - 1],
          e = d.node.namespaceURI,
          f = d.properties;
      a.setAttributeNS(null, "lat", b[1]);
      a.setAttributeNS(null, "lon", b[0]);
      switch (d.geometryLayout) {
        case "XYZM":
          b[3] && (f.time = b[3]);
        case "XYZ":
          b[2] && (f.ele = b[2]);
          break;
        case "XYM":
          b[2] && (f.time = b[2]);
      }
      b = "rtept" == a.nodeName ? wn[e] : xn[e];
      d = xl(f, b);
      zl({
        node: a,
        properties: f
      }, yn, wl, d, c, b);
    }
    var un = ["text", "type"],
        tn = K($m, {
          text: J(Mm),
          type: J(Mm)
        }),
        zn = K($m, "name cmt desc src link number type rtept".split(" ")),
        An = K($m, {
          name: J(Mm),
          cmt: J(Mm),
          desc: J(Mm),
          src: J(Mm),
          link: J(sn),
          number: J(Om),
          type: J(Mm),
          rtept: tl(J(vn))
        }),
        wn = K($m, ["ele", "time"]),
        Bn = K($m, "name cmt desc src link number type trkseg".split(" ")),
        En = K($m, {
          name: J(Mm),
          cmt: J(Mm),
          desc: J(Mm),
          src: J(Mm),
          link: J(sn),
          number: J(Om),
          type: J(Mm),
          trkseg: tl(J(function(a, b, c) {
            zl({
              node: a,
              geometryLayout: b.ka,
              properties: {}
            }, Cn, Dn, b.X(), c);
          }))
        }),
        Dn = ul("trkpt"),
        Cn = K($m, {trkpt: J(vn)}),
        xn = K($m, "ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),
        yn = K($m, {
          ele: J(Nm),
          time: J(function(a, b) {
            var c = new Date(1E3 * b);
            a.appendChild(gl.createTextNode(c.getUTCFullYear() + "-" + Oe(c.getUTCMonth() + 1) + "-" + Oe(c.getUTCDate()) + "T" + Oe(c.getUTCHours()) + ":" + Oe(c.getUTCMinutes()) + ":" + Oe(c.getUTCSeconds()) + "Z"));
          }),
          magvar: J(Nm),
          geoidheight: J(Nm),
          name: J(Mm),
          cmt: J(Mm),
          desc: J(Mm),
          src: J(Mm),
          link: J(sn),
          sym: J(Mm),
          type: J(Mm),
          fix: J(Mm),
          sat: J(Om),
          hdop: J(Nm),
          vdop: J(Nm),
          pdop: J(Nm),
          ageofdgpsdata: J(Nm),
          dgpsid: J(Om)
        }),
        Fn = {
          Point: "wpt",
          LineString: "rte",
          MultiLineString: "trk"
        };
    function Gn(a, b) {
      var c = a.U();
      if (c && (c = Fn[c.T()]))
        return il(b[b.length - 1].node.namespaceURI, c);
    }
    var Hn = K($m, {
      rte: J(function(a, b, c) {
        var d = c[0],
            e = b.N();
        a = {
          node: a,
          properties: e
        };
        if (b = b.U())
          b = Fl(b, !0, d), a.geometryLayout = b.ka, e.rtept = b.X();
        d = zn[c[c.length - 1].node.namespaceURI];
        e = xl(e, d);
        zl(a, An, wl, e, c, d);
      }),
      trk: J(function(a, b, c) {
        var d = c[0],
            e = b.N();
        a = {
          node: a,
          properties: e
        };
        if (b = b.U())
          b = Fl(b, !0, d), e.trkseg = b.hd();
        d = Bn[c[c.length - 1].node.namespaceURI];
        e = xl(e, d);
        zl(a, En, wl, e, c, d);
      }),
      wpt: J(function(a, b, c) {
        var d = c[0],
            e = c[c.length - 1];
        e.properties = b.N();
        if (b = b.U())
          b = Fl(b, !0, d), e.geometryLayout = b.ka, vn(a, b.X(), c);
      })
    });
    Zm.prototype.Yb = function(a, b) {
      b = El(this, b);
      var c = il("http://www.topografix.com/GPX/1/1", "gpx");
      c.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
      c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd");
      c.setAttribute("version", "1.1");
      c.setAttribute("creator", "OpenLayers");
      zl({node: c}, Hn, Gn, a, [b]);
      return c;
    };
    function In() {
      Cl.call(this);
    }
    u(In, Cl);
    function Jn(a) {
      return "string" === typeof a ? a : "";
    }
    k = In.prototype;
    k.T = function() {
      return "text";
    };
    k.Ub = function(a, b) {
      return this.Wd(Jn(a), El(this, b));
    };
    k.Qa = function(a, b) {
      return this.lg(Jn(a), El(this, b));
    };
    k.Tc = function(a, b) {
      return this.ud(Jn(a), El(this, b));
    };
    k.kb = function() {
      return this.defaultDataProjection;
    };
    k.yd = function(a, b) {
      return this.be(a, El(this, b));
    };
    k.Xb = function(a, b) {
      return this.Gg(a, El(this, b));
    };
    k.bd = function(a, b) {
      return this.Ad(a, El(this, b));
    };
    function Kn(a) {
      a = a ? a : {};
      Cl.call(this);
      this.defaultDataProjection = Gb("EPSG:4326");
      this.b = a.altitudeMode ? a.altitudeMode : "none";
    }
    u(Kn, In);
    var Ln = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,
        Mn = /^H.([A-Z]{3}).*?:(.*)/,
        Nn = /^HFDTE(\d{2})(\d{2})(\d{2})/,
        On = /\r\n|\r|\n/;
    k = Kn.prototype;
    k.Wd = function(a, b) {
      var c = this.b,
          d = a.split(On),
          e = {},
          f = [],
          g = 2E3,
          h = 0,
          l = 1,
          m = -1,
          p,
          n;
      p = 0;
      for (n = d.length; p < n; ++p) {
        var q = d[p],
            r;
        if ("B" == q.charAt(0)) {
          if (r = Ln.exec(q)) {
            var q = parseInt(r[1], 10),
                v = parseInt(r[2], 10),
                x = parseInt(r[3], 10),
                y = parseInt(r[4], 10) + parseInt(r[5], 10) / 6E4;
            "S" == r[6] && (y = -y);
            var z = parseInt(r[7], 10) + parseInt(r[8], 10) / 6E4;
            "W" == r[9] && (z = -z);
            f.push(z, y);
            "none" != c && f.push("gps" == c ? parseInt(r[11], 10) : "barometric" == c ? parseInt(r[12], 10) : 0);
            r = Date.UTC(g, h, l, q, v, x);
            r < m && (r = Date.UTC(g, h, l + 1, q, v, x));
            f.push(r / 1E3);
            m = r;
          }
        } else
          "H" == q.charAt(0) && ((r = Nn.exec(q)) ? (l = parseInt(r[1], 10), h = parseInt(r[2], 10) - 1, g = 2E3 + parseInt(r[3], 10)) : (r = Mn.exec(q)) && (e[r[1]] = r[2].trim()));
      }
      if (!f.length)
        return null;
      d = new M(null);
      d.ca("none" == c ? "XYM" : "XYZM", f);
      c = new H(Fl(d, !1, b));
      c.H(e);
      return c;
    };
    k.lg = function(a, b) {
      var c = this.Wd(a, b);
      return c ? [c] : [];
    };
    k.be = function() {};
    k.Gg = function() {};
    k.Ad = function() {};
    k.ud = function() {};
    function Pn(a, b, c, d, e, f) {
      Dc.call(this);
      this.l = null;
      this.M = a ? a : new Image;
      null !== d && (this.M.crossOrigin = d);
      this.c = f ? document.createElement("CANVAS") : null;
      this.g = f;
      this.i = null;
      this.f = e;
      this.a = c;
      this.j = b;
      this.o = !1;
      2 == this.f && Qn(this);
    }
    u(Pn, Dc);
    function Qn(a) {
      var b = Xc(1, 1);
      try {
        b.drawImage(a.M, 0, 0), b.getImageData(0, 0, 1, 1);
      } catch (c) {
        a.o = !0;
      }
    }
    Pn.prototype.v = function() {
      this.f = 3;
      this.i.forEach(rc);
      this.i = null;
      this.b("change");
    };
    Pn.prototype.I = function() {
      this.f = 2;
      this.a && (this.M.width = this.a[0], this.M.height = this.a[1]);
      this.a = [this.M.width, this.M.height];
      this.i.forEach(rc);
      this.i = null;
      Qn(this);
      if (!this.o && null !== this.g) {
        this.c.width = this.M.width;
        this.c.height = this.M.height;
        var a = this.c.getContext("2d");
        a.drawImage(this.M, 0, 0);
        for (var b = a.getImageData(0, 0, this.M.width, this.M.height),
            c = b.data,
            d = this.g[0] / 255,
            e = this.g[1] / 255,
            f = this.g[2] / 255,
            g = 0,
            h = c.length; g < h; g += 4)
          c[g] *= d, c[g + 1] *= e, c[g + 2] *= f;
        a.putImageData(b, 0, 0);
      }
      this.b("change");
    };
    Pn.prototype.Z = function() {
      return this.c ? this.c : this.M;
    };
    Pn.prototype.load = function() {
      if (0 == this.f) {
        this.f = 1;
        this.i = [wc(this.M, "error", this.v, this), wc(this.M, "load", this.I, this)];
        try {
          this.M.src = this.j;
        } catch (a) {
          this.v();
        }
      }
    };
    function Rn(a) {
      a = a || {};
      this.j = void 0 !== a.anchor ? a.anchor : [.5, .5];
      this.I = null;
      this.a = void 0 !== a.anchorOrigin ? a.anchorOrigin : "top-left";
      this.C = void 0 !== a.anchorXUnits ? a.anchorXUnits : "fraction";
      this.G = void 0 !== a.anchorYUnits ? a.anchorYUnits : "fraction";
      this.ta = void 0 !== a.crossOrigin ? a.crossOrigin : null;
      var b = void 0 !== a.img ? a.img : null,
          c = void 0 !== a.imgSize ? a.imgSize : null,
          d = a.src;
      qa(!(void 0 !== d && b), 4);
      qa(!b || b && c, 5);
      void 0 !== d && d.length || !b || (d = b.src || w(b).toString());
      qa(void 0 !== d && 0 < d.length, 6);
      var e = void 0 !== a.src ? 0 : 2;
      this.i = void 0 !== a.color ? Qc(a.color) : null;
      var f = this.ta,
          g = this.i,
          h = uh.get(d, f, g);
      h || (h = new Pn(b, d, c, f, e, g), uh.set(d, f, g, h));
      this.b = h;
      this.qa = void 0 !== a.offset ? a.offset : [0, 0];
      this.f = void 0 !== a.offsetOrigin ? a.offsetOrigin : "top-left";
      this.u = null;
      this.A = void 0 !== a.size ? a.size : null;
      Vk.call(this, {
        opacity: void 0 !== a.opacity ? a.opacity : 1,
        rotation: void 0 !== a.rotation ? a.rotation : 0,
        scale: void 0 !== a.scale ? a.scale : 1,
        snapToPixel: void 0 !== a.snapToPixel ? a.snapToPixel : !0,
        rotateWithView: void 0 !== a.rotateWithView ? a.rotateWithView : !1
      });
    }
    u(Rn, Vk);
    k = Rn.prototype;
    k.clone = function() {
      var a = this.Z(1),
          b;
      if (2 === this.b.f)
        if ("IMG" === a.tagName.toUpperCase())
          b = a.cloneNode(!0);
        else {
          b = document.createElement("canvas");
          var c = b.getContext("2d");
          b.width = a.width;
          b.height = a.height;
          c.drawImage(a, 0, 0);
        }
      return new Rn({
        anchor: this.j.slice(),
        anchorOrigin: this.a,
        anchorXUnits: this.C,
        anchorYUnits: this.G,
        crossOrigin: this.ta,
        color: this.i && this.i.slice ? this.i.slice() : this.i || void 0,
        img: b ? b : void 0,
        imgSize: b ? this.b.a.slice() : void 0,
        src: b ? void 0 : this.b.j,
        offset: this.qa.slice(),
        offsetOrigin: this.f,
        size: null !== this.A ? this.A.slice() : void 0,
        opacity: this.g,
        scale: this.c,
        snapToPixel: this.v,
        rotation: this.l,
        rotateWithView: this.o
      });
    };
    k.Hc = function() {
      if (this.I)
        return this.I;
      var a = this.j,
          b = this.jc();
      if ("fraction" == this.C || "fraction" == this.G) {
        if (!b)
          return null;
        a = this.j.slice();
        "fraction" == this.C && (a[0] *= b[0]);
        "fraction" == this.G && (a[1] *= b[1]);
      }
      if ("top-left" != this.a) {
        if (!b)
          return null;
        a === this.j && (a = this.j.slice());
        if ("top-right" == this.a || "bottom-right" == this.a)
          a[0] = -a[0] + b[0];
        if ("bottom-left" == this.a || "bottom-right" == this.a)
          a[1] = -a[1] + b[1];
      }
      return this.I = a;
    };
    k.Zn = function() {
      return this.i;
    };
    k.Z = function(a) {
      return this.b.Z(a);
    };
    k.ue = function() {
      return this.b.a;
    };
    k.Oe = function() {
      return this.b.f;
    };
    k.cg = function() {
      var a = this.b;
      if (!a.l)
        if (a.o) {
          var b = a.a[0],
              c = a.a[1],
              d = Xc(b, c);
          d.fillRect(0, 0, b, c);
          a.l = d.canvas;
        } else
          a.l = a.M;
      return a.l;
    };
    k.Pc = function() {
      if (this.u)
        return this.u;
      var a = this.qa;
      if ("top-left" != this.f) {
        var b = this.jc(),
            c = this.b.a;
        if (!b || !c)
          return null;
        a = a.slice();
        if ("top-right" == this.f || "bottom-right" == this.f)
          a[0] = c[0] - b[0] - a[0];
        if ("bottom-left" == this.f || "bottom-right" == this.f)
          a[1] = c[1] - b[1] - a[1];
      }
      return this.u = a;
    };
    k.$n = function() {
      return this.b.j;
    };
    k.jc = function() {
      return this.A ? this.A : this.b.a;
    };
    k.zh = function(a, b) {
      return B(this.b, "change", a, b);
    };
    k.load = function() {
      this.b.load();
    };
    k.Yi = function(a, b) {
      xc(this.b, "change", a, b);
    };
    function Sn(a) {
      a = a || {};
      this.a = a.font;
      this.i = a.rotation;
      this.j = a.rotateWithView;
      this.b = a.scale;
      this.Fa = a.text;
      this.g = a.textAlign;
      this.l = a.textBaseline;
      this.Wa = void 0 !== a.fill ? a.fill : new Zk({color: "#333"});
      this.Ya = void 0 !== a.stroke ? a.stroke : null;
      this.f = void 0 !== a.offsetX ? a.offsetX : 0;
      this.c = void 0 !== a.offsetY ? a.offsetY : 0;
    }
    k = Sn.prototype;
    k.clone = function() {
      return new Sn({
        font: this.a,
        rotation: this.i,
        rotateWithView: this.j,
        scale: this.b,
        text: this.Pa(),
        textAlign: this.g,
        textBaseline: this.l,
        fill: this.Ca() ? this.Ca().clone() : void 0,
        stroke: this.Da() ? this.Da().clone() : void 0,
        offsetX: this.f,
        offsetY: this.c
      });
    };
    k.tk = function() {
      return this.a;
    };
    k.Ik = function() {
      return this.f;
    };
    k.Jk = function() {
      return this.c;
    };
    k.Ca = function() {
      return this.Wa;
    };
    k.fo = function() {
      return this.j;
    };
    k.ho = function() {
      return this.i;
    };
    k.io = function() {
      return this.b;
    };
    k.Da = function() {
      return this.Ya;
    };
    k.Pa = function() {
      return this.Fa;
    };
    k.Tk = function() {
      return this.g;
    };
    k.Uk = function() {
      return this.l;
    };
    k.Ii = function(a) {
      this.a = a;
    };
    k.Oi = function(a) {
      this.f = a;
    };
    k.Pi = function(a) {
      this.c = a;
    };
    k.cf = function(a) {
      this.Wa = a;
    };
    k.jo = function(a) {
      this.i = a;
    };
    k.ni = function(a) {
      this.b = a;
    };
    k.df = function(a) {
      this.Ya = a;
    };
    k.ef = function(a) {
      this.Fa = a;
    };
    k.Ri = function(a) {
      this.g = a;
    };
    k.up = function(a) {
      this.l = a;
    };
    function Tn(a) {
      a = a ? a : {};
      zm.call(this);
      Un || (Vn = [255, 255, 255, 1], Wn = new Zk({color: Vn}), Xn = [20, 2], Yn = Zn = "pixels", $n = [64, 64], ao = "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png", bo = .5, co = new Rn({
        anchor: Xn,
        anchorOrigin: "bottom-left",
        anchorXUnits: Zn,
        anchorYUnits: Yn,
        crossOrigin: "anonymous",
        rotation: 0,
        scale: bo,
        size: $n,
        src: ao
      }), eo = "NO_IMAGE", fo = new rj({
        color: Vn,
        width: 1
      }), go = new rj({
        color: [51, 51, 51, 1],
        width: 2
      }), ho = new Sn({
        font: "bold 16px Helvetica",
        fill: Wn,
        stroke: go,
        scale: .8
      }), io = new $k({
        fill: Wn,
        image: co,
        text: ho,
        stroke: fo,
        zIndex: 0
      }), Un = [io]);
      this.defaultDataProjection = Gb("EPSG:4326");
      this.a = a.defaultStyle ? a.defaultStyle : Un;
      this.c = void 0 !== a.extractStyles ? a.extractStyles : !0;
      this.l = void 0 !== a.writeStyles ? a.writeStyles : !0;
      this.b = {};
      this.i = void 0 !== a.showPointNames ? a.showPointNames : !0;
    }
    var Un,
        Vn,
        Wn,
        Xn,
        Zn,
        Yn,
        $n,
        ao,
        bo,
        co,
        eo,
        fo,
        go,
        ho,
        io;
    u(Tn, zm);
    var jo = ["http://www.google.com/kml/ext/2.2"],
        ko = [null, "http://earth.google.com/kml/2.0", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.2", "http://www.opengis.net/kml/2.2"],
        lo = {
          fraction: "fraction",
          pixels: "pixels"
        };
    function mo(a, b) {
      var c,
          d = [0, 0],
          e = "start";
      a.Z() && (c = a.Z().ue(), null === c && (c = $n), 2 == c.length && (e = a.Z().c, d[0] = e * c[0] / 2, d[1] = -e * c[1] / 2, e = "left"));
      if (null !== a.Pa()) {
        var f = a.Pa();
        c = f.clone();
        c.Ii(f.a || ho.a);
        c.ni(f.b || ho.b);
        c.cf(f.Ca() || ho.Ca());
        c.df(f.Da() || go);
      } else
        c = ho.clone();
      c.ef(b);
      c.Oi(d[0]);
      c.Pi(d[1]);
      c.Ri(e);
      return new $k({text: c});
    }
    function no(a, b, c, d, e) {
      return function() {
        var f = e,
            g = "";
        f && this.U() && (f = "Point" === this.U().T());
        f && (g = this.get("name"), f = f && g);
        if (a)
          return f ? (f = mo(a[0], g), a.concat(f)) : a;
        if (b) {
          var h = oo(b, c, d);
          return f ? (f = mo(h[0], g), h.concat(f)) : h;
        }
        return f ? (f = mo(c[0], g), c.concat(f)) : c;
      };
    }
    function oo(a, b, c) {
      return Array.isArray(a) ? a : "string" === typeof a ? (!(a in c) && "#" + a in c && (a = "#" + a), oo(c[a], b, c)) : b;
    }
    function po(a) {
      a = jl(a, !1);
      if (a = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))
        return a = a[1], [parseInt(a.substr(6, 2), 16), parseInt(a.substr(4, 2), 16), parseInt(a.substr(2, 2), 16), parseInt(a.substr(0, 2), 16) / 255];
    }
    function qo(a) {
      a = jl(a, !1);
      for (var b = [],
          c = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,
          d; d = c.exec(a); )
        b.push(parseFloat(d[1]), parseFloat(d[2]), d[3] ? parseFloat(d[3]) : 0), a = a.substr(d[0].length);
      if ("" === a)
        return b;
    }
    function ro(a) {
      var b = jl(a, !1).trim();
      return a.baseURI ? (new URL(b, a.baseURI)).href : b;
    }
    function so(a) {
      return Hm(a);
    }
    function to(a, b) {
      return L(null, uo, a, b);
    }
    function vo(a, b) {
      var c = L({
        B: [],
        bj: []
      }, wo, a, b);
      if (c) {
        var d = c.B,
            c = c.bj,
            e,
            f;
        e = 0;
        for (f = Math.min(d.length, c.length); e < f; ++e)
          d[4 * e + 3] = c[e];
        c = new M(null);
        c.ca("XYZM", d);
        return c;
      }
    }
    function xo(a, b) {
      var c = L({}, yo, a, b),
          d = L(null, zo, a, b);
      if (d) {
        var e = new M(null);
        e.ca("XYZ", d);
        e.H(c);
        return e;
      }
    }
    function Ao(a, b) {
      var c = L({}, yo, a, b),
          d = L(null, zo, a, b);
      if (d) {
        var e = new F(null);
        e.ca("XYZ", d, [d.length]);
        e.H(c);
        return e;
      }
    }
    function Bo(a, b) {
      var c = L([], Co, a, b);
      if (!c)
        return null;
      if (!c.length)
        return new qm(c);
      var d,
          e = !0,
          f = c[0].T(),
          g,
          h,
          l;
      h = 1;
      for (l = c.length; h < l; ++h)
        if (g = c[h], g.T() != f) {
          e = !1;
          break;
        }
      if (e)
        if ("Point" == f) {
          d = c[0];
          e = d.ka;
          f = d.ha();
          h = 1;
          for (l = c.length; h < l; ++h)
            g = c[h], ga(f, g.ha());
          d = new O(null);
          d.ca(e, f);
          Do(d, c);
        } else
          "LineString" == f ? (d = new N(null), Ll(d, c), Do(d, c)) : "Polygon" == f ? (d = new P(null), Nl(d, c), Do(d, c)) : "GeometryCollection" == f ? d = new qm(c) : qa(!1, 37);
      else
        d = new qm(c);
      return d;
    }
    function Eo(a, b) {
      var c = L({}, yo, a, b),
          d = L(null, zo, a, b);
      if (d) {
        var e = new E(null);
        e.ca("XYZ", d);
        e.H(c);
        return e;
      }
    }
    function Fo(a, b) {
      var c = L({}, yo, a, b),
          d = L([null], Go, a, b);
      if (d && d[0]) {
        var e = new F(null),
            f = d[0],
            g = [f.length],
            h,
            l;
        h = 1;
        for (l = d.length; h < l; ++h)
          ga(f, d[h]), g.push(f.length);
        e.ca("XYZ", f, g);
        e.H(c);
        return e;
      }
    }
    function Ho(a, b) {
      var c = L({}, Io, a, b);
      if (!c)
        return null;
      var d = "fillStyle" in c ? c.fillStyle : Wn,
          e = c.fill;
      void 0 === e || e || (d = null);
      e = "imageStyle" in c ? c.imageStyle : co;
      e == eo && (e = void 0);
      var f = "textStyle" in c ? c.textStyle : ho,
          g = "strokeStyle" in c ? c.strokeStyle : fo,
          c = c.outline;
      void 0 === c || c || (g = null);
      return [new $k({
        fill: d,
        image: e,
        stroke: g,
        text: f,
        zIndex: void 0
      })];
    }
    function Do(a, b) {
      var c = b.length,
          d = Array(b.length),
          e = Array(b.length),
          f,
          g,
          h,
          l;
      h = l = !1;
      for (g = 0; g < c; ++g)
        f = b[g], d[g] = f.get("extrude"), e[g] = f.get("altitudeMode"), h = h || void 0 !== d[g], l = l || e[g];
      h && a.set("extrude", d);
      l && a.set("altitudeMode", e);
    }
    function Jo(a, b) {
      yl(Ko, a, b);
    }
    function Lo(a, b) {
      yl(Mo, a, b);
    }
    var No = K(ko, {
      displayName: I(Q),
      value: I(Q)
    }),
        Ko = K(ko, {
          Data: function(a, b) {
            var c = a.getAttribute("name");
            yl(No, a, b);
            var d = b[b.length - 1];
            null !== c ? d[c] = d.value : null !== d.displayName && (d[d.displayName] = d.value);
          },
          SchemaData: function(a, b) {
            yl(Oo, a, b);
          }
        }),
        Mo = K(ko, {
          LatLonAltBox: function(a, b) {
            var c = L({}, Po, a, b);
            if (c) {
              var d = b[b.length - 1];
              d.extent = [parseFloat(c.west), parseFloat(c.south), parseFloat(c.east), parseFloat(c.north)];
              d.altitudeMode = c.altitudeMode;
              d.minAltitude = parseFloat(c.minAltitude);
              d.maxAltitude = parseFloat(c.maxAltitude);
            }
          },
          Lod: function(a, b) {
            var c = L({}, Qo, a, b);
            if (c) {
              var d = b[b.length - 1];
              d.minLodPixels = parseFloat(c.minLodPixels);
              d.maxLodPixels = parseFloat(c.maxLodPixels);
              d.minFadeExtent = parseFloat(c.minFadeExtent);
              d.maxFadeExtent = parseFloat(c.maxFadeExtent);
            }
          }
        }),
        Po = K(ko, {
          altitudeMode: I(Q),
          minAltitude: I(Hm),
          maxAltitude: I(Hm),
          north: I(Hm),
          south: I(Hm),
          east: I(Hm),
          west: I(Hm)
        }),
        Qo = K(ko, {
          minLodPixels: I(Hm),
          maxLodPixels: I(Hm),
          minFadeExtent: I(Hm),
          maxFadeExtent: I(Hm)
        }),
        yo = K(ko, {
          extrude: I(Em),
          altitudeMode: I(Q)
        }),
        uo = K(ko, {coordinates: rl(qo)}),
        Go = K(ko, {
          innerBoundaryIs: function(a, b) {
            var c = L(void 0, Ro, a, b);
            c && b[b.length - 1].push(c);
          },
          outerBoundaryIs: function(a, b) {
            var c = L(void 0, So, a, b);
            c && (b[b.length - 1][0] = c);
          }
        }),
        wo = K(ko, {when: function(a, b) {
            var c = b[b.length - 1].bj,
                d = jl(a, !1),
                d = Date.parse(d);
            c.push(isNaN(d) ? 0 : d);
          }}, K(jo, {coord: function(a, b) {
            var c = b[b.length - 1].B,
                d = jl(a, !1);
            (d = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(d)) ? c.push(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), 0) : c.push(0, 0, 0, 0);
          }})),
        zo = K(ko, {coordinates: rl(qo)}),
        To = K(ko, {href: I(ro)}, K(jo, {
          x: I(Hm),
          y: I(Hm),
          w: I(Hm),
          h: I(Hm)
        })),
        Uo = K(ko, {
          Icon: I(function(a, b) {
            var c = L({}, To, a, b);
            return c ? c : null;
          }),
          heading: I(Hm),
          hotSpot: I(function(a) {
            var b = a.getAttribute("xunits"),
                c = a.getAttribute("yunits");
            return {
              x: parseFloat(a.getAttribute("x")),
              Hg: lo[b],
              y: parseFloat(a.getAttribute("y")),
              Ig: lo[c]
            };
          }),
          scale: I(so)
        }),
        Ro = K(ko, {LinearRing: rl(to)}),
        Vo = K(ko, {
          color: I(po),
          scale: I(so)
        }),
        Wo = K(ko, {
          color: I(po),
          width: I(Hm)
        }),
        Co = K(ko, {
          LineString: ql(xo),
          LinearRing: ql(Ao),
          MultiGeometry: ql(Bo),
          Point: ql(Eo),
          Polygon: ql(Fo)
        }),
        Xo = K(jo, {Track: ql(vo)}),
        Zo = K(ko, {
          ExtendedData: Jo,
          Region: Lo,
          Link: function(a, b) {
            yl(Yo, a, b);
          },
          address: I(Q),
          description: I(Q),
          name: I(Q),
          open: I(Em),
          phoneNumber: I(Q),
          visibility: I(Em)
        }),
        Yo = K(ko, {href: I(ro)}),
        So = K(ko, {LinearRing: rl(to)}),
        $o = K(ko, {
          Style: I(Ho),
          key: I(Q),
          styleUrl: I(ro)
        }),
        bp = K(ko, {
          ExtendedData: Jo,
          Region: Lo,
          MultiGeometry: I(Bo, "geometry"),
          LineString: I(xo, "geometry"),
          LinearRing: I(Ao, "geometry"),
          Point: I(Eo, "geometry"),
          Polygon: I(Fo, "geometry"),
          Style: I(Ho),
          StyleMap: function(a, b) {
            var c = L(void 0, ap, a, b);
            if (c) {
              var d = b[b.length - 1];
              Array.isArray(c) ? d.Style = c : "string" === typeof c ? d.styleUrl = c : qa(!1, 38);
            }
          },
          address: I(Q),
          description: I(Q),
          name: I(Q),
          open: I(Em),
          phoneNumber: I(Q),
          styleUrl: I(ro),
          visibility: I(Em)
        }, K(jo, {
          MultiTrack: I(function(a, b) {
            var c = L([], Xo, a, b);
            if (c) {
              var d = new N(null);
              Ll(d, c);
              return d;
            }
          }, "geometry"),
          Track: I(vo, "geometry")
        })),
        cp = K(ko, {
          color: I(po),
          fill: I(Em),
          outline: I(Em)
        }),
        Oo = K(ko, {SimpleData: function(a, b) {
            var c = a.getAttribute("name");
            if (null !== c) {
              var d = Q(a);
              b[b.length - 1][c] = d;
            }
          }}),
        Io = K(ko, {
          IconStyle: function(a, b) {
            var c = L({}, Uo, a, b);
            if (c) {
              var d = b[b.length - 1],
                  e = "Icon" in c ? c.Icon : {},
                  f = !("Icon" in c) || 0 < Object.keys(e).length,
                  g,
                  h = e.href;
              h ? g = h : f && (g = ao);
              var l,
                  m,
                  p;
              (h = c.hotSpot) ? (l = [h.x, h.y], m = h.Hg, p = h.Ig) : g === ao ? (l = Xn, m = Zn, p = Yn) : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g) && (l = [.5, 0], p = m = "fraction");
              var n,
                  h = e.x,
                  q = e.y;
              void 0 !== h && void 0 !== q && (n = [h, q]);
              var r,
                  h = e.w,
                  e = e.h;
              void 0 !== h && void 0 !== e && (r = [h, e]);
              var v,
                  e = c.heading;
              void 0 !== e && (v = Ba(e));
              c = c.scale;
              f ? (g == ao && (r = $n, void 0 === c && (c = bo)), f = new Rn({
                anchor: l,
                anchorOrigin: "bottom-left",
                anchorXUnits: m,
                anchorYUnits: p,
                crossOrigin: "anonymous",
                offset: n,
                offsetOrigin: "bottom-left",
                rotation: v,
                scale: c,
                size: r,
                src: g
              }), d.imageStyle = f) : d.imageStyle = eo;
            }
          },
          LabelStyle: function(a, b) {
            var c = L({}, Vo, a, b);
            c && (b[b.length - 1].textStyle = new Sn({
              fill: new Zk({color: "color" in c ? c.color : Vn}),
              scale: c.scale
            }));
          },
          LineStyle: function(a, b) {
            var c = L({}, Wo, a, b);
            c && (b[b.length - 1].strokeStyle = new rj({
              color: "color" in c ? c.color : Vn,
              width: "width" in c ? c.width : 1
            }));
          },
          PolyStyle: function(a, b) {
            var c = L({}, cp, a, b);
            if (c) {
              var d = b[b.length - 1];
              d.fillStyle = new Zk({color: "color" in c ? c.color : Vn});
              var e = c.fill;
              void 0 !== e && (d.fill = e);
              c = c.outline;
              void 0 !== c && (d.outline = c);
            }
          }
        }),
        ap = K(ko, {Pair: function(a, b) {
            var c = L({}, $o, a, b);
            if (c) {
              var d = c.key;
              d && "normal" == d && ((d = c.styleUrl) && (b[b.length - 1] = d), (c = c.Style) && (b[b.length - 1] = c));
            }
          }});
    k = Tn.prototype;
    k.hg = function(a, b) {
      var c = K(ko, {
        Document: pl(this.hg, this),
        Folder: pl(this.hg, this),
        Placemark: ql(this.pg, this),
        Style: this.Yo.bind(this),
        StyleMap: this.Xo.bind(this)
      });
      if (c = L([], c, a, b, this))
        return c;
    };
    k.pg = function(a, b) {
      var c = L({geometry: null}, bp, a, b);
      if (c) {
        var d = new H,
            e = a.getAttribute("id");
        null !== e && d.kc(e);
        var e = b[0],
            f = c.geometry;
        f && Fl(f, !1, e);
        d.Sa(f);
        delete c.geometry;
        this.c && d.Vf(no(c.Style, c.styleUrl, this.a, this.b, this.i));
        delete c.Style;
        d.H(c);
        return d;
      }
    };
    k.Yo = function(a, b) {
      var c = a.getAttribute("id");
      if (null !== c) {
        var d = Ho(a, b);
        d && (c = a.baseURI ? (new URL("#" + c, a.baseURI)).href : "#" + c, this.b[c] = d);
      }
    };
    k.Xo = function(a, b) {
      var c = a.getAttribute("id");
      if (null !== c) {
        var d = L(void 0, ap, a, b);
        d && (c = a.baseURI ? (new URL("#" + c, a.baseURI)).href : "#" + c, this.b[c] = d);
      }
    };
    k.jg = function(a, b) {
      if (!ea(ko, a.namespaceURI))
        return null;
      var c = this.pg(a, [Dl(this, a, b)]);
      return c ? c : null;
    };
    k.yc = function(a, b) {
      if (!ea(ko, a.namespaceURI))
        return [];
      var c;
      c = a.localName;
      if ("Document" == c || "Folder" == c)
        return (c = this.hg(a, [Dl(this, a, b)])) ? c : [];
      if ("Placemark" == c)
        return (c = this.pg(a, [Dl(this, a, b)])) ? [c] : [];
      if ("kml" == c) {
        c = [];
        var d;
        for (d = a.firstElementChild; d; d = d.nextElementSibling) {
          var e = this.yc(d, b);
          e && ga(c, e);
        }
        return c;
      }
      return [];
    };
    k.Ro = function(a) {
      if (ll(a))
        return dp(this, a);
      if (ml(a))
        return ep(this, a);
      if ("string" === typeof a)
        return a = nl(a), dp(this, a);
    };
    function dp(a, b) {
      var c;
      for (c = b.firstChild; c; c = c.nextSibling)
        if (c.nodeType == Node.ELEMENT_NODE) {
          var d = ep(a, c);
          if (d)
            return d;
        }
    }
    function ep(a, b) {
      var c;
      for (c = b.firstElementChild; c; c = c.nextElementSibling)
        if (ea(ko, c.namespaceURI) && "name" == c.localName)
          return Q(c);
      for (c = b.firstElementChild; c; c = c.nextElementSibling) {
        var d = c.localName;
        if (ea(ko, c.namespaceURI) && ("Document" == d || "Folder" == d || "Placemark" == d || "kml" == d) && (d = ep(a, c)))
          return d;
      }
    }
    k.So = function(a) {
      var b = [];
      ll(a) ? ga(b, fp(this, a)) : ml(a) ? ga(b, gp(this, a)) : "string" === typeof a && (a = nl(a), ga(b, fp(this, a)));
      return b;
    };
    function fp(a, b) {
      var c,
          d = [];
      for (c = b.firstChild; c; c = c.nextSibling)
        c.nodeType == Node.ELEMENT_NODE && ga(d, gp(a, c));
      return d;
    }
    function gp(a, b) {
      var c,
          d = [];
      for (c = b.firstElementChild; c; c = c.nextElementSibling)
        if (ea(ko, c.namespaceURI) && "NetworkLink" == c.localName) {
          var e = L({}, Zo, c, []);
          d.push(e);
        }
      for (c = b.firstElementChild; c; c = c.nextElementSibling)
        e = c.localName, !ea(ko, c.namespaceURI) || "Document" != e && "Folder" != e && "kml" != e || ga(d, gp(a, c));
      return d;
    }
    k.Vo = function(a) {
      var b = [];
      ll(a) ? ga(b, hp(this, a)) : ml(a) ? ga(b, this.$e(a)) : "string" === typeof a && (a = nl(a), ga(b, hp(this, a)));
      return b;
    };
    function hp(a, b) {
      var c,
          d = [];
      for (c = b.firstChild; c; c = c.nextSibling)
        c.nodeType == Node.ELEMENT_NODE && ga(d, a.$e(c));
      return d;
    }
    k.$e = function(a) {
      var b,
          c = [];
      for (b = a.firstElementChild; b; b = b.nextElementSibling)
        if (ea(ko, b.namespaceURI) && "Region" == b.localName) {
          var d = L({}, Mo, b, []);
          c.push(d);
        }
      for (b = a.firstElementChild; b; b = b.nextElementSibling)
        a = b.localName, !ea(ko, b.namespaceURI) || "Document" != a && "Folder" != a && "kml" != a || ga(c, this.$e(b));
      return c;
    };
    function ip(a, b) {
      var c = Qc(b),
          c = [255 * (4 == c.length ? c[3] : 1), c[2], c[1], c[0]],
          d;
      for (d = 0; 4 > d; ++d) {
        var e = parseInt(c[d], 10).toString(16);
        c[d] = 1 == e.length ? "0" + e : e;
      }
      Mm(a, c.join(""));
    }
    function jp(a, b, c) {
      a = {node: a};
      var d = b.T(),
          e,
          f;
      "GeometryCollection" == d ? (e = b.If(), f = kp) : "MultiPoint" == d ? (e = b.Ie(), f = lp) : "MultiLineString" == d ? (e = b.hd(), f = mp) : "MultiPolygon" == d ? (e = b.Od(), f = np) : qa(!1, 39);
      zl(a, op, f, e, c);
    }
    function pp(a, b, c) {
      zl({node: a}, qp, rp, [b], c);
    }
    function sp(a, b, c) {
      var d = {node: a};
      b.a && a.setAttribute("id", b.a);
      a = b.N();
      var e = {
        address: 1,
        description: 1,
        name: 1,
        open: 1,
        phoneNumber: 1,
        styleUrl: 1,
        visibility: 1
      };
      e[b.c] = 1;
      var f = Object.keys(a || {}).sort().filter(function(a) {
        return !e[a];
      });
      if (0 < f.length) {
        var g = xl(a, f);
        zl(d, tp, up, [{
          names: f,
          values: g
        }], c);
      }
      if (f = b.Nc())
        if (f = f.call(b, 0))
          f = Array.isArray(f) ? f[0] : f, this.l && (a.Style = f), (f = f.Pa()) && (a.name = f.Pa());
      f = vp[c[c.length - 1].node.namespaceURI];
      a = xl(a, f);
      zl(d, tp, wl, a, c, f);
      a = c[0];
      (b = b.U()) && (b = Fl(b, !0, a));
      zl(d, tp, kp, [b], c);
    }
    function wp(a, b, c) {
      var d = b.ha();
      a = {node: a};
      a.layout = b.ka;
      a.stride = b.sa();
      zl(a, xp, yp, [d], c);
    }
    function zp(a, b, c) {
      b = b.jd();
      var d = b.shift();
      a = {node: a};
      zl(a, Ap, Bp, b, c);
      zl(a, Ap, Cp, [d], c);
    }
    function Dp(a, b) {
      Nm(a, Math.round(1E6 * b) / 1E6);
    }
    var Ep = K(ko, ["Document", "Placemark"]),
        Hp = K(ko, {
          Document: J(function(a, b, c) {
            zl({node: a}, Fp, Gp, b, c, void 0, this);
          }),
          Placemark: J(sp)
        }),
        Fp = K(ko, {Placemark: J(sp)}),
        Ip = K(ko, {
          Data: J(function(a, b, c) {
            a.setAttribute("name", b.name);
            a = {node: a};
            b = b.value;
            "object" == typeof b ? (null !== b && b.displayName && zl(a, Ip, wl, [b.displayName], c, ["displayName"]), null !== b && b.value && zl(a, Ip, wl, [b.value], c, ["value"])) : zl(a, Ip, wl, [b], c, ["value"]);
          }),
          value: J(function(a, b) {
            Mm(a, b);
          }),
          displayName: J(function(a, b) {
            a.appendChild(gl.createCDATASection(b));
          })
        }),
        Jp = {
          Point: "Point",
          LineString: "LineString",
          LinearRing: "LinearRing",
          Polygon: "Polygon",
          MultiPoint: "MultiGeometry",
          MultiLineString: "MultiGeometry",
          MultiPolygon: "MultiGeometry",
          GeometryCollection: "MultiGeometry"
        },
        Kp = K(ko, ["href"], K(jo, ["x", "y", "w", "h"])),
        Lp = K(ko, {href: J(Mm)}, K(jo, {
          x: J(Nm),
          y: J(Nm),
          w: J(Nm),
          h: J(Nm)
        })),
        Mp = K(ko, ["scale", "heading", "Icon", "hotSpot"]),
        Op = K(ko, {
          Icon: J(function(a, b, c) {
            a = {node: a};
            var d = Kp[c[c.length - 1].node.namespaceURI],
                e = xl(b, d);
            zl(a, Lp, wl, e, c, d);
            d = Kp[jo[0]];
            e = xl(b, d);
            zl(a, Lp, Np, e, c, d);
          }),
          heading: J(Nm),
          hotSpot: J(function(a, b) {
            a.setAttribute("x", b.x);
            a.setAttribute("y", b.y);
            a.setAttribute("xunits", b.Hg);
            a.setAttribute("yunits", b.Ig);
          }),
          scale: J(Dp)
        }),
        Pp = K(ko, ["color", "scale"]),
        Qp = K(ko, {
          color: J(ip),
          scale: J(Dp)
        }),
        Rp = K(ko, ["color", "width"]),
        Sp = K(ko, {
          color: J(ip),
          width: J(Nm)
        }),
        qp = K(ko, {LinearRing: J(wp)}),
        op = K(ko, {
          LineString: J(wp),
          Point: J(wp),
          Polygon: J(zp),
          GeometryCollection: J(jp)
        }),
        vp = K(ko, "name open visibility address phoneNumber description styleUrl Style".split(" ")),
        tp = K(ko, {
          ExtendedData: J(function(a, b, c) {
            a = {node: a};
            var d = b.names;
            b = b.values;
            for (var e = d.length,
                f = 0; f < e; f++)
              zl(a, Ip, Tp, [{
                name: d[f],
                value: b[f]
              }], c);
          }),
          MultiGeometry: J(jp),
          LineString: J(wp),
          LinearRing: J(wp),
          Point: J(wp),
          Polygon: J(zp),
          Style: J(function(a, b, c) {
            a = {node: a};
            var d = {},
                e = b.Ca(),
                f = b.Da(),
                g = b.Z();
            b = b.Pa();
            g instanceof Rn && (d.IconStyle = g);
            b && (d.LabelStyle = b);
            f && (d.LineStyle = f);
            e && (d.PolyStyle = e);
            b = Up[c[c.length - 1].node.namespaceURI];
            d = xl(d, b);
            zl(a, Vp, wl, d, c, b);
          }),
          address: J(Mm),
          description: J(Mm),
          name: J(Mm),
          open: J(Lm),
          phoneNumber: J(Mm),
          styleUrl: J(Mm),
          visibility: J(Lm)
        }),
        xp = K(ko, {coordinates: J(function(a, b, c) {
            c = c[c.length - 1];
            var d = c.layout;
            c = c.stride;
            var e;
            "XY" == d || "XYM" == d ? e = 2 : "XYZ" == d || "XYZM" == d ? e = 3 : qa(!1, 34);
            var f,
                g = b.length,
                h = "";
            if (0 < g) {
              h += b[0];
              for (d = 1; d < e; ++d)
                h += "," + b[d];
              for (f = c; f < g; f += c)
                for (h += " " + b[f], d = 1; d < e; ++d)
                  h += "," + b[f + d];
            }
            Mm(a, h);
          })}),
        Ap = K(ko, {
          outerBoundaryIs: J(pp),
          innerBoundaryIs: J(pp)
        }),
        Wp = K(ko, {color: J(ip)}),
        Up = K(ko, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]),
        Vp = K(ko, {
          IconStyle: J(function(a, b, c) {
            a = {node: a};
            var d = {},
                e = b.jc(),
                f = b.ue(),
                g = {href: b.b.j};
            if (e) {
              g.w = e[0];
              g.h = e[1];
              var h = b.Hc(),
                  l = b.Pc();
              l && f && l[0] && l[1] !== e[1] && (g.x = l[0], g.y = f[1] - (l[1] + e[1]));
              h && h[0] && h[1] !== e[1] && (d.hotSpot = {
                x: h[0],
                Hg: "pixels",
                y: e[1] - h[1],
                Ig: "pixels"
              });
            }
            d.Icon = g;
            e = b.c;
            1 !== e && (d.scale = e);
            (b = b.l) && (d.heading = b);
            b = Mp[c[c.length - 1].node.namespaceURI];
            d = xl(d, b);
            zl(a, Op, wl, d, c, b);
          }),
          LabelStyle: J(function(a, b, c) {
            a = {node: a};
            var d = {},
                e = b.Ca();
            e && (d.color = e.b);
            (b = b.b) && 1 !== b && (d.scale = b);
            b = Pp[c[c.length - 1].node.namespaceURI];
            d = xl(d, b);
            zl(a, Qp, wl, d, c, b);
          }),
          LineStyle: J(function(a, b, c) {
            a = {node: a};
            var d = Rp[c[c.length - 1].node.namespaceURI];
            b = xl({
              color: b.a,
              width: b.c
            }, d);
            zl(a, Sp, wl, b, c, d);
          }),
          PolyStyle: J(function(a, b, c) {
            zl({node: a}, Wp, Xp, [b.b], c);
          })
        });
    function Np(a, b, c) {
      return il(jo[0], "gx:" + c);
    }
    function Gp(a, b) {
      return il(b[b.length - 1].node.namespaceURI, "Placemark");
    }
    function kp(a, b) {
      if (a)
        return il(b[b.length - 1].node.namespaceURI, Jp[a.T()]);
    }
    var Xp = ul("color"),
        yp = ul("coordinates"),
        Tp = ul("Data"),
        up = ul("ExtendedData"),
        Bp = ul("innerBoundaryIs"),
        lp = ul("Point"),
        mp = ul("LineString"),
        rp = ul("LinearRing"),
        np = ul("Polygon"),
        Cp = ul("outerBoundaryIs");
    Tn.prototype.Yb = function(a, b) {
      b = El(this, b);
      var c = il(ko[4], "kml");
      c.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:gx", jo[0]);
      c.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
      c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");
      var d = {node: c},
          e = {};
      1 < a.length ? e.Document = a : 1 == a.length && (e.Placemark = a[0]);
      var f = Ep[c.namespaceURI],
          e = xl(e, f);
      zl(d, Hp, wl, e, [b], f, this);
      return c;
    };
    (function() {
      var a = {},
          b = {ma: a};
      (function(c) {
        if ("object" === typeof a && "undefined" !== typeof b)
          b.ma = c();
        else {
          var d;
          "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
          d.aq = c();
        }
      })(function() {
        return function d(a, b, g) {
          function e(h, l) {
            if (!b[h]) {
              if (!a[h]) {
                var m = "function" == typeof require && require;
                if (!l && m)
                  return m(h, !0);
                if (f)
                  return f(h, !0);
                m = Error("Cannot find module '" + h + "'");
                throw m.code = "MODULE_NOT_FOUND", m;
              }
              m = b[h] = {ma: {}};
              a[h][0].call(m.ma, function(b) {
                var d = a[h][1][b];
                return e(d ? d : b);
              }, m, m.ma, d, a, b, g);
            }
            return b[h].ma;
          }
          for (var f = "function" == typeof require && require,
              m = 0; m < g.length; m++)
            e(g[m]);
          return e;
        }({
          1: [function(a, b, f) {
            f.read = function(a, b, d, e, f) {
              var g;
              g = 8 * f - e - 1;
              var h = (1 << g) - 1,
                  l = h >> 1,
                  m = -7;
              f = d ? f - 1 : 0;
              var p = d ? -1 : 1,
                  y = a[b + f];
              f += p;
              d = y & (1 << -m) - 1;
              y >>= -m;
              for (m += g; 0 < m; d = 256 * d + a[b + f], f += p, m -= 8)
                ;
              g = d & (1 << -m) - 1;
              d >>= -m;
              for (m += e; 0 < m; g = 256 * g + a[b + f], f += p, m -= 8)
                ;
              if (0 === d)
                d = 1 - l;
              else {
                if (d === h)
                  return g ? NaN : Infinity * (y ? -1 : 1);
                g += Math.pow(2, e);
                d -= l;
              }
              return (y ? -1 : 1) * g * Math.pow(2, d - e);
            };
            f.write = function(a, b, d, e, f, n) {
              var g,
                  h = 8 * n - f - 1,
                  l = (1 << h) - 1,
                  m = l >> 1,
                  p = 23 === f ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
              n = e ? 0 : n - 1;
              var z = e ? 1 : -1,
                  A = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
              b = Math.abs(b);
              isNaN(b) || Infinity === b ? (b = isNaN(b) ? 1 : 0, e = l) : (e = Math.floor(Math.log(b) / Math.LN2), 1 > b * (g = Math.pow(2, -e)) && (e--, g *= 2), b = 1 <= e + m ? b + p / g : b + p * Math.pow(2, 1 - m), 2 <= b * g && (e++, g /= 2), e + m >= l ? (b = 0, e = l) : 1 <= e + m ? (b = (b * g - 1) * Math.pow(2, f), e += m) : (b = b * Math.pow(2, m - 1) * Math.pow(2, f), e = 0));
              for (; 8 <= f; a[d + n] = b & 255, n += z, b /= 256, f -= 8)
                ;
              e = e << f | b;
              for (h += f; 0 < h; a[d + n] = e & 255, n += z, e /= 256, h -= 8)
                ;
              a[d + n - z] |= 128 * A;
            };
          }, {}],
          2: [function(a, b) {
            function d(a) {
              this.lc = ArrayBuffer.isView && ArrayBuffer.isView(a) ? a : new Uint8Array(a || 0);
              this.type = this.ga = 0;
              this.length = this.lc.length;
            }
            function e(a, b, d) {
              var e = d.lc,
                  f,
                  g;
              g = e[d.ga++];
              f = (g & 112) >> 4;
              if (128 > g)
                return h(a, f, b);
              g = e[d.ga++];
              f |= (g & 127) << 3;
              if (128 > g)
                return h(a, f, b);
              g = e[d.ga++];
              f |= (g & 127) << 10;
              if (128 > g)
                return h(a, f, b);
              g = e[d.ga++];
              f |= (g & 127) << 17;
              if (128 > g)
                return h(a, f, b);
              g = e[d.ga++];
              f |= (g & 127) << 24;
              if (128 > g)
                return h(a, f, b);
              g = e[d.ga++];
              if (128 > g)
                return h(a, f | (g & 1) << 31, b);
              throw Error("Expected varint not more than 10 bytes");
            }
            function h(a, b, d) {
              return d ? 4294967296 * b + (a >>> 0) : 4294967296 * (b >>> 0) + (a >>> 0);
            }
            b.ma = d;
            var l = a("ieee754");
            d.c = 0;
            d.f = 1;
            d.b = 2;
            d.a = 5;
            d.prototype = {
              mg: function(a, b, d) {
                for (d = d || this.length; this.ga < d; ) {
                  var e = this.Ma(),
                      f = e >> 3,
                      g = this.ga;
                  this.type = e & 7;
                  a(f, b, this);
                  this.ga === g && this.zp(e);
                }
                return b;
              },
              No: function() {
                var a = l.read(this.lc, this.ga, !0, 23, 4);
                this.ga += 4;
                return a;
              },
              Jo: function() {
                var a = l.read(this.lc, this.ga, !0, 52, 8);
                this.ga += 8;
                return a;
              },
              Ma: function(a) {
                var b = this.lc,
                    d,
                    f;
                f = b[this.ga++];
                d = f & 127;
                if (128 > f)
                  return d;
                f = b[this.ga++];
                d |= (f & 127) << 7;
                if (128 > f)
                  return d;
                f = b[this.ga++];
                d |= (f & 127) << 14;
                if (128 > f)
                  return d;
                f = b[this.ga++];
                d |= (f & 127) << 21;
                if (128 > f)
                  return d;
                f = b[this.ga];
                return e(d | (f & 15) << 28, a, this);
              },
              Zo: function() {
                return this.Ma(!0);
              },
              Yd: function() {
                var a = this.Ma();
                return 1 === a % 2 ? (a + 1) / -2 : a / 2;
              },
              Ho: function() {
                return !!this.Ma();
              },
              sg: function() {
                for (var a = this.Ma() + this.ga,
                    b = this.lc,
                    d = "",
                    e = this.ga; e < a; ) {
                  var f = b[e],
                      g = null,
                      h = 239 < f ? 4 : 223 < f ? 3 : 191 < f ? 2 : 1;
                  if (e + h > a)
                    break;
                  var l,
                      z,
                      A;
                  if (1 === h)
                    128 > f && (g = f);
                  else if (2 === h)
                    l = b[e + 1], 128 === (l & 192) && (g = (f & 31) << 6 | l & 63, 127 >= g && (g = null));
                  else if (3 === h) {
                    if (l = b[e + 1], z = b[e + 2], 128 === (l & 192) && 128 === (z & 192) && (g = (f & 15) << 12 | (l & 63) << 6 | z & 63, 2047 >= g || 55296 <= g && 57343 >= g))
                      g = null;
                  } else
                    4 === h && (l = b[e + 1], z = b[e + 2], A = b[e + 3], 128 === (l & 192) && 128 === (z & 192) && 128 === (A & 192) && (g = (f & 15) << 18 | (l & 63) << 12 | (z & 63) << 6 | A & 63, 65535 >= g || 1114112 <= g)) && (g = null);
                  null === g ? (g = 65533, h = 1) : 65535 < g && (g -= 65536, d += String.fromCharCode(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023);
                  d += String.fromCharCode(g);
                  e += h;
                }
                this.ga = a;
                return d;
              },
              zp: function(a) {
                a &= 7;
                if (a === d.c)
                  for (; 127 < this.lc[this.ga++]; )
                    ;
                else if (a === d.b)
                  this.ga = this.Ma() + this.ga;
                else if (a === d.a)
                  this.ga += 4;
                else if (a === d.f)
                  this.ga += 8;
                else
                  throw Error("Unimplemented type: " + a);
              }
            };
          }, {ieee754: 1}]
        }, {}, [2])(2);
      });
      Bj = b.ma;
    })();
    (function() {
      var a = {},
          b = {ma: a};
      (function(c) {
        if ("object" === typeof a && "undefined" !== typeof b)
          b.ma = c();
        else {
          var d;
          "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
          d.eq = c();
        }
      })(function() {
        return function d(a, b, g) {
          function e(h, l) {
            if (!b[h]) {
              if (!a[h]) {
                var m = "function" == typeof require && require;
                if (!l && m)
                  return m(h, !0);
                if (f)
                  return f(h, !0);
                m = Error("Cannot find module '" + h + "'");
                throw m.code = "MODULE_NOT_FOUND", m;
              }
              m = b[h] = {ma: {}};
              a[h][0].call(m.ma, function(b) {
                var d = a[h][1][b];
                return e(d ? d : b);
              }, m, m.ma, d, a, b, g);
            }
            return b[h].ma;
          }
          for (var f = "function" == typeof require && require,
              m = 0; m < g.length; m++)
            e(g[m]);
          return e;
        }({
          1: [function(a, b) {
            function d(a, b) {
              this.x = a;
              this.y = b;
            }
            b.ma = d;
            d.prototype = {
              clone: function() {
                return new d(this.x, this.y);
              },
              add: function(a) {
                return this.clone().Ej(a);
              },
              rotate: function(a) {
                return this.clone().Oj(a);
              },
              round: function() {
                return this.clone().Pj();
              },
              angle: function() {
                return Math.atan2(this.y, this.x);
              },
              Ej: function(a) {
                this.x += a.x;
                this.y += a.y;
                return this;
              },
              Oj: function(a) {
                var b = Math.cos(a);
                a = Math.sin(a);
                var d = a * this.x + b * this.y;
                this.x = b * this.x - a * this.y;
                this.y = d;
                return this;
              },
              Pj: function() {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                return this;
              }
            };
            d.b = function(a) {
              return a instanceof d ? a : Array.isArray(a) ? new d(a[0], a[1]) : a;
            };
          }, {}],
          2: [function(a, b) {
            b.ma.Dj = a("./lib/vectortile.js");
            b.ma.Yp = a("./lib/vectortilefeature.js");
            b.ma.Zp = a("./lib/vectortilelayer.js");
          }, {
            "./lib/vectortile.js": 3,
            "./lib/vectortilefeature.js": 4,
            "./lib/vectortilelayer.js": 5
          }],
          3: [function(a, b) {
            function d(a, b, d) {
              3 === a && (a = new e(d, d.Ma() + d.ga), a.length && (b[a.name] = a));
            }
            var e = a("./vectortilelayer");
            b.ma = function(a, b) {
              this.layers = a.mg(d, {}, b);
            };
          }, {"./vectortilelayer": 5}],
          4: [function(a, b) {
            function d(a, b, d, f, g) {
              this.properties = {};
              this.extent = d;
              this.type = 0;
              this.Cc = a;
              this.tf = -1;
              this.ie = f;
              this.ke = g;
              a.mg(e, this, b);
            }
            function e(a, b, d) {
              if (1 == a)
                b.id = d.Ma();
              else if (2 == a)
                for (a = d.Ma() + d.ga; d.ga < a; ) {
                  var e = b.ie[d.Ma()],
                      f = b.ke[d.Ma()];
                  b.properties[e] = f;
                }
              else
                3 == a ? b.type = d.Ma() : 4 == a && (b.tf = d.ga);
            }
            var h = a("point-geometry");
            b.ma = d;
            d.b = ["Unknown", "Point", "LineString", "Polygon"];
            d.prototype.Ah = function() {
              var a = this.Cc;
              a.ga = this.tf;
              for (var b = a.Ma() + a.ga,
                  d = 1,
                  e = 0,
                  f = 0,
                  g = 0,
                  v = [],
                  x; a.ga < b; )
                if (e || (e = a.Ma(), d = e & 7, e >>= 3), e--, 1 === d || 2 === d)
                  f += a.Yd(), g += a.Yd(), 1 === d && (x && v.push(x), x = []), x.push(new h(f, g));
                else if (7 === d)
                  x && x.push(x[0].clone());
                else
                  throw Error("unknown command " + d);
              x && v.push(x);
              return v;
            };
            d.prototype.bbox = function() {
              var a = this.Cc;
              a.ga = this.tf;
              for (var b = a.Ma() + a.ga,
                  d = 1,
                  e = 0,
                  f = 0,
                  g = 0,
                  h = Infinity,
                  x = -Infinity,
                  y = Infinity,
                  z = -Infinity; a.ga < b; )
                if (e || (e = a.Ma(), d = e & 7, e >>= 3), e--, 1 === d || 2 === d)
                  f += a.Yd(), g += a.Yd(), f < h && (h = f), f > x && (x = f), g < y && (y = g), g > z && (z = g);
                else if (7 !== d)
                  throw Error("unknown command " + d);
              return [h, y, x, z];
            };
          }, {"point-geometry": 1}],
          5: [function(a, b) {
            function d(a, b) {
              this.version = 1;
              this.name = null;
              this.extent = 4096;
              this.length = 0;
              this.Cc = a;
              this.ie = [];
              this.ke = [];
              this.he = [];
              a.mg(e, this, b);
              this.length = this.he.length;
            }
            function e(a, b, d) {
              15 === a ? b.version = d.Ma() : 1 === a ? b.name = d.sg() : 5 === a ? b.extent = d.Ma() : 2 === a ? b.he.push(d.ga) : 3 === a ? b.ie.push(d.sg()) : 4 === a && b.ke.push(h(d));
            }
            function h(a) {
              for (var b = null,
                  d = a.Ma() + a.ga; a.ga < d; )
                b = a.Ma() >> 3, b = 1 === b ? a.sg() : 2 === b ? a.No() : 3 === b ? a.Jo() : 4 === b ? a.Zo() : 5 === b ? a.Ma() : 6 === b ? a.Yd() : 7 === b ? a.Ho() : null;
              return b;
            }
            var l = a("./vectortilefeature.js");
            b.ma = d;
            d.prototype.feature = function(a) {
              if (0 > a || a >= this.he.length)
                throw Error("feature index out of bounds");
              this.Cc.ga = this.he[a];
              a = this.Cc.Ma() + this.Cc.ga;
              return new l(this.Cc, a, this.extent, this.ie, this.ke);
            };
          }, {"./vectortilefeature.js": 4}]
        }, {}, [2])(2);
      });
      Cj = b.ma;
    })();
    function Yp(a, b, c, d) {
      this.f = a;
      this.b = b;
      this.i = c;
      this.c = d;
    }
    k = Yp.prototype;
    k.get = function(a) {
      return this.c[a];
    };
    k.Rb = function() {
      return this.i;
    };
    k.D = function() {
      this.a || (this.a = "Point" === this.f ? Wa(this.b) : Xa(this.b, 0, this.b.length, 2));
      return this.a;
    };
    k.fc = function() {
      return this.b;
    };
    k.ha = Yp.prototype.fc;
    k.U = function() {
      return this;
    };
    k.mn = function() {
      return this.c;
    };
    k.Qd = Yp.prototype.U;
    k.sa = function() {
      return 2;
    };
    k.Nc = na;
    k.T = function() {
      return this.f;
    };
    function Zp(a) {
      Cl.call(this);
      a = a ? a : {};
      this.defaultDataProjection = new yb({
        code: "",
        units: "tile-pixels"
      });
      this.b = a.featureClass ? a.featureClass : Yp;
      this.f = a.geometryName;
      this.a = a.layerName ? a.layerName : "layer";
      this.c = a.layers ? a.layers : null;
    }
    u(Zp, Cl);
    k = Zp.prototype;
    k.T = function() {
      return "arraybuffer";
    };
    k.Qa = function(a, b) {
      var c = this.c,
          d = new Bj(a),
          d = new Cj.Dj(d),
          e = [],
          f = this.b,
          g,
          h,
          l;
      for (l in d.layers)
        if (!c || -1 != c.indexOf(l)) {
          g = d.layers[l];
          for (var m = 0,
              p = g.length; m < p; ++m) {
            if (f === Yp) {
              h = void 0;
              var n = g.feature(m),
                  q = l,
                  r = n.Ah(),
                  v = [],
                  x = [];
              $p(r, x, v);
              var y = n.type;
              1 === y ? h = 1 === r.length ? "Point" : "MultiPoint" : 2 === y ? h = 1 === r.length ? "LineString" : "MultiLineString" : 3 === y && (h = "Polygon");
              n = n.properties;
              n[this.a] = q;
              h = new this.b(h, x, v, n);
            } else {
              y = g.feature(m);
              n = l;
              x = b;
              h = new this.b;
              q = y.id;
              v = y.properties;
              v[this.a] = n;
              this.f && h.Vc(this.f);
              n = void 0;
              r = y.type;
              if (0 === r)
                n = null;
              else {
                var y = y.Ah(),
                    z = [],
                    A = [];
                $p(y, A, z);
                1 === r ? n = 1 === y.length ? new E(null) : new O(null) : 2 === r ? 1 === y.length ? n = new M(null) : n = new N(null) : 3 === r && (n = new F(null));
                n.ca("XY", A, z);
              }
              x = Fl(n, !1, El(this, x));
              h.Sa(x);
              h.kc(q);
              h.H(v);
            }
            e.push(h);
          }
        }
      return e;
    };
    k.kb = function() {
      return this.defaultDataProjection;
    };
    k.Hm = function(a) {
      this.c = a;
    };
    function $p(a, b, c) {
      for (var d = 0,
          e = 0,
          f = a.length; e < f; ++e) {
        var g = a[e],
            h,
            l;
        h = 0;
        for (l = g.length; h < l; ++h) {
          var m = g[h];
          b.push(m.x, m.y);
        }
        d += 2 * h;
        c.push(d);
      }
    }
    k.Ub = function() {};
    k.Tc = function() {};
    k.yd = function() {};
    k.bd = function() {};
    k.Xb = function() {};
    function aq() {
      zm.call(this);
      this.defaultDataProjection = Gb("EPSG:4326");
    }
    u(aq, zm);
    function bq(a, b) {
      b[b.length - 1].ae[a.getAttribute("k")] = a.getAttribute("v");
    }
    var cq = [null],
        dq = K(cq, {
          nd: function(a, b) {
            b[b.length - 1].md.push(a.getAttribute("ref"));
          },
          tag: bq
        }),
        fq = K(cq, {
          node: function(a, b) {
            var c = b[0],
                d = b[b.length - 1],
                e = a.getAttribute("id"),
                f = [parseFloat(a.getAttribute("lon")), parseFloat(a.getAttribute("lat"))];
            d.Eh[e] = f;
            var g = L({ae: {}}, eq, a, b);
            sb(g.ae) || (f = new E(f), Fl(f, !1, c), c = new H(f), c.kc(e), c.H(g.ae), d.features.push(c));
          },
          way: function(a, b) {
            for (var c = b[0],
                d = a.getAttribute("id"),
                e = L({
                  md: [],
                  ae: {}
                }, dq, a, b),
                f = b[b.length - 1],
                g = [],
                h = 0,
                l = e.md.length; h < l; h++)
              ga(g, f.Eh[e.md[h]]);
            e.md[0] == e.md[e.md.length - 1] ? (h = new F(null), h.ca("XY", g, [g.length])) : (h = new M(null), h.ca("XY", g));
            Fl(h, !1, c);
            c = new H(h);
            c.kc(d);
            c.H(e.ae);
            f.features.push(c);
          }
        }),
        eq = K(cq, {tag: bq});
    aq.prototype.yc = function(a, b) {
      var c = Dl(this, a, b);
      return "osm" == a.localName && (c = L({
        Eh: {},
        features: []
      }, fq, a, [c]), c.features) ? c.features : [];
    };
    aq.prototype.Fg = function() {};
    aq.prototype.Yb = function() {};
    aq.prototype.de = function() {};
    function gq(a) {
      return a.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    }
    ;
    function hq() {}
    hq.prototype.read = function(a) {
      return ll(a) ? this.a(a) : ml(a) ? this.b(a) : "string" === typeof a ? (a = nl(a), this.a(a)) : null;
    };
    function iq() {}
    u(iq, hq);
    iq.prototype.a = function(a) {
      for (a = a.firstChild; a; a = a.nextSibling)
        if (a.nodeType == Node.ELEMENT_NODE)
          return this.b(a);
      return null;
    };
    iq.prototype.b = function(a) {
      return (a = L({}, jq, a, [])) ? a : null;
    };
    var kq = [null, "http://www.opengis.net/ows/1.1"],
        jq = K(kq, {
          ServiceIdentification: I(function(a, b) {
            return L({}, mq, a, b);
          }),
          ServiceProvider: I(function(a, b) {
            return L({}, nq, a, b);
          }),
          OperationsMetadata: I(function(a, b) {
            return L({}, oq, a, b);
          })
        }),
        pq = K(kq, {
          DeliveryPoint: I(Q),
          City: I(Q),
          AdministrativeArea: I(Q),
          PostalCode: I(Q),
          Country: I(Q),
          ElectronicMailAddress: I(Q)
        }),
        qq = K(kq, {Value: sl(function(a) {
            return Q(a);
          })}),
        rq = K(kq, {AllowedValues: I(function(a, b) {
            return L({}, qq, a, b);
          })}),
        tq = K(kq, {
          Phone: I(function(a, b) {
            return L({}, sq, a, b);
          }),
          Address: I(function(a, b) {
            return L({}, pq, a, b);
          })
        }),
        vq = K(kq, {HTTP: I(function(a, b) {
            return L({}, uq, a, b);
          })}),
        uq = K(kq, {
          Get: sl(function(a, b) {
            var c = gq(a);
            if (c)
              return L({href: c}, wq, a, b);
          }),
          Post: void 0
        }),
        xq = K(kq, {DCP: I(function(a, b) {
            return L({}, vq, a, b);
          })}),
        oq = K(kq, {Operation: function(a, b) {
            var c = a.getAttribute("name"),
                d = L({}, xq, a, b);
            d && (b[b.length - 1][c] = d);
          }}),
        sq = K(kq, {
          Voice: I(Q),
          Facsimile: I(Q)
        }),
        wq = K(kq, {Constraint: sl(function(a, b) {
            var c = a.getAttribute("name");
            if (c)
              return L({name: c}, rq, a, b);
          })}),
        yq = K(kq, {
          IndividualName: I(Q),
          PositionName: I(Q),
          ContactInfo: I(function(a, b) {
            return L({}, tq, a, b);
          })
        }),
        mq = K(kq, {
          Title: I(Q),
          ServiceTypeVersion: I(Q),
          ServiceType: I(Q)
        }),
        nq = K(kq, {
          ProviderName: I(Q),
          ProviderSite: I(gq),
          ServiceContact: I(function(a, b) {
            return L({}, yq, a, b);
          })
        });
    function zq(a, b, c, d) {
      var e;
      void 0 !== d ? e = d : e = [];
      for (var f = d = 0; f < b; ) {
        var g = a[f++];
        e[d++] = a[f++];
        e[d++] = g;
        for (g = 2; g < c; ++g)
          e[d++] = a[f++];
      }
      e.length = d;
    }
    ;
    function Aq(a) {
      a = a ? a : {};
      Cl.call(this);
      this.defaultDataProjection = Gb("EPSG:4326");
      this.b = a.factor ? a.factor : 1E5;
      this.a = a.geometryLayout ? a.geometryLayout : "XY";
    }
    u(Aq, In);
    function Bq(a, b, c) {
      var d,
          e = Array(b);
      for (d = 0; d < b; ++d)
        e[d] = 0;
      var f,
          g;
      f = 0;
      for (g = a.length; f < g; )
        for (d = 0; d < b; ++d, ++f) {
          var h = a[f],
              l = h - e[d];
          e[d] = h;
          a[f] = l;
        }
      return Cq(a, c ? c : 1E5);
    }
    function Dq(a, b, c) {
      var d,
          e = Array(b);
      for (d = 0; d < b; ++d)
        e[d] = 0;
      a = Eq(a, c ? c : 1E5);
      var f;
      c = 0;
      for (f = a.length; c < f; )
        for (d = 0; d < b; ++d, ++c)
          e[d] += a[c], a[c] = e[d];
      return a;
    }
    function Cq(a, b) {
      var c = b ? b : 1E5,
          d,
          e;
      d = 0;
      for (e = a.length; d < e; ++d)
        a[d] = Math.round(a[d] * c);
      c = 0;
      for (d = a.length; c < d; ++c)
        e = a[c], a[c] = 0 > e ? ~(e << 1) : e << 1;
      c = "";
      d = 0;
      for (e = a.length; d < e; ++d) {
        for (var f,
            g = a[d],
            h = ""; 32 <= g; )
          f = (32 | g & 31) + 63, h += String.fromCharCode(f), g >>= 5;
        h += String.fromCharCode(g + 63);
        c += h;
      }
      return c;
    }
    function Eq(a, b) {
      var c = b ? b : 1E5,
          d = [],
          e = 0,
          f = 0,
          g,
          h;
      g = 0;
      for (h = a.length; g < h; ++g) {
        var l = a.charCodeAt(g) - 63,
            e = e | (l & 31) << f;
        32 > l ? (d.push(e), f = e = 0) : f += 5;
      }
      e = 0;
      for (f = d.length; e < f; ++e)
        g = d[e], d[e] = g & 1 ? ~(g >> 1) : g >> 1;
      e = 0;
      for (f = d.length; e < f; ++e)
        d[e] /= c;
      return d;
    }
    k = Aq.prototype;
    k.Wd = function(a, b) {
      var c = this.ud(a, b);
      return new H(c);
    };
    k.lg = function(a, b) {
      return [this.Wd(a, b)];
    };
    k.ud = function(a, b) {
      var c = gf(this.a),
          d = Dq(a, c, this.b);
      zq(d, d.length, c, d);
      c = uf(d, 0, d.length, c);
      return Fl(new M(c, this.a), !1, El(this, b));
    };
    k.be = function(a, b) {
      var c = a.U();
      if (c)
        return this.Ad(c, b);
      qa(!1, 40);
      return "";
    };
    k.Gg = function(a, b) {
      return this.be(a[0], b);
    };
    k.Ad = function(a, b) {
      a = Fl(a, !0, El(this, b));
      var c = a.ha(),
          d = a.sa();
      zq(c, c.length, d, c);
      return Bq(c, d, this.b);
    };
    function Fq(a) {
      a = a ? a : {};
      Cl.call(this);
      this.defaultDataProjection = Gb(a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326");
    }
    u(Fq, Gl);
    function Gq(a, b) {
      var c = [],
          d,
          e,
          f,
          g;
      f = 0;
      for (g = a.length; f < g; ++f)
        d = a[f], 0 < f && c.pop(), 0 <= d ? e = b[d] : e = b[~d].slice().reverse(), c.push.apply(c, e);
      d = 0;
      for (e = c.length; d < e; ++d)
        c[d] = c[d].slice();
      return c;
    }
    function Hq(a, b, c, d, e) {
      a = a.geometries;
      var f = [],
          g,
          h;
      g = 0;
      for (h = a.length; g < h; ++g)
        f[g] = Iq(a[g], b, c, d, e);
      return f;
    }
    function Iq(a, b, c, d, e) {
      var f = a.type,
          g = Jq[f];
      b = "Point" === f || "MultiPoint" === f ? g(a, c, d) : g(a, b);
      c = new H;
      c.Sa(Fl(b, !1, e));
      void 0 !== a.id && c.kc(a.id);
      a.properties && c.H(a.properties);
      return c;
    }
    Fq.prototype.kg = function(a, b) {
      if ("Topology" == a.type) {
        var c,
            d = null,
            e = null;
        a.transform && (c = a.transform, d = c.scale, e = c.translate);
        var f = a.arcs;
        if (c) {
          c = d;
          var g = e,
              h,
              l;
          h = 0;
          for (l = f.length; h < l; ++h) {
            var m,
                p,
                n,
                q = f[h],
                r = c,
                v = g,
                x = 0,
                y = 0;
            p = 0;
            for (m = q.length; p < m; ++p)
              n = q[p], x += n[0], y += n[1], n[0] = x, n[1] = y, Kq(n, r, v);
          }
        }
        c = [];
        g = rb(a.objects);
        h = 0;
        for (l = g.length; h < l; ++h)
          "GeometryCollection" === g[h].type ? (m = g[h], c.push.apply(c, Hq(m, f, d, e, b))) : (m = g[h], c.push(Iq(m, f, d, e, b)));
        return c;
      }
      return [];
    };
    function Kq(a, b, c) {
      a[0] = a[0] * b[0] + c[0];
      a[1] = a[1] * b[1] + c[1];
    }
    Fq.prototype.rg = function() {
      return this.defaultDataProjection;
    };
    var Jq = {
      Point: function(a, b, c) {
        a = a.coordinates;
        b && c && Kq(a, b, c);
        return new E(a);
      },
      LineString: function(a, b) {
        var c = Gq(a.arcs, b);
        return new M(c);
      },
      Polygon: function(a, b) {
        var c = [],
            d,
            e;
        d = 0;
        for (e = a.arcs.length; d < e; ++d)
          c[d] = Gq(a.arcs[d], b);
        return new F(c);
      },
      MultiPoint: function(a, b, c) {
        a = a.coordinates;
        var d,
            e;
        if (b && c)
          for (d = 0, e = a.length; d < e; ++d)
            Kq(a[d], b, c);
        return new O(a);
      },
      MultiLineString: function(a, b) {
        var c = [],
            d,
            e;
        d = 0;
        for (e = a.arcs.length; d < e; ++d)
          c[d] = Gq(a.arcs[d], b);
        return new N(c);
      },
      MultiPolygon: function(a, b) {
        var c = [],
            d,
            e,
            f,
            g,
            h,
            l;
        h = 0;
        for (l = a.arcs.length; h < l; ++h) {
          d = a.arcs[h];
          e = [];
          f = 0;
          for (g = d.length; f < g; ++f)
            e[f] = Gq(d[f], b);
          c[h] = e;
        }
        return new P(c);
      }
    };
    k = Fq.prototype;
    k.ad = function() {};
    k.ce = function() {};
    k.ee = function() {};
    k.og = function() {};
    k.Sc = function() {};
    function Lq(a) {
      a = a ? a : {};
      this.i = a.featureType;
      this.a = a.featureNS;
      this.b = a.gmlFormat ? a.gmlFormat : new Pm;
      this.c = a.schemaLocation ? a.schemaLocation : "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";
      zm.call(this);
    }
    u(Lq, zm);
    Lq.prototype.yc = function(a, b) {
      var c = {
        featureType: this.i,
        featureNS: this.a
      };
      pb(c, Dl(this, a, b ? b : {}));
      c = [c];
      this.b.b["http://www.opengis.net/gml"].featureMember = ql(Cm.prototype.Xd);
      (c = L([], this.b.b, a, c, this.b)) || (c = []);
      return c;
    };
    Lq.prototype.j = function(a) {
      if (ll(a))
        return Mq(a);
      if (ml(a))
        return L({}, Nq, a, []);
      if ("string" === typeof a)
        return a = nl(a), Mq(a);
    };
    Lq.prototype.l = function(a) {
      if (ll(a))
        return Oq(this, a);
      if (ml(a))
        return Pq(this, a);
      if ("string" === typeof a)
        return a = nl(a), Oq(this, a);
    };
    function Oq(a, b) {
      for (var c = b.firstChild; c; c = c.nextSibling)
        if (c.nodeType == Node.ELEMENT_NODE)
          return Pq(a, c);
    }
    var Qq = {"http://www.opengis.net/gml": {boundedBy: I(Cm.prototype.We, "bounds")}};
    function Pq(a, b) {
      var c = {},
          d = Km(b.getAttribute("numberOfFeatures"));
      c.numberOfFeatures = d;
      return L(c, Qq, b, [], a.b);
    }
    var Rq = {"http://www.opengis.net/wfs": {
        totalInserted: I(Jm),
        totalUpdated: I(Jm),
        totalDeleted: I(Jm)
      }},
        Sq = {"http://www.opengis.net/ogc": {FeatureId: ql(function(a) {
              return a.getAttribute("fid");
            })}},
        Tq = {"http://www.opengis.net/wfs": {Feature: function(a, b) {
              yl(Sq, a, b);
            }}},
        Nq = {"http://www.opengis.net/wfs": {
            TransactionSummary: I(function(a, b) {
              return L({}, Rq, a, b);
            }, "transactionSummary"),
            InsertResults: I(function(a, b) {
              return L([], Tq, a, b);
            }, "insertIds")
          }};
    function Mq(a) {
      for (a = a.firstChild; a; a = a.nextSibling)
        if (a.nodeType == Node.ELEMENT_NODE)
          return L({}, Nq, a, []);
    }
    var Uq = {"http://www.opengis.net/wfs": {PropertyName: J(Mm)}};
    function Vq(a, b) {
      var c = il("http://www.opengis.net/ogc", "Filter"),
          d = il("http://www.opengis.net/ogc", "FeatureId");
      c.appendChild(d);
      d.setAttribute("fid", b);
      a.appendChild(c);
    }
    var Wq = {"http://www.opengis.net/wfs": {
        Insert: J(function(a, b, c) {
          var d = c[c.length - 1],
              d = il(d.featureNS, d.featureType);
          a.appendChild(d);
          Pm.prototype.cj(d, b, c);
        }),
        Update: J(function(a, b, c) {
          var d = c[c.length - 1];
          qa(void 0 !== b.a, 27);
          var e = d.featureType,
              f = d.featurePrefix,
              f = f ? f : "feature",
              g = d.featureNS;
          a.setAttribute("typeName", f + ":" + e);
          a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + f, g);
          e = b.a;
          if (void 0 !== e) {
            for (var f = b.O(),
                g = [],
                h = 0,
                l = f.length; h < l; h++) {
              var m = b.get(f[h]);
              void 0 !== m && g.push({
                name: f[h],
                value: m
              });
            }
            zl({
              node: a,
              srsName: d.srsName
            }, Wq, ul("Property"), g, c);
            Vq(a, e);
          }
        }),
        Delete: J(function(a, b, c) {
          var d = c[c.length - 1];
          qa(void 0 !== b.a, 26);
          c = d.featureType;
          var e = d.featurePrefix,
              e = e ? e : "feature",
              d = d.featureNS;
          a.setAttribute("typeName", e + ":" + c);
          a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + e, d);
          b = b.a;
          void 0 !== b && Vq(a, b);
        }),
        Property: J(function(a, b, c) {
          var d = il("http://www.opengis.net/wfs", "Name");
          a.appendChild(d);
          Mm(d, b.name);
          void 0 !== b.value && null !== b.value && (d = il("http://www.opengis.net/wfs", "Value"), a.appendChild(d), b.value instanceof cf ? Pm.prototype.zd(d, b.value, c) : Mm(d, b.value));
        }),
        Native: J(function(a, b) {
          b.Hp && a.setAttribute("vendorId", b.Hp);
          void 0 !== b.lp && a.setAttribute("safeToIgnore", b.lp);
          void 0 !== b.value && Mm(a, b.value);
        })
      }};
    function Xq(a, b, c) {
      var d = {node: a};
      b.b.forEach(function(a) {
        zl(d, Yq, ul(a.Bc), [a], c);
      });
    }
    function Zq(a, b) {
      void 0 !== b.a && a.setAttribute("matchCase", b.a.toString());
      $q(a, b.b);
      ar(a, "" + b.f);
    }
    function br(a, b, c) {
      a = il("http://www.opengis.net/ogc", a);
      Mm(a, c);
      b.appendChild(a);
    }
    function $q(a, b) {
      br("PropertyName", a, b);
    }
    function ar(a, b) {
      br("Literal", a, b);
    }
    var Yq = {
      "http://www.opengis.net/wfs": {Query: J(function(a, b, c) {
          var d = c[c.length - 1],
              e = d.featurePrefix,
              f = d.featureNS,
              g = d.propertyNames,
              h = d.srsName;
          a.setAttribute("typeName", (e ? e + ":" : "") + b);
          h && a.setAttribute("srsName", h);
          f && a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + e, f);
          b = pb({}, d);
          b.node = a;
          zl(b, Uq, ul("PropertyName"), g, c);
          if (d = d.filter)
            g = il("http://www.opengis.net/ogc", "Filter"), a.appendChild(g), zl({node: g}, Yq, ul(d.Bc), [d], c);
        })},
      "http://www.opengis.net/ogc": {
        And: J(Xq),
        Or: J(Xq),
        Not: J(function(a, b, c) {
          b = b.condition;
          zl({node: a}, Yq, ul(b.Bc), [b], c);
        }),
        BBOX: J(function(a, b, c) {
          c[c.length - 1].srsName = b.srsName;
          $q(a, b.geometryName);
          Pm.prototype.zd(a, b.extent, c);
        }),
        Intersects: J(function(a, b, c) {
          c[c.length - 1].srsName = b.srsName;
          $q(a, b.geometryName);
          Pm.prototype.zd(a, b.geometry, c);
        }),
        Within: J(function(a, b, c) {
          c[c.length - 1].srsName = b.srsName;
          $q(a, b.geometryName);
          Pm.prototype.zd(a, b.geometry, c);
        }),
        PropertyIsEqualTo: J(Zq),
        PropertyIsNotEqualTo: J(Zq),
        PropertyIsLessThan: J(Zq),
        PropertyIsLessThanOrEqualTo: J(Zq),
        PropertyIsGreaterThan: J(Zq),
        PropertyIsGreaterThanOrEqualTo: J(Zq),
        PropertyIsNull: J(function(a, b) {
          $q(a, b.b);
        }),
        PropertyIsBetween: J(function(a, b) {
          $q(a, b.b);
          var c = il("http://www.opengis.net/ogc", "LowerBoundary");
          a.appendChild(c);
          ar(c, "" + b.a);
          c = il("http://www.opengis.net/ogc", "UpperBoundary");
          a.appendChild(c);
          ar(c, "" + b.f);
        }),
        PropertyIsLike: J(function(a, b) {
          a.setAttribute("wildCard", b.g);
          a.setAttribute("singleChar", b.i);
          a.setAttribute("escapeChar", b.f);
          void 0 !== b.a && a.setAttribute("matchCase", b.a.toString());
          $q(a, b.b);
          ar(a, "" + b.c);
        })
      }
    };
    Lq.prototype.o = function(a) {
      var b = il("http://www.opengis.net/wfs", "GetFeature");
      b.setAttribute("service", "WFS");
      b.setAttribute("version", "1.1.0");
      var c;
      if (a && (a.handle && b.setAttribute("handle", a.handle), a.outputFormat && b.setAttribute("outputFormat", a.outputFormat), void 0 !== a.maxFeatures && b.setAttribute("maxFeatures", a.maxFeatures), a.resultType && b.setAttribute("resultType", a.resultType), void 0 !== a.startIndex && b.setAttribute("startIndex", a.startIndex), void 0 !== a.count && b.setAttribute("count", a.count), c = a.filter, a.bbox)) {
        qa(a.geometryName, 12);
        var d = pm(a.geometryName, a.bbox, a.srsName);
        c ? c = om(c, d) : c = d;
      }
      b.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.c);
      c = {
        node: b,
        srsName: a.srsName,
        featureNS: a.featureNS ? a.featureNS : this.a,
        featurePrefix: a.featurePrefix,
        geometryName: a.geometryName,
        filter: c,
        propertyNames: a.propertyNames ? a.propertyNames : []
      };
      qa(Array.isArray(a.featureTypes), 11);
      a = a.featureTypes;
      c = [c];
      d = pb({}, c[c.length - 1]);
      d.node = b;
      zl(d, Yq, ul("Query"), a, c);
      return b;
    };
    Lq.prototype.v = function(a, b, c, d) {
      var e = [],
          f = il("http://www.opengis.net/wfs", "Transaction");
      f.setAttribute("service", "WFS");
      f.setAttribute("version", "1.1.0");
      var g,
          h;
      d && (g = d.gmlOptions ? d.gmlOptions : {}, d.handle && f.setAttribute("handle", d.handle));
      f.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.c);
      a && (h = {
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }, pb(h, g), zl(h, Wq, ul("Insert"), a, e));
      b && (h = {
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }, pb(h, g), zl(h, Wq, ul("Update"), b, e));
      c && zl({
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }, Wq, ul("Delete"), c, e);
      d.nativeElements && zl({
        node: f,
        featureNS: d.featureNS,
        featureType: d.featureType,
        featurePrefix: d.featurePrefix,
        srsName: d.srsName
      }, Wq, ul("Native"), d.nativeElements, e);
      return f;
    };
    Lq.prototype.qg = function(a) {
      for (a = a.firstChild; a; a = a.nextSibling)
        if (a.nodeType == Node.ELEMENT_NODE)
          return this.Ze(a);
      return null;
    };
    Lq.prototype.Ze = function(a) {
      if (a.firstElementChild && a.firstElementChild.firstElementChild)
        for (a = a.firstElementChild.firstElementChild, a = a.firstElementChild; a; a = a.nextElementSibling)
          if (0 !== a.childNodes.length && (1 !== a.childNodes.length || 3 !== a.firstChild.nodeType)) {
            var b = [{}];
            this.b.We(a, b);
            return Gb(b.pop().srsName);
          }
      return null;
    };
    function cr(a) {
      a = a ? a : {};
      Cl.call(this);
      this.b = void 0 !== a.splitCollection ? a.splitCollection : !1;
    }
    u(cr, In);
    function dr(a) {
      a = a.X();
      return a.length ? a.join(" ") : "";
    }
    function er(a) {
      a = a.X();
      for (var b = [],
          c = 0,
          d = a.length; c < d; ++c)
        b.push(a[c].join(" "));
      return b.join(",");
    }
    function fr(a) {
      var b = [];
      a = a.jd();
      for (var c = 0,
          d = a.length; c < d; ++c)
        b.push("(" + er(a[c]) + ")");
      return b.join(",");
    }
    function gr(a) {
      var b = a.T(),
          c = (0, hr[b])(a),
          b = b.toUpperCase();
      if (a instanceof ff) {
        a = a.ka;
        var d = "";
        if ("XYZ" === a || "XYZM" === a)
          d += "Z";
        if ("XYM" === a || "XYZM" === a)
          d += "M";
        a = d;
        0 < a.length && (b += " " + a);
      }
      return c.length ? b + "(" + c + ")" : b + " EMPTY";
    }
    var hr = {
      Point: dr,
      LineString: er,
      Polygon: fr,
      MultiPoint: function(a) {
        var b = [];
        a = a.Ie();
        for (var c = 0,
            d = a.length; c < d; ++c)
          b.push("(" + dr(a[c]) + ")");
        return b.join(",");
      },
      MultiLineString: function(a) {
        var b = [];
        a = a.hd();
        for (var c = 0,
            d = a.length; c < d; ++c)
          b.push("(" + er(a[c]) + ")");
        return b.join(",");
      },
      MultiPolygon: function(a) {
        var b = [];
        a = a.Od();
        for (var c = 0,
            d = a.length; c < d; ++c)
          b.push("(" + fr(a[c]) + ")");
        return b.join(",");
      },
      GeometryCollection: function(a) {
        var b = [];
        a = a.If();
        for (var c = 0,
            d = a.length; c < d; ++c)
          b.push(gr(a[c]));
        return b.join(",");
      }
    };
    k = cr.prototype;
    k.Wd = function(a, b) {
      var c = this.ud(a, b);
      if (c) {
        var d = new H;
        d.Sa(c);
        return d;
      }
      return null;
    };
    k.lg = function(a, b) {
      var c = [],
          d = this.ud(a, b);
      this.b && "GeometryCollection" == d.T() ? c = d.a : c = [d];
      for (var e = [],
          f = 0,
          g = c.length; f < g; ++f)
        d = new H, d.Sa(c[f]), e.push(d);
      return e;
    };
    k.ud = function(a, b) {
      var c;
      c = new ir(new jr(a));
      kr(c);
      return (c = lr(c)) ? Fl(c, !1, b) : null;
    };
    k.be = function(a, b) {
      var c = a.U();
      return c ? this.Ad(c, b) : "";
    };
    k.Gg = function(a, b) {
      if (1 == a.length)
        return this.be(a[0], b);
      for (var c = [],
          d = 0,
          e = a.length; d < e; ++d)
        c.push(a[d].U());
      c = new qm(c);
      return this.Ad(c, b);
    };
    k.Ad = function(a, b) {
      return gr(Fl(a, !0, b));
    };
    function jr(a) {
      this.a = a;
      this.b = -1;
    }
    function mr(a) {
      var b = a.a.charAt(++a.b),
          c = {
            position: a.b,
            value: b
          };
      if ("(" == b)
        c.type = 2;
      else if ("," == b)
        c.type = 5;
      else if (")" == b)
        c.type = 3;
      else if ("0" <= b && "9" >= b || "." == b || "-" == b) {
        c.type = 4;
        var d,
            b = a.b,
            e = !1,
            f = !1;
        do {
          if ("." == d)
            e = !0;
          else if ("e" == d || "E" == d)
            f = !0;
          d = a.a.charAt(++a.b);
        } while ("0" <= d && "9" >= d || "." == d && (void 0 === e || !e) || !f && ("e" == d || "E" == d) || f && ("-" == d || "+" == d));
        a = parseFloat(a.a.substring(b, a.b--));
        c.value = a;
      } else if ("a" <= b && "z" >= b || "A" <= b && "Z" >= b) {
        c.type = 1;
        b = a.b;
        do
          d = a.a.charAt(++a.b);
 while ("a" <= d && "z" >= d || "A" <= d && "Z" >= d);
        a = a.a.substring(b, a.b--).toUpperCase();
        c.value = a;
      } else {
        if (" " == b || "\t" == b || "\r" == b || "\n" == b)
          return mr(a);
        if ("" === b)
          c.type = 6;
        else
          throw Error("Unexpected character: " + b);
      }
      return c;
    }
    function ir(a) {
      this.f = a;
      this.a = "XY";
    }
    function kr(a) {
      a.b = mr(a.f);
    }
    function nr(a, b) {
      var c = a.b.type == b;
      c && kr(a);
      return c;
    }
    function lr(a) {
      var b = a.b;
      if (nr(a, 1)) {
        var b = b.value,
            c = "XY",
            d = a.b;
        1 == a.b.type && (d = d.value, "Z" === d ? c = "XYZ" : "M" === d ? c = "XYM" : "ZM" === d && (c = "XYZM"), "XY" !== c && kr(a));
        a.a = c;
        if ("GEOMETRYCOLLECTION" == b) {
          a: {
            if (nr(a, 2)) {
              b = [];
              do
                b.push(lr(a));
 while (nr(a, 5));
              if (nr(a, 3)) {
                a = b;
                break a;
              }
            } else if (or(a)) {
              a = [];
              break a;
            }
            throw Error(pr(a));
          }
          return new qm(a);
        }
        d = qr[b];
        c = rr[b];
        if (!d || !c)
          throw Error("Invalid geometry type: " + b);
        b = d.call(a);
        return new c(b, a.a);
      }
      throw Error(pr(a));
    }
    k = ir.prototype;
    k.fg = function() {
      if (nr(this, 2)) {
        var a = sr(this);
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return null;
      throw Error(pr(this));
    };
    k.eg = function() {
      if (nr(this, 2)) {
        var a = tr(this);
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return [];
      throw Error(pr(this));
    };
    k.gg = function() {
      if (nr(this, 2)) {
        var a = ur(this);
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return [];
      throw Error(pr(this));
    };
    k.uo = function() {
      if (nr(this, 2)) {
        var a;
        if (2 == this.b.type)
          for (a = [this.fg()]; nr(this, 5); )
            a.push(this.fg());
        else
          a = tr(this);
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return [];
      throw Error(pr(this));
    };
    k.to = function() {
      if (nr(this, 2)) {
        var a = ur(this);
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return [];
      throw Error(pr(this));
    };
    k.vo = function() {
      if (nr(this, 2)) {
        for (var a = [this.gg()]; nr(this, 5); )
          a.push(this.gg());
        if (nr(this, 3))
          return a;
      } else if (or(this))
        return [];
      throw Error(pr(this));
    };
    function sr(a) {
      for (var b = [],
          c = a.a.length,
          d = 0; d < c; ++d) {
        var e = a.b;
        if (nr(a, 4))
          b.push(e.value);
        else
          break;
      }
      if (b.length == c)
        return b;
      throw Error(pr(a));
    }
    function tr(a) {
      for (var b = [sr(a)]; nr(a, 5); )
        b.push(sr(a));
      return b;
    }
    function ur(a) {
      for (var b = [a.eg()]; nr(a, 5); )
        b.push(a.eg());
      return b;
    }
    function or(a) {
      var b = 1 == a.b.type && "EMPTY" == a.b.value;
      b && kr(a);
      return b;
    }
    function pr(a) {
      return "Unexpected `" + a.b.value + "` at position " + a.b.position + " in `" + a.f.a + "`";
    }
    var rr = {
      POINT: E,
      LINESTRING: M,
      POLYGON: F,
      MULTIPOINT: O,
      MULTILINESTRING: N,
      MULTIPOLYGON: P
    },
        qr = {
          POINT: ir.prototype.fg,
          LINESTRING: ir.prototype.eg,
          POLYGON: ir.prototype.gg,
          MULTIPOINT: ir.prototype.uo,
          MULTILINESTRING: ir.prototype.to,
          MULTIPOLYGON: ir.prototype.vo
        };
    function vr() {
      this.version = void 0;
    }
    u(vr, hq);
    vr.prototype.a = function(a) {
      for (a = a.firstChild; a; a = a.nextSibling)
        if (a.nodeType == Node.ELEMENT_NODE)
          return this.b(a);
      return null;
    };
    vr.prototype.b = function(a) {
      this.version = a.getAttribute("version").trim();
      return (a = L({version: this.version}, wr, a, [])) ? a : null;
    };
    function xr(a, b) {
      return L({}, yr, a, b);
    }
    function zr(a, b) {
      return L({}, Ar, a, b);
    }
    function Br(a, b) {
      var c = xr(a, b);
      if (c) {
        var d = [Km(a.getAttribute("width")), Km(a.getAttribute("height"))];
        c.size = d;
        return c;
      }
    }
    function Cr(a, b) {
      return L([], Dr, a, b);
    }
    var Er = [null, "http://www.opengis.net/wms"],
        wr = K(Er, {
          Service: I(function(a, b) {
            return L({}, Fr, a, b);
          }),
          Capability: I(function(a, b) {
            return L({}, Gr, a, b);
          })
        }),
        Gr = K(Er, {
          Request: I(function(a, b) {
            return L({}, Hr, a, b);
          }),
          Exception: I(function(a, b) {
            return L([], Ir, a, b);
          }),
          Layer: I(function(a, b) {
            return L({}, Jr, a, b);
          })
        }),
        Fr = K(Er, {
          Name: I(Q),
          Title: I(Q),
          Abstract: I(Q),
          KeywordList: I(Cr),
          OnlineResource: I(gq),
          ContactInformation: I(function(a, b) {
            return L({}, Kr, a, b);
          }),
          Fees: I(Q),
          AccessConstraints: I(Q),
          LayerLimit: I(Jm),
          MaxWidth: I(Jm),
          MaxHeight: I(Jm)
        }),
        Kr = K(Er, {
          ContactPersonPrimary: I(function(a, b) {
            return L({}, Lr, a, b);
          }),
          ContactPosition: I(Q),
          ContactAddress: I(function(a, b) {
            return L({}, Mr, a, b);
          }),
          ContactVoiceTelephone: I(Q),
          ContactFacsimileTelephone: I(Q),
          ContactElectronicMailAddress: I(Q)
        }),
        Lr = K(Er, {
          ContactPerson: I(Q),
          ContactOrganization: I(Q)
        }),
        Mr = K(Er, {
          AddressType: I(Q),
          Address: I(Q),
          City: I(Q),
          StateOrProvince: I(Q),
          PostCode: I(Q),
          Country: I(Q)
        }),
        Ir = K(Er, {Format: ql(Q)}),
        Jr = K(Er, {
          Name: I(Q),
          Title: I(Q),
          Abstract: I(Q),
          KeywordList: I(Cr),
          CRS: sl(Q),
          EX_GeographicBoundingBox: I(function(a, b) {
            var c = L({}, Nr, a, b);
            if (c) {
              var d = c.westBoundLongitude,
                  e = c.southBoundLatitude,
                  f = c.eastBoundLongitude,
                  c = c.northBoundLatitude;
              if (void 0 !== d && void 0 !== e && void 0 !== f && void 0 !== c)
                return [d, e, f, c];
            }
          }),
          BoundingBox: sl(function(a) {
            var b = [Im(a.getAttribute("minx")), Im(a.getAttribute("miny")), Im(a.getAttribute("maxx")), Im(a.getAttribute("maxy"))],
                c = [Im(a.getAttribute("resx")), Im(a.getAttribute("resy"))];
            return {
              crs: a.getAttribute("CRS"),
              extent: b,
              res: c
            };
          }),
          Dimension: sl(function(a) {
            return {
              name: a.getAttribute("name"),
              units: a.getAttribute("units"),
              unitSymbol: a.getAttribute("unitSymbol"),
              "default": a.getAttribute("default"),
              multipleValues: Fm(a.getAttribute("multipleValues")),
              nearestValue: Fm(a.getAttribute("nearestValue")),
              current: Fm(a.getAttribute("current")),
              values: Q(a)
            };
          }),
          Attribution: I(function(a, b) {
            return L({}, Or, a, b);
          }),
          AuthorityURL: sl(function(a, b) {
            var c = xr(a, b);
            if (c)
              return c.name = a.getAttribute("name"), c;
          }),
          Identifier: sl(Q),
          MetadataURL: sl(function(a, b) {
            var c = xr(a, b);
            if (c)
              return c.type = a.getAttribute("type"), c;
          }),
          DataURL: sl(xr),
          FeatureListURL: sl(xr),
          Style: sl(function(a, b) {
            return L({}, Pr, a, b);
          }),
          MinScaleDenominator: I(Hm),
          MaxScaleDenominator: I(Hm),
          Layer: sl(function(a, b) {
            var c = b[b.length - 1],
                d = L({}, Jr, a, b);
            if (d) {
              var e = Fm(a.getAttribute("queryable"));
              void 0 === e && (e = c.queryable);
              d.queryable = void 0 !== e ? e : !1;
              e = Km(a.getAttribute("cascaded"));
              void 0 === e && (e = c.cascaded);
              d.cascaded = e;
              e = Fm(a.getAttribute("opaque"));
              void 0 === e && (e = c.opaque);
              d.opaque = void 0 !== e ? e : !1;
              e = Fm(a.getAttribute("noSubsets"));
              void 0 === e && (e = c.noSubsets);
              d.noSubsets = void 0 !== e ? e : !1;
              (e = Im(a.getAttribute("fixedWidth"))) || (e = c.fixedWidth);
              d.fixedWidth = e;
              (e = Im(a.getAttribute("fixedHeight"))) || (e = c.fixedHeight);
              d.fixedHeight = e;
              ["Style", "CRS", "AuthorityURL"].forEach(function(a) {
                a in c && (d[a] = (d[a] || []).concat(c[a]));
              });
              "EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(a) {
                a in d || (d[a] = c[a]);
              });
              return d;
            }
          })
        }),
        Or = K(Er, {
          Title: I(Q),
          OnlineResource: I(gq),
          LogoURL: I(Br)
        }),
        Nr = K(Er, {
          westBoundLongitude: I(Hm),
          eastBoundLongitude: I(Hm),
          southBoundLatitude: I(Hm),
          northBoundLatitude: I(Hm)
        }),
        Hr = K(Er, {
          GetCapabilities: I(zr),
          GetMap: I(zr),
          GetFeatureInfo: I(zr)
        }),
        Ar = K(Er, {
          Format: sl(Q),
          DCPType: sl(function(a, b) {
            return L({}, Qr, a, b);
          })
        }),
        Qr = K(Er, {HTTP: I(function(a, b) {
            return L({}, Rr, a, b);
          })}),
        Rr = K(Er, {
          Get: I(xr),
          Post: I(xr)
        }),
        Pr = K(Er, {
          Name: I(Q),
          Title: I(Q),
          Abstract: I(Q),
          LegendURL: sl(Br),
          StyleSheetURL: I(xr),
          StyleURL: I(xr)
        }),
        yr = K(Er, {
          Format: I(Q),
          OnlineResource: I(gq)
        }),
        Dr = K(Er, {Keyword: ql(Q)});
    function Sr(a) {
      a = a ? a : {};
      this.a = "http://mapserver.gis.umn.edu/mapserver";
      this.b = new Ym;
      this.c = a.layers ? a.layers : null;
      zm.call(this);
    }
    u(Sr, zm);
    Sr.prototype.yc = function(a, b) {
      var c = {};
      b && pb(c, Dl(this, a, b));
      var d = [c];
      a.setAttribute("namespaceURI", this.a);
      var e = a.localName,
          c = [];
      if (a.childNodes.length) {
        if ("msGMLOutput" == e)
          for (var f = 0,
              g = a.childNodes.length; f < g; f++) {
            var h = a.childNodes[f];
            if (h.nodeType === Node.ELEMENT_NODE) {
              var l = d[0],
                  m = h.localName.replace("_layer", "");
              if (!this.c || ea(this.c, m)) {
                m += "_feature";
                l.featureType = m;
                l.featureNS = this.a;
                var p = {};
                p[m] = ql(this.b.ig, this.b);
                l = K([l.featureNS, null], p);
                h.setAttribute("namespaceURI", this.a);
                (h = L([], l, h, d, this.b)) && ga(c, h);
              }
            }
          }
        "FeatureCollection" == e && (d = L([], this.b.b, a, [{}], this.b)) && (c = d);
      }
      return c;
    };
    Sr.prototype.Fg = function() {};
    Sr.prototype.Yb = function() {};
    Sr.prototype.de = function() {};
    function Tr() {
      this.f = new iq;
    }
    u(Tr, hq);
    Tr.prototype.a = function(a) {
      for (a = a.firstChild; a; a = a.nextSibling)
        if (a.nodeType == Node.ELEMENT_NODE)
          return this.b(a);
      return null;
    };
    Tr.prototype.b = function(a) {
      var b = a.getAttribute("version").trim(),
          c = this.f.b(a);
      if (!c)
        return null;
      c.version = b;
      return (c = L(c, Ur, a, [])) ? c : null;
    };
    function Vr(a) {
      var b = Q(a).split(" ");
      if (b && 2 == b.length && (a = +b[0], b = +b[1], !isNaN(a) && !isNaN(b)))
        return [a, b];
    }
    var Wr = [null, "http://www.opengis.net/wmts/1.0"],
        Xr = [null, "http://www.opengis.net/ows/1.1"],
        Ur = K(Wr, {Contents: I(function(a, b) {
            return L({}, Yr, a, b);
          })}),
        Yr = K(Wr, {
          Layer: sl(function(a, b) {
            return L({}, Zr, a, b);
          }),
          TileMatrixSet: sl(function(a, b) {
            return L({}, $r, a, b);
          })
        }),
        Zr = K(Wr, {
          Style: sl(function(a, b) {
            var c = L({}, as, a, b);
            if (c) {
              var d = "true" === a.getAttribute("isDefault");
              c.isDefault = d;
              return c;
            }
          }),
          Format: sl(Q),
          TileMatrixSetLink: sl(function(a, b) {
            return L({}, bs, a, b);
          }),
          Dimension: sl(function(a, b) {
            return L({}, cs, a, b);
          }),
          ResourceURL: sl(function(a) {
            var b = a.getAttribute("format"),
                c = a.getAttribute("template");
            a = a.getAttribute("resourceType");
            var d = {};
            b && (d.format = b);
            c && (d.template = c);
            a && (d.resourceType = a);
            return d;
          })
        }, K(Xr, {
          Title: I(Q),
          Abstract: I(Q),
          WGS84BoundingBox: I(function(a, b) {
            var c = L([], ds, a, b);
            if (2 == c.length)
              return Ha(c);
          }),
          Identifier: I(Q)
        })),
        as = K(Wr, {LegendURL: sl(function(a) {
            var b = {};
            b.format = a.getAttribute("format");
            b.href = gq(a);
            return b;
          })}, K(Xr, {
          Title: I(Q),
          Identifier: I(Q)
        })),
        bs = K(Wr, {
          TileMatrixSet: I(Q),
          TileMatrixSetLimits: I(function(a, b) {
            return L([], es, a, b);
          })
        }),
        es = K(Wr, {TileMatrixLimits: ql(function(a, b) {
            return L({}, fs, a, b);
          })}),
        fs = K(Wr, {
          TileMatrix: I(Q),
          MinTileRow: I(Jm),
          MaxTileRow: I(Jm),
          MinTileCol: I(Jm),
          MaxTileCol: I(Jm)
        }),
        cs = K(Wr, {
          Default: I(Q),
          Value: sl(Q)
        }, K(Xr, {Identifier: I(Q)})),
        ds = K(Xr, {
          LowerCorner: ql(Vr),
          UpperCorner: ql(Vr)
        }),
        $r = K(Wr, {
          WellKnownScaleSet: I(Q),
          TileMatrix: sl(function(a, b) {
            return L({}, gs, a, b);
          })
        }, K(Xr, {
          SupportedCRS: I(Q),
          Identifier: I(Q)
        })),
        gs = K(Wr, {
          TopLeftCorner: I(Vr),
          ScaleDenominator: I(Hm),
          TileWidth: I(Jm),
          TileHeight: I(Jm),
          MatrixWidth: I(Jm),
          MatrixHeight: I(Jm)
        }, K(Xr, {Identifier: I(Q)}));
    function hs(a) {
      Gc.call(this);
      a = a || {};
      this.a = null;
      this.i = Vb;
      this.c = void 0;
      B(this, Ic("projection"), this.hm, this);
      B(this, Ic("tracking"), this.im, this);
      void 0 !== a.projection && this.Ih(Gb(a.projection));
      void 0 !== a.trackingOptions && this.Si(a.trackingOptions);
      this.Ee(void 0 !== a.tracking ? a.tracking : !1);
    }
    u(hs, Gc);
    k = hs.prototype;
    k.ra = function() {
      this.Ee(!1);
      Gc.prototype.ra.call(this);
    };
    k.hm = function() {
      var a = this.Gh();
      a && (this.i = Fb(Gb("EPSG:4326"), a), this.a && this.set("position", this.i(this.a)));
    };
    k.im = function() {
      if (Od) {
        var a = this.Hh();
        a && void 0 === this.c ? this.c = navigator.geolocation.watchPosition(this.Co.bind(this), this.Do.bind(this), this.th()) : a || void 0 === this.c || (navigator.geolocation.clearWatch(this.c), this.c = void 0);
      }
    };
    k.Co = function(a) {
      a = a.coords;
      this.set("accuracy", a.accuracy);
      this.set("altitude", null === a.altitude ? void 0 : a.altitude);
      this.set("altitudeAccuracy", null === a.altitudeAccuracy ? void 0 : a.altitudeAccuracy);
      this.set("heading", null === a.heading ? void 0 : Ba(a.heading));
      this.a ? (this.a[0] = a.longitude, this.a[1] = a.latitude) : this.a = [a.longitude, a.latitude];
      var b = this.i(this.a);
      this.set("position", b);
      this.set("speed", null === a.speed ? void 0 : a.speed);
      a = Mf(mh, this.a, a.accuracy);
      a.Dc(this.i);
      this.set("accuracyGeometry", a);
      this.s();
    };
    k.Do = function(a) {
      a.type = "error";
      this.Ee(!1);
      this.b(a);
    };
    k.hk = function() {
      return this.get("accuracy");
    };
    k.ik = function() {
      return this.get("accuracyGeometry") || null;
    };
    k.kk = function() {
      return this.get("altitude");
    };
    k.lk = function() {
      return this.get("altitudeAccuracy");
    };
    k.fm = function() {
      return this.get("heading");
    };
    k.gm = function() {
      return this.get("position");
    };
    k.Gh = function() {
      return this.get("projection");
    };
    k.Rk = function() {
      return this.get("speed");
    };
    k.Hh = function() {
      return this.get("tracking");
    };
    k.th = function() {
      return this.get("trackingOptions");
    };
    k.Ih = function(a) {
      this.set("projection", a);
    };
    k.Ee = function(a) {
      this.set("tracking", a);
    };
    k.Si = function(a) {
      this.set("trackingOptions", a);
    };
    function is(a, b, c) {
      ff.call(this);
      this.yg(a, b ? b : 0, c);
    }
    u(is, ff);
    k = is.prototype;
    k.clone = function() {
      var a = new is(null);
      hf(a, this.ka, this.B.slice());
      a.s();
      return a;
    };
    k.Gb = function(a, b, c, d) {
      var e = this.B;
      a -= e[0];
      var f = b - e[1];
      b = a * a + f * f;
      if (b < d) {
        if (b)
          for (d = this.Vd() / Math.sqrt(b), c[0] = e[0] + d * a, c[1] = e[1] + d * f, d = 2; d < this.a; ++d)
            c[d] = e[d];
        else
          for (d = 0; d < this.a; ++d)
            c[d] = e[d];
        c.length = this.a;
        return b;
      }
      return d;
    };
    k.Oc = function(a, b) {
      var c = this.B,
          d = a - c[0],
          c = b - c[1];
      return d * d + c * c <= js(this);
    };
    k.Ba = function() {
      return this.B.slice(0, this.a);
    };
    k.ne = function(a) {
      var b = this.B,
          c = b[this.a] - b[0];
      return Va(b[0] - c, b[1] - c, b[0] + c, b[1] + c, a);
    };
    k.Vd = function() {
      return Math.sqrt(js(this));
    };
    function js(a) {
      var b = a.B[a.a] - a.B[0];
      a = a.B[a.a + 1] - a.B[1];
      return b * b + a * a;
    }
    k.T = function() {
      return "Circle";
    };
    k.Xa = function(a) {
      var b = this.D();
      return mb(a, b) ? (b = this.Ba(), a[0] <= b[0] && a[2] >= b[0] || a[1] <= b[1] && a[3] >= b[1] ? !0 : ab(a, this.sb, this)) : !1;
    };
    k.wb = function(a) {
      var b = this.a,
          c = a.slice();
      c[b] = c[0] + (this.B[b] - this.B[0]);
      var d;
      for (d = 1; d < b; ++d)
        c[b + d] = a[d];
      hf(this, this.ka, c);
      this.s();
    };
    k.yg = function(a, b, c) {
      if (a) {
        jf(this, c, a, 0);
        this.B || (this.B = []);
        c = this.B;
        a = rf(c, a);
        c[a++] = c[0] + b;
        var d;
        b = 1;
        for (d = this.a; b < d; ++b)
          c[a++] = c[b];
        c.length = a;
      } else
        hf(this, "XY", null);
      this.s();
    };
    k.X = function() {};
    k.pa = function() {};
    k.Wc = function(a) {
      this.B[this.a] = this.B[0] + a;
      this.s();
    };
    function ks(a, b, c) {
      for (var d = [],
          e = a(0),
          f = a(1),
          g = b(e),
          h = b(f),
          l = [f, e],
          m = [h, g],
          p = [1, 0],
          n = {},
          q = 1E5,
          r,
          v,
          x,
          y,
          z; 0 < --q && 0 < p.length; )
        x = p.pop(), e = l.pop(), g = m.pop(), f = x.toString(), f in n || (d.push(g[0], g[1]), n[f] = !0), y = p.pop(), f = l.pop(), h = m.pop(), z = (x + y) / 2, r = a(z), v = b(r), za(v[0], v[1], g[0], g[1], h[0], h[1]) < c ? (d.push(h[0], h[1]), f = y.toString(), n[f] = !0) : (p.push(y, z, z, x), m.push(h, v, v, g), l.push(f, r, r, e));
      return d;
    }
    function ls(a, b, c, d, e) {
      var f = Gb("EPSG:4326");
      return ks(function(d) {
        return [a, b + (c - b) * d];
      }, Ub(f, d), e);
    }
    function ms(a, b, c, d, e) {
      var f = Gb("EPSG:4326");
      return ks(function(d) {
        return [b + (c - b) * d, a];
      }, Ub(f, d), e);
    }
    ;
    function ns(a) {
      a = a || {};
      this.i = this.j = null;
      this.f = this.g = Infinity;
      this.c = this.l = -Infinity;
      this.A = this.u = Infinity;
      this.G = this.C = -Infinity;
      this.R = void 0 !== a.targetSize ? a.targetSize : 100;
      this.qa = void 0 !== a.maxLines ? a.maxLines : 100;
      this.b = [];
      this.a = [];
      this.ta = void 0 !== a.strokeStyle ? a.strokeStyle : os;
      this.I = this.o = void 0;
      this.v = null;
      this.setMap(void 0 !== a.map ? a.map : null);
    }
    var os = new rj({color: "rgba(0,0,0,0.2)"}),
        ps = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];
    function qs(a, b, c, d, e, f, g) {
      var h = g;
      b = ls(b, c, d, a.i, e);
      h = void 0 !== a.b[h] ? a.b[h] : new M(null);
      h.ca("XY", b);
      mb(h.D(), f) && (a.b[g++] = h);
      return g;
    }
    function rs(a, b, c, d, e) {
      var f = e;
      b = ms(b, a.c, a.f, a.i, c);
      f = void 0 !== a.a[f] ? a.a[f] : new M(null);
      f.ca("XY", b);
      mb(f.D(), d) && (a.a[e++] = f);
      return e;
    }
    k = ns.prototype;
    k.jm = function() {
      return this.j;
    };
    k.Gk = function() {
      return this.b;
    };
    k.Nk = function() {
      return this.a;
    };
    k.wh = function(a) {
      var b = a.vectorContext,
          c = a.frameState,
          d = c.extent;
      a = c.viewState;
      var e = a.center,
          f = a.projection,
          g = a.resolution;
      a = c.pixelRatio;
      a = g * g / (4 * a * a);
      if (!this.i || !Tb(this.i, f)) {
        var h = Gb("EPSG:4326"),
            l = f.D(),
            m = f.g,
            p = Xb(m, h, f),
            n = m[2],
            q = m[1],
            r = m[0],
            v = p[3],
            x = p[2],
            y = p[1],
            p = p[0];
        this.g = m[3];
        this.f = n;
        this.l = q;
        this.c = r;
        this.u = v;
        this.A = x;
        this.C = y;
        this.G = p;
        this.o = Ub(h, f);
        this.I = Ub(f, h);
        this.v = this.I(jb(l));
        this.i = f;
      }
      f.a && (f = f.D(), h = hb(f), c = c.focus[0], c < f[0] || c > f[2]) && (c = h * Math.ceil((f[0] - c) / h), d = [d[0] + c, d[1], d[2] + c, d[3]]);
      c = this.v[0];
      f = this.v[1];
      h = -1;
      m = Math.pow(this.R * g, 2);
      n = [];
      q = [];
      g = 0;
      for (l = ps.length; g < l; ++g) {
        r = ps[g] / 2;
        n[0] = c - r;
        n[1] = f - r;
        q[0] = c + r;
        q[1] = f + r;
        this.o(n, n);
        this.o(q, q);
        r = Math.pow(q[0] - n[0], 2) + Math.pow(q[1] - n[1], 2);
        if (r <= m)
          break;
        h = ps[g];
      }
      g = h;
      if (-1 == g)
        this.b.length = this.a.length = 0;
      else {
        c = this.I(e);
        e = c[0];
        c = c[1];
        f = this.qa;
        h = [Math.max(d[0], this.G), Math.max(d[1], this.C), Math.min(d[2], this.A), Math.min(d[3], this.u)];
        h = Xb(h, this.i, "EPSG:4326");
        m = h[3];
        q = h[1];
        e = Math.floor(e / g) * g;
        n = wa(e, this.c, this.f);
        l = qs(this, n, q, m, a, d, 0);
        for (h = 0; n != this.c && h++ < f; )
          n = Math.max(n - g, this.c), l = qs(this, n, q, m, a, d, l);
        n = wa(e, this.c, this.f);
        for (h = 0; n != this.f && h++ < f; )
          n = Math.min(n + g, this.f), l = qs(this, n, q, m, a, d, l);
        this.b.length = l;
        c = Math.floor(c / g) * g;
        e = wa(c, this.l, this.g);
        l = rs(this, e, a, d, 0);
        for (h = 0; e != this.l && h++ < f; )
          e = Math.max(e - g, this.l), l = rs(this, e, a, d, l);
        e = wa(c, this.l, this.g);
        for (h = 0; e != this.g && h++ < f; )
          e = Math.min(e + g, this.g), l = rs(this, e, a, d, l);
        this.a.length = l;
      }
      b.Na(null, this.ta);
      a = 0;
      for (e = this.b.length; a < e; ++a)
        g = this.b[a], b.Qb(g, null);
      a = 0;
      for (e = this.a.length; a < e; ++a)
        g = this.a[a], b.Qb(g, null);
    };
    k.setMap = function(a) {
      this.j && (this.j.K("postcompose", this.wh, this), this.j.render());
      a && (a.J("postcompose", this.wh, this), a.render());
      this.j = a;
    };
    function ss(a, b, c, d, e) {
      Dc.call(this);
      this.i = e;
      this.extent = a;
      this.a = c;
      this.resolution = b;
      this.state = d;
    }
    u(ss, Dc);
    ss.prototype.s = function() {
      this.b("change");
    };
    ss.prototype.D = function() {
      return this.extent;
    };
    ss.prototype.V = function() {
      return this.state;
    };
    function ts(a, b, c, d, e, f, g) {
      ss.call(this, a, b, c, 0, d);
      this.l = e;
      this.M = new Image;
      null !== f && (this.M.crossOrigin = f);
      this.c = {};
      this.f = null;
      this.state = 0;
      this.g = g;
    }
    u(ts, ss);
    k = ts.prototype;
    k.Z = function(a) {
      if (void 0 !== a) {
        var b;
        a = w(a);
        if (a in this.c)
          return this.c[a];
        sb(this.c) ? b = this.M : b = this.M.cloneNode(!1);
        return this.c[a] = b;
      }
      return this.M;
    };
    k.mm = function() {
      this.state = 3;
      this.f.forEach(rc);
      this.f = null;
      this.s();
    };
    k.nm = function() {
      void 0 === this.resolution && (this.resolution = ib(this.extent) / this.M.height);
      this.state = 2;
      this.f.forEach(rc);
      this.f = null;
      this.s();
    };
    k.load = function() {
      if (0 == this.state || 3 == this.state)
        this.state = 1, this.s(), this.f = [wc(this.M, "error", this.mm, this), wc(this.M, "load", this.nm, this)], this.g(this, this.l);
    };
    k.zg = function(a) {
      this.M = a;
    };
    function us(a, b, c, d, e, f) {
      this.c = f ? f : null;
      ss.call(this, a, b, c, f ? 0 : 2, d);
      this.f = e;
    }
    u(us, ss);
    us.prototype.g = function(a) {
      this.state = a ? 3 : 2;
      this.s();
    };
    us.prototype.load = function() {
      0 == this.state && (this.state = 1, this.s(), this.c(this.g.bind(this)));
    };
    us.prototype.Z = function() {
      return this.f;
    };
    function vs(a, b) {
      Dc.call(this);
      this.Ga = a;
      this.state = b;
      this.a = null;
      this.key = "";
    }
    u(vs, Dc);
    vs.prototype.s = function() {
      this.b("change");
    };
    vs.prototype.ib = function() {
      return this.key + "/" + this.Ga;
    };
    function ws(a) {
      if (!a.a)
        return a;
      var b = a.a;
      do {
        if (2 == b.V())
          return b;
        b = b.a;
      } while (b);
      return a;
    }
    vs.prototype.i = function() {
      return this.Ga;
    };
    vs.prototype.V = function() {
      return this.state;
    };
    function xs(a, b, c, d, e) {
      vs.call(this, a, b);
      this.g = c;
      this.M = new Image;
      null !== d && (this.M.crossOrigin = d);
      this.c = null;
      this.j = e;
    }
    u(xs, vs);
    k = xs.prototype;
    k.ra = function() {
      1 == this.state && ys(this);
      this.a && Ac(this.a);
      this.state = 5;
      this.s();
      vs.prototype.ra.call(this);
    };
    k.Z = function() {
      return this.M;
    };
    k.ib = function() {
      return this.g;
    };
    k.km = function() {
      this.state = 3;
      ys(this);
      this.s();
    };
    k.lm = function() {
      this.state = this.M.naturalWidth && this.M.naturalHeight ? 2 : 4;
      ys(this);
      this.s();
    };
    k.load = function() {
      if (0 == this.state || 3 == this.state)
        this.state = 1, this.s(), this.c = [wc(this.M, "error", this.km, this), wc(this.M, "load", this.lm, this)], this.j(this, this.g);
    };
    function ys(a) {
      a.c.forEach(rc);
      a.c = null;
    }
    ;
    function zs(a) {
      a = a ? a : {};
      ag.call(this, {handleEvent: af});
      this.g = a.formatConstructors ? a.formatConstructors : [];
      this.j = a.projection ? Gb(a.projection) : null;
      this.a = null;
      this.target = a.target ? a.target : null;
    }
    u(zs, ag);
    function As(a) {
      a = a.dataTransfer.files;
      var b,
          c,
          d;
      b = 0;
      for (c = a.length; b < c; ++b) {
        d = a.item(b);
        var e = new FileReader;
        e.addEventListener("load", this.l.bind(this, d));
        e.readAsText(d);
      }
    }
    function Bs(a) {
      a.stopPropagation();
      a.preventDefault();
      a.dataTransfer.dropEffect = "copy";
    }
    zs.prototype.l = function(a, b) {
      var c = b.target.result,
          d = this.v,
          e = this.j;
      e || (e = d.$().o);
      var d = this.g,
          f = [],
          g,
          h;
      g = 0;
      for (h = d.length; g < h; ++g) {
        var l = new d[g];
        var m = {featureProjection: e};
        try {
          f = l.Qa(c, m);
        } catch (p) {
          f = null;
        }
        if (f && 0 < f.length)
          break;
      }
      this.b(new Cs(Ds, a, f, e));
    };
    zs.prototype.setMap = function(a) {
      this.a && (this.a.forEach(rc), this.a = null);
      ag.prototype.setMap.call(this, a);
      a && (a = this.target ? this.target : a.c, this.a = [B(a, "drop", As, this), B(a, "dragenter", Bs, this), B(a, "dragover", Bs, this), B(a, "drop", Bs, this)]);
    };
    var Ds = "addfeatures";
    function Cs(a, b, c, d) {
      Bc.call(this, a);
      this.features = c;
      this.file = b;
      this.projection = d;
    }
    u(Cs, Bc);
    function Es(a) {
      a = a ? a : {};
      pg.call(this, {
        handleDownEvent: Fs,
        handleDragEvent: Gs,
        handleUpEvent: Hs
      });
      this.o = a.condition ? a.condition : lg;
      this.a = this.g = void 0;
      this.j = 0;
      this.u = void 0 !== a.duration ? a.duration : 400;
    }
    u(Es, pg);
    function Gs(a) {
      if (ng(a)) {
        var b = a.map,
            c = b.Mb(),
            d = a.pixel;
        a = d[0] - c[0] / 2;
        d = c[1] / 2 - d[1];
        c = Math.atan2(d, a);
        a = Math.sqrt(a * a + d * d);
        b = b.$();
        void 0 !== this.g && (d = c - this.g, bg(b, b.Va() - d));
        this.g = c;
        void 0 !== this.a && (c = this.a * (b.Ua() / a), dg(b, c));
        void 0 !== this.a && (this.j = this.a / a);
        this.a = a;
      }
    }
    function Hs(a) {
      if (!ng(a))
        return !0;
      a = a.map.$();
      Rf(a, 1, -1);
      var b = this.j - 1,
          c = a.Va(),
          c = a.constrainRotation(c, 0);
      bg(a, c, void 0, void 0);
      var c = a.Ua(),
          d = this.u,
          c = a.constrainResolution(c, 0, b);
      dg(a, c, void 0, d);
      this.j = 0;
      return !1;
    }
    function Fs(a) {
      return ng(a) && this.o(a) ? (Rf(a.map.$(), 1, 1), this.a = this.g = void 0, !0) : !1;
    }
    ;
    function Is(a, b, c, d) {
      this.oa = a;
      this.Y = b;
      this.overlaps = d;
      this.c = 0;
      this.resolution = c;
      this.R = this.ta = null;
      this.a = [];
      this.coordinates = [];
      this.eb = wh();
      this.b = [];
      this.qa = null;
      this.ia = wh();
      this.ea = wh();
    }
    u(Is, Rh);
    function Js(a, b, c, d, e, f, g) {
      var h = a.coordinates.length,
          l = a.Gf();
      g && (c += e);
      g = [b[c], b[c + 1]];
      var m = [NaN, NaN],
          p = !0,
          n,
          q,
          r;
      for (n = c + e; n < d; n += e)
        m[0] = b[n], m[1] = b[n + 1], r = Ua(l, m), r !== q ? (p && (a.coordinates[h++] = g[0], a.coordinates[h++] = g[1]), a.coordinates[h++] = m[0], a.coordinates[h++] = m[1], p = !1) : 1 === r ? (a.coordinates[h++] = m[0], a.coordinates[h++] = m[1], p = !1) : p = !0, g[0] = m[0], g[1] = m[1], q = r;
      if (f && p || n === c + e)
        a.coordinates[h++] = g[0], a.coordinates[h++] = g[1];
      return h;
    }
    function Ks(a, b) {
      a.ta = [0, b, 0];
      a.a.push(a.ta);
      a.R = [0, b, 0];
      a.b.push(a.R);
    }
    Is.prototype.Wa = function(a, b) {
      if (this.$a) {
        var c = Bh(this.eb, this.$a.slice());
        a.translate(c[0], c[1]);
        a.rotate(b);
      }
      a.fill();
      this.$a && a.setTransform.apply(a, this.ea);
    };
    function Ls(a, b, c, d, e, f, g, h, l) {
      var m;
      a.qa && ia(d, a.eb) ? m = a.qa : (a.qa || (a.qa = []), m = df(a.coordinates, 0, a.coordinates.length, 2, d, a.qa), Ah(a.eb, d));
      d = !sb(f);
      for (var p = 0,
          n = g.length,
          q = 0,
          r,
          v = a.ia,
          x = a.ea,
          y,
          z,
          A,
          V,
          Pa = 0,
          ra = 0,
          La = a.a != g || a.overlaps ? 0 : 200; p < n; ) {
        var C = g[p],
            Ma,
            xb,
            Z,
            Ra;
        switch (C[0]) {
          case 0:
            q = C[1];
            d && f[w(q).toString()] || !q.U() ? p = C[2] : void 0 === l || mb(l, q.U().D()) ? ++p : p = C[2] + 1;
            break;
          case 1:
            Pa > La && (a.Wa(b, e), Pa = 0);
            ra > La && (b.stroke(), ra = 0);
            Pa || ra || (b.beginPath(), y = z = NaN);
            ++p;
            break;
          case 2:
            q = C[1];
            r = m[q];
            C = m[q + 1];
            A = m[q + 2] - r;
            q = m[q + 3] - C;
            q = Math.sqrt(A * A + q * q);
            b.moveTo(r + q, C);
            b.arc(r, C, q, 0, 2 * Math.PI, !0);
            ++p;
            break;
          case 3:
            b.closePath();
            ++p;
            break;
          case 4:
            q = C[1];
            r = C[2];
            Ma = C[3];
            xb = C[4] * c;
            Z = C[5] * c;
            var Cb = C[6],
                dc = C[7],
                $c = C[8],
                $d = C[9];
            Ra = C[10];
            A = C[11];
            V = C[12];
            var Je = C[13],
                ue = C[14];
            for (Ra && (A += e); q < r; q += 2) {
              C = m[q] - xb;
              Ra = m[q + 1] - Z;
              Je && (C = Math.round(C), Ra = Math.round(Ra));
              if (1 != V || A) {
                var Tc = C + xb,
                    lh = Ra + Z;
                Fh(v, Tc, lh, V, V, A, -Tc, -lh);
                b.setTransform.apply(b, v);
              }
              Tc = b.globalAlpha;
              1 != dc && (b.globalAlpha = Tc * dc);
              var lh = ue + $c > Ma.width ? Ma.width - $c : ue,
                  lq = Cb + $d > Ma.height ? Ma.height - $d : Cb;
              b.drawImage(Ma, $c, $d, lh, lq, C, Ra, lh * c, lq * c);
              1 != dc && (b.globalAlpha = Tc);
              (1 != V || A) && b.setTransform.apply(b, x);
            }
            ++p;
            break;
          case 5:
            q = C[1];
            r = C[2];
            Z = C[3];
            Cb = C[4] * c;
            dc = C[5] * c;
            A = C[6];
            V = C[7] * c;
            Ma = C[8];
            xb = C[9];
            for ((Ra = C[10]) && (A += e); q < r; q += 2) {
              C = m[q] + Cb;
              Ra = m[q + 1] + dc;
              if (1 != V || A)
                Fh(v, C, Ra, V, V, A, -C, -Ra), b.setTransform.apply(b, v);
              $c = Z.split("\n");
              $d = $c.length;
              1 < $d ? (Je = Math.round(1.5 * b.measureText("M").width), Ra -= ($d - 1) / 2 * Je) : Je = 0;
              for (ue = 0; ue < $d; ue++)
                Tc = $c[ue], xb && b.strokeText(Tc, C, Ra), Ma && b.fillText(Tc, C, Ra), Ra += Je;
              (1 != V || A) && b.setTransform.apply(b, x);
            }
            ++p;
            break;
          case 6:
            if (h && (q = C[1], q = h(q)))
              return q;
            ++p;
            break;
          case 7:
            La ? Pa++ : a.Wa(b, e);
            ++p;
            break;
          case 8:
            q = C[1];
            r = C[2];
            C = m[q];
            Ra = m[q + 1];
            A = C + .5 | 0;
            V = Ra + .5 | 0;
            if (A !== y || V !== z)
              b.moveTo(C, Ra), y = A, z = V;
            for (q += 2; q < r; q += 2)
              if (C = m[q], Ra = m[q + 1], A = C + .5 | 0, V = Ra + .5 | 0, q == r - 2 || A !== y || V !== z)
                b.lineTo(C, Ra), y = A, z = V;
            ++p;
            break;
          case 9:
            a.$a = C[2];
            Pa && (a.Wa(b, e), Pa = 0, ra && (b.stroke(), ra = 0));
            b.fillStyle = C[1];
            ++p;
            break;
          case 10:
            var q = void 0 !== C[8] ? C[8] : !0,
                hl = C[9];
            r = C[2];
            ra && (b.stroke(), ra = 0);
            b.strokeStyle = C[1];
            b.lineWidth = q ? r * c : r;
            b.lineCap = C[3];
            b.lineJoin = C[4];
            b.miterLimit = C[5];
            Ld && (r = C[6], A = C[7], q && c !== hl && (r = r.map(function(a) {
              return a * c / hl;
            }), A *= c / hl, C[6] = r, C[7] = A, C[9] = c), b.lineDashOffset = A, b.setLineDash(r));
            ++p;
            break;
          case 11:
            b.font = C[1];
            b.textAlign = C[2];
            b.textBaseline = C[3];
            ++p;
            break;
          case 12:
            La ? ra++ : b.stroke();
            ++p;
            break;
          default:
            ++p;
        }
      }
      Pa && a.Wa(b, e);
      ra && b.stroke();
    }
    Is.prototype.i = function(a, b, c, d, e) {
      Ls(this, a, b, c, d, e, this.a, void 0, void 0);
    };
    function Ms(a) {
      var b = a.b;
      b.reverse();
      var c,
          d = b.length,
          e,
          f,
          g = -1;
      for (c = 0; c < d; ++c)
        if (e = b[c], f = e[0], 6 == f)
          g = c;
        else if (0 == f) {
          e[2] = c;
          e = a.b;
          for (f = c; g < f; ) {
            var h = e[g];
            e[g] = e[f];
            e[f] = h;
            ++g;
            --f;
          }
          g = -1;
        }
    }
    function Ns(a, b) {
      a.ta[2] = a.a.length;
      a.ta = null;
      a.R[2] = a.b.length;
      a.R = null;
      var c = [6, b];
      a.a.push(c);
      a.b.push(c);
    }
    Is.prototype.Je = na;
    Is.prototype.Gf = function() {
      return this.Y;
    };
    function Os(a, b, c, d) {
      Is.call(this, a, b, c, d);
      this.M = this.S = null;
      this.G = this.C = this.A = this.u = this.I = this.v = this.o = this.j = this.l = this.g = this.f = void 0;
    }
    u(Os, Is);
    Os.prototype.qc = function(a, b) {
      if (this.M) {
        Ks(this, b);
        var c = a.ha(),
            d = this.coordinates.length,
            c = Js(this, c, 0, c.length, a.sa(), !1, !1);
        this.a.push([4, d, c, this.M, this.f, this.g, this.l, this.j, this.o, this.v, this.I, this.u, this.A, this.C, this.G]);
        this.b.push([4, d, c, this.S, this.f, this.g, this.l, this.j, this.o, this.v, this.I, this.u, this.A, this.C, this.G]);
        Ns(this, b);
      }
    };
    Os.prototype.oc = function(a, b) {
      if (this.M) {
        Ks(this, b);
        var c = a.ha(),
            d = this.coordinates.length,
            c = Js(this, c, 0, c.length, a.sa(), !1, !1);
        this.a.push([4, d, c, this.M, this.f, this.g, this.l, this.j, this.o, this.v, this.I, this.u, this.A, this.C, this.G]);
        this.b.push([4, d, c, this.S, this.f, this.g, this.l, this.j, this.o, this.v, this.I, this.u, this.A, this.C, this.G]);
        Ns(this, b);
      }
    };
    Os.prototype.Je = function() {
      Ms(this);
      this.g = this.f = void 0;
      this.M = this.S = null;
      this.G = this.C = this.u = this.I = this.v = this.o = this.j = this.A = this.l = void 0;
    };
    Os.prototype.Vb = function(a) {
      var b = a.Hc(),
          c = a.jc(),
          d = a.cg(1),
          e = a.Z(1),
          f = a.Pc();
      this.f = b[0];
      this.g = b[1];
      this.S = d;
      this.M = e;
      this.l = c[1];
      this.j = a.g;
      this.o = f[0];
      this.v = f[1];
      this.I = a.o;
      this.u = a.l;
      this.A = a.c;
      this.C = a.v;
      this.G = c[0];
    };
    function Ps(a, b, c, d) {
      Is.call(this, a, b, c, d);
      this.g = null;
      this.f = {
        Kd: void 0,
        Ed: void 0,
        Fd: null,
        Gd: void 0,
        Hd: void 0,
        Id: void 0,
        Jd: void 0,
        Sf: 0,
        strokeStyle: void 0,
        lineCap: void 0,
        lineDash: null,
        lineDashOffset: void 0,
        lineJoin: void 0,
        lineWidth: void 0,
        miterLimit: void 0
      };
    }
    u(Ps, Is);
    function Qs(a, b, c, d, e) {
      var f = a.coordinates.length;
      b = Js(a, b, c, d, e, !1, !1);
      f = [8, f, b];
      a.a.push(f);
      a.b.push(f);
      return d;
    }
    k = Ps.prototype;
    k.Gf = function() {
      this.g || (this.g = Na(this.Y), 0 < this.c && Ka(this.g, this.resolution * (this.c + 1) / 2, this.g));
      return this.g;
    };
    function Rs(a) {
      var b = a.f,
          c = b.strokeStyle,
          d = b.lineCap,
          e = b.lineDash,
          f = b.lineDashOffset,
          g = b.lineJoin,
          h = b.lineWidth,
          l = b.miterLimit;
      b.Kd == c && b.Ed == d && ia(b.Fd, e) && b.Gd == f && b.Hd == g && b.Id == h && b.Jd == l || (b.Sf != a.coordinates.length && (a.a.push([12]), b.Sf = a.coordinates.length), a.a.push([10, c, h, d, g, l, e, f, !0, 1], [1]), b.Kd = c, b.Ed = d, b.Fd = e, b.Gd = f, b.Hd = g, b.Id = h, b.Jd = l);
    }
    k.Qb = function(a, b) {
      var c = this.f,
          d = c.lineWidth;
      void 0 !== c.strokeStyle && void 0 !== d && (Rs(this), Ks(this, b), this.b.push([10, c.strokeStyle, c.lineWidth, c.lineCap, c.lineJoin, c.miterLimit, c.lineDash, c.lineDashOffset, !0, 1], [1]), c = a.ha(), Qs(this, c, 0, c.length, a.sa()), this.b.push([12]), Ns(this, b));
    };
    k.nc = function(a, b) {
      var c = this.f,
          d = c.lineWidth;
      if (void 0 !== c.strokeStyle && void 0 !== d) {
        Rs(this);
        Ks(this, b);
        this.b.push([10, c.strokeStyle, c.lineWidth, c.lineCap, c.lineJoin, c.miterLimit, c.lineDash, c.lineDashOffset, !0, 1], [1]);
        var c = a.Rb(),
            d = a.ha(),
            e = a.sa(),
            f = 0,
            g,
            h;
        g = 0;
        for (h = c.length; g < h; ++g)
          f = Qs(this, d, f, c[g], e);
        this.b.push([12]);
        Ns(this, b);
      }
    };
    k.Je = function() {
      this.f.Sf != this.coordinates.length && this.a.push([12]);
      Ms(this);
      this.f = null;
    };
    k.Na = function(a, b) {
      var c = b.a;
      this.f.strokeStyle = Vc(c ? c : Ph);
      c = b.i;
      this.f.lineCap = void 0 !== c ? c : "round";
      c = b.f;
      this.f.lineDash = c ? c : Oh;
      c = b.g;
      this.f.lineDashOffset = c ? c : 0;
      c = b.l;
      this.f.lineJoin = void 0 !== c ? c : "round";
      c = b.c;
      this.f.lineWidth = void 0 !== c ? c : 1;
      c = b.j;
      this.f.miterLimit = void 0 !== c ? c : 10;
      this.f.lineWidth > this.c && (this.c = this.f.lineWidth, this.g = null);
    };
    function Ss(a, b, c, d) {
      Is.call(this, a, b, c, d);
      this.g = null;
      this.f = {
        Yg: void 0,
        Kd: void 0,
        Ed: void 0,
        Fd: null,
        Gd: void 0,
        Hd: void 0,
        Id: void 0,
        Jd: void 0,
        fillStyle: void 0,
        strokeStyle: void 0,
        lineCap: void 0,
        lineDash: null,
        lineDashOffset: void 0,
        lineJoin: void 0,
        lineWidth: void 0,
        miterLimit: void 0
      };
    }
    u(Ss, Is);
    function Ts(a, b, c, d, e) {
      var f = a.f,
          g = void 0 !== f.fillStyle,
          f = void 0 != f.strokeStyle,
          h = d.length,
          l = [1];
      a.a.push(l);
      a.b.push(l);
      for (l = 0; l < h; ++l) {
        var m = d[l],
            p = a.coordinates.length;
        c = Js(a, b, c, m, e, !0, !f);
        c = [8, p, c];
        a.a.push(c);
        a.b.push(c);
        f && (c = [3], a.a.push(c), a.b.push(c));
        c = m;
      }
      b = [7];
      a.b.push(b);
      g && a.a.push(b);
      f && (g = [12], a.a.push(g), a.b.push(g));
      return c;
    }
    k = Ss.prototype;
    k.$b = function(a, b) {
      var c = this.f,
          d = c.strokeStyle;
      if (void 0 !== c.fillStyle || void 0 !== d) {
        Us(this, a);
        Ks(this, b);
        this.b.push([9, Sc(Nh)]);
        void 0 !== c.strokeStyle && this.b.push([10, c.strokeStyle, c.lineWidth, c.lineCap, c.lineJoin, c.miterLimit, c.lineDash, c.lineDashOffset, !0, 1]);
        var e = a.ha(),
            d = this.coordinates.length;
        Js(this, e, 0, e.length, a.sa(), !1, !1);
        e = [1];
        d = [2, d];
        this.a.push(e, d);
        this.b.push(e, d);
        d = [7];
        this.b.push(d);
        void 0 !== c.fillStyle && this.a.push(d);
        void 0 !== c.strokeStyle && (c = [12], this.a.push(c), this.b.push(c));
        Ns(this, b);
      }
    };
    k.rc = function(a, b) {
      var c = this.f;
      Us(this, a);
      Ks(this, b);
      this.b.push([9, Sc(Nh)]);
      void 0 !== c.strokeStyle && this.b.push([10, c.strokeStyle, c.lineWidth, c.lineCap, c.lineJoin, c.miterLimit, c.lineDash, c.lineDashOffset, !0, 1]);
      var c = a.Rb(),
          d = a.fc();
      Ts(this, d, 0, c, a.sa());
      Ns(this, b);
    };
    k.pc = function(a, b) {
      var c = this.f,
          d = c.strokeStyle;
      if (void 0 !== c.fillStyle || void 0 !== d) {
        Us(this, a);
        Ks(this, b);
        this.b.push([9, Sc(Nh)]);
        void 0 !== c.strokeStyle && this.b.push([10, c.strokeStyle, c.lineWidth, c.lineCap, c.lineJoin, c.miterLimit, c.lineDash, c.lineDashOffset, !0, 1]);
        var c = a.c,
            d = ai(a),
            e = a.sa(),
            f = 0,
            g,
            h;
        g = 0;
        for (h = c.length; g < h; ++g)
          f = Ts(this, d, f, c[g], e);
        Ns(this, b);
      }
    };
    k.Je = function() {
      Ms(this);
      this.f = null;
      var a = this.oa;
      if (a) {
        var b = this.coordinates,
            c,
            d;
        c = 0;
        for (d = b.length; c < d; ++c)
          b[c] = a * Math.round(b[c] / a);
      }
    };
    k.Gf = function() {
      this.g || (this.g = Na(this.Y), 0 < this.c && Ka(this.g, this.resolution * (this.c + 1) / 2, this.g));
      return this.g;
    };
    k.Na = function(a, b) {
      var c = this.f;
      if (a) {
        var d = a.b;
        c.fillStyle = Vc(d ? d : Nh);
      } else
        c.fillStyle = void 0;
      b ? (d = b.a, c.strokeStyle = Vc(d ? d : Ph), d = b.i, c.lineCap = void 0 !== d ? d : "round", d = b.f, c.lineDash = d ? d.slice() : Oh, d = b.g, c.lineDashOffset = d ? d : 0, d = b.l, c.lineJoin = void 0 !== d ? d : "round", d = b.c, c.lineWidth = void 0 !== d ? d : 1, d = b.j, c.miterLimit = void 0 !== d ? d : 10, c.lineWidth > this.c && (this.c = c.lineWidth, this.g = null)) : (c.strokeStyle = void 0, c.lineCap = void 0, c.lineDash = null, c.lineDashOffset = void 0, c.lineJoin = void 0, c.lineWidth = void 0, c.miterLimit = void 0);
    };
    function Us(a, b) {
      var c = a.f,
          d = c.fillStyle,
          e = c.strokeStyle,
          f = c.lineCap,
          g = c.lineDash,
          h = c.lineDashOffset,
          l = c.lineJoin,
          m = c.lineWidth,
          p = c.miterLimit;
      if (void 0 !== d && ("string" !== typeof d || c.Yg != d)) {
        var n = [9, d];
        "string" !== typeof d && (d = b.D(), n.push([d[0], d[3]]));
        a.a.push(n);
        c.Yg = c.fillStyle;
      }
      void 0 === e || c.Kd == e && c.Ed == f && ia(c.Fd, g) && c.Gd == h && c.Hd == l && c.Id == m && c.Jd == p || (a.a.push([10, e, m, f, l, p, g, h, !0, 1]), c.Kd = e, c.Ed = f, c.Fd = g, c.Gd = h, c.Hd = l, c.Id = m, c.Jd = p);
    }
    ;
    function Vs(a, b, c, d) {
      Is.call(this, a, b, c, d);
      this.G = this.C = this.A = null;
      this.Fa = "";
      this.o = this.j = 0;
      this.v = void 0;
      this.u = this.I = 0;
      this.l = this.g = this.f = null;
    }
    u(Vs, Is);
    Vs.prototype.xc = function(a, b, c, d, e, f) {
      if ("" !== this.Fa && this.l && (this.f || this.g)) {
        if (this.f) {
          e = this.f;
          var g = this.A;
          if (!g || g.fillStyle != e.fillStyle) {
            var h = [9, e.fillStyle];
            this.a.push(h);
            this.b.push(h);
            g ? g.fillStyle = e.fillStyle : this.A = {fillStyle: e.fillStyle};
          }
        }
        this.g && (e = this.g, g = this.C, g && g.lineCap == e.lineCap && g.lineDash == e.lineDash && g.lineDashOffset == e.lineDashOffset && g.lineJoin == e.lineJoin && g.lineWidth == e.lineWidth && g.miterLimit == e.miterLimit && g.strokeStyle == e.strokeStyle || (h = [10, e.strokeStyle, e.lineWidth, e.lineCap, e.lineJoin, e.miterLimit, e.lineDash, e.lineDashOffset, !1, 1], this.a.push(h), this.b.push(h), g ? (g.lineCap = e.lineCap, g.lineDash = e.lineDash, g.lineDashOffset = e.lineDashOffset, g.lineJoin = e.lineJoin, g.lineWidth = e.lineWidth, g.miterLimit = e.miterLimit, g.strokeStyle = e.strokeStyle) : this.C = {
          lineCap: e.lineCap,
          lineDash: e.lineDash,
          lineDashOffset: e.lineDashOffset,
          lineJoin: e.lineJoin,
          lineWidth: e.lineWidth,
          miterLimit: e.miterLimit,
          strokeStyle: e.strokeStyle
        }));
        e = this.l;
        g = this.G;
        g && g.font == e.font && g.textAlign == e.textAlign && g.textBaseline == e.textBaseline || (h = [11, e.font, e.textAlign, e.textBaseline], this.a.push(h), this.b.push(h), g ? (g.font = e.font, g.textAlign = e.textAlign, g.textBaseline = e.textBaseline) : this.G = {
          font: e.font,
          textAlign: e.textAlign,
          textBaseline: e.textBaseline
        });
        Ks(this, f);
        e = this.coordinates.length;
        a = Js(this, a, b, c, d, !1, !1);
        a = [5, e, a, this.Fa, this.j, this.o, this.I, this.u, !!this.f, !!this.g, this.v];
        this.a.push(a);
        this.b.push(a);
        Ns(this, f);
      }
    };
    Vs.prototype.Tb = function(a) {
      if (a) {
        var b = a.Ca();
        b ? (b = b.b, b = Vc(b ? b : Nh), this.f ? this.f.fillStyle = b : this.f = {fillStyle: b}) : this.f = null;
        var c = a.Da();
        if (c) {
          var b = c.a,
              d = c.i,
              e = c.f,
              f = c.g,
              g = c.l,
              h = c.c,
              c = c.j,
              d = void 0 !== d ? d : "round",
              e = e ? e.slice() : Oh,
              f = void 0 !== f ? f : 0,
              g = void 0 !== g ? g : "round",
              h = void 0 !== h ? h : 1,
              c = void 0 !== c ? c : 10,
              b = Vc(b ? b : Ph);
          if (this.g) {
            var l = this.g;
            l.lineCap = d;
            l.lineDash = e;
            l.lineDashOffset = f;
            l.lineJoin = g;
            l.lineWidth = h;
            l.miterLimit = c;
            l.strokeStyle = b;
          } else
            this.g = {
              lineCap: d,
              lineDash: e,
              lineDashOffset: f,
              lineJoin: g,
              lineWidth: h,
              miterLimit: c,
              strokeStyle: b
            };
        } else
          this.g = null;
        var m = a.a,
            b = a.f,
            d = a.c,
            e = a.j,
            h = a.i,
            c = a.b,
            f = a.Pa(),
            g = a.g,
            l = a.l;
        a = void 0 !== m ? m : "10px sans-serif";
        g = void 0 !== g ? g : "center";
        l = void 0 !== l ? l : "middle";
        this.l ? (m = this.l, m.font = a, m.textAlign = g, m.textBaseline = l) : this.l = {
          font: a,
          textAlign: g,
          textBaseline: l
        };
        this.Fa = void 0 !== f ? f : "";
        this.j = void 0 !== b ? b : 0;
        this.o = void 0 !== d ? d : 0;
        this.v = void 0 !== e ? e : !1;
        this.I = void 0 !== h ? h : 0;
        this.u = void 0 !== c ? c : 1;
      } else
        this.Fa = "";
    };
    function Ws(a, b, c, d, e) {
      this.I = a;
      this.c = b;
      this.o = d;
      this.v = c;
      this.g = e;
      this.a = {};
      this.l = Xc(1, 1);
      this.j = wh();
    }
    u(Ws, fi);
    var Xs = {0: [[!0]]};
    function Ys(a, b, c) {
      var d,
          e = Math.floor(a.length / 2);
      if (b >= e)
        for (d = e; d < b; d++)
          a[d][c] = !0;
      else if (b < e)
        for (d = b + 1; d < e; d++)
          a[d][c] = !0;
    }
    function Zs(a) {
      if (void 0 !== Xs[a])
        return Xs[a];
      for (var b = 2 * a + 1,
          c = Array(b),
          d = 0; d < b; d++)
        c[d] = Array(b);
      for (var b = a,
          e = d = 0; b >= d; )
        Ys(c, a + b, a + d), Ys(c, a + d, a + b), Ys(c, a - d, a + b), Ys(c, a - b, a + d), Ys(c, a - b, a - d), Ys(c, a - d, a - b), Ys(c, a + d, a - b), Ys(c, a + b, a - d), d++, e += 1 + 2 * d, 0 < 2 * (e - b) + 1 && (--b, e += 1 - 2 * b);
      return Xs[a] = c;
    }
    function $s(a) {
      for (var b in a.a) {
        var c = a.a[b],
            d;
        for (d in c)
          c[d].Je();
      }
    }
    Ws.prototype.Aa = function(a, b, c, d, e, f) {
      d = Math.round(d);
      var g = 2 * d + 1,
          h = Fh(this.j, d + .5, d + .5, 1 / b, -1 / b, -c, -a[0], -a[1]),
          l = this.l;
      l.canvas.width !== g || l.canvas.height !== g ? (l.canvas.width = g, l.canvas.height = g) : l.clearRect(0, 0, g, g);
      var m;
      void 0 !== this.g && (m = Ia(), Ja(m, a), Ka(m, b * (this.g + d), m));
      var p = Zs(d);
      return at(this, l, h, c, e, function(a) {
        for (var b = l.getImageData(0, 0, g, g).data,
            c = 0; c < g; c++)
          for (var d = 0; d < g; d++)
            if (p[c][d] && 0 < b[4 * (d * g + c) + 3]) {
              if (a = f(a))
                return a;
              l.clearRect(0, 0, g, g);
              return;
            }
      }, m);
    };
    function bt(a, b) {
      var c = a.c,
          d = c[0],
          e = c[1],
          f = c[2],
          c = c[3],
          d = [d, e, d, c, f, c, f, e];
      df(d, 0, 8, 2, b, d);
      return d;
    }
    Ws.prototype.b = function(a, b) {
      var c = void 0 !== a ? a.toString() : "0",
          d = this.a[c];
      void 0 === d && (d = {}, this.a[c] = d);
      c = d[b];
      void 0 === c && (c = new ct[b](this.I, this.c, this.v, this.o), d[b] = c);
      return c;
    };
    Ws.prototype.f = function() {
      return sb(this.a);
    };
    Ws.prototype.i = function(a, b, c, d, e, f) {
      var g = Object.keys(this.a).map(Number);
      g.sort(da);
      var h = bt(this, c);
      a.save();
      a.beginPath();
      a.moveTo(h[0], h[1]);
      a.lineTo(h[2], h[3]);
      a.lineTo(h[4], h[5]);
      a.lineTo(h[6], h[7]);
      a.clip();
      f = f ? f : ei;
      var l,
          m,
          p,
          n,
          q,
          h = 0;
      for (l = g.length; h < l; ++h)
        for (n = this.a[g[h].toString()], m = 0, p = f.length; m < p; ++m)
          q = n[f[m]], void 0 !== q && q.i(a, b, c, d, e);
      a.restore();
    };
    function at(a, b, c, d, e, f, g) {
      var h = Object.keys(a.a).map(Number);
      h.sort(function(a, b) {
        return b - a;
      });
      var l,
          m,
          p,
          n,
          q;
      l = 0;
      for (m = h.length; l < m; ++l)
        for (n = a.a[h[l].toString()], p = ei.length - 1; 0 <= p; --p)
          if (q = n[ei[p]], void 0 !== q && (q = Ls(q, b, 1, c, d, e, q.b, f, g)))
            return q;
    }
    var ct = {
      Circle: Ss,
      Image: Os,
      LineString: Ps,
      Polygon: Ss,
      Text: Vs
    };
    function dt(a) {
      Fc.call(this);
      this.a = a;
    }
    u(dt, Fc);
    dt.prototype.Aa = na;
    dt.prototype.Ke = bf;
    dt.prototype.Cf = function(a, b, c) {
      return function(d, e) {
        return et(a, b, d, e, function(a) {
          c[d] || (c[d] = {});
          c[d][a.Ga.toString()] = a;
        });
      };
    };
    dt.prototype.ea = function(a) {
      2 === a.target.V() && ft(this);
    };
    function gt(a, b) {
      var c = b.V();
      2 != c && 3 != c && B(b, "change", a.ea, a);
      0 == c && (b.load(), c = b.V());
      return 2 == c;
    }
    function ft(a) {
      var b = a.a;
      b.Kb() && "ready" == b.Nf() && a.s();
    }
    function ht(a, b) {
      b.fi() && a.postRenderFunctions.push(function(a, b, e) {
        b = w(a).toString();
        a.gd(e.viewState.projection, e.usedTiles[b]);
      }.bind(null, b));
    }
    function it(a, b) {
      if (b) {
        var c,
            d,
            e;
        d = 0;
        for (e = b.length; d < e; ++d)
          c = b[d], a[w(c).toString()] = c;
      }
    }
    function jt(a, b) {
      var c = b.R;
      void 0 !== c && ("string" === typeof c ? a.logos[c] = "" : c && (qa("string" == typeof c.href, 44), qa("string" == typeof c.src, 45), a.logos[c.src] = c.href));
    }
    function kt(a, b, c, d) {
      b = w(b).toString();
      c = c.toString();
      b in a ? c in a[b] ? (a = a[b][c], d.da < a.da && (a.da = d.da), d.ba > a.ba && (a.ba = d.ba), d.fa < a.fa && (a.fa = d.fa), d.ja > a.ja && (a.ja = d.ja)) : a[b][c] = d : (a[b] = {}, a[b][c] = d);
    }
    function lt(a, b, c, d, e, f, g, h, l, m) {
      var p = w(b).toString();
      p in a.wantedTiles || (a.wantedTiles[p] = {});
      var n = a.wantedTiles[p];
      a = a.tileQueue;
      var q = c.minZoom,
          r,
          v,
          x,
          y,
          z,
          A;
      for (A = g; A >= q; --A)
        for (v = cc(c, f, A, v), x = c.La(A), y = v.da; y <= v.ba; ++y)
          for (z = v.fa; z <= v.ja; ++z)
            g - A <= h ? (r = b.Lc(A, y, z, d, e), 0 == r.V() && (n[r.ib()] = !0, r.ib() in a.a || a.i([r, p, ic(c, r.Ga), x])), l && l.call(m, r)) : b.Eg(A, y, z, e);
    }
    ;
    function mt(a) {
      dt.call(this, a);
      this.ia = wh();
    }
    u(mt, dt);
    function nt(a, b, c) {
      var d = b.pixelRatio,
          e = b.size[0] * d,
          f = b.size[1] * d,
          g = b.viewState.rotation,
          h = eb(c),
          l = db(c),
          m = cb(c);
      c = bb(c);
      Bh(b.coordinateToPixelTransform, h);
      Bh(b.coordinateToPixelTransform, l);
      Bh(b.coordinateToPixelTransform, m);
      Bh(b.coordinateToPixelTransform, c);
      a.save();
      Qh(a, -g, e / 2, f / 2);
      a.beginPath();
      a.moveTo(h[0] * d, h[1] * d);
      a.lineTo(l[0] * d, l[1] * d);
      a.lineTo(m[0] * d, m[1] * d);
      a.lineTo(c[0] * d, c[1] * d);
      a.clip();
      Qh(a, g, e / 2, f / 2);
    }
    function ot(a, b, c, d, e) {
      var f = a.a;
      if (Ec(f, b)) {
        var g = d.size[0] * d.pixelRatio,
            h = d.size[1] * d.pixelRatio,
            l = d.viewState.rotation;
        Qh(c, -l, g / 2, h / 2);
        a = e ? e : pt(a, d, 0);
        f.b(new Mh(b, new Sh(c, d.pixelRatio, d.extent, a, d.viewState.rotation), d, c, null));
        Qh(c, l, g / 2, h / 2);
      }
    }
    mt.prototype.v = function(a, b, c, d) {
      if (this.Aa(a, b, 0, af, this))
        return c.call(d, this.a, null);
    };
    mt.prototype.Ue = function(a, b, c, d) {
      ot(this, "postcompose", a, b, d);
    };
    function pt(a, b, c) {
      var d = b.viewState,
          e = b.pixelRatio,
          f = e / d.resolution;
      return Fh(a.ia, e * b.size[0] / 2, e * b.size[1] / 2, f, -f, -d.rotation, -d.center[0] + c, -d.center[1]);
    }
    ;
    function qt(a, b) {
      return w(a) - w(b);
    }
    function rt(a, b) {
      var c = .5 * a / b;
      return c * c;
    }
    function st(a, b, c, d, e, f) {
      var g = !1,
          h,
          l;
      if (h = c.Z())
        l = h.Oe(), 2 == l || 3 == l ? h.Yi(e, f) : (0 == l && h.load(), h.zh(e, f), g = !0);
      if (e = (0, c.Ra)(b))
        d = e.Qd(d), (0, tt[d.T()])(a, d, c, b);
      return g;
    }
    var tt = {
      Point: function(a, b, c, d) {
        var e = c.Z();
        if (e) {
          if (2 != e.Oe())
            return;
          var f = a.b(c.za(), "Image");
          f.Vb(e);
          f.qc(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), a.xc(b.ha(), 0, 2, 2, b, d);
      },
      LineString: function(a, b, c, d) {
        var e = c.Da();
        if (e) {
          var f = a.b(c.za(), "LineString");
          f.Na(null, e);
          f.Qb(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), a.xc(Zh(b), 0, 2, 2, b, d);
      },
      Polygon: function(a, b, c, d) {
        var e = c.Ca(),
            f = c.Da();
        if (e || f) {
          var g = a.b(c.za(), "Polygon");
          g.Na(e, f);
          g.rc(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), a.xc(Lf(b), 0, 2, 2, b, d);
      },
      MultiPoint: function(a, b, c, d) {
        var e = c.Z();
        if (e) {
          if (2 != e.Oe())
            return;
          var f = a.b(c.za(), "Image");
          f.Vb(e);
          f.oc(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), c = b.ha(), a.xc(c, 0, c.length, b.sa(), b, d);
      },
      MultiLineString: function(a, b, c, d) {
        var e = c.Da();
        if (e) {
          var f = a.b(c.za(), "LineString");
          f.Na(null, e);
          f.nc(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), c = $h(b), a.xc(c, 0, c.length, 2, b, d);
      },
      MultiPolygon: function(a, b, c, d) {
        var e = c.Ca(),
            f = c.Da();
        if (f || e) {
          var g = a.b(c.za(), "Polygon");
          g.Na(e, f);
          g.pc(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), c = bi(b), a.xc(c, 0, c.length, 2, b, d);
      },
      GeometryCollection: function(a, b, c, d) {
        b = b.a;
        var e,
            f;
        e = 0;
        for (f = b.length; e < f; ++e)
          (0, tt[b[e].T()])(a, b[e], c, d);
      },
      Circle: function(a, b, c, d) {
        var e = c.Ca(),
            f = c.Da();
        if (e || f) {
          var g = a.b(c.za(), "Circle");
          g.Na(e, f);
          g.$b(b, d);
        }
        if (e = c.Pa())
          a = a.b(c.za(), "Text"), a.Tb(e), a.xc(b.Ba(), 0, 2, 2, b, d);
      }
    };
    function ut(a) {
      mt.call(this, a);
      this.c = !1;
      this.u = -1;
      this.o = NaN;
      this.l = Ia();
      this.i = this.j = null;
      this.g = Xc();
    }
    u(ut, mt);
    ut.prototype.I = function(a, b, c) {
      var d = a.extent,
          e = a.pixelRatio,
          f = b.De ? a.skippedFeatureUids : {},
          g = a.viewState,
          h = g.projection,
          g = g.rotation,
          l = h.D(),
          m = this.a.la(),
          p = pt(this, a, 0);
      ot(this, "precompose", c, a, p);
      var n = b.extent,
          q = void 0 !== n;
      q && nt(c, a, n);
      if ((n = this.i) && !n.f()) {
        var r = 0,
            v = 0,
            x;
        if (Ec(this.a, "render")) {
          x = c.canvas.width;
          var y = c.canvas.height;
          if (g) {
            var z = Math.round(Math.sqrt(x * x + y * y)),
                r = (z - x) / 2,
                v = (z - y) / 2;
            x = y = z;
          }
          this.g.canvas.width = x;
          this.g.canvas.height = y;
          x = this.g;
        } else
          x = c;
        y = x.globalAlpha;
        x.globalAlpha = b.opacity;
        x != c && x.translate(r, v);
        var z = a.size[0] * e,
            A = a.size[1] * e;
        Qh(x, -g, z / 2, A / 2);
        n.i(x, e, p, g, f);
        if (m.G && h.a && !Ta(l, d)) {
          for (var h = d[0],
              m = hb(l),
              V = 0; h < l[0]; )
            --V, p = m * V, p = pt(this, a, p), n.i(x, e, p, g, f), h += m;
          V = 0;
          for (h = d[2]; h > l[2]; )
            ++V, p = m * V, p = pt(this, a, p), n.i(x, e, p, g, f), h -= m;
          p = pt(this, a, 0);
        }
        Qh(x, g, z / 2, A / 2);
        x != c && (ot(this, "render", x, a, p), c.drawImage(x.canvas, -r, -v), x.translate(-r, -v));
        x.globalAlpha = y;
      }
      q && c.restore();
      this.Ue(c, a, b, p);
    };
    ut.prototype.Aa = function(a, b, c, d, e) {
      if (this.i) {
        var f = this.a,
            g = {};
        return this.i.Aa(a, b.viewState.resolution, b.viewState.rotation, c, {}, function(a) {
          var b = w(a).toString();
          if (!(b in g))
            return g[b] = !0, d.call(e, a, f);
        });
      }
    };
    ut.prototype.A = function() {
      ft(this);
    };
    ut.prototype.qd = function(a) {
      function b(a) {
        var b,
            d = a.Nc();
        d ? b = d.call(a, m) : (d = c.i) && (b = d(a, m));
        if (b) {
          if (b) {
            d = !1;
            if (Array.isArray(b))
              for (var e = 0,
                  f = b.length; e < f; ++e)
                d = st(q, a, b[e], rt(m, p), this.A, this) || d;
            else
              d = st(q, a, b, rt(m, p), this.A, this) || d;
            a = d;
          } else
            a = !1;
          this.c = this.c || a;
        }
      }
      var c = this.a,
          d = c.la();
      it(a.attributions, d.l);
      jt(a, d);
      var e = a.viewHints[0],
          f = a.viewHints[1],
          g = c.ea,
          h = c.ia;
      if (!this.c && !g && e || !h && f)
        return !0;
      var l = a.extent,
          h = a.viewState,
          e = h.projection,
          m = h.resolution,
          p = a.pixelRatio,
          f = c.f,
          n = c.c,
          g = c.get(vt);
      void 0 === g && (g = qt);
      l = Ka(l, n * m);
      n = h.projection.D();
      d.G && h.projection.a && !Ta(n, a.extent) && (a = Math.max(hb(l) / 2, hb(n)), l[0] = n[0] - a, l[2] = n[2] + a);
      if (!this.c && this.o == m && this.u == f && this.j == g && Ta(this.l, l))
        return !0;
      this.i = null;
      this.c = !1;
      var q = new Ws(.5 * m / p, l, m, d.Ha, c.c);
      d.Ud(l, m, e);
      if (g) {
        var r = [];
        d.ac(l, function(a) {
          r.push(a);
        }, this);
        r.sort(g);
        r.forEach(b, this);
      } else
        d.ac(l, b, this);
      $s(q);
      this.o = m;
      this.u = f;
      this.j = g;
      this.l = l;
      this.i = q;
      return !0;
    };
    function wt() {
      this.b = "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}";
    }
    u(wt, hi);
    var xt = new wt;
    function yt() {
      this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}";
    }
    u(yt, ii);
    var zt = new yt;
    function At(a, b) {
      this.f = a.getUniformLocation(b, "f");
      this.c = a.getUniformLocation(b, "e");
      this.g = a.getUniformLocation(b, "d");
      this.i = a.getUniformLocation(b, "g");
      this.b = a.getAttribLocation(b, "b");
      this.a = a.getAttribLocation(b, "c");
    }
    ;
    function Bt(a, b) {
      dt.call(this, b);
      this.c = a;
      this.Y = new yi([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
      this.g = this.Fb = null;
      this.l = void 0;
      this.v = wh();
      this.u = wh();
      this.C = oi();
      this.I = null;
    }
    u(Bt, dt);
    function Ct(a, b, c) {
      var d = a.c.f;
      if (void 0 === a.l || a.l != c) {
        b.postRenderFunctions.push(function(a, b, c) {
          a.isContextLost() || (a.deleteFramebuffer(b), a.deleteTexture(c));
        }.bind(null, d, a.g, a.Fb));
        b = Li(d, c, c);
        var e = d.createFramebuffer();
        d.bindFramebuffer(36160, e);
        d.framebufferTexture2D(36160, 36064, 3553, b, 0);
        a.Fb = b;
        a.g = e;
        a.l = c;
      } else
        d.bindFramebuffer(36160, a.g);
    }
    Bt.prototype.ai = function(a, b, c) {
      Dt(this, "precompose", c, a);
      ri(c, 34962, this.Y);
      var d = c.b,
          e = Ci(c, xt, zt),
          f;
      this.I ? f = this.I : this.I = f = new At(d, e);
      c.Rc(e) && (d.enableVertexAttribArray(f.b), d.vertexAttribPointer(f.b, 2, 5126, !1, 16, 0), d.enableVertexAttribArray(f.a), d.vertexAttribPointer(f.a, 2, 5126, !1, 16, 8), d.uniform1i(f.i, 0));
      d.uniformMatrix4fv(f.g, !1, pi(this.C, this.v));
      d.uniformMatrix4fv(f.c, !1, pi(this.C, this.u));
      d.uniform1f(f.f, b.opacity);
      d.bindTexture(3553, this.Fb);
      d.drawArrays(5, 0, 4);
      Dt(this, "postcompose", c, a);
    };
    function Dt(a, b, c, d) {
      a = a.a;
      if (Ec(a, b)) {
        var e = d.viewState;
        a.b(new Mh(b, new ik(c, e.center, e.resolution, e.rotation, d.size, d.extent, d.pixelRatio), d, null, c));
      }
    }
    Bt.prototype.$f = function() {
      this.g = this.Fb = null;
      this.l = void 0;
    };
    function Et(a, b) {
      Bt.call(this, a, b);
      this.o = !1;
      this.S = -1;
      this.R = NaN;
      this.A = Ia();
      this.j = this.i = this.G = null;
    }
    u(Et, Bt);
    k = Et.prototype;
    k.ai = function(a, b, c) {
      this.j = b;
      var d = a.viewState,
          e = this.i,
          f = a.size,
          g = a.pixelRatio,
          h = this.c.f;
      e && !e.f() && (h.enable(h.SCISSOR_TEST), h.scissor(0, 0, f[0] * g, f[1] * g), e.i(c, d.center, d.resolution, d.rotation, f, g, b.opacity, b.De ? a.skippedFeatureUids : {}), h.disable(h.SCISSOR_TEST));
    };
    k.ra = function() {
      var a = this.i;
      a && (ck(a, this.c.i)(), this.i = null);
      Bt.prototype.ra.call(this);
    };
    k.Aa = function(a, b, c, d, e) {
      if (this.i && this.j) {
        c = b.viewState;
        var f = this.a,
            g = {};
        return this.i.Aa(a, this.c.i, c.center, c.resolution, c.rotation, b.size, b.pixelRatio, this.j.opacity, {}, function(a) {
          var b = w(a).toString();
          if (!(b in g))
            return g[b] = !0, d.call(e, a, f);
        });
      }
    };
    k.Ke = function(a, b) {
      if (this.i && this.j) {
        var c = b.viewState;
        return hk(this.i, a, this.c.i, c.resolution, c.rotation, b.pixelRatio, this.j.opacity, b.skippedFeatureUids);
      }
      return !1;
    };
    k.Zf = function(a, b, c, d) {
      a = Bh(b.pixelToCoordinateTransform, a.slice());
      if (this.Ke(a, b))
        return c.call(d, this.a, null);
    };
    k.bi = function() {
      ft(this);
    };
    k.ag = function(a, b, c) {
      function d(a) {
        var b,
            c = a.Nc();
        c ? b = c.call(a, m) : (c = e.i) && (b = c(a, m));
        if (b) {
          if (b) {
            c = !1;
            if (Array.isArray(b))
              for (var d = b.length - 1; 0 <= d; --d)
                c = st(q, a, b[d], rt(m, p), this.bi, this) || c;
            else
              c = st(q, a, b, rt(m, p), this.bi, this) || c;
            a = c;
          } else
            a = !1;
          this.o = this.o || a;
        }
      }
      var e = this.a;
      b = e.la();
      it(a.attributions, b.l);
      jt(a, b);
      var f = a.viewHints[0],
          g = a.viewHints[1],
          h = e.ea,
          l = e.ia;
      if (!this.o && !h && f || !l && g)
        return !0;
      var g = a.extent,
          h = a.viewState,
          f = h.projection,
          m = h.resolution,
          p = a.pixelRatio,
          h = e.f,
          n = e.c,
          l = e.get(vt);
      void 0 === l && (l = qt);
      g = Ka(g, n * m);
      if (!this.o && this.R == m && this.S == h && this.G == l && Ta(this.A, g))
        return !0;
      this.i && a.postRenderFunctions.push(ck(this.i, c));
      this.o = !1;
      var q = new bk(.5 * m / p, g, e.c);
      b.Ud(g, m, f);
      if (l) {
        var r = [];
        b.ac(g, function(a) {
          r.push(a);
        }, this);
        r.sort(l);
        r.forEach(d, this);
      } else
        b.ac(g, d, this);
      dk(q, c);
      this.R = m;
      this.S = h;
      this.G = l;
      this.A = g;
      this.i = q;
      return !0;
    };
    function R(a) {
      a = a ? a : {};
      var b = pb({}, a);
      delete b.style;
      delete b.renderBuffer;
      delete b.updateWhileAnimating;
      delete b.updateWhileInteracting;
      rh.call(this, b);
      this.c = void 0 !== a.renderBuffer ? a.renderBuffer : 100;
      this.A = null;
      this.i = void 0;
      this.g(a.style);
      this.ea = void 0 !== a.updateWhileAnimating ? a.updateWhileAnimating : !1;
      this.ia = void 0 !== a.updateWhileInteracting ? a.updateWhileInteracting : !1;
    }
    u(R, rh);
    R.prototype.Dd = function(a) {
      var b = null,
          c = a.T();
      "canvas" === c ? b = new ut(this) : "webgl" === c && (b = new Et(a, this));
      return b;
    };
    R.prototype.C = function() {
      return this.A;
    };
    R.prototype.G = function() {
      return this.i;
    };
    R.prototype.g = function(a) {
      this.A = void 0 !== a ? a : dl;
      this.i = null === a ? void 0 : bl(this.A);
      this.s();
    };
    var vt = "renderOrder";
    function Ft() {
      return [[-Infinity, -Infinity, Infinity, Infinity]];
    }
    ;
    function Gt(a) {
      Gc.call(this);
      this.c = Gb(a.projection);
      this.l = Ht(a.attributions);
      this.R = a.logo;
      this.Ja = void 0 !== a.state ? a.state : "ready";
      this.G = void 0 !== a.wrapX ? a.wrapX : !1;
    }
    u(Gt, Gc);
    function Ht(a) {
      if ("string" === typeof a)
        return [new nc({html: a})];
      if (a instanceof nc)
        return [a];
      if (Array.isArray(a)) {
        for (var b = a.length,
            c = Array(b),
            d = 0; d < b; d++) {
          var e = a[d];
          c[d] = "string" === typeof e ? new nc({html: e}) : e;
        }
        return c;
      }
      return null;
    }
    k = Gt.prototype;
    k.Aa = na;
    k.xa = function() {
      return this.l;
    };
    k.wa = function() {
      return this.R;
    };
    k.ya = function() {
      return this.c;
    };
    k.V = function() {
      return this.Ja;
    };
    k.va = function() {
      this.s();
    };
    k.ua = function(a) {
      this.l = Ht(a);
      this.s();
    };
    function It(a, b) {
      a.Ja = b;
      a.s();
    }
    ;
    function S(a) {
      a = a || {};
      Gt.call(this, {
        attributions: a.attributions,
        logo: a.logo,
        projection: void 0,
        state: "ready",
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
      this.Y = na;
      this.S = a.format;
      this.Ha = void 0 == a.overlaps ? !0 : a.overlaps;
      this.ea = a.url;
      a.loader ? this.Y = a.loader : void 0 !== this.ea && (qa(this.S, 7), this.Y = Bl(this.ea, this.S));
      this.Bd = a.strategy ? a.strategy : Ft;
      var b = void 0 !== a.useSpatialIndex ? a.useSpatialIndex : !0;
      this.a = b ? new Ej : null;
      this.oa = new Ej;
      this.g = {};
      this.j = {};
      this.o = {};
      this.v = {};
      this.i = null;
      var c,
          d;
      a.features instanceof D ? (c = a.features, d = c.a) : Array.isArray(a.features) && (d = a.features);
      b || c || (c = new D(d));
      d && Jt(this, d);
      c && Kt(this, c);
    }
    u(S, Gt);
    k = S.prototype;
    k.zb = function(a) {
      var b = w(a).toString();
      if (Lt(this, b, a)) {
        Mt(this, b, a);
        var c = a.U();
        c ? (b = c.D(), this.a && this.a.Ea(b, a)) : this.g[b] = a;
        this.b(new Nt("addfeature", a));
      }
      this.s();
    };
    function Mt(a, b, c) {
      a.v[b] = [B(c, "change", a.ji, a), B(c, "propertychange", a.ji, a)];
    }
    function Lt(a, b, c) {
      var d = !0,
          e = c.a;
      void 0 !== e ? e.toString() in a.j ? d = !1 : a.j[e.toString()] = c : (qa(!(b in a.o), 30), a.o[b] = c);
      return d;
    }
    k.dd = function(a) {
      Jt(this, a);
      this.s();
    };
    function Jt(a, b) {
      var c,
          d,
          e,
          f,
          g = [],
          h = [],
          l = [];
      d = 0;
      for (e = b.length; d < e; d++)
        f = b[d], c = w(f).toString(), Lt(a, c, f) && h.push(f);
      d = 0;
      for (e = h.length; d < e; d++) {
        f = h[d];
        c = w(f).toString();
        Mt(a, c, f);
        var m = f.U();
        m ? (c = m.D(), g.push(c), l.push(f)) : a.g[c] = f;
      }
      a.a && a.a.load(g, l);
      d = 0;
      for (e = h.length; d < e; d++)
        a.b(new Nt("addfeature", h[d]));
    }
    function Kt(a, b) {
      var c = !1;
      B(a, "addfeature", function(a) {
        c || (c = !0, b.push(a.feature), c = !1);
      });
      B(a, "removefeature", function(a) {
        c || (c = !0, b.remove(a.feature), c = !1);
      });
      B(b, "add", function(a) {
        c || (c = !0, this.zb(a.element), c = !1);
      }, a);
      B(b, "remove", function(a) {
        c || (c = !0, this.Db(a.element), c = !1);
      }, a);
      a.i = b;
    }
    k.clear = function(a) {
      if (a) {
        for (var b in this.v)
          this.v[b].forEach(rc);
        this.i || (this.v = {}, this.j = {}, this.o = {});
      } else if (this.a) {
        this.a.forEach(this.ug, this);
        for (var c in this.g)
          this.ug(this.g[c]);
      }
      this.i && this.i.clear();
      this.a && this.a.clear();
      this.oa.clear();
      this.g = {};
      this.b(new Nt("clear"));
      this.s();
    };
    k.bh = function(a, b) {
      if (this.a)
        return this.a.forEach(a, b);
      if (this.i)
        return this.i.forEach(a, b);
    };
    function Ot(a, b, c) {
      a.ac([b[0], b[1], b[0], b[1]], function(a) {
        if (a.U().sb(b))
          return c.call(void 0, a);
      });
    }
    k.ac = function(a, b, c) {
      if (this.a)
        return Jj(this.a, a, b, c);
      if (this.i)
        return this.i.forEach(b, c);
    };
    k.dh = function(a, b, c) {
      return this.ac(a, function(d) {
        if (d.U().Xa(a) && (d = b.call(c, d)))
          return d;
      });
    };
    k.lh = function() {
      return this.i;
    };
    k.Ne = function() {
      var a;
      this.i ? a = this.i.a : this.a && (a = Gj(this.a), sb(this.g) || ga(a, rb(this.g)));
      return a;
    };
    k.kh = function(a) {
      var b = [];
      Ot(this, a, function(a) {
        b.push(a);
      });
      return b;
    };
    k.Hf = function(a) {
      return Hj(this.a, a);
    };
    k.gh = function(a, b) {
      var c = a[0],
          d = a[1],
          e = null,
          f = [NaN, NaN],
          g = Infinity,
          h = [-Infinity, -Infinity, Infinity, Infinity],
          l = b ? b : af;
      Jj(this.a, h, function(a) {
        if (l(a)) {
          var b = a.U(),
              m = g;
          g = b.Gb(c, d, f, g);
          g < m && (e = a, a = Math.sqrt(g), h[0] = c - a, h[1] = d - a, h[2] = c + a, h[3] = d + a);
        }
      });
      return e;
    };
    k.D = function() {
      return this.a.D();
    };
    k.jh = function(a) {
      a = this.j[a.toString()];
      return void 0 !== a ? a : null;
    };
    k.hi = function() {
      return this.S;
    };
    k.ii = function() {
      return this.ea;
    };
    k.ji = function(a) {
      a = a.target;
      var b = w(a).toString(),
          c = a.U();
      c ? (c = c.D(), b in this.g ? (delete this.g[b], this.a && this.a.Ea(c, a)) : this.a && Fj(this.a, c, a)) : b in this.g || (this.a && this.a.remove(a), this.g[b] = a);
      c = a.a;
      void 0 !== c ? (c = c.toString(), b in this.o ? (delete this.o[b], this.j[c] = a) : this.j[c] !== a && (Pt(this, a), this.j[c] = a)) : b in this.o || (Pt(this, a), this.o[b] = a);
      this.s();
      this.b(new Nt("changefeature", a));
    };
    k.Ud = function(a, b, c) {
      var d = this.oa;
      a = this.Bd(a, b);
      var e,
          f;
      e = 0;
      for (f = a.length; e < f; ++e) {
        var g = a[e];
        Jj(d, g, function(a) {
          return Ta(a.extent, g);
        }) || (this.Y.call(this, g, b, c), d.Ea(g, {extent: g.slice()}));
      }
    };
    k.Db = function(a) {
      var b = w(a).toString();
      b in this.g ? delete this.g[b] : this.a && this.a.remove(a);
      this.ug(a);
      this.s();
    };
    k.ug = function(a) {
      var b = w(a).toString();
      this.v[b].forEach(rc);
      delete this.v[b];
      var c = a.a;
      void 0 !== c ? delete this.j[c.toString()] : delete this.o[b];
      this.b(new Nt("removefeature", a));
    };
    function Pt(a, b) {
      for (var c in a.j)
        if (a.j[c] === b) {
          delete a.j[c];
          break;
        }
    }
    function Nt(a, b) {
      Bc.call(this, a);
      this.feature = b;
    }
    u(Nt, Bc);
    function Qt(a) {
      pg.call(this, {
        handleDownEvent: Rt,
        handleEvent: St,
        handleUpEvent: Tt
      });
      this.ea = null;
      this.u = !1;
      this.lb = a.source ? a.source : null;
      this.Ha = a.features ? a.features : null;
      this.ak = a.snapTolerance ? a.snapTolerance : 12;
      this.S = a.type;
      this.g = Ut(this.S);
      this.Ja = a.minPoints ? a.minPoints : this.g === Vt ? 3 : 2;
      this.oa = a.maxPoints ? a.maxPoints : Infinity;
      this.Bd = a.finishCondition ? a.finishCondition : af;
      var b = a.geometryFunction;
      if (!b)
        if ("Circle" === this.S)
          b = function(a, b) {
            var c = b ? b : new is([NaN, NaN]);
            c.yg(a[0], Math.sqrt(Xe(a[0], a[1])));
            return c;
          };
        else {
          var c,
              d = this.g;
          d === Wt ? c = E : d === Xt ? c = M : d === Vt && (c = F);
          b = function(a, b) {
            var e = b;
            e ? d === Vt ? e.pa([a[0].concat([a[0][0]])]) : e.pa(a) : e = new c(a);
            return e;
          };
        }
      this.Ra = b;
      this.R = this.C = this.a = this.G = this.j = this.o = null;
      this.mb = a.clickTolerance ? a.clickTolerance * a.clickTolerance : 36;
      this.ia = new R({
        source: new S({
          useSpatialIndex: !1,
          wrapX: a.wrapX ? a.wrapX : !1
        }),
        style: a.style ? a.style : Yt()
      });
      this.Oa = a.geometryName;
      this.Yj = a.condition ? a.condition : kg;
      this.rf = a.freehand ? af : a.freehandCondition ? a.freehandCondition : lg;
      B(this, Ic("active"), this.aj, this);
    }
    u(Qt, pg);
    function Yt() {
      var a = el();
      return function(b) {
        return a[b.U().T()];
      };
    }
    k = Qt.prototype;
    k.setMap = function(a) {
      pg.prototype.setMap.call(this, a);
      this.aj();
    };
    function St(a) {
      this.u = this.g !== Wt && this.rf(a);
      var b = !this.u;
      this.u && "pointerdrag" === a.type && null !== this.j ? (Zt(this, a), b = !1) : "pointermove" === a.type ? b = $t(this, a) : "dblclick" === a.type && (b = !1);
      return qg.call(this, a) && b;
    }
    function Rt(a) {
      return this.u ? (this.ea = a.pixel, this.o || au(this, a), !0) : this.Yj(a) ? (this.ea = a.pixel, !0) : !1;
    }
    function Tt(a) {
      var b = this.ea,
          c = a.pixel,
          d = b[0] - c[0],
          b = b[1] - c[1],
          d = d * d + b * b,
          b = !0,
          c = this.g === bu;
      (this.u ? d > this.mb : d <= this.mb) ? ($t(this, a), this.o ? this.u || c ? this.Nd() : cu(this, a) ? this.Bd(a) && this.Nd() : Zt(this, a) : (au(this, a), this.g === Wt && this.Nd()), b = !1) : c && (this.o = null);
      return b;
    }
    function $t(a, b) {
      if (a.o) {
        var c = b.coordinate,
            d = a.j.U(),
            e;
        a.g === Wt ? e = a.a : a.g === Vt ? (e = a.a[0], e = e[e.length - 1], cu(a, b) && (c = a.o.slice())) : (e = a.a, e = e[e.length - 1]);
        e[0] = c[0];
        e[1] = c[1];
        a.Ra(a.a, d);
        a.G && a.G.U().pa(c);
        d instanceof F && a.g !== Vt ? (a.C || (a.C = new H(new M(null))), d = d.nh(0), c = a.C.U(), c.ca(d.ka, d.ha())) : a.R && (c = a.C.U(), c.pa(a.R));
        du(a);
      } else
        c = b.coordinate.slice(), a.G ? a.G.U().pa(c) : (a.G = new H(new E(c)), du(a));
      return !0;
    }
    function cu(a, b) {
      var c = !1;
      if (a.j) {
        var d = !1,
            e = [a.o];
        a.g === Xt ? d = a.a.length > a.Ja : a.g === Vt && (d = a.a[0].length > a.Ja, e = [a.a[0][0], a.a[0][a.a[0].length - 2]]);
        if (d)
          for (var d = b.map,
              f = 0,
              g = e.length; f < g; f++) {
            var h = e[f],
                l = d.Ka(h),
                m = b.pixel,
                c = m[0] - l[0],
                l = m[1] - l[1];
            if (c = Math.sqrt(c * c + l * l) <= (a.u ? 1 : a.ak)) {
              a.o = h;
              break;
            }
          }
      }
      return c;
    }
    function au(a, b) {
      var c = b.coordinate;
      a.o = c;
      a.g === Wt ? a.a = c.slice() : a.g === Vt ? (a.a = [[c.slice(), c.slice()]], a.R = a.a[0]) : (a.a = [c.slice(), c.slice()], a.g === bu && (a.R = a.a));
      a.R && (a.C = new H(new M(a.R)));
      c = a.Ra(a.a);
      a.j = new H;
      a.Oa && a.j.Vc(a.Oa);
      a.j.Sa(c);
      du(a);
      a.b(new eu("drawstart", a.j));
    }
    function Zt(a, b) {
      var c = b.coordinate,
          d = a.j.U(),
          e,
          f;
      a.g === Xt ? (a.o = c.slice(), f = a.a, f.length >= a.oa && (a.u ? f.pop() : e = !0), f.push(c.slice()), a.Ra(f, d)) : a.g === Vt && (f = a.a[0], f.length >= a.oa && (a.u ? f.pop() : e = !0), f.push(c.slice()), e && (a.o = f[0]), a.Ra(a.a, d));
      du(a);
      e && a.Nd();
    }
    k.cp = function() {
      var a = this.j.U(),
          b,
          c;
      this.g === Xt ? (b = this.a, b.splice(-2, 1), this.Ra(b, a)) : this.g === Vt && (b = this.a[0], b.splice(-2, 1), c = this.C.U(), c.pa(b), this.Ra(this.a, a));
      0 === b.length && (this.o = null);
      du(this);
    };
    k.Nd = function() {
      var a = fu(this),
          b = this.a,
          c = a.U();
      this.g === Xt ? (b.pop(), this.Ra(b, c)) : this.g === Vt && (b[0].pop(), this.Ra(b, c), b = c.X());
      "MultiPoint" === this.S ? a.Sa(new O([b])) : "MultiLineString" === this.S ? a.Sa(new N([b])) : "MultiPolygon" === this.S && a.Sa(new P([b]));
      this.b(new eu("drawend", a));
      this.Ha && this.Ha.push(a);
      this.lb && this.lb.zb(a);
    };
    function fu(a) {
      a.o = null;
      var b = a.j;
      b && (a.j = null, a.G = null, a.C = null, a.ia.la().clear(!0));
      return b;
    }
    k.Om = function(a) {
      var b = a.U();
      this.j = a;
      this.a = b.X();
      a = this.a[this.a.length - 1];
      this.o = a.slice();
      this.a.push(a.slice());
      du(this);
      this.b(new eu("drawstart", this.j));
    };
    k.Zc = bf;
    function du(a) {
      var b = [];
      a.j && b.push(a.j);
      a.C && b.push(a.C);
      a.G && b.push(a.G);
      a = a.ia.la();
      a.clear(!0);
      a.dd(b);
    }
    k.aj = function() {
      var a = this.v,
          b = this.c();
      a && b || fu(this);
      this.ia.setMap(b ? a : null);
    };
    function Ut(a) {
      var b;
      "Point" === a || "MultiPoint" === a ? b = Wt : "LineString" === a || "MultiLineString" === a ? b = Xt : "Polygon" === a || "MultiPolygon" === a ? b = Vt : "Circle" === a && (b = bu);
      return b;
    }
    var Wt = "Point",
        Xt = "LineString",
        Vt = "Polygon",
        bu = "Circle";
    function eu(a, b) {
      Bc.call(this, a);
      this.feature = b;
    }
    u(eu, Bc);
    function gu(a) {
      this.a = this.j = null;
      this.C = !1;
      this.G = this.o = null;
      a || (a = {});
      a.extent && this.g(a.extent);
      pg.call(this, {
        handleDownEvent: hu,
        handleDragEvent: iu,
        handleEvent: ju,
        handleUpEvent: ku
      });
      this.u = new R({
        source: new S({
          useSpatialIndex: !1,
          wrapX: !!a.wrapX
        }),
        style: a.boxStyle ? a.boxStyle : lu(),
        updateWhileAnimating: !0,
        updateWhileInteracting: !0
      });
      this.R = new R({
        source: new S({
          useSpatialIndex: !1,
          wrapX: !!a.wrapX
        }),
        style: a.pointerStyle ? a.pointerStyle : mu(),
        updateWhileAnimating: !0,
        updateWhileInteracting: !0
      });
    }
    u(gu, pg);
    function ju(a) {
      if (!(a instanceof Bd))
        return !0;
      if ("pointermove" == a.type && !this.A) {
        var b = a.pixel,
            c = a.map,
            d = nu(this, b, c);
        d || (d = c.Za(b));
        ou(this, d);
      }
      qg.call(this, a);
      return !1;
    }
    function hu(a) {
      function b(a) {
        var b = null,
            c = null;
        a[0] == e[0] ? b = e[2] : a[0] == e[2] && (b = e[0]);
        a[1] == e[1] ? c = e[3] : a[1] == e[3] && (c = e[1]);
        return null !== b && null !== c ? [b, c] : null;
      }
      var c = a.pixel,
          d = a.map,
          e = this.D();
      (a = nu(this, c, d)) && e ? (c = a[0] == e[0] || a[0] == e[2] ? a[0] : null, d = a[1] == e[1] || a[1] == e[3] ? a[1] : null, null !== c && null !== d ? this.a = pu(b(a)) : null !== c ? this.a = qu(b([c, e[1]]), b([c, e[3]])) : null !== d && (this.a = qu(b([e[0], d]), b([e[2], d])))) : (a = d.Za(c), this.g([a[0], a[1], a[0], a[1]]), this.a = pu(a));
      return !0;
    }
    function iu(a) {
      this.a && (a = a.coordinate, this.g(this.a(a)), ou(this, a));
      return !0;
    }
    function ku() {
      this.a = null;
      var a = this.D();
      a && fb(a) || this.g(null);
      return !1;
    }
    function lu() {
      var a = el();
      return function() {
        return a.Polygon;
      };
    }
    function mu() {
      var a = el();
      return function() {
        return a.Point;
      };
    }
    function pu(a) {
      return function(b) {
        return Ha([a, b]);
      };
    }
    function qu(a, b) {
      return a[0] == b[0] ? function(c) {
        return Ha([a, [c[0], b[1]]]);
      } : a[1] == b[1] ? function(c) {
        return Ha([a, [b[0], c[1]]]);
      } : null;
    }
    function nu(a, b, c) {
      function d(a, b) {
        return Ze(e, a) - Ze(e, b);
      }
      var e = c.Za(b),
          f = a.D();
      if (f) {
        f = [[[f[0], f[1]], [f[0], f[3]]], [[f[0], f[3]], [f[2], f[3]]], [[f[2], f[3]], [f[2], f[1]]], [[f[2], f[1]], [f[0], f[1]]]];
        f.sort(d);
        var f = f[0],
            g = Re(e, f),
            h = c.Ka(g);
        if (10 >= Ye(b, h))
          return b = c.Ka(f[0]), c = c.Ka(f[1]), b = Xe(h, b), c = Xe(h, c), a.C = 10 >= Math.sqrt(Math.min(b, c)), a.C && (g = b > c ? f[1] : f[0]), g;
      }
      return null;
    }
    function ou(a, b) {
      var c = a.G;
      c ? c.U().pa(b) : (c = new H(new E(b)), a.G = c, a.R.la().zb(c));
    }
    gu.prototype.setMap = function(a) {
      this.u.setMap(a);
      this.R.setMap(a);
      pg.prototype.setMap.call(this, a);
    };
    gu.prototype.D = function() {
      return this.j;
    };
    gu.prototype.g = function(a) {
      this.j = a ? a : null;
      var b = this.o;
      b ? a ? b.Sa(Nf(a)) : b.Sa(void 0) : (this.o = b = a ? new H(Nf(a)) : new H({}), this.u.la().zb(b));
      this.b(new ru(this.j));
    };
    function ru(a) {
      Bc.call(this, su);
      this.b = a;
    }
    u(ru, Bc);
    var su = "extentchanged";
    function tu(a) {
      pg.call(this, {
        handleDownEvent: uu,
        handleDragEvent: vu,
        handleEvent: wu,
        handleUpEvent: xu
      });
      this.mb = a.condition ? a.condition : og;
      this.Oa = function(a) {
        return kg(a) && jg(a);
      };
      this.lb = a.deleteCondition ? a.deleteCondition : this.Oa;
      this.Ha = this.g = null;
      this.Ja = [0, 0];
      this.C = this.R = !1;
      this.a = new Ej;
      this.ia = void 0 !== a.pixelTolerance ? a.pixelTolerance : 10;
      this.o = this.oa = !1;
      this.j = [];
      this.G = new R({
        source: new S({
          useSpatialIndex: !1,
          wrapX: !!a.wrapX
        }),
        style: a.style ? a.style : yu(),
        updateWhileAnimating: !0,
        updateWhileInteracting: !0
      });
      this.ea = {
        Point: this.Vm,
        LineString: this.Oh,
        LinearRing: this.Oh,
        Polygon: this.Wm,
        MultiPoint: this.Tm,
        MultiLineString: this.Sm,
        MultiPolygon: this.Um,
        Circle: this.Ip,
        GeometryCollection: this.Rm
      };
      this.u = a.features;
      this.u.forEach(this.Yf, this);
      B(this.u, "add", this.Pm, this);
      B(this.u, "remove", this.Qm, this);
      this.S = null;
    }
    u(tu, pg);
    k = tu.prototype;
    k.Yf = function(a) {
      var b = a.U();
      b && b.T() in this.ea && this.ea[b.T()].call(this, a, b);
      (b = this.v) && b.a && this.c() && zu(this, this.Ja, b);
      B(a, "change", this.Nh, this);
    };
    function Au(a, b) {
      a.C || (a.C = !0, a.b(new Bu("modifystart", a.u, b)));
    }
    function Cu(a, b) {
      Du(a, b);
      a.g && !a.u.ec() && (a.G.la().Db(a.g), a.g = null);
      xc(b, "change", a.Nh, a);
    }
    function Du(a, b) {
      var c = a.a,
          d = [];
      c.forEach(function(a) {
        b === a.feature && d.push(a);
      });
      for (var e = d.length - 1; 0 <= e; --e)
        c.remove(d[e]);
    }
    k.Ia = function(a) {
      this.g && !a && (this.G.la().Db(this.g), this.g = null);
      pg.prototype.Ia.call(this, a);
    };
    k.setMap = function(a) {
      this.G.setMap(a);
      pg.prototype.setMap.call(this, a);
    };
    k.Pm = function(a) {
      this.Yf(a.element);
    };
    k.Nh = function(a) {
      this.o || (a = a.target, Cu(this, a), this.Yf(a));
    };
    k.Qm = function(a) {
      Cu(this, a.element);
    };
    k.Vm = function(a, b) {
      var c = b.X(),
          c = {
            feature: a,
            geometry: b,
            na: [c, c]
          };
      this.a.Ea(b.D(), c);
    };
    k.Tm = function(a, b) {
      var c = b.X(),
          d,
          e,
          f;
      e = 0;
      for (f = c.length; e < f; ++e)
        d = c[e], d = {
          feature: a,
          geometry: b,
          depth: [e],
          index: e,
          na: [d, d]
        }, this.a.Ea(b.D(), d);
    };
    k.Oh = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g;
      d = 0;
      for (e = c.length - 1; d < e; ++d)
        f = c.slice(d, d + 2), g = {
          feature: a,
          geometry: b,
          index: d,
          na: f
        }, this.a.Ea(Ha(f), g);
    };
    k.Sm = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = c.length; g < h; ++g)
        for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
          l = d.slice(e, e + 2), m = {
            feature: a,
            geometry: b,
            depth: [g],
            index: e,
            na: l
          }, this.a.Ea(Ha(l), m);
    };
    k.Wm = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = c.length; g < h; ++g)
        for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
          l = d.slice(e, e + 2), m = {
            feature: a,
            geometry: b,
            depth: [g],
            index: e,
            na: l
          }, this.a.Ea(Ha(l), m);
    };
    k.Um = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m,
          p,
          n,
          q;
      l = 0;
      for (m = c.length; l < m; ++l)
        for (p = c[l], g = 0, h = p.length; g < h; ++g)
          for (d = p[g], e = 0, f = d.length - 1; e < f; ++e)
            n = d.slice(e, e + 2), q = {
              feature: a,
              geometry: b,
              depth: [g, l],
              index: e,
              na: n
            }, this.a.Ea(Ha(n), q);
    };
    k.Ip = function(a, b) {
      var c = b.Ba(),
          d = {
            feature: a,
            geometry: b,
            index: 0,
            na: [c, c]
          },
          e = {
            feature: a,
            geometry: b,
            index: 1,
            na: [c, c]
          };
      d.Ef = e.Ef = [d, e];
      this.a.Ea(Wa(c), d);
      this.a.Ea(b.D(), e);
    };
    k.Rm = function(a, b) {
      var c,
          d = b.a;
      for (c = 0; c < d.length; ++c)
        this.ea[d[c].T()].call(this, a, d[c]);
    };
    function Eu(a, b) {
      var c = a.g;
      c ? c.U().pa(b) : (c = new H(new E(b)), a.g = c, a.G.la().zb(c));
    }
    function Fu(a, b) {
      return a.index - b.index;
    }
    function uu(a) {
      if (!this.mb(a))
        return !1;
      zu(this, a.pixel, a.map);
      this.j.length = 0;
      this.C = !1;
      var b = this.g;
      if (b) {
        var c = [],
            b = b.U().X(),
            d = Ha([b]),
            d = Hj(this.a, d),
            e = {};
        d.sort(Fu);
        for (var f = 0,
            g = d.length; f < g; ++f) {
          var h = d[f],
              l = h.na,
              m = w(h.feature),
              p = h.depth;
          p && (m += "-" + p.join("-"));
          e[m] || (e[m] = Array(2));
          if ("Circle" === h.geometry.T() && 1 === h.index)
            l = Gu(b, h), Ue(l, b) && !e[m][0] && (this.j.push([h, 0]), e[m][0] = h);
          else if (Ue(l[0], b) && !e[m][0])
            this.j.push([h, 0]), e[m][0] = h;
          else if (Ue(l[1], b) && !e[m][1]) {
            if ("LineString" !== h.geometry.T() && "MultiLineString" !== h.geometry.T() || !e[m][0] || 0 !== e[m][0].index)
              this.j.push([h, 1]), e[m][1] = h;
          } else
            w(l) in this.Ha && !e[m][0] && !e[m][1] && c.push([h, b]);
        }
        c.length && Au(this, a);
        for (a = c.length - 1; 0 <= a; --a)
          this.Il.apply(this, c[a]);
      }
      return !!this.g;
    }
    function vu(a) {
      this.R = !1;
      Au(this, a);
      a = a.coordinate;
      for (var b = 0,
          c = this.j.length; b < c; ++b) {
        for (var d = this.j[b],
            e = d[0],
            f = e.depth,
            g = e.geometry,
            h,
            l = e.na,
            d = d[1]; a.length < g.sa(); )
          a.push(l[d][a.length]);
        switch (g.T()) {
          case "Point":
            h = a;
            l[0] = l[1] = a;
            break;
          case "MultiPoint":
            h = g.X();
            h[e.index] = a;
            l[0] = l[1] = a;
            break;
          case "LineString":
            h = g.X();
            h[e.index + d] = a;
            l[d] = a;
            break;
          case "MultiLineString":
            h = g.X();
            h[f[0]][e.index + d] = a;
            l[d] = a;
            break;
          case "Polygon":
            h = g.X();
            h[f[0]][e.index + d] = a;
            l[d] = a;
            break;
          case "MultiPolygon":
            h = g.X();
            h[f[1]][f[0]][e.index + d] = a;
            l[d] = a;
            break;
          case "Circle":
            l[0] = l[1] = a, 0 === e.index ? (this.o = !0, g.wb(a)) : (this.o = !0, g.Wc(Ye(g.Ba(), a))), this.o = !1;
        }
        h && (e = g, f = h, this.o = !0, e.pa(f), this.o = !1);
      }
      Eu(this, a);
    }
    function xu(a) {
      for (var b,
          c,
          d = this.j.length - 1; 0 <= d; --d)
        if (b = this.j[d][0], c = b.geometry, "Circle" === c.T()) {
          var e = c.Ba(),
              f = b.Ef[0];
          b = b.Ef[1];
          f.na[0] = f.na[1] = e;
          b.na[0] = b.na[1] = e;
          Fj(this.a, Wa(e), f);
          Fj(this.a, c.D(), b);
        } else
          Fj(this.a, Ha(b.na), b);
      this.C && (this.b(new Bu("modifyend", this.u, a)), this.C = !1);
      return !1;
    }
    function wu(a) {
      if (!(a instanceof Bd))
        return !0;
      this.S = a;
      var b;
      ld(a.map.$())[1] || "pointermove" != a.type || this.A || (this.Ja = a.pixel, zu(this, a.pixel, a.map));
      this.g && this.lb(a) && (b = "singleclick" == a.type && this.R ? !0 : this.Ci());
      "singleclick" == a.type && (this.R = !1);
      return qg.call(this, a) && !b;
    }
    function zu(a, b, c) {
      function d(a, b) {
        return Hu(e, a) - Hu(e, b);
      }
      var e = c.Za(b),
          f = Ka(Wa(e), c.$().Ua() * a.ia),
          f = Hj(a.a, f);
      if (0 < f.length) {
        f.sort(d);
        var g = f[0],
            h = g.na,
            l = Gu(e, g),
            m = c.Ka(l),
            p = Ye(b, m);
        if (p <= a.ia) {
          b = {};
          if ("Circle" === g.geometry.T() && 1 === g.index)
            a.oa = !0, Eu(a, l);
          else
            for (p = c.Ka(h[0]), g = c.Ka(h[1]), c = Xe(m, p), m = Xe(m, g), p = Math.sqrt(Math.min(c, m)), a.oa = p <= a.ia, a.oa && (l = c > m ? h[1] : h[0]), Eu(a, l), m = 1, c = f.length; m < c; ++m)
              if (l = f[m].na, Ue(h[0], l[0]) && Ue(h[1], l[1]) || Ue(h[0], l[1]) && Ue(h[1], l[0]))
                b[w(l)] = !0;
              else
                break;
          b[w(h)] = !0;
          a.Ha = b;
          return;
        }
      }
      a.g && (a.G.la().Db(a.g), a.g = null);
    }
    function Hu(a, b) {
      var c = b.geometry;
      if ("Circle" === c.T() && 1 === b.index) {
        var d = Xe(c.Ba(), a),
            c = Math.sqrt(d) - c.Vd();
        return c * c;
      }
      return Ze(a, b.na);
    }
    function Gu(a, b) {
      var c = b.geometry;
      return "Circle" === c.T() && 1 === b.index ? c.Ab(a) : Re(a, b.na);
    }
    k.Il = function(a, b) {
      for (var c = a.na,
          d = a.feature,
          e = a.geometry,
          f = a.depth,
          g = a.index,
          h; b.length < e.sa(); )
        b.push(0);
      switch (e.T()) {
        case "MultiLineString":
          h = e.X();
          h[f[0]].splice(g + 1, 0, b);
          break;
        case "Polygon":
          h = e.X();
          h[f[0]].splice(g + 1, 0, b);
          break;
        case "MultiPolygon":
          h = e.X();
          h[f[1]][f[0]].splice(g + 1, 0, b);
          break;
        case "LineString":
          h = e.X();
          h.splice(g + 1, 0, b);
          break;
        default:
          return;
      }
      this.o = !0;
      e.pa(h);
      this.o = !1;
      h = this.a;
      h.remove(a);
      Iu(this, e, g, f, 1);
      var l = {
        na: [c[0], b],
        feature: d,
        geometry: e,
        depth: f,
        index: g
      };
      h.Ea(Ha(l.na), l);
      this.j.push([l, 1]);
      c = {
        na: [b, c[1]],
        feature: d,
        geometry: e,
        depth: f,
        index: g + 1
      };
      h.Ea(Ha(c.na), c);
      this.j.push([c, 0]);
      this.R = !0;
    };
    k.Ci = function() {
      if (this.S && "pointerdrag" != this.S.type) {
        var a = this.S;
        Au(this, a);
        var b = this.j,
            c = {},
            d,
            e,
            f,
            g,
            h,
            l,
            m,
            p,
            n;
        for (h = b.length - 1; 0 <= h; --h)
          g = b[h], p = g[0], n = w(p.feature), p.depth && (n += "-" + p.depth.join("-")), n in c || (c[n] = {}), 0 === g[1] ? (c[n].right = p, c[n].index = p.index) : 1 == g[1] && (c[n].left = p, c[n].index = p.index + 1);
        for (n in c) {
          m = c[n].right;
          h = c[n].left;
          g = c[n].index;
          l = g - 1;
          p = void 0 !== h ? h : m;
          0 > l && (l = 0);
          b = p.geometry;
          e = f = b.X();
          d = !1;
          switch (b.T()) {
            case "MultiLineString":
              2 < f[p.depth[0]].length && (f[p.depth[0]].splice(g, 1), d = !0);
              break;
            case "LineString":
              2 < f.length && (f.splice(g, 1), d = !0);
              break;
            case "MultiPolygon":
              e = e[p.depth[1]];
            case "Polygon":
              e = e[p.depth[0]], 4 < e.length && (g == e.length - 1 && (g = 0), e.splice(g, 1), d = !0, 0 === g && (e.pop(), e.push(e[0]), l = e.length - 1));
          }
          d && (d = b, this.o = !0, d.pa(f), this.o = !1, f = [], void 0 !== h && (this.a.remove(h), f.push(h.na[0])), void 0 !== m && (this.a.remove(m), f.push(m.na[1])), void 0 !== h && void 0 !== m && (h = {
            depth: p.depth,
            feature: p.feature,
            geometry: p.geometry,
            index: l,
            na: f
          }, this.a.Ea(Ha(h.na), h)), Iu(this, b, g, p.depth, -1), this.g && (this.G.la().Db(this.g), this.g = null));
        }
        this.b(new Bu("modifyend", this.u, a));
        this.C = !1;
        return !0;
      }
      return !1;
    };
    function Iu(a, b, c, d, e) {
      Jj(a.a, b.D(), function(a) {
        a.geometry === b && (void 0 === d || void 0 === a.depth || ia(a.depth, d)) && a.index > c && (a.index += e);
      });
    }
    function yu() {
      var a = el();
      return function() {
        return a.Point;
      };
    }
    function Bu(a, b, c) {
      Bc.call(this, a);
      this.features = b;
      this.mapBrowserEvent = c;
    }
    u(Bu, Bc);
    function Ju(a) {
      ag.call(this, {handleEvent: Ku});
      a = a ? a : {};
      this.C = a.condition ? a.condition : jg;
      this.A = a.addCondition ? a.addCondition : bf;
      this.G = a.removeCondition ? a.removeCondition : bf;
      this.R = a.toggleCondition ? a.toggleCondition : lg;
      this.o = a.multi ? a.multi : !1;
      this.j = a.filter ? a.filter : af;
      this.l = a.hitTolerance ? a.hitTolerance : 0;
      this.g = new R({
        source: new S({
          useSpatialIndex: !1,
          features: a.features,
          wrapX: a.wrapX
        }),
        style: a.style ? a.style : Lu(),
        updateWhileAnimating: !0,
        updateWhileInteracting: !0
      });
      if (a.layers)
        if ("function" === typeof a.layers)
          a = a.layers;
        else {
          var b = a.layers;
          a = function(a) {
            return ea(b, a);
          };
        }
      else
        a = af;
      this.u = a;
      this.a = {};
      a = this.g.la().i;
      B(a, "add", this.Xm, this);
      B(a, "remove", this.an, this);
    }
    u(Ju, ag);
    k = Ju.prototype;
    k.Ym = function() {
      return this.g.la().i;
    };
    k.Zm = function() {
      return this.l;
    };
    k.$m = function(a) {
      a = w(a);
      return this.a[a];
    };
    function Ku(a) {
      if (!this.C(a))
        return !0;
      var b = this.A(a),
          c = this.G(a),
          d = this.R(a),
          e = !b && !c && !d,
          f = a.map,
          g = this.g.la().i,
          h = [],
          l = [];
      if (e) {
        qb(this.a);
        f.re(a.pixel, function(a, b) {
          if (this.j(a, b)) {
            l.push(a);
            var c = w(a);
            this.a[c] = b;
            return !this.o;
          }
        }.bind(this), {
          layerFilter: this.u,
          hitTolerance: this.l
        });
        for (e = g.ec() - 1; 0 <= e; --e) {
          var f = g.item(e),
              m = l.indexOf(f);
          -1 < m ? l.splice(m, 1) : (g.remove(f), h.push(f));
        }
        l.length && g.Tf(l);
      } else {
        f.re(a.pixel, function(a, e) {
          if (this.j(a, e)) {
            if (!b && !d || ea(g.a, a))
              (c || d) && ea(g.a, a) && (h.push(a), f = w(a), delete this.a[f]);
            else {
              l.push(a);
              var f = w(a);
              this.a[f] = e;
            }
            return !this.o;
          }
        }.bind(this), {
          layerFilter: this.u,
          hitTolerance: this.l
        });
        for (e = h.length - 1; 0 <= e; --e)
          g.remove(h[e]);
        g.Tf(l);
      }
      (0 < l.length || 0 < h.length) && this.b(new Mu(Nu, l, h, a));
      return ig(a);
    }
    k.bn = function(a) {
      this.l = a;
    };
    k.setMap = function(a) {
      var b = this.v,
          c = this.g.la().i;
      b && c.forEach(b.Zi, b);
      ag.prototype.setMap.call(this, a);
      this.g.setMap(a);
      a && c.forEach(a.Ti, a);
    };
    function Lu() {
      var a = el();
      ga(a.Polygon, a.LineString);
      ga(a.GeometryCollection, a.LineString);
      return function(b) {
        return b.U() ? a[b.U().T()] : null;
      };
    }
    k.Xm = function(a) {
      var b = this.v;
      b && b.Ti(a.element);
    };
    k.an = function(a) {
      var b = this.v;
      b && b.Zi(a.element);
    };
    function Mu(a, b, c, d) {
      Bc.call(this, a);
      this.selected = b;
      this.deselected = c;
      this.mapBrowserEvent = d;
    }
    u(Mu, Bc);
    var Nu = "select";
    function Ou(a) {
      pg.call(this, {
        handleEvent: Pu,
        handleDownEvent: af,
        handleUpEvent: Qu
      });
      a = a ? a : {};
      this.o = a.source ? a.source : null;
      this.ia = void 0 !== a.vertex ? a.vertex : !0;
      this.R = void 0 !== a.edge ? a.edge : !0;
      this.j = a.features ? a.features : null;
      this.oa = [];
      this.C = {};
      this.S = {};
      this.u = {};
      this.G = null;
      this.g = void 0 !== a.pixelTolerance ? a.pixelTolerance : 10;
      this.Ja = Ru.bind(this);
      this.a = new Ej;
      this.ea = {
        Point: this.hn,
        LineString: this.Rh,
        LinearRing: this.Rh,
        Polygon: this.jn,
        MultiPoint: this.fn,
        MultiLineString: this.en,
        MultiPolygon: this.gn,
        GeometryCollection: this.dn
      };
    }
    u(Ou, pg);
    k = Ou.prototype;
    k.zb = function(a, b) {
      var c = void 0 !== b ? b : !0,
          d = w(a),
          e = a.U();
      if (e) {
        var f = this.ea[e.T()];
        f && (this.S[d] = e.D(Ia()), f.call(this, a, e));
      }
      c && (this.C[d] = B(a, "change", this.cn, this));
    };
    k.ek = function(a) {
      this.zb(a);
    };
    k.fk = function(a) {
      this.Db(a);
    };
    k.Ph = function(a) {
      var b;
      a instanceof Nt ? b = a.feature : a instanceof Nc && (b = a.element);
      this.zb(b);
    };
    k.Qh = function(a) {
      var b;
      a instanceof Nt ? b = a.feature : a instanceof Nc && (b = a.element);
      this.Db(b);
    };
    k.cn = function(a) {
      a = a.target;
      if (this.A) {
        var b = w(a);
        b in this.u || (this.u[b] = a);
      } else
        this.$i(a);
    };
    k.Db = function(a, b) {
      var c = void 0 !== b ? b : !0,
          d = w(a),
          e = this.S[d];
      if (e) {
        var f = this.a,
            g = [];
        Jj(f, e, function(b) {
          a === b.feature && g.push(b);
        });
        for (e = g.length - 1; 0 <= e; --e)
          f.remove(g[e]);
      }
      c && (rc(this.C[d]), delete this.C[d]);
    };
    k.setMap = function(a) {
      var b = this.v,
          c = this.oa,
          d;
      this.j ? d = this.j : this.o && (d = this.o.Ne());
      b && (c.forEach(rc), c.length = 0, d.forEach(this.fk, this));
      pg.prototype.setMap.call(this, a);
      a && (this.j ? c.push(B(this.j, "add", this.Ph, this), B(this.j, "remove", this.Qh, this)) : this.o && c.push(B(this.o, "addfeature", this.Ph, this), B(this.o, "removefeature", this.Qh, this)), d.forEach(this.ek, this));
    };
    k.Zc = bf;
    k.$i = function(a) {
      this.Db(a, !1);
      this.zb(a, !1);
    };
    k.dn = function(a, b) {
      var c,
          d = b.a;
      for (c = 0; c < d.length; ++c)
        this.ea[d[c].T()].call(this, a, d[c]);
    };
    k.Rh = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g;
      d = 0;
      for (e = c.length - 1; d < e; ++d)
        f = c.slice(d, d + 2), g = {
          feature: a,
          na: f
        }, this.a.Ea(Ha(f), g);
    };
    k.en = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = c.length; g < h; ++g)
        for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
          l = d.slice(e, e + 2), m = {
            feature: a,
            na: l
          }, this.a.Ea(Ha(l), m);
    };
    k.fn = function(a, b) {
      var c = b.X(),
          d,
          e,
          f;
      e = 0;
      for (f = c.length; e < f; ++e)
        d = c[e], d = {
          feature: a,
          na: [d, d]
        }, this.a.Ea(b.D(), d);
    };
    k.gn = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m,
          p,
          n,
          q;
      l = 0;
      for (m = c.length; l < m; ++l)
        for (p = c[l], g = 0, h = p.length; g < h; ++g)
          for (d = p[g], e = 0, f = d.length - 1; e < f; ++e)
            n = d.slice(e, e + 2), q = {
              feature: a,
              na: n
            }, this.a.Ea(Ha(n), q);
    };
    k.hn = function(a, b) {
      var c = b.X(),
          c = {
            feature: a,
            na: [c, c]
          };
      this.a.Ea(b.D(), c);
    };
    k.jn = function(a, b) {
      var c = b.X(),
          d,
          e,
          f,
          g,
          h,
          l,
          m;
      g = 0;
      for (h = c.length; g < h; ++g)
        for (d = c[g], e = 0, f = d.length - 1; e < f; ++e)
          l = d.slice(e, e + 2), m = {
            feature: a,
            na: l
          }, this.a.Ea(Ha(l), m);
    };
    function Pu(a) {
      var b,
          c,
          d = a.pixel,
          e = a.coordinate;
      b = a.map;
      var f = b.Za([d[0] - this.g, d[1] + this.g]);
      c = b.Za([d[0] + this.g, d[1] - this.g]);
      var f = Ha([f, c]),
          g = Hj(this.a, f),
          h,
          f = !1,
          l = null;
      c = null;
      if (0 < g.length) {
        this.G = e;
        g.sort(this.Ja);
        g = g[0].na;
        if (this.ia && !this.R) {
          if (e = b.Ka(g[0]), h = b.Ka(g[1]), e = Xe(d, e), d = Xe(d, h), h = Math.sqrt(Math.min(e, d)), h = h <= this.g)
            f = !0, l = e > d ? g[1] : g[0], c = b.Ka(l);
        } else
          this.R && (l = Re(e, g), c = b.Ka(l), Ye(d, c) <= this.g && (f = !0, this.ia && (e = b.Ka(g[0]), h = b.Ka(g[1]), e = Xe(c, e), d = Xe(c, h), h = Math.sqrt(Math.min(e, d)), h = h <= this.g))) && (l = e > d ? g[1] : g[0], c = b.Ka(l));
        f && (c = [Math.round(c[0]), Math.round(c[1])]);
      }
      b = l;
      f && (a.coordinate = b.slice(0, 2), a.pixel = c);
      return qg.call(this, a);
    }
    function Qu() {
      var a = rb(this.u);
      a.length && (a.forEach(this.$i, this), this.u = {});
      return !1;
    }
    function Ru(a, b) {
      return Ze(this.G, a.na) - Ze(this.G, b.na);
    }
    ;
    function Su(a) {
      pg.call(this, {
        handleDownEvent: Tu,
        handleDragEvent: Uu,
        handleMoveEvent: Vu,
        handleUpEvent: Wu
      });
      a = a ? a : {};
      this.g = void 0;
      this.a = null;
      this.o = void 0 !== a.features ? a.features : null;
      var b;
      if (a.layers)
        if ("function" === typeof a.layers)
          b = a.layers;
        else {
          var c = a.layers;
          b = function(a) {
            return ea(c, a);
          };
        }
      else
        b = af;
      this.C = b;
      this.u = a.hitTolerance ? a.hitTolerance : 0;
      this.j = null;
    }
    u(Su, pg);
    function Tu(a) {
      this.j = Xu(this, a.pixel, a.map);
      if (!this.a && this.j) {
        this.a = a.coordinate;
        Vu.call(this, a);
        var b = this.o || new D([this.j]);
        this.b(new Yu("translatestart", b, a.coordinate));
        return !0;
      }
      return !1;
    }
    function Wu(a) {
      if (this.a) {
        this.a = null;
        Vu.call(this, a);
        var b = this.o || new D([this.j]);
        this.b(new Yu("translateend", b, a.coordinate));
        return !0;
      }
      return !1;
    }
    function Uu(a) {
      if (this.a) {
        a = a.coordinate;
        var b = a[0] - this.a[0],
            c = a[1] - this.a[1],
            d = this.o || new D([this.j]);
        d.forEach(function(a) {
          var d = a.U();
          d.translate(b, c);
          a.Sa(d);
        });
        this.a = a;
        this.b(new Yu("translating", d, a));
      }
    }
    function Vu(a) {
      var b = a.map.Kc();
      Xu(this, a.pixel, a.map) ? (this.g = void 0 !== this.g ? this.g : b.style.cursor, b.style.cursor = this.a ? "-webkit-grabbing" : "-webkit-grab", b.style.cursor = this.a ? "grabbing" : "grab") : void 0 !== this.g && (b.style.cursor = this.g, this.g = void 0);
    }
    function Xu(a, b, c) {
      return c.re(b, function(a) {
        if (!this.o || ea(this.o.a, a))
          return a;
      }.bind(a), {
        layerFilter: a.C,
        hitTolerance: a.u
      });
    }
    Su.prototype.G = function() {
      return this.u;
    };
    Su.prototype.R = function(a) {
      this.u = a;
    };
    function Yu(a, b, c) {
      Bc.call(this, a);
      this.features = b;
      this.coordinate = c;
    }
    u(Yu, Bc);
    function T(a) {
      a = a ? a : {};
      var b = pb({}, a);
      delete b.gradient;
      delete b.radius;
      delete b.blur;
      delete b.shadow;
      delete b.weight;
      R.call(this, b);
      this.l = null;
      this.Y = void 0 !== a.shadow ? a.shadow : 250;
      this.S = void 0;
      this.R = null;
      B(this, Ic(Zu), this.hl, this);
      this.Ki(a.gradient ? a.gradient : $u);
      this.Ei(void 0 !== a.blur ? a.blur : 15);
      this.Wc(void 0 !== a.radius ? a.radius : 8);
      B(this, Ic(av), this.Qf, this);
      B(this, Ic(bv), this.Qf, this);
      this.Qf();
      var c = a.weight ? a.weight : "weight",
          d;
      "string" === typeof c ? d = function(a) {
        return a.get(c);
      } : d = c;
      this.g(function(a) {
        a = d(a);
        a = void 0 !== a ? wa(a, 0, 1) : 1;
        var b = 255 * a | 0,
            c = this.R[b];
        c || (c = [new $k({image: new Rn({
            opacity: a,
            src: this.S
          })})], this.R[b] = c);
        return c;
      }.bind(this));
      this.set(vt, null);
      B(this, "render", this.yl, this);
    }
    u(T, R);
    var $u = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
    k = T.prototype;
    k.fh = function() {
      return this.get(av);
    };
    k.mh = function() {
      return this.get(Zu);
    };
    k.Th = function() {
      return this.get(bv);
    };
    k.hl = function() {
      for (var a = this.mh(),
          b = Xc(1, 256),
          c = b.createLinearGradient(0, 0, 1, 256),
          d = 1 / (a.length - 1),
          e = 0,
          f = a.length; e < f; ++e)
        c.addColorStop(e * d, a[e]);
      b.fillStyle = c;
      b.fillRect(0, 0, 1, 256);
      this.l = b.getImageData(0, 0, 1, 256).data;
    };
    k.Qf = function() {
      var a = this.Th(),
          b = this.fh(),
          c = a + b + 1,
          d = 2 * c,
          d = Xc(d, d);
      d.shadowOffsetX = d.shadowOffsetY = this.Y;
      d.shadowBlur = b;
      d.shadowColor = "#000";
      d.beginPath();
      b = c - this.Y;
      d.arc(b, b, a, 0, 2 * Math.PI, !0);
      d.fill();
      this.S = d.canvas.toDataURL();
      this.R = Array(256);
      this.s();
    };
    k.yl = function(a) {
      a = a.context;
      var b = a.canvas,
          b = a.getImageData(0, 0, b.width, b.height),
          c = b.data,
          d,
          e,
          f;
      d = 0;
      for (e = c.length; d < e; d += 4)
        if (f = 4 * c[d + 3])
          c[d] = this.l[f], c[d + 1] = this.l[f + 1], c[d + 2] = this.l[f + 2];
      a.putImageData(b, 0, 0);
    };
    k.Ei = function(a) {
      this.set(av, a);
    };
    k.Ki = function(a) {
      this.set(Zu, a);
    };
    k.Wc = function(a) {
      this.set(bv, a);
    };
    var av = "blur",
        Zu = "gradient",
        bv = "radius";
    function cv(a) {
      mt.call(this, a);
      this.o = wh();
      this.g = null;
    }
    u(cv, mt);
    cv.prototype.I = function(a, b, c) {
      ot(this, "precompose", c, a, void 0);
      var d = this.Z();
      if (d) {
        var e = b.extent,
            f = void 0 !== e;
        f && nt(c, a, e);
        var e = this.A(),
            g = c.globalAlpha;
        c.globalAlpha = b.opacity;
        c.drawImage(d, 0, 0, +d.width, +d.height, Math.round(e[4]), Math.round(e[5]), Math.round(d.width * e[0]), Math.round(d.height * e[3]));
        c.globalAlpha = g;
        f && c.restore();
      }
      this.Ue(c, a, b);
    };
    cv.prototype.Aa = function(a, b, c, d, e) {
      var f = this.a;
      return f.la().Aa(a, b.viewState.resolution, b.viewState.rotation, c, b.skippedFeatureUids, function(a) {
        return d.call(e, a, f);
      });
    };
    cv.prototype.v = function(a, b, c, d) {
      if (this.Z()) {
        if (this.a.la().Aa !== na)
          return mt.prototype.v.apply(this, arguments);
        var e = Bh(this.o, a.slice());
        We(e, b.viewState.resolution / this.i);
        this.g || (this.g = Xc(1, 1));
        this.g.clearRect(0, 0, 1, 1);
        this.g.drawImage(this.Z(), e[0], e[1], 1, 1, 0, 0, 1, 1);
        e = this.g.getImageData(0, 0, 1, 1).data;
        if (0 < e[3])
          return c.call(d, this.a, e);
      }
    };
    function dv(a) {
      cv.call(this, a);
      this.M = null;
      this.c = wh();
    }
    u(dv, cv);
    dv.prototype.Z = function() {
      return this.M ? this.M.Z() : null;
    };
    dv.prototype.A = function() {
      return this.c;
    };
    dv.prototype.qd = function(a, b) {
      var c = a.pixelRatio,
          d = a.size,
          e = a.viewState,
          f = e.center,
          g = e.resolution,
          h = this.a.la(),
          l = a.viewHints,
          m = a.extent;
      void 0 !== b.extent && (m = lb(m, b.extent));
      l[0] || l[1] || gb(m) || (e = h.Z(m, g, c, e.projection)) && gt(this, e) && (this.M = e);
      if (this.M) {
        var e = this.M,
            m = e.D(),
            p = e.resolution,
            l = e.a,
            n = c * p / (g * l),
            m = Fh(this.c, c * d[0] / 2, c * d[1] / 2, n, n, 0, l * (m[0] - f[0]) / p, l * (f[1] - m[3]) / p);
        Fh(this.o, c * d[0] / 2 - m[4], c * d[1] / 2 - m[5], c / g, -c / g, 0, -f[0], -f[1]);
        it(a.attributions, e.i);
        jt(a, h);
        this.i = g * c / l;
      }
      return !!this.M;
    };
    function ev(a, b, c, d) {
      var e = Wb(c, b, a);
      c = Eb(b, d, c);
      b = b.sc();
      void 0 !== b && (c *= b);
      b = a.sc();
      void 0 !== b && (c /= b);
      a = Eb(a, c, e) / c;
      isFinite(a) && 0 < a && (c /= a);
      return c;
    }
    function fv(a, b, c, d) {
      a = c - a;
      b = d - b;
      var e = Math.sqrt(a * a + b * b);
      return [Math.round(c + a / e), Math.round(d + b / e)];
    }
    function gv(a, b, c, d, e, f, g, h, l, m, p) {
      var n = Xc(Math.round(c * a), Math.round(c * b));
      if (!l.length)
        return n.canvas;
      n.scale(c, c);
      var q = Ia();
      l.forEach(function(a) {
        $a(q, a.extent);
      });
      var r = Xc(Math.round(c * hb(q) / d), Math.round(c * ib(q) / d)),
          v = c / d;
      l.forEach(function(a) {
        r.drawImage(a.image, m, m, a.image.width - 2 * m, a.image.height - 2 * m, (a.extent[0] - q[0]) * v, -(a.extent[3] - q[3]) * v, hb(a.extent) * v, ib(a.extent) * v);
      });
      var x = eb(g);
      h.c.forEach(function(a) {
        var b = a.source,
            e = a.target,
            g = b[1][0],
            h = b[1][1],
            l = b[2][0],
            m = b[2][1];
        a = (e[0][0] - x[0]) / f;
        var p = -(e[0][1] - x[1]) / f,
            v = (e[1][0] - x[0]) / f,
            y = -(e[1][1] - x[1]) / f,
            Z = (e[2][0] - x[0]) / f,
            Ra = -(e[2][1] - x[1]) / f,
            e = b[0][0],
            b = b[0][1],
            g = g - e,
            h = h - b,
            l = l - e,
            m = m - b;
        a: {
          g = [[g, h, 0, 0, v - a], [l, m, 0, 0, Z - a], [0, 0, g, h, y - p], [0, 0, l, m, Ra - p]];
          h = g.length;
          for (l = 0; l < h; l++) {
            for (var m = l,
                Cb = Math.abs(g[l][l]),
                dc = l + 1; dc < h; dc++) {
              var $c = Math.abs(g[dc][l]);
              $c > Cb && (Cb = $c, m = dc);
            }
            if (!Cb) {
              g = null;
              break a;
            }
            Cb = g[m];
            g[m] = g[l];
            g[l] = Cb;
            for (m = l + 1; m < h; m++)
              for (Cb = -g[m][l] / g[l][l], dc = l; dc < h + 1; dc++)
                g[m][dc] = l == dc ? 0 : g[m][dc] + Cb * g[l][dc];
          }
          l = Array(h);
          for (m = h - 1; 0 <= m; m--)
            for (l[m] = g[m][h] / g[m][m], Cb = m - 1; 0 <= Cb; Cb--)
              g[Cb][h] -= g[Cb][m] * l[m];
          g = l;
        }
        g && (n.save(), n.beginPath(), l = (a + v + Z) / 3, m = (p + y + Ra) / 3, h = fv(l, m, a, p), v = fv(l, m, v, y), Z = fv(l, m, Z, Ra), n.moveTo(v[0], v[1]), n.lineTo(h[0], h[1]), n.lineTo(Z[0], Z[1]), n.clip(), n.transform(g[0], g[2], g[1], g[3], a, p), n.translate(q[0] - e, q[3] - b), n.scale(d / c, -d / c), n.drawImage(r.canvas, 0, 0), n.restore());
      });
      p && (n.save(), n.strokeStyle = "black", n.lineWidth = 1, h.c.forEach(function(a) {
        var b = a.target;
        a = (b[0][0] - x[0]) / f;
        var c = -(b[0][1] - x[1]) / f,
            d = (b[1][0] - x[0]) / f,
            e = -(b[1][1] - x[1]) / f,
            g = (b[2][0] - x[0]) / f,
            b = -(b[2][1] - x[1]) / f;
        n.beginPath();
        n.moveTo(d, e);
        n.lineTo(a, c);
        n.lineTo(g, b);
        n.closePath();
        n.stroke();
      }), n.restore());
      return n.canvas;
    }
    ;
    function hv(a, b, c, d, e) {
      this.f = a;
      this.i = b;
      var f = {},
          g = Ub(this.i, this.f);
      this.a = function(a) {
        var b = a[0] + "/" + a[1];
        f[b] || (f[b] = g(a));
        return f[b];
      };
      this.g = d;
      this.v = e * e;
      this.c = [];
      this.j = !1;
      this.o = this.f.a && !!d && !!this.f.D() && hb(d) == hb(this.f.D());
      this.b = this.f.D() ? hb(this.f.D()) : null;
      this.l = this.i.D() ? hb(this.i.D()) : null;
      a = eb(c);
      b = db(c);
      d = cb(c);
      c = bb(c);
      e = this.a(a);
      var h = this.a(b),
          l = this.a(d),
          m = this.a(c);
      iv(this, a, b, d, c, e, h, l, m, 10);
      if (this.j) {
        var p = Infinity;
        this.c.forEach(function(a) {
          p = Math.min(p, a.source[0][0], a.source[1][0], a.source[2][0]);
        });
        this.c.forEach(function(a) {
          if (Math.max(a.source[0][0], a.source[1][0], a.source[2][0]) - p > this.b / 2) {
            var b = [[a.source[0][0], a.source[0][1]], [a.source[1][0], a.source[1][1]], [a.source[2][0], a.source[2][1]]];
            b[0][0] - p > this.b / 2 && (b[0][0] -= this.b);
            b[1][0] - p > this.b / 2 && (b[1][0] -= this.b);
            b[2][0] - p > this.b / 2 && (b[2][0] -= this.b);
            Math.max(b[0][0], b[1][0], b[2][0]) - Math.min(b[0][0], b[1][0], b[2][0]) < this.b / 2 && (a.source = b);
          }
        }, this);
      }
      f = {};
    }
    function iv(a, b, c, d, e, f, g, h, l, m) {
      var p = Ha([f, g, h, l]),
          n = a.b ? hb(p) / a.b : null,
          q = a.b,
          r = a.f.a && .5 < n && 1 > n,
          v = !1;
      if (0 < m) {
        if (a.i.f && a.l)
          var x = Ha([b, c, d, e]),
              v = v | .25 < hb(x) / a.l;
        !r && a.f.f && n && (v |= .25 < n);
      }
      if (v || !a.g || mb(p, a.g)) {
        if (!(v || isFinite(f[0]) && isFinite(f[1]) && isFinite(g[0]) && isFinite(g[1]) && isFinite(h[0]) && isFinite(h[1]) && isFinite(l[0]) && isFinite(l[1])))
          if (0 < m)
            v = !0;
          else
            return;
        if (0 < m && (v || (p = a.a([(b[0] + d[0]) / 2, (b[1] + d[1]) / 2]), q = r ? (Ca(f[0], q) + Ca(h[0], q)) / 2 - Ca(p[0], q) : (f[0] + h[0]) / 2 - p[0], p = (f[1] + h[1]) / 2 - p[1], v = q * q + p * p > a.v), v)) {
          Math.abs(b[0] - d[0]) <= Math.abs(b[1] - d[1]) ? (r = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2], q = a.a(r), p = [(e[0] + b[0]) / 2, (e[1] + b[1]) / 2], n = a.a(p), iv(a, b, c, r, p, f, g, q, n, m - 1), iv(a, p, r, d, e, n, q, h, l, m - 1)) : (r = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2], q = a.a(r), p = [(d[0] + e[0]) / 2, (d[1] + e[1]) / 2], n = a.a(p), iv(a, b, r, p, e, f, q, n, l, m - 1), iv(a, r, c, d, p, q, g, h, n, m - 1));
          return;
        }
        if (r) {
          if (!a.o)
            return;
          a.j = !0;
        }
        a.c.push({
          source: [f, h, l],
          target: [b, d, e]
        });
        a.c.push({
          source: [f, g, h],
          target: [b, c, d]
        });
      }
    }
    function jv(a) {
      var b = Ia();
      a.c.forEach(function(a) {
        a = a.source;
        Ja(b, a[0]);
        Ja(b, a[1]);
        Ja(b, a[2]);
      });
      return b;
    }
    ;
    function kv(a, b, c, d, e, f) {
      this.v = b;
      this.o = a.D();
      var g = b.D(),
          h = g ? lb(c, g) : c,
          g = ev(a, b, jb(h), d);
      this.l = new hv(a, b, h, this.o, .5 * g);
      this.c = d;
      this.f = c;
      a = jv(this.l);
      this.j = (this.Eb = f(a, g, e)) ? this.Eb.a : 1;
      this.$d = this.g = null;
      e = 2;
      f = [];
      this.Eb && (e = 0, f = this.Eb.i);
      ss.call(this, c, d, this.j, e, f);
    }
    u(kv, ss);
    kv.prototype.ra = function() {
      1 == this.state && (rc(this.$d), this.$d = null);
      ss.prototype.ra.call(this);
    };
    kv.prototype.Z = function() {
      return this.g;
    };
    kv.prototype.Zd = function() {
      var a = this.Eb.V();
      2 == a && (this.g = gv(hb(this.f) / this.c, ib(this.f) / this.c, this.j, this.Eb.resolution, 0, this.c, this.f, this.l, [{
        extent: this.Eb.D(),
        image: this.Eb.Z()
      }], 0));
      this.state = a;
      this.s();
    };
    kv.prototype.load = function() {
      if (0 == this.state) {
        this.state = 1;
        this.s();
        var a = this.Eb.V();
        2 == a || 3 == a ? this.Zd() : (this.$d = B(this.Eb, "change", function() {
          var a = this.Eb.V();
          if (2 == a || 3 == a)
            rc(this.$d), this.$d = null, this.Zd();
        }, this), this.Eb.load());
      }
    };
    function lv(a) {
      Gt.call(this, {
        attributions: a.attributions,
        extent: a.extent,
        logo: a.logo,
        projection: a.projection,
        state: a.state
      });
      this.u = void 0 !== a.resolutions ? a.resolutions : null;
      this.a = null;
      this.ea = 0;
    }
    u(lv, Gt);
    function mv(a, b) {
      a.u && (b = a.u[fa(a.u, b, 0)]);
      return b;
    }
    lv.prototype.Z = function(a, b, c, d) {
      var e = this.c;
      if (e && d && !Tb(e, d)) {
        if (this.a) {
          if (this.ea == this.f && Tb(this.a.v, d) && this.a.resolution == b && this.a.a == c && Za(this.a.D(), a))
            return this.a;
          Ac(this.a);
          this.a = null;
        }
        this.a = new kv(e, d, a, b, c, function(a, b, c) {
          return this.Ic(a, b, c, e);
        }.bind(this));
        this.ea = this.f;
        return this.a;
      }
      e && (d = e);
      return this.Ic(a, b, c, d);
    };
    lv.prototype.j = function(a) {
      a = a.target;
      switch (a.V()) {
        case 1:
          this.b(new nv(ov, a));
          break;
        case 2:
          this.b(new nv(pv, a));
          break;
        case 3:
          this.b(new nv(qv, a));
      }
    };
    function rv(a, b) {
      a.Z().src = b;
    }
    function nv(a, b) {
      Bc.call(this, a);
      this.image = b;
    }
    u(nv, Bc);
    var ov = "imageloadstart",
        pv = "imageloadend",
        qv = "imageloaderror";
    function sv(a) {
      lv.call(this, {
        attributions: a.attributions,
        logo: a.logo,
        projection: a.projection,
        resolutions: a.resolutions,
        state: a.state
      });
      this.ia = a.canvasFunction;
      this.S = null;
      this.Y = 0;
      this.oa = void 0 !== a.ratio ? a.ratio : 1.5;
    }
    u(sv, lv);
    sv.prototype.Ic = function(a, b, c, d) {
      b = mv(this, b);
      var e = this.S;
      if (e && this.Y == this.f && e.resolution == b && e.a == c && Ta(e.D(), a))
        return e;
      a = a.slice();
      nb(a, this.oa);
      (d = this.ia(a, b, c, [hb(a) / b * c, ib(a) / b * c], d)) && (e = new us(a, b, c, this.l, d));
      this.S = e;
      this.Y = this.f;
      return e;
    };
    function tv(a) {
      this.i = a.source;
      this.Oa = wh();
      this.g = Xc();
      this.o = [0, 0];
      this.Ha = void 0 == a.renderBuffer ? 100 : a.renderBuffer;
      this.A = null;
      sv.call(this, {
        attributions: a.attributions,
        canvasFunction: this.Zj.bind(this),
        logo: a.logo,
        projection: a.projection,
        ratio: a.ratio,
        resolutions: a.resolutions,
        state: this.i.V()
      });
      this.C = null;
      this.v = void 0;
      this.ci(a.style);
      B(this.i, "change", this.Fn, this);
    }
    u(tv, sv);
    k = tv.prototype;
    k.Zj = function(a, b, c, d, e) {
      var f = new Ws(.5 * b / c, a, b, this.i.Ha, this.Ha);
      this.i.Ud(a, b, e);
      var g = !1;
      this.i.ac(a, function(a) {
        var d;
        if (!(d = g)) {
          var e;
          (d = a.Nc()) ? e = d.call(a, b) : this.v && (e = this.v(a, b));
          if (e) {
            var h,
                n = !1;
            Array.isArray(e) || (e = [e]);
            d = 0;
            for (h = e.length; d < h; ++d)
              n = st(f, a, e[d], rt(b, c), this.En, this) || n;
            d = n;
          } else
            d = !1;
        }
        g = d;
      }, this);
      $s(f);
      if (g)
        return null;
      this.o[0] != d[0] || this.o[1] != d[1] ? (this.g.canvas.width = d[0], this.g.canvas.height = d[1], this.o[0] = d[0], this.o[1] = d[1]) : this.g.clearRect(0, 0, d[0], d[1]);
      a = uv(this, jb(a), b, c, d);
      f.i(this.g, c, a, 0, {});
      this.A = f;
      return this.g.canvas;
    };
    k.Aa = function(a, b, c, d, e, f) {
      if (this.A) {
        var g = {};
        return this.A.Aa(a, b, 0, d, e, function(a) {
          var b = w(a).toString();
          if (!(b in g))
            return g[b] = !0, f(a);
        });
      }
    };
    k.Bn = function() {
      return this.i;
    };
    k.Cn = function() {
      return this.C;
    };
    k.Dn = function() {
      return this.v;
    };
    function uv(a, b, c, d, e) {
      c = d / c;
      return Fh(a.Oa, e[0] / 2, e[1] / 2, c, -c, 0, -b[0], -b[1]);
    }
    k.En = function() {
      this.s();
    };
    k.Fn = function() {
      It(this, this.i.V());
    };
    k.ci = function(a) {
      this.C = void 0 !== a ? a : dl;
      this.v = a ? bl(this.C) : void 0;
      this.s();
    };
    function vv(a, b) {
      Bt.call(this, a, b);
      this.j = this.i = this.M = null;
    }
    u(vv, Bt);
    function wv(a, b) {
      var c = b.Z();
      return Oi(a.c.f, c);
    }
    vv.prototype.Aa = function(a, b, c, d, e) {
      var f = this.a;
      return f.la().Aa(a, b.viewState.resolution, b.viewState.rotation, c, b.skippedFeatureUids, function(a) {
        return d.call(e, a, f);
      });
    };
    vv.prototype.ag = function(a, b) {
      var c = this.c.f,
          d = a.pixelRatio,
          e = a.viewState,
          f = e.center,
          g = e.resolution,
          h = e.rotation,
          l = this.M,
          m = this.Fb,
          p = this.a.la(),
          n = a.viewHints,
          q = a.extent;
      void 0 !== b.extent && (q = lb(q, b.extent));
      n[0] || n[1] || gb(q) || (e = p.Z(q, g, d, e.projection)) && gt(this, e) && (l = e, m = wv(this, e), this.Fb && a.postRenderFunctions.push(function(a, b) {
        a.isContextLost() || a.deleteTexture(b);
      }.bind(null, c, this.Fb)));
      l && (c = this.c.i.l, xv(this, c.width, c.height, d, f, g, h, l.D()), this.j = null, d = this.v, xh(d), Dh(d, 1, -1), Eh(d, 0, -1), this.M = l, this.Fb = m, it(a.attributions, l.i), jt(a, p));
      return !!l;
    };
    function xv(a, b, c, d, e, f, g, h) {
      b *= f;
      c *= f;
      a = a.u;
      xh(a);
      Dh(a, 2 * d / b, 2 * d / c);
      Ch(a, -g);
      Eh(a, h[0] - e[0], h[1] - e[1]);
      Dh(a, (h[2] - h[0]) / 2, (h[3] - h[1]) / 2);
      Eh(a, 1, 1);
    }
    vv.prototype.Ke = function(a, b) {
      return void 0 !== this.Aa(a, b, 0, af, this);
    };
    vv.prototype.Zf = function(a, b, c, d) {
      if (this.M && this.M.Z())
        if (this.a.la() instanceof tv) {
          var e = Bh(b.pixelToCoordinateTransform, a.slice());
          if (this.Aa(e, b, 0, af, this))
            return c.call(d, this.a, null);
        } else {
          e = [this.M.Z().width, this.M.Z().height];
          if (!this.j) {
            var f = b.size;
            b = wh();
            Eh(b, -1, -1);
            Dh(b, 2 / f[0], 2 / f[1]);
            Eh(b, 0, f[1]);
            Dh(b, 1, -1);
            var f = Gh(this.u.slice()),
                g = wh();
            Eh(g, 0, e[1]);
            Dh(g, 1, -1);
            Dh(g, e[0] / 2, e[1] / 2);
            Eh(g, 1, 1);
            zh(g, f);
            zh(g, b);
            this.j = g;
          }
          a = Bh(this.j, a.slice());
          if (!(0 > a[0] || a[0] > e[0] || 0 > a[1] || a[1] > e[1]) && (this.i || (this.i = Xc(1, 1)), this.i.clearRect(0, 0, 1, 1), this.i.drawImage(this.M.Z(), a[0], a[1], 1, 1, 0, 0, 1, 1), e = this.i.getImageData(0, 0, 1, 1).data, 0 < e[3]))
            return c.call(d, this.a, e);
        }
    };
    function yv(a) {
      rh.call(this, a ? a : {});
    }
    u(yv, rh);
    yv.prototype.Dd = function(a) {
      var b = null,
          c = a.T();
      "canvas" === c ? b = new dv(this) : "webgl" === c && (b = new vv(a, this));
      return b;
    };
    function zv(a) {
      cv.call(this, a);
      this.u = Xc();
      this.l = null;
      this.c = [];
      this.j = Ia();
      this.Ja = new sa(0, 0, 0, 0);
      this.C = wh();
      this.Y = 0;
    }
    u(zv, cv);
    function Av(a, b) {
      var c = b.V(),
          d = a.a.Td();
      return 2 == c || 4 == c || 3 == c && !d;
    }
    zv.prototype.qd = function(a, b) {
      var c = a.pixelRatio,
          d = a.size,
          e = a.viewState,
          f = e.projection,
          g = e.resolution,
          e = e.center,
          h = this.a,
          l = h.la(),
          m = l.f,
          p = l.Ib(f),
          n = p.Mc(g, this.Y),
          q = p.La(n),
          r = Math.round(g / q) || 1,
          v = a.extent;
      void 0 !== b.extent && (v = lb(v, b.extent));
      if (gb(v))
        return !1;
      var x = gc(p, v, q),
          y;
      y = p.Qc(n);
      var z = p.La(n),
          A = Ga(p.fb(n), p.l);
      y = Va(y[0] + x.da * A[0] * z, y[1] + x.fa * A[1] * z, y[0] + (x.ba + 1) * A[0] * z, y[1] + (x.ja + 1) * A[1] * z, void 0);
      z = l.pb(c);
      A = {};
      A[n] = {};
      var V = this.Cf(l, f, A),
          Pa = this.j,
          ra = this.Ja,
          La = !1,
          C,
          Ma,
          xb;
      for (Ma = x.da; Ma <= x.ba; ++Ma)
        for (xb = x.fa; xb <= x.ja; ++xb)
          C = l.Lc(n, Ma, xb, c, f), Av(this, C) || (C = ws(C)), Av(this, C) ? 2 == C.V() && (A[n][C.Ga.toString()] = C, La || -1 != this.c.indexOf(C) || (La = !0)) : ec(p, C.Ga, V, ra, Pa) || (C = fc(p, C.Ga, ra, Pa)) && V(n + 1, C);
      V = a.viewHints;
      if (!(this.i && 16 < Date.now() - a.time && (V[0] || V[1]) || !La && this.l && Ta(this.l, v) && this.af == m) || r != this.R) {
        La = l.Sd(n, c, f);
        Ma = Math.round((x.ba - x.da + 1) * La[0] / r);
        C = Math.round((x.ja - x.fa + 1) * La[0] / r);
        La = this.u;
        xb = La.canvas;
        V = l.Mf(f);
        xb.width != Ma || xb.height != C ? (this.R = r, xb.width = Ma, xb.height = C) : (La.clearRect(0, 0, Ma, C), r = this.R);
        this.c.length = 0;
        ra = Object.keys(A).map(Number);
        ra.sort(da);
        var Z,
            Ra,
            Cb,
            dc,
            $c,
            $d,
            Je,
            ue;
        Cb = 0;
        for (dc = ra.length; Cb < dc; ++Cb) {
          Ma = ra[Cb];
          Ra = l.Sd(Ma, c, f);
          C = p.La(Ma);
          Z = C / q;
          $c = z * l.Jf(f);
          $d = A[Ma];
          for (var Tc in $d)
            C = $d[Tc], xb = p.Ta(C.Ga, Pa), Ma = (xb[0] - y[0]) / q * z / r, xb = (y[3] - xb[3]) / q * z / r, Je = Ra[0] * Z / r, ue = Ra[1] * Z / r, V || La.clearRect(Ma, xb, Je, ue), this.Df(C, a, b, Ma, xb, Je, ue, $c), this.c.push(C);
        }
        this.af = m;
        this.i = q * c / z * r;
        this.l = y;
      }
      Tc = this.i / g;
      Tc = Fh(this.C, c * d[0] / 2, c * d[1] / 2, Tc, Tc, 0, (this.l[0] - e[0]) / this.i * c, (e[1] - this.l[3]) / this.i * c);
      Fh(this.o, c * d[0] / 2 - Tc[4], c * d[1] / 2 - Tc[5], c / g, -c / g, 0, -e[0], -e[1]);
      kt(a.usedTiles, l, n, x);
      lt(a, l, p, c, f, v, n, h.Pd());
      ht(a, l);
      jt(a, l);
      return 0 < this.c.length;
    };
    zv.prototype.Df = function(a, b, c, d, e, f, g, h) {
      (a = a.Z()) && this.u.drawImage(a, h, h, a.width - 2 * h, a.height - 2 * h, d, e, f, g);
    };
    zv.prototype.Z = function() {
      return this.u.canvas;
    };
    zv.prototype.A = function() {
      return this.C;
    };
    function Bv() {
      this.b = "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}";
    }
    u(Bv, hi);
    var Cv = new Bv;
    function Dv() {
      this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}";
    }
    u(Dv, ii);
    var Ev = new Dv;
    function Fv(a, b) {
      this.f = a.getUniformLocation(b, "e");
      this.c = a.getUniformLocation(b, "d");
      this.b = a.getAttribLocation(b, "b");
      this.a = a.getAttribLocation(b, "c");
    }
    ;
    function Gv(a, b) {
      Bt.call(this, a, b);
      this.R = Cv;
      this.ia = Ev;
      this.i = null;
      this.G = new yi([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
      this.A = this.j = null;
      this.o = -1;
      this.S = [0, 0];
    }
    u(Gv, Bt);
    k = Gv.prototype;
    k.ra = function() {
      Bi(this.c.i, this.G);
      Bt.prototype.ra.call(this);
    };
    k.Cf = function(a, b, c) {
      var d = this.c;
      return function(e, f) {
        return et(a, b, e, f, function(a) {
          var b = d.a.b.hasOwnProperty(a.ib());
          b && (c[e] || (c[e] = {}), c[e][a.Ga.toString()] = a);
          return b;
        });
      };
    };
    k.$f = function() {
      Bt.prototype.$f.call(this);
      this.i = null;
    };
    k.ag = function(a, b, c) {
      var d = this.c,
          e = c.b,
          f = a.viewState,
          g = f.projection,
          h = this.a,
          l = h.la(),
          m = l.Ib(g),
          p = m.Mc(f.resolution),
          n = m.La(p),
          q = l.Sd(p, a.pixelRatio, g),
          r = q[0] / Ga(m.fb(p), this.S)[0],
          v = n / r,
          x = l.pb(r) * l.Jf(g),
          y = f.center,
          z = a.extent,
          A = gc(m, z, n);
      if (this.j && ua(this.j, A) && this.o == l.f)
        v = this.A;
      else {
        var V = [A.ba - A.da + 1, A.ja - A.fa + 1],
            Pa = ya(Math.max(V[0] * q[0], V[1] * q[1])),
            V = v * Pa,
            ra = m.Qc(p),
            La = ra[0] + A.da * q[0] * v,
            v = ra[1] + A.fa * q[1] * v,
            v = [La, v, La + V, v + V];
        Ct(this, a, Pa);
        e.viewport(0, 0, Pa, Pa);
        e.clearColor(0, 0, 0, 0);
        e.clear(16384);
        e.disable(3042);
        Pa = Ci(c, this.R, this.ia);
        c.Rc(Pa);
        this.i || (this.i = new Fv(e, Pa));
        ri(c, 34962, this.G);
        e.enableVertexAttribArray(this.i.b);
        e.vertexAttribPointer(this.i.b, 2, 5126, !1, 16, 0);
        e.enableVertexAttribArray(this.i.a);
        e.vertexAttribPointer(this.i.a, 2, 5126, !1, 16, 8);
        e.uniform1i(this.i.f, 0);
        c = {};
        c[p] = {};
        var C = this.Cf(l, g, c),
            Ma = h.Td(),
            Pa = !0,
            La = Ia(),
            xb = new sa(0, 0, 0, 0),
            Z,
            Ra,
            Cb;
        for (Ra = A.da; Ra <= A.ba; ++Ra)
          for (Cb = A.fa; Cb <= A.ja; ++Cb) {
            ra = l.Lc(p, Ra, Cb, r, g);
            if (void 0 !== b.extent && (Z = m.Ta(ra.Ga, La), !mb(Z, b.extent)))
              continue;
            Z = ra.V();
            (Z = 2 == Z || 4 == Z || 3 == Z && !Ma) || (ra = ws(ra));
            Z = ra.V();
            if (2 == Z) {
              if (d.a.b.hasOwnProperty(ra.ib())) {
                c[p][ra.Ga.toString()] = ra;
                continue;
              }
            } else if (4 == Z || 3 == Z && !Ma)
              continue;
            Pa = !1;
            Z = ec(m, ra.Ga, C, xb, La);
            Z || (ra = fc(m, ra.Ga, xb, La)) && C(p + 1, ra);
          }
        b = Object.keys(c).map(Number);
        b.sort(da);
        for (var C = new Float32Array(4),
            dc,
            Ma = 0,
            xb = b.length; Ma < xb; ++Ma)
          for (dc in Ra = c[b[Ma]], Ra)
            ra = Ra[dc], Z = m.Ta(ra.Ga, La), C[0] = 2 * (Z[2] - Z[0]) / V, C[1] = 2 * (Z[3] - Z[1]) / V, C[2] = 2 * (Z[0] - v[0]) / V - 1, C[3] = 2 * (Z[1] - v[1]) / V - 1, e.uniform4fv(this.i.c, C), lk(d, ra, q, x * r), e.drawArrays(5, 0, 4);
        Pa ? (this.j = A, this.A = v, this.o = l.f) : (this.A = this.j = null, this.o = -1, a.animate = !0);
      }
      kt(a.usedTiles, l, p, A);
      var $c = d.l;
      lt(a, l, m, r, g, z, p, h.Pd(), function(a) {
        2 != a.V() || d.a.b.hasOwnProperty(a.ib()) || a.ib() in $c.a || $c.i([a, ic(m, a.Ga), m.La(a.Ga[0]), q, x * r]);
      }, this);
      ht(a, l);
      jt(a, l);
      e = this.v;
      xh(e);
      Eh(e, (Math.round(y[0] / n) * n - v[0]) / (v[2] - v[0]), (Math.round(y[1] / n) * n - v[1]) / (v[3] - v[1]));
      f.rotation && Ch(e, f.rotation);
      Dh(e, a.size[0] * f.resolution / (v[2] - v[0]), a.size[1] * f.resolution / (v[3] - v[1]));
      Eh(e, -.5, -.5);
      return !0;
    };
    k.Zf = function(a, b, c, d) {
      if (this.g) {
        a = Bh(this.v, [a[0] / b.size[0], (b.size[1] - a[1]) / b.size[1]].slice());
        a = [a[0] * this.l, a[1] * this.l];
        b = this.c.i.b;
        b.bindFramebuffer(b.FRAMEBUFFER, this.g);
        var e = new Uint8Array(4);
        b.readPixels(a[0], a[1], 1, 1, b.RGBA, b.UNSIGNED_BYTE, e);
        if (0 < e[3])
          return c.call(d, this.a, e);
      }
    };
    function Hv(a) {
      a = a ? a : {};
      var b = pb({}, a);
      delete b.preload;
      delete b.useInterimTilesOnError;
      rh.call(this, b);
      this.Uh(void 0 !== a.preload ? a.preload : 0);
      this.Vh(void 0 !== a.useInterimTilesOnError ? a.useInterimTilesOnError : !0);
    }
    u(Hv, rh);
    k = Hv.prototype;
    k.Dd = function(a) {
      var b = null,
          c = a.T();
      "canvas" === c ? b = new zv(this) : "webgl" === c && (b = new Gv(a, this));
      return b;
    };
    k.Pd = function() {
      return this.get("preload");
    };
    k.Uh = function(a) {
      this.set("preload", a);
    };
    k.Td = function() {
      return this.get("useInterimTilesOnError");
    };
    k.Vh = function(a) {
      this.set("useInterimTilesOnError", a);
    };
    function Iv(a) {
      zv.call(this, a);
      this.G = !1;
      this.S = wh();
      this.Y = "vector" == a.v ? 1 : 0;
    }
    u(Iv, zv);
    var Jv = {
      image: ei,
      hybrid: ["Polygon", "LineString"]
    },
        Kv = {
          hybrid: ["Image", "Text"],
          vector: ei
        };
    k = Iv.prototype;
    k.qd = function(a, b) {
      var c = this.a.f;
      this.oa != c && (this.c.length = 0);
      this.oa = c;
      return zv.prototype.qd.apply(this, arguments);
    };
    function Lv(a, b, c) {
      function d(a) {
        var b,
            c = a.Nc();
        c ? b = c.call(a, r) : (c = e.i) && (b = c(a, r));
        if (b) {
          Array.isArray(b) || (b = [b]);
          var c = A,
              d = z;
          if (b) {
            var f = !1;
            if (Array.isArray(b))
              for (var g = 0,
                  h = b.length; g < h; ++g)
                f = st(d, a, b[g], c, this.$h, this) || f;
            else
              f = st(d, a, b, c, this.$h, this) || f;
            a = f;
          } else
            a = !1;
          this.G = this.G || a;
          l.Ld = l.Ld || a;
        }
      }
      var e = a.a,
          f = c.pixelRatio;
      c = c.viewState.projection;
      var g = e.f,
          h = e.get(vt) || null,
          l = b.f;
      if (l.Ld || l.af != g || l.wg != h) {
        l.vd = null;
        l.Ld = !1;
        var m = e.la(),
            p = m.tileGrid,
            n = b.Ga,
            q = b.l,
            r = p.La(n[0]),
            v,
            x,
            y;
        "tile-pixels" == q.Jb() ? (v = y = m.pb(), p = Ga(p.fb(n[0])), v = [0, 0, p[0] * v, p[1] * v]) : (y = r, v = p.Ta(n), Tb(c, q) || (x = !0, b.Xf(c)));
        l.Ld = !1;
        var z = new Ws(0, v, y, m.g, e.c),
            A = rt(y, f);
        b = b.g;
        h && h !== l.wg && b.sort(h);
        m = 0;
        for (y = b.length; m < y; ++m)
          f = b[m], x && f.U().tb(q, c), d.call(a, f);
        $s(z);
        l.af = g;
        l.wg = h;
        l.vd = z;
        l.resolution = NaN;
      }
    }
    k.Df = function(a, b, c, d, e, f, g, h) {
      var l = a;
      Lv(this, l, b);
      if ("vector" != this.a.v) {
        var m = l,
            p = b,
            n = this.a,
            l = m.f,
            q = n.f,
            r = Jv[n.v];
        if (r && l.xg !== q) {
          l.xg = q;
          var v = m.Ga,
              x = m.Ga[0],
              q = p.pixelRatio,
              y = n.la(),
              z = y.tileGrid,
              A = y.pb(),
              n = xh(this.S);
          "tile-pixels" == m.l.Jb() ? (v = q / A, Dh(n, v, v)) : (A = q / z.La(x), v = z.Ta(v, this.j), Dh(n, A, -A), Eh(n, -v[0], -v[3]));
          m = m.c;
          p = y.Sd(x, q, p.viewState.projection);
          m.canvas.width = p[0];
          m.canvas.height = p[1];
          l.vd.i(m, q, n, 0, {}, r);
        }
      }
      zv.prototype.Df.apply(this, arguments);
    };
    k.Aa = function(a, b, c, d, e) {
      var f = b.viewState.resolution;
      b = b.viewState.rotation;
      c = void 0 == c ? 0 : c;
      var g = this.a,
          h = {},
          l = this.c,
          m = g.la(),
          p = m.tileGrid,
          n,
          q,
          r,
          v,
          x,
          y;
      r = 0;
      for (v = l.length; r < v; ++r)
        y = l[r], q = y.Ga, x = m.tileGrid.Ta(q, this.j), Qa(Ka(x, c * f), a) && ("tile-pixels" === y.l.Jb() ? (x = eb(x), f = m.pb(), q = p.La(q[0]) / f, q = [(a[0] - x[0]) / q, (x[1] - a[1]) / q]) : q = a, y = y.f.vd, n = n || y.Aa(q, f, b, c, {}, function(a) {
          var b = w(a).toString();
          if (!(b in h))
            return h[b] = !0, d.call(e, a, g);
        }));
      return n;
    };
    k.$h = function() {
      ft(this);
    };
    k.Ue = function(a, b, c) {
      var d = Kv[this.a.v];
      if (d)
        for (var e = b.pixelRatio,
            f = b.viewState.rotation,
            g = b.size,
            h = Math.round(e * g[0] / 2),
            g = Math.round(e * g[1] / 2),
            l = this.c,
            m = [],
            p = [],
            n = l.length - 1; 0 <= n; --n) {
          var q = l[n],
              r;
          var v = q;
          r = b;
          if ("tile-pixels" == v.l.Jb()) {
            var x = this.a.la(),
                y = x.tileGrid,
                z = v.Ga,
                x = y.La(z[0]) / x.pb(),
                v = r.viewState,
                A = r.pixelRatio,
                V = v.resolution / A,
                z = y.Ta(z, this.j),
                y = v.center,
                z = eb(z);
            r = r.size;
            r = Fh(this.S, Math.round(A * r[0] / 2), Math.round(A * r[1] / 2), x / V, x / V, v.rotation, (z[0] - y[0]) / x, (y[1] - z[1]) / x);
          } else
            r = pt(this, r, 0);
          x = bt(q.f.vd, r);
          v = q.Ga[0];
          a.save();
          a.globalAlpha = c.opacity;
          Qh(a, -f, h, g);
          A = 0;
          for (V = m.length; A < V; ++A)
            y = m[A], v < p[A] && (a.beginPath(), a.moveTo(x[0], x[1]), a.lineTo(x[2], x[3]), a.lineTo(x[4], x[5]), a.lineTo(x[6], x[7]), a.moveTo(y[6], y[7]), a.lineTo(y[4], y[5]), a.lineTo(y[2], y[3]), a.lineTo(y[0], y[1]), a.clip());
          q.f.vd.i(a, e, r, f, {}, d);
          a.restore();
          m.push(x);
          p.push(v);
        }
      zv.prototype.Ue.apply(this, arguments);
    };
    function U(a) {
      a = a ? a : {};
      var b = pb({}, a);
      delete b.preload;
      delete b.useInterimTilesOnError;
      R.call(this, b);
      this.Wh(a.preload ? a.preload : 0);
      this.Xh(a.useInterimTilesOnError ? a.useInterimTilesOnError : !0);
      qa(void 0 == a.renderMode || "image" == a.renderMode || "hybrid" == a.renderMode || "vector" == a.renderMode, 28);
      this.v = a.renderMode || "hybrid";
    }
    u(U, R);
    k = U.prototype;
    k.Dd = function(a) {
      var b = null;
      "canvas" === a.T() && (b = new Iv(this));
      return b;
    };
    k.Pd = function() {
      return this.get(Mv);
    };
    k.Td = function() {
      return this.get(Nv);
    };
    k.Wh = function(a) {
      this.set("preload", a);
    };
    k.Xh = function(a) {
      this.set("useInterimTilesOnError", a);
    };
    var Mv = "preload",
        Nv = "useInterimTilesOnError";
    function Ov(a, b, c, d) {
      function e() {
        delete window[g];
        f.parentNode.removeChild(f);
      }
      var f = document.createElement("script"),
          g = "olc_" + w(b);
      f.async = !0;
      f.src = a + (-1 == a.indexOf("?") ? "?" : "&") + (d || "callback") + "=" + g;
      var h = setTimeout(function() {
        e();
        c && c();
      }, 1E4);
      window[g] = function(a) {
        clearTimeout(h);
        e();
        b(a);
      };
      document.getElementsByTagName("head")[0].appendChild(f);
    }
    ;
    function Pv(a, b, c, d, e, f, g, h, l, m, p) {
      vs.call(this, e, 0);
      this.C = void 0 !== p ? p : !1;
      this.A = g;
      this.u = h;
      this.I = null;
      this.c = b;
      this.j = d;
      this.o = f ? f : e;
      this.f = [];
      this.wd = null;
      this.g = 0;
      f = d.Ta(this.o);
      h = this.j.D();
      e = this.c.D();
      f = h ? lb(f, h) : f;
      if (fb(f))
        if ((h = a.D()) && (e ? e = lb(e, h) : e = h), d = ev(a, c, jb(f), d.La(this.o[0])), !isFinite(d) || 0 >= d)
          this.state = 4;
        else if (this.v = new hv(a, c, f, e, d * (void 0 !== m ? m : .5)), this.v.c.length)
          if (this.g = b.Mc(d), c = jv(this.v), e && (a.a ? (c[1] = wa(c[1], e[1], e[3]), c[3] = wa(c[3], e[1], e[3])) : c = lb(c, e)), fb(c)) {
            a = cc(b, c, this.g);
            for (b = a.da; b <= a.ba; b++)
              for (c = a.fa; c <= a.ja; c++)
                (m = l(this.g, b, c, g)) && this.f.push(m);
            this.f.length || (this.state = 4);
          } else
            this.state = 4;
        else
          this.state = 4;
      else
        this.state = 4;
    }
    u(Pv, vs);
    Pv.prototype.ra = function() {
      1 == this.state && (this.wd.forEach(rc), this.wd = null);
      vs.prototype.ra.call(this);
    };
    Pv.prototype.Z = function() {
      return this.I;
    };
    Pv.prototype.Zd = function() {
      var a = [];
      this.f.forEach(function(b) {
        b && 2 == b.V() && a.push({
          extent: this.c.Ta(b.Ga),
          image: b.Z()
        });
      }, this);
      this.f.length = 0;
      if (a.length) {
        var b = this.o[0],
            c = this.j.fb(b),
            d = "number" === typeof c ? c : c[0],
            c = "number" === typeof c ? c : c[1],
            b = this.j.La(b),
            e = this.c.La(this.g),
            f = this.j.Ta(this.o);
        this.I = gv(d, c, this.A, e, this.c.D(), b, f, this.v, a, this.u, this.C);
        this.state = 2;
      } else
        this.state = 3;
      this.s();
    };
    Pv.prototype.load = function() {
      if (0 == this.state) {
        this.state = 1;
        this.s();
        var a = 0;
        this.wd = [];
        this.f.forEach(function(b) {
          var c = b.V();
          if (0 == c || 1 == c) {
            a++;
            var d;
            d = B(b, "change", function() {
              var c = b.V();
              if (2 == c || 3 == c || 4 == c)
                rc(d), a--, a || (this.wd.forEach(rc), this.wd = null, this.Zd());
            }, this);
            this.wd.push(d);
          }
        }, this);
        this.f.forEach(function(a) {
          0 == a.V() && a.load();
        });
        a || setTimeout(this.Zd.bind(this), 0);
      }
    };
    function Qv(a, b) {
      var c = /\{z\}/g,
          d = /\{x\}/g,
          e = /\{y\}/g,
          f = /\{-y\}/g;
      return function(g) {
        if (g)
          return a.replace(c, g[0].toString()).replace(d, g[1].toString()).replace(e, function() {
            return (-g[2] - 1).toString();
          }).replace(f, function() {
            var a = b.a ? b.a[g[0]] : null;
            qa(a, 55);
            return (a.ja - a.fa + 1 + g[2]).toString();
          });
      };
    }
    function Rv(a, b) {
      for (var c = a.length,
          d = Array(c),
          e = 0; e < c; ++e)
        d[e] = Qv(a[e], b);
      return Sv(d);
    }
    function Sv(a) {
      return 1 === a.length ? a[0] : function(b, c, d) {
        if (b)
          return a[Ca((b[1] << b[0]) + b[2], a.length)](b, c, d);
      };
    }
    function Tv() {}
    function Uv(a) {
      var b = [],
          c = /\{([a-z])-([a-z])\}/.exec(a);
      if (c) {
        var d = c[2].charCodeAt(0),
            e;
        for (e = c[1].charCodeAt(0); e <= d; ++e)
          b.push(a.replace(c[0], String.fromCharCode(e)));
        return b;
      }
      if (c = c = /\{(\d+)-(\d+)\}/.exec(a)) {
        d = parseInt(c[2], 10);
        for (e = parseInt(c[1], 10); e <= d; e++)
          b.push(a.replace(c[0], e.toString()));
        return b;
      }
      b.push(a);
      return b;
    }
    ;
    function Vv(a) {
      jk.call(this);
      this.i = void 0 !== a ? a : 2048;
    }
    u(Vv, jk);
    function Wv(a) {
      return a.c > a.i;
    }
    Vv.prototype.gd = function(a) {
      for (var b,
          c; Wv(this); ) {
        b = this.a.$c;
        c = b.Ga[0].toString();
        var d;
        if (d = c in a)
          b = b.Ga, d = ta(a[c], b[1], b[2]);
        if (d)
          break;
        else
          Ac(this.pop());
      }
    };
    function Xv(a) {
      Gt.call(this, {
        attributions: a.attributions,
        extent: a.extent,
        logo: a.logo,
        projection: a.projection,
        state: a.state,
        wrapX: a.wrapX
      });
      this.oa = void 0 !== a.opaque ? a.opaque : !1;
      this.Oa = void 0 !== a.tilePixelRatio ? a.tilePixelRatio : 1;
      this.tileGrid = void 0 !== a.tileGrid ? a.tileGrid : null;
      this.a = new Vv(a.cacheSize);
      this.j = [0, 0];
      this.tc = "";
    }
    u(Xv, Gt);
    k = Xv.prototype;
    k.fi = function() {
      return Wv(this.a);
    };
    k.gd = function(a, b) {
      var c = this.Rd(a);
      c && c.gd(b);
    };
    function et(a, b, c, d, e) {
      b = a.Rd(b);
      if (!b)
        return !1;
      for (var f = !0,
          g,
          h,
          l = d.da; l <= d.ba; ++l)
        for (var m = d.fa; m <= d.ja; ++m)
          g = a.Sb(c, l, m), h = !1, b.b.hasOwnProperty(g) && (g = b.get(g), (h = 2 === g.V()) && (h = !1 !== e(g))), h || (f = !1);
      return f;
    }
    k.Jf = function() {
      return 0;
    };
    function Yv(a, b) {
      a.tc !== b && (a.tc = b, a.s());
    }
    k.Sb = function(a, b, c) {
      return a + "/" + b + "/" + c;
    };
    k.Mf = function() {
      return this.oa;
    };
    k.ab = function() {
      return this.tileGrid;
    };
    k.Ib = function(a) {
      return this.tileGrid ? this.tileGrid : jc(a);
    };
    k.Rd = function(a) {
      var b = this.c;
      return b && !Tb(b, a) ? null : this.a;
    };
    k.pb = function() {
      return this.Oa;
    };
    k.Sd = function(a, b, c) {
      c = this.Ib(c);
      b = this.pb(b);
      a = Ga(c.fb(a), this.j);
      return 1 == b ? a : Fa(a, b, this.j);
    };
    function Zv(a, b, c) {
      var d = void 0 !== c ? c : a.c;
      c = a.Ib(d);
      if (a.G && d.f) {
        var e = b;
        b = e[0];
        a = ic(c, e);
        d = kc(d);
        Qa(d, a) ? b = e : (e = hb(d), a[0] += e * Math.ceil((d[0] - a[0]) / e), b = c.Pf(a, b));
      }
      e = b[0];
      d = b[1];
      a = b[2];
      if (c.minZoom > e || e > c.maxZoom)
        c = !1;
      else {
        var f = c.D();
        c = (c = f ? cc(c, f, e) : c.a ? c.a[e] : null) ? ta(c, d, a) : !0;
      }
      return c ? b : null;
    }
    k.va = function() {
      this.a.clear();
      this.s();
    };
    k.Eg = na;
    function $v(a, b) {
      Bc.call(this, a);
      this.tile = b;
    }
    u($v, Bc);
    function aw(a) {
      Xv.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        extent: a.extent,
        logo: a.logo,
        opaque: a.opaque,
        projection: a.projection,
        state: a.state,
        tileGrid: a.tileGrid,
        tilePixelRatio: a.tilePixelRatio,
        wrapX: a.wrapX
      });
      this.tileLoadFunction = a.tileLoadFunction;
      this.tileUrlFunction = this.Fc ? this.Fc.bind(this) : Tv;
      this.urls = null;
      a.urls ? this.cb(a.urls) : a.url && this.jb(a.url);
      a.tileUrlFunction && this.bb(a.tileUrlFunction);
    }
    u(aw, Xv);
    k = aw.prototype;
    k.ob = function() {
      return this.tileLoadFunction;
    };
    k.qb = function() {
      return this.tileUrlFunction;
    };
    k.rb = function() {
      return this.urls;
    };
    k.gi = function(a) {
      a = a.target;
      switch (a.V()) {
        case 1:
          this.b(new $v("tileloadstart", a));
          break;
        case 2:
          this.b(new $v("tileloadend", a));
          break;
        case 3:
          this.b(new $v("tileloaderror", a));
      }
    };
    k.xb = function(a) {
      this.a.clear();
      this.tileLoadFunction = a;
      this.s();
    };
    k.bb = function(a, b) {
      this.tileUrlFunction = a;
      "undefined" !== typeof b ? Yv(this, b) : this.s();
    };
    k.jb = function(a) {
      var b = this.urls = Uv(a);
      this.bb(this.Fc ? this.Fc.bind(this) : Rv(b, this.tileGrid), a);
    };
    k.cb = function(a) {
      this.urls = a;
      var b = a.join("\n");
      this.bb(this.Fc ? this.Fc.bind(this) : Rv(a, this.tileGrid), b);
    };
    k.Eg = function(a, b, c) {
      a = this.Sb(a, b, c);
      this.a.b.hasOwnProperty(a) && this.a.get(a);
    };
    function W(a) {
      aw.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        extent: a.extent,
        logo: a.logo,
        opaque: a.opaque,
        projection: a.projection,
        state: a.state,
        tileGrid: a.tileGrid,
        tileLoadFunction: a.tileLoadFunction ? a.tileLoadFunction : bw,
        tilePixelRatio: a.tilePixelRatio,
        tileUrlFunction: a.tileUrlFunction,
        url: a.url,
        urls: a.urls,
        wrapX: a.wrapX
      });
      this.crossOrigin = void 0 !== a.crossOrigin ? a.crossOrigin : null;
      this.tileClass = a.tileClass ? a.tileClass : xs;
      this.g = {};
      this.v = {};
      this.Ha = a.reprojectionErrorThreshold;
      this.C = !1;
    }
    u(W, aw);
    k = W.prototype;
    k.fi = function() {
      if (Wv(this.a))
        return !0;
      for (var a in this.g)
        if (Wv(this.g[a]))
          return !0;
      return !1;
    };
    k.gd = function(a, b) {
      var c = this.Rd(a);
      this.a.gd(this.a == c ? b : {});
      for (var d in this.g) {
        var e = this.g[d];
        e.gd(e == c ? b : {});
      }
    };
    k.Jf = function(a) {
      return this.c && a && !Tb(this.c, a) ? 0 : this.Kf();
    };
    k.Kf = function() {
      return 0;
    };
    k.Mf = function(a) {
      return this.c && a && !Tb(this.c, a) ? !1 : aw.prototype.Mf.call(this, a);
    };
    k.Ib = function(a) {
      var b = this.c;
      return !this.tileGrid || b && !Tb(b, a) ? (b = w(a).toString(), b in this.v || (this.v[b] = jc(a)), this.v[b]) : this.tileGrid;
    };
    k.Rd = function(a) {
      var b = this.c;
      if (!b || Tb(b, a))
        return this.a;
      a = w(a).toString();
      a in this.g || (this.g[a] = new Vv);
      return this.g[a];
    };
    function cw(a, b, c, d, e, f, g) {
      b = [b, c, d];
      e = (c = Zv(a, b, f)) ? a.tileUrlFunction(c, e, f) : void 0;
      e = new a.tileClass(b, void 0 !== e ? 0 : 4, void 0 !== e ? e : "", a.crossOrigin, a.tileLoadFunction);
      e.key = g;
      B(e, "change", a.gi, a);
      return e;
    }
    k.Lc = function(a, b, c, d, e) {
      if (this.c && e && !Tb(this.c, e)) {
        var f = this.Rd(e);
        c = [a, b, c];
        var g;
        a = this.Sb.apply(this, c);
        f.b.hasOwnProperty(a) && (g = f.get(a));
        b = this.tc;
        if (g && g.key == b)
          return g;
        var h = this.c,
            l = this.Ib(h),
            m = this.Ib(e),
            p = Zv(this, c, e);
        d = new Pv(h, l, e, m, c, p, this.pb(d), this.Kf(), function(a, b, c, d) {
          return dw(this, a, b, c, d, h);
        }.bind(this), this.Ha, this.C);
        d.key = b;
        g ? (d.a = g, f.replace(a, d)) : f.set(a, d);
        return d;
      }
      return dw(this, a, b, c, d, e);
    };
    function dw(a, b, c, d, e, f) {
      var g,
          h = a.Sb(b, c, d),
          l = a.tc;
      if (a.a.b.hasOwnProperty(h)) {
        if (g = a.a.get(h), g.key != l) {
          var m = g;
          g = cw(a, b, c, d, e, f, l);
          0 == m.V() ? g.a = m.a : g.a = m;
          if (g.a) {
            b = g.a;
            c = g;
            do {
              if (2 == b.V()) {
                b.a = null;
                break;
              } else
                1 == b.V() ? c = b : 0 == b.V() ? c.a = b.a : c = b;
              b = c.a;
            } while (b);
          }
          a.a.replace(h, g);
        }
      } else
        g = cw(a, b, c, d, e, f, l), a.a.set(h, g);
      return g;
    }
    k.Nb = function(a) {
      if (this.C != a) {
        this.C = a;
        for (var b in this.g)
          this.g[b].clear();
        this.s();
      }
    };
    k.Ob = function(a, b) {
      var c = Gb(a);
      c && (c = w(c).toString(), c in this.v || (this.v[c] = b));
    };
    function bw(a, b) {
      a.Z().src = b;
    }
    ;
    function ew(a) {
      this.A = void 0 !== a.hidpi ? a.hidpi : !1;
      W.call(this, {
        cacheSize: a.cacheSize,
        crossOrigin: "anonymous",
        opaque: !0,
        projection: Gb("EPSG:3857"),
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        state: "loading",
        tileLoadFunction: a.tileLoadFunction,
        tilePixelRatio: this.A ? 2 : 1,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
      this.S = void 0 !== a.culture ? a.culture : "en-us";
      this.u = void 0 !== a.maxZoom ? a.maxZoom : -1;
      this.i = a.key;
      this.o = a.imagerySet;
      Ov("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.o + "?uriScheme=https&include=ImageryProviders&key=" + this.i, this.ia.bind(this), void 0, "jsonp");
    }
    u(ew, W);
    var fw = new nc({html: '<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});
    ew.prototype.Y = function() {
      return this.i;
    };
    ew.prototype.ea = function() {
      return this.o;
    };
    ew.prototype.ia = function(a) {
      if (200 != a.statusCode || "OK" != a.statusDescription || "ValidCredentials" != a.authenticationResultCode || 1 != a.resourceSets.length || 1 != a.resourceSets[0].resources.length)
        It(this, "error");
      else {
        var b = a.brandLogoUri;
        -1 == b.indexOf("https") && (b = b.replace("http", "https"));
        var c = a.resourceSets[0].resources[0],
            d = -1 == this.u ? c.zoomMax : this.u;
        a = kc(this.c);
        var e = mc({
          extent: a,
          minZoom: c.zoomMin,
          maxZoom: d,
          tileSize: (c.imageWidth == c.imageHeight ? c.imageWidth : [c.imageWidth, c.imageHeight]) / this.pb()
        });
        this.tileGrid = e;
        var f = this.S,
            g = this.A;
        this.tileUrlFunction = Sv(c.imageUrlSubdomains.map(function(a) {
          var b = [0, 0, 0],
              d = c.imageUrl.replace("{subdomain}", a).replace("{culture}", f);
          return function(a) {
            if (a)
              return Yb(a[0], a[1], -a[2] - 1, b), a = d, g && (a += "&dpi=d1&device=mobile"), a.replace("{quadkey}", Zb(b));
          };
        }));
        if (c.imageryProviders) {
          var h = Fb(Gb("EPSG:4326"), this.c);
          a = c.imageryProviders.map(function(a) {
            var b = a.attribution,
                c = {};
            a.coverageAreas.forEach(function(a) {
              var b = a.zoomMin,
                  f = Math.min(a.zoomMax, d);
              a = a.bbox;
              a = ob([a[1], a[0], a[3], a[2]], h);
              var g,
                  l;
              for (g = b; g <= f; ++g)
                l = g.toString(), b = cc(e, a, g), l in c ? c[l].push(b) : c[l] = [b];
            });
            return new nc({
              html: b,
              tileRanges: c
            });
          });
          a.push(fw);
          this.ua(a);
        }
        this.R = b;
        It(this, "ready");
      }
    };
    function gw(a) {
      a = a || {};
      var b = void 0 !== a.projection ? a.projection : "EPSG:3857",
          c = void 0 !== a.tileGrid ? a.tileGrid : mc({
            extent: kc(b),
            maxZoom: a.maxZoom,
            minZoom: a.minZoom,
            tileSize: a.tileSize
          });
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        opaque: a.opaque,
        projection: b,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileGrid: c,
        tileLoadFunction: a.tileLoadFunction,
        tilePixelRatio: a.tilePixelRatio,
        tileUrlFunction: a.tileUrlFunction,
        url: a.url,
        urls: a.urls,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
    }
    u(gw, W);
    function hw(a) {
      this.u = a.account;
      this.A = a.map || "";
      this.i = a.config || {};
      this.o = {};
      gw.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        maxZoom: void 0 !== a.maxZoom ? a.maxZoom : 18,
        minZoom: a.minZoom,
        projection: a.projection,
        state: "loading",
        wrapX: a.wrapX
      });
      iw(this);
    }
    u(hw, gw);
    k = hw.prototype;
    k.pk = function() {
      return this.i;
    };
    k.Fp = function(a) {
      pb(this.i, a);
      iw(this);
    };
    k.np = function(a) {
      this.i = a || {};
      iw(this);
    };
    function iw(a) {
      var b = JSON.stringify(a.i);
      if (a.o[b])
        jw(a, a.o[b]);
      else {
        var c = "https://" + a.u + ".cartodb.com/api/v1/map";
        a.A && (c += "/named/" + a.A);
        var d = new XMLHttpRequest;
        d.addEventListener("load", a.jl.bind(a, b));
        d.addEventListener("error", a.il.bind(a));
        d.open("POST", c);
        d.setRequestHeader("Content-type", "application/json");
        d.send(JSON.stringify(a.i));
      }
    }
    k.jl = function(a, b) {
      var c = b.target;
      if (!c.status || 200 <= c.status && 300 > c.status) {
        var d;
        try {
          d = JSON.parse(c.responseText);
        } catch (e) {
          It(this, "error");
          return;
        }
        jw(this, d);
        this.o[a] = d;
        It(this, "ready");
      } else
        It(this, "error");
    };
    k.il = function() {
      It(this, "error");
    };
    function jw(a, b) {
      a.jb("https://" + b.cdn_url.https + "/" + a.u + "/api/v1/map/" + b.layergroupid + "/{z}/{x}/{y}.png");
    }
    ;
    function X(a) {
      S.call(this, {
        attributions: a.attributions,
        extent: a.extent,
        logo: a.logo,
        projection: a.projection,
        wrapX: a.wrapX
      });
      this.C = void 0;
      this.ia = void 0 !== a.distance ? a.distance : 20;
      this.A = [];
      this.Ra = a.geometryFunction || function(a) {
        a = a.U();
        qa(a instanceof E, 10);
        return a;
      };
      this.u = a.source;
      this.u.J("change", X.prototype.Oa, this);
    }
    u(X, S);
    X.prototype.lb = function() {
      return this.u;
    };
    X.prototype.Ud = function(a, b, c) {
      this.u.Ud(a, b, c);
      b !== this.C && (this.clear(), this.C = b, kw(this), this.dd(this.A));
    };
    X.prototype.mb = function(a) {
      this.ia = a;
      this.Oa();
    };
    X.prototype.Oa = function() {
      this.clear();
      kw(this);
      this.dd(this.A);
      this.s();
    };
    function kw(a) {
      if (void 0 !== a.C) {
        a.A.length = 0;
        for (var b = Ia(),
            c = a.ia * a.C,
            d = a.u.Ne(),
            e = {},
            f = 0,
            g = d.length; f < g; f++) {
          var h = d[f];
          w(h).toString() in e || !(h = a.Ra(h)) || (h = h.X(), Wa(h, b), Ka(b, c, b), h = a.u.Hf(b), h = h.filter(function(a) {
            a = w(a).toString();
            return a in e ? !1 : e[a] = !0;
          }), a.A.push(lw(a, h)));
        }
      }
    }
    function lw(a, b) {
      for (var c = [0, 0],
          d = b.length - 1; 0 <= d; --d) {
        var e = a.Ra(b[d]);
        e ? Qe(c, e.X()) : b.splice(d, 1);
      }
      We(c, 1 / b.length);
      c = new H(new E(c));
      c.set("features", b);
      return c;
    }
    ;
    function mw(a, b) {
      var c = [];
      Object.keys(b).forEach(function(a) {
        null !== b[a] && void 0 !== b[a] && c.push(a + "=" + encodeURIComponent(b[a]));
      });
      var d = c.join("&");
      a = a.replace(/[?&]$/, "");
      a = -1 === a.indexOf("?") ? a + "?" : a + "&";
      return a + d;
    }
    ;
    function nw(a) {
      a = a || {};
      lv.call(this, {
        attributions: a.attributions,
        logo: a.logo,
        projection: a.projection,
        resolutions: a.resolutions
      });
      this.S = void 0 !== a.crossOrigin ? a.crossOrigin : null;
      this.Y = void 0 !== a.hidpi ? a.hidpi : !0;
      this.i = a.url;
      this.g = a.imageLoadFunction ? a.imageLoadFunction : rv;
      this.v = a.params || {};
      this.M = null;
      this.o = [0, 0];
      this.C = 0;
      this.A = void 0 !== a.ratio ? a.ratio : 1.5;
    }
    u(nw, lv);
    k = nw.prototype;
    k.rn = function() {
      return this.v;
    };
    k.Ic = function(a, b, c, d) {
      if (void 0 === this.i)
        return null;
      b = mv(this, b);
      c = this.Y ? c : 1;
      var e = this.M;
      if (e && this.C == this.f && e.resolution == b && e.a == c && Ta(e.D(), a))
        return e;
      e = {
        F: "image",
        FORMAT: "PNG32",
        TRANSPARENT: !0
      };
      pb(e, this.v);
      a = a.slice();
      var f = (a[0] + a[2]) / 2,
          g = (a[1] + a[3]) / 2;
      if (1 != this.A) {
        var h = this.A * hb(a) / 2,
            l = this.A * ib(a) / 2;
        a[0] = f - h;
        a[1] = g - l;
        a[2] = f + h;
        a[3] = g + l;
      }
      var h = b / c,
          l = Math.ceil(hb(a) / h),
          m = Math.ceil(ib(a) / h);
      a[0] = f - h * l / 2;
      a[2] = f + h * l / 2;
      a[1] = g - h * m / 2;
      a[3] = g + h * m / 2;
      this.o[0] = l;
      this.o[1] = m;
      f = a;
      g = this.o;
      h = c;
      d = d.nb.split(":").pop();
      e.SIZE = g[0] + "," + g[1];
      e.BBOX = f.join(",");
      e.BBOXSR = d;
      e.IMAGESR = d;
      e.DPI = Math.round(90 * h);
      d = this.i;
      f = d.replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage");
      f == d && qa(!1, 50);
      e = mw(f, e);
      this.M = new ts(a, b, c, this.l, e, this.S, this.g);
      this.C = this.f;
      B(this.M, "change", this.j, this);
      return this.M;
    };
    k.qn = function() {
      return this.g;
    };
    k.sn = function() {
      return this.i;
    };
    k.tn = function(a) {
      this.M = null;
      this.g = a;
      this.s();
    };
    k.vn = function(a) {
      a != this.i && (this.i = a, this.M = null, this.s());
    };
    k.wn = function(a) {
      pb(this.v, a);
      this.M = null;
      this.s();
    };
    function ow(a) {
      lv.call(this, {
        projection: a.projection,
        resolutions: a.resolutions
      });
      this.S = void 0 !== a.crossOrigin ? a.crossOrigin : null;
      this.o = void 0 !== a.displayDpi ? a.displayDpi : 96;
      this.g = a.params || {};
      this.C = a.url;
      this.i = a.imageLoadFunction ? a.imageLoadFunction : rv;
      this.Y = void 0 !== a.hidpi ? a.hidpi : !0;
      this.ia = void 0 !== a.metersPerUnit ? a.metersPerUnit : 1;
      this.v = void 0 !== a.ratio ? a.ratio : 1;
      this.oa = void 0 !== a.useOverlay ? a.useOverlay : !1;
      this.M = null;
      this.A = 0;
    }
    u(ow, lv);
    k = ow.prototype;
    k.yn = function() {
      return this.g;
    };
    k.Ic = function(a, b, c) {
      b = mv(this, b);
      c = this.Y ? c : 1;
      var d = this.M;
      if (d && this.A == this.f && d.resolution == b && d.a == c && Ta(d.D(), a))
        return d;
      1 != this.v && (a = a.slice(), nb(a, this.v));
      var e = [hb(a) / b * c, ib(a) / b * c];
      if (void 0 !== this.C) {
        var d = this.C,
            f = jb(a),
            g = this.ia,
            h = hb(a),
            l = ib(a),
            m = e[0],
            p = e[1],
            n = .0254 / this.o,
            e = {
              OPERATION: this.oa ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
              VERSION: "2.0.0",
              LOCALE: "en",
              CLIENTAGENT: "ol.source.ImageMapGuide source",
              CLIP: "1",
              SETDISPLAYDPI: this.o,
              SETDISPLAYWIDTH: Math.round(e[0]),
              SETDISPLAYHEIGHT: Math.round(e[1]),
              SETVIEWSCALE: p * h > m * l ? h * g / (m * n) : l * g / (p * n),
              SETVIEWCENTERX: f[0],
              SETVIEWCENTERY: f[1]
            };
        pb(e, this.g);
        d = mw(d, e);
        d = new ts(a, b, c, this.l, d, this.S, this.i);
        B(d, "change", this.j, this);
      } else
        d = null;
      this.M = d;
      this.A = this.f;
      return d;
    };
    k.xn = function() {
      return this.i;
    };
    k.An = function(a) {
      pb(this.g, a);
      this.s();
    };
    k.zn = function(a) {
      this.M = null;
      this.i = a;
      this.s();
    };
    function pw(a) {
      var b = a.imageExtent,
          c = void 0 !== a.crossOrigin ? a.crossOrigin : null,
          d = a.imageLoadFunction ? a.imageLoadFunction : rv;
      lv.call(this, {
        attributions: a.attributions,
        logo: a.logo,
        projection: Gb(a.projection)
      });
      this.M = new ts(b, void 0, 1, this.l, a.url, c, d);
      this.i = a.imageSize ? a.imageSize : null;
      B(this.M, "change", this.j, this);
    }
    u(pw, lv);
    pw.prototype.Ic = function(a) {
      return mb(a, this.M.D()) ? this.M : null;
    };
    pw.prototype.j = function(a) {
      if (2 == this.M.V()) {
        var b = this.M.D(),
            c = this.M.Z(),
            d,
            e;
        this.i ? (d = this.i[0], e = this.i[1]) : (d = c.width, e = c.height);
        b = Math.ceil(hb(b) / (ib(b) / e));
        if (b != d) {
          var b = Xc(b, e),
              f = b.canvas;
          b.drawImage(c, 0, 0, d, e, 0, 0, f.width, f.height);
          this.M.zg(f);
        }
      }
      lv.prototype.j.call(this, a);
    };
    function qw(a) {
      a = a || {};
      lv.call(this, {
        attributions: a.attributions,
        logo: a.logo,
        projection: a.projection,
        resolutions: a.resolutions
      });
      this.ia = void 0 !== a.crossOrigin ? a.crossOrigin : null;
      this.g = a.url;
      this.v = a.imageLoadFunction ? a.imageLoadFunction : rv;
      this.i = a.params || {};
      this.o = !0;
      rw(this);
      this.Y = a.serverType;
      this.oa = void 0 !== a.hidpi ? a.hidpi : !0;
      this.M = null;
      this.A = [0, 0];
      this.S = 0;
      this.C = void 0 !== a.ratio ? a.ratio : 1.5;
    }
    u(qw, lv);
    var sw = [101, 101];
    k = qw.prototype;
    k.Gn = function(a, b, c, d) {
      if (void 0 !== this.g) {
        var e = kb(a, b, 0, sw),
            f = {
              SERVICE: "WMS",
              VERSION: "1.3.0",
              REQUEST: "GetFeatureInfo",
              FORMAT: "image/png",
              TRANSPARENT: !0,
              QUERY_LAYERS: this.i.LAYERS
            };
        pb(f, this.i, d);
        d = Math.floor((e[3] - a[1]) / b);
        f[this.o ? "I" : "X"] = Math.floor((a[0] - e[0]) / b);
        f[this.o ? "J" : "Y"] = d;
        return tw(this, e, sw, 1, Gb(c), f);
      }
    };
    k.In = function() {
      return this.i;
    };
    k.Ic = function(a, b, c, d) {
      if (void 0 === this.g)
        return null;
      b = mv(this, b);
      1 == c || this.oa && void 0 !== this.Y || (c = 1);
      var e = b / c,
          f = jb(a),
          g = kb(f, b, 0, [Math.ceil(hb(a) / e), Math.ceil(ib(a) / e)]);
      a = kb(f, b, 0, [Math.ceil(this.C * hb(a) / e), Math.ceil(this.C * ib(a) / e)]);
      if ((f = this.M) && this.S == this.f && f.resolution == b && f.a == c && Ta(f.D(), g))
        return f;
      g = {
        SERVICE: "WMS",
        VERSION: "1.3.0",
        REQUEST: "GetMap",
        FORMAT: "image/png",
        TRANSPARENT: !0
      };
      pb(g, this.i);
      this.A[0] = Math.round(hb(a) / e);
      this.A[1] = Math.round(ib(a) / e);
      d = tw(this, a, this.A, c, d, g);
      this.M = new ts(a, b, c, this.l, d, this.ia, this.v);
      this.S = this.f;
      B(this.M, "change", this.j, this);
      return this.M;
    };
    k.Hn = function() {
      return this.v;
    };
    function tw(a, b, c, d, e, f) {
      qa(void 0 !== a.g, 9);
      f[a.o ? "CRS" : "SRS"] = e.nb;
      "STYLES" in a.i || (f.STYLES = "");
      if (1 != d)
        switch (a.Y) {
          case "geoserver":
            d = 90 * d + .5 | 0;
            f.FORMAT_OPTIONS = "FORMAT_OPTIONS" in f ? f.FORMAT_OPTIONS + (";dpi:" + d) : "dpi:" + d;
            break;
          case "mapserver":
            f.MAP_RESOLUTION = 90 * d;
            break;
          case "carmentaserver":
          case "qgis":
            f.DPI = 90 * d;
            break;
          default:
            qa(!1, 8);
        }
      f.WIDTH = c[0];
      f.HEIGHT = c[1];
      c = e.b;
      var g;
      a.o && "ne" == c.substr(0, 2) ? g = [b[1], b[0], b[3], b[2]] : g = b;
      f.BBOX = g.join(",");
      return mw(a.g, f);
    }
    k.Jn = function() {
      return this.g;
    };
    k.Kn = function(a) {
      this.M = null;
      this.v = a;
      this.s();
    };
    k.Ln = function(a) {
      a != this.g && (this.g = a, this.M = null, this.s());
    };
    k.Mn = function(a) {
      pb(this.i, a);
      rw(this);
      this.M = null;
      this.s();
    };
    function rw(a) {
      a.o = 0 <= Pe(a.i.VERSION || "1.3.0");
    }
    ;
    function uw(a) {
      a = a || {};
      var b;
      void 0 !== a.attributions ? b = a.attributions : b = [vw];
      gw.call(this, {
        attributions: b,
        cacheSize: a.cacheSize,
        crossOrigin: void 0 !== a.crossOrigin ? a.crossOrigin : "anonymous",
        opaque: void 0 !== a.opaque ? a.opaque : !0,
        maxZoom: void 0 !== a.maxZoom ? a.maxZoom : 19,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileLoadFunction: a.tileLoadFunction,
        url: void 0 !== a.url ? a.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        wrapX: a.wrapX
      });
    }
    u(uw, gw);
    var vw = new nc({html: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});
    (function() {
      var a = {},
          b = {ma: a};
      (function(c) {
        if ("object" === typeof a && "undefined" !== typeof b)
          b.ma = c();
        else {
          var d;
          "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
          d.bq = c();
        }
      })(function() {
        return function d(a, b, g) {
          function e(h, l) {
            if (!b[h]) {
              if (!a[h]) {
                var m = "function" == typeof require && require;
                if (!l && m)
                  return m(h, !0);
                if (f)
                  return f(h, !0);
                m = Error("Cannot find module '" + h + "'");
                throw m.code = "MODULE_NOT_FOUND", m;
              }
              m = b[h] = {ma: {}};
              a[h][0].call(m.ma, function(b) {
                var d = a[h][1][b];
                return e(d ? d : b);
              }, m, m.ma, d, a, b, g);
            }
            return b[h].ma;
          }
          for (var f = "function" == typeof require && require,
              m = 0; m < g.length; m++)
            e(g[m]);
          return e;
        }({
          1: [function(a, b, f) {
            a = a("./processor");
            f.yj = a;
          }, {"./processor": 2}],
          2: [function(a, b) {
            function d(a) {
              var b = !0;
              try {
                new ImageData(10, 10);
              } catch (q) {
                b = !1;
              }
              return function(d) {
                var e = d.buffers,
                    f = d.meta,
                    g = d.width,
                    h = d.height,
                    l = e.length,
                    m = e[0].byteLength;
                if (d.imageOps) {
                  m = Array(l);
                  for (d = 0; d < l; ++d) {
                    var n = m,
                        p = d,
                        q;
                    q = new Uint8ClampedArray(e[d]);
                    var La = g,
                        C = h;
                    q = b ? new ImageData(q, La, C) : {
                      data: q,
                      width: La,
                      height: C
                    };
                    n[p] = q;
                  }
                  g = a(m, f).data;
                } else {
                  g = new Uint8ClampedArray(m);
                  h = Array(l);
                  n = Array(l);
                  for (d = 0; d < l; ++d)
                    h[d] = new Uint8ClampedArray(e[d]), n[d] = [0, 0, 0, 0];
                  for (e = 0; e < m; e += 4) {
                    for (d = 0; d < l; ++d)
                      p = h[d], n[d][0] = p[e], n[d][1] = p[e + 1], n[d][2] = p[e + 2], n[d][3] = p[e + 3];
                    d = a(n, f);
                    g[e] = d[0];
                    g[e + 1] = d[1];
                    g[e + 2] = d[2];
                    g[e + 3] = d[3];
                  }
                }
                return g.buffer;
              };
            }
            function e(a, b) {
              var e = Object.keys(a.lib || {}).map(function(b) {
                return "var " + b + " = " + a.lib[b].toString() + ";";
              }).concat(["var __minion__ = (" + d.toString() + ")(", a.operation.toString(), ");", 'self.addEventListener("message", function(event) {', "  var buffer = __minion__(event.data);", "  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);", "});"]),
                  e = URL.createObjectURL(new Blob(e, {type: "text/javascript"})),
                  e = new Worker(e);
              e.addEventListener("message", b);
              return e;
            }
            function h(a, b) {
              var e = d(a.operation);
              return {postMessage: function(a) {
                  setTimeout(function() {
                    b({data: {
                        buffer: e(a),
                        meta: a.meta
                      }});
                  }, 0);
                }};
            }
            function l(a) {
              this.uf = !!a.Gl;
              var b;
              0 === a.threads ? b = 0 : this.uf ? b = 1 : b = a.threads || 1;
              var d = [];
              if (b)
                for (var f = 0; f < b; ++f)
                  d[f] = e(a, this.Qg.bind(this, f));
              else
                d[0] = h(a, this.Qg.bind(this, 0));
              this.le = d;
              this.Cd = [];
              this.Mj = a.Go || Infinity;
              this.je = 0;
              this.cd = {};
              this.vf = null;
            }
            var m = a("./util").$l;
            l.prototype.Eo = function(a, b, d) {
              this.Kj({
                inputs: a,
                Ch: b,
                fd: d
              });
              this.Ng();
            };
            l.prototype.Kj = function(a) {
              for (this.Cd.push(a); this.Cd.length > this.Mj; )
                this.Cd.shift().fd(null, null);
            };
            l.prototype.Ng = function() {
              if (0 === this.je && 0 < this.Cd.length) {
                var a = this.vf = this.Cd.shift(),
                    b = a.inputs[0].width,
                    d = a.inputs[0].height,
                    e = a.inputs.map(function(a) {
                      return a.data.buffer;
                    }),
                    f = this.le.length;
                this.je = f;
                if (1 === f)
                  this.le[0].postMessage({
                    buffers: e,
                    meta: a.Ch,
                    imageOps: this.uf,
                    width: b,
                    height: d
                  }, e);
                else
                  for (var g = 4 * Math.ceil(a.inputs[0].data.length / 4 / f),
                      h = 0; h < f; ++h) {
                    for (var l = h * g,
                        m = [],
                        V = 0,
                        Pa = e.length; V < Pa; ++V)
                      m.push(e[h].slice(l, l + g));
                    this.le[h].postMessage({
                      buffers: m,
                      meta: a.Ch,
                      imageOps: this.uf,
                      width: b,
                      height: d
                    }, m);
                  }
              }
            };
            l.prototype.Qg = function(a, b) {
              this.$p || (this.cd[a] = b.data, --this.je, 0 === this.je && this.Nj());
            };
            l.prototype.Nj = function() {
              var a = this.vf,
                  b = this.le.length,
                  d,
                  e;
              if (1 === b)
                d = new Uint8ClampedArray(this.cd[0].buffer), e = this.cd[0].meta;
              else {
                var f = a.inputs[0].data.length;
                d = new Uint8ClampedArray(f);
                e = Array(f);
                for (var f = 4 * Math.ceil(f / 4 / b),
                    g = 0; g < b; ++g) {
                  var h = g * f;
                  d.set(new Uint8ClampedArray(this.cd[g].buffer), h);
                  e[g] = this.cd[g].meta;
                }
              }
              this.vf = null;
              this.cd = {};
              a.fd(null, m(d, a.inputs[0].width, a.inputs[0].height), e);
              this.Ng();
            };
            b.ma = l;
          }, {"./util": 3}],
          3: [function(a, b, f) {
            var d = !0;
            try {
              new ImageData(10, 10);
            } catch (l) {
              d = !1;
            }
            var e = document.createElement("canvas").getContext("2d");
            f.$l = function(a, b, f) {
              if (d)
                return new ImageData(a, b, f);
              b = e.createImageData(b, f);
              b.data.set(a);
              return b;
            };
          }, {}]
        }, {}, [1])(1);
      });
      Dj = b.ma;
    })();
    function ww(a) {
      this.C = null;
      this.Ha = void 0 !== a.operationType ? a.operationType : "pixel";
      this.Oa = void 0 !== a.threads ? a.threads : 1;
      this.i = xw(a.sources);
      for (var b = 0,
          c = this.i.length; b < c; ++b)
        B(this.i[b], "change", this.s, this);
      this.g = Xc();
      this.ia = new Fe(function() {
        return 1;
      }, this.s.bind(this));
      for (var b = yw(this.i),
          c = {},
          d = 0,
          e = b.length; d < e; ++d)
        c[w(b[d].layer)] = b[d];
      this.o = this.v = null;
      this.Y = {
        animate: !1,
        attributions: {},
        coordinateToPixelTransform: wh(),
        extent: null,
        focus: null,
        index: 0,
        layerStates: c,
        layerStatesArray: b,
        logos: {},
        pixelRatio: 1,
        pixelToCoordinateTransform: wh(),
        postRenderFunctions: [],
        size: [0, 0],
        skippedFeatureUids: {},
        tileQueue: this.ia,
        time: Date.now(),
        usedTiles: {},
        viewState: {rotation: 0},
        viewHints: [],
        wantedTiles: {}
      };
      lv.call(this, {});
      a.operation && this.A(a.operation, a.lib);
    }
    u(ww, lv);
    ww.prototype.A = function(a, b) {
      this.C = new Dj.yj({
        operation: a,
        Gl: "image" === this.Ha,
        Go: 1,
        lib: b,
        threads: this.Oa
      });
      this.s();
    };
    function zw(a, b, c) {
      var d = a.v;
      return !d || a.f !== d.kp || c !== d.resolution || !Za(b, d.extent);
    }
    ww.prototype.Z = function(a, b, c, d) {
      c = !0;
      for (var e,
          f = 0,
          g = this.i.length; f < g; ++f)
        if (e = this.i[f].a.la(), "ready" !== e.V()) {
          c = !1;
          break;
        }
      if (!c)
        return null;
      a = a.slice();
      if (!zw(this, a, b))
        return this.o;
      c = this.g.canvas;
      e = Math.round(hb(a) / b);
      f = Math.round(ib(a) / b);
      if (e !== c.width || f !== c.height)
        c.width = e, c.height = f;
      e = pb({}, this.Y);
      e.viewState = pb({}, e.viewState);
      var f = jb(a),
          g = Math.round(hb(a) / b),
          h = Math.round(ib(a) / b);
      e.extent = a;
      e.focus = jb(a);
      e.size[0] = g;
      e.size[1] = h;
      g = e.viewState;
      g.center = f;
      g.projection = d;
      g.resolution = b;
      this.o = d = new us(a, b, 1, this.l, c, this.S.bind(this, e));
      this.v = {
        extent: a,
        resolution: b,
        kp: this.f
      };
      return d;
    };
    ww.prototype.S = function(a, b) {
      for (var c = this.i.length,
          d = Array(c),
          e = 0; e < c; ++e) {
        var f;
        f = this.i[e];
        var g = a,
            h = a.layerStatesArray[e];
        if (f.qd(g, h)) {
          var l = g.size[0],
              m = g.size[1];
          if (Aw) {
            var p = Aw.canvas;
            p.width !== l || p.height !== m ? Aw = Xc(l, m) : Aw.clearRect(0, 0, l, m);
          } else
            Aw = Xc(l, m);
          f.I(g, h, Aw);
          f = Aw.getImageData(0, 0, l, m);
        } else
          f = null;
        if (f)
          d[e] = f;
        else {
          d = null;
          break;
        }
      }
      d && (c = {}, this.b(new Bw(Cw, a, c)), this.C.Eo(d, c, this.oa.bind(this, a, b)));
      Ge(a.tileQueue, 16, 16);
    };
    ww.prototype.oa = function(a, b, c, d, e) {
      c ? b(c) : d && (this.b(new Bw(Dw, a, e)), zw(this, a.extent, a.viewState.resolution / a.pixelRatio) || this.g.putImageData(d, 0, 0), b(null));
    };
    var Aw = null;
    function yw(a) {
      return a.map(function(a) {
        return eh(a.a);
      });
    }
    function xw(a) {
      for (var b = a.length,
          c = Array(b),
          d = 0; d < b; ++d) {
        var e = d,
            f = a[d],
            g = null;
        f instanceof Xv ? (f = new Hv({source: f}), g = new zv(f)) : f instanceof lv && (f = new yv({source: f}), g = new dv(f));
        c[e] = g;
      }
      return c;
    }
    function Bw(a, b, c) {
      Bc.call(this, a);
      this.extent = b.extent;
      this.resolution = b.viewState.resolution / b.pixelRatio;
      this.data = c;
    }
    u(Bw, Bc);
    ww.prototype.Ic = function() {
      return null;
    };
    var Cw = "beforeoperations",
        Dw = "afteroperations";
    function Ew(a) {
      var b = a.layer.indexOf("-"),
          b = Fw[-1 == b ? a.layer : a.layer.slice(0, b)],
          c = Gw[a.layer];
      gw.call(this, {
        attributions: Hw,
        cacheSize: a.cacheSize,
        crossOrigin: "anonymous",
        maxZoom: void 0 != a.maxZoom ? a.maxZoom : b.maxZoom,
        minZoom: void 0 != a.minZoom ? a.minZoom : b.minZoom,
        opaque: c.opaque,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileLoadFunction: a.tileLoadFunction,
        url: void 0 !== a.url ? a.url : "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" + a.layer + "/{z}/{x}/{y}." + c.Hb
      });
    }
    u(Ew, gw);
    var Hw = [new nc({html: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}), vw],
        Gw = {
          terrain: {
            Hb: "jpg",
            opaque: !0
          },
          "terrain-background": {
            Hb: "jpg",
            opaque: !0
          },
          "terrain-labels": {
            Hb: "png",
            opaque: !1
          },
          "terrain-lines": {
            Hb: "png",
            opaque: !1
          },
          "toner-background": {
            Hb: "png",
            opaque: !0
          },
          toner: {
            Hb: "png",
            opaque: !0
          },
          "toner-hybrid": {
            Hb: "png",
            opaque: !1
          },
          "toner-labels": {
            Hb: "png",
            opaque: !1
          },
          "toner-lines": {
            Hb: "png",
            opaque: !1
          },
          "toner-lite": {
            Hb: "png",
            opaque: !0
          },
          watercolor: {
            Hb: "jpg",
            opaque: !0
          }
        },
        Fw = {
          terrain: {
            minZoom: 4,
            maxZoom: 18
          },
          toner: {
            minZoom: 0,
            maxZoom: 20
          },
          watercolor: {
            minZoom: 1,
            maxZoom: 16
          }
        };
    function Iw(a) {
      a = a || {};
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        projection: a.projection,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileGrid: a.tileGrid,
        tileLoadFunction: a.tileLoadFunction,
        url: a.url,
        urls: a.urls,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
      this.i = a.params || {};
      this.o = Ia();
      Yv(this, Jw(this));
    }
    u(Iw, W);
    function Jw(a) {
      var b = 0,
          c = [],
          d;
      for (d in a.i)
        c[b++] = d + "-" + a.i[d];
      return c.join("/");
    }
    Iw.prototype.u = function() {
      return this.i;
    };
    Iw.prototype.pb = function(a) {
      return a;
    };
    Iw.prototype.Fc = function(a, b, c) {
      var d = this.tileGrid;
      d || (d = this.Ib(c));
      if (!(d.b.length <= a[0])) {
        var e = d.Ta(a, this.o),
            f = Ga(d.fb(a[0]), this.j);
        1 != b && (f = Fa(f, b, this.j));
        d = {
          F: "image",
          FORMAT: "PNG32",
          TRANSPARENT: !0
        };
        pb(d, this.i);
        var g = this.urls;
        g ? (c = c.nb.split(":").pop(), d.SIZE = f[0] + "," + f[1], d.BBOX = e.join(","), d.BBOXSR = c, d.IMAGESR = c, d.DPI = Math.round(d.DPI ? d.DPI * b : 90 * b), a = (1 == g.length ? g[0] : g[Ca((a[1] << a[0]) + a[2], g.length)]).replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage"), a = mw(a, d)) : a = void 0;
        return a;
      }
    };
    Iw.prototype.A = function(a) {
      pb(this.i, a);
      Yv(this, Jw(this));
    };
    function Kw(a) {
      Xv.call(this, {
        opaque: !1,
        projection: a.projection,
        tileGrid: a.tileGrid,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
    }
    u(Kw, Xv);
    Kw.prototype.Lc = function(a, b, c) {
      var d = this.Sb(a, b, c);
      if (this.a.b.hasOwnProperty(d))
        return this.a.get(d);
      var e = Ga(this.tileGrid.fb(a));
      a = [a, b, c];
      b = (b = Zv(this, a)) ? Zv(this, b).toString() : "";
      e = new Lw(a, e, b);
      this.a.set(d, e);
      return e;
    };
    function Lw(a, b, c) {
      vs.call(this, a, 2);
      this.c = b;
      this.Fa = c;
      this.f = null;
    }
    u(Lw, vs);
    Lw.prototype.Z = function() {
      if (this.f)
        return this.f;
      var a = this.c,
          b = Xc(a[0], a[1]);
      b.strokeStyle = "black";
      b.strokeRect(.5, .5, a[0] + .5, a[1] + .5);
      b.fillStyle = "black";
      b.textAlign = "center";
      b.textBaseline = "middle";
      b.font = "24px sans-serif";
      b.fillText(this.Fa, a[0] / 2, a[1] / 2);
      return this.f = b.canvas;
    };
    Lw.prototype.load = function() {};
    function Mw(a) {
      this.i = null;
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        projection: Gb("EPSG:3857"),
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        state: "loading",
        tileLoadFunction: a.tileLoadFunction,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
      if (a.jsonp)
        Ov(a.url, this.di.bind(this), this.Le.bind(this));
      else {
        var b = new XMLHttpRequest;
        b.addEventListener("load", this.On.bind(this));
        b.addEventListener("error", this.Nn.bind(this));
        b.open("GET", a.url);
        b.send();
      }
    }
    u(Mw, W);
    k = Mw.prototype;
    k.On = function(a) {
      a = a.target;
      if (!a.status || 200 <= a.status && 300 > a.status) {
        var b;
        try {
          b = JSON.parse(a.responseText);
        } catch (c) {
          this.Le();
          return;
        }
        this.di(b);
      } else
        this.Le();
    };
    k.Nn = function() {
      this.Le();
    };
    k.Vk = function() {
      return this.i;
    };
    k.di = function(a) {
      var b = Gb("EPSG:4326"),
          c = this.c,
          d;
      if (a.bounds) {
        var e = Fb(b, c);
        d = ob(a.bounds, e);
      }
      var f = a.minzoom || 0,
          e = a.maxzoom || 22;
      this.tileGrid = c = mc({
        extent: kc(c),
        maxZoom: e,
        minZoom: f
      });
      this.tileUrlFunction = Rv(a.tiles, c);
      if (void 0 !== a.attribution && !this.l) {
        b = void 0 !== d ? d : b.D();
        d = {};
        for (var g; f <= e; ++f)
          g = f.toString(), d[g] = [cc(c, b, f)];
        this.ua([new nc({
          html: a.attribution,
          tileRanges: d
        })]);
      }
      this.i = a;
      It(this, "ready");
    };
    k.Le = function() {
      It(this, "error");
    };
    function Nw(a) {
      Xv.call(this, {
        projection: Gb("EPSG:3857"),
        state: "loading"
      });
      this.v = void 0 !== a.preemptive ? a.preemptive : !0;
      this.o = Tv;
      this.g = void 0;
      this.i = a.jsonp || !1;
      if (a.url)
        if (this.i)
          Ov(a.url, this.bg.bind(this), this.Me.bind(this));
        else {
          var b = new XMLHttpRequest;
          b.addEventListener("load", this.Sn.bind(this));
          b.addEventListener("error", this.Rn.bind(this));
          b.open("GET", a.url);
          b.send();
        }
      else
        a.tileJSON ? this.bg(a.tileJSON) : qa(!1, 51);
    }
    u(Nw, Xv);
    k = Nw.prototype;
    k.Sn = function(a) {
      a = a.target;
      if (!a.status || 200 <= a.status && 300 > a.status) {
        var b;
        try {
          b = JSON.parse(a.responseText);
        } catch (c) {
          this.Me();
          return;
        }
        this.bg(b);
      } else
        this.Me();
    };
    k.Rn = function() {
      this.Me();
    };
    k.Sk = function() {
      return this.g;
    };
    k.dk = function(a, b, c, d, e) {
      this.tileGrid ? (b = this.tileGrid.we(a, b), Ow(this.Lc(b[0], b[1], b[2], 1, this.c), a, c, d, e)) : !0 === e ? setTimeout(function() {
        c.call(d, null);
      }, 0) : c.call(d, null);
    };
    k.Me = function() {
      It(this, "error");
    };
    k.bg = function(a) {
      var b = Gb("EPSG:4326"),
          c = this.c,
          d;
      if (a.bounds) {
        var e = Fb(b, c);
        d = ob(a.bounds, e);
      }
      var f = a.minzoom || 0,
          e = a.maxzoom || 22;
      this.tileGrid = c = mc({
        extent: kc(c),
        maxZoom: e,
        minZoom: f
      });
      this.g = a.template;
      var g = a.grids;
      if (g) {
        this.o = Rv(g, c);
        if (void 0 !== a.attribution) {
          b = void 0 !== d ? d : b.D();
          for (d = {}; f <= e; ++f)
            g = f.toString(), d[g] = [cc(c, b, f)];
          this.ua([new nc({
            html: a.attribution,
            tileRanges: d
          })]);
        }
        It(this, "ready");
      } else
        It(this, "error");
    };
    k.Lc = function(a, b, c, d, e) {
      var f = this.Sb(a, b, c);
      if (this.a.b.hasOwnProperty(f))
        return this.a.get(f);
      a = [a, b, c];
      b = Zv(this, a, e);
      d = this.o(b, d, e);
      d = new Pw(a, void 0 !== d ? 0 : 4, void 0 !== d ? d : "", this.tileGrid.Ta(a), this.v, this.i);
      this.a.set(f, d);
      return d;
    };
    k.Eg = function(a, b, c) {
      a = this.Sb(a, b, c);
      this.a.b.hasOwnProperty(a) && this.a.get(a);
    };
    function Pw(a, b, c, d, e, f) {
      vs.call(this, a, b);
      this.o = c;
      this.f = d;
      this.I = e;
      this.c = this.j = this.g = null;
      this.v = f;
    }
    u(Pw, vs);
    k = Pw.prototype;
    k.Z = function() {
      return null;
    };
    k.getData = function(a) {
      if (!this.g || !this.j)
        return null;
      var b = this.g[Math.floor((1 - (a[1] - this.f[1]) / (this.f[3] - this.f[1])) * this.g.length)];
      if ("string" !== typeof b)
        return null;
      b = b.charCodeAt(Math.floor((a[0] - this.f[0]) / (this.f[2] - this.f[0]) * b.length));
      93 <= b && b--;
      35 <= b && b--;
      b -= 32;
      a = null;
      b in this.j && (b = this.j[b], this.c && b in this.c ? a = this.c[b] : a = b);
      return a;
    };
    function Ow(a, b, c, d, e) {
      0 == a.state && !0 === e ? (wc(a, "change", function() {
        c.call(d, this.getData(b));
      }, a), Qw(a)) : !0 === e ? setTimeout(function() {
        c.call(d, this.getData(b));
      }.bind(a), 0) : c.call(d, a.getData(b));
    }
    k.ib = function() {
      return this.o;
    };
    k.xe = function() {
      this.state = 3;
      this.s();
    };
    k.ei = function(a) {
      this.g = a.grid;
      this.j = a.keys;
      this.c = a.data;
      this.state = 4;
      this.s();
    };
    function Qw(a) {
      if (0 == a.state)
        if (a.state = 1, a.v)
          Ov(a.o, a.ei.bind(a), a.xe.bind(a));
        else {
          var b = new XMLHttpRequest;
          b.addEventListener("load", a.Qn.bind(a));
          b.addEventListener("error", a.Pn.bind(a));
          b.open("GET", a.o);
          b.send();
        }
    }
    k.Qn = function(a) {
      a = a.target;
      if (!a.status || 200 <= a.status && 300 > a.status) {
        var b;
        try {
          b = JSON.parse(a.responseText);
        } catch (c) {
          this.xe();
          return;
        }
        this.ei(b);
      } else
        this.xe();
    };
    k.Pn = function() {
      this.xe();
    };
    k.load = function() {
      this.I && Qw(this);
    };
    function Rw(a) {
      a = a || {};
      var b = a.params || {};
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        opaque: !("TRANSPARENT" in b ? b.TRANSPARENT : 1),
        projection: a.projection,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileGrid: a.tileGrid,
        tileLoadFunction: a.tileLoadFunction,
        url: a.url,
        urls: a.urls,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !0
      });
      this.u = void 0 !== a.gutter ? a.gutter : 0;
      this.i = b;
      this.o = !0;
      this.A = a.serverType;
      this.Y = void 0 !== a.hidpi ? a.hidpi : !0;
      this.S = "";
      Sw(this);
      this.ea = Ia();
      Tw(this);
      Yv(this, Uw(this));
    }
    u(Rw, W);
    k = Rw.prototype;
    k.Tn = function(a, b, c, d) {
      c = Gb(c);
      var e = this.tileGrid;
      e || (e = this.Ib(c));
      b = e.we(a, b);
      if (!(e.b.length <= b[0])) {
        var f = e.La(b[0]),
            g = e.Ta(b, this.ea),
            e = Ga(e.fb(b[0]), this.j),
            h = this.u;
        h && (e = Ea(e, h, this.j), g = Ka(g, f * h, g));
        h = {
          SERVICE: "WMS",
          VERSION: "1.3.0",
          REQUEST: "GetFeatureInfo",
          FORMAT: "image/png",
          TRANSPARENT: !0,
          QUERY_LAYERS: this.i.LAYERS
        };
        pb(h, this.i, d);
        d = Math.floor((g[3] - a[1]) / f);
        h[this.o ? "I" : "X"] = Math.floor((a[0] - g[0]) / f);
        h[this.o ? "J" : "Y"] = d;
        return Vw(this, b, e, g, 1, c, h);
      }
    };
    k.Kf = function() {
      return this.u;
    };
    k.Sb = function(a, b, c) {
      return this.S + W.prototype.Sb.call(this, a, b, c);
    };
    k.Un = function() {
      return this.i;
    };
    function Vw(a, b, c, d, e, f, g) {
      var h = a.urls;
      if (h) {
        g.WIDTH = c[0];
        g.HEIGHT = c[1];
        g[a.o ? "CRS" : "SRS"] = f.nb;
        "STYLES" in a.i || (g.STYLES = "");
        if (1 != e)
          switch (a.A) {
            case "geoserver":
              c = 90 * e + .5 | 0;
              g.FORMAT_OPTIONS = "FORMAT_OPTIONS" in g ? g.FORMAT_OPTIONS + (";dpi:" + c) : "dpi:" + c;
              break;
            case "mapserver":
              g.MAP_RESOLUTION = 90 * e;
              break;
            case "carmentaserver":
            case "qgis":
              g.DPI = 90 * e;
              break;
            default:
              qa(!1, 52);
          }
        f = f.b;
        a.o && "ne" == f.substr(0, 2) && (a = d[0], d[0] = d[1], d[1] = a, a = d[2], d[2] = d[3], d[3] = a);
        g.BBOX = d.join(",");
        return mw(1 == h.length ? h[0] : h[Ca((b[1] << b[0]) + b[2], h.length)], g);
      }
    }
    k.pb = function(a) {
      return this.Y && void 0 !== this.A ? a : 1;
    };
    function Sw(a) {
      var b = 0,
          c = [];
      if (a.urls) {
        var d,
            e;
        d = 0;
        for (e = a.urls.length; d < e; ++d)
          c[b++] = a.urls[d];
      }
      a.S = c.join("#");
    }
    function Uw(a) {
      var b = 0,
          c = [],
          d;
      for (d in a.i)
        c[b++] = d + "-" + a.i[d];
      return c.join("/");
    }
    k.Fc = function(a, b, c) {
      var d = this.tileGrid;
      d || (d = this.Ib(c));
      if (!(d.b.length <= a[0])) {
        1 == b || this.Y && void 0 !== this.A || (b = 1);
        var e = d.La(a[0]),
            f = d.Ta(a, this.ea),
            d = Ga(d.fb(a[0]), this.j),
            g = this.u;
        g && (d = Ea(d, g, this.j), f = Ka(f, e * g, f));
        1 != b && (d = Fa(d, b, this.j));
        e = {
          SERVICE: "WMS",
          VERSION: "1.3.0",
          REQUEST: "GetMap",
          FORMAT: "image/png",
          TRANSPARENT: !0
        };
        pb(e, this.i);
        return Vw(this, a, d, f, b, c, e);
      }
    };
    k.cb = function(a) {
      W.prototype.cb.call(this, a);
      Sw(this);
    };
    k.Vn = function(a) {
      pb(this.i, a);
      Sw(this);
      Tw(this);
      Yv(this, Uw(this));
    };
    function Tw(a) {
      a.o = 0 <= Pe(a.i.VERSION || "1.3.0");
    }
    ;
    function Ww(a, b, c, d, e) {
      vs.call(this, a, b);
      this.c = Xc();
      this.j = d;
      this.g = null;
      this.f = {
        Ld: !1,
        wg: null,
        af: -1,
        xg: -1,
        vd: null
      };
      this.I = e;
      this.o = c;
    }
    u(Ww, vs);
    k = Ww.prototype;
    k.Z = function() {
      return -1 == this.f.xg ? null : this.c.canvas;
    };
    k.rm = function() {
      return this.j;
    };
    k.ib = function() {
      return this.o;
    };
    k.load = function() {
      0 == this.state && (this.state = 1, this.s(), this.I(this, this.o), this.v(null, NaN, null));
    };
    k.po = function(a, b) {
      this.Xf(b);
      this.Hi(a);
    };
    k.oo = function() {
      this.state = 3;
      this.s();
    };
    k.Hi = function(a) {
      this.g = a;
      this.state = 2;
      this.s();
    };
    k.Xf = function(a) {
      this.l = a;
    };
    k.Mi = function(a) {
      this.v = a;
    };
    function Xw(a, b) {
      a.Mi(Al(b, a.j, a.po.bind(a), a.oo.bind(a)));
    }
    ;
    function Yw(a) {
      aw.call(this, {
        attributions: a.attributions,
        cacheSize: void 0 !== a.cacheSize ? a.cacheSize : 128,
        extent: a.extent,
        logo: a.logo,
        opaque: !1,
        projection: a.projection,
        state: a.state,
        tileGrid: a.tileGrid,
        tileLoadFunction: a.tileLoadFunction ? a.tileLoadFunction : Xw,
        tileUrlFunction: a.tileUrlFunction,
        tilePixelRatio: a.tilePixelRatio,
        url: a.url,
        urls: a.urls,
        wrapX: void 0 === a.wrapX ? !0 : a.wrapX
      });
      this.i = a.format ? a.format : null;
      this.g = void 0 == a.overlaps ? !0 : a.overlaps;
      this.tileClass = a.tileClass ? a.tileClass : Ww;
    }
    u(Yw, aw);
    Yw.prototype.Lc = function(a, b, c, d, e) {
      var f = this.Sb(a, b, c);
      if (this.a.b.hasOwnProperty(f))
        return this.a.get(f);
      a = [a, b, c];
      d = (b = Zv(this, a, e)) ? this.tileUrlFunction(b, d, e) : void 0;
      d = new this.tileClass(a, void 0 !== d ? 0 : 4, void 0 !== d ? d : "", this.i, this.tileLoadFunction);
      B(d, "change", this.gi, this);
      this.a.set(f, d);
      return d;
    };
    Yw.prototype.pb = function(a) {
      return void 0 == a ? aw.prototype.pb.call(this, a) : a;
    };
    Yw.prototype.Sd = function(a, b) {
      var c = Ga(this.tileGrid.fb(a));
      return [Math.round(c[0] * b), Math.round(c[1] * b)];
    };
    function Zw(a) {
      this.j = a.matrixIds;
      $b.call(this, {
        extent: a.extent,
        origin: a.origin,
        origins: a.origins,
        resolutions: a.resolutions,
        tileSize: a.tileSize,
        tileSizes: a.tileSizes,
        sizes: a.sizes
      });
    }
    u(Zw, $b);
    Zw.prototype.o = function() {
      return this.j;
    };
    function $w(a, b, c) {
      var d = [],
          e = [],
          f = [],
          g = [],
          h = [],
          l = void 0 !== c ? c : [];
      c = Gb(a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"));
      var m = c.sc(),
          p = "ne" == c.b.substr(0, 2);
      a.TileMatrix.sort(function(a, b) {
        return b.ScaleDenominator - a.ScaleDenominator;
      });
      a.TileMatrix.forEach(function(a) {
        var b;
        0 < l.length ? b = ha(l, function(b) {
          return a.Identifier == b.TileMatrix;
        }) : b = !0;
        if (b) {
          e.push(a.Identifier);
          b = 2.8E-4 * a.ScaleDenominator / m;
          var c = a.TileWidth,
              n = a.TileHeight;
          p ? f.push([a.TopLeftCorner[1], a.TopLeftCorner[0]]) : f.push(a.TopLeftCorner);
          d.push(b);
          g.push(c == n ? c : [c, n]);
          h.push([a.MatrixWidth, -a.MatrixHeight]);
        }
      });
      return new Zw({
        extent: b,
        origins: f,
        resolutions: d,
        matrixIds: e,
        tileSizes: g,
        sizes: h
      });
    }
    ;
    function Y(a) {
      function b(a) {
        a = "KVP" == d ? mw(a, f) : a.replace(/\{(\w+?)\}/g, function(a, b) {
          return b.toLowerCase() in f ? f[b.toLowerCase()] : a;
        });
        return function(b) {
          if (b) {
            var c = {
              TileMatrix: e.j[b[0]],
              TileCol: b[1],
              TileRow: -b[2] - 1
            };
            pb(c, g);
            b = a;
            return b = "KVP" == d ? mw(b, c) : b.replace(/\{(\w+?)\}/g, function(a, b) {
              return c[b];
            });
          }
        };
      }
      this.ea = void 0 !== a.version ? a.version : "1.0.0";
      this.u = void 0 !== a.format ? a.format : "image/jpeg";
      this.i = a.dimensions ? a.dimensions : {};
      this.A = a.layer;
      this.o = a.matrixSet;
      this.S = a.style;
      var c = a.urls;
      void 0 === c && void 0 !== a.url && (c = Uv(a.url));
      var d = this.Y = void 0 !== a.requestEncoding ? a.requestEncoding : "KVP",
          e = a.tileGrid,
          f = {
            layer: this.A,
            style: this.S,
            tilematrixset: this.o
          };
      "KVP" == d && pb(f, {
        Service: "WMTS",
        Request: "GetTile",
        Version: this.ea,
        Format: this.u
      });
      var g = this.i,
          h = c && 0 < c.length ? Sv(c.map(b)) : Tv;
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        projection: a.projection,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileClass: a.tileClass,
        tileGrid: e,
        tileLoadFunction: a.tileLoadFunction,
        tilePixelRatio: a.tilePixelRatio,
        tileUrlFunction: h,
        urls: c,
        wrapX: void 0 !== a.wrapX ? a.wrapX : !1
      });
      Yv(this, ax(this));
    }
    u(Y, W);
    k = Y.prototype;
    k.rk = function() {
      return this.i;
    };
    k.Wn = function() {
      return this.u;
    };
    k.Xn = function() {
      return this.A;
    };
    k.Fk = function() {
      return this.o;
    };
    k.Qk = function() {
      return this.Y;
    };
    k.Yn = function() {
      return this.S;
    };
    k.Xk = function() {
      return this.ea;
    };
    function ax(a) {
      var b = 0,
          c = [],
          d;
      for (d in a.i)
        c[b++] = d + "-" + a.i[d];
      return c.join("/");
    }
    k.Gp = function(a) {
      pb(this.i, a);
      Yv(this, ax(this));
    };
    function bx(a) {
      a = a || {};
      var b = a.size,
          c = b[0],
          d = b[1],
          e = [],
          f = 256;
      switch (void 0 !== a.tierSizeCalculation ? a.tierSizeCalculation : cx) {
        case cx:
          for (; c > f || d > f; )
            e.push([Math.ceil(c / f), Math.ceil(d / f)]), f += f;
          break;
        case dx:
          for (; c > f || d > f; )
            e.push([Math.ceil(c / f), Math.ceil(d / f)]), c >>= 1, d >>= 1;
          break;
        default:
          qa(!1, 53);
      }
      e.push([1, 1]);
      e.reverse();
      for (var f = [1],
          g = [0],
          d = 1,
          c = e.length; d < c; d++)
        f.push(1 << d), g.push(e[d - 1][0] * e[d - 1][1] + g[d - 1]);
      f.reverse();
      b = [0, -b[1], b[0], 0];
      b = new $b({
        extent: b,
        origin: eb(b),
        resolutions: f
      });
      (f = a.url) && -1 == f.indexOf("{TileGroup}") && (f += "{TileGroup}/{z}-{x}-{y}.jpg");
      f = Uv(f);
      f = Sv(f.map(function(a) {
        return function(b) {
          if (b) {
            var c = b[0],
                d = b[1];
            b = -b[2] - 1;
            var f = {
              z: c,
              x: d,
              y: b,
              TileGroup: "TileGroup" + ((d + b * e[c][0] + g[c]) / 256 | 0)
            };
            return a.replace(/\{(\w+?)\}/g, function(a, b) {
              return f[b];
            });
          }
        };
      }));
      W.call(this, {
        attributions: a.attributions,
        cacheSize: a.cacheSize,
        crossOrigin: a.crossOrigin,
        logo: a.logo,
        projection: a.projection,
        reprojectionErrorThreshold: a.reprojectionErrorThreshold,
        tileClass: ex,
        tileGrid: b,
        tileUrlFunction: f
      });
    }
    u(bx, W);
    function ex(a, b, c, d, e) {
      xs.call(this, a, b, c, d, e);
      this.f = null;
    }
    u(ex, xs);
    ex.prototype.Z = function() {
      if (this.f)
        return this.f;
      var a = xs.prototype.Z.call(this);
      if (2 == this.state) {
        if (256 == a.width && 256 == a.height)
          return this.f = a;
        var b = Xc(256, 256);
        b.drawImage(a, 0, 0);
        return this.f = b.canvas;
      }
      return a;
    };
    var cx = "default",
        dx = "truncated";
    function fx(a, b) {
      this.b = b;
      this.a = [{
        x: 0,
        y: 0,
        width: a,
        height: a
      }];
      this.c = {};
      this.f = Xc(a, a);
      this.i = this.f.canvas;
    }
    fx.prototype.get = function(a) {
      return this.c[a] || null;
    };
    fx.prototype.add = function(a, b, c, d, e) {
      var f,
          g,
          h;
      g = 0;
      for (h = this.a.length; g < h; ++g)
        if (f = this.a[g], f.width >= b + this.b && f.height >= c + this.b)
          return h = {
            offsetX: f.x + this.b,
            offsetY: f.y + this.b,
            image: this.i
          }, this.c[a] = h, d.call(e, this.f, f.x + this.b, f.y + this.b), a = g, b += this.b, d = c + this.b, f.width - b > f.height - d ? (c = {
            x: f.x + b,
            y: f.y,
            width: f.width - b,
            height: f.height
          }, b = {
            x: f.x,
            y: f.y + d,
            width: b,
            height: f.height - d
          }, gx(this, a, c, b)) : (c = {
            x: f.x + b,
            y: f.y,
            width: f.width - b,
            height: d
          }, b = {
            x: f.x,
            y: f.y + d,
            width: f.width,
            height: f.height - d
          }, gx(this, a, c, b)), h;
      return null;
    };
    function gx(a, b, c, d) {
      b = [b, 1];
      0 < c.width && 0 < c.height && b.push(c);
      0 < d.width && 0 < d.height && b.push(d);
      a.a.splice.apply(a.a, b);
    }
    ;
    function hx(a) {
      a = a || {};
      this.a = void 0 !== a.initialSize ? a.initialSize : 256;
      this.f = void 0 !== a.maxSize ? a.maxSize : void 0 !== ba ? ba : 2048;
      this.b = void 0 !== a.space ? a.space : 1;
      this.i = [new fx(this.a, this.b)];
      this.c = this.a;
      this.g = [new fx(this.c, this.b)];
    }
    hx.prototype.add = function(a, b, c, d, e, f) {
      if (b + this.b > this.f || c + this.b > this.f)
        return null;
      d = ix(this, !1, a, b, c, d, f);
      if (!d)
        return null;
      a = ix(this, !0, a, b, c, e ? e : na, f);
      return {
        offsetX: d.offsetX,
        offsetY: d.offsetY,
        image: d.image,
        Fl: a.image
      };
    };
    function ix(a, b, c, d, e, f, g) {
      var h = b ? a.g : a.i,
          l,
          m,
          p;
      m = 0;
      for (p = h.length; m < p; ++m) {
        l = h[m];
        if (l = l.add(c, d, e, f, g))
          return l;
        l || m !== p - 1 || (b ? (l = Math.min(2 * a.c, a.f), a.c = l) : (l = Math.min(2 * a.a, a.f), a.a = l), l = new fx(l, a.b), h.push(l), ++p);
      }
      return null;
    }
    ;
    pa.prototype.code = pa.prototype.code;
    t("ol.Attribution", nc);
    nc.prototype.getHTML = nc.prototype.f;
    t("ol.Collection", D);
    D.prototype.clear = D.prototype.clear;
    D.prototype.extend = D.prototype.Tf;
    D.prototype.forEach = D.prototype.forEach;
    D.prototype.getArray = D.prototype.am;
    D.prototype.item = D.prototype.item;
    D.prototype.getLength = D.prototype.ec;
    D.prototype.insertAt = D.prototype.Be;
    D.prototype.pop = D.prototype.pop;
    D.prototype.push = D.prototype.push;
    D.prototype.remove = D.prototype.remove;
    D.prototype.removeAt = D.prototype.tg;
    D.prototype.setAt = D.prototype.mp;
    Nc.prototype.element = Nc.prototype.element;
    t("ol.color.asArray", Qc);
    t("ol.color.asString", Sc);
    t("ol.colorlike.asColorLike", Vc);
    t("ol.control.defaults", nd);
    t("ol.coordinate.add", Qe);
    t("ol.coordinate.createStringXY", function(a) {
      return function(b) {
        return $e(b, a);
      };
    });
    t("ol.coordinate.format", Te);
    t("ol.coordinate.rotate", Ve);
    t("ol.coordinate.toStringHDMS", function(a, b) {
      return a ? Se(a[1], "NS", b) + " " + Se(a[0], "EW", b) : "";
    });
    t("ol.coordinate.toStringXY", $e);
    t("ol.DeviceOrientation", Pk);
    Pk.prototype.getAlpha = Pk.prototype.jk;
    Pk.prototype.getBeta = Pk.prototype.mk;
    Pk.prototype.getGamma = Pk.prototype.uk;
    Pk.prototype.getHeading = Pk.prototype.bm;
    Pk.prototype.getTracking = Pk.prototype.Fh;
    Pk.prototype.setTracking = Pk.prototype.Uf;
    t("ol.easing.easeIn", ed);
    t("ol.easing.easeOut", fd);
    t("ol.easing.inAndOut", gd);
    t("ol.easing.linear", hd);
    t("ol.easing.upAndDown", function(a) {
      return .5 > a ? gd(2 * a) : 1 - gd(2 * (a - .5));
    });
    t("ol.extent.boundingExtent", Ha);
    t("ol.extent.buffer", Ka);
    t("ol.extent.containsCoordinate", Qa);
    t("ol.extent.containsExtent", Ta);
    t("ol.extent.containsXY", Sa);
    t("ol.extent.createEmpty", Ia);
    t("ol.extent.equals", Za);
    t("ol.extent.extend", $a);
    t("ol.extent.getBottomLeft", bb);
    t("ol.extent.getBottomRight", cb);
    t("ol.extent.getCenter", jb);
    t("ol.extent.getHeight", ib);
    t("ol.extent.getIntersection", lb);
    t("ol.extent.getSize", function(a) {
      return [a[2] - a[0], a[3] - a[1]];
    });
    t("ol.extent.getTopLeft", eb);
    t("ol.extent.getTopRight", db);
    t("ol.extent.getWidth", hb);
    t("ol.extent.intersects", mb);
    t("ol.extent.isEmpty", gb);
    t("ol.extent.applyTransform", ob);
    t("ol.Feature", H);
    H.prototype.clone = H.prototype.clone;
    H.prototype.getGeometry = H.prototype.U;
    H.prototype.getId = H.prototype.dm;
    H.prototype.getGeometryName = H.prototype.wk;
    H.prototype.getStyle = H.prototype.em;
    H.prototype.getStyleFunction = H.prototype.Nc;
    H.prototype.setGeometry = H.prototype.Sa;
    H.prototype.setStyle = H.prototype.Vf;
    H.prototype.setId = H.prototype.kc;
    H.prototype.setGeometryName = H.prototype.Vc;
    t("ol.featureloader.xhr", Bl);
    t("ol.Geolocation", hs);
    hs.prototype.getAccuracy = hs.prototype.hk;
    hs.prototype.getAccuracyGeometry = hs.prototype.ik;
    hs.prototype.getAltitude = hs.prototype.kk;
    hs.prototype.getAltitudeAccuracy = hs.prototype.lk;
    hs.prototype.getHeading = hs.prototype.fm;
    hs.prototype.getPosition = hs.prototype.gm;
    hs.prototype.getProjection = hs.prototype.Gh;
    hs.prototype.getSpeed = hs.prototype.Rk;
    hs.prototype.getTracking = hs.prototype.Hh;
    hs.prototype.getTrackingOptions = hs.prototype.th;
    hs.prototype.setProjection = hs.prototype.Ih;
    hs.prototype.setTracking = hs.prototype.Ee;
    hs.prototype.setTrackingOptions = hs.prototype.Si;
    t("ol.Graticule", ns);
    ns.prototype.getMap = ns.prototype.jm;
    ns.prototype.getMeridians = ns.prototype.Gk;
    ns.prototype.getParallels = ns.prototype.Nk;
    ns.prototype.setMap = ns.prototype.setMap;
    t("ol.has.DEVICE_PIXEL_RATIO", Kd);
    t("ol.has.CANVAS", Md);
    t("ol.has.DEVICE_ORIENTATION", Nd);
    t("ol.has.GEOLOCATION", Od);
    t("ol.has.TOUCH", Pd);
    t("ol.has.WEBGL", Ed);
    ts.prototype.getImage = ts.prototype.Z;
    ts.prototype.load = ts.prototype.load;
    xs.prototype.getImage = xs.prototype.Z;
    t("ol.inherits", u);
    t("ol.interaction.defaults", ch);
    t("ol.Kinetic", Zf);
    t("ol.loadingstrategy.all", Ft);
    t("ol.loadingstrategy.bbox", function(a) {
      return [a];
    });
    t("ol.loadingstrategy.tile", function(a) {
      return function(b, c) {
        var d = a.Mc(c),
            e = cc(a, b, d),
            f = [],
            d = [d, 0, 0];
        for (d[1] = e.da; d[1] <= e.ba; ++d[1])
          for (d[2] = e.fa; d[2] <= e.ja; ++d[2])
            f.push(a.Ta(d));
        return f;
      };
    });
    t("ol.Map", G);
    G.prototype.addControl = G.prototype.Rj;
    G.prototype.addInteraction = G.prototype.Sj;
    G.prototype.addLayer = G.prototype.Sg;
    G.prototype.addOverlay = G.prototype.Tg;
    G.prototype.forEachFeatureAtPixel = G.prototype.re;
    G.prototype.forEachLayerAtPixel = G.prototype.pm;
    G.prototype.hasFeatureAtPixel = G.prototype.El;
    G.prototype.getEventCoordinate = G.prototype.sk;
    G.prototype.getEventPixel = G.prototype.te;
    G.prototype.getTarget = G.prototype.Of;
    G.prototype.getTargetElement = G.prototype.Kc;
    G.prototype.getCoordinateFromPixel = G.prototype.Za;
    G.prototype.getControls = G.prototype.qk;
    G.prototype.getOverlays = G.prototype.Lk;
    G.prototype.getOverlayById = G.prototype.Kk;
    G.prototype.getInteractions = G.prototype.xk;
    G.prototype.getLayerGroup = G.prototype.Jc;
    G.prototype.getLayers = G.prototype.Jh;
    G.prototype.getPixelFromCoordinate = G.prototype.Ka;
    G.prototype.getSize = G.prototype.Mb;
    G.prototype.getView = G.prototype.$;
    G.prototype.getViewport = G.prototype.Yk;
    G.prototype.renderSync = G.prototype.ip;
    G.prototype.render = G.prototype.render;
    G.prototype.removeControl = G.prototype.ap;
    G.prototype.removeInteraction = G.prototype.bp;
    G.prototype.removeLayer = G.prototype.ep;
    G.prototype.removeOverlay = G.prototype.fp;
    G.prototype.setLayerGroup = G.prototype.Li;
    G.prototype.setSize = G.prototype.Ag;
    G.prototype.setTarget = G.prototype.Fe;
    G.prototype.setView = G.prototype.vp;
    G.prototype.updateSize = G.prototype.xd;
    zd.prototype.originalEvent = zd.prototype.originalEvent;
    zd.prototype.pixel = zd.prototype.pixel;
    zd.prototype.coordinate = zd.prototype.coordinate;
    zd.prototype.dragging = zd.prototype.dragging;
    yd.prototype.map = yd.prototype.map;
    yd.prototype.frameState = yd.prototype.frameState;
    t("ol.Object", Gc);
    Gc.prototype.get = Gc.prototype.get;
    Gc.prototype.getKeys = Gc.prototype.O;
    Gc.prototype.getProperties = Gc.prototype.N;
    Gc.prototype.set = Gc.prototype.set;
    Gc.prototype.setProperties = Gc.prototype.H;
    Gc.prototype.unset = Gc.prototype.P;
    Kc.prototype.key = Kc.prototype.key;
    Kc.prototype.oldValue = Kc.prototype.oldValue;
    t("ol.Observable", Fc);
    t("ol.Observable.unByKey", function(a) {
      if (Array.isArray(a))
        for (var b = 0,
            c = a.length; b < c; ++b)
          rc(a[b]);
      else
        rc(a);
    });
    Fc.prototype.changed = Fc.prototype.s;
    Fc.prototype.dispatchEvent = Fc.prototype.b;
    Fc.prototype.getRevision = Fc.prototype.L;
    Fc.prototype.on = Fc.prototype.J;
    Fc.prototype.once = Fc.prototype.once;
    Fc.prototype.un = Fc.prototype.K;
    t("ol.Overlay", qk);
    qk.prototype.getElement = qk.prototype.se;
    qk.prototype.getId = qk.prototype.qm;
    qk.prototype.getMap = qk.prototype.Ge;
    qk.prototype.getOffset = qk.prototype.qh;
    qk.prototype.getPosition = qk.prototype.Kh;
    qk.prototype.getPositioning = qk.prototype.rh;
    qk.prototype.setElement = qk.prototype.Gi;
    qk.prototype.setMap = qk.prototype.setMap;
    qk.prototype.setOffset = qk.prototype.Ni;
    qk.prototype.setPosition = qk.prototype.Wf;
    qk.prototype.setPositioning = qk.prototype.Qi;
    t("ol.proj.METERS_PER_UNIT", vb);
    t("ol.proj.setProj4", function(a) {
      wb = a;
    });
    t("ol.proj.getPointResolution", Eb);
    t("ol.proj.addEquivalentProjections", Hb);
    t("ol.proj.addProjection", Pb);
    t("ol.proj.addCoordinateTransforms", Rb);
    t("ol.proj.fromLonLat", function(a, b) {
      return Wb(a, "EPSG:4326", void 0 !== b ? b : "EPSG:3857");
    });
    t("ol.proj.toLonLat", function(a, b) {
      return Wb(a, void 0 !== b ? b : "EPSG:3857", "EPSG:4326");
    });
    t("ol.proj.get", Gb);
    t("ol.proj.equivalent", Tb);
    t("ol.proj.getTransform", Ub);
    t("ol.proj.transform", Wb);
    t("ol.proj.transformExtent", Xb);
    t("ol.render.toContext", function(a, b) {
      var c = a.canvas,
          d = b ? b : {},
          e = d.pixelRatio || Kd;
      if (d = d.size)
        c.width = d[0] * e, c.height = d[1] * e, c.style.width = d[0] + "px", c.style.height = d[1] + "px";
      c = [0, 0, c.width, c.height];
      d = Dh(wh(), e, e);
      return new Sh(a, e, c, d, 0);
    });
    t("ol.size.toSize", Ga);
    t("ol.Sphere", tb);
    tb.prototype.geodesicArea = tb.prototype.a;
    tb.prototype.haversineDistance = tb.prototype.b;
    vs.prototype.getTileCoord = vs.prototype.i;
    vs.prototype.load = vs.prototype.load;
    t("ol.tilegrid.createXYZ", mc);
    Ww.prototype.getFormat = Ww.prototype.rm;
    Ww.prototype.setFeatures = Ww.prototype.Hi;
    Ww.prototype.setProjection = Ww.prototype.Xf;
    Ww.prototype.setLoader = Ww.prototype.Mi;
    t("ol.View", Qf);
    Qf.prototype.animate = Qf.prototype.animate;
    Qf.prototype.constrainCenter = Qf.prototype.Ec;
    Qf.prototype.constrainResolution = Qf.prototype.constrainResolution;
    Qf.prototype.constrainRotation = Qf.prototype.constrainRotation;
    Qf.prototype.getCenter = Qf.prototype.Ba;
    Qf.prototype.calculateExtent = Qf.prototype.ed;
    Qf.prototype.getMaxResolution = Qf.prototype.sm;
    Qf.prototype.getMinResolution = Qf.prototype.tm;
    Qf.prototype.getProjection = Qf.prototype.um;
    Qf.prototype.getResolution = Qf.prototype.Ua;
    Qf.prototype.getResolutions = Qf.prototype.vm;
    Qf.prototype.getRotation = Qf.prototype.Va;
    Qf.prototype.getZoom = Qf.prototype.$k;
    Qf.prototype.fit = Qf.prototype.Ff;
    Qf.prototype.centerOn = Qf.prototype.$j;
    Qf.prototype.rotate = Qf.prototype.rotate;
    Qf.prototype.setCenter = Qf.prototype.wb;
    Qf.prototype.setResolution = Qf.prototype.Xc;
    Qf.prototype.setRotation = Qf.prototype.He;
    Qf.prototype.setZoom = Qf.prototype.yp;
    t("ol.xml.getAllTextContent", jl);
    t("ol.xml.parse", nl);
    Ji.prototype.getGL = Ji.prototype.lo;
    Ji.prototype.useProgram = Ji.prototype.Rc;
    t("ol.tilegrid.TileGrid", $b);
    $b.prototype.forEachTileCoord = $b.prototype.eh;
    $b.prototype.getMaxZoom = $b.prototype.oh;
    $b.prototype.getMinZoom = $b.prototype.ph;
    $b.prototype.getOrigin = $b.prototype.Qc;
    $b.prototype.getResolution = $b.prototype.La;
    $b.prototype.getResolutions = $b.prototype.oi;
    $b.prototype.getTileCoordExtent = $b.prototype.Ta;
    $b.prototype.getTileCoordForCoordAndResolution = $b.prototype.we;
    $b.prototype.getTileCoordForCoordAndZ = $b.prototype.Pf;
    $b.prototype.getTileSize = $b.prototype.fb;
    $b.prototype.getZForResolution = $b.prototype.Mc;
    t("ol.tilegrid.WMTS", Zw);
    Zw.prototype.getMatrixIds = Zw.prototype.o;
    t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet", $w);
    t("ol.style.AtlasManager", hx);
    t("ol.style.Circle", Yk);
    Yk.prototype.setRadius = Yk.prototype.Wc;
    t("ol.style.Fill", Zk);
    Zk.prototype.clone = Zk.prototype.clone;
    Zk.prototype.getColor = Zk.prototype.f;
    Zk.prototype.setColor = Zk.prototype.c;
    t("ol.style.Icon", Rn);
    Rn.prototype.clone = Rn.prototype.clone;
    Rn.prototype.getAnchor = Rn.prototype.Hc;
    Rn.prototype.getColor = Rn.prototype.Zn;
    Rn.prototype.getImage = Rn.prototype.Z;
    Rn.prototype.getOrigin = Rn.prototype.Pc;
    Rn.prototype.getSrc = Rn.prototype.$n;
    Rn.prototype.getSize = Rn.prototype.jc;
    Rn.prototype.load = Rn.prototype.load;
    t("ol.style.Image", Vk);
    Vk.prototype.getOpacity = Vk.prototype.Pe;
    Vk.prototype.getRotateWithView = Vk.prototype.Qe;
    Vk.prototype.getRotation = Vk.prototype.Re;
    Vk.prototype.getScale = Vk.prototype.Se;
    Vk.prototype.getSnapToPixel = Vk.prototype.ve;
    Vk.prototype.setOpacity = Vk.prototype.rd;
    Vk.prototype.setRotation = Vk.prototype.Te;
    Vk.prototype.setScale = Vk.prototype.sd;
    t("ol.style.RegularShape", Wk);
    Wk.prototype.clone = Wk.prototype.clone;
    Wk.prototype.getAnchor = Wk.prototype.Hc;
    Wk.prototype.getAngle = Wk.prototype.ki;
    Wk.prototype.getFill = Wk.prototype.Ca;
    Wk.prototype.getImage = Wk.prototype.Z;
    Wk.prototype.getOrigin = Wk.prototype.Pc;
    Wk.prototype.getPoints = Wk.prototype.li;
    Wk.prototype.getRadius = Wk.prototype.mi;
    Wk.prototype.getRadius2 = Wk.prototype.sh;
    Wk.prototype.getSize = Wk.prototype.jc;
    Wk.prototype.getStroke = Wk.prototype.Da;
    t("ol.style.Stroke", rj);
    rj.prototype.clone = rj.prototype.clone;
    rj.prototype.getColor = rj.prototype.ao;
    rj.prototype.getLineCap = rj.prototype.Ak;
    rj.prototype.getLineDash = rj.prototype.bo;
    rj.prototype.getLineDashOffset = rj.prototype.Bk;
    rj.prototype.getLineJoin = rj.prototype.Ck;
    rj.prototype.getMiterLimit = rj.prototype.Hk;
    rj.prototype.getWidth = rj.prototype.co;
    rj.prototype.setColor = rj.prototype.eo;
    rj.prototype.setLineCap = rj.prototype.qp;
    rj.prototype.setLineDash = rj.prototype.setLineDash;
    rj.prototype.setLineDashOffset = rj.prototype.rp;
    rj.prototype.setLineJoin = rj.prototype.sp;
    rj.prototype.setMiterLimit = rj.prototype.tp;
    rj.prototype.setWidth = rj.prototype.wp;
    t("ol.style.Style", $k);
    $k.prototype.clone = $k.prototype.clone;
    $k.prototype.getGeometry = $k.prototype.U;
    $k.prototype.getGeometryFunction = $k.prototype.vk;
    $k.prototype.getFill = $k.prototype.Ca;
    $k.prototype.setFill = $k.prototype.cf;
    $k.prototype.getImage = $k.prototype.Z;
    $k.prototype.setImage = $k.prototype.zg;
    $k.prototype.getStroke = $k.prototype.Da;
    $k.prototype.setStroke = $k.prototype.df;
    $k.prototype.getText = $k.prototype.Pa;
    $k.prototype.setText = $k.prototype.ef;
    $k.prototype.getZIndex = $k.prototype.za;
    $k.prototype.setGeometry = $k.prototype.Sa;
    $k.prototype.setZIndex = $k.prototype.Wb;
    t("ol.style.Text", Sn);
    Sn.prototype.clone = Sn.prototype.clone;
    Sn.prototype.getFont = Sn.prototype.tk;
    Sn.prototype.getOffsetX = Sn.prototype.Ik;
    Sn.prototype.getOffsetY = Sn.prototype.Jk;
    Sn.prototype.getFill = Sn.prototype.Ca;
    Sn.prototype.getRotateWithView = Sn.prototype.fo;
    Sn.prototype.getRotation = Sn.prototype.ho;
    Sn.prototype.getScale = Sn.prototype.io;
    Sn.prototype.getStroke = Sn.prototype.Da;
    Sn.prototype.getText = Sn.prototype.Pa;
    Sn.prototype.getTextAlign = Sn.prototype.Tk;
    Sn.prototype.getTextBaseline = Sn.prototype.Uk;
    Sn.prototype.setFont = Sn.prototype.Ii;
    Sn.prototype.setOffsetX = Sn.prototype.Oi;
    Sn.prototype.setOffsetY = Sn.prototype.Pi;
    Sn.prototype.setFill = Sn.prototype.cf;
    Sn.prototype.setRotation = Sn.prototype.jo;
    Sn.prototype.setScale = Sn.prototype.ni;
    Sn.prototype.setStroke = Sn.prototype.df;
    Sn.prototype.setText = Sn.prototype.ef;
    Sn.prototype.setTextAlign = Sn.prototype.Ri;
    Sn.prototype.setTextBaseline = Sn.prototype.up;
    t("ol.source.BingMaps", ew);
    t("ol.source.BingMaps.TOS_ATTRIBUTION", fw);
    ew.prototype.getApiKey = ew.prototype.Y;
    ew.prototype.getImagerySet = ew.prototype.ea;
    t("ol.source.CartoDB", hw);
    hw.prototype.getConfig = hw.prototype.pk;
    hw.prototype.updateConfig = hw.prototype.Fp;
    hw.prototype.setConfig = hw.prototype.np;
    t("ol.source.Cluster", X);
    X.prototype.getSource = X.prototype.lb;
    X.prototype.setDistance = X.prototype.mb;
    t("ol.source.Image", lv);
    nv.prototype.image = nv.prototype.image;
    t("ol.source.ImageArcGISRest", nw);
    nw.prototype.getParams = nw.prototype.rn;
    nw.prototype.getImageLoadFunction = nw.prototype.qn;
    nw.prototype.getUrl = nw.prototype.sn;
    nw.prototype.setImageLoadFunction = nw.prototype.tn;
    nw.prototype.setUrl = nw.prototype.vn;
    nw.prototype.updateParams = nw.prototype.wn;
    t("ol.source.ImageCanvas", sv);
    t("ol.source.ImageMapGuide", ow);
    ow.prototype.getParams = ow.prototype.yn;
    ow.prototype.getImageLoadFunction = ow.prototype.xn;
    ow.prototype.updateParams = ow.prototype.An;
    ow.prototype.setImageLoadFunction = ow.prototype.zn;
    t("ol.source.ImageStatic", pw);
    t("ol.source.ImageVector", tv);
    tv.prototype.getSource = tv.prototype.Bn;
    tv.prototype.getStyle = tv.prototype.Cn;
    tv.prototype.getStyleFunction = tv.prototype.Dn;
    tv.prototype.setStyle = tv.prototype.ci;
    t("ol.source.ImageWMS", qw);
    qw.prototype.getGetFeatureInfoUrl = qw.prototype.Gn;
    qw.prototype.getParams = qw.prototype.In;
    qw.prototype.getImageLoadFunction = qw.prototype.Hn;
    qw.prototype.getUrl = qw.prototype.Jn;
    qw.prototype.setImageLoadFunction = qw.prototype.Kn;
    qw.prototype.setUrl = qw.prototype.Ln;
    qw.prototype.updateParams = qw.prototype.Mn;
    t("ol.source.OSM", uw);
    t("ol.source.OSM.ATTRIBUTION", vw);
    t("ol.source.Raster", ww);
    ww.prototype.setOperation = ww.prototype.A;
    Bw.prototype.extent = Bw.prototype.extent;
    Bw.prototype.resolution = Bw.prototype.resolution;
    Bw.prototype.data = Bw.prototype.data;
    t("ol.source.Source", Gt);
    Gt.prototype.getAttributions = Gt.prototype.xa;
    Gt.prototype.getLogo = Gt.prototype.wa;
    Gt.prototype.getProjection = Gt.prototype.ya;
    Gt.prototype.getState = Gt.prototype.V;
    Gt.prototype.refresh = Gt.prototype.va;
    Gt.prototype.setAttributions = Gt.prototype.ua;
    t("ol.source.Stamen", Ew);
    t("ol.source.Tile", Xv);
    Xv.prototype.getTileGrid = Xv.prototype.ab;
    $v.prototype.tile = $v.prototype.tile;
    t("ol.source.TileArcGISRest", Iw);
    Iw.prototype.getParams = Iw.prototype.u;
    Iw.prototype.updateParams = Iw.prototype.A;
    t("ol.source.TileDebug", Kw);
    t("ol.source.TileImage", W);
    W.prototype.setRenderReprojectionEdges = W.prototype.Nb;
    W.prototype.setTileGridForProjection = W.prototype.Ob;
    t("ol.source.TileJSON", Mw);
    Mw.prototype.getTileJSON = Mw.prototype.Vk;
    t("ol.source.TileUTFGrid", Nw);
    Nw.prototype.getTemplate = Nw.prototype.Sk;
    Nw.prototype.forDataAtCoordinateAndResolution = Nw.prototype.dk;
    t("ol.source.TileWMS", Rw);
    Rw.prototype.getGetFeatureInfoUrl = Rw.prototype.Tn;
    Rw.prototype.getParams = Rw.prototype.Un;
    Rw.prototype.updateParams = Rw.prototype.Vn;
    aw.prototype.getTileLoadFunction = aw.prototype.ob;
    aw.prototype.getTileUrlFunction = aw.prototype.qb;
    aw.prototype.getUrls = aw.prototype.rb;
    aw.prototype.setTileLoadFunction = aw.prototype.xb;
    aw.prototype.setTileUrlFunction = aw.prototype.bb;
    aw.prototype.setUrl = aw.prototype.jb;
    aw.prototype.setUrls = aw.prototype.cb;
    t("ol.source.Vector", S);
    S.prototype.addFeature = S.prototype.zb;
    S.prototype.addFeatures = S.prototype.dd;
    S.prototype.clear = S.prototype.clear;
    S.prototype.forEachFeature = S.prototype.bh;
    S.prototype.forEachFeatureInExtent = S.prototype.ac;
    S.prototype.forEachFeatureIntersectingExtent = S.prototype.dh;
    S.prototype.getFeaturesCollection = S.prototype.lh;
    S.prototype.getFeatures = S.prototype.Ne;
    S.prototype.getFeaturesAtCoordinate = S.prototype.kh;
    S.prototype.getFeaturesInExtent = S.prototype.Hf;
    S.prototype.getClosestFeatureToCoordinate = S.prototype.gh;
    S.prototype.getExtent = S.prototype.D;
    S.prototype.getFeatureById = S.prototype.jh;
    S.prototype.getFormat = S.prototype.hi;
    S.prototype.getUrl = S.prototype.ii;
    S.prototype.removeFeature = S.prototype.Db;
    Nt.prototype.feature = Nt.prototype.feature;
    t("ol.source.VectorTile", Yw);
    t("ol.source.WMTS", Y);
    Y.prototype.getDimensions = Y.prototype.rk;
    Y.prototype.getFormat = Y.prototype.Wn;
    Y.prototype.getLayer = Y.prototype.Xn;
    Y.prototype.getMatrixSet = Y.prototype.Fk;
    Y.prototype.getRequestEncoding = Y.prototype.Qk;
    Y.prototype.getStyle = Y.prototype.Yn;
    Y.prototype.getVersion = Y.prototype.Xk;
    Y.prototype.updateDimensions = Y.prototype.Gp;
    t("ol.source.WMTS.optionsFromCapabilities", function(a, b) {
      var c = ha(a.Contents.Layer, function(a) {
        return a.Identifier == b.layer;
      }),
          d = a.Contents.TileMatrixSet,
          e,
          f,
          g;
      e = 1 < c.TileMatrixSetLink.length ? "projection" in b ? la(c.TileMatrixSetLink, function(a) {
        var c = ha(d, function(b) {
          return b.Identifier == a.TileMatrixSet;
        }).SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"),
            e = Gb(c),
            f = Gb(b.projection);
        return e && f ? Tb(e, f) : c == b.projection;
      }) : la(c.TileMatrixSetLink, function(a) {
        return a.TileMatrixSet == b.matrixSet;
      }) : 0;
      0 > e && (e = 0);
      f = c.TileMatrixSetLink[e].TileMatrixSet;
      g = c.TileMatrixSetLink[e].TileMatrixSetLimits;
      var h = c.Format[0];
      "format" in b && (h = b.format);
      e = la(c.Style, function(a) {
        return "style" in b ? a.Title == b.style : a.isDefault;
      });
      0 > e && (e = 0);
      e = c.Style[e].Identifier;
      var l = {};
      "Dimension" in c && c.Dimension.forEach(function(a) {
        var b = a.Identifier,
            c = a.Default;
        void 0 === c && (c = a.Value[0]);
        l[b] = c;
      });
      var m = ha(a.Contents.TileMatrixSet, function(a) {
        return a.Identifier == f;
      }),
          p;
      p = "projection" in b ? Gb(b.projection) : Gb(m.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"));
      var n = c.WGS84BoundingBox,
          q,
          r;
      void 0 !== n && (r = Gb("EPSG:4326").D(), r = n[0] == r[0] && n[2] == r[2], q = Xb(n, "EPSG:4326", p), (n = p.D()) && (Ta(n, q) || (q = void 0)));
      g = $w(m, q, g);
      var v = [],
          m = b.requestEncoding,
          m = void 0 !== m ? m : "";
      if ("OperationsMetadata" in a && "GetTile" in a.OperationsMetadata) {
        q = a.OperationsMetadata.GetTile.DCP.HTTP.Get;
        for (var n = 0,
            x = q.length; n < x; ++n) {
          var y = ha(q[n].Constraint, function(a) {
            return "GetEncoding" == a.name;
          }).AllowedValues.Value;
          "" === m && (m = y[0]);
          if ("KVP" === m)
            ea(y, "KVP") && v.push(q[n].href);
          else
            break;
        }
      }
      v.length || (m = "REST", c.ResourceURL.forEach(function(a) {
        "tile" === a.resourceType && (h = a.format, v.push(a.template));
      }));
      return {
        urls: v,
        layer: b.layer,
        matrixSet: f,
        format: h,
        projection: p,
        requestEncoding: m,
        tileGrid: g,
        style: e,
        dimensions: l,
        wrapX: r
      };
    });
    t("ol.source.XYZ", gw);
    t("ol.source.Zoomify", bx);
    Mh.prototype.vectorContext = Mh.prototype.vectorContext;
    Mh.prototype.frameState = Mh.prototype.frameState;
    Mh.prototype.context = Mh.prototype.context;
    Mh.prototype.glContext = Mh.prototype.glContext;
    Yp.prototype.get = Yp.prototype.get;
    Yp.prototype.getExtent = Yp.prototype.D;
    Yp.prototype.getGeometry = Yp.prototype.U;
    Yp.prototype.getProperties = Yp.prototype.mn;
    Yp.prototype.getType = Yp.prototype.T;
    t("ol.render.VectorContext", Rh);
    ik.prototype.setStyle = ik.prototype.pd;
    ik.prototype.drawGeometry = ik.prototype.mc;
    ik.prototype.drawFeature = ik.prototype.oe;
    Sh.prototype.drawCircle = Sh.prototype.$b;
    Sh.prototype.setStyle = Sh.prototype.pd;
    Sh.prototype.drawGeometry = Sh.prototype.mc;
    Sh.prototype.drawFeature = Sh.prototype.oe;
    t("ol.proj.common.add", qh);
    t("ol.proj.Projection", yb);
    yb.prototype.getCode = yb.prototype.nk;
    yb.prototype.getExtent = yb.prototype.D;
    yb.prototype.getUnits = yb.prototype.Jb;
    yb.prototype.getMetersPerUnit = yb.prototype.sc;
    yb.prototype.getWorldExtent = yb.prototype.Zk;
    yb.prototype.isGlobal = yb.prototype.Kl;
    yb.prototype.setGlobal = yb.prototype.pp;
    yb.prototype.setExtent = yb.prototype.ln;
    yb.prototype.setWorldExtent = yb.prototype.xp;
    yb.prototype.setGetPointResolution = yb.prototype.op;
    t("ol.proj.Units.METERS_PER_UNIT", vb);
    t("ol.layer.Base", dh);
    dh.prototype.getExtent = dh.prototype.D;
    dh.prototype.getMaxResolution = dh.prototype.gc;
    dh.prototype.getMinResolution = dh.prototype.hc;
    dh.prototype.getOpacity = dh.prototype.ic;
    dh.prototype.getVisible = dh.prototype.Kb;
    dh.prototype.getZIndex = dh.prototype.za;
    dh.prototype.setExtent = dh.prototype.uc;
    dh.prototype.setMaxResolution = dh.prototype.zc;
    dh.prototype.setMinResolution = dh.prototype.Ac;
    dh.prototype.setOpacity = dh.prototype.vc;
    dh.prototype.setVisible = dh.prototype.wc;
    dh.prototype.setZIndex = dh.prototype.Wb;
    t("ol.layer.Group", fh);
    fh.prototype.getLayers = fh.prototype.od;
    fh.prototype.setLayers = fh.prototype.Sh;
    t("ol.layer.Heatmap", T);
    T.prototype.getBlur = T.prototype.fh;
    T.prototype.getGradient = T.prototype.mh;
    T.prototype.getRadius = T.prototype.Th;
    T.prototype.setBlur = T.prototype.Ei;
    T.prototype.setGradient = T.prototype.Ki;
    T.prototype.setRadius = T.prototype.Wc;
    t("ol.layer.Image", yv);
    yv.prototype.getSource = yv.prototype.la;
    t("ol.layer.Layer", rh);
    rh.prototype.getSource = rh.prototype.la;
    rh.prototype.setMap = rh.prototype.setMap;
    rh.prototype.setSource = rh.prototype.Yc;
    t("ol.layer.Tile", Hv);
    Hv.prototype.getPreload = Hv.prototype.Pd;
    Hv.prototype.getSource = Hv.prototype.la;
    Hv.prototype.setPreload = Hv.prototype.Uh;
    Hv.prototype.getUseInterimTilesOnError = Hv.prototype.Td;
    Hv.prototype.setUseInterimTilesOnError = Hv.prototype.Vh;
    t("ol.layer.Vector", R);
    R.prototype.getSource = R.prototype.la;
    R.prototype.getStyle = R.prototype.C;
    R.prototype.getStyleFunction = R.prototype.G;
    R.prototype.setStyle = R.prototype.g;
    t("ol.layer.VectorTile", U);
    U.prototype.getPreload = U.prototype.Pd;
    U.prototype.getUseInterimTilesOnError = U.prototype.Td;
    U.prototype.setPreload = U.prototype.Wh;
    U.prototype.setUseInterimTilesOnError = U.prototype.Xh;
    t("ol.interaction.DoubleClickZoom", eg);
    t("ol.interaction.DoubleClickZoom.handleEvent", fg);
    t("ol.interaction.DragAndDrop", zs);
    t("ol.interaction.DragAndDrop.handleEvent", af);
    Cs.prototype.features = Cs.prototype.features;
    Cs.prototype.file = Cs.prototype.file;
    Cs.prototype.projection = Cs.prototype.projection;
    t("ol.interaction.DragBox", Dg);
    Dg.prototype.getGeometry = Dg.prototype.U;
    Ig.prototype.coordinate = Ig.prototype.coordinate;
    Ig.prototype.mapBrowserEvent = Ig.prototype.mapBrowserEvent;
    t("ol.interaction.DragPan", sg);
    t("ol.interaction.DragRotate", wg);
    t("ol.interaction.DragRotateAndZoom", Es);
    t("ol.interaction.DragZoom", Mg);
    t("ol.interaction.Draw", Qt);
    t("ol.interaction.Draw.handleEvent", St);
    Qt.prototype.removeLastPoint = Qt.prototype.cp;
    Qt.prototype.finishDrawing = Qt.prototype.Nd;
    Qt.prototype.extend = Qt.prototype.Om;
    t("ol.interaction.Draw.createRegularPolygon", function(a, b) {
      return function(c, d) {
        var e = c[0],
            f = c[1],
            g = Math.sqrt(Xe(e, f)),
            h = d ? d : Of(new is(e), a);
        Pf(h, e, g, b ? b : Math.atan((f[1] - e[1]) / (f[0] - e[0])));
        return h;
      };
    });
    t("ol.interaction.Draw.createBox", function() {
      return function(a, b) {
        var c = Ha(a),
            d = b || new F(null);
        d.pa([[bb(c), cb(c), db(c), eb(c), bb(c)]]);
        return d;
      };
    });
    eu.prototype.feature = eu.prototype.feature;
    t("ol.interaction.Extent", gu);
    gu.prototype.getExtent = gu.prototype.D;
    gu.prototype.setExtent = gu.prototype.g;
    ru.prototype.extent_ = ru.prototype.b;
    t("ol.interaction.Interaction", ag);
    ag.prototype.getActive = ag.prototype.c;
    ag.prototype.getMap = ag.prototype.i;
    ag.prototype.setActive = ag.prototype.Ia;
    t("ol.interaction.KeyboardPan", Ng);
    t("ol.interaction.KeyboardPan.handleEvent", Og);
    t("ol.interaction.KeyboardZoom", Pg);
    t("ol.interaction.KeyboardZoom.handleEvent", Qg);
    t("ol.interaction.Modify", tu);
    t("ol.interaction.Modify.handleEvent", wu);
    tu.prototype.removePoint = tu.prototype.Ci;
    Bu.prototype.features = Bu.prototype.features;
    Bu.prototype.mapBrowserEvent = Bu.prototype.mapBrowserEvent;
    t("ol.interaction.MouseWheelZoom", Rg);
    t("ol.interaction.MouseWheelZoom.handleEvent", Sg);
    Rg.prototype.setMouseAnchor = Rg.prototype.S;
    t("ol.interaction.PinchRotate", Vg);
    t("ol.interaction.PinchZoom", Zg);
    t("ol.interaction.Pointer", pg);
    t("ol.interaction.Pointer.handleEvent", qg);
    t("ol.interaction.Select", Ju);
    Ju.prototype.getFeatures = Ju.prototype.Ym;
    Ju.prototype.getHitTolerance = Ju.prototype.Zm;
    Ju.prototype.getLayer = Ju.prototype.$m;
    t("ol.interaction.Select.handleEvent", Ku);
    Ju.prototype.setHitTolerance = Ju.prototype.bn;
    Ju.prototype.setMap = Ju.prototype.setMap;
    Mu.prototype.selected = Mu.prototype.selected;
    Mu.prototype.deselected = Mu.prototype.deselected;
    Mu.prototype.mapBrowserEvent = Mu.prototype.mapBrowserEvent;
    t("ol.interaction.Snap", Ou);
    Ou.prototype.addFeature = Ou.prototype.zb;
    Ou.prototype.removeFeature = Ou.prototype.Db;
    t("ol.interaction.Translate", Su);
    Su.prototype.getHitTolerance = Su.prototype.G;
    Su.prototype.setHitTolerance = Su.prototype.R;
    Yu.prototype.features = Yu.prototype.features;
    Yu.prototype.coordinate = Yu.prototype.coordinate;
    t("ol.geom.Circle", is);
    is.prototype.clone = is.prototype.clone;
    is.prototype.getCenter = is.prototype.Ba;
    is.prototype.getRadius = is.prototype.Vd;
    is.prototype.getType = is.prototype.T;
    is.prototype.intersectsExtent = is.prototype.Xa;
    is.prototype.setCenter = is.prototype.wb;
    is.prototype.setCenterAndRadius = is.prototype.yg;
    is.prototype.setRadius = is.prototype.Wc;
    is.prototype.transform = is.prototype.tb;
    t("ol.geom.Geometry", cf);
    cf.prototype.getClosestPoint = cf.prototype.Ab;
    cf.prototype.intersectsCoordinate = cf.prototype.sb;
    cf.prototype.getExtent = cf.prototype.D;
    cf.prototype.rotate = cf.prototype.rotate;
    cf.prototype.scale = cf.prototype.scale;
    cf.prototype.simplify = cf.prototype.Pb;
    cf.prototype.transform = cf.prototype.tb;
    t("ol.geom.GeometryCollection", qm);
    qm.prototype.clone = qm.prototype.clone;
    qm.prototype.getGeometries = qm.prototype.If;
    qm.prototype.getType = qm.prototype.T;
    qm.prototype.intersectsExtent = qm.prototype.Xa;
    qm.prototype.setGeometries = qm.prototype.Ji;
    qm.prototype.applyTransform = qm.prototype.Dc;
    qm.prototype.translate = qm.prototype.translate;
    t("ol.geom.LinearRing", yf);
    yf.prototype.clone = yf.prototype.clone;
    yf.prototype.getArea = yf.prototype.Km;
    yf.prototype.getCoordinates = yf.prototype.X;
    yf.prototype.getType = yf.prototype.T;
    yf.prototype.setCoordinates = yf.prototype.pa;
    t("ol.geom.LineString", M);
    M.prototype.appendCoordinate = M.prototype.Tj;
    M.prototype.clone = M.prototype.clone;
    M.prototype.forEachSegment = M.prototype.gk;
    M.prototype.getCoordinateAtM = M.prototype.Im;
    M.prototype.getCoordinates = M.prototype.X;
    M.prototype.getCoordinateAt = M.prototype.hh;
    M.prototype.getLength = M.prototype.Jm;
    M.prototype.getType = M.prototype.T;
    M.prototype.intersectsExtent = M.prototype.Xa;
    M.prototype.setCoordinates = M.prototype.pa;
    t("ol.geom.MultiLineString", N);
    N.prototype.appendLineString = N.prototype.Uj;
    N.prototype.clone = N.prototype.clone;
    N.prototype.getCoordinateAtM = N.prototype.Lm;
    N.prototype.getCoordinates = N.prototype.X;
    N.prototype.getLineString = N.prototype.Dk;
    N.prototype.getLineStrings = N.prototype.hd;
    N.prototype.getType = N.prototype.T;
    N.prototype.intersectsExtent = N.prototype.Xa;
    N.prototype.setCoordinates = N.prototype.pa;
    t("ol.geom.MultiPoint", O);
    O.prototype.appendPoint = O.prototype.Wj;
    O.prototype.clone = O.prototype.clone;
    O.prototype.getCoordinates = O.prototype.X;
    O.prototype.getPoint = O.prototype.Ok;
    O.prototype.getPoints = O.prototype.Ie;
    O.prototype.getType = O.prototype.T;
    O.prototype.intersectsExtent = O.prototype.Xa;
    O.prototype.setCoordinates = O.prototype.pa;
    t("ol.geom.MultiPolygon", P);
    P.prototype.appendPolygon = P.prototype.Xj;
    P.prototype.clone = P.prototype.clone;
    P.prototype.getArea = P.prototype.Mm;
    P.prototype.getCoordinates = P.prototype.X;
    P.prototype.getInteriorPoints = P.prototype.zk;
    P.prototype.getPolygon = P.prototype.Pk;
    P.prototype.getPolygons = P.prototype.Od;
    P.prototype.getType = P.prototype.T;
    P.prototype.intersectsExtent = P.prototype.Xa;
    P.prototype.setCoordinates = P.prototype.pa;
    t("ol.geom.Point", E);
    E.prototype.clone = E.prototype.clone;
    E.prototype.getCoordinates = E.prototype.X;
    E.prototype.getType = E.prototype.T;
    E.prototype.intersectsExtent = E.prototype.Xa;
    E.prototype.setCoordinates = E.prototype.pa;
    t("ol.geom.Polygon", F);
    F.prototype.appendLinearRing = F.prototype.Vj;
    F.prototype.clone = F.prototype.clone;
    F.prototype.getArea = F.prototype.Nm;
    F.prototype.getCoordinates = F.prototype.X;
    F.prototype.getInteriorPoint = F.prototype.yk;
    F.prototype.getLinearRingCount = F.prototype.Ek;
    F.prototype.getLinearRing = F.prototype.nh;
    F.prototype.getLinearRings = F.prototype.jd;
    F.prototype.getType = F.prototype.T;
    F.prototype.intersectsExtent = F.prototype.Xa;
    F.prototype.setCoordinates = F.prototype.pa;
    t("ol.geom.Polygon.circular", Mf);
    t("ol.geom.Polygon.fromExtent", Nf);
    t("ol.geom.Polygon.fromCircle", Of);
    t("ol.geom.SimpleGeometry", ff);
    ff.prototype.getFirstCoordinate = ff.prototype.bc;
    ff.prototype.getLastCoordinate = ff.prototype.cc;
    ff.prototype.getLayout = ff.prototype.dc;
    ff.prototype.applyTransform = ff.prototype.Dc;
    ff.prototype.translate = ff.prototype.translate;
    t("ol.format.EsriJSON", Ol);
    Ol.prototype.readFeature = Ol.prototype.Ub;
    Ol.prototype.readFeatures = Ol.prototype.Qa;
    Ol.prototype.readGeometry = Ol.prototype.Tc;
    Ol.prototype.readProjection = Ol.prototype.kb;
    Ol.prototype.writeGeometry = Ol.prototype.bd;
    Ol.prototype.writeGeometryObject = Ol.prototype.ee;
    Ol.prototype.writeFeature = Ol.prototype.yd;
    Ol.prototype.writeFeatureObject = Ol.prototype.ad;
    Ol.prototype.writeFeatures = Ol.prototype.Xb;
    Ol.prototype.writeFeaturesObject = Ol.prototype.ce;
    t("ol.format.Feature", Cl);
    t("ol.format.filter.and", om);
    t("ol.format.filter.or", function(a) {
      var b = [null].concat(Array.prototype.slice.call(arguments));
      return new (Function.prototype.bind.apply(mm, b));
    });
    t("ol.format.filter.not", function(a) {
      return new km(a);
    });
    t("ol.format.filter.bbox", pm);
    t("ol.format.filter.intersects", function(a, b, c) {
      return new em(a, b, c);
    });
    t("ol.format.filter.within", function(a, b, c) {
      return new nm(a, b, c);
    });
    t("ol.format.filter.equalTo", function(a, b, c) {
      return new am(a, b, c);
    });
    t("ol.format.filter.notEqualTo", function(a, b, c) {
      return new lm(a, b, c);
    });
    t("ol.format.filter.lessThan", function(a, b) {
      return new im(a, b);
    });
    t("ol.format.filter.lessThanOrEqualTo", function(a, b) {
      return new jm(a, b);
    });
    t("ol.format.filter.greaterThan", function(a, b) {
      return new bm(a, b);
    });
    t("ol.format.filter.greaterThanOrEqualTo", function(a, b) {
      return new cm(a, b);
    });
    t("ol.format.filter.isNull", function(a) {
      return new hm(a);
    });
    t("ol.format.filter.between", function(a, b, c) {
      return new fm(a, b, c);
    });
    t("ol.format.filter.like", function(a, b, c, d, e, f) {
      return new gm(a, b, c, d, e, f);
    });
    t("ol.format.GeoJSON", um);
    um.prototype.readFeature = um.prototype.Ub;
    um.prototype.readFeatures = um.prototype.Qa;
    um.prototype.readGeometry = um.prototype.Tc;
    um.prototype.readProjection = um.prototype.kb;
    um.prototype.writeFeature = um.prototype.yd;
    um.prototype.writeFeatureObject = um.prototype.ad;
    um.prototype.writeFeatures = um.prototype.Xb;
    um.prototype.writeFeaturesObject = um.prototype.ce;
    um.prototype.writeGeometry = um.prototype.bd;
    um.prototype.writeGeometryObject = um.prototype.ee;
    t("ol.format.GML", Pm);
    Pm.prototype.writeFeatures = Pm.prototype.Xb;
    Pm.prototype.writeFeaturesNode = Pm.prototype.Yb;
    t("ol.format.GML2", Ym);
    t("ol.format.GML3", Pm);
    Pm.prototype.writeGeometryNode = Pm.prototype.de;
    Pm.prototype.writeFeatures = Pm.prototype.Xb;
    Pm.prototype.writeFeaturesNode = Pm.prototype.Yb;
    Cm.prototype.readFeatures = Cm.prototype.Qa;
    t("ol.format.GPX", Zm);
    Zm.prototype.readFeature = Zm.prototype.Ub;
    Zm.prototype.readFeatures = Zm.prototype.Qa;
    Zm.prototype.readProjection = Zm.prototype.kb;
    Zm.prototype.writeFeatures = Zm.prototype.Xb;
    Zm.prototype.writeFeaturesNode = Zm.prototype.Yb;
    t("ol.format.IGC", Kn);
    Kn.prototype.readFeature = Kn.prototype.Ub;
    Kn.prototype.readFeatures = Kn.prototype.Qa;
    Kn.prototype.readProjection = Kn.prototype.kb;
    t("ol.format.KML", Tn);
    Tn.prototype.readFeature = Tn.prototype.Ub;
    Tn.prototype.readFeatures = Tn.prototype.Qa;
    Tn.prototype.readName = Tn.prototype.Ro;
    Tn.prototype.readNetworkLinks = Tn.prototype.So;
    Tn.prototype.readRegion = Tn.prototype.Vo;
    Tn.prototype.readRegionFromNode = Tn.prototype.$e;
    Tn.prototype.readProjection = Tn.prototype.kb;
    Tn.prototype.writeFeatures = Tn.prototype.Xb;
    Tn.prototype.writeFeaturesNode = Tn.prototype.Yb;
    t("ol.format.MVT", Zp);
    Zp.prototype.readFeatures = Zp.prototype.Qa;
    Zp.prototype.readProjection = Zp.prototype.kb;
    Zp.prototype.setLayers = Zp.prototype.Hm;
    t("ol.format.OSMXML", aq);
    aq.prototype.readFeatures = aq.prototype.Qa;
    aq.prototype.readProjection = aq.prototype.kb;
    t("ol.format.Polyline", Aq);
    t("ol.format.Polyline.encodeDeltas", Bq);
    t("ol.format.Polyline.decodeDeltas", Dq);
    t("ol.format.Polyline.encodeFloats", Cq);
    t("ol.format.Polyline.decodeFloats", Eq);
    Aq.prototype.readFeature = Aq.prototype.Ub;
    Aq.prototype.readFeatures = Aq.prototype.Qa;
    Aq.prototype.readGeometry = Aq.prototype.Tc;
    Aq.prototype.readProjection = Aq.prototype.kb;
    Aq.prototype.writeGeometry = Aq.prototype.bd;
    t("ol.format.TopoJSON", Fq);
    Fq.prototype.readFeatures = Fq.prototype.Qa;
    Fq.prototype.readProjection = Fq.prototype.kb;
    t("ol.format.WFS", Lq);
    Lq.prototype.readFeatures = Lq.prototype.Qa;
    Lq.prototype.readTransactionResponse = Lq.prototype.j;
    Lq.prototype.readFeatureCollectionMetadata = Lq.prototype.l;
    Lq.prototype.writeGetFeature = Lq.prototype.o;
    Lq.prototype.writeTransaction = Lq.prototype.v;
    Lq.prototype.readProjection = Lq.prototype.kb;
    t("ol.format.WKT", cr);
    cr.prototype.readFeature = cr.prototype.Ub;
    cr.prototype.readFeatures = cr.prototype.Qa;
    cr.prototype.readGeometry = cr.prototype.Tc;
    cr.prototype.writeFeature = cr.prototype.yd;
    cr.prototype.writeFeatures = cr.prototype.Xb;
    cr.prototype.writeGeometry = cr.prototype.bd;
    t("ol.format.WMSCapabilities", vr);
    vr.prototype.read = vr.prototype.read;
    t("ol.format.WMSGetFeatureInfo", Sr);
    Sr.prototype.readFeatures = Sr.prototype.Qa;
    t("ol.format.WMTSCapabilities", Tr);
    Tr.prototype.read = Tr.prototype.read;
    t("ol.format.filter.And", Xl);
    t("ol.format.filter.Bbox", Yl);
    t("ol.format.filter.Comparison", Zl);
    t("ol.format.filter.ComparisonBinary", $l);
    t("ol.format.filter.EqualTo", am);
    t("ol.format.filter.Filter", Vl);
    t("ol.format.filter.GreaterThan", bm);
    t("ol.format.filter.GreaterThanOrEqualTo", cm);
    t("ol.format.filter.Intersects", em);
    t("ol.format.filter.IsBetween", fm);
    t("ol.format.filter.IsLike", gm);
    t("ol.format.filter.IsNull", hm);
    t("ol.format.filter.LessThan", im);
    t("ol.format.filter.LessThanOrEqualTo", jm);
    t("ol.format.filter.Not", km);
    t("ol.format.filter.NotEqualTo", lm);
    t("ol.format.filter.Or", mm);
    t("ol.format.filter.Spatial", dm);
    t("ol.format.filter.Within", nm);
    t("ol.events.condition.altKeyOnly", function(a) {
      a = a.originalEvent;
      return a.altKey && !(a.metaKey || a.ctrlKey) && !a.shiftKey;
    });
    t("ol.events.condition.altShiftKeysOnly", gg);
    t("ol.events.condition.always", af);
    t("ol.events.condition.click", function(a) {
      return "click" == a.type;
    });
    t("ol.events.condition.never", bf);
    t("ol.events.condition.pointerMove", ig);
    t("ol.events.condition.singleClick", jg);
    t("ol.events.condition.doubleClick", function(a) {
      return "dblclick" == a.type;
    });
    t("ol.events.condition.noModifierKeys", kg);
    t("ol.events.condition.platformModifierKeyOnly", function(a) {
      a = a.originalEvent;
      return !a.altKey && (Jd ? a.metaKey : a.ctrlKey) && !a.shiftKey;
    });
    t("ol.events.condition.shiftKeyOnly", lg);
    t("ol.events.condition.targetNotEditable", mg);
    t("ol.events.condition.mouseOnly", ng);
    t("ol.events.condition.primaryAction", og);
    Bc.prototype.type = Bc.prototype.type;
    Bc.prototype.target = Bc.prototype.target;
    Bc.prototype.preventDefault = Bc.prototype.preventDefault;
    Bc.prototype.stopPropagation = Bc.prototype.stopPropagation;
    t("ol.control.Attribution", bd);
    t("ol.control.Attribution.render", cd);
    bd.prototype.getCollapsible = bd.prototype.xm;
    bd.prototype.setCollapsible = bd.prototype.Am;
    bd.prototype.setCollapsed = bd.prototype.zm;
    bd.prototype.getCollapsed = bd.prototype.wm;
    t("ol.control.Control", ad);
    ad.prototype.getMap = ad.prototype.g;
    ad.prototype.setMap = ad.prototype.setMap;
    ad.prototype.setTarget = ad.prototype.i;
    t("ol.control.FullScreen", od);
    t("ol.control.MousePosition", td);
    t("ol.control.MousePosition.render", ud);
    td.prototype.getCoordinateFormat = td.prototype.ih;
    td.prototype.getProjection = td.prototype.Lh;
    td.prototype.setCoordinateFormat = td.prototype.Fi;
    td.prototype.setProjection = td.prototype.Mh;
    t("ol.control.OverviewMap", zk);
    t("ol.control.OverviewMap.render", Ak);
    zk.prototype.getCollapsible = zk.prototype.Dm;
    zk.prototype.setCollapsible = zk.prototype.Gm;
    zk.prototype.setCollapsed = zk.prototype.Fm;
    zk.prototype.getCollapsed = zk.prototype.Cm;
    zk.prototype.getOverviewMap = zk.prototype.Mk;
    t("ol.control.Rotate", id);
    t("ol.control.Rotate.render", jd);
    t("ol.control.ScaleLine", Ek);
    Ek.prototype.getUnits = Ek.prototype.Jb;
    t("ol.control.ScaleLine.render", Fk);
    Ek.prototype.setUnits = Ek.prototype.G;
    t("ol.control.Zoom", kd);
    t("ol.control.ZoomSlider", Jk);
    t("ol.control.ZoomSlider.render", Lk);
    t("ol.control.ZoomToExtent", Ok);
    Gc.prototype.changed = Gc.prototype.s;
    Gc.prototype.dispatchEvent = Gc.prototype.b;
    Gc.prototype.getRevision = Gc.prototype.L;
    Gc.prototype.on = Gc.prototype.J;
    Gc.prototype.once = Gc.prototype.once;
    Gc.prototype.un = Gc.prototype.K;
    D.prototype.get = D.prototype.get;
    D.prototype.getKeys = D.prototype.O;
    D.prototype.getProperties = D.prototype.N;
    D.prototype.set = D.prototype.set;
    D.prototype.setProperties = D.prototype.H;
    D.prototype.unset = D.prototype.P;
    D.prototype.changed = D.prototype.s;
    D.prototype.dispatchEvent = D.prototype.b;
    D.prototype.getRevision = D.prototype.L;
    D.prototype.on = D.prototype.J;
    D.prototype.once = D.prototype.once;
    D.prototype.un = D.prototype.K;
    Nc.prototype.type = Nc.prototype.type;
    Nc.prototype.target = Nc.prototype.target;
    Nc.prototype.preventDefault = Nc.prototype.preventDefault;
    Nc.prototype.stopPropagation = Nc.prototype.stopPropagation;
    Pk.prototype.get = Pk.prototype.get;
    Pk.prototype.getKeys = Pk.prototype.O;
    Pk.prototype.getProperties = Pk.prototype.N;
    Pk.prototype.set = Pk.prototype.set;
    Pk.prototype.setProperties = Pk.prototype.H;
    Pk.prototype.unset = Pk.prototype.P;
    Pk.prototype.changed = Pk.prototype.s;
    Pk.prototype.dispatchEvent = Pk.prototype.b;
    Pk.prototype.getRevision = Pk.prototype.L;
    Pk.prototype.on = Pk.prototype.J;
    Pk.prototype.once = Pk.prototype.once;
    Pk.prototype.un = Pk.prototype.K;
    H.prototype.get = H.prototype.get;
    H.prototype.getKeys = H.prototype.O;
    H.prototype.getProperties = H.prototype.N;
    H.prototype.set = H.prototype.set;
    H.prototype.setProperties = H.prototype.H;
    H.prototype.unset = H.prototype.P;
    H.prototype.changed = H.prototype.s;
    H.prototype.dispatchEvent = H.prototype.b;
    H.prototype.getRevision = H.prototype.L;
    H.prototype.on = H.prototype.J;
    H.prototype.once = H.prototype.once;
    H.prototype.un = H.prototype.K;
    hs.prototype.get = hs.prototype.get;
    hs.prototype.getKeys = hs.prototype.O;
    hs.prototype.getProperties = hs.prototype.N;
    hs.prototype.set = hs.prototype.set;
    hs.prototype.setProperties = hs.prototype.H;
    hs.prototype.unset = hs.prototype.P;
    hs.prototype.changed = hs.prototype.s;
    hs.prototype.dispatchEvent = hs.prototype.b;
    hs.prototype.getRevision = hs.prototype.L;
    hs.prototype.on = hs.prototype.J;
    hs.prototype.once = hs.prototype.once;
    hs.prototype.un = hs.prototype.K;
    xs.prototype.getTileCoord = xs.prototype.i;
    xs.prototype.load = xs.prototype.load;
    G.prototype.get = G.prototype.get;
    G.prototype.getKeys = G.prototype.O;
    G.prototype.getProperties = G.prototype.N;
    G.prototype.set = G.prototype.set;
    G.prototype.setProperties = G.prototype.H;
    G.prototype.unset = G.prototype.P;
    G.prototype.changed = G.prototype.s;
    G.prototype.dispatchEvent = G.prototype.b;
    G.prototype.getRevision = G.prototype.L;
    G.prototype.on = G.prototype.J;
    G.prototype.once = G.prototype.once;
    G.prototype.un = G.prototype.K;
    yd.prototype.type = yd.prototype.type;
    yd.prototype.target = yd.prototype.target;
    yd.prototype.preventDefault = yd.prototype.preventDefault;
    yd.prototype.stopPropagation = yd.prototype.stopPropagation;
    zd.prototype.map = zd.prototype.map;
    zd.prototype.frameState = zd.prototype.frameState;
    zd.prototype.type = zd.prototype.type;
    zd.prototype.target = zd.prototype.target;
    zd.prototype.preventDefault = zd.prototype.preventDefault;
    zd.prototype.stopPropagation = zd.prototype.stopPropagation;
    Bd.prototype.originalEvent = Bd.prototype.originalEvent;
    Bd.prototype.pixel = Bd.prototype.pixel;
    Bd.prototype.coordinate = Bd.prototype.coordinate;
    Bd.prototype.dragging = Bd.prototype.dragging;
    Bd.prototype.preventDefault = Bd.prototype.preventDefault;
    Bd.prototype.stopPropagation = Bd.prototype.stopPropagation;
    Bd.prototype.map = Bd.prototype.map;
    Bd.prototype.frameState = Bd.prototype.frameState;
    Bd.prototype.type = Bd.prototype.type;
    Bd.prototype.target = Bd.prototype.target;
    Kc.prototype.type = Kc.prototype.type;
    Kc.prototype.target = Kc.prototype.target;
    Kc.prototype.preventDefault = Kc.prototype.preventDefault;
    Kc.prototype.stopPropagation = Kc.prototype.stopPropagation;
    qk.prototype.get = qk.prototype.get;
    qk.prototype.getKeys = qk.prototype.O;
    qk.prototype.getProperties = qk.prototype.N;
    qk.prototype.set = qk.prototype.set;
    qk.prototype.setProperties = qk.prototype.H;
    qk.prototype.unset = qk.prototype.P;
    qk.prototype.changed = qk.prototype.s;
    qk.prototype.dispatchEvent = qk.prototype.b;
    qk.prototype.getRevision = qk.prototype.L;
    qk.prototype.on = qk.prototype.J;
    qk.prototype.once = qk.prototype.once;
    qk.prototype.un = qk.prototype.K;
    Ww.prototype.getTileCoord = Ww.prototype.i;
    Ww.prototype.load = Ww.prototype.load;
    Qf.prototype.get = Qf.prototype.get;
    Qf.prototype.getKeys = Qf.prototype.O;
    Qf.prototype.getProperties = Qf.prototype.N;
    Qf.prototype.set = Qf.prototype.set;
    Qf.prototype.setProperties = Qf.prototype.H;
    Qf.prototype.unset = Qf.prototype.P;
    Qf.prototype.changed = Qf.prototype.s;
    Qf.prototype.dispatchEvent = Qf.prototype.b;
    Qf.prototype.getRevision = Qf.prototype.L;
    Qf.prototype.on = Qf.prototype.J;
    Qf.prototype.once = Qf.prototype.once;
    Qf.prototype.un = Qf.prototype.K;
    Zw.prototype.forEachTileCoord = Zw.prototype.eh;
    Zw.prototype.getMaxZoom = Zw.prototype.oh;
    Zw.prototype.getMinZoom = Zw.prototype.ph;
    Zw.prototype.getOrigin = Zw.prototype.Qc;
    Zw.prototype.getResolution = Zw.prototype.La;
    Zw.prototype.getResolutions = Zw.prototype.oi;
    Zw.prototype.getTileCoordExtent = Zw.prototype.Ta;
    Zw.prototype.getTileCoordForCoordAndResolution = Zw.prototype.we;
    Zw.prototype.getTileCoordForCoordAndZ = Zw.prototype.Pf;
    Zw.prototype.getTileSize = Zw.prototype.fb;
    Zw.prototype.getZForResolution = Zw.prototype.Mc;
    Wk.prototype.getOpacity = Wk.prototype.Pe;
    Wk.prototype.getRotateWithView = Wk.prototype.Qe;
    Wk.prototype.getRotation = Wk.prototype.Re;
    Wk.prototype.getScale = Wk.prototype.Se;
    Wk.prototype.getSnapToPixel = Wk.prototype.ve;
    Wk.prototype.setOpacity = Wk.prototype.rd;
    Wk.prototype.setRotation = Wk.prototype.Te;
    Wk.prototype.setScale = Wk.prototype.sd;
    Yk.prototype.clone = Yk.prototype.clone;
    Yk.prototype.getAngle = Yk.prototype.ki;
    Yk.prototype.getFill = Yk.prototype.Ca;
    Yk.prototype.getPoints = Yk.prototype.li;
    Yk.prototype.getRadius = Yk.prototype.mi;
    Yk.prototype.getRadius2 = Yk.prototype.sh;
    Yk.prototype.getStroke = Yk.prototype.Da;
    Yk.prototype.getOpacity = Yk.prototype.Pe;
    Yk.prototype.getRotateWithView = Yk.prototype.Qe;
    Yk.prototype.getRotation = Yk.prototype.Re;
    Yk.prototype.getScale = Yk.prototype.Se;
    Yk.prototype.getSnapToPixel = Yk.prototype.ve;
    Yk.prototype.setOpacity = Yk.prototype.rd;
    Yk.prototype.setRotation = Yk.prototype.Te;
    Yk.prototype.setScale = Yk.prototype.sd;
    Rn.prototype.getOpacity = Rn.prototype.Pe;
    Rn.prototype.getRotateWithView = Rn.prototype.Qe;
    Rn.prototype.getRotation = Rn.prototype.Re;
    Rn.prototype.getScale = Rn.prototype.Se;
    Rn.prototype.getSnapToPixel = Rn.prototype.ve;
    Rn.prototype.setOpacity = Rn.prototype.rd;
    Rn.prototype.setRotation = Rn.prototype.Te;
    Rn.prototype.setScale = Rn.prototype.sd;
    Gt.prototype.get = Gt.prototype.get;
    Gt.prototype.getKeys = Gt.prototype.O;
    Gt.prototype.getProperties = Gt.prototype.N;
    Gt.prototype.set = Gt.prototype.set;
    Gt.prototype.setProperties = Gt.prototype.H;
    Gt.prototype.unset = Gt.prototype.P;
    Gt.prototype.changed = Gt.prototype.s;
    Gt.prototype.dispatchEvent = Gt.prototype.b;
    Gt.prototype.getRevision = Gt.prototype.L;
    Gt.prototype.on = Gt.prototype.J;
    Gt.prototype.once = Gt.prototype.once;
    Gt.prototype.un = Gt.prototype.K;
    Xv.prototype.getAttributions = Xv.prototype.xa;
    Xv.prototype.getLogo = Xv.prototype.wa;
    Xv.prototype.getProjection = Xv.prototype.ya;
    Xv.prototype.getState = Xv.prototype.V;
    Xv.prototype.refresh = Xv.prototype.va;
    Xv.prototype.setAttributions = Xv.prototype.ua;
    Xv.prototype.get = Xv.prototype.get;
    Xv.prototype.getKeys = Xv.prototype.O;
    Xv.prototype.getProperties = Xv.prototype.N;
    Xv.prototype.set = Xv.prototype.set;
    Xv.prototype.setProperties = Xv.prototype.H;
    Xv.prototype.unset = Xv.prototype.P;
    Xv.prototype.changed = Xv.prototype.s;
    Xv.prototype.dispatchEvent = Xv.prototype.b;
    Xv.prototype.getRevision = Xv.prototype.L;
    Xv.prototype.on = Xv.prototype.J;
    Xv.prototype.once = Xv.prototype.once;
    Xv.prototype.un = Xv.prototype.K;
    aw.prototype.getTileGrid = aw.prototype.ab;
    aw.prototype.refresh = aw.prototype.va;
    aw.prototype.getAttributions = aw.prototype.xa;
    aw.prototype.getLogo = aw.prototype.wa;
    aw.prototype.getProjection = aw.prototype.ya;
    aw.prototype.getState = aw.prototype.V;
    aw.prototype.setAttributions = aw.prototype.ua;
    aw.prototype.get = aw.prototype.get;
    aw.prototype.getKeys = aw.prototype.O;
    aw.prototype.getProperties = aw.prototype.N;
    aw.prototype.set = aw.prototype.set;
    aw.prototype.setProperties = aw.prototype.H;
    aw.prototype.unset = aw.prototype.P;
    aw.prototype.changed = aw.prototype.s;
    aw.prototype.dispatchEvent = aw.prototype.b;
    aw.prototype.getRevision = aw.prototype.L;
    aw.prototype.on = aw.prototype.J;
    aw.prototype.once = aw.prototype.once;
    aw.prototype.un = aw.prototype.K;
    W.prototype.getTileLoadFunction = W.prototype.ob;
    W.prototype.getTileUrlFunction = W.prototype.qb;
    W.prototype.getUrls = W.prototype.rb;
    W.prototype.setTileLoadFunction = W.prototype.xb;
    W.prototype.setTileUrlFunction = W.prototype.bb;
    W.prototype.setUrl = W.prototype.jb;
    W.prototype.setUrls = W.prototype.cb;
    W.prototype.getTileGrid = W.prototype.ab;
    W.prototype.refresh = W.prototype.va;
    W.prototype.getAttributions = W.prototype.xa;
    W.prototype.getLogo = W.prototype.wa;
    W.prototype.getProjection = W.prototype.ya;
    W.prototype.getState = W.prototype.V;
    W.prototype.setAttributions = W.prototype.ua;
    W.prototype.get = W.prototype.get;
    W.prototype.getKeys = W.prototype.O;
    W.prototype.getProperties = W.prototype.N;
    W.prototype.set = W.prototype.set;
    W.prototype.setProperties = W.prototype.H;
    W.prototype.unset = W.prototype.P;
    W.prototype.changed = W.prototype.s;
    W.prototype.dispatchEvent = W.prototype.b;
    W.prototype.getRevision = W.prototype.L;
    W.prototype.on = W.prototype.J;
    W.prototype.once = W.prototype.once;
    W.prototype.un = W.prototype.K;
    ew.prototype.setRenderReprojectionEdges = ew.prototype.Nb;
    ew.prototype.setTileGridForProjection = ew.prototype.Ob;
    ew.prototype.getTileLoadFunction = ew.prototype.ob;
    ew.prototype.getTileUrlFunction = ew.prototype.qb;
    ew.prototype.getUrls = ew.prototype.rb;
    ew.prototype.setTileLoadFunction = ew.prototype.xb;
    ew.prototype.setTileUrlFunction = ew.prototype.bb;
    ew.prototype.setUrl = ew.prototype.jb;
    ew.prototype.setUrls = ew.prototype.cb;
    ew.prototype.getTileGrid = ew.prototype.ab;
    ew.prototype.refresh = ew.prototype.va;
    ew.prototype.getAttributions = ew.prototype.xa;
    ew.prototype.getLogo = ew.prototype.wa;
    ew.prototype.getProjection = ew.prototype.ya;
    ew.prototype.getState = ew.prototype.V;
    ew.prototype.setAttributions = ew.prototype.ua;
    ew.prototype.get = ew.prototype.get;
    ew.prototype.getKeys = ew.prototype.O;
    ew.prototype.getProperties = ew.prototype.N;
    ew.prototype.set = ew.prototype.set;
    ew.prototype.setProperties = ew.prototype.H;
    ew.prototype.unset = ew.prototype.P;
    ew.prototype.changed = ew.prototype.s;
    ew.prototype.dispatchEvent = ew.prototype.b;
    ew.prototype.getRevision = ew.prototype.L;
    ew.prototype.on = ew.prototype.J;
    ew.prototype.once = ew.prototype.once;
    ew.prototype.un = ew.prototype.K;
    gw.prototype.setRenderReprojectionEdges = gw.prototype.Nb;
    gw.prototype.setTileGridForProjection = gw.prototype.Ob;
    gw.prototype.getTileLoadFunction = gw.prototype.ob;
    gw.prototype.getTileUrlFunction = gw.prototype.qb;
    gw.prototype.getUrls = gw.prototype.rb;
    gw.prototype.setTileLoadFunction = gw.prototype.xb;
    gw.prototype.setTileUrlFunction = gw.prototype.bb;
    gw.prototype.setUrl = gw.prototype.jb;
    gw.prototype.setUrls = gw.prototype.cb;
    gw.prototype.getTileGrid = gw.prototype.ab;
    gw.prototype.refresh = gw.prototype.va;
    gw.prototype.getAttributions = gw.prototype.xa;
    gw.prototype.getLogo = gw.prototype.wa;
    gw.prototype.getProjection = gw.prototype.ya;
    gw.prototype.getState = gw.prototype.V;
    gw.prototype.setAttributions = gw.prototype.ua;
    gw.prototype.get = gw.prototype.get;
    gw.prototype.getKeys = gw.prototype.O;
    gw.prototype.getProperties = gw.prototype.N;
    gw.prototype.set = gw.prototype.set;
    gw.prototype.setProperties = gw.prototype.H;
    gw.prototype.unset = gw.prototype.P;
    gw.prototype.changed = gw.prototype.s;
    gw.prototype.dispatchEvent = gw.prototype.b;
    gw.prototype.getRevision = gw.prototype.L;
    gw.prototype.on = gw.prototype.J;
    gw.prototype.once = gw.prototype.once;
    gw.prototype.un = gw.prototype.K;
    hw.prototype.setRenderReprojectionEdges = hw.prototype.Nb;
    hw.prototype.setTileGridForProjection = hw.prototype.Ob;
    hw.prototype.getTileLoadFunction = hw.prototype.ob;
    hw.prototype.getTileUrlFunction = hw.prototype.qb;
    hw.prototype.getUrls = hw.prototype.rb;
    hw.prototype.setTileLoadFunction = hw.prototype.xb;
    hw.prototype.setTileUrlFunction = hw.prototype.bb;
    hw.prototype.setUrl = hw.prototype.jb;
    hw.prototype.setUrls = hw.prototype.cb;
    hw.prototype.getTileGrid = hw.prototype.ab;
    hw.prototype.refresh = hw.prototype.va;
    hw.prototype.getAttributions = hw.prototype.xa;
    hw.prototype.getLogo = hw.prototype.wa;
    hw.prototype.getProjection = hw.prototype.ya;
    hw.prototype.getState = hw.prototype.V;
    hw.prototype.setAttributions = hw.prototype.ua;
    hw.prototype.get = hw.prototype.get;
    hw.prototype.getKeys = hw.prototype.O;
    hw.prototype.getProperties = hw.prototype.N;
    hw.prototype.set = hw.prototype.set;
    hw.prototype.setProperties = hw.prototype.H;
    hw.prototype.unset = hw.prototype.P;
    hw.prototype.changed = hw.prototype.s;
    hw.prototype.dispatchEvent = hw.prototype.b;
    hw.prototype.getRevision = hw.prototype.L;
    hw.prototype.on = hw.prototype.J;
    hw.prototype.once = hw.prototype.once;
    hw.prototype.un = hw.prototype.K;
    S.prototype.getAttributions = S.prototype.xa;
    S.prototype.getLogo = S.prototype.wa;
    S.prototype.getProjection = S.prototype.ya;
    S.prototype.getState = S.prototype.V;
    S.prototype.refresh = S.prototype.va;
    S.prototype.setAttributions = S.prototype.ua;
    S.prototype.get = S.prototype.get;
    S.prototype.getKeys = S.prototype.O;
    S.prototype.getProperties = S.prototype.N;
    S.prototype.set = S.prototype.set;
    S.prototype.setProperties = S.prototype.H;
    S.prototype.unset = S.prototype.P;
    S.prototype.changed = S.prototype.s;
    S.prototype.dispatchEvent = S.prototype.b;
    S.prototype.getRevision = S.prototype.L;
    S.prototype.on = S.prototype.J;
    S.prototype.once = S.prototype.once;
    S.prototype.un = S.prototype.K;
    X.prototype.addFeature = X.prototype.zb;
    X.prototype.addFeatures = X.prototype.dd;
    X.prototype.clear = X.prototype.clear;
    X.prototype.forEachFeature = X.prototype.bh;
    X.prototype.forEachFeatureInExtent = X.prototype.ac;
    X.prototype.forEachFeatureIntersectingExtent = X.prototype.dh;
    X.prototype.getFeaturesCollection = X.prototype.lh;
    X.prototype.getFeatures = X.prototype.Ne;
    X.prototype.getFeaturesAtCoordinate = X.prototype.kh;
    X.prototype.getFeaturesInExtent = X.prototype.Hf;
    X.prototype.getClosestFeatureToCoordinate = X.prototype.gh;
    X.prototype.getExtent = X.prototype.D;
    X.prototype.getFeatureById = X.prototype.jh;
    X.prototype.getFormat = X.prototype.hi;
    X.prototype.getUrl = X.prototype.ii;
    X.prototype.removeFeature = X.prototype.Db;
    X.prototype.getAttributions = X.prototype.xa;
    X.prototype.getLogo = X.prototype.wa;
    X.prototype.getProjection = X.prototype.ya;
    X.prototype.getState = X.prototype.V;
    X.prototype.refresh = X.prototype.va;
    X.prototype.setAttributions = X.prototype.ua;
    X.prototype.get = X.prototype.get;
    X.prototype.getKeys = X.prototype.O;
    X.prototype.getProperties = X.prototype.N;
    X.prototype.set = X.prototype.set;
    X.prototype.setProperties = X.prototype.H;
    X.prototype.unset = X.prototype.P;
    X.prototype.changed = X.prototype.s;
    X.prototype.dispatchEvent = X.prototype.b;
    X.prototype.getRevision = X.prototype.L;
    X.prototype.on = X.prototype.J;
    X.prototype.once = X.prototype.once;
    X.prototype.un = X.prototype.K;
    lv.prototype.getAttributions = lv.prototype.xa;
    lv.prototype.getLogo = lv.prototype.wa;
    lv.prototype.getProjection = lv.prototype.ya;
    lv.prototype.getState = lv.prototype.V;
    lv.prototype.refresh = lv.prototype.va;
    lv.prototype.setAttributions = lv.prototype.ua;
    lv.prototype.get = lv.prototype.get;
    lv.prototype.getKeys = lv.prototype.O;
    lv.prototype.getProperties = lv.prototype.N;
    lv.prototype.set = lv.prototype.set;
    lv.prototype.setProperties = lv.prototype.H;
    lv.prototype.unset = lv.prototype.P;
    lv.prototype.changed = lv.prototype.s;
    lv.prototype.dispatchEvent = lv.prototype.b;
    lv.prototype.getRevision = lv.prototype.L;
    lv.prototype.on = lv.prototype.J;
    lv.prototype.once = lv.prototype.once;
    lv.prototype.un = lv.prototype.K;
    nv.prototype.type = nv.prototype.type;
    nv.prototype.target = nv.prototype.target;
    nv.prototype.preventDefault = nv.prototype.preventDefault;
    nv.prototype.stopPropagation = nv.prototype.stopPropagation;
    nw.prototype.getAttributions = nw.prototype.xa;
    nw.prototype.getLogo = nw.prototype.wa;
    nw.prototype.getProjection = nw.prototype.ya;
    nw.prototype.getState = nw.prototype.V;
    nw.prototype.refresh = nw.prototype.va;
    nw.prototype.setAttributions = nw.prototype.ua;
    nw.prototype.get = nw.prototype.get;
    nw.prototype.getKeys = nw.prototype.O;
    nw.prototype.getProperties = nw.prototype.N;
    nw.prototype.set = nw.prototype.set;
    nw.prototype.setProperties = nw.prototype.H;
    nw.prototype.unset = nw.prototype.P;
    nw.prototype.changed = nw.prototype.s;
    nw.prototype.dispatchEvent = nw.prototype.b;
    nw.prototype.getRevision = nw.prototype.L;
    nw.prototype.on = nw.prototype.J;
    nw.prototype.once = nw.prototype.once;
    nw.prototype.un = nw.prototype.K;
    sv.prototype.getAttributions = sv.prototype.xa;
    sv.prototype.getLogo = sv.prototype.wa;
    sv.prototype.getProjection = sv.prototype.ya;
    sv.prototype.getState = sv.prototype.V;
    sv.prototype.refresh = sv.prototype.va;
    sv.prototype.setAttributions = sv.prototype.ua;
    sv.prototype.get = sv.prototype.get;
    sv.prototype.getKeys = sv.prototype.O;
    sv.prototype.getProperties = sv.prototype.N;
    sv.prototype.set = sv.prototype.set;
    sv.prototype.setProperties = sv.prototype.H;
    sv.prototype.unset = sv.prototype.P;
    sv.prototype.changed = sv.prototype.s;
    sv.prototype.dispatchEvent = sv.prototype.b;
    sv.prototype.getRevision = sv.prototype.L;
    sv.prototype.on = sv.prototype.J;
    sv.prototype.once = sv.prototype.once;
    sv.prototype.un = sv.prototype.K;
    ow.prototype.getAttributions = ow.prototype.xa;
    ow.prototype.getLogo = ow.prototype.wa;
    ow.prototype.getProjection = ow.prototype.ya;
    ow.prototype.getState = ow.prototype.V;
    ow.prototype.refresh = ow.prototype.va;
    ow.prototype.setAttributions = ow.prototype.ua;
    ow.prototype.get = ow.prototype.get;
    ow.prototype.getKeys = ow.prototype.O;
    ow.prototype.getProperties = ow.prototype.N;
    ow.prototype.set = ow.prototype.set;
    ow.prototype.setProperties = ow.prototype.H;
    ow.prototype.unset = ow.prototype.P;
    ow.prototype.changed = ow.prototype.s;
    ow.prototype.dispatchEvent = ow.prototype.b;
    ow.prototype.getRevision = ow.prototype.L;
    ow.prototype.on = ow.prototype.J;
    ow.prototype.once = ow.prototype.once;
    ow.prototype.un = ow.prototype.K;
    pw.prototype.getAttributions = pw.prototype.xa;
    pw.prototype.getLogo = pw.prototype.wa;
    pw.prototype.getProjection = pw.prototype.ya;
    pw.prototype.getState = pw.prototype.V;
    pw.prototype.refresh = pw.prototype.va;
    pw.prototype.setAttributions = pw.prototype.ua;
    pw.prototype.get = pw.prototype.get;
    pw.prototype.getKeys = pw.prototype.O;
    pw.prototype.getProperties = pw.prototype.N;
    pw.prototype.set = pw.prototype.set;
    pw.prototype.setProperties = pw.prototype.H;
    pw.prototype.unset = pw.prototype.P;
    pw.prototype.changed = pw.prototype.s;
    pw.prototype.dispatchEvent = pw.prototype.b;
    pw.prototype.getRevision = pw.prototype.L;
    pw.prototype.on = pw.prototype.J;
    pw.prototype.once = pw.prototype.once;
    pw.prototype.un = pw.prototype.K;
    tv.prototype.getAttributions = tv.prototype.xa;
    tv.prototype.getLogo = tv.prototype.wa;
    tv.prototype.getProjection = tv.prototype.ya;
    tv.prototype.getState = tv.prototype.V;
    tv.prototype.refresh = tv.prototype.va;
    tv.prototype.setAttributions = tv.prototype.ua;
    tv.prototype.get = tv.prototype.get;
    tv.prototype.getKeys = tv.prototype.O;
    tv.prototype.getProperties = tv.prototype.N;
    tv.prototype.set = tv.prototype.set;
    tv.prototype.setProperties = tv.prototype.H;
    tv.prototype.unset = tv.prototype.P;
    tv.prototype.changed = tv.prototype.s;
    tv.prototype.dispatchEvent = tv.prototype.b;
    tv.prototype.getRevision = tv.prototype.L;
    tv.prototype.on = tv.prototype.J;
    tv.prototype.once = tv.prototype.once;
    tv.prototype.un = tv.prototype.K;
    qw.prototype.getAttributions = qw.prototype.xa;
    qw.prototype.getLogo = qw.prototype.wa;
    qw.prototype.getProjection = qw.prototype.ya;
    qw.prototype.getState = qw.prototype.V;
    qw.prototype.refresh = qw.prototype.va;
    qw.prototype.setAttributions = qw.prototype.ua;
    qw.prototype.get = qw.prototype.get;
    qw.prototype.getKeys = qw.prototype.O;
    qw.prototype.getProperties = qw.prototype.N;
    qw.prototype.set = qw.prototype.set;
    qw.prototype.setProperties = qw.prototype.H;
    qw.prototype.unset = qw.prototype.P;
    qw.prototype.changed = qw.prototype.s;
    qw.prototype.dispatchEvent = qw.prototype.b;
    qw.prototype.getRevision = qw.prototype.L;
    qw.prototype.on = qw.prototype.J;
    qw.prototype.once = qw.prototype.once;
    qw.prototype.un = qw.prototype.K;
    uw.prototype.setRenderReprojectionEdges = uw.prototype.Nb;
    uw.prototype.setTileGridForProjection = uw.prototype.Ob;
    uw.prototype.getTileLoadFunction = uw.prototype.ob;
    uw.prototype.getTileUrlFunction = uw.prototype.qb;
    uw.prototype.getUrls = uw.prototype.rb;
    uw.prototype.setTileLoadFunction = uw.prototype.xb;
    uw.prototype.setTileUrlFunction = uw.prototype.bb;
    uw.prototype.setUrl = uw.prototype.jb;
    uw.prototype.setUrls = uw.prototype.cb;
    uw.prototype.getTileGrid = uw.prototype.ab;
    uw.prototype.refresh = uw.prototype.va;
    uw.prototype.getAttributions = uw.prototype.xa;
    uw.prototype.getLogo = uw.prototype.wa;
    uw.prototype.getProjection = uw.prototype.ya;
    uw.prototype.getState = uw.prototype.V;
    uw.prototype.setAttributions = uw.prototype.ua;
    uw.prototype.get = uw.prototype.get;
    uw.prototype.getKeys = uw.prototype.O;
    uw.prototype.getProperties = uw.prototype.N;
    uw.prototype.set = uw.prototype.set;
    uw.prototype.setProperties = uw.prototype.H;
    uw.prototype.unset = uw.prototype.P;
    uw.prototype.changed = uw.prototype.s;
    uw.prototype.dispatchEvent = uw.prototype.b;
    uw.prototype.getRevision = uw.prototype.L;
    uw.prototype.on = uw.prototype.J;
    uw.prototype.once = uw.prototype.once;
    uw.prototype.un = uw.prototype.K;
    ww.prototype.getAttributions = ww.prototype.xa;
    ww.prototype.getLogo = ww.prototype.wa;
    ww.prototype.getProjection = ww.prototype.ya;
    ww.prototype.getState = ww.prototype.V;
    ww.prototype.refresh = ww.prototype.va;
    ww.prototype.setAttributions = ww.prototype.ua;
    ww.prototype.get = ww.prototype.get;
    ww.prototype.getKeys = ww.prototype.O;
    ww.prototype.getProperties = ww.prototype.N;
    ww.prototype.set = ww.prototype.set;
    ww.prototype.setProperties = ww.prototype.H;
    ww.prototype.unset = ww.prototype.P;
    ww.prototype.changed = ww.prototype.s;
    ww.prototype.dispatchEvent = ww.prototype.b;
    ww.prototype.getRevision = ww.prototype.L;
    ww.prototype.on = ww.prototype.J;
    ww.prototype.once = ww.prototype.once;
    ww.prototype.un = ww.prototype.K;
    Bw.prototype.type = Bw.prototype.type;
    Bw.prototype.target = Bw.prototype.target;
    Bw.prototype.preventDefault = Bw.prototype.preventDefault;
    Bw.prototype.stopPropagation = Bw.prototype.stopPropagation;
    Ew.prototype.setRenderReprojectionEdges = Ew.prototype.Nb;
    Ew.prototype.setTileGridForProjection = Ew.prototype.Ob;
    Ew.prototype.getTileLoadFunction = Ew.prototype.ob;
    Ew.prototype.getTileUrlFunction = Ew.prototype.qb;
    Ew.prototype.getUrls = Ew.prototype.rb;
    Ew.prototype.setTileLoadFunction = Ew.prototype.xb;
    Ew.prototype.setTileUrlFunction = Ew.prototype.bb;
    Ew.prototype.setUrl = Ew.prototype.jb;
    Ew.prototype.setUrls = Ew.prototype.cb;
    Ew.prototype.getTileGrid = Ew.prototype.ab;
    Ew.prototype.refresh = Ew.prototype.va;
    Ew.prototype.getAttributions = Ew.prototype.xa;
    Ew.prototype.getLogo = Ew.prototype.wa;
    Ew.prototype.getProjection = Ew.prototype.ya;
    Ew.prototype.getState = Ew.prototype.V;
    Ew.prototype.setAttributions = Ew.prototype.ua;
    Ew.prototype.get = Ew.prototype.get;
    Ew.prototype.getKeys = Ew.prototype.O;
    Ew.prototype.getProperties = Ew.prototype.N;
    Ew.prototype.set = Ew.prototype.set;
    Ew.prototype.setProperties = Ew.prototype.H;
    Ew.prototype.unset = Ew.prototype.P;
    Ew.prototype.changed = Ew.prototype.s;
    Ew.prototype.dispatchEvent = Ew.prototype.b;
    Ew.prototype.getRevision = Ew.prototype.L;
    Ew.prototype.on = Ew.prototype.J;
    Ew.prototype.once = Ew.prototype.once;
    Ew.prototype.un = Ew.prototype.K;
    $v.prototype.type = $v.prototype.type;
    $v.prototype.target = $v.prototype.target;
    $v.prototype.preventDefault = $v.prototype.preventDefault;
    $v.prototype.stopPropagation = $v.prototype.stopPropagation;
    Iw.prototype.setRenderReprojectionEdges = Iw.prototype.Nb;
    Iw.prototype.setTileGridForProjection = Iw.prototype.Ob;
    Iw.prototype.getTileLoadFunction = Iw.prototype.ob;
    Iw.prototype.getTileUrlFunction = Iw.prototype.qb;
    Iw.prototype.getUrls = Iw.prototype.rb;
    Iw.prototype.setTileLoadFunction = Iw.prototype.xb;
    Iw.prototype.setTileUrlFunction = Iw.prototype.bb;
    Iw.prototype.setUrl = Iw.prototype.jb;
    Iw.prototype.setUrls = Iw.prototype.cb;
    Iw.prototype.getTileGrid = Iw.prototype.ab;
    Iw.prototype.refresh = Iw.prototype.va;
    Iw.prototype.getAttributions = Iw.prototype.xa;
    Iw.prototype.getLogo = Iw.prototype.wa;
    Iw.prototype.getProjection = Iw.prototype.ya;
    Iw.prototype.getState = Iw.prototype.V;
    Iw.prototype.setAttributions = Iw.prototype.ua;
    Iw.prototype.get = Iw.prototype.get;
    Iw.prototype.getKeys = Iw.prototype.O;
    Iw.prototype.getProperties = Iw.prototype.N;
    Iw.prototype.set = Iw.prototype.set;
    Iw.prototype.setProperties = Iw.prototype.H;
    Iw.prototype.unset = Iw.prototype.P;
    Iw.prototype.changed = Iw.prototype.s;
    Iw.prototype.dispatchEvent = Iw.prototype.b;
    Iw.prototype.getRevision = Iw.prototype.L;
    Iw.prototype.on = Iw.prototype.J;
    Iw.prototype.once = Iw.prototype.once;
    Iw.prototype.un = Iw.prototype.K;
    Kw.prototype.getTileGrid = Kw.prototype.ab;
    Kw.prototype.refresh = Kw.prototype.va;
    Kw.prototype.getAttributions = Kw.prototype.xa;
    Kw.prototype.getLogo = Kw.prototype.wa;
    Kw.prototype.getProjection = Kw.prototype.ya;
    Kw.prototype.getState = Kw.prototype.V;
    Kw.prototype.setAttributions = Kw.prototype.ua;
    Kw.prototype.get = Kw.prototype.get;
    Kw.prototype.getKeys = Kw.prototype.O;
    Kw.prototype.getProperties = Kw.prototype.N;
    Kw.prototype.set = Kw.prototype.set;
    Kw.prototype.setProperties = Kw.prototype.H;
    Kw.prototype.unset = Kw.prototype.P;
    Kw.prototype.changed = Kw.prototype.s;
    Kw.prototype.dispatchEvent = Kw.prototype.b;
    Kw.prototype.getRevision = Kw.prototype.L;
    Kw.prototype.on = Kw.prototype.J;
    Kw.prototype.once = Kw.prototype.once;
    Kw.prototype.un = Kw.prototype.K;
    Mw.prototype.setRenderReprojectionEdges = Mw.prototype.Nb;
    Mw.prototype.setTileGridForProjection = Mw.prototype.Ob;
    Mw.prototype.getTileLoadFunction = Mw.prototype.ob;
    Mw.prototype.getTileUrlFunction = Mw.prototype.qb;
    Mw.prototype.getUrls = Mw.prototype.rb;
    Mw.prototype.setTileLoadFunction = Mw.prototype.xb;
    Mw.prototype.setTileUrlFunction = Mw.prototype.bb;
    Mw.prototype.setUrl = Mw.prototype.jb;
    Mw.prototype.setUrls = Mw.prototype.cb;
    Mw.prototype.getTileGrid = Mw.prototype.ab;
    Mw.prototype.refresh = Mw.prototype.va;
    Mw.prototype.getAttributions = Mw.prototype.xa;
    Mw.prototype.getLogo = Mw.prototype.wa;
    Mw.prototype.getProjection = Mw.prototype.ya;
    Mw.prototype.getState = Mw.prototype.V;
    Mw.prototype.setAttributions = Mw.prototype.ua;
    Mw.prototype.get = Mw.prototype.get;
    Mw.prototype.getKeys = Mw.prototype.O;
    Mw.prototype.getProperties = Mw.prototype.N;
    Mw.prototype.set = Mw.prototype.set;
    Mw.prototype.setProperties = Mw.prototype.H;
    Mw.prototype.unset = Mw.prototype.P;
    Mw.prototype.changed = Mw.prototype.s;
    Mw.prototype.dispatchEvent = Mw.prototype.b;
    Mw.prototype.getRevision = Mw.prototype.L;
    Mw.prototype.on = Mw.prototype.J;
    Mw.prototype.once = Mw.prototype.once;
    Mw.prototype.un = Mw.prototype.K;
    Nw.prototype.getTileGrid = Nw.prototype.ab;
    Nw.prototype.refresh = Nw.prototype.va;
    Nw.prototype.getAttributions = Nw.prototype.xa;
    Nw.prototype.getLogo = Nw.prototype.wa;
    Nw.prototype.getProjection = Nw.prototype.ya;
    Nw.prototype.getState = Nw.prototype.V;
    Nw.prototype.setAttributions = Nw.prototype.ua;
    Nw.prototype.get = Nw.prototype.get;
    Nw.prototype.getKeys = Nw.prototype.O;
    Nw.prototype.getProperties = Nw.prototype.N;
    Nw.prototype.set = Nw.prototype.set;
    Nw.prototype.setProperties = Nw.prototype.H;
    Nw.prototype.unset = Nw.prototype.P;
    Nw.prototype.changed = Nw.prototype.s;
    Nw.prototype.dispatchEvent = Nw.prototype.b;
    Nw.prototype.getRevision = Nw.prototype.L;
    Nw.prototype.on = Nw.prototype.J;
    Nw.prototype.once = Nw.prototype.once;
    Nw.prototype.un = Nw.prototype.K;
    Rw.prototype.setRenderReprojectionEdges = Rw.prototype.Nb;
    Rw.prototype.setTileGridForProjection = Rw.prototype.Ob;
    Rw.prototype.getTileLoadFunction = Rw.prototype.ob;
    Rw.prototype.getTileUrlFunction = Rw.prototype.qb;
    Rw.prototype.getUrls = Rw.prototype.rb;
    Rw.prototype.setTileLoadFunction = Rw.prototype.xb;
    Rw.prototype.setTileUrlFunction = Rw.prototype.bb;
    Rw.prototype.setUrl = Rw.prototype.jb;
    Rw.prototype.setUrls = Rw.prototype.cb;
    Rw.prototype.getTileGrid = Rw.prototype.ab;
    Rw.prototype.refresh = Rw.prototype.va;
    Rw.prototype.getAttributions = Rw.prototype.xa;
    Rw.prototype.getLogo = Rw.prototype.wa;
    Rw.prototype.getProjection = Rw.prototype.ya;
    Rw.prototype.getState = Rw.prototype.V;
    Rw.prototype.setAttributions = Rw.prototype.ua;
    Rw.prototype.get = Rw.prototype.get;
    Rw.prototype.getKeys = Rw.prototype.O;
    Rw.prototype.getProperties = Rw.prototype.N;
    Rw.prototype.set = Rw.prototype.set;
    Rw.prototype.setProperties = Rw.prototype.H;
    Rw.prototype.unset = Rw.prototype.P;
    Rw.prototype.changed = Rw.prototype.s;
    Rw.prototype.dispatchEvent = Rw.prototype.b;
    Rw.prototype.getRevision = Rw.prototype.L;
    Rw.prototype.on = Rw.prototype.J;
    Rw.prototype.once = Rw.prototype.once;
    Rw.prototype.un = Rw.prototype.K;
    Nt.prototype.type = Nt.prototype.type;
    Nt.prototype.target = Nt.prototype.target;
    Nt.prototype.preventDefault = Nt.prototype.preventDefault;
    Nt.prototype.stopPropagation = Nt.prototype.stopPropagation;
    Yw.prototype.getTileLoadFunction = Yw.prototype.ob;
    Yw.prototype.getTileUrlFunction = Yw.prototype.qb;
    Yw.prototype.getUrls = Yw.prototype.rb;
    Yw.prototype.setTileLoadFunction = Yw.prototype.xb;
    Yw.prototype.setTileUrlFunction = Yw.prototype.bb;
    Yw.prototype.setUrl = Yw.prototype.jb;
    Yw.prototype.setUrls = Yw.prototype.cb;
    Yw.prototype.getTileGrid = Yw.prototype.ab;
    Yw.prototype.refresh = Yw.prototype.va;
    Yw.prototype.getAttributions = Yw.prototype.xa;
    Yw.prototype.getLogo = Yw.prototype.wa;
    Yw.prototype.getProjection = Yw.prototype.ya;
    Yw.prototype.getState = Yw.prototype.V;
    Yw.prototype.setAttributions = Yw.prototype.ua;
    Yw.prototype.get = Yw.prototype.get;
    Yw.prototype.getKeys = Yw.prototype.O;
    Yw.prototype.getProperties = Yw.prototype.N;
    Yw.prototype.set = Yw.prototype.set;
    Yw.prototype.setProperties = Yw.prototype.H;
    Yw.prototype.unset = Yw.prototype.P;
    Yw.prototype.changed = Yw.prototype.s;
    Yw.prototype.dispatchEvent = Yw.prototype.b;
    Yw.prototype.getRevision = Yw.prototype.L;
    Yw.prototype.on = Yw.prototype.J;
    Yw.prototype.once = Yw.prototype.once;
    Yw.prototype.un = Yw.prototype.K;
    Y.prototype.setRenderReprojectionEdges = Y.prototype.Nb;
    Y.prototype.setTileGridForProjection = Y.prototype.Ob;
    Y.prototype.getTileLoadFunction = Y.prototype.ob;
    Y.prototype.getTileUrlFunction = Y.prototype.qb;
    Y.prototype.getUrls = Y.prototype.rb;
    Y.prototype.setTileLoadFunction = Y.prototype.xb;
    Y.prototype.setTileUrlFunction = Y.prototype.bb;
    Y.prototype.setUrl = Y.prototype.jb;
    Y.prototype.setUrls = Y.prototype.cb;
    Y.prototype.getTileGrid = Y.prototype.ab;
    Y.prototype.refresh = Y.prototype.va;
    Y.prototype.getAttributions = Y.prototype.xa;
    Y.prototype.getLogo = Y.prototype.wa;
    Y.prototype.getProjection = Y.prototype.ya;
    Y.prototype.getState = Y.prototype.V;
    Y.prototype.setAttributions = Y.prototype.ua;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.getKeys = Y.prototype.O;
    Y.prototype.getProperties = Y.prototype.N;
    Y.prototype.set = Y.prototype.set;
    Y.prototype.setProperties = Y.prototype.H;
    Y.prototype.unset = Y.prototype.P;
    Y.prototype.changed = Y.prototype.s;
    Y.prototype.dispatchEvent = Y.prototype.b;
    Y.prototype.getRevision = Y.prototype.L;
    Y.prototype.on = Y.prototype.J;
    Y.prototype.once = Y.prototype.once;
    Y.prototype.un = Y.prototype.K;
    bx.prototype.setRenderReprojectionEdges = bx.prototype.Nb;
    bx.prototype.setTileGridForProjection = bx.prototype.Ob;
    bx.prototype.getTileLoadFunction = bx.prototype.ob;
    bx.prototype.getTileUrlFunction = bx.prototype.qb;
    bx.prototype.getUrls = bx.prototype.rb;
    bx.prototype.setTileLoadFunction = bx.prototype.xb;
    bx.prototype.setTileUrlFunction = bx.prototype.bb;
    bx.prototype.setUrl = bx.prototype.jb;
    bx.prototype.setUrls = bx.prototype.cb;
    bx.prototype.getTileGrid = bx.prototype.ab;
    bx.prototype.refresh = bx.prototype.va;
    bx.prototype.getAttributions = bx.prototype.xa;
    bx.prototype.getLogo = bx.prototype.wa;
    bx.prototype.getProjection = bx.prototype.ya;
    bx.prototype.getState = bx.prototype.V;
    bx.prototype.setAttributions = bx.prototype.ua;
    bx.prototype.get = bx.prototype.get;
    bx.prototype.getKeys = bx.prototype.O;
    bx.prototype.getProperties = bx.prototype.N;
    bx.prototype.set = bx.prototype.set;
    bx.prototype.setProperties = bx.prototype.H;
    bx.prototype.unset = bx.prototype.P;
    bx.prototype.changed = bx.prototype.s;
    bx.prototype.dispatchEvent = bx.prototype.b;
    bx.prototype.getRevision = bx.prototype.L;
    bx.prototype.on = bx.prototype.J;
    bx.prototype.once = bx.prototype.once;
    bx.prototype.un = bx.prototype.K;
    Pv.prototype.getTileCoord = Pv.prototype.i;
    Pv.prototype.load = Pv.prototype.load;
    dt.prototype.changed = dt.prototype.s;
    dt.prototype.dispatchEvent = dt.prototype.b;
    dt.prototype.getRevision = dt.prototype.L;
    dt.prototype.on = dt.prototype.J;
    dt.prototype.once = dt.prototype.once;
    dt.prototype.un = dt.prototype.K;
    Bt.prototype.changed = Bt.prototype.s;
    Bt.prototype.dispatchEvent = Bt.prototype.b;
    Bt.prototype.getRevision = Bt.prototype.L;
    Bt.prototype.on = Bt.prototype.J;
    Bt.prototype.once = Bt.prototype.once;
    Bt.prototype.un = Bt.prototype.K;
    vv.prototype.changed = vv.prototype.s;
    vv.prototype.dispatchEvent = vv.prototype.b;
    vv.prototype.getRevision = vv.prototype.L;
    vv.prototype.on = vv.prototype.J;
    vv.prototype.once = vv.prototype.once;
    vv.prototype.un = vv.prototype.K;
    Gv.prototype.changed = Gv.prototype.s;
    Gv.prototype.dispatchEvent = Gv.prototype.b;
    Gv.prototype.getRevision = Gv.prototype.L;
    Gv.prototype.on = Gv.prototype.J;
    Gv.prototype.once = Gv.prototype.once;
    Gv.prototype.un = Gv.prototype.K;
    Et.prototype.changed = Et.prototype.s;
    Et.prototype.dispatchEvent = Et.prototype.b;
    Et.prototype.getRevision = Et.prototype.L;
    Et.prototype.on = Et.prototype.J;
    Et.prototype.once = Et.prototype.once;
    Et.prototype.un = Et.prototype.K;
    mt.prototype.changed = mt.prototype.s;
    mt.prototype.dispatchEvent = mt.prototype.b;
    mt.prototype.getRevision = mt.prototype.L;
    mt.prototype.on = mt.prototype.J;
    mt.prototype.once = mt.prototype.once;
    mt.prototype.un = mt.prototype.K;
    cv.prototype.changed = cv.prototype.s;
    cv.prototype.dispatchEvent = cv.prototype.b;
    cv.prototype.getRevision = cv.prototype.L;
    cv.prototype.on = cv.prototype.J;
    cv.prototype.once = cv.prototype.once;
    cv.prototype.un = cv.prototype.K;
    dv.prototype.changed = dv.prototype.s;
    dv.prototype.dispatchEvent = dv.prototype.b;
    dv.prototype.getRevision = dv.prototype.L;
    dv.prototype.on = dv.prototype.J;
    dv.prototype.once = dv.prototype.once;
    dv.prototype.un = dv.prototype.K;
    zv.prototype.changed = zv.prototype.s;
    zv.prototype.dispatchEvent = zv.prototype.b;
    zv.prototype.getRevision = zv.prototype.L;
    zv.prototype.on = zv.prototype.J;
    zv.prototype.once = zv.prototype.once;
    zv.prototype.un = zv.prototype.K;
    ut.prototype.changed = ut.prototype.s;
    ut.prototype.dispatchEvent = ut.prototype.b;
    ut.prototype.getRevision = ut.prototype.L;
    ut.prototype.on = ut.prototype.J;
    ut.prototype.once = ut.prototype.once;
    ut.prototype.un = ut.prototype.K;
    Iv.prototype.changed = Iv.prototype.s;
    Iv.prototype.dispatchEvent = Iv.prototype.b;
    Iv.prototype.getRevision = Iv.prototype.L;
    Iv.prototype.on = Iv.prototype.J;
    Iv.prototype.once = Iv.prototype.once;
    Iv.prototype.un = Iv.prototype.K;
    Mh.prototype.type = Mh.prototype.type;
    Mh.prototype.target = Mh.prototype.target;
    Mh.prototype.preventDefault = Mh.prototype.preventDefault;
    Mh.prototype.stopPropagation = Mh.prototype.stopPropagation;
    ge.prototype.type = ge.prototype.type;
    ge.prototype.target = ge.prototype.target;
    ge.prototype.preventDefault = ge.prototype.preventDefault;
    ge.prototype.stopPropagation = ge.prototype.stopPropagation;
    dh.prototype.get = dh.prototype.get;
    dh.prototype.getKeys = dh.prototype.O;
    dh.prototype.getProperties = dh.prototype.N;
    dh.prototype.set = dh.prototype.set;
    dh.prototype.setProperties = dh.prototype.H;
    dh.prototype.unset = dh.prototype.P;
    dh.prototype.changed = dh.prototype.s;
    dh.prototype.dispatchEvent = dh.prototype.b;
    dh.prototype.getRevision = dh.prototype.L;
    dh.prototype.on = dh.prototype.J;
    dh.prototype.once = dh.prototype.once;
    dh.prototype.un = dh.prototype.K;
    fh.prototype.getExtent = fh.prototype.D;
    fh.prototype.getMaxResolution = fh.prototype.gc;
    fh.prototype.getMinResolution = fh.prototype.hc;
    fh.prototype.getOpacity = fh.prototype.ic;
    fh.prototype.getVisible = fh.prototype.Kb;
    fh.prototype.getZIndex = fh.prototype.za;
    fh.prototype.setExtent = fh.prototype.uc;
    fh.prototype.setMaxResolution = fh.prototype.zc;
    fh.prototype.setMinResolution = fh.prototype.Ac;
    fh.prototype.setOpacity = fh.prototype.vc;
    fh.prototype.setVisible = fh.prototype.wc;
    fh.prototype.setZIndex = fh.prototype.Wb;
    fh.prototype.get = fh.prototype.get;
    fh.prototype.getKeys = fh.prototype.O;
    fh.prototype.getProperties = fh.prototype.N;
    fh.prototype.set = fh.prototype.set;
    fh.prototype.setProperties = fh.prototype.H;
    fh.prototype.unset = fh.prototype.P;
    fh.prototype.changed = fh.prototype.s;
    fh.prototype.dispatchEvent = fh.prototype.b;
    fh.prototype.getRevision = fh.prototype.L;
    fh.prototype.on = fh.prototype.J;
    fh.prototype.once = fh.prototype.once;
    fh.prototype.un = fh.prototype.K;
    rh.prototype.getExtent = rh.prototype.D;
    rh.prototype.getMaxResolution = rh.prototype.gc;
    rh.prototype.getMinResolution = rh.prototype.hc;
    rh.prototype.getOpacity = rh.prototype.ic;
    rh.prototype.getVisible = rh.prototype.Kb;
    rh.prototype.getZIndex = rh.prototype.za;
    rh.prototype.setExtent = rh.prototype.uc;
    rh.prototype.setMaxResolution = rh.prototype.zc;
    rh.prototype.setMinResolution = rh.prototype.Ac;
    rh.prototype.setOpacity = rh.prototype.vc;
    rh.prototype.setVisible = rh.prototype.wc;
    rh.prototype.setZIndex = rh.prototype.Wb;
    rh.prototype.get = rh.prototype.get;
    rh.prototype.getKeys = rh.prototype.O;
    rh.prototype.getProperties = rh.prototype.N;
    rh.prototype.set = rh.prototype.set;
    rh.prototype.setProperties = rh.prototype.H;
    rh.prototype.unset = rh.prototype.P;
    rh.prototype.changed = rh.prototype.s;
    rh.prototype.dispatchEvent = rh.prototype.b;
    rh.prototype.getRevision = rh.prototype.L;
    rh.prototype.on = rh.prototype.J;
    rh.prototype.once = rh.prototype.once;
    rh.prototype.un = rh.prototype.K;
    R.prototype.setMap = R.prototype.setMap;
    R.prototype.setSource = R.prototype.Yc;
    R.prototype.getExtent = R.prototype.D;
    R.prototype.getMaxResolution = R.prototype.gc;
    R.prototype.getMinResolution = R.prototype.hc;
    R.prototype.getOpacity = R.prototype.ic;
    R.prototype.getVisible = R.prototype.Kb;
    R.prototype.getZIndex = R.prototype.za;
    R.prototype.setExtent = R.prototype.uc;
    R.prototype.setMaxResolution = R.prototype.zc;
    R.prototype.setMinResolution = R.prototype.Ac;
    R.prototype.setOpacity = R.prototype.vc;
    R.prototype.setVisible = R.prototype.wc;
    R.prototype.setZIndex = R.prototype.Wb;
    R.prototype.get = R.prototype.get;
    R.prototype.getKeys = R.prototype.O;
    R.prototype.getProperties = R.prototype.N;
    R.prototype.set = R.prototype.set;
    R.prototype.setProperties = R.prototype.H;
    R.prototype.unset = R.prototype.P;
    R.prototype.changed = R.prototype.s;
    R.prototype.dispatchEvent = R.prototype.b;
    R.prototype.getRevision = R.prototype.L;
    R.prototype.on = R.prototype.J;
    R.prototype.once = R.prototype.once;
    R.prototype.un = R.prototype.K;
    T.prototype.getSource = T.prototype.la;
    T.prototype.getStyle = T.prototype.C;
    T.prototype.getStyleFunction = T.prototype.G;
    T.prototype.setStyle = T.prototype.g;
    T.prototype.setMap = T.prototype.setMap;
    T.prototype.setSource = T.prototype.Yc;
    T.prototype.getExtent = T.prototype.D;
    T.prototype.getMaxResolution = T.prototype.gc;
    T.prototype.getMinResolution = T.prototype.hc;
    T.prototype.getOpacity = T.prototype.ic;
    T.prototype.getVisible = T.prototype.Kb;
    T.prototype.getZIndex = T.prototype.za;
    T.prototype.setExtent = T.prototype.uc;
    T.prototype.setMaxResolution = T.prototype.zc;
    T.prototype.setMinResolution = T.prototype.Ac;
    T.prototype.setOpacity = T.prototype.vc;
    T.prototype.setVisible = T.prototype.wc;
    T.prototype.setZIndex = T.prototype.Wb;
    T.prototype.get = T.prototype.get;
    T.prototype.getKeys = T.prototype.O;
    T.prototype.getProperties = T.prototype.N;
    T.prototype.set = T.prototype.set;
    T.prototype.setProperties = T.prototype.H;
    T.prototype.unset = T.prototype.P;
    T.prototype.changed = T.prototype.s;
    T.prototype.dispatchEvent = T.prototype.b;
    T.prototype.getRevision = T.prototype.L;
    T.prototype.on = T.prototype.J;
    T.prototype.once = T.prototype.once;
    T.prototype.un = T.prototype.K;
    yv.prototype.setMap = yv.prototype.setMap;
    yv.prototype.setSource = yv.prototype.Yc;
    yv.prototype.getExtent = yv.prototype.D;
    yv.prototype.getMaxResolution = yv.prototype.gc;
    yv.prototype.getMinResolution = yv.prototype.hc;
    yv.prototype.getOpacity = yv.prototype.ic;
    yv.prototype.getVisible = yv.prototype.Kb;
    yv.prototype.getZIndex = yv.prototype.za;
    yv.prototype.setExtent = yv.prototype.uc;
    yv.prototype.setMaxResolution = yv.prototype.zc;
    yv.prototype.setMinResolution = yv.prototype.Ac;
    yv.prototype.setOpacity = yv.prototype.vc;
    yv.prototype.setVisible = yv.prototype.wc;
    yv.prototype.setZIndex = yv.prototype.Wb;
    yv.prototype.get = yv.prototype.get;
    yv.prototype.getKeys = yv.prototype.O;
    yv.prototype.getProperties = yv.prototype.N;
    yv.prototype.set = yv.prototype.set;
    yv.prototype.setProperties = yv.prototype.H;
    yv.prototype.unset = yv.prototype.P;
    yv.prototype.changed = yv.prototype.s;
    yv.prototype.dispatchEvent = yv.prototype.b;
    yv.prototype.getRevision = yv.prototype.L;
    yv.prototype.on = yv.prototype.J;
    yv.prototype.once = yv.prototype.once;
    yv.prototype.un = yv.prototype.K;
    Hv.prototype.setMap = Hv.prototype.setMap;
    Hv.prototype.setSource = Hv.prototype.Yc;
    Hv.prototype.getExtent = Hv.prototype.D;
    Hv.prototype.getMaxResolution = Hv.prototype.gc;
    Hv.prototype.getMinResolution = Hv.prototype.hc;
    Hv.prototype.getOpacity = Hv.prototype.ic;
    Hv.prototype.getVisible = Hv.prototype.Kb;
    Hv.prototype.getZIndex = Hv.prototype.za;
    Hv.prototype.setExtent = Hv.prototype.uc;
    Hv.prototype.setMaxResolution = Hv.prototype.zc;
    Hv.prototype.setMinResolution = Hv.prototype.Ac;
    Hv.prototype.setOpacity = Hv.prototype.vc;
    Hv.prototype.setVisible = Hv.prototype.wc;
    Hv.prototype.setZIndex = Hv.prototype.Wb;
    Hv.prototype.get = Hv.prototype.get;
    Hv.prototype.getKeys = Hv.prototype.O;
    Hv.prototype.getProperties = Hv.prototype.N;
    Hv.prototype.set = Hv.prototype.set;
    Hv.prototype.setProperties = Hv.prototype.H;
    Hv.prototype.unset = Hv.prototype.P;
    Hv.prototype.changed = Hv.prototype.s;
    Hv.prototype.dispatchEvent = Hv.prototype.b;
    Hv.prototype.getRevision = Hv.prototype.L;
    Hv.prototype.on = Hv.prototype.J;
    Hv.prototype.once = Hv.prototype.once;
    Hv.prototype.un = Hv.prototype.K;
    U.prototype.getSource = U.prototype.la;
    U.prototype.getStyle = U.prototype.C;
    U.prototype.getStyleFunction = U.prototype.G;
    U.prototype.setStyle = U.prototype.g;
    U.prototype.setMap = U.prototype.setMap;
    U.prototype.setSource = U.prototype.Yc;
    U.prototype.getExtent = U.prototype.D;
    U.prototype.getMaxResolution = U.prototype.gc;
    U.prototype.getMinResolution = U.prototype.hc;
    U.prototype.getOpacity = U.prototype.ic;
    U.prototype.getVisible = U.prototype.Kb;
    U.prototype.getZIndex = U.prototype.za;
    U.prototype.setExtent = U.prototype.uc;
    U.prototype.setMaxResolution = U.prototype.zc;
    U.prototype.setMinResolution = U.prototype.Ac;
    U.prototype.setOpacity = U.prototype.vc;
    U.prototype.setVisible = U.prototype.wc;
    U.prototype.setZIndex = U.prototype.Wb;
    U.prototype.get = U.prototype.get;
    U.prototype.getKeys = U.prototype.O;
    U.prototype.getProperties = U.prototype.N;
    U.prototype.set = U.prototype.set;
    U.prototype.setProperties = U.prototype.H;
    U.prototype.unset = U.prototype.P;
    U.prototype.changed = U.prototype.s;
    U.prototype.dispatchEvent = U.prototype.b;
    U.prototype.getRevision = U.prototype.L;
    U.prototype.on = U.prototype.J;
    U.prototype.once = U.prototype.once;
    U.prototype.un = U.prototype.K;
    ag.prototype.get = ag.prototype.get;
    ag.prototype.getKeys = ag.prototype.O;
    ag.prototype.getProperties = ag.prototype.N;
    ag.prototype.set = ag.prototype.set;
    ag.prototype.setProperties = ag.prototype.H;
    ag.prototype.unset = ag.prototype.P;
    ag.prototype.changed = ag.prototype.s;
    ag.prototype.dispatchEvent = ag.prototype.b;
    ag.prototype.getRevision = ag.prototype.L;
    ag.prototype.on = ag.prototype.J;
    ag.prototype.once = ag.prototype.once;
    ag.prototype.un = ag.prototype.K;
    eg.prototype.getActive = eg.prototype.c;
    eg.prototype.getMap = eg.prototype.i;
    eg.prototype.setActive = eg.prototype.Ia;
    eg.prototype.get = eg.prototype.get;
    eg.prototype.getKeys = eg.prototype.O;
    eg.prototype.getProperties = eg.prototype.N;
    eg.prototype.set = eg.prototype.set;
    eg.prototype.setProperties = eg.prototype.H;
    eg.prototype.unset = eg.prototype.P;
    eg.prototype.changed = eg.prototype.s;
    eg.prototype.dispatchEvent = eg.prototype.b;
    eg.prototype.getRevision = eg.prototype.L;
    eg.prototype.on = eg.prototype.J;
    eg.prototype.once = eg.prototype.once;
    eg.prototype.un = eg.prototype.K;
    zs.prototype.getActive = zs.prototype.c;
    zs.prototype.getMap = zs.prototype.i;
    zs.prototype.setActive = zs.prototype.Ia;
    zs.prototype.get = zs.prototype.get;
    zs.prototype.getKeys = zs.prototype.O;
    zs.prototype.getProperties = zs.prototype.N;
    zs.prototype.set = zs.prototype.set;
    zs.prototype.setProperties = zs.prototype.H;
    zs.prototype.unset = zs.prototype.P;
    zs.prototype.changed = zs.prototype.s;
    zs.prototype.dispatchEvent = zs.prototype.b;
    zs.prototype.getRevision = zs.prototype.L;
    zs.prototype.on = zs.prototype.J;
    zs.prototype.once = zs.prototype.once;
    zs.prototype.un = zs.prototype.K;
    Cs.prototype.type = Cs.prototype.type;
    Cs.prototype.target = Cs.prototype.target;
    Cs.prototype.preventDefault = Cs.prototype.preventDefault;
    Cs.prototype.stopPropagation = Cs.prototype.stopPropagation;
    pg.prototype.getActive = pg.prototype.c;
    pg.prototype.getMap = pg.prototype.i;
    pg.prototype.setActive = pg.prototype.Ia;
    pg.prototype.get = pg.prototype.get;
    pg.prototype.getKeys = pg.prototype.O;
    pg.prototype.getProperties = pg.prototype.N;
    pg.prototype.set = pg.prototype.set;
    pg.prototype.setProperties = pg.prototype.H;
    pg.prototype.unset = pg.prototype.P;
    pg.prototype.changed = pg.prototype.s;
    pg.prototype.dispatchEvent = pg.prototype.b;
    pg.prototype.getRevision = pg.prototype.L;
    pg.prototype.on = pg.prototype.J;
    pg.prototype.once = pg.prototype.once;
    pg.prototype.un = pg.prototype.K;
    Dg.prototype.getActive = Dg.prototype.c;
    Dg.prototype.getMap = Dg.prototype.i;
    Dg.prototype.setActive = Dg.prototype.Ia;
    Dg.prototype.get = Dg.prototype.get;
    Dg.prototype.getKeys = Dg.prototype.O;
    Dg.prototype.getProperties = Dg.prototype.N;
    Dg.prototype.set = Dg.prototype.set;
    Dg.prototype.setProperties = Dg.prototype.H;
    Dg.prototype.unset = Dg.prototype.P;
    Dg.prototype.changed = Dg.prototype.s;
    Dg.prototype.dispatchEvent = Dg.prototype.b;
    Dg.prototype.getRevision = Dg.prototype.L;
    Dg.prototype.on = Dg.prototype.J;
    Dg.prototype.once = Dg.prototype.once;
    Dg.prototype.un = Dg.prototype.K;
    Ig.prototype.type = Ig.prototype.type;
    Ig.prototype.target = Ig.prototype.target;
    Ig.prototype.preventDefault = Ig.prototype.preventDefault;
    Ig.prototype.stopPropagation = Ig.prototype.stopPropagation;
    sg.prototype.getActive = sg.prototype.c;
    sg.prototype.getMap = sg.prototype.i;
    sg.prototype.setActive = sg.prototype.Ia;
    sg.prototype.get = sg.prototype.get;
    sg.prototype.getKeys = sg.prototype.O;
    sg.prototype.getProperties = sg.prototype.N;
    sg.prototype.set = sg.prototype.set;
    sg.prototype.setProperties = sg.prototype.H;
    sg.prototype.unset = sg.prototype.P;
    sg.prototype.changed = sg.prototype.s;
    sg.prototype.dispatchEvent = sg.prototype.b;
    sg.prototype.getRevision = sg.prototype.L;
    sg.prototype.on = sg.prototype.J;
    sg.prototype.once = sg.prototype.once;
    sg.prototype.un = sg.prototype.K;
    wg.prototype.getActive = wg.prototype.c;
    wg.prototype.getMap = wg.prototype.i;
    wg.prototype.setActive = wg.prototype.Ia;
    wg.prototype.get = wg.prototype.get;
    wg.prototype.getKeys = wg.prototype.O;
    wg.prototype.getProperties = wg.prototype.N;
    wg.prototype.set = wg.prototype.set;
    wg.prototype.setProperties = wg.prototype.H;
    wg.prototype.unset = wg.prototype.P;
    wg.prototype.changed = wg.prototype.s;
    wg.prototype.dispatchEvent = wg.prototype.b;
    wg.prototype.getRevision = wg.prototype.L;
    wg.prototype.on = wg.prototype.J;
    wg.prototype.once = wg.prototype.once;
    wg.prototype.un = wg.prototype.K;
    Es.prototype.getActive = Es.prototype.c;
    Es.prototype.getMap = Es.prototype.i;
    Es.prototype.setActive = Es.prototype.Ia;
    Es.prototype.get = Es.prototype.get;
    Es.prototype.getKeys = Es.prototype.O;
    Es.prototype.getProperties = Es.prototype.N;
    Es.prototype.set = Es.prototype.set;
    Es.prototype.setProperties = Es.prototype.H;
    Es.prototype.unset = Es.prototype.P;
    Es.prototype.changed = Es.prototype.s;
    Es.prototype.dispatchEvent = Es.prototype.b;
    Es.prototype.getRevision = Es.prototype.L;
    Es.prototype.on = Es.prototype.J;
    Es.prototype.once = Es.prototype.once;
    Es.prototype.un = Es.prototype.K;
    Mg.prototype.getGeometry = Mg.prototype.U;
    Mg.prototype.getActive = Mg.prototype.c;
    Mg.prototype.getMap = Mg.prototype.i;
    Mg.prototype.setActive = Mg.prototype.Ia;
    Mg.prototype.get = Mg.prototype.get;
    Mg.prototype.getKeys = Mg.prototype.O;
    Mg.prototype.getProperties = Mg.prototype.N;
    Mg.prototype.set = Mg.prototype.set;
    Mg.prototype.setProperties = Mg.prototype.H;
    Mg.prototype.unset = Mg.prototype.P;
    Mg.prototype.changed = Mg.prototype.s;
    Mg.prototype.dispatchEvent = Mg.prototype.b;
    Mg.prototype.getRevision = Mg.prototype.L;
    Mg.prototype.on = Mg.prototype.J;
    Mg.prototype.once = Mg.prototype.once;
    Mg.prototype.un = Mg.prototype.K;
    Qt.prototype.getActive = Qt.prototype.c;
    Qt.prototype.getMap = Qt.prototype.i;
    Qt.prototype.setActive = Qt.prototype.Ia;
    Qt.prototype.get = Qt.prototype.get;
    Qt.prototype.getKeys = Qt.prototype.O;
    Qt.prototype.getProperties = Qt.prototype.N;
    Qt.prototype.set = Qt.prototype.set;
    Qt.prototype.setProperties = Qt.prototype.H;
    Qt.prototype.unset = Qt.prototype.P;
    Qt.prototype.changed = Qt.prototype.s;
    Qt.prototype.dispatchEvent = Qt.prototype.b;
    Qt.prototype.getRevision = Qt.prototype.L;
    Qt.prototype.on = Qt.prototype.J;
    Qt.prototype.once = Qt.prototype.once;
    Qt.prototype.un = Qt.prototype.K;
    eu.prototype.type = eu.prototype.type;
    eu.prototype.target = eu.prototype.target;
    eu.prototype.preventDefault = eu.prototype.preventDefault;
    eu.prototype.stopPropagation = eu.prototype.stopPropagation;
    gu.prototype.getActive = gu.prototype.c;
    gu.prototype.getMap = gu.prototype.i;
    gu.prototype.setActive = gu.prototype.Ia;
    gu.prototype.get = gu.prototype.get;
    gu.prototype.getKeys = gu.prototype.O;
    gu.prototype.getProperties = gu.prototype.N;
    gu.prototype.set = gu.prototype.set;
    gu.prototype.setProperties = gu.prototype.H;
    gu.prototype.unset = gu.prototype.P;
    gu.prototype.changed = gu.prototype.s;
    gu.prototype.dispatchEvent = gu.prototype.b;
    gu.prototype.getRevision = gu.prototype.L;
    gu.prototype.on = gu.prototype.J;
    gu.prototype.once = gu.prototype.once;
    gu.prototype.un = gu.prototype.K;
    ru.prototype.type = ru.prototype.type;
    ru.prototype.target = ru.prototype.target;
    ru.prototype.preventDefault = ru.prototype.preventDefault;
    ru.prototype.stopPropagation = ru.prototype.stopPropagation;
    Ng.prototype.getActive = Ng.prototype.c;
    Ng.prototype.getMap = Ng.prototype.i;
    Ng.prototype.setActive = Ng.prototype.Ia;
    Ng.prototype.get = Ng.prototype.get;
    Ng.prototype.getKeys = Ng.prototype.O;
    Ng.prototype.getProperties = Ng.prototype.N;
    Ng.prototype.set = Ng.prototype.set;
    Ng.prototype.setProperties = Ng.prototype.H;
    Ng.prototype.unset = Ng.prototype.P;
    Ng.prototype.changed = Ng.prototype.s;
    Ng.prototype.dispatchEvent = Ng.prototype.b;
    Ng.prototype.getRevision = Ng.prototype.L;
    Ng.prototype.on = Ng.prototype.J;
    Ng.prototype.once = Ng.prototype.once;
    Ng.prototype.un = Ng.prototype.K;
    Pg.prototype.getActive = Pg.prototype.c;
    Pg.prototype.getMap = Pg.prototype.i;
    Pg.prototype.setActive = Pg.prototype.Ia;
    Pg.prototype.get = Pg.prototype.get;
    Pg.prototype.getKeys = Pg.prototype.O;
    Pg.prototype.getProperties = Pg.prototype.N;
    Pg.prototype.set = Pg.prototype.set;
    Pg.prototype.setProperties = Pg.prototype.H;
    Pg.prototype.unset = Pg.prototype.P;
    Pg.prototype.changed = Pg.prototype.s;
    Pg.prototype.dispatchEvent = Pg.prototype.b;
    Pg.prototype.getRevision = Pg.prototype.L;
    Pg.prototype.on = Pg.prototype.J;
    Pg.prototype.once = Pg.prototype.once;
    Pg.prototype.un = Pg.prototype.K;
    tu.prototype.getActive = tu.prototype.c;
    tu.prototype.getMap = tu.prototype.i;
    tu.prototype.setActive = tu.prototype.Ia;
    tu.prototype.get = tu.prototype.get;
    tu.prototype.getKeys = tu.prototype.O;
    tu.prototype.getProperties = tu.prototype.N;
    tu.prototype.set = tu.prototype.set;
    tu.prototype.setProperties = tu.prototype.H;
    tu.prototype.unset = tu.prototype.P;
    tu.prototype.changed = tu.prototype.s;
    tu.prototype.dispatchEvent = tu.prototype.b;
    tu.prototype.getRevision = tu.prototype.L;
    tu.prototype.on = tu.prototype.J;
    tu.prototype.once = tu.prototype.once;
    tu.prototype.un = tu.prototype.K;
    Bu.prototype.type = Bu.prototype.type;
    Bu.prototype.target = Bu.prototype.target;
    Bu.prototype.preventDefault = Bu.prototype.preventDefault;
    Bu.prototype.stopPropagation = Bu.prototype.stopPropagation;
    Rg.prototype.getActive = Rg.prototype.c;
    Rg.prototype.getMap = Rg.prototype.i;
    Rg.prototype.setActive = Rg.prototype.Ia;
    Rg.prototype.get = Rg.prototype.get;
    Rg.prototype.getKeys = Rg.prototype.O;
    Rg.prototype.getProperties = Rg.prototype.N;
    Rg.prototype.set = Rg.prototype.set;
    Rg.prototype.setProperties = Rg.prototype.H;
    Rg.prototype.unset = Rg.prototype.P;
    Rg.prototype.changed = Rg.prototype.s;
    Rg.prototype.dispatchEvent = Rg.prototype.b;
    Rg.prototype.getRevision = Rg.prototype.L;
    Rg.prototype.on = Rg.prototype.J;
    Rg.prototype.once = Rg.prototype.once;
    Rg.prototype.un = Rg.prototype.K;
    Vg.prototype.getActive = Vg.prototype.c;
    Vg.prototype.getMap = Vg.prototype.i;
    Vg.prototype.setActive = Vg.prototype.Ia;
    Vg.prototype.get = Vg.prototype.get;
    Vg.prototype.getKeys = Vg.prototype.O;
    Vg.prototype.getProperties = Vg.prototype.N;
    Vg.prototype.set = Vg.prototype.set;
    Vg.prototype.setProperties = Vg.prototype.H;
    Vg.prototype.unset = Vg.prototype.P;
    Vg.prototype.changed = Vg.prototype.s;
    Vg.prototype.dispatchEvent = Vg.prototype.b;
    Vg.prototype.getRevision = Vg.prototype.L;
    Vg.prototype.on = Vg.prototype.J;
    Vg.prototype.once = Vg.prototype.once;
    Vg.prototype.un = Vg.prototype.K;
    Zg.prototype.getActive = Zg.prototype.c;
    Zg.prototype.getMap = Zg.prototype.i;
    Zg.prototype.setActive = Zg.prototype.Ia;
    Zg.prototype.get = Zg.prototype.get;
    Zg.prototype.getKeys = Zg.prototype.O;
    Zg.prototype.getProperties = Zg.prototype.N;
    Zg.prototype.set = Zg.prototype.set;
    Zg.prototype.setProperties = Zg.prototype.H;
    Zg.prototype.unset = Zg.prototype.P;
    Zg.prototype.changed = Zg.prototype.s;
    Zg.prototype.dispatchEvent = Zg.prototype.b;
    Zg.prototype.getRevision = Zg.prototype.L;
    Zg.prototype.on = Zg.prototype.J;
    Zg.prototype.once = Zg.prototype.once;
    Zg.prototype.un = Zg.prototype.K;
    Ju.prototype.getActive = Ju.prototype.c;
    Ju.prototype.getMap = Ju.prototype.i;
    Ju.prototype.setActive = Ju.prototype.Ia;
    Ju.prototype.get = Ju.prototype.get;
    Ju.prototype.getKeys = Ju.prototype.O;
    Ju.prototype.getProperties = Ju.prototype.N;
    Ju.prototype.set = Ju.prototype.set;
    Ju.prototype.setProperties = Ju.prototype.H;
    Ju.prototype.unset = Ju.prototype.P;
    Ju.prototype.changed = Ju.prototype.s;
    Ju.prototype.dispatchEvent = Ju.prototype.b;
    Ju.prototype.getRevision = Ju.prototype.L;
    Ju.prototype.on = Ju.prototype.J;
    Ju.prototype.once = Ju.prototype.once;
    Ju.prototype.un = Ju.prototype.K;
    Mu.prototype.type = Mu.prototype.type;
    Mu.prototype.target = Mu.prototype.target;
    Mu.prototype.preventDefault = Mu.prototype.preventDefault;
    Mu.prototype.stopPropagation = Mu.prototype.stopPropagation;
    Ou.prototype.getActive = Ou.prototype.c;
    Ou.prototype.getMap = Ou.prototype.i;
    Ou.prototype.setActive = Ou.prototype.Ia;
    Ou.prototype.get = Ou.prototype.get;
    Ou.prototype.getKeys = Ou.prototype.O;
    Ou.prototype.getProperties = Ou.prototype.N;
    Ou.prototype.set = Ou.prototype.set;
    Ou.prototype.setProperties = Ou.prototype.H;
    Ou.prototype.unset = Ou.prototype.P;
    Ou.prototype.changed = Ou.prototype.s;
    Ou.prototype.dispatchEvent = Ou.prototype.b;
    Ou.prototype.getRevision = Ou.prototype.L;
    Ou.prototype.on = Ou.prototype.J;
    Ou.prototype.once = Ou.prototype.once;
    Ou.prototype.un = Ou.prototype.K;
    Su.prototype.getActive = Su.prototype.c;
    Su.prototype.getMap = Su.prototype.i;
    Su.prototype.setActive = Su.prototype.Ia;
    Su.prototype.get = Su.prototype.get;
    Su.prototype.getKeys = Su.prototype.O;
    Su.prototype.getProperties = Su.prototype.N;
    Su.prototype.set = Su.prototype.set;
    Su.prototype.setProperties = Su.prototype.H;
    Su.prototype.unset = Su.prototype.P;
    Su.prototype.changed = Su.prototype.s;
    Su.prototype.dispatchEvent = Su.prototype.b;
    Su.prototype.getRevision = Su.prototype.L;
    Su.prototype.on = Su.prototype.J;
    Su.prototype.once = Su.prototype.once;
    Su.prototype.un = Su.prototype.K;
    Yu.prototype.type = Yu.prototype.type;
    Yu.prototype.target = Yu.prototype.target;
    Yu.prototype.preventDefault = Yu.prototype.preventDefault;
    Yu.prototype.stopPropagation = Yu.prototype.stopPropagation;
    cf.prototype.get = cf.prototype.get;
    cf.prototype.getKeys = cf.prototype.O;
    cf.prototype.getProperties = cf.prototype.N;
    cf.prototype.set = cf.prototype.set;
    cf.prototype.setProperties = cf.prototype.H;
    cf.prototype.unset = cf.prototype.P;
    cf.prototype.changed = cf.prototype.s;
    cf.prototype.dispatchEvent = cf.prototype.b;
    cf.prototype.getRevision = cf.prototype.L;
    cf.prototype.on = cf.prototype.J;
    cf.prototype.once = cf.prototype.once;
    cf.prototype.un = cf.prototype.K;
    ff.prototype.getClosestPoint = ff.prototype.Ab;
    ff.prototype.intersectsCoordinate = ff.prototype.sb;
    ff.prototype.getExtent = ff.prototype.D;
    ff.prototype.rotate = ff.prototype.rotate;
    ff.prototype.scale = ff.prototype.scale;
    ff.prototype.simplify = ff.prototype.Pb;
    ff.prototype.transform = ff.prototype.tb;
    ff.prototype.get = ff.prototype.get;
    ff.prototype.getKeys = ff.prototype.O;
    ff.prototype.getProperties = ff.prototype.N;
    ff.prototype.set = ff.prototype.set;
    ff.prototype.setProperties = ff.prototype.H;
    ff.prototype.unset = ff.prototype.P;
    ff.prototype.changed = ff.prototype.s;
    ff.prototype.dispatchEvent = ff.prototype.b;
    ff.prototype.getRevision = ff.prototype.L;
    ff.prototype.on = ff.prototype.J;
    ff.prototype.once = ff.prototype.once;
    ff.prototype.un = ff.prototype.K;
    is.prototype.getFirstCoordinate = is.prototype.bc;
    is.prototype.getLastCoordinate = is.prototype.cc;
    is.prototype.getLayout = is.prototype.dc;
    is.prototype.rotate = is.prototype.rotate;
    is.prototype.scale = is.prototype.scale;
    is.prototype.getClosestPoint = is.prototype.Ab;
    is.prototype.intersectsCoordinate = is.prototype.sb;
    is.prototype.getExtent = is.prototype.D;
    is.prototype.simplify = is.prototype.Pb;
    is.prototype.get = is.prototype.get;
    is.prototype.getKeys = is.prototype.O;
    is.prototype.getProperties = is.prototype.N;
    is.prototype.set = is.prototype.set;
    is.prototype.setProperties = is.prototype.H;
    is.prototype.unset = is.prototype.P;
    is.prototype.changed = is.prototype.s;
    is.prototype.dispatchEvent = is.prototype.b;
    is.prototype.getRevision = is.prototype.L;
    is.prototype.on = is.prototype.J;
    is.prototype.once = is.prototype.once;
    is.prototype.un = is.prototype.K;
    qm.prototype.getClosestPoint = qm.prototype.Ab;
    qm.prototype.intersectsCoordinate = qm.prototype.sb;
    qm.prototype.getExtent = qm.prototype.D;
    qm.prototype.rotate = qm.prototype.rotate;
    qm.prototype.scale = qm.prototype.scale;
    qm.prototype.simplify = qm.prototype.Pb;
    qm.prototype.transform = qm.prototype.tb;
    qm.prototype.get = qm.prototype.get;
    qm.prototype.getKeys = qm.prototype.O;
    qm.prototype.getProperties = qm.prototype.N;
    qm.prototype.set = qm.prototype.set;
    qm.prototype.setProperties = qm.prototype.H;
    qm.prototype.unset = qm.prototype.P;
    qm.prototype.changed = qm.prototype.s;
    qm.prototype.dispatchEvent = qm.prototype.b;
    qm.prototype.getRevision = qm.prototype.L;
    qm.prototype.on = qm.prototype.J;
    qm.prototype.once = qm.prototype.once;
    qm.prototype.un = qm.prototype.K;
    yf.prototype.getFirstCoordinate = yf.prototype.bc;
    yf.prototype.getLastCoordinate = yf.prototype.cc;
    yf.prototype.getLayout = yf.prototype.dc;
    yf.prototype.rotate = yf.prototype.rotate;
    yf.prototype.scale = yf.prototype.scale;
    yf.prototype.getClosestPoint = yf.prototype.Ab;
    yf.prototype.intersectsCoordinate = yf.prototype.sb;
    yf.prototype.getExtent = yf.prototype.D;
    yf.prototype.simplify = yf.prototype.Pb;
    yf.prototype.transform = yf.prototype.tb;
    yf.prototype.get = yf.prototype.get;
    yf.prototype.getKeys = yf.prototype.O;
    yf.prototype.getProperties = yf.prototype.N;
    yf.prototype.set = yf.prototype.set;
    yf.prototype.setProperties = yf.prototype.H;
    yf.prototype.unset = yf.prototype.P;
    yf.prototype.changed = yf.prototype.s;
    yf.prototype.dispatchEvent = yf.prototype.b;
    yf.prototype.getRevision = yf.prototype.L;
    yf.prototype.on = yf.prototype.J;
    yf.prototype.once = yf.prototype.once;
    yf.prototype.un = yf.prototype.K;
    M.prototype.getFirstCoordinate = M.prototype.bc;
    M.prototype.getLastCoordinate = M.prototype.cc;
    M.prototype.getLayout = M.prototype.dc;
    M.prototype.rotate = M.prototype.rotate;
    M.prototype.scale = M.prototype.scale;
    M.prototype.getClosestPoint = M.prototype.Ab;
    M.prototype.intersectsCoordinate = M.prototype.sb;
    M.prototype.getExtent = M.prototype.D;
    M.prototype.simplify = M.prototype.Pb;
    M.prototype.transform = M.prototype.tb;
    M.prototype.get = M.prototype.get;
    M.prototype.getKeys = M.prototype.O;
    M.prototype.getProperties = M.prototype.N;
    M.prototype.set = M.prototype.set;
    M.prototype.setProperties = M.prototype.H;
    M.prototype.unset = M.prototype.P;
    M.prototype.changed = M.prototype.s;
    M.prototype.dispatchEvent = M.prototype.b;
    M.prototype.getRevision = M.prototype.L;
    M.prototype.on = M.prototype.J;
    M.prototype.once = M.prototype.once;
    M.prototype.un = M.prototype.K;
    N.prototype.getFirstCoordinate = N.prototype.bc;
    N.prototype.getLastCoordinate = N.prototype.cc;
    N.prototype.getLayout = N.prototype.dc;
    N.prototype.rotate = N.prototype.rotate;
    N.prototype.scale = N.prototype.scale;
    N.prototype.getClosestPoint = N.prototype.Ab;
    N.prototype.intersectsCoordinate = N.prototype.sb;
    N.prototype.getExtent = N.prototype.D;
    N.prototype.simplify = N.prototype.Pb;
    N.prototype.transform = N.prototype.tb;
    N.prototype.get = N.prototype.get;
    N.prototype.getKeys = N.prototype.O;
    N.prototype.getProperties = N.prototype.N;
    N.prototype.set = N.prototype.set;
    N.prototype.setProperties = N.prototype.H;
    N.prototype.unset = N.prototype.P;
    N.prototype.changed = N.prototype.s;
    N.prototype.dispatchEvent = N.prototype.b;
    N.prototype.getRevision = N.prototype.L;
    N.prototype.on = N.prototype.J;
    N.prototype.once = N.prototype.once;
    N.prototype.un = N.prototype.K;
    O.prototype.getFirstCoordinate = O.prototype.bc;
    O.prototype.getLastCoordinate = O.prototype.cc;
    O.prototype.getLayout = O.prototype.dc;
    O.prototype.rotate = O.prototype.rotate;
    O.prototype.scale = O.prototype.scale;
    O.prototype.getClosestPoint = O.prototype.Ab;
    O.prototype.intersectsCoordinate = O.prototype.sb;
    O.prototype.getExtent = O.prototype.D;
    O.prototype.simplify = O.prototype.Pb;
    O.prototype.transform = O.prototype.tb;
    O.prototype.get = O.prototype.get;
    O.prototype.getKeys = O.prototype.O;
    O.prototype.getProperties = O.prototype.N;
    O.prototype.set = O.prototype.set;
    O.prototype.setProperties = O.prototype.H;
    O.prototype.unset = O.prototype.P;
    O.prototype.changed = O.prototype.s;
    O.prototype.dispatchEvent = O.prototype.b;
    O.prototype.getRevision = O.prototype.L;
    O.prototype.on = O.prototype.J;
    O.prototype.once = O.prototype.once;
    O.prototype.un = O.prototype.K;
    P.prototype.getFirstCoordinate = P.prototype.bc;
    P.prototype.getLastCoordinate = P.prototype.cc;
    P.prototype.getLayout = P.prototype.dc;
    P.prototype.rotate = P.prototype.rotate;
    P.prototype.scale = P.prototype.scale;
    P.prototype.getClosestPoint = P.prototype.Ab;
    P.prototype.intersectsCoordinate = P.prototype.sb;
    P.prototype.getExtent = P.prototype.D;
    P.prototype.simplify = P.prototype.Pb;
    P.prototype.transform = P.prototype.tb;
    P.prototype.get = P.prototype.get;
    P.prototype.getKeys = P.prototype.O;
    P.prototype.getProperties = P.prototype.N;
    P.prototype.set = P.prototype.set;
    P.prototype.setProperties = P.prototype.H;
    P.prototype.unset = P.prototype.P;
    P.prototype.changed = P.prototype.s;
    P.prototype.dispatchEvent = P.prototype.b;
    P.prototype.getRevision = P.prototype.L;
    P.prototype.on = P.prototype.J;
    P.prototype.once = P.prototype.once;
    P.prototype.un = P.prototype.K;
    E.prototype.getFirstCoordinate = E.prototype.bc;
    E.prototype.getLastCoordinate = E.prototype.cc;
    E.prototype.getLayout = E.prototype.dc;
    E.prototype.rotate = E.prototype.rotate;
    E.prototype.scale = E.prototype.scale;
    E.prototype.getClosestPoint = E.prototype.Ab;
    E.prototype.intersectsCoordinate = E.prototype.sb;
    E.prototype.getExtent = E.prototype.D;
    E.prototype.simplify = E.prototype.Pb;
    E.prototype.transform = E.prototype.tb;
    E.prototype.get = E.prototype.get;
    E.prototype.getKeys = E.prototype.O;
    E.prototype.getProperties = E.prototype.N;
    E.prototype.set = E.prototype.set;
    E.prototype.setProperties = E.prototype.H;
    E.prototype.unset = E.prototype.P;
    E.prototype.changed = E.prototype.s;
    E.prototype.dispatchEvent = E.prototype.b;
    E.prototype.getRevision = E.prototype.L;
    E.prototype.on = E.prototype.J;
    E.prototype.once = E.prototype.once;
    E.prototype.un = E.prototype.K;
    F.prototype.getFirstCoordinate = F.prototype.bc;
    F.prototype.getLastCoordinate = F.prototype.cc;
    F.prototype.getLayout = F.prototype.dc;
    F.prototype.rotate = F.prototype.rotate;
    F.prototype.scale = F.prototype.scale;
    F.prototype.getClosestPoint = F.prototype.Ab;
    F.prototype.intersectsCoordinate = F.prototype.sb;
    F.prototype.getExtent = F.prototype.D;
    F.prototype.simplify = F.prototype.Pb;
    F.prototype.transform = F.prototype.tb;
    F.prototype.get = F.prototype.get;
    F.prototype.getKeys = F.prototype.O;
    F.prototype.getProperties = F.prototype.N;
    F.prototype.set = F.prototype.set;
    F.prototype.setProperties = F.prototype.H;
    F.prototype.unset = F.prototype.P;
    F.prototype.changed = F.prototype.s;
    F.prototype.dispatchEvent = F.prototype.b;
    F.prototype.getRevision = F.prototype.L;
    F.prototype.on = F.prototype.J;
    F.prototype.once = F.prototype.once;
    F.prototype.un = F.prototype.K;
    Pm.prototype.readFeatures = Pm.prototype.Qa;
    Ym.prototype.readFeatures = Ym.prototype.Qa;
    Pm.prototype.readFeatures = Pm.prototype.Qa;
    ad.prototype.get = ad.prototype.get;
    ad.prototype.getKeys = ad.prototype.O;
    ad.prototype.getProperties = ad.prototype.N;
    ad.prototype.set = ad.prototype.set;
    ad.prototype.setProperties = ad.prototype.H;
    ad.prototype.unset = ad.prototype.P;
    ad.prototype.changed = ad.prototype.s;
    ad.prototype.dispatchEvent = ad.prototype.b;
    ad.prototype.getRevision = ad.prototype.L;
    ad.prototype.on = ad.prototype.J;
    ad.prototype.once = ad.prototype.once;
    ad.prototype.un = ad.prototype.K;
    bd.prototype.getMap = bd.prototype.g;
    bd.prototype.setMap = bd.prototype.setMap;
    bd.prototype.setTarget = bd.prototype.i;
    bd.prototype.get = bd.prototype.get;
    bd.prototype.getKeys = bd.prototype.O;
    bd.prototype.getProperties = bd.prototype.N;
    bd.prototype.set = bd.prototype.set;
    bd.prototype.setProperties = bd.prototype.H;
    bd.prototype.unset = bd.prototype.P;
    bd.prototype.changed = bd.prototype.s;
    bd.prototype.dispatchEvent = bd.prototype.b;
    bd.prototype.getRevision = bd.prototype.L;
    bd.prototype.on = bd.prototype.J;
    bd.prototype.once = bd.prototype.once;
    bd.prototype.un = bd.prototype.K;
    od.prototype.getMap = od.prototype.g;
    od.prototype.setMap = od.prototype.setMap;
    od.prototype.setTarget = od.prototype.i;
    od.prototype.get = od.prototype.get;
    od.prototype.getKeys = od.prototype.O;
    od.prototype.getProperties = od.prototype.N;
    od.prototype.set = od.prototype.set;
    od.prototype.setProperties = od.prototype.H;
    od.prototype.unset = od.prototype.P;
    od.prototype.changed = od.prototype.s;
    od.prototype.dispatchEvent = od.prototype.b;
    od.prototype.getRevision = od.prototype.L;
    od.prototype.on = od.prototype.J;
    od.prototype.once = od.prototype.once;
    od.prototype.un = od.prototype.K;
    td.prototype.getMap = td.prototype.g;
    td.prototype.setMap = td.prototype.setMap;
    td.prototype.setTarget = td.prototype.i;
    td.prototype.get = td.prototype.get;
    td.prototype.getKeys = td.prototype.O;
    td.prototype.getProperties = td.prototype.N;
    td.prototype.set = td.prototype.set;
    td.prototype.setProperties = td.prototype.H;
    td.prototype.unset = td.prototype.P;
    td.prototype.changed = td.prototype.s;
    td.prototype.dispatchEvent = td.prototype.b;
    td.prototype.getRevision = td.prototype.L;
    td.prototype.on = td.prototype.J;
    td.prototype.once = td.prototype.once;
    td.prototype.un = td.prototype.K;
    zk.prototype.getMap = zk.prototype.g;
    zk.prototype.setMap = zk.prototype.setMap;
    zk.prototype.setTarget = zk.prototype.i;
    zk.prototype.get = zk.prototype.get;
    zk.prototype.getKeys = zk.prototype.O;
    zk.prototype.getProperties = zk.prototype.N;
    zk.prototype.set = zk.prototype.set;
    zk.prototype.setProperties = zk.prototype.H;
    zk.prototype.unset = zk.prototype.P;
    zk.prototype.changed = zk.prototype.s;
    zk.prototype.dispatchEvent = zk.prototype.b;
    zk.prototype.getRevision = zk.prototype.L;
    zk.prototype.on = zk.prototype.J;
    zk.prototype.once = zk.prototype.once;
    zk.prototype.un = zk.prototype.K;
    id.prototype.getMap = id.prototype.g;
    id.prototype.setMap = id.prototype.setMap;
    id.prototype.setTarget = id.prototype.i;
    id.prototype.get = id.prototype.get;
    id.prototype.getKeys = id.prototype.O;
    id.prototype.getProperties = id.prototype.N;
    id.prototype.set = id.prototype.set;
    id.prototype.setProperties = id.prototype.H;
    id.prototype.unset = id.prototype.P;
    id.prototype.changed = id.prototype.s;
    id.prototype.dispatchEvent = id.prototype.b;
    id.prototype.getRevision = id.prototype.L;
    id.prototype.on = id.prototype.J;
    id.prototype.once = id.prototype.once;
    id.prototype.un = id.prototype.K;
    Ek.prototype.getMap = Ek.prototype.g;
    Ek.prototype.setMap = Ek.prototype.setMap;
    Ek.prototype.setTarget = Ek.prototype.i;
    Ek.prototype.get = Ek.prototype.get;
    Ek.prototype.getKeys = Ek.prototype.O;
    Ek.prototype.getProperties = Ek.prototype.N;
    Ek.prototype.set = Ek.prototype.set;
    Ek.prototype.setProperties = Ek.prototype.H;
    Ek.prototype.unset = Ek.prototype.P;
    Ek.prototype.changed = Ek.prototype.s;
    Ek.prototype.dispatchEvent = Ek.prototype.b;
    Ek.prototype.getRevision = Ek.prototype.L;
    Ek.prototype.on = Ek.prototype.J;
    Ek.prototype.once = Ek.prototype.once;
    Ek.prototype.un = Ek.prototype.K;
    kd.prototype.getMap = kd.prototype.g;
    kd.prototype.setMap = kd.prototype.setMap;
    kd.prototype.setTarget = kd.prototype.i;
    kd.prototype.get = kd.prototype.get;
    kd.prototype.getKeys = kd.prototype.O;
    kd.prototype.getProperties = kd.prototype.N;
    kd.prototype.set = kd.prototype.set;
    kd.prototype.setProperties = kd.prototype.H;
    kd.prototype.unset = kd.prototype.P;
    kd.prototype.changed = kd.prototype.s;
    kd.prototype.dispatchEvent = kd.prototype.b;
    kd.prototype.getRevision = kd.prototype.L;
    kd.prototype.on = kd.prototype.J;
    kd.prototype.once = kd.prototype.once;
    kd.prototype.un = kd.prototype.K;
    Jk.prototype.getMap = Jk.prototype.g;
    Jk.prototype.setMap = Jk.prototype.setMap;
    Jk.prototype.setTarget = Jk.prototype.i;
    Jk.prototype.get = Jk.prototype.get;
    Jk.prototype.getKeys = Jk.prototype.O;
    Jk.prototype.getProperties = Jk.prototype.N;
    Jk.prototype.set = Jk.prototype.set;
    Jk.prototype.setProperties = Jk.prototype.H;
    Jk.prototype.unset = Jk.prototype.P;
    Jk.prototype.changed = Jk.prototype.s;
    Jk.prototype.dispatchEvent = Jk.prototype.b;
    Jk.prototype.getRevision = Jk.prototype.L;
    Jk.prototype.on = Jk.prototype.J;
    Jk.prototype.once = Jk.prototype.once;
    Jk.prototype.un = Jk.prototype.K;
    Ok.prototype.getMap = Ok.prototype.g;
    Ok.prototype.setMap = Ok.prototype.setMap;
    Ok.prototype.setTarget = Ok.prototype.i;
    Ok.prototype.get = Ok.prototype.get;
    Ok.prototype.getKeys = Ok.prototype.O;
    Ok.prototype.getProperties = Ok.prototype.N;
    Ok.prototype.set = Ok.prototype.set;
    Ok.prototype.setProperties = Ok.prototype.H;
    Ok.prototype.unset = Ok.prototype.P;
    Ok.prototype.changed = Ok.prototype.s;
    Ok.prototype.dispatchEvent = Ok.prototype.b;
    Ok.prototype.getRevision = Ok.prototype.L;
    Ok.prototype.on = Ok.prototype.J;
    Ok.prototype.once = Ok.prototype.once;
    Ok.prototype.un = Ok.prototype.K;
    return OPENLAYERS.ol;
  }));
})(require('process'));
