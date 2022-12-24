"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const main_config_1 = require("./main.config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: main_config_1.mainConfig.PG_HOST_DATABASE,
    port: Number(main_config_1.mainConfig.PG_PORT_DATABASE),
    username: main_config_1.mainConfig.PG_USER_NAME_DATABASE,
    password: main_config_1.mainConfig.PG_PASSWORD_DATABASE,
    database: main_config_1.mainConfig.PG_NAME_DATABASE,
    synchronize: true,
    logging: false,
    migrations: [
        './migrations/**/*.js',
    ],
    subscribers: [],
    entities: [
        './entities/**/*.entity.js',
    ],
});
//# sourceMappingURL=ormconfig.js.map
