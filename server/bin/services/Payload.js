"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Payload = (function () {
    function Payload() {
        this.random = uuid_1.v4();
        this.creationTime = new Date();
        this.expirationTime = new Date();
    }
    return Payload;
}());
exports.Payload = Payload;
//# sourceMappingURL=Payload.js.map