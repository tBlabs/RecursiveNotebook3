"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var inversify_config_1 = require("./inversify.config");
require("./handlers");
var Exception_1 = require("./exceptions/Exception");
var errors_1 = require("./shared/errors/errors");
var ExceptionCode_1 = require("./shared/errors/ExceptionCode");
var AuthService_1 = require("./services/AuthService");
var Context_1 = require("./framework/Context");
var express = require("express");
var bodyParser = require("body-parser");
var Cqrs_1 = require("./cqrs/Cqrs");
var http_status_codes_1 = require("http-status-codes");
var Startup = (function () {
    function Startup() {
    }
    Startup.HandleCqrsBus = function (request, respond) {
        return __awaiter(this, void 0, void 0, function () {
            var context, authorizationHeader, authService, user, cqrs, result, ex_1, serverException, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new Context_1.Context();
                        try {
                            authorizationHeader = request.headers['authorization'];
                            if (authorizationHeader) {
                                authService = inversify_config_1.container.resolve(AuthService_1.AuthService);
                                user = authService.ExtractUserFromToken(authorizationHeader);
                                context.user = user;
                            }
                        }
                        catch (ex) {
                            console.log("Auth token parse error");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('----------------------------------------------');
                        cqrs = inversify_config_1.container.get(Cqrs_1.Cqrs);
                        return [4, cqrs.Execute(request.body, context)];
                    case 2:
                        result = _a.sent();
                        console.log('Handler result:', result);
                        respond.status(http_status_codes_1.OK).send(result);
                        return [3, 4];
                    case 3:
                        ex_1 = _a.sent();
                        serverException = errors_1.SERVER_EXCEPTIONS.find(function (e) { return e.code == ExceptionCode_1.ExceptionCode.UnhandledException; });
                        if (ex_1 instanceof Exception_1.Exception) {
                            exception_1 = ex_1;
                            serverException = errors_1.SERVER_EXCEPTIONS.find(function (x) { return x.code === exception_1.code; });
                            serverException.extra = ex_1.extra;
                        }
                        console.log("Returned ServerException:", serverException);
                        respond.status(serverException.httpStatus).send(JSON.stringify(serverException));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Startup.Start = function () {
        var _this = this;
        console.log("*** START ***");
        var host = express();
        host.use(bodyParser.json());
        host.all('/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
            res.header("Access-Control-Allow-Methods", "POST");
            next();
        });
        host.use(express.static(__dirname + '/../../client/dist'));
        host.get('/test', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("/test GET hit!");
                res.status(http_status_codes_1.OK).end("This is respond at /test hit.");
                return [2];
            });
        }); });
        host.post('/api/cqrsbus', function (req, res) {
            _this.HandleCqrsBus(req, res);
        });
        var port = process.env.PORT;
        host.listen(port, function () { return console.log('SERVER STARTED @' + port); });
    };
    return Startup;
}());
Startup.Start();
//# sourceMappingURL=startup.js.map