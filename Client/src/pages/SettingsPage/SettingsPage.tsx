import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
    Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AxiosError } from 'axios';

import css from './Settings.module.css';
import defaultAvatar from '../../assets/images/avatar.png';
import { settingsFormValidator } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IResponseError, IShowPassword, IUpdateUser } from '../../interfaces';
import {
    errorAvatarFormatConstant,
    errorAvatarSizeConstant,
    errorsMessageErrorConstant,
    fileMimetypeConstant,
    fileSizeConstant,
    generalMessageConstant,
    JwtErrorConstant, localStorageConstant,
} from '../../constants';
import { FileEnum, HttpStatusEnum } from '../../enums';
import { authService, userService } from '../../services';
import {
    addTokenPair, refreshTokenPairThunk, removeTokenPair, removeUser,
} from '../../store';

const mimetype = fileMimetypeConstant[FileEnum.PHOTOS].join();

export const SettingsPage: FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const { tokenPair: { clientKey, access, refresh } } = useAppSelector((state) => state.authReducer);

    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState<IShowPassword>({
        password: false, currentPassword: false, confirmPassword: false,
    });

    const [image, _setImage] = useState<string | null>(null);
    const [avatarName, setAvatarName] = useState<string>('');

    const cleanup = () => {
        URL.revokeObjectURL(image);
    };

    const setImage = (newImage: string) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const [successfully, setSuccessfully] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [errUpdateData, errSetUpdateData] = useState<IUpdateUser| null>();

    const {
        register, watch, handleSubmit, formState: { errors },
    } = useForm<IUpdateUser>({ resolver: joiResolver(settingsFormValidator), mode: 'onTouched' });

    const submit = async (data: IUpdateUser) => {
        if (!data.email) delete data.email;
        if (!data.avatar[0]) delete data.avatar;
        if (!data.nickName) delete data.nickName;
        if (!data.password) delete data.password;

        delete data.confirmPassword;

        if (!data.email && !data.avatar && !data.nickName && !data.password) {
            setError(errorsMessageErrorConstant.error);
            return;
        }

        if (data?.email === user.email) {
            setError(errorsMessageErrorConstant.conflictUserEmail);
            return;
        }

        if (data?.nickName === user.nickName) {
            setError(errorsMessageErrorConstant.conflictUserNickName);
            return;
        }

        try {
            if (!data?.avatar) {
                const newTokenPair = await userService.updateData({ ...data, clientKey }, access);

                if (newTokenPair.status === HttpStatusEnum.OK) {
                    dispatch(addTokenPair({ tokenPair: newTokenPair.data }));
                    setError('');

                    setSuccessfully(true);
                }
            }

            if (data?.avatar[0]) {
                const formData = new FormData();

                formData.append('currentPassword', data.currentPassword);
                formData.append('avatar', data.avatar[0]);
                formData.append('clientKey', clientKey);

                if (data?.nickName) formData.append('nickName', data.nickName);
                if (data?.email) formData.append('email', data.email);
                if (data?.password) formData.append('password', data.password);

                const newTokenPair = await userService.updateData(formData, access);

                if (newTokenPair.status === HttpStatusEnum.OK) {
                    dispatch(addTokenPair({ tokenPair: newTokenPair.data }));
                    setError('');

                    setSuccessfully(true);
                }
            }
        } catch (e) {
            const errAxiosData = (e as AxiosError)?.response?.data;
            const errData = errAxiosData as IResponseError;

            setSuccessfully(false);

            if (errData?.message && errData?.message !== JwtErrorConstant.jwtExpired) {
                setError(errData.message);
            }

            if (errData?.message === JwtErrorConstant.jwtExpired) {
                dispatch(refreshTokenPairThunk({ refreshToken: refresh, clientKey }));

                errSetUpdateData(data);
                setError(JwtErrorConstant.jwtExpired);
            }
        }
    };

    useEffect(() => {
        if (error === JwtErrorConstant.jwtExpired) {
            (async () => {
                try {
                    const newTokenPair = await userService.updateData({ ...errUpdateData, clientKey }, access);

                    if (newTokenPair.status === HttpStatusEnum.OK) {
                        dispatch(addTokenPair({ tokenPair: newTokenPair.data }));

                        errSetUpdateData(null);
                        setError('');
                        setSuccessfully(true);
                    }
                } catch (e) {
                    const errAxiosData = (e as AxiosError)?.response?.data;
                    const errData = errAxiosData as IResponseError;

                    setSuccessfully(false);

                    if (errData?.message && errData?.message !== JwtErrorConstant.jwtExpired) {
                        setError(errData.message);
                    }
                }
            })();
        }
    }, [access]);

    watch((value) => {
        setSuccessfully(false);

        if (value.avatar[0]) {
            if (!mimetype.includes(value?.avatar[0]?.type)) {
                const errorMessage = errorAvatarFormatConstant();
                setError(errorMessage);
            }

            if (value?.avatar[0]?.size > fileSizeConstant.SIZE_AVATAR) {
                const errorMessage = errorAvatarSizeConstant();
                setError(errorMessage);
            }

            if (mimetype.includes(value?.avatar[0]?.type) && value?.avatar[0]?.size <= fileSizeConstant.SIZE_AVATAR) {
                setError('');
            }

            if (value?.avatar[0]) {
                setImage(URL.createObjectURL(value?.avatar[0]));
            }

            setAvatarName(value?.avatar[0]?.name);
        }
    });

    useEffect(() => {
        (async () => {
            try {
                await authService.checkRefreshOnJwtExpired({ clientKey, refreshToken: refresh });
            } catch (e) {
                const axiosError = (e as AxiosError)?.response?.data;
                const responseError = axiosError as IResponseError;

                if (responseError.status === HttpStatusEnum.UNAUTHORIZED) {
                    dispatch(removeUser());
                    dispatch(removeTokenPair());

                    localStorage.removeItem(localStorageConstant.auth);
                }
            }
        })();
    }, [refresh]);

    return (
        <div className={css.settings__page}>
            {
                successfully ? (
                    <h1 className={css.settings__page_successfully_message}>
                        { generalMessageConstant.successfullyUserUpdate }
                    </h1>
                ) : (
                    <form className={css.settings__page_form} onSubmit={handleSubmit(submit)}>
                        <label htmlFor='avatar' className={css.settings__page_avatar}>
                            <img src={(image || (user.avatar ? user.avatar : defaultAvatar))} alt={user.nickName} />

                            <Button className={css.settings__page_avatar_btn} variant='contained' component='label'>
                                { !avatarName ? <span>змінити аватар</span> : <span>{ avatarName }</span> }
                                <input
                                    type='file'
                                    hidden
                                    accept={mimetype}
                                    {...register('avatar')}
                                />
                            </Button>
                            <div className={css.settings__page_error_message}>{ (error && avatarName) && error }</div>
                        </label>

                        <InputLabel htmlFor='nickName' className={css.settings__page_label}>
                            <h3>{user.nickName}</h3>

                            <TextField
                                error={Object.keys(errors).includes('nickName')}
                                helperText={Object.keys(errors).includes('nickName') ? errors.nickName.message
                                    : generalMessageConstant.updateNickName}
                                {...register('nickName')}
                                label={Object.keys(errors).includes('nickName') ? errorsMessageErrorConstant.error : 'нікнейм'}
                            />
                        </InputLabel>

                        <InputLabel htmlFor='email' className={css.settings__page_label}>
                            <h3>{user.email}</h3>

                            <TextField
                                error={Object.keys(errors).includes('email')}
                                helperText={Object.keys(errors)
                                    .includes('email') ? errors.email.message : generalMessageConstant.updateEmail}
                                {...register('email')}
                                label={Object.keys(errors).includes('email') ? errorsMessageErrorConstant.error : 'електронна пошта'}
                            />
                        </InputLabel>

                        <InputLabel htmlFor='currentPassword' className={css.settings__page_label}>
                            <h3>Поточний пароль:</h3>

                            <>
                                <OutlinedInput
                                    error={Object.keys(errors).includes('currentPassword')}
                                    {...register('currentPassword')}
                                    type={showPassword.currentPassword ? 'text' : 'password'}
                                    endAdornment={(
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={() => setShowPassword(
                                                    { ...showPassword, currentPassword: !showPassword.currentPassword },
                                                )}
                                                edge='end'
                                            >
                                                {!showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                { Object.keys(errors).includes('currentPassword') && (
                                    <div className={css.settings__page_error_message}>{errors.currentPassword.message}</div>
                                ) }
                            </>

                        </InputLabel>

                        <InputLabel htmlFor='password' className={css.settings__page_label}>
                            <h3>Новий пароль:</h3>

                            <>
                                <OutlinedInput
                                    error={Object.keys(errors).includes('password')}
                                    {...register('password')}
                                    type={showPassword.password ? 'text' : 'password'}
                                    endAdornment={(
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                                edge='end'
                                            >
                                                {!showPassword.password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                { Object.keys(errors).includes('password') && (
                                    <div className={css.settings__page_error_message}>{errors.password.message}</div>
                                ) }
                            </>
                        </InputLabel>

                        <InputLabel htmlFor='confirmPassword' className={css.settings__page_label}>
                            <h3>Підвердіть новий пароль:</h3>

                            <>
                                <OutlinedInput
                                    error={Object.keys(errors).includes('confirmPassword')}
                                    {...register('confirmPassword')}
                                    type={showPassword.confirmPassword ? 'text' : 'password'}
                                    endAdornment={(
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={() => setShowPassword(
                                                    { ...showPassword, confirmPassword: !showPassword.confirmPassword },
                                                )}
                                                edge='end'
                                            >
                                                {!showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                />
                                { Object.keys(errors).includes('confirmPassword') && (
                                    <div className={css.settings__page_error_message}>{errors.confirmPassword.message}</div>
                                ) }
                            </>
                        </InputLabel>

                        { error && <h3 className={css.settings__page_error_message}>{error}</h3> }

                        <Button
                            type='submit'
                            disabled={(!!Object.keys(errors).length || error) && true}
                            className={css.settings__page_save_btn}
                            variant='contained'
                            color='success'
                        >
                            Зберегти зміни
                        </Button>
                    </form>
                )
            }
        </div>
    );
};
