"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var errors_1 = require("./shared/errors/errors");
var ExceptionCode_1 = require("./shared/errors/ExceptionCode");
var auth_1 = require("./services/auth");
var Context_1 = require("./framework/Context");
require("./handlers");
var express = require("express");
var bodyParser = require("body-parser");
var inversify_config_1 = require("./inversify.config");
var Cqrs_1 = require("./cqrs/Cqrs");
require("reflect-metadata");
var http_status_codes_1 = require("http-status-codes");
var Exception_1 = require("./exceptions/Exception");
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Base1 = (function (_super) {
    __extends(Base1, _super);
    function Base1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Base1;
}(Base));
var Base2 = (function (_super) {
    __extends(Base2, _super);
    function Base2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Base2;
}(Base));
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(Base1));
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(Base2));
var Startup = (function () {
    function Startup() {
    }
    Startup.HandleCqrsBus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var context, authorizationHeader, authService, user, result, ex_1, serverException, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new Context_1.Context();
                        if (req) {
                            try {
                                authorizationHeader = req.headers['authorization'];
                                if (authorizationHeader) {
                                    authService = inversify_config_1.container.resolve(auth_1.Auth);
                                    user = authService.ExtractUserFromToken(authorizationHeader);
                                    context.user = user;
                                }
                            }
                            catch (ex) {
                                console.log("Auth token parse error");
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!req) return [3, 3];
                        return [4, Cqrs_1.Cqrs.Execute(req.body, context)];
                    case 2:
                        result = _a.sent();
                        console.log('Handler result:', result);
                        if (res)
                            res.status(http_status_codes_1.OK).send(result);
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        ex_1 = _a.sent();
                        serverException = errors_1.SERVER_EXCEPTIONS.find(function (e) { return e.code == ExceptionCode_1.ExceptionCode.UnhandledException; });
                        if (ex_1 instanceof Exception_1.Exception) {
                            exception_1 = ex_1;
                            serverException = errors_1.SERVER_EXCEPTIONS.find(function (x) { return x.code === exception_1.code; });
                            serverException.extra = ex_1.extra;
                        }
                        console.log("Returned ServerException:", serverException);
                        if (res)
                            res.status(serverException.httpStatus).send(JSON.stringify(serverException));
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Startup.Start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var a, host, port_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("*** START ***");
                        console.log("ASDF: ", process.env.ASDF);
                        if (0) {
                            a = new A();
                            if (a instanceof A)
                                console.log('a is A');
                            if (a instanceof Base1)
                                console.log('a is Base1');
                            if (a instanceof Base)
                                console.log('a is Base');
                        }
                        if (!0) return [3, 2];
                        Cqrs_1.Cqrs.PrintMessagesHandlers();
                        return [4, this.HandleCqrsBus(null, null)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (0) {
                            try {
                            }
                            catch (ex) {
                                console.log('ex: ', ex);
                            }
                            console.log("---------------------");
                        }
                        {
                            host = express();
                            host.use(bodyParser.json());
                            host.all('/*', function (req, res, next) {
                                res.header("Access-Control-Allow-Origin", "http://localhost:4200");
                                res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
                                res.header("Access-Control-Allow-Methods", "POST");
                                next();
                            });
                            host.use(express.static(__dirname + '/../../client/dist'));
                            host.get('/test', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log("/test GET hit!");
                                    try {
                                    }
                                    catch (ex) {
                                        console.log("bbbbbbbbb: ", ex);
                                    }
                                    res.status(200).end("This is respond for /test hit.");
                                    return [2];
                                });
                            }); });
                            host.post('/api/cqrsbus', function (req, res) {
                                _this.HandleCqrsBus(req, res);
                            });
                            port_1 = process.env.PORT || 3000;
                            host.listen(port_1, function () { return console.log('SERVER STARTED @' + port_1); });
                        }
                        return [2];
                }
            });
        });
    };
    return Startup;
}());
Startup.Start();
//# sourceMappingURL=startup.js.map