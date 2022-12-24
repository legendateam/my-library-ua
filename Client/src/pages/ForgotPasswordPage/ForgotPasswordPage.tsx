import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
    Box,
    Button, CircularProgress, IconButton, InputAdornment, InputLabel, OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';

import css from './ForgotPasswordPage.module.css';
import { forgotPasswordChangePasswordValidator } from '../../utils';
import { IForgotPasswordChangePassword, IResponseError, IShowPassword } from '../../interfaces';
import { queryConstant } from '../../constants';
import { authService } from '../../services';
import { HttpStatusEnum } from '../../enums';

export const ForgotPasswordPage: FC = () => {
    const [query, setQuery] = useSearchParams();

    const [showPassword, setShowPassword] = useState<IShowPassword>({
        password: false,
        confirmPassword: false,
        currentPassword: false,
    });

    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<IForgotPasswordChangePassword>({
        resolver: joiResolver(forgotPasswordChangePasswordValidator),
        mode: 'onTouched',
    });

    const submit = async ({ password }: IForgotPasswordChangePassword): Promise<void> => {
        setPending(!pending);
        try {
            const clientKey = query.get(queryConstant.clientKey);
            const forgotToken = query.get(queryConstant.forgot);

            const stringIResponseOK = await authService.changePassword({ clientKey, password, forgotToken });

            if (stringIResponseOK.status === HttpStatusEnum.OK) {
                setPending(!pending);
                setSuccess(stringIResponseOK.data);
                setError('');
            }
        } catch (e) {
            if (e) {
                const axiosError = (e as AxiosError).response.data;
                const responseData = axiosError as IResponseError;

                setPending(!pending);
                setError(responseData.message);
            }
        }
    };

    return (
        <div className={css.forgot__password_page}>
            { success ? (
                <h2 className={css.forgot__password__page_success_message}>
                    { success }
                </h2>
            ) : (
                <form onSubmit={handleSubmit(submit)} className={css.forgot__password__page_form}>
                    <InputLabel htmlFor='password' className={css.forgot__password__page_label}>
                        <h3>Новий пароль:</h3>

                        <>
                            <OutlinedInput
                                error={Object.keys(errors).includes('password')}
                                {...register('password')}
                                type={showPassword.password ? 'text' : 'password'}
                                endAdornment={(
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                            edge='end'
                                        >
                                            {!showPassword.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )}
                            />
                            { Object.keys(errors).includes('password') && (
                                <div className={css.forgot__password__page_error_message}>{errors.password.message}</div>
                            ) }
                        </>
                    </InputLabel>

                    <InputLabel htmlFor='confirmPassword' className={css.forgot__password__page_label}>
                        <h3>Підвердіть новий пароль:</h3>

                        <>
                            <OutlinedInput
                                error={Object.keys(errors).includes('confirmPassword')}
                                {...register('confirmPassword')}
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                endAdornment={(
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={() => setShowPassword(
                                                { ...showPassword, confirmPassword: !showPassword.confirmPassword },
                                            )}
                                            edge='end'
                                        >
                                            {!showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )}
                            />
                            { Object.keys(errors).includes('confirmPassword') && (
                                <div className={css.forgot__password__page_error_message}>{errors.confirmPassword.message}</div>
                            ) }
                        </>
                    </InputLabel>

                    { error && (
                        <div className={css.forgot__password__page_error_message}>{error}</div>
                    ) }

                    <Button
                        className={css.forgot__password__page_form_btn_save}
                        type='submit'
                        disabled={((!!Object.keys(errors).length) || pending) && true}
                        variant='contained'
                        color='success'
                    >
                        Зберегти зміни

                        { pending && (
                            <Box sx={{ display: 'flex', pl: 1 }}>
                                <CircularProgress size={20} />
                            </Box>
                        ) }
                    </Button>
                </form>
            ) }
        </div>
    );
};
