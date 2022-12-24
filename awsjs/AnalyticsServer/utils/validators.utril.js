"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesSchema = exports.idSchema = void 0;
const joi_1 = __importDefault(require("joi"));
class ValidatorsUtil {
}
ValidatorsUtil.idSchema = joi_1.default.object({
    id: joi_1.default.number().min(1).optional(),
});
ValidatorsUtil.FilesSchema = joi_1.default.object({
    readNumbers: joi_1.default.boolean()
        .optional(),
    downloadNumbers: joi_1.default.boolean()
        .optional(),
});
exports.idSchema = ValidatorsUtil.idSchema, exports.FilesSchema = ValidatorsUtil.FilesSchema;
//# sourceMappingURL=validators.utril.js.map