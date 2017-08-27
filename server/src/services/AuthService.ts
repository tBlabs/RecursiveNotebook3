import { injectable } from 'inversify';
import 'reflect-metadata'
import { User } from './../framework/User';
import { v4 } from 'uuid';
import { decode, encode } from 'jwt-simple';
import { guid } from "../types";
import { Claims } from "../framework/Claims";
import { Payload } from "./Payload";


@injectable()
export class AuthService
{
    private secret = "kjlvsakjlfwopnt45kjfddsvbjksadfljgdlsfkjgdsklfjg";

    public GenerateTokenForUser(user: User): string
    {
        let payload = new Payload();
        payload.userId = user.id;
        payload.userClaims = user.claims;
        payload.expirationTime.setDate(payload.creationTime.getDate() + 100); // +100 days

        return encode(payload, this.secret);      
    }

    ExtractUserFromToken(token: string): User
    {
        let payload: Payload = decode(token, this.secret, false);

        let user: User = new User();
        user.id = payload.userId;
        user.claims = payload.userClaims;

        return user;
    }
}