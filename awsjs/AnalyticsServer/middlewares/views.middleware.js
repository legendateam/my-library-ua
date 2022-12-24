"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsMiddleware = void 0;
const ip_1 = __importDefault(require("ip"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const error_1 = require("../error");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const repositories_1 = require("../repositories");
dayjs_1.default.extend(utc_1.default);
class ViewsMiddleware {
    async validateBodyUserId(req, _, next) {
        try {
            const { body } = req;
            if (body?.id) {
                const { value, error } = utils_1.idSchema.validate(body);
                if (error) {
                    next(new error_1.ErrorHandler(enums_1.MessageEnum.BAD_REQUEST, enums_1.StatusEnum.BAD_REQUEST, enums_1.MessageEnum.BAD_REQUEST));
                    return;
                }
                req.userId = value.id;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkUserExists(req, _, next) {
        try {
            const id = req?.userId;
            if (id) {
                const user = await repositories_1.userRepository.getOneById(id);
                if (!user) {
                    next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                    return;
                }
                req.user = user;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async ipAddressIsUnique(req, _, next) {
        try {
            const ipAddress = ip_1.default.address();
            if (ipAddress) {
                const ipAddressFromDB = await repositories_1.ipAddressRepository.getOne({ ipAddress });
                if (!ipAddressFromDB) {
                    const ipAddressFormCreated = await repositories_1.ipAddressRepository.createOne({ ipAddress });
                    req.ipAddress = ipAddressFormCreated;
                }
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    // @ts-ignore
    async checkOnFirst(req, _, next) {
        try {
            const date = (0, dayjs_1.default)().utc().startOf('day').format();
            const views = await repositories_1.viewsRepository.getOneByDay(date);
            if (views) {
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
            const date = (0, dayjs_1.default)().utc().startOf('day').format();
            const views = await repositories_1.viewsRepository.getOneByDay(date);
            if (!views) {
                next(new error_1.ErrorHandler(enums_1.MessageEnum.NOT_FOUND, enums_1.StatusEnum.NOT_FOUND, enums_1.MessageEnum.NOT_FOUND));
                return;
            }
            req.views = views;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.viewsMiddleware = new ViewsMiddleware();
//# sourceMappingURL=views.middleware.js.map