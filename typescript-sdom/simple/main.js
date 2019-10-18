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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
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

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var sdom = __webpack_require__(/*! ../../src */ "../../src/index.ts");
var h = sdom.create();
var view = h.div({ style: "text-align: center" }, h.h1('Local time', { style: function (date) { return "color: " + colors[date.getSeconds() % 6]; } }), h.p(function (date) { return date.toString(); }));
var colors = ['#F44336', '#03A9F4', '#4CAF50', '#3F51B5', '#607D8B', '#FF5722'];
var model = { value: new Date() };
var el = view.create(sdom.observable.create(model), sdom.noop);
document.body.appendChild(el);
setInterval(tick, 1000);
function tick() {
    sdom.observable.step(model, new Date());
}


/***/ })

/******/ });