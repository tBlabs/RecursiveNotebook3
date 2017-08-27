import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { GetNotesQuery } from "../../messages/notes/GetNotesQuery";
import { AssignMessageToMessageHandler } from "../../decorators/AssignMessageToMessageHandler";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NoteDto } from "../../dataTransferObjects/NoteDto";
import { NotesRepo } from "../../repositories/NotesRepo";
import { IQueryHandler } from "../../cqrs/IQueryHandler";

@AssignMessageToMessageHandler(GetNotesQuery)
@injectable()
export class GetNotesQueryHandler implements IQueryHandler
{
    private _notes: INotesRepo;

    constructor(@inject("INotesRepo") _notes: INotesRepo)
    {
        this._notes = _notes;
    }

    public async Handle(query: GetNotesQuery, context: Context): Promise<NoteDto[]>
    {
        if (!context.user.claims.canReadNote) 
        {
        //    throw new UnathorizedException();
        }

        return await this._notes.GetChildren(query.parentId, context.user.id);
    }
}

