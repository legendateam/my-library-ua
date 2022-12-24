"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const utils_1 = require("../utils");
const error_1 = require("../error");
const services_1 = require("../services");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
class AuthMiddleware {
    validateBodyLogin(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.loginSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.loginData = value;
            req.email = value.email;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateBodyRegistration(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.userSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.userData = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUserOnUnique(req, _, next) {
        try {
            const { email, nickName } = req.userData;
            const user = await services_1.userService.getOneByEmailOrNickName({ nickName, email });
            if (user) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUserAuthByEmail(req, _, next) {
        try {
            const email = req.email;
            const user = await services_1.userService.getOneByEmail(email);
            if (!user) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.userData = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUserAuthByPayload(req, _, next) {
        try {
            const { nickName: nickNamePayload } = req.payload;
            const nickName = nickNamePayload;
            const user = await services_1.userService.getOneByEmailOrNickName({ nickName });
            if (!user) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            req.userData = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkPassword(req, _, next) {
        try {
            const { password } = req.loginData;
            const { password: passwordFromDB } = req.userData;
            const resultAfterChecked = await services_1.bcryptService.compare(password, passwordFromDB);
            if (!resultAfterChecked) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isAuthorization(req, _, next) {
        try {
            const authorization = req.get(constants_1.requestConstant.AUTHORIZATION);
            if (!authorization) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorization, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.authorization = authorization;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateAuthorizationToken(req, _, next) {
        try {
            const authorization = req.authorization;
            const token = authorization.split(' ')[1];
            if (!token) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorization, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            const { error } = utils_1.tokenSchema.validate({ token });
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                next();
                return;
            }
            req.authorization = token;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkAuthorizationOnBearer(req, _, next) {
        try {
            const authorization = req.authorization;
            const bearer = authorization.split(' ')[0];
            if (bearer !== constants_1.requestConstant.BEARER) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorization, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateEmail(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.emailSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.email = value.email;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async verifyAccessToken(req, _, next) {
        try {
            const token = req.authorization;
            const { nickName, role } = services_1.jwtService.verify(token);
            if (!nickName) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            req.payload = { nickName, role };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async verifyRefreshToken(req, _, next) {
        try {
            const token = req.authorization;
            const { nickName, role, id } = services_1.jwtService.verify(token, enums_1.TokensEnum.REFRESH);
            if (!nickName || !role || !id) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            req.payload = { nickName, role, id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async verifyForgotToken(req, _, next) {
        try {
            const token = req.authorization;
            const { nickName, role, id } = services_1.jwtService.verify(token, enums_1.TokensEnum.FORGOT);
            if (!nickName) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            req.payload = { nickName, role, id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async wasItIssuedToken(req, _, next) {
        try {
            const key = req.clientKey;
            const keyFromDB = await services_1.clientService.getKey(key);
            if (!keyFromDB.length) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isClientKey(req, _, next) {
        try {
            const { body } = req;
            const { error } = utils_1.clientKeySchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            const { clientKey } = body;
            req.clientKey = clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isClientKeyParams(req, _, next) {
        const { params } = req;
        const { error, value } = utils_1.clientKeySchema.validate(params);
        if (error) {
            next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.clientKey = value.clientKey;
        next();
    }
    isClientKeyOfParams(req, _, next) {
        try {
            const { params } = req;
            const { error } = utils_1.clientKeySchema.validate(params);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            const { clientKey } = { clientKey: params.clientKey };
            req.clientKey = clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async alreadyExistsForgotToken(req, _, next) {
        try {
            const { nickName } = req.userData;
            const anyKeysByNickName = await services_1.clientService.getAnyKeysByNickName(nickName, enums_1.ClientKeyEnum.FORGOT);
            if (anyKeysByNickName.length) {
                const deleted = await services_1.clientService.delete(anyKeysByNickName[0]);
                if (!deleted) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                    return;
                }
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isAuthClientKey(req, _, next) {
        try {
            const clientKey = req.clientKey;
            const forgotToken = await services_1.clientService.getKey(clientKey);
            if (!forgotToken.length) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkOldTokens(req, _, next) {
        try {
            const { nickName } = req.userData;
            const { clientKey } = req;
            const forgotToken = await services_1.clientService.getAnyKeysByNickName(nickName, enums_1.ClientKeyEnum.FORGOT);
            if (forgotToken.length > 1) {
                forgotToken.map(async (token) => {
                    if (token !== clientKey) {
                        await services_1.clientService.delete(token);
                    }
                });
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateForgotBody(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.forgotPasswordSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.clientKey = body?.clientKey;
            req.password = value.password;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkOnDuplicatePassword(req, _, next) {
        try {
            const userData = req.userData;
            const password = req.password;
            const comparedPassword = await services_1.bcryptService.compare(password, userData?.password);
            if (comparedPassword) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.duplicateNewPassword, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isAdmin(req, _, next) {
        try {
            const { role } = req.payload;
            if (role !== enums_1.RoleEnum.ADMIN) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.FORBIDDEN, enums_1.HttpStatusEnum.FORBIDDEN, enums_1.HttpMessageEnum.FORBIDDEN));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=auth.middleware.js.map