"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const error_1 = require("../error");
const constants_1 = require("../constants");
class GenresController {
    async createOne(req, res, next) {
        try {
            const genre = req.body;
            const genreCreated = await repositories_1.genreRepository.createOne(genre);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: genreCreated,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const genre = await repositories_1.genreRepository.getOneById(Number(id));
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: genre,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(_, res, next) {
        try {
            const genres = await repositories_1.genreRepository.getAll();
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: genres,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async removeOne(req, res, next) {
        try {
            const genres = req.genre;
            const deleteResult = await repositories_1.genreRepository.removeByName(genres?.name);
            if (!deleteResult) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.NO_CONTENT).json({
                status: enums_1.HttpStatusEnum.NO_CONTENT,
                data: deleteResult,
                message: enums_1.HttpMessageEnum.NO_CONTENT,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.genresController = new GenresController();
//# sourceMappingURL=genres.controller.js.map