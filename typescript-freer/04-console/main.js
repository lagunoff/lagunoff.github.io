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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/examples/04-console.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../.config/yarn/global/node_modules/process/browser.js":
/*!**********************************************************************!*\
  !*** /home/vlad/.config/yarn/global/node_modules/process/browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

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

/***/ "./out/examples/04-console.js":
/*!************************************!*\
  !*** ./out/examples/04-console.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
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
__webpack_require__(/*! ../src/burrido */ "./out/src/burrido.js");
var console_1 = __webpack_require__(/*! ./console */ "./out/examples/console.js");
var async_1 = __webpack_require__(/*! ../src/async */ "./out/src/async.js");
var ask = function (sanitize) { return function (question) { return console_1.Console.question(question)
    .chain(function (line) {
    var nullOrA = sanitize(line);
    return nullOrA === null ? eval('ask')(sanitize)(question) : index_1.Eff.of(nullOrA);
}); }; };
var num = function (x) { var n = Number(x); return isNaN(n) ? null : n; };
var op = function (x) { return x === '+' || x === '-' || x === '*' || x === '/' ? x : null; };
var yn = function (x) { return (x = x.toUpperCase(), x === 'Y' || x === 'N' ? x : null); };
var interaction = index_1.Eff.Do(function () {
    var first, infix, second, expr, yesNo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ask(num)('Enter the first number: ')];
            case 1:
                first = _a.sent();
                return [4 /*yield*/, ask(op)('Choose binary operation ("+", "-", "*", "/"): ')];
            case 2:
                infix = _a.sent();
                return [4 /*yield*/, ask(num)('Enter the second number: ')];
            case 3:
                second = _a.sent();
                expr = first + " " + infix + " " + second;
                return [4 /*yield*/, console_1.Console.putStrLn(expr + " = " + eval('(' + expr + ')'))];
            case 4:
                _a.sent();
                return [4 /*yield*/, ask(yn)('Try again? Y/N/y/n: ')];
            case 5:
                yesNo = _a.sent();
                if (!(yesNo === 'Y')) return [3 /*break*/, 7];
                return [4 /*yield*/, eval('interaction')];
            case 6:
                _a.sent(); // Should be just `interaction`
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
});
var eff02 = console_1.Console.runConsole(interaction);
var subscribe = async_1.runAsync(eff02);
// @ts-ignore
subscribe(function () { }, function () { return (console.log('bye...'), process && process.exit && process.exit()); });

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../.config/yarn/global/node_modules/process/browser.js */ "../../../.config/yarn/global/node_modules/process/browser.js")))

/***/ }),

/***/ "./out/examples/console.js":
/*!*********************************!*\
  !*** ./out/examples/console.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
exports.__esModule = true;
var index_1 = __webpack_require__(/*! ../src/index */ "./out/src/index.js");
var types_1 = __webpack_require__(/*! ../src/types */ "./out/src/types.js");
var async_1 = __webpack_require__(/*! ../src/async */ "./out/src/async.js");
function putStrLn(line) {
    return index_1.Eff.impure(new PutStrLn(line));
}
function getLine() {
    return index_1.Eff.impure(new GetLine(''));
}
function question(question) {
    return index_1.Eff.impure(new GetLine(question));
}
function runConsoleGeneric(putStrLn_, getLine_) {
    return function (effect) {
        if (effect instanceof index_1.Pure) {
            return effect.castU();
        }
        if (effect instanceof index_1.Impure) {
            if (effect._value instanceof PutStrLn) {
                return async_1.Async.create(putStrLn_(effect._value._line));
            }
            if (effect._value instanceof GetLine) {
                return async_1.Async.create(getLine_(effect._value._question));
            }
            return effect;
        }
        if (effect instanceof index_1.Chain) {
            var first = runConsoleGeneric(putStrLn_, getLine_)(effect.first);
            return first.chain(function (a) { return runConsoleGeneric(putStrLn_, getLine_)(effect.andThen(a)); });
        }
        return types_1.absurd(effect);
    };
}
exports.runConsoleGeneric = runConsoleGeneric;
exports.runConsole = function () {
    if (typeof prompt !== 'undefined') {
        // In-browser implementation
        return runConsoleGeneric(function (line) { return async_1.Subscribe.lazy(console.log, line); }, function (q) { return async_1.Subscribe.lazy(function () { return prompt(q, ''); }); });
    }
    else {
        var readline = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'readline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        var stdio_1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // Readline implementation
        return runConsoleGeneric(function (line) { return async_1.Subscribe.lazy(console.log, line); }, function (question) { return function (next, complete) {
            stdio_1.question(question, function (answer) {
                next(answer);
                complete();
            });
            return noopFunc;
        }; });
    }
}();
exports.Console = {
    putStrLn: putStrLn, getLine: getLine, question: question, runConsole: exports.runConsole, runConsoleGeneric: runConsoleGeneric
};
var PutStrLn = /** @class */ (function () {
    function PutStrLn(_line) {
        this._line = _line;
    }
    return PutStrLn;
}());
exports.PutStrLn = PutStrLn;
var GetLine = /** @class */ (function () {
    function GetLine(_question) {
        this._question = _question;
    }
    return GetLine;
}());
exports.GetLine = GetLine;
function noopFunc() { }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../.config/yarn/global/node_modules/process/browser.js */ "../../../.config/yarn/global/node_modules/process/browser.js")))

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


/***/ })

/******/ });