import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { SERVER_EXCEPTIONS } from './shared/errors/errors';
import { ExceptionCode } from './shared/errors/ExceptionCode';
import { Database } from './database/Database';
import { Auth } from './services/auth';
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

interface IA { }
class Base { }
class Base1 extends Base { }
class Base2 extends Base { }
class A extends Base1 implements IA { }
class B extends Base2 { }

class Startup
{
    public static async HandleCqrsBus(req, res)
    {
        // TODO: Why this is not working?!?!?!
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'POST');
        // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        let context: Context = new Context();

        if (req)
        {
            try
            {
                let authorizationHeader = req.headers['authorization'];

                if (authorizationHeader)
                {
                    let authService = container.resolve(Auth);
                    let user = authService.ExtractUserFromToken(authorizationHeader);

                    context.user = user;
                }
            }
            catch (ex)
            {
                console.log("Auth token parse error");
            }
        }

        try
        {
            // let m: string = '{ "LoginQuery": { "email": "tB", "password": "pass" } }';
            // let result = await Cqrs.Execute(JSON.parse(m), context);
            // console.log('Handler result:', result);

            if (req)
            {
                let result = await Cqrs.Execute(req.body, context);

                console.log('Handler result:', result);

                if (res) res.status(OK).send(result);
            }
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


            if (res)
                res.status(serverException.httpStatus).send(JSON.stringify(serverException));
        }
    }


    public static async Start(): Promise<void>
    {
        console.log("*** START ***");
     //   console.log("ASDF: ",process.env.ASDF);
        if (0)
        {
            let a = new A();
            if (a instanceof A) console.log('a is A');
            if (a instanceof Base1) console.log('a is Base1');
            if (a instanceof Base) console.log('a is Base');
            //  if (a instanceof IA) console.log('a is IA');

            // let b = new B();
            // if (b instanceof A) console.log('b is A');
            // if (b instanceof Base2) console.log('b is Base2');
            // if (b instanceof Base) console.log('b is Base');

        }

        if (0)
        {
            // this.Route();
            Cqrs.PrintMessagesHandlers();
            await this.HandleCqrsBus(null, null);
        }

        if (0)
        {
            try
            {
                // let post = new Post();
                // post.title = 'Hello there man!'; // should not pass 
                // post.text = 'hello'; // should not pass 
                // post.rating = 121; // should not pass 
                // post.email = 'g@goo gle.com'; // should not pass 
                // post.site = 'www.wp.pl'; // should not pass 
                //     let date = new Date();
                //    console.log(date.getUTCDate());
                //     post.createDate = date;

                // let validator = new Validator();
                // let errors = validator.validateOrThrow(post);
                // if (errors)
                //     console.log(errors);
            }
            catch (ex)
            {
                console.log('ex: ', ex);

            }
            console.log("---------------------");
        }

        // if (0)
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
            //  host.use(express.static('static'));
            //ls  console.log("public dir: "+__dirname);

            //   host.use('/public', express.static('/home/tb/Projects/RecursiveNotebook3/server/src/public'));
            //  host.use('/public', express.static(__dirname+'/../src/public'));
            //     host.use('/public', express.static(__dirname+'/../src/public'));
            host.use(express.static(__dirname + '/../../client/dist'));

            host.get('/test', async (req, res) =>
            {
                console.log("/test GET hit!");

                try
                {
                    // let y = await Cq.Execute();
                    // console.log("aaaaaaaaa: ", y);
                }
                catch (ex)
                {
                    console.log("bbbbbbbbb: ", ex);

                }


                res.status(200).end("This is respond for /test hit.");
            });

            host.post('/api/cqrsbus', (req, res) =>
            {
                this.HandleCqrsBus(req, res);
            });

            let port = process.env.PORT || 3000;
            host.listen(port, () => console.log('SERVER STARTED @' + port));
        }
    }
}

Startup.Start();

// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// app.get('/', function (request, response)
// {
//     console.log("HIT!!!");

//     response.send("hello there!");
// });

// app.listen(app.get('port'), function ()
// {
//     console.log('Node app is running on port', app.get('port'));
// });


