"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("../cqrs/Cqrs");
function AssignMessage(messageClass) {
    return function (target) {
        Cqrs_1.Cqrs.RegisterMessageHandler(messageClass.name, target);
    };
}
exports.AssignMessage = AssignMessage;
//# sourceMappingURL=AssignMessage.js.map