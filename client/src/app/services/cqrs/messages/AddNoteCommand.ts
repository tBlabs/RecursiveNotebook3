import { guid } from 'app/common/types';
import { ICommand } from './../ICommand.interface';

export class AddNoteCommand implements ICommand
{
    public id: guid;
    public parentId: guid;
    public title: string;

    public constructor(init?: Partial<AddNoteCommand>)
    {
        Object.assign(this, init);
    }
}
