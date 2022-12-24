"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const services_1 = require("../services");
const error_1 = require("../error");
const constants_1 = require("../constants");
class FavoritesController {
    async createOne(req, res, next) {
        try {
            req.err = null;
            const { id } = req.userData;
            const { bookId } = req.favorite;
            const favoritesFromDB = await services_1.favoritesService.create({ bookId, userId: id });
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: favoritesFromDB,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id: userId } = req.userData;
            const deleteResult = await repositories_1.favoritesRepository.deleteOne(userId);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.NO_CONTENT,
                data: deleteResult,
                message: enums_1.HttpMessageEnum.NO_CONTENT,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const { bookId } = req.body;
            const { userId, books } = req.favorite;
            const query = req.actions;
            const favoritesFromDB = await services_1.favoritesService.updateOne(query, userId, books, bookId);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: favoritesFromDB,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOneByUserId(req, res, next) {
        try {
            const userData = req.userData;
            const userId = userData.id;
            const favoritesForCurrentUser = await repositories_1.favoritesRepository.getOneByUserId(userId);
            if (!favoritesForCurrentUser) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: favoritesForCurrentUser,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.favoritesController = new FavoritesController();
//# sourceMappingURL=favorites.controller.js.map