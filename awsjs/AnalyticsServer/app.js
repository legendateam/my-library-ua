"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("./configs");
const routes_1 = require("./routes");
const cron_1 = require("./cron");
const app = (0, express_1.default)();
const corsOptions = {
    origin: `${configs_1.configs.CLIENT_URL}`,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.apiRouters);
const main = async () => {
    app.listen(configs_1.configs.PORT, () => {
        console.log(`Analytics Server is running on PORT:${configs_1.configs.PORT}`);
    });
    await configs_1.AppDataSource.initialize().then(() => console.log('Data Base has ben connected!')).catch((err) => console.error(err));
    await mongoose_1.default.connect(configs_1.configs.DB_URI).then(() => {
        console.log('Data Base for analytics has been connected!');
    }).catch((err) => console.error(err));
};
main().then(() => (0, cron_1.cronStart)()).catch((err) => console.error(err));
//# sourceMappingURL=app.js.map