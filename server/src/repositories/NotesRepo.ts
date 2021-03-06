import { injectable } from 'inversify';
import 'reflect-metadata';
import { NoteEntity } from "../entities/NoteEntity";
import { Database } from "../database/Database";
import { guid } from "../types";
import { INotesRepo } from "./INotesRepo";
import { UpdateWriteOpResult, Cursor, Collection } from "mongodb";

@injectable()
export class NotesRepo implements INotesRepo
{
    private collectionName = 'notes';

    constructor(private _db: Database) { }

    public async Add(note: NoteEntity): Promise<void>
    {
        try
        {
            let collection = await this._db.Open(this.collectionName);

            await collection.insertOne(note);

            this._db.Close();
        }
        catch (ex)
        {
            console.log(ex);
        }
    }

    public async Update(note: NoteEntity): Promise<void>
    {
        let collection = await this._db.Open(this.collectionName);

        let result: UpdateWriteOpResult = await collection.updateOne({ id: note.id, userId: note.userId }, { $set: note });

        if (!result.result.ok) throw new Error('Can not update note with id ' + note.id);

        this._db.Close();
    }

    public async GetChildren(parentId: guid, userId: guid): Promise<any> // userId field is required because of initial parentId is equal empty guid for every user
    {
        let collection = await this._db.Open(this.collectionName);

        let cursor: Cursor = collection.find(
            { parentId: parentId, userId: userId },
            { _id: 0, id: 1, parentId: 1, title: 1, content: 1 });

        let res = cursor.toArray();

        this._db.Close();

        return res;
    }

    private notesToDelete: guid[] = [];

    private async FindChildren(collection: Collection, parentId: guid, userId: guid): Promise<void>
    {
        this.notesToDelete.push(parentId);

        let cursor: Cursor = await collection.find({ parentId: parentId, userId: userId }, { _id: 0, id: 1 });
        let children: any[] = await cursor.toArray(); // Not a NoteEntity[] !
        let childrenIds = children.map(x => x.id);

        for (let i = 0; i < childrenIds.length; i++)
        {
            await this.FindChildren(collection, childrenIds[i], userId);
        }
    }

    public async Delete(parentId: guid, userId: guid): Promise<void> // every user can have many notes with parentId equal empty guid
    {
        this.notesToDelete = [];

        let collection = await this._db.Open(this.collectionName);

        await this.FindChildren(collection, parentId, userId);

        for (let i = 0; i < this.notesToDelete.length; i++)
        {
            await collection.deleteOne({ id: this.notesToDelete[i] }); // TODO: switch to deleteMany
        }

        this._db.Close();
    }
}