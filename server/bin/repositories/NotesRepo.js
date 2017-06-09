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
var Database_1 = require("../database/Database");
var NotesRepo = (function () {
    function NotesRepo(_db) {
        this._db = _db;
        this.collectionName = 'notes';
        this.notesToDelete = [];
    }
    NotesRepo.prototype.Add = function (note) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this._db.Open(this.collectionName)];
                    case 1:
                        collection = _a.sent();
                        return [4, collection.insertOne(note)];
                    case 2:
                        _a.sent();
                        this._db.Close();
                        return [3, 4];
                    case 3:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    NotesRepo.prototype.Update = function (note) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._db.Open(this.collectionName)];
                    case 1:
                        collection = _a.sent();
                        return [4, collection.updateOne({ id: note.id, userId: note.userId }, { $set: note })];
                    case 2:
                        result = _a.sent();
                        if (!result.result.ok)
                            throw new Error('Can not update note with id ' + note.id);
                        this._db.Close();
                        return [2];
                }
            });
        });
    };
    NotesRepo.prototype.GetChildren = function (parentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, cursor, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._db.Open(this.collectionName)];
                    case 1:
                        collection = _a.sent();
                        cursor = collection.find({ parentId: parentId, userId: userId }, { _id: 0, id: 1, parentId: 1, title: 1, content: 1 });
                        res = cursor.toArray();
                        this._db.Close();
                        return [2, res];
                }
            });
        });
    };
    NotesRepo.prototype.FindChildren = function (collection, parentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var cursor, children, childrenIds, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.notesToDelete.push(parentId);
                        return [4, collection.find({ parentId: parentId, userId: userId }, { _id: 0, id: 1 })];
                    case 1:
                        cursor = _a.sent();
                        return [4, cursor.toArray()];
                    case 2:
                        children = _a.sent();
                        childrenIds = children.map(function (x) { return x.id; });
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < childrenIds.length)) return [3, 6];
                        return [4, this.FindChildren(collection, childrenIds[i], userId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6: return [2];
                }
            });
        });
    };
    NotesRepo.prototype.Delete = function (parentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.notesToDelete = [];
                        return [4, this._db.Open(this.collectionName)];
                    case 1:
                        collection = _a.sent();
                        return [4, this.FindChildren(collection, parentId, userId)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < this.notesToDelete.length)) return [3, 6];
                        return [4, collection.deleteOne({ id: this.notesToDelete[i] })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6:
                        this._db.Close();
                        return [2];
                }
            });
        });
    };
    return NotesRepo;
}());
NotesRepo = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Database_1.Database])
], NotesRepo);
exports.NotesRepo = NotesRepo;
//# sourceMappingURL=NotesRepo.js.map