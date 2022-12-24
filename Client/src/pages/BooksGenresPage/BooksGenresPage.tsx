import React, { FC, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import css from './BooksGenresPage.module.css';
import MyPagination from '../../components/MyPagination/MyPagination';
import { paginationTypeConstant, queryConstant, sortConstant } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    getGenresBooksThunk,
    sortBooksByYear,
    sortBooksByViews,
    sortBooksByRating,
} from '../../store';
import { StatusEnum } from '../../enums';
import { BookSkeleton } from '../../components/skeletons';
import { BookCard } from '../../components';
import Sort from '../../components/Sort/Sort';

export const BooksGenresPage: FC = () => {
    const { status, books, countBooks } = useAppSelector((state) => state.bookReducer);
    const { perPageGenres, pageGenres } = useAppSelector((state) => state.paginationReducer);

    const dispatch = useAppDispatch();

    const { genre } = useParams();
    const [query] = useSearchParams();

    useEffect(() => {
        if (books.length) {
            const some = books.some((book) => book.genres.some((bookGenre) => bookGenre.name === genre));
            if (!some) {
                dispatch(getGenresBooksThunk({ genre }));
            }
        }

        if (!books.length) {
            dispatch(getGenresBooksThunk({ genre }));
        }
    }, [genre, query]);

    useEffect(() => {
        const sortQuery = query.getAll(queryConstant.sortBy).pop();

        if (sortQuery === sortConstant.date) {
            dispatch(sortBooksByYear());
        }

        if (sortQuery === sortConstant.views) {
            dispatch(sortBooksByViews());
        }

        if (sortQuery === sortConstant.rating) {
            dispatch(sortBooksByRating());
        }
    }, [query]);

    return (
        <div>
            <div className={css.books_genres__page__pagination}>
                <Sort />
                <MyPagination
                    page={pageGenres}
                    count={countBooks}
                    status={status}
                    perPage={perPageGenres}
                    type={paginationTypeConstant.genres}
                />
            </div>

            { (status === StatusEnum.pending && !books) && Array.from(new Array(30).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <BookSkeleton key={index} />
            ))) }

            {
                books && (
                    <div className={css.books_genres__page}>
                        { books.map((book) => <BookCard key={book.id} book={book} />) }
                    </div>
                )
            }
        </div>
    );
};
