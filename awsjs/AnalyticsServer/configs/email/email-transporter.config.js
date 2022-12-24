"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
const configs_1 = require("../configs");
exports.transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: configs_1.configs.ROOT_EMAIL,
        pass: configs_1.configs.ROOT_EMAIL_PASSWORD,
    },
});
//# sourceMappingURL=email-transporter.config.js.map