"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsController = void 0;
const services_1 = require("../services");
const enums_1 = require("../enums");
const error_1 = require("../error");
const constants_1 = require("../constants");
class ViewsController {
    async getByBookId(req, res, next) {
        try {
            const bookId = req.bookId;
            const generateKey = services_1.clientService.generateKey(bookId, enums_1.ClientKeyEnum.VIEWS_COUNT_BOOK);
            const viewsKey = await services_1.clientService.get(generateKey);
            if (!viewsKey) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: viewsKey,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async createOne(req, res, next) {
        try {
            const generateKey = req.generateKey;
            const { views } = req.views;
            const createdView = await services_1.clientService.set(generateKey, JSON.stringify({ views }));
            if (!createdView) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                message: enums_1.HttpMessageEnum.CREATED,
                data: createdView,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateView(req, res, next) {
        try {
            const generateKey = req.generateKey;
            const { views } = req.views;
            const updatedView = await services_1.clientService.set(generateKey, JSON.stringify({ views: views + 1 }));
            if (!updatedView) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: updatedView,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async removeViews(req, res, next) {
        try {
            const generateKey = req.generateKey;
            const removedViews = await services_1.clientService.delete(generateKey);
            if (!removedViews) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: removedViews,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.viewsController = new ViewsController();
//# sourceMappingURL=views.controller.js.map