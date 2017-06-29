import { ErrorService } from './../ErrorService';
import { MdSnackBar } from '@angular/material';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICommand } from './ICommand.interface';
import { IQuery } from './IQuery.interface';
import { StorageService } from './../storage.service';
import 'rxjs';

@Injectable()
export class CqrsBus
{
    private API: string = 'api/cqrsbus';

    constructor(
        private _http: Http,
        private _storage: StorageService,
        private _errorService: ErrorService)
    {
        if (!!process.env.PORT) // Heroku enviroment
        {
            console.log("Production host");

            this.API = 'api/cqrsbus';
        }
        else // Local/test enviroment
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
            let response = await this._http.post(this.API, messageAsJson, options).toPromise();

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
        catch (ex)
        {
          //  console.log('ex:',ex);
          //  console.log('ex.json:',ex.json());
            
            let exception = JSON.parse(ex);

            console.log('[CQRS.Send] Message exception: ', exception);

            if (ex.status === 0)
            {
                this._errorService.Error("Server is not responding");
            }

            this._errorService.Error(exception.message);


            throw exception;
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