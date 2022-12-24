import React, { FC } from 'react';
import { Alert } from '@mui/material';

import css from './Alerts.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { alertMessageAfterDeleteAuthor, alertMessageAfterDeleteBook } from '../../store';
import { StatusEnum } from '../../enums';

const Alerts: FC = () => {
    const { deleteOne, status: statusBooks } = useAppSelector((state) => state.bookReducer);
    const { status: authorStatus, delete: deleteAuthor } = useAppSelector((state) => state.authorReducer);

    const dispatch = useAppDispatch();

    const close = () => {
        if (deleteOne) {
            dispatch(alertMessageAfterDeleteBook());
        }

        if (deleteAuthor) {
            dispatch(alertMessageAfterDeleteAuthor());
        }
    };

    return (
        <>
            { ((statusBooks === StatusEnum.fulfilled && deleteOne) || (authorStatus === StatusEnum.fulfilled && deleteAuthor)) && (
                <Alert
                    severity='success'
                    onClose={close}
                    className={css.alerts}
                >
                    Успішно видалено!
                </Alert>
            ) }

            { ((statusBooks === StatusEnum.rejected && deleteOne) || (authorStatus === StatusEnum.rejected && deleteAuthor)) && (
                <Alert
                    severity='error'
                    onClose={close}
                    className={css.alerts}
                >
                    Помилка, нажаль не було видалено!
                </Alert>
            ) }
        </>
    );
};

export default Alerts;
