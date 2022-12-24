import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { mainConfig } from './main.config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: mainConfig.PG_HOST_DATABASE,
    port: Number(mainConfig.PG_PORT_DATABASE),
    username: mainConfig.PG_USER_NAME_DATABASE,
    password: mainConfig.PG_PASSWORD_DATABASE,
    database: mainConfig.PG_NAME_DATABASE,
    synchronize: false,
    logging: false,
    migrations: [
        './src/migrations/**/*.ts',
    ],
    subscribers: [],
    entities: [
        './src/entities/**/*.entity.ts',
    ],
});
