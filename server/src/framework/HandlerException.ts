import { ServerException } from './../shared/errors/errors';
import { HttpStatusCode } from "../types";
import { Ex, SERVER_EXCEPTIONS } from "../shared/errors/errors";

export class HandlerException
{
    // public message: string;
    // public statusCode: HttpStatusCode;
    //public exception: Exception;
    // public payload: ExceptionPayload;
    public exception: ServerException;

    constructor(exCode: Ex//, public payload: any
    )
    {
        this.exception = SERVER_EXCEPTIONS.find(x => x.code === exCode);
     //   console.log("EEEEEEEEEEEE: "+JSON.stringify(this.exception));
        
    
        // this.message = msg;
        // this.statusCode = code;
    }
}