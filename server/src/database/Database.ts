import { injectable, inject } from 'inversify';
import 'reflect-metadata'
import { MongoClient, Collection, MongoError, Db } from 'mongodb';


@injectable()
export class Database
{
    private _connectionString: string = '';
    private _mongo: MongoClient = null;
    private _db: Db = null;

    constructor() 
    {
        this._mongo = new MongoClient();
        this._connectionString = process.env.MONGODB_URI;
    }

    private async Connect(): Promise<Db>
    {
        return await this._mongo.connect(this._connectionString);
    }

    public async Clean(collection: string): Promise<void>
    {
        let db = await this.Connect();

        return await db.collection(collection).drop();
    }

    public async Open(collection: string): Promise<Collection>
    {
        try
        {
            let db = await this.Connect();

            return await db.collection(collection);
        }
        catch (error)
        {
            console.log("Collection open exception: ", error);

            throw error;
        }
    }

    public async Close(): Promise<void>
    {
        if (this._db !== null)
        {
            return await this._db.close();
        }    
    }
}