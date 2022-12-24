import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from 'react-router-dom';

import css from './BooksRatingsPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import {
    getAllRatingsThunk,
    sortBooksByYear,
    sortRatingsByRating,
    sortRatingsByViews,
    sortRatingsByYear,
} from '../../store';
import { BookCard } from '../../components';
import MyPagination from '../../components/MyPagination/MyPagination';
import { paginationTypeConstant, queryConstant, sortConstant } from '../../constants';
import { StatusEnum } from '../../enums';
import { BookSkeleton } from '../../components/skeletons';
import Sort from '../../components/Sort/Sort';

dayjs.extend(utc);

export const BooksRatingsPage: FC = () => {
    const { booksRatings, countBooksRatings, status } = useAppSelector((state) => state.bookReducer);
    const { pageBooksRatings, perPageBooksRatings } = useAppSelector((state) => state.paginationReducer);
    const dispatch = useAppDispatch();

    const [query] = useSearchParams();

    useEffectOnce(() => {
        if (!booksRatings) {
            dispatch(getAllRatingsThunk({ rate: 3, page: 1 }));
        }
    });

    useEffect(() => {
        const page = query.get(queryConstant.ratingsPage);

        if (booksRatings && pageBooksRatings === Number(page) && (pageBooksRatings >= 1 && pageBooksRatings <= Math.ceil(
            countBooksRatings / perPageBooksRatings,
        ))) {
            dispatch(getAllRatingsThunk({ rate: 3, page: Number(page) }));
        }
    }, [pageBooksRatings]);

    useEffect(() => {
        const querySort = query.getAll(queryConstant.sortBy).pop();

        if (querySort === sortConstant.date) {
            dispatch(sortRatingsByYear());
        }

        if (querySort === sortConstant.rating) {
            dispatch(sortRatingsByRating());
        }

        if (querySort === sortConstant.views) {
            dispatch(sortRatingsByViews());
        }
    }, [query]);

    return (
        <div>
            <div className={css.books_ratings__page__pagination}>
                <Sort />
                <MyPagination
                    page={pageBooksRatings}
                    count={countBooksRatings}
                    status={status}
                    perPage={perPageBooksRatings}
                    type={paginationTypeConstant.ratings}
                />
            </div>
            <div className={css.books_ratings__page}>
                { ((!booksRatings || status === StatusEnum.pending) ? Array.from(new Array(perPageBooksRatings))
                    : booksRatings).map((ratings, index) => (ratings
                    ? <BookCard key={ratings.id} book={ratings} />
                    // eslint-disable-next-line react/no-array-index-key
                    : <BookSkeleton key={index} />))}
            </div>
        </div>
    );
};
