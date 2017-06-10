"use strict";
var Fiber = require("../fibers");
var _ = require("lodash");
var Config = require("./config");
var FiberMgr = require("./fiberManager");
var RunContext = require("./runContext");
var Semaphore = require("./semaphore");
var AsyncIterator = require("./asyncIterator");
var defer = require("./defer");
var await = require("../await/index");
function makeAsyncFunc(config) {
    config.validate();
    var result = function async(bodyFunc) {
        var semaphore = config.maxConcurrency ? new Semaphore(config.maxConcurrency) : Semaphore.unlimited;
        var makeFunc = config.isIterable ? makeAsyncIterator : makeAsyncNonIterator;
        var result = makeFunc(bodyFunc, config, semaphore);
        var arity = bodyFunc.length;
        if (config.acceptsCallback)
            ++arity;
        result = makeFuncWithArity(result, arity);
        return result;
    };
    result.mod = makeModFunc(config);
    return result;
}
function makeAsyncIterator(bodyFunc, config, semaphore) {
    return function iterable() {
        var startupArgs = new Array(arguments.length + 1);
        for (var i = 0, len = arguments.length; i < len; ++i)
            startupArgs[i + 1] = arguments[i];
        var yield_ = function (expr) {
            if (!Fiber.current) {
                throw new Error('await functions, yield functions, and value-returning suspendable ' +
                    'functions may only be called from inside a suspendable function. ');
            }
            if (runContext.callback)
                runContext.callback(null, { value: expr, done: false });
            if (runContext.resolver)
                runContext.resolver.resolve({ value: expr, done: false });
            Fiber.yield();
        };
        startupArgs[0] = yield_;
        var runContext = new RunContext(bodyFunc, this, startupArgs);
        var iterator = new AsyncIterator(runContext, semaphore, config.returnValue, config.acceptsCallback);
        runContext.wrapped = function () {
            var len = arguments.length, args = new Array(len);
            for (var i = 0; i < len; ++i)
                args[i] = arguments[i];
            bodyFunc.apply(this, args);
            iterator.destroy();
            return { done: true };
        };
        return iterator;
    };
}
function makeAsyncNonIterator(bodyFunc, config, semaphore) {
    return function nonIterable() {
        var argsAsArray = new Array(arguments.length);
        for (var i = 0; i < argsAsArray.length; ++i)
            argsAsArray[i] = arguments[i];
        if (FiberMgr.isExecutingInFiber())
            this._semaphore = Semaphore.unlimited;
        var runContext = new RunContext(bodyFunc, this, argsAsArray, function () { return semaphore.leave(); });
        if (config.returnValue !== Config.NONE) {
            var resolver = defer();
            runContext.resolver = resolver;
        }
        if (config.acceptsCallback && argsAsArray.length && _.isFunction(argsAsArray[argsAsArray.length - 1])) {
            var callback = argsAsArray.pop();
            runContext.callback = callback;
        }
        if (config.returnValue === Config.THUNK) {
            var thunk = function (done) {
                if (done)
                    resolver.promise.then(function (val) { return done(null, val); }, function (err) { return done(err); });
                semaphore.enter(function () { return FiberMgr.create().run(runContext); });
            };
        }
        else {
            semaphore.enter(function () { return FiberMgr.create().run(runContext); });
        }
        switch (config.returnValue) {
            case Config.PROMISE: return resolver.promise;
            case Config.THUNK: return thunk;
            case Config.RESULT: return await(resolver.promise);
            case Config.NONE: return;
        }
    };
}
function makeFuncWithArity(fn, arity) {
    switch (arity) {
        case 0: return function f0() { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 1: return function f1(a) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 2: return function f2(a, b) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 3: return function f3(a, b, c) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 4: return function f4(a, b, c, d) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 5: return function f5(a, b, c, d, e) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 6: return function f6(a, b, c, d, e, f) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 7: return function f7(a, b, c, d, e, f, g) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 8: return function f8(a, b, c, d, e, f, g, h) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        case 9: return function f9(a, b, c, d, e, f, g, h, _i) { var i, l = arguments.length, r = new Array(l); for (i = 0; i < l; ++i)
            r[i] = arguments[i]; return fn.apply(this, r); };
        default: return fn;
    }
}
function makeModFunc(config) {
    return function (options, maxConcurrency) {
        if (_.isString(options)) {
            var rt, cb, it;
            switch (options) {
                case 'returns: promise, callback: false, iterable: false':
                    rt = 'promise';
                    cb = false;
                    it = false;
                    break;
                case 'returns: thunk, callback: false, iterable: false':
                    rt = 'thunk';
                    cb = false;
                    it = false;
                    break;
                case 'returns: result, callback: false, iterable: false':
                    rt = 'result';
                    cb = false;
                    it = false;
                    break;
                case 'returns: promise, callback: true, iterable: false':
                    rt = 'promise';
                    cb = true;
                    it = false;
                    break;
                case 'returns: thunk, callback: true, iterable: false':
                    rt = 'thunk';
                    cb = true;
                    it = false;
                    break;
                case 'returns: result, callback: true, iterable: false':
                    rt = 'result';
                    cb = true;
                    it = false;
                    break;
                case 'returns: none, callback: true, iterable: false':
                    rt = 'none';
                    cb = true;
                    it = false;
                    break;
                case 'returns: promise, callback: false, iterable: true':
                    rt = 'promise';
                    cb = false;
                    it = true;
                    break;
                case 'returns: thunk, callback: false, iterable: true':
                    rt = 'thunk';
                    cb = false;
                    it = true;
                    break;
                case 'returns: result, callback: false, iterable: true':
                    rt = 'result';
                    cb = false;
                    it = true;
                    break;
                case 'returns: promise, callback: true, iterable: true':
                    rt = 'promise';
                    cb = true;
                    it = true;
                    break;
                case 'returns: thunk, callback: true, iterable: true':
                    rt = 'thunk';
                    cb = true;
                    it = true;
                    break;
                case 'returns: result, callback: true, iterable: true':
                    rt = 'result';
                    cb = true;
                    it = true;
                    break;
                case 'returns: none, callback: true, iterable: true':
                    rt = 'none';
                    cb = true;
                    it = true;
                    break;
            }
            options = { returnValue: rt, acceptsCallback: cb, isIterable: it, maxConcurrency: maxConcurrency };
        }
        var newConfig = new Config(_.defaults({}, options, config));
        return makeAsyncFunc(newConfig);
    };
}
module.exports = makeAsyncFunc;
//# sourceMappingURL=makeAsyncFunc.js.map