import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, CircularProgress } from '@mui/material';

import css from './LoginForm.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { ILogin } from '../../../../interfaces';
import { authLoginFormValidator } from '../../../../utils';
import { addTokenPairThunk } from '../../../../store';
import { StatusEnum } from '../../../../enums';

const LoginForm:FC = () => {
    const [visibilityChecked, setVisibilityChecked] = useState(false);
    const { status, responseError } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<ILogin>({
        resolver: joiResolver(authLoginFormValidator), mode: 'onTouched',
    });

    const submit = async (data: ILogin) => {
        dispatch(addTokenPairThunk(data));
    };

    const handleVisibility = (): void => {
        visibilityChecked ? setVisibilityChecked(false)
            : setVisibilityChecked(true);
    };

    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (responseError) {
            setError(responseError.message);
        }
    }, [responseError]);

    return (
        <div className={css.header__auth_login}>
            <form className={css.header__auth__login_form} onSubmit={handleSubmit(submit)}>
                <label htmlFor='email' className={css.header__auth_login_form_label}>
                    Електронна пошта:
                    <input
                        className={
                            Object.keys(errors).includes('email') ? css.header__auth_login_form_label_input_error_bg
                                : css.header__auth_login_form_label_input_bg
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                    { errors && (
                        <span className={css.header__auth_login_form_span_error_message}>
                            { errors?.email?.message }
                        </span>
                    ) }
                    {
                        errors.email && (<WarningAmberIcon className={css.header__auth_login_form_warning_amber_icon} />)
                    }
                </label>
                <label htmlFor='password' className={css.header__auth_login_form_label}>
                    Пароль:
                    <input
                        className={
                            Object.keys(errors).includes('password') ? css.header__auth_login_form_label_input_error_bg
                                : css.header__auth_login_form_label_input_bg
                        }
                        type={!visibilityChecked ? 'password' : 'text'}
                        defaultValue=''
                        {...register('password')}
                    />
                    { !visibilityChecked
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__on_login_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_login_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__off_login_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_login_form_visibility_icon}
                            />
                        )}
                    { errors && (
                        <span className={css.header__auth_login_form_span_error_message}>
                            { errors?.password?.message }
                        </span>
                    ) }
                    {
                        errors.password && (<WarningAmberIcon className={css.header__auth_login_form_warning_amber_icon} />)
                    }

                    { error && <span className={css.header__auth_login_form_span_error_message}>{error}</span> }
                </label>

                <Button
                    className={(Object.keys(errors).length) ? css.header__auth_login_form_btn_submit : ''}
                    type='submit'
                    disabled={status === StatusEnum.pending && true}
                    variant='contained'
                    color='success'
                >
                    Увійти
                    { status === StatusEnum.pending && (
                        <Box sx={{ display: 'flex', pl: 1 }}>
                            <CircularProgress size={20} />
                        </Box>
                    ) }
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
