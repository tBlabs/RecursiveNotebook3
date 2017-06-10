"use strict";
var Config = require("./config");
var makeAsyncFunc = require("./makeAsyncFunc");
var async = makeAsyncFunc(new Config());
async.cps = async.mod('returns: none, callback: true, iterable: false');
async.thunk = async.mod('returns: thunk, callback: false, iterable: false');
async.result = async.mod('returns: result, callback: false, iterable: false');
async.iterable = async.mod('returns: promise, callback: false, iterable: true');
module.exports = async;
//# sourceMappingURL=index.js.map