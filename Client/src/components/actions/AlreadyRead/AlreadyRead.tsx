import React, { FC, useEffect, useState } from 'react';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import style from '../Actions/Actions.module.css';
import {
    JwtErrorConstant,
    typeRejectAlreadyReadSliceConstant,
} from '../../../constants';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../../hooks';
import { IBookProps, IResponseError } from '../../../interfaces';
import {
    createAlreadyReadThunk,
    deleteAlreadyReadThunk, getOneAlreadyReadThunk, refreshTokenPairThunk,
    updateRemoveBookAlreadyReadThunk,
    updateSetBookAlreadyReadThunk,
} from '../../../store';
import { HttpStatusEnum } from '../../../enums';

const AlreadyRead: FC<IBookProps> = ({ book }) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const {
        alreadyRead,
        err,
        typeAction,
    } = useAppSelector((state) => state.alreadyReadReducer);

    const [triggerAction, setTriggerAction] = useState<boolean>(false);
    const [error, setError] = useState<IResponseError | null>(null);

    const handleActions = () => {
        if (tokenPair?.clientKey && tokenPair?.access) {
            err ? setError(err) : setError(null);

            if (!alreadyRead) {
                dispatch(createAlreadyReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }

            if (alreadyRead?.books.length && triggerAction) {
                if (alreadyRead.books.length > 1) {
                    dispatch(updateRemoveBookAlreadyReadThunk(
                        { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                } else {
                    dispatch(deleteAlreadyReadThunk(
                        { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                }
            }

            if (alreadyRead?.books.length && !triggerAction) {
                dispatch(updateSetBookAlreadyReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }
            setTriggerAction(!triggerAction);
        }
    };

    useEffectOnce(() => {
        if (!alreadyRead) {
            dispatch(getOneAlreadyReadThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
            setTriggerAction(!triggerAction);
        }
    });

    useEffect(() => {
        if (alreadyRead) {
            const bookResponse = alreadyRead.books.find((bookResponse) => bookResponse.id === book.id);
            bookResponse ? setTriggerAction(true)
                : setTriggerAction(false);
        }
    }, [alreadyRead]);

    useEffect(() => {
        if (tokenPair) {
            if (err && err?.status === HttpStatusEnum.UNAUTHORIZED) {
                dispatch(refreshTokenPairThunk({ refreshToken: tokenPair.refresh, clientKey: tokenPair.clientKey }));
            }
        }
    }, [err]);

    useEffect(() => {
        if (typeAction) {
            switch (typeAction) {
            case typeRejectAlreadyReadSliceConstant.getOneAlreadyReadThunk:
                dispatch(getOneAlreadyReadThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
                break;

            case typeRejectAlreadyReadSliceConstant.updateRemoveBookAlreadyReadThunk:
                dispatch(updateRemoveBookAlreadyReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectAlreadyReadSliceConstant.deleteAlreadyReadThunk:
                dispatch(deleteAlreadyReadThunk(
                    { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectAlreadyReadSliceConstant.updateSetBookAlreadyReadThunk:
                dispatch(updateSetBookAlreadyReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectAlreadyReadSliceConstant.createAlreadyReadThunk:
                dispatch(createAlreadyReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                // skip default
            }
        }
    }, [tokenPair]);

    return (
        <div>
            {
                (alreadyRead && triggerAction) ? (
                    <InventoryOutlinedIcon
                        className={style.actions}
                        onClick={handleActions}
                    />
                )
                    : (
                        <ContentPasteIcon
                            className={style.actions}
                            onClick={handleActions}
                        />
                    )
            }
        </div>
    );
};

export default AlreadyRead;
