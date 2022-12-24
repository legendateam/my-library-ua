"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstant = void 0;
const enums_1 = require("../enums");
exports.emailConstant = {
    [enums_1.EmailEnum.ANALYTICS_DAY]: {
        subject: 'Денний звіт',
        view: 'report',
    },
    [enums_1.EmailEnum.ANALYTICS_WEEK]: {
        subject: 'Тижневий звіт',
        view: 'report',
    },
    [enums_1.EmailEnum.ANALYTICS_MONTH]: {
        subject: 'Місячний звіт',
        view: 'report',
    },
    [enums_1.EmailEnum.ANALYTICS_YEAR]: {
        subject: 'Річний звіт',
        view: 'report',
    },
};
//# sourceMappingURL=email.constant.js.map