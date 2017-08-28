"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cqrs_1 = require("./../cqrs/Cqrs");
var inversify_config_1 = require("../inversify.config");
function AddToMessagesProvider() {
    return function (messageClass) {
        var cqrs = inversify_config_1.container.get(Cqrs_1.Cqrs);
        cqrs.RegisterMessage(messageClass.name, messageClass);
    };
}
exports.AddToMessagesProvider = AddToMessagesProvider;
//# sourceMappingURL=AddToMessagesProvider.js.map