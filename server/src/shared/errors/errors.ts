import { OK, UNAUTHORIZED } from "http-status-codes";

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
    message: string;
    httpStatus: number;
}

export const SERVER_EXCEPTIONS: ServerException[] =
    [
        { code: Ex.NoError, type: ExType.Success, message: "No error", httpStatus: OK },
        { code: Ex.Unauthorized, type: ExType.Warning, message: "Unauthorized", httpStatus: UNAUTHORIZED },
        { code: Ex.WrongPassword, type: ExType.Warning, message: "Wrong password", httpStatus: UNAUTHORIZED },
        { code: Ex.InvalidUserEmail, type: ExType.Warning, message: "Invalid user email", httpStatus: UNAUTHORIZED },
    ];