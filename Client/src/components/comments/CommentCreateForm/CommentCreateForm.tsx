import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosError } from 'axios';

import css from './CommentsCreateFrom.module.css';
import {
    IAuth, IComment, ICommentCreate, ICommentsCreateProps, IResponseError,
} from '../../../interfaces';
import { commentsCreateForm } from '../../../utils';
import { commentService } from '../../../services';
import { HttpStatusEnum } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { errorsMessageErrorConstant, generalMessageConstant, JwtErrorConstant } from '../../../constants';
import { refreshTokenPairThunk } from '../../../store';

const CommentCreateForm: FC<ICommentsCreateProps> = ({
    comments, setComments, commentsPagination, setCommentsPagination, book: { id },
    commentsTop,
}) => {
    const { user } = useAppSelector((state) => state.userReducer);
    const { tokenPair } = useAppSelector((state) => state.authReducer);

    const [comment, setComment] = useState<IComment | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<ICommentCreate>(
        { resolver: joiResolver(commentsCreateForm), mode: 'onTouched' },
    );

    const submit = async ({ text }: IComment): Promise<void> => {
        if (user) {
            try {
                const dataForCreateComment = { text, bookId: id } as ICommentCreate;
                const authData = { clientKey: tokenPair?.clientKey, accessToken: tokenPair?.access } as IAuth;

                const createdComment = await commentService.createComment(dataForCreateComment, authData);

                if (createdComment.status === HttpStatusEnum.CREATED) {
                    setComments([{ ...createdComment.data, user }, ...comments]);
                    setCommentsPagination([{ ...createdComment.data, user }, ...commentsPagination]);

                    reset({ text: '' });
                    commentsTop.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (e) {
                const axiosError = e as AxiosError;
                const responseError = axiosError.response.data as IResponseError;

                setErr(responseError.message);
                setComment({ text });

                if (responseError.message === JwtErrorConstant.jwtExpired) {
                    dispatch(refreshTokenPairThunk({ refreshToken: tokenPair?.refresh, clientKey: tokenPair?.clientKey }));
                }
            }
        }
    };

    useEffect(() => {
        if (tokenPair && (err && err === JwtErrorConstant.jwtExpired) && comment) {
            commentsTop.current.scrollIntoView({ behavior: 'smooth' });
            (async () => {
                const dataForCreateComment = { text: comment.text, bookId: id } as ICommentCreate;
                const authData = { clientKey: tokenPair?.clientKey, accessToken: tokenPair?.access } as IAuth;

                const createdComment = await commentService.createComment(dataForCreateComment, authData);

                if (createdComment.status === HttpStatusEnum.CREATED) {
                    setErr(null);
                    setComment(null);

                    setComments([{ ...createdComment.data, user }, ...comments]);
                    setCommentsPagination([{ ...createdComment.data, user }, ...commentsPagination]);

                    reset({ text: '' });
                }
            })();
        }
    }, [tokenPair]);

    return (
        <div className={css.comments__create}>
            { !user && (
                <h4 className={css.comments__create_form_err}>
                    { errorsMessageErrorConstant.comments }
                </h4>
            ) }
            { !!Object.keys(errors).length && <h4 className={css.comments__create_form_err}>{errors.text.message}</h4> }
            { user && !comments.length && (
                <h4>{generalMessageConstant.notLengthComments}</h4>
            ) }
            <form className={css.comments__create_form} onSubmit={handleSubmit(submit)}>
                <label htmlFor='text'>
                    <textarea
                        className={css.comments__create_form_text}
                        {...register('text')}
                        defaultValue=''
                        placeholder='Ведіть текст коментаря'
                    />
                </label>
                { (user && !Object.keys(errors).length) ? (
                    <Button variant='contained' color='success' type='submit'>
                        Добавити коментар
                    </Button>
                ) : (
                    <Button variant='contained' color='success' disabled>
                        Добавити коментар
                    </Button>
                ) }
            </form>
        </div>
    );
};

export default CommentCreateForm;
