"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const error_1 = require("../error");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const services_1 = require("../services");
const constants_1 = require("../constants");
class UserMiddleware {
    validateData(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.updateUserSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async compareNewPassword(req, _, next) {
        try {
            const updateUser = req.body;
            const userFormDB = req.userData;
            const compare = await services_1.bcryptService.compare(updateUser.currentPassword, userFormDB?.password);
            if (!compare) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async uniqueNickNameOrEmail(req, _, next) {
        try {
            const updateUser = req.body;
            if (updateUser?.nickName && updateUser?.email) {
                const userByEmailAndNickName = await services_1.userService.getOneByEmailOrNickName({ nickName: updateUser.nickName, email: updateUser.email });
                if (userByEmailAndNickName) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                    return;
                }
            }
            if (updateUser?.nickName) {
                const userByEmailAndNickName = await services_1.userService.getOneByEmailOrNickName({ nickName: updateUser.nickName });
                if (userByEmailAndNickName) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                    return;
                }
            }
            if (updateUser?.email) {
                const userByEmailAndNickName = await services_1.userService.getOneByEmailOrNickName({ email: updateUser.email });
                if (userByEmailAndNickName) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.userAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                    return;
                }
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=user.middleware.js.map