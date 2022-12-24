import { ErrorsKeysValidationsEnum } from '../enums';

export const ErrorsMessagesValidationsConstant = {
    [ErrorsKeysValidationsEnum.STRING_BASE]: '{{#label}} повинен бути текстом',
    [ErrorsKeysValidationsEnum.STRING_EMPTY]: '{{#label}} не може бути пустим',
    [ErrorsKeysValidationsEnum.STRING_MAX]: '{{#label}} повинен мати довжину не більше ніж {#limit}',
    [ErrorsKeysValidationsEnum.STRING_MIN]: '{{#label}} повинен мати довжину не менше {#limit}',
    [ErrorsKeysValidationsEnum.STRING_PATTERN]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
    [ErrorsKeysValidationsEnum.NUMBER_MAX]: '{{#label}} максимальне число {#limit}',
    [ErrorsKeysValidationsEnum.NUMBER_MIN]: '{{#label}} мінімальне число {#limit}',
    [ErrorsKeysValidationsEnum.NUMBER_BASE]: '{{#label}} має бути числом',
    [ErrorsKeysValidationsEnum.NUMBER_EMPTY]: '{{#label}} не може бути пустим',
    [ErrorsKeysValidationsEnum.ANY_REQUIRED]: "{{#label}} є обов'язковим",
};
