import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';

import css from './AdminPage.module.css';
import {
    CreateAuthorForm, CreateBookForm, CreateGenreForm, DeleteGenreForm,
} from '../../components';
import { authorService, authService, genreService } from '../../services';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { IResponseError } from '../../interfaces';
import { refreshTokenPairThunk } from '../../store';
import { JwtErrorConstant } from '../../constants';

export const AdminPage: FC = () => {
    const { tokenPair: { access, clientKey, refresh } } = useAppSelector((state) => state.authReducer);

    const dispatch = useAppDispatch();

    const [genres, setGenres] = useState<{ label: string, id: number }[]>([]);
    const [authors, setAuthors] = useState<{ label: string, id: number }[]>([]);

    useEffectOnce(() => {
        if (!genres.length) {
            (async () => {
                const { data } = await genreService.getAll();

                const localGenres = [...genres];
                data.forEach((genre) => {
                    localGenres.push({ label: genre.name, id: genre.id });
                    setGenres(localGenres);
                });
            })();
        }
    });

    useEffectOnce(() => {
        if (!genres.length) {
            (async () => {
                try {
                    const { data } = await authorService.getAllAdmin({ accessToken: access, clientKey });

                    const localAuthors = [...authors];
                    data.forEach((author) => {
                        localAuthors.push({ id: author.id, label: `${author.firstName} ${author.lastName}` });
                        setAuthors(localAuthors);
                    });
                } catch (e) {
                    const axiosError = (e as AxiosError)?.response?.data;
                    const responseError = axiosError as IResponseError;

                    if (responseError.message === JwtErrorConstant.jwtExpired) {
                        dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
                    }
                }
            })();
        }
    });

    return (
        <div className={css.admin__page}>
            <div className={css.admin__page_wrap_forms}>
                <CreateBookForm genres={genres} authors={authors} />
                <CreateAuthorForm genres={genres} />
                <CreateGenreForm />
                <DeleteGenreForm genres={genres} />
            </div>
        </div>
    );
};
