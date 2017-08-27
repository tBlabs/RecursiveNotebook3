"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("./../cqrs/Cqrs");
function AddToMessagesProvider() {
    return function (messageClass) {
        Cqrs_1.Cqrs.RegisterMessage(messageClass.name, messageClass);
    };
}
exports.AddToMessagesProvider = AddToMessagesProvider;
//# sourceMappingURL=AddToMessagesProvider.js.map