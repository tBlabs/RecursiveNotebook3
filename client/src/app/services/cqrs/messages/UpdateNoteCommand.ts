import { Tab } from './../../../models/tab.model';
import { ICommand } from './../ICommand.interface';
import { guid } from "app/common/types";

export class UpdateNoteCommand implements ICommand
{
    public id: guid;
    public parentId: guid;
    public title: string;
    public content: string;

    public constructor(tab: Tab)
    {
        this.id = tab.id;
        this.parentId = tab.parentId;
        this.title = tab.title;
        this.content = tab.content;
    }
}
