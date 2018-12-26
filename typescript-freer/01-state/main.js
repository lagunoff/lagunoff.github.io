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
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/examples/01-state.js");
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

/***/ "./out/examples/01-state.js":
/*!**********************************!*\
  !*** ./out/examples/01-state.js ***!
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
var state_1 = __webpack_require__(/*! ../src/state */ "./out/src/state.js");
__webpack_require__(/*! ../src/burrido */ "./out/src/burrido.js");
var State = state_1.bindState();
var eff01 = index_1.Eff.Do(function () {
    var current;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, State.get()];
            case 1:
                current = _a.sent();
                return [4 /*yield*/, State.set(current + 1)];
            case 2:
                _a.sent();
                return [4 /*yield*/, State.modify(function (x) { return x * x; })];
            case 3:
                _a.sent();
                return [2 /*return*/, 'Done'];
        }
    });
});
var state = 2;
var getter = function () { return state; };
var setter = function (next) { return (state = next); };
var modify = function (proj) { return (state = proj(state)); };
var eff02 = state_1.runState(getter, setter, modify)(eff01); // Eliminate `State` from `U` parameter
console.log(state); // => 2
var result = index_1.runEff(eff02); // Here side-effects are being executed
console.log(result); // => Done
console.log(state); // => 9


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

/***/ "./out/src/state.js":
/*!**************************!*\
  !*** ./out/src/state.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var index_1 = __webpack_require__(/*! ./index */ "./out/src/index.js");
var types_1 = __webpack_require__(/*! ./types */ "./out/src/types.js");
function modify(proj) {
    return index_1.Eff.impure(new Modify(proj));
}
function patch(patch) {
    // @ts-ignore
    return index_1.Eff.impure(new Modify(function (x) { return (__assign({}, x, patch)); }));
}
function get() {
    return index_1.Eff.impure(new Get());
}
exports.get = get;
function set(out) {
    return index_1.Eff.impure(new Set(out));
}
exports.set = set;
function bindState() {
    return { get: get, set: set, modify: modify, patch: patch };
}
exports.bindState = bindState;
function runState(get, set, modify) {
    return function (effect) {
        if (effect instanceof index_1.Pure) {
            return effect;
        }
        if (effect instanceof index_1.Impure) {
            if (effect._value instanceof Get) {
                return index_1.Eff.of(get());
            }
            if (effect._value instanceof Set) {
                set(effect._value._value);
                return index_1.Eff.of(void 0);
            }
            if (effect._value instanceof Modify) {
                modify(effect._value._proj);
                return index_1.Eff.of(void 0);
            }
            return effect;
        }
        if (effect instanceof index_1.Chain) {
            var first = runState(get, set, modify)(effect.first);
            return first.chain(function (a) { return runState(get, set, modify)(effect.andThen(a)); });
        }
        return types_1.absurd(effect);
    };
}
exports.runState = runState;
exports.State = {
    get: get, set: set, modify: modify, patch: patch, bindState: bindState
};
var Get = /** @class */ (function () {
    function Get() {
    }
    return Get;
}());
exports.Get = Get;
var Set = /** @class */ (function () {
    function Set(_value) {
        this._value = _value;
    }
    return Set;
}());
exports.Set = Set;
var Modify = /** @class */ (function () {
    function Modify(_proj) {
        this._proj = _proj;
    }
    return Modify;
}());
exports.Modify = Modify;


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