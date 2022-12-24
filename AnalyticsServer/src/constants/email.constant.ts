import { EmailEnum } from '../enums';

export const emailConstant = {
    [EmailEnum.ANALYTICS_DAY]: {
        subject: 'Денний звіт',
        view: 'report',
    },
    [EmailEnum.ANALYTICS_WEEK]: {
        subject: 'Тижневий звіт',
        view: 'report',
    },
    [EmailEnum.ANALYTICS_MONTH]: {
        subject: 'Місячний звіт',
        view: 'report',
    },
    [EmailEnum.ANALYTICS_YEAR]: {
        subject: 'Річний звіт',
        view: 'report',
    },
};
