"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var auth_1 = require("./services/auth");
var NotesRepo_1 = require("./repositories/NotesRepo");
var Database_1 = require("./database/Database");
var container = new inversify_1.Container();
exports.container = container;
container.bind(Database_1.Database).toSelf();
container.bind("INotesRepo").to(NotesRepo_1.NotesRepo);
container.bind(auth_1.Auth).toSelf();
//# sourceMappingURL=inversify.config.js.map