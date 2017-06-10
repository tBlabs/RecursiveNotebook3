"use strict";
var Fiber = require("../fibers");
var FiberManager;
(function (FiberManager) {
    function isExecutingInFiber() {
        return !!Fiber.current;
    }
    FiberManager.isExecutingInFiber = isExecutingInFiber;
    function create() {
        return Fiber(runInFiber);
    }
    FiberManager.create = create;
})(FiberManager || (FiberManager = {}));
function runInFiber(runCtx) {
    try {
        tryBlock(runCtx);
    }
    catch (err) {
        catchBlock(runCtx, err);
    }
    finally {
        finallyBlock(runCtx);
    }
}
function tryBlock(runCtx) {
    adjustFiberCount(+1);
    var result = runCtx.wrapped.apply(runCtx.thisArg, runCtx.argsAsArray);
    if (runCtx.callback)
        runCtx.callback(null, result);
    if (runCtx.resolver)
        runCtx.resolver.resolve(result);
}
function catchBlock(runCtx, err) {
    if (runCtx.callback)
        runCtx.callback(err);
    if (runCtx.resolver)
        runCtx.resolver.reject(err);
}
function finallyBlock(runCtx) {
    adjustFiberCount(-1);
    if (runCtx.done)
        runCtx.done();
}
function adjustFiberCount(delta) {
    activeFiberCount += delta;
    if (activeFiberCount >= fiberPoolSize) {
        fiberPoolSize += 100;
        Fiber.poolSize = fiberPoolSize;
    }
}
var fiberPoolSize = Fiber.poolSize;
var activeFiberCount = 0;
module.exports = FiberManager;
//# sourceMappingURL=fiberManager.js.map