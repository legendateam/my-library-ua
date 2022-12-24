"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreMiddleware = void 0;
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const repositories_1 = require("../repositories");
class GenreMiddleware {
    checkParamsNameAndQueryClientKey(req, _, next) {
        const { params } = req;
        const { query } = req;
        const { name } = params;
        const { clientKey } = query;
        const { error, value } = utils_1.genreSchema.validate({ name, clientKey });
        if (error) {
            next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        const genre = value;
        req.genre = { name: genre.name };
        req.clientKey = value.clientKey;
        next();
    }
    validateBody(req, _, next) {
        const genre = req.body;
        const { error, value } = utils_1.genreSchema.validate(genre);
        if (error) {
            next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
            return;
        }
        req.genre = value;
        req.clientKey = value.clientKey;
        next();
    }
    async isUnique(req, _, next) {
        try {
            const genre = req.genre;
            const genreDB = await repositories_1.genreRepository.getOneByName(genre.name);
            if (genreDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.genreAlreadyExists, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
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
            const genre = req.genre;
            const genreDB = await repositories_1.genreRepository.getOneByName(genre.name);
            if (!genreDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.genreMiddleware = new GenreMiddleware();
//# sourceMappingURL=genre.middleware.js.map