import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { Database } from "../../database/Database";
import { UserRegisterQuery } from "../../messages/auth/UserRegisterQuery";
import { UserEntity } from "../../entities/UserEntity";
import { v4 as RandomGuid } from 'uuid';
import { Auth } from "../../services/auth";
import { User } from "../../framework/User";
import { AssignMessage } from "../../decorators/AssignMessage";
import { Claims } from "../../framework/Claims";
import { IQueryHandler } from "../../cqrs/IQueryHandler";

@AssignMessage(UserRegisterQuery)
@injectable()
export class UserRegisterQueryHandler implements IQueryHandler
{
    constructor(private _db: Database, private _auth: Auth) { }

    public async Handle(query: UserRegisterQuery, context: Context): Promise<any>
    {
        let collection = await this._db.Open('users');

        let item = await collection.findOne({ email: query.email });

        if (item)
        {
      //      throw new UserAlreadyExistsException();
        }

        let newUserClaims = new Claims();
        newUserClaims.canAddNote = true;
        newUserClaims.canChangeNote = true;
        newUserClaims.canDeleteNotes = true;
        newUserClaims.canReadNote = true;

        let userEntity: UserEntity = new UserEntity();
        userEntity.email = query.email;
        userEntity.password = query.password;
        userEntity.id = RandomGuid();
        userEntity.insertTime = new Date();
        userEntity.lastLoginTime = new Date(0);
        userEntity.claims = newUserClaims;

        await collection.insertOne(userEntity);

        let user = new User();
        user.id = userEntity.id;
        user.claims = userEntity.claims;

        let token = this._auth.GenerateTokenForUser(userEntity);

        return token;
    }
}

