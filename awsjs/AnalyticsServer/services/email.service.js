"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const configs_1 = require("../configs");
const constants_1 = require("../constants");
class EmailService {
    async sendEmail(email, type, context) {
        const { subject, view } = constants_1.emailConstant[type];
        const contextWithDefaultValue = Object.assign(context, { projectName: configs_1.configs.PROJECT_NAME });
        const html = await configs_1.emailTemplates.render(view, contextWithDefaultValue);
        await configs_1.transporter.sendMail({
            from: configs_1.configs.PROJECT_NAME,
            to: email,
            subject,
            html,
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=email.service.js.map