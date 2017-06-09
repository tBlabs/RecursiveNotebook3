"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cqrs_1 = require("../cqrs/cqrs");
function AssignMessage(messageClass) {
    return function (target) {
        cqrs_1.Cqrs.RegisterMessageHandler(messageClass.name, target);
    };
}
exports.AssignMessage = AssignMessage;
//# sourceMappingURL=AssignMessage.js.map