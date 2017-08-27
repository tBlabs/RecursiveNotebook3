"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("../cqrs/Cqrs");
function AssignMessage(messageClass) {
    return function (messageHandlerClass) {
        Cqrs_1.Cqrs.RegisterMessageHandler(messageClass.name, messageHandlerClass);
    };
}
exports.AssignMessage = AssignMessage;
//# sourceMappingURL=AssignMessage.js.map