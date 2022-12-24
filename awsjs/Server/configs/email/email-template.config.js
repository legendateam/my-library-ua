"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const main_config_1 = require("../main.config");
const enums_1 = require("../../enums");
let pathToEmailTemplate = '';
if (main_config_1.mainConfig.NODE_ENVIRONMENT_VARIABLE === enums_1.NodeEnvironmentEnum.DEV) {
    pathToEmailTemplate = 'src';
}
exports.emailTemplate = new email_templates_1.default({
    views: {
        root: path_1.default.join(process.cwd(), pathToEmailTemplate, 'email-templates'),
    },
});
//# sourceMappingURL=email-template.config.js.map