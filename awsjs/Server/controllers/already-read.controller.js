"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadyReadController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const error_1 = require("../error");
const constants_1 = require("../constants");
class AlreadyReadController {
    async createOne(req, res, next) {
        try {
            req.err = null;
            const { id } = req.userData;
            const { bookId } = req.alreadyReadBook;
            const alreadyReadBookFromDB = await services_1.alreadyReadService.create({ bookId, userId: id });
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: alreadyReadBookFromDB,
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
            const deleteResult = await repositories_1.alreadyReadRepository.deleteOne(userId);
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
            const { userId, books } = req.alreadyReadBook;
            const query = req.actions;
            const alreadyReadBookFromDB = await services_1.alreadyReadService.updateOne(query, userId, books, bookId);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: alreadyReadBookFromDB,
                message: enums_1.HttpMessageEnum.CREATED,
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
            const alreadyReadForCurrentUser = await repositories_1.alreadyReadRepository.getOneByUserId(userId);
            if (!alreadyReadForCurrentUser) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: alreadyReadForCurrentUser,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.alreadyReadController = new AlreadyReadController();
//# sourceMappingURL=already-read.controller.js.map