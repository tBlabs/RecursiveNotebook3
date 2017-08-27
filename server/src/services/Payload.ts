import { v4 } from 'uuid';
import { guid } from "../types";
import { Claims } from "../framework/Claims";

export class Payload
{
    userId: guid;
    userClaims: Claims;

    random: guid;
    creationTime: Date;
    expirationTime: Date;

    constructor()
    {
        this.random = v4();
        this.creationTime = new Date();
        this.expirationTime = new Date();
    }
}