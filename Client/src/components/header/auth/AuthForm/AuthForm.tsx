import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import css from './AuthForm.module.css';
import LoginForm from '../LoginForm/LoginForm';
import AuthGoogle from '../AuthGoogle/AuthGoogle';
import { IHandleRegistrationForm } from '../../../../interfaces';
import { useBlurMode } from '../../../../hooks';

const AuthForm:FC<IHandleRegistrationForm> = ({ handleRegistration, handleForgotPassword }: IHandleRegistrationForm) => {
    const { handleBlurToggle } = useBlurMode();

    return (
        <div className={css.header__auth_form}>
            <LoginForm />
            <Button
                onClick={handleRegistration}
                className={css.header__auth_form_btn}
                type='button'
                variant='contained'
                color='primary'
            >
                Зареєструватися
            </Button>
            <AuthGoogle />

            <button
                type='button'
                className={css.header__auth_form_forgot_password}
                onClick={handleForgotPassword}
            >
                Забули пароль?
            </button>

            <CloseIcon className={css.header__auth_form_close_icon} onClick={handleBlurToggle} />
        </div>
    );
};

export default AuthForm;
