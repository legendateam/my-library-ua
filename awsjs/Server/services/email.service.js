"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = void 0;
const configs_1 = require("../configs");
const constants_1 = require("../constants");
class EmailService {
    async sendEmail(email, type, context) {
        const { subject, template } = constants_1.emailTemplateConstant[type];
        const messageTitle = constants_1.emailTitleMessageConstant[type];
        Object.assign(context, {
            domainName: configs_1.mainConfig.DOMAIN_NAME,
            messageTitle,
            projectName: configs_1.mainConfig.PROJECT_NAME,
            clientURL: configs_1.mainConfig.CLIENT_URL,
        });
        const html = await configs_1.emailTemplate.render(template, context);
        await configs_1.transporter.sendMail({
            from: configs_1.mainConfig.PROJECT_NAME,
            to: email,
            subject,
            html,
        });
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
//# sourceMappingURL=email.service.js.map