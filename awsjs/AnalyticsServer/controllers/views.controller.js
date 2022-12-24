"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsController = void 0;
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const error_1 = require("../error");
class ViewsController {
    async getAll(req, res, next) {
        try {
            const { query } = req;
            const date = query.date;
            if (date) {
                const viewsModel = await repositories_1.viewsRepository.getAllByDay(date);
                if (!viewsModel?.length) {
                    next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                    return;
                }
                return res.status(enums_1.StatusEnum.OK).json({
                    status: enums_1.StatusEnum.OK,
                    message: enums_1.MessageEnum.OK,
                    data: viewsModel,
                });
            }
            const viewsModel = await repositories_1.viewsRepository.getAll();
            if (!viewsModel.length) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.StatusEnum.OK).json({
                status: enums_1.StatusEnum.OK,
                message: enums_1.MessageEnum.OK,
                data: viewsModel,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOneDate(req, res, next) {
        try {
            const { date } = req.params;
            const viewsModel = await repositories_1.viewsRepository.getOneByDay(date);
            if (!viewsModel) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.StatusEnum.OK).json({
                status: enums_1.StatusEnum.OK,
                message: enums_1.MessageEnum.OK,
                data: viewsModel,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async createOne(req, res, next) {
        try {
            const { user } = req;
            const { ipAddress } = req;
            let data = { views: 1, auth_views: 0, unique_views: 0 };
            if (user) {
                data = { ...data, auth_views: 1 };
            }
            if (ipAddress) {
                data = { ...data, unique_views: 1 };
            }
            const viewsModel = await repositories_1.viewsRepository.createFirstView(data);
            return res.status(enums_1.StatusEnum.CREATED).json({
                status: enums_1.StatusEnum.CREATED,
                message: enums_1.MessageEnum.CREATED,
                data: viewsModel,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const { user } = req;
            const { ipAddress } = req;
            const views = req.views;
            let data = { views: views.views + 1, auth_views: views.auth_views, unique_views: views.unique_views };
            if (user) {
                data = { ...data, auth_views: views.auth_views + 1 };
            }
            if (ipAddress) {
                data = { ...data, unique_views: views.unique_views + 1 };
            }
            await repositories_1.viewsRepository.updateOne(views._id, data);
            res.status(enums_1.StatusEnum.NO_CONTENT).end();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.viewsController = new ViewsController();
//# sourceMappingURL=views.controller.js.map