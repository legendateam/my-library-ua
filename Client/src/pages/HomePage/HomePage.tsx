import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import css from './HomePage.module.css';
import { Author, BookCard, Title } from '../../components';
import { homePageConstant } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    getHomeAuthorsAsyncThunk,
    getHomeLastAddedBooksThunk,
    getHomeNoveltyThunk,
    getHomeRatingThunk,
} from '../../store';
import { AuthorSkeleton, BookSkeleton } from '../../components/skeletons';

dayjs.extend(utc);

export const HomePage:FC = () => {
    const { authorsHome } = useAppSelector((state) => state.authorReducer);
    const {
        status, homeBooks: {
            lastAddedBooks, popular, novelty,
        },
    } = useAppSelector((state) => state.bookReducer);
    const dispatch = useAppDispatch();

    const [perPage, setPerPage] = useState<number>(10);

    useEffect(() => {
        if (!novelty) {
            dispatch(getHomeNoveltyThunk({ perPage, date: dayjs.utc().subtract(7, 'day').format() }));
        }

        if (!popular) {
            dispatch(getHomeRatingThunk({ rate: 4, perPage }));
        }

        if (!lastAddedBooks) {
            dispatch(getHomeLastAddedBooksThunk({ perPage }));
        }

        if (!authorsHome) {
            dispatch(getHomeAuthorsAsyncThunk({ perPage }));
        }
    }, []);

    return (
        <div className={css.home__page}>
            <div className={css.home__page_wrap}>
                <Title title={homePageConstant.popular} />
                <div className={css.home__page_books}>
                    { popular && popular.map((book) => <BookCard book={book} key={book.id} />) }
                    { (!popular) && (
                        Array.from(new Array(perPage)).map((_, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <BookSkeleton key={index} />
                        ))
                    ) }
                </div>
            </div>

            <div className={css.home__page_wrap}>
                <Title title={homePageConstant.novelty} />
                <div className={css.home__page_books}>
                    { novelty && novelty.map((book) => <BookCard book={book} key={book.id} />) }
                    { (!novelty) && (
                        Array.from(new Array(perPage)).map((_, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <BookSkeleton key={index} />
                        ))
                    ) }
                </div>
            </div>

            <div className={css.home__page_wrap}>
                <Title title={homePageConstant.lastAddedBooks} />
                <div className={css.home__page_books}>
                    { lastAddedBooks && lastAddedBooks.map((book) => <BookCard book={book} key={book.id} />) }
                    { (!lastAddedBooks) && (
                        Array.from(new Array(perPage)).map((_, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <BookSkeleton key={index} />
                        ))
                    ) }
                </div>
            </div>

            <div className={css.home__page_wrap}>
                <Title title={homePageConstant.authors} />
                <div className={css.home__page_authors}>
                    { authorsHome && authorsHome.map((author) => <Author author={author} key={author.id} />) }
                    { (!authorsHome) && (
                        Array.from(new Array(perPage)).map((_, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <AuthorSkeleton key={index} />
                        ))
                    ) }
                </div>
            </div>
        </div>
    );
};
