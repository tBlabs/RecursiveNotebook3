require('dotenv').config(); // Loads variables from '.env' file to process.env

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { SERVER_EXCEPTIONS } from './shared/errors/errors';
import { ExceptionCode } from './shared/errors/ExceptionCode';
import { Database } from './database/Database';
import { AuthService } from './services/AuthService';
import { Context } from './framework/Context';
import './handlers'; // This import is required here (in app entry point) because of necessity of call AssignMessage for every handler class
import * as express from 'express';
import * as cors from 'express-cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { container } from "./inversify.config";
import { User } from "./framework/User";
import { Claims } from "./framework/Claims";
import { Validator } from "validator.ts/Validator";
import { Contains, IsInt, IsLength, IsEmail, IsFQDN, IsDate } from "validator.ts/decorator/Validation";
import { Cqrs } from "./cqrs/Cqrs";
import { ServerException } from "./shared/errors/errors";
import { injectable } from 'inversify';
import 'reflect-metadata';
import { OK } from 'http-status-codes';
import { Exception } from "./exceptions/Exception";

import { LoginQuery } from './messages/auth/LoginQuery';
import { ValidationErrorInterface } from 'validator.ts/ValidationErrorInterface';


class Startup
{
    public static async HandleCqrsBus(request, respond)
    {
        // TODO: Why this is not working?!?!?!
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'POST');
        // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        let context: Context = new Context();

        try
        {
            let authorizationHeader = request.headers['authorization'];

            if (authorizationHeader)
            {
                let authService = container.resolve(AuthService);
                let user = authService.ExtractUserFromToken(authorizationHeader);

                context.user = user;
            }
        }
        catch (ex)
        {
            console.log("Auth token parse error");
        }


        try
        {
            // let m: string = '{ "LoginQuery": { "email": "tB", "password": "pass" } }';
            // let result = await Cqrs.Execute(JSON.parse(m), context);
            // console.log('Handler result:', result);

            console.log('----------------------------------------------');


            let result = await Cqrs.Execute(request.body, context);

            console.log('Handler result:', result);

            respond.status(OK).send(result);

        }
        catch (ex)
        {
            let serverException: ServerException = SERVER_EXCEPTIONS.find(e => e.code == ExceptionCode.UnhandledException);

            if (ex instanceof Exception)
            {
                let exception: Exception = ex as Exception;
                serverException = SERVER_EXCEPTIONS.find(x => x.code === exception.code);
                serverException.extra = ex.extra;
            }

            console.log("Returned ServerException:", serverException);

            respond.status(serverException.httpStatus).send(JSON.stringify(serverException));
        }
    }


    public static async Start(): Promise<void>
    {
        console.log("*** START ***");
      
        //  if (0)
        {
            let host = express();

            host.use(bodyParser.json());
            // host.use(cors());
            host.all('/*', function (req, res, next)
            {
                res.header("Access-Control-Allow-Origin", "http://localhost:4200");
                res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
                res.header("Access-Control-Allow-Methods", "POST");
                next();
            });


            host.use(express.static(__dirname + '/../../client/dist'));

            host.get('/test', async (req, res) =>
            {
                console.log("/test GET hit!");

                res.status(200).end("This is respond at /test hit.");
            });

            host.post('/api/cqrsbus', (req, res) =>
            {
                this.HandleCqrsBus(req, res);
            });

            let port = process.env.PORT;
            host.listen(port, () => console.log('SERVER STARTED @' + port));
        }
    }
}

Startup.Start();