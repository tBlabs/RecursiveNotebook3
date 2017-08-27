import { guid } from "../types";
import { NoteEntity } from "../entities/NoteEntity";
import { NoteDto } from "../dataTransferObjects/NoteDto";

export interface INotesRepo
{
    Add(note: NoteEntity): Promise<void>;
    GetChildren(parentId: guid, userId: guid): Promise<NoteDto[]>;
    Update(note: NoteEntity): Promise<void>;
    Delete(parentId: guid, userId: guid): Promise<void>;
}
