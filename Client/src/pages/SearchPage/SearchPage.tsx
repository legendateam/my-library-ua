import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './Search.module.css';
import { queryConstant, SearchConstant } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorsBySearchDataAsyncThunk, getBooksBySearchDataThunk, setAuthorsOfBooks } from '../../store';
import { StatusEnum } from '../../enums';
import { AuthorSkeleton, BookSkeleton } from '../../components/skeletons';
import { Author, BookCard, Title } from '../../components';

export const SearchPage: FC = () => {
    const { searchAuthors, status: authorsStatus } = useAppSelector((state) => state.authorReducer);
    const { searchBooks, status: booksStatus } = useAppSelector((state) => state.bookReducer);
    const dispatch = useAppDispatch();

    const [query] = useSearchParams();

    useEffect(() => {
        if (query.get(queryConstant.search)) {
            dispatch(getAuthorsBySearchDataAsyncThunk({ search: query.get(queryConstant.search) }));
            dispatch(getBooksBySearchDataThunk({ search: query.get(queryConstant.search) }));
        }
    }, [query]);

    useEffect(() => {
        if (authorsStatus === StatusEnum.rejected && booksStatus === StatusEnum.fulfilled) {
            searchBooks.map((book) => (() => {
                dispatch(setAuthorsOfBooks({ author: book.author }));
            })());
        }
    }, [authorsStatus, booksStatus]);

    return (
        <div className={css.search__page}>
            <div className={css.search__page_wrap}>
                { booksStatus !== StatusEnum.rejected && <Title title={SearchConstant.books} /> }
                <div className={css.search__page_books}>
                    { booksStatus === StatusEnum.pending && (
                        // eslint-disable-next-line react/no-array-index-key
                        Array.from(new Array(30)).map((_, index) => <BookSkeleton key={index} />)
                    ) }

                    { (!!searchBooks?.length && booksStatus !== StatusEnum.rejected)
                    && searchBooks.map((book) => <BookCard book={book} key={book.id} />) }
                </div>
            </div>

            <div className={css.search__page_wrap}>
                { authorsStatus !== StatusEnum.rejected && <Title title={SearchConstant.authors} /> }
                <div className={css.search__page_authors}>
                    { authorsStatus === StatusEnum.pending && (
                    // eslint-disable-next-line react/no-array-index-key
                        Array.from(new Array(30)).map((_, index) => <AuthorSkeleton key={index} />)
                    ) }

                    {(!!searchAuthors?.length && authorsStatus !== StatusEnum.rejected)
                    && searchAuthors.map((author) => <Author author={author} key={author.id} />)}
                </div>
            </div>

            <h1 className={css.not__found_search}>
                {
                    authorsStatus === StatusEnum.rejected && booksStatus === StatusEnum.rejected && 'Не знайдено'
                }
            </h1>
        </div>
    );
};
