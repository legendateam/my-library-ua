"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesMiddleware = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const error_1 = require("../error");
const repositories_1 = require("../repositories");
class FavoritesMiddleware {
    validateBody(req, _, next) {
        const favorites = req.body;
        const { error, value } = utils_1.actionsSchema.validate(favorites);
        if (error) {
            next(new error_1.ErrorHandler(constants_1.errorMessageConstant.badRequest, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.favorite = value;
        req.clientKey = value.clientKey;
        next();
    }
    async checkBooksById(req, _, next) {
        try {
            const favorite = req.favorite;
            const bookId = favorite?.bookId;
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
            const favorite = await repositories_1.favoritesRepository.getOneByUserId(id);
            if (!favorite) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.favorite = favorite;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUniqueByUserId(req, _, next) {
        try {
            const { id: userId } = req.userData;
            const favorite = await repositories_1.favoritesRepository.getOneByUserId(userId);
            if (favorite) {
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
exports.favoritesMiddleware = new FavoritesMiddleware();
//# sourceMappingURL=favorites.middleware.js.map