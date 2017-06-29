"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../shared/errors/errors");
var HandlerException = (function () {
    function HandlerException(exCode) {
        this.exception = errors_1.SERVER_EXCEPTIONS.find(function (x) { return x.code === exCode; });
        if (this.exception === undefined)
            console.log("EEEEEEEEEEEE: " + JSON.stringify(this.exception));
    }
    return HandlerException;
}());
exports.HandlerException = HandlerException;
//# sourceMappingURL=HandlerException.js.map