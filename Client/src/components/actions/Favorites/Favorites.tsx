import React, { FC, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import style from '../Actions/Actions.module.css';
import { IBookProps } from '../../../interfaces';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../../hooks';
import {
    createFavoritesThunk,
    deleteFavoriteThunk, getOneFavoritesThunk,
    updateRemoveFavoriteThunk, updateSetFavoriteThunk,
    refreshTokenPairThunk,
} from '../../../store';
import { typeRejectFavoritesSliceConstant } from '../../../constants';
import { HttpStatusEnum } from '../../../enums';

const Favorites: FC<IBookProps> = ({ book }) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);

    const { favorites, err, typeAction } = useAppSelector((state) => state.favoritesReducer);
    const dispatch = useAppDispatch();

    const [triggerAction, setTriggerAction] = useState<boolean>(false);

    const handleActions = () => {
        if (tokenPair?.clientKey && tokenPair?.access) {
            if (!favorites) {
                dispatch(createFavoritesThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }

            if (favorites?.books.length && triggerAction) {
                if (favorites.books.length > 1) {
                    dispatch(updateRemoveFavoriteThunk(
                        { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                } else {
                    dispatch(deleteFavoriteThunk(
                        { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                    ));
                }
            }

            if (favorites?.books.length && !triggerAction) {
                dispatch(updateSetFavoriteThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
            }
            setTriggerAction(!triggerAction);
        }
    };

    useEffectOnce(() => {
        if (!favorites) {
            dispatch(getOneFavoritesThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
            setTriggerAction(!triggerAction);
        }
    });

    useEffect(() => {
        if (favorites) {
            const bookResponse = favorites.books.find((bookResponse) => bookResponse.id === book.id);
            bookResponse ? setTriggerAction(true)
                : setTriggerAction(false);
        }
    }, [favorites]);

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
            case typeRejectFavoritesSliceConstant.getOneFavoritesThunk:
                dispatch(getOneFavoritesThunk({ clientKey: tokenPair.clientKey, accessToken: tokenPair.access }));
                break;

            case typeRejectFavoritesSliceConstant.updateRemoveFavoriteThunk:
                dispatch(updateRemoveFavoriteThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectFavoritesSliceConstant.deleteFavoriteThunk:
                dispatch(deleteFavoriteThunk(
                    { clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectFavoritesSliceConstant.updateSetFavoriteThunk:
                dispatch(updateSetFavoriteThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                break;

            case typeRejectFavoritesSliceConstant.createFavoritesThunk:
                dispatch(createFavoritesThunk(
                    { bookId: book.id, clientKey: tokenPair.clientKey, accessToken: tokenPair.access },
                ));
                // skip default
            }
        }
    }, [tokenPair]);
    return (
        <div>
            { (favorites && triggerAction) ? (
                <FavoriteIcon
                    className={style.actions}
                    onClick={handleActions}
                />
            )
                : (
                    <FavoriteBorderIcon
                        className={style.actions}
                        onClick={handleActions}
                    />
                )}
        </div>
    );
};

export default Favorites;
