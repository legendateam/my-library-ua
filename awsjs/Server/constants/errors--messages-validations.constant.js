"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsMessagesValidationsConstant = void 0;
const enums_1 = require("../enums");
exports.ErrorsMessagesValidationsConstant = {
    [enums_1.ErrorsKeysValidationsEnum.STRING_BASE]: '{{#label}} повинен бути текстом',
    [enums_1.ErrorsKeysValidationsEnum.STRING_EMPTY]: '{{#label}} не може бути пустим',
    [enums_1.ErrorsKeysValidationsEnum.STRING_MAX]: '{{#label}} повинен мати довжину не більше ніж {#limit}',
    [enums_1.ErrorsKeysValidationsEnum.STRING_MIN]: '{{#label}} повинен мати довжину не менше {#limit}',
    [enums_1.ErrorsKeysValidationsEnum.STRING_PATTERN]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
    [enums_1.ErrorsKeysValidationsEnum.NUMBER_MAX]: '{{#label}} максимальне число {#limit}',
    [enums_1.ErrorsKeysValidationsEnum.NUMBER_MIN]: '{{#label}} мінімальне число {#limit}',
    [enums_1.ErrorsKeysValidationsEnum.NUMBER_BASE]: '{{#label}} має бути числом',
    [enums_1.ErrorsKeysValidationsEnum.NUMBER_EMPTY]: '{{#label}} не може бути пустим',
    [enums_1.ErrorsKeysValidationsEnum.ANY_REQUIRED]: "{{#label}} є обов'язковим",
};
//# sourceMappingURL=errors--messages-validations.constant.js.map