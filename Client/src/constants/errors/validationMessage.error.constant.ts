import { KeyValidationErrorEnum } from '../../enums';

export const validationMessageErrorConstant = {
    [KeyValidationErrorEnum.STRING_BASE]: '{{#label}} повинен вмістити букви',
    [KeyValidationErrorEnum.STRING_EMPTY]: '{{#label}} не може бути пустим',
    [KeyValidationErrorEnum.STRING_MAX]: '{{#label}} повинен мати довжину не більше ніж {#limit}',
    [KeyValidationErrorEnum.STRING_MIN]: '{{#label}} повинен мати довжину не менше {#limit}',
    [KeyValidationErrorEnum.STRING_PATTERN]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
    [KeyValidationErrorEnum.NUMBER_MAX]: '{{#label}} максимальне число {#limit}',
    [KeyValidationErrorEnum.NUMBER_MIN]: '{{#label}} мінімальне число {#limit}',
    [KeyValidationErrorEnum.NUMBER_BASE]: '{{#label}} має бути числом',
    [KeyValidationErrorEnum.NUMBER_EMPTY]: '{{#label}} не може бути пустим',
    [KeyValidationErrorEnum.ANY_REQUIRED]: "{{#label}} є обов'язковим",
    [KeyValidationErrorEnum.STRING_PATTERN_INVERT_BASE]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
    [KeyValidationErrorEnum.STRING_PATTERN_INVERT_NAME]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
};
