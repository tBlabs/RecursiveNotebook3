"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var ExceptionCode_1 = require("./ExceptionCode");
var ServerException = (function () {
    function ServerException(init) {
        Object.assign(this, init);
    }
    return ServerException;
}());
exports.ServerException = ServerException;
exports.SERVER_EXCEPTIONS = [
    { code: ExceptionCode_1.ExceptionCode.UnhandledException, message: "Unhandled exception", httpStatus: http_status_codes_1.INTERNAL_SERVER_ERROR },
    { code: ExceptionCode_1.ExceptionCode.CanNotResolveMessageHandler, message: "Unrecognized message", httpStatus: http_status_codes_1.BAD_REQUEST },
    { code: ExceptionCode_1.ExceptionCode.Unauthorized, message: "Unauthorized", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.WrongPassword, message: "Wrong password", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.EmailTaken, message: "Email taken", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.UserNotExists, message: "User not exists", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.NoPermission, message: "No permission", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.InvalidUserEmail, message: "Invalid user email", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.InvalidUserPassword, message: "Invalid user password", httpStatus: http_status_codes_1.UNAUTHORIZED },
    { code: ExceptionCode_1.ExceptionCode.InvalidNoteTitle, message: "Invalid note title", httpStatus: http_status_codes_1.UNAUTHORIZED }
];
//# sourceMappingURL=errors.js.map