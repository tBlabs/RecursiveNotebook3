import { guid } from 'app/common/types';
import { IQuery } from './../IQuery.interface';

export class LoginQuery implements IQuery<guid>
{
    public email: string;
    public password: string;

    public constructor(init?: Partial<LoginQuery>)
    {
        Object.assign(this, init);
    }
}