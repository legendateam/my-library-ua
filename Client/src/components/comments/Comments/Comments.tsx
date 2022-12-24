import React, {
    createRef, FC, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './Comments.module.css';
import Comment from '../Comment/Comment';
import { IBookProps, ICommentsResponse } from '../../../interfaces';
import { StatusEnum } from '../../../enums';
import { paginationTypeConstant, queryConstant } from '../../../constants';
import MyPagination from '../../MyPagination/MyPagination';
import CommentCreateForm from '../CommentCreateForm/CommentCreateForm';
import { useAppSelector } from '../../../hooks';

export const Comments: FC<IBookProps> = ({ book }) => {
    const [comments, setComments] = useState<ICommentsResponse[]>([]);
    const [commentsPagination, setCommentsPagination] = useState<ICommentsResponse[]>([]);

    const { pageComments, perPageComments, skipComments } = useAppSelector((state) => state.paginationReducer);

    const commentsTop = createRef<HTMLDivElement>();
    const [query] = useSearchParams();

    useEffect(() => {
        if (!comments.length) {
            setComments(book.comments);

            const commentsPagination = book.comments.slice(skipComments, perPageComments);
            setCommentsPagination(commentsPagination);
            return;
        }

        if (comments.length && (query.get(queryConstant.commentsPage) && (Number(query.get(queryConstant.commentsPage)) > 0
            && Number(query.get(queryConstant.commentsPage)) <= Math.ceil(comments.length / perPageComments)))) {
            const commentsPagination = comments.slice(skipComments, perPageComments);

            setCommentsPagination(commentsPagination);
        }
    }, [pageComments, skipComments]);

    return (
        <div>
            <div className={css.comments}>
                <div ref={commentsTop} className={css.comments__pagination}>
                    <MyPagination
                        page={pageComments}
                        count={book.comments.length}
                        status={StatusEnum.fulfilled}
                        perPage={perPageComments}
                        type={paginationTypeConstant.comments}
                    />
                </div>
                { !!comments.length && (
                    <ul className={css.comments__list}>
                        { commentsPagination.map((comment) => <Comment key={comment.id} comment={comment} />) }
                    </ul>
                ) }
                <CommentCreateForm
                    comments={comments}
                    setComments={setComments}
                    book={book}
                    commentsPagination={commentsPagination}
                    setCommentsPagination={setCommentsPagination}
                    commentsTop={commentsTop}
                />
            </div>

        </div>
    );
};
