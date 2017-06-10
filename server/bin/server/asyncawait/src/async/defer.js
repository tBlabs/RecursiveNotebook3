"use strict";
var Promise = require("bluebird");
function defer() {
    var resolve, reject;
    var promise = new Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}
module.exports = defer;
//# sourceMappingURL=defer.js.map