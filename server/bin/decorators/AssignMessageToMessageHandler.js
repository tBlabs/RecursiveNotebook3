"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("../cqrs/Cqrs");
var inversify_config_1 = require("../inversify.config");
function AssignMessageToMessageHandler(messageClass) {
    return function (messageHandlerClass) {
        var cqrs = inversify_config_1.container.get(Cqrs_1.Cqrs);
        cqrs.RegisterMessageHandler(messageClass.name, messageHandlerClass);
    };
}
exports.AssignMessageToMessageHandler = AssignMessageToMessageHandler;
//# sourceMappingURL=AssignMessageToMessageHandler.js.map