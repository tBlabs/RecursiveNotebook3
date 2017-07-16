"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var ExType;
(function (ExType) {
    ExType[ExType["Success"] = 0] = "Success";
    ExType[ExType["Warning"] = 1] = "Warning";
    ExType[ExType["Error"] = 2] = "Error";
})(ExType || (ExType = {}));
var Ex;
(function (Ex) {
    Ex[Ex["NoError"] = 0] = "NoError";
    Ex[Ex["CqrsException"] = 1] = "CqrsException";
    Ex[Ex["Unauthorized"] = 2] = "Unauthorized";
    Ex[Ex["WrongPassword"] = 3] = "WrongPassword";
    Ex[Ex["EmailTaken"] = 4] = "EmailTaken";
    Ex[Ex["UserNotExists"] = 5] = "UserNotExists";
    Ex[Ex["NoPermissionToCreateNote"] = 6] = "NoPermissionToCreateNote";
    Ex[Ex["NoPermissionToReadNote"] = 7] = "NoPermissionToReadNote";
    Ex[Ex["NoPermissionToUpdateNote"] = 8] = "NoPermissionToUpdateNote";
    Ex[Ex["NoPermissionToDeleteNote"] = 9] = "NoPermissionToDeleteNote";
    Ex[Ex["InvalidUserEmail"] = 10] = "InvalidUserEmail";
    Ex[Ex["InvalidUserPassword"] = 11] = "InvalidUserPassword";
    Ex[Ex["InvalidNoteTitle"] = 12] = "InvalidNoteTitle";
})(Ex = exports.Ex || (exports.Ex = {}));
var ServerException = (function () {
    function ServerException() {
    }
    return ServerException;
}());
exports.ServerException = ServerException;
exports.SERVER_EXCEPTIONS = [
    { code: Ex.NoError, type: ExType.Success, message: "No error", httpStatus: http_status_codes_1.OK },
    { code: Ex.CqrsException, type: ExType.Error, message: "CQRS Bus Error", httpStatus: http_status_codes_1.INTERNAL_SERVER_ERROR },
    { code: Ex.Unauthorized, type: ExType.Warning, message: "Unauthorized", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.WrongPassword, type: ExType.Warning, message: "Wrong password", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.EmailTaken, type: ExType.Warning, message: "Email taken", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.UserNotExists, type: ExType.Warning, message: "User not exists", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.NoPermissionToCreateNote, type: ExType.Warning, message: "No permission to create note", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.NoPermissionToReadNote, type: ExType.Warning, message: "No permission to read note", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.NoPermissionToUpdateNote, type: ExType.Warning, message: "No permission to update note", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.NoPermissionToDeleteNote, type: ExType.Warning, message: "No permission to delete note", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.InvalidUserEmail, type: ExType.Warning, message: "Invalid user email", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.InvalidUserPassword, type: ExType.Warning, message: "Invalid user password", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: Ex.InvalidNoteTitle, type: ExType.Warning, message: "Invalid note title", httpStatus: http_status_codes_1.UNAUTHORIZED }
];
//# sourceMappingURL=errors.js.map