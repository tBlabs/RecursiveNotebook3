import { guid } from 'app/common/types';
import { StorageService } from './storage.service';
import { CqrsBus } from './cqrs/cqrs-bus.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserRegisterQuery, LoginQuery } from "app/services/cqrs/messages";
import Validator from 'better-validator';

export enum LoginStatus { LoggedIn, UserNotFound, WrongPassword, EmptyInput, ConnectionProblem }
export enum RegisterStatus { Registered, EmailTaken, ConnectionProblem }


@Injectable()
export class AuthService
{
    constructor(private _cqrs: CqrsBus, private _storage: StorageService)
    {
        console.log("User is " + (this.IsLoggedIn() ? "logged in with token " + this._storage.GetSessionToken() : "not logged in"));
    }

    public IsLoggedIn(): boolean
    {
        return (this._storage.GetSessionToken() !== null);
    }

    public async Login(email: string, pass: string): Promise<LoginStatus>
    {
        try
        {
            if (email === '' || pass === '') // TODO: real validation
            {
                return LoginStatus.EmptyInput;
            }

            let token = await this._cqrs.Send(new LoginQuery({ email: email, password: pass }));

            console.log("Token: " + token);

            this._storage.SetSessionToken(token);

            return LoginStatus.LoggedIn;
        }
        catch (ex)
        {
            console.log("Login exception: ", ex);

            this._storage.ClearSessionToken();

            switch (ex) // TODO
            {
                case 404: return LoginStatus.UserNotFound;
                case 401: return LoginStatus.WrongPassword;
                default: return LoginStatus.ConnectionProblem;
            }
        }
    }


    public async Register(email: string, pass: string): Promise<RegisterStatus>
    {
        try
        {
            let token: guid = await this._cqrs.Send(new UserRegisterQuery({ email: email, password: pass }));

            console.log("Token:", token);

            this._storage.SetSessionToken(token);

            return RegisterStatus.Registered;
        }
        catch (ex)
        {
            console.log("Ex: ", ex);

            switch (ex)
            {
                case 406: return RegisterStatus.EmailTaken;
                default: return RegisterStatus.ConnectionProblem;
            }
        }
    }

    public Logout(): void
    {
        this._storage.SetSessionToken('');
    }
}