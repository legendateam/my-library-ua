import React, {
    FC, SyntheticEvent, useEffect, useState,
} from 'react';
import { Rating } from '@mui/material';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import css from './Ratings.module.css';
import { IRatingProps, IResponseError } from '../../interfaces';
import { IRatingsResponse } from '../../interfaces/response/ratings.response.interface';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { JwtErrorConstant } from '../../constants';
import { ratingService } from '../../services';
import { refreshTokenPairThunk, removeTokenPairThunk, removeUser } from '../../store';
import { HttpStatusEnum } from '../../enums';

export const Ratings: FC<IRatingProps> = ({ ratings, bookId }) => {
    const { user } = useAppSelector((state) => state.userReducer);
    const { tokenPair } = useAppSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [ratingTrigger, setRatingTrigger] = useState<IRatingsResponse | null>(null);
    const [rating, setRating] = useState<{ rate: number, avg: number, count: number }>({ rate: 0, avg: 0, count: 0 });

    const [newRate, setNewRate] = useState<number | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        if (ratings.length) {
            const find = ratings.find((rate) => rate?.userId === user?.id);
            if (find) setRatingTrigger(find);
        }
    }, [user]);

    useEffectOnce(() => {
        const count = ratings.length;
        let rateNumber = 0;
        let avg = 0;

        if (ratings.length && (!rating.avg && !rating.rate && !rating.count)) {
            ratings.forEach((rate: IRatingsResponse) => {
                rateNumber += rate.rate;
                avg = rateNumber / count;

                setRating({ avg, rate: rating.rate + rateNumber, count });
            });
        }
    });

    const handleRating = async (event: SyntheticEvent, newValue: number | null): Promise<void> => {
        if (!ratingTrigger) {
            try {
                const ratingCreated = await ratingService.createRate({
                    bookId,
                    rate: newValue,
                    clientKey: tokenPair?.clientKey,
                    accessToken: tokenPair?.access,
                });

                if (ratingCreated.status === HttpStatusEnum.CREATED) {
                    const { count, rate } = rating;
                    const newValueRate = rate + newValue;
                    const avg = count ? newValueRate / count : newValueRate;

                    setRating({ rate, count: count + 1, avg });

                    setErr(null);
                    setRatingTrigger(ratingCreated.data);
                }
            } catch (e) {
                const axiosError = e as AxiosError;
                const responseError = axiosError.response?.data as IResponseError;

                setNewRate(newValue);
                setErr(responseError?.message);

                if (responseError?.message === JwtErrorConstant.jwtExpired) {
                    dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                }
            }
        }

        if (ratingTrigger) {
            if (newValue && ratingTrigger.rate !== newValue) {
                try {
                    const ratingUpdated = await ratingService.updateRate({
                        bookId,
                        rate: newValue,
                        clientKey: tokenPair?.clientKey,
                        accessToken: tokenPair?.access,
                    }, ratingTrigger.id.toString());

                    if (ratingUpdated.status === HttpStatusEnum.OK) {
                        const rate = (rating.rate - ratingTrigger.rate) + newValue;
                        const { count } = rating;
                        const avg = rate / count;

                        setRating({ ...rating, rate, avg });
                        setErr(null);

                        setRatingTrigger({ ...ratingTrigger, rate: newValue });
                    }
                } catch (e) {
                    const axiosError = e as AxiosError;
                    const responseError = axiosError.response?.data as IResponseError;

                    setNewRate(newValue);
                    setErr(responseError?.message);

                    if (responseError?.message === JwtErrorConstant.jwtExpired) {
                        dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (err === JwtErrorConstant.jwtExpired) {
            (async () => {
                if (!ratingTrigger) {
                    try {
                        const ratingCreated = await ratingService.createRate({
                            bookId,
                            rate: newRate,
                            clientKey: tokenPair?.clientKey,
                            accessToken: tokenPair?.access,
                        });

                        if (ratingCreated.status === HttpStatusEnum.CREATED) {
                            const { count, rate } = rating;
                            const newValueRate = rate + newRate;
                            const avg = newValueRate / count;

                            setRating({ rate, count, avg });

                            setErr(null);
                            setRatingTrigger(ratingCreated.data);
                        }
                    } catch (e) {
                        const axiosError = e as AxiosError;
                        const responseError = axiosError.response?.data as IResponseError;

                        setErr(responseError?.message);

                        if (responseError?.message === JwtErrorConstant.jwtExpired) {
                            dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.refresh }));
                            dispatch(removeUser());
                            navigate('/');
                        }
                    }
                }

                if (ratingTrigger) {
                    try {
                        const ratingUpdated = await ratingService.updateRate({
                            bookId,
                            rate: newRate,
                            clientKey: tokenPair?.clientKey,
                            accessToken: tokenPair?.access,
                        }, ratingTrigger.id.toString());

                        if (ratingUpdated.status === HttpStatusEnum.OK) {
                            const rate = (rating.rate - ratingTrigger.rate) + newRate;
                            const { count } = rating;
                            const avg = rate / count;

                            setRating({ ...rating, rate, avg });
                            setErr(null);

                            setRatingTrigger({ ...ratingTrigger, rate: newRate });
                        }
                    } catch (e) {
                        const axiosError = e as AxiosError;
                        const responseError = axiosError.response?.data as IResponseError;

                        setErr(responseError?.message);

                        if (responseError?.message === JwtErrorConstant.jwtExpired) {
                            dispatch(removeTokenPairThunk({ accessToken: tokenPair?.access, clientKey: tokenPair?.refresh }));
                            dispatch(removeUser());
                            navigate('/');
                        }
                    }
                }
            })();
        }
    }, [tokenPair]);
    return (
        <div className={css.ratings}>
            { user ? <Rating name='rating' precision={0.5} value={rating.avg} onChange={handleRating} />
                : (
                    <Rating name='read-only' precision={0.5} value={rating.avg} readOnly />
                ) }
        </div>
    );
};
