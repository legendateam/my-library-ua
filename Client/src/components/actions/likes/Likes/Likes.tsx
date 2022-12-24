import React, { FC, useEffect, useState } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import css from './Likes.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { ILikesProps, IResponseError } from '../../../../interfaces';
import { likesAndDisLikesService } from '../../../../services';
import { JwtErrorConstant } from '../../../../constants';
import { refreshTokenPairThunk, removeTokenPairThunk, removeUser } from '../../../../store';

const Likes: FC<ILikesProps> = ({
    actions, likes, setLikes, disLikes, setDisLikes, commentId, setPutLike, putLike, setPutDisLike, putDisLike,
}) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);
    const { user } = useAppSelector((state) => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [typeError, setTypeError] = useState<{ create?: boolean, update?: boolean, delete?: boolean }
        | null>(null);
    const [error, setError] = useState<string>('');

    const handleLike = async () => {
        if (!putLike) {
            if (putDisLike) {
                try {
                    await likesAndDisLikesService.deleteOne(commentId, {
                        accessToken: tokenPair?.access,
                        clientKey: tokenPair?.clientKey,
                    });

                    setPutDisLike(false);
                    setDisLikes(disLikes - 1);
                } catch (e) {
                    const axiosError = e as AxiosError;
                    const errorAxiosResponse = axiosError?.response?.data;
                    const error = errorAxiosResponse as IResponseError;

                    if (error?.message === JwtErrorConstant.jwtExpired) {
                        setTypeError({ delete: true });
                        dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                    }
                }
            }

            try {
                await likesAndDisLikesService.createOne(commentId, {
                    disLike: 0,
                    like: 1,
                    accessToken: tokenPair?.access,
                    clientKey: tokenPair?.clientKey,
                });

                setPutLike(true);
                setPutDisLike(false);
                setLikes(likes + 1);
            } catch (e) {
                const axiosError = e as AxiosError;
                const errorAxiosResponse = axiosError?.response?.data;
                const error = errorAxiosResponse as IResponseError;

                if (error?.message === JwtErrorConstant.jwtExpired) {
                    setTypeError({ create: true });
                    dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                }
            }
        }

        if (putLike) {
            setPutLike(false);
            setLikes(likes - 1);

            try {
                await likesAndDisLikesService.deleteOne(commentId, {
                    accessToken: tokenPair?.access,
                    clientKey: tokenPair?.clientKey,
                });
            } catch (e) {
                const axiosError = e as AxiosError;
                const errorAxiosResponse = axiosError?.response?.data;
                const error = errorAxiosResponse as IResponseError;

                if (error?.message === JwtErrorConstant.jwtExpired) {
                    setTypeError({ delete: true });
                    dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                }
            }
        }
    };

    useEffect(() => {
        if (typeError?.create) {
            (async () => {
                try {
                    await likesAndDisLikesService.createOne(commentId, {
                        disLike: 0,
                        like: 1,
                        accessToken: tokenPair?.access,
                        clientKey: tokenPair?.clientKey,
                    });

                    setPutLike(true);
                    setPutDisLike(false);
                    setLikes(likes + 1);
                } catch (e) {
                    const axiosError = e as AxiosError;
                    const errorAxiosResponse = axiosError?.response?.data;
                    const error = errorAxiosResponse as IResponseError;

                    if (error?.message === JwtErrorConstant.jwtExpired) {
                        setTypeError(null);
                        dispatch(removeUser());
                        dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.clientKey }));
                        navigate('/');
                    }
                }
            })();
        }

        if (typeError?.delete) {
            (async () => {
                try {
                    await likesAndDisLikesService.deleteOne(commentId, {
                        accessToken: tokenPair?.access,
                        clientKey: tokenPair?.clientKey,
                    });

                    setPutLike(false);
                    setLikes(likes - 1);
                } catch (e) {
                    const axiosError = e as AxiosError;
                    const errorAxiosResponse = axiosError?.response?.data;
                    const error = errorAxiosResponse as IResponseError;

                    if (error?.message === JwtErrorConstant.jwtExpired) {
                        setTypeError(null);
                        dispatch(removeUser());
                        dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.clientKey }));
                        navigate('/');
                    }
                }
            })();
        }
    }, [tokenPair]);

    useEffect(() => {
        if (!likes) {
            actions?.forEach((action) => setLikes(action.like + likes));
        }

        if (user) {
            if (!putLike && !putDisLike) {
                const actionPut = actions?.find((action) => action.userId === user?.id);
                if (actionPut?.like) {
                    setPutLike(true);
                }
            }
        }
    }, [actions, user]);

    return (
        <div className={css.likes}>
            <div className={user && css.likes_active}>
                { putLike && (
                    <ThumbUpAltIcon fontSize='small' onClick={user && handleLike} />
                ) }
                { !putLike && (
                    <ThumbUpAltOutlinedIcon fontSize='small' onClick={user && handleLike} />
                ) }
            </div>
            { likes !== 0 && <span className={css.likes_count}>{likes}</span> }
        </div>
    );
};

export default Likes;
