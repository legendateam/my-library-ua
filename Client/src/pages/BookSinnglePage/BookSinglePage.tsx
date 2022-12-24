import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';

import css from './BookSinglePage.module.css';
import {
    IAuthorResponse, IBookAndAuthor, IBookResponse, IParamsId, IResponseError,
} from '../../interfaces';
import { analyticsService, bookService } from '../../services';
import { mainConfig } from '../../configs';
import Genre from '../../components/Genre/Genre';
import {
    Actions, Comments, Delete, Download, Ratings, Title, Update, Views,
} from '../../components';
import { useAppSelector } from '../../hooks';
import { HttpStatusEnum, RoleEnum } from '../../enums';
import { deleteConstant } from '../../constants';

export const BookSinglePage:FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const { state, pathname } = useLocation();

    const bookState = state as IBookAndAuthor;

    const { id } = useParams() as IParamsId;

    const [book, setBook] = useState<IBookResponse>(null);
    const [author, setAuthor] = useState<IAuthorResponse>(null);

    useEffect(() => {
        if (state && bookState?.book?.id) {
            setBook(bookState.book);
            setAuthor(bookState.author);
            return;
        }
        if (!state && !book && !bookState?.book?.id) {
            (async () => {
                const bookDB = await bookService.getOneById(id);

                if (bookDB.data) {
                    setBook(bookDB.data);
                    setAuthor(bookDB.data?.author);
                }
            })();
        }
    }, []);

    const handleBtnForAnalytics = async () => {
        try {
            await analyticsService.createFirstFilesToDay({ downloadNumbers: false, readNumbers: true });
        } catch (e) {
            const axiosError = (e as AxiosError)?.response?.data;
            const errorResponse = axiosError as IResponseError;

            if (errorResponse.status === HttpStatusEnum.CONFLICT) {
                await analyticsService.updateFilesToDay({ downloadNumbers: false, readNumbers: true });
            }
        }
    };
    return (
        <div>
            { book && (
                <div className={css.book_single}>
                    <div className={css.book_single_info_wrap}>
                        <div className={css.book_single_main_info_wrap}>
                            <img src={`${mainConfig.CLOUD_DOMAIN_NAME}${book.cover}`} alt={book.name} />

                            <div className={css.book_single_info_content}>
                                <h1>{book.name}</h1>
                                <ul>
                                    { (author) && (
                                        <li>Письменник:
                                            <Link className={css.book_single_author_name} to={`/authors/${author.id}`}>
                                                {author.firstName} {author.lastName}
                                            </Link>
                                        </li>
                                    ) }
                                    { book.yearOfRelease && <li>Рік: {book.yearOfRelease}</li> }
                                    { !!book?.genres?.length && (
                                        <li className={css.book__single_description_info_genres}>
                                            Жанри: { book.genres.map((genre) => <Genre key={genre.id} genre={genre} />) }
                                        </li>
                                    ) }
                                    <li>
                                        <Ratings ratings={book?.ratings} bookId={book?.id} />
                                    </li>
                                    { book.fileText && (
                                        <li className={css.book__single_description_info_wrap}>
                                            <div className={css.book__single_description_info_btn}>
                                                <Download
                                                    fileName={book.fileText.split('/')[2]}
                                                    fileLink={`${mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES}${book.fileText}`}
                                                />

                                                <Link
                                                    to={`${pathname}/read-online/${book.fileText.split('/')[2]}`}
                                                    state={{
                                                        fileLink: `${mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES}${book.fileText}`,
                                                        queryParams: 'hl=UA',
                                                        overrideLocalhost: mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES,
                                                    }}
                                                >
                                                    <Button
                                                        onClick={handleBtnForAnalytics}
                                                        variant='contained'
                                                    >
                                                        Читати онлайн
                                                    </Button>
                                                </Link>
                                            </div>
                                        </li>
                                    ) }

                                    { book.fileAudio && (
                                        <li className={css.book__single_description_info_genres}>
                                            Скачати аудіо книгу:
                                            <Download
                                                fileName={book.fileAudio.split('/')[2]}
                                                fileLink={`${mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES}${book.fileAudio}`}
                                            />
                                        </li>
                                    ) }
                                </ul>
                            </div>
                        </div>

                        <div>
                            { (book && user) && <Actions book={book} /> }
                            { (user && book && user?.role === RoleEnum.ADMIN) && (
                                <div className={css.books__single_admin_icons}>
                                    <Update type={deleteConstant.book} book={book} />
                                    <Delete type={deleteConstant.book} book={book} />
                                </div>
                            ) }
                        </div>

                        { book && <div className={css.books__single_views}><Views bookId={book.id} newView /></div> }
                    </div>

                    <div className={css.books_single_description}>
                        <Title title='Короткий зміст книги' />
                        <p className={css.books__single_books_description}>{book.description}</p>
                    </div>

                    <div className={css.books_single_description}>
                        <Title title='Коментарі до книги' />
                        <Comments book={book} />
                    </div>

                </div>
            ) }
        </div>
    );
};
