import { ICommand } from './../ICommand';
import { guid } from 'app/common/types';

export class DeleteNotesCommand implements ICommand
{
    public id: guid;

    public constructor(init?: Partial<DeleteNotesCommand>)
    {
        Object.assign(this, init);
    }
}
