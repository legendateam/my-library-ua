import React, { FC } from 'react';
import { Button } from '@mui/material';

import css from './AuthGoogle.module.css';
import googleIcon from '../../../../assets/images/Google__G__Logo.svg.png';
import { mainConfig } from '../../../../configs';
import {localStorageConstant, urls} from '../../../../constants';

const AuthGoogle: FC = () => {
    const openWindow = (): Window => window.open(`${mainConfig.SERVER_URL}${urls.auth}${urls.google}`, '_self');

    const handlerGoogleAuth = (): void => {
        openWindow();
        localStorage.setItem(localStorageConstant.googleAuth, JSON.stringify(true));
    }

    return (
        <div className={css.header__auth_google}>
            <h3>або</h3>
            <Button onClick={handlerGoogleAuth} color='secondary' variant='contained'>
                <div className={css.header__auth_google_wrap_img}><img src={googleIcon} alt='google' /></div>Увійти як користувач Google
            </Button>
        </div>
    );
};

export default AuthGoogle;
