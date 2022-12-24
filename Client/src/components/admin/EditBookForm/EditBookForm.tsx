import React, { FC, useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosError } from 'axios';
import {
    Box, Button, CircularProgress, TextField,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IBook, IBookProps, IResponseError } from '../../../interfaces';
import { editBookValidator } from '../../../utils';
import { bookService } from '../../../services';
import { FileEnum, HttpStatusEnum } from '../../../enums';
import {
    errorAudioFormatConstant,
    errorAudioSizeConstant,
    errorAvatarFormatConstant,
    errorAvatarSizeConstant,
    errorTextsFormatConstant,
    errorTextsSizeConstant,
    fileMimetypeConstant,
    fileSizeConstant,
    generalMessageConstant,
    JwtErrorConstant,
} from '../../../constants';
import {
    refreshTokenPairThunk,
    replaceBookAfterUpdated,
    replaceBookNoveltyAfterUpdated,
    replaceBookRatingsAfterUpdated,
    replaceBookSearchAfterUpdate, replaceHomeBookLastAddedBooksAfterUpdate,
    replaceHomeBookNoveltyAfterUpdate,
    replaceHomeBookPopularAfterUpdate,
} from '../../../store';
import { Title } from '../../Title/Title';
import css from '../../../pages/AdminPage/AdminPage.module.css';
import styleEditBookForm from './EditBookForm.module.css';
import { mainConfig } from '../../../configs';

const EditBookForm: FC<IBookProps> = ({ book: bookResponse }) => {
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const [errorData, setErrorData] = useState<FormData | null>(null);

    const [coverFileSelected, setCoverFileSelected] = useState<string | null>(null);

    const [errorCover, setErrorCover] = useState('');

    const [textName, setTextName] = useState('');
    const [errorText, setErrorText] = useState('');

    const [audioName, setAudioName] = useState('');
    const [errorAudio, setErrorAudio] = useState('');

    const {
        formState: { errors }, watch, handleSubmit, register,
    } = useForm<IBook>({
        resolver: joiResolver(editBookValidator), mode: 'onTouched',
    });

    const bookSubmit = async (book: IBook) => {
        setSuccess('');
        setFailed('');
        setPending(!pending);

        const formData = new FormData();

        formData.append('clientKey', clientKey);

        if (book?.name) formData.append('name', book.name);
        if (book?.description) formData.append('description', book.description);
        if (book?.yearOfRelease) formData.append('yearOfRelease', book.yearOfRelease);
        if (book?.cover[0]) formData.append('cover', book?.cover[0]);
        if (book?.fileAudio[0]) formData.append('fileAudio', book?.fileAudio[0]);
        if (book?.fileText[0]) formData.append('fileText', book?.fileText[0]);

        try {
            const iBookResponseIResponseOK = await bookService.updateOne(formData, {
                accessToken: access, clientKey,
            }, bookResponse.id);

            if (iBookResponseIResponseOK.status === HttpStatusEnum.OK) {
                setPending(false);
                setErrorData(null);
                setSuccess(generalMessageConstant.adminUpdatedBook);
                setFailed('');

                const replaceAll = new Promise(((resolve) => {
                    resolve(true);
                }));

                replaceAll.then(() => {
                    dispatch(replaceBookAfterUpdated(iBookResponseIResponseOK.data));
                }).then(() => {
                    setTimeout(() => {
                        dispatch(replaceBookNoveltyAfterUpdated(iBookResponseIResponseOK.data));
                    }, 2000);
                }).then(() => {
                    setTimeout(() => {
                        dispatch(replaceBookRatingsAfterUpdated(iBookResponseIResponseOK.data));
                    }, 2000);
                }).then(() => {
                    setTimeout(() => {
                        dispatch(replaceBookSearchAfterUpdate(iBookResponseIResponseOK.data));
                    }, 1100);
                })
                    .then(() => {
                        setTimeout(() => {
                            dispatch(replaceHomeBookNoveltyAfterUpdate(iBookResponseIResponseOK.data));
                        }, 200);
                    })
                    .then(() => {
                        setTimeout(() => {
                            dispatch(replaceHomeBookPopularAfterUpdate(iBookResponseIResponseOK.data));
                        }, 3000);
                    })
                    .then(() => {
                        setTimeout(() => {
                            dispatch(replaceHomeBookLastAddedBooksAfterUpdate(iBookResponseIResponseOK.data));
                        }, 100);
                    });
            }
        } catch (e) {
            if (e) {
                const axiosError = (e as AxiosError)?.response?.data;
                const responseError = axiosError as IResponseError;

                setPending(false);
                setFailed(responseError?.message);

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
                    const iBookResponseIResponseOK = await bookService.updateOne(errorData, {
                        accessToken: access, clientKey,
                    }, bookResponse.id);

                    if (iBookResponseIResponseOK.status === HttpStatusEnum.OK) {
                        setPending(false);
                        setErrorData(null);
                        setSuccess(generalMessageConstant.adminUpdatedBook);
                        setFailed('');

                        const replaceAll = new Promise(((resolve) => {
                            resolve(true);
                        }));

                        replaceAll.then(() => {
                            dispatch(replaceBookAfterUpdated(iBookResponseIResponseOK.data));
                        }).then(() => {
                            setTimeout(() => {
                                dispatch(replaceBookNoveltyAfterUpdated(iBookResponseIResponseOK.data));
                            }, 2000);
                        }).then(() => {
                            setTimeout(() => {
                                dispatch(replaceBookRatingsAfterUpdated(iBookResponseIResponseOK.data));
                            }, 2000);
                        }).then(() => {
                            setTimeout(() => {
                                dispatch(replaceBookSearchAfterUpdate(iBookResponseIResponseOK.data));
                            }, 1100);
                        })
                            .then(() => {
                                setTimeout(() => {
                                    dispatch(replaceHomeBookNoveltyAfterUpdate(iBookResponseIResponseOK.data));
                                }, 200);
                            })
                            .then(() => {
                                setTimeout(() => {
                                    dispatch(replaceHomeBookPopularAfterUpdate(iBookResponseIResponseOK.data));
                                }, 3000);
                            })
                            .then(() => {
                                setTimeout(() => {
                                    dispatch(replaceHomeBookLastAddedBooksAfterUpdate(iBookResponseIResponseOK.data));
                                }, 100);
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
        if (value.cover[0]) {
            setCoverFileSelected(URL.createObjectURL(value.cover[0]));

            if (fileSizeConstant.SIZE_COVER < value?.cover[0]?.size
                || !fileMimetypeConstant[FileEnum.PHOTOS].includes(value?.cover[0]?.type)) {
                setErrorCover(`${errorAvatarFormatConstant()}, або ${errorAvatarSizeConstant()}`);
            } else {
                setErrorCover('');
            }
        }

        if (value.fileText[0]) {
            setTextName(value.fileText[0].name);

            if (
                fileSizeConstant.SIZE_BOOK_TEXT_FILE < value?.fileText[0]?.size
                || (!fileMimetypeConstant[FileEnum.APPLICATION].includes(value?.fileText[0]?.type)
                    && !fileMimetypeConstant[FileEnum.TEXTS].includes(value?.fileText[0]?.type))
            ) {
                setErrorText(`${errorTextsFormatConstant()}, або ${errorTextsSizeConstant()}`);
            } else {
                setErrorText('');
            }
        }

        if (value.fileAudio[0]) {
            setAudioName(value.fileAudio[0].name);

            if (fileSizeConstant.SIZE_AUDIO_BOOK < value?.fileAudio[0]?.size
                || !fileMimetypeConstant[FileEnum.AUDIOS].includes(value?.fileAudio[0]?.type)) {
                setErrorAudio(`${errorAudioFormatConstant()}, або ${errorAudioSizeConstant()}`);
            } else {
                setErrorAudio('');
            }
        }
    });

    return (
        <div>
            <Title title={generalMessageConstant.adminUpdateBook} />
            <form onSubmit={handleSubmit(bookSubmit)} className={css.admin__page_form}>
                <label htmlFor='name'>
                    <TextField
                        error={!!Object.keys(errors).includes('name') && true}
                        defaultValue={bookResponse.name}
                        label='Назва книги'
                        placeholder='Назва книги'
                        {...register('name')}
                        className={css.admin__page_form_text_field_input}
                    />

                    { !!Object.keys(errors).includes('name') && (
                        <div className={css.admin__page_form_error}>{errors?.name?.message}</div>
                    ) }
                </label>

                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='yearOfRelease'>
                    <TextField
                        error={!!Object.keys(errors).includes('yearOfRelease') && true}
                        placeholder='Рік'
                        label='Рік'
                        type='number'
                        defaultValue={bookResponse?.yearOfRelease}
                        InputProps={{ inputProps: { min: 1700, max: new Date().getFullYear() } }}
                        {...register('yearOfRelease')}
                        className={css.admin__page_form_text_field_input}
                    />
                    { !!Object.keys(errors).includes('yearOfRelease') && (
                        <div className={css.admin__page_form_error}>{errors?.yearOfRelease?.message}</div>
                    ) }
                </label>

                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='description'>
                    <TextField
                        error={!!Object.keys(errors).includes('description') && true}
                        defaultValue={bookResponse.description}
                        multiline
                        rows={10}
                        label='Короткий опис'
                        placeholder='Короткий опис'
                        {...register('description')}
                        className={css.admin__page_form_text_field_input}
                    />
                    { !!Object.keys(errors).includes('description') && (
                        <div className={css.admin__page_form_error}>{errors?.description?.message}</div>
                    ) }
                </label>

                <div className={styleEditBookForm.edit__book_form_wrap_btn}>
                    { (bookResponse?.cover && !coverFileSelected) && (
                        <img src={`${mainConfig.CLOUD_DOMAIN_NAME}${bookResponse.cover}`} alt={bookResponse.name} />
                    ) }

                    { coverFileSelected && (
                        <img src={coverFileSelected} alt={bookResponse.name} />
                    ) }

                    <Button className={styleEditBookForm.edit__book_form_btn} variant='contained' component='label'>
                        { bookResponse?.cover ? 'Змінити обкладинку' : 'Добавити обкладинку' }
                        <input
                            hidden
                            accept='image/*'
                            multiple
                            type='file'
                            {...register('cover')}
                        />
                    </Button>
                    { errorCover && <span className={css.admin__page_form_error}>{errorCover}</span> }

                    <Button className={styleEditBookForm.edit__book_form_btn} variant='contained' component='label'>
                        { (!textName && bookResponse.fileText) && 'Оновити текстовий файл'}
                        { (!textName && !bookResponse.fileText) && 'Добавити текстовий файл'}
                        { textName && textName }
                        <input hidden accept='application/*' multiple type='file' {...register('fileText')} />
                    </Button>
                    { errorText && <span className={css.admin__page_form_error}>{errorText}</span> }

                    <Button className={styleEditBookForm.edit__book_form_btn} variant='contained' component='label'>
                        { (!audioName && bookResponse.fileAudio) && 'Оновити аудіо файл'}
                        { (!audioName && !bookResponse.fileAudio) && 'Добавити аудіо файл'}
                        { audioName && audioName }
                        <input hidden accept='audio/*' multiple type='file' {...register('fileAudio')} />
                    </Button>
                    { errorAudio && <span className={css.admin__page_form_error}>{errorAudio}</span> }

                    <div className={styleEditBookForm.edit__book_form_wrap_submit_btn}>
                        {success && (
                            <p className={styleEditBookForm.edit__book_form_success_message}>{success}</p>
                        )}
                        {failed && <p className={styleEditBookForm.edit__book_form_failed_message}>{failed}</p>}

                        <Button
                            disabled={((Object.keys(errors).length) || errorCover || errorText || errorAudio || pending) && true}
                            className={styleEditBookForm.edit__book_form_btn_submit}
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

export default EditBookForm;
