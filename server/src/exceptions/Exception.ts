import { ExceptionCode } from "../shared/errors/ExceptionCode";

export class Exception
{
    constructor(public code: ExceptionCode, public extra?: any)
    {
        
    }
}