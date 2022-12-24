import { DataSource } from 'typeorm';

import { configs } from './configs';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: configs.PG_HOST_DATABASE,
    port: Number(configs.PG_PORT_DATABASE),
    username: configs.PG_USER_NAME_DATABASE,
    password: configs.PG_PASSWORD_DATABASE,
    database: configs.PG_NAME_DATABASE,
    synchronize: false,
    logging: false,
    subscribers: [],
    entities: [
        './src/entities/**/*.entity.ts',
    ],
    migrations: [
        './src/migrations/**/*.ts',
    ],
});
