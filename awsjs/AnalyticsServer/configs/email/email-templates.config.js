"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = void 0;
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const configs_1 = require("../configs");
const constants_1 = require("../../constants");
let intermediatePath = '';
if (configs_1.configs.ENVIRONMENT_VARIABLE === constants_1.constants.ENVIRONMENT_VARIABLE_DEV)
    intermediatePath = 'src';
exports.emailTemplates = new email_templates_1.default({
    views: {
        root: path_1.default.join(process.cwd(), intermediatePath, 'email-templates'),
    },
});
//# sourceMappingURL=email-templates.config.js.map