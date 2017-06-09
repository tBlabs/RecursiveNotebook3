"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./../../database/Database");
var NoteEntity_1 = require("./../../entities/NoteEntity");
var NotesRepo_1 = require("./../../repositories/NotesRepo");
var inversify_config_1 = require("../../inversify.config");
var inversify_1 = require("inversify");
require("reflect-metadata");
var TestDatabaseConfig = (function () {
    function TestDatabaseConfig() {
        this.connectionString = 'mongodb://localhost:27017/test';
    }
    return TestDatabaseConfig;
}());
TestDatabaseConfig = __decorate([
    inversify_1.injectable()
], TestDatabaseConfig);
function BuildNote(id, parentId) {
    var noteEntity = new NoteEntity_1.NoteEntity();
    noteEntity.id = id;
    noteEntity.parentId = parentId;
    noteEntity.userId = "00000000-afaf-0000-0000-000000000000";
    noteEntity.title = "title";
    noteEntity.content = "content";
    return noteEntity;
}
describe('NotesRepo', function () {
    var notesRepo = null;
    beforeEach(function () {
        inversify_config_1.container.unbind("IDatabaseConfig");
        inversify_config_1.container.bind("IDatabaseConfig").to(TestDatabaseConfig);
        var db = inversify_config_1.container.resolve(Database_1.Database);
        db.Clean('notes');
        notesRepo = new NotesRepo_1.NotesRepo(db);
    });
    it('should delete', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var noteEntity, notes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000000");
                    return [4, notesRepo.Add(noteEntity)];
                case 1:
                    _a.sent();
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000002", "00000000-0000-0000-0000-000000000000");
                    return [4, notesRepo.Add(noteEntity)];
                case 2:
                    _a.sent();
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000003", "00000000-0000-0000-0000-000000000000");
                    return [4, notesRepo.Add(noteEntity)];
                case 3:
                    _a.sent();
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000004", "00000000-0000-0000-0000-000000000003");
                    return [4, notesRepo.Add(noteEntity)];
                case 4:
                    _a.sent();
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000005", "00000000-0000-0000-0000-000000000004");
                    return [4, notesRepo.Add(noteEntity)];
                case 5:
                    _a.sent();
                    noteEntity = BuildNote("00000000-0000-0000-0000-000000000006", "00000000-0000-0000-0000-000000000004");
                    return [4, notesRepo.Add(noteEntity)];
                case 6:
                    _a.sent();
                    return [4, notesRepo.Delete("00000000-0000-0000-0000-000000000000", "00000000-afaf-0000-0000-000000000000")];
                case 7:
                    _a.sent();
                    return [4, notesRepo.GetChildren(noteEntity.parentId, noteEntity.userId)];
                case 8:
                    notes = _a.sent();
                    expect(notes.length).toBe(0);
                    done();
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=NotesRepo.spec.js.map