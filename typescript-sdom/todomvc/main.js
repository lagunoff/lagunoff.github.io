/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../src/html.ts":
/*!**************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/html.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ./index */ "../../src/index.ts");
index_1.h.a = index_1.h.bind(void 0, 'a');
index_1.h.abbr = index_1.h.bind(void 0, 'abbr');
index_1.h.address = index_1.h.bind(void 0, 'address');
index_1.h.applet = index_1.h.bind(void 0, 'applet');
index_1.h.area = index_1.h.bind(void 0, 'area');
index_1.h.article = index_1.h.bind(void 0, 'article');
index_1.h.aside = index_1.h.bind(void 0, 'aside');
index_1.h.audio = index_1.h.bind(void 0, 'audio');
index_1.h.b = index_1.h.bind(void 0, 'b');
index_1.h.base = index_1.h.bind(void 0, 'base');
index_1.h.basefont = index_1.h.bind(void 0, 'basefont');
index_1.h.bdo = index_1.h.bind(void 0, 'bdo');
index_1.h.blockquote = index_1.h.bind(void 0, 'blockquote');
index_1.h.body = index_1.h.bind(void 0, 'body');
index_1.h.br = index_1.h.bind(void 0, 'br');
index_1.h.button = index_1.h.bind(void 0, 'button');
index_1.h.canvas = index_1.h.bind(void 0, 'canvas');
index_1.h.caption = index_1.h.bind(void 0, 'caption');
index_1.h.cite = index_1.h.bind(void 0, 'cite');
index_1.h.code = index_1.h.bind(void 0, 'code');
index_1.h.col = index_1.h.bind(void 0, 'col');
index_1.h.colgroup = index_1.h.bind(void 0, 'colgroup');
index_1.h.data = index_1.h.bind(void 0, 'data');
index_1.h.datalist = index_1.h.bind(void 0, 'datalist');
index_1.h.dd = index_1.h.bind(void 0, 'dd');
index_1.h.del = index_1.h.bind(void 0, 'del');
index_1.h.details = index_1.h.bind(void 0, 'details');
index_1.h.dfn = index_1.h.bind(void 0, 'dfn');
index_1.h.dialog = index_1.h.bind(void 0, 'dialog');
index_1.h.dir = index_1.h.bind(void 0, 'dir');
index_1.h.div = index_1.h.bind(void 0, 'div');
index_1.h.dl = index_1.h.bind(void 0, 'dl');
index_1.h.dt = index_1.h.bind(void 0, 'dt');
index_1.h.em = index_1.h.bind(void 0, 'em');
index_1.h.embed = index_1.h.bind(void 0, 'embed');
index_1.h.fieldset = index_1.h.bind(void 0, 'fieldset');
index_1.h.figcaption = index_1.h.bind(void 0, 'figcaption');
index_1.h.figure = index_1.h.bind(void 0, 'figure');
index_1.h.font = index_1.h.bind(void 0, 'font');
index_1.h.footer = index_1.h.bind(void 0, 'footer');
index_1.h.form = index_1.h.bind(void 0, 'form');
index_1.h.frame = index_1.h.bind(void 0, 'frame');
index_1.h.frameset = index_1.h.bind(void 0, 'frameset');
index_1.h.h1 = index_1.h.bind(void 0, 'h1');
index_1.h.h2 = index_1.h.bind(void 0, 'h2');
index_1.h.h3 = index_1.h.bind(void 0, 'h3');
index_1.h.h4 = index_1.h.bind(void 0, 'h4');
index_1.h.h5 = index_1.h.bind(void 0, 'h5');
index_1.h.h6 = index_1.h.bind(void 0, 'h6');
index_1.h.head = index_1.h.bind(void 0, 'head');
index_1.h.header = index_1.h.bind(void 0, 'header');
index_1.h.hgroup = index_1.h.bind(void 0, 'hgroup');
index_1.h.hr = index_1.h.bind(void 0, 'hr');
index_1.h.html = index_1.h.bind(void 0, 'html');
index_1.h.i = index_1.h.bind(void 0, 'i');
index_1.h.iframe = index_1.h.bind(void 0, 'iframe');
index_1.h.img = index_1.h.bind(void 0, 'img');
index_1.h.input = index_1.h.bind(void 0, 'input');
index_1.h.ins = index_1.h.bind(void 0, 'ins');
index_1.h.kbd = index_1.h.bind(void 0, 'kbd');
index_1.h.label = index_1.h.bind(void 0, 'label');
index_1.h.legend = index_1.h.bind(void 0, 'legend');
index_1.h.li = index_1.h.bind(void 0, 'li');
index_1.h.link = index_1.h.bind(void 0, 'link');
index_1.h.main = index_1.h.bind(void 0, 'main');
index_1.h.map = index_1.h.bind(void 0, 'map');
index_1.h.mark = index_1.h.bind(void 0, 'mark');
index_1.h.marquee = index_1.h.bind(void 0, 'marquee');
index_1.h.menu = index_1.h.bind(void 0, 'menu');
index_1.h.meta = index_1.h.bind(void 0, 'meta');
index_1.h.meter = index_1.h.bind(void 0, 'meter');
index_1.h.nav = index_1.h.bind(void 0, 'nav');
index_1.h.noscript = index_1.h.bind(void 0, 'noscript');
index_1.h.object = index_1.h.bind(void 0, 'object');
index_1.h.ol = index_1.h.bind(void 0, 'ol');
index_1.h.optgroup = index_1.h.bind(void 0, 'optgroup');
index_1.h.option = index_1.h.bind(void 0, 'option');
index_1.h.output = index_1.h.bind(void 0, 'output');
index_1.h.p = index_1.h.bind(void 0, 'p');
index_1.h.param = index_1.h.bind(void 0, 'param');
index_1.h.picture = index_1.h.bind(void 0, 'picture');
index_1.h.pre = index_1.h.bind(void 0, 'pre');
index_1.h.progress = index_1.h.bind(void 0, 'progress');
index_1.h.q = index_1.h.bind(void 0, 'q');
index_1.h.rt = index_1.h.bind(void 0, 'rt');
index_1.h.ruby = index_1.h.bind(void 0, 'ruby');
index_1.h.s = index_1.h.bind(void 0, 's');
index_1.h.samp = index_1.h.bind(void 0, 'samp');
index_1.h.script = index_1.h.bind(void 0, 'script');
index_1.h.section = index_1.h.bind(void 0, 'section');
index_1.h.select = index_1.h.bind(void 0, 'select');
index_1.h.slot = index_1.h.bind(void 0, 'slot');
index_1.h.small = index_1.h.bind(void 0, 'small');
index_1.h.source = index_1.h.bind(void 0, 'source');
index_1.h.span = index_1.h.bind(void 0, 'span');
index_1.h.strong = index_1.h.bind(void 0, 'strong');
index_1.h.style = index_1.h.bind(void 0, 'style');
index_1.h.sub = index_1.h.bind(void 0, 'sub');
index_1.h.sup = index_1.h.bind(void 0, 'sup');
index_1.h.table = index_1.h.bind(void 0, 'table');
index_1.h.tbody = index_1.h.bind(void 0, 'tbody');
index_1.h.td = index_1.h.bind(void 0, 'td');
index_1.h.template = index_1.h.bind(void 0, 'template');
index_1.h.textarea = index_1.h.bind(void 0, 'textarea');
index_1.h.tfoot = index_1.h.bind(void 0, 'tfoot');
index_1.h.th = index_1.h.bind(void 0, 'th');
index_1.h.thead = index_1.h.bind(void 0, 'thead');
index_1.h.time = index_1.h.bind(void 0, 'time');
index_1.h.title = index_1.h.bind(void 0, 'title');
index_1.h.tr = index_1.h.bind(void 0, 'tr');
index_1.h.track = index_1.h.bind(void 0, 'track');
index_1.h.u = index_1.h.bind(void 0, 'u');
index_1.h.ul = index_1.h.bind(void 0, 'ul');
index_1.h.var = index_1.h.bind(void 0, 'var');
index_1.h.video = index_1.h.bind(void 0, 'video');
index_1.h.wbr = index_1.h.bind(void 0, 'wbr');


/***/ }),

/***/ "../../src/index.ts":
/*!***************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var props_1 = __webpack_require__(/*! ./props */ "../../src/props.ts");
var observable = __webpack_require__(/*! ./observable */ "../../src/observable.ts");
exports.observable = observable;
var observable_1 = __webpack_require__(/*! ./observable */ "../../src/observable.ts");
/**
 * Bind type parameters for `h`. This function does nothing at runtime
 * and just returns `h` singleton which exposes all API with bound
 * `Model` and `Msg` parameters. Without this typescript is not able
 * to unify types if you use directly exported functions from the
 * library. You dont need this in JS code.
 *
 *     type Model = { counter: number };
 *     type Msg = 'Click';
 *     const h = sdom.create<Model, Msg>();
 *     const view = h.div(
 *         h.p(m => `You clicked ${m.counter} times`),
 *         h.button('Click here', { onclick: () => 'Click' }),
 *     );
 *     const model = { value: { counter: 0 } };
 *     const el = view.create(sdom.observable.create(model), sdom.noop);
 *     assert.instanceOf(el.childNodes[0], HTMLParagraphElement);
 *     assert.instanceOf(el.childNodes[1], HTMLButtonElement);
 */
function create() {
    return exports.h;
}
exports.create = create;
exports.default = create;
/**
 * An alias for `elem`. Also a namespace for the most [common html
 * tags](./src/html.ts) and all public API. All functions exposed by
 * `h` have their `Model` and `Msg` parameters bound, see docs for
 * `create`, see also [todomvc](examples/todomvc/src/index.ts) for
 * usage examples
 */
exports.h = function h() {
    return elem.apply(void 0, arguments);
};
__webpack_require__(/*! ./html */ "../../src/html.ts");
__export(__webpack_require__(/*! ./props */ "../../src/props.ts"));
/**
 * Start the application and attach it to `rootEl`
 *
 *    const view = h.div(h.h1('Hello world!', { id: 'greeting' }));
 *    const inst = sdom.attach(view, document.body, {});
 *    assert.equal(document.getElementById('greeting').textContent, 'Hello world!');
 */
function attach(view, rootEl, init, sink) {
    if (sink === void 0) { sink = exports.noop; }
    var model = { value: init, subscriptions: [] };
    return new SDOMInstance(rootEl, model, view, sink);
}
exports.attach = attach;
/**
 * Create an html node. Attributes and contents can go in any order
 *
 *    const view = sdom.elem('a', { href: '#link' });
 *    const el = view.create(sdom.observable.of({}), msg => {});
 *    assert.instanceOf(el, HTMLAnchorElement);
 *    assert.equal(el.hash, '#link');
 */
function elem(name) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var childs = [];
    var attrs = [];
    var dynamicAttrs = [];
    var props = [];
    var dynamicProps = [];
    var events = [];
    for (var _a = 0, rest_1 = rest; _a < rest_1.length; _a++) {
        var a = rest_1[_a];
        if (typeof (a) === 'function')
            childs.push(text(a));
        else if (isSDOM(a))
            childs.push(a);
        else if (typeof (a) === 'string' || typeof (a) === 'number')
            childs.push(text(a));
        else if (typeof (a) === 'object') {
            for (var k in a) {
                if (/^on/.test(k)) {
                    events.push([k.slice(2), a[k]]);
                    continue;
                }
                if (typeof (a[k]) === 'function') {
                    k in props_1.attributes ? dynamicAttrs.push([k, a[k]]) : dynamicProps.push([k, a[k]]);
                    continue;
                }
                k in props_1.attributes ? attrs.push([k, a[k]]) : props.push([k, a[k]]);
            }
        }
    }
    return {
        // Create new element
        create: function (o, sink) {
            var init = o.getValue();
            var el = document.createElement(name);
            var eventListeners = events.map(function (_a) {
                var k = _a[0], handler = _a[1];
                var listener = function (e) {
                    var action = handler(e, o.getValue());
                    if (action !== void 0)
                        sink(action);
                };
                el.addEventListener(k, listener);
                return [k, listener];
            });
            props.forEach(function (_a) {
                var k = _a[0], v = _a[1];
                return el[k] = v;
            });
            dynamicProps.forEach(function (_a) {
                var k = _a[0], fn = _a[1];
                return el[k] = fn(init);
            });
            attrs.forEach(function (_a) {
                var k = _a[0], v = _a[1];
                return el.setAttribute(k, v);
            });
            dynamicAttrs.forEach(function (_a) {
                var k = _a[0], fn = _a[1];
                return el.setAttribute(k, fn(init));
            });
            childs.forEach(function (ch) { return el.appendChild(ch.create(o, sink)); });
            if (dynamicProps.length !== 0 || dynamicAttrs.length !== 0 || eventListeners.length !== 0) {
                o.subscribe(onNext, onComplete);
            }
            return el;
            // Update existing element
            function onNext(_a) {
                var next = _a.next;
                dynamicProps.forEach(function (_a) {
                    var k = _a[0], fn = _a[1];
                    return el[k] = fn(next);
                });
                dynamicAttrs.forEach(function (_a) {
                    var k = _a[0], fn = _a[1];
                    return el.setAttribute(k, fn(next));
                });
            }
            // Destroy element
            function onComplete() {
                eventListeners.forEach(function (_a) {
                    var k = _a[0], listener = _a[1];
                    return el.removeEventListener(k, listener);
                });
            }
        }
    };
}
exports.elem = elem;
/**
 * Create Text node
 *
 *    const view = sdom.text(n => `You have ${n} unread messages`);
 *    const model = { value: 0 };
 *    const el = view.create(sdom.observable.create(model), sdom.noop);
 *    assert.instanceOf(el, Text);
 *    assert.equal(el.nodeValue, 'You have 0 unread messages');
 *    sdom.observable.step(model, 5);
 *    assert.equal(el.nodeValue, 'You have 5 unread messages');
 */
function text(value) {
    return {
        // Create new text node
        create: function (o) {
            var content = typeof (value) === 'function' ? String(value(o.getValue())) : String(value);
            var el = document.createTextNode(content);
            if (typeof (value) === 'function')
                o.subscribe(function (pv) { return el.nodeValue = String(value(pv.next)); }, exports.noop);
            return el;
        },
    };
}
exports.text = text;
/**
 * Create an html node which content is a dynamic list of child nodes
 *
 *    const view = h.array('ul', { class: 'list' })(
 *      m => m.list,
 *      h => h.li(m => m.here),
 *    );
 *    const list = ['One', 'Two', 'Three', 'Four'];
 *    const el = view.create(sdom.observable.of({ list }), msg => {});
 *    assert.instanceOf(el, HTMLUListElement);
 *    assert.equal(el.childNodes[3].innerHTML, 'Four');
 */
function array(name, props) {
    if (props === void 0) { props = {}; }
    var rootSdom = elem(name, props);
    return function (selector, child_) {
        var child = child_(exports.h);
        var childModels = [];
        return {
            // Create new DOM node
            create: function (o, sink) {
                var init = o.getValue();
                var xs = selector(init);
                var el = rootSdom.create(o, sink);
                xs.forEach(function (here, idx) {
                    var childModel = { value: { here: here, parent: init }, subscriptions: [] };
                    var childSink = function (action) { return sink(action(idx)); };
                    var childEl = child.create(observable.create(childModel), childSink);
                    childModels.push(childModel);
                    el.appendChild(childEl);
                });
                o.subscribe(onNext, onComplete);
                return el;
                function onNext(_a) {
                    var prev = _a.prev, next = _a.next;
                    var xs = selector(next);
                    var xsPrev = selector(prev);
                    var lastInserted = null;
                    var _loop_1 = function (i) {
                        var idx = i;
                        var childEl = el.childNodes[i];
                        if (i in xsPrev && !(i in xs)) {
                            var subscriptions = childModels[i].subscriptions;
                            subscriptions && subscriptions.forEach(function (s) { return s.onComplete(); });
                            el.removeChild(childEl);
                            childModels.splice(i, 1);
                        }
                        else if (!(i in xsPrev) && i in xs) {
                            var childModel = { value: { here: xs[i], parent: next }, subscriptions: [] };
                            var childSink = function (action) { return sink(action(idx)); };
                            var nextEl = child.create(observable.create(childModel), childSink);
                            childModels.push(childModel);
                            if (lastInserted) {
                                el.insertBefore(nextEl, lastInserted);
                                lastInserted = nextEl;
                            }
                            else {
                                el.appendChild(nextEl);
                                lastInserted = nextEl;
                            }
                        }
                        else {
                            observable.next(childModels[i], { here: xs[i], parent: next });
                        }
                    };
                    for (var i = Math.max(xs.length, xsPrev.length) - 1; i >= 0; i--) {
                        _loop_1(i);
                    }
                }
                function onComplete() {
                    for (var _i = 0, childModels_1 = childModels; _i < childModels_1.length; _i++) {
                        var a = childModels_1[_i];
                        observable.complete(a[0]);
                    }
                }
            },
        };
    };
}
exports.array = array;
function dimap(coproj, proj) {
    return function (s) {
        var sdom = isSDOM(s) ? s : s(exports.h);
        return {
            create: function (o, sink) {
                return sdom.create(observable_1.observableMap(coproj, o), function (a) { return sink(proj(a)); });
            },
        };
    };
}
exports.dimap = dimap;
/**
 * Generic way to create `SDOM` which content depends on some
 * condition on `Model`. First parameter checks this condition and
 * returns the index that points to the current `SDOM` inside
 * `alternatives`. This is useful for routing, tabs, etc. See also
 * [variants](/examples/variants/index.ts) example with more
 * convenient and more typesafe way of displaying union types
 *
 *    type Tab = 'Details'|'Comments';
 *    type Model = { tab: Tab, details: string; comments: string[] };
 *    const view = h.div(sdom.discriminate(m => m.tab, {
 *        Details: h.p({ id: 'details' }, m => m.details),
 *        Comments: h.p({ id: 'comments' }, m => m.comments.join(', ')),
 *    }));
 *    const model = { value: { tab: 'Details', details: 'This product is awesome', comments: [`No it's not`] } };
 *    const el = view.create(sdom.observable.create(model), sdom.noop);
 *    assert.equal(el.childNodes[0].id, 'details');
 *    assert.equal(el.childNodes[0].textContent, 'This product is awesome');
 *    sdom.observable.step(model, { ...model.value, tab: 'Comments' });
 *    assert.equal(el.childNodes[0].id, 'comments');
 */
function discriminate(discriminator, alternatives) {
    return {
        // Create new node
        create: function (o, sink) {
            var key = discriminator(o.getValue());
            var childModel = observable.valueOf(o.getValue());
            var el = alternatives[key].create(observable.create(childModel), sink);
            o.subscribe(onNext, onComplete);
            return el;
            // Update existing text node
            function onNext(_a) {
                var prev = _a.prev, next = _a.next;
                var prevKey = discriminator(prev);
                var nextKey = discriminator(next);
                if (prevKey !== nextKey) {
                    // Key is changed, so we don't update but switch to the new node
                    observable.complete(childModel);
                    observable.next(childModel, next);
                    var nextEl = alternatives[nextKey].create(observable.create(childModel), sink);
                    el.parentNode.replaceChild(nextEl, el);
                    el = nextEl;
                }
                else {
                    observable.next(childModel, next);
                }
            }
            function onComplete() {
                observable.complete(childModel);
            }
        },
    };
}
exports.discriminate = discriminate;
exports.id = function (a) { return a; };
exports.noop = function () { };
// Borrowed from ELM
var rAF = typeof requestAnimationFrame !== 'undefined'
    ? requestAnimationFrame
    : function (callback) { setTimeout(callback, 1000 / 60); };
// A running SDOM application
var SDOMInstance = /** @class */ (function () {
    function SDOMInstance(rootEl, model, view, sink) {
        var _this = this;
        this.rootEl = rootEl;
        this.model = model;
        this.view = view;
        this.sink = sink;
        this.state = 'NO_REQUEST';
        this.updateIfNeeded = function () {
            switch (_this.state) {
                case 'NO_REQUEST':
                    throw new Error('Unexpected draw callback.\n' +
                        'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.');
                case 'PENDING_REQUEST':
                    rAF(_this.updateIfNeeded);
                    _this.state = 'EXTRA_REQUEST';
                    observable.next(_this.model, _this.currentModel);
                    return;
                case 'EXTRA_REQUEST':
                    _this.state = 'NO_REQUEST';
                    return;
            }
        };
        var o = observable.create(model);
        rootEl.appendChild(view.create(o, sink));
        this.currentModel = model.value;
    }
    SDOMInstance.prototype.step = function (next) {
        if (this.model.value === next)
            return;
        if (this.state === 'NO_REQUEST') {
            rAF(this.updateIfNeeded);
        }
        this.state = 'PENDING_REQUEST';
        this.currentModel = next;
    };
    return SDOMInstance;
}());
exports.SDOMInstance = SDOMInstance;
;
exports.h.text = text;
exports.h.array = array;
exports.h.discriminate = discriminate;
exports.h.dimap = dimap;
function isSDOM(input) {
    return input && typeof (input.create) === 'function';
}
exports.isSDOM = isSDOM;


/***/ }),

/***/ "../../src/observable.ts":
/*!********************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/observable.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function create(v) {
    var getValue = function () { return v.value; };
    var subscribe = function (onNext, onComplete) {
        var subscription = { onNext: onNext, onComplete: onComplete };
        v.subscriptions = v.subscriptions || [];
        v.subscriptions.push(subscription);
        return function () {
            if (!v.subscriptions)
                return;
            var idx = v.subscriptions.indexOf(subscription);
            if (idx === -1)
                return;
            v.subscriptions.splice(idx, 1);
        };
    };
    return { subscribe: subscribe, getValue: getValue };
}
exports.create = create;
function valueOf(value) {
    return { value: value, subscriptions: [] };
}
exports.valueOf = valueOf;
function of(value) {
    return create({ value: value, subscriptions: [] });
}
exports.of = of;
function next(v, next) {
    var change = { prev: v.value, next: next };
    v.subscriptions && v.subscriptions.forEach(function (s) { return s.onNext(change); });
    v.value = next;
}
exports.next = next;
function modify(v, proj) {
    return next(v, proj(v.value));
}
exports.modify = modify;
function complete(v) {
    v.subscriptions && v.subscriptions.forEach(function (s) { return s.onComplete(); });
    v.subscriptions = [];
}
exports.complete = complete;
function subscribeMap(proj, s) {
    return function (onNext, onComplete) { return s(function (a) { return onNext(proj(a)); }, onComplete); };
}
exports.subscribeMap = subscribeMap;
function observableMap(proj, o) {
    var getValue = function () { return proj(o.getValue()); };
    var subscribe = subscribeMap(function (change) { return ({ prev: proj(change.prev), next: proj(change.next) }); }, o.subscribe);
    return { getValue: getValue, subscribe: subscribe };
}
exports.observableMap = observableMap;


/***/ }),

/***/ "../../src/props.ts":
/*!***************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/props.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.attributes = {
    for: '', class: '',
};


/***/ }),

/***/ "./src/css.ts":
/*!********************!*\
  !*** ./src/css.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\nhtml,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #4d4d4d;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n:focus {\n\toutline: 0;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -155px;\n\twidth: 100%;\n\tfont-size: 100px;\n\tfont-weight: 100;\n\ttext-align: center;\n\tcolor: rgba(175, 47, 47, 0.15);\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tborder: 0;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\twidth: 1px;\n\theight: 1px;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n\tright: 100%;\n\tbottom: 100%;\n}\n\n.toggle-all + label {\n\twidth: 60px;\n\theight: 34px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -52px;\n\tleft: -13px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all + label:before {\n\tcontent: '\u276F';\n\tfont-size: 22px;\n\tcolor: #e6e6e6;\n\tpadding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #737373;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: calc(100% - 43px);\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n}\n\n.todo-list li.completed label {\n\tcolor: #d9d9d9;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #cc9a9a;\n\tmargin-bottom: 11px;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n\tcolor: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '\u00D7';\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tcolor: #777;\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n\tborder-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 20px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #bfbfbf;\n\tfont-size: 10px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}";


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ../../../src/index */ "../../src/index.ts");
var todo = __webpack_require__(/*! ./todo */ "./src/todo.ts");
var css_1 = __webpack_require__(/*! ./css */ "./src/css.ts");
var h = index_1.create();
// Update
function update(msg, model) {
    switch (msg.tag) {
        case 'Input': return __assign({}, model, { title: msg.value });
        case 'ToggleAll': {
            var checked_1 = allChecked(model);
            var todos_1 = model.todos.map(function (t) { return (__assign({}, t, { completed: !checked_1 })); });
            return __assign({}, model, { todos: todos_1 });
        }
        case 'ClearCompleted': {
            var todos_2 = model.todos.filter(function (t) { return !t.completed; });
            return __assign({}, model, { todos: todos_2 });
        }
        case 'KeyDown/enter': {
            if (model.title) {
                var todos_3 = model.todos.concat([todo.init(model.title)]);
                return __assign({}, model, { title: '', todos: todos_3 });
            }
            return model;
        }
        case 'Hash/change': {
            var filter_1 = filterFromHash(msg.hash);
            return __assign({}, model, { filter: filter_1 });
        }
        case '@Todo':
            {
                if (msg.msg.tag === 'Destroy') {
                    var todos_4 = model.todos.filter(function (_, idx) { return idx !== msg.idx; });
                    return __assign({}, model, { todos: todos_4 });
                }
                if (msg.msg.tag === 'Editing/commit' && model.todos[msg.idx].editing === '') {
                    var todos_5 = model.todos.filter(function (_, idx) { return idx !== msg.idx; });
                    return __assign({}, model, { todos: todos_5 });
                }
                var todos_6 = model.todos.slice();
                todos_6.splice(msg.idx, 1, todo.update(msg.msg, todos_6[msg.idx]));
                return __assign({}, model, { todos: todos_6 });
            }
            ;
    }
}
exports.update = update;
// View
exports.view = h.div(h.section({ className: 'todoapp' }, h.header({ className: 'header' }, h.h1('Todos'), h.input({
    className: 'new-todo',
    placeholder: 'What needs to be done?',
    autofocus: true,
    value: function (m) { return m.title; },
    oninput: function (e) { return ({ tag: 'Input', value: e.currentTarget.value }); },
    onkeydown: function (e) { return e.keyCode === KEY_ENTER ? { tag: 'KeyDown/enter' } : void 0; },
})), h.section({ className: 'main' }, h.input({
    id: 'toggle-all',
    className: 'toggle-all',
    type: 'checkbox',
    checked: allChecked,
    onclick: function () { return ({ tag: 'ToggleAll' }); },
}), h.label('Mark all as complete', { for: 'toggle-all' }), h.array('ul', { className: 'todo-list' })(function (m) { return m.todos; }, function (h) { return h.dimap(todoSelector, function (msg) { return function (idx) { return ({ tag: '@Todo', msg: msg, idx: idx }); }; })(todo.view); }), h.footer({ className: 'footer' }, h.span({ className: 'todo-count' }, h('strong', function (m) { return countItemsLeft(m) + ' items left'; })), h.ul({ className: 'filters' }, h.li(h.a('All', { href: '#/', className: selectedIf('all') })), h.li(h.a('Active', { href: '#/active', className: selectedIf('active') })), h.li(h.a('Completed', { href: '#/completed', className: selectedIf('completed') }))), h.button('Clear completed', { className: 'clear-completed', onclick: function () { return ({ tag: 'ClearCompleted' }); } })))), h.footer({ className: 'info' }, h.p('Double-click to edit a todo'), h.p('Template by ', h.a('Sindre Sorhus', { href: 'http://sindresorhus.com' })), h.p('Created by ', h.a('Lagunov Vlad', { href: 'https://github.com/lagunoff' })), h.p('Part of ', h.a('TodoMVC', { href: 'http://todomvc.com' }))), h('style', { type: 'text/css' }, css_1.default));
function countItemsLeft(model) {
    return model.todos.reduce(function (acc, todo) { return todo.completed ? acc : acc + 1; }, 0);
}
function allChecked(model) {
    return model.todos.reduce(function (acc, todo) { return todo.completed ? (acc && true) : false; }, true);
}
function selectedIf(filter) {
    return function (m) { return m.filter === filter ? 'selected' : ''; };
}
function todoSelector(m) {
    return __assign({}, m.here, { hidden: !(m.parent.filter === 'all' || (m.parent.filter === 'completed' && m.here.completed) || (m.parent.filter === 'active' && !m.here.completed)) });
}
function filterFromHash(hash) {
    if (hash === '#/completed')
        return 'completed';
    if (hash === '#/active')
        return 'active';
    return 'all';
}
function dispatch(msg) {
    var next = update(msg, inst.currentModel);
    inst.step(next);
    console.log('msg', msg);
    console.log('model', next);
    console.log('-----------');
}
var todosJson = localStorage.getItem('todomvc-typescript-sdom');
var todos = todosJson ? JSON.parse(todosJson) : [];
var filter = filterFromHash(location.hash);
var init = { title: '', filter: filter, todos: todos };
var inst = index_1.attach(exports.view, document.body, init, dispatch);
window.onpopstate = function () {
    dispatch({ tag: 'Hash/change', hash: location.hash });
};
window.onbeforeunload = function () {
    localStorage.setItem('todomvc-typescript-sdom', JSON.stringify(inst.currentModel.todos));
};
var KEY_ENTER = 13;


/***/ }),

/***/ "./src/todo.ts":
/*!*********************!*\
  !*** ./src/todo.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ../../../src/index */ "../../src/index.ts");
var h = index_1.default();
// Init
function init(title) {
    return { title: title, completed: false, editing: null };
}
exports.init = init;
// Update
function update(msg, model) {
    switch (msg.tag) {
        case 'Completed': return __assign({}, model, { completed: !model.completed });
        case 'Destroy': return model;
        case 'Editing/on': {
            var rootEl = msg.event.currentTarget;
            var inputEl_1 = rootEl.parentElement.querySelector('input.edit');
            setTimeout(function () { return inputEl_1 && inputEl_1.focus(); }, 100);
            return __assign({}, model, { editing: model.title });
        }
        case 'Editing/input': return __assign({}, model, { editing: msg.value });
        case 'Editing/cancel': return __assign({}, model, { editing: null });
        case 'Editing/commit': {
            if (model.editing === null)
                return model;
            return __assign({}, model, { title: model.editing || '', editing: null });
        }
    }
}
exports.update = update;
var rootClass = function (m) { return [m.completed ? 'completed' : '', m.editing !== null ? 'editing' : ''].filter(Boolean).join(' '); };
var rootStyle = function (m) { return m.hidden ? 'display: none;' : ''; };
// View
exports.view = h.li({ className: rootClass, style: rootStyle }, h.div({ className: 'view', ondblclick: function (event) { return ({ tag: 'Editing/on', event: event }); } }, h.input({
    className: 'toggle',
    type: 'checkbox',
    checked: function (m) { return m.completed; },
    onclick: function () { return ({ tag: 'Completed' }); },
}), h.label(function (m) { return m.title; }), h.button({ className: 'destroy', onclick: function () { return ({ tag: 'Destroy' }); } })), h.input({
    className: 'edit',
    value: function (m) { return m.editing !== null ? m.editing : m.title; },
    oninput: function (e) { return ({ tag: 'Editing/input', value: e.currentTarget.value }); },
    onblur: function () { return ({ tag: 'Editing/commit' }); },
    onkeydown: handleKeydown,
}));
function handleKeydown(event) {
    if (event.keyCode === KEY_ENTER)
        return { tag: 'Editing/commit' };
    if (event.keyCode === KEY_ESCAPE)
        return { tag: 'Editing/cancel' };
}
var KEY_ENTER = 13;
var KEY_ESCAPE = 27;


/***/ })

/******/ });