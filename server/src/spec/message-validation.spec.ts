describe('Message Validator', ()=>
{
    it('should convert plain text message to message object', () =>
    {
        let message = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        let requestBodyAsObject = JSON.parse(message); // Normally this would be parsed by express engine (if request header is set to json)

    });
});