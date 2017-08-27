import { injectable } from 'inversify';
import { IsEmail, MinLength } from 'validator.ts/decorator/Validation';
import { AddToMessagesProvider } from "../../decorators/AddToMessagesProvider";

@AddToMessagesProvider()
@injectable()
export class LoginQuery
{
    @IsEmail()
    email: string = '';

    @MinLength(3)
    password: string = '';
}