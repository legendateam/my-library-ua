import { EmailEnum } from '../enums';
import { emailTemplate, mainConfig, transporter } from '../configs';
import { emailTemplateConstant, emailTitleMessageConstant } from '../constants';
import { IContextEmail } from '../interfaces';

export class EmailService {
    public async sendEmail(email: string, type: EmailEnum, context: IContextEmail): Promise<void> {
        const { subject, template } = emailTemplateConstant[type];
        const messageTitle = emailTitleMessageConstant[type];

        Object.assign(context, {
            domainName: mainConfig.DOMAIN_NAME,
            messageTitle,
            projectName: mainConfig.PROJECT_NAME,
            clientURL: mainConfig.CLIENT_URL,
        });

        const html = await emailTemplate.render(template, context);

        await transporter.sendMail({
            from: mainConfig.PROJECT_NAME,
            to: email,
            subject,
            html,
        });
    }
}
export const emailService = new EmailService();
