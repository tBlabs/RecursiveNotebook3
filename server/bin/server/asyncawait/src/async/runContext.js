"use strict";
var RunContext = (function () {
    function RunContext(wrapped, thisArg, argsAsArray, done) {
        this.resolver = null;
        this.callback = null;
        this.wrapped = wrapped;
        this.thisArg = thisArg;
        this.argsAsArray = argsAsArray;
        this.done = done;
    }
    return RunContext;
}());
module.exports = RunContext;
//# sourceMappingURL=runContext.js.map