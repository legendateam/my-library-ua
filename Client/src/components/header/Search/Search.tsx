import React, { FC, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { useNavigate } from 'react-router-dom';
import css from './Search.module.css';
import { ThemeModeEnum } from '../../../enums';
import { searchFormValidator } from '../../../utils';
import { ISearch } from '../../../interfaces';
import { routePathConstant } from '../../../constants';

const Search:FC = () => {
    const theme = useTheme();
    const [dark, setDark] = useState<string>('');

    const navigate = useNavigate();

    const {
        register, formState: { errors }, reset, handleSubmit,
    } = useForm<ISearch>({ resolver: joiResolver(searchFormValidator) });

    useEffect(() => {
        theme.palette.mode === ThemeModeEnum.DARK ? setDark(css.header__form_search_form_dark) : setDark('');
    }, [theme.palette.mode]);

    const submit = ({ search }: ISearch): void => {
        navigate(`/${routePathConstant.search}?s=${search}`);
        reset();
    };

    return (
        <div className={css.header__form_search}>
            <form onSubmit={handleSubmit(submit)} className={dark || css.header__form_search_form}>
                <input type='text' placeholder='Пошук' {...register('search')} />
                {/* eslint-disable-next-line react/button-has-type */}
                <button className={css.header__form_icon}>
                    <SearchIcon fontSize='small' />
                </button>
            </form>
        </div>
    );
};

export default Search;
