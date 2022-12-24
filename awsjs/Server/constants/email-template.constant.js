"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplateConstant = void 0;
const enums_1 = require("../enums");
const configs_1 = require("../configs");
exports.emailTemplateConstant = {
    [enums_1.EmailEnum.WELCOME]: {
        subject: `Ласкаво просимо на ${configs_1.mainConfig.PROJECT_NAME}`,
        template: 'welcome',
    },
    [enums_1.EmailEnum.WELCOME_BACK]: {
        subject: `Раді знову вас бачити на ${configs_1.mainConfig.PROJECT_NAME}`,
        template: 'welcome-back',
    },
    [enums_1.EmailEnum.FORGOT_PASSWORD]: {
        subject: `Відновлення пароля на ${configs_1.mainConfig.PROJECT_NAME}`,
        template: 'forgot-password',
    },
    [enums_1.EmailEnum.CHANGE_PASSWORD]: {
        subject: `Пароль ${configs_1.mainConfig.PROJECT_NAME} змінено`,
        template: 'change-password',
    },
    [enums_1.EmailEnum.GOOGLE_WELCOME]: {
        subject: `Ласкаво просимо на ${configs_1.mainConfig.PROJECT_NAME}`,
        template: 'google-welcome',
    },
    [enums_1.EmailEnum.UPDATE_USER_DATA]: {
        subject: `Ваші персональні дані змінені ${configs_1.mainConfig.PROJECT_NAME}`,
        template: 'update-user',
    },
};
//# sourceMappingURL=email-template.constant.js.map