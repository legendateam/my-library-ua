"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReportLastYear = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const enums_1 = require("../enums");
const constants_1 = require("../constants");
dayjs_1.default.extend(utc_1.default);
const sendReportLastYear = async () => {
    node_cron_1.default.schedule('0 5 1 1 *', async () => {
        const admin = await repositories_1.userRepository.getOneByRole(enums_1.RoleEnum.ADMIN);
        if (admin) {
            const date = dayjs_1.default.utc().startOf('year').subtract(1, 'year').format();
            const responseViews = await repositories_1.viewsRepository.getOneByDay(date);
            const responseFiles = await repositories_1.filesRepository.getOneByDate(date);
            const usersNumbers = await repositories_1.userRepository.getCountNewUsers(date);
            if (responseFiles && responseViews) {
                const { downloadNumbers, readNumbers } = responseFiles;
                const { views, auth_views, unique_views } = responseViews;
                await services_1.emailService.sendEmail(admin.email, enums_1.EmailEnum.ANALYTICS_YEAR, {
                    auth_views,
                    views,
                    unique_views,
                    downloadNumbers,
                    readNumbers,
                    mainMessage: constants_1.constants.MAIN_MESSAGE_YEAR,
                    nickName: admin.nickName,
                    countUsers: usersNumbers,
                });
            }
        }
    });
};
exports.sendReportLastYear = sendReportLastYear;
//# sourceMappingURL=sendRepostLastYear.js.map