"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const configs_1 = require("./configs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configs_1.configs.PG_HOST_DATABASE,
    port: Number(configs_1.configs.PG_PORT_DATABASE),
    username: configs_1.configs.PG_USER_NAME_DATABASE,
    password: configs_1.configs.PG_PASSWORD_DATABASE,
    database: configs_1.configs.PG_NAME_DATABASE,
    synchronize: false,
    logging: false,
    subscribers: [],
    entities: [
        './entities/**/*.entity.js',
    ],
    migrations: [
        './migrations/**/*.js',
    ],
});
//# sourceMappingURL=orm.config.js.map
