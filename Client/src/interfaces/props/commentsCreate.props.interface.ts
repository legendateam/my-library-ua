import React from 'react';

import { ICommentsResponse } from '../response/comments.response.interface';
import { IBookProps } from './book.props.interface';

export interface ICommentsCreateProps extends IBookProps{
    comments: ICommentsResponse[],
    setComments: React.Dispatch<React.SetStateAction<ICommentsResponse[]>>,
    commentsPagination: ICommentsResponse[],
    setCommentsPagination: React.Dispatch<React.SetStateAction<ICommentsResponse[]>>,
    commentsTop: React.RefObject<HTMLDivElement>,
}
