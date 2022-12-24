import { createTransport } from 'nodemailer';

import { configs } from '../configs';

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: configs.ROOT_EMAIL,
        pass: configs.ROOT_EMAIL_PASSWORD,
    },
});
