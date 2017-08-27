import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AssignMessageToMessageHandler } from "../../decorators/AssignMessageToMessageHandler";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";
import { DeleteNotesCommand } from "../../messages/notes/DeleteNotesCommand";
import { IQueryHandler } from "../../cqrs/IQueryHandler";
import { Exception } from "../../exceptions/Exception";
import { ExceptionCode } from "../../shared/errors/ExceptionCode";


@AssignMessageToMessageHandler(DeleteNotesCommand)
@injectable()
export class DeleteNotesCommandHandler implements IQueryHandler
{
    constructor( @inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: DeleteNotesCommand, context: Context): Promise<void>
    {
        if (!context.user.claims.canDeleteNotes)
        {
            throw new Exception(ExceptionCode.NoPermission);
        }

        return await this._notes.Delete(command.id, context.user.id);
    }
}

