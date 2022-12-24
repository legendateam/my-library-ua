import { MessagesEnum } from '../enums';
import { mainConfig } from '../configs';

export const emailMessagesConstant = {
    [MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL]: `Ми відправили вам повідомлення з подальшими інструкціями на ваш електронний адрес,
        зауважте, що час дії повідомлення становить ${mainConfig.EXPIRES_IN_FORGOT_PASSWORD}
        якщо не знайдете повідомлення, не забудьте перевірити вкладку спам.`,

    [MessagesEnum.CHANGE_PASSWORD]: 'Пароль було усмішно змінено!',
};
