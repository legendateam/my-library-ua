"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesController = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const error_1 = require("../error");
class FilesController {
    async createOne(req, res, next) {
        try {
            const files = { downloadNumbers: 0, readNumbers: 1 };
            if (req.downloadNumbers) {
                files.downloadNumbers = 1;
                files.readNumbers = 0;
            }
            const filesModelCreated = await repositories_1.filesRepository.createOne(files);
            return res.status(enums_1.StatusEnum.CREATED).json({
                status: enums_1.StatusEnum.CREATED,
                data: filesModelCreated,
                message: enums_1.MessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const { _id, downloadNumbers, readNumbers } = req.files;
            const files = { downloadNumbers: 0, readNumbers: 1 };
            if (req.downloadNumbers) {
                files.downloadNumbers = downloadNumbers + 1;
                files.readNumbers = readNumbers;
            }
            if (req.readNumbers) {
                files.readNumbers = readNumbers + 1;
                files.downloadNumbers = downloadNumbers;
            }
            const filesModelUpdated = await repositories_1.filesRepository.updateOne(_id, files);
            return res.status(enums_1.StatusEnum.OK).json({
                status: enums_1.StatusEnum.OK,
                data: filesModelUpdated,
                message: enums_1.MessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOne(_, res, next) {
        try {
            const date = (0, dayjs_1.default)().utc().startOf('day').format();
            const filesModel = await repositories_1.filesRepository.getOneByDate(date);
            if (!filesModel) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.StatusEnum.OK).json({
                status: enums_1.StatusEnum.OK,
                data: filesModel,
                message: enums_1.MessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const { query } = req;
            if (query.date) {
                const date = query.date;
                const filesModel = await repositories_1.filesRepository.getAllByDate(date);
                if (!filesModel.length) {
                    next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                    return;
                }
                return res.status(enums_1.StatusEnum.OK).json({
                    status: enums_1.StatusEnum.OK,
                    data: filesModel,
                    message: enums_1.MessageEnum.OK,
                });
            }
            const filesModel = await repositories_1.filesRepository.getAll();
            if (!filesModel.length) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.StatusEnum.OK).json({
                status: enums_1.StatusEnum.OK,
                data: filesModel,
                message: enums_1.MessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.filesController = new FilesController();
//# sourceMappingURL=files.controller.js.map