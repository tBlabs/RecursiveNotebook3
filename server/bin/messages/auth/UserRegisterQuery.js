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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Validation_1 = require("validator.ts/decorator/Validation");
var AddToMessagesProvider_1 = require("../../decorators/AddToMessagesProvider");
var UserRegisterQuery = (function () {
    function UserRegisterQuery() {
    }
    return UserRegisterQuery;
}());
__decorate([
    Validation_1.IsEmail(),
    __metadata("design:type", String)
], UserRegisterQuery.prototype, "email", void 0);
__decorate([
    Validation_1.MinLength(3),
    __metadata("design:type", String)
], UserRegisterQuery.prototype, "password", void 0);
UserRegisterQuery = __decorate([
    AddToMessagesProvider_1.AddToMessagesProvider(),
    inversify_1.injectable()
], UserRegisterQuery);
exports.UserRegisterQuery = UserRegisterQuery;
//# sourceMappingURL=UserRegisterQuery.js.map