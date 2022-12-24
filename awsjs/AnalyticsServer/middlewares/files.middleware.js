"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesMiddleware = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const repositories_1 = require("../repositories");
const error_1 = require("../error");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
dayjs_1.default.extend(utc_1.default);
class FilesMiddleware {
    // @ts-ignore
    async isUnique(req, _, next) {
        try {
            const toDay = (0, dayjs_1.default)().utc().startOf('day').format();
            const files = await repositories_1.filesRepository.getOneByDate(toDay);
            if (files) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.CONFLICT, enums_1.StatusEnum.CONFLICT, enums_1.MessageEnum.CONFLICT));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isExists(req, _, next) {
        try {
            const toDay = (0, dayjs_1.default)().startOf('day').utc().format();
            const files = await repositories_1.filesRepository.getOneByDate(toDay);
            if (!files) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            req.files = files;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async validateBody(req, _, next) {
        try {
            const { body } = req;
            const { error, value } = utils_1.FilesSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.BAD_REQUEST, enums_1.StatusEnum.BAD_REQUEST, enums_1.MessageEnum.BAD_REQUEST));
                return;
            }
            if (value?.downloadNumbers && value?.readNumbers) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.BAD_REQUEST, enums_1.StatusEnum.BAD_REQUEST, enums_1.MessageEnum.BAD_REQUEST));
                return;
            }
            if (value?.downloadNumbers)
                req.downloadNumbers = value?.downloadNumbers;
            if (value?.readNumbers)
                req.readNumbers = value?.readNumbers;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.filesMiddleware = new FilesMiddleware();
//# sourceMappingURL=files.middleware.js.map