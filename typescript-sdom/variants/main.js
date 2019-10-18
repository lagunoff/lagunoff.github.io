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

/***/ "./css.ts":
/*!****************!*\
  !*** ./css.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n@charset \"UTF-8\";\n/*!\n * awsm.css v3.0.0 (https://igoradamenko.github.io/awsm.css/)\n * Copyright 2015 Igor Adamenko\n * Licensed under MIT (https://github.com/igoradamenko/awsm.css/blob/master/LICENSE.md)\n */\nhtml{\n  font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"PT Sans\", \"Open Sans\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size:100%;\n  line-height:1.4;\n  background:white;\n  color:black;\n  -webkit-overflow-scrolling:touch;\n}\n\nbody{\n  margin:1.2em;\n  font-size:1rem;\n}\n@media (min-width: 20rem){\n  body{\n    font-size:calc(1rem + 0.00625 * (100vw - 20rem));\n  }\n}\n@media (min-width: 40rem){\n  body{\n    font-size:1.125rem;\n  }\n}\nbody header,\nbody main,\nbody footer,\nbody article{\n  position:relative;\n  max-width:40rem;\n  margin:0 auto;\n}\nbody > header{\n  margin-bottom:3.5em;\n}\nbody > header h1{\n  margin:0;\n  font-size:1.5em;\n}\nbody > header p{\n  margin:0;\n  font-size:0.85em;\n}\nbody > footer{\n  margin-top:4.5em;\n  padding-bottom:1.5em;\n  text-align:center;\n  font-size:0.8rem;\n  color:#aaaaaa;\n}\n\nnav{\n  margin:1em 0;\n}\nnav ul{\n  list-style:none;\n  margin:0;\n  padding:0;\n}\nnav li{\n  display:inline-block;\n  margin-right:1em;\n  margin-bottom:0.25em;\n}\nnav a:visited{\n  color:#0064c1;\n}\nnav a:hover{\n  color:#f00000;\n}\n\nul, ol{\n  margin-top:0;\n  padding-top:0;\n  padding-left:2.5em;\n}\nul li + li, ol li + li{\n  margin-top:0.25em;\n}\n\np{\n  margin:1em 0;\n  -webkit-hyphens:auto;\n      -ms-hyphens:auto;\n          hyphens:auto;\n}\np:first-child{\n  margin-top:0;\n}\np:last-child{\n  margin-bottom:0;\n}\np + ul, p + ol{\n  margin-top:-0.75em;\n}\np img, p picture{\n  float:right;\n  margin-bottom:0.5em;\n  margin-left:0.5em;\n}\np picture img{\n  float:none;\n  margin:0;\n}\n\ndd{\n  margin-bottom:1em;\n  margin-left:0;\n  padding-left:2.5em;\n}\n\ndt{\n  font-weight:700;\n}\n\nblockquote{\n  margin:0;\n  padding-left:2.5em;\n}\n\naside{\n  margin:0.5em 0;\n  font-style:italic;\n  color:#aaaaaa;\n}\n@media (min-width: 65rem){\n  aside{\n    position:absolute;\n    right:-12.5rem;\n    width:9.375rem;\n    max-width:9.375rem;\n    margin:0;\n    padding-left:0.5em;\n    font-size:0.8em;\n    border-left:1px solid #f2f2f2;\n  }\n}\naside:first-child{\n  margin-top:0;\n}\naside:last-child{\n  margin-bottom:0;\n}\n\nsection + section{\n  margin-top:2em;\n}\n\nh1, h2, h3, h4, h5, h6{\n  margin:1.25em 0 0;\n  line-height:1.2;\n}\nh1:hover > a[href^=\"#\"][id]:empty, h1:focus > a[href^=\"#\"][id]:empty, h2:hover > a[href^=\"#\"][id]:empty, h2:focus > a[href^=\"#\"][id]:empty, h3:hover > a[href^=\"#\"][id]:empty, h3:focus > a[href^=\"#\"][id]:empty, h4:hover > a[href^=\"#\"][id]:empty, h4:focus > a[href^=\"#\"][id]:empty, h5:hover > a[href^=\"#\"][id]:empty, h5:focus > a[href^=\"#\"][id]:empty, h6:hover > a[href^=\"#\"][id]:empty, h6:focus > a[href^=\"#\"][id]:empty{\n  opacity:1;\n}\nh1 + p, h1 + details, h2 + p, h2 + details, h3 + p, h3 + details, h4 + p, h4 + details, h5 + p, h5 + details, h6 + p, h6 + details{\n  margin-top:0.5em;\n}\nh1 > a[href^=\"#\"][id]:empty, h2 > a[href^=\"#\"][id]:empty, h3 > a[href^=\"#\"][id]:empty, h4 > a[href^=\"#\"][id]:empty, h5 > a[href^=\"#\"][id]:empty, h6 > a[href^=\"#\"][id]:empty{\n  position:absolute;\n  left:-0.65em;\n  opacity:0;\n  text-decoration:none;\n  font-weight:400;\n  line-height:1;\n  color:#aaaaaa;\n}\n@media (min-width: 40rem){\n  h1 > a[href^=\"#\"][id]:empty, h2 > a[href^=\"#\"][id]:empty, h3 > a[href^=\"#\"][id]:empty, h4 > a[href^=\"#\"][id]:empty, h5 > a[href^=\"#\"][id]:empty, h6 > a[href^=\"#\"][id]:empty{\n    left:-0.8em;\n  }\n}\nh1 > a[href^=\"#\"][id]:empty:target, h1 > a[href^=\"#\"][id]:empty:hover, h1 > a[href^=\"#\"][id]:empty:focus, h2 > a[href^=\"#\"][id]:empty:target, h2 > a[href^=\"#\"][id]:empty:hover, h2 > a[href^=\"#\"][id]:empty:focus, h3 > a[href^=\"#\"][id]:empty:target, h3 > a[href^=\"#\"][id]:empty:hover, h3 > a[href^=\"#\"][id]:empty:focus, h4 > a[href^=\"#\"][id]:empty:target, h4 > a[href^=\"#\"][id]:empty:hover, h4 > a[href^=\"#\"][id]:empty:focus, h5 > a[href^=\"#\"][id]:empty:target, h5 > a[href^=\"#\"][id]:empty:hover, h5 > a[href^=\"#\"][id]:empty:focus, h6 > a[href^=\"#\"][id]:empty:target, h6 > a[href^=\"#\"][id]:empty:hover, h6 > a[href^=\"#\"][id]:empty:focus{\n  opacity:1;\n  box-shadow:none;\n  color:black;\n}\nh1 > a[href^=\"#\"][id]:empty:target:focus, h2 > a[href^=\"#\"][id]:empty:target:focus, h3 > a[href^=\"#\"][id]:empty:target:focus, h4 > a[href^=\"#\"][id]:empty:target:focus, h5 > a[href^=\"#\"][id]:empty:target:focus, h6 > a[href^=\"#\"][id]:empty:target:focus{\n  outline:none;\n}\nh1 > a[href^=\"#\"][id]:empty::before, h2 > a[href^=\"#\"][id]:empty::before, h3 > a[href^=\"#\"][id]:empty::before, h4 > a[href^=\"#\"][id]:empty::before, h5 > a[href^=\"#\"][id]:empty::before, h6 > a[href^=\"#\"][id]:empty::before{\n  content:\"\u00A7 \";\n}\n\nh1{\n  font-size:2.5em;\n}\n\nh2{\n  font-size:1.75em;\n}\n\nh3{\n  font-size:1.25em;\n}\n\nh4{\n  font-size:1.15em;\n}\n\nh5{\n  font-size:1em;\n}\n\nh6{\n  margin-top:1em;\n  font-size:1em;\n  color:#aaaaaa;\n}\n\narticle + article{\n  margin-top:5em;\n}\narticle header p{\n  font-size:0.6em;\n  color:#aaaaaa;\n}\narticle header p + h1, article header p + h2{\n  margin-top:-0.25em;\n}\narticle header h1 + p, article header h2 + p{\n  margin-top:0.25em;\n}\narticle header h1 a, article header h2 a{\n  color:black;\n}\narticle header h1 a:visited, article header h2 a:visited{\n  color:#aaaaaa;\n}\narticle header h1 a:visited:hover, article header h2 a:visited:hover{\n  color:#f00000;\n}\narticle > footer{\n  margin-top:1.5em;\n  font-size:0.85em;\n}\n\na{\n  color:#0064c1;\n}\na:visited{\n  color:#8d39d0;\n}\na:hover, a:active{\n  outline-width:0;\n}\na:hover{\n  color:#f00000;\n}\na abbr{\n  font-size:1em;\n}\n\nabbr{\n  margin-right:-0.075em;\n  text-decoration:none;\n  -webkit-hyphens:none;\n      -ms-hyphens:none;\n          hyphens:none;\n  letter-spacing:0.075em;\n  font-size:0.9em;\n}\n\nimg, picture{\n  display:block;\n  max-width:100%;\n  margin:0 auto;\n}\n\naudio, video{\n  width:100%;\n  max-width:100%;\n}\n\nfigure{\n  margin:1em 0 0.5em;\n  padding:0;\n}\nfigure + p{\n  margin-top:0.5em;\n}\nfigure figcaption{\n  opacity:0.65;\n  font-size:0.85em;\n}\n\ntable{\n  display:inline-block;\n  border-spacing:0;\n  border-collapse:collapse;\n  overflow-x:auto;\n  max-width:100%;\n  text-align:left;\n  vertical-align:top;\n  background:linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%) 0 0, linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%) 100% 0;\n  background-attachment:scroll, scroll;\n  background-size:1px 100%, 1px 100%;\n  background-repeat:no-repeat, no-repeat;\n}\ntable caption{\n  font-size:0.9em;\n  background:white;\n}\ntable td, table th{\n  padding:0.35em 0.75em;\n  vertical-align:top;\n  font-size:0.9em;\n  border:1px solid #f2f2f2;\n  border-top:0;\n  border-left:0;\n}\ntable td:first-child, table th:first-child{\n  padding-left:0;\n  background-image:linear-gradient(to right, white 50%, rgba(255, 255, 255, 0) 100%);\n  background-size:2px 100%;\n  background-repeat:no-repeat;\n}\ntable td:last-child, table th:last-child{\n  padding-right:0;\n  border-right:0;\n  background-image:linear-gradient(to left, white 50%, rgba(255, 255, 255, 0) 100%);\n  background-position:100% 0;\n  background-size:2px 100%;\n  background-repeat:no-repeat;\n}\ntable td:only-child, table th:only-child{\n  background-image:linear-gradient(to right, white 50%, rgba(255, 255, 255, 0) 100%), linear-gradient(to left, white 50%, rgba(255, 255, 255, 0) 100%);\n  background-position:0 0, 100% 0;\n  background-size:2px 100%, 2px 100%;\n  background-repeat:no-repeat, no-repeat;\n}\ntable th{\n  line-height:1.2;\n}\n\nform{\n  margin-right:auto;\n  margin-left:auto;\n}\n@media (min-width: 40rem){\n  form{\n    max-width:80%;\n  }\n}\nform select, form label{\n  display:block;\n}\nform label:not(:first-child){\n  margin-top:1em;\n}\nform p label{\n  display:inline;\n}\nform p label + label{\n  margin-left:1em;\n}\nform legend:first-child + label{\n  margin-top:0;\n}\nform select, form input[type], form textarea{\n  margin-bottom:1em;\n}\nform input[type=checkbox], form input[type=radio]{\n  margin-bottom:0;\n}\n\nfieldset{\n  margin:0;\n  padding:0.5em 1em;\n  border:1px solid #aaaaaa;\n}\n\nlegend{\n  color:#aaaaaa;\n}\n\nbutton{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:inline-block;\n  width:auto;\n  background:#f2f2f2;\n  color:black;\n  cursor:pointer;\n}\nbutton:focus{\n  border:1px solid black;\n}\nbutton:hover{\n  border:1px solid black;\n}\nbutton:active{\n  background-color:#aaaaaa;\n}\n\nselect{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:inline-block;\n  width:auto;\n  background:#f2f2f2;\n  color:black;\n  cursor:pointer;\n  padding-right:1.2em;\n  background-position:top 55% right 0.35em;\n  background-size:0.5em;\n  background-repeat:no-repeat;\n  -webkit-appearance:button;\n     -moz-appearance:button;\n          appearance:button;\n  background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Cpath fill='rgb(170, 170, 170)' fill-rule='nonzero' d='M1.5 2L3 0H0z'/%3E%3C/svg%3E\");\n}\nselect:focus{\n  border:1px solid black;\n}\nselect:hover{\n  border:1px solid black;\n}\nselect:active{\n  background-color:#aaaaaa;\n}\nselect:focus, select:hover{\n  background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Cpath fill='rgb(0, 0, 0)' fill-rule='nonzero' d='M1.5 2L3 0H0z'/%3E%3C/svg%3E\");\n}\n\ninput[type=text], input[type=password], input[type^=date], input[type=email], input[type=number], input[type=search], input[type=tel], input[type=time], input[type=month], input[type=week], input[type=url]{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:block;\n  width:100%;\n  line-height:calc(2em - 1px * 2 - (.25em - 1px) * 2);\n  -webkit-appearance:none;\n     -moz-appearance:none;\n          appearance:none;\n}\ninput[type=text]:focus, input[type=password]:focus, input[type^=date]:focus, input[type=email]:focus, input[type=number]:focus, input[type=search]:focus, input[type=tel]:focus, input[type=time]:focus, input[type=month]:focus, input[type=week]:focus, input[type=url]:focus{\n  border:1px solid black;\n}\ninput[type=text]::-moz-placeholder, input[type=password]::-moz-placeholder, input[type^=date]::-moz-placeholder, input[type=email]::-moz-placeholder, input[type=number]::-moz-placeholder, input[type=search]::-moz-placeholder, input[type=tel]::-moz-placeholder, input[type=time]::-moz-placeholder, input[type=month]::-moz-placeholder, input[type=week]::-moz-placeholder, input[type=url]::-moz-placeholder{\n  color:#aaaaaa;\n}\ninput[type=text]::-webkit-input-placeholder, input[type=password]::-webkit-input-placeholder, input[type^=date]::-webkit-input-placeholder, input[type=email]::-webkit-input-placeholder, input[type=number]::-webkit-input-placeholder, input[type=search]::-webkit-input-placeholder, input[type=tel]::-webkit-input-placeholder, input[type=time]::-webkit-input-placeholder, input[type=month]::-webkit-input-placeholder, input[type=week]::-webkit-input-placeholder, input[type=url]::-webkit-input-placeholder{\n  color:#aaaaaa;\n}\ninput[type=text]:-ms-input-placeholder, input[type=password]:-ms-input-placeholder, input[type^=date]:-ms-input-placeholder, input[type=email]:-ms-input-placeholder, input[type=number]:-ms-input-placeholder, input[type=search]:-ms-input-placeholder, input[type=tel]:-ms-input-placeholder, input[type=time]:-ms-input-placeholder, input[type=month]:-ms-input-placeholder, input[type=week]:-ms-input-placeholder, input[type=url]:-ms-input-placeholder{\n  color:#aaaaaa;\n}\ninput[type=submit], input[type=button], input[type=reset]{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:inline-block;\n  width:auto;\n  background:#f2f2f2;\n  color:black;\n  cursor:pointer;\n  -webkit-appearance:none;\n     -moz-appearance:none;\n          appearance:none;\n}\ninput[type=submit]:focus, input[type=button]:focus, input[type=reset]:focus{\n  border:1px solid black;\n}\ninput[type=submit]:hover, input[type=button]:hover, input[type=reset]:hover{\n  border:1px solid black;\n}\ninput[type=submit]:active, input[type=button]:active, input[type=reset]:active{\n  background-color:#aaaaaa;\n}\ninput[type=color]{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:block;\n  width:100%;\n  line-height:calc(2em - 1px * 2 - (.25em - 1px) * 2);\n  -webkit-appearance:none;\n     -moz-appearance:none;\n          appearance:none;\n  width:6em;\n}\ninput[type=color]:focus{\n  border:1px solid black;\n}\ninput[type=color]::-moz-placeholder{\n  color:#aaaaaa;\n}\ninput[type=color]::-webkit-input-placeholder{\n  color:#aaaaaa;\n}\ninput[type=color]:-ms-input-placeholder{\n  color:#aaaaaa;\n}\ninput[type=color]:hover{\n  border:1px solid black;\n}\ninput[type=file]{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:inline-block;\n  width:auto;\n  background:#f2f2f2;\n  color:black;\n  cursor:pointer;\n  display:block;\n  width:100%;\n  height:auto;\n  padding:0.75em 0.5em;\n  font-size:12px;\n  line-height:1;\n}\ninput[type=file]:focus{\n  border:1px solid black;\n}\ninput[type=file]:hover{\n  border:1px solid black;\n}\ninput[type=file]:active{\n  background-color:#aaaaaa;\n}\ninput[type=checkbox], input[type=radio]{\n  margin:-0.2em 0.75em 0 0;\n  vertical-align:middle;\n}\n\ntextarea{\n  outline:none;\n  box-sizing:border-box;\n  height:2em;\n  margin:0;\n  padding:calc(.25em - 1px) 0.5em;\n  font-family:inherit;\n  font-size:1em;\n  border:1px solid #aaaaaa;\n  border-radius:2px;\n  background:white;\n  color:black;\n  display:block;\n  width:100%;\n  line-height:calc(2em - 1px * 2 - (.25em - 1px) * 2);\n  -webkit-appearance:none;\n     -moz-appearance:none;\n          appearance:none;\n  height:4.5em;\n  resize:vertical;\n  padding-top:0.5em;\n  padding-bottom:0.5em;\n}\ntextarea:focus{\n  border:1px solid black;\n}\ntextarea::-moz-placeholder{\n  color:#aaaaaa;\n}\ntextarea::-webkit-input-placeholder{\n  color:#aaaaaa;\n}\ntextarea:-ms-input-placeholder{\n  color:#aaaaaa;\n}\n\noutput{\n  display:block;\n}\n\ncode, kbd, var, samp{\n  font-family:Consolas, \"Lucida Console\", Monaco, monospace;\n  font-style:normal;\n}\n\npre{\n  overflow-x:auto;\n  font-size:0.8em;\n  background:linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%) 0 0, linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%) 100% 0;\n  background-attachment:scroll, scroll;\n  background-size:1px 100%, 1px 100%;\n  background-repeat:no-repeat, no-repeat;\n}\npre > code{\n  display:inline-block;\n  overflow-x:visible;\n  box-sizing:border-box;\n  min-width:100%;\n  border-right:3px solid white;\n  border-left:1px solid white;\n}\n\nhr{\n  height:1px;\n  margin:2em 0;\n  border:0;\n  background:#f2f2f2;\n}\n\ndetails{\n  margin:1em 0;\n}\ndetails[open]{\n  padding-bottom:0.5em;\n  border-bottom:1px solid #f2f2f2;\n}\n\nsummary{\n  display:inline-block;\n  font-weight:700;\n  border-bottom:1px dashed;\n  cursor:pointer;\n}\nsummary::-webkit-details-marker{\n  display:none;\n}\n\nnoscript{\n  color:#d00000;\n}\n\n::selection{\n  background:rgba(0, 100, 193, 0.25);\n}";


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
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
var variant_1 = __webpack_require__(/*! ./variant */ "./variant.ts");
var src_1 = __webpack_require__(/*! ../../src */ "../../src/index.ts");
var css_1 = __webpack_require__(/*! ./css */ "./css.ts");
var home = __webpack_require__(/*! ./page/home */ "./page/home.ts");
var lorem = __webpack_require__(/*! ./page/lorem */ "./page/lorem.ts");
var parrot = __webpack_require__(/*! ./page/parrot */ "./page/parrot.ts");
var h = src_1.default();
// Pages
exports.Page = variant_1.variantConstructor();
// Update
function update(msg, model) {
    switch (msg.tag) {
        case 'Hash/change': {
            var page = pageFromHash(msg.hash);
            return __assign({}, model, { page: page });
        }
    }
    throw 'Unimplemented';
}
exports.update = update;
// View
exports.view = h('main', h.nav(h.ul(h.li(h.a('Home', { href: '#/' })), h.li(h.a('Lorem Ipsum', { href: '#/lorem' })), h.li(h.a('Barking parrot', { href: '#/parrot' })))), variant(function (m) { return m.page; }, {
    Home: renderChildren(home.view),
    Lorem: renderChildren(lorem.view),
    Parrot: renderChildren(parrot.view),
}), h('style', { type: 'text/css' }, css_1.default));
function renderChildren(childView) {
    return function (h) { return h.dimap(function (m) { return m.here; }, function (msg) { return function (key) { return ({ tag: '@Children', key: key, msg: msg }); }; })(childView); };
}
function pageFromHash(hash) {
    if (hash === '#/lorem')
        return exports.Page('Lorem', {});
    if (hash === '#/parrot')
        return exports.Page('Parrot', {});
    return exports.Page('Home', {});
}
function dispatch(msg) {
    var next = update(msg, inst.currentModel);
    inst.step(next);
    console.log('msg', msg);
    console.log('model', next);
    console.log('-----------');
}
var init = { page: pageFromHash(location.hash) };
var inst = src_1.attach(exports.view, document.body, init, dispatch);
window.onpopstate = function () {
    dispatch({ tag: 'Hash/change', hash: location.hash });
};
function variant(discriminator, cases) {
    var cases_ = {};
    var _loop_1 = function (k) {
        cases_[k] = src_1.dimap(function (parent) { return ({ parent: parent, here: discriminator(parent)[1] }); }, (function (a) { return a(k); }))(cases[k](h));
    };
    for (var k in cases) {
        _loop_1(k);
    }
    ;
    return src_1.discriminate(function (m) { return discriminator(m)[0]; }, cases_);
}
exports.variant = variant;


/***/ }),

/***/ "./page/home.ts":
/*!**********************!*\
  !*** ./page/home.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../../src */ "../../src/index.ts");
var h = src_1.default();
// View
exports.view = h.div(h.h2('Home'), h.p("This is an example of an SPA with simple synchronous routing. It uses library ", h.a('typescript-sdom', { href: "https://github.com/lagunoff/typescript-sdom" }), " to display its UI, and shows ", h.a(h.code("variant"), { href: 'https://github.com/lagunoff/typescript-sdom/blob/9a717bad1ffe0de4403851296e5d7fbde81b5287/examples/variants/index.ts#L64' }), " helper is used to implement basic routing."), h.h2("What is a ", h.code('Variant?')), h.p(h.code('Variant'), ' is another union type, similar to which ', h.a('typescript already has', { href: 'https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html' }), '. ', 'Variants are more convenient in certain situations because they utilize record types in their definitions. Record types can be modified through ', h.a("Mapped types. ", { href: 'https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types' })), h.p('In runtime variants are represented by a pair of a tag and the corresponding contents.'));


/***/ }),

/***/ "./page/lorem.ts":
/*!***********************!*\
  !*** ./page/lorem.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../../src */ "../../src/index.ts");
var h = src_1.default();
// View
exports.view = h.div(h.h2("What is Lorem Ipsum?"), h.p("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."), h.h2("Why do we use it?"), h.p("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."), h.h2("Where does it come from?"), h.p("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."), h.p("The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."), h.h2("Where can I get some?"), h.p("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."));


/***/ }),

/***/ "./page/parrot.ts":
/*!************************!*\
  !*** ./page/parrot.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../../src */ "../../src/index.ts");
var h = src_1.default();
// Twitter embedding
var innerHTML = "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">what kind of dog is this? <a href=\"https://t.co/e6Jm2vUasm\">pic.twitter.com/e6Jm2vUasm</a></p>&mdash; cockatoos (@cockatoos) <a href=\"https://twitter.com/cockatoos/status/1132618815014133760?ref_src=twsrc%5Etfw\">May 26, 2019</a></blockquote>";
// View
exports.view = h.div(
// @ts-ignore
{ innerHTML: innerHTML }, h('script', { async: true, src: "https://platform.twitter.com/widgets.js", charset: "utf-8" }));


/***/ }),

/***/ "./variant.ts":
/*!********************!*\
  !*** ./variant.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Alternative sum types for typescript. Variants may be more convenient than unions
// because they easier to manipulate (see `Mapped types`)
// - [https://www.typescriptlang.org/docs/handbook/advanced-types.html](Mapped types)
// - [https://github.com/natefaubion/purescript-variant]
Object.defineProperty(exports, "__esModule", { value: true });
var variantSymbol = Symbol('Variant');
// Variant constructor
function variant(key, value) {
    return [key, value];
}
exports.variant = variant;
function variantConstructor() {
    return variant;
}
exports.variantConstructor = variantConstructor;
// Pattern-match on `Variant<T>`
function match(v) {
    return function () {
        if (arguments.length === 1)
            return arguments[0][v[0]](v[1]);
        return v[0] in arguments[1] ? arguments[1][v[0]](v[1]) : arguments[0];
    };
}
exports.match = match;
// Try to match tag value with `key`, return `T[K]` or `undefined` if matching failed
function match1(v, key) {
    return v[0] === key ? v[1] : undefined;
}
exports.match1 = match1;


/***/ })

/******/ });