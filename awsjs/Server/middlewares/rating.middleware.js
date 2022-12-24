"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingMiddleware = void 0;
const utils_1 = require("../utils");
const error_1 = require("../error");
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const constants_1 = require("../constants");
class RatingMiddleware {
    checkBody(req, _, next) {
        const { body } = req;
        const { error, value } = utils_1.ratingsSchema.validate(body);
        if (error) {
            next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.rating = value;
        req.clientKey = value.clientKey;
        next();
    }
    async isBookExistsById(req, _, next) {
        try {
            const { bookId } = req.rating;
            const book = await repositories_1.bookRepository.getOneById(bookId);
            if (!book) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.bookNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUnique(req, _, next) {
        try {
            const { bookId } = req.rating;
            const { id } = req.userData;
            const rating = await repositories_1.ratingRepository.getOneByUserIdAndBookId({ bookId, userId: id });
            if (rating) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.CONFLICT, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                return;
            }
            const setUserIdInRating = req.rating;
            req.rating = { ...setUserIdInRating, userId: id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isExists(req, _, next) {
        try {
            const { id } = req.params;
            const rating = await repositories_1.ratingRepository.getOneById(Number(id));
            if (!rating) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.NOT_FOUND, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ratingMiddleware = new RatingMiddleware();
//# sourceMappingURL=rating.middleware.js.map