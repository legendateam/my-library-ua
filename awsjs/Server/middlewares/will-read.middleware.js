"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.willReadMiddleware = void 0;
const utils_1 = require("../utils");
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
class WillReadMiddleware {
    validateBody(req, _, next) {
        const willRead = req.body;
        const { error, value } = utils_1.actionsSchema.validate(willRead);
        if (error) {
            next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.willRead = value;
        req.clientKey = value.clientKey;
        next();
    }
    async checkBooksById(req, _, next) {
        try {
            const willReadBook = req.willRead;
            const bookId = willReadBook?.bookId;
            const bookFromDB = await repositories_1.bookRepository.getOneById(bookId);
            if (!bookFromDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkExistsByUserId(req, _, next) {
        try {
            const { id } = req.userData;
            const willReadBook = await repositories_1.willReadRepository.getOneByUserId(id);
            if (!willReadBook) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.willRead = willReadBook;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUniqueByUserId(req, _, next) {
        try {
            const { id: userId } = req.userData;
            const willReadBook = await repositories_1.willReadRepository.getOneByUserId(userId);
            if (willReadBook) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkParams(req, _, next) {
        try {
            const { params } = req;
            const { error } = utils_1.actionsUserIdParamsSchema.validate(params);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkQuery(req, _, next) {
        try {
            const query = req.query;
            if (query?.updateSet)
                req.actions = { updateSet: query.updateSet };
            if (query?.updateRemove)
                req.actions = { updateRemove: query.updateRemove };
            if (!query.updateSet && !query.updateRemove)
                req.actions = { updateSet: true, updateRemove: false };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkParamsOnClientKey(req, _, next) {
        try {
            const { params } = req;
            const { error, value } = utils_1.clientKeySchema.validate(params);
            if (error) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.clientKey, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.willReadMiddleware = new WillReadMiddleware();
//# sourceMappingURL=will-read.middleware.js.map