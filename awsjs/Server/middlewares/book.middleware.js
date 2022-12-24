"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookMiddleware = void 0;
const utils_1 = require("../utils");
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const services_1 = require("../services");
const repositories_1 = require("../repositories");
class BookMiddleware {
    checkParamsId(req, _, next) {
        try {
            const { params } = req;
            const { id } = params;
            if (!id || (Number(params.id) <= 0)) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateBody(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.bookSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.book = value;
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateUpdateBody(req, _, next) {
        try {
            const { body } = req;
            const { value, error } = utils_1.bookUpdateSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.clientKey = value.clientKey;
            delete value.clientKey;
            if (value?.cover)
                delete value.cover;
            if (value?.fileText)
                delete value.fileText;
            if (value?.fileAudio)
                delete value.fileAudio;
            req.book = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isBooksExistsByDescription(req, _, next) {
        try {
            const book = req.book;
            const bookDB = await services_1.bookService.isBooksExists(book?.description);
            if (bookDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.bookAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkQueryClientKey(req, _, next) {
        try {
            const { query } = req;
            const clientKey = query?.clientKey;
            if (!clientKey) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unauthorized, enums_1.HttpStatusEnum.UNAUTHORIZED, enums_1.HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            req.clientKey = clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkBookExistsById(req, _, next) {
        try {
            const id = req.params.id;
            const book = await repositories_1.bookRepository.getOneById(Number(id));
            if (!book) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.book = book;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkBookExistsForUpdateById(req, _, next) {
        try {
            const id = req.params.id;
            const book = await repositories_1.bookRepository.getOneById(Number(id));
            if (!book) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkSearchData(req, _, next) {
        try {
            const data = req.params;
            const { value, error } = utils_1.searchSchema.validate(data);
            if (error) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.search = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.bookMiddleware = new BookMiddleware();
//# sourceMappingURL=book.middleware.js.map