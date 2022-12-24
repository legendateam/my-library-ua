import dotenv from 'dotenv';

import { constants } from '../constants';

dotenv.config();

export const configs = {
    PORT: process.env.PORT || 2100,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/test',
    PROJECT_NAME: process.env.PROJECT_NAME || 'my-project',

    PG_NAME_DATABASE: process.env.PG_NAME_DATABASE || 'root',
    PG_USER_NAME_DATABASE: process.env.PG_USER_NAME_DATABASE || 'root',
    PG_HOST_DATABASE: process.env.PG_HOST_DATABASE || 'localhost',
    PG_PORT_DATABASE: process.env.PG_PORT_DATABASE || 5432,
    PG_PASSWORD_DATABASE: process.env.PG_PASSWORD_DATABASE || 'root',

    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    ENVIRONMENT_VARIABLE: process.env.ENVIRONMENT_VARIABLE || constants.ENVIRONMENT_VARIABLE_DEV,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'secret_access',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'secret_refresh',
    SECRET_FORGOT_PASSWORD_KEY: process.env.SECRET_FORGOT_PASSWORD_KEY || 'secret_forgot',

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
};
