import dotenv from 'dotenv';

import { NodeEnvironmentEnum } from '../enums';

dotenv.config();

export const mainConfig = {
    PORT: process.env.PORT || 2000,
    NODE_ENVIRONMENT_VARIABLE: process.env.NODE_ENVIRONMENT_VARIABLE || NodeEnvironmentEnum.DEV,

    PG_NAME_DATABASE: process.env.PG_NAME_DATABASE || 'root',
    PG_USER_NAME_DATABASE: process.env.PG_USER_NAME_DATABASE || 'root',
    PG_HOST_DATABASE: process.env.PG_HOST_DATABASE || 'localhost',
    PG_PORT_DATABASE: process.env.PG_PORT_DATABASE || 5432,
    PG_PASSWORD_DATABASE: process.env.PG_PASSWORD_DATABASE || 'root',

    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    GOOGLE_CALLBACK: process.env.GOOGLE_CALLBACK || '',
    DOMAIN_NAME: process.env.DOMAIN_NAME || 'https://my-domain.ua',
    PROJECT_NAME: process.env.PROJECT_NAME || 'my-project',

    PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS || 7,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'secret_access',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'secret_refresh',
    SECRET_FORGOT_PASSWORD_KEY: process.env.SECRET_FORGOT_PASSWORD_KEY || 'secret_forgot',

    SECRET_EXPRESS_SESSION: process.env.SECRET_EXPRESS_SESSION || 'books',

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '1h',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '8h',
    EXPIRES_IN_FORGOT_PASSWORD: process.env.EXPIRES_IN_FORGOT_PASSWORD || '30m',
    EXPIRES_CLIENT_FORGOT: process.env.EXPIRES_CLIENT_FORGOT || 10000,
    EXPIRES_CLIENT_TOKENS_PAIR: process.env.EXPIRES_CLIENT_TOKENS_PAIR || 10000,

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,

    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,

    CLOUD_DOMAIN_NAME: process.env.CLOUD_DOMAIN_NAME,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
    GOOGLE_CLOUD_BUCKET_NAME: process.env.GOOGLE_CLOUD_BUCKET_NAME,
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_KEY_FILE_NAME: process.env.GOOGLE_KEY_FILE_NAME,
    GOOGLE_CLOUD_DOMAIN_NAME: process.env.GOOGLE_CLOUD_DOMAIN_NAME,
};
