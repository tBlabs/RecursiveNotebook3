import { guid } from 'app/common/types';
import { Tab } from './../../../models/tab.model';
import { IQuery } from './../IQuery.interface';

export class GetNotesQuery implements IQuery<Tab[]>
{
    public parentId: guid;

    public constructor(init?: Partial<GetNotesQuery>)
    {
        Object.assign(this, init);
    }
}

