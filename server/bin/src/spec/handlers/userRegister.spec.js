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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("./../../framework/Context");
var auth_1 = require("./../../services/auth");
var UserRegisterQueryHandler_1 = require("./../../handlers/auth/UserRegisterQueryHandler");
var UserRegisterQuery_1 = require("../../messages/auth/UserRegisterQuery");
var Database_1 = require("../../database/Database");
var HandlerException_1 = require("../../framework/HandlerException");
var inversify_config_1 = require("../../inversify.config");
describe('User Register Query Handler', function () {
    var userRegisterQuery = null;
    var userRegisterQueryHandler = null;
    var database = null;
    var auth = null;
    var context = null;
    beforeEach(function () {
        database = inversify_config_1.container.resolve(Database_1.Database);
        auth = new auth_1.Auth();
        userRegisterQuery = new UserRegisterQuery_1.UserRegisterQuery();
        userRegisterQueryHandler = new UserRegisterQueryHandler_1.UserRegisterQueryHandler(database, auth);
        context = new Context_1.Context();
    });
    it('should register new user', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var jwt, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, database.Clean('users')];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, userRegisterQueryHandler.Handle(userRegisterQuery, context)];
                case 3:
                    jwt = _a.sent();
                    expect(jwt).toMatch(/[\w\d-]{10,200}\.[\w\d-]{10,500}\.[\w\d-]{10,200}/gm);
                    return [3, 5];
                case 4:
                    error_1 = _a.sent();
                    return [3, 5];
                case 5:
                    done();
                    return [2];
            }
        });
    }); });
    it('should not register user again (email taken error)', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var ex_1, e;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, database.Clean('users')];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4, userRegisterQueryHandler.Handle(userRegisterQuery, context)];
                case 3:
                    _a.sent();
                    return [4, userRegisterQueryHandler.Handle(userRegisterQuery, context)];
                case 4:
                    _a.sent();
                    return [3, 6];
                case 5:
                    ex_1 = _a.sent();
                    if (ex_1 instanceof HandlerException_1.HandlerException) {
                        e = ex_1;
                        expect(e.message).toBe("Email taken");
                    }
                    return [3, 6];
                case 6:
                    done();
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=userRegister.spec.js.map