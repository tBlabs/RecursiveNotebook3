"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var User_1 = require("./../framework/User");
var uuid_1 = require("uuid");
var jwt_simple_1 = require("jwt-simple");
var Payload = (function () {
    function Payload() {
        this.random = uuid_1.v4();
        this.creationTime = new Date();
        this.expirationTime = new Date();
    }
    return Payload;
}());
exports.Payload = Payload;
var Auth = (function () {
    function Auth() {
        this.secret = "kjlvsakjlfwopnt45kjfddsvbjksadfljgdlsfkjgdsklfjg";
    }
    Auth.prototype.GenerateTokenForUser = function (user) {
        var payload = new Payload();
        payload.userId = user.id;
        payload.userClaims = user.claims;
        payload.expirationTime.setDate(payload.creationTime.getDate() + 100);
        return jwt_simple_1.encode(payload, this.secret);
    };
    Auth.prototype.ExtractUserFromToken = function (token) {
        var payload = jwt_simple_1.decode(token, this.secret, false);
        var user = new User_1.User();
        user.id = payload.userId;
        user.claims = payload.userClaims;
        return user;
    };
    return Auth;
}());
Auth = __decorate([
    inversify_1.injectable()
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map