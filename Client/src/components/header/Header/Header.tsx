import React, { FC, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import css from './Header.module.css';
import { IHandleRegistrationForm } from '../../../interfaces';
import { useAppSelector, useBlurMode } from '../../../hooks';
import { ThemeModeEnum } from '../../../enums';
import Logo from '../Logo/Logo';
import Nav from '../nav/Nav/Nav';
import Auth from '../auth/Auth/Auth';
import Profile from '../Profile/Profile';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import Search from '../Search/Search';
import Genres from '../nav/Genres/Genres';
import { routePathConstant } from '../../../constants';
import AuthForm from '../auth/AuthForm/AuthForm';

const Header: FC<IHandleRegistrationForm> = ({ handleRegistration, triggerRegBtn, handleForgotPassword }: IHandleRegistrationForm) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);
    const { user } = useAppSelector((state) => state.userReducer);

    const theme = useTheme();

    const [themeMode, setThemeMode] = useState<string>(`${css.header}`);
    const [mobileBtn, setMobileBtn] = useState<boolean>(false);

    useEffect(() => {
        theme.palette.mode === ThemeModeEnum.DARK ? setThemeMode(`${css.header__dark}`) : setThemeMode(`${css.header}`);
    }, [theme.palette.mode]);

    const handleMobileBtn = () => setMobileBtn(!mobileBtn);

    const { handleBlurToggle, triggerBlur } = useBlurMode();
    return (
        <header className={themeMode}>
            <div className={css.header__container}>
                <Logo />
                <div className={css.header__container_nav}>
                    <Search />
                    <Nav />
                </div>
                { !tokenPair && (
                    <Auth
                        handleRegistration={handleRegistration}
                        handleForgotPassword={handleForgotPassword}
                        triggerRegBtn={triggerRegBtn}
                    />
                ) }

                { (triggerBlur && mobileBtn && !triggerRegBtn && !tokenPair) && (
                    <AuthForm handleRegistration={handleRegistration} />
                ) }

                { !tokenPair && (
                    <div className={css.header_mob_nav_wrap}>
                        <button
                            onClick={handleMobileBtn}
                            type='button'
                            className={
                                (theme.palette.mode === ThemeModeEnum.LIGHT && css.header__btn_nav)
                                || (theme.palette.mode === ThemeModeEnum.DARK && css.header__btn_nav_dark)
                            }
                        >
                            <span className={css.header__btn_nav_span} />
                        </button>

                        { mobileBtn && (
                            <nav className={
                                (theme.palette.mode === ThemeModeEnum.DARK && css.header__btn_nav_menu_dark)
                                || (theme.palette.mode === ThemeModeEnum.LIGHT && css.header__btn_nav_menu)
                            }
                            >
                                <ul className={css.header__btn_nav_menu_ul}>
                                    <li>
                                        <Link to={routePathConstant.logoutPage}>
                                            <button
                                                className={css.header__btn_nav_menu_ul_li_a_button}
                                                type='button'
                                                onClick={handleMobileBtn}
                                            >
                                                ГОЛОВНА
                                            </button>
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            className={css.header__btn_nav_menu_ul_li_a_button}
                                            onClick={handleBlurToggle}
                                            type='button'
                                        >ВХІД
                                        </button>
                                    </li>

                                    <li>
                                        <Genres />
                                    </li>

                                    <li>
                                        <Link to={routePathConstant.ratings}>
                                            <button
                                                className={css.header__btn_nav_menu_ul_li_a_button}
                                                type='button'
                                                onClick={handleMobileBtn}
                                            >
                                                ПОПУЛЯРНІ
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routePathConstant.novelty}>
                                            <button
                                                className={css.header__btn_nav_menu_ul_li_a_button}
                                                type='button'
                                                onClick={handleMobileBtn}
                                            >
                                                НОВИНКИ
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routePathConstant.authors}>
                                            <button
                                                className={css.header__btn_nav_menu_ul_li_a_button}
                                                type='button'
                                                onClick={handleMobileBtn}
                                            >
                                                АВТОРИ
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        ) }
                    </div>
                ) }
                { user && <Profile /> }
                <ToggleColorMode />
            </div>
        </header>
    );
};

export default Header;
