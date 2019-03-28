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

/***/ "../../src/incremental.ts":
/*!*********************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/incremental.ts ***!
  \*********************************************************/
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
var patch_1 = __webpack_require__(/*! ./patch */ "../../src/patch.ts");
var types_1 = __webpack_require__(/*! ./types */ "../../src/types.ts");
var Jet = /** @class */ (function () {
    function Jet(_position, _velocity) {
        this._position = _position;
        this._velocity = _velocity;
    }
    Jet.prototype.key = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var velocity = keys.reduce(function (acc, key) { return keyPatch(acc, key); }, this._velocity);
        var position = keys.reduce(function (acc, key) { return acc[key]; }, this._position);
        return new Jet(position, velocity);
    };
    Jet.of = of;
    Jet.fn = fn;
    return Jet;
}());
exports.Jet = Jet;
function keyPatch(patch, key) {
    if (patch.tag === 'batch')
        return { tag: 'batch', patches: patch.patches.map(function (p) { return keyPatch(p, key); }) };
    return patch.tag === 'key' && patch.key === key ? patch.patch
        : patch.tag === 'replace' ? { tag: 'replace', prev: patch.prev[key], next: patch.next[key] }
            : patch_1.noop;
}
function merge() {
    var jets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        jets[_i] = arguments[_i];
    }
    return jets.reduce(function (acc, jet) { return merge2(acc, jet); });
}
exports.merge = merge;
function merge2(a, b) {
    var position = __assign({}, a._position, b._position);
    var velocity = mergePatches(a._position, b._position, position, a._velocity, b._velocity);
    return new Jet(position, velocity);
}
exports.merge2 = merge2;
function mergePatches(a, b, prev, pa, pb) {
    if (pa.tag === 'replace' || pb.tag === 'replace') {
        var anext = patch_1.applyPatch(a, pa, true);
        var bnext = patch_1.applyPatch(b, pb, true);
        var next = __assign({}, anext, bnext);
        patch_1.unapplyPatch(anext, pa, true);
        patch_1.unapplyPatch(bnext, pb, true);
        return { tag: 'replace', prev: prev, next: next };
    }
    if (pa.tag === 'array-splice' || pa.tag === 'array-swap' || pb.tag === 'array-splice' || pb.tag === 'array-swap') {
        throw new Error('found wrong type of patch, array-splice and array-swap cannot be applied to objects');
    }
    if (pa.tag === 'key') {
        if (pa.key in b)
            return pb;
        return { tag: 'batch', patches: [pa, pb] };
    }
    if (pa.tag === 'batch') {
        return { tag: 'batch', patches: pa.patches.map(function (pa2) { return mergePatches(a, b, prev, pa2, patch_1.noop); }).concat([pb]) };
    }
    return types_1.absurd(pa);
}
exports.mergePatches = mergePatches;
function of(value) {
    return new Jet(value, patch_1.noop);
}
function fn(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var pArgs = args.map(function (jet) { return jet._position; });
        var position = fn.apply(void 0, pArgs);
        pArgs.forEach(function (arg, idx) { return pArgs[idx] = patch_1.applyPatch(arg, args[idx]._velocity, true); });
        var nextPosition = fn.apply(void 0, pArgs);
        var velocity = patch_1.diff(position, nextPosition);
        pArgs.forEach(function (arg, idx) { return pArgs[idx] = patch_1.unapplyPatch(arg, args[idx]._velocity, true); });
        return new Jet(position, velocity);
    };
}
exports.fn = fn;
function record(fields) {
    var keys = Object.keys(fields);
    var position = keys.reduce(function (acc, k) { return (acc[k] = fields[k]._position, acc); }, {});
    var velocity = { tag: 'batch', patches: keys.map(function (key) { return ({ tag: 'key', key: key, patch: fields[key]._velocity }); }) };
    return new Jet(position, velocity);
}
exports.record = record;
exports.eq = fn(function (a, b) { return a === b; });
exports.neg = fn(function (a) { return !a; });
exports.if_then_else = fn(function (cond, a, b) { return cond ? a : b; });


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
__export(__webpack_require__(/*! ./sdom */ "../../src/sdom.ts"));
__export(__webpack_require__(/*! ./patch */ "../../src/patch.ts"));
__export(__webpack_require__(/*! ./incremental */ "../../src/incremental.ts"));


/***/ }),

/***/ "../../src/patch.ts":
/*!***************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/patch.ts ***!
  \***************************************************/
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
var types_1 = __webpack_require__(/*! ./types */ "../../src/types.ts");
// Calculate difference between two values
function diff(prev, next) {
    if (prev === next)
        return exports.noop;
    // TODO: do the diffing
    return { tag: 'replace', prev: prev, next: next };
}
exports.diff = diff;
// Coerce `RawPatch<T>` to `Patch<T>`
function preparePatch(value, patch) {
    if (Array.isArray(patch)) {
        return { tag: 'batch', patches: patch.map(function (p) { return preparePatch(value, p); }) };
    }
    if ('$batch' in patch) {
        return { tag: 'batch', patches: patch.$batch.map(function (p) { return preparePatch(value, p); }) };
    }
    if ('$at' in patch) {
        var keys = Array.isArray(patch.$at) ? patch.$at : [patch.$at];
        var v_1 = keys.reduce(function (acc, k) { return acc[k]; }, value);
        return keys.reduceRight(function (patch, key) { return ({ tag: 'key', key: key, patch: patch }); }, preparePatch(v_1, patch.patch));
    }
    if ('$replace' in patch) {
        return { tag: 'replace', prev: value, next: patch.$replace };
    }
    if ('$patch' in patch) {
        return { tag: 'batch', patches: Object.keys(patch.$patch).map(function (key) { return ({ tag: 'key', key: key, patch: { tag: 'replace', prev: value[key], next: patch.$patch[key] } }); }) };
    }
    var v = value;
    if ('$splice' in patch) {
        var _a = patch.$splice, index = _a.index, insert = _a.insert;
        var remove = v.slice(patch.$splice.index, patch.$splice.remove);
        return { tag: 'array-splice', index: index, remove: remove, insert: insert };
    }
    if ('$swap' in patch) {
        var _b = patch.$swap, firstIdx = _b.first, secondIdx = _b.second;
        return { tag: 'array-swap', first: v[firstIdx], firstIdx: firstIdx, second: v[secondIdx], secondIdx: secondIdx };
    }
    if ('$push' in patch) {
        var insert = Array.isArray(patch.$push) ? patch.$push : [patch.$push];
        var remove = [];
        var index = v.length;
        return { tag: 'array-splice', index: index, remove: remove, insert: insert };
    }
    if ('$unshift' in patch) {
        var insert = Array.isArray(patch.$unshift) ? patch.$unshift : [patch.$unshift];
        var remove = [];
        return { tag: 'array-splice', index: 0, remove: remove, insert: insert };
    }
    if ('$remove' in patch) {
        var remove = v.slice(patch.$remove, patch.$remove + 1);
        var insert = [];
        return { tag: 'array-splice', index: patch.$remove, remove: remove, insert: insert };
    }
    return types_1.absurd(patch);
}
exports.preparePatch = preparePatch;
exports.noop = { tag: 'batch', patches: [] };
// Get new version of `value` or mutate data in-place if `destructively` is true
function applyPatch(value, patch, destructively) {
    if (destructively === void 0) { destructively = false; }
    var _a;
    if (patch.tag === 'key') {
        if (destructively) {
            value[patch.key] = applyPatch(value[patch.key], patch.patch, destructively);
            return value;
        }
        else {
            if (Array.isArray(value)) {
                var output = value.slice();
                output.splice(patch.key, 1, applyPatch(value[patch.key], patch.patch, destructively));
                return output;
            }
            return __assign({}, value, (_a = {}, _a[patch.key] = applyPatch(value[patch.key], patch.patch, destructively), _a));
        }
    }
    if (patch.tag === 'batch') {
        return patch.patches.reduce(function (acc, p) { return applyPatch(acc, p, destructively); }, value);
    }
    if (patch.tag === 'replace') {
        return patch.next;
    }
    var v = value;
    if (patch.tag === 'array-splice') {
        var _b = patch, index = _b.index, insert = _b.insert, remove = _b.remove;
        if (remove.length !== 0 && v[index] !== remove[0]) {
            return v;
        }
        if (insert.length !== 0 && v[index] === insert[0]) {
            return v;
        }
        if (destructively) {
            v.splice.apply(v, [index, remove.length].concat(insert));
            return v;
        }
        else {
            var nextValue = v.slice(0);
            nextValue.splice.apply(nextValue, [index, remove.length].concat(insert));
            return nextValue;
        }
    }
    if (patch.tag === 'array-swap') {
        if (v[patch.firstIdx] === patch.second)
            return v;
        if (destructively) {
            var tmp = v[patch.firstIdx];
            v[patch.firstIdx] = v[patch.secondIdx];
            v[patch.secondIdx] = tmp;
            return v;
        }
        else {
            var nextValue = v.slice(0);
            nextValue[patch.firstIdx] = value[patch.secondIdx];
            nextValue[patch.secondIdx] = value[patch.firstIdx];
            return nextValue;
        }
    }
    return types_1.absurd(patch);
}
exports.applyPatch = applyPatch;
// Inverse of `applyPatch`
function unapplyPatch(value, patch, destructively) {
    if (destructively === void 0) { destructively = false; }
    return applyPatch(value, inverse(patch), destructively);
}
exports.unapplyPatch = unapplyPatch;
// Make patch that does the opposite of `patch`
function inverse(patch) {
    if (patch.tag === 'key') {
        return { tag: 'key', key: patch.key, patch: inverse(patch.patch) };
    }
    if (patch.tag === 'batch') {
        return { tag: 'batch', patches: patch.patches.map(inverse).reverse() };
    }
    if (patch.tag === 'replace') {
        var prev = patch.prev, next = patch.next;
        return { tag: 'replace', next: prev, prev: next };
    }
    if (patch.tag === 'array-splice') {
        var index = patch.index, insert = patch.insert, remove = patch.remove;
        return { tag: 'array-splice', index: index, remove: insert, insert: remove };
    }
    if (patch.tag === 'array-swap') {
        var first = patch.first, second = patch.second, firstIdx = patch.firstIdx, secondIdx = patch.secondIdx;
        return { tag: 'array-swap', first: second, firstIdx: secondIdx, second: first, secondIdx: firstIdx };
    }
    return types_1.absurd(patch);
}
exports.inverse = inverse;
// Check if `patch` does nothing
function isNoop(patch) {
    if (patch.tag === 'batch')
        return patch.patches.reduce(function (acc, p) { return acc && isNoop(p); }, true);
    if (patch.tag === 'key')
        return isNoop(patch.patch);
    return false;
}
exports.isNoop = isNoop;


/***/ }),

/***/ "../../src/sdom.ts":
/*!**************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/sdom.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var types_1 = __webpack_require__(/*! ./types */ "../../src/types.ts");
var incremental_1 = __webpack_require__(/*! ./incremental */ "../../src/incremental.ts");
var patch_1 = __webpack_require__(/*! ./patch */ "../../src/patch.ts");
var NODE_DATA = '__SDOM_CUSTOM_DATA__';
function prepareSDOM(raw) {
    if (raw instanceof SDOMBase)
        return raw;
    return new SDOMText(raw);
}
exports.prepareSDOM = prepareSDOM;
// Base class is needed for instance method in `SDOM`
var SDOMBase = /** @class */ (function () {
    function SDOMBase() {
    }
    SDOMBase.prototype.map = function (proj) {
        return new SDOMMap(this, proj);
    };
    SDOMBase.prototype.comap = function (coproj) {
        return new SDOMComap(this, coproj);
    };
    SDOMBase.prototype.dimap = function (coproj, proj) {
        return new SDOMMap(new SDOMComap(this, coproj), proj);
    };
    return SDOMBase;
}());
exports.SDOMBase = SDOMBase;
var SDOMElement = /** @class */ (function (_super) {
    __extends(SDOMElement, _super);
    function SDOMElement(_name, _attributes, _childs) {
        var _this = _super.call(this) || this;
        _this._name = _name;
        _this._attributes = _attributes;
        _this._childs = _childs;
        return _this;
    }
    SDOMElement.prototype.attrs = function (attrs) {
        for (var k in attrs) {
            if (!isAttribute(attrs[k]))
                attrs[k] = new SDOMAttr(attrs[k]);
        }
        Object.assign(this._attributes, attrs);
        return this;
    };
    SDOMElement.prototype.props = function (attrs) {
        for (var k in attrs) {
            if (!isAttribute(attrs[k]))
                attrs[k] = new SDOMProp(attrs[k]);
        }
        Object.assign(this._attributes, attrs);
        return this;
    };
    SDOMElement.prototype.on = function (attrs) {
        for (var k in attrs) {
            attrs[k] = new SDOMEvent(attrs[k]);
        }
        Object.assign(this._attributes, attrs);
        return this;
    };
    SDOMElement.prototype.childs = function () {
        var childs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childs[_i] = arguments[_i];
        }
        this._childs = childs.map(prepareSDOM);
        return this;
    };
    return SDOMElement;
}(SDOMBase));
exports.SDOMElement = SDOMElement;
function nodeIndex(el) {
    var iter = el;
    var i = 0;
    while ((iter = iter.previousSibling) != null)
        i++;
    return i;
}
exports.nodeIndex = nodeIndex;
var SDOMText = /** @class */ (function (_super) {
    __extends(SDOMText, _super);
    function SDOMText(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    return SDOMText;
}(SDOMBase));
exports.SDOMText = SDOMText;
var SDOMDiscriminate = /** @class */ (function (_super) {
    __extends(SDOMDiscriminate, _super);
    function SDOMDiscriminate(_discriminator, _tags) {
        var _this = _super.call(this) || this;
        _this._discriminator = _discriminator;
        _this._tags = _tags;
        return _this;
    }
    return SDOMDiscriminate;
}(SDOMBase));
exports.SDOMDiscriminate = SDOMDiscriminate;
var SDOMArray = /** @class */ (function (_super) {
    __extends(SDOMArray, _super);
    function SDOMArray(_discriminator, _item, _name, _attributes) {
        var _this = _super.call(this) || this;
        _this._discriminator = _discriminator;
        _this._item = _item;
        _this._name = _name;
        _this._attributes = _attributes;
        return _this;
    }
    return SDOMArray;
}(SDOMBase));
exports.SDOMArray = SDOMArray;
var SDOMPick = /** @class */ (function (_super) {
    __extends(SDOMPick, _super);
    function SDOMPick(_keys, _sdom) {
        var _this = _super.call(this) || this;
        _this._keys = _keys;
        _this._sdom = _sdom;
        return _this;
    }
    return SDOMPick;
}(SDOMBase));
exports.SDOMPick = SDOMPick;
var SDOMCustom = /** @class */ (function (_super) {
    __extends(SDOMCustom, _super);
    function SDOMCustom(_create, _actuate) {
        var _this = _super.call(this) || this;
        _this._create = _create;
        _this._actuate = _actuate;
        return _this;
    }
    return SDOMCustom;
}(SDOMBase));
exports.SDOMCustom = SDOMCustom;
var SDOMMap = /** @class */ (function (_super) {
    __extends(SDOMMap, _super);
    function SDOMMap(_value, _proj) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._proj = _proj;
        return _this;
    }
    return SDOMMap;
}(SDOMBase));
var SDOMComap = /** @class */ (function (_super) {
    __extends(SDOMComap, _super);
    function SDOMComap(_value, _coproj) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this._coproj = _coproj;
        return _this;
    }
    return SDOMComap;
}(SDOMBase));
var SDOMAttr = /** @class */ (function () {
    function SDOMAttr(_value) {
        this._value = _value;
    }
    return SDOMAttr;
}());
exports.SDOMAttr = SDOMAttr;
var SDOMProp = /** @class */ (function () {
    function SDOMProp(_value) {
        this._value = _value;
    }
    return SDOMProp;
}());
exports.SDOMProp = SDOMProp;
var SDOMEvent = /** @class */ (function () {
    function SDOMEvent(_listener) {
        this._listener = _listener;
    }
    return SDOMEvent;
}());
exports.SDOMEvent = SDOMEvent;
function isAttribute(attr) {
    return attr instanceof SDOMAttr || attr instanceof SDOMProp || attr instanceof SDOMEvent;
}
function h() {
    // @ts-ignore
    var _a = arguments.length === 1 ? [arguments[0], {}, []]
        : (arguments[1] && arguments[1].constructor === Object) ? [arguments[0], arguments[1], Array.prototype.slice.call(arguments, 2)]
            : [arguments[0], {}, Array.prototype.slice.call(arguments, 1)], name = _a[0], attrs = _a[1], childs = _a[2];
    return new SDOMElement(name, prepareAttrs(name, attrs), (Array.isArray(childs) ? childs.map(prepareSDOM) : [prepareSDOM(childs)]));
    function prepareAttrs(name, attrs) {
        for (var k in attrs) {
            if (!isAttribute(attrs[k]))
                attrs[k] = new SDOMAttr(attrs[k]);
        }
        if (name === 'a' && !('href' in attrs))
            return __assign({}, attrs, { href: new SDOMAttr('javascript://void 0') });
        return attrs;
    }
}
exports.h = h;
(function (h) {
    h.div = h.bind(void 0, 'div');
    h.span = h.bind(void 0, 'span');
    h.button = h.bind(void 0, 'button');
    h.p = h.bind(void 0, 'p');
    h.h1 = h.bind(void 0, 'h1');
    h.h2 = h.bind(void 0, 'h2');
    h.h3 = h.bind(void 0, 'h3');
    h.input = function (attrs) { return h('input', attrs); };
    h.img = function (attrs) { return h('img', attrs); };
    h.label = h.bind(void 0, 'label');
    h.ul = h.bind(void 0, 'ul');
    h.li = h.bind(void 0, 'li');
    h.a = h.bind(void 0, 'a');
    h.tr = h.bind(void 0, 'tr');
    h.td = h.bind(void 0, 'td');
    h.table = h.bind(void 0, 'table');
    h.tbody = h.bind(void 0, 'tbody');
    h.thead = h.bind(void 0, 'thead');
    h.th = h.bind(void 0, 'th');
    h.section = h.bind(void 0, 'section');
    h.header = h.bind(void 0, 'header');
    h.footer = h.bind(void 0, 'footer');
})(h = exports.h || (exports.h = {}));
function text(value) {
    return new SDOMText(value);
}
exports.text = text;
function discriminate() {
    var discriminators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        discriminators[_i] = arguments[_i];
    }
    return function (tags) { return new SDOMDiscriminate(discriminators, tags); };
}
exports.discriminate = discriminate;
function array() {
    // @ts-ignore
    var _a = arguments.length === 2 ? [arguments[0], 'div', {}, arguments[1]]
        : arguments.length === 3 ? [arguments[0], arguments[1], {}, arguments[2]]
            : arguments, discriminator = _a[0], name = _a[1], attributes = _a[2], child = _a[3];
    return new SDOMArray(discriminator, child, name, prepareAttrs(name, attributes));
    function prepareAttrs(name, attrs) {
        for (var k in attrs) {
            if (!isAttribute(attrs[k]))
                attrs[k] = new SDOMAttr(attrs[k]);
        }
        if (name === 'a' && !('href' in attrs))
            return __assign({}, attrs, { href: new SDOMAttr('javascript://void 0') });
        return attrs;
    }
}
exports.array = array;
function attr(value) {
    return new SDOMAttr(value);
}
exports.attr = attr;
function prop(value) {
    return new SDOMProp(value);
}
exports.prop = prop;
function event(listener) {
    return new SDOMEvent(listener);
}
exports.event = event;
function create(sdom, getModel) {
    if (sdom instanceof SDOMElement) {
        var el_1 = document.createElement(sdom._name);
        Object.keys(sdom._attributes).forEach(function (k) { return applyAttribute(k, sdom._attributes[k], el_1, incremental_1.Jet.of(getModel()), true); });
        sdom._childs.forEach(function (ch) { return el_1.appendChild(create(ch, getModel)); });
        return el_1;
    }
    if (sdom instanceof SDOMText) {
        var text_1 = typeof (sdom._value) === 'function' ? sdom._value(getModel()) : sdom._value;
        var el = document.createTextNode(String(text_1));
        return el;
    }
    if (sdom instanceof SDOMDiscriminate) {
        var ch = sdom._tags[sdom._discriminator.reduce(function (acc, k) { return acc[k]; }, getModel())];
        var el = create(ch, getModel);
        if (el instanceof Text)
            throw new Error("elements of discriminate should be DOM nodes, not text");
        el.dataset.tag = sdom._discriminator.reduce(function (acc, k) { return acc[k]; }, getModel());
        return el;
    }
    if (sdom instanceof SDOMArray) {
        var array_1 = getModel()[sdom._discriminator];
        var el_2 = document.createElement(sdom._name);
        Object.keys(sdom._attributes).forEach(function (k) { return applyAttribute(k, sdom._attributes[k], el_2, incremental_1.Jet.of(getModel()), true); });
        var getChildModel_1 = function (idx) { return function () { return ({ item: getModel()[sdom._discriminator][idx], model: getModel() }); }; };
        array_1.forEach(function (item, idx) {
            var ch = create(sdom._item, getChildModel_1(idx));
            el_2.appendChild(ch);
        });
        return el_2;
    }
    if (sdom instanceof SDOMPick) {
        var el = create(sdom._sdom, getModel);
        return el;
    }
    if (sdom instanceof SDOMCustom) {
        return sdom._create(getModel);
    }
    if (sdom instanceof SDOMMap) {
        var el = create(sdom._value, getModel);
        el[NODE_DATA] = { proj: sdom._proj, getModel: getModel };
        return el;
    }
    if (sdom instanceof SDOMComap) {
        var _getModel = function () { return sdom._coproj(new incremental_1.Jet(getModel(), patch_1.noop))._position; };
        var el = create(sdom._value, _getModel);
        return el;
    }
    return types_1.absurd(sdom);
}
exports.create = create;
function actuate(el, sdom, jet) {
    if (jet._velocity.tag === 'batch') {
        var model = jet._position;
        var elem = el;
        for (var _i = 0, _a = jet._velocity.patches; _i < _a.length; _i++) {
            var p = _a[_i];
            elem = actuate(elem, sdom, new incremental_1.Jet(model, p));
            model = patch_1.applyPatch(model, p, true);
        }
        return elem;
    }
    if (sdom instanceof SDOMElement) {
        if (!(el instanceof HTMLElement))
            throw new Error('actuate: got invalid DOM node');
        Object.keys(sdom._attributes).forEach(function (k) { return applyAttribute(k, sdom._attributes[k], el, jet, false); });
        sdom._childs.forEach(function (s, idx) {
            var ch = el.childNodes[idx];
            var nextCh = actuate(ch, s, jet);
            if (ch !== nextCh)
                el.replaceChild(nextCh, ch);
        });
        return el;
    }
    if (sdom instanceof SDOMText) {
        if (typeof (sdom._value) === 'function') {
            if (!(el instanceof Text))
                throw new Error('actuate: got invalid DOM node');
            var model = patch_1.applyPatch(jet._position, jet._velocity, true);
            var next = sdom._value(model);
            if (el.nodeValue !== next)
                el.nodeValue = String(next);
            patch_1.unapplyPatch(model, jet._velocity, true);
            return el;
        }
        return el;
    }
    if (sdom instanceof SDOMDiscriminate) {
        if (el instanceof Text)
            throw new Error("elements of discriminate should be DOM nodes, not text");
        if (el.dataset.tag !== sdom._discriminator.reduce(function (acc, k) { return acc[k]; }, jet._position)) {
            return create(sdom, function () { return jet._position; });
        }
        return actuate(el, sdom._tags[sdom._discriminator.reduce(function (acc, k) { return acc[k]; }, jet._position)], jet);
    }
    if (sdom instanceof SDOMArray) {
        var array_2 = jet._position[sdom._discriminator];
        if ((jet._velocity.tag !== 'key') || (jet._velocity.key !== sdom._discriminator)) {
            var getChildJet_1 = function (idx) { return new incremental_1.Jet({ item: jet._position[sdom._discriminator][idx], model: jet._position, idx: idx }, { tag: 'key', key: 'model', patch: jet._velocity }); };
            array_2.forEach(function (item, idx) {
                var ch = el.childNodes[idx];
                var nextCh = actuate(ch, sdom._item, getChildJet_1(idx));
                if (ch !== nextCh) {
                    el.replaceChild(nextCh, ch);
                }
            });
            return el;
        }
        ;
        return actuateArray(el, sdom, jet._position, new incremental_1.Jet(array_2, jet._velocity.patch));
    }
    if (sdom instanceof SDOMPick) {
        if (jet._velocity.tag === 'key') {
            if (sdom._keys.indexOf(jet._velocity.key) === -1)
                return el;
        }
        return actuate(el, sdom._sdom, jet);
    }
    if (sdom instanceof SDOMCustom) {
        return sdom._actuate(el, jet);
    }
    if (sdom instanceof SDOMMap) {
        var nextEl = actuate(el, sdom._value, jet);
        if (nextEl !== el) {
            nextEl[NODE_DATA] = { proj: sdom._proj, jet: jet };
        }
        return nextEl;
    }
    if (sdom instanceof SDOMComap) {
        var nextEl = actuate(el, sdom._value, sdom._coproj(jet));
        return nextEl;
    }
    return types_1.absurd(sdom);
}
exports.actuate = actuate;
function actuateArray(el, sdom, parent, jet) {
    var array = jet._position;
    var p = jet._velocity;
    if (p.tag === 'array-splice') {
        var _a = p, index_1 = _a.index, insert_1 = _a.insert, remove_1 = _a.remove;
        for (var i = remove_1.length - 1; i >= 0; i--) {
            var ch = el.childNodes[index_1 + i];
            el.removeChild(ch);
        }
        var getIdx_1 = function (idx) { return idx < index_1 ? array[idx] : idx >= index_1 && idx < index_1 + insert_1.length ? insert_1[idx - index_1] : array[idx - insert_1.length + remove_1.length]; };
        var getChildModel_2 = function (idx) { return function () { return ({ item: getIdx_1(idx), model: parent, idx: idx }); }; };
        insert_1.forEach(function (item, idx) {
            var ch = create(sdom._item, getChildModel_2(index_1 + idx));
            el.insertBefore(ch, el.childNodes[index_1 + idx] || null);
        });
        return el;
    }
    if (p.tag === 'key') {
        var ch = el.childNodes[p.key];
        var getChildJet = function (idx) { return new incremental_1.Jet({ item: parent[sdom._discriminator][idx], model: parent, idx: idx }, { tag: 'key', key: 'item', patch: p.patch }); };
        var nextCh = actuate(ch, sdom._item, getChildJet(p.key));
        if (ch !== nextCh)
            el.replaceChild(nextCh, ch);
        return el;
    }
    if (p.tag === 'array-swap') {
        var ch1 = el.childNodes[p.first];
        var ch2 = el.childNodes[p.second];
        el.removeChild(ch2);
        el.insertBefore(ch2, ch1);
        el.removeChild(ch1);
        el.insertBefore(ch1, el.childNodes[p.second] || null);
        return el;
    }
    if (p.tag === 'replace') {
        return create(sdom, function () { return parent; });
    }
    if (p.tag === 'batch') {
        var model = jet._position;
        var elem = el;
        for (var _i = 0, _b = p.patches; _i < _b.length; _i++) {
            var patch = _b[_i];
            elem = actuateArray(elem, sdom, parent, new incremental_1.Jet(model, patch));
            model = patch_1.applyPatch(model, patch, true);
        }
        return elem;
    }
    return types_1.absurd(p);
}
function applyAttribute(name, sdomAttr, el, jet, create) {
    if (sdomAttr instanceof SDOMAttr) {
        var model = patch_1.applyPatch(jet._position, jet._velocity, true);
        var next = typeof (sdomAttr._value) === 'function' ? sdomAttr._value(model) : sdomAttr._value;
        if (!el.hasAttribute(name)) {
            el.setAttribute(name, String(next));
            patch_1.unapplyPatch(model, jet._velocity, true);
            return;
        }
        patch_1.unapplyPatch(model, jet._velocity, true);
        // Either nothing changes or the new value is the same as previous
        if (patch_1.isNoop(jet._velocity) || (el.getAttribute(name) == next))
            return;
        el.setAttribute(name, String(next));
        return;
    }
    if (sdomAttr instanceof SDOMProp) {
        var model = patch_1.applyPatch(jet._position, jet._velocity, true);
        var next = typeof (sdomAttr._value) === 'function' ? sdomAttr._value(model) : sdomAttr._value;
        patch_1.unapplyPatch(model, jet._velocity, true);
        // Either nothing changes or the new value is the same as previous
        if ((el[name] == next))
            return;
        el[name] = next;
        return;
    }
    if (!create)
        return;
    if (sdomAttr instanceof SDOMEvent) {
        el.addEventListener(name, createEventListener(function () { return jet._position; }, sdomAttr._listener));
        return;
    }
    return;
}
function createEventListener(getModel, cb) {
    return function (e) {
        var iter = e.target;
        var action = void 0;
        var actionInitialized = false;
        for (; iter; iter = iter.parentElement) {
            var nodeData = iter[NODE_DATA];
            if (!nodeData)
                continue;
            if ('getModel' in nodeData)
                getModel = nodeData.getModel;
            if (!actionInitialized) {
                action = cb(e, getModel());
                actionInitialized = true;
                if (action === void 0)
                    return;
            }
            if (actionInitialized && ('proj' in nodeData)) {
                action = nodeData.proj(action, getModel(), iter);
            }
        }
    };
}


/***/ }),

/***/ "../../src/types.ts":
/*!***************************************************!*\
  !*** /home/vlad/job/typescript-sdom/src/types.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/** Don't coerce string literals to `string` type */
function literal(x) {
    return x;
}
exports.literal = literal;
function absurd(x) {
    throw new Error('absurd: unreachable code');
}
exports.absurd = absurd;
/** Helper for totality checking */
function ensure(x) {
}
exports.ensure = ensure;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #4d4d4d;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n:focus {\n\toutline: 0;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -155px;\n\twidth: 100%;\n\tfont-size: 100px;\n\tfont-weight: 100;\n\ttext-align: center;\n\tcolor: rgba(175, 47, 47, 0.15);\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tborder: 0;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\twidth: 1px;\n\theight: 1px;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n\tright: 100%;\n\tbottom: 100%;\n}\n\n.toggle-all + label {\n\twidth: 60px;\n\theight: 34px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -52px;\n\tleft: -13px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all + label:before {\n\tcontent: '❯';\n\tfont-size: 22px;\n\tcolor: #e6e6e6;\n\tpadding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #737373;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: calc(100% - 43px);\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n}\n\n.todo-list li.completed label {\n\tcolor: #d9d9d9;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #cc9a9a;\n\tmargin-bottom: 11px;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n\tcolor: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '×';\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tcolor: #777;\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n\tborder-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 20px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #bfbfbf;\n\tfont-size: 10px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/todomvc-app-css/index.css":
/*!************************************************!*\
  !*** ./node_modules/todomvc-app-css/index.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../../src */ "../../src/index.ts");
var I = __webpack_require__(/*! ../../../src/incremental */ "../../src/incremental.ts");
var todo = __webpack_require__(/*! ./todo */ "./src/todo.ts");
__webpack_require__(/*! ../node_modules/todomvc-app-css/index.css */ "./node_modules/todomvc-app-css/index.css");
// Update
function update(action, model) {
    switch (action.tag) {
        case 'Edit': return { $patch: { title: action.value } };
        case 'ToggleAll': {
            var checked_1 = allChecked(model);
            return model.todos.map(function (_, idx) { return ({ $at: ['todos', idx], patch: { $patch: { completed: !checked_1 } } }); });
        }
        case 'ClearCompleted': {
            return { $at: 'todos', patch: { $batch: model.todos.reduceRight(function (acc, todo, idx) { return (todo.completed && acc.push({ $remove: idx }), acc); }, []) } };
        }
        case 'KeyDown': {
            if (action.event.keyCode === KEY_ENTER && model.title)
                return [
                    { $patch: { title: '' } },
                    { $at: 'todos', patch: { $push: todo.init(model.title) } },
                ];
            return [];
        }
        case 'HashChange': {
            if (action.hash === '#/completed')
                return { $patch: { filter: 'completed' } };
            if (action.hash === '#/active')
                return { $patch: { filter: 'active' } };
            return { $patch: { filter: 'all' } };
        }
        case '@Todo':
            {
                if (action.action.tag === 'Destroy')
                    return { $at: 'todos', patch: { $remove: action.idx } };
                if (action.action.tag === 'Editing/commit' && model.todos[action.idx].editing === '')
                    return { $at: 'todos', patch: { $remove: action.idx } };
                return { $at: ['todos', action.idx], patch: todo.update(action.action, model.todos[action.idx]) };
            }
            ;
    }
}
exports.update = update;
// View
exports.view = src_1.h.div(src_1.h.section({ class: 'todoapp' }).childs(src_1.h.header({ class: 'header' }).childs(src_1.h.h1('Todos'), src_1.h.input({ class: 'new-todo', placeholder: 'What needs to be done?', autofocus: true }).props({ value: function (m) { return m.title; } }).on({
    input: function (e) { return ({ tag: 'Edit', value: e['target']['value'] }); },
    keydown: function (event) { return ({ tag: 'KeyDown', event: event }); },
})), src_1.h.section({ class: 'main' }).childs(src_1.h.input({ id: 'toggle-all', class: 'toggle-all', type: 'checkbox' }).props({ checked: allChecked }).on({
    click: function () { return ({ tag: 'ToggleAll' }); },
}), src_1.h.label('Mark all as complete').attrs({ for: 'toggle-all' }), 
// @ts-ignore
src_1.array('todos', 'ul', { class: 'todo-list' }, todo.view.dimap(projectItem, function (action, model, el) { return ({ tag: '@Todo', action: action, idx: src_1.nodeIndex(el) }); })), src_1.h.footer({ class: 'footer' }).childs(src_1.h.span({ class: 'todo-count' }).childs(src_1.h('strong', countItemsLeft), ' items left'), src_1.h.ul({ class: 'filters' }).childs(src_1.h.li(src_1.h.a('All').attrs({ href: '#/', class: function (m) { return m.filter === 'all' ? 'selected' : ''; } })), src_1.h.li(src_1.h.a('Active').attrs({ href: '#/active', class: function (m) { return m.filter === 'active' ? 'selected' : ''; } })), src_1.h.li(src_1.h.a('Completed').attrs({ href: '#/completed', class: function (m) { return m.filter === 'completed' ? 'selected' : ''; } }))), src_1.h.button("Clear completed").attrs({ class: "clear-completed" }).on({
    click: function () { return ({ tag: 'ClearCompleted' }); }
})))), src_1.h.footer({ class: 'info' }).childs(src_1.h.p('Double-click to edit a todo'), src_1.h.p('Template by ', src_1.h.a('Sindre Sorhus').attrs({ href: "http://sindresorhus.com" })), src_1.h.p('Created by ', src_1.h.a('Lagunov Vlad').attrs({ href: "https://github.com/lagunoff" })), src_1.h.p('Part of ', src_1.h.a('TodoMVC').attrs({ href: "http://todomvc.com" }))));
function countItemsLeft(model) {
    return model.todos.reduce(function (acc, todo) { return todo.completed ? acc : acc + 1; }, 0);
}
function allChecked(model) {
    return model.todos.reduce(function (acc, todo) { return todo.completed ? (acc && true) : false; }, true);
}
function projectItem(m) {
    var filter = m.key('model', 'filter');
    var isCompleted = I.if_then_else(m.key('item', 'completed'), src_1.Jet.of('completed'), src_1.Jet.of('active'));
    var visible = I.if_then_else(I.eq(filter, src_1.Jet.of('all')), src_1.Jet.of(true), I.eq(filter, isCompleted));
    return I.merge(m.key('item'), I.record({
        hidden: I.neg(visible),
    }));
}
function handleAction(action) {
    var rawPatch = update(action, model);
    var patch = src_1.preparePatch(model, rawPatch);
    src_1.actuate(el, sdom, new src_1.Jet(model, patch));
    model = src_1.applyPatch(model, patch, true);
    console.log('action', action);
    console.log('rawPatch', rawPatch);
    console.log('patch', patch);
    console.log('model', model);
    console.log('-----------');
}
var model = { filter: 'all', todos: [], title: '' };
var container = document.createElement('div');
document.body.appendChild(container);
var getModel = function () { return model; };
var sdom = exports.view.map(handleAction);
var el = src_1.create(sdom, getModel);
window.onpopstate = function (event) {
    handleAction({ tag: 'HashChange', hash: location.hash });
};
container.appendChild(el);
var KEY_ENTER = 13;


/***/ }),

/***/ "./src/todo.ts":
/*!*********************!*\
  !*** ./src/todo.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(/*! ../../../src */ "../../src/index.ts");
// Init
function init(title) {
    return { title: title, completed: false, editing: null };
}
exports.init = init;
// Update
function update(action, model) {
    switch (action.tag) {
        case 'Completed': return { $patch: { completed: !model.completed } };
        case 'Destroy': return [];
        case 'Editing/on': {
            var rootEl = action.event.currentTarget;
            var inputEl_1 = rootEl.parentElement.querySelector('input.edit');
            setTimeout(function () { return inputEl_1 && inputEl_1.focus(); }, 100);
            return { $patch: { editing: model.title } };
        }
        case 'Editing/input': return { $patch: { editing: action.value } };
        case 'Editing/cancel': return { $patch: { editing: null } };
        case 'Editing/commit': {
            if (model.editing === null)
                return [];
            return { $patch: { title: model.editing || '', editing: null } };
        }
    }
}
exports.update = update;
var rootClass = function (m) { return [m.completed ? 'completed' : '', m.editing !== null ? 'editing' : ''].filter(Boolean).join(' '); };
var rootStyle = function (m) { return m.hidden ? 'display: none;' : ''; };
// View
exports.view = src_1.h.li({ class: rootClass, style: rootStyle }).childs(src_1.h.div({ class: 'view' }).on({
    dblclick: function (event) { return ({ tag: 'Editing/on', event: event }); },
}).childs(src_1.h.input({ class: 'toggle', type: 'checkbox' }).props({ checked: function (m) { return m.completed; } }).on({
    click: function () { return ({ tag: 'Completed' }); },
}), src_1.h.label(function (m) { return m.title; }), src_1.h.button({ class: 'destroy' }).on({
    click: function () { return ({ tag: 'Destroy' }); },
})), src_1.h.input({ class: 'edit' }).props({ value: function (m) { return m.editing !== null ? m.editing : m.title; } }).on({
    input: function (e) { return ({ tag: 'Editing/input', value: e['target']['value'] }); },
    blur: function () { return ({ tag: 'Editing/commit' }); },
    keydown: handleKeydown,
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