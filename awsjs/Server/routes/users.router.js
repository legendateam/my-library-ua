"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.usersRouter = (0, express_1.Router)();
const upload = (0, middlewares_1.userAvatar)();
exports.usersRouter.get('/', controllers_1.usersController.getAll);
exports.usersRouter.patch('/update', upload.single('avatar'), middlewares_1.authMiddleware.isAuthorization, middlewares_1.userMiddleware.validateData, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.userMiddleware.compareNewPassword, middlewares_1.userMiddleware.uniqueNickNameOrEmail, controllers_1.usersController.updateOne);
//# sourceMappingURL=users.router.js.map