import { IsEmail, MinLength } from 'validator.ts/decorator/Validation';

export class LoginQuery
{
    @IsEmail()
    email: string = '';

    @MinLength(3)
    password: string = '';
}