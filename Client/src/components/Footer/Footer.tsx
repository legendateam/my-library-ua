import React, { FC, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import css from './Footer.module.css';
import { ThemeModeEnum } from '../../enums';

const Footer:FC = () => {
    const theme = useTheme();
    const year = new Date().getFullYear();
    const [dark, setDark] = useState<string>('');

    useEffect(() => {
        theme.palette.mode === ThemeModeEnum.DARK ? setDark(css.footer__dark) : setDark('');
    }, [theme.palette.mode]);

    return (
        <footer className={dark || css.footer}>
            <div className={css.footer__container}>
                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>

                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>

                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>

                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>

                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
            <div className={css.footer__copy_information}>
                <p>@(c) {year} bla bla bla bla</p>
            </div>
        </footer>
    );
};

export default Footer;
