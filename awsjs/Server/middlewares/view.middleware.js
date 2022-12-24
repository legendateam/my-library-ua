"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewMiddleware = void 0;
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const services_1 = require("../services");
const repositories_1 = require("../repositories");
class ViewMiddleware {
    checkParamsOnBookId(req, _, next) {
        const { params } = req;
        const { bookId } = Object.assign(params);
        if (!bookId) {
            next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.bookId = bookId;
        next();
    }
    async isUnique(req, _, next) {
        try {
            const bookId = req.bookId;
            const generateKey = services_1.clientService.generateKey(bookId, enums_1.ClientKeyEnum.VIEWS_COUNT_BOOK);
            const viewExists = await services_1.clientService.get(generateKey);
            if (viewExists) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.viewsForBookExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                return;
            }
            req.generateKey = generateKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isExists(req, _, next) {
        try {
            const bookId = req.bookId;
            const generateKey = services_1.clientService.generateKey(bookId, enums_1.ClientKeyEnum.VIEWS_COUNT_BOOK);
            const viewExists = await services_1.clientService.get(generateKey);
            if (!viewExists) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            const { views } = JSON.parse(viewExists);
            req.views = { views };
            req.generateKey = generateKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateBodyOnBookId(req, _, next) {
        const { body } = req;
        const { value, error } = utils_1.viewFirstCreateSchema.validate(body);
        if (error) {
            next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.bookId = value.bookId.toString();
        req.views = { views: 0 };
        next();
    }
    async checkBookExists(req, _, next) {
        const bookId = req.bookId;
        const book = await repositories_1.bookRepository.getOneById(Number(bookId));
        if (!book) {
            next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
            return;
        }
        next();
    }
}
exports.viewMiddleware = new ViewMiddleware();
//# sourceMappingURL=view.middleware.js.map