"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronStart = void 0;
const sendReportLastDay_1 = require("./sendReportLastDay");
const sendReportLastWeek_1 = require("./sendReportLastWeek");
const sendRepostLastMonth_1 = require("./sendRepostLastMonth");
const sendRepostLastYear_1 = require("./sendRepostLastYear");
const cronStart = () => {
    console.log('Cron was started');
    (0, sendReportLastDay_1.sendReportLastDay)();
    (0, sendReportLastWeek_1.sendReportLastWeek)();
    (0, sendRepostLastMonth_1.sendReportLastMonth)();
    (0, sendRepostLastYear_1.sendReportLastYear)();
};
exports.cronStart = cronStart;
//# sourceMappingURL=index.js.map