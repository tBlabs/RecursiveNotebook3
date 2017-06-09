import { guid } from 'app/common/types';
import { StorageService } from './storage.service';
import { CqrsBus } from './cqrs/cqrs-bus.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserRegisterQuery, LoginQuery } from "app/services/cqrs/messages";


export enum LoginStatus { LoggedIn, UserNotFound, WrongPassword, ConnectionProblem }
export enum RegisterStatus { Registered, EmailTaken, ConnectionProblem }


@Injectable()
export class AuthService
{
    public LoginStatusChanged = new BehaviorSubject<boolean>(false);

    constructor(private _cqrs: CqrsBus, private _storage: StorageService)
    {
        console.log("User is " + (this.IsLoggedIn() ? "logged in" : "not logged in"));

        this.LoginStatusChanged.next(this.IsLoggedIn());
    }

    public IsLoggedIn(): boolean
    {
        return (this._storage.GetSessionToken() != "");
    }

    public Login(email: string, pass: string): Observable<LoginStatus>
    {
        let ret = new Subject();

        this._cqrs.Send(new LoginQuery({ email: email, password: pass })).subscribe((token: guid) =>
        {
            console.log("Token: " + token);

            this._storage.SetSessionToken(token);

            ret.next(LoginStatus.LoggedIn);

            this.LoginStatusChanged.next(true);
        },
            (err) =>
            {
                console.log("Err: " + err);

                switch (err)
                {
                    case 404: ret.next(LoginStatus.UserNotFound);
                        break;
                    case 401: ret.next(LoginStatus.WrongPassword);
                        break;
                    default: ret.next(LoginStatus.ConnectionProblem);
                        break;
                }

                this._storage.SetSessionToken("");
            });

        return ret;
    }

    public Register(email: string, pass: string): Observable<RegisterStatus>
    {
        let ret = new Subject();

        this._cqrs.Send(new UserRegisterQuery({ email: email, password: pass })).subscribe((token: guid) =>
        {
            console.log("Token: " + token);

            this._storage.SetSessionToken(token);

            ret.next(RegisterStatus.Registered);

            this.LoginStatusChanged.next(true);
        },
            (err) =>
            {
                console.log("Err: " + err);

                switch (err)
                {
                    case 406: ret.next(RegisterStatus.EmailTaken);
                        break;
                    default: ret.next(LoginStatus.ConnectionProblem);
                        break;
                }
            });

        return ret;
    }

    public Logout(): void
    {
        this._storage.SetSessionToken('');

        this.LoginStatusChanged.next(false);
    }
}