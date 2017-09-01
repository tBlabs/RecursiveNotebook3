"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("validator.ts/Validator");
xdescribe('CQRS', function () {
    it('should resolve existing messages', function () {
        var messageAsString = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        var requestBodyAsObject = JSON.parse(messageAsString);
        var validator = new Validator_1.Validator();
    });
});
//# sourceMappingURL=message-validation.spec.js.map