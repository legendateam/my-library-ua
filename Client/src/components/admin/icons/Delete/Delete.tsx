import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, CircularProgress } from '@mui/material';
import css from './Delete.module.css';
import { IDeleteIconProps } from '../../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
    alertMessageAfterDeleteAuthor,
    alertMessageAfterDeleteBook,
    deleteAuthorThunk,
    deleteBooksByIdThunk,
} from '../../../../store';
import { StatusEnum } from '../../../../enums';
import { deleteConstant } from '../../../../constants';

export const Delete: FC<IDeleteIconProps> = ({ type, book, authorId }) => {
    const { status: bookStatus } = useAppSelector((state) => state.bookReducer);
    const { status: authorStatus } = useAppSelector((state) => state.authorReducer);
    const { tokenPair: { clientKey, access } } = useAppSelector((state) => state.authReducer);

    const dispatch = useAppDispatch();

    const [check, setCheck] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (type === deleteConstant.book) {
            dispatch(deleteBooksByIdThunk({ id: book.id, clientKey, accessToken: access }));
            dispatch(alertMessageAfterDeleteBook());

            if (bookStatus === StatusEnum.fulfilled || bookStatus === StatusEnum.rejected) {
                handleClose();
            }
        }

        if (type === deleteConstant.author) {
            dispatch(deleteAuthorThunk({ id: authorId, accessToken: access, clientKey }));
            dispatch(alertMessageAfterDeleteAuthor());

            if (authorStatus === StatusEnum.fulfilled || authorStatus === StatusEnum.rejected) {
                handleClose();
            }
        }
    };

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className={css.delete__book}
                onMouseEnter={() => setCheck(true)}
                onMouseLeave={() => setCheck(false)}
                onClick={handleClickOpen}
            >
                {!check && <DeleteOutlineIcon />}
                {check && <DeleteIcon />}
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    { book && 'Бажаєте видалити книгу?'}
                    { authorId && 'Бажаєте видалити автора?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        { book && 'Зверніть вашу увагу, якщо видалити книгу, ви більше не зможете її відновити,'
                        + 'ви дійсно бажаєте видалити книгу?'}
                        { authorId && 'Зверніть вашу увагу, якщо видалити автора, ви більше не зможете його відновити,'
                        + 'ви дійсно бажаєте видалити атвора?'}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                    <Button
                        onClick={handleConfirm}
                        autoFocus
                        disabled={((bookStatus === StatusEnum.pending)
                        || (authorStatus === StatusEnum.pending)) && true}
                    >
                        Підтвердити
                        { ((bookStatus === StatusEnum.pending)
                            || (authorStatus === StatusEnum.pending)) && (
                            <Box sx={{ display: 'flex', pl: 1 }}>
                                <CircularProgress size={20} />
                            </Box>
                        ) }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
