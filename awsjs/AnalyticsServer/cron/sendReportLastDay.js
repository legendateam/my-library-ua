"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReportLastDay = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const enums_1 = require("../enums");
const constants_1 = require("../constants");
dayjs_1.default.extend(utc_1.default);
const sendReportLastDay = async () => {
    node_cron_1.default.schedule('0 1 * * *', async () => {
        const admin = await repositories_1.userRepository.getOneByRole(enums_1.RoleEnum.ADMIN);
        if (admin) {
            const date = dayjs_1.default.utc().startOf('day').subtract(1, 'day').format();
            const responseViews = await repositories_1.viewsRepository.getOneByDay(date);
            const responseFiles = await repositories_1.filesRepository.getOneByDate(date);
            const usersNumbers = await repositories_1.userRepository.getCountNewUsers(date);
            let context = {
                views: 0,
                unique_views: 0,
                readNumbers: 0,
                downloadNumbers: 0,
                auth_views: 0,
                mainMessage: constants_1.constants.MAIN_MESSAGE_DAY,
                nickName: admin.nickName,
                countUsers: usersNumbers,
            };
            if (responseViews) {
                context = {
                    ...context,
                    views: responseViews.views,
                    auth_views: responseViews.auth_views,
                    unique_views: responseViews.unique_views,
                };
            }
            if (responseFiles) {
                context = { ...context, downloadNumbers: responseFiles.downloadNumbers, readNumbers: responseFiles.readNumbers };
            }
            await services_1.emailService.sendEmail(admin.email, enums_1.EmailEnum.ANALYTICS_DAY, context);
        }
    });
};
exports.sendReportLastDay = sendReportLastDay;
//# sourceMappingURL=sendReportLastDay.js.map