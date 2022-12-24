import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import css from './Nav.module.css';
import Genres from '../Genres/Genres';
import { routePathConstant } from '../../../../constants';

const Nav:FC = () => (
    <nav className={css.nav__main}>
        <ul>
            <li><Genres /></li>
            <li><NavLink to={routePathConstant.ratings}>ПОПУЛЯРНІ</NavLink></li>
            <li><NavLink to={routePathConstant.novelty}>НОВИНКИ</NavLink></li>
            <li><NavLink to={routePathConstant.authors}>АВТОРИ</NavLink></li>
        </ul>
    </nav>
);

export default Nav;
