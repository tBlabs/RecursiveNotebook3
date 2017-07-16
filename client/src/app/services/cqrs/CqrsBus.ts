import { ConnectionTimeoutException } from './../../exceptions/ConnectionTimeoutException';
import { UnhandledException } from './../../exceptions/UnhandledException';
import { IQuery } from './IQuery';
import { ICommand } from './ICommand';
import { ErrorService } from './../ErrorService';
import { MdSnackBar } from '@angular/material';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { StorageService } from './../storage.service';
import { TimeoutError } from "rxjs";
import { Dupa } from "../Dupa";
import { ServerException } from "../../shared/errors/errors";

@Injectable()
export class CqrsBus
{
    private API: string = 'api/cqrsbus';

    constructor(
        private _http: Http,
        private _storage: StorageService,
        private _errorService: ErrorService)
    {
        if (!!process.env.PORT) // Production/Heroku enviroment
        {
            console.log("Production host");

            this.API = 'api/cqrsbus';   
        }
        else // Development/Local enviroment
        {
            console.log("Local host");

            this.API = 'http://localhost:3000/api/cqrsbus';
        }
    }


    public async Send(message: ICommand | IQuery<any>): Promise<any>
    {
        // Message class ---into---> { class_name: { class_fields }}
        const messagePackage = {};
        messagePackage[message.constructor.name] = message;
        const messageAsJson = JSON.stringify(messagePackage);

        console.log('Sending message:', messageAsJson);


        const headers = new Headers(
            {
                'Content-type': 'application/json',
                'Authorization': this._storage.GetSessionToken()
            });
        const options = new RequestOptions({ headers: headers });

        try
        {
            let response: Response = await this._http.post(this.API, messageAsJson, options).timeout(3000).toPromise();
            console.log('POST Response:',response);

            if (response.text() !== '')
            {
                let responseAsObject = response.json();

                console.log('Message result: ' + JSON.stringify(responseAsObject));

                return responseAsObject;
            }
            else 
            {
                console.log('Message result: (empty)');

                return null;
            }
        }
        catch (ex) // Jump here in case of non 200 respond
        {
            console.log('[CQRS Bus] ex:', ex);

            //  if (1) throw new ServerException();

            if (ex instanceof TimeoutError) // We don't get here if server is disabled
            {
                console.log("TIMEOUT");
                this._errorService.Error("Connection timeout");
                throw new ConnectionTimeoutException();
            }
            else if (ex instanceof Response)
            {
                if (ex.status === 0) // We get here if server is disabled
                {
                    this._errorService.Error("Server is not responding");
                    // throw new ServerNonResponsiveException();
                }
                else
                {
                    let serverException: ServerException = ex.json();

                    console.log('[CQRS.Send] ServerException: ', serverException);
                    this._errorService.Error(serverException.message);

                    throw new ServerException(serverException);
                }
            }
            else 
            {
                console.log("Unhandled exception type");
                this._errorService.Error('Unhandled exception');
                throw new UnhandledException();
            }
        }


        // return this._http
        //     .post(this.API, messageAsJson, options)
        //     .map(response =>
        //     {
        //         if (response.text() !== '')
        //         {
        //             return response.json();
        //         }
        //         else 
        //         {
        //             return null;
        //         }
        //     })
        //     .do(x => 
        //     {
        //         console.log('[CQRS.Send] Message result: ' + JSON.stringify(x))
        //     })
        //     .catch((e, c) =>
        //     {
        //         console.log('[CQRS.Send] Message exception: ', e);

        //         return Observable.throw(e.status);
        //     });
    }
}