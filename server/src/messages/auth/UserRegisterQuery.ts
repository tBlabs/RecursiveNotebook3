import { IsEmail } from 'validator.ts/decorator/Validation';

export class UserRegisterQuery
{
    @IsEmail()
    email: string;

    password: string;

    // Validate()
    // {
    //     if (IsEmail(this.email) && IsPassword(this.password)) return true;

    //     return flase;
    // }
}