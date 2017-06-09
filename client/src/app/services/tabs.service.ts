import { Tab } from './../models/tab.model';
import { guid } from 'app/common/types';
import { CqrsBus } from './cqrs/cqrs-bus.service';
import { Http, URLSearchParams, RequestOptionsArgs, ResponseContentType, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { UUID } from "angular2-uuid";
import { GetNotesQuery, AddNoteCommand, UpdateNoteCommand, DeleteNotesCommand } from "app/services/cqrs/messages";

@Injectable()
export class TabsService
{
    constructor(private _cqrs: CqrsBus) { }

    public GetChildren(parentId: guid): Observable<Tab[]>
    {
        return this._cqrs.Send(new GetNotesQuery({ parentId: parentId }));
    }

    public AddSibling(parentId: guid, title: string): Observable<Tab>
    {
        const id: guid = UUID.UUID();
        const tab = new Tab();

        tab.id = id;
        tab.parentId = parentId;
        tab.title = title;
        tab.content = '';

        return this._cqrs.Send(new AddNoteCommand({ id: id, parentId: parentId, title: title }))
            .map(() => tab);
    }

    public Update(tab: Tab): Observable<void>
    {
        console.log("Update:", tab);
        
        return this._cqrs.Send(new UpdateNoteCommand(tab));
    }

    public Delete(id: guid): Observable<void>
    {
        return this._cqrs.Send(new DeleteNotesCommand({ id: id }));
    }
}
