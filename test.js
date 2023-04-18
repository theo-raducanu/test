class e {
    constructor(e) {
        this.seed = e,
            this.rnd = this.rnd.bind(this),
            this.range = this.range.bind(this),
            this.rangeFloor = this.rangeFloor.bind(this),
            this.pick = this.pick.bind(this),
            this.shuffleArray = this.shuffleArray.bind(this),
            this.gaussian = this.gaussian.bind(this),
            this._hasNextGaussian = !1,
            this._nextGaussian = null
    }
    setSeed(e) {
        this.seed = e
    }
    rnd() {
        return this.seed ^= this.seed << 13,
            this.seed ^= this.seed >> 17,
            this.seed ^= this.seed << 5,
            (this.seed < 0 ? 1 + ~this.seed : this.seed) % 1e3 / 1e3
    }
    range(e, t) {
        return t ? this.rnd() * (t - e) + e : this.rnd() * e
    }
    rangeFloor(e, t) {
        return Math.floor(this.range(e, t))
    }
    pick(e) {
        return e[this.rangeFloor(0, e.length)]
    }
    shuffleArray(e) {
        for (var t, h, i = e.length, s = e.slice(); i;)
            t = Math.floor(this.rnd() * i--),
                h = s[i],
                s[i] = s[t],
                s[t] = h;
        return s
    }
    gaussian(e, t) {
        if (this._hasNextGaussian) {
            this._hasNextGaussian = !1;
            var h = this._nextGaussian;
            return this._nextGaussian = null,
                e + t * h
        }
        var i = 0
            , s = 0
            , n = 0;
        do {
            n = (i = 2 * this.rnd() - 1) * i + (s = 2 * this.rnd() - 1) * s
        } while (n >= 1 || 0 === n);
        var r = Math.sqrt(-2 * Math.log(n) / n);
        return this._nextGaussian = s * r,
            this._hasNextGaussian = !0,
            e + t * (i * r)
    }
    pickSome(e, t) {
        let h;
        return this.shuffleArray(e).slice(0, t)
    }
}
const t = (e, t, i, s = !1) => s ? h(e + (t - e) * i, 0, 1) : e + (t - e) * i
    , h = (e, t, h) => e < t ? t : e > h ? h : e
    , i = (e, t, h) => Array.isArray(t) ? t[e * t.length | 0] : t || 0 === t ? h || 0 === h ? (t > h && ([t, h] = [h, t]),
        t + e() * (h - t)) : e() * t : e()
    , s = (e, t, h, n, r, d, o, a, f, l) => {
        if (r--,
            l || r >= 0 && i(f) < o)
            if (h >= n) {
                let l = h * i(f, a[0], a[1]);
                s(e, t, l, n, r, d, o, a, f),
                    s(e + l, t, h - l, n, r, d, o, a, f)
            } else {
                let l = n * i(f, a[0], a[1]);
                s(e, t, h, l, r, d, o, a, f),
                    s(e, t + l, h, n - l, r, d, o, a, f)
            }
        else
            d.push({
                x: e,
                y: t,
                w: h,
                h: n,
                n: r
            })
    }
    , n = (e, t, h, s, r, d, o, a, f, l) => {
        if (r--,
            l || r >= 0 && i(f) < o) {
            let l = h * i(f, a[0], a[1]);
            n(e, t, l, s, r, d, o, a, f),
                n(e + l, t, h - l, s, r, d, o, a, f)
        } else
            d.push({
                x: e,
                y: t,
                w: h,
                h: s,
                n: r
            })
    }
    , r = (e, t, h, s, n, d, o, a, f, l) => {
        if (n--,
            l || n >= 0 && i(f) < o) {
            let l = s * i(f, a[0], a[1]);
            r(e, t, h, l, n, d, o, a, f),
                r(e, t + l, h, s - l, n, d, o, a, f)
        } else
            d.push({
                x: e,
                y: t,
                w: h,
                h: s,
                n: n
            })
    }
    , d = (e, t, h, i, s, n, r = .7, o, a) => {
        if (s--,
            a || s >= 0 && o() < r) {
            let a = h / 2
                , f = i / 2;
            d(e, t, a, f, s, n, r, o),
                d(e + a, t, a, f, s, n, r, o),
                d(e + a, t + f, a, f, s, n, r, o),
                d(e, t + f, a, f, s, n, r, o)
        } else
            n.push({
                x: e,
                y: t,
                w: h,
                h: i,
                n: s
            })
    }
    , o = (e, h, i) => e.map(((s, n) => t(e[n], h[n], i)))
    , a = e => [...e.substr(1)].reduce(((e, t, h, i) => h % 2 ? e.concat(parseInt(`${i[h - 1]}${i[h]}`, 16)) : e), [])
    , f = (e, t) => {
        const h = []
            , i = Math.ceil(t / e.length)
            , s = 1 / i
            , n = e.map((e => a(e)));
        for (let e = 0; e < n.length; e += 1)
            for (let t = 0; t < i; t += 1) {
                const i = n[e]
                    , r = n[(e + 1) % n.length];
                h.push(o(i, r, (t + 1) * s))
            }
        return h
    }
    , l = (e, t, h, i, s, n) => {
        const r = i >= 0 ? i : 0
            , d = e.drawingContext.createRadialGradient(t, h, 0, t, h, r);
        return s.forEach(((e, t) => d.addColorStop(e, n[t]))),
            e.drawingContext.fillStyle = d,
            d
    }
    , c = (e, t, h, i, s, n, r) => {
        const d = e.drawingContext.createLinearGradient(t, h, i, s);
        return n.forEach(((e, t) => d.addColorStop(e, r[t]))),
            e.drawingContext.fillStyle = d,
            d
    }
    , g = (e, t, h, i, s, n, r, d, o) => {
        const a = [];
        for (let f = 0; f <= o; f += 1) {
            const l = f / o
                , c = bezierPoint(e, h, s, r, l)
                , g = bezierPoint(t, i, n, d, l);
            a.push({
                x: c,
                y: g
            })
        }
        return a
    }
    , p = (e, t, h, i, s) => {
        const n = [];
        for (let r = 0; r < h; r += 1)
            n.push({
                x: e + i * cos(s),
                y: t + i * sin(s)
            }),
                s += 360 / h;
        return n
    }
    , u = (e, h, i, s, n, r) => {
        const d = p(e, h, s, n, r)
            , o = i / s
            , a = [];
        for (let e = 0; e < s; e += 1)
            for (let h = 0; h < o; h += 1) {
                const i = t(d[e].x, d[(e + 1) % d.length].x, h / o)
                    , s = t(d[e].y, d[(e + 1) % d.length].y, h / o);
                a.push({
                    x: i,
                    y: s
                })
            }
        return a
    }
    , w = (e, h, i, s, n) => {
        const r = [];
        for (let d = 0; d < n - 1; d += 1) {
            const o = t(e, i, d / (n - 1))
                , a = t(h, s, d / (n - 1));
            r.push({
                x: o,
                y: a
            })
        }
        return r.push({
            x: i,
            y: s
        }),
            r
    }
    , b = [["#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#4ea8de", "#80ffdb"], ["#F9FBFF", "#212121", "#F9FBFF", "#212121", "#F9FBFF", "#212121"], ["#efffff", "#f20082", "#5db1ff", "#ff00ca", "#3a0bba"], ["#521262", "#6639a6", "#3490de", "#6fe7dd", "#ff7c38", "#e03e36", "#b80d57", "#700961"], ["#a7ff83", "#17b978", "#086972", "#071a52", "#80d6ff", "#edf798", "#fab57a", "#f06868"], ["#01608F", "#EF91A9", "#EB4626", "#F4BA10", "#34A096", "#2C2F8C"], ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"], ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"], ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"], ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"], ["#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d", "#293241"], ["#011627", "#fdfffc", "#2ec4b6", "#e71d36", "#ff9f1c"], ["#283d3b", "#197278", "#edddd4", "#c44536", "#772e25"], ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d80032"], ["#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3"], ["#fffcf2", "#ccc5b9", "#403d39", "#252422", "#eb5e28"], ["#177e89", "#084c61", "#db3a34", "#ffc857", "#323031"], ["#002642", "#840032", "#e59500", "#e5dada", "#02040f"], ["#0c0a3e", "#7b1e7a", "#b33f62", "#f9564f", "#f3c677"], ["#b80c09", "#0b4f6c", "#01baef", "#fbfbff", "#040f16"], ["#001427", "#708d81", "#f4d58d", "#bf0603", "#8d0801"], ["#1f271b", "#19647e", "#28afb0", "#f4d35e", "#ee964b"], ["#06aed5", "#086788", "#f0c808", "#fff1d0", "#dd1c1a"], ["#011627", "#fdfffc", "#2ec4b6", "#e71d36", "#ff9f1c"], ["#001524", "#15616d", "#ffecd1", "#ff7d00", "#78290f"], ["#dad2d8", "#143642", "#0f8b8d", "#ec9a29", "#a8201a"], ["#003049", "#d62828", "#f77f00", "#fcbf49"], ["#001427", "#708d81", "#f4d58d", "#bf0603", "#8d0801"], ["#55dde0", "#33658a", "#2f4858", "#f6ae2d", "#f26419"], ["#010417", "#0029c1", "#2bb59c", "#f7dc09", "#e22b00"], ["#0c090d", "#e01a4f", "#f15946", "#f9c22e", "#53b3cb"], ["#01638d", "#abcecc", "#fff2cd", "#ff004c", "#610d4b"], ["#2d728f", "#3b8ea5", "#f5ee9e", "#f49e4c", "#ab3428"], ["#d00000", "#ffba08", "#3f88c5", "#032b43", "#032b43"], ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"], ["#083d77", "#f4d35e", "#ee964b", "#f95738"], ["#177e89", "#084c61", "#db3a34", "#ffc857", "#323031"], ["#010000", "#a74c00", "#ffa100", "#ffd300", "#f1f2f1"], ["#e6eed6", "#bbc5aa", "#a72608", "#090c02"], ["#011627", "#fdfffc", "#2ec4b6", "#e71d36", "#ff9f1c"], ["#fff2cd", "#abcecc", "#01638d", "#ff004c", "#610d4b"], ["#33658a", "#86bbd8", "#2f4858", "#f6ae2d", "#f26419"], ["#001427", "#708d81", "#f4d58d", "#bf0603", "#8d0801"], ["#820263", "#d90368", "#eadeda", "#2e294e", "#ffd400"], ["#a832a0", "#7d32a8", "#598fb5", "#fffb00"], ["#335c67", "#fff3b0", "#e09f3e", "#9e2a2b", "#540b0e"], ["#003f88", "#00509d", "#fdc500", "#ffd500"], ["#001427", "#708d81", "#f4d58d", "#bf0603", "#8d0801"], ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"], ["#0c0f0a", "#ff206e", "#fbff12", "#41ead4"], ["#000000", "#2f4550", "#586f7c", "#b8dbd9", "#f4f4f9"], ["#970005", "#ed0101", "#0c44ac", "#000052"], ["#ff6d69", "#fecc50", "#0be7fb", "#010b8b", "#1e0521"], ["#c9e4ca", "#87bba2", "#55828b", "#3b6064", "#364958"]];
let x;
var y;
const k = void 0;
let v = (m = tokenData,
    parseInt(m.hash.slice(0, 16), 16))
    , C = v;
var m;
const F = new e(v)
    , { rnd: S, range: M, rangeFloor: W, pick: E, shuffleArray: A } = F;
let G, R;
const _ = {};
let N, z, D, H;
function setup() {
    D = createCanvas(N, z),
        angleMode(DEGREES),
        R = createGraphics(N, z),
        G = () => {
            H = .001 * width,
                R.strokeCap(SQUARE),
                R.angleMode(DEGREES);
            const e = W(b.length - 1);
            _.currentPalette = b[e];
            const t = S();
            _.shape = t < .05 ? "structure" : t >= .05 && t < .08 ? "plexus" : t >= .08 && t < .11 ? "tree" : t >= .11 && t < .15 ? "grass" : E(["unity", "v-streams", "h-streams", "spiral", "oscillations", "curls", "wall", "v-storm", "h-storm"]),
                _.size = 10 * H,
                "tree" === _.shape && (_.size = 12 * H),
                _.waveR = M(.1, 1),
                "tree" === _.shape && (_.waveR = 0),
                "v-streams" === _.shape && (_.waveR = S() > .95 ? .9 : M(.6, 2)),
                "h-streams" === _.shape && (_.waveR = M(.4, 2)),
                "spiral" === _.shape && (_.waveR = M(1, 4)),
                "curls" === _.shape && (_.waveR = M(.2, 1.5)),
                "plexus" === _.shape && (_.waveR = M(.3, 4)),
                _.roots = "structure" !== _.shape && S() > .2,
                _.noFill = _.roots && S() > .9;
            const h = S() > .8;
            _.roots ? _.angle = h ? M(20, 180) : E([30, 60, 90, 120, 150, 180]) : _.angle = h ? M(20, 100) : E([30, 60, 90]),
                _.blackStroke = _.roots && S() > .7,
                _.divider = _.roots ? W(3, 21) : W(3, 9),
                "tree" === _.shape && (_.divider = W(3, 6)),
                _.bigStroke = "structure" !== _.shape && S() > .95,
                _.longColors = S() > .7,
                _.rCount = 200;
            const i = void 0
                , s = !["curls", "plexus"].includes(_.shape) && S() > .9;
            _.weeds = s ? M(1, 2) : 1,
                "wall" === _.shape && (_.waveR = 0,
                    _.roots = !0),
                "unity" === _.shape && (_.roots = S() > .1),
                "tree" === _.shape && (_.rCount = 1e3),
                _.colorCount = Math.round(map(S(), 0, 1, .5 * _.rCount, 1.5 * _.rCount)),
                _.longColors && (_.colorCount = Math.round(map(S(), 0, 1, 1.5 * _.rCount, 3 * _.rCount))),
                "structure" === _.shape && (_.rCount = 100,
                    _.colorCount = Math.round(map(S(), 0, 1, 100, 300)));
            const { colorCount: n, rCount: r } = _
                , d = A(_.currentPalette);
            _.lerpColors = f(A(d), n).map((e => color(e))),
                _.backColors = f(A(d), n / 2).map((e => color(e))),
                _.backColors2 = f(A(d), n).map((e => {
                    const t = color(e);
                    return t.setAlpha(100),
                        t
                }
                ));
            let o = []
                , a = [];
            if ("h-storm" === _.shape)
                for (let e = .1 * -height; e < 1.1 * height; e += .2 * height) {
                    const t = M(.25, .75)
                        , h = g(0, e, width * t, e + height * t, width * t, e - height * t, width, e, 400);
                    o = [...o, ...h]
                }
            if ("v-storm" === _.shape)
                for (let e = .1 * -width; e < 1.1 * width; e += .2 * width) {
                    const t = M(.25, .75)
                        , h = g(e, 0, e + width * t, height * t, e - width * t, height * t, e, height, 400);
                    o = [...o, ...h]
                }
            if ("wall" === _.shape) {
                const e = new Array(200).fill(null).map((() => ({
                    x: M(width),
                    y: M(height)
                })));
                o = [...w(0, .05 * height, width, .05 * height, 800), ...w(0, 1.2 * height, width, 1.2 * height, 800), ...e]
            }
            if ("plexus" === _.shape && (o = [...q(width / 2, .25 * height, .6 * width, 180, 400), ...q(width / 2, .5 * height, .6 * width, 180, 400), ...q(width / 2, .75 * height, .6 * width, 180, 400), ...q(width / 2, .25 * height, .6 * width, -180, 400), ...q(width / 2, .5 * height, .6 * width, -180, 400), ...q(width / 2, .75 * height, .6 * width, -180, 400)]),
                "oscillations" === _.shape) {
                const e = M(.8, 1.2);
                o = [...O(width / 2, height / 2, width, 360, 1600, e), ...O(width / 2, height / 2, .6 * width, 360, 800, e)]
            }
            if ("curls" === _.shape && (o = Q(width / 2, height / 2, .7 * width, 360, 1600, W(3, 10))),
                "spiral" === _.shape) {
                const e = I(width / 2, height / 2, width * M(.01, .005), 1440, 1600, .1);
                o = S() > .5 ? e.reverse() : e
            }
            if ("v-streams" === _.shape)
                for (let e = .1 * width; e < width; e += .2 * width) {
                    const t = w(e, 0, e, height, 400);
                    o = [...o, ...t]
                }
            if ("h-streams" === _.shape)
                for (let e = .1 * height; e < height; e += .2 * height) {
                    const t = w(0, e, width, e, 400);
                    o = [...o, ...t]
                }
            if ("unity" === _.shape) {
                const e = M(360)
                    , t = u(.5 * width, .33 * height, 400, 400, .3 * width, e)
                    , h = u(.5 * width, .66 * height, 400, 400, .3 * width, e);
                o = S() > .95 ? A([...t, ...h]) : [...t, ...h]
            }
            if ("structure" === _.shape) {
                for (let e = .2 * width; e < width; e += .2 * width) {
                    const t = w(e, .1 * height, e, .9 * height, 400);
                    o = [...o, ...t]
                }
                for (let e = .2 * height; e < height; e += .2 * height) {
                    const t = w(.1 * width, e, .9 * width, e, 400);
                    o = [...o, ...t]
                }
            }
            if ("grass" === _.shape) {
                for (let e = .05 * -width; e < 1.1 * width; e += .2 * width) {
                    const t = w(e, height * M(.1, .7), e, height, 200);
                    o = [...o, ...t]
                }
                for (let e = .15 * -width; e < 1.1 * width; e += .2 * width) {
                    const t = w(e, height * M(.1, .7), e, height, 200);
                    a = [...a, ...t]
                }
                o = A(o),
                    a = A(a)
            }
            if ("tree" === _.shape) {
                const e = u(width / 2, height / 3.5, 400, 400, .2 * width, 90);
                o = [...o, ...e]
            }
            let p = _.divider
                , x = _.angle;
            const { lerpColors: y, backColors: k, backColors2: v } = _;
            R.background(255);
            const C = E(v)
                , m = M(.2, .8)
                , F = M(.05, .15);
            "grass" === _.shape ? (R.push(),
                R.noStroke(),
                l(R, width * M(.1, .9), height * M(.1, .3), width / 2, [0, m - F, m, m + F, 1], [E(v), C, C, C, E(v)]),
                R.rect(0, 0, width, height),
                R.pop()) : "spiral" === _.shape ? (R.push(),
                    R.noStroke(),
                    l(R, .5 * width, .5 * height, width / 2, [0, 1], [E(v), E(v)]),
                    R.rect(0, 0, width, height),
                    R.pop()) : "structure" === _.shape ? (R.fill(E(v)),
                        R.rect(0, 0, width, height)) : (R.push(),
                            R.noStroke(),
                            c(R, width / 2, 0, width / 2, height, [0, m - F, m, m + F, 1], [E(v), C, C, C, E(v)]),
                            R.rect(0, 0, width, height),
                            R.pop());
            const G = E(y)
                , N = E(y);
            R.push(),
                R.noFill(),
                R.strokeWeight(20 * H),
                R.stroke(G),
                R.rect(0, 0, width, height),
                R.pop(),
                R.push(),
                R.noFill(),
                R.strokeWeight(2 * H),
                R.stroke(N),
                R.rect(5 * H, 5 * H, width - 10 * H, height - 10 * H),
                R.pop();
            for (let e = 0; e < o.length; e += 1) {
                const t = r
                    , h = r
                    , i = Math.max(t, h);
                let s = map(cos(e * _.waveR), -1, 1, 0, _.size), n, d;
                "tree" === _.shape ? (n = P(o[e].x, o[e].y, s, t, x, width, 0, 1.1 * height, 1.1 * height),
                    d = P(o[e].x, o[e].y, s, h, x, 1.1 * width, .1 * -width, height, .1 * -height)) : "grass" === _.shape ? (n = P(o[e].x, o[e].y, s, t, x, width, 0, 1.1 * height, 1.1 * height),
                        d = P(a[e].x, a[e].y, s, h, x, width, 0, 1.1 * height, 1.1 * height)) : "structure" === _.shape ? (n = P(o[e].x, o[e].y, s, t, x, width, 0, height, 0),
                            d = P(o[e].x, o[e].y, s, h, x, width, 0, height, 0)) : (n = P(o[e].x, o[e].y, s, t, x, 1.1 * width, .1 * -width, 1.1 * height, _.roots ? 1.1 * height : 0),
                                d = P(o[e].x, o[e].y, s, h, x, 1.1 * width, .1 * -width, height, .1 * -height));
                for (let t = 0; t < i - 20; t += 1)
                    e % p == 0 ? (R.push(),
                        R.beginShape(),
                        R.fill(y[t % y.length]),
                        _.noFill && R.noFill(),
                        R.strokeWeight(.5 * H),
                        R.stroke(y[(t + Math.round(.1 * y.length)) % y.length]),
                        _.blackStroke && R.stroke(0),
                        R.vertex(n[t % n.length].x, n[t % n.length].y),
                        R.bezierVertex(n[t % n.length].x, n[t % n.length].y, n[(t + W(10)) % n.length].x, n[(t + W(10)) % n.length].y, n[(t + 20) % n.length].x, n[(t + 20) % n.length].y),
                        R.vertex(n[t % n.length].x, n[(t + 1) % n.length].y),
                        R.vertex(n[t % n.length].x, n[(t + 2) % n.length].y),
                        R.endShape(CLOSE),
                        e % 10 == 0 && (R.push(),
                            R.strokeWeight(.5 * H),
                            R.stroke(k[0]),
                            n[t % d.length].y > 0 && n[t % d.length].y < height && R.stroke(k[Math.round(map(n[t % n.length].y, height, 0, 0, k.length - 1))]),
                            R.fill(k[Math.round(map(sin(5 * t), -1, 1, 0, k.length - 1))]),
                            R.circle(n[t % n.length].x, n[t % n.length].y, M(1, 5) * H),
                            R.pop()),
                        R.pop()) : (R.push(),
                            R.beginShape(),
                            R.fill(k[t % k.length]),
                            R.fill(k[Math.round(map(sin(5 * t), -1, 1, 0, k.length - 1))]),
                            R.strokeWeight(.5 * H),
                            R.stroke(k[(t + Math.round(.1 * k.length)) % k.length]),
                            R.stroke(k[0]),
                            d[t % d.length].y > 0 && d[t % d.length].y < height && R.stroke(k[Math.round(map(d[t % d.length].y, 0, height, 0, k.length - 1))]),
                            "tree" !== _.shape && "structure" !== _.shape || R.stroke(k[(t + Math.round(.1 * k.length)) % k.length]),
                            R.strokeWeight(S() * H),
                            _.bigStroke && (R.strokeWeight(5 * H),
                                R.stroke(k[(t + Math.round(.1 * k.length)) % k.length])),
                            R.vertex(d[t % d.length].x, d[t % d.length].y),
                            R.vertex(d[(t + 1) % d.length].x, d[(t + 1) % d.length].y),
                            R.vertex(d[(t + 2) % d.length].x, d[(t + 2) % d.length].y),
                            R.endShape(CLOSE),
                            R.pop()),
                        e % 10 == 0 && (R.push(),
                            R.strokeWeight(.5 * H),
                            R.stroke(y[(t + Math.round(.1 * y.length)) % y.length]),
                            R.fill(k[t % k.length]),
                            "wall" === _.shape ? R.circle(n[t % n.length].x, n[t % n.length].y, map(sin(10 * t), -1, 1, 1, s / 2)) : R.circle(n[t % n.length].x, n[t % n.length].y, M(H, s)),
                            R.pop())
            }
            R.push(),
                R.noFill(),
                R.strokeWeight(2 * H),
                R.stroke(N),
                R.rect(5 * H, 5 * H, width - 10 * H, height - 10 * H),
                R.pop(),
                push(),
                noStroke(),
                rect(0, 0, width, height),
                drawingContext.clip(),
                image(R, 0, 0),
                pop()
        }
        ,
        G()
}
function B() {
    const e = void 0
        , t = D.canvas.style;
    let h, i;
    .75 * window.innerHeight >= window.innerWidth ? (h = window.innerWidth,
        i = window.innerWidth / .75) : (i = window.innerHeight,
            h = .75 * window.innerHeight),
        t.position = "absolute",
        t.display = "block",
        t.top = t.left = t.right = t.structure = "0",
        t.width = `${h}px`,
        t.height = `${i}px`
}
function windowResized() {
    B()
}
.75 * window.innerHeight >= window.innerWidth ? (N = window.innerWidth,
    z = window.innerWidth / .75) : (z = window.innerHeight,
        N = .75 * window.innerHeight);
const L = [1, 2, 3, 4, 5, 6, 7, 8, 9];
window.addEventListener("keydown", (e => {
    L.includes(Number(e.key)) && (R.pixelDensity(Number(e.key)),
        pixelDensity(Number(e.key)),
        F.setSeed(C),
        G()),
        "s" === e.key && saveCanvas(tokenData.tokenId, "png")
}
));
const P = (e, t, h, i, s, n, r, d, o) => {
    const a = [];
    let f = {
        x: e,
        y: t
    }
        , l = 0;
    for (let e = 0; e < i; e += 1) {
        let t;
        t = $(f, e % 2 == 0 ? h : h * _.weeds, l, n, r, d, o),
            f = t,
            a.push(t),
            l += s
    }
    return a
}
    , $ = (e, t, h, i, s, n, r) => {
        const d = {};
        return e.x + t > i ? d.x = e.x - t : e.x - t < s ? d.x = e.x + t : d.x = e.x + E([t * cos(h), t * sin(h)]),
            e.y + t > n ? d.y = e.y - t : e.y - t < r ? d.y = e.y + t : d.y = e.y + E([t * cos(h), t * sin(h)]),
            d
    }
    , I = (e, t, h, i, s, n) => {
        const r = [];
        let d = 0
            , o = n;
        for (let a = 0; a < s; a += 1)
            r.push({
                x: e + h * R.cos(d) * o,
                y: t + h * R.sin(d) * o
            }),
                d += i / s,
                o += n;
        return r
    }
    , O = (e, t, h, i, s, n) => {
        const r = [];
        let d = 0;
        for (let o = 0; o < s; o += 1)
            r.push({
                x: e + h * R.sin(d) * R.cos(d),
                y: t + h * R.cos(d * n)
            }),
                d += i / s;
        return r
    }
    , q = (e, t, h, i, s) => {
        const n = [];
        let r = 0;
        for (let d = 0; d < s; d += 1)
            n.push({
                x: e + h * R.cos(r),
                y: t + h * R.sin(r) * R.cos(r)
            }),
                r += i / s;
        return n
    }
    , Q = (e, t, h, i, s, n) => {
        const r = [];
        let d = 0;
        for (let o = 0; o < s; o += 1)
            r.push({
                x: e + h * R.sin(d * n) * R.cos(d * n),
                y: t + h * R.cos(d)
            }),
                d += i / s;
        return r
    }
    ;