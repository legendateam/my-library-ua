import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import css from './AlreadyReadPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { Book, Title } from '../../components';
import {
    errorsMessageErrorConstant, JwtErrorConstant, ProfileListButtonConstant, urls,
} from '../../constants';
import { getOneAlreadyReadThunk, refreshTokenPairThunk } from '../../store';
import { HttpStatusEnum } from '../../enums';

export const AlreadyReadPage: FC = () => {
    const { alreadyRead, status, err } = useAppSelector((state) => state.alreadyReadReducer);
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        if (!alreadyRead || !alreadyRead?.books.length) {
            dispatch(getOneAlreadyReadThunk({ clientKey, accessToken: access }));
        }
    });

    useEffect(() => {
        if (err && err?.status === HttpStatusEnum.UNAUTHORIZED) {
            dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
        }
    }, [err]);
    return (
        <div className={css.already__read_page}>
            <Title title={ProfileListButtonConstant.alreadyRead} />
            <div className={css.already__read_page_content}>
                { !!alreadyRead?.books.length && (
                    alreadyRead.books.map((book) => (
                        <Link key={book.id} to={`${urls.books}/${book.id}`} state={{ book, author: book.author }}>
                            <Book book={book} />
                        </Link>
                    ))
                ) }

                { !alreadyRead?.books?.length && (
                    <h3>{errorsMessageErrorConstant.notFoundAnyBookInProfileList}</h3>
                ) }
            </div>
        </div>
    );
};
