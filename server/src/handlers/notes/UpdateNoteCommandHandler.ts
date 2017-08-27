import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AssignMessageToMessageHandler } from "../../decorators/AssignMessageToMessageHandler";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";
import { UpdateNoteCommand } from "../../messages/notes/UpdateNoteCommand";
import { ICommandHandler } from "../../cqrs/ICommandHandler";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";
import { Exception } from "../../exceptions/Exception";


@AssignMessageToMessageHandler(UpdateNoteCommand)
@injectable()
export class UpdateNoteCommandHandler implements ICommandHandler
{
    constructor(@inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: UpdateNoteCommand, context: Context): Promise<void>
    {
        if (!context.user.claims.canChangeNote)
        {
            throw new Exception(ExceptionCode.Unauthorized);
        }

        let note: NoteEntity = new NoteEntity();
        note.id = command.id;
        note.parentId = command.parentId;
        note.userId = context.user.id;
        note.title = command.title;
        note.content = command.content;

        return await this._notes.Update(note);
    }
}

