"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const configs_1 = require("./configs");
const routes_1 = require("./routes");
require("./configs/authSocialNetwork/passport");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: configs_1.mainConfig.SECRET_EXPRESS_SESSION,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: undefined,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: `${configs_1.mainConfig.CLIENT_URL}`,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.apiRouter);
const { PORT } = configs_1.mainConfig;
app.listen(PORT, async () => {
    console.log(`Server is running on PORT:${PORT}!`);
    try {
        const connection = await configs_1.AppDataSource.initialize();
        if (connection) {
            console.log('Data Base has been connected!');
        }
    }
    catch (e) {
        console.error('Error connection to Data Base', e);
    }
});
//# sourceMappingURL=app.js.map