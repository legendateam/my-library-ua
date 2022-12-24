import React, { FC, useEffect, useState } from 'react';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import css from './DisLikes.module.css';
import { IDisLikesProps, IResponseError } from '../../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { likesAndDisLikesService } from '../../../../services';
import { JwtErrorConstant } from '../../../../constants';
import { refreshTokenPairThunk, removeTokenPairThunk, removeUser } from '../../../../store';

const DisLikes: FC<IDisLikesProps> = ({
    actions,
    commentId,
    setPutDisLike,
    setPutLike,
    putDisLike,
    putLike,
    likes,
    setLikes,
    setDisLikes,
    disLikes,
}) => {
    const { tokenPair } = useAppSelector((state) => state.authReducer);
    const { user } = useAppSelector((state) => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [typeError, setTypeError] = useState<{ create?: boolean, update?: boolean, delete?: boolean }
        | null>(null);
    const [error, setError] = useState<string>('');

    const handleLike = async () => {
        if (!putDisLike) {
            if (putLike) {
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
                        setTypeError({ delete: true });
                        dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                    }
                }
            }

            try {
                await likesAndDisLikesService.createOne(commentId, {
                    disLike: 1,
                    like: 0,
                    accessToken: tokenPair?.access,
                    clientKey: tokenPair?.clientKey,
                });

                setPutLike(false);
                setPutDisLike(true);
                setDisLikes(disLikes + 1);
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
    };

    useEffect(() => {
        if (typeError?.create) {
            (async () => {
                try {
                    await likesAndDisLikesService.createOne(commentId, {
                        disLike: 1,
                        like: 0,
                        accessToken: tokenPair?.access,
                        clientKey: tokenPair?.clientKey,
                    });

                    setPutLike(false);
                    setPutDisLike(true);
                    setDisLikes(disLikes + 1);
                } catch (e) {
                    const axiosError = e as AxiosError;
                    const errorAxiosResponse = axiosError?.response?.data;
                    const error = errorAxiosResponse as IResponseError;

                    if (error?.message === JwtErrorConstant.jwtExpired) {
                        setTypeError(null);
                        dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.clientKey }));
                        dispatch(removeUser());
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
                        dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.clientKey }));
                        dispatch(removeUser());
                        navigate('/');
                    }
                }
            })();
        }
    }, [tokenPair]);

    useEffect(() => {
        if (!disLikes) {
            actions?.forEach((action) => setDisLikes(action.disLike + disLikes));
        }

        if (user) {
            if (!putLike && !putDisLike) {
                const actionPut = actions?.find((action) => action.userId === user?.id);
                if (actionPut?.disLike) {
                    setPutDisLike(true);
                }
            }
        }
    }, [actions, user]);

    return (
        <div>
            <div className={user && css.dis__likes_active}>
                { putDisLike && (
                    <ThumbDownAltIcon fontSize='small' onClick={user && handleLike} />
                ) }
                { !putDisLike && (
                    <ThumbDownOutlinedIcon fontSize='small' onClick={user && handleLike} />
                ) }
            </div>
            { disLikes !== 0 && <span className={css.dis__likes_count}>{disLikes}</span> }
        </div>
    );
};

export default DisLikes;
