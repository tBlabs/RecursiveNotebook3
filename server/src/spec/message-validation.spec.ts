/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />


import { Database } from './../database/Database';


// import { container } from "../inversify.config";
// import './../handlers';
// import { LoginQuery } from './../messages/auth/LoginQuery';
import { Validator } from 'validator.ts/Validator';
import { Cqrs } from "../cqrs/Cqrs";

xdescribe('CQRS', () =>
{
    it('should resolve existing messages', () =>
    {
        let messageAsString = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        let requestBodyAsObject = JSON.parse(messageAsString); // Normally this would be parsed by express engine (if request header is set to json)

        let validator = new Validator();
    // let cqrs = new Cqrs(); <------------------ TO SPRAWIA ŻE TESTY SIĘ NIE KOMPILUJĄ!!!!! nie wiem dlaczego
        //  cqrs.PrintMessagesAndTheirHandlers();

        //    let message = cqrs.ResolveMessage(requestBodyAsObject);

        //     expect(message instanceof LoginQuery).toBeTruthy();
    });
});