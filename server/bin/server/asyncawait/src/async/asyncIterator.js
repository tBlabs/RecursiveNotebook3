"use strict";
var FiberMgr = require("./fiberManager");
var Semaphore = require("./semaphore");
var Config = require("./config");
var defer = require("./defer");
var await = require("../await/index");
var AsyncIterator = (function () {
    function AsyncIterator(runContext, semaphore, returnValue, acceptsCallback) {
        this._runContext = runContext;
        this._semaphore = semaphore;
        this._fiber = FiberMgr.create();
        this._returnValue = returnValue;
        this._acceptsCallback = acceptsCallback;
    }
    AsyncIterator.prototype.next = function (callback) {
        var _this = this;
        if (this._acceptsCallback) {
            this._runContext.callback = callback;
        }
        if (this._returnValue !== Config.NONE) {
            var resolver = defer();
            this._runContext.resolver = resolver;
        }
        if (FiberMgr.isExecutingInFiber())
            this._semaphore = Semaphore.unlimited;
        if (this._returnValue === Config.THUNK) {
            var thunk = function (done) {
                if (done)
                    resolver.promise.then(function (val) { return done(null, val); }, function (err) { return done(err); });
                _this._semaphore.enter(function () { return _this._fiber.run(_this._runContext); });
                _this._runContext.done = function () { return _this._semaphore.leave(); };
            };
        }
        else {
            this._semaphore.enter(function () { return _this._fiber.run(_this._runContext); });
            this._runContext.done = function () { return _this._semaphore.leave(); };
        }
        switch (this._returnValue) {
            case Config.PROMISE: return resolver.promise;
            case Config.THUNK: return thunk;
            case Config.RESULT: return await(resolver.promise);
            case Config.NONE: return;
        }
    };
    AsyncIterator.prototype.forEach = function (callback, doneCallback) {
        var _this = this;
        var run, runCtx = this._runContext;
        if (this._returnValue === Config.RESULT)
            run = function () { return stepAwaited(function () { return _this.next(); }); };
        else if (this._returnValue === Config.THUNK)
            run = function () { return _this.next()(stepCallback); };
        else if (this._acceptsCallback)
            run = function () { return _this.next(stepCallback); };
        else
            run = function () { return _this.next().then(stepResolved, endOfIteration); };
        if (this._returnValue === Config.PROMISE || this._returnValue === Config.THUNK) {
            var doneResolver = defer();
        }
        if (!this._acceptsCallback)
            doneCallback = null;
        if (this._returnValue === Config.THUNK) {
            var thunk = function (done) {
                if (done)
                    doneResolver.promise.then(function (val) { return done(null, val); }, function (err) { return done(err); });
                run();
            };
        }
        else {
            run();
        }
        switch (this._returnValue) {
            case Config.PROMISE: return doneResolver.promise;
            case Config.THUNK: return thunk;
            case Config.RESULT: return undefined;
            case Config.NONE: return undefined;
        }
        function stepAwaited(next) {
            try {
                while (true) {
                    var item = next();
                    if (item.done)
                        return endOfIteration();
                    callback(item.value);
                }
            }
            catch (err) {
                endOfIteration(err);
                throw err;
            }
        }
        function stepCallback(err, result) {
            if (err || result.done)
                return endOfIteration(err);
            callback(result.value);
            setImmediate(run);
        }
        function stepResolved(result) {
            if (result.done)
                return endOfIteration();
            callback(result.value);
            setImmediate(run);
        }
        function endOfIteration(err) {
            if (doneCallback)
                err ? doneCallback(err) : doneCallback();
            if (doneResolver) {
                if (FiberMgr.isExecutingInFiber()) {
                    runCtx.resolver = doneResolver;
                }
                else {
                    err ? doneResolver.reject(err) : doneResolver.resolve(null);
                }
            }
        }
    };
    AsyncIterator.prototype.destroy = function () {
        this._fiber = null;
    };
    return AsyncIterator;
}());
module.exports = AsyncIterator;
//# sourceMappingURL=asyncIterator.js.map