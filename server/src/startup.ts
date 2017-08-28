require('dotenv').config(); // Loads variables from '.env' file to process.env

import { container } from "./inversify.config"; // This must be before handlers import (messages and handlers uses decorators which uses container)

import { Exception } from "./exceptions/Exception";
import { ServerException } from "./shared/errors/errors";
import { SERVER_EXCEPTIONS } from './shared/errors/errors';
import { ExceptionCode } from './shared/errors/ExceptionCode';
import { AuthService } from './services/AuthService';
import { Context } from './framework/Context';
import './handlers'; // This import is required here (in app entry point) because of necessity of call AssignMessage for every handler class
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User } from "./framework/User";
import { Claims } from "./framework/Claims";
import { Cqrs } from "./cqrs/Cqrs";
import { OK } from 'http-status-codes';


class Startup
{
    public static async HandleCqrsBus(request, respond)
    {
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
            console.log('----------------------------------------------');

            let cqrs: Cqrs = container.get(Cqrs);
            cqrs.PrintMessagesAndTheirHandlers();
            let result = await cqrs.Execute(request.body, context);

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

        let host = express();

        host.use(bodyParser.json());

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

            res.status(OK).end("This is respond at /test hit.");
        });

        host.post('/api/cqrsbus', (req, res) =>
        {
            this.HandleCqrsBus(req, res);
        });

        let port = process.env.PORT;
        host.listen(port, () => console.log('SERVER STARTED @' + port));
    }
}

Startup.Start();