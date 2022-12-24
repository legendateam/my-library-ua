"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const main_config_1 = require("../main.config");
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: main_config_1.mainConfig.ROOT_EMAIL,
        pass: main_config_1.mainConfig.ROOT_EMAIL_PASSWORD,
    },
});
//# sourceMappingURL=email-transporter.config.js.map