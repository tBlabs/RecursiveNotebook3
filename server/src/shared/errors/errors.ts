import { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } from "http-status-codes";
import { ExceptionCode } from "./ExceptionCode";

export class ServerException
{
    code: ExceptionCode;
    message: string; // for client
    httpStatus: number;
    extra?: any; // additional payload, for example a validation particular message 

    public constructor(init?: Partial<any>)
    {
        Object.assign(this, init);
    }
}

export const SERVER_EXCEPTIONS: ServerException[] =
    [
        { code: ExceptionCode.UnhandledException, message: "Unhandled exception", httpStatus: INTERNAL_SERVER_ERROR },
        { code: ExceptionCode.CanNotResolveMessage, message: "Unknown message", httpStatus: BAD_REQUEST },
        { code: ExceptionCode.CanNotResolveMessageHandler, message: "No handler for message", httpStatus: BAD_REQUEST },
        { code: ExceptionCode.Unauthorized, message: "Unauthorized", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.WrongPassword, message: "Wrong password", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.EmailTaken, message: "Email already taken", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.UserNotExists, message: "User not exists", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.NoPermission, message: "No permission", httpStatus: UNAUTHORIZED },   
        { code: ExceptionCode.InvalidUserEmail, message: "Invalid user email", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.InvalidUserPassword, message: "Invalid user password", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.InvalidNoteTitle, message: "Invalid note title", httpStatus: UNAUTHORIZED },
        { code: ExceptionCode.ValidationProblem, message: "Validation problem", httpStatus: BAD_REQUEST }
    ];