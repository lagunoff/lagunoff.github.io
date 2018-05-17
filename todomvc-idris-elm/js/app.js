"use strict";

(function(){

const $JSRTS = {
    throw: function (x) {
        throw x;
    },
    Lazy: function (e) {
        this.js_idris_lazy_calc = e;
        this.js_idris_lazy_val = void 0;
    },
    force: function (x) {
        if (x === undefined || x.js_idris_lazy_calc === undefined) {
            return x
        } else {
            if (x.js_idris_lazy_val === undefined) {
                x.js_idris_lazy_val = x.js_idris_lazy_calc()
            }
            return x.js_idris_lazy_val
        }
    },
    prim_strSubstr: function (offset, len, str) {
        return str.substr(Math.max(0, offset), Math.max(0, len))
    }
};
$JSRTS.prim_systemInfo = function (index) {
    switch (index) {
        case 0:
            return "javascript";
        case 1:
            return navigator.platform;
    }
    return "";
};
$JSRTS.prim_writeStr = function (x) { return console.log(x) }
$JSRTS.prim_readStr = function () { return prompt('Prelude.getLine') };
$JSRTS.jsbn = (function () {

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary & 0xffffff) == 0xefcafe);

  // (public) Constructor
  function BigInteger(a, b, c) {
    if (a != null)
      if ("number" == typeof a) this.fromNumber(a, b, c);
      else if (b == null && "string" != typeof a) this.fromString(a, 256);
      else this.fromString(a, b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff, xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff, xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  var inBrowser = typeof navigator !== "undefined";
  if (inBrowser && j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if (inBrowser && j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1 << dbits) - 1);
  BigInteger.prototype.DV = (1 << dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr, vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) this[0] = x;
    else if (x < -1) this[0] = x + this.DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s, b) {
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 256) k = 8; // byte array
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else { this.fromRadix(s, b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while (--i >= 0) {
      var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if (sh == 0)
        this[this.t++] = x;
      else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
        this[this.t++] = (x >> (this.DB - sh));
      }
      else
        this[this.t - 1] |= x << sh;
      sh += k;
      if (sh >= this.DB) sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) != 0) {
      this.s = -1;
      if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
    }
    this.clamp();
    if (mi) BigInteger.ZERO.subTo(this, this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c)--this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if (this.s < 0) return "-" + this.negate().toString(b);
    var k;
    if (b == 16) k = 4;
    else if (b == 8) k = 3;
    else if (b == 2) k = 1;
    else if (b == 32) k = 5;
    else if (b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) { m = true; r = int2char(d); }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & ((1 << p) - 1)) << (k - p);
          d |= this[--i] >> (p += this.DB - k);
        }
        else {
          d = (this[i] >> (p -= k)) & km;
          if (p <= 0) { p += this.DB; --i; }
        }
        if (d > 0) m = true;
        if (m) r += int2char(d);
      }
    }
    return m ? r : "0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this, r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s < 0) ? this.negate() : this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0) return r;
    var i = this.t;
    r = i - a.t;
    if (r != 0) return (this.s < 0) ? -r : r;
    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if ((t = x >>> 16) != 0) { x = t; r += 16; }
    if ((t = x >> 8) != 0) { x = t; r += 8; }
    if ((t = x >> 4) != 0) { x = t; r += 4; }
    if ((t = x >> 2) != 0) { x = t; r += 2; }
    if ((t = x >> 1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if (this.t <= 0) return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
    for (i = n - 1; i >= 0; --i) r[i] = 0;
    r.t = this.t + n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) r[i - n] = this[i];
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = (this[i] >> cbs) | c;
      c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) { r.t = 0; return; }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) r[i++] = this.DV + c;
    else if (c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a, r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    r.s = 0;
    r.clamp();
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) r[i] = 0;
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) return;
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) q.fromInt(0);
      if (r != null) this.copyTo(r);
      return;
    }
    if (r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]);   // normalize modulus
    if (nsh > 0) { pm.lShiftTo(nsh, y); pt.lShiftTo(nsh, r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) return;
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y);  // "negative" y so we can replace sub with am later
    while (y.t < ys) y[y.t++] = 0;
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {   // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) r.subTo(t, r);
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
    if (ts < 0) BigInteger.ZERO.subTo(r, r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m, null, x); }
  function cMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }
  function cSqrTo(x, r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if (this.t < 1) return 0;
    var x = this[0];
    if ((x & 1) == 0) return 0;
    var y = x & 3;       // y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff;   // y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;    // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV;       // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while (x.t <= this.mt2) // pad x so am has enough room later
      x[x.t++] = 0;
    for (var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff;
      var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
      // propagate carry
      while (x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x, r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e, z) {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e, z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // Copyright (c) 2005-2009  Tom Wu
  // All Rights Reserved.
  // See "LICENSE" for details.

  // Extended JavaScript BN functions, required for RSA private ops.

  // Version 1.1: new BigInteger("0", 10) returns "proper" zero
  // Version 1.2: square() API, isProbablePrime fix

  // (public)
  function bnClone() { var r = nbi(); this.copyTo(r); return r; }

  // (public) return value as integer
  function bnIntValue() {
    if (this.s < 0) {
      if (this.t == 1) return this[0] - this.DV;
      else if (this.t == 0) return -1;
    }
    else if (this.t == 1) return this[0];
    else if (this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
  }

  // (public) return value as byte
  function bnByteValue() { return (this.t == 0) ? this.s : (this[0] << 24) >> 24; }

  // (public) return value as short (assumes DB>=16)
  function bnShortValue() { return (this.t == 0) ? this.s : (this[0] << 16) >> 16; }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2 * this.DB / Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if (this.s < 0) return -1;
    else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if (b == null) b = 10;
    if (this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0) {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  }

  // (protected) convert from radix string
  function bnpFromRadix(s, b) {
    this.fromInt(0);
    if (b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
    for (var i = 0; i < s.length; ++i) {
      var x = intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b * w + x;
      if (++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0) {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) BigInteger.ZERO.subTo(this, this);
  }

  // (protected) alternate constructor
  function bnpFromNumber(a, b, c) {
    if ("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if (a < 2) this.fromInt(1);
      else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1))    // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
        if (this.isEven()) this.dAddOffset(1, 0); // force odd
        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
        }
      }
    }
    else {
      // new BigInteger(int,RNG)
      var x = new Array(), t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) x[0] &= ((1 << t) - 1); else x[0] = 0;
      this.fromString(x, 256);
    }
  }

  // (public) convert to bigendian byte array
  function bnToByteArray() {
    var i = this.t, r = new Array();
    r[0] = this.s;
    var p = this.DB - (i * this.DB) % 8, d, k = 0;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
        r[k++] = d | (this.s << (this.DB - p));
      while (i >= 0) {
        if (p < 8) {
          d = (this[i] & ((1 << p) - 1)) << (8 - p);
          d |= this[--i] >> (p += this.DB - 8);
        }
        else {
          d = (this[i] >> (p -= 8)) & 0xff;
          if (p <= 0) { p += this.DB; --i; }
        }
        if ((d & 0x80) != 0) d |= -256;
        if (k == 0 && (this.s & 0x80) != (d & 0x80))++k;
        if (k > 0 || d != this.s) r[k++] = d;
      }
    }
    return r;
  }

  function bnEquals(a) { return (this.compareTo(a) == 0); }
  function bnMin(a) { return (this.compareTo(a) < 0) ? this : a; }
  function bnMax(a) { return (this.compareTo(a) > 0) ? this : a; }

  // (protected) r = this op a (bitwise)
  function bnpBitwiseTo(a, op, r) {
    var i, f, m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
    if (a.t < this.t) {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
      r.t = this.t;
    }
    else {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  }

  // (public) this & a
  function op_and(x, y) { return x & y; }
  function bnAnd(a) { var r = nbi(); this.bitwiseTo(a, op_and, r); return r; }

  // (public) this | a
  function op_or(x, y) { return x | y; }
  function bnOr(a) { var r = nbi(); this.bitwiseTo(a, op_or, r); return r; }

  // (public) this ^ a
  function op_xor(x, y) { return x ^ y; }
  function bnXor(a) { var r = nbi(); this.bitwiseTo(a, op_xor, r); return r; }

  // (public) this & ~a
  function op_andnot(x, y) { return x & ~y; }
  function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a, op_andnot, r); return r; }

  // (public) ~this
  function bnNot() {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
    r.t = this.t;
    r.s = ~this.s;
    return r;
  }

  // (public) this << n
  function bnShiftLeft(n) {
    var r = nbi();
    if (n < 0) this.rShiftTo(-n, r); else this.lShiftTo(n, r);
    return r;
  }

  // (public) this >> n
  function bnShiftRight(n) {
    var r = nbi();
    if (n < 0) this.lShiftTo(-n, r); else this.rShiftTo(n, r);
    return r;
  }

  // return index of lowest 1-bit in x, x < 2^31
  function lbit(x) {
    if (x == 0) return -1;
    var r = 0;
    if ((x & 0xffff) == 0) { x >>= 16; r += 16; }
    if ((x & 0xff) == 0) { x >>= 8; r += 8; }
    if ((x & 0xf) == 0) { x >>= 4; r += 4; }
    if ((x & 3) == 0) { x >>= 2; r += 2; }
    if ((x & 1) == 0)++r;
    return r;
  }

  // (public) returns index of lowest 1-bit (or -1 if none)
  function bnGetLowestSetBit() {
    for (var i = 0; i < this.t; ++i)
      if (this[i] != 0) return i * this.DB + lbit(this[i]);
    if (this.s < 0) return this.t * this.DB;
    return -1;
  }

  // return number of 1 bits in x
  function cbit(x) {
    var r = 0;
    while (x != 0) { x &= x - 1; ++r; }
    return r;
  }

  // (public) return number of set bits
  function bnBitCount() {
    var r = 0, x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
    return r;
  }

  // (public) true iff nth bit is set
  function bnTestBit(n) {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) return (this.s != 0);
    return ((this[j] & (1 << (n % this.DB))) != 0);
  }

  // (protected) this op (1<<n)
  function bnpChangeBit(n, op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  }

  // (public) this | (1<<n)
  function bnSetBit(n) { return this.changeBit(n, op_or); }

  // (public) this & ~(1<<n)
  function bnClearBit(n) { return this.changeBit(n, op_andnot); }

  // (public) this ^ (1<<n)
  function bnFlipBit(n) { return this.changeBit(n, op_xor); }

  // (protected) r = this + a
  function bnpAddTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c += a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while (i < a.t) {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c > 0) r[i++] = c;
    else if (c < -1) r[i++] = this.DV + c;
    r.t = i;
    r.clamp();
  }

  // (public) this + a
  function bnAdd(a) { var r = nbi(); this.addTo(a, r); return r; }

  // (public) this - a
  function bnSubtract(a) { var r = nbi(); this.subTo(a, r); return r; }

  // (public) this * a
  function bnMultiply(a) { var r = nbi(); this.multiplyTo(a, r); return r; }

  // (public) this^2
  function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

  // (public) this / a
  function bnDivide(a) { var r = nbi(); this.divRemTo(a, r, null); return r; }

  // (public) this % a
  function bnRemainder(a) { var r = nbi(); this.divRemTo(a, null, r); return r; }

  // (public) [this/a,this%a]
  function bnDivideAndRemainder(a) {
    var q = nbi(), r = nbi();
    this.divRemTo(a, q, r);
    return new Array(q, r);
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n, w) {
    if (n == 0) return;
    while (this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while (this[w] >= this.DV) {
      this[w] -= this.DV;
      if (++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // A "null" reducer
  function NullExp() { }
  function nNop(x) { return x; }
  function nMulTo(x, y, r) { x.multiplyTo(y, r); }
  function nSqrTo(x, r) { x.squareTo(r); }

  NullExp.prototype.convert = nNop;
  NullExp.prototype.revert = nNop;
  NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.sqrTo = nSqrTo;

  // (public) this^e
  function bnPow(e) { return this.exp(e, new NullExp()); }

  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  function bnpMultiplyLowerTo(a, n, r) {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) r[--i] = 0;
    var j;
    for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
    r.clamp();
  }

  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  function bnpMultiplyUpperTo(a, n, r) {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) r[i] = 0;
    for (i = Math.max(n - this.t, 0); i < a.t; ++i)
      r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    r.clamp();
    r.drShiftTo(1, r);
  }

  // Barrett modular reduction
  function Barrett(m) {
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
    this.mu = this.r2.divide(m);
    this.m = m;
  }

  function barrettConvert(x) {
    if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
    else if (x.compareTo(this.m) < 0) return x;
    else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
  }

  function barrettRevert(x) { return x; }

  // x = x mod m (HAC 14.42)
  function barrettReduce(x) {
    x.drShiftTo(this.m.t - 1, this.r2);
    if (x.t > this.m.t + 1) { x.t = this.m.t + 1; x.clamp(); }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
    x.subTo(this.r2, x);
    while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }

  // r = x^2 mod m; x != r
  function barrettSqrTo(x, r) { x.squareTo(r); this.reduce(r); }

  // r = x*y mod m; x,y != r
  function barrettMulTo(x, y, r) { x.multiplyTo(y, r); this.reduce(r); }

  Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.reduce = barrettReduce;
  Barrett.prototype.mulTo = barrettMulTo;
  Barrett.prototype.sqrTo = barrettSqrTo;

  // (public) this^e % m (HAC 14.85)
  function bnModPow(e, m) {
    var i = e.bitLength(), k, r = nbv(1), z;
    if (i <= 0) return r;
    else if (i < 18) k = 1;
    else if (i < 48) k = 3;
    else if (i < 144) k = 4;
    else if (i < 768) k = 5;
    else k = 6;
    if (i < 8)
      z = new Classic(m);
    else if (m.isEven())
      z = new Barrett(m);
    else
      z = new Montgomery(m);

    // precomputation
    var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km) {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }

    var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
      if (i >= k1) w = (e[j] >> (i - k1)) & km;
      else {
        w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
        if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
      }

      n = k;
      while ((w & 1) == 0) { w >>= 1; --n; }
      if ((i -= n) < 0) { i += this.DB; --j; }
      if (is1) {    // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      }
      else {
        while (n > 1) { z.sqrTo(r, r2); z.sqrTo(r2, r); n -= 2; }
        if (n > 0) z.sqrTo(r, r2); else { t = r; r = r2; r2 = t; }
        z.mulTo(r2, g[w], r);
      }

      while (j >= 0 && (e[j] & (1 << i)) == 0) {
        z.sqrTo(r, r2); t = r; r = r2; r2 = t;
        if (--i < 0) { i = this.DB - 1; --j; }
      }
    }
    return z.revert(r);
  }

  // (public) gcd(this,a) (HAC 14.54)
  function bnGCD(a) {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) { var t = x; x = y; y = t; }
    var i = x.getLowestSetBit(), g = y.getLowestSetBit();
    if (g < 0) return x;
    if (i < g) g = i;
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0) {
      if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
      if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      }
      else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) y.lShiftTo(g, y);
    return y;
  }

  // (protected) this % n, n < 2^26
  function bnpModInt(n) {
    if (n <= 0) return 0;
    var d = this.DV % n, r = (this.s < 0) ? n - 1 : 0;
    if (this.t > 0)
      if (d == 0) r = this[0] % n;
      else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
    return r;
  }

  // (public) 1/this % m (HAC 14.61)
  function bnModInverse(m) {
    var ac = m.isEven();
    if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
    var u = m.clone(), v = this.clone();
    var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
    while (u.signum() != 0) {
      while (u.isEven()) {
        u.rShiftTo(1, u);
        if (ac) {
          if (!a.isEven() || !b.isEven()) { a.addTo(this, a); b.subTo(m, b); }
          a.rShiftTo(1, a);
        }
        else if (!b.isEven()) b.subTo(m, b);
        b.rShiftTo(1, b);
      }
      while (v.isEven()) {
        v.rShiftTo(1, v);
        if (ac) {
          if (!c.isEven() || !d.isEven()) { c.addTo(this, c); d.subTo(m, d); }
          c.rShiftTo(1, c);
        }
        else if (!d.isEven()) d.subTo(m, d);
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0) {
        u.subTo(v, u);
        if (ac) a.subTo(c, a);
        b.subTo(d, b);
      }
      else {
        v.subTo(u, v);
        if (ac) c.subTo(a, c);
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
    if (d.compareTo(m) >= 0) return d.subtract(m);
    if (d.signum() < 0) d.addTo(m, d); else return d;
    if (d.signum() < 0) return d.add(m); else return d;
  }

  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

  // (public) test primality with certainty >= 1-.5^t
  function bnIsProbablePrime(t) {
    var i, x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
      for (i = 0; i < lowprimes.length; ++i)
        if (x[0] == lowprimes[i]) return true;
      return false;
    }
    if (x.isEven()) return false;
    i = 1;
    while (i < lowprimes.length) {
      var m = lowprimes[i], j = i + 1;
      while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
      m = x.modInt(m);
      while (i < j) if (m % lowprimes[i++] == 0) return false;
    }
    return x.millerRabin(t);
  }

  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  function bnpMillerRabin(t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) return false;
    var r = n1.shiftRight(k);
    t = (t + 1) >> 1;
    if (t > lowprimes.length) t = lowprimes.length;
    var a = nbi();
    for (var i = 0; i < t; ++i) {
      //Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) return false;
        }
        if (y.compareTo(n1) != 0) return false;
      }
    }
    return true;
  }

  // protected
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.fromNumber = bnpFromNumber;
  BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  BigInteger.prototype.changeBit = bnpChangeBit;
  BigInteger.prototype.addTo = bnpAddTo;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  BigInteger.prototype.modInt = bnpModInt;
  BigInteger.prototype.millerRabin = bnpMillerRabin;

  // public
  BigInteger.prototype.clone = bnClone;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.byteValue = bnByteValue;
  BigInteger.prototype.shortValue = bnShortValue;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.toByteArray = bnToByteArray;
  BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.min = bnMin;
  BigInteger.prototype.max = bnMax;
  BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.or = bnOr;
  BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.not = bnNot;
  BigInteger.prototype.shiftLeft = bnShiftLeft;
  BigInteger.prototype.shiftRight = bnShiftRight;
  BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  BigInteger.prototype.bitCount = bnBitCount;
  BigInteger.prototype.testBit = bnTestBit;
  BigInteger.prototype.setBit = bnSetBit;
  BigInteger.prototype.clearBit = bnClearBit;
  BigInteger.prototype.flipBit = bnFlipBit;
  BigInteger.prototype.add = bnAdd;
  BigInteger.prototype.subtract = bnSubtract;
  BigInteger.prototype.multiply = bnMultiply;
  BigInteger.prototype.divide = bnDivide;
  BigInteger.prototype.remainder = bnRemainder;
  BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  BigInteger.prototype.modPow = bnModPow;
  BigInteger.prototype.modInverse = bnModInverse;
  BigInteger.prototype.pow = bnPow;
  BigInteger.prototype.gcd = bnGCD;
  BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

  // JSBN-specific extension
  BigInteger.prototype.square = bnSquare;

  // Expose the Barrett function
  BigInteger.prototype.Barrett = Barrett

  // BigInteger interfaces not implemented in jsbn:

  // BigInteger(int signum, byte[] magnitude)
  // double doubleValue()
  // float floatValue()
  // int hashCode()
  // long longValue()
  // static BigInteger valueOf(long val)

  // Random number generator - requires a PRNG backend, e.g. prng4.js

  // For best results, put code like
  // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
  // in your main HTML document.

  var rng_state;
  var rng_pool;
  var rng_pptr;

  // Mix in a 32-bit integer into the pool
  function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
  }

  // Mix in the current time (w/milliseconds) into the pool
  function rng_seed_time() {
    rng_seed_int(new Date().getTime());
  }

  // Initialize the pool with junk if needed.
  if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (typeof window !== "undefined" && window.crypto) {
      if (window.crypto.getRandomValues) {
        // Use webcrypto if available
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; t < 32; ++t)
          rng_pool[rng_pptr++] = ua[t];
      }
      else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
        // Extract entropy (256 bits) from NS4 RNG if available
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
          rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
      }
    }
    while (rng_pptr < rng_psize) {  // extract some randomness from Math.random()
      t = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = t >>> 8;
      rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
    //rng_seed_int(window.screenX);
    //rng_seed_int(window.screenY);
  }

  function rng_get_byte() {
    if (rng_state == null) {
      rng_seed_time();
      rng_state = prng_newstate();
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
        rng_pool[rng_pptr] = 0;
      rng_pptr = 0;
      //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }

  function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
  }

  function SecureRandom() { }

  SecureRandom.prototype.nextBytes = rng_get_bytes;

  // prng4.js - uses Arcfour as a PRNG

  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
  }

  // Initialize arcfour context from key, an array of ints, each from [0..255]
  function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i)
      this.S[i] = i;
    j = 0;
    for (i = 0; i < 256; ++i) {
      j = (j + this.S[i] + key[i % key.length]) & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  }

  function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
  }

  Arcfour.prototype.init = ARC4init;
  Arcfour.prototype.next = ARC4next;

  // Plug in your RNG constructor here
  function prng_newstate() {
    return new Arcfour();
  }

  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;

  return {
    BigInteger: BigInteger,
    SecureRandom: SecureRandom
  };

}).call(this);



function $partial_5_6$io_95_bind(x1, x2, x3, x4, x5){
    return (function(x6){
        return io_95_bind(x1, x2, x3, x4, x5, x6);
    });
}

function $partial_0_2$prim_95__95_strCons(){
    return (function(x1){
        return (function(x2){
            return prim_95__95_strCons(x1, x2);
        });
    });
}

function $partial_0_1$prim_95__95_toStrBigInt(){
    return (function(x1){
        return prim_95__95_toStrBigInt(x1);
    });
}

function $partial_1_2$Utils__fixHash(x1){
    return (function(x2){
        return Utils__fixHash(x1, x2);
    });
}

function $partial_0_1$Utils__genUUID4(){
    return (function(x1){
        return Utils__genUUID4(x1);
    });
}

function $partial_2_3$Utils__localStorageSetItem(x1, x2){
    return (function(x3){
        return Utils__localStorageSetItem(x1, x2, x3);
    });
}

function $partial_1_2$IdrisScript__pack(x1){
    return (function(x2){
        return IdrisScript__pack(x1, x2);
    });
}

function $partial_1_3$Elm__Decode__runDecoder(x1){
    return (function(x2){
        return (function(x3){
            return Elm__Decode__runDecoder(x1, x2, x3);
        });
    });
}

function $partial_4_5$Elm__Cmd__runUpdate(x1, x2, x3, x4){
    return (function(x5){
        return Elm__Cmd__runUpdate(x1, x2, x3, x4, x5);
    });
}

function $partial_3_4$Utils__setTimeout(x1, x2, x3){
    return (function(x4){
        return Utils__setTimeout(x1, x2, x3, x4);
    });
}

function $partial_0_1$Main__update(){
    return (function(x1){
        return Main__update(x1);
    });
}

function $partial_0_1$Main__view(){
    return (function(x1){
        return Main__view(x1);
    });
}

function $partial_2_3$Elm__Cmd___123_batchCommand_95_0_125_(x1, x2){
    return (function(x3){
        return Elm__Cmd___123_batchCommand_95_0_125_(x1, x2, x3);
    });
}

function $partial_0_1$Elm__Attributes___123_classList_95_1_125_(){
    return (function(x1){
        return Elm__Attributes___123_classList_95_1_125_(x1);
    });
}

function $partial_0_1$Elm__Attributes___123_classList_95_2_125_(){
    return (function(x1){
        return Elm__Attributes___123_classList_95_2_125_(x1);
    });
}

function $partial_0_1$Elm__Cmd___123_eval_95_5_125_(){
    return (function(x1){
        return Elm__Cmd___123_eval_95_5_125_(x1);
    });
}

function $partial_2_3$Elm__Cmd___123_eval_95_6_125_(x1, x2){
    return (function(x3){
        return Elm__Cmd___123_eval_95_6_125_(x1, x2, x3);
    });
}

function $partial_2_3$Elm__Cmd___123_eval_95_7_125_(x1, x2){
    return (function(x3){
        return Elm__Cmd___123_eval_95_7_125_(x1, x2, x3);
    });
}

function $partial_4_5$Elm__Cmd___123_eval_95_8_125_(x1, x2, x3, x4){
    return (function(x5){
        return Elm__Cmd___123_eval_95_8_125_(x1, x2, x3, x4, x5);
    });
}

function $partial_2_3$Elm__Cmd___123_eval_95_9_125_(x1, x2){
    return (function(x3){
        return Elm__Cmd___123_eval_95_9_125_(x1, x2, x3);
    });
}

function $partial_3_4$Elm__Cmd___123_eval_95_10_125_(x1, x2, x3){
    return (function(x4){
        return Elm__Cmd___123_eval_95_10_125_(x1, x2, x3, x4);
    });
}

function $partial_1_2$Elm__Cmd___123_getModel_95_14_125_(x1){
    return (function(x2){
        return Elm__Cmd___123_getModel_95_14_125_(x1, x2);
    });
}

function $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return (function(x4){
                    return IdrisScript__Objects___123_getProperty_95_15_125_(x1, x2, x3, x4);
                });
            });
        });
    });
}

function $partial_0_2$IdrisScript__Objects___123_getProperty_95_17_125_(){
    return (function(x1){
        return (function(x2){
            return IdrisScript__Objects___123_getProperty_95_17_125_(x1, x2);
        });
    });
}

function $partial_0_3$Elm__Platform___123_initialize_95_18_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return Elm__Platform___123_initialize_95_18_125_(x1, x2, x3);
            });
        });
    });
}

function $partial_1_2$Elm__Platform___123_initialize_95_19_125_(x1){
    return (function(x2){
        return Elm__Platform___123_initialize_95_19_125_(x1, x2);
    });
}

function $partial_0_2$Elm__Platform___123_initialize_95_20_125_(){
    return (function(x1){
        return (function(x2){
            return Elm__Platform___123_initialize_95_20_125_(x1, x2);
        });
    });
}

function $partial_0_1$Elm__Platform___123_initialize_95_21_125_(){
    return (function(x1){
        return Elm__Platform___123_initialize_95_21_125_(x1);
    });
}

function $partial_0_1$Elm__Events___123_keyCode_95_22_125_(){
    return (function(x1){
        return Elm__Events___123_keyCode_95_22_125_(x1);
    });
}

function $partial_2_3$Item___123_keyCodeEq_95_23_125_(x1, x2){
    return (function(x3){
        return Item___123_keyCodeEq_95_23_125_(x1, x2, x3);
    });
}

function $partial_0_1$Utils___123_localStorageGetItem_95_24_125_(){
    return (function(x1){
        return Utils___123_localStorageGetItem_95_24_125_(x1);
    });
}

function $partial_0_1$Main___123_main_95_25_125_(){
    return (function(x1){
        return Main___123_main_95_25_125_(x1);
    });
}

function $partial_0_1$Main___123_main_95_27_125_(){
    return (function(x1){
        return Main___123_main_95_27_125_(x1);
    });
}

function $partial_2_3$Elm__Cmd___123_modifyModel_95_32_125_(x1, x2){
    return (function(x3){
        return Elm__Cmd___123_modifyModel_95_32_125_(x1, x2, x3);
    });
}

function $partial_0_1$Elm__Decode___123_parse_95_36_125_(){
    return (function(x1){
        return Elm__Decode___123_parse_95_36_125_(x1);
    });
}

function $partial_0_1$Elm__Decode___123_parse_95_37_125_(){
    return (function(x1){
        return Elm__Decode___123_parse_95_37_125_(x1);
    });
}

function $partial_2_3$Main___123_todosDecoder_95_38_125_(x1, x2){
    return (function(x3){
        return Main___123_todosDecoder_95_38_125_(x1, x2, x3);
    });
}

function $partial_1_2$Main___123_todosDecoder_95_39_125_(x1){
    return (function(x2){
        return Main___123_todosDecoder_95_39_125_(x1, x2);
    });
}

function $partial_0_1$Main___123_todosDecoder_95_40_125_(){
    return (function(x1){
        return Main___123_todosDecoder_95_40_125_(x1);
    });
}

function $partial_0_2$IdrisScript___123_typeOf_95_43_125_(){
    return (function(x1){
        return (function(x2){
            return IdrisScript___123_typeOf_95_43_125_(x1, x2);
        });
    });
}

function $partial_0_1$Prelude__Strings___123_unwords_95_44_125_(){
    return (function(x1){
        return Prelude__Strings___123_unwords_95_44_125_(x1);
    });
}

function $partial_0_2$Prelude__Strings___123_unwords_95_45_125_(){
    return (function(x1){
        return (function(x2){
            return Prelude__Strings___123_unwords_95_45_125_(x1, x2);
        });
    });
}

function $partial_0_4$Item___123_update_95_49_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return (function(x4){
                    return Item___123_update_95_49_125_(x1, x2, x3, x4);
                });
            });
        });
    });
}

function $partial_0_3$Item___123_update_95_50_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return Item___123_update_95_50_125_(x1, x2, x3);
            });
        });
    });
}

function $partial_0_4$Item___123_update_95_52_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return (function(x4){
                    return Item___123_update_95_52_125_(x1, x2, x3, x4);
                });
            });
        });
    });
}

function $partial_0_2$Item___123_update_95_57_125_(){
    return (function(x1){
        return (function(x2){
            return Item___123_update_95_57_125_(x1, x2);
        });
    });
}

function $partial_0_3$Item___123_update_95_58_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return Item___123_update_95_58_125_(x1, x2, x3);
            });
        });
    });
}

function $partial_1_2$Item___123_update_95_59_125_(x1){
    return (function(x2){
        return Item___123_update_95_59_125_(x1, x2);
    });
}

function $partial_0_2$Item___123_update_95_60_125_(){
    return (function(x1){
        return (function(x2){
            return Item___123_update_95_60_125_(x1, x2);
        });
    });
}

function $partial_1_2$Item___123_update_95_71_125_(x1){
    return (function(x2){
        return Item___123_update_95_71_125_(x1, x2);
    });
}

function $partial_1_2$Item___123_update_95_72_125_(x1){
    return (function(x2){
        return Item___123_update_95_72_125_(x1, x2);
    });
}

function $partial_0_1$Item___123_update_95_83_125_(){
    return (function(x1){
        return Item___123_update_95_83_125_(x1);
    });
}

function $partial_2_3$Item___123_update_95_117_125_(x1, x2){
    return (function(x3){
        return Item___123_update_95_117_125_(x1, x2, x3);
    });
}

function $partial_0_1$Item___123_update_95_119_125_(){
    return (function(x1){
        return Item___123_update_95_119_125_(x1);
    });
}

function $partial_1_2$Item___123_update_95_124_125_(x1){
    return (function(x2){
        return Item___123_update_95_124_125_(x1, x2);
    });
}

function $partial_0_1$Item___123_update_95_135_125_(){
    return (function(x1){
        return Item___123_update_95_135_125_(x1);
    });
}

function $partial_0_1$Item___123_update_95_136_125_(){
    return (function(x1){
        return Item___123_update_95_136_125_(x1);
    });
}

function $partial_0_3$Main___123_update_95_154_125_(){
    return (function(x1){
        return (function(x2){
            return (function(x3){
                return Main___123_update_95_154_125_(x1, x2, x3);
            });
        });
    });
}

function $partial_0_1$Main___123_update_95_155_125_(){
    return (function(x1){
        return Main___123_update_95_155_125_(x1);
    });
}

function $partial_0_1$Main___123_update_95_166_125_(){
    return (function(x1){
        return Main___123_update_95_166_125_(x1);
    });
}

function $partial_0_1$Main___123_update_95_167_125_(){
    return (function(x1){
        return Main___123_update_95_167_125_(x1);
    });
}

function $partial_1_2$Main___123_update_95_178_125_(x1){
    return (function(x2){
        return Main___123_update_95_178_125_(x1, x2);
    });
}

function $partial_1_2$Main___123_update_95_189_125_(x1){
    return (function(x2){
        return Main___123_update_95_189_125_(x1, x2);
    });
}

function $partial_0_1$Main___123_update_95_204_125_(){
    return (function(x1){
        return Main___123_update_95_204_125_(x1);
    });
}

function $partial_0_1$Main___123_update_95_205_125_(){
    return (function(x1){
        return Main___123_update_95_205_125_(x1);
    });
}

function $partial_2_3$Main___123_update_95_240_125_(x1, x2){
    return (function(x3){
        return Main___123_update_95_240_125_(x1, x2, x3);
    });
}

function $partial_0_1$Main___123_update_95_251_125_(){
    return (function(x1){
        return Main___123_update_95_251_125_(x1);
    });
}

function $partial_0_1$Main___123_update_95_252_125_(){
    return (function(x1){
        return Main___123_update_95_252_125_(x1);
    });
}

function $partial_3_4$Main___123_update_95_253_125_(x1, x2, x3){
    return (function(x4){
        return Main___123_update_95_253_125_(x1, x2, x3, x4);
    });
}

function $partial_2_3$Main___123_update_95_254_125_(x1, x2){
    return (function(x3){
        return Main___123_update_95_254_125_(x1, x2, x3);
    });
}

function $partial_1_2$Main___123_update_95_277_125_(x1){
    return (function(x2){
        return Main___123_update_95_277_125_(x1, x2);
    });
}

function $partial_1_2$Main___123_update_95_278_125_(x1){
    return (function(x2){
        return Main___123_update_95_278_125_(x1, x2);
    });
}

function $partial_1_2$Main___123_update_95_294_125_(x1){
    return (function(x2){
        return Main___123_update_95_294_125_(x1, x2);
    });
}

function $partial_2_4$Main___123_update_95_295_125_(x1, x2){
    return (function(x3){
        return (function(x4){
            return Main___123_update_95_295_125_(x1, x2, x3, x4);
        });
    });
}

function $partial_1_2$Main___123_update_95_316_125_(x1){
    return (function(x2){
        return Main___123_update_95_316_125_(x1, x2);
    });
}

function $partial_1_2$Main___123_update_95_317_125_(x1){
    return (function(x2){
        return Main___123_update_95_317_125_(x1, x2);
    });
}

function $partial_2_3$Main___123_update_95_328_125_(x1, x2){
    return (function(x3){
        return Main___123_update_95_328_125_(x1, x2, x3);
    });
}

function $partial_2_3$Main___123_update_95_329_125_(x1, x2){
    return (function(x3){
        return Main___123_update_95_329_125_(x1, x2, x3);
    });
}

function $partial_2_3$Main___123_update_95_330_125_(x1, x2){
    return (function(x3){
        return Main___123_update_95_330_125_(x1, x2, x3);
    });
}

function $partial_8_9$Main___123_update_95_331_125_(x1, x2, x3, x4, x5, x6, x7, x8){
    return (function(x9){
        return Main___123_update_95_331_125_(x1, x2, x3, x4, x5, x6, x7, x8, x9);
    });
}

function $partial_4_5$Main___123_update_95_333_125_(x1, x2, x3, x4){
    return (function(x5){
        return Main___123_update_95_333_125_(x1, x2, x3, x4, x5);
    });
}

function $partial_3_4$Main___123_update_95_334_125_(x1, x2, x3){
    return (function(x4){
        return Main___123_update_95_334_125_(x1, x2, x3, x4);
    });
}

function $partial_1_2$Main___123_update_95_345_125_(x1){
    return (function(x2){
        return Main___123_update_95_345_125_(x1, x2);
    });
}

function $partial_1_2$Main___123_update_95_346_125_(x1){
    return (function(x2){
        return Main___123_update_95_346_125_(x1, x2);
    });
}

function $partial_0_1$Item___123_view_95_347_125_(){
    return (function(x1){
        return Item___123_view_95_347_125_(x1);
    });
}

function $partial_0_1$Item___123_view_95_348_125_(){
    return (function(x1){
        return Item___123_view_95_348_125_(x1);
    });
}

function $partial_0_1$Item___123_view_95_351_125_(){
    return (function(x1){
        return Item___123_view_95_351_125_(x1);
    });
}

function $partial_0_1$Main___123_view_95_353_125_(){
    return (function(x1){
        return Main___123_view_95_353_125_(x1);
    });
}

function $partial_1_2$Prelude__Monad___123_Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0_95_lam_95_373_125_(x1){
    return (function(x2){
        return Prelude__Monad___123_Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0_95_lam_95_373_125_(x1, x2);
    });
}

function $partial_2_3$Control__Monad__Trans___123_Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0_95_lam_95_374_125_(x1, x2){
    return (function(x3){
        return Control__Monad__Trans___123_Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0_95_lam_95_374_125_(x1, x2, x3);
    });
}

function $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(x1, x2, x3, x4, x5, x6, x7){
    return (function(x8){
        return Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(x1, x2, x3, x4, x5, x6, x7, x8);
    });
}

function $partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(x1, x2, x3, x4, x5){
    return (function(x6){
        return Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(x1, x2, x3, x4, x5, x6);
    });
}

function $partial_2_3$$_355_Elm__Encode__array_58_go_58_0_95_lam(x1, x2){
    return (function(x3){
        return $_355_Elm__Encode__array_58_go_58_0_95_lam(x1, x2, x3);
    });
}

function $partial_1_3$$_356_Elm__Encode__array_58_go_58_0_95_lam(x1){
    return (function(x2){
        return (function(x3){
            return $_356_Elm__Encode__array_58_go_58_0_95_lam(x1, x2, x3);
        });
    });
}

function $partial_1_2$$_359_Elm__Platform__initialize_58_runCmd_58_0_95_lam(x1){
    return (function(x2){
        return $_359_Elm__Platform__initialize_58_runCmd_58_0_95_lam(x1, x2);
    });
}

function $partial_3_4$$_362_Elm__Encode__object_58_go_58_0_95_lam(x1, x2, x3){
    return (function(x4){
        return $_362_Elm__Encode__object_58_go_58_0_95_lam(x1, x2, x3, x4);
    });
}

function $partial_1_3$$_365_Elm__Decode__runDecoder_58_run_58_0_95_lam(x1){
    return (function(x2){
        return (function(x3){
            return $_365_Elm__Decode__runDecoder_58_run_58_0_95_lam(x1, x2, x3);
        });
    });
}

function $partial_0_2$$_366_Main__view_58_itemsLeft_58_0_95_lam(){
    return (function(x1){
        return (function(x2){
            return $_366_Main__view_58_itemsLeft_58_0_95_lam(x1, x2);
        });
    });
}

function $partial_0_1$$_367_Main__view_58_viewHeader_58_0_95_lam(){
    return (function(x1){
        return $_367_Main__view_58_viewHeader_58_0_95_lam(x1);
    });
}

function $partial_0_1$$_368_Main__view_58_viewHeader_58_0_95_lam(){
    return (function(x1){
        return $_368_Main__view_58_viewHeader_58_0_95_lam(x1);
    });
}

function $partial_0_1$$_369_Main__view_58_viewMain_58_0_95_lam(){
    return (function(x1){
        return $_369_Main__view_58_viewMain_58_0_95_lam(x1);
    });
}

function $partial_0_1$$_371_Main__view_58_viewMain_58_0_95_lam(){
    return (function(x1){
        return $_371_Main__view_58_viewMain_58_0_95_lam(x1);
    });
}

function $partial_1_2$$_372_Main__view_58_viewMain_58_0_95_lam(x1){
    return (function(x2){
        return $_372_Main__view_58_viewMain_58_0_95_lam(x1, x2);
    });
}

function $partial_1_2$Main__encodeTodos_58_encodePair_58_0(x1){
    return (function(x2){
        return Main__encodeTodos_58_encodePair_58_0(x1, x2);
    });
}

function $partial_1_3$Elm__Platform__initialize_58_runCmd_58_0(x1){
    return (function(x2){
        return (function(x3){
            return Elm__Platform__initialize_58_runCmd_58_0(x1, x2, x3);
        });
    });
}

function $partial_2_5$Elm__Platform__initialize_58_runUpdate_58_0(x1, x2){
    return (function(x3){
        return (function(x4){
            return (function(x5){
                return Elm__Platform__initialize_58_runUpdate_58_0(x1, x2, x3, x4, x5);
            });
        });
    });
}

function $partial_1_2$IdrisScript__typeOf_58_ctrName_58_0(x1){
    return (function(x2){
        return IdrisScript__typeOf_58_ctrName_58_0(x1, x2);
    });
}

function $partial_3_4$Main__view_58_viewFilter_58_0(x1, x2, x3){
    return (function(x4){
        return Main__view_58_viewFilter_58_0(x1, x2, x3, x4);
    });
}

const $HC_0_0$MkUnit = ({type: 0});
const $HC_0_0$TheWorld = ({type: 0});
function $HC_2_1$Prelude__List___58__58_($1, $2){
    this.type = 1;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_2_7$Elm__Decode___62__62__61_($1, $2){
    this.type = 7;
    this.$1 = $1;
    this.$2 = $2;
}

const $HC_0_1$Main__Active = ({type: 1});
const $HC_0_0$Main__All = ({type: 0});
const $HC_0_5$Elm__Decode__Any = ({type: 5});
function $HC_1_3$Elm__Decode__Array($1){
    this.type = 3;
    this.$1 = $1;
}

function $HC_2_4$Elm__Decode__At($1, $2){
    this.type = 4;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_2_3$Elm__Cmd__Batch($1, $2){
    this.type = 3;
    this.$1 = $1;
    this.$2 = $2;
}

const $HC_0_7$Main__BeforeUnload = ({type: 7});
const $HC_0_3$Main__ClearCompleted = ({type: 3});
function $HC_1_0$Item__Completed($1){
    this.type = 0;
    this.$1 = $1;
}

const $HC_0_2$Main__Completed = ({type: 2});
const $HC_0_2$Utils__DecodeError = ({type: 2});
const $HC_0_1$Item__Destroy = ({type: 1});
function $HC_1_0$Main__Edit($1){
    this.type = 0;
    this.$1 = $1;
}

function $HC_1_3$Item__EditInput($1){
    this.type = 3;
    this.$1 = $1;
}

const $HC_0_4$Item__EditingCancel = ({type: 4});
const $HC_0_5$Item__EditingCommit = ({type: 5});
function $HC_1_2$Item__EditingOn($1){
    this.type = 2;
    this.$1 = $1;
}

function $HC_1_1$Elm__Decode__Failure($1){
    this.type = 1;
    this.$1 = $1;
}

function $HC_1_6$Main__HashChange($1){
    this.type = 6;
    this.$1 = $1;
}

const $HC_0_1$Utils__InvalidJson = ({type: 1});
const $HC_0_2$IdrisScript__JSBoolean = ({type: 2});
const $HC_0_3$IdrisScript__JSFunction = ({type: 3});
const $HC_0_4$IdrisScript__JSNull = ({type: 4});
const $HC_0_0$IdrisScript__JSNumber = ({type: 0});
function $HC_1_5$IdrisScript__JSObject($1){
    this.type = 5;
    this.$1 = $1;
}

const $HC_0_1$IdrisScript__JSString = ({type: 1});
const $HC_0_6$IdrisScript__JSUndefined = ({type: 6});
function $HC_1_1$Prelude__Maybe__Just($1){
    this.type = 1;
    this.$1 = $1;
}

function $HC_1_5$Main__KeyPress($1){
    this.type = 5;
    this.$1 = $1;
}

function $HC_1_0$Prelude__Either__Left($1){
    this.type = 0;
    this.$1 = $1;
}

function $HC_2_2$Elm__Cmd__Map($1, $2){
    this.type = 2;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_2_0$Builtins__MkDPair($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_1_2$IdrisScript__MkJSBoolean($1){
    this.type = 2;
    this.$1 = $1;
}

function $HC_1_3$IdrisScript__MkJSFunction($1){
    this.type = 3;
    this.$1 = $1;
}

function $HC_1_4$IdrisScript__MkJSNull($1){
    this.type = 4;
    this.$1 = $1;
}

function $HC_1_0$IdrisScript__MkJSNumber($1){
    this.type = 0;
    this.$1 = $1;
}

function $HC_1_5$IdrisScript__MkJSObject($1){
    this.type = 5;
    this.$1 = $1;
}

function $HC_1_1$IdrisScript__MkJSString($1){
    this.type = 1;
    this.$1 = $1;
}

function $HC_1_6$IdrisScript__MkJSUndefined($1){
    this.type = 6;
    this.$1 = $1;
}

function $HC_3_0$Item__MkModel($1, $2, $3){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
}

function $HC_3_0$Main__MkModel($1, $2, $3){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
}

function $HC_2_0$Elm__Events__MkOptions($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_2_0$Builtins__MkPair($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_3_0$Elm__Platform__MkProgram($1, $2, $3){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
}

function $HC_2_0$Elm__Cmd__MkUpdateState($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

const $HC_0_0$Elm__Cmd__Never = ({type: 0});
const $HC_0_0$Prelude__List__Nil = ({type: 0});
const $HC_0_1$Prelude__Basics__No = ({type: 1});
const $HC_0_0$Utils__NoItem = ({type: 0});
const $HC_0_0$Utils__NoSpaceLeft = ({type: 0});
const $HC_0_0$Prelude__Maybe__Nothing = ({type: 0});
const $HC_0_0$Prelude__Show__Open = ({type: 0});
function $HC_1_2$Elm__Decode__Prim($1){
    this.type = 2;
    this.$1 = $1;
}

function $HC_1_1$Elm__Cmd__Pure($1){
    this.type = 1;
    this.$1 = $1;
}

function $HC_1_1$Prelude__Either__Right($1){
    this.type = 1;
    this.$1 = $1;
}

function $HC_2_1$Prelude__Strings__StrCons($1, $2){
    this.type = 1;
    this.$1 = $1;
    this.$2 = $2;
}

const $HC_0_0$Prelude__Strings__StrNil = ({type: 0});
function $HC_1_0$Elm__Decode__Success($1){
    this.type = 0;
    this.$1 = $1;
}

function $HC_2_4$Main__Todo($1, $2){
    this.type = 4;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_1_2$Main__ToggleAll($1){
    this.type = 2;
    this.$1 = $1;
}

const $HC_0_0$Prelude__Basics__Yes = ({type: 0});
function $HC_2_0$Prelude__Monad__Monad_95_ictor($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

function $HC_3_0$Control__Monad__State__MonadState_95_ictor($1, $2, $3){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
}

function $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor($1, $2){
    this.type = 0;
    this.$1 = $1;
    this.$2 = $2;
}

// io_bind

function io_95_bind($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_k, $_5_w){
    return $_4_k($_3_arg($_5_w))($_5_w);
}

// prim__strCons

function prim_95__95_strCons($_0_arg, $_1_arg){
    return (($_0_arg)+($_1_arg));
}

// prim__toStrBigInt

function prim_95__95_toStrBigInt($_0_arg){
    return (($_0_arg).toString());
}

// Prelude.List.++

function Prelude__List___43__43_($_0_arg, $_1_arg, $_2_arg){
    
    if(($_1_arg.type === 1)) {
        return new $HC_2_1$Prelude__List___58__58_($_1_arg.$1, Prelude__List___43__43_(null, $_1_arg.$2, $_2_arg));
    } else {
        return $_2_arg;
    }
}

// Elm.Types.::

function Elm__Types___58__58_($_0_arg, $_1_arg, $_2_arg){
    return (_elm_lang$core$Native_List.Cons(($_1_arg), ($_2_arg)));
}

// Elm.Types.Nil

function Elm__Types__Nil($_0_arg){
    return (_elm_lang$core$Native_List.Nil);
}

// Elm.Subs.addEventListener

function Elm__Subs__addEventListener($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    return (
          function (target, name, decoder, runDecoder) {
            return function (callback) {
              return function () {
                target.addEventListener(name, eventHandler);
                return function () {
                  target.removeEventListener(name, eventHandler);
                };
                function eventHandler(value) {
                  var ethr = runDecoder(decoder)(value);
                  if (ethr.type === 1) callback(ethr.$1)();
                }
              };
            };
          }(($_1_arg), ($_2_arg), ($_3_arg), ($partial_1_3$Elm__Decode__runDecoder(null)))
          );
}

// Main.applyFilter

function Main__applyFilter($_0_arg, $_1_arg){
    
    if(($_0_arg.type === 1)) {
        
        return (!(!(!$_1_arg.$2)));
    } else if(($_0_arg.type === 0)) {
        return true;
    } else if(($_0_arg.type === 2)) {
        
        
        if($_1_arg.$2) {
            return $_1_arg.$2;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Elm.Cmd.batchCommand

function Elm__Cmd__batchCommand($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    
    const $cg$3 = $_3_arg.$2;
    const $cg$5 = $cg$3.$1;
    let $cg$6 = null;
    const $cg$8 = $_3_arg.$2;
    $cg$6 = $cg$8.$2;
    return $cg$5.$2(null)(null)($cg$6)($partial_2_3$Elm__Cmd___123_batchCommand_95_0_125_($_3_arg, $_4_arg));
}

// Elm.Encode.bool

function Elm__Encode__bool($_0_arg){
    
    if($_0_arg) {
        return (true);
    } else {
        return (false);
    }
}

// Elm.Attributes.classList

function Elm__Attributes__classList($_0_arg, $_1_arg){
    return Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString(Prelude__Strings__unwords(Prelude__List__intersperse(null, " ", Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_0_1$Elm__Attributes___123_classList_95_1_125_(), Prelude__List__filter(null, $partial_0_1$Elm__Attributes___123_classList_95_2_125_(), $_1_arg))))));
}

// Elm.Platform.embed

function Elm__Platform__embed($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_7_in){
    
    const $_9_in = Elm__Platform__embed_58_makeSetup_58_0(null, null, null, $_3_arg.$1, $_3_arg.$2, $_3_arg.$3, $_7_in);
    return Elm__Platform__embed_58_start_58_0(null, null, $_2_arg, null, null, null, $_9_in, $_7_in);
}

// Main.encodeTodos

function Main__encodeTodos($_0_arg){
    return Elm__Encode__array_58_go_58_0(null, Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_1_2$Main__encodeTodos_58_encodePair_58_0(null), $_0_arg), $HC_0_0$TheWorld);
}

// Elm.Cmd.eval

function Elm__Cmd__eval($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    let $tco$$_2_arg = $_2_arg;
    for(;;) {
        
        if(($_1_arg.type === 3)) {
            return $partial_4_5$Elm__Cmd___123_eval_95_8_125_($_3_arg, $_1_arg.$1, $_2_arg, $_1_arg.$2);
        } else if(($_1_arg.type === 2)) {
            $tco$$_2_arg = $partial_2_3$Elm__Cmd___123_eval_95_9_125_($_2_arg, $_1_arg.$1);
            $_0_arg = null;
            $_1_arg = $_1_arg.$2;
            $_2_arg = $tco$$_2_arg;
            $_3_arg = $_3_arg;
        } else if(($_1_arg.type === 0)) {
            return $_3_arg;
        } else {
            return $partial_3_4$Elm__Cmd___123_eval_95_10_125_($_2_arg, $_1_arg.$1, $_3_arg);
        }
    }
}

// Prelude.List.filter

function Prelude__List__filter($_0_arg, $_1_arg, $_2_arg){
    for(;;) {
        
        if(($_2_arg.type === 1)) {
            
            if($_1_arg($_2_arg.$1)) {
                return new $HC_2_1$Prelude__List___58__58_($_2_arg.$1, Prelude__List__filter(null, $_1_arg, $_2_arg.$2));
            } else {
                $_0_arg = null;
                $_1_arg = $_1_arg;
                $_2_arg = $_2_arg.$2;
            }
        } else {
            return $_2_arg;
        }
    }
}

// Prelude.List.find

function Prelude__List__find($_0_arg, $_1_arg, $_2_arg){
    for(;;) {
        
        if(($_2_arg.type === 1)) {
            
            if($_1_arg($_2_arg.$1)) {
                return new $HC_1_1$Prelude__Maybe__Just($_2_arg.$1);
            } else {
                $_0_arg = null;
                $_1_arg = $_1_arg;
                $_2_arg = $_2_arg.$2;
            }
        } else {
            return $HC_0_0$Prelude__Maybe__Nothing;
        }
    }
}

// Utils.fixHash

function Utils__fixHash($_0_x, $_1_w){
    return (window.location.hash = ($_0_x));
}

// Prelude.Strings.foldr1

function Prelude__Strings__foldr1($_0_arg, $_1_arg, $_2_arg){
    
    if(($_2_arg.type === 1)) {
        
        if(($_2_arg.$2.type === 0)) {
            return $_2_arg.$1;
        } else {
            return $_1_arg($_2_arg.$1)(Prelude__Strings__foldr1(null, $_1_arg, $_2_arg.$2));
        }
    } else {
        return new $JSRTS.Lazy((function(){
            return (function(){
                return Prelude__Strings___123_foldr1_95_13_125_();
            })();
        }));
    }
}

// Main.fromUrl

function Main__fromUrl($_0_arg){
    
    if(($_0_arg === "#/")) {
        return new $HC_1_1$Prelude__Maybe__Just($HC_0_0$Main__All);
    } else if(($_0_arg === "#/active")) {
        return new $HC_1_1$Prelude__Maybe__Just($HC_0_1$Main__Active);
    } else if(($_0_arg === "#/completed")) {
        return new $HC_1_1$Prelude__Maybe__Just($HC_0_2$Main__Completed);
    } else {
        return $HC_0_0$Prelude__Maybe__Nothing;
    }
}

// Elm.Platform.fullscreen

function Elm__Platform__fullscreen($_0_arg, $_1_arg, $_2_arg, $_3_in){
    const $_4_in = (document.body);
    return Elm__Platform__embed(null, null, $_4_in, $_2_arg, $_3_in);
}

// Utils.genUUID4

function Utils__genUUID4($_0_w){
    return (
      function() {
        var uuid = '', ii;
        for (ii = 0; ii < 32; ii += 1) {
          switch (ii) {
          case 8:
          case 20:
            uuid += '-';
            uuid += (Math.random() * 16 | 0).toString(16);
            break;
          case 12:
            uuid += '-';
            uuid += '4';
            break;
          case 16:
            uuid += '-';
            uuid += (Math.random() * 4 | 8).toString(16);
            break;
          default:
            uuid += (Math.random() * 16 | 0).toString(16);
          }
        }
        return uuid;
      }()
      );
}

// Elm.Cmd.getModel

function Elm__Cmd__getModel($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    
    const $cg$3 = $_4_arg.$1;
    let $cg$4 = null;
    const $cg$6 = $_4_arg.$2;
    $cg$4 = $cg$6.$2;
    return $cg$3.$2(null)(null)($cg$4)($partial_1_2$Elm__Cmd___123_getModel_95_14_125_($_3_arg));
}

// IdrisScript.Objects.getProperty

function IdrisScript__Objects__getProperty($_0_arg, $_1_arg, $_2_arg, $_3_in){
    let $cg$1 = null;
    if(($_2_arg.type === 2)) {
        $cg$1 = $_2_arg.$1;
    } else if(($_2_arg.type === 3)) {
        $cg$1 = $_2_arg.$1;
    } else if(($_2_arg.type === 4)) {
        $cg$1 = $_2_arg.$1;
    } else if(($_2_arg.type === 0)) {
        $cg$1 = $_2_arg.$1;
    } else if(($_2_arg.type === 5)) {
        $cg$1 = $_2_arg.$1;
    } else if(($_2_arg.type === 1)) {
        $cg$1 = $_2_arg.$1;
    } else {
        $cg$1 = $_2_arg.$1;
    }
    
    const $_11_in = (($cg$1)[($_1_arg)]);
    const $_12_in = IdrisScript__typeOf($_11_in, $_3_in);
    
    if(($_12_in.type === 6)) {
        return $HC_0_0$Prelude__Maybe__Nothing;
    } else {
        return IdrisScript__Objects___123_getProperty_95_16_125_($_0_arg, $_1_arg, $_2_arg, $_3_in, $_11_in, $_12_in)(null)(null)($partial_1_2$IdrisScript__pack($_11_in))($partial_0_2$IdrisScript__Objects___123_getProperty_95_17_125_())($_3_in);
    }
}

// Utils.hashChange

function Utils__hashChange($_0_arg, $_1_arg){
    return (
          function(proj) {
            return function(callback) {
              return function () {
                var prev = window.onpopState;
                window.onpopstate = function() {
                  callback(proj(window.location.hash))();
                };
                return function () {
                  window.onpopstate = prev;  
                };
              };
            };
          }(($_1_arg))
          );
}

// Elm.Platform.initialize

function Elm__Platform__initialize($_0_in){
    const $_6_in = (_idris$exports.either = ($partial_0_3$Elm__Platform___123_initialize_95_18_125_()));
    const $_7_in = (_idris$exports.runDecoder = ($partial_1_3$Elm__Decode__runDecoder(null)));
    const $_12_in = (_idris$exports.mapDecoder = ($partial_0_2$Elm__Platform___123_initialize_95_20_125_()));
    const $_14_in = (_idris$exports.forceLazy = ($partial_0_1$Elm__Platform___123_initialize_95_21_125_()));
    return (
        _elm_lang$core$Native_Platform.initialize = function(init, update, subscriptions, renderer) {
           var model = init.hasOwnProperty('_0') ? init._0 : init;
           function tagger(action) {
             var monad = update(action);
             var tuple = ($partial_2_5$Elm__Platform__initialize_58_runUpdate_58_0(null, null))(monad)(model)();
             model = tuple.hasOwnProperty('$1') ? tuple.$1 : tuple;
             ($partial_1_3$Elm__Platform__initialize_58_runCmd_58_0(null))(tuple.$2)(function (msg) { return function () { tagger(msg); } })();
             stepper(model);
           }
           var stepper = renderer(tagger, model);
        }
        );
}

// Prelude.List.intersperse

function Prelude__List__intersperse($_0_arg, $_1_arg, $_2_arg){
    
    if(($_2_arg.type === 1)) {
        return new $HC_2_1$Prelude__List___58__58_($_2_arg.$1, Prelude__List__intersperse_58_intersperse_39__58_1(null, null, null, null, $_1_arg, $_2_arg.$2));
    } else {
        return $_2_arg;
    }
}

// Prelude.Chars.isSpace

function Prelude__Chars__isSpace($_0_arg){
    
    if((((($_0_arg === " ")) ? 1|0 : 0|0) === 0)) {
        
        if((((($_0_arg === "\t")) ? 1|0 : 0|0) === 0)) {
            
            if((((($_0_arg === "\r")) ? 1|0 : 0|0) === 0)) {
                
                if((((($_0_arg === "\n")) ? 1|0 : 0|0) === 0)) {
                    
                    if((((($_0_arg === "\f")) ? 1|0 : 0|0) === 0)) {
                        
                        if((((($_0_arg === "\v")) ? 1|0 : 0|0) === 0)) {
                            return ($_0_arg === "\xa0");
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}

// Elm.Events.keyCode

function Elm__Events__keyCode(){
    return new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("keyCode", $HC_0_0$Prelude__List__Nil), new $HC_2_7$Elm__Decode___62__62__61_(new $HC_1_2$Elm__Decode__Prim($HC_0_0$IdrisScript__JSNumber), $partial_0_1$Elm__Events___123_keyCode_95_22_125_()));
}

// Item.keyCodeEq

function Item__keyCodeEq($_0_arg, $_1_arg, $_2_arg){
    return new $HC_2_7$Elm__Decode___62__62__61_(Elm__Events__keyCode(), $partial_2_3$Item___123_keyCodeEq_95_23_125_($_1_arg, $_2_arg));
}

// Utils.localStorageGetItem

function Utils__localStorageGetItem($_0_arg, $_1_arg, $_2_arg, $_3_in){
    const $_4_in = Utils__localStorageGetItem_58_read_58_0($_1_arg, null, null, $_3_in);
    
    if(($_4_in.type === 0)) {
        return $_4_in;
    } else {
        const $cg$3 = Elm__Decode__parse($_4_in.$1);
        if(($cg$3.type === 0)) {
            return new $HC_1_0$Prelude__Either__Left($HC_0_1$Utils__InvalidJson);
        } else {
            return Utils__localStorageGetItem_58_mapLeft_58_0(null, null, null, null, null, null, $partial_0_1$Utils___123_localStorageGetItem_95_24_125_(), Elm__Decode__runDecoder(null, $_2_arg, $cg$3.$1));
        }
    }
}

// Utils.localStorageSetItem

function Utils__localStorageSetItem($_0_arg, $_1_arg, $_2_w){
    return (
        function(name, item, NoSpaceLeft, Right) {
           try {
             localStorage.setItem(name, JSON.stringify(item));
             return Right;
           } catch (e) {
             return NoSpaceLeft;
           }
        }(($_0_arg), ($_1_arg), (new $HC_1_0$Prelude__Either__Left($HC_0_0$Utils__NoSpaceLeft)), (new $HC_1_1$Prelude__Either__Right($HC_0_0$MkUnit)))
        );
}

// Main.main

function Main__main($_0_in){
    const $_1_in = Utils__localStorageGetItem(null, "todomvc-idris-elm", Main__todosDecoder(), $_0_in);
    const $_2_in = Elm__Platform__initialize($_0_in);
    const $_3_in = Utils__readHash($_0_in);
    let $cg$1 = null;
    if(($_1_in.type === 0)) {
        $cg$1 = Main___123_main_95_26_125_($_0_in, $_1_in, $_2_in, $_3_in, $_1_in.$1)($_1_in.$1);
    } else {
        $cg$1 = Main___123_main_95_28_125_($_0_in, $_1_in, $_2_in, $_3_in, $_1_in.$1)($_1_in.$1);
    }
    
    const $cg$3 = Main__fromUrl($_3_in);
    let $cg$2 = null;
    if(($cg$3.type === 1)) {
        $cg$2 = Main___123_main_95_28_125_($_0_in, $_1_in, $_2_in, $_3_in, $cg$3.$1)($cg$3.$1);
    } else {
        $cg$2 = $HC_0_0$Main__All;
    }
    
    return Elm__Platform__fullscreen(null, null, new $HC_3_0$Elm__Platform__MkProgram(new $HC_3_0$Main__MkModel("", $cg$1, $cg$2), $partial_0_1$Main__update(), $partial_0_1$Main__view()), $_0_in);
}

// Elm.Cmd.modifyModel

function Elm__Cmd__modifyModel($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    
    const $cg$3 = $_3_arg.$1;
    let $cg$4 = null;
    const $cg$6 = $_3_arg.$2;
    $cg$4 = $cg$6.$2;
    return $cg$3.$2(null)(null)($cg$4)($partial_2_3$Elm__Cmd___123_modifyModel_95_32_125_($_3_arg, $_4_arg));
}

// Elm.Html.node

function Elm__Html__node($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    return (A3(_elm_lang$virtual_dom$Native_VirtualDom.node, ($_1_arg), ($_2_arg), ($_3_arg)));
}

// Elm.Events.onCheck

function Elm__Events__onCheck($_0_arg, $_1_arg){
    return Elm__Events__onWithOptions(null, "change", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("target", new $HC_2_1$Prelude__List___58__58_("checked", $HC_0_0$Prelude__List__Nil)), new $HC_1_2$Elm__Decode__Prim($HC_0_2$IdrisScript__JSBoolean)), $partial_1_2$Elm__Platform___123_initialize_95_19_125_($_1_arg)));
}

// Elm.Events.onInput

function Elm__Events__onInput($_0_arg, $_1_arg){
    return Elm__Events__onWithOptions(null, "input", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("target", new $HC_2_1$Prelude__List___58__58_("value", $HC_0_0$Prelude__List__Nil)), new $HC_1_2$Elm__Decode__Prim($HC_0_1$IdrisScript__JSString)), $partial_1_2$Elm__Platform___123_initialize_95_19_125_($_1_arg)));
}

// Elm.Events.onWithOptions

function Elm__Events__onWithOptions($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    let $cg$1 = null;
    $cg$1 = IdrisScript__Elm__Events___64_IdrisScript__ToJS_36_Options_58_JSObject_32__34_Object_34__58__33_toJS_58_0_58_io_58_0($_2_arg.$1, $_2_arg.$2, $HC_0_0$TheWorld);
    let $cg$2 = null;
    if(($cg$1.type === 2)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 3)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 4)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 0)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 5)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 1)) {
        $cg$2 = $cg$1.$1;
    } else {
        $cg$2 = $cg$1.$1;
    }
    
    return (A3(_elm_lang$virtual_dom$Native_VirtualDom.on, ($_1_arg), ($cg$2), ($_3_arg)));
}

// IdrisScript.pack

function IdrisScript__pack($_0_arg, $_1_in){
    const $_2_in = IdrisScript__typeOf($_0_arg, $_1_in);
    
    if(($_2_in.type === 2)) {
        return new $HC_2_0$Builtins__MkDPair($HC_0_2$IdrisScript__JSBoolean, new $HC_1_2$IdrisScript__MkJSBoolean($_0_arg));
    } else if(($_2_in.type === 3)) {
        return new $HC_2_0$Builtins__MkDPair($HC_0_3$IdrisScript__JSFunction, new $HC_1_3$IdrisScript__MkJSFunction($_0_arg));
    } else if(($_2_in.type === 4)) {
        return new $HC_2_0$Builtins__MkDPair($HC_0_4$IdrisScript__JSNull, new $HC_1_4$IdrisScript__MkJSNull($_0_arg));
    } else if(($_2_in.type === 0)) {
        return new $HC_2_0$Builtins__MkDPair($HC_0_0$IdrisScript__JSNumber, new $HC_1_0$IdrisScript__MkJSNumber($_0_arg));
    } else if(($_2_in.type === 5)) {
        return new $HC_2_0$Builtins__MkDPair($_2_in, new $HC_1_5$IdrisScript__MkJSObject($_0_arg));
    } else if(($_2_in.type === 1)) {
        return new $HC_2_0$Builtins__MkDPair($HC_0_1$IdrisScript__JSString, new $HC_1_1$IdrisScript__MkJSString($_0_arg));
    } else {
        return new $HC_2_0$Builtins__MkDPair($HC_0_6$IdrisScript__JSUndefined, new $HC_1_6$IdrisScript__MkJSUndefined($_0_arg));
    }
}

// Elm.Decode.parse

function Elm__Decode__parse($_0_arg){
    return Prelude__Functor__Prelude___64_Prelude__Functor__Functor_36_Either_32_e_58__33_map_58_0(null, null, null, $partial_0_1$Main___123_main_95_27_125_(), (
          function(str, Left, Right) {
            try {
               return Right(JSON.parse(str));
            } catch (e) {
               return Left(e.message);
            }
          }(($_0_arg), ($partial_0_1$Elm__Decode___123_parse_95_36_125_()), ($partial_0_1$Elm__Decode___123_parse_95_37_125_()))
          ));
}

// Utils.pluralize

function Utils__pluralize($_0_arg, $_1_arg, $_2_arg){
    
    if($_0_arg.equals((new $JSRTS.jsbn.BigInteger(("0"))))) {
        return $_2_arg;
    } else {
        const $_3_in = $_0_arg.subtract((new $JSRTS.jsbn.BigInteger(("1"))));
        
        if($_3_in.equals((new $JSRTS.jsbn.BigInteger(("0"))))) {
            return $_1_arg;
        } else {
            return $_2_arg;
        }
    }
}

// Prelude.Show.primNumShow

function Prelude__Show__primNumShow($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    const $_4_in = $_1_arg($_3_arg);
    let $cg$1 = null;
    $cg$1 = (new $JSRTS.jsbn.BigInteger(("0")));
    let $cg$2 = null;
    if((Prelude__Interfaces__Prelude__Interfaces___64_Prelude__Interfaces__Ord_36_Integer_58__33_compare_58_0($cg$1, (new $JSRTS.jsbn.BigInteger(("5")))) > 0)) {
        $cg$2 = true;
    } else {
        let $cg$3 = null;
        $cg$3 = (new $JSRTS.jsbn.BigInteger(("0")));
        $cg$2 = $cg$3.equals((new $JSRTS.jsbn.BigInteger(("5"))));
    }
    
    let $cg$4 = null;
    if($cg$2) {
        let $cg$5 = null;
        if((((($_4_in == "")) ? 1|0 : 0|0) === 0)) {
            $cg$5 = true;
        } else {
            $cg$5 = false;
        }
        
        
        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$5, true).type === 1)) {
            $cg$4 = false;
        } else {
            $cg$4 = ($_4_in[0] === "-");
        }
    } else {
        $cg$4 = false;
    }
    
    
    if($cg$4) {
        return ("(" + ($_4_in + ")"));
    } else {
        return $_4_in;
    }
}

// Elm.Attributes.property

function Elm__Attributes__property($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    let $cg$1 = null;
    if(($_3_arg.type === 2)) {
        $cg$1 = $_3_arg.$1;
    } else if(($_3_arg.type === 3)) {
        $cg$1 = $_3_arg.$1;
    } else if(($_3_arg.type === 4)) {
        $cg$1 = $_3_arg.$1;
    } else if(($_3_arg.type === 0)) {
        $cg$1 = $_3_arg.$1;
    } else if(($_3_arg.type === 5)) {
        $cg$1 = $_3_arg.$1;
    } else if(($_3_arg.type === 1)) {
        $cg$1 = $_3_arg.$1;
    } else {
        $cg$1 = $_3_arg.$1;
    }
    
    return (A2(_elm_lang$virtual_dom$Native_VirtualDom.property, ($_2_arg), ($cg$1)));
}

// Utils.readHash

function Utils__readHash($_0_w){
    return (window.location.hash);
}

// Elm.Decode.runDecoder

function Elm__Decode__runDecoder($_0_arg, $_1_arg, $_2_arg){
    const $cg$2 = IdrisScript__pack($_2_arg, $HC_0_0$TheWorld);
    let $cg$1 = null;
    $cg$1 = $cg$2.$1;
    const $cg$4 = IdrisScript__pack($_2_arg, $HC_0_0$TheWorld);
    let $cg$3 = null;
    $cg$3 = $cg$4.$2;
    return Elm__Decode__runDecoder_58_run_58_0(null, $cg$1, null, null, null, $_1_arg, $cg$3);
}

// Elm.Cmd.runUpdate

function Elm__Cmd__runUpdate($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_in){
    const $_5_in = $_2_arg(new $HC_2_0$Elm__Cmd__MkUpdateState($_3_arg, $HC_0_0$Elm__Cmd__Never))($_4_in);
    
    const $cg$3 = $_5_in.$2;
    return new $HC_2_0$Builtins__MkPair($cg$3.$1, $cg$3.$2);
}

// Utils.setTimeout

function Utils__setTimeout($_0_arg, $_1_arg, $_2_arg, $_3_w){
    return (setTimeout(($_2_arg), ((($_1_arg).intValue()|0))));
}

// Elm.Subs.subscribe

function Elm__Subs__subscribe($_0_arg, $_1_arg, $_2_arg){
    return (A2(_elm_lang$virtual_dom$Native_VirtualDom.subscribe, ($_1_arg), ($_2_arg)));
}

// Elm.Html.text

function Elm__Html__text($_0_arg, $_1_arg){
    return (_elm_lang$virtual_dom$Native_VirtualDom.text(($_1_arg)));
}

// Main.toUrl

function Main__toUrl($_0_arg){
    
    if(($_0_arg.type === 1)) {
        return "#/active";
    } else if(($_0_arg.type === 0)) {
        return "#/";
    } else {
        return "#/completed";
    }
}

// Main.todosDecoder

function Main__todosDecoder(){
    return new $HC_1_3$Elm__Decode__Array(new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("id", $HC_0_0$Prelude__List__Nil), new $HC_1_2$Elm__Decode__Prim($HC_0_1$IdrisScript__JSString)), $partial_0_1$Main___123_todosDecoder_95_40_125_()));
}

// Prelude.Strings.trim

function Prelude__Strings__trim($_0_arg){
    let $cg$1 = null;
    if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
        $cg$1 = true;
    } else {
        $cg$1 = false;
    }
    
    let $cg$2 = null;
    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$1, true).type === 1)) {
        $cg$2 = "";
    } else {
        
        if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
            let $cg$4 = null;
            if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$4 = true;
            } else {
                $cg$4 = false;
            }
            
            
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$4, true).type === 1)) {
                $cg$2 = "";
            } else {
                
                if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                    let $cg$7 = null;
                    if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                        $cg$7 = true;
                    } else {
                        $cg$7 = false;
                    }
                    
                    
                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$7, true).type === 1)) {
                        $cg$2 = "";
                    } else {
                        
                        if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0])) {
                            let $cg$10 = null;
                            if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                $cg$10 = true;
                            } else {
                                $cg$10 = false;
                            }
                            
                            
                            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$10, true).type === 1)) {
                                $cg$2 = "";
                            } else {
                                
                                if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1)[0])) {
                                    let $cg$13 = null;
                                    if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                        $cg$13 = true;
                                    } else {
                                        $cg$13 = false;
                                    }
                                    
                                    let $cg$14 = null;
                                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$13, true).type === 1)) {
                                        $cg$14 = $HC_0_0$Prelude__Strings__StrNil;
                                    } else {
                                        $cg$14 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1).slice(1).slice(1));
                                    }
                                    
                                    $cg$2 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$14);
                                } else {
                                    $cg$2 = (((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1).slice(1)));
                                }
                            }
                        } else {
                            $cg$2 = (((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1)));
                        }
                    }
                } else {
                    $cg$2 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                }
            }
        } else {
            $cg$2 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
        }
    }
    
    let $cg$15 = null;
    if((((((($cg$2).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
        $cg$15 = true;
    } else {
        $cg$15 = false;
    }
    
    
    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$15, true).type === 1)) {
        return "";
    } else {
        let $cg$17 = null;
        if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
            $cg$17 = true;
        } else {
            $cg$17 = false;
        }
        
        let $cg$18 = null;
        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$17, true).type === 1)) {
            $cg$18 = "";
        } else {
            
            if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                let $cg$20 = null;
                if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                    $cg$20 = true;
                } else {
                    $cg$20 = false;
                }
                
                
                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$20, true).type === 1)) {
                    $cg$18 = "";
                } else {
                    
                    if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                        let $cg$23 = null;
                        if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                            $cg$23 = true;
                        } else {
                            $cg$23 = false;
                        }
                        
                        let $cg$24 = null;
                        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$23, true).type === 1)) {
                            $cg$24 = $HC_0_0$Prelude__Strings__StrNil;
                        } else {
                            $cg$24 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                        }
                        
                        $cg$18 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$24);
                    } else {
                        $cg$18 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                    }
                }
            } else {
                $cg$18 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
            }
        }
        
        
        if(Prelude__Chars__isSpace((($cg$18).split('').reverse().join(''))[0])) {
            let $cg$42 = null;
            if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$42 = true;
            } else {
                $cg$42 = false;
            }
            
            let $cg$43 = null;
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$42, true).type === 1)) {
                $cg$43 = "";
            } else {
                
                if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                    let $cg$45 = null;
                    if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                        $cg$45 = true;
                    } else {
                        $cg$45 = false;
                    }
                    
                    
                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$45, true).type === 1)) {
                        $cg$43 = "";
                    } else {
                        
                        if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                            let $cg$48 = null;
                            if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                $cg$48 = true;
                            } else {
                                $cg$48 = false;
                            }
                            
                            let $cg$49 = null;
                            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$48, true).type === 1)) {
                                $cg$49 = $HC_0_0$Prelude__Strings__StrNil;
                            } else {
                                $cg$49 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                            }
                            
                            $cg$43 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$49);
                        } else {
                            $cg$43 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                        }
                    }
                } else {
                    $cg$43 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
                }
            }
            
            let $cg$50 = null;
            if((((((($cg$43).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$50 = true;
            } else {
                $cg$50 = false;
            }
            
            let $cg$51 = null;
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$50, true).type === 1)) {
                $cg$51 = $HC_0_0$Prelude__Strings__StrNil;
            } else {
                let $cg$52 = null;
                if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
                    $cg$52 = true;
                } else {
                    $cg$52 = false;
                }
                
                let $cg$53 = null;
                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$52, true).type === 1)) {
                    $cg$53 = "";
                } else {
                    
                    if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                        let $cg$55 = null;
                        if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                            $cg$55 = true;
                        } else {
                            $cg$55 = false;
                        }
                        
                        
                        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$55, true).type === 1)) {
                            $cg$53 = "";
                        } else {
                            
                            if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                                let $cg$58 = null;
                                if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                    $cg$58 = true;
                                } else {
                                    $cg$58 = false;
                                }
                                
                                let $cg$59 = null;
                                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$58, true).type === 1)) {
                                    $cg$59 = $HC_0_0$Prelude__Strings__StrNil;
                                } else {
                                    $cg$59 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                                }
                                
                                $cg$53 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$59);
                            } else {
                                $cg$53 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                            }
                        }
                    } else {
                        $cg$53 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
                    }
                }
                
                let $cg$60 = null;
                if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
                    $cg$60 = true;
                } else {
                    $cg$60 = false;
                }
                
                let $cg$61 = null;
                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$60, true).type === 1)) {
                    $cg$61 = "";
                } else {
                    
                    if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                        let $cg$63 = null;
                        if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                            $cg$63 = true;
                        } else {
                            $cg$63 = false;
                        }
                        
                        
                        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$63, true).type === 1)) {
                            $cg$61 = "";
                        } else {
                            
                            if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                                let $cg$66 = null;
                                if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                    $cg$66 = true;
                                } else {
                                    $cg$66 = false;
                                }
                                
                                let $cg$67 = null;
                                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$66, true).type === 1)) {
                                    $cg$67 = $HC_0_0$Prelude__Strings__StrNil;
                                } else {
                                    $cg$67 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                                }
                                
                                $cg$61 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$67);
                            } else {
                                $cg$61 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                            }
                        }
                    } else {
                        $cg$61 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
                    }
                }
                
                $cg$51 = new $HC_2_1$Prelude__Strings__StrCons((($cg$53).split('').reverse().join('')).slice(1)[0], (($cg$61).split('').reverse().join('')).slice(1).slice(1));
            }
            
            return _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$51);
        } else {
            let $cg$26 = null;
            if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$26 = true;
            } else {
                $cg$26 = false;
            }
            
            let $cg$27 = null;
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$26, true).type === 1)) {
                $cg$27 = "";
            } else {
                
                if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                    let $cg$29 = null;
                    if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                        $cg$29 = true;
                    } else {
                        $cg$29 = false;
                    }
                    
                    
                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$29, true).type === 1)) {
                        $cg$27 = "";
                    } else {
                        
                        if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                            let $cg$32 = null;
                            if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                $cg$32 = true;
                            } else {
                                $cg$32 = false;
                            }
                            
                            let $cg$33 = null;
                            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$32, true).type === 1)) {
                                $cg$33 = $HC_0_0$Prelude__Strings__StrNil;
                            } else {
                                $cg$33 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                            }
                            
                            $cg$27 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$33);
                        } else {
                            $cg$27 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                        }
                    }
                } else {
                    $cg$27 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
                }
            }
            
            let $cg$34 = null;
            if((((((($_0_arg).split('').reverse().join('')) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$34 = true;
            } else {
                $cg$34 = false;
            }
            
            let $cg$35 = null;
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$34, true).type === 1)) {
                $cg$35 = "";
            } else {
                
                if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join(''))[0])) {
                    let $cg$37 = null;
                    if((((((($_0_arg).split('').reverse().join('')).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                        $cg$37 = true;
                    } else {
                        $cg$37 = false;
                    }
                    
                    
                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$37, true).type === 1)) {
                        $cg$35 = "";
                    } else {
                        
                        if(Prelude__Chars__isSpace((($_0_arg).split('').reverse().join('')).slice(1)[0])) {
                            let $cg$40 = null;
                            if((((((($_0_arg).split('').reverse().join('')).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                                $cg$40 = true;
                            } else {
                                $cg$40 = false;
                            }
                            
                            let $cg$41 = null;
                            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$40, true).type === 1)) {
                                $cg$41 = $HC_0_0$Prelude__Strings__StrNil;
                            } else {
                                $cg$41 = new $HC_2_1$Prelude__Strings__StrCons((($_0_arg).split('').reverse().join('')).slice(1).slice(1)[0], (($_0_arg).split('').reverse().join('')).slice(1).slice(1).slice(1));
                            }
                            
                            $cg$35 = _95_Prelude__Strings__ltrim_95_with_95_54(null, $cg$41);
                        } else {
                            $cg$35 = (((($_0_arg).split('').reverse().join('')).slice(1)[0])+((($_0_arg).split('').reverse().join('')).slice(1).slice(1)));
                        }
                    }
                } else {
                    $cg$35 = (((($_0_arg).split('').reverse().join(''))[0])+((($_0_arg).split('').reverse().join('')).slice(1)));
                }
            }
            
            return (((($cg$27).split('').reverse().join(''))[0])+((($cg$35).split('').reverse().join('')).slice(1)));
        }
    }
}

// IdrisScript.typeOf

function IdrisScript__typeOf($_0_arg, $_1_in){
    const $_2_in = ((function(arg) {
             if (arg == null)
               return 6;
             if (typeof arg == 'number')
               return 0;
             else if (typeof arg == 'string')
               return 1;
             else if (typeof arg == 'boolean')
               return 2;
             else if (typeof arg == 'function')
               return 3;
             else if (typeof arg == 'undefined')
               return 4;
             else if (typeof arg == 'object')
               return 5;
             else
               return 6;
           })(($_0_arg)));
    
    if(($_2_in === 0)) {
        return $HC_0_0$IdrisScript__JSNumber;
    } else if(($_2_in === 1)) {
        return $HC_0_1$IdrisScript__JSString;
    } else if(($_2_in === 2)) {
        return $HC_0_2$IdrisScript__JSBoolean;
    } else if(($_2_in === 3)) {
        return $HC_0_3$IdrisScript__JSFunction;
    } else if(($_2_in === 4)) {
        return $HC_0_6$IdrisScript__JSUndefined;
    } else if(($_2_in === 5)) {
        return IdrisScript___123_typeOf_95_42_125_($_0_arg, $_1_in, $_2_in)(null)(null)($partial_1_2$IdrisScript__typeOf_58_ctrName_58_0($_0_arg))($partial_0_2$IdrisScript___123_typeOf_95_43_125_())($_1_in);
    } else {
        return $HC_0_4$IdrisScript__JSNull;
    }
}

// Prelude.Strings.unpack

function Prelude__Strings__unpack($_0_arg){
    let $cg$1 = null;
    if((((($_0_arg == "")) ? 1|0 : 0|0) === 0)) {
        $cg$1 = true;
    } else {
        $cg$1 = false;
    }
    
    
    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$1, true).type === 1)) {
        return $HC_0_0$Prelude__List__Nil;
    } else {
        return new $HC_2_1$Prelude__List___58__58_($_0_arg[0], Prelude__Strings__unpack($_0_arg.slice(1)));
    }
}

// Prelude.Strings.unwords

function Prelude__Strings__unwords($_37_in){
    let $cg$1 = null;
    if((Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_0_1$Prelude__Strings___123_unwords_95_44_125_(), $_37_in).type === 0)) {
        $cg$1 = Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_0_1$Prelude__Strings___123_unwords_95_44_125_(), $_37_in);
    } else {
        $cg$1 = Prelude__Strings__foldr1(null, $partial_0_2$Prelude__Strings___123_unwords_95_45_125_(), Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_0_1$Prelude__Strings___123_unwords_95_44_125_(), $_37_in));
    }
    
    return Prelude__Foldable__Prelude__List___64_Prelude__Foldable__Foldable_36_List_58__33_foldr_58_0(null, null, $partial_0_2$prim_95__95_strCons(), "", $cg$1);
}

// Item.update

function Item__update($_0_arg){
    
    if(($_0_arg.type === 0)) {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Item___123_update_95_59_125_($_0_arg.$1));
    } else if(($_0_arg.type === 1)) {
        return $partial_0_2$Item___123_update_95_60_125_();
    } else if(($_0_arg.type === 3)) {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Item___123_update_95_72_125_($_0_arg.$1));
    } else if(($_0_arg.type === 4)) {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_0_1$Item___123_update_95_83_125_());
    } else if(($_0_arg.type === 5)) {
        return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), Elm__Cmd__getModel(null, null, null, $partial_0_4$Item___123_update_95_49_125_(), new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_()))), $partial_0_1$Item___123_update_95_119_125_());
    } else {
        return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_3_4$Utils__setTimeout(null, (new $JSRTS.jsbn.BigInteger(("100"))), $partial_1_2$Item___123_update_95_124_125_($_0_arg.$1))), $partial_0_1$Item___123_update_95_136_125_());
    }
}

// Main.update

function Main__update($_0_arg){
    
    if(($_0_arg.type === 7)) {
        return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), Elm__Cmd__getModel(null, null, null, $partial_0_4$Item___123_update_95_49_125_(), new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_()))), $partial_0_1$Main___123_update_95_155_125_());
    } else if(($_0_arg.type === 3)) {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_0_1$Main___123_update_95_167_125_());
    } else if(($_0_arg.type === 0)) {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Main___123_update_95_178_125_($_0_arg.$1));
    } else if(($_0_arg.type === 6)) {
        const $cg$5 = Main__fromUrl($_0_arg.$1);
        if(($cg$5.type === 1)) {
            return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Main___123_update_95_189_125_($cg$5.$1));
        } else {
            return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_1_2$Utils__fixHash(Main__toUrl($HC_0_0$Main__All))), $partial_0_1$Main___123_update_95_205_125_());
        }
    } else if(($_0_arg.type === 5)) {
        
        if(($_0_arg.$1 === 13)) {
            return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), Elm__Cmd__getModel(null, null, null, $partial_0_4$Item___123_update_95_49_125_(), new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_()))), $partial_2_3$Main___123_update_95_254_125_($_0_arg, $_0_arg.$1));
        } else {
            return $partial_0_2$Item___123_update_95_60_125_();
        }
    } else if(($_0_arg.type === 4)) {
        
        if(($_0_arg.$2.type === 1)) {
            return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Main___123_update_95_278_125_($_0_arg.$1));
        } else {
            return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), Elm__Cmd__getModel(null, null, null, $partial_0_4$Item___123_update_95_49_125_(), new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_()))), $partial_3_4$Main___123_update_95_334_125_($_0_arg.$1, $_0_arg, $_0_arg.$2));
        }
    } else {
        return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_1_2$Main___123_update_95_346_125_($_0_arg.$1));
    }
}

// Item.view

function Item__view($_0_arg){
    
    let $cg$2 = null;
    if($_0_arg.$2) {
        $cg$2 = new $HC_1_2$IdrisScript__MkJSBoolean(true);
    } else {
        $cg$2 = new $HC_1_2$IdrisScript__MkJSBoolean(false);
    }
    
    const $cg$4 = $_0_arg.$3;
    let $cg$3 = null;
    if(($cg$4.type === 1)) {
        $cg$3 = Main___123_main_95_28_125_($_0_arg, $_0_arg.$1, $_0_arg.$2, $_0_arg.$3, $cg$4.$1)($cg$4.$1);
    } else {
        $cg$3 = "";
    }
    
    return Elm__Html__node(null, "li", Elm__Types___58__58_(null, Elm__Attributes__classList(null, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("completed", $_0_arg.$2), new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("editing", (!(!($_0_arg.$3.type === 1)))), $HC_0_0$Prelude__List__Nil))), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "div", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("view")), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "dblclick", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("currentTarget", $HC_0_0$Prelude__List__Nil), $HC_0_5$Elm__Decode__Any), $partial_0_1$Item___123_view_95_347_125_())), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "input", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("toggle")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "type", new $HC_1_1$IdrisScript__MkJSString("checkbox")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "checked", $cg$2), Elm__Types___58__58_(null, Elm__Events__onCheck(null, $partial_0_1$Item___123_view_95_348_125_()), Elm__Types__Nil(null))))), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "label", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, $_0_arg.$1), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "button", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("destroy")), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "click", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_1_0$Elm__Decode__Success($HC_0_1$Item__Destroy)), Elm__Types__Nil(null))), Elm__Types__Nil(null)), Elm__Types__Nil(null))))), Elm__Types___58__58_(null, Elm__Html__node(null, "input", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("edit")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "value", new $HC_1_1$IdrisScript__MkJSString($cg$3)), Elm__Types___58__58_(null, Elm__Events__onInput(null, $partial_0_1$Item___123_view_95_351_125_()), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "blur", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_1_0$Elm__Decode__Success($HC_0_5$Item__EditingCommit)), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "keypress", new $HC_2_0$Elm__Events__MkOptions(false, false), Item__keyCodeEq(null, 13, $HC_0_5$Item__EditingCommit)), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "keydown", new $HC_2_0$Elm__Events__MkOptions(false, false), Item__keyCodeEq(null, 27, $HC_0_4$Item__EditingCancel)), Elm__Types__Nil(null))))))), Elm__Types__Nil(null)), Elm__Types__Nil(null))));
}

// Main.view

function Main__view($_0_arg){
    
    return Elm__Html__node(null, "div", Elm__Types___58__58_(null, Elm__Subs__subscribe(null, "beforeunload", new $JSRTS.Lazy((function(){
        return (function(){
            return Main___123_view_95_352_125_();
        })();
    }))), Elm__Types___58__58_(null, Elm__Subs__subscribe(null, "hashChange", new $JSRTS.Lazy((function(){
        return (function(){
            return Main___123_view_95_354_125_();
        })();
    }))), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "section", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("todoapp")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Main__view_58_viewHeader_58_0($_0_arg.$1, null, null), Elm__Types___58__58_(null, Main__view_58_viewMain_58_0(null, $_0_arg.$2, $_0_arg.$3), Elm__Types___58__58_(null, Main__view_58_viewFooter_58_0(null, $_0_arg.$2, $_0_arg.$3), Elm__Types__Nil(null))))), Elm__Types___58__58_(null, Main__view_58_footerInfo_58_0(null, null, null, null), Elm__Types__Nil(null))));
}

// Elm.Subs.window

function Elm__Subs__window(){
    return (window);
}

// Elm.Cmd.{batchCommand_0}

function Elm__Cmd___123_batchCommand_95_0_125_($_0_lift, $_1_lift, $_2_lift){
    
    const $cg$3 = $_0_lift.$2;
    let $cg$4 = null;
    let $cg$5 = null;
    $cg$5 = $_2_lift.$2;
    $cg$4 = new $HC_2_0$Elm__Cmd__MkUpdateState($_2_lift.$1, Prelude__Algebra__Elm__Cmd___64_Prelude__Algebra__Semigroup_36_Command_32_a_58__33__60__43__62__58_0(null, $cg$5, $_1_lift));
    return $cg$3.$3($cg$4);
}

// Elm.Attributes.{classList_1}

function Elm__Attributes___123_classList_95_1_125_($_0_lift){
    
    return $_0_lift.$1;
}

// Elm.Attributes.{classList_2}

function Elm__Attributes___123_classList_95_2_125_($_0_lift){
    
    return $_0_lift.$2;
}

// Elm.Cmd.{eval_5}

function Elm__Cmd___123_eval_95_5_125_($_0_lift){
    return $HC_0_0$MkUnit;
}

// Elm.Cmd.{eval_6}

function Elm__Cmd___123_eval_95_6_125_($_0_lift, $_1_lift, $_2_lift){
    const $_14_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_writeIORef_39__58_0(null, $_0_lift, true, $_2_lift);
    return $_1_lift($_2_lift);
}

// Elm.Cmd.{eval_7}

function Elm__Cmd___123_eval_95_7_125_($_0_lift, $_1_lift, $_2_lift){
    const $_17_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_writeIORef_39__58_0(null, $_0_lift, true, $_2_lift);
    return $_1_lift($_2_lift);
}

// Elm.Cmd.{eval_8}

function Elm__Cmd___123_eval_95_8_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift){
    const $_7_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_newIORef_39__58_0(null, false, $_4_lift);
    const $_8_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_newIORef_39__58_0(null, false, $_4_lift);
    const $_9_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_readIORef_39__58_0(null, $_7_in, $_4_lift);
    const $_10_in = Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_readIORef_39__58_0(null, $_8_in, $_4_lift);
    let $cg$1 = null;
    if($_9_in) {
        $cg$1 = $_10_in;
    } else {
        $cg$1 = $_9_in;
    }
    
    let $_11_in = null;
    if($cg$1) {
        $_11_in = $_0_lift;
    } else {
        $_11_in = $partial_0_1$Elm__Cmd___123_eval_95_5_125_();
    }
    
    const $_15_in = Elm__Cmd__eval(null, $_1_lift, $_2_lift, $partial_2_3$Elm__Cmd___123_eval_95_6_125_($_7_in, $_11_in))($_4_lift);
    return Elm__Cmd__eval(null, $_3_lift, $_2_lift, $partial_2_3$Elm__Cmd___123_eval_95_7_125_($_8_in, $_11_in))($_4_lift);
}

// Elm.Cmd.{eval_9}

function Elm__Cmd___123_eval_95_9_125_($_0_lift, $_1_lift, $_2_lift){
    return $_0_lift($_1_lift($_2_lift));
}

// Elm.Cmd.{eval_10}

function Elm__Cmd___123_eval_95_10_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    const $_25_in = $_0_lift($_1_lift)($_3_lift);
    return $_2_lift($_3_lift);
}

// Prelude.Strings.{foldr1_13}

function Prelude__Strings___123_foldr1_95_13_125_(){
    throw new Error(  "*** ./Prelude/Strings.idr:24:1-16:unmatched case in Prelude.Strings.foldr1 ***");
}

// Elm.Cmd.{getModel_14}

function Elm__Cmd___123_getModel_95_14_125_($_0_lift, $_1_lift){
    let $cg$1 = null;
    $cg$1 = $_1_lift.$1;
    return $_0_lift(null)($cg$1);
}

// IdrisScript.Objects.{getProperty_15}

function IdrisScript__Objects___123_getProperty_95_15_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return $partial_5_6$io_95_bind(null, null, null, $_2_lift, $_3_lift);
}

// IdrisScript.Objects.{getProperty_16}

function IdrisScript__Objects___123_getProperty_95_16_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_5_lift){
    return $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_();
}

// IdrisScript.Objects.{getProperty_17}

function IdrisScript__Objects___123_getProperty_95_17_125_($_0_lift, $_1_lift){
    return new $HC_1_1$Prelude__Maybe__Just($_0_lift);
}

// Elm.Platform.{initialize_18}

function Elm__Platform___123_initialize_95_18_125_($_0_lift, $_1_lift, $_2_lift){
    
    if(($_2_lift.type === 0)) {
        return $_0_lift($_2_lift.$1);
    } else {
        return $_1_lift($_2_lift.$1);
    }
}

// Elm.Platform.{initialize_19}

function Elm__Platform___123_initialize_95_19_125_($_0_lift, $_1_lift){
    return new $HC_1_0$Elm__Decode__Success($_0_lift($_1_lift));
}

// Elm.Platform.{initialize_20}

function Elm__Platform___123_initialize_95_20_125_($_0_lift, $_1_lift){
    return new $HC_2_7$Elm__Decode___62__62__61_($_1_lift, $partial_1_2$Elm__Platform___123_initialize_95_19_125_($_0_lift));
}

// Elm.Platform.{initialize_21}

function Elm__Platform___123_initialize_95_21_125_($_0_lift){
    return $JSRTS.force($_0_lift);
}

// Elm.Events.{keyCode_22}

function Elm__Events___123_keyCode_95_22_125_($_0_lift){
    return new $HC_1_0$Elm__Decode__Success((($_0_lift)|0));
}

// Item.{keyCodeEq_23}

function Item___123_keyCodeEq_95_23_125_($_0_lift, $_1_lift, $_2_lift){
    
    if((((($_2_lift === $_0_lift)) ? 1|0 : 0|0) === 0)) {
        return new $HC_1_1$Elm__Decode__Failure("Different key code");
    } else {
        return new $HC_1_0$Elm__Decode__Success($_1_lift);
    }
}

// Utils.{localStorageGetItem_24}

function Utils___123_localStorageGetItem_95_24_125_($_0_lift){
    return $HC_0_2$Utils__DecodeError;
}

// Main.{main_25}

function Main___123_main_95_25_125_($_0_lift){
    return $HC_0_0$Prelude__List__Nil;
}

// Main.{main_26}

function Main___123_main_95_26_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift){
    return $partial_0_1$Main___123_main_95_25_125_();
}

// Main.{main_27}

function Main___123_main_95_27_125_($_0_lift){
    return $_0_lift;
}

// Main.{main_28}

function Main___123_main_95_28_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift){
    return $partial_0_1$Main___123_main_95_27_125_();
}

// Elm.Cmd.{modifyModel_32}

function Elm__Cmd___123_modifyModel_95_32_125_($_0_lift, $_1_lift, $_2_lift){
    
    
    const $cg$4 = $_0_lift.$2;
    return $cg$4.$3(new $HC_2_0$Elm__Cmd__MkUpdateState($_1_lift($_2_lift.$1), $_2_lift.$2));
}

// Elm.Decode.{parse_36}

function Elm__Decode___123_parse_95_36_125_($_0_lift){
    return new $HC_1_0$Prelude__Either__Left($_0_lift);
}

// Elm.Decode.{parse_37}

function Elm__Decode___123_parse_95_37_125_($_0_lift){
    return new $HC_1_1$Prelude__Either__Right($_0_lift);
}

// Main.{todosDecoder_38}

function Main___123_todosDecoder_95_38_125_($_0_lift, $_1_lift, $_2_lift){
    return new $HC_1_0$Elm__Decode__Success(new $HC_2_0$Builtins__MkPair($_0_lift, new $HC_3_0$Item__MkModel($_1_lift, $_2_lift, $HC_0_0$Prelude__Maybe__Nothing)));
}

// Main.{todosDecoder_39}

function Main___123_todosDecoder_95_39_125_($_0_lift, $_1_lift){
    return new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("completed", $HC_0_0$Prelude__List__Nil), new $HC_1_2$Elm__Decode__Prim($HC_0_2$IdrisScript__JSBoolean)), $partial_2_3$Main___123_todosDecoder_95_38_125_($_0_lift, $_1_lift));
}

// Main.{todosDecoder_40}

function Main___123_todosDecoder_95_40_125_($_0_lift){
    return new $HC_2_7$Elm__Decode___62__62__61_(new $HC_2_4$Elm__Decode__At(new $HC_2_1$Prelude__List___58__58_("title", $HC_0_0$Prelude__List__Nil), new $HC_1_2$Elm__Decode__Prim($HC_0_1$IdrisScript__JSString)), $partial_1_2$Main___123_todosDecoder_95_39_125_($_0_lift));
}

// IdrisScript.{typeOf_42}

function IdrisScript___123_typeOf_95_42_125_($_0_lift, $_1_lift, $_2_lift){
    return $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_();
}

// IdrisScript.{typeOf_43}

function IdrisScript___123_typeOf_95_43_125_($_0_lift, $_1_lift){
    return new $HC_1_5$IdrisScript__JSObject($_0_lift);
}

// Prelude.Strings.{unwords_44}

function Prelude__Strings___123_unwords_95_44_125_($_0_lift){
    let $cg$1 = null;
    if((((($_0_lift == "")) ? 1|0 : 0|0) === 0)) {
        $cg$1 = true;
    } else {
        $cg$1 = false;
    }
    
    
    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$1, true).type === 1)) {
        return $HC_0_0$Prelude__List__Nil;
    } else {
        let $cg$3 = null;
        if((((($_0_lift.slice(1) == "")) ? 1|0 : 0|0) === 0)) {
            $cg$3 = true;
        } else {
            $cg$3 = false;
        }
        
        let $cg$4 = null;
        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$3, true).type === 1)) {
            $cg$4 = $HC_0_0$Prelude__List__Nil;
        } else {
            let $cg$5 = null;
            if((((($_0_lift.slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                $cg$5 = true;
            } else {
                $cg$5 = false;
            }
            
            let $cg$6 = null;
            if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$5, true).type === 1)) {
                $cg$6 = $HC_0_0$Prelude__List__Nil;
            } else {
                let $cg$7 = null;
                if((((($_0_lift.slice(1).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                    $cg$7 = true;
                } else {
                    $cg$7 = false;
                }
                
                let $cg$8 = null;
                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$7, true).type === 1)) {
                    $cg$8 = $HC_0_0$Prelude__List__Nil;
                } else {
                    let $cg$9 = null;
                    if((((($_0_lift.slice(1).slice(1).slice(1).slice(1) == "")) ? 1|0 : 0|0) === 0)) {
                        $cg$9 = true;
                    } else {
                        $cg$9 = false;
                    }
                    
                    let $cg$10 = null;
                    if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$9, true).type === 1)) {
                        $cg$10 = $HC_0_0$Prelude__List__Nil;
                    } else {
                        $cg$10 = new $HC_2_1$Prelude__List___58__58_($_0_lift.slice(1).slice(1).slice(1).slice(1)[0], Prelude__Strings__unpack($_0_lift.slice(1).slice(1).slice(1).slice(1).slice(1)));
                    }
                    
                    $cg$8 = new $HC_2_1$Prelude__List___58__58_($_0_lift.slice(1).slice(1).slice(1)[0], $cg$10);
                }
                
                $cg$6 = new $HC_2_1$Prelude__List___58__58_($_0_lift.slice(1).slice(1)[0], $cg$8);
            }
            
            $cg$4 = new $HC_2_1$Prelude__List___58__58_($_0_lift.slice(1)[0], $cg$6);
        }
        
        return new $HC_2_1$Prelude__List___58__58_($_0_lift[0], $cg$4);
    }
}

// Prelude.Strings.{unwords_45}

function Prelude__Strings___123_unwords_95_45_125_($_0_lift, $_1_lift){
    return Prelude__List___43__43_(null, $_0_lift, new $HC_2_1$Prelude__List___58__58_(" ", $_1_lift));
}

// Item.{update_49}

function Item___123_update_95_49_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return new $HC_2_0$Builtins__MkPair($_1_lift, $_2_lift);
}

// Item.{update_50}

function Item___123_update_95_50_125_($_0_lift, $_1_lift, $_2_lift){
    return $_1_lift;
}

// Item.{update_52}

function Item___123_update_95_52_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $_2_lift, $_3_lift);
}

// Item.{update_57}

function Item___123_update_95_57_125_($_0_lift, $_1_lift){
    return new $HC_2_0$Builtins__MkPair($_0_lift, $_0_lift);
}

// Item.{update_58}

function Item___123_update_95_58_125_($_0_lift, $_1_lift, $_2_lift){
    return new $HC_2_0$Builtins__MkPair($HC_0_0$MkUnit, $_0_lift);
}

// Item.{update_59}

function Item___123_update_95_59_125_($_0_lift, $_1_lift){
    
    return new $HC_3_0$Item__MkModel($_1_lift.$1, $_0_lift, $_1_lift.$3);
}

// Item.{update_60}

function Item___123_update_95_60_125_($_0_lift, $_1_lift){
    return new $HC_2_0$Builtins__MkPair($HC_0_0$MkUnit, $_0_lift);
}

// Item.{update_71}

function Item___123_update_95_71_125_($_0_lift, $_1_lift){
    return $_0_lift;
}

// Item.{update_72}

function Item___123_update_95_72_125_($_0_lift, $_1_lift){
    
    let $cg$2 = null;
    $cg$2 = $_1_lift.$3;
    return new $HC_3_0$Item__MkModel($_1_lift.$1, $_1_lift.$2, Prelude__Functor__Prelude___64_Prelude__Functor__Functor_36_Maybe_58__33_map_58_0(null, null, $partial_1_2$Item___123_update_95_71_125_($_0_lift), $cg$2));
}

// Item.{update_83}

function Item___123_update_95_83_125_($_0_lift){
    
    return new $HC_3_0$Item__MkModel($_0_lift.$1, $_0_lift.$2, $HC_0_0$Prelude__Maybe__Nothing);
}

// Item.{update_117}

function Item___123_update_95_117_125_($_0_lift, $_1_lift, $_2_lift){
    
    return new $HC_3_0$Item__MkModel($_1_lift, $_0_lift.$2, $HC_0_0$Prelude__Maybe__Nothing);
}

// Item.{update_119}

function Item___123_update_95_119_125_($_0_lift){
    
    const $cg$3 = $_0_lift.$3;
    if(($cg$3.type === 1)) {
        
        if(($cg$3.$1 === "")) {
            return Elm__Cmd__batchCommand(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), new $HC_1_1$Elm__Cmd__Pure(new $HC_1_1$Prelude__Maybe__Just($HC_0_1$Item__Destroy)));
        } else {
            return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_2_3$Item___123_update_95_117_125_($_0_lift, $cg$3.$1));
        }
    } else {
        return $partial_0_2$Item___123_update_95_60_125_();
    }
}

// Item.{update_124}

function Item___123_update_95_124_125_($_0_lift, $_1_lift){
    return (($_0_lift).parentElement.querySelector('.edit').focus());
}

// Item.{update_135}

function Item___123_update_95_135_125_($_0_lift){
    
    let $cg$2 = null;
    $cg$2 = $_0_lift.$1;
    return new $HC_3_0$Item__MkModel($_0_lift.$1, $_0_lift.$2, new $HC_1_1$Prelude__Maybe__Just($cg$2));
}

// Item.{update_136}

function Item___123_update_95_136_125_($_0_lift){
    return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_0_1$Item___123_update_95_135_125_());
}

// Main.{update_154}

function Main___123_update_95_154_125_($_0_lift, $_1_lift, $_2_lift){
    return new $HC_2_0$Builtins__MkPair($HC_0_0$MkUnit, $_1_lift);
}

// Main.{update_155}

function Main___123_update_95_155_125_($_0_lift){
    let $cg$1 = null;
    $cg$1 = $_0_lift.$2;
    return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_2_3$Utils__localStorageSetItem("todomvc-idris-elm", Main__encodeTodos($cg$1))), $partial_0_3$Main___123_update_95_154_125_());
}

// Main.{update_166}

function Main___123_update_95_166_125_($_0_lift){
    
    const $cg$3 = $_0_lift.$2;
    return (!(!(!$cg$3.$2)));
}

// Main.{update_167}

function Main___123_update_95_167_125_($_0_lift){
    
    let $cg$2 = null;
    $cg$2 = $_0_lift.$2;
    return new $HC_3_0$Main__MkModel($_0_lift.$1, Prelude__List__filter(null, $partial_0_1$Main___123_update_95_166_125_(), $cg$2), $_0_lift.$3);
}

// Main.{update_178}

function Main___123_update_95_178_125_($_0_lift, $_1_lift){
    
    return new $HC_3_0$Main__MkModel($_0_lift, $_1_lift.$2, $_1_lift.$3);
}

// Main.{update_189}

function Main___123_update_95_189_125_($_0_lift, $_1_lift){
    
    return new $HC_3_0$Main__MkModel($_1_lift.$1, $_1_lift.$2, $_0_lift);
}

// Main.{update_204}

function Main___123_update_95_204_125_($_0_lift){
    
    return new $HC_3_0$Main__MkModel($_0_lift.$1, $_0_lift.$2, $HC_0_0$Main__All);
}

// Main.{update_205}

function Main___123_update_95_205_125_($_0_lift){
    return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_0_1$Main___123_update_95_204_125_());
}

// Main.{update_223}

function Main___123_update_95_223_125_($_0_lift, $_1_lift, $_2_lift){
    return $partial_0_4$Item___123_update_95_52_125_();
}

// Main.{update_229}

function Main___123_update_95_229_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return $partial_0_4$Item___123_update_95_52_125_();
}

// Main.{update_240}

function Main___123_update_95_240_125_($_0_lift, $_1_lift, $_2_lift){
    
    let $cg$2 = null;
    $cg$2 = $_2_lift.$2;
    let $cg$3 = null;
    $cg$3 = $_1_lift.$1;
    return new $HC_3_0$Main__MkModel($_2_lift.$1, Prelude__List___43__43_(null, $cg$2, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair($_0_lift, new $HC_3_0$Item__MkModel(Prelude__Strings__trim($cg$3), false, $HC_0_0$Prelude__Maybe__Nothing)), $HC_0_0$Prelude__List__Nil)), $_2_lift.$3);
}

// Main.{update_251}

function Main___123_update_95_251_125_($_0_lift){
    
    return new $HC_3_0$Main__MkModel("", $_0_lift.$2, $_0_lift.$3);
}

// Main.{update_252}

function Main___123_update_95_252_125_($_0_lift){
    return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_0_1$Main___123_update_95_251_125_());
}

// Main.{update_253}

function Main___123_update_95_253_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return Main___123_update_95_229_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift)(null)(null)(Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_2_3$Main___123_update_95_240_125_($_3_lift, $_2_lift)))($partial_0_1$Main___123_update_95_252_125_());
}

// Main.{update_254}

function Main___123_update_95_254_125_($_0_lift, $_1_lift, $_2_lift){
    let $cg$1 = null;
    $cg$1 = $_2_lift.$1;
    
    if((Prelude__Strings__trim($cg$1) === "")) {
        return $partial_0_2$Item___123_update_95_60_125_();
    } else {
        return Main___123_update_95_223_125_($_0_lift, $_1_lift, $_2_lift)(null)(null)($partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_0_1$Utils__genUUID4()))($partial_3_4$Main___123_update_95_253_125_($_0_lift, $_1_lift, $_2_lift));
    }
}

// Main.{update_277}

function Main___123_update_95_277_125_($_0_lift, $_1_lift){
    
    
    if((((($_1_lift.$1 == $_0_lift)) ? 1|0 : 0|0) === 0)) {
        return true;
    } else {
        return false;
    }
}

// Main.{update_278}

function Main___123_update_95_278_125_($_0_lift, $_1_lift){
    
    let $cg$2 = null;
    $cg$2 = $_1_lift.$2;
    return new $HC_3_0$Main__MkModel($_1_lift.$1, Prelude__List__filter(null, $partial_1_2$Main___123_update_95_277_125_($_0_lift), $cg$2), $_1_lift.$3);
}

// Main.{update_294}

function Main___123_update_95_294_125_($_0_lift, $_1_lift){
    let $cg$1 = null;
    $cg$1 = $_1_lift.$1;
    return ($_0_lift == $cg$1);
}

// Main.{update_295}

function Main___123_update_95_295_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    let $cg$1 = null;
    $cg$1 = $_1_lift.$2;
    return new $HC_2_0$Builtins__MkPair(Prelude__List__find(null, $partial_1_2$Main___123_update_95_294_125_($_0_lift), $cg$1), $_2_lift);
}

// Main.{update_299}

function Main___123_update_95_299_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_5_lift, $_6_lift, $_7_lift){
    return $partial_0_4$Item___123_update_95_52_125_();
}

// Main.{update_305}

function Main___123_update_95_305_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_5_lift, $_6_lift, $_7_lift, $_8_lift, $_9_lift, $_10_lift){
    return $partial_0_4$Item___123_update_95_52_125_();
}

// Main.{update_316}

function Main___123_update_95_316_125_($_0_lift, $_1_lift){
    return new $HC_2_4$Main__Todo($_0_lift, $_1_lift);
}

// Main.{update_317}

function Main___123_update_95_317_125_($_0_lift, $_1_lift){
    return Prelude__Functor__Prelude___64_Prelude__Functor__Functor_36_Maybe_58__33_map_58_0(null, null, $partial_1_2$Main___123_update_95_316_125_($_0_lift), $_1_lift);
}

// Main.{update_328}

function Main___123_update_95_328_125_($_0_lift, $_1_lift, $_2_lift){
    let $cg$1 = null;
    $cg$1 = $_2_lift.$1;
    
    if((((($_0_lift == $cg$1)) ? 1|0 : 0|0) === 0)) {
        return $_2_lift;
    } else {
        return new $HC_2_0$Builtins__MkPair($_0_lift, $_1_lift);
    }
}

// Main.{update_329}

function Main___123_update_95_329_125_($_0_lift, $_1_lift, $_2_lift){
    
    let $cg$2 = null;
    $cg$2 = $_2_lift.$2;
    return new $HC_3_0$Main__MkModel($_2_lift.$1, Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_2_3$Main___123_update_95_328_125_($_0_lift, $_1_lift), $cg$2), $_2_lift.$3);
}

// Main.{update_330}

function Main___123_update_95_330_125_($_0_lift, $_1_lift, $_2_lift){
    return Elm__Cmd__modifyModel(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), $partial_2_3$Main___123_update_95_329_125_($_0_lift, $_1_lift));
}

// Main.{update_331}

function Main___123_update_95_331_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_5_lift, $_6_lift, $_7_lift, $_8_lift){
    
    return Main___123_update_95_305_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_5_lift, $_6_lift, $_7_lift, $_8_lift, $_8_lift.$1, $_8_lift.$2)(null)(null)(Elm__Cmd__batchCommand(null, null, null, new $HC_2_0$Elm__Cmd__MonadUpdate_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), new $HC_3_0$Control__Monad__State__MonadState_95_ictor(new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_4$Item___123_update_95_49_125_(), $partial_0_4$Item___123_update_95_52_125_()), $partial_0_2$Item___123_update_95_57_125_(), $partial_0_3$Item___123_update_95_58_125_())), new $HC_2_2$Elm__Cmd__Map($partial_1_2$Main___123_update_95_317_125_($_1_lift), $_8_lift.$2)))($partial_2_3$Main___123_update_95_330_125_($_1_lift, $_8_lift.$1));
}

// Main.{update_333}

function Main___123_update_95_333_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift){
    
    if(($_4_lift.type === 1)) {
        const $cg$3 = $_4_lift.$1;
        return Main___123_update_95_299_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_4_lift.$1, $cg$3.$1, $cg$3.$2)(null)(null)($partial_5_6$Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0(null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_4_5$Elm__Cmd__runUpdate(null, null, Item__update($_2_lift), $cg$3.$2)))($partial_8_9$Main___123_update_95_331_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift, $_4_lift, $_4_lift.$1, $cg$3.$1, $cg$3.$2));
    } else {
        return $partial_0_2$Item___123_update_95_60_125_();
    }
}

// Main.{update_334}

function Main___123_update_95_334_125_($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return $partial_7_8$Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0(null, null, null, null, new $HC_2_0$Prelude__Monad__Monad_95_ictor($partial_0_3$Item___123_update_95_50_125_(), $partial_0_4$IdrisScript__Objects___123_getProperty_95_15_125_()), $partial_2_4$Main___123_update_95_295_125_($_0_lift, $_3_lift), $partial_4_5$Main___123_update_95_333_125_($_1_lift, $_0_lift, $_2_lift, $_3_lift));
}

// Main.{update_345}

function Main___123_update_95_345_125_($_0_lift, $_1_lift){
    
    const $cg$3 = $_1_lift.$2;
    let $cg$2 = null;
    $cg$2 = new $HC_3_0$Item__MkModel($cg$3.$1, $_0_lift, $cg$3.$3);
    return new $HC_2_0$Builtins__MkPair($_1_lift.$1, $cg$2);
}

// Main.{update_346}

function Main___123_update_95_346_125_($_0_lift, $_1_lift){
    
    let $cg$2 = null;
    $cg$2 = $_1_lift.$2;
    return new $HC_3_0$Main__MkModel($_1_lift.$1, Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_1_2$Main___123_update_95_345_125_($_0_lift), $cg$2), $_1_lift.$3);
}

// Item.{view_347}

function Item___123_view_95_347_125_($_0_lift){
    return new $HC_1_0$Elm__Decode__Success(new $HC_1_2$Item__EditingOn($_0_lift));
}

// Item.{view_348}

function Item___123_view_95_348_125_($_0_lift){
    return new $HC_1_0$Item__Completed($_0_lift);
}

// Item.{view_351}

function Item___123_view_95_351_125_($_0_lift){
    return new $HC_1_3$Item__EditInput($_0_lift);
}

// Main.{view_352}

function Main___123_view_95_352_125_(){
    return Elm__Subs__addEventListener(null, Elm__Subs__window(), "beforeunload", new $HC_1_0$Elm__Decode__Success($HC_0_7$Main__BeforeUnload));
}

// Main.{view_353}

function Main___123_view_95_353_125_($_0_lift){
    return new $HC_1_6$Main__HashChange($_0_lift);
}

// Main.{view_354}

function Main___123_view_95_354_125_(){
    return Utils__hashChange(null, $partial_0_1$Main___123_view_95_353_125_());
}

// Prelude.Monad.{Control.Monad.State.@Prelude.Monad.Monad$StateT stateType m:!>>=:0_lam_373}

function Prelude__Monad___123_Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0_95_lam_95_373_125_($_0_lift, $_1_lift){
    
    return $_0_lift($_1_lift.$1)($_1_lift.$2);
}

// Control.Monad.Trans.{Control.Monad.State.@Control.Monad.Trans.MonadTrans$StateT stateType:!lift:0_lam_374}

function Control__Monad__Trans___123_Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0_95_lam_95_374_125_($_0_lift, $_1_lift, $_2_lift){
    
    return $_0_lift.$1(null)(new $HC_2_0$Builtins__MkPair($_2_lift, $_1_lift));
}

// Prelude.Cast.Elm.Types.List a, ElmList a implementation of Prelude.Cast.Cast, method cast

function Prelude__Cast__Elm__Types___64_Prelude__Cast__Cast_36_List_32_a_58_ElmList_32_a_58__33_cast_58_0($_0_arg, $_1_arg){
    
    if(($_1_arg.type === 1)) {
        return Elm__Types___58__58_(null, $_1_arg.$1, Prelude__Cast__Elm__Types___64_Prelude__Cast__Cast_36_List_32_a_58_ElmList_32_a_58__33_cast_58_0(null, $_1_arg.$2));
    } else {
        return Elm__Types__Nil(null);
    }
}

// Decidable.Equality.Decidable.Equality.Bool implementation of Decidable.Equality.DecEq, method decEq

function Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($_0_arg, $_1_arg){
    
    if($_1_arg) {
        
        if($_0_arg) {
            return $HC_0_0$Prelude__Basics__Yes;
        } else {
            return $HC_0_1$Prelude__Basics__No;
        }
    } else {
        
        if($_0_arg) {
            return $HC_0_1$Prelude__Basics__No;
        } else {
            return $HC_0_0$Prelude__Basics__Yes;
        }
    }
}

// Decidable.Equality.Decidable.Equality.String implementation of Decidable.Equality.DecEq, method decEq

function Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_String_58__33_decEq_58_0($_0_arg, $_1_arg){
    
    if((((($_0_arg == $_1_arg)) ? 1|0 : 0|0) === 0)) {
        return $HC_0_1$Prelude__Basics__No;
    } else {
        return $HC_0_0$Prelude__Basics__Yes;
    }
}

// Prelude.Interfaces.Main.Filter implementation of Prelude.Interfaces.Eq, method ==

function Prelude__Interfaces__Main___64_Prelude__Interfaces__Eq_36_Filter_58__33__61__61__58_0($_0_arg, $_1_arg){
    
    if(($_1_arg.type === 1)) {
        return (!(!($_0_arg.type === 1)));
    } else if(($_1_arg.type === 0)) {
        return (!(!($_0_arg.type === 0)));
    } else if(($_1_arg.type === 2)) {
        return (!(!($_0_arg.type === 2)));
    } else {
        return false;
    }
}

// Prelude.Foldable.Prelude.List.List implementation of Prelude.Foldable.Foldable, method foldl

function Prelude__Foldable__Prelude__List___64_Prelude__Foldable__Foldable_36_List_58__33_foldl_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    let $tco$$_3_arg = $_3_arg;
    for(;;) {
        
        if(($_4_arg.type === 1)) {
            $tco$$_3_arg = $_2_arg($_3_arg)($_4_arg.$1);
            $_0_arg = null;
            $_1_arg = null;
            $_2_arg = $_2_arg;
            $_3_arg = $tco$$_3_arg;
            $_4_arg = $_4_arg.$2;
        } else {
            return $_3_arg;
        }
    }
}

// Prelude.Foldable.Prelude.List.List implementation of Prelude.Foldable.Foldable, method foldr

function Prelude__Foldable__Prelude__List___64_Prelude__Foldable__Foldable_36_List_58__33_foldr_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    
    if(($_4_arg.type === 1)) {
        return $_2_arg($_4_arg.$1)(Prelude__Foldable__Prelude__List___64_Prelude__Foldable__Foldable_36_List_58__33_foldr_58_0(null, null, $_2_arg, $_3_arg, $_4_arg.$2));
    } else {
        return $_3_arg;
    }
}

// Prelude.Functor.Prelude.Either e implementation of Prelude.Functor.Functor, method map

function Prelude__Functor__Prelude___64_Prelude__Functor__Functor_36_Either_32_e_58__33_map_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg){
    
    if(($_4_arg.type === 0)) {
        return $_4_arg;
    } else {
        return new $HC_1_1$Prelude__Either__Right($_3_arg($_4_arg.$1));
    }
}

// Prelude.Functor.Elm.Types.ElmList implementation of Prelude.Functor.Functor, method map

function Prelude__Functor__Elm__Types___64_Prelude__Functor__Functor_36_ElmList_58__33_map_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    return (A2(_elm_lang$core$Native_List.map, ($_2_arg), ($_3_arg)));
}

// Prelude.Functor.Elm.Html.Html implementation of Prelude.Functor.Functor, method map

function Prelude__Functor__Elm__Html___64_Prelude__Functor__Functor_36_Html_58__33_map_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    return (A2(_elm_lang$virtual_dom$Native_VirtualDom.map, ($_2_arg), ($_3_arg)));
}

// Prelude.Functor.Prelude.List.List implementation of Prelude.Functor.Functor, method map

function Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    
    if(($_3_arg.type === 1)) {
        return new $HC_2_1$Prelude__List___58__58_($_2_arg($_3_arg.$1), Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $_2_arg, $_3_arg.$2));
    } else {
        return $_3_arg;
    }
}

// Prelude.Functor.Prelude.Maybe implementation of Prelude.Functor.Functor, method map

function Prelude__Functor__Prelude___64_Prelude__Functor__Functor_36_Maybe_58__33_map_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    
    if(($_3_arg.type === 1)) {
        return new $HC_1_1$Prelude__Maybe__Just($_2_arg($_3_arg.$1));
    } else {
        return $_3_arg;
    }
}

// Data.IORef.Data.IORef.FFI_JS implementation of Data.IORef.HasReference, method newIORef'

function Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_newIORef_39__58_0($_0_arg, $_1_arg, $_2_in){
    const $_3_in = ({val: ($_1_arg)});
    return $_3_in;
}

// Data.IORef.Data.IORef.FFI_JS implementation of Data.IORef.HasReference, method readIORef'

function Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_readIORef_39__58_0($_0_arg, $_1_arg, $_2_in){
    const $_3_in = (($_1_arg).val);
    return $_3_in;
}

// Data.IORef.Data.IORef.FFI_JS implementation of Data.IORef.HasReference, method writeIORef'

function Data__IORef__Data__IORef___64_Data__IORef__HasReference_36_FFI_95_JS_58__33_writeIORef_39__58_0($_0_arg, $_1_arg, $_2_arg, $_3_w){
    return (($_1_arg).val = ($_2_arg));
}

// Prelude.Monad.Control.Monad.State.StateT stateType m implementation of Prelude.Monad.Monad, method >>=

function Prelude__Monad__Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg, $_7_st){
    
    return $_4_arg.$2(null)(null)($_5_arg($_7_st))($partial_1_2$Prelude__Monad___123_Control__Monad__State___64_Prelude__Monad__Monad_36_StateT_32_stateType_32_m_58__33__62__62__61__58_0_95_lam_95_373_125_($_6_arg));
}

// Control.Monad.Trans.Control.Monad.State.StateT stateType implementation of Control.Monad.Trans.MonadTrans, method lift

function Control__Monad__Trans__Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_st){
    
    return $_3_arg.$2(null)(null)($_4_arg)($partial_2_3$Control__Monad__Trans___123_Control__Monad__State___64_Control__Monad__Trans__MonadTrans_36_StateT_32_stateType_58__33_lift_58_0_95_lam_95_374_125_($_3_arg, $_5_st));
}

// Prelude.Interfaces.Prelude.Interfaces.Int implementation of Prelude.Interfaces.Ord, method compare

function Prelude__Interfaces__Prelude__Interfaces___64_Prelude__Interfaces__Ord_36_Int_58__33_compare_58_0($_0_arg, $_1_arg){
    
    if((((($_0_arg === $_1_arg)) ? 1|0 : 0|0) === 0)) {
        
        if((((($_0_arg < $_1_arg)) ? 1|0 : 0|0) === 0)) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

// Prelude.Interfaces.Prelude.Interfaces.Integer implementation of Prelude.Interfaces.Ord, method compare

function Prelude__Interfaces__Prelude__Interfaces___64_Prelude__Interfaces__Ord_36_Integer_58__33_compare_58_0($_0_arg, $_1_arg){
    
    if(((($_0_arg.equals($_1_arg)) ? 1|0 : 0|0) === 0)) {
        
        if(((((($_0_arg).compareTo(($_1_arg)) < 0)) ? 1|0 : 0|0) === 0)) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

// Prelude.Algebra.Elm.Cmd.Command a implementation of Prelude.Algebra.Semigroup, method <+>

function Prelude__Algebra__Elm__Cmd___64_Prelude__Algebra__Semigroup_36_Command_32_a_58__33__60__43__62__58_0($_0_arg, $_1_arg, $_2_arg){
    
    if(($_1_arg.type === 0)) {
        return $_2_arg;
    } else {
        
        if(($_2_arg.type === 0)) {
            return $_1_arg;
        } else {
            return new $HC_2_3$Elm__Cmd__Batch($_1_arg, $_2_arg);
        }
    }
}

// {runMain_0}

function $_0_runMain(){
    return $JSRTS.force(Main__main($HC_0_0$TheWorld));
}

// {Elm.Encode.array:go:0_lam_355}

function $_355_Elm__Encode__array_58_go_58_0_95_lam($_0_lift, $_1_lift, $_2_lift){
    return (($_0_lift).push(($_1_lift)));
}

// {Elm.Encode.array:go:0_lam_356}

function $_356_Elm__Encode__array_58_go_58_0_95_lam($_0_lift, $_1_lift, $_2_lift){
    return $_0_lift;
}

// {Elm.Platform.initialize:runCmd:0_lam_359}

function $_359_Elm__Platform__initialize_58_runCmd_58_0_95_lam($_0_lift, $_1_lift){
    
    if(($_1_lift.type === 1)) {
        return $_0_lift($_1_lift.$1);
    } else {
        return $partial_0_1$Elm__Cmd___123_eval_95_5_125_();
    }
}

// {Elm.Encode.object:go:0_lam_362}

function $_362_Elm__Encode__object_58_go_58_0_95_lam($_0_lift, $_1_lift, $_2_lift, $_3_lift){
    return (($_0_lift)[($_1_lift)] = ($_2_lift));
}

// {Elm.Decode.runDecoder:run:0_lam_365}

function $_365_Elm__Decode__runDecoder_58_run_58_0_95_lam($_0_lift, $_1_lift, $_2_lift){
    const $cg$2 = IdrisScript__pack($_2_lift, $HC_0_0$TheWorld);
    let $cg$1 = null;
    $cg$1 = $cg$2.$1;
    const $cg$4 = IdrisScript__pack($_2_lift, $HC_0_0$TheWorld);
    let $cg$3 = null;
    $cg$3 = $cg$4.$2;
    return Elm__Decode__runDecoder_58_run_58_0_58_go_58_10(null, $cg$1, null, null, null, null, null, null, $_0_lift, $_1_lift, $cg$3);
}

// {Main.view:itemsLeft:0_lam_366}

function $_366_Main__view_58_itemsLeft_58_0_95_lam($_0_lift, $_1_lift){
    
    const $cg$3 = $_1_lift.$2;
    
    if($cg$3.$2) {
        return $_0_lift;
    } else {
        return $_0_lift.add((new $JSRTS.jsbn.BigInteger(("1"))));
    }
}

// {Main.view:viewHeader:0_lam_367}

function $_367_Main__view_58_viewHeader_58_0_95_lam($_0_lift){
    return new $HC_1_0$Main__Edit($_0_lift);
}

// {Main.view:viewHeader:0_lam_368}

function $_368_Main__view_58_viewHeader_58_0_95_lam($_0_lift){
    return new $HC_1_0$Elm__Decode__Success(new $HC_1_5$Main__KeyPress($_0_lift));
}

// {Main.view:viewMain:0_lam_369}

function $_369_Main__view_58_viewMain_58_0_95_lam($_0_lift){
    return new $HC_1_2$Main__ToggleAll($_0_lift);
}

// {Main.view:viewMain:0_lam_371}

function $_371_Main__view_58_viewMain_58_0_95_lam($_0_lift){
    
    return Prelude__Functor__Elm__Html___64_Prelude__Functor__Functor_36_Html_58__33_map_58_0(null, null, $partial_1_2$Main___123_update_95_316_125_($_0_lift.$1), Item__view($_0_lift.$2));
}

// {Main.view:viewMain:0_lam_372}

function $_372_Main__view_58_viewMain_58_0_95_lam($_0_lift, $_1_lift){
    let $cg$1 = null;
    $cg$1 = $_1_lift.$2;
    return Main__applyFilter($_0_lift, $cg$1);
}

// Elm.Encode.array, go

function Elm__Encode__array_58_go_58_0($_0_arg, $_1_arg, $_4_in){
    
    if(($_1_arg.type === 1)) {
        const $_34_in = Elm__Encode__array_58_go_58_0(null, $_1_arg.$2, $_4_in);
        return io_95_bind(null, null, null, $partial_2_3$$_355_Elm__Encode__array_58_go_58_0_95_lam($_34_in, $_1_arg.$1), $partial_1_3$$_356_Elm__Encode__array_58_go_58_0_95_lam($_34_in), $_4_in);
    } else {
        const $_41_in = ([]);
        return $_41_in;
    }
}

// Elm.Platform.embed, makeSetup

function Elm__Platform__embed_58_makeSetup_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_w){
    return (
        A2(_elm_lang$virtual_dom$Native_VirtualDom.program, null, { init: ($_3_arg), update: ($_4_arg), view: ($_5_arg) })()
        );
}

// Elm.Platform.embed, start

function Elm__Platform__embed_58_start_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg, $_7_w){
    return (
        function (elem, setup) { var Elm = {}; setup(Elm); Elm.embed(elem); }(($_2_arg), ($_6_arg))
        );
}

// Main.encodeTodos, encodePair

function Main__encodeTodos_58_encodePair_58_0($_0_arg, $_1_arg){
    
    const $cg$3 = $_1_arg.$2;
    return Elm__Encode__object_58_go_58_0(null, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("id", $_1_arg.$1), new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("title", $cg$3.$1), new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("completed", Elm__Encode__bool($cg$3.$2)), $HC_0_0$Prelude__List__Nil))), $HC_0_0$TheWorld);
}

// Elm.Platform.initialize, runCmd

function Elm__Platform__initialize_58_runCmd_58_0($_0_arg, $_1_arg, $_2_arg){
    return Elm__Cmd__eval(null, $_1_arg, $partial_1_2$$_359_Elm__Platform__initialize_58_runCmd_58_0_95_lam($_2_arg), $partial_0_1$Elm__Cmd___123_eval_95_5_125_());
}

// Elm.Platform.initialize, runUpdate

function Elm__Platform__initialize_58_runUpdate_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_in){
    const $_5_in = $_2_arg(new $HC_2_0$Elm__Cmd__MkUpdateState($_3_arg, $HC_0_0$Elm__Cmd__Never))($_4_in);
    
    return $_5_in.$2;
}

// Utils.localStorageGetItem, mapLeft

function Utils__localStorageGetItem_58_mapLeft_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg, $_7_arg){
    
    if(($_7_arg.type === 0)) {
        return new $HC_1_0$Prelude__Either__Left($_6_arg($_7_arg.$1));
    } else {
        return $_7_arg;
    }
}

// Utils.localStorageGetItem, read

function Utils__localStorageGetItem_58_read_58_0($_0_arg, $_1_arg, $_2_arg, $_3_w){
    return (
          function(name, NoItem, Right) {
             var item = localStorage.getItem(name);
             return item === null ? NoItem : Right(item);
          }(($_0_arg), (new $HC_1_0$Prelude__Either__Left($HC_0_0$Utils__NoItem)), ($partial_0_1$Elm__Decode___123_parse_95_37_125_()))
          );
}

// Elm.Encode.object, go

function Elm__Encode__object_58_go_58_0($_0_arg, $_1_arg, $_6_in){
    
    if(($_1_arg.type === 1)) {
        const $cg$3 = $_1_arg.$1;
        const $_45_in = Elm__Encode__object_58_go_58_0(null, $_1_arg.$2, $_6_in);
        return io_95_bind(null, null, null, $partial_3_4$$_362_Elm__Encode__object_58_go_58_0_95_lam($_45_in, $cg$3.$1, $cg$3.$2), $partial_1_3$$_356_Elm__Encode__array_58_go_58_0_95_lam($_45_in), $_6_in);
    } else {
        const $_49_in = ({});
        return $_49_in;
    }
}

// Elm.Decode.runDecoder, foldArray

function Elm__Decode__runDecoder_58_foldArray_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg){
    let $cg$1 = null;
    if(($_6_arg.type === 2)) {
        $cg$1 = $_6_arg.$1;
    } else if(($_6_arg.type === 3)) {
        $cg$1 = $_6_arg.$1;
    } else if(($_6_arg.type === 4)) {
        $cg$1 = $_6_arg.$1;
    } else if(($_6_arg.type === 0)) {
        $cg$1 = $_6_arg.$1;
    } else if(($_6_arg.type === 5)) {
        $cg$1 = $_6_arg.$1;
    } else if(($_6_arg.type === 1)) {
        $cg$1 = $_6_arg.$1;
    } else {
        $cg$1 = $_6_arg.$1;
    }
    
    return (($cg$1).reduce(function(acc, x) { return ($_4_arg)(acc)(x); }, ($_5_arg)));
}

// Elm.Decode.runDecoder, run

function Elm__Decode__runDecoder_58_run_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg){
    for(;;) {
        
        if(($_5_arg.type === 7)) {
            const $cg$25 = Elm__Decode__runDecoder_58_run_58_0(null, $_1_arg, null, null, null, $_5_arg.$1, $_6_arg);
            if(($cg$25.type === 0)) {
                return new $HC_1_0$Prelude__Either__Left($cg$25.$1);
            } else {
                $_0_arg = null;
                $_1_arg = $_1_arg;
                $_2_arg = null;
                $_3_arg = null;
                $_4_arg = null;
                $_5_arg = $_5_arg.$2($cg$25.$1);
                $_6_arg = $_6_arg;
            }
        } else if(($_5_arg.type === 5)) {
            let $cg$23 = null;
            if(($_6_arg.type === 2)) {
                $cg$23 = $_6_arg.$1;
            } else if(($_6_arg.type === 3)) {
                $cg$23 = $_6_arg.$1;
            } else if(($_6_arg.type === 4)) {
                $cg$23 = $_6_arg.$1;
            } else if(($_6_arg.type === 0)) {
                $cg$23 = $_6_arg.$1;
            } else if(($_6_arg.type === 5)) {
                $cg$23 = $_6_arg.$1;
            } else if(($_6_arg.type === 1)) {
                $cg$23 = $_6_arg.$1;
            } else {
                $cg$23 = $_6_arg.$1;
            }
            
            return new $HC_1_1$Prelude__Either__Right($cg$23);
        } else if(($_5_arg.type === 3)) {
            
            if(($_6_arg.type === 5)) {
                
                if(($_1_arg.type === 5)) {
                    
                    if(($_1_arg.$1 === "Array")) {
                        return Elm__Decode__runDecoder_58_foldArray_58_0(null, null, null, null, $partial_1_3$$_365_Elm__Decode__runDecoder_58_run_58_0_95_lam($_5_arg.$1), new $HC_1_1$Prelude__Either__Right($HC_0_0$Prelude__List__Nil), new $HC_1_5$IdrisScript__MkJSObject($_6_arg.$1));
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else {
                return new $HC_1_0$Prelude__Either__Left("Invalid value");
            }
        } else if(($_5_arg.type === 4)) {
            return Elm__Decode__runDecoder_58_run_58_0_58_go_58_11(null, $_1_arg, null, null, null, $_5_arg.$1, null, null, null, null, $_5_arg.$2, $_5_arg.$1, $_6_arg);
        } else if(($_5_arg.type === 1)) {
            return new $HC_1_0$Prelude__Either__Left($_5_arg.$1);
        } else if(($_5_arg.type === 2)) {
            const $cg$3 = $_5_arg.$1;
            if(($cg$3.type === 2)) {
                
                if(($_6_arg.type === 2)) {
                    
                    if(($_1_arg.type === 2)) {
                        let $cg$19 = null;
                        if((Prelude__Interfaces__Prelude__Interfaces___64_Prelude__Interfaces__Ord_36_Int_58__33_compare_58_0($_6_arg.$1, 1) > 0)) {
                            $cg$19 = true;
                        } else {
                            $cg$19 = ($_6_arg.$1 === 1);
                        }
                        
                        return new $HC_1_1$Prelude__Either__Right($cg$19);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 3)) {
                
                if(($_6_arg.type === 3)) {
                    
                    if(($_1_arg.type === 3)) {
                        return new $HC_1_1$Prelude__Either__Right($HC_0_0$MkUnit);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 4)) {
                
                if(($_6_arg.type === 4)) {
                    
                    if(($_1_arg.type === 4)) {
                        return new $HC_1_1$Prelude__Either__Right($HC_0_0$MkUnit);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 0)) {
                
                if(($_6_arg.type === 0)) {
                    
                    if(($_1_arg.type === 0)) {
                        return new $HC_1_1$Prelude__Either__Right($_6_arg.$1);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 5)) {
                
                if(($_6_arg.type === 5)) {
                    
                    if(($_1_arg.type === 5)) {
                        
                        if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_String_58__33_decEq_58_0($cg$3.$1, $_1_arg.$1).type === 1)) {
                            return new $HC_1_0$Prelude__Either__Left(("Expected constructor " + ($cg$3.$1 + (", got " + $_1_arg.$1))));
                        } else {
                            return new $HC_1_1$Prelude__Either__Right($HC_0_0$MkUnit);
                        }
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 1)) {
                
                if(($_6_arg.type === 1)) {
                    
                    if(($_1_arg.type === 1)) {
                        return new $HC_1_1$Prelude__Either__Right($_6_arg.$1);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else if(($cg$3.type === 6)) {
                
                if(($_6_arg.type === 6)) {
                    
                    if(($_1_arg.type === 6)) {
                        return new $HC_1_1$Prelude__Either__Right($HC_0_0$MkUnit);
                    } else {
                        return new $HC_1_0$Prelude__Either__Left("Invalid value");
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Invalid value");
                }
            } else {
                return new $HC_1_0$Prelude__Either__Left("Invalid value");
            }
        } else if(($_5_arg.type === 0)) {
            return new $HC_1_1$Prelude__Either__Right($_5_arg.$1);
        } else {
            return new $HC_1_0$Prelude__Either__Left("Invalid value");
        }
    }
}

// IdrisScript.typeOf, ctrName

function IdrisScript__typeOf_58_ctrName_58_0($_0_arg, $_1_w){
    return (($_0_arg).constructor.name);
}

// Main.view, footerInfo

function Main__view_58_footerInfo_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    return Elm__Html__node(null, "footer", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("info")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "p", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, "Double-click to edit a todo"), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "p", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, "Created by "), Elm__Types___58__58_(null, Elm__Html__node(null, "a", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "href", new $HC_1_1$IdrisScript__MkJSString("https://github.com/lagunoff")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__text(null, "Vlad Lagunov"), Elm__Types__Nil(null))), Elm__Types__Nil(null)))), Elm__Types___58__58_(null, Elm__Html__node(null, "p", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, "Part of "), Elm__Types___58__58_(null, Elm__Html__node(null, "a", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "href", new $HC_1_1$IdrisScript__MkJSString("http://todomvc.com")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__text(null, "TodoMVC"), Elm__Types__Nil(null))), Elm__Types__Nil(null)))), Elm__Types__Nil(null)))));
}

// Main.view, itemsLeft

function Main__view_58_itemsLeft_58_0($_0_arg, $_1_arg, $_2_arg){
    return Prelude__Foldable__Prelude__List___64_Prelude__Foldable__Foldable_36_List_58__33_foldl_58_0(null, null, $partial_0_2$$_366_Main__view_58_itemsLeft_58_0_95_lam(), (new $JSRTS.jsbn.BigInteger(("0"))), $_1_arg);
}

// Main.view, viewFilter

function Main__view_58_viewFilter_58_0($_0_arg, $_1_arg, $_2_arg, $_3_arg){
    let $cg$1 = null;
    if(($_3_arg.type === 1)) {
        $cg$1 = "Active";
    } else if(($_3_arg.type === 0)) {
        $cg$1 = "All";
    } else {
        $cg$1 = "Completed";
    }
    
    return Elm__Html__node(null, "li", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__node(null, "a", Elm__Types___58__58_(null, Elm__Attributes__classList(null, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("selected", Prelude__Interfaces__Main___64_Prelude__Interfaces__Eq_36_Filter_58__33__61__61__58_0($_3_arg, $_2_arg)), $HC_0_0$Prelude__List__Nil)), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "href", new $HC_1_1$IdrisScript__MkJSString(Main__toUrl($_3_arg))), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__text(null, $cg$1), Elm__Types__Nil(null))), Elm__Types__Nil(null)));
}

// Main.view, viewFooter

function Main__view_58_viewFooter_58_0($_0_arg, $_1_arg, $_2_arg){
    return Elm__Html__node(null, "footer", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("footer")), Elm__Types___58__58_(null, Elm__Attributes__classList(null, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("hidden", (!($_1_arg.type === 1))), $HC_0_0$Prelude__List__Nil)), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "span", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("todo-count")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "strong", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, Prelude__Show__primNumShow(null, $partial_0_1$prim_95__95_toStrBigInt(), $HC_0_0$Prelude__Show__Open, Main__view_58_itemsLeft_58_0(null, $_1_arg, null))), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__text(null, Utils__pluralize(Main__view_58_itemsLeft_58_0(null, $_1_arg, null), " item left", " items left")), Elm__Types__Nil(null)))), Elm__Types___58__58_(null, Elm__Html__node(null, "ul", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("filters")), Elm__Types__Nil(null)), Prelude__Functor__Elm__Types___64_Prelude__Functor__Functor_36_ElmList_58__33_map_58_0(null, null, $partial_3_4$Main__view_58_viewFilter_58_0(null, null, $_2_arg), Elm__Types___58__58_(null, $HC_0_0$Main__All, Elm__Types___58__58_(null, $HC_0_1$Main__Active, Elm__Types___58__58_(null, $HC_0_2$Main__Completed, Elm__Types__Nil(null)))))), Elm__Types___58__58_(null, Elm__Html__node(null, "button", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("clear-completed")), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "click", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_1_0$Elm__Decode__Success($HC_0_3$Main__ClearCompleted)), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__text(null, "Clear completed"), Elm__Types__Nil(null))), Elm__Types__Nil(null)))));
}

// Main.view, viewHeader

function Main__view_58_viewHeader_58_0($_0_arg, $_1_arg, $_2_arg){
    return Elm__Html__node(null, "header", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("header")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "h1", Elm__Types__Nil(null), Elm__Types___58__58_(null, Elm__Html__text(null, "todos"), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "input", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("new-todo")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "placeholder", new $HC_1_1$IdrisScript__MkJSString("What needs to be done?")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "autofocus", new $HC_1_2$IdrisScript__MkJSBoolean(true)), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "value", new $HC_1_1$IdrisScript__MkJSString($_0_arg)), Elm__Types___58__58_(null, Elm__Events__onInput(null, $partial_0_1$$_367_Main__view_58_viewHeader_58_0_95_lam()), Elm__Types___58__58_(null, Elm__Events__onWithOptions(null, "keypress", new $HC_2_0$Elm__Events__MkOptions(false, false), new $HC_2_7$Elm__Decode___62__62__61_(Elm__Events__keyCode(), $partial_0_1$$_368_Main__view_58_viewHeader_58_0_95_lam())), Elm__Types__Nil(null))))))), Elm__Types__Nil(null)), Elm__Types__Nil(null))));
}

// Main.view, viewMain

function Main__view_58_viewMain_58_0($_0_arg, $_1_arg, $_2_arg){
    return Elm__Html__node(null, "section", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("main")), Elm__Types___58__58_(null, Elm__Attributes__classList(null, new $HC_2_1$Prelude__List___58__58_(new $HC_2_0$Builtins__MkPair("hidden", (!($_1_arg.type === 1))), $HC_0_0$Prelude__List__Nil)), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "input", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "type", new $HC_1_1$IdrisScript__MkJSString("checkbox")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "id", new $HC_1_1$IdrisScript__MkJSString("toggle-all")), Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("toggle-all")), Elm__Types___58__58_(null, Elm__Events__onCheck(null, $partial_0_1$$_369_Main__view_58_viewMain_58_0_95_lam()), Elm__Types__Nil(null))))), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__node(null, "label", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "htmlFor", new $HC_1_1$IdrisScript__MkJSString("toggle-all")), Elm__Types__Nil(null)), Elm__Types___58__58_(null, Elm__Html__text(null, "Mark all as completed"), Elm__Types__Nil(null))), Elm__Types___58__58_(null, Elm__Html__node(null, "ul", Elm__Types___58__58_(null, Elm__Attributes__property(null, null, "className", new $HC_1_1$IdrisScript__MkJSString("todo-list")), Elm__Types__Nil(null)), Prelude__Cast__Elm__Types___64_Prelude__Cast__Cast_36_List_32_a_58_ElmList_32_a_58__33_cast_58_0(null, Prelude__Functor__Prelude__List___64_Prelude__Functor__Functor_36_List_58__33_map_58_0(null, null, $partial_0_1$$_371_Main__view_58_viewMain_58_0_95_lam(), Prelude__List__filter(null, $partial_1_2$$_372_Main__view_58_viewMain_58_0_95_lam($_2_arg), $_1_arg)))), Elm__Types__Nil(null)))));
}

// IdrisScript.Elm.Events.Options, JSObject "Object" implementation of IdrisScript.ToJS, method toJS, io

function IdrisScript__Elm__Events___64_IdrisScript__ToJS_36_Options_58_JSObject_32__34_Object_34__58__33_toJS_58_0_58_io_58_0($_0_arg, $_1_arg, $_2_in){
    let $cg$1 = null;
    if($_0_arg) {
        $cg$1 = new $HC_1_2$IdrisScript__MkJSBoolean(true);
    } else {
        $cg$1 = new $HC_1_2$IdrisScript__MkJSBoolean(false);
    }
    
    let $cg$2 = null;
    if(($cg$1.type === 2)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 3)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 4)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 0)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 5)) {
        $cg$2 = $cg$1.$1;
    } else if(($cg$1.type === 1)) {
        $cg$2 = $cg$1.$1;
    } else {
        $cg$2 = $cg$1.$1;
    }
    
    let $cg$3 = null;
    if($_1_arg) {
        $cg$3 = new $HC_1_2$IdrisScript__MkJSBoolean(true);
    } else {
        $cg$3 = new $HC_1_2$IdrisScript__MkJSBoolean(false);
    }
    
    let $cg$4 = null;
    if(($cg$3.type === 2)) {
        $cg$4 = $cg$3.$1;
    } else if(($cg$3.type === 3)) {
        $cg$4 = $cg$3.$1;
    } else if(($cg$3.type === 4)) {
        $cg$4 = $cg$3.$1;
    } else if(($cg$3.type === 0)) {
        $cg$4 = $cg$3.$1;
    } else if(($cg$3.type === 5)) {
        $cg$4 = $cg$3.$1;
    } else if(($cg$3.type === 1)) {
        $cg$4 = $cg$3.$1;
    } else {
        $cg$4 = $cg$3.$1;
    }
    
    const $_17_in = (({ stopPropagation: ($cg$2), preventDefault: ($cg$4) }));
    return new $HC_1_5$IdrisScript__MkJSObject($_17_in);
}

// Prelude.List.intersperse, intersperse'

function Prelude__List__intersperse_58_intersperse_39__58_1($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg){
    
    if(($_5_arg.type === 1)) {
        return new $HC_2_1$Prelude__List___58__58_($_4_arg, new $HC_2_1$Prelude__List___58__58_($_5_arg.$1, Prelude__List__intersperse_58_intersperse_39__58_1(null, null, null, null, $_4_arg, $_5_arg.$2)));
    } else {
        return $_5_arg;
    }
}

// Elm.Decode.runDecoder, run, go

function Elm__Decode__runDecoder_58_run_58_0_58_go_58_10($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg, $_7_arg, $_8_arg, $_9_arg, $_10_arg){
    
    if(($_9_arg.type === 0)) {
        return $_9_arg;
    } else {
        const $cg$3 = Elm__Decode__runDecoder_58_run_58_0(null, $_1_arg, null, null, null, $_8_arg, $_10_arg);
        if(($cg$3.type === 0)) {
            return new $HC_1_0$Prelude__Either__Left($cg$3.$1);
        } else {
            return new $HC_1_1$Prelude__Either__Right(new $HC_2_1$Prelude__List___58__58_($cg$3.$1, $_9_arg.$1));
        }
    }
}

// Elm.Decode.runDecoder, run, go

function Elm__Decode__runDecoder_58_run_58_0_58_go_58_11($_0_arg, $_1_arg, $_2_arg, $_3_arg, $_4_arg, $_5_arg, $_6_arg, $_7_arg, $_8_arg, $_9_arg, $_10_arg, $_11_arg, $_12_arg){
    for(;;) {
        
        if(($_11_arg.type === 1)) {
            
            if(($_12_arg.type === 5)) {
                
                if(($_1_arg.type === 5)) {
                    const $cg$5 = IdrisScript__Objects__getProperty(null, $_11_arg.$1, new $HC_1_5$IdrisScript__MkJSObject($_12_arg.$1), $HC_0_0$TheWorld);
                    if(($cg$5.type === 1)) {
                        const $cg$7 = $cg$5.$1;
                        $_0_arg = null;
                        $_1_arg = $cg$7.$1;
                        $_2_arg = null;
                        $_3_arg = null;
                        $_4_arg = null;
                        $_5_arg = $_5_arg;
                        $_6_arg = null;
                        $_7_arg = null;
                        $_8_arg = null;
                        $_9_arg = null;
                        $_10_arg = $_10_arg;
                        $_11_arg = $_11_arg.$2;
                        $_12_arg = $cg$7.$2;
                    } else {
                        return new $HC_1_0$Prelude__Either__Left(("key _." + (Prelude__Strings__unwords(Prelude__List__intersperse(null, ".", $_5_arg)) + " not found")));
                    }
                } else {
                    return new $HC_1_0$Prelude__Either__Left("Trying to access property of a non-object");
                }
            } else {
                return new $HC_1_0$Prelude__Either__Left("Trying to access property of a non-object");
            }
        } else if(($_11_arg.type === 0)) {
            return Elm__Decode__runDecoder_58_run_58_0(null, $_1_arg, null, null, null, $_10_arg, $_12_arg);
        } else {
            return new $HC_1_0$Prelude__Either__Left("Trying to access property of a non-object");
        }
    }
}

// with block in Prelude.Strings.ltrim

function _95_Prelude__Strings__ltrim_95_with_95_54($_0_arg, $_1_arg){
    for(;;) {
        
        if(($_1_arg.type === 1)) {
            
            if(Prelude__Chars__isSpace($_1_arg.$1)) {
                let $cg$3 = null;
                if((((($_1_arg.$2 == "")) ? 1|0 : 0|0) === 0)) {
                    $cg$3 = true;
                } else {
                    $cg$3 = false;
                }
                
                let $cg$4 = null;
                if((Decidable__Equality__Decidable__Equality___64_Decidable__Equality__DecEq_36_Bool_58__33_decEq_58_0($cg$3, true).type === 1)) {
                    $cg$4 = $HC_0_0$Prelude__Strings__StrNil;
                } else {
                    $cg$4 = new $HC_2_1$Prelude__Strings__StrCons($_1_arg.$2[0], $_1_arg.$2.slice(1));
                }
                
                $_0_arg = null;
                $_1_arg = $cg$4;
            } else {
                return (($_1_arg.$1)+($_1_arg.$2));
            }
        } else {
            return "";
        }
    }
}


$_0_runMain();
}.call(this))