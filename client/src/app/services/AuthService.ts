import { ServerException } from './../shared/errors/errors';
import { CqrsBus } from './cqrs/CqrsBus';
import { guid } from 'app/common/types';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserRegisterQuery, LoginQuery } from "app/services/cqrs/messages";
import Validator from 'better-validator';
import { ExceptionCode } from "../shared/errors/ExceptionCode";

export enum LoginStatus { LoggedIn, UserNotFound, WrongPassword, EmptyInput, ConnectionProblem }
export enum RegisterStatus { Registered, EmailTaken, ConnectionProblem }


@Injectable()
export class AuthService
{
    private loginStatus: Subject<boolean>;

    constructor(private _cqrs: CqrsBus, private _storage: StorageService)
    {
        console.log("User is " + (this.IsLoggedIn() ? "logged in with token " + this._storage.GetSessionToken() : "not logged in"));

        this.loginStatus = new Subject();
    }

    public get LoginStatusChanged(): Subject<boolean>
    {
        return this.loginStatus;
    }

    public IsLoggedIn(): boolean
    {
        return (this._storage.GetSessionToken() !== null);
    }

    public async Login(email: string, pass: string): Promise<LoginStatus>
    {
        try
        {
            // if (email === '' || pass === '') // TODO: real validation
            // {
            //     return LoginStatus.EmptyInput;
            // }
            //throw new ServerException();
            let tokenDTO = await this._cqrs.Send(new LoginQuery({ email: email, password: pass }));

            console.log("Token: " + tokenDTO.token);

            this._storage.SetSessionToken(tokenDTO.token);

            this.loginStatus.next(true);

            return LoginStatus.LoggedIn;
        }
        catch (ex)
        {
            console.log("Login exception: ", ex);

            if (ex instanceof ServerException)
            {
                let serverException: ServerException = ex as ServerException;

                console.log("SERVER EX: ", serverException);

                switch (serverException.code) // TODO
                {
                    case ExceptionCode.UserNotExists: return LoginStatus.UserNotFound;
                    case ExceptionCode.WrongPassword: return LoginStatus.WrongPassword;
                    default: return LoginStatus.ConnectionProblem;
                }
            }
            else 
            {
                console.log("OTHER EX");
                return LoginStatus.ConnectionProblem;
            }
        }
    }


    public async Register(email: string, pass: string): Promise<RegisterStatus>
    {
        try
        {
            let tokenDTO = await this._cqrs.Send(new UserRegisterQuery({ email: email, password: pass }));

            console.log("Token:", tokenDTO.token);

            this._storage.SetSessionToken(tokenDTO.token);

            this.loginStatus.next(true);

            return RegisterStatus.Registered;
        }
        catch (ex)
        {
            console.log("Register exception: ", ex);

            if (ex instanceof ServerException)
            {
                let serverException: ServerException = ex as ServerException;

                console.log("SERVER EX: ", serverException);

                switch (serverException.code) // TODO
                {
                    case ExceptionCode.EmailTaken: return RegisterStatus.EmailTaken;
                    default: return RegisterStatus.ConnectionProblem;
                }
            }
            else 
            {
                console.log("OTHER EX");
                return RegisterStatus.ConnectionProblem;
            }
        }
    }

    public Logout(): void
    {
        this._storage.SetSessionToken('');
        this.loginStatus.next(false);
    }
}