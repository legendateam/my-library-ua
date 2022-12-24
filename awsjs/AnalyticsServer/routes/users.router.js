"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', controllers_1.usersController.getAllCount);
exports.usersRouter.get('/:date', controllers_1.usersController.getNewUsersByDate);
//# sourceMappingURL=users.router.js.map