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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/examples/03-async.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../.config/yarn/global/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/burrido/burrido.js":
/*!******************************************!*\
  !*** ../node_modules/burrido/burrido.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.immutagen = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// A simple immutable generator emulator that replays history in order to
// "clone" JavaScript's mutable generators

exports.default = function (genFun) {
  var nextFor = function nextFor(history) {
    return function (input) {
      var newHist = history.concat([input]);
      var gen = genFun(newHist[0]);
      var _newHist$map$history$ = newHist.map(function (x) {
        return gen.next(x);
      })[history.length];
      var value = _newHist$map$history$.value;
      var done = _newHist$map$history$.done;


      return {
        value: value,
        next: done ? undefined : nextFor(newHist),
        mutable: gen
      };
    };
  };
  return nextFor([]);
};

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutagen = require('immutagen');

var _immutagen2 = _interopRequireDefault(_immutagen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pure = _ref.pure;
  var bind = _ref.bind;

  var doNext = function doNext(next) {
    return function (input) {
      var _next = next(input);

      var value = _next.value;
      var nextNext = _next.next;


      if (!nextNext) return pure(value);

      return bind(value, doNext(nextNext));
    };
  };

  return {
    Do: function Do(genFactory) {
      return doNext((0, _immutagen2.default)(genFactory))();
    }
  };
};

},{"immutagen":1}]},{},[2])(2)
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../.config/yarn/global/node_modules/webpack/buildin/global.js */ "../../../.config/yarn/global/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./out/examples/03-async.js":
/*!**********************************!*\
  !*** ./out/examples/03-async.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var index_1 = __webpack_require__(/*! ../src/index */ "./out/src/index.js");
var http = __webpack_require__(/*! ./http */ "./out/examples/http.js");
__webpack_require__(/*! ../src/burrido */ "./out/src/burrido.js");
var failure_1 = __webpack_require__(/*! ../src/failure */ "./out/src/failure.js");
var async_1 = __webpack_require__(/*! ../src/async */ "./out/src/async.js");
var http_1 = __webpack_require__(/*! ./http */ "./out/examples/http.js");
// https://api.random.org/json-rpc/1/basic
function randomOrgInts(n, min, max) {
    return http.send({
        url: 'https://api.random.org/json-rpc/1/invoke',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { 'jsonrpc': '2.0', 'method': 'generateIntegers', 'params': { n: n, min: min, max: max, 'apiKey': '8e5b7dd6-fe16-41f1-842d-57481c2777b0' }, 'id': 42 }
    }).map(function (response) {
        var json = JSON.parse(response.body);
        return json.result.random.data;
    });
}
var eff01 = index_1.Eff.Do(function () {
    var first, second, third;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, randomOrgInts(1, 0, 10)];
            case 1:
                first = _a.sent();
                return [4 /*yield*/, randomOrgInts(1, 0, 10)];
            case 2:
                second = _a.sent();
                return [4 /*yield*/, randomOrgInts(1, 0, 10)];
            case 3:
                third = _a.sent();
                return [2 /*return*/, first.concat(second, third)];
        }
    });
});
var eff02 = failure_1.runFailure(eff01); // Eliminate `Failure` from `U` parameter
var eff03 = http_1.runHttp(eff02); // Eliminate `Http` from `U` parameter
var subscribe = async_1.runAsync(eff03); // Eliminate `Async` from `U` parameter
subscribe(console.log, function () { return console.log('completed'); });


/***/ }),

/***/ "./out/examples/http.js":
/*!******************************!*\
  !*** ./out/examples/http.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
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
exports.__esModule = true;
var async_1 = __webpack_require__(/*! ../src/async */ "./out/src/async.js");
var either_1 = __webpack_require__(/*! ../src/either */ "./out/src/either.js");
var index_1 = __webpack_require__(/*! ../src/index */ "./out/src/index.js");
var types_1 = __webpack_require__(/*! ../src/types */ "./out/src/types.js");
/** General effect construtor */
function sendE(req) {
    return new index_1.Impure(new Http(req));
}
exports.sendE = sendE;
/** General effect construtor */
function send(req) {
    return sendE(req).handleError();
}
exports.send = send;
/** Shortcut for GET requests */
function get(url, request) {
    return send(__assign({}, request, { method: 'GET', url: url }));
}
exports.get = get;
function getE(url, request) {
    return sendE(__assign({}, request, { method: 'GET', url: url }));
}
exports.getE = getE;
/** Shortcut for POST requests */
function post(url, body, request) {
    return send(__assign({}, request, { method: 'POST', url: url, body: body }));
}
exports.post = post;
function postE(url, body, request) {
    return sendE(__assign({}, request, { method: 'POST', url: url, body: body }));
}
exports.postE = postE;
/**
 * Do actual request
 */
function doXHR(req) {
    return function (onNext, onComplete) {
        var onSuccess = function (x) { return (onNext(either_1.Either.right(x)), onComplete()); };
        var onFailure = function (x) { return (onNext(either_1.Either.left(x)), onComplete()); };
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('error', function () { return onFailure({ tag: 'NetworkError' }); });
        xhr.addEventListener('timeout', function () { return onFailure({ tag: 'Timeout' }); });
        xhr.addEventListener('load', function () { return onSuccess({
            url: xhr.responseURL,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders()),
            body: xhr.response || xhr.responseText
        }); });
        try {
            xhr.open(req.method, req.url, true);
        }
        catch (e) {
            onFailure({ tag: 'BadUrl', desc: req.url });
        }
        // if ('progress' in req && req.progress) {
        //   xhr.addEventListener('progress', e => onProgress(e.lengthComputable ? { tag: 'Computable', loaded: e.loaded, total: e.total } : { tag: 'Uncomputable' }));
        // }
        if (req.timeout)
            xhr.timeout = req.timeout;
        if (typeof (req.withCredentials) !== 'undefined')
            xhr.withCredentials = req.withCredentials;
        if (typeof (req.headers) !== 'undefined') {
            for (var key in req.headers) {
                if (!req.headers.hasOwnProperty(key))
                    continue;
                var value = req.headers[key];
                if (typeof (value) !== 'undefined' && value !== null)
                    xhr.setRequestHeader(key, String(value));
            }
        }
        var body = Object.prototype.toString.apply(req.body) === '[object Object]' ? JSON.stringify(req.body) : req.body;
        xhr.send(body);
        return function () { return xhr.abort(); };
    };
}
exports.doXHR = doXHR;
// Parse headers from string to a `Record<string, string>`
function parseHeaders(rawHeaders) {
    var output = {};
    var lines = rawHeaders.split('\r\n');
    for (var i in lines) {
        var index = lines[i].indexOf(': ');
        if (index < 0)
            continue;
        var key = lines[i].substring(0, index);
        var value = lines[i].substring(index + 2);
        output[key] = value;
    }
    return output;
}
/**
 * Build an url. Redundant slashes will be trimmed from both ends
 * ```ts
 * const hostname = 'http://example.com/';
 * const url = http.join(hostname, '/shop', '/items.json', { offset: 0, limit: 20, sort: 'date' });
 * console.log(url); // => http://example.com/shop/items.json?offset=0&limit=20&sort=date
 * ```
 */
function join() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var path = '';
    var params = {};
    var query = '';
    for (var i in args) {
        var arg = args[i];
        if (typeof (arg) === 'string')
            path = joinTwo(path, arg);
        else
            Object.assign(params, arg);
    }
    for (var key in params) {
        if (!params.hasOwnProperty(key) || typeof (params[key]) === 'undefined' || params[key] === null)
            continue;
        if (Array.isArray(params[key])) {
            for (var _a = 0, _b = params[key]; _a < _b.length; _a++) {
                var v = _b[_a];
                if (typeof (params[key]) === 'undefined' || params[key] === null)
                    continue;
                query += (query ? '&' : '') + (encodeURIComponent(key) + "=" + encodeURIComponent(v));
            }
        }
        else {
            query += (query ? '&' : '') + (encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
        }
    }
    return query ? (path + '?' + query) : path;
    // Join segments of url
    function joinTwo(a, b) {
        if (a === '')
            return b;
        if (b === '')
            return a;
        var trailing = a.length && a[a.length - 1] === '/';
        var leading = b.length && b[0] === '/';
        if (trailing && leading)
            return a.substring(0, a.length - 1) + b;
        if (!trailing && !leading)
            return a + '/' + b;
        return a + b;
    }
}
exports.join = join;
var Http = /** @class */ (function () {
    function Http(request) {
        this.request = request;
    }
    ;
    return Http;
}());
exports.Http = Http;
function runHttp(effect) {
    if (effect instanceof index_1.Pure) {
        return effect.castU();
    }
    if (effect instanceof index_1.Impure) {
        if (effect._value instanceof Http) {
            return async_1.Async.create(doXHR(effect._value.request));
        }
        return effect;
    }
    if (effect instanceof index_1.Chain) {
        var first = runHttp(effect.first);
        return first.chain(function (a) { return runHttp(effect.andThen(a)); });
    }
    return types_1.absurd(effect);
}
exports.runHttp = runHttp;
;
// @ts-ignore nodejs support
if (typeof XMLHttpRequest === 'undefined')
    global.XMLHttpRequest = __webpack_require__(/*! xmlhttprequest */ "xmlhttprequest").XMLHttpRequest;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../.config/yarn/global/node_modules/webpack/buildin/global.js */ "../../../.config/yarn/global/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./out/src/async.js":
/*!**************************!*\
  !*** ./out/src/async.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./index */ "./out/src/index.js");
var io_1 = __webpack_require__(/*! ./io */ "./out/src/io.js");
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
function runAsync(effect) {
    return function (onNext, onComplete) {
        if (effect instanceof index_1.Pure) {
            onNext(effect._value);
            onComplete();
            return noopFunc;
        }
        if (effect instanceof index_1.Impure) {
            if (effect._value instanceof Observable) {
                return effect._value._subscribe(onNext, onComplete);
            }
            if (effect._value instanceof ToAsync) {
                return runAsync(new index_1.Impure(effect._value.toAsync()))(onNext, onComplete);
            }
            if (effect._value instanceof io_1.IO) {
                onNext(effect._value._io());
                onComplete();
                return noopFunc;
            }
            return types_1.absurd(effect._value);
        }
        if (effect instanceof index_1.Chain) {
            var cancellers_1 = new Map();
            var handleEffect_1 = function (e) {
                cancellers_1.set(e, null);
                var _onNext = function (result) {
                    if (e === effect.first)
                        handleEffect_1(effect.andThen(result));
                    else
                        onNext(result);
                };
                var _onComplete = function () {
                    cancellers_1["delete"](e);
                    if (cancellers_1.size === 0)
                        onComplete();
                };
                var canceller = runAsync(e)(_onNext, _onComplete);
                if (cancellers_1.has(e))
                    cancellers_1.set(e, canceller);
            };
            handleEffect_1(effect.first);
            if (cancellers_1.size === 0)
                return noopFunc;
            return function () { return cancellers_1.forEach(function (canceller) { return canceller && canceller(); }); };
        }
        return types_1.absurd(effect);
    };
}
exports.runAsync = runAsync;
function create(subscribe) {
    return new index_1.Impure(new Observable(subscribe));
}
function createE(subscribe) {
    return create(subscribe).handleError();
}
var Subscribe;
(function (Subscribe) {
    function of(value) {
        return function (next, complete) { return (next(value), complete(), noopFunc); };
    }
    Subscribe.of = of;
    function lazy(func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function (next, complete) { return (next(func.apply(void 0, args)), complete(), noopFunc); };
    }
    Subscribe.lazy = lazy;
})(Subscribe = exports.Subscribe || (exports.Subscribe = {}));
var Observable = /** @class */ (function () {
    function Observable(_subscribe) {
        this._subscribe = _subscribe;
    }
    return Observable;
}());
exports.Observable = Observable;
var ToAsync = /** @class */ (function () {
    function ToAsync() {
    }
    return ToAsync;
}());
exports.ToAsync = ToAsync;
exports.Async = {
    create: create, createE: createE
};
function noopFunc() { }


/***/ }),

/***/ "./out/src/burrido.js":
/*!****************************!*\
  !*** ./out/src/burrido.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./index */ "./out/src/index.js");
var burrido_1 = __webpack_require__(/*! burrido */ "../node_modules/burrido/burrido.js");
// Do notation
exports.Do = burrido_1["default"]({
    pure: index_1.Eff.of,
    bind: function (m, proj) { return m.chain(proj); }
}).Do;
index_1.Eff.Do = exports.Do;


/***/ }),

/***/ "./out/src/either.js":
/*!***************************!*\
  !*** ./out/src/either.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.__esModule = true;
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
// Base class for instance methods
var EitherBase = /** @class */ (function () {
    function EitherBase() {
    }
    // tag(): typeof Left<L, R>|typeof Right<L, R> {
    // }
    EitherBase.prototype.map = function (f) {
        var self = this;
        if (self instanceof Left)
            return self;
        if (self instanceof Right)
            return new Right(f(self.value));
        return types_1.absurd(self);
    };
    EitherBase.prototype.mapTo = function (value) {
        return this.map(function () { return value; });
    };
    EitherBase.prototype.mapLeft = function (f) {
        var self = this;
        if (self instanceof Left)
            return new Left(f(self.value));
        if (self instanceof Right)
            return self;
        return types_1.absurd(self);
    };
    EitherBase.prototype.mapLeftTo = function (value) {
        return this.mapLeft(function () { return value; });
    };
    EitherBase.prototype.bimap = function (f1, f2) {
        var self = this;
        if (self instanceof Left)
            return new Left(f1(self.value));
        if (self instanceof Right)
            return new Right(f2(self.value));
        return types_1.absurd(self);
    };
    EitherBase.prototype.chain = function (f) {
        var self = this;
        if (self instanceof Left)
            return self;
        if (self instanceof Right)
            return f(self.value);
        return types_1.absurd(self);
    };
    EitherBase.prototype.chainTo = function (value) {
        return this.chain(function () { return value; });
    };
    EitherBase.prototype.fold = function (f1, f2) {
        var self = this;
        if (self instanceof Left)
            return f1(self.value);
        if (self instanceof Right)
            return f2(self.value);
        return types_1.absurd(self);
    };
    EitherBase.prototype.onError = function (onFailure) {
        var self = this;
        if (self instanceof Left)
            return onFailure(self.value);
        if (self instanceof Right)
            return self;
        return types_1.absurd(self);
    };
    EitherBase.prototype.onErrorTo = function (value) {
        return this.onError(function () { return value; });
    };
    EitherBase.prototype.toNullable = function () {
        var self = this;
        if (self instanceof Left)
            return null;
        if (self instanceof Right)
            return self.value;
        return types_1.absurd(self);
    };
    EitherBase.prototype.isRight = function () { return this instanceof Right; };
    EitherBase.prototype.isLeft = function () { return this instanceof Left; };
    return EitherBase;
}());
exports.EitherBase = EitherBase;
var Left = /** @class */ (function (_super) {
    __extends(Left, _super);
    function Left(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return Left;
}(EitherBase));
exports.Left = Left;
var Right = /** @class */ (function (_super) {
    __extends(Right, _super);
    function Right(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return Right;
}(EitherBase));
exports.Right = Right;
/** aliases */
function failure(value) { return new Left(value); }
exports.failure = failure;
function success(value) { return new Right(value); }
exports.success = success;
function left(value) { return new Left(value); }
exports.left = left;
function right(value) { return new Right(value); }
exports.right = right;
/** alias for `right` */
function of(value) {
    return new Right(value);
}
exports.of = of;
function ap() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var func = args[args.length - 1];
    var results = [];
    for (var i = 0; i < args.length - 1; i++) {
        var ethr = args[i];
        if (ethr instanceof Left)
            return ethr;
        if (ethr instanceof Right) {
            results.push(ethr.value);
            break;
        }
        types_1.absurd(ethr);
    }
    return new Right(func.apply(undefined, results));
}
exports.ap = ap;
function traverse(arr, f) {
    var output = [];
    for (var i = 0; i < arr.length; i++) {
        var ethr = f ? f(arr[i], i) : arr[i];
        if (ethr instanceof Left)
            return ethr;
        ensureRight(ethr);
        output.push(ethr.value);
    }
    return new Right(output);
}
exports.traverse = traverse;
exports.Either = {
    Left: Left, Right: Right, failure: failure, success: success, left: left, right: right, of: of, ap: ap, traverse: traverse
};
function ensureRight(x) { }


/***/ }),

/***/ "./out/src/failure.js":
/*!****************************!*\
  !*** ./out/src/failure.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./index */ "./out/src/index.js");
var either_1 = __webpack_require__(/*! ./either */ "./out/src/either.js");
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
var Failure = /** @class */ (function () {
    function Failure(_error) {
        this._error = _error;
    }
    Failure.create = create;
    Failure.runError = runFailure;
    return Failure;
}());
exports.Failure = Failure;
function runFailure(eff) {
    if (eff instanceof index_1.Pure) {
        return index_1.Eff.of(either_1.Either.of(eff._value));
    }
    if (eff instanceof index_1.Impure) {
        if (eff._value instanceof Failure) {
            return index_1.Eff.of(either_1.Either.failure(eff._value._error));
        }
        return eff.map(either_1.Either.of);
    }
    if (eff instanceof index_1.Chain) {
        var first = runFailure(eff.first);
        // @ts-ignore
        return new index_1.Chain(first, function (ethr) { return ethr.fold(function () { return index_1.Eff.of(ethr); }, function (val) { return runFailure(eff.andThen(val)); }); });
    }
    return types_1.absurd(eff);
}
exports.runFailure = runFailure;
function create(error) {
    return index_1.Eff.impure(new Failure(error));
}
index_1.EffBase.prototype.handleError = function () {
    return this.chain(function (ethr) { return ethr.fold(Failure.create, index_1.Eff.of); });
};


/***/ }),

/***/ "./out/src/index.js":
/*!**************************!*\
  !*** ./out/src/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.__esModule = true;
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
var EffBase = /** @class */ (function () {
    function EffBase() {
    }
    EffBase.prototype.map = function (proj) {
        //    return new Apply([this as any as FreerAny], proj);
        return this.chain(function (x) { return of(proj(x)); });
    };
    EffBase.prototype.mapTo = function (value) {
        return this.chainTo(of(value));
    };
    EffBase.prototype.chain = function (f) {
        return new Chain(this, f);
    };
    EffBase.prototype.chainTo = function (value) {
        return new Chain(this, function () { return value; });
    };
    return EffBase;
}());
exports.EffBase = EffBase;
function of(value) {
    return new Pure(value);
}
exports.of = of;
// @ts-ignore
function impure(value) {
    return new Impure(value);
}
exports.impure = impure;
function runEff(effect) {
    if (effect instanceof Pure) {
        return effect._value;
    }
    if (effect instanceof Impure) {
        return types_1.absurd(effect._value);
    }
    if (effect instanceof Chain) {
        return runEff(effect.andThen(runEff(effect.first)));
    }
    return types_1.absurd(effect);
}
exports.runEff = runEff;
var Pure = /** @class */ (function (_super) {
    __extends(Pure, _super);
    function Pure(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Pure.prototype.castU = function () {
        return this;
    };
    return Pure;
}(EffBase));
exports.Pure = Pure;
var Impure = /** @class */ (function (_super) {
    __extends(Impure, _super);
    function Impure(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    return Impure;
}(EffBase));
exports.Impure = Impure;
var Chain = /** @class */ (function (_super) {
    __extends(Chain, _super);
    function Chain(first, andThen) {
        var _this = _super.call(this) || this;
        _this.first = first;
        _this.andThen = andThen;
        return _this;
    }
    return Chain;
}(EffBase));
exports.Chain = Chain;
exports.Eff = {
    of: of, Pure: Pure, impure: impure
};


/***/ }),

/***/ "./out/src/io.js":
/*!***********************!*\
  !*** ./out/src/io.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./index */ "./out/src/index.js");
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
var IO = /** @class */ (function () {
    function IO(_io) {
        this._io = _io;
    }
    IO.runIO = runIO;
    IO.create = create;
    return IO;
}());
exports.IO = IO;
function create(io) {
    return index_1.Eff.impure(new IO(io));
}
function runIO(eff) {
    if (eff instanceof index_1.Pure) {
        return eff._value;
    }
    if (eff instanceof index_1.Impure) {
        return eff._value._io();
    }
    if (eff instanceof index_1.Chain) {
        return runIO(eff.andThen(runIO(eff.first)));
    }
    return types_1.absurd(eff);
}
exports.runIO = runIO;


/***/ }),

/***/ "./out/src/types.js":
/*!**************************!*\
  !*** ./out/src/types.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/** Don't coerce string literals to `string` type */
function literal(x) {
    return x;
}
exports.literal = literal;
/** Helper for totality checking */
function absurd(x) {
    throw new Error('absurd: unreachable code');
}
exports.absurd = absurd;
/** Helper for totality checking */
function ensure(x) {
}
exports.ensure = ensure;


/***/ }),

/***/ "xmlhttprequest":
/*!*********************************!*\
  !*** external "xmlhttprequest" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = xmlhttprequest;

/***/ })

/******/ });