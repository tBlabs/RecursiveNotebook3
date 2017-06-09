"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerException_1 = require("../../framework/HandlerException");
var WrongPasswordException = (function (_super) {
    __extends(WrongPasswordException, _super);
    function WrongPasswordException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = "Wrong password";
        _this.statusCode = 401;
        return _this;
    }
    return WrongPasswordException;
}(HandlerException_1.HandlerException));
exports.WrongPasswordException = WrongPasswordException;
//# sourceMappingURL=WrongPasswordException.js.map