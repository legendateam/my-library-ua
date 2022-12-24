import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { filesRepository, userRepository, viewsRepository } from '../repositories';
import { emailService } from '../services';
import { EmailEnum, RoleEnum } from '../enums';
import { constants } from '../constants';

dayjs.extend(utc);

export const sendReportLastYear = async () => {
    cron.schedule('0 5 1 1 *', async () => {
        const admin = await userRepository.getOneByRole(RoleEnum.ADMIN);

        if (admin) {
            const date = dayjs.utc().startOf('year').subtract(1, 'year').format();

            const responseViews = await viewsRepository.getOneByDay(date);
            const responseFiles = await filesRepository.getOneByDate(date);
            const usersNumbers = await userRepository.getCountNewUsers(date);

            if (responseFiles && responseViews) {
                const { downloadNumbers, readNumbers } = responseFiles;
                const { views, auth_views, unique_views } = responseViews;

                await emailService.sendEmail(admin.email, EmailEnum.ANALYTICS_YEAR, {
                    auth_views,
                    views,
                    unique_views,
                    downloadNumbers,
                    readNumbers,
                    mainMessage: constants.MAIN_MESSAGE_YEAR,
                    nickName: admin.nickName,
                    countUsers: usersNumbers,
                });
            }
        }
    });
};
