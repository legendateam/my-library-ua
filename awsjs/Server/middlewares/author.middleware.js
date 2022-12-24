"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorMiddleware = void 0;
const utils_1 = require("../utils");
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
class AuthorMiddleware {
    validateBody(req, _, next) {
        try {
            const author = req.body;
            const { error, value } = utils_1.authorSchema.validate(author);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.author = value;
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkPseudonymExists(req, _, next) {
        try {
            const pseudonym = req.author?.pseudonym;
            if (pseudonym) {
                const author = await services_1.authorService.getOneByPseudonym(pseudonym);
                if (author) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                    return;
                }
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkParamsId(req, _, next) {
        try {
            const { params } = req;
            if (!params?.id || Number(params?.id) <= 0) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkParamsName(req, _, next) {
        try {
            const { params } = req;
            if (!params?.fullname) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkExists(req, _, next) {
        try {
            const { params } = req;
            const authorFromDB = await repositories_1.authorRepository.getOneById(Number(params.id));
            if (!authorFromDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.author = authorFromDB;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validatePatchBody(req, _, next) {
        try {
            const author = req.body;
            const { error, value } = utils_1.authorPathSchema.validate(author);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.authorPatch = value;
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authorMiddleware = new AuthorMiddleware();
//# sourceMappingURL=author.middleware.js.map