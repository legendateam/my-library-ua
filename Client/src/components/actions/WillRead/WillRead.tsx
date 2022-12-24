import React, { FC, useEffect, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

import { useAppDispatch, useAppSelector, useEffectOnce } from '../../../hooks';
import {
    createWillReadThunk,
    deleteWillReadThunk,
    getOneWillReadThunk,
    refreshTokenPairThunk,
    updateRemoveWillReadThunk,
    updateSetWillReadThunk,
} from '../../../store';
import { typeRejectWillReadSliceConstant } from '../../../constants';
import style from '../Actions/Actions.module.css';
import { IBookProps } from '../../../interfaces';
import { HttpStatusEnum } from '../../../enums';

export const WillRead: FC<IBookProps> = ({ book }) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);

    const { willRead, err, typeAction } = useAppSelector((state) => state.willReadReducer);
    const dispatch = useAppDispatch();

    const [triggerAction, setTriggerAction] = useState<boolean>(false);

    const handleActions = () => {
        if (tokenPair?.clientKey && tokenPair?.access) {
            if (!willRead) {
                dispatch(createWillReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }

            if (willRead?.books.length && triggerAction) {
                if (willRead.books.length > 1) {
                    dispatch(updateRemoveWillReadThunk(
                        { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                } else {
                    dispatch(deleteWillReadThunk(
                        { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                }
            }

            if (willRead?.books.length && !triggerAction) {
                dispatch(updateSetWillReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }
            setTriggerAction(!triggerAction);
        }
    };

    useEffectOnce(() => {
        if (!willRead) {
            dispatch(getOneWillReadThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
            setTriggerAction(!triggerAction);
        }
    });

    useEffect(() => {
        if (willRead) {
            const bookResponse = willRead.books.find((bookResponse) => bookResponse.id === book.id);
            bookResponse ? setTriggerAction(true)
                : setTriggerAction(false);
        }
    }, [willRead]);

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
            case typeRejectWillReadSliceConstant.getOneWillThunk:
                dispatch(getOneWillReadThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
                break;

            case typeRejectWillReadSliceConstant.updateRemoveWillThunk:
                dispatch(updateRemoveWillReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectWillReadSliceConstant.deleteWillThunk:
                dispatch(deleteWillReadThunk(
                    { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectWillReadSliceConstant.updateSetWillThunk:
                dispatch(updateSetWillReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectWillReadSliceConstant.createWillThunk:
                dispatch(createWillReadThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                // skip default
            }
        }
    }, [tokenPair]);
    return (
        <div>
            { (willRead && triggerAction) ? (
                <StarOutlinedIcon
                    className={style.actions}
                    onClick={handleActions}
                />
            )
                : (
                    <StarOutlineOutlinedIcon
                        className={style.actions}
                        onClick={handleActions}
                    />
                )}
        </div>
    );
};

export default WillRead;
