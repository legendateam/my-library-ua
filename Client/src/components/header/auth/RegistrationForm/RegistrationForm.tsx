import React, { FC, SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PhotoCamera } from '@mui/icons-material';
import {
    Box, Button, CircularProgress, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AxiosError } from 'axios';

import css from './RegistrationForm.module.css';
import type { ErrorAuthForm } from '../../../../types';
import { IHandleRegistrationForm, IResponseError, IUserCreate } from '../../../../interfaces';
import { FileEnum, StatusEnum } from '../../../../enums';
import { useBlurMode } from '../../../../hooks';
import { authRegistrationFormValidator } from '../../../../utils';
import { authService } from '../../../../services';
import {
    errorAvatarFormatConstant,
    errorAvatarSizeConstant,
    fileMimetypeConstant,
    fileSizeConstant, generalMessageConstant,
} from '../../../../constants';

const RegistrationForm: FC<IHandleRegistrationForm> = ({ handleRegistration }: IHandleRegistrationForm) => {
    const [status, setStatus] = useState<StatusEnum | null>(null);
    const [avatarName, setAvatarName] = useState('');
    const [errorAvatar, setErrorAvatar] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successfullyMessage, setSuccessfullyMessage] = useState('');

    const [visibilityChecked, setVisibilityChecked] = useState({ password: false, conformPassword: false });
    const { handleBlurToggle } = useBlurMode();

    const {
        register, watch, handleSubmit, formState: { errors },
    } = useForm<IUserCreate>(
        { resolver: joiResolver(authRegistrationFormValidator), mode: 'onTouched' },
    );

    const errorsMessagesValidators = errors as ErrorAuthForm;

    const submit = async (user: IUserCreate): Promise<void> => {
        if (status !== StatusEnum.pending) {
            setStatus(StatusEnum.pending);
        }
        if (!user?.avatar[0]) {
            const userOfForm = Object.assign(user);
            delete userOfForm.confirmPassword;
            delete userOfForm.avatar;

            try {
                const { data, message } = await authService.registration(userOfForm);
                if (data) {
                    setErrorMessage('');
                    setStatus(StatusEnum.fulfilled);
                }

                if (message) {
                    setSuccessfullyMessage(generalMessageConstant.successfullyRegistration);
                    setTimeout(() => handleRegistration(), 500);
                }
            } catch (e) {
                const error = e as AxiosError;
                const { error: errorResponse, message, status } = error.response.data as IResponseError;

                if (message) {
                    setErrorMessage(message);
                }

                if (error) {
                    setStatus(StatusEnum.rejected);
                }
            }
            return;
        }
        const formData = new FormData();
        formData.append('nickName', user.nickName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('avatar', user.avatar[0]);

        try {
            const { data, message } = await authService.registration(formData);
            if (data) {
                setErrorMessage('');
                setStatus(StatusEnum.fulfilled);
            }

            if (message) {
                setSuccessfullyMessage(generalMessageConstant.successfullyRegistration);
                setTimeout(() => handleRegistration(), 500);
            }
        } catch (e) {
            const error = e as AxiosError;
            const { error: errorResponse, message, status } = error.response.data as IResponseError;

            if (message) {
                setErrorMessage(message);
            }

            if (error) {
                setStatus(StatusEnum.rejected);
            }
        }
    };

    const mimetype = fileMimetypeConstant[FileEnum.PHOTOS].join();

    const handleVisibility = (e: SyntheticEvent): void => {
        if (e.currentTarget.id.includes('password')) {
            visibilityChecked.password ? setVisibilityChecked({ ...visibilityChecked, password: false })
                : setVisibilityChecked({ ...visibilityChecked, password: true });
        }

        if (e.currentTarget.id.includes('confirmPassword')) {
            visibilityChecked.conformPassword ? setVisibilityChecked({ ...visibilityChecked, conformPassword: false })
                : setVisibilityChecked({ ...visibilityChecked, conformPassword: true });
        }
    };

    watch((value) => {
        if (value.avatar[0]) {
            setAvatarName(value.avatar[0].name);

            if (fileSizeConstant.SIZE_AVATAR < value?.avatar[0]?.size
                || !fileMimetypeConstant[FileEnum.PHOTOS].includes(value?.avatar[0]?.type)) {
                setErrorAvatar(`${errorAvatarFormatConstant()}, або ${errorAvatarSizeConstant()}`);
            } else {
                setErrorAvatar('');
            }
        }
    });

    const handleCloseRegistration = (): void => {
        handleBlurToggle();
        handleRegistration();
    };

    const close = (): void => handleRegistration();

    return (
        <div className={css.header__auth_registration}>
            <form className={css.header__auth_form_registration} onSubmit={handleSubmit(submit)}>
                <label htmlFor='nickName' className={css.header__auth_registration_form_label}>
                    Ваш псевдонім: { errors && (
                        <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.nickName?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('nickName') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type='text'
                        defaultValue=''
                        {...register('nickName')}
                    />
                    {
                        errors.nickName && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='email' className={css.header__auth_registration_form_label}>
                    Електронна пошта: { errors && (
                        <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.email?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('email') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                    {
                        errors.email && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='password' className={css.header__auth_registration_form_label}>
                    Пароль: { errors && (
                        <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.password?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('password') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type={!visibilityChecked.password ? 'password' : 'text'}
                        defaultValue=''
                        {...register('password')}
                    />
                    { !visibilityChecked.password
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__off_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__on_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )}
                    {
                        errors.password && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='confirmPassword' className={css.header__auth_registration_form_label}>
                    Підтвердіть пароль: { errors && (
                        <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.confirmPassword?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('confirmPassword') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type={!visibilityChecked.conformPassword ? 'password' : 'text'}
                        defaultValue=''
                        {...register('confirmPassword')}
                    />
                    { !visibilityChecked.conformPassword
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__off_confirmPassword_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__on_confirmPassword_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )}
                    {
                        errors.confirmPassword && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='avatar' className={css.header__auth_registration_form_label_avatar}>
                    Аватар: { avatarName ? <span>{avatarName}</span> : <span>не вибраний</span>}
                    <IconButton color='inherit' aria-label='upload picture' component='label'>
                        <input
                            className={
                                Object.keys(errors).includes('avatar') ? css.header__auth_registration_form_label_input_error_bg
                                    : css.header__auth_registration_form_label_input_bg
                            }
                            hidden
                            accept={mimetype}
                            type='file'
                            {...register('avatar')}
                        />
                        <PhotoCamera />
                    </IconButton>
                    { errorAvatar && (
                        <div>
                            <span className={css.header__auth_registration_form_span_error_message}>{ errorAvatar }</span>
                        </div>
                    ) }
                    { !avatarName && <span className={css.header__auth_registration_form_not_required}> (не обов`язково)</span> }
                    {
                        errors.avatar && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                { errorMessage && <span className={css.header__auth_registration_form_span_error_message}>{errorMessage}</span> }
                { successfullyMessage && (
                    <span className={css.header__auth_registration_form_span_successfully_message}>
                        {successfullyMessage}
                    </span>
                )}

                <Button
                    className={
                        (Object.keys(errors).length || errorAvatar) ? css.header__auth_registration_form_btn_submit : ''
                    }
                    disabled={status === StatusEnum.pending && true}
                    type='submit'
                    variant='contained'
                    color='success'
                >
                    Зареєструватися
                    { status === StatusEnum.pending && (
                        <Box sx={{ display: 'flex', pl: 1 }}>
                            <CircularProgress size={20} />
                        </Box>
                    ) }
                </Button>
            </form>
            <CloseIcon className={css.header__auth_registration_form_close_icon} onClick={handleCloseRegistration} />
        </div>
    );
};

export default RegistrationForm;
