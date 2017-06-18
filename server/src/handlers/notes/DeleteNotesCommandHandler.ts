import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AssignMessage } from "../../decorators/AssignMessage";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";
import { DeleteNotesCommand } from "../../messages/notes/DeleteNotesCommand";
import { IQueryHandler } from "../../cqrs/IQueryHandler";


@AssignMessage(DeleteNotesCommand)
@injectable()
export class DeleteNotesCommandHandler implements IQueryHandler
{
    constructor( @inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: DeleteNotesCommand, context: Context): Promise<void>
    {
        if (!context.user.claims.canDeleteNotes)
        {
    //        throw new UnathorizedException();
        }

        return await this._notes.Delete(command.id, context.user.id);
    }
}

