import { CqrsBus } from './cqrs/CqrsBus';
import { Tab } from './../models/tab.model';
import { guid } from 'app/common/types';
import { Http, URLSearchParams, RequestOptionsArgs, ResponseContentType, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { UUID } from "angular2-uuid";
import { GetNotesQuery, AddNoteCommand, UpdateNoteCommand, DeleteNotesCommand } from "app/services/cqrs/messages";

@Injectable()
export class TabsService
{
    constructor(private _cqrs: CqrsBus) { }

    public async GetChildren(parentId: guid): Promise<Tab[]>
    {
        return await this._cqrs.Send(new GetNotesQuery({ parentId: parentId }));
    }

    public async AddSibling(parentId: guid, title: string): Promise<Tab>
    {
        const id: guid = UUID.UUID();
        const tab = new Tab();

        tab.id = id;
        tab.parentId = parentId;
        tab.title = title;
        tab.content = '';

        await this._cqrs.Send(new AddNoteCommand({ id: id, parentId: parentId, title: title }));
            
        return tab; // TODO add try catch
    }

    public async Update(tab: Tab): Promise<void>
    {
        console.log("Update:", tab);
        
        return await this._cqrs.Send(new UpdateNoteCommand(tab));
    }

    public async Delete(id: guid): Promise<void>
    {
        return await this._cqrs.Send(new DeleteNotesCommand({ id: id }));
    }
}
