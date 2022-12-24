import EmailTemplate from 'email-templates';
import path from 'path';

import { mainConfig } from '../main.config';
import { NodeEnvironmentEnum } from '../../enums';

let pathToEmailTemplate = '';

if (mainConfig.NODE_ENVIRONMENT_VARIABLE === NodeEnvironmentEnum.DEV) {
    pathToEmailTemplate = 'src';
}

export const emailTemplate = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), pathToEmailTemplate, 'email-templates'),
    },
});
