"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReportLastMonth = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const enums_1 = require("../enums");
const constants_1 = require("../constants");
dayjs_1.default.extend(utc_1.default);
const sendReportLastMonth = async () => {
    node_cron_1.default.schedule('0 3 1 * *', async () => {
        const admin = await repositories_1.userRepository.getOneByRole(enums_1.RoleEnum.ADMIN);
        if (admin) {
            const date = dayjs_1.default.utc().startOf('month').subtract(1, 'month').format();
            const responseViews = await repositories_1.viewsRepository.getOneByDay(date);
            const responseFiles = await repositories_1.filesRepository.getOneByDate(date);
            const usersNumbers = await repositories_1.userRepository.getCountNewUsers(date);
            if (responseFiles && responseViews) {
                const { downloadNumbers, readNumbers } = responseFiles;
                const { views, auth_views, unique_views } = responseViews;
                await services_1.emailService.sendEmail(admin.email, enums_1.EmailEnum.ANALYTICS_MONTH, {
                    auth_views,
                    views,
                    unique_views,
                    downloadNumbers,
                    readNumbers,
                    mainMessage: constants_1.constants.MAIN_MESSAGE_MONTH,
                    nickName: admin.nickName,
                    countUsers: usersNumbers,
                });
            }
        }
    });
};
exports.sendReportLastMonth = sendReportLastMonth;
//# sourceMappingURL=sendRepostLastMonth.js.map