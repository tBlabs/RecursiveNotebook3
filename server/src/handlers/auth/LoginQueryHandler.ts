import { Exception } from './../../exceptions/Exception';
import { UserEntity } from './../../entities/UserEntity';
import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { Database } from "../../database/Database";
import { AuthService } from "../../services/AuthService";
import { User } from "../../framework/User";
import { LoginQuery } from "../../messages/auth/LoginQuery";
import { AssignMessageToMessageHandler } from "../../decorators/AssignMessageToMessageHandler";
import { Validator } from "validator.ts/Validator";
import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";
import { IQueryHandler } from "../../cqrs/IQueryHandler";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";
import { FindAndModifyWriteOpResultObject, Collection } from "mongodb";

@AssignMessageToMessageHandler(LoginQuery)
@injectable()
export class LoginQueryHandler implements IQueryHandler
{
    constructor(private _db: Database, private _auth: AuthService) { }

    public async Handle(query: LoginQuery, context: Context): Promise<any>
    {
        let usersCollection: Collection = await this._db.Open('users');

        let entry: FindAndModifyWriteOpResultObject = await usersCollection.findOneAndUpdate(
            { email: query.email },
            { $set: { lastLoginTime: new Date() } }
        );

        if ((entry.ok != 1) || (entry.value == null))
        {
            throw new Exception(ExceptionCode.UserNotExists);
        }

        let userEntity: UserEntity = entry.value;

        if (userEntity.password != query.password)
        {
            throw new Exception(ExceptionCode.WrongPassword);
        }

        let user = new User();
        user.id = userEntity.id;
        user.claims = userEntity.claims;

        let token: string = this._auth.GenerateTokenForUser(userEntity);

        return { token: token };
    }
}


