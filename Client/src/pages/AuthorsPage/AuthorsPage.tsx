import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './AuthorsPage.module.css';
import { Author } from '../../components';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { getAllAuthorAsyncThunk } from '../../store';
import { paginationTypeConstant, queryConstant } from '../../constants';
import MyPagination from '../../components/MyPagination/MyPagination';
import { AuthorSkeleton } from '../../components/skeletons';
import { StatusEnum } from '../../enums';

export const AuthorsPage: FC = () => {
    const { authors, status, count } = useAppSelector((state) => state.authorReducer);
    const { pageAuthors, perPageAuthors } = useAppSelector((state) => state.paginationReducer);
    const dispatch = useAppDispatch();

    const [query] = useSearchParams();

    useEffectOnce(() => {
        const page = query.get(queryConstant.page);

        if (!authors) {
            if (Number(page) >= 1) {
                dispatch(getAllAuthorAsyncThunk({ page }));
                return;
            }
            dispatch(getAllAuthorAsyncThunk({ page: null }));
        }
    });

    useEffect(() => {
        const page = query.get(queryConstant.page);

        if (authors && pageAuthors === Number(page) && (pageAuthors >= 1 && pageAuthors <= Math.ceil(count / perPageAuthors))) {
            dispatch(getAllAuthorAsyncThunk({ page: pageAuthors.toString() }));
        }
    }, [pageAuthors]);
    return (
        <div>
            <div className={css.authors__page__pagination}>
                <MyPagination
                    page={pageAuthors}
                    count={count}
                    status={status}
                    perPage={perPageAuthors}
                    type={paginationTypeConstant.authors}
                />
            </div>
            <div className={css.authors__page}>
                { ((!authors || status === StatusEnum.pending) ? Array.from(new Array(perPageAuthors))
                    : authors).map((author, index) => (author
                    // eslint-disable-next-line react/no-array-index-key
                    ? <Author key={author.id} author={author} /> : <AuthorSkeleton key={index} />))}
            </div>
        </div>
    );
};
