import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { filesRepository, userRepository, viewsRepository } from '../repositories';
import { emailService } from '../services';
import { EmailEnum, RoleEnum } from '../enums';
import { constants } from '../constants';

dayjs.extend(utc);

export const sendReportLastWeek = async () => {
    cron.schedule('0 2 * * 1', async () => {
        const admin = await userRepository.getOneByRole(RoleEnum.ADMIN);

        if (admin) {
            const date = dayjs.utc().startOf('week').subtract(1, 'week').add(1, 'day')
                .format();

            const responseViews = await viewsRepository.getOneByDay(date);
            const responseFiles = await filesRepository.getOneByDate(date);
            const usersNumbers = await userRepository.getCountNewUsers(date);

            if (responseFiles && responseViews) {
                const { downloadNumbers, readNumbers } = responseFiles;
                const { views, auth_views, unique_views } = responseViews;

                await emailService.sendEmail(admin.email, EmailEnum.ANALYTICS_WEEK, {
                    auth_views,
                    views,
                    unique_views,
                    downloadNumbers,
                    readNumbers,
                    mainMessage: constants.MAIN_MESSAGE_WEEK,
                    nickName: admin.nickName,
                    countUsers: usersNumbers,
                });
            }
        }
    });
};
