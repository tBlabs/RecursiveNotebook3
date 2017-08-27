"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("../cqrs/Cqrs");
function AssignMessageToMessageHandler(messageClass) {
    return function (messageHandlerClass) {
        Cqrs_1.Cqrs.RegisterMessageHandler(messageClass.name, messageHandlerClass);
    };
}
exports.AssignMessageToMessageHandler = AssignMessageToMessageHandler;
//# sourceMappingURL=AssignMessageToMessageHandler.js.map