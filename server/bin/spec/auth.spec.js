"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthService_1 = require("../services/AuthService");
var User_1 = require("../framework/User");
var Claims_1 = require("../framework/Claims");
xdescribe('auth service', function () {
    var auth = new AuthService_1.AuthService();
    var guid = "12341234-1234-1234-1234-123412341234";
    it('should generate JWT token', function () {
        var user = new User_1.User();
        user.id = guid;
        user.claims = new Claims_1.Claims();
        var token = auth.GenerateTokenForUser(user);
        console.log(token);
        var decodedUser = auth.ExtractUserFromToken(token);
        console.log(decodedUser);
    });
});
//# sourceMappingURL=auth.spec.js.map