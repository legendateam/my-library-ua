import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import {
    Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import dayjs from 'dayjs';

import {
    IAuthorProps, IAuthorUpdate, IResponseError,
} from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { editAuthorValidator } from '../../../utils';
import { authorService } from '../../../services';
import { FileEnum, HttpStatusEnum } from '../../../enums';
import {

    errorAvatarFormatConstant, errorAvatarSizeConstant,
    fileMimetypeConstant,
    fileSizeConstant,
    generalMessageConstant,
    JwtErrorConstant,
} from '../../../constants';
import {
    refreshTokenPairThunk, replaceAuthorAfterUpdated, replaceAuthorHomeAfterUpdated,
    replaceSearchAuthorAfterUpdated,
} from '../../../store';
import { Title } from '../../Title/Title';
import styleEditAuthorForm from './EditAuthorForm.module.css';
import css from '../../../pages/AdminPage/AdminPage.module.css';
import { mainConfig } from '../../../configs';

const EditAuthorForm: FC<IAuthorProps> = ({ author: authorResponse }) => {
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [success, setSuccess] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const [errorData, setErrorData] = useState<FormData | null>(null);

    const [photoFileSelected, setPhotoFileSelected] = useState<string | null>(null);
    const [errorPhoto, setErrorPhoto] = useState('');

    const {
        formState: { errors }, watch, handleSubmit, register,
    } = useForm<IAuthorUpdate>({
        resolver: joiResolver(editAuthorValidator), mode: 'onTouched',
    });

    const authorSubmit = async (author: IAuthorUpdate) => {
        setSuccess('');
        setErrorMessage('');
        setPending(!pending);

        const formData = new FormData();
        console.log(author?.photo[0]);
        formData.append('clientKey', clientKey);

        if (author?.photo[0]) formData.append('photo', author?.photo[0]);
        if (author?.firstName) formData.append('firstName', author?.firstName);
        if (author?.lastName) formData.append('lastName', author?.lastName);
        if (author?.biography) formData.append('biography', author?.biography);
        if (author?.country) formData.append('country', author?.country);
        if (author?.dateDeath) formData.append('dateDeath', dayjs(author?.dateDeath).format('YYYY-MM-DD'));
        if (author?.pseudonym) formData.append('pseudonym', author?.pseudonym);

        try {
            const authorResponseIResponseOK = await authorService.updateOne({
                accessToken: access, clientKey,
            }, formData, authorResponse.id);

            if (authorResponseIResponseOK.status === HttpStatusEnum.OK) {
                setPending(false);
                setErrorData(null);
                setSuccess(generalMessageConstant.adminUpdatedAuthor);
                setErrorMessage('');

                const replaceAll = new Promise(((resolve) => {
                    resolve(true);
                }));

                replaceAll.then(() => {
                    dispatch(replaceAuthorAfterUpdated(authorResponseIResponseOK.data));
                }).then(() => {
                    setTimeout(() => {
                        dispatch(replaceAuthorHomeAfterUpdated(authorResponseIResponseOK.data));
                    }, 2000);
                }).then(() => {
                    setTimeout(() => {
                        dispatch(replaceSearchAuthorAfterUpdated(authorResponseIResponseOK.data));
                    }, 2000);
                });
            }
        } catch (e) {
            if (e) {
                const axiosError = (e as AxiosError)?.response?.data;
                const responseError = axiosError as IResponseError;

                setPending(false);
                setErrorMessage(responseError?.message);

                if (responseError?.message === JwtErrorConstant.jwtExpired) {
                    dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
                    setErrorData(formData);
                    setSuccess('');
                }
            }
        }
    };

    useEffect(() => {
        if (errorData) {
            (async () => {
                try {
                    errorData.set('clientKey', clientKey);
                    const authorResponseIResponseOK = await authorService.updateOne({
                        accessToken: access, clientKey,
                    }, errorData, authorResponse.id);

                    if (authorResponseIResponseOK.status === HttpStatusEnum.OK) {
                        setPending(false);
                        setErrorData(null);
                        setSuccess(generalMessageConstant.adminUpdatedAuthor);
                        setErrorMessage('');

                        const replaceAll = new Promise(((resolve) => {
                            resolve(true);
                        }));

                        replaceAll.then(() => {
                            dispatch(replaceAuthorAfterUpdated(authorResponseIResponseOK.data));
                        }).then(() => {
                            setTimeout(() => {
                                dispatch(replaceAuthorHomeAfterUpdated(authorResponseIResponseOK.data));
                            }, 2000);
                        }).then(() => {
                            setTimeout(() => {
                                dispatch(replaceSearchAuthorAfterUpdated(authorResponseIResponseOK.data));
                            }, 2000);
                        });
                    }
                } catch (e) {
                    if (e) {
                        console.error(e);
                        setPending(false);
                    }
                }
            })();
        }
    }, [access]);

    watch((value) => {
        if (value.photo[0]) {
            setPhotoFileSelected(URL.createObjectURL(value.photo[0]));

            if (fileSizeConstant.SIZE_COVER < value?.photo[0]?.size
                || !fileMimetypeConstant[FileEnum.PHOTOS].includes(value?.photo[0]?.type)) {
                setErrorPhoto(`${errorAvatarFormatConstant()}, або ${errorAvatarSizeConstant()}`);
            } else {
                setErrorPhoto('');
            }
        }
    });

    return (
        <div>
            <Title title={generalMessageConstant.adminUpdateAuthor} />
            <form onSubmit={handleSubmit(authorSubmit)} className={css.admin__page_form}>
                <TextField
                    error={!!Object.keys(errors).includes('name')}
                    defaultValue={authorResponse.firstName}
                    label='Ім`я'
                    placeholder='Ім`я'
                    {...register('firstName')}
                    className={css.admin__page_form_text_field_input}
                />

                { !!Object.keys(errors).includes('firstName') && (
                    <div className={css.admin__page_form_error}>{errors?.firstName?.message}</div>
                ) }

                <TextField
                    error={!!Object.keys(errors).includes('lastName')}
                    placeholder='Прізвище'
                    label='Прізвище'
                    defaultValue={authorResponse.lastName}
                    {...register('lastName')}
                    className={css.admin__page_form_text_field_input}
                />
                { !!Object.keys(errors).includes('lastName') && (
                    <div className={css.admin__page_form_error}>{errors?.lastName?.message}</div>
                ) }

                <TextField
                    error={!!Object.keys(errors).includes('biography')}
                    defaultValue={authorResponse.biography && authorResponse.biography}
                    label='Біографія'
                    placeholder='Біографія'
                    {...register('biography')}
                    className={css.admin__page_form_text_field_input}
                />
                { !!Object.keys(errors).includes('biography') && (
                    <div className={css.admin__page_form_error}>{errors?.biography?.message}</div>
                ) }

                <TextField
                    error={!!Object.keys(errors).includes('country')}
                    defaultValue={authorResponse.country}
                    label='Країна'
                    placeholder='Країна'
                    {...register('country')}
                    className={css.admin__page_form_text_field_input}
                />
                { !!Object.keys(errors).includes('country') && (
                    <div className={css.admin__page_form_error}>{errors?.country?.message}</div>
                ) }

                { !authorResponse.dateDeath && (
                    <>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor='dateDeath'>
                            Дата смерті
                            <TextField
                                error={!!Object.keys(errors).includes('dateDeath')}
                                type='date'
                                {...register('dateDeath')}
                                className={css.admin__page_form_text_field_input}
                            />
                            { !!Object.keys(errors).includes('dateDeath') && (
                                <div className={css.admin__page_form_error}>{errors?.dateDeath?.message}</div>
                            ) }
                        </label>
                    </>
                ) }

                <TextField
                    error={!!Object.keys(errors).includes('pseudonym')}
                    defaultValue={authorResponse.pseudonym && authorResponse.pseudonym}
                    label='Псевдонім'
                    placeholder='Псевдонім'
                    {...register('pseudonym')}
                    className={css.admin__page_form_text_field_input}
                />
                { !!Object.keys(errors).includes('pseudonym') && (
                    <div className={css.admin__page_form_error}>{errors?.pseudonym?.message}</div>
                ) }

                <div className={styleEditAuthorForm.edit__author_form_wrap_btn}>
                    { (authorResponse?.photo && !photoFileSelected) && (
                        <img src={`${mainConfig.CLOUD_DOMAIN_NAME}${authorResponse?.photo}`} alt={authorResponse.firstName} />
                    ) }

                    { photoFileSelected && (
                        <img src={photoFileSelected} alt={authorResponse.firstName} />
                    ) }

                    <div className={styleEditAuthorForm.edit__author_form_wrap_submit_btn}>
                        <Button className={styleEditAuthorForm.edit__author_form_btn} variant='contained' component='label'>
                            { authorResponse?.photo ? 'Змінити фотографію' : 'Добавити фотографію' }
                            <input
                                hidden
                                accept='image/*'
                                multiple
                                type='file'
                                {...register('photo')}
                            />
                        </Button>
                        { errorPhoto && <span className={css.admin__page_form_error}>{errorPhoto}</span> }

                        {success && (
                            <p className={styleEditAuthorForm.edit__author_form_success_message}>{success}</p>
                        )}
                        {errorMessage && <p className={styleEditAuthorForm.edit__author_form_error_message}>{errorMessage}</p>}

                        <Button
                            disabled={((Object.keys(errors).length) || errorPhoto || pending) && true}
                            className={styleEditAuthorForm.edit__author_form_btn_submit}
                            type='submit'
                            variant='contained'
                            color='success'
                        >
                            Підтвердити зміни
                            { pending && (
                                <Box sx={{ display: 'flex', pl: 1 }}>
                                    <CircularProgress size={20} />
                                </Box>
                            ) }
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditAuthorForm;
