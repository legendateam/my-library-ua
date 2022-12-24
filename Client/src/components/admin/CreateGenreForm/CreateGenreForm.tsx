import React, { FC, useEffect, useState } from 'react';
import {
    Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosError } from 'axios';
import { Title } from '../../Title/Title';

import { generalMessageConstant, JwtErrorConstant } from '../../../constants';
import css from '../../../pages/AdminPage/AdminPage.module.css';
import { IGenre, IResponseError } from '../../../interfaces';
import { createGenreValidator } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshTokenPairThunk } from '../../../store';
import { genreService } from '../../../services';
import { HttpStatusEnum } from '../../../enums';

export const CreateGenreForm: FC = () => {
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [errorGenre, setErrorGenre] = useState<IGenre | null>(null);

    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const {
        formState: { errors: errorsGenre }, handleSubmit: handleSubmitGenre, register: registerGenre,
    } = useForm<IGenre>({
        resolver: joiResolver(createGenreValidator), mode: 'onTouched',
    });

    const genreSubmit = async (genre: IGenre) => {
        setPending(!pending);
        setSuccess('');
        setFailed('');

        try {
            const iGenreResponseIResponseOK = await genreService.createOne(genre, { accessToken: access, clientKey });

            if (iGenreResponseIResponseOK.status === HttpStatusEnum.CREATED) {
                setPending(false);
                setErrorGenre(null);
                setSuccess(generalMessageConstant.adminCreatedGenre);
            }
        } catch (e) {
            if (e) {
                const errorAxios = (e as AxiosError)?.response.data;
                const responseError = errorAxios as IResponseError;

                setFailed(responseError.message);
                setPending(false);

                if (responseError.message === JwtErrorConstant.jwtExpired) {
                    setErrorGenre(genre);
                    dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
                }
            }
        }
    };

    useEffect(() => {
        if (errorGenre) {
            setPending(false);
            setSuccess('');
            setFailed('');

            (async () => {
                try {
                    const iGenreResponseIResponseOK = await genreService.createOne(
                        errorGenre,
                        { accessToken: access, clientKey },
                    );

                    if (iGenreResponseIResponseOK.status === HttpStatusEnum.CREATED) {
                        setErrorGenre(null);
                        setPending(true);
                        setSuccess(generalMessageConstant.adminCreatedGenre);
                    }
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [access]);
    return (
        <div>
            <Title title={generalMessageConstant.adminCreateGenre} />
            <form onSubmit={handleSubmitGenre(genreSubmit)} className={css.admin__page_form}>
                <label htmlFor='name'>
                    <TextField
                        error={!!Object.keys(errorsGenre).includes('name') && true}
                        label='Назва жанру'
                        placeholder='Назва жанру'
                        {...registerGenre('name')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsGenre).includes('name') && (
                        <div className={css.admin__page_form_error}>{errorsGenre?.name?.message}</div>
                    ) }
                </label>

                {success && <p className={css.admin__page_form_success_message}>{success}</p>}
                {failed && <p className={css.admin__page_form_error}>{failed}</p>}

                <Button
                    disabled={(Object.keys(errorsGenre).length || pending) && true}
                    className={css.admin__page_btn_submit}
                    type='submit'
                    variant='contained'
                    color='success'
                >
                    Створити

                    { pending && (
                        <Box sx={{ display: 'flex', pl: 1 }}>
                            <CircularProgress size={20} />
                        </Box>
                    ) }
                </Button>
            </form>
        </div>
    );
};
