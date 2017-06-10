"use strict";
var assert = require("assert");
var Config = (function () {
    function Config(options) {
        this.returnValue = Config.PROMISE;
        this.acceptsCallback = false;
        this.isIterable = false;
        this.maxConcurrency = null;
        if (options) {
            this.returnValue = options.returnValue;
            this.acceptsCallback = options.acceptsCallback;
            this.isIterable = options.isIterable;
            this.maxConcurrency = options.maxConcurrency;
        }
    }
    Config.prototype.validate = function () {
        var knownRetVal = [Config.PROMISE, Config.THUNK, Config.RESULT, Config.NONE].indexOf(this.returnValue) !== -1;
        assert(knownRetVal, 'Unrecognised return value: ' + this.returnValue);
        var hasNotifier = this.returnValue !== Config.NONE || this.acceptsCallback;
        assert(hasNotifier, 'At least one notification method must be enabled.');
    };
    return Config;
}());
Config.PROMISE = 'promise';
Config.THUNK = 'thunk';
Config.RESULT = 'result';
Config.NONE = 'none';
module.exports = Config;
//# sourceMappingURL=config.js.map