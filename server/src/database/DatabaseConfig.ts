import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class DatabaseConfig implements IDatabaseConfig
{
    public connectionString: string = 'mongodb://admin:password@ds163701.mlab.com:63701/heroku_ghczz41z' || 'mongodb://localhost:27017/sandbox';
}