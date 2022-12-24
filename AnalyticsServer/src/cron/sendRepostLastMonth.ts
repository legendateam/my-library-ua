import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { filesRepository, userRepository, viewsRepository } from '../repositories';
import { emailService } from '../services';
import { EmailEnum, RoleEnum } from '../enums';
import { constants } from '../constants';

dayjs.extend(utc);

export const sendReportLastMonth = async () => {
    cron.schedule('0 3 1 * *', async () => {
        const admin = await userRepository.getOneByRole(RoleEnum.ADMIN);

        if (admin) {
            const date = dayjs.utc().startOf('month').subtract(1, 'month').format();

            const responseViews = await viewsRepository.getOneByDay(date);
            const responseFiles = await filesRepository.getOneByDate(date);
            const usersNumbers = await userRepository.getCountNewUsers(date);

            if (responseFiles && responseViews) {
                const { downloadNumbers, readNumbers } = responseFiles;
                const { views, auth_views, unique_views } = responseViews;

                await emailService.sendEmail(admin.email, EmailEnum.ANALYTICS_MONTH, {
                    auth_views,
                    views,
                    unique_views,
                    downloadNumbers,
                    readNumbers,
                    mainMessage: constants.MAIN_MESSAGE_MONTH,
                    nickName: admin.nickName,
                    countUsers: usersNumbers,
                });
            }
        }
    });
};
