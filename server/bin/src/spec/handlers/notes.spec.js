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
var UnathorizedException_1 = require("./../../handlers/exceptions/UnathorizedException");
var Context_1 = require("./../../framework/Context");
var AddNoteCommand_1 = require("./../../messages/notes/AddNoteCommand");
var AddNoteCommandHandler_1 = require("./../../handlers/notes/AddNoteCommandHandler");
var NotesRepo_mock_1 = require("./NotesRepo.mock");
describe("Notes handlers", function () {
    var notesRepo = null;
    var addNoteCommandHandler = null;
    var addNoteCommand = null;
    var context = null;
    beforeEach(function () {
        notesRepo = new NotesRepo_mock_1.NotesRepoMock();
        addNoteCommandHandler = new AddNoteCommandHandler_1.AddNoteCommandHandler(notesRepo);
        addNoteCommand = new AddNoteCommand_1.AddNoteCommand();
        addNoteCommand.id = "00000000-1111-2222-3333-000000000000";
        addNoteCommand.parentId = "10000000-1111-2222-3333-000000000000";
        addNoteCommand.title = "note title";
        context = new Context_1.Context();
    });
    it("should add note", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.user.claims.canAddNote = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, addNoteCommandHandler.Handle(addNoteCommand, context)];
                case 2:
                    result = _a.sent();
                    expect(result).toBe(void 0);
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(true).toBeFalsy("Should never get here!!!");
                    return [3, 4];
                case 4:
                    done();
                    return [2];
            }
        });
    }); });
    it("should throw unathorized exception", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.user.claims.canAddNote = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, addNoteCommandHandler.Handle(addNoteCommand, context)];
                case 2:
                    result = _a.sent();
                    expect(true).toBeFalsy('Should never get here!!!');
                    return [3, 4];
                case 3:
                    e_2 = _a.sent();
                    expect(e_2.message).toBe(new UnathorizedException_1.UnathorizedException().message);
                    return [3, 4];
                case 4:
                    done();
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=notes.spec.js.map