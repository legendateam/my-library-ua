import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import css from './WillReadPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { Book, Title } from '../../components';
import {
    errorsMessageErrorConstant, JwtErrorConstant, ProfileListButtonConstant, urls,
} from '../../constants';
import { getOneWillReadThunk, refreshTokenPairThunk } from '../../store';
import { HttpStatusEnum } from '../../enums';

export const WillReadPage: FC = () => {
    const { willRead, status, err } = useAppSelector((state) => state.willReadReducer);
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        if (!willRead || !willRead?.books.length) {
            dispatch(getOneWillReadThunk({ clientKey, accessToken: access }));
        }
    });

    useEffect(() => {
        if (err && err?.status === HttpStatusEnum.UNAUTHORIZED) {
            dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
        }
    }, [err]);
    return (
        <div className={css.will__read_page}>
            <Title title={ProfileListButtonConstant.willRead} />
            <div className={css.will__read_page_content}>
                { !!willRead?.books.length && (
                    willRead.books.map((book) => (
                        <Link key={book.id} to={`${urls.books}/${book.id}`} state={{ book, author: book.author }}>
                            <Book book={book} />
                        </Link>
                    ))
                ) }

                { !willRead?.books.length && (
                    <h3>{errorsMessageErrorConstant.notFoundAnyBookInProfileList}</h3>
                ) }
            </div>
        </div>
    );
};
