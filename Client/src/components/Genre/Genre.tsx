import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import css from './Genre.module.css';
import { ThemeModeEnum } from '../../enums';
import { IGenreProps } from '../../interfaces';
import { routePathConstant } from '../../constants';

const Genre:FC<IGenreProps> = ({ genre: { name }, handleGenre }:IGenreProps) => {
    const theme = useTheme();

    const [themeMode, setThemeMode] = useState<string>(css.header__nav_genre);

    useEffect(() => {
        theme.palette.mode === ThemeModeEnum.DARK ? setThemeMode(css.header__nav_genre_dark)
            : setThemeMode(css.header__nav_genre);
    }, [theme.palette.mode]);

    const handleButton = () => handleGenre();

    return (
        <Link to={`/${routePathConstant.genres}/${name}`}>
            <button onClick={handleButton} className={themeMode} type='button'>{name}</button>
        </Link>
    );
};

export default Genre;
