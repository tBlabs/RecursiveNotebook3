import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class DatabaseConfig implements IDatabaseConfig
{
    public connectionString: string = null;

    constructor()
    {
        // if (!!process.env.PORT) // Production/Heroku enviroment
    //   if (1)  {
    //         console.log('Production database');
            
    //         this.connectionString = 'mongodb://admin:password@ds163701.mlab.com:63701/heroku_ghczz41z';
    //     }
    //     else // Development/Local enviroment
    //     {
    //         console.log('Development database');
            
    //         this.connectionString = 'mongodb://localhost:27017/sandbox';
    //     }
        this.connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';
    }
}