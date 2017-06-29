import { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from "http-status-codes";

enum ExType
{
    Success,
    Warning,
    Error
}

export enum Ex
{
    NoError,
    CqrsException,
    Unauthorized,
    WrongPassword,
    EmailTaken,
    UserNotExists,
    NoPermissionToCreateNote,
    NoPermissionToReadNote,
    NoPermissionToUpdateNote,
    NoPermissionToDeleteNote,
    InvalidUserEmail,
    InvalidUserPassword,
    InvalidNoteTitle,
}

export class ServerException
{
    code: Ex;
    type: ExType;
    message: string; // for client
    httpStatus: number = INTERNAL_SERVER_ERROR;
    extra?: any; // additional payload, for example a validation particular message 
}

export const SERVER_EXCEPTIONS: ServerException[] =
    [
        { code: Ex.NoError, type: ExType.Success, message: "No error", httpStatus: OK },
        { code: Ex.CqrsException, type: ExType.Error, message: "CQRS Bus Error", httpStatus: 500 },
        { code: Ex.Unauthorized, type: ExType.Warning, message: "Unauthorized", httpStatus: UNAUTHORIZED },
        { code: Ex.WrongPassword, type: ExType.Warning, message: "WrongPassword", httpStatus: UNAUTHORIZED },
        { code: Ex.EmailTaken, type: ExType.Warning, message: "EmailTaken", httpStatus: UNAUTHORIZED },
        { code: Ex.UserNotExists, type: ExType.Warning, message: "UserNotExists", httpStatus: UNAUTHORIZED },
        { code: Ex.NoPermissionToCreateNote, type: ExType.Warning, message: "NoPermissionToCreateNote", httpStatus: UNAUTHORIZED },
        { code: Ex.NoPermissionToReadNote, type: ExType.Warning, message: "NoPermissionToReadNote", httpStatus: UNAUTHORIZED },
        { code: Ex.NoPermissionToUpdateNote, type: ExType.Warning, message: "NoPermissionToUpdateNote", httpStatus: UNAUTHORIZED },
        { code: Ex.NoPermissionToDeleteNote, type: ExType.Warning, message: "NoPermissionToDeleteNote", httpStatus: UNAUTHORIZED },
        { code: Ex.InvalidUserEmail, type: ExType.Warning, message: "InvalidUserEmail", httpStatus: UNAUTHORIZED },
        { code: Ex.InvalidUserPassword, type: ExType.Warning, message: "InvalidUserPassword", httpStatus: UNAUTHORIZED },
        { code: Ex.InvalidNoteTitle, type: ExType.Warning, message: "InvalidNoteTitle", httpStatus: UNAUTHORIZED }
    ];