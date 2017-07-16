import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AddNoteCommand } from "../../messages/notes/AddNoteCommand";
import { AssignMessage } from "../../decorators/AssignMessage";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";
import { IQueryHandler } from "../../cqrs/IQueryHandler";
import { Exception } from "../../exceptions/Exception";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";

@AssignMessage(AddNoteCommand)
@injectable()
export class AddNoteCommandHandler implements IQueryHandler
{
    constructor(@inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: AddNoteCommand, context: Context): Promise<void>
    {    
        if (!context.user.claims.canAddNote)
        {
            throw new Exception(ExceptionCode.NoPermission);
        }

        let note: NoteEntity = new NoteEntity();
        note.id = command.id;
        note.parentId = command.parentId;
        note.userId = context.user.id;
        note.title = command.title;
        note.content = ''; // Without it 'content' field will not be added to database (this will result with 'undefined' test in content field during rendering)

        return await this._notes.Add(note);
    }
}

