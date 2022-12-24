"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiCommonsFieldsUtil = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
exports.joiCommonsFieldsUtil = {
    email: joi_1.default.string()
        .email()
        .min(5)
        .max(35)
        .lowercase()
        .trim(),
    password: joi_1.default.string()
        .min(7)
        .max(40)
        .regex(regex_constant_1.regexConstant.PASSWORD)
        .trim(),
    token: joi_1.default.string()
        .min(10),
    clientKey: joi_1.default.string(),
};
//# sourceMappingURL=joi-commons-fields.util.js.map