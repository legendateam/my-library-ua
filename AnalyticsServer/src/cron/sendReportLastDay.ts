import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { filesRepository, userRepository, viewsRepository } from '../repositories';
import { emailService } from '../services';
import { EmailEnum, RoleEnum } from '../enums';
import { constants } from '../constants';
import { IContext } from '../interfaces';

dayjs.extend(utc);

export const sendReportLastDay = async () => {
    cron.schedule('0 1 * * *', async () => {
        const admin = await userRepository.getOneByRole(RoleEnum.ADMIN);

        if (admin) {
            const date = dayjs.utc().startOf('day').subtract(1, 'day').format();

            const responseViews = await viewsRepository.getOneByDay(date);
            const responseFiles = await filesRepository.getOneByDate(date);
            const usersNumbers = await userRepository.getCountNewUsers(date);

            let context = {
                views: 0,
                unique_views: 0,
                readNumbers: 0,
                downloadNumbers: 0,
                auth_views: 0,
                mainMessage: constants.MAIN_MESSAGE_DAY,
                nickName: admin.nickName,
                countUsers: usersNumbers,
            } as IContext;

            if (responseViews) {
                context = {
                    ...context,
                    views: responseViews.views,
                    auth_views: responseViews.auth_views,
                    unique_views: responseViews.unique_views,
                };
            }

            if (responseFiles) {
                context = { ...context, downloadNumbers: responseFiles.downloadNumbers, readNumbers: responseFiles.readNumbers };
            }

            await emailService.sendEmail(admin.email, EmailEnum.ANALYTICS_DAY, context);
        }
    });
};
