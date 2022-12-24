import EmailTemplate from 'email-templates';
import path from 'path';
import { configs } from '../configs';
import { constants } from '../../constants';

let intermediatePath = '';

if (configs.ENVIRONMENT_VARIABLE === constants.ENVIRONMENT_VARIABLE_DEV) intermediatePath = 'src';

export const emailTemplates = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), intermediatePath, 'email-templates'),
    },
});
