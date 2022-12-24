import { sendReportLastDay } from './sendReportLastDay';
import { sendReportLastWeek } from './sendReportLastWeek';
import { sendReportLastMonth } from './sendRepostLastMonth';
import { sendReportLastYear } from './sendRepostLastYear';

export const cronStart = () => {
    console.log('Cron was started');
    sendReportLastDay();
    sendReportLastWeek();
    sendReportLastMonth();
    sendReportLastYear();
};
