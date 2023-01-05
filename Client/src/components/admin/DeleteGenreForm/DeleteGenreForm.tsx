import React, { FC, useEffect, useState } from 'react';
import {
    Autocomplete,
    Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosError } from 'axios';

import { Title } from '../../Title/Title';
import { generalMessageConstant, JwtErrorConstant } from '../../../constants';
import css from '../../../pages/AdminPage/AdminPage.module.css';
import { ICreateFormProps, IGenre, IResponseError } from '../../../interfaces';
import { createGenreValidator } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshTokenPairThunk } from '../../../store';
import { genreService } from '../../../services';

export const DeleteGenreForm: FC<ICreateFormProps> = ({ genres }) => {
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [errorGenre, setErrorGenre] = useState<IGenre | null>(null);

    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const {
        formState: { errors }, handleSubmit: handleSubmitGenreDelete, register,
    } = useForm<IGenre>({
        resolver: joiResolver(createGenreValidator), mode: 'onTouched',
    });

    const genreDeleteSubmit = async (genre: IGenre) => {
        setSuccess('');
        setFailed('');
        setPending(true);

        try {
            await genreService.deleteOne(genre, { accessToken: access, clientKey }).then(() => {
                const findIndex = genres.findIndex((genreOne) => genreOne.label === genre.name);
                genres.splice(findIndex, 1);

                setErrorGenre(null);
                setSuccess(generalMessageConstant.adminDeletedGenre);
                setPending(false);
            });
        } catch (e) {
            if (e) {
                const errorAxios = (e as AxiosError)?.response?.data;
                const responseError = errorAxios as IResponseError;

                setPending(false);
                setFailed(responseError?.message);

                if (responseError?.message === JwtErrorConstant.jwtExpired) {
                    setErrorGenre(genre);
                    dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
                }
            }
        }
    };

    useEffect(() => {
        if (errorGenre) {
            (async () => {
                try {
                    await genreService.deleteOne(
                        errorGenre,
                        { accessToken: access, clientKey },
                    );

                    setErrorGenre(null);
                    setSuccess(generalMessageConstant.adminDeletedGenre);
                    setPending(false);
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [access]);
    return (
        <div>
            <Title title={generalMessageConstant.adminDeleteGenre} />
            <form onSubmit={handleSubmitGenreDelete(genreDeleteSubmit)} className={css.admin__page_form}>

                { !!genres?.length && (
                    <>
                        <Autocomplete
                            options={genres}
                            renderInput={(params) => (
                                <TextField {...register('name')} {...params} label='Назва жанру' />
                            )}
                            className={css.admin__page_form_text_field_input}
                        />
                        { Object.keys(errors).includes('name') && (
                            <div className={css.admin__page_form_error}>{errors?.name?.message}</div>
                        ) }
                    </>
                ) }

                {success && <p className={css.admin__page_form_success_message}>{success}</p>}
                {failed && <p className={css.admin__page_form_error}>{failed}</p>}

                <Button
                    disabled={(Object.keys(errors).length || pending) && true}
                    className={css.admin__page_btn_submit}
                    type='submit'
                    variant='contained'
                    color='success'
                >
                    Видалити

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
