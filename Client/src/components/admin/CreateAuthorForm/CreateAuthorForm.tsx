import React, { FC, useEffect, useState } from 'react';
import {
    Autocomplete, Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';

import css from '../../../pages/AdminPage/AdminPage.module.css';
import { Title } from '../../Title/Title';
import {
    errorAvatarFormatConstant, errorAvatarSizeConstant,
    fileMimetypeConstant,
    fileSizeConstant,
    generalMessageConstant, JwtErrorConstant,
} from '../../../constants';
import {
    IAuthorCreate, ICreateFormProps, IResponseError,
} from '../../../interfaces';
import { createAuthorValidator } from '../../../utils';
import { FileEnum, HttpStatusEnum } from '../../../enums';
import { authorService } from '../../../services';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshTokenPairThunk, setAuthorAfterCreate } from '../../../store';

export const CreateAuthorForm: FC<ICreateFormProps> = ({ genres }) => {
    const { tokenPair: { access, clientKey, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [InputGenres, setInputGenres] = useState<{ label: string, id: number }[] | null>(null);
    const [errorFormData, setErrorFormData] = useState<FormData | null>(null);

    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const {
        formState: { errors: errorsAuthor }, watch: watchAuthor, handleSubmit: handleSubmitAuthor, register: registerAuthor, reset,
    } = useForm<IAuthorCreate>({
        resolver: joiResolver(createAuthorValidator), mode: 'onTouched',
    });

    const [photoName, setPhotoName] = useState('');
    const [errorPhoto, setErrorPhoto] = useState('');

    // @ts-ignore
    watchAuthor((value) => {
        if (value.photo[0]) {
            setPhotoName(value.photo[0].name);

            if (fileSizeConstant.SIZE_COVER < value?.photo[0]?.size
                || !fileMimetypeConstant[FileEnum.PHOTOS].includes(value?.photo[0]?.type)) {
                setErrorPhoto(`${errorAvatarFormatConstant()}, або ${errorAvatarSizeConstant()}`);
            } else {
                setErrorPhoto('');
            }
        }
    });

    const authorSubmit = async (author: IAuthorCreate) => {
        setPending(true);
        setFailed('');
        setSuccess('');

        const formData = new FormData();

        const dateBirthday = dayjs(author.dateBirthday).format('YYYY-MM-DD');
        formData.append('dateBirthday', dateBirthday);

        if (author?.dateDeath) {
            const dateDeath = dayjs(author.dateDeath).format('YYYY-MM-DD');
            formData.append('dateDeath', dateDeath);
        }

        if (author?.photo[0]) formData.append('photo', author?.photo[0]);
        if (author?.pseudonym) formData.append('pseudonym', author.pseudonym);

        formData.append('firstName', author.firstName);
        formData.append('lastName', author.lastName);
        formData.append('country', author.country);
        formData.append('biography', author.biography);
        formData.append('clientKey', clientKey);

        InputGenres.forEach((genre) => formData.append('genres', genre.id.toString()));

        try {
            const authorResponse = await authorService.createOne({ accessToken: access, clientKey }, formData);
            if (authorResponse.status === HttpStatusEnum.CREATED) {
                const logicAfterCreate = new Promise(((resolve) => {
                    resolve(true);
                }));

                logicAfterCreate.then(() => {
                    dispatch(setAuthorAfterCreate(authorResponse.data));
                }).then(() => {
                    setPending(false);
                }).then(() => {
                    setErrorFormData(null);
                }).then(() => {
                    setSuccess(generalMessageConstant.adminCreatedAuthor);
                })
                    .then(() => {
                        setFailed('');
                    })
                    .then(() => reset());
            }

            if (authorResponse.status === HttpStatusEnum.PARTIAL_CONTENT) {
                const logicAfterCreate = new Promise(((resolve) => {
                    resolve(true);
                }));

                logicAfterCreate.then(() => {
                    dispatch(setAuthorAfterCreate(authorResponse.data));
                }).then(() => {
                    setPending(false);
                }).then(() => {
                    setErrorFormData(null);
                }).then(() => {
                    setFailed(generalMessageConstant.adminPartialCreatedAuthor);
                })
                    .then(() => {
                        setSuccess('');
                    })
                    .then(() => reset());
            }
        } catch (e) {
            if (e) {
                console.error(e);
                setPending(false);

                const errorAxios = (e as AxiosError)?.response?.data;
                const responseError = errorAxios as IResponseError;

                setSuccess('');
                setFailed(responseError?.message);

                if (responseError?.message === JwtErrorConstant.jwtExpired) {
                    dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));
                    setErrorFormData(formData);
                }
            }
        }
    };

    useEffect(() => {
        if (errorFormData) {
            (async () => {
                try {
                    errorFormData.set('clientKey', clientKey);
                    const authorResponse = await authorService.createOne({ accessToken: access, clientKey }, errorFormData);

                    if (authorResponse.status === HttpStatusEnum.CREATED) {
                        const logicAfterCreate = new Promise(((resolve) => {
                            resolve(true);
                        }));

                        logicAfterCreate.then(() => {
                            dispatch(setAuthorAfterCreate(authorResponse.data));
                        }).then(() => {
                            setPending(false);
                        }).then(() => {
                            setErrorFormData(null);
                        }).then(() => {
                            setSuccess(generalMessageConstant.adminCreatedAuthor);
                        })
                            .then(() => {
                                setFailed('');
                            })
                            .then(() => reset());
                    }

                    if (authorResponse.status === HttpStatusEnum.PARTIAL_CONTENT) {
                        const logicAfterCreate = new Promise(((resolve) => {
                            resolve(true);
                        }));

                        logicAfterCreate.then(() => {
                            dispatch(setAuthorAfterCreate(authorResponse.data));
                        }).then(() => {
                            setPending(false);
                        }).then(() => {
                            setErrorFormData(null);
                        }).then(() => {
                            setFailed(generalMessageConstant.adminPartialCreatedAuthor);
                        })
                            .then(() => {
                                setSuccess('');
                            })
                            .then(() => reset());
                    }
                } catch (e) {
                    if (e) setPending(false);
                    console.error(e);
                }
            })();
        }
    }, [access]);

    return (
        <div>
            <Title title={generalMessageConstant.adminCreateAuthor} />
            <form className={css.admin__page_form} onSubmit={handleSubmitAuthor(authorSubmit)}>
                <label htmlFor='firstName'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('firstName') && true}
                        required
                        label='Ім`я автора'
                        placeholder='Ім`я'
                        {...registerAuthor('firstName')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('firstName') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.firstName?.message}</div>
                    ) }
                </label>

                <label htmlFor='lastName'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('lastName') && true}
                        required
                        label='Прізвище автора'
                        placeholder='Прізвище'
                        {...registerAuthor('lastName')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('lastName') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.lastName?.message}</div>
                    ) }
                </label>

                <label htmlFor='biography'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('biography') && true}
                        required
                        multiline
                        rows={10}
                        label='Біографія'
                        placeholder='Біографія'
                        {...registerAuthor('biography')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('biography') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.biography?.message}</div>
                    ) }
                </label>

                { !!genres.length && (
                    <Autocomplete
                        multiple
                        options={genres}
                        renderInput={(params) => (
                            <TextField {...registerAuthor('genres')} {...params} label='Жанри' />
                        )}
                        onChange={(event: any, newValue: any) => {
                            setInputGenres(newValue);
                        }}
                        className={css.admin__page_form_text_field_input}
                    />
                ) }

                <label htmlFor='country'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('country') && true}
                        required
                        label='Країна'
                        placeholder='Країна'
                        {...registerAuthor('country')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('country') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.country?.message}</div>
                    ) }
                </label>

                <label htmlFor='dateBirthday'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('dateBirthday') && true}
                        required
                        type='date'
                        {...registerAuthor('dateBirthday')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('dateBirthday') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.dateBirthday?.message}</div>
                    ) }
                </label>

                <label htmlFor='dateDeath'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('dateDeath') && true}
                        type='date'
                        {...registerAuthor('dateDeath')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('dateDeath') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.dateDeath?.message}</div>
                    ) }
                </label>

                <label htmlFor='pseudonym'>
                    <TextField
                        error={!!Object.keys(errorsAuthor).includes('pseudonym') && true}
                        label='Псевдонім'
                        placeholder='Псевдонім'
                        {...registerAuthor('pseudonym')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errorsAuthor).includes('pseudonym') && (
                        <div className={css.admin__page_form_error}>{errorsAuthor?.pseudonym?.message}</div>
                    ) }
                </label>

                <Button className={css.admin__page_btn} variant='contained' component='label'>
                    { !photoName ? 'Фото автора' : photoName }
                    <input hidden accept='image/*' multiple type='file' {...registerAuthor('photo')} />
                    { errorPhoto && <span className={css.admin__page_form_error}>{errorPhoto}</span> }
                </Button>

                {success && <p className={css.admin__page_form_success_message}>{success}</p>}
                {failed && <p className={css.admin__page_form_failed_message}>{failed }</p>}

                <Button
                    disabled={(Object.keys(errorsAuthor).length || pending) && true}
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
