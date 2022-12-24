import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import css from './EditBookPage.module.css';
import { IBookResponse } from '../../interfaces';
import { bookService } from '../../services';
import { HttpStatusEnum } from '../../enums';
import EditBookForm from '../../components/admin/EditBookForm/EditBookForm';

export const EditBookPage: FC = () => {
    const { state } = useLocation();
    const bookOfState = state as IBookResponse;

    const { id } = useParams();

    const [book, setBook] = useState<IBookResponse | null>(null);

    useEffect(() => {
        if (bookOfState) {
            setBook(bookOfState);
        }

        if (!bookOfState) {
            (async () => {
                try {
                    const responseOK = await bookService.getOneById(id);

                    if (responseOK.status === HttpStatusEnum.OK) {
                        setBook(responseOK.data);
                    }
                } catch (e) {
                    if (e) console.error(e);
                }
            })();
        }
    }, [state]);

    return (
        <div className={css.edit__book_page}>
            { book && <EditBookForm book={book} /> }
        </div>
    );
};
