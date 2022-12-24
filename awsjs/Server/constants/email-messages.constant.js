"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMessagesConstant = void 0;
const enums_1 = require("../enums");
const configs_1 = require("../configs");
exports.emailMessagesConstant = {
    [enums_1.MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL]: `Ми відправили вам повідомлення з подальшими інструкціями на ваш електронний адрес,
        зауважте, що час дії повідомлення становить ${configs_1.mainConfig.EXPIRES_IN_FORGOT_PASSWORD}
        якщо не знайдете повідомлення, не забудьте перевірити вкладку спам.`,
    [enums_1.MessagesEnum.CHANGE_PASSWORD]: 'Пароль було усмішно змінено!',
};
//# sourceMappingURL=email-messages.constant.js.map