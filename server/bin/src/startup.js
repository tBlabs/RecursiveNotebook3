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
var auth_1 = require("./services/auth");
var HandlerException_1 = require("./framework/HandlerException");
var Context_1 = require("./framework/Context");
var cqrs_1 = require("./cqrs/cqrs");
require("./handlers");
var express = require("express");
var cors = require("express-cors");
var bodyParser = require("body-parser");
var inversify_config_1 = require("./inversify.config");
var Startup = (function () {
    function Startup() {
    }
    Startup.Start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var host, port_1, packageAsString, context_1, messagePackage, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("*** START ***");
                        cqrs_1.Cqrs.PrintMessagesHandlers();
                        if (!1) return [3, 1];
                        host = express();
                        host.use(bodyParser.json());
                        host.use(cors());
                        host.use(express.static(__dirname + '/../../client/dist'));
                        host.get('/test', function (req, res) {
                            console.log("/test GET hit!");
                            res.status(200).end("This is respond for /test hit.");
                        });
                        host.post('/api/cqrsbus', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                            var context, authorizationHeader, authService, user, result, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        context = new Context_1.Context();
                                        authorizationHeader = req.headers['authorization'];
                                        if (authorizationHeader) {
                                            authService = inversify_config_1.container.resolve(auth_1.Auth);
                                            user = authService.ExtractUserFromToken(authorizationHeader);
                                            context.user = user;
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, cqrs_1.Cqrs.Execute(req.body, context)];
                                    case 2:
                                        result = _a.sent();
                                        console.log("Handle result:", result);
                                        res.status(200).end(JSON.stringify(result));
                                        return [3, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        console.log("Handle exception:", error_2);
                                        if (error_2 instanceof HandlerException_1.HandlerException) {
                                            if (error_2.statusCode) {
                                                res.status(error_2.statusCode).end(error_2.message);
                                            }
                                        }
                                        return [3, 4];
                                    case 4: return [2];
                                }
                            });
                        }); });
                        port_1 = process.env.PORT || 3000;
                        host.listen(port_1, function () { return console.log('SERVER STARTED @' + port_1); });
                        return [3, 5];
                    case 1:
                        console.log("*** TEST MODE ***");
                        packageAsString = '{ "UpdateNoteCommand": { "id": "8574c9e6-a4b9-4b4a-3165-1d2f21061df9", "parentId": "ad39954b-3ea9-2c68-244d-a58ae1eee927", "title": "new title", "content": "new content" } }';
                        context_1 = new Context_1.Context();
                        context_1.user.id = "575af61d-6ff2-40b2-8afa-b295d2a4e489";
                        context_1.user.claims.canReadNote = true;
                        context_1.user.claims.canAddNote = true;
                        context_1.user.claims.canChangeNote = true;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        messagePackage = JSON.parse(packageAsString);
                        return [4, cqrs_1.Cqrs.Execute(messagePackage, context_1)];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        return [3, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    return Startup;
}());
Startup.Start();
//# sourceMappingURL=startup.js.map