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
var inversify_1 = require("inversify");
require("reflect-metadata");
var Database_1 = require("../../database/Database");
var UserRegisterQuery_1 = require("../../messages/auth/UserRegisterQuery");
var UserEntity_1 = require("../../entities/UserEntity");
var uuid_1 = require("uuid");
var auth_1 = require("../../services/auth");
var User_1 = require("../../framework/User");
var AssignMessageToMessageHandler_1 = require("../../decorators/AssignMessageToMessageHandler");
var Claims_1 = require("../../framework/Claims");
var ExceptionCode_1 = require("../../shared/errors/ExceptionCode");
var Exception_1 = require("../../exceptions/Exception");
var UserRegisterQueryHandler = (function () {
    function UserRegisterQueryHandler(_db, _auth) {
        this._db = _db;
        this._auth = _auth;
    }
    UserRegisterQueryHandler.prototype.Handle = function (query, context) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, item, newUserClaims, userEntity, user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = null;
                        item = null;
                        return [4, this._db.Open('users')];
                    case 1:
                        collection = _a.sent();
                        return [4, collection.findOne({ email: query.email })];
                    case 2:
                        item = _a.sent();
                        if (item) {
                            throw new Exception_1.Exception(ExceptionCode_1.ExceptionCode.EmailTaken);
                        }
                        newUserClaims = new Claims_1.Claims();
                        newUserClaims.canAddNote = true;
                        newUserClaims.canChangeNote = true;
                        newUserClaims.canDeleteNotes = true;
                        newUserClaims.canReadNote = true;
                        userEntity = new UserEntity_1.UserEntity();
                        userEntity.email = query.email;
                        userEntity.password = query.password;
                        userEntity.id = uuid_1.v4();
                        userEntity.insertTime = new Date();
                        userEntity.lastLoginTime = new Date(0);
                        userEntity.claims = newUserClaims;
                        return [4, collection.insertOne(userEntity)];
                    case 3:
                        _a.sent();
                        user = new User_1.User();
                        user.id = userEntity.id;
                        user.claims = userEntity.claims;
                        token = this._auth.GenerateTokenForUser(userEntity);
                        return [2, { token: token }];
                }
            });
        });
    };
    return UserRegisterQueryHandler;
}());
UserRegisterQueryHandler = __decorate([
    AssignMessageToMessageHandler_1.AssignMessageToMessageHandler(UserRegisterQuery_1.UserRegisterQuery),
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Database_1.Database, auth_1.Auth])
], UserRegisterQueryHandler);
exports.UserRegisterQueryHandler = UserRegisterQueryHandler;
//# sourceMappingURL=UserRegisterQueryHandler.js.map