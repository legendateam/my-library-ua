"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const configs_1 = require("../configs");
exports.authRouter = (0, express_1.Router)();
const upload = (0, middlewares_1.userAvatar)();
exports.authRouter.post('/registration', upload.single('avatar'), middlewares_1.authMiddleware.validateBodyRegistration, middlewares_1.authMiddleware.checkUserOnUnique, controllers_1.authController.registration);
exports.authRouter.post('/login', middlewares_1.authMiddleware.validateBodyLogin, middlewares_1.authMiddleware.checkUserAuthByEmail, middlewares_1.authMiddleware.checkPassword, controllers_1.authController.login);
exports.authRouter.post('/logout', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.isClientKey, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, controllers_1.authController.logout);
exports.authRouter.post('/refresh', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.isClientKey, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyRefreshToken, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, controllers_1.authController.refresh);
exports.authRouter.post('/forgotPassword', middlewares_1.authMiddleware.validateEmail, middlewares_1.authMiddleware.checkUserAuthByEmail, middlewares_1.authMiddleware.alreadyExistsForgotToken, controllers_1.authController.forgotPassword);
exports.authRouter.patch('/forgotPassword', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.validateForgotBody, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyForgotToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAuthClientKey, middlewares_1.authMiddleware.checkOnDuplicatePassword, middlewares_1.authMiddleware.checkOldTokens, controllers_1.authController.changePassword);
exports.authRouter.get('/refresh/verify/:clientKey', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.isClientKeyOfParams, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.wasItIssuedToken, controllers_1.authController.refreshVerify);
exports.authRouter.get('/login/success', controllers_1.authController.loginSuccess);
exports.authRouter.get('/login/failed', controllers_1.authController.loginFailed);
exports.authRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));
exports.authRouter.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: `${configs_1.mainConfig.CLIENT_URL}`,
    failureRedirect: '/auth/login/failed',
}));
//# sourceMappingURL=auth.router.js.map