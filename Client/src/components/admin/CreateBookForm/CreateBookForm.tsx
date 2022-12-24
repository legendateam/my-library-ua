import React, { FC, useEffect, useState } from 'react';
import {
    Autocomplete, Box, Button, CircularProgress, TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosError } from 'axios';

import css from '../../../pages/AdminPage/AdminPage.module.css';
import { Title } from '../../Title/Title';
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
import { IBook, ICreateBookForm, IResponseError } from '../../../interfaces';
import { createBookValidator } from '../../../utils';
import { FileEnum, HttpStatusEnum } from '../../../enums';
import { bookService } from '../../../services';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshTokenPairThunk, setNewBookAfterCreated } from '../../../store';

export const CreateBookForm: FC<ICreateBookForm> = ({ genres, authors }) => {
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const [InputBookGenres, setInputBookGenres] = useState<{ label: string, id: number }[]>(null);

    const [success, setSuccess] = useState<string>('');
    const [failed, setFailed] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const [errorData, setErrorData] = useState<FormData | null>(null);

    const [coverName, setCoverName] = useState('');
    const [errorCover, setErrorCover] = useState('');

    const [textName, setTextName] = useState('');
    const [errorText, setErrorText] = useState('');

    const [audioName, setAudioName] = useState('');
    const [errorAudio, setErrorAudio] = useState('');

    const {
        formState: { errors }, watch, handleSubmit, register, reset,
    } = useForm<IBook>({
        resolver: joiResolver(createBookValidator), mode: 'onTouched',
    });

    const bookSubmit = async (book: IBook) => {
        setSuccess('');
        setFailed('');
        setPending(!pending);

        const formData = new FormData();

        formData.append('name', book.name);
        formData.append('description', book.description);
        formData.append('clientKey', clientKey);

        const author = authors.find((author) => author.label.toString() === book.authorId.toString());

        if (author) formData.append('authorId', author.id.toString());

        InputBookGenres.forEach((genre) => formData.append('genres', genre.id.toString()));

        if (book?.yearOfRelease) formData.append('yearOfRelease', book.yearOfRelease);
        if (book?.cover[0]) formData.append('cover', book?.cover[0]);
        if (book?.fileAudio[0]) formData.append('fileAudio', book?.fileAudio[0]);
        if (book?.fileText[0]) formData.append('fileText', book?.fileText[0]);

        try {
            const iBookResponseIResponseOK = await bookService.createOne(formData, { accessToken: access, clientKey });

            if (iBookResponseIResponseOK.status === HttpStatusEnum.CREATED) {
                dispatch(setNewBookAfterCreated(iBookResponseIResponseOK.data));

                setPending(false);
                setErrorData(null);
                setSuccess(generalMessageConstant.adminCreatedBook);
                setFailed('');

                setTimeout(() => reset(), 1000);
            }

            if (iBookResponseIResponseOK.status === HttpStatusEnum.PARTIAL_CONTENT) {
                dispatch(setNewBookAfterCreated(iBookResponseIResponseOK.data));

                setPending(false);
                setFailed(generalMessageConstant.adminPartialCreatedBook);
                setSuccess('');
                setErrorData(null);

                setTimeout(() => reset(), 1000);
            }
        } catch (e) {
            if (e) {
                const axiosError = (e as AxiosError)?.response?.data;
                const responseError = axiosError as IResponseError;

                setPending(false);

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
                    const iBookResponseIResponseOK = await bookService.createOne(errorData, { accessToken: access, clientKey });

                    if (iBookResponseIResponseOK.status === HttpStatusEnum.CREATED) {
                        dispatch(setNewBookAfterCreated(iBookResponseIResponseOK.data));

                        setPending(false);
                        setErrorData(null);
                        setSuccess(generalMessageConstant.adminCreatedBook);
                        setFailed('');

                        setTimeout(() => reset(), 1000);
                    }

                    if (iBookResponseIResponseOK.status === HttpStatusEnum.PARTIAL_CONTENT) {
                        dispatch(setNewBookAfterCreated(iBookResponseIResponseOK.data));

                        setPending(false);
                        setFailed(generalMessageConstant.adminPartialCreatedBook);
                        setErrorData(null);
                        setSuccess('');

                        setTimeout(() => reset(), 1000);
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
            setCoverName(value.cover[0].name);

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
            <Title title={generalMessageConstant.adminCreateBook} />
            <form onSubmit={handleSubmit(bookSubmit)} className={css.admin__page_form}>
                <label htmlFor='name'>
                    <TextField
                        error={!!Object.keys(errors).includes('name') && true}
                        required
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
                        required
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

                { !!genres.length && (
                    <>
                        <Autocomplete
                            multiple
                            options={genres}
                            renderInput={(params) => (
                                <TextField {...register('genres')} {...params} label='Жанри' />
                            )}
                            onChange={(event: any, newValue: any) => {
                                setInputBookGenres(newValue);
                            }}
                            className={css.admin__page_form_text_field_input}
                        />
                        { Object.keys(errors).includes('genres') && (
                            <div className={css.admin__page_form_error}>{errors?.genres?.message}</div>
                        ) }
                    </>
                ) }

                { !!authors.length && (
                    <>
                        <Autocomplete
                            options={authors}
                            renderInput={(params) => (
                                <TextField {...register('authorId')} required {...params} label='Вибрати автора' />
                            )}
                            className={css.admin__page_form_text_field_input}
                        />
                        { Object.keys(errors).includes('authorId') && (
                            <div className={css.admin__page_form_error}>{errors?.authorId?.message}</div>
                        ) }
                        <p className={css.admin__page_p_info}>Зверніть увагу, що для того, щоб додати книжку,
                            потрібно спершу переконатись, що автор вже добавлений,
                            якщо автор не добавлений, тоді потрібно спершу добавити атвора книги, а потім книгу.
                        </p>
                    </>
                ) }

                <div className={css.admin__page_wrap_btn}>
                    <Button className={css.admin__page_btn} variant='contained' component='label'>
                        { !coverName ? 'Обкладинка' : coverName}
                        <input hidden accept='image/*' multiple type='file' {...register('cover')} />
                    </Button>
                    { errorCover && <span className={css.admin__page_form_error}>{errorCover}</span> }

                    <Button className={css.admin__page_btn} variant='contained' component='label'>
                        { !textName ? 'Текстовий файл' : textName}
                        <input hidden accept='application/*' multiple type='file' {...register('fileText')} />
                    </Button>
                    { errorText && <span className={css.admin__page_form_error}>{errorText}</span> }

                    <Button className={css.admin__page_btn} variant='contained' component='label'>
                        { !audioName ? 'Аудіо файл' : audioName}
                        <input hidden accept='audio/*' multiple type='file' {...register('fileAudio')} />
                    </Button>
                    { errorAudio && <span className={css.admin__page_form_error}>{errorAudio}</span> }
                </div>

                {success && <p className={css.admin__page_form_success_message}>{success}</p>}
                {failed && <p className={css.admin__page_form_failed_message}>{failed}</p>}

                <Button
                    disabled={((Object.keys(errors).length) || errorCover || errorText || errorAudio || pending) && true}
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
