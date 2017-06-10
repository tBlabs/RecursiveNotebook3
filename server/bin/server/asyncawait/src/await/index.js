"use strict";
var makeAwaitFunc = require("./makeAwaitFunc");
var await = makeAwaitFunc();
await.in = makeAwaitFunc('in');
await.top = makeAwaitFunc('top');
module.exports = await;
//# sourceMappingURL=index.js.map