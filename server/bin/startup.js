"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
require("./handlers");
var express = require("express");
var cors = require("express-cors");
var bodyParser = require("body-parser");
var inversify_config_1 = require("./inversify.config");
var Validator_1 = require("validator.ts/Validator");
var Validation_1 = require("validator.ts/decorator/Validation");
var Cqrs_1 = require("./cqrs/Cqrs");
var errors_1 = require("./shared/errors/errors");
var inversify_1 = require("inversify");
require("reflect-metadata");
var http_status_codes_1 = require("http-status-codes");
var CqrsException_1 = require("./cqrs/CqrsException");
var Post = (function () {
    function Post() {
        this.title = '';
        this.text = '';
        this.rating = 0;
        this.email = '';
        this.site = '';
    }
    return Post;
}());
__decorate([
    Validation_1.IsLength(10, 20),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    Validation_1.Contains('hello'),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    Validation_1.IsInt({ min: 0, max: 1000 }),
    __metadata("design:type", Number)
], Post.prototype, "rating", void 0);
__decorate([
    Validation_1.IsEmail(),
    __metadata("design:type", String)
], Post.prototype, "email", void 0);
__decorate([
    Validation_1.IsFQDN(),
    __metadata("design:type", String)
], Post.prototype, "site", void 0);
exports.Post = Post;
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.Handle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new HandlerException_1.HandlerException(errors_1.Ex.WrongPassword);
            });
        });
    };
    return Handler;
}());
Handler = __decorate([
    inversify_1.injectable()
], Handler);
inversify_config_1.container.bind(Handler).toSelf();
var Cq = (function () {
    function Cq() {
    }
    Cq.Execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hand, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hand = inversify_config_1.container.get(Handler);
                        return [4, hand.Handle()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        ex_1 = _a.sent();
                        throw ex_1;
                    case 3: return [2];
                }
            });
        });
    };
    return Cq;
}());
var Startup = (function () {
    function Startup() {
    }
    Startup.Route = function () {
        return __awaiter(this, void 0, void 0, function () {
            var y, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Cq.Execute()];
                    case 1:
                        y = _a.sent();
                        console.log("xxxxxxxxxxxxXyyyyyyX: ", y);
                        return [3, 3];
                    case 2:
                        ex_2 = _a.sent();
                        console.log("exxxxxxxx: ", ex_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    Startup.HandleCqrsBus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var context, authorizationHeader, authService, user, result, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new Context_1.Context();
                        if (req) {
                            authorizationHeader = req.headers['authorization'];
                            if (authorizationHeader) {
                                authService = inversify_config_1.container.resolve(auth_1.Auth);
                                user = authService.ExtractUserFromToken(authorizationHeader);
                                context.user = user;
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
                        ex_3 = _a.sent();
                        if (ex_3 instanceof HandlerException_1.HandlerException) {
                            console.log("Handler exception:", ex_3);
                            if (ex_3.exception !== undefined) {
                                if (res)
                                    res.status(ex_3.exception.httpStatus).send(ex_3.exception);
                            }
                        }
                        else if (ex_3 instanceof CqrsException_1.CqrsException) {
                            console.log("CQRS Engine exception:", ex_3);
                            if (res)
                                res.status(500).send(ex_3.message);
                        }
                        else {
                            console.log("Undefined exception");
                            if (res)
                                res.status(500).send("Undefined exception");
                        }
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Startup.Start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var post, validator, errors, host, port_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("*** START ***");
                        if (!0) return [3, 2];
                        Cqrs_1.Cqrs.PrintMessagesHandlers();
                        return [4, this.HandleCqrsBus(null, null)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (0) {
                            try {
                                post = new Post();
                                post.title = 'Hello there man!';
                                post.text = 'hello';
                                post.rating = 121;
                                post.email = 'g@goo gle.com';
                                post.site = 'www.wp.pl';
                                validator = new Validator_1.Validator();
                                errors = validator.validateOrThrow(post);
                                if (errors)
                                    console.log(errors);
                            }
                            catch (ex) {
                                console.log('ex: ', ex);
                            }
                            console.log("---------------------");
                        }
                        {
                            host = express();
                            host.use(bodyParser.json());
                            host.use(cors());
                            host.use(express.static(__dirname + '/../../client/dist'));
                            host.get('/test', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                                var y, ex_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("/test GET hit!");
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4, Cq.Execute()];
                                        case 2:
                                            y = _a.sent();
                                            console.log("aaaaaaaaa: ", y);
                                            return [3, 4];
                                        case 3:
                                            ex_4 = _a.sent();
                                            console.log("bbbbbbbbb: ", ex_4);
                                            return [3, 4];
                                        case 4:
                                            res.status(200).end("This is respond for /test hit.");
                                            return [2];
                                    }
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