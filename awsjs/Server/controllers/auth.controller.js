"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const enums_1 = require("../enums");
const error_1 = require("../error");
const constants_1 = require("../constants");
const email_service_1 = require("../services/email.service");
const configs_1 = require("../configs");
class AuthController {
    async login(req, res, next) {
        try {
            const { nickName, role, id, email, avatar, } = req.userData;
            const tokensGeneratedAndSaved = await services_1.authService.login({
                id, role, nickName, avatar, email,
            });
            if (!tokensGeneratedAndSaved) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            const { access, refresh, clientKey } = tokensGeneratedAndSaved;
            await email_service_1.emailService.sendEmail(email, enums_1.EmailEnum.WELCOME_BACK, { nickName });
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: {
                    access,
                    refresh,
                    clientKey,
                },
            });
        }
        catch (e) {
            next(e);
        }
    }
    async registration(req, res, next) {
        try {
            const { nickName, role, email, password, } = req.userData;
            const userDB = await services_1.authService.registration({
                nickName, role, email, password,
            });
            if (!userDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userNotRegistration, enums_1.HttpStatusEnum.NOT_IMPLEMENTED, enums_1.HttpMessageEnum.NOT_IMPLEMENTED));
                return;
            }
            if (req.file) {
                const userId = userDB.id;
                const avatarSaved = await services_1.s3Service.uploadFile(req.file, userId, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.USERS);
                if (!avatarSaved.Location) {
                    await email_service_1.emailService.sendEmail(userDB.email, enums_1.EmailEnum.WELCOME, { nickName: userDB.nickName });
                    return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                        data: { ...userDB },
                        message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathFile = avatarSaved.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                await services_1.userService.updateAvatar(userId, pathFile);
                await email_service_1.emailService.sendEmail(userDB.email, enums_1.EmailEnum.WELCOME, { nickName: userDB.nickName });
                return res.status(enums_1.HttpStatusEnum.CREATED).json({
                    status: enums_1.HttpStatusEnum.CREATED,
                    data: { ...userDB, avatar: pathFile },
                    message: enums_1.HttpMessageEnum.CREATED,
                });
            }
            await email_service_1.emailService.sendEmail(userDB.email, enums_1.EmailEnum.WELCOME, { nickName: userDB.nickName });
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: userDB,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const clientKey = req.clientKey;
            const deletedTokens = await services_1.authService.logout(clientKey);
            if (!deletedTokens) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            req.logout((err) => {
                if (err) {
                    return next(new error_1.ErrorHandler(err.message, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                }
            });
            return res.status(enums_1.HttpStatusEnum.OK).clearCookie('connect.sid', { path: '/' }).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: deletedTokens,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const requestClientKey = req.clientKey;
            const payload = req.payload;
            const newTokens = await services_1.authService.refresh(payload, requestClientKey);
            if (!newTokens) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            const { refresh, access, clientKey } = newTokens;
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: {
                    refresh,
                    access,
                    clientKey,
                },
            });
        }
        catch (e) {
            next(e);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { nickName, id, role, email, } = req.userData;
            const forgotGeneratedAndSaved = await services_1.authService.forgotPassword({ id, nickName, role });
            if (!forgotGeneratedAndSaved) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            const { forgot, clientKey } = forgotGeneratedAndSaved;
            await email_service_1.emailService.sendEmail(email, enums_1.EmailEnum.FORGOT_PASSWORD, {
                nickName, clientKey, forgot, forgotTime: configs_1.mainConfig.EXPIRES_IN_FORGOT_PASSWORD,
            });
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: constants_1.emailMessagesConstant[enums_1.MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL],
            });
        }
        catch (e) {
            next(e);
        }
    }
    async changePassword(req, res, next) {
        try {
            const password = req.password;
            const clientKey = req.clientKey;
            const { id } = req.payload;
            const changePassword = await services_1.userService.changePassword(id, password);
            if (!changePassword) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            await services_1.clientService.delete(clientKey);
            const { email, nickName } = req.userData;
            await email_service_1.emailService.sendEmail(email, enums_1.EmailEnum.CHANGE_PASSWORD, { nickName });
            return res.status(enums_1.HttpStatusEnum.OK)
                .json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: constants_1.emailMessagesConstant[enums_1.MessagesEnum.CHANGE_PASSWORD],
            });
        }
        catch (e) {
            next(e);
        }
    }
    async loginSuccess(req, res, next) {
        try {
            const tokenPair = req.user;
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: tokenPair,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async loginFailed(_, res, next) {
        try {
            return res.status(enums_1.HttpStatusEnum.UNAUTHORIZED).json({
                status: enums_1.HttpStatusEnum.UNAUTHORIZED,
                message: enums_1.HttpMessageEnum.UNAUTHORIZED,
                data: constants_1.errorMessageConstant.authorization,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async refreshVerify(req, res, next) {
        try {
            const token = req.authorization;
            const { nickName, role, id } = services_1.jwtService.verify(token, enums_1.TokensEnum.REFRESH);
            if (!nickName || !role || !id) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: enums_1.HttpMessageEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map