import React, { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import css from './Auth.module.css';
import { useAppSelector, useBlurMode } from '../../../../hooks';
import { IHandleRegistrationForm } from '../../../../interfaces';
import AuthForm from '../AuthForm/AuthForm';

const Auth:FC<IHandleRegistrationForm> = ({ handleRegistration, triggerRegBtn }) => {
    const { handleBlurToggle, triggerBlur } = useBlurMode();
    const { tokenPair } = useAppSelector((state) => state.authReducer);
    return (
        <div className={css.header__auth}>
            <button onClick={handleBlurToggle} type='button'>
                <PersonIcon fontSize='large' />
                <p>ВХІД</p>
            </button>
            { (triggerBlur && !triggerRegBtn && !tokenPair) && <AuthForm handleRegistration={handleRegistration} /> }
        </div>
    );
};

export default Auth;
