require('dotenv').config(); // Loads variables from '.env' file to process.env


import { LoginQuery } from './../../messages/auth/LoginQuery';
import { LoginQueryHandler } from './../../handlers/auth/LoginQueryHandler';
import { Exception } from "../../exceptions/Exception";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";
import { Cqrs } from "../../cqrs/Cqrs";


fdescribe('LoginQuery', async () =>
{
    it('should throw exception on non existing user', async (done) =>
    {
        let message = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        let requestBodyAsObject = JSON.parse(message); // Normally this would be parsed by express engine (if request header is set to json)

        try
        {
       //     let result = await Cqrs.Execute(requestBodyAsObject, null);

            expect(true).toBeFalsy();

            console.log("SHOULD NEVER GET HERE UNLESS non_existing_user@test.com EXISTS IN DATABASE!");

            done();
        }
        catch (ex)
        {
            let exception: Exception = ex as Exception;

            expect(exception.code).toBe(ExceptionCode.UserNotExists);

            done();
        }
    });


    it('should pass', async (done) =>
    {
        

        let message = '{ "LoginQuery": { "email": "non_existing_user@test.com", "password": "validPassword" } }';
        let requestBodyAsObject = JSON.parse(message); // Normally this would be parsed by express engine (if request header is set to json)

        try
        {
        //    let result = await Cqrs.Execute(requestBodyAsObject, null);

            expect(true).toBeFalsy();

            console.log("SHOULD NEVER GET HERE UNLESS non_existing_user@test.com EXISTS IN DATABASE!");

            done();
        }
        catch (ex)
        {
            let exception: Exception = ex as Exception;

            expect(exception.code).toBe(ExceptionCode.UserNotExists);

            done();
        }
    });

 
});