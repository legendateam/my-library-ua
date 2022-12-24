import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';

import { AxiosError } from 'axios';
import css from './Layout.module.css';
import {
    useAppDispatch, useAppSelector, useBlurMode, useEffectOnce,
} from '../../hooks';
import {
    addTokenPair, addUser, refreshTokenPairThunk, removeAuthError,
} from '../../store';
import {
    analyticsService, authService, jwtService, userService,
} from '../../services';
import { IPayload, IResponseError, ITokenPair } from '../../interfaces';
import { JwtErrorConstant, localStorageConstant } from '../../constants';
import { HttpMessageEnum, HttpStatusEnum, StatusEnum } from '../../enums';
import Footer from '../Footer/Footer';
import RegistrationForm from '../header/auth/RegistrationForm/RegistrationForm';
import AuthForm from '../header/auth/AuthForm/AuthForm';
import Header from '../header/Header/Header';
import ForgotPassword from '../header/auth/ForgotPassword/ForgotPassword';
import Alerts from '../Alerts/Alerts';

export const Layout = () => {
    const { triggerBlur, handleBlurToggle } = useBlurMode();
    const { tokenPair, responseError, status } = useAppSelector((state) => state.authReducer);

    const { user } = useAppSelector((state) => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [triggerRegBtn, setTriggerRegBtn] = useState(false);

    const [triggerForgotPasswordBtn, setTriggerForgotPasswordBtn] = useState(false);

    const handleRegistration = (): void => {
        triggerRegBtn ? setTriggerRegBtn(false) : setTriggerRegBtn(true);
    };

    const handleForgotPassword = (): void => setTriggerForgotPasswordBtn(!triggerForgotPasswordBtn);

    useEffect(() => {
        if (responseError?.message === JwtErrorConstant.jwtExpired) {
            dispatch(removeAuthError());
            navigate('/');
        }
    }, [responseError]);

    useEffect(() => {
        if (tokenPair && triggerBlur) handleBlurToggle();

        const authStorage = localStorage.getItem(localStorageConstant.auth);
        const tokenPairStorage = JSON.parse(authStorage) as ITokenPair;

        const authGoogleStorage = localStorage.getItem(localStorageConstant.googleAuth);
        const isAuthGoogle = JSON.parse(authGoogleStorage);

        if (!tokenPair) {
            (async () => {
                try {
                    if (tokenPairStorage) {
                        const checkRefreshOnJwtExpired = await authService.checkRefreshOnJwtExpired({
                            refreshToken: tokenPairStorage.refresh,
                            clientKey: tokenPairStorage.clientKey,
                        });

                        if (checkRefreshOnJwtExpired.status === HttpStatusEnum.OK) {
                            dispatch(addTokenPair({ tokenPair: tokenPairStorage }));
                        }
                    }
                } catch (e) {
                    const axiosError = (e as AxiosError)?.response?.data;
                    const responseErrorData = axiosError as IResponseError;

                    if (responseErrorData?.error === HttpMessageEnum.UNAUTHORIZED) {
                        dispatch(refreshTokenPairThunk({
                            refreshToken: tokenPairStorage.refresh, clientKey: tokenPairStorage.clientKey,
                        }));
                    }
                }
            })();

            if (isAuthGoogle) {
                (async () => {
                    try {

                        const data = await authService.loginSuccess();

                        const checkRefreshOnJwtExpired = await authService.checkRefreshOnJwtExpired({
                            refreshToken: data?.data.refresh,
                            clientKey: data?.data.clientKey,
                        });

                        if (checkRefreshOnJwtExpired.status === HttpStatusEnum.OK) {
                            dispatch(addTokenPair({ tokenPair: { ...data.data } }));
                            localStorage.removeItem(localStorageConstant.googleAuth);
                        }
                    } catch (e) {
                        const axiosError = (e as AxiosError)?.response?.data;
                        const responseErrorData = axiosError as IResponseError;

                        localStorage.removeItem(localStorageConstant.googleAuth);

                        if (responseErrorData?.error === HttpMessageEnum.UNAUTHORIZED) {
                            dispatch(refreshTokenPairThunk({
                                refreshToken: tokenPairStorage.refresh, clientKey: tokenPairStorage.clientKey,
                            }));
                        }
                    }
                })();
            }
        }

        if (tokenPairStorage && tokenPair) {
            (async () => {
                try {
                    await authService.checkRefreshOnJwtExpired({
                        refreshToken: tokenPair.refresh,
                        clientKey: tokenPair.clientKey,
                    });
                } catch (e) {
                    if (e) {
                        const axiosError = (e as AxiosError)?.response?.data;
                        const responseErrorData = axiosError as IResponseError;

                        if (responseErrorData?.error === HttpMessageEnum.UNAUTHORIZED) {
                            dispatch(refreshTokenPairThunk({
                                refreshToken: tokenPair.refresh, clientKey: tokenPair.clientKey,
                            }));
                        }
                    }
                }
            })();

            const user = jwtService.verify(tokenPair?.access) as IPayload;

            const avatar = userService.avatarNormalize(user?.avatar);

            dispatch(addUser({ user: { ...user, avatar } }));
        }
    }, [tokenPair]);

    useEffectOnce(() => {
        (async () => {
            try {
                if (user) {
                    await analyticsService.createFirstViewToDay(user.id);
                }

                if (!user) {
                    await analyticsService.createFirstViewToDay();
                }
            } catch (e) {
                console.error(e);

                if (user) {
                    await analyticsService.updateViewsToDay(user.id);
                    return;
                }

                await analyticsService.updateViewsToDay();
            }
        })();
    });

    return (
        <Box
            className={triggerBlur ? css.blur__bg : ''}
            sx={{
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header handleRegistration={handleRegistration} handleForgotPassword={handleForgotPassword} triggerRegBtn={triggerRegBtn} />
            { (triggerBlur && !triggerRegBtn && !tokenPair && !triggerForgotPasswordBtn) && (
                <AuthForm handleRegistration={handleRegistration} handleForgotPassword={handleForgotPassword} />
            )}
            { (triggerBlur && triggerRegBtn && !tokenPair) && (
                <RegistrationForm handleRegistration={handleRegistration} />
            ) }
            { (triggerBlur && triggerForgotPasswordBtn && !tokenPair) && (
                <ForgotPassword handleForgotPassword={handleForgotPassword} />
            ) }
            <main className={css.content}>
                <Alerts />
                <Outlet />
            </main>
            <Footer />
        </Box>
    );
};
