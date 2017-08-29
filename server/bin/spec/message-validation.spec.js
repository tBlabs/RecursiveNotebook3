describe('Message Validator', function () {
    it('should convert plain text message to message object', function () {
        var message = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        var requestBodyAsObject = JSON.parse(message);
    });
});
//# sourceMappingURL=message-validation.spec.js.map