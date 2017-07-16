import { IQuery } from './../IQuery';
import { guid } from 'app/common/types';

export class UserRegisterQuery implements IQuery<guid>
{
    public email: string;
    public password: string;

    public constructor(init?: Partial<UserRegisterQuery>)
    {
        Object.assign(this, init);
    }
}