import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import css from './Logo.module.css';
import logo from '../../../assets/images/logo.jpg';

const Logo:FC = () => (
    <div className={css.header__logo}>
        <Link to='/'>
            <img src={logo} alt='logo' />
        </Link>
    </div>
);

export default Logo;
