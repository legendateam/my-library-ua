import React, { FC, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { joiResolver } from '@hookform/resolvers/joi';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import css from './ForgotPassword.module.css';
import { IForgotPassword, IForgotPasswordForm, IResponseError } from '../../../../interfaces';
import { useBlurMode } from '../../../../hooks';
import { forgotPasswordFormValidator } from '../../../../utils';
import { mainConfig } from '../../../../configs';
import { authService } from '../../../../services';
import { HttpStatusEnum } from '../../../../enums';

const ForgotPassword: FC<IForgotPassword> = ({ handleForgotPassword }) => {
    const { handleBlurToggle } = useBlurMode();

    const [pending, setPending] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<IForgotPasswordForm>({
        resolver: joiResolver(forgotPasswordFormValidator), mode: 'onTouched',
    });

    const submit = async ({ email }: IForgotPasswordForm): Promise<void> => {
        setPending(!pending);
        try {
            const stringIResponseOK = await authService.forgotPasswordSendEmail({ email });

            if (stringIResponseOK.status === HttpStatusEnum.OK) {
                setPending(!pending);
                setFailed('');
                setSuccess(stringIResponseOK.data);
            }
        } catch (e) {
            if (e) {
                const axiosError = (e as AxiosError).response.data;
                const responseError = axiosError as IResponseError;

                setFailed(responseError.message);
                setSuccess('');
                setPending(!pending);
            }
        }
    };

    return (
        <div className={css.header__auth_forgot_password}>
            { success ? (
                <div className={css.header__auth_forgot_wrap_info_messages}>
                    <p className={css.header__auth_forgot_form_p_success_message}>{success}</p>
                </div>
            ) : (
                <>
                    <h2>
                        Підтримка пароля
                    </h2>

                    <div className={css.header__auth_forgot_wrap_info_messages}>
                        <p className={css.header__auth_forgot_info_messages}>
                            Введіть адресу електронної пошти, пов’язаний із вашим обліковим записом {mainConfig.PROJECT_NAME}.
                        </p>
                    </div>

                    <form className={css.header__auth_forgot_password_form} onSubmit={handleSubmit(submit)}>
                        <label htmlFor='email' className={css.header__auth_forgot_form_label}>
                            Електронна пошта:
                            <input
                                className={
                                    errors?.email ? css.header__auth_forgot_form_label_input_error_bg
                                        : css.header__auth_forgot_form_label_input_bg
                                }
                                type='email'
                                defaultValue=''
                                {...register('email')}
                            />
                            { errors && (
                                <span className={css.header__auth_forgot_form_span_error_message}>
                                    { errors?.email?.message }
                                </span>
                            ) }
                            {
                                errors.email && (<WarningAmberIcon className={css.header__auth_forgot_form_warning_amber_icon} />)
                            }
                        </label>

                        { failed && (
                            <span className={css.header__auth_forgot_form_span_error_message}>{failed}</span>
                        ) }

                        <Button
                            variant='contained'
                            type='submit'
                            color='success'
                            disabled={pending && true}
                        >
                            продовжити

                            { pending && (
                                <Box sx={{ display: 'flex', pl: 1 }}>
                                    <CircularProgress size={20} />
                                </Box>
                            ) }
                        </Button>
                    </form>

                    <Button
                        variant='contained'
                        onClick={handleForgotPassword}
                    >
                        Я згадав свій пароль
                    </Button>
                </>
            ) }
            <CloseIcon className={css.header__auth_form_close_icon} onClick={handleBlurToggle} />
        </div>
    );
};

export default ForgotPassword;
