import { guid } from 'app/common/types';
import { ICommand } from './../ICommand.interface';

export class DeleteNotesCommand implements ICommand
{
    public id: guid;

    public constructor(init?: Partial<DeleteNotesCommand>)
    {
        Object.assign(this, init);
    }
}
