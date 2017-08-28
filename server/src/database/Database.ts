import { injectable, inject } from 'inversify';
import 'reflect-metadata'
import { MongoClient, Collection, MongoError, Db } from 'mongodb';


@injectable()
export class Database
{
    private _mongo: MongoClient = null;
    private _db: Db = null;

    constructor() 
    {
        this._mongo = new MongoClient();
    }

    private async Connect(): Promise<Db>
    {
        console.log('connection string:', process.env.MONGODB_URI);
        
        this._db = await this._mongo.connect(process.env.MONGODB_URI);

        return this._db;
    }

    public async Clean(collection: string): Promise<void>
    {
        await this.Connect();

        return await this._db.collection(collection).drop();
    }

    public async Open(collection: string): Promise<Collection>
    {
        try
        {
            await this.Connect();

            return await this._db.collection(collection);
        }
        catch (error)
        {
            console.log("MongoDb collection open exception: ", error);

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