import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import css from './FavoritesPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { Book, Title } from '../../components';
import { errorsMessageErrorConstant, ProfileListButtonConstant, urls } from '../../constants';
import { getOneFavoritesThunk, refreshTokenPairThunk } from '../../store';
import { HttpStatusEnum } from '../../enums';

export const FavoritesPage: FC = () => {
    const { favorites, status, err } = useAppSelector((state) => state.favoritesReducer);
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        if (!favorites || !favorites?.books.length) {
            dispatch(getOneFavoritesThunk({ clientKey, accessToken: access }));
        }
    });

    useEffect(() => {
        if (err && err?.status === HttpStatusEnum.UNAUTHORIZED) {
            dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
        }
    }, [err]);
    return (
        <div className={css.favorites_page}>
            <Title title={ProfileListButtonConstant.favorite} />
            <div className={css.favorites_page_content}>
                { !!favorites?.books.length && (
                    favorites.books.map((book) => (
                        <Link key={book.id} to={`${urls.books}/${book.id}`} state={{ book, author: book.author }}>
                            <Book book={book} />
                        </Link>
                    ))
                ) }

                { !favorites?.books?.length && (
                    <h3>{errorsMessageErrorConstant.notFoundAnyBookInProfileList}</h3>
                ) }
            </div>
        </div>
    );
};
