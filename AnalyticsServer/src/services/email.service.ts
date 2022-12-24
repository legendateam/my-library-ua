import { configs, emailTemplates, transporter } from '../configs';
import { emailConstant } from '../constants';
import { EmailEnum } from '../enums';
import { IContext } from '../interfaces';

class EmailService {
    public async sendEmail(email: string, type: EmailEnum, context: IContext) {
        const { subject, view } = emailConstant[type];

        const contextWithDefaultValue = Object.assign(context, { projectName: configs.PROJECT_NAME });

        const html = await emailTemplates.render(view, contextWithDefaultValue);

        await transporter.sendMail({
            from: configs.PROJECT_NAME,
            to: email,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
